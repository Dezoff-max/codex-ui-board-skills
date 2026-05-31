const softNeumorphicDualThemeBoardPreset = {
  theme: {
    extend: {
      colors: {
        snd: {
          bg: 'var(--snd-bg)',
          surface: 'var(--snd-surface)',
          surfaceAlt: 'var(--snd-surface-alt)',
          surfaceInset: 'var(--snd-surface-inset)',
          text: 'var(--snd-text)',
          muted: 'var(--snd-text-muted)',
          line: 'var(--snd-line)',
          accent: 'var(--snd-accent)',
          accentLight: 'var(--snd-accent-light)',
          accentMuted: 'var(--snd-accent-muted)',
          success: 'var(--snd-success)',
          warning: 'var(--snd-warning)',
          danger: 'var(--snd-danger)'
        }
      },
      borderRadius: {
        sndSm: 'var(--snd-radius-sm)',
        sndMd: 'var(--snd-radius-md)',
        sndLg: 'var(--snd-radius-lg)',
        sndXl: 'var(--snd-radius-xl)',
        sndPill: 'var(--snd-radius-pill)'
      },
      boxShadow: {
        sndRaised: 'var(--snd-shadow-raised)',
        sndRaisedSoft: 'var(--snd-shadow-raised-soft)',
        sndInset: 'var(--snd-shadow-inset)',
        sndPressed: 'var(--snd-shadow-pressed)',
        sndCard: 'var(--snd-shadow-card)'
      },
      fontFamily: {
        snd: [
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

module.exports = softNeumorphicDualThemeBoardPreset
