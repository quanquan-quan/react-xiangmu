//应用的跟组件
import React,{Component} from "react";
//import { message, Button } from 'antd';//{}里的内容是引入antd的某个组件
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import Login from './pages/login/login'
import Admin from './pages/admin/admin'


export default class APP extends Component {
 
  render() {
    return (
      <BrowserRouter>
        <Switch>  
          <Route path='/login' component={Login} exact/>
          <Route path='/admin' component={Admin}/> 
        </Switch>
      </BrowserRouter>
    )
  }
}
