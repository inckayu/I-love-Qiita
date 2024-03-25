import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    ochre: Palette['primary']
  }

  interface PaletteOptions {
    ochre?: PaletteOptions['primary']
  }
}

declare module '@mui/material' {
  interface IconButtonPropsColorOverrides {
    ochre: true
  }
}

export const theme = createTheme({
  palette: {
    ochre: {
      main: '#E3D026',
      light: '#E9DB5D',
      dark: '#A29415',
      contrastText: '#242105',
    },
  },
})
