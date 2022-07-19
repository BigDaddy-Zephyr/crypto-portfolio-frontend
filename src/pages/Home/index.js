import { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Users from "../../components/ContactForm";
const Contact = lazy(() => import("../../components/ContactForm"));
const Homepage = lazy(()=>import("./homepage"));
const Form = lazy(()=>import("../../components/Form"));

const Home = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route exact path='/dashboard' component={Contact} />
          {/* <Route exact path='/form' component={Form} /> */}
        </Switch>
      </div>
    </Router> 
  );
};

export default Home;