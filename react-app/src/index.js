import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { socketUrl } from "../src/config";
import Theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import configureStore from "../src/store/configureStore";
import CssBaseline from "@material-ui/core/CssBaseline";

const store = configureStore();

const socket = io.connect(socketUrl);
socket.on("error", (error) => {
  console.error(error);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <App socket={socket} />
        {/* <App /> */}
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
