import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "index.scss";

import Application from "components/Application";

if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

export const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL); // jest will not pick up the env variable, I can't figure out why. So I needed this for testing to work.
socket.onopen = () => {
  // console.log("Web socket opened");
  // socket.send("ping");
};


ReactDOM.render(<Application />, document.getElementById("root"));
