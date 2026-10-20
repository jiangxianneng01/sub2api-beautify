export default {
  batchImageGuide: {
    title: 'Batch Image Generation',
    description: 'Submit multiple prompts in one job and download the generated images when complete'
  },
  // Home Page
  home: {
    viewOnGithub: 'View on GitHub',
    viewDocs: 'View Documentation',
    docs: 'Docs',
    switchToLight: 'Switch to Light Mode',
    switchToDark: 'Switch to Dark Mode',
    dashboard: 'Dashboard',
    login: 'Login',
    getStarted: 'Get Started',
    goToDashboard: 'Go to Dashboard',
    // User-focused value proposition
    heroSubtitle: 'One API for all your models',
    heroDescription: 'Route Claude, GPT, Gemini and other models through a single endpoint and key. Usage is metered per request, with quotas you set.',
    tags: {
      subscriptionToApi: 'Subscription to API',
      stickySession: 'Session Persistence',
      realtimeBilling: 'Pay As You Go'
    },
    // Pain points section
    painPoints: {
      title: 'Sound Familiar?',
      items: {
        expensive: {
          title: 'High Subscription Costs',
          desc: 'Paying for multiple AI subscriptions that add up every month'
        },
        complex: {
          title: 'Account Chaos',
          desc: 'Managing scattered accounts and API keys across different platforms'
        },
        unstable: {
          title: 'Service Interruptions',
          desc: 'Single accounts hitting rate limits and disrupting your workflow'
        },
        noControl: {
          title: 'No Usage Control',
          desc: "Can't track where your money goes or limit team member usage"
        }
      }
    },
    // Solutions section
    solutions: {
      title: 'We Solve These Problems',
      subtitle: 'Three simple steps to stress-free AI access'
    },
    features: {
      unifiedGateway: 'Unified access',
      unifiedGatewayDesc: 'One key and one base URL. Every connected model is reachable through OpenAI- and Anthropic-compatible endpoints.',
      multiAccount: 'Resilient routing',
      multiAccountDesc: 'Requests are balanced across upstream accounts and fail over automatically when one is rate-limited or unavailable.',
      balanceQuota: 'Metered billing',
      balanceQuotaDesc: 'Per-request cost tracking, spending caps per key, and usage reports by model, key and team.'
    },
    // Comparison section
    comparison: {
      title: 'Why Choose Us?',
      headers: {
        feature: 'Comparison',
        official: 'Official Subscriptions',
        us: 'Our Platform'
      },
      items: {
        pricing: {
          feature: 'Pricing',
          official: 'Fixed monthly fee, pay even if unused',
          us: 'Pay only for what you use'
        },
        models: {
          feature: 'Model Selection',
          official: 'Single provider only',
          us: 'Switch between models freely'
        },
        management: {
          feature: 'Account Management',
          official: 'Manage each service separately',
          us: 'Unified key, one dashboard'
        },
        stability: {
          feature: 'Stability',
          official: 'Single account rate limits',
          us: 'Multi-account pool, auto-failover'
        },
        control: {
          feature: 'Usage Control',
          official: 'Not available',
          us: 'Quotas & detailed analytics'
        }
      }
    },
    providers: {
      title: 'Supported AI Models',
      description: 'One API, Multiple Choices',
      supported: 'Supported',
      soon: 'Soon',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: 'More'
    },
    // CTA section
    cta: {
      title: 'Ready to Get Started?',
      description: 'Sign up now and get free trial credits to experience seamless AI access',
      button: 'Sign Up Free'
    },
    // Landing flow illustration (switchyard)
    flow: {
      title: 'How a request is routed',
      lead: 'Your application calls one endpoint. The gateway selects an available upstream account, keeps the session pinned to it, and records the tokens used.',
      illustrative: 'Simulated traffic',
      play: 'Play',
      pause: 'Pause',
      description:
        'Illustration: your app sends every request to one gateway, which routes it to a healthy upstream account and meters the tokens it used.',
      client: 'Your app',
      gateway: 'Gateway',
      upstream: 'Upstream pool',
      ledger: {
        session: 'Session',
        model: 'Model',
        route: 'Routed to',
        tokens: 'Tokens',
        cost: 'Cost'
      }
    },
    solar: {
      hint: 'Drag to rotate · Click a planet to follow',
      description:
        'Decorative 3D solar system: the Sun, eight planets with their moons and rings, the asteroid and Kuiper belts and a comet, all in motion.',
      credit: 'Planet textures: Solar System Scope (CC BY 4.0) · NASA',
    },
    scrollCue: 'Scroll',
    integrate: {
      title: 'Integrate in minutes',
      lead: 'Use the SDK you already have. Change the base URL and the API key; nothing else in your code needs to change.',
      steps: {
        key: 'Create an API key in the console',
        base: 'Set the base URL to this gateway',
        call: 'Call any connected model'
      },
      languages: 'Languages',
      copy: 'Copy',
      writing: 'Generating example…',
      ready: 'Ready to run',
      note: 'OpenAI-compatible Chat Completions and Anthropic-compatible Messages endpoints are available on the same key.'
    },
    studios: {
      title: 'Image and video generation',
      lead: 'The gateway also serves image and video models. Two workspaces in the console run them with your own keys, with a built-in prompt skill library and live progress.',
      imageAlt: 'The image studio after a run: key and model in the top bar, the finished picture in the viewfinder, the prompt and controls below',
      imageTitle: 'Image studio',
      imageDesc: 'Choose a key and a model, write a prompt or start from a built-in skill, and watch partial renders stream into the viewfinder. Billed per image at your group rate.',
      openImage: 'Open Image Studio',
      videoAlt: 'The video studio after a run: the job timeline above the monitor, the finished clip playing, the transport controls below',
      videoTitle: 'Video studio',
      videoDesc: 'Submit a prompt or a reference frame, follow the job from queue to render on the monitor, and download the clip when it lands.',
      openVideo: 'Open Video Studio'
    },
    support: {
      title: 'Support',
      lead: 'Documentation, direct contact and your console.',
      docs: 'Documentation',
      docsDesc: 'Endpoints, supported models, limits and code samples.',
      github: 'GitHub',
      githubDesc: 'Source, releases and the issue tracker.',
      contact: 'Contact',
      contactDesc: 'Reach the team operating this gateway.',
      dashboard: 'Console',
      dashboardDesc: 'Keys, usage and balance.'
    },
    baseUrl: 'API base URL',
    copyBaseUrl: 'Copy API base URL',
    copied: 'Copied',
    footer: {
      allRightsReserved: 'All rights reserved.'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key Usage',
    subtitle: 'Enter your API Key to view real-time spending and usage status',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: 'Query',
    querying: 'Querying...',
    privacyNote: 'Your Key is processed locally in the browser and will not be stored',
    dateRange: 'Date Range:',
    dateRangeToday: 'Today',
    dateRange7d: '7 Days',
    dateRange30d: '30 Days',
    dateRange90d: '90 Days',
    dateRangeCustom: 'Custom',
    apply: 'Apply',
    used: 'Used',
    detailInfo: 'Detail Information',
    tokenStats: 'Token Statistics',
    dailyDetail: 'Daily Detail',
    modelStats: 'Model Usage Statistics',
    // Table headers
    date: 'Date',
    model: 'Model',
    requests: 'Requests',
    inputTokens: 'Input Tokens',
    outputTokens: 'Output Tokens',
    cacheCreationTokens: 'Cache Creation',
    cacheReadTokens: 'Cache Read',
    cacheWriteTokens: 'Cache Write',
    totalTokens: 'Total Tokens',
    cost: 'Cost',
    // Status
    quotaMode: 'Key Quota Mode',
    walletBalance: 'Wallet Balance',
    // Ring card titles
    totalQuota: 'Total Quota',
    limit5h: '5-Hour Limit',
    limitDaily: 'Daily Limit',
    limit7d: '7-Day Limit',
    limitWeekly: 'Weekly Limit',
    limitMonthly: 'Monthly Limit',
    // Detail rows
    remainingQuota: 'Remaining Quota',
    expiresAt: 'Expires At',
    todayExpires: '(expires today)',
    daysLeft: '({days} days)',
    usedQuota: 'Used Quota',
    resetNow: 'Resetting soon',
    subscriptionType: 'Subscription Type',
    billingType: 'Billing Type',
    subscriptionExpires: 'Subscription Expires',
    // Usage stat cells
    todayRequests: 'Today Requests',
    todayInputTokens: 'Today Input',
    todayOutputTokens: 'Today Output',
    todayTokens: 'Today Tokens',
    todayCacheCreation: 'Today Cache Creation',
    todayCacheRead: 'Today Cache Read',
    todayCost: 'Today Cost',
    rpmTpm: 'RPM / TPM',
    totalRequests: 'Total Requests',
    totalInputTokens: 'Total Input',
    totalOutputTokens: 'Total Output',
    totalTokensLabel: 'Total Tokens',
    totalCacheCreation: 'Total Cache Creation',
    totalCacheRead: 'Total Cache Read',
    totalCost: 'Total Cost',
    avgDuration: 'Avg Duration',
    // Messages
    enterApiKey: 'Please enter an API Key',
    querySuccess: 'Query successful',
    queryFailed: 'Query failed',
    queryFailedRetry: 'Query failed, please try again later',
    noDailyUsage: 'No daily usage data',
  },

  // Setup Wizard
  setup: {
    title: 'JLAi Setup',
    description: 'Configure your JLAi instance',
    database: {
      title: 'Database Configuration',
      description: 'Connect to your PostgreSQL database',
      host: 'Host',
      port: 'Port',
      username: 'Username',
      password: 'Password',
      databaseName: 'Database Name',
      sslMode: 'SSL Mode',
      passwordPlaceholder: 'Password',
      ssl: {
        disable: 'Disable',
        require: 'Require',
        verifyCa: 'Verify CA',
        verifyFull: 'Verify Full'
      }
    },
    redis: {
      title: 'Redis Configuration',
      description: 'Connect to your Redis server',
      host: 'Host',
      port: 'Port',
      username: 'Username (optional)',
      password: 'Password (optional)',
      database: 'Database',
      usernamePlaceholder: 'Leave empty for default user',
      passwordPlaceholder: 'Password',
      enableTls: 'Enable TLS',
      enableTlsHint: 'Use TLS when connecting to Redis (public CA certs)'
    },
    admin: {
      title: 'Admin Account',
      description: 'Create your administrator account',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      passwordPlaceholder: 'Min 8 characters',
      confirmPasswordPlaceholder: 'Confirm password',
      passwordMismatch: 'Passwords do not match'
    },
    ready: {
      title: 'Ready to Install',
      description: 'Review your configuration and complete setup',
      database: 'Database',
      redis: 'Redis',
      adminEmail: 'Admin Email'
    },
    status: {
      testing: 'Testing...',
      success: 'Connection Successful',
      testConnection: 'Test Connection',
      installing: 'Installing...',
      completeInstallation: 'Complete Installation',
      completed: 'Installation completed!',
      redirecting: 'Redirecting to login page...',
      restarting: 'Service is restarting, please wait...',
      timeout: 'Service restart is taking longer than expected. Please refresh the page manually.'
    }
  },

  // Common
}
