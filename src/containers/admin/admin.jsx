/* 
后台管理的一级路由组件
*/
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { removeUserToken } from "../../redux/action-creators/user";
//import { threadId } from 'worker_threads';

class Admin extends Component {
//退出登录 删除前台数据就会退出登录 要与redux通信 更新redux的数据 所以要在redux/action-creators/user.js  写一个同步的action creators
  logout = ()=>{
    this.props.removeUserToken()
  }

  render() {



    //如果当前没有登录，自动跳转到登录界面  引入Redirect
    if(!this.props.hasLogin){
      return  <Redirect to='/login'/>
    }

    return (
      <div>
        Hello,{this.props.user.username}
        <button onClick={this.logout}>退出登录</button>
      </div>
    )
  }
}

export default  connect(
  state =>({user:state.user.user,hasLogin:state.user.hasLogin}),
  {removeUserToken}
)(Admin)