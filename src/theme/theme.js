import { extendTheme } from 'native-base';

export default theme = extendTheme({
  components: {
    Text: {
      defaultProps: {
        fontSize: 'lg',
      },
    },
    Box: {
      defaultProps: {
        _dark: {
          borderColor: 'gray.600',
          backgroundColor: 'gray.700',
        },
        borderColor: 'coolGray.200',
        backgroundColor: 'gray.50',
      },
    },
  },
  colors: {
    primary: {
      50: '#d6fcee',
      100: '#97f5d4',
      200: '#02eeb9', //dark mode
      300: '#00e49e',
      400: '#00d98a',
      500: '#00ce76',
      600: '#00bd6a',
      700: '#00aa5c',
      800: '#00984e',
      900: '#007636',
    },
    secondary: {
      50: '#e1f5f9',
      100: '#b4e4ef',
      200: '#86d2e6',
      300: '#5cc1dd',
      400: '#41b4d8',
      500: '#2aa7d4',
      600: '#2299c7', //
      700: '#1687b4',
      800: '#1576a1',
      900: '#095780',
    },
    background: {
      dark: '#121212',
      light: '#FFFFFF',
    },
    darkModeHeader: '#262626',
  },
  Pressable: {
    cursor: 'pointer',
  },

  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
