<template>
  <div ref="rootRef" class="typer" :class="{ 'is-typing': typing }">
    <div class="typer-bar">
      <div class="typer-tabs" role="tablist" :aria-label="t('home.integrate.languages')">
        <button
          v-for="s in samples"
          :key="s.id"
          type="button"
          role="tab"
          class="typer-tab"
          :class="{ 'is-active': s.id === active }"
          :aria-selected="s.id === active"
          @click="select(s.id)"
        >
          {{ s.label }}
        </button>
      </div>
      <button type="button" class="typer-copy" :class="{ 'is-copied': copied }" @click="copy">
        <Icon v-if="copied" name="check" size="xs" :stroke-width="2.5" />
        <Icon v-else name="copy" size="xs" />
        <span>{{ copied ? t('home.copied') : t('home.integrate.copy') }}</span>
      </button>
    </div>

    <div class="typer-body">
      <ol class="typer-gutter" aria-hidden="true">
        <li v-for="n in lineCount" :key="n">{{ n }}</li>
      </ol>
      <pre class="typer-code"><code><span v-for="(tok, i) in visibleTokens" :key="i" :class="tok.type === 'plain' ? undefined : `tok-${tok.type}`">{{ tok.text }}</span><span class="typer-caret" aria-hidden="true"></span></code></pre>
    </div>

    <p class="typer-foot">
      <span class="typer-dot" :class="{ 'is-live': typing }"></span>
      {{ typing ? t('home.integrate.writing') : t('home.integrate.ready') }}
      <span class="typer-foot-sep" aria-hidden="true"></span>
      <code>{{ endpointLabel }}</code>
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Icon from '@/components/icons/Icon.vue'

/**
 * HomeCodeTyper — integration samples that write themselves when scrolled into view.
 *
 * Every sample is a real, runnable call against the gateway's OpenAI-compatible endpoint,
 * with the deployment's base URL filled in. Characters appear at a human-ish cadence with a
 * caret; switching language retypes the new sample. Tokens are highlighted by a small
 * tokenizer (comments, strings, keywords, numbers, calls) — no highlighting library needed.
 */

const props = defineProps<{
  baseUrl: string
}>()

const { t } = useI18n()

type TokenType = 'plain' | 'comment' | 'string' | 'keyword' | 'number' | 'fn' | 'type'
interface Token {
  type: TokenType
  text: string
}
interface Sample {
  id: string
  label: string
  keywords: string[]
  types?: string[]
  lineComment: string
  code: string
}

const MODEL = 'claude-sonnet-5-5'
const KEY = 'sk-your-api-key'

