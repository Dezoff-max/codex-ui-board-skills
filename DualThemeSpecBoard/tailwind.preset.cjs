const dualThemeSpecBoardPreset = {
  theme: {
    extend: {
      colors: {
        dt: {
          canvas: 'var(--dt-bg-canvas)',
          surface: 'var(--dt-bg-surface)',
          elevated: 'var(--dt-bg-elevated)',
          pressed: 'var(--dt-bg-pressed)',
          lineSoft: 'var(--dt-line-soft)',
          lineStrong: 'var(--dt-line-strong)',
          text: 'var(--dt-text)',
          muted: 'var(--dt-text-muted)',
          accent: 'var(--dt-accent)',
          accentStrong: 'var(--dt-accent-strong)',
          accentMuted: 'var(--dt-accent-muted)',
          success: 'var(--dt-success)',
          warning: 'var(--dt-warning)',
          danger: 'var(--dt-danger)'
        }
      },
      borderRadius: {
        dtSm: 'var(--dt-radius-sm)',
        dtMd: 'var(--dt-radius-md)',
        dtLg: 'var(--dt-radius-lg)',
        dtXl: 'var(--dt-radius-xl)',
        dtPill: 'var(--dt-radius-pill)'
      },
      boxShadow: {
        dtSurface: 'var(--dt-shadow-surface)',
        dtPanel: 'var(--dt-shadow-panel)',
        dtInset: 'var(--dt-shadow-inset)',
        dtPressed: 'var(--dt-shadow-pressed)',
        dtGlow: 'var(--dt-shadow-glow)'
      },
      fontFamily: {
        dt: [
          'SF Pro Text',
          'Avenir Next',
          'Inter',
          'Segoe UI',
          'system-ui',
          'sans-serif'
        ]
      }
    }
  }
}

module.exports = dualThemeSpecBoardPreset
