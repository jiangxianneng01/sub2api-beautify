package service

import (
	"net/http/httptest"
	"strings"
	"testing"

	"github.com/gin-gonic/gin"
)

func firstClaudeTestText(t *testing.T, payload map[string]any) string {
	t.Helper()
	messages, ok := payload["messages"].([]map[string]any)
	if !ok || len(messages) == 0 {
		t.Fatalf("payload has no messages: %#v", payload["messages"])
	}
	content, ok := messages[0]["content"].([]map[string]any)
	if !ok || len(content) == 0 {
		t.Fatalf("message has no content: %#v", messages[0]["content"])
	}
	text, _ := content[0]["text"].(string)
	return text
}

func firstOpenAITestText(t *testing.T, payload map[string]any) string {
	t.Helper()
	input, ok := payload["input"].([]map[string]any)
	if !ok || len(input) == 0 {
		t.Fatalf("payload has no input: %#v", payload["input"])
	}
	content, ok := input[0]["content"].([]map[string]any)
	if !ok || len(content) == 0 {
		t.Fatalf("input has no content: %#v", input[0]["content"])
	}
	text, _ := content[0]["text"].(string)
	return text
}

func TestCreateTestPayloadTextPrompt(t *testing.T) {
	payload, err := createTestPayload("claude-sonnet-4-6")
	if err != nil {
		t.Fatal(err)
	}
	if got := firstClaudeTestText(t, payload); got != "hi" {
		t.Fatalf("default prompt = %q, want hi", got)
	}

	payload, err = createTestPayload("claude-sonnet-4-6", "  Introduce yourself  ")
	if err != nil {
		t.Fatal(err)
	}
	if got := firstClaudeTestText(t, payload); got != "Introduce yourself" {
		t.Fatalf("custom prompt = %q", got)
	}
}

func TestCreateOpenAITestPayloadTextPrompt(t *testing.T) {
	if got := firstOpenAITestText(t, createOpenAITestPayload("gpt-5.5", true)); got != "hi" {
		t.Fatalf("default prompt = %q, want hi", got)
	}
	if got := firstOpenAITestText(t, createOpenAITestPayload("gpt-5.5", false, "", " 1+1? ")); got != "1+1?" {
		t.Fatalf("custom prompt = %q", got)
	}
}

func TestAccountTestTextPromptFromContext(t *testing.T) {
	gin.SetMode(gin.TestMode)
	if got := accountTestTextPrompt(nil); got != "hi" {
		t.Fatalf("nil context = %q, want hi", got)
	}
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	if got := accountTestTextPrompt(c); got != "hi" {
		t.Fatalf("unset = %q, want hi", got)
	}
	c.Set(accountTestTextPromptContextKey, "  ping  ")
	if got := accountTestTextPrompt(c); got != "ping" {
		t.Fatalf("set = %q, want ping", got)
	}
}

func TestAccountTestTextPromptIsCapped(t *testing.T) {
	long := strings.Repeat("测", maxAccountTestTextPromptRunes+50)
	if got := []rune(pickTestTextPrompt([]string{long})); len(got) != maxAccountTestTextPromptRunes {
		t.Fatalf("capped length = %d, want %d", len(got), maxAccountTestTextPromptRunes)
	}
	gin.SetMode(gin.TestMode)
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	c.Set(accountTestTextPromptContextKey, long)
	if got := []rune(accountTestTextPrompt(c)); len(got) != maxAccountTestTextPromptRunes {
		t.Fatalf("context capped length = %d, want %d", len(got), maxAccountTestTextPromptRunes)
	}
}

func TestDropTestSystemPrompt(t *testing.T) {
	gin.SetMode(gin.TestMode)
	newPayload := func() map[string]any {
		payload, err := createTestPayload("claude-sonnet-4-6")
		if err != nil {
			t.Fatal(err)
		}
		if _, ok := payload["system"]; !ok {
			t.Fatal("test payload should carry the Claude Code system prompt by default")
		}
		return payload
	}
	apiKey := &Account{Type: AccountTypeAPIKey}
	oauth := &Account{Type: AccountTypeOAuth}

	// not asked: the system prompt stays
	c, _ := gin.CreateTestContext(httptest.NewRecorder())
	payload := newPayload()
	if dropTestSystemPrompt(c, apiKey, payload) {
		t.Fatal("dropped without being asked")
	}
	if _, ok := payload["system"]; !ok {
		t.Fatal("system prompt removed without being asked")
	}

	// asked, API-key account: removed
	c.Set(accountTestNoSystemPromptContextKey, true)
	payload = newPayload()
	if !dropTestSystemPrompt(c, apiKey, payload) {
		t.Fatal("API-key account should drop the system prompt when asked")
	}
	if _, ok := payload["system"]; ok {
		t.Fatal("system prompt still present")
	}

	// asked, OAuth account: kept (Anthropic requires it for subscription tokens)
	payload = newPayload()
	if dropTestSystemPrompt(c, oauth, payload) {
		t.Fatal("OAuth account must keep the system prompt")
	}
	if _, ok := payload["system"]; !ok {
		t.Fatal("OAuth system prompt removed")
	}

	if dropTestSystemPrompt(nil, apiKey, newPayload()) {
		t.Fatal("nil context must not drop")
	}
}

func TestClaudeStreamMessageModel(t *testing.T) {
	event := map[string]any{"type": "message_start", "message": map[string]any{"model": " deepseek-chat "}}
	if got := claudeStreamMessageModel(event); got != "deepseek-chat" {
		t.Fatalf("model = %q, want deepseek-chat", got)
	}
	if got := claudeStreamMessageModel(map[string]any{"type": "message_start"}); got != "" {
		t.Fatalf("missing message = %q, want empty", got)
	}
}
