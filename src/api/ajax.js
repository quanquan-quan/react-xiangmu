/**
 * 封装一个AJAX请求的函数
 * 进行axios的 二次封装（ajax请求）
 * 
 */


 /**
  * 2.如果请求成功，判断操作是否成功
  *   如果成功 则返回data数据，外部具体请求得到需要的数据
  *   如果失败 则返回携带msg的错误，外部具体请求处理错误
  * 3.统一处理请求异常，外部调用者不用再处理请求异常
  * 4.请求过程中显示请求进度的效果
  * 5.token验证处理
  *   如果有token ,添加到请求头中：Authorization
  *   响应拦截器失败的回调：
  *       如果status401,清除用户数据，自动跳转到登录页面内
  *       如果当前已经在登录界面，不需要做处理
  */
 import axios from 'axios'
 import qs from 'qs' 
 import { message } from "antd";

 import store from "../redux/store";
 import {removeUserToken} from '../redux/action-creators/user'
 import history from '../history';
 //创建一个instance
 const instance = axios.create({
   timeout: 10000 //超时时间为10s
 })
 
 //添加请求拦截器
 instance.interceptors.request.use(config=>{  //config配置的属性 url（请求地址）/method(请求方式) /data（请求数据）/params
   //1.将post/put/delete请求的data对象数据转换为urlencode格式的字符串
 const {data} = config //结构赋值  相当于config.data
 
   if(data instanceof Object){  //只要data是对象就转换
     config.data = qs.stringify(data)
 }
//5.如果有token ,添加到请求头中：Authorization
const token = store.getState().user.token
   if(token){
     //config对应的是当前请求的配置
     config.headers['Authorization'] = 'atguigu_' + token
   }
   return config  //必须返回config
 })
 
 
 
 //添加响应拦截器
 instance.interceptors.response.use(
   response =>{
   const result = response.data
  //  if(result.data===0){ //操作成功
  //    return result.data || {}  //外部成功回调得到对象类型的数据{}避免取内部数据时出现andifind或者null的情况
  //  }else{ //操作失败
  //    return Promise.reject(result.msg || '操作失败，未知原因')
  //   }
  return result
   },
   error =>{

    //3.统一处理请求异常，外部调用者不用再处理请求异常

    
     // debugger  用于在代码中打断点
    //如果status为401，token有问题
     //const status = error.response.status
     const {status,data:{msg}={}} = error.response
     if(status===401){
//如果当前没有在登录界面（当前路由路径不是/login）
      if(history.location.pathname!=='/login'){
      //显示提示
      message.error(msg)
      //删除用户信息，自动跳转到登录界面
        store.dispatch(removeUserToken())
      }
     
     }else if(status===404){
      message.error('请求资源不存在')
     }else{
      message.error('请求出错',+error.message)
     }

     //throw  error  
     
      //显示请求错误的提示
     //message.error('请求出错',+error.message)
      //中断Promise链，外部不需要再处理请求出错的情况

      return new Promise(()=>{})

     //return Promise.reject(error)
   }
 )
 
 
 //向外暴露instance
 
 export default instance