const samples = computed<Sample[]>(() => {
  const base = props.baseUrl || 'https://your-gateway.example'
  const v1 = `${base}/v1`
  return [
    {
      id: 'python',
      label: 'Python',
      keywords: ['from', 'import', 'print'],
      lineComment: '#',
      code: `from openai import OpenAI

# Official SDK; only the base URL and key change
client = OpenAI(
    api_key="${KEY}",
    base_url="${v1}",
)

completion = client.chat.completions.create(
    model="${MODEL}",
    messages=[{"role": "user", "content": "Summarize this in one line."}],
)

print(completion.choices[0].message.content)`
    },
    {
      id: 'node',
      label: 'Node.js',
      keywords: ['import', 'from', 'const', 'await', 'new'],
      lineComment: '//',
      code: `import OpenAI from "openai";

// Official SDK; only the base URL and key change
const client = new OpenAI({
  apiKey: "${KEY}",
  baseURL: "${v1}",
});

const completion = await client.chat.completions.create({
  model: "${MODEL}",
  messages: [{ role: "user", content: "Summarize this in one line." }],
});

console.log(completion.choices[0].message.content);`
    },
    {
      id: 'java',
      label: 'Java',
      keywords: ['import', 'new', 'return', 'public', 'static', 'void', 'class'],
      types: ['OpenAIClient', 'OpenAIOkHttpClient', 'ChatCompletion', 'ChatCompletionCreateParams', 'System'],
      lineComment: '//',
      code: `import com.openai.client.OpenAIClient;
import com.openai.client.okhttp.OpenAIOkHttpClient;
import com.openai.models.chat.completions.ChatCompletion;
import com.openai.models.chat.completions.ChatCompletionCreateParams;

// Official SDK; only the base URL and key change
OpenAIClient client = OpenAIOkHttpClient.builder()
    .apiKey("${KEY}")
    .baseUrl("${v1}")
    .build();

ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
    .model("${MODEL}")
    .addUserMessage("Summarize this in one line.")
    .build();

ChatCompletion completion = client.chat().completions().create(params);
System.out.println(completion.choices().get(0).message().content().orElse(""));`
    },
    {
      id: 'go',
      label: 'Go',
      keywords: ['package', 'import', 'func', 'if', 'err', 'nil', 'panic', 'return'],
      types: ['openai', 'option', 'context', 'fmt'],
      lineComment: '//',
      code: `package main

import (
    "context"
    "fmt"

    "github.com/openai/openai-go"
    "github.com/openai/openai-go/option"
)

func main() {
    // Official SDK; only the base URL and key change
    client := openai.NewClient(
        option.WithAPIKey("${KEY}"),
        option.WithBaseURL("${v1}"),
    )

    chat, err := client.Chat.Completions.New(context.TODO(), openai.ChatCompletionNewParams{
        Model: "${MODEL}",
        Messages: []openai.ChatCompletionMessageParamUnion{
            openai.UserMessage("Summarize this in one line."),
        },
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(chat.Choices[0].Message.Content)
}`
    },
    {
      id: 'curl',
      label: 'cURL',
      keywords: ['curl'],
      lineComment: '#',
      code: `# Plain HTTP works too: the endpoint is OpenAI-compatible
curl ${v1}/chat/completions \\
  -H "Authorization: Bearer ${KEY}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${MODEL}",
    "messages": [{ "role": "user", "content": "Summarize this in one line." }]
  }'`
    }
  ]
})

const endpointLabel = computed(() => `POST ${props.baseUrl || 'https://your-gateway.example'}/v1/chat/completions`)

/* --------------------------------------------------------------- tokens ---- */

function tokenize(sample: Sample): Token[] {
  const out: Token[] = []
  const src = sample.code
  const kw = new Set(sample.keywords)
  const ty = new Set(sample.types || [])
  let i = 0
  const push = (type: TokenType, text: string) => {
    const last = out[out.length - 1]
    if (last && last.type === type) last.text += text
    else out.push({ type, text })
  }
  while (i < src.length) {
    const ch = src[i]
    // line comment
    if (src.startsWith(sample.lineComment, i)) {
      let j = src.indexOf('\n', i)
      if (j === -1) j = src.length
      push('comment', src.slice(i, j))
      i = j
      continue
    }
    // string
    if (ch === '"' || ch === "'" || ch === '`') {
      let j = i + 1
      while (j < src.length && src[j] !== ch) {
        if (src[j] === '\\') j++
        j++
      }
      push('string', src.slice(i, j + 1))
      i = j + 1
      continue
    }
    // number
    if (/[0-9]/.test(ch) && !/[A-Za-z_]/.test(src[i - 1] || '')) {
      let j = i
      while (j < src.length && /[0-9.]/.test(src[j])) j++
      push('number', src.slice(i, j))
      i = j
      continue
    }
    // word
    if (/[A-Za-z_$]/.test(ch)) {
      let j = i
      while (j < src.length && /[A-Za-z0-9_$]/.test(src[j])) j++
      const word = src.slice(i, j)
      if (kw.has(word)) push('keyword', word)
      else if (ty.has(word)) push('type', word)
      else if (src[j] === '(') push('fn', word)
      else push('plain', word)
      i = j
      continue
    }
    push('plain', ch)
    i++
  }
  return out
}

/* ---------------------------------------------------------------- typing ---- */

