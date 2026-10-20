export default {
  studio: {
    prompt: '提示词',
    optional: '可选',
    cancel: '取消',
    download: '下载',
    reusePrompt: '复用提示词',
    open: '打开',
    clear: '清空',
    gallery: '本次会话 · {count}',
    takes: '本次出图',
    clips: '本次片段',
    random: '随机提示词',
    skills: {
      title: '提示词技能',
      hint: '从模板开始，或把风格叠加到你已写好的提示词上；下面的修饰词可以单个开关。',
      use: '使用模板',
      layer: '叠加风格',
      subject: '[你的主体]',
      close: '关闭'
    },
    phases: {
      idle: '就绪',
      sending: '发送中…',
      polling: '上游排队中…',
      rendering: '渲染中…',
      done: '完成',
      error: '失败'
    },
    log: {
      sent: '已把请求发给 {model}',
      accepted: '已受理 · {id}',
      partial: '第 {index} 帧预览到达',
      done: '第 {index} / {total} 张已完成',
      finished: '{seconds} 秒完成',
      stillRendering: '仍在渲染 · {seconds} 秒',
      downloading: '正在取回成片…',
      empty: '网关没有返回图片',
      noVideo: '任务结束但没有视频',
      timeout: '等待视频超时',
      cancelled: '已取消',
      failed: '失败：{message}'
    },
    picker: {
      key: 'API 密钥',
      manageKeys: '管理密钥',
      noKeys: '你还没有可用的 API 密钥。',
      createKey: '去创建',
      noGroup: '未分组',
      model: '模型',
      noModels: '这个密钥没有可用的生图 / 生视频模型。',
      assumed: '平台默认',
      customModel: '或手动输入模型名',
      keyCannotImage: '这个密钥所在的分组不能在这里生图，请换一个 OpenAI 或 Grok 分组的密钥。',
      keyCannotVideo: '这个密钥所在的分组不能在这里生视频，请换一个 Grok 或聚合分组的密钥。'
    },
    image: {
      title: '生图工作区',
      subtitle: '使用自己的 API 密钥生成图像，每次请求按普通 API 调用计费。',
      promptPlaceholder: '黄昏时分玄武岩悬崖上的灯塔，长曝光，暖黄灯光…',
      generate: '生成',
      shape: '画幅',
      shapes: { square: '方形', landscape: '横版', portrait: '竖版' },
      quality: '质量',
      qualities: { auto: '自动', low: '低', medium: '中', high: '高' },
      count: '数量',
      estimate: '本次约 {price}',
      billingNote: '按所选密钥所在分组的生图价格计费',
      idle: '选择密钥与模型，输入提示词，按 ⌘↵',
      starters: [
        '一只瓷茶杯绕着一颗小太阳公转，棚拍布光，微距摄影',
        '灯塔图书馆的等轴剖面图，暖色室内光，柔和阴影',
        '蓝调时刻安静的山间车站，胶片颗粒，35mm'
      ]
    },
    video: {
      title: '生视频工作区',
      subtitle: '通过提示词或参考图生成视频，并跟踪任务直至完成。',
      promptPlaceholder: '缓慢推轨穿过雨后的夜市，霓虹倒影，电影感…',
      generate: '渲染视频',
      referenceImage: '参考图',
      referenceImagePlaceholder: 'https://…（图生视频）',
      aspect: '画幅',
      duration: '时长',
      resolution: '分辨率',
      billingNote: '按所选密钥、时长与分辨率计费',
      idle: '选择密钥与模型，输入提示词，按 ⌘↵',
      copyId: '复制任务 ID',
      steps: { submitted: '已提交', queued: '排队中', rendering: '渲染中', ready: '已完成' },
      starters: [
        '一只纸船顺着雨水沟漂流，特写，清晨光线',
        '航拍从一间孤零零的小木屋拉远，雪开始落下',
        '墨水在水中晕开的微距镜头，慢动作，黑色背景'
      ]
    }
  }
}
