import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
// import store from "../src/store/store"
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4821e7cc", // Replace the primary color with the provided color
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <ThemeProvider theme={theme}>
      <App />
      <ToastContainer />
      {/* </Provider> */}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
