export default {
  batchImageGuide: {
    title: '图片批量生成',
    description: '一次提交多条提示词，任务完成后可统一下载图片结果'
  },
  // Home Page
  home: {
    viewOnGithub: '在 GitHub 上查看',
    viewDocs: '查看文档',
    docs: '文档',
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
    dashboard: '控制台',
    login: '登录',
    getStarted: '立即开始',
    goToDashboard: '进入控制台',
    // 新增：面向用户的价值主张
    heroSubtitle: '统一接口，接入全部模型',
    heroDescription: 'Claude、GPT、Gemini 等模型统一经由一个地址和一把密钥调用，按请求计量，额度由你设定。',
    tags: {
      subscriptionToApi: '订阅转 API',
      stickySession: '会话保持',
      realtimeBilling: '按量计费'
    },
    // 用户痛点区块
    painPoints: {
      title: '你是否也遇到这些问题？',
      items: {
        expensive: {
          title: '订阅费用高',
          desc: '每个 AI 服务都要单独订阅，每月支出越来越多'
        },
        complex: {
          title: '多账号难管理',
          desc: '不同平台的账号、密钥分散各处，管理起来很麻烦'
        },
        unstable: {
          title: '服务不稳定',
          desc: '单一账号容易触发限制，影响正常使用'
        },
        noControl: {
          title: '用量无法控制',
          desc: '不知道钱花在哪了，也无法限制团队成员的使用'
        }
      }
    },
    // 解决方案区块
    solutions: {
      title: '我们帮你解决',
      subtitle: '简单三步，开始省心使用 AI'
    },
    features: {
      unifiedGateway: '统一接入',
      unifiedGatewayDesc: '一把密钥、一个地址，所有已接入模型均可通过 OpenAI 与 Anthropic 兼容接口调用。',
      multiAccount: '稳定路由',
      multiAccountDesc: '请求在多个上游账号间分配，遇到限流或不可用时自动切换。',
      balanceQuota: '按量计费',
      balanceQuotaDesc: '逐请求记录成本，可为每把密钥设置支出上限，按模型、密钥与团队查看用量。'
    },
    // 优势对比
    comparison: {
      title: '为什么选择我们？',
      headers: {
        feature: '对比项',
        official: '官方订阅',
        us: '本平台'
      },
      items: {
        pricing: {
          feature: '付费方式',
          official: '固定月费，用不完也付',
          us: '按量付费，用多少付多少'
        },
        models: {
          feature: '模型选择',
          official: '单一服务商',
          us: '多模型随意切换'
        },
        management: {
          feature: '账号管理',
          official: '每个服务单独管理',
          us: '统一密钥，一站管理'
        },
        stability: {
          feature: '服务稳定性',
          official: '单账号易触发限制',
          us: '多账号池，自动切换'
        },
        control: {
          feature: '用量控制',
          official: '无法限制',
          us: '可设配额、查明细'
        }
      }
    },
    providers: {
      title: '已支持的 AI 模型',
      description: '一个 API，多种选择',
      supported: '已支持',
      soon: '即将推出',
      claude: 'Claude',
      gemini: 'Gemini',
      antigravity: 'Antigravity',
      more: '更多'
    },
    // CTA 区块
    cta: {
      title: '准备好开始了吗？',
      description: '注册即可获得免费试用额度，体验一站式 AI 服务',
      button: '免费注册'
    },
    // 首页路由示意（switchyard）
    flow: {
      title: '请求的路由方式',
      lead: '应用只调用一个地址。网关选择可用的上游账号，保持会话固定在该账号，并记录消耗的 Tokens。',
      illustrative: '模拟流量',
      play: '播放',
      pause: '暂停',
      description: '示意图：你的应用把每个请求发到同一个网关，网关将其路由到健康的上游账号，并按实际消耗的 Tokens 计费。',
      client: '你的应用',
      gateway: '网关',
      upstream: '上游账号池',
      ledger: {
        session: '会话',
        model: '模型',
        route: '路由至',
        tokens: 'Tokens',
        cost: '费用'
      }
    },
    solar: {
      hint: '拖拽旋转 · 点击行星跟随',
      description: '装饰性 3D 太阳系：太阳、八大行星及其卫星与光环、小行星带、柯伊伯带和一颗彗星，持续运转。',
      credit: '行星贴图：Solar System Scope（CC BY 4.0）· NASA'
    },
    scrollCue: '向下滚动',
    integrate: {
      title: '几分钟完成接入',
      lead: '沿用现有 SDK，只需修改 base URL 与 API 密钥，其余代码保持不变。',
      steps: {
        key: '在控制台创建 API 密钥',
        base: '将 base URL 指向本网关',
        call: '调用任意已接入模型'
      },
      languages: '语言',
      copy: '复制',
      writing: '生成示例中…',
      ready: '可直接运行',
      note: '同一把密钥同时支持 OpenAI 兼容的 Chat Completions 与 Anthropic 兼容的 Messages 接口。'
    },
    studios: {
      title: '图像与视频生成',
      lead: '网关同时提供图像与视频模型。控制台内置两个工作区，用你自己的密钥运行，自带提示词技能库与实时进度。',
      imageAlt: '生图工作区完成一次生成后的界面：顶部是密钥与模型，取景器里是成图，下方是提示词与参数',
      imageTitle: '生图工作区',
      imageDesc: '选择密钥与模型，输入提示词或从内置技能模板开始，预览帧会流式出现在取景器里；按分组图片价格计费。',
      openImage: '进入生图工作区',
      videoAlt: '生视频工作区完成一次渲染后的界面：监视器上方是任务进度，成片正在播放，下方是走带控制',
      videoTitle: '生视频工作区',
      videoDesc: '提交提示词或参考帧，在监视器上跟踪任务从排队到渲染，成片落地后直接下载。',
      openVideo: '进入生视频工作区'
    },
    support: {
      title: '技术支持',
      lead: '文档、联系方式与控制台。',
      docs: '文档',
      docsDesc: '接口说明、支持的模型、限额与代码示例。',
      github: 'GitHub',
      githubDesc: '源码、发布记录与问题追踪。',
      contact: '联系我们',
      contactDesc: '联系运营本网关的团队。',
      dashboard: '控制台',
      dashboardDesc: '密钥、用量与余额。'
    },
    baseUrl: 'API 地址',
    copyBaseUrl: '复制 API 地址',
    copied: '已复制',
    footer: {
      allRightsReserved: '保留所有权利。'
    }
  },

  // Key Usage Query Page
  keyUsage: {
    title: 'API Key 用量查询',
    subtitle: '输入您的 API Key 以查看实时消费金额与使用状态',
    placeholder: 'sk-ant-mirror-xxxxxxxxxxxx',
    query: '查询',
    querying: '查询中...',
    privacyNote: '您的 Key 仅在浏览器本地处理，不会被存储',
    dateRange: '统计范围:',
    dateRangeToday: '今日',
    dateRange7d: '7 天',
    dateRange30d: '30 天',
    dateRange90d: '90 天',
    dateRangeCustom: '自定义',
    apply: '应用',
    used: '已使用',
    detailInfo: '详细信息',
    tokenStats: 'Token 统计',
    dailyDetail: '按日明细',
    modelStats: '模型用量统计',
    // Table headers
    date: '日期',
    model: '模型',
    requests: '请求数',
    inputTokens: '输入 Tokens',
    outputTokens: '输出 Tokens',
    cacheCreationTokens: '缓存创建',
    cacheReadTokens: '缓存读取',
    cacheWriteTokens: '缓存写入',
    totalTokens: '总 Tokens',
    cost: '费用',
    // Status
    quotaMode: 'Key 限额模式',
    walletBalance: '钱包余额',
    // Ring card titles
    totalQuota: '总额度',
    limit5h: '5 小时限额',
    limitDaily: '日限额',
    limit7d: '7 天限额',
    limitWeekly: '周限额',
    limitMonthly: '月限额',
    // Detail rows
    remainingQuota: '剩余额度',
    expiresAt: '过期时间',
    todayExpires: '(今日到期)',
    daysLeft: '({days} 天)',
    usedQuota: '已用额度',
    resetNow: '即将重置',
    subscriptionType: '订阅类型',
    billingType: '计费方式',
    subscriptionExpires: '订阅到期',
    // Usage stat cells
    todayRequests: '今日请求',
    todayInputTokens: '今日输入',
    todayOutputTokens: '今日输出',
    todayTokens: '今日 Tokens',
    todayCacheCreation: '今日缓存创建',
    todayCacheRead: '今日缓存读取',
    todayCost: '今日费用',
    rpmTpm: 'RPM / TPM',
    totalRequests: '累计请求',
    totalInputTokens: '累计输入',
    totalOutputTokens: '累计输出',
    totalTokensLabel: '累计 Tokens',
    totalCacheCreation: '累计缓存创建',
    totalCacheRead: '累计缓存读取',
    totalCost: '累计费用',
    avgDuration: '平均耗时',
    // Messages
    enterApiKey: '请输入 API Key',
    querySuccess: '查询成功',
    queryFailed: '查询失败',
    queryFailedRetry: '查询失败，请稍后重试',
    noDailyUsage: '暂无按日用量数据',
  },

  // Setup Wizard
  setup: {
    title: 'JLAi 安装向导',
    description: '配置您的 JLAi 实例',
    database: {
      title: '数据库配置',
      description: '连接到您的 PostgreSQL 数据库',
      host: '主机',
      port: '端口',
      username: '用户名',
      password: '密码',
      databaseName: '数据库名称',
      sslMode: 'SSL 模式',
      passwordPlaceholder: '密码',
      ssl: {
        disable: '禁用',
        require: '要求',
        verifyCa: '验证 CA',
        verifyFull: '完全验证'
      }
    },
    redis: {
      title: 'Redis 配置',
      description: '连接到您的 Redis 服务器',
      host: '主机',
      port: '端口',
      username: '用户名（可选）',
      password: '密码（可选）',
      database: '数据库',
      usernamePlaceholder: '默认用户留空',
      passwordPlaceholder: '密码',
      enableTls: '启用 TLS',
      enableTlsHint: '连接 Redis 时使用 TLS（公共 CA 证书）'
    },
    admin: {
      title: '管理员账户',
      description: '创建您的管理员账户',
      email: '邮箱',
      password: '密码',
      confirmPassword: '确认密码',
      passwordPlaceholder: '至少 8 个字符',
      confirmPasswordPlaceholder: '确认密码',
      passwordMismatch: '密码不匹配'
    },
    ready: {
      title: '准备安装',
      description: '检查您的配置并完成安装',
      database: '数据库',
      redis: 'Redis',
      adminEmail: '管理员邮箱'
    },
    status: {
      testing: '测试中...',
      success: '连接成功',
      testConnection: '测试连接',
      installing: '安装中...',
      completeInstallation: '完成安装',
      completed: '安装完成！',
      redirecting: '正在跳转到登录页面...',
      restarting: '服务正在重启，请稍候...',
      timeout: '服务重启时间超出预期，请手动刷新页面。'
    }
  },

  // Common
}