const rootRef = ref<HTMLElement | null>(null)
const active = ref('python')
const shown = ref(0) // characters revealed
const typing = ref(false)
const copied = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null
let idleTimer: ReturnType<typeof setTimeout> | null = null
let observer: IntersectionObserver | null = null
let inView = false
let started = false
let userPicked = false
let reduced = false
let copiedTimer: ReturnType<typeof setTimeout> | null = null

const current = computed(() => samples.value.find((s) => s.id === active.value) || samples.value[0])
const tokens = computed(() => tokenize(current.value))
const total = computed(() => current.value.code.length)
const lineCount = computed(() => current.value.code.split('\n').length)

const visibleTokens = computed<Token[]>(() => {
  const budget = shown.value
  if (budget >= total.value) return tokens.value
  const out: Token[] = []
  let used = 0
  for (const tok of tokens.value) {
    if (used + tok.text.length <= budget) {
      out.push(tok)
      used += tok.text.length
    } else {
      const rest = budget - used
      if (rest > 0) out.push({ type: tok.type, text: tok.text.slice(0, rest) })
      break
    }
  }
  return out
})

function clearTimers() {
  if (timer) clearTimeout(timer)
  if (idleTimer) clearTimeout(idleTimer)
  timer = null
  idleTimer = null
}

function tick() {
  timer = null
  if (!inView) {
    typing.value = false
    return
  }
  const code = current.value.code
  if (shown.value >= code.length) {
    typing.value = false
    // after a pause, move on to the next language unless the reader picked one
    if (!userPicked) {
      idleTimer = setTimeout(() => {
        const list = samples.value
        const idx = list.findIndex((s) => s.id === active.value)
        select(list[(idx + 1) % list.length].id, false)
      }, 6500)
    }
    return
  }
  // type in small bursts, breathe at line ends, hesitate now and then
  const next = code[shown.value]
  const burst = next === '\n' ? 1 : 1 + Math.floor(Math.random() * 3)
  shown.value = Math.min(code.length, shown.value + burst)
  const atLineEnd = code[shown.value - 1] === '\n'
  const delay = atLineEnd ? 140 + Math.random() * 120 : Math.random() < 0.06 ? 160 : 16 + Math.random() * 30
  timer = setTimeout(tick, delay)
}

function begin() {
  clearTimers()
  if (reduced) {
    shown.value = total.value
    typing.value = false
    return
  }
  shown.value = 0
  typing.value = true
  timer = setTimeout(tick, 250)
}

function select(id: string, byUser = true) {
  if (byUser) userPicked = true
  if (id === active.value && shown.value >= total.value) return
  active.value = id
  begin()
}

async function copy() {
  const text = current.value.code
  let ok = false
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      ok = true
    }
  } catch {
    ok = false
  }
  if (!ok) {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', 'true')
    area.style.cssText = 'position:fixed;left:0;top:0;opacity:0;pointer-events:none'
    document.body.appendChild(area)
    area.select()
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    } finally {
      document.body.removeChild(area)
    }
  }
  if (ok) {
    copied.value = true
    if (copiedTimer) clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => (copied.value = false), 1800)
  }
}

watch(
  () => props.baseUrl,
  () => {
    // the samples changed under us: show the current one in full
    if (started) shown.value = total.value
  }
)

onMounted(() => {
  reduced = document.documentElement.dataset.motion === 'reduced'
  const el = rootRef.value
  if (!el) return
  if (typeof IntersectionObserver === 'undefined') {
    inView = true
    started = true
    shown.value = total.value
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      inView = entries.some((e) => e.isIntersecting)
      if (inView && !started) {
        started = true
        begin()
      } else if (inView && !timer && shown.value < total.value) {
        typing.value = true
        timer = setTimeout(tick, 120)
      } else if (!inView) {
        clearTimers()
        typing.value = false
      }
    },
    { threshold: 0.35 }
  )
  observer.observe(el)
})

