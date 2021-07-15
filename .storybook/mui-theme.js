import { createMuiTheme } from '@material-ui/core/styles';

const defaultTheme = createMuiTheme();
const { breakpoints } = defaultTheme;

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
      ipad: 765,
      laptop: 1024,
      desktop: 1280,
      widescreen: 1920
    }
  },
  palette: {
    primary: {
      light: '#757ce8',
      main: '#000',
      dark: '#000',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ff7961',
      main: '#FF008E',
      dark: '#FFDACE',
      contrastText: '#07003C'
    }
  },
  typography: {
    fontFamily: ['Zilla Slab', 'Open Sans', 'Roboto'].join(','),
    lineHeight: '1.8em',
    allVariants: {
      color: '#000',
      fontFamily: 'Open Sans'
    },
    subtitle1: {
      fontSize: '16px',
      lineHeight: 1.5,
      fontFamily: 'Zilla Slab',
      fontWeight: 400
    },
    subtitle2: {
      fontSize: '13px',
      fontWeight: 100,
      [breakpoints.up('md')]: {
        fontSize: '15px'
      },
      [breakpoints.up('xl')]: {
        fontSize: '16px'
      }
    },
    body1: {
      fontSize: 16,
      lineHeight: '28px',
      fontWeight: 400,
      [breakpoints.up('xl')]: {
        fontSize: 22,
        lineHeight: '48px'
      }
    },
    body2: {
      fontSize: 18,
      lineHeight: '32px',
      fontWeight: 400,
      fontFamily: 'Zilla Slab'
    },
    p: {
      padding: 0
    },
    button: {
      color: '#FFF'
    },
    h1: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: '40px',
      marginBottom: 20,
      fontFamily: 'Zilla Slab',
      [breakpoints.up('xl')]: {
        fontSize: 48,
        lineHeight: '65px'
      }
    },
    h2: {
      fontSize: 24,
      lineHeight: '32px',
      fontWeight: 600,
      marginBottom: 20,
      fontFamily: 'Zilla Slab',
      [breakpoints.up('xl')]: {
        fontSize: 40,
        lineHeight: '40px'
      }
    },
    h3: {
      fontFamily: 'Zilla Slab',
      fontSize: 14,
      lineHeight: '32px',
      fontWeight: 400,
      marginBottom: 16,
      [breakpoints.up('xl')]: {
        fontSize: 18
      }
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': ['Zilla Slab']
      }
    },
    MuiLink: {
      underlineHover: {
        textDecoration: 'underline'
      }
    },
    MuiButton: {
      label: {
        fontSize: 12,
        height: 34,
        boxSizing: 'border-box'
        // fontWeight: 400
        // [breakpoints.up('sm')]: {
        //   fontSize: 16
        // }
      },
      contained: {
        borderRadius: 4,
        // fontSize: 12,
        // padding: '4px 16px',
        '&:hover': {
          // backgroundColor: '#4452bf'
        }
      },
      containedSizeSmall: {
        padding: 0
      },
      containedSizeLarge: {
        [breakpoints.up('sm')]: {
          paddingLeft: 50,
          paddingRight: 50
        }
      }
      // contained: {
      //   '&:hover': {
      //     backgroundColor: 'rgba(86, 104, 255, 0.5)'
      //   }
      // }
    },
    MuiRadio: {
      root: {
        color: 'white'
      },
      colorPrimary: {
        color: 'white !important'
      }
    },
    MuiFormControlLabel: {
      label: {
        color: 'white'
      }
    },
    MuiOutlinedInput: {
      input: {
        // backgroundColor: 'white'
      }
    },
    MuiInputLabel: {
      outlined: {
        color: '#5668FF'
      }
    }
  },
  transition: '1s cubic-bezier(.21,.47,.49,.92)',
  mobileGutter: defaultTheme.spacing(5),
  pageMaxWidthMD: '1004px',
  pageMaxWidthLG: '1004px',
  pageMaxWidthXL: '1640px'
});

export default theme;
