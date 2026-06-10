const neoGlowControlBoardPreset = {
  theme: {
    extend: {
      colors: {
        ng: {
          bg: 'var(--ng-bg)',
          surface: 'var(--ng-surface)',
          inset: 'var(--ng-surface-inset)',
          rail: 'var(--ng-rail)',
          text: 'var(--ng-text)',
          muted: 'var(--ng-text-muted)',
          line: 'var(--ng-line)',
          accentBlue: 'var(--ng-accent-blue)',
          accentBlueLight: 'var(--ng-accent-blue-light)',
          accentCyan: 'var(--ng-accent-cyan)',
          success: 'var(--ng-success)',
          danger: 'var(--ng-danger)'
        }
      },
      borderRadius: {
        ngSm: 'var(--ng-radius-sm)',
        ngMd: 'var(--ng-radius-md)',
        ngLg: 'var(--ng-radius-lg)',
        ngXl: 'var(--ng-radius-xl)',
        ngPill: 'var(--ng-radius-pill)'
      },
      boxShadow: {
        ngSurface: 'var(--ng-shadow-surface)',
        ngPanel: 'var(--ng-shadow-panel)',
        ngInset: 'var(--ng-shadow-inset)',
        ngGlowSoft: 'var(--ng-shadow-glow-soft)',
        ngGlowStrong: 'var(--ng-shadow-glow-strong)'
      },
      fontFamily: {
        ng: [
          'SF Pro Display',
          'SF Pro Text',
          'Inter',
          'Segoe UI',
          'system-ui',
          'sans-serif'
        ]
      }
    }
  }
}

module.exports = neoGlowControlBoardPreset