onBeforeUnmount(() => {
  clearTimers()
  if (copiedTimer) clearTimeout(copiedTimer)
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
.typer {
  --t-bg: #0d0a08;
  --t-line: rgb(240 210 185 / 0.12);
  --t-text: #f3e9df;
  --t-muted: #8e8177;
  position: relative;
  overflow: hidden;
  border-radius: 1.25rem;
  background: var(--t-bg);
  box-shadow:
    0 0 0 1px var(--t-line) inset,
    0 40px 90px -40px rgb(0 0 0 / 0.9);
  font-size: 0.8125rem;
}

.typer-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  border-bottom: 1px solid var(--t-line);
}

.typer-tabs {
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.typer-tabs::-webkit-scrollbar {
  display: none;
}

.typer-tab {
  flex: none;
  border-radius: 9999px;
  padding: 0.35rem 0.8rem;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--t-muted);
  transition:
    background-color 0.2s,
    color 0.2s;
}

.typer-tab:hover {
  color: var(--t-text);
}

.typer-tab.is-active {
  background: rgb(255 240 225 / 0.1);
  color: #fff4ec;
}

.typer-copy {
  display: inline-flex;
  flex: none;
  align-items: center;
  gap: 0.4rem;
  border-radius: 9999px;
  padding: 0.35rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--t-muted);
  transition:
    background-color 0.2s,
    color 0.2s;
}

.typer-copy:hover {
  background: rgb(255 240 225 / 0.08);
  color: var(--t-text);
}

.typer-copy.is-copied {
  color: rgb(var(--signal-a));
}

.typer-body {
  display: flex;
  min-height: 22.5rem;
  overflow-x: auto;
}

.typer-gutter {
  flex: none;
  margin: 0;
  padding: 1.1rem 0 1.1rem 1rem;
  list-style: none;
  text-align: right;
  font-family: theme('fontFamily.mono');
  font-size: 0.72rem;
  line-height: 1.65;
  color: rgb(255 244 236 / 0.22);
  user-select: none;
}

.typer-gutter li {
  padding-right: 1rem;
}

.typer-code {
  margin: 0;
  flex: 1;
  padding: 1.1rem 1.25rem 1.1rem 0;
  font-family: theme('fontFamily.mono');
  font-size: 0.8125rem;
  line-height: 1.65;
  color: var(--t-text);
  tab-size: 4;
  white-space: pre;
}

.typer-caret {
  display: inline-block;
  width: 0.55em;
  height: 1.05em;
  margin-left: 1px;
  vertical-align: -0.15em;
  background: rgb(var(--signal-a));
  box-shadow: 0 0 10px rgb(var(--signal-a) / 0.8);
  opacity: 0;
}

.typer.is-typing .typer-caret {
  opacity: 1;
  animation: typer-blink 1s steps(2, start) infinite;
}

.tok-comment {
  color: #8e8177;
  font-style: italic;
}

.tok-string {
  color: rgb(var(--signal-a));
}

.tok-keyword {
  color: rgb(var(--signal-b));
}

.tok-number {
  color: rgb(var(--signal-c));
}

.tok-fn {
  color: #fff4ec;
}

.tok-type {
  color: #f0a4c0;
}

.typer-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
  margin: 0;
  padding: 0.7rem 1rem;
  border-top: 1px solid var(--t-line);
  font-size: 0.74rem;
  color: var(--t-muted);
}

.typer-foot code {
  font-family: theme('fontFamily.mono');
  color: rgb(255 244 236 / 0.6);
}

.typer-foot-sep {
  width: 1px;
  height: 0.9rem;
  background: var(--t-line);
}

.typer-dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 9999px;
  background: var(--t-muted);
}

.typer-dot.is-live {
  background: rgb(var(--signal-a));
  box-shadow: 0 0 0 0 rgb(var(--signal-a) / 0.6);
  animation: typer-beacon 1.8s ease-out infinite;
}

@keyframes typer-blink {
  to {
    opacity: 0;
  }
}

@keyframes typer-beacon {
  to {
    box-shadow: 0 0 0 7px rgb(var(--signal-a) / 0);
  }
}

html[data-motion='reduced'] .typer-caret,
html[data-motion='reduced'] .typer-dot.is-live {
    animation: none;
  }

</style>
