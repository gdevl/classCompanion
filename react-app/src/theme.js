import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#264653',
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
