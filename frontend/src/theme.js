import { createMuiTheme } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import amber from '@material-ui/core/colors/amber';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: blueGrey[700],
      light: blueGrey[200],
    },
    secondary: {
      main: amber[700],
      dark: amber[900],
      light: amber[100],
    },
  },
});

export default theme