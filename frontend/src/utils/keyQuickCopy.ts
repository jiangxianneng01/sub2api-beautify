import type { GroupPlatform } from '@/types'
import { buildCodexModelCatalogUrl } from '@/api/codex'

/**
 * One-click snippets for the API keys table.
 *
 * Each option is a ready-to-paste configuration for one client, using the same endpoint
 * rules as the "Use key" dialog (UseKeyModal.vue):
 *   - Claude Code / Anthropic-style clients get the site root — they append /v1/messages
 *   - Codex / OpenAI-style clients get <root>/v1
 *   - Antigravity groups live under <root>/antigravity
 *   - Gemini CLI gets the root and appends its own path
 * The dialog remains the full guide (Windows shells, OpenCode, catalogs); these are the
 * macOS / Linux quick paths for the most common tools.
 */

export interface QuickCopyInput {
  apiKey: string
  baseUrl: string
  platform: GroupPlatform | null | undefined
  claudeCodeOnly?: boolean
  allowMessagesDispatch?: boolean
}

export interface QuickCopyOption {
  /** stable id, e.g. "claude", "codex-config" */
  id: string
  /** i18n key for the menu label */
  labelKey: string
  /** i18n key for the one-line hint under the label */
  hintKey: string
  /** what gets copied */
  content: string
}

const PLATFORM_LABELS: Record<string, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
  gemini: 'Gemini',
  antigravity: 'Antigravity',
  grok: 'Grok',
  kimi: 'Kimi',
  zhipu: 'Zhipu',
  deepseek: 'DeepSeek',
  minimax: 'MiniMax',
  opencode_go: 'OpenCode',
  typesafe: 'TypeSafe / Jev',
  command_code: 'Command Code',
  cline: 'Cline',
  composite: 'Composite'
}

const CODEX_MODELS: Partial<Record<string, string>> = {
  openai: 'gpt-5.5',
  anthropic: 'claude-sonnet-4-6',
  gemini: 'gemini-2.5-pro',
  antigravity: 'claude-sonnet-4-6',
  grok: 'grok-4.5',
  kimi: 'kimi-k2.5',
  zhipu: 'glm-4.7',
  deepseek: 'deepseek-v4-pro',
  minimax: 'MiniMax-M3',
  opencode_go: 'glm-5.3',
  composite: 'gpt-5.5'
}

function escapeToml(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function claudeCodeEnv(root: string, apiKey: string, extra: string[] = []): string {
  return [
    `export ANTHROPIC_BASE_URL="${root}"`,
    `export ANTHROPIC_AUTH_TOKEN="${apiKey}"`,
    ...extra,
    'export CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1'
  ].join('\n')
}

function geminiCliEnv(root: string, apiKey: string): string {
  return [`export GOOGLE_GEMINI_BASE_URL="${root}"`, `export GEMINI_API_KEY="${apiKey}"`].join('\n')
}

function codexOpenAIConfig(apiBase: string, apiKey: string): string {
  const model = CODEX_MODELS.openai || 'gpt-5.5'
  return `model_provider = "OpenAI"
model = "${model}"
review_model = "${model}"
disable_response_storage = true
network_access = "enabled"
windows_wsl_setup_acknowledged = true

[model_providers.OpenAI]
name = "OpenAI"
base_url = "${apiBase}"
model_catalog_url = "${escapeToml(buildCodexModelCatalogUrl(apiBase))}"
wire_api = "responses"
requires_openai_auth = false
experimental_bearer_token = "${escapeToml(apiKey)}"
http_headers = { "x-openai-actor-authorization" = "local-image-extension" }

[features]
api_key_model_discovery = true
goals = true`
}

function codexRoutedConfig(apiBase: string, platform: string): string {
  const label = PLATFORM_LABELS[platform] || platform
  const model = CODEX_MODELS[platform] || ''
  return `# Codex CLI -> JLAi ${label} group
model_provider = "jlai"
model = "${model}"
review_model = "${model}"
disable_response_storage = true

[model_providers.jlai]
name = "JLAi ${label}"
base_url = "${apiBase}"
model_catalog_url = "${escapeToml(buildCodexModelCatalogUrl(apiBase))}"
env_key = "JLAI_API_KEY"
wire_api = "responses"
requires_openai_auth = false
supports_websockets = false

[features]
api_key_model_discovery = true`
}

export function buildQuickCopyOptions(input: QuickCopyInput): QuickCopyOption[] {
  const apiKey = input.apiKey
  const baseUrl = (input.baseUrl || (typeof window !== 'undefined' ? window.location.origin : '')).trim()
  const baseRoot = baseUrl.replace(/\/v1\/?$/, '').replace(/\/+$/, '')
  const apiBase = `${baseRoot}/v1`
  const antigravityRoot = `${baseRoot}/antigravity`
  const platform = input.platform || null

  const options: QuickCopyOption[] = []
  const claude = (root: string, extra: string[] = []) =>
    options.push({ id: 'claude', labelKey: 'keys.quickCopy.claudeCode', hintKey: 'keys.quickCopy.claudeCodeHint', content: claudeCodeEnv(root, apiKey, extra) })
  const gemini = (root: string) =>
    options.push({ id: 'gemini', labelKey: 'keys.quickCopy.geminiCli', hintKey: 'keys.quickCopy.geminiCliHint', content: geminiCliEnv(root, apiKey) })
  const codexRouted = (p: string) => {
    options.push({ id: 'codex-config', labelKey: 'keys.quickCopy.codexConfig', hintKey: 'keys.quickCopy.codexConfigHint', content: codexRoutedConfig(apiBase, p) })
    options.push({ id: 'codex-env', labelKey: 'keys.quickCopy.codexEnv', hintKey: 'keys.quickCopy.codexEnvHint', content: `export JLAI_API_KEY="${apiKey}"` })
  }

  if (input.claudeCodeOnly) {
    claude(platform === 'antigravity' ? antigravityRoot : baseRoot)
  } else {
    switch (platform) {
      case 'openai':
        options.push({ id: 'codex-config', labelKey: 'keys.quickCopy.codexConfig', hintKey: 'keys.quickCopy.codexConfigHint', content: codexOpenAIConfig(apiBase, apiKey) })
        if (input.allowMessagesDispatch) claude(baseRoot)
        break
      case 'gemini':
        gemini(baseRoot)
        codexRouted('gemini')
        break
      case 'antigravity':
        claude(antigravityRoot)
        gemini(antigravityRoot)
        codexRouted('antigravity')
        break
      case 'grok':
        claude(baseRoot, [
          'export ANTHROPIC_MODEL="grok-4.5"',
          'export ANTHROPIC_DEFAULT_SONNET_MODEL="grok-4.5"',
          'export ANTHROPIC_DEFAULT_OPUS_MODEL="grok-4.5"',
          'export ANTHROPIC_DEFAULT_HAIKU_MODEL="grok-4.3"'
        ])
        codexRouted('grok')
        break
      case 'typesafe':
        break
      default:
        claude(baseRoot)
        codexRouted(platform || 'composite')
    }
  }

  options.push({ id: 'key', labelKey: 'keys.quickCopy.keyOnly', hintKey: 'keys.quickCopy.keyOnlyHint', content: apiKey })
  return options
}
