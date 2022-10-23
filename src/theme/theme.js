import { extendTheme, themeTools } from 'native-base';

export default theme = extendTheme({
  components: {
    Text: {
      defaultProps: {
        fontSize: 'lg',
      },
    },
    Box: {
      // baseStyle: (props) => {
      //   return {
      //     backgroundColor: themeTools.mode('gray.50', 'gray.900')(props),
      //     borderColor: themeTools.mode('coolGray.200', 'gray.800')(props),
      //   };
      // },
      variants: {
        card: (props) => {
          return {
            backgroundColor: themeTools.mode('gray.50', 'gray.900')(props),
            borderColor: themeTools.mode('coolGray.200', 'gray.800')(props),
          };
        },
      },
    },
    HStack: {
      variants: {
        card: (props) => {
          return {
            backgroundColor: themeTools.mode('gray.50', 'gray.900')(props),
            borderColor: themeTools.mode('coolGray.200', 'gray.800')(props),
          };
        },
      },
    },
  },
  colors: {
    background: {
      dark: '#121212',
      light: '#FFFFFF',
    },
    darkModeHeader: '#27272a', //gray.800
    drawer: {
      dark: '#18181b', //gray.900
      light: '#fafafa', //gray.50
    },
  },
  Pressable: {
    cursor: 'pointer',
  },

  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: 'dark',
  },
});
