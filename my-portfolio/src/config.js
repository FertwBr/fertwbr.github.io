export const config = {
  appName: "FernandoPortfolio",
  seedColor: "#6750A4", 
  themeColors: [
    { name: "M3 Purple", value: "#6750A4" },
    { name: "Crimson", value: "#9C4146" },
    { name: "Teal", value: "#006A6A" },
    { name: "Indigo", value: "#4C5D9F" },
    { name: "Forest", value: "#4C662B" },
    { name: "Golden", value: "#825500" }
  ]
};

if (typeof window !== 'undefined') {
  window.config = config;
}