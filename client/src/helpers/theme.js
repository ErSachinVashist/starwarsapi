import {createMuiTheme} from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#263238'
        },
        secondary: pink,
        error: red,
    },
    typography: {
        fontFamily: "'Nunito', sans-serif",
        useNextVariants: true
    }
});

export default theme;
