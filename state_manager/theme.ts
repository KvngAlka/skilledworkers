import { extendTheme } from "native-base";

export const theme = extendTheme({
    fontConfig : {
      Montserrat : {
        100: {
          normal: 'Montserrat-Light',
          italic: 'Montserrat-LightItalic',
        },
        200: {
          normal: 'Montserrat-Light',
          italic: 'Montserrat-LightItalic',
        },
        300: {
          normal: 'Montserrat-Light',
          italic: 'Montserrat-LightItalic',
        },
        400: {
          normal: 'Montserrat-Regular',
          italic: 'Montserrat-Italic',
        },
        500: {
          normal: 'Montserrat-Medium',
        },
        600: {
          normal: 'Montserrat-Medium',
          italic: 'Montserrat-MediumItalic',
        },
      }
    },
    fonts: {
      heading: 'Montserrat',
      body: 'Montserrat',
      mono: 'Montserrat',
    },
    colors: {
      // Add new color
      primary:  { 
        50: '#0052FF5', 100: '#0052FF10', 200: '#A2D4EC20',
        300: '#7AC1E4', 400: '#0052FF40', 500: '#0052FF50',
        600: '#0052FF', 700: '#0052FF0',
        800: '#0052FF80', 900: '#0052FF',
      },
      black : {
        900 : '#252525',
        100 : '#797979',
        50 : '#F5F5F5'
      },
      success : {100 : '#0ADE78'},
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'light',
    },
  });