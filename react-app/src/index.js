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
console.log("socket:");
console.log(socket);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline>
        <ThemeProvider theme={Theme}>
          <App socket={socket} />
        </ThemeProvider>
      </CssBaseline>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
