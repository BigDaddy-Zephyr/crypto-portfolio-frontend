import { lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import Users from "../../components/PerformanceForm";
const Performance = lazy(() => import("../../components/Performance"));
const Homepage = lazy(()=>import("./homepage"));
const Form = lazy(()=>import("../../components/Form"));

const Home = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' component={Homepage} />
          <Route path='/dashboard' component={Performance} />
        </Switch>
      </div>
    </Router> 
  );
};

export default Home;