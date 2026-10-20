/**
 * Built-in prompt skills for the image and video studios.
 *
 * Each skill is a structured recipe — subject, scene, style, lighting, camera, mood —
 * written the way the current image/video models respond to best: plain descriptive
 * sentences rather than keyword soup. The wording follows widely shared prompting
 * practice (OpenAI's image prompting guide, the Midjourney / Stable Diffusion community
 * style references and the awesome-prompts collections on GitHub), rewritten here.
 *
 * `{subject}` is replaced by what the user is picturing; `style` is the short form that
 * can be layered onto a prompt the user already wrote.
 */

export type StudioLocale = 'en' | 'zh'
export interface L10n {
  en: string
  zh: string
}

export type ImageCategory = 'photo' | 'illustration' | 'render' | 'art'
export type VideoCategory = 'camera' | 'genre'

export interface StudioSkill {
  id: string
  kind: 'image' | 'video'
  category: ImageCategory | VideoCategory
  name: L10n
  desc: L10n
  template: L10n
  style: L10n
  /** two hues for the swatch, as CSS colours */
  tone: [string, string]
}

export interface ModifierGroup {
  id: string
  kind: 'image' | 'video'
  label: L10n
  items: Array<{ id: string; text: L10n }>
}

export const SKILL_CATEGORIES: Record<ImageCategory | VideoCategory, L10n> = {
  photo: { en: 'Photography', zh: '摄影' },
  illustration: { en: 'Illustration', zh: '插画' },
  render: { en: 'Design & 3D', zh: '设计与 3D' },
  art: { en: 'Fine art', zh: '艺术风格' },
  camera: { en: 'Camera moves', zh: '镜头运动' },
  genre: { en: 'Genres', zh: '片种' }
}

