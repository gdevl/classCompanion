import { createMuiTheme } from "@material-ui/core";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#4051b5",
    },
    secondary: {
      main: "#2A9D8F",
    },
    ternary: {
      main: "#b57740",
    },
  },
  status: {
    danger: "orange",
  },
});

export default Theme;
