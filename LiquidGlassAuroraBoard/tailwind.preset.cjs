module.exports = {
  theme: {
    extend: {
      colors: {
        lg: {
          bg: "var(--lg-bg)",
          panel: "var(--lg-panel)",
          line: "var(--lg-line)",
          text: "var(--lg-text)",
          muted: "var(--lg-muted)",
          purple: "var(--lg-purple)",
          cyan: "var(--lg-cyan)",
          mint: "var(--lg-mint)",
          pink: "var(--lg-pink)"
        }
      },
      borderRadius: {
        "lg-panel": "var(--lg-radius-panel)",
        "lg-control": "var(--lg-radius-control)",
        "lg-small": "var(--lg-radius-small)"
      },
      boxShadow: {
        "lg-depth": "var(--lg-shadow)",
        "lg-purple": "var(--lg-glow-purple)",
        "lg-cyan": "var(--lg-glow-cyan)"
      },
      backdropBlur: {
        lg: "var(--lg-blur)",
        "lg-strong": "var(--lg-blur-strong)"
      }
    }
  }
};
