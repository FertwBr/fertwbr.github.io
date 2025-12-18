import { themeFromSourceColor, applyTheme } from '@material/material-color-utilities';

export const applyMaterialTheme = (hexColor, isDark) => {
  try {
    const theme = themeFromSourceColor(parseInt(hexColor.replace('#', ''), 16));
    const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
    
    const root = document.documentElement;

    for (const [key, value] of Object.entries(scheme.toJSON())) {
      const token = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
      root.style.setProperty(`--md-sys-color-${token}`, argbToHex(value));
    }
  } catch (error) {
    console.error("Failed to generate theme", error);
  }
};

const argbToHex = (argb) => {
  return `#${(argb & 0x00ffffff).toString(16).padStart(6, '0')}`;
};