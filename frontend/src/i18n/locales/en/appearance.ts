export default {
  jump: {
    open: 'Jump to a page',
    trigger: 'Jump to…',
    placeholder: 'Type a page or an action, e.g. "keys", "usage"',
    empty: 'Nothing matches "{q}"',
    hint: '↑ ↓ to choose · Enter to open · Esc to close',
    pages: 'Pages',
    actions: 'Actions',
    appearance: 'Appearance',
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
    usePalette: 'Use the {name} palette'
  },
  appearance: {
    title: 'Appearance',
    open: 'Appearance settings',
    palette: 'Palette',
    mode: 'Mode',
    modes: {
      dark: 'Dark',
      light: 'Light',
      system: 'System'
    },
    motion: 'Motion',
    motions: {
      full: 'Full',
      reduced: 'Reduced'
    },
    motionHint: 'Reduced turns off scroll reveals, counting numbers, hover highlights and most transitions. The system reduced-motion setting does not switch it on by itself; choose it here.',
    motionOsNotice: 'Your system asks for reduced motion; this site keeps full motion. To reduce it, set Motion to Reduced under Appearance in the top bar.',
    default: 'Default',
    current: 'Current',
    palettes: {
      noir: { name: 'Black Gold', desc: 'Warm near-black with amber gold (default)' },
      ember: { name: 'Ember', desc: 'Coral and warm gold on umber' },
      aurora: { name: 'Aurora', desc: 'Teal and mint on cool slate' },
      nebula: { name: 'Nebula', desc: 'Violet and pink on indigo-black' },
      quantum: { name: 'Quantum', desc: 'Electric blue and cyan on graphite' },
      matrix: { name: 'Matrix', desc: 'Emerald and lime on green-black' },
      crimson: { name: 'Crimson', desc: 'Rose-red and amber on charcoal' }
    }
  }
}
