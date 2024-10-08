export const theme = {
  colours: {
    purple: "#38003C",
    green: "#00FF87",
    blue: "#66E6FF",
    blueDark: "#2A70D0",
    greyLight: "#D3D3D3",
    grey: "#BBB7B7",
    greyDark: "#999999",
    greyDarker: "#757474",
    greyDarkest: "#2D2D2D",
    black: "#1e1e1e",
  },
  spacing: "16px",
  spacingValue: 16,
  spacingSmall: "8px",
  spacingSmallValue: 8,
  maxWidth: "1024px",
  font: {
    familyDefault: "Inter",
    headerDefault: "Bebas Neue",
    size: {
      xsmall: "12px",
      small: "14px",
      body: "16px",
      bodyValue: 16,
      header: "2.5rem",
      headerValue: 40,
      subheader: "2rem",
      subheaderValue: 32,
      lead: "1.25rem",
      leadValue: 20,
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
        background-color: hsl(200, 20%, 80%);
      }
      100% {
        background-color: hsl(200, 20%, 95%);
      }
    }`,
};
