import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";

import Router from "./router";
import i18n from "./translation";

const App = () => (
  <BrowserRouter>

      <Router />

  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById("root"));
