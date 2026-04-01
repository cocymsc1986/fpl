export const theme = {
  colours: {
    // Primary — Neon Pink
    primary: "#fdb4f8",
    onPrimary: "#662d67",
    primaryContainer: "#ce89ca",
    onPrimaryContainer: "#400743",

    // Secondary — Pitch Green
    secondary: "#00fd84",
    onSecondary: "#005b2b",
    secondaryContainer: "#006d35",
    onSecondaryContainer: "#e3ffe4",

    // Tertiary — Aggressive Red
    tertiary: "#ff6e85",
    onTertiary: "#480014",

    // Surface hierarchy (true black → bright)
    surface: "#0e0e0e",
    surfaceContainerLowest: "#000000",
    surfaceContainerLow: "#131313",
    surfaceContainer: "#191a1a",
    surfaceContainerHigh: "#1f2020",
    surfaceContainerHighest: "#252626",
    surfaceBright: "#2c2c2c",

    // On-surface
    onSurface: "#ffffff",
    onSurfaceVariant: "#acabaa",
    outlineVariant: "#484848",
  },
  spacing: "16px",
  spacingValue: 16,
  spacingSmall: "8px",
  spacingSmallValue: 8,
  maxWidth: "1024px",
  font: {
    familyDefault: "Inter",
    headerDefault: "Space Grotesk",
    size: {
      xsmall: "10px",
      small: "12px",
      body: "14px",
      bodyValue: 14,
      header: "2rem",
      headerValue: 32,
      subheader: "1.5rem",
      subheaderValue: 24,
      lead: "1rem",
      leadValue: 16,
    },
  },
  breakpoints: {
    small: "480px",
    medium: "780px",
    large: "830px",
    xlarge: "1024px",
  },
  skeletonLoadingAnimation: `
    @keyframes skeleton-loading {
      0% {
        background-color: #1f2020;
      }
      100% {
        background-color: #2c2c2c;
      }
    }`,
};
