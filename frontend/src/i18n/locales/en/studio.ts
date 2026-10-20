export default {
  studio: {
    prompt: 'Prompt',
    optional: 'optional',
    cancel: 'Cancel',
    download: 'Download',
    reusePrompt: 'Reuse prompt',
    open: 'Open',
    clear: 'Clear',
    gallery: 'This session · {count}',
    takes: 'Takes',
    clips: 'Clips',
    random: 'Random prompt',
    skills: {
      title: 'Prompt skills',
      hint: 'Start from a template, or layer a style onto what you already wrote. Chips toggle single modifiers.',
      use: 'Use template',
      layer: 'Layer style',
      subject: '[your subject]',
      close: 'Close'
    },
    phases: {
      idle: 'Ready',
      sending: 'Sending…',
      polling: 'Queued upstream…',
      rendering: 'Rendering…',
      done: 'Done',
      error: 'Failed'
    },
    log: {
      sent: 'Request sent to {model}',
      accepted: 'Accepted · {id}',
      partial: 'Partial render {index} arrived',
      done: 'Image {index} of {total} finished',
      finished: 'Finished in {seconds}s',
      stillRendering: 'Still rendering · {seconds}s',
      downloading: 'Fetching the finished video…',
      empty: 'The gateway returned no images',
      noVideo: 'The job finished without a video',
      timeout: 'Gave up waiting for the video',
      cancelled: 'Cancelled',
      failed: 'Failed: {message}'
    },
    picker: {
      key: 'API key',
      manageKeys: 'Manage keys',
      noKeys: 'You have no active API keys yet.',
      createKey: 'Create one',
      noGroup: 'No group',
      model: 'Model',
      noModels: 'No image or video models are available for this key.',
      assumed: 'platform defaults',
      customModel: 'Or type a model name',
      keyCannotImage: 'This key’s group cannot generate images here. Pick a key on an OpenAI or Grok group.',
      keyCannotVideo: 'This key’s group cannot generate videos here. Pick a key on a Grok or composite group.'
    },
    image: {
      title: 'Image studio',
      subtitle: 'Generate images with your own API key. Each request is billed like any other API call.',
      promptPlaceholder: 'A lighthouse on a basalt cliff at dusk, long exposure, warm lamplight…',
      generate: 'Generate',
      shape: 'Shape',
      shapes: { square: 'Square', landscape: 'Landscape', portrait: 'Portrait' },
      quality: 'Quality',
      qualities: { auto: 'Auto', low: 'Low', medium: 'Medium', high: 'High' },
      count: 'Count',
      estimate: 'About {price} for this run',
      billingNote: 'Billed to the selected key at your group’s image rate',
      idle: 'Select a key and a model, enter a prompt, then press ⌘↵',
      starters: [
        'A porcelain teacup orbiting a tiny sun, studio lighting, macro photography',
        'Isometric cutaway of a lighthouse library, warm interior light, soft shadows',
        'A quiet mountain station at blue hour, film grain, 35mm'
      ]
    },
    video: {
      title: 'Video studio',
      subtitle: 'Generate video from a prompt or a reference image and track the job to completion.',
      promptPlaceholder: 'Slow dolly through a rain-soaked night market, neon reflections, cinematic…',
      generate: 'Render video',
      referenceImage: 'Reference image',
      referenceImagePlaceholder: 'https://… (image-to-video)',
      aspect: 'Aspect',
      duration: 'Duration',
      resolution: 'Resolution',
      billingNote: 'Billed to the selected key by duration and resolution',
      idle: 'Select a key and a model, enter a prompt, then press ⌘↵',
      copyId: 'Copy job id',
      steps: { submitted: 'Submitted', queued: 'Queued', rendering: 'Rendering', ready: 'Ready' },
      starters: [
        'A paper boat drifting down a rain gutter, close up, morning light',
        'Aerial pull-back from a lone cabin as snow starts to fall',
        'Macro of ink blooming in water, slow motion, black backdrop'
      ]
    }
  }
}
