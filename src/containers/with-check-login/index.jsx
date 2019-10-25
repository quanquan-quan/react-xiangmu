/**
 * 封装一个用于检查用户登录的高阶组件
 */

 import React from "react";
 import { connect } from "react-redux";
 import { Redirect } from "react-router-dom";

 export default function WithCheckLogin( WrappendComponent) {  //wrappendComponent是被包装的组件


  //高阶组件函数返回一个新的组件
  @connect(state =>({hasLogin:state.user.hasLogin}))
    class HocComponent extends React.Component{
     render (){
      const path = this.props.location.pathname
      const {hasLogin, ...rest} = this.props
      //{hasLogin, ...rest}的意思是除hasLogin之外的属性都会传给子组件 rest是包含其他所有属性的对象
       //如果请求的是login ，但已经登录，自动跳转到admin

        if(path==='/login'&& hasLogin) return <Redirect to='/'/>
       //如果请求的不是admin ， 但是没有登录 ， 自动跳转到login 
        if(path!=='/login' && !hasLogin) return <Redirect to='/login'/>
       //将父组件所有接收的属性传递给被包装组件
        return <WrappendComponent {...rest}/>
     }
   }
   return HocComponent   //HocComponent实质上是return的是connect包装后的组件
 }