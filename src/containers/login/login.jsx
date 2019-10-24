//登录 的  一级路由组件
import React, { Component } from 'react'
import { Form, Icon, Input, Button} from 'antd';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
 

import './login.less'
import logo from './images/logo.png'
import { loginAsync } from "../../redux/action-creators/user";

  //connect(
  //   state =>({hasLogin:state.user.hasLogin}),  //用于显示状态的一般属性
  //   {loginAsync}   //用于更新状态的函数属性
  // )(Form.create()(Login))
//装饰器特殊的符号 是用于包装所有的Login的  装饰器语法会自动的执行一个函数



const Item=Form.Item
//const {Item} = Form 
@connect(
  state =>({hasLogin:state.user.hasLogin}),  //用于显示状态的一般属性
  {loginAsync}   //用于更新状态的函数属性
 )
@Form.create()  //下面的这个@先执行   这样写相当于 login = Form.create()(Login)


 class Login extends Component {
//点击登录按钮实现的功能
  handleSubmit = (event)=>{
    event.preventDefault()  //阻止浏览器的默认行为
    this.props.form.validateFields((err, values ) => {
      if (!err) 
        console.log('发送ajax请求',values);
          this.props.loginAsync(values)
        })
        .catch(error =>{  //就是mesage值
          console.log('请求出错了',error.message)
        })
    };
  
  validatePwm = (rule, value, callback)=>{
    const length = value && value.length
    const pwdReg = /^[a-zA-Z0-9_]+$/
      if(!value){
        callback('密码必须输入')
      }else if(length<4){
        callback('密码必须大于等于4位')
      }else if(length>12){
        callback('密码必须小于等于12位')
      }else if(!pwdReg.test(value)){  
        callback('密码必须是英文、数字或下划线组成')
      }else{
        callback()
      }
  }

  render() {
  
    const {hasLogin} = this.props
    if(hasLogin){  //如果已经登录自动跳转到admin界面
     // this.props.history.replace('/')
     return <Redirect to='/admin'/>  //在render中使用

    }
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
  

// export default connect(
//   state =>({hasLogin:state.user.hasLogin}),  //用于显示状态的一般属性
//   {loginAsync}   //用于更新状态的函数属性
// )(Form.create()(Login))

export default Login