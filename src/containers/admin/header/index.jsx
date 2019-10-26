import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom"; //高阶组件

import LinkButton from '../../../components/link-button'
import './index.less'
/**
 * 管理界面的头部的组件
 */

// 获取当前  //connect包装的是withRouter包装后的组件
 @connect(state =>({username:state.user.user.username}))
 @withRouter  //这个高阶组件函数接收的是Header 返回一个新的组件
class Header extends Component {

  logout = ()=>{
    alert('logout')
  }

  render() {
//得到当前请求的路由路径
const path= this.props.location.pathname

    return (
      <div className='header'>
       <div className='header-top'>
         <span>欢迎,{this.props.username}</span>
         <LinkButton onClick={this.logout}>退出</LinkButton>
       </div>
       <div className='header-bottom'>
         <div className='header-bottom-left'>{path}</div>
         <div className='header-bottom-right'>
           <span>2019-10-24 16:03:58</span>
           <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather"/>
            <span>小雨转多云</span>
         </div>
       </div>
      </div>
    )
  }
}
export default Header