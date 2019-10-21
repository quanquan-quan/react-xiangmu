//登录 的  一级路由组件
import React, { Component } from 'react'
import { Form, Icon, Input, Button} from 'antd';
// Icon 是提示栏的图标  

import './login.less'
import logo from './images/logo.png'

const {Item} = Form  //必须在所有import下面

 class Login extends Component {
//点击登录按钮实现的功能
  handleSubmit = (event)=>{
    event.preventDefault()//点击提交按钮时是发送Ajax请求不提交表单所以要禁止默认行为
    //读取form收集数据
    //const form = this.props.form  
    //const username = form.getFieldValue('username')  //收集用户名
    //const Password = form.getFieldValue('password')  //收集密码
    //const values = form.getFieldsValue()  //得到一个对象 
    //console.log(username,Password,values) 

//对所有表单项进行统一的表单验证 验证完之后调用   validateFields  
    this.props.form.validateFields((err, values) => {
      if (!err) {//如果没有错误就是验证成功了  点击登录按钮时发送ajax请求
        console.log('发送ajax请求',values);
      }else{
        //原本就有提示   不用写else
      }
    });

  }
  //自定义验证 验证密码输入的合法性要求
  /*
      用户名/密码的合法性要求
                      1). 必须输入
                      2). 必须大于等于4位
                      3). 必须小于等于12位
                      4). 必须是英文、数字或下划线组成
   */
  //  去除输入密码时的空格   value = value.trim()
  validatePwm = (rule, value, callback)=>{
      if(!value){
        callback('密码必须输入')
      }else if(value.length<4){
        callback('密码必须大于等于4位')
      }else if(value.length>12){
        callback('密码必须小于等于12位')
      }else if(!/^[a-zA-Z0-9_]+$/.test(value)){  //匹配正则时用的方法 .test（）
        callback('密码必须是英文、数字或下划线组成')
      }else{
        callback()//代表验证通过
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
              getFieldDecorator('username', { //配置对象
                initialValue:'', //初始值
                 //声明式验证：利用已有的验证规则进行验证
                  /*
                  用户名/密码的合法性要求
                  1). 必须输入
                  2). 必须大于等于4位
                  3). 必须小于等于12位
                  4). 必须是英文、数字或下划线组成
                  */
                rules: [
                  {required: true, message: '必须输入' },//必须输入
                  {min:4,message:'用户名必须大于等于4位'},//必须大于等于4位
                  {max:12,message:'用户名必须必须小于等于12位'},//必须小于等于12位
                  {pattern:/^[a-zA-Z0-9_]+$/,message:'必须是英文、数字或下划线组成'}//正则表达式校验  必须是英文、数字或下划线组成
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
            {getFieldDecorator('password', {//配置对象
            initialValue:'', //初始值
            
            //声明式验证：利用已有的验证规则进行验证
            /*
            用户名/密码的的合法性要求
            1). 必须输入
            2). 必须大于等于4位
            3). 必须小于等于12位
            4). 必须是英文、数字或下划线组成
            */
            rules: [
              // 自定义校验
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
//const LoginWrap = Form.create()(Login)
//export default LoginWrap
export default Form.create()(Login)



//1.收集输入数据
//2.前台表单验证
//3.提交登录的ajax请求