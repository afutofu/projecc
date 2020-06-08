import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Join from "./components/Join";
import Project from "./components/Project";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Join} />
        <Route path="/projects" exact component={Project} />
      </Switch>
    </Router>
  );
};

export default App;
