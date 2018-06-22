import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import GameStart from "./route/GameStart";
import GameSetup from "./route/GameSetup";
import GameInProgress from "./route/GameInProgress";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={GameStart} />
      <Route path="/setup" component={GameSetup} />
      <Route path="/game" component={GameInProgress} />
    </Switch>
  </BrowserRouter>
);

export default Router;
