import { Palette as _Palette, PaletteColor as _PaletteColor } from '@mui/material/styles';


declare module "@mui/material/styles/createPalette" {
  interface PaletteColor {
    [key: number]: string;
  }

  interface Palette {
    tertiary: PaletteColor;
  }
}
