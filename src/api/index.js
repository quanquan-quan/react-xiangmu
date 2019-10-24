/**
 * 包含n个接口请求函数的模块（一个接口对应一个请求函数）参考接口文档
 * 函数的返回值是promise  
 */

import ajax from './ajax'

 //要请求登录要有一个发送请求的登陆的函数
/* 登录 */
 export const reqLogin = ({username,password})=>ajax({
  url:'/login', //基础路径不需要写 原因在于跨域问题 不加是请求的前台地址
  method:'post',
  data:{username,password}
})

/**
 * 获取用户列表
 */

 export const reqUsers = ()=>ajax({
   url:'/manage/user/list',
   method:'GET',
 })
 //ajax('/manage/user/list')
 //ajax.get('/manage/user/list')