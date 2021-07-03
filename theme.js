import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          padding: 0,
          margin: 0,
          fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue'
        }
      }
    },
    MuiBox: {
      root: {
        padding: '8px 16px'
      }
    },
    MuiCard: {
      root: {
        margin: '8px',
        backgroundColor: '#ffffff'
      }
    },
    MuiCardMedia: {
      root: {
        height: '144px'
      }
    },
    MuiPaper: {
      root: {
        padding: '8px 16px'
      },
      elevation1: {
        boxShadow: 'none'
      }
    },
    MuiLink: {
      root: {
        color: '#333333'
      }
    },
    MuiInputBase: {
      root: {
        width: '90%',
        margin: '8px 16px'
      }
    },
    MuiInputLabel: {
      root: {
        margin: '8px 16px'
      }
    },
    MuiTypography: {
      h1: {
        fontSize: '36px',
        fontFamily: 'acme'
      }
    }
  }
})

export default theme;
