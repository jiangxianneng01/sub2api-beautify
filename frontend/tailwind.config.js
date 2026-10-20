import softPalette from './tailwind.palette.js'

// JLAi design tokens.
// Brand and neutral colours come from CSS variables defined per palette in
// src/styles/palettes.css (Noir — amber gold on warm near-black — is the default),
// so the whole UI re-skins when <html data-palette="…"> changes. Status hues
// (red, green, amber…) stay fixed so their meaning never shifts with the theme.

/** A palette colour that still supports Tailwind's `/opacity` modifier */
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`
const scale = (name, steps) => Object.fromEntries(steps.map((step) => [step, v(`${name}-${step}`)]))
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

// The three-stop gradient reserved for things that glow or move
const signal = {
  gold: 'rgb(var(--signal-a) / <alpha-value>)',
  coral: 'rgb(var(--signal-b) / <alpha-value>)',
  magenta: 'rgb(var(--signal-c) / <alpha-value>)'
}
const signalStops = 'rgb(var(--signal-a)) 0%, rgb(var(--signal-b)) 50%, rgb(var(--signal-c)) 100%'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Status hues (green, blue, red…) softened to sit with the warm neutrals
        ...softPalette,
        // 主色调 (600 is the accessible action colour on white in every palette)
        primary: scale('primary', STEPS),
        // 辅助色
        accent: scale('accent', STEPS),
        // 中性色 - tinted to match the palette
        gray: scale('gray', STEPS),
        // 深色模式
        dark: scale('dark', [...STEPS.slice(0, 9), 850, 900, 950]),
        ink: v('ink'),
        paper: v('paper'),
        signal
      },
      fontFamily: {
        sans: [
          'S2A Sans',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Noto Sans CJK SC',
          'Helvetica Neue',
          'Arial',
          'sans-serif'
        ],
        display: [
          'S2A Sans',
          'system-ui',
          '-apple-system',
          'PingFang SC',
          'Hiragino Sans GB',
          'Microsoft YaHei',
          'Noto Sans CJK SC',
          'sans-serif'
        ],
        mono: [
          'S2A Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace'
        ]
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }]
      },
      letterSpacing: {
        display: '-0.035em',
        title: '-0.02em'
      },
      boxShadow: {
        glass: '0 1px 0 rgb(255 255 255 / 0.6) inset, 0 12px 32px -12px rgb(var(--c-ink) / 0.18)',
        'glass-sm': '0 8px 20px -10px rgb(var(--c-ink) / 0.16)',
        glow: '0 0 0 1px rgb(var(--c-primary-500) / 0.25), 0 6px 18px -6px rgb(var(--c-primary-500) / 0.45)',
        'glow-lg': '0 0 0 1px rgb(var(--c-primary-500) / 0.3), 0 16px 40px -12px rgb(var(--c-primary-500) / 0.5)',
        card: '0 1px 2px rgb(var(--c-ink) / 0.04)',
        'card-hover': '0 1px 2px rgb(var(--c-ink) / 0.04), 0 12px 28px -14px rgb(var(--c-ink) / 0.22)',
        'inner-glow': 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        pop: '0 0 0 1px rgb(var(--c-ink) / 0.06), 0 18px 48px -16px rgb(var(--c-ink) / 0.28)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, rgb(var(--c-primary-500)) 0%, rgb(var(--c-primary-600)) 100%)',
        'gradient-dark': 'linear-gradient(135deg, rgb(var(--c-dark-800)) 0%, rgb(var(--c-dark-950)) 100%)',
        'gradient-glass':
          'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'gradient-signal': `linear-gradient(90deg, ${signalStops})`,
        'gradient-signal-y': `linear-gradient(180deg, ${signalStops})`,
        // Kept for compatibility; intentionally near-invisible — the app background is flat paper.
        'mesh-gradient': 'none'
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
        spring: 'cubic-bezier(0.34, 1.4, 0.64, 1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-up': 'slideUp 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-down': 'slideDown 0.24s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'slide-in-right': 'slideInRight 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'scale-in': 'scaleIn 0.18s cubic-bezier(0.2, 0.8, 0.2, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 1.6s linear infinite',
        glow: 'glow 2s ease-in-out infinite alternate'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        glow: {
          '0%': { boxShadow: '0 0 0 1px rgb(var(--c-primary-500) / 0.2), 0 6px 18px -6px rgb(var(--c-primary-500) / 0.35)' },
          '100%': { boxShadow: '0 0 0 1px rgb(var(--c-primary-500) / 0.35), 0 8px 24px -6px rgb(var(--c-primary-500) / 0.55)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      borderRadius: {
        control: '0.625rem',
        panel: '1rem',
        '4xl': '2rem'
      }
    }
  },
  plugins: []
}
