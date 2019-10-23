//登录 的  一级路由组件
import React, { Component } from 'react'
import { Form, Icon, Input, Button} from 'antd';
//import axios from "axios";
//import qs from 'qs'
 

import './login.less'
import logo from './images/logo.png'
import ajax from '../../api/ajax'

const {Item} = Form 
 class Login extends Component {
//点击登录按钮实现的功能
  handleSubmit = (event)=>{
    event.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) 
        console.log('发送ajax请求',values);
     // ajax.post('/login',values)
        // .then (response =>{
        //   const result = response.data
        //   console.log('请求成功',result)
          // if(result.status===0){
          //   const {user,token} = result.data
          //   console.log('登录成功',user,token)
          // }else{
          //   console.log('登录失败',result.msg)
          // }
 
          //  {user,token} = data   参数的结构 
          ajax.post('/login',values)
          .then((result)=>{
            //解构再解构  :是继续结构    等号是值   嵌套解构
              const {status,data:{user,token}={},msg} = result
                if(status===0){
                  console.log('登录成功',user,token)
                }else{
                  console.log('登录失败',msg)
                }
            //console.log('登录成功',user,token)
          })


        })

        .catch(error =>{  //就是mesage值
          console.log('请求出错了',error.message)
        })
      
    };
  
  validatePwm = (rule, value, callback)=>{
      if(!value){
        callback('密码必须输入')
      }else if(value.length<4){
        callback('密码必须大于等于4位')
      }else if(value.length>12){
        callback('密码必须小于等于12位')
      }else if(!/^[a-zA-Z0-9_]+$/.test(value)){  
        callback('密码必须是英文、数字或下划线组成')
      }else{
        callback()
      }
  }

  render() {
  
    const { getFieldDecorator } = this.props.form;

    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </header>
        <div className='login-content'>
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
            {
              getFieldDecorator('username', {
                initialValue:'', 
                rules: [
                  {required: true, message: '必须输入' },
                  {min:4,message:'用户名必须大于等于4位'},
                  {max:12,message:'用户名必须必须小于等于12位'},
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文、数字或下划线组成'} 
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />,
              )
            }
            </Item>
            <Item>
            {getFieldDecorator('password', {
            initialValue:'', 
            rules: [
              {validator:this.validatePwm}]})(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
              登录
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    )
  }
}
  

export default Form.create()(Login)

