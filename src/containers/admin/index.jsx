/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import withCheckLogin from "../with-check-login";
import { Layout } from 'antd';
import LeftNav from "./left-nav";
import AdminHeader from "./header";
import { Route,Switch,Redirect } from 'react-router-dom';

import Bar from "../../components/charts/bar";
import Line from "../../components/charts/line";
import Pie from "../../components/charts/pie";
import Home from "../../components/home";
import Category from "../category";
import Product from "../product";
import Role from "../role";
import User from "../user";


//Header,
const {  Footer, Sider, Content } = Layout



@withCheckLogin
class Admin extends Component {

  render() {
    return (
      <Layout style={{height:'100%'}}>
        <Sider>
        <LeftNav/>
        </Sider>  
        <Layout>
          <AdminHeader/>
          <Content style={{backgroundColor:'#fff',margin:'25px 20px 0 20px'}}>
          <Switch>
          <Route path='/home' component={Home}/>
          <Route path='/category' component={Category}/>
          <Route path='/product' component={Product}/>
          <Route path='/role' component={Role}/>
          <Route path='/user' component={User}/>
          <Route path='/charts/bar' component={Bar}/>
          <Route path='/charts/line' component={Line}/>
          <Route path='/charts/pie' component={Pie}/>
          <Redirect to='/home'/>
          </Switch>
          </Content>
          <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更加页面操作</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default  Admin