export const STUDIO_SKILLS: StudioSkill[] = [
  /* ----------------------------------------------------------- image / photo */
  {
    id: 'cinematic-still',
    kind: 'image',
    category: 'photo',
    name: { en: 'Cinematic still', zh: '电影剧照' },
    desc: { en: 'Anamorphic framing, shallow focus, graded like a film.', zh: '宽银幕构图、浅景深、电影级调色。' },
    template: {
      en: 'Cinematic film still of {subject}, anamorphic 2.39:1 framing, shallow depth of field, soft motivated lighting from one source, subtle film grain, teal and amber colour grade, quiet dramatic mood',
      zh: '{subject}的电影剧照，2.39:1 宽银幕构图，浅景深，单一光源的柔和动机光，轻微胶片颗粒，青橙色调，安静而有张力的氛围'
    },
    style: { en: 'cinematic film still, anamorphic framing, shallow depth of field, film grain, teal and amber grade', zh: '电影剧照质感，宽银幕构图，浅景深，胶片颗粒，青橙色调' },
    tone: ['#ff6a3d', '#2a6f7a']
  },
  {
    id: 'editorial-portrait',
    kind: 'image',
    category: 'photo',
    name: { en: 'Editorial portrait', zh: '杂志人像' },
    desc: { en: '85mm, window light, honest skin texture.', zh: '85mm 镜头、窗光、真实的皮肤质感。' },
    template: {
      en: 'Editorial portrait of {subject}, 85mm lens at f/2, soft window light from the left, catchlight in the eyes, neutral seamless backdrop, natural skin texture, calm expression, magazine cover composition',
      zh: '{subject}的杂志风人像，85mm 镜头 f/2，左侧柔和窗光，眼睛里有高光，中性无缝背景，真实的皮肤质感，平静的表情，杂志封面构图'
    },
    style: { en: 'editorial portrait, 85mm at f/2, soft window light, natural skin texture', zh: '杂志风人像，85mm f/2，柔和窗光，真实皮肤质感' },
    tone: ['#e5487f', '#5a2238']
  },
  {
    id: 'product-hero',
    kind: 'image',
    category: 'photo',
    name: { en: 'Product hero', zh: '产品主图' },
    desc: { en: 'Studio sweep, three-point softboxes, clean for e-commerce.', zh: '无缝背景、三点柔光，干净的电商主图。' },
    template: {
      en: 'Studio product photograph of {subject} on a seamless backdrop, three-point softbox lighting, crisp controlled reflections, slight top-down angle, clean e-commerce presentation, no text or labels',
      zh: '{subject}的棚拍产品照，无缝背景，三点柔光箱布光，清晰可控的反光，略俯视角度，干净的电商展示，不含文字和标签'
    },
    style: { en: 'studio product photo, seamless backdrop, softbox lighting, clean e-commerce presentation', zh: '棚拍产品照，无缝背景，柔光箱布光，干净的电商风格' },
    tone: ['#ffb547', '#8a5a2a']
  },
  {
    id: 'food-overhead',
    kind: 'image',
    category: 'photo',
    name: { en: 'Overhead food', zh: '俯拍美食' },
    desc: { en: 'Top-down table, daylight, appetising warmth.', zh: '俯视餐桌、自然光、温暖诱人。' },
    template: {
      en: 'Overhead food photograph of {subject} on a linen tablecloth, natural daylight from a side window, a few rustic props, shallow styling, warm appetising tones, slight steam',
      zh: '{subject}的俯拍美食照，亚麻桌布，侧窗自然光，少量质朴道具，简洁摆盘，温暖诱人的色调，微微热气'
    },
    style: { en: 'overhead food photography, side-window daylight, linen tablecloth, warm appetising tones', zh: '俯拍美食摄影，侧窗自然光，亚麻桌布，温暖诱人的色调' },
    tone: ['#ff8a5c', '#6b3a1f']
  },
  {
    id: 'macro',
    kind: 'image',
    category: 'photo',
    name: { en: 'Macro detail', zh: '微距特写' },
    desc: { en: '1:1 magnification, focus-stacked, dark field.', zh: '1:1 放大、堆栈对焦、暗背景。' },
    template: {
      en: 'Extreme macro photograph of {subject}, 1:1 magnification, focus-stacked sharpness across the detail, soft diffused light, dark uncluttered background, fine textures visible',
      zh: '{subject}的极致微距照片，1:1 放大，堆栈对焦细节处处清晰，柔和漫射光，深色干净背景，细微纹理可见'
    },
    style: { en: 'extreme macro, focus-stacked detail, soft diffused light, dark background', zh: '极致微距，堆栈对焦细节，柔和漫射光，深色背景' },
    tone: ['#5bb2be', '#1f4e55']
  },
  {
    id: 'golden-landscape',
    kind: 'image',
    category: 'photo',
    name: { en: 'Golden-hour landscape', zh: '黄金时刻风景' },
    desc: { en: 'Wide 24mm, low sun, layered haze.', zh: '24mm 广角、低角度阳光、层层薄雾。' },
    template: {
      en: 'Wide landscape photograph of {subject} at golden hour, 24mm lens, low sun with gentle flare, atmospheric haze separating the layers of depth, long-exposure calm, rich but natural colour',
      zh: '{subject}在黄金时刻的广角风景照，24mm 镜头，低角度阳光带一点眩光，薄雾把远近层次分开，长曝光般的宁静，浓郁而自然的色彩'
    },
    style: { en: 'golden hour, 24mm wide landscape, atmospheric haze, layered depth', zh: '黄金时刻，24mm 广角风景，大气薄雾，层次纵深' },
    tone: ['#ffb547', '#c8441b']
  },
  {
    id: 'street-night',
    kind: 'image',
    category: 'photo',
    name: { en: 'Night street', zh: '夜景街拍' },
    desc: { en: 'Wet pavement, neon, candid 35mm.', zh: '湿漉漉的路面、霓虹、35mm 抓拍。' },
    template: {
      en: 'Night street photograph of {subject}, wet pavement reflecting neon signs, 35mm lens, candid unposed moment, high-ISO grain, mixed colour temperatures, cinematic city atmosphere',
      zh: '{subject}的夜景街拍，湿漉漉的路面倒映着霓虹招牌，35mm 镜头，不摆拍的抓拍瞬间，高感光颗粒，混合色温，电影感的城市氛围'
    },
    style: { en: 'night street photography, neon reflections on wet pavement, 35mm, high-ISO grain', zh: '夜景街拍，湿路面霓虹倒影，35mm，高感颗粒' },
    tone: ['#e5487f', '#2a1620']
  },
  {
    id: 'architecture',
    kind: 'image',
    category: 'photo',
    name: { en: 'Architecture', zh: '建筑摄影' },
    desc: { en: 'Corrected verticals, overcast light, clean lines.', zh: '校正垂直线、阴天柔光、干净线条。' },
    template: {
      en: 'Architectural photograph of {subject}, corrected verticals, two-point perspective, soft overcast light, minimal people, clean geometric lines, materials rendered faithfully',
      zh: '{subject}的建筑摄影，垂直线已校正，两点透视，阴天柔光，画面里几乎没有人，干净的几何线条，材质还原真实'
    },
    style: { en: 'architectural photography, corrected verticals, overcast soft light, clean geometry', zh: '建筑摄影，校正垂直线，阴天柔光，干净的几何感' },
    tone: ['#ada49a', '#3a332e']
  },

  /* ---------------------------------------------------- image / illustration */
  {
    id: 'flat-vector',
    kind: 'image',
    category: 'illustration',
    name: { en: 'Flat vector', zh: '扁平矢量' },
    desc: { en: 'Bold shapes, five colours, no gradients.', zh: '大块几何、五色限定、无渐变。' },
    template: {
      en: 'Flat vector illustration of {subject}, bold geometric shapes, a limited palette of five colours, no gradients or outlines, clean edges, generous negative space, suitable as an app hero graphic',
      zh: '{subject}的扁平矢量插画，大块几何形状，限定五种颜色，无渐变无描边，边缘干净，留白充分，适合做应用的首屏图'
    },
    style: { en: 'flat vector illustration, bold geometric shapes, limited five-colour palette, no gradients', zh: '扁平矢量插画，大块几何形状，限定五色，无渐变' },
    tone: ['#ff6a3d', '#ffb547']
  },
  {
    id: 'isometric',
    kind: 'image',
    category: 'illustration',
    name: { en: 'Isometric', zh: '等距视角' },
    desc: { en: '30° angles, pastel, tiny details.', zh: '30° 等距、粉彩色、小细节。' },
    template: {
      en: 'Isometric illustration of {subject}, true 30-degree angles, soft ambient shadows, pastel palette, lots of tiny readable details, plain white background',
      zh: '{subject}的等距视角插画，标准 30 度角，柔和的环境阴影，粉彩配色，大量可辨认的小细节，纯白背景'
    },
    style: { en: 'isometric illustration, 30-degree angles, soft shadows, pastel palette', zh: '等距视角插画，30 度角，柔和阴影，粉彩配色' },
    tone: ['#a8b7ff', '#5bb2be']
  },
  {
    id: 'watercolor',
    kind: 'image',
    category: 'illustration',
    name: { en: 'Watercolour', zh: '水彩' },
    desc: { en: 'Wet-on-wet washes, paper texture, bleeding edges.', zh: '湿画法晕染、纸纹、边缘渗开。' },
    template: {
      en: 'Loose watercolour painting of {subject}, wet-on-wet washes, visible cold-press paper texture, edges bleeding softly, restrained palette with one accent colour, plenty of white paper left untouched',
      zh: '{subject}的写意水彩画，湿画法晕染，可见的冷压水彩纸纹理，边缘柔和渗开，克制的配色加一种点缀色，留出大片纸白'
    },
    style: { en: 'loose watercolour, wet-on-wet washes, paper texture, bleeding edges', zh: '写意水彩，湿画法晕染，纸张纹理，边缘渗开' },
    tone: ['#5bb2be', '#ffb547']
  },
  {
    id: 'anime-key-visual',
    kind: 'image',
    category: 'illustration',
    name: { en: 'Anime key visual', zh: '动画主视觉' },
    desc: { en: 'Cel shading, dramatic sky, detailed backdrop.', zh: '赛璐璐上色、戏剧化天空、精细背景。' },
    template: {
      en: 'Anime key visual of {subject}, dynamic low-angle composition, clean cel shading, dramatic cumulus sky, highly detailed painted background, strong rim light, high contrast',
      zh: '{subject}的动画主视觉，动感的低角度构图，干净的赛璐璐上色，戏剧化的积云天空，精细的手绘背景，强烈的轮廓光，高对比'
    },
    style: { en: 'anime key visual, cel shading, dramatic sky, detailed painted background', zh: '动画主视觉，赛璐璐上色，戏剧化天空，精细手绘背景' },
    tone: ['#5bb2be', '#e5487f']
  },
  {
    id: 'picture-book',
    kind: 'image',
    category: 'illustration',
    name: { en: 'Picture book', zh: '绘本' },
    desc: { en: 'Warm gouache, friendly shapes, storybook charm.', zh: '温暖的水粉质感、圆润造型、童书气质。' },
    template: {
      en: "Children's picture-book illustration of {subject}, warm gouache textures, friendly rounded shapes, gentle afternoon light, a touch of whimsy, storybook double-page composition",
      zh: '{subject}的儿童绘本插画，温暖的水粉质感，圆润友好的造型，柔和的午后光线，一点童趣，绘本跨页式构图'
    },
    style: { en: 'picture-book illustration, warm gouache texture, friendly rounded shapes', zh: '绘本插画，温暖水粉质感，圆润友好的造型' },
    tone: ['#ffb547', '#63b17f']
  },

  /* ---------------------------------------------------------- image / render */
  {
    id: 'clay-3d',
    kind: 'image',
    category: 'render',
    name: { en: '3D clay', zh: '3D 黏土' },
    desc: { en: 'Matte soft materials, rounded forms, pastel set.', zh: '哑光柔软材质、圆润造型、粉彩布景。' },
    template: {
      en: '3D clay render of {subject}, matte soft-touch materials, rounded simplified forms, studio three-point lighting, pastel backdrop, subtle subsurface scattering, playful product-render finish',
      zh: '{subject}的 3D 黏土渲染，哑光柔软材质，圆润简化的造型，三点棚灯，粉彩背景，轻微的次表面散射，俏皮的产品渲染质感'
    },
    style: { en: '3D clay render, matte materials, rounded forms, pastel backdrop', zh: '3D 黏土渲染，哑光材质，圆润造型，粉彩背景' },
    tone: ['#e5487f', '#a8b7ff']
  },
  {
    id: 'blueprint',
    kind: 'image',
    category: 'render',
    name: { en: 'Blueprint', zh: '蓝图' },
    desc: { en: 'White line work on deep blue, orthographic views.', zh: '深蓝底白线稿、正交多视图。' },
    template: {
      en: 'Technical blueprint drawing of {subject}, fine white line work on deep blueprint blue, orthographic front, side and top views, dimension lines and small annotations, faint grid',
      zh: '{subject}的技术蓝图，深蓝底上的精细白色线稿，正视 / 侧视 / 俯视三视图，尺寸线与小注释，淡淡的网格'
    },
    style: { en: 'technical blueprint, white line work on deep blue, orthographic views', zh: '技术蓝图，深蓝底白线稿，正交视图' },
    tone: ['#1f4e8a', '#a8b7ff']
  },
  {
    id: 'pixel-art',
    kind: 'image',
    category: 'render',
    name: { en: 'Pixel art', zh: '像素画' },
    desc: { en: '16-bit palette, crisp pixels, no anti-aliasing.', zh: '16 位配色、硬朗像素、无抗锯齿。' },
    template: {
      en: '16-bit pixel art of {subject}, limited 32-colour palette, crisp hard-edged pixels with no anti-aliasing, readable silhouette, simple dithered shading, retro game sprite sheet feel',
      zh: '{subject}的 16 位像素画，限定 32 色，硬朗的像素边缘无抗锯齿，轮廓清晰可辨，简单的抖动阴影，复古游戏精灵图的味道'
    },
    style: { en: '16-bit pixel art, limited palette, crisp pixels, no anti-aliasing', zh: '16 位像素画，限定配色，硬朗像素，无抗锯齿' },
    tone: ['#63b17f', '#ffb547']
  },

  /* ------------------------------------------------------------- image / art */
  {
    id: 'ukiyo-e',
    kind: 'image',
    category: 'art',
    name: { en: 'Ukiyo-e print', zh: '浮世绘' },
    desc: { en: 'Woodblock flats, bold outlines, aged paper.', zh: '木版平涂、粗线轮廓、旧纸色。' },
    template: {
      en: 'Ukiyo-e woodblock print of {subject}, flat areas of colour, bold black outlines, stylised wave and cloud motifs, aged washi paper tone, visible print registration character',
      zh: '{subject}的浮世绘木版画，大面积平涂色块，粗黑轮廓线，程式化的浪与云纹样，泛黄的和纸底色，带木版套印的痕迹'
    },
    style: { en: 'ukiyo-e woodblock print, flat colour, bold outlines, aged paper', zh: '浮世绘木版画，平涂色块，粗轮廓线，旧纸色' },
    tone: ['#2a6f7a', '#c8441b']
  },
  {
    id: 'impressionist',
    kind: 'image',
    category: 'art',
    name: { en: 'Impressionist oil', zh: '印象派油画' },
    desc: { en: 'Thick brushwork, broken colour, outdoor light.', zh: '厚涂笔触、碎色并置、户外光。' },
    template: {
      en: 'Impressionist oil painting of {subject}, thick visible brushstrokes, broken colour laid side by side, bright outdoor light, loose edges, canvas texture showing through',
      zh: '{subject}的印象派油画，厚涂且清晰可见的笔触，并置的碎色，明亮的户外光线，松动的边缘，透出画布纹理'
    },
    style: { en: 'impressionist oil painting, thick brushstrokes, broken colour, canvas texture', zh: '印象派油画，厚涂笔触，碎色并置，画布纹理' },
    tone: ['#ffb547', '#5bb2be']
  },
  {
    id: 'bauhaus',
    kind: 'image',
    category: 'art',
    name: { en: 'Bauhaus poster', zh: '包豪斯海报' },
    desc: { en: 'Primary colours, geometric blocks, strong diagonal.', zh: '三原色、几何色块、强对角线。' },
    template: {
      en: 'Bauhaus-style poster composition of {subject}, primary red, yellow and blue with black, geometric circles and bars, one strong diagonal, flat printed ink texture, no text',
      zh: '{subject}的包豪斯风格海报构成，红黄蓝三原色加黑色，几何圆形与色条，一条有力的对角线，平面印刷油墨质感，不含文字'
    },
    style: { en: 'Bauhaus poster style, primary colours, geometric blocks, strong diagonal', zh: '包豪斯海报风格，三原色，几何色块，强对角线' },
    tone: ['#c8441b', '#1f4e8a']
  },

  /* ---------------------------------------------------------- video / camera */
  {
    id: 'dolly-in',
    kind: 'video',
    category: 'camera',
    name: { en: 'Slow dolly in', zh: '缓慢推镜' },
    desc: { en: 'Steady push toward the subject, shallow focus.', zh: '平稳推向主体，浅景深。' },
    template: {
      en: 'Slow dolly-in toward {subject}, perfectly steady motion, shallow depth of field, natural lighting, 24 fps cinematic feel, subject stays centred as the background softens',
      zh: '缓慢推镜靠近{subject}，运动完全平稳，浅景深，自然光，24 帧电影感，主体始终居中，背景逐渐虚化'
    },
    style: { en: 'slow dolly-in, steady motion, shallow depth of field', zh: '缓慢推镜，平稳运动，浅景深' },
    tone: ['#ff6a3d', '#2a6f7a']
  },
  {
    id: 'orbit',
    kind: 'video',
    category: 'camera',
    name: { en: 'Orbit', zh: '环绕' },
    desc: { en: 'Smooth half-circle around the subject.', zh: '围绕主体平滑地转半圈。' },
    template: {
      en: 'Smooth 180-degree orbit around {subject}, constant speed, soft key light with a gentle rim, clean uncluttered background, the subject stays in frame throughout',
      zh: '围绕{subject}平滑地环绕 180 度，匀速运动，柔和主光加轻微轮廓光，干净不杂乱的背景，主体全程在画面中'
    },
    style: { en: 'smooth 180-degree orbit, constant speed', zh: '平滑的 180 度环绕，匀速' },
    tone: ['#5bb2be', '#a8b7ff']
  },
  {
    id: 'drone-pullback',
    kind: 'video',
    category: 'camera',
    name: { en: 'Drone pull-back', zh: '航拍拉远' },
    desc: { en: 'Rise and reveal the wider landscape.', zh: '升起并揭示更大的场景。' },
    template: {
      en: 'Aerial drone pull-back from {subject}, starting close and rising smoothly to reveal the wider landscape, golden hour, long shadows, gentle wind in the vegetation',
      zh: '航拍从{subject}拉远，从近处开始平稳上升，逐渐揭示更广阔的地貌，黄金时刻，长长的影子，植被被微风轻轻吹动'
    },
    style: { en: 'aerial drone pull-back, rising reveal, golden hour', zh: '航拍拉远，上升揭示，黄金时刻' },
    tone: ['#ffb547', '#c8441b']
  },
  {
    id: 'handheld-doc',
    kind: 'video',
    category: 'camera',
    name: { en: 'Handheld documentary', zh: '手持纪实' },
    desc: { en: 'Subtle shake, available light, candid.', zh: '轻微晃动、现场光、不摆拍。' },
    template: {
      en: 'Handheld documentary shot of {subject}, subtle natural camera shake, available light only, candid unstaged action, slight reframing as the subject moves',
      zh: '{subject}的手持纪实镜头，轻微自然的晃动，只用现场光，不摆拍的真实动作，主体移动时镜头略作跟随'
    },
    style: { en: 'handheld documentary, subtle shake, available light', zh: '手持纪实，轻微晃动，现场光' },
    tone: ['#ada49a', '#6b3a1f']
  },
  {
    id: 'rack-focus',
    kind: 'video',
    category: 'camera',
    name: { en: 'Rack focus', zh: '变焦点' },
    desc: { en: 'Focus travels from foreground to subject.', zh: '焦点从前景移到主体。' },
    template: {
      en: 'Rack focus from a blurred foreground element to {subject}, 85mm lens, creamy bokeh transition, moody interior light, locked-off camera, slow deliberate pull',
      zh: '焦点从虚化的前景慢慢移到{subject}，85mm 镜头，奶油般的虚化过渡，有氛围的室内光，机位固定，缓慢而刻意的变焦点'
    },
    style: { en: 'rack focus to the subject, 85mm, locked-off camera', zh: '变焦点到主体，85mm，固定机位' },
    tone: ['#e5487f', '#2a1620']
  },
  {
    id: 'timelapse',
    kind: 'video',
    category: 'camera',
    name: { en: 'Timelapse', zh: '延时' },
    desc: { en: 'Fixed camera, clouds and shadows racing.', zh: '固定机位，云影飞逝。' },
    template: {
      en: 'Timelapse of {subject}, fixed camera, clouds racing and shadows sweeping across the scene, day turning to dusk, lights coming on, smooth exposure ramp',
      zh: '{subject}的延时摄影，固定机位，云层飞驰、影子扫过场景，白天转入黄昏，灯光渐次亮起，曝光平滑过渡'
    },
    style: { en: 'timelapse, fixed camera, day to dusk', zh: '延时摄影，固定机位，白天到黄昏' },
    tone: ['#ffb547', '#1f4e8a']
  },

  /* ----------------------------------------------------------- video / genre */
  {
    id: 'product-reveal',
    kind: 'video',
    category: 'genre',
    name: { en: 'Product reveal', zh: '产品揭示' },
    desc: { en: 'Dark turntable, rim light sweep, macro details.', zh: '深色转台、轮廓光扫过、微距细节。' },
    template: {
      en: 'Product reveal of {subject} on a dark studio turntable, a rim light sweeping across the surface, slow rotation, cut to macro details of texture and edges, polished commercial finish',
      zh: '{subject}的产品揭示镜头，深色棚内转台，一道轮廓光扫过表面，缓慢旋转，切到材质和边缘的微距细节，精致的商业质感'
    },
    style: { en: 'product reveal, dark turntable, sweeping rim light', zh: '产品揭示，深色转台，扫过的轮廓光' },
    tone: ['#ffb547', '#3a332e']
  },
  {
    id: 'nature-doc',
    kind: 'video',
    category: 'genre',
    name: { en: 'Nature documentary', zh: '自然纪录片' },
    desc: { en: 'Long lens, dawn mist, calm pacing.', zh: '长焦压缩、晨雾、从容的节奏。' },
    template: {
      en: 'Nature documentary shot of {subject}, long telephoto compression, dawn mist drifting, slow pan, calm patient pacing, true-to-life colour',
      zh: '{subject}的自然纪录片镜头，长焦压缩的空间感，飘动的晨雾，缓慢横摇，从容耐心的节奏，真实的色彩'
    },
    style: { en: 'nature documentary, long lens, dawn mist, slow pan', zh: '自然纪录片，长焦，晨雾，缓慢横摇' },
    tone: ['#63b17f', '#2a6f7a']
  },
  {
    id: 'anime-cut',
    kind: 'video',
    category: 'genre',
    name: { en: 'Anime action cut', zh: '动画动作镜头' },
    desc: { en: 'Speed lines, dynamic camera, cel shading.', zh: '速度线、动感运镜、赛璐璐上色。' },
    template: {
      en: 'Anime-style action cut of {subject}, speed lines, dynamic swooping camera, clean cel shading, dramatic rim lighting, impact frames, high energy',
      zh: '{subject}的动画风动作镜头，速度线，俯冲式的动感运镜，干净的赛璐璐上色，戏剧化轮廓光，冲击帧，高能量'
    },
    style: { en: 'anime action cut, speed lines, dynamic camera, cel shading', zh: '动画动作镜头，速度线，动感运镜，赛璐璐上色' },
    tone: ['#e5487f', '#5bb2be']
  },
  {
    id: 'ambient-loop',
    kind: 'video',
    category: 'genre',
    name: { en: 'Ambient loop', zh: '氛围循环' },
    desc: { en: 'Slow drift, soft particles, no cuts.', zh: '缓慢漂移、柔和粒子、无剪切。' },
    template: {
      en: 'Seamless ambient loop of {subject}, slow drifting motion, soft floating particles, no hard cuts, gentle light changes, suitable as a background on a screen',
      zh: '{subject}的无缝氛围循环，缓慢漂移的运动，柔和的漂浮粒子，没有硬切，光线轻微变化，适合作为屏幕背景'
    },
    style: { en: 'seamless ambient loop, slow drift, no cuts', zh: '无缝氛围循环，缓慢漂移，无剪切' },
    tone: ['#a8b7ff', '#2a1620']
  },

  /* -------------------------------------------------- image / more favourites */
  {
    id: 'knolling',
    kind: 'image',
    category: 'photo',
    name: { en: 'Knolling flat lay', zh: '整齐平铺' },
    desc: { en: 'Objects at right angles, overhead, even light.', zh: '物件直角排列、俯拍、均匀光。' },
    template: {
      en: 'Knolling flat-lay photograph of {subject}, every item arranged at right angles with even spacing, shot directly from above, soft even studio light, plain matte background, no shadows crossing',
      zh: '{subject}的整齐平铺（knolling）照片，每件物品都按直角等距排列，正上方俯拍，柔和均匀的棚光，哑光纯色背景，阴影互不交叉'
    },
    style: { en: 'knolling flat lay, right-angle arrangement, overhead, even light', zh: '整齐平铺，直角排列，俯拍，均匀光' },
    tone: ['#ada49a', '#ffb547']
  },
  {
    id: 'cyberpunk-street',
    kind: 'image',
    category: 'photo',
    name: { en: 'Cyberpunk street', zh: '赛博朋克街道' },
    desc: { en: 'Rain, holograms, dense signage, magenta and cyan.', zh: '雨、全息投影、密集招牌、品红与青。' },
    template: {
      en: 'Cyberpunk street scene with {subject}, rain-slick pavement, layered holographic signage, dense vertical city, magenta and cyan lighting, steam from vents, cinematic wide shot',
      zh: '有{subject}的赛博朋克街景，雨后反光的路面，层叠的全息招牌，密集的垂直城市，品红与青色的灯光，通风口冒出蒸汽，电影感广角'
    },
    style: { en: 'cyberpunk street, rain reflections, holographic signage, magenta and cyan light', zh: '赛博朋克街景，雨后反光，全息招牌，品红与青色灯光' },
    tone: ['#e5487f', '#2a6f7a']
  },
  {
    id: 'paper-cut',
    kind: 'image',
    category: 'illustration',
    name: { en: 'Paper cut-out', zh: '剪纸层叠' },
    desc: { en: 'Layered card stock, soft drop shadows, depth.', zh: '层叠卡纸、柔和投影、纵深感。' },
    template: {
      en: 'Layered paper cut-out illustration of {subject}, stacked card stock in five tones, soft drop shadows between layers, diorama depth, warm directional light, tidy craft finish',
      zh: '{subject}的层叠剪纸插画，五种色调的卡纸层层堆叠，层与层之间有柔和投影，立体模型般的纵深，暖色定向光，手工精致'
    },
    style: { en: 'layered paper cut-out, card stock, soft drop shadows', zh: '层叠剪纸，卡纸质感，柔和投影' },
    tone: ['#ff8a5c', '#5bb2be']
  },
  {
    id: 'low-poly',
    kind: 'image',
    category: 'render',
    name: { en: 'Low poly', zh: '低多边形' },
    desc: { en: 'Faceted geometry, flat shading, clean gradients.', zh: '多面体几何、平面着色、干净渐变。' },
    template: {
      en: 'Low-poly 3D render of {subject}, visible faceted geometry, flat shading with crisp edges, soft gradient background, gentle studio light, minimal scene',
      zh: '{subject}的低多边形 3D 渲染，可见的多面体几何，平面着色边缘清晰，柔和渐变背景，温和的棚光，场景极简'
    },
    style: { en: 'low-poly 3D, faceted geometry, flat shading', zh: '低多边形 3D，多面体几何，平面着色' },
    tone: ['#63b17f', '#1f4e8a']
  },
  {
    id: 'minimal-poster',
    kind: 'image',
    category: 'render',
    name: { en: 'Minimal poster', zh: '极简海报' },
    desc: { en: 'One subject, lots of air, two colours.', zh: '单一主体、大量留白、双色。' },
    template: {
      en: 'Minimalist poster of {subject}, a single centred subject, generous negative space, two-colour palette, flat printed texture, strong simple silhouette, no text',
      zh: '{subject}的极简海报，单一居中主体，大量留白，双色配色，平面印刷质感，简洁有力的剪影，不含文字'
    },
    style: { en: 'minimalist poster, generous negative space, two-colour palette, no text', zh: '极简海报，大量留白，双色配色，不含文字' },
    tone: ['#1c1714', '#ffb547']
  },
  {
    id: 'double-exposure',
    kind: 'image',
    category: 'art',
    name: { en: 'Double exposure', zh: '双重曝光' },
    desc: { en: 'A silhouette filled with a second scene.', zh: '剪影里装着另一幅场景。' },
    template: {
      en: 'Double-exposure image of {subject} blended with a forest and mountain landscape inside the silhouette, high-key white background, fine tonal transitions, elegant and quiet',
      zh: '{subject}的双重曝光影像，剪影内部融合了森林与山脉的风景，高调白背景，细腻的影调过渡，优雅安静'
    },
    style: { en: 'double exposure, landscape inside the silhouette, high-key background', zh: '双重曝光，剪影内含风景，高调背景' },
    tone: ['#2a6f7a', '#fff4ec']
  },

  /* ------------------------------------------------- video / more favourites */
  {
    id: 'macro-slowmo',
    kind: 'video',
    category: 'genre',
    name: { en: 'Macro slow motion', zh: '微距慢动作' },
    desc: { en: 'Splashes, powder, petals at 1000 fps feel.', zh: '水花、粉末、花瓣的千帧慢放感。' },
    template: {
      en: 'Extreme macro slow-motion of {subject}, droplets and particles suspended mid-air, 1000 fps feel, dark backdrop, single hard side light with soft fill, razor-thin focus',
      zh: '{subject}的极致微距慢动作，水珠与颗粒悬停在半空，千帧慢放的质感，深色背景，单一硬质侧光加柔和补光，极薄的焦平面'
    },
    style: { en: 'macro slow motion, suspended droplets, dark backdrop', zh: '微距慢动作，悬停水珠，深色背景' },
    tone: ['#5bb2be', '#1c1714']
  },
  {
    id: 'pov-walk',
    kind: 'video',
    category: 'camera',
    name: { en: 'First-person walk', zh: '第一人称行走' },
    desc: { en: 'POV steps through a place, natural sway.', zh: '以第一视角穿行，自然的步伐晃动。' },
    template: {
      en: 'First-person point-of-view walk through {subject}, natural walking sway, wide lens, ambient light, people and details passing on both sides, continuous take',
      zh: '以第一人称视角走过{subject}，自然的步伐晃动，广角镜头，环境光，两侧有行人和细节掠过，一镜到底'
    },
    style: { en: 'first-person POV walk, wide lens, continuous take', zh: '第一人称行走，广角，一镜到底' },
    tone: ['#ffb547', '#6b3a1f']
  },
  {
    id: 'crane-city',
    kind: 'video',
    category: 'camera',
    name: { en: 'Crane reveal', zh: '升降揭示' },
    desc: { en: 'Rise from street level to the skyline at night.', zh: '从街面升到夜景天际线。' },
    template: {
      en: 'Slow crane shot rising from street level past {subject} to reveal the night skyline, traffic light trails below, cool blue night with warm window lights, smooth continuous move',
      zh: '缓慢的升降镜头从街面经过{subject}上升，揭示出夜晚的天际线，下方是车流光轨，冷蓝夜色配暖黄窗光，平滑连贯的运动'
    },
    style: { en: 'slow crane reveal, night skyline, light trails', zh: '缓慢升降揭示，夜景天际线，车流光轨' },
    tone: ['#1f4e8a', '#ffb547']
  }
]

