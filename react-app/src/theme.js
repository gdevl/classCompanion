import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#4051b5',
        },
        secondary: {
            main: '#2A9D8F',
        },
    },
    status: {
        danger: 'orange',
    },
})

export default theme;
