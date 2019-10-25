//应用的跟组件
import React, { Component } from "react";
//import { message, Button } from 'antd';//{}里的内容是引入antd的某个组件
import { Router, Switch, Route } from "react-router-dom";

import Login from "./containers/login";
import Admin from "./containers/admin";
import history from "./history";

export default class APP extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route path="/" component={Admin} />
        </Switch>
      </Router>
    );
  }
}
