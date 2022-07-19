import { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import App from "../components/Form"
import Home from "../pages/Home";
import Performance from "../components/Performance"
// import Home from "../components/ContactForm"
const Router = () => {
  return (
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Switch>
      {/* <Route exact path="/form">
        <App/>
      </Route> */}
      <Route exact path="/dashboard">
      <Performance/>
      </Route>
      </Switch>
      <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      </Switch>
      <Footer/>
    </Suspense>
  );
};

export default Router;
