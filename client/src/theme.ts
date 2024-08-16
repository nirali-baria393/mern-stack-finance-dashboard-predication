export const tokens = {
  grey: {
    100: "#d1d3da",
    200: "#b3b6c2",
    300: "#8f929b",
    400: "#6b6d74",
    500: "#48494e",
    600: "#242427",
    700: "#1e1f22",
    800: "#18191c",
    900: "#0f1013",
  },
  primary: {
    100: "#99b6cc",
    200: "#739cb9",
    300: "#4d82a7",
    400: "#3d6885",
    500: "#2e4e64",
    600: "#1e3442",
    700: "#0f1a21",
    800: "#091116",
    900: "#04080b",
  },
  secondary: {
    100: "#80e3dd",
    200: "#4dd9d1",
    300: "#1acfc5",
    400: "#14a399",
    500: "#0e786d",
    600: "#084d41",
    700: "#04231f",
    800: "#02100f",
    900: "#000605",
  },
  tertiary: {
    100: "#90caf9",
    200: "#64b5f6",
    300: "#42a5f5",
    400: "#2196f3",
    500: "#1e88e5", 
    600: "#1976d2",
    700: "#1565c0",
    800: "#104ea9",
    900: "#0c3b91", 
  },
  background: {
    light: "#112240",
    main: "#000B1A", 
  },
};
export const themeSettings = {
  palette: {
    primary: {
      ...tokens.primary,
      main: tokens.primary[500],
      light: tokens.primary[400],
    },
    secondary: {
      ...tokens.secondary,
      main: tokens.secondary[500],
    },
    tertiary: {
      ...tokens.tertiary,
      main: tokens.tertiary[600],
    },
    grey: {
      ...tokens.grey,
      main: tokens.grey[500],
    },
    background: {
      default: tokens.background.main,
      light: tokens.background.light,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    fontSize: 12,
    h1: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 32,
    },
    h2: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 24,
    },
    h3: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 20,
      fontWeight: 800,
      color: tokens.grey[200],
    },
    h4: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,
      fontWeight: 600,
      color: tokens.grey[300],
    },
    h5: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      fontWeight: 400,
      color: tokens.grey[500],
    },
    h6: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 10,
      color: tokens.grey[700],
    },
  },
};