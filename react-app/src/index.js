import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import "./index.css";
import App from "./App";
import NewApp from "./NewApp";
import { Provider } from "react-redux";
import { socketUrl } from "../src/config";
import Theme from "./theme";
import { ThemeProvider } from "@material-ui/core/styles";
import configureStore from "../src/store/configureStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import SocketContext from "./socketContext";

const store = configureStore();

const socket = io.connect(socketUrl);
socket.on("error", (error) => {
  console.error(error);
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketContext.Provider value={socket}>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <App socket={socket} />
          {/* <NewApp socket={socket} /> */}
          {/* <App /> */}
        </ThemeProvider>
      </SocketContext.Provider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