export const STUDIO_MODIFIERS: ModifierGroup[] = [
  {
    id: 'light',
    kind: 'image',
    label: { en: 'Light', zh: '光线' },
    items: [
      { id: 'golden', text: { en: 'golden hour light', zh: '黄金时刻的光线' } },
      { id: 'overcast', text: { en: 'soft overcast light', zh: '阴天柔光' } },
      { id: 'softbox', text: { en: 'studio softbox lighting', zh: '棚内柔光箱布光' } },
      { id: 'neon', text: { en: 'neon night lighting', zh: '霓虹夜景光' } },
      { id: 'volumetric', text: { en: 'volumetric light rays', zh: '体积光束' } },
      { id: 'rim', text: { en: 'backlit rim light', zh: '逆光轮廓光' } }
    ]
  },
  {
    id: 'lens',
    kind: 'image',
    label: { en: 'Lens', zh: '镜头' },
    items: [
      { id: '35', text: { en: '35mm lens', zh: '35mm 镜头' } },
      { id: '85', text: { en: '85mm portrait lens', zh: '85mm 人像镜头' } },
      { id: '24', text: { en: '24mm wide angle', zh: '24mm 广角' } },
      { id: 'macro', text: { en: 'macro lens', zh: '微距镜头' } },
      { id: 'tilt', text: { en: 'tilt-shift miniature look', zh: '移轴微缩效果' } },
      { id: 'drone', text: { en: 'aerial drone view', zh: '航拍视角' } }
    ]
  },
  {
    id: 'mood',
    kind: 'image',
    label: { en: 'Mood', zh: '氛围' },
    items: [
      { id: 'warm', text: { en: 'warm tones', zh: '暖色调' } },
      { id: 'cool', text: { en: 'cool tones', zh: '冷色调' } },
      { id: 'contrast', text: { en: 'high contrast', zh: '高对比' } },
      { id: 'pastel', text: { en: 'pastel palette', zh: '粉彩配色' } },
      { id: 'mono', text: { en: 'black and white', zh: '黑白' } },
      { id: 'earth', text: { en: 'muted earth tones', zh: '低饱和大地色' } }
    ]
  },
  {
    id: 'finish',
    kind: 'image',
    label: { en: 'Finish', zh: '质感' },
    items: [
      { id: 'grain', text: { en: 'fine film grain', zh: '细腻胶片颗粒' } },
      { id: 'detail', text: { en: 'highly detailed', zh: '细节丰富' } },
      { id: 'minimal', text: { en: 'minimal composition', zh: '极简构图' } },
      { id: 'clean', text: { en: 'clean plain background', zh: '干净纯色背景' } },
      { id: 'notext', text: { en: 'no text or watermarks', zh: '不含文字和水印' } }
    ]
  },
  {
    id: 'motion',
    kind: 'video',
    label: { en: 'Motion', zh: '运动' },
    items: [
      { id: 'slowmo', text: { en: 'slow motion', zh: '慢动作' } },
      { id: 'steady', text: { en: 'locked-off steady camera', zh: '固定机位' } },
      { id: 'handheld', text: { en: 'handheld feel', zh: '手持感' } },
      { id: 'crane', text: { en: 'slow crane up', zh: '缓慢升降' } },
      { id: 'tracking', text: { en: 'tracking shot alongside the subject', zh: '跟拍移动镜头' } }
    ]
  },
  {
    id: 'look',
    kind: 'video',
    label: { en: 'Look', zh: '影调' },
    items: [
      { id: 'cine', text: { en: 'cinematic colour grade', zh: '电影级调色' } },
      { id: 'doc', text: { en: 'documentary realism', zh: '纪录片写实' } },
      { id: 'anime', text: { en: 'anime style', zh: '动画风格' } },
      { id: 'bw', text: { en: 'black and white', zh: '黑白' } },
      { id: 'grain', text: { en: 'film grain', zh: '胶片颗粒' } },
      { id: 'golden', text: { en: 'golden hour', zh: '黄金时刻' } }
    ]
  }
]

