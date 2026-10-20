export default {
  jump: {
    open: '跳转到页面',
    trigger: '跳转到…',
    placeholder: '输入页面名称或操作，例如「密钥」「用量」',
    empty: '没有和「{q}」匹配的页面或操作',
    hint: '↑ ↓ 选择 · Enter 打开 · Esc 关闭',
    pages: '页面',
    actions: '操作',
    appearance: '外观',
    toDark: '切换到深色模式',
    toLight: '切换到浅色模式',
    usePalette: '换成「{name}」配色'
  },
  appearance: {
    title: '外观',
    open: '外观设置',
    palette: '配色',
    mode: '模式',
    modes: {
      dark: '深色',
      light: '浅色',
      system: '跟随系统'
    },
    motion: '动效',
    motions: {
      full: '完整',
      reduced: '减弱'
    },
    motionHint: '减弱后关闭滚动渐入、数字滚动、悬停光斑和大部分过渡动画。系统的“减少动态效果”不会自动生效，需要在这里选择。',
    motionOsNotice: '检测到系统开启了“减少动态效果”，本站动效仍为完整模式。如需减弱，可在右上角「外观」里把动效改为“减弱”。',
    default: '默认',
    current: '当前',
    palettes: {
      noir: { name: '黑金', desc: '暖调近黑底，琥珀金点缀（默认）' },
      ember: { name: '余烬', desc: '珊瑚橙与暖金，暖调乌木底' },
      aurora: { name: '极光', desc: '青绿与薄荷，冷调石板底' },
      nebula: { name: '星云', desc: '紫罗兰与粉，靛黑底' },
      quantum: { name: '量子', desc: '电光蓝与青，石墨底' },
      matrix: { name: '矩阵', desc: '翡翠绿与青柠，墨绿黑底' },
      crimson: { name: '绯红', desc: '玫红与琥珀，中性炭黑底' }
    }
  }
}
