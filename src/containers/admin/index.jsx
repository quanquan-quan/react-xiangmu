/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import withCheckLogin from "../with-check-login";
import { Layout } from 'antd';
import LeftNav from "./left-nav";
import AdminHeader from "./header";

const { Header, Footer, Sider, Content } = Layout



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
            二级路由组件界面
          </Content>
          <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更加页面操作</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default  Admin