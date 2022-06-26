import { blue } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let defaultTheme = createTheme({
  palette: {
    primary: blue
  }
});
defaultTheme = responsiveFontSizes(defaultTheme);

export default defaultTheme;