export function pickL10n(value: L10n, locale: string): string {
  return locale.toLowerCase().startsWith('zh') ? value.zh : value.en
}

export function skillsFor(kind: 'image' | 'video'): StudioSkill[] {
  return STUDIO_SKILLS.filter((s) => s.kind === kind)
}

export function modifiersFor(kind: 'image' | 'video'): ModifierGroup[] {
  return STUDIO_MODIFIERS.filter((g) => g.kind === kind)
}

/** Fill a template with a subject (or a visible placeholder the user replaces). */
export function fillTemplate(template: string, subject: string, placeholder: string): string {
  return template.replace('{subject}', subject.trim() || placeholder)
}

/** Append a style phrase to a prompt, keeping the punctuation tidy. */
export function appendPhrase(prompt: string, phrase: string): string {
  const base = prompt.trim().replace(/[,，.。;；]+$/, '')
  if (!base) return phrase
  if (base.includes(phrase)) return base
  const sep = /[㐀-鿿]/.test(phrase) ? '，' : ', '
  return `${base}${sep}${phrase}`
}

/** Remove a phrase added earlier by appendPhrase. */
export function removePhrase(prompt: string, phrase: string): string {
  return prompt
    .replace(new RegExp(`\\s*[,，]\\s*${escapeRegExp(phrase)}`), '')
    .replace(new RegExp(`^${escapeRegExp(phrase)}\\s*[,，]?\\s*`), '')
    .trim()
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
