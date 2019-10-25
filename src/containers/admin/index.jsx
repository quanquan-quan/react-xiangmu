/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import { connect } from "react-redux";
//import { Redirect } from "react-router-dom";
import { removeUserToken } from "../../redux/action-creators/user";
//import { threadId } from 'worker_threads';
import {reqUsers} from '../../api'
import withCheckLogin from "../with-check-login";

@connect(
  state =>({user:state.user.user}),
  {removeUserToken}
)
@withCheckLogin
class Admin extends Component {
//点击退出登录 删除前台数据就会退出登录 要与redux通信 更新redux的数据 所以要在redux/action-creators/user.js  写一个同步的action creators
  logout = ()=>{
    this.props.removeUserToken()
  }
  //点击获取用户列表
  getUsers = async ()=>{
   const result = await reqUsers()
   console.log('result',result)
  }
  render() {
    return (
      <div>
        Hello,{this.props.user.username}
        <button onClick={this.logout}>退出登录</button>
        &nbsp;
        <button onClick={this.getUsers}>获取用户列表</button>
      </div>
    )
  }
}

export default  Admin