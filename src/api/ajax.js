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
  * 
  */
 import axios from 'axios'
 import qs from 'qs'
 
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
   return config  //必须返回config
 })
 
 
 
 //添加相应拦截器
 instance.interceptors.response.use(
   response =>{
   const result = response.data
   if(result.data===0){ //操作成功
     return result.data || {}  //外部成功回调得到对象类型的数据{}避免取内部数据时出现andifind或者null的情况
   }else{ //操作失败
     return Promise.reject(result.msg || '操作失败，未知原因')
    }
   },
   error =>{
     //throw  error
     return Promise.reject(error)
   }
 )
 
 
 //向外暴露instance
 
 export default instance