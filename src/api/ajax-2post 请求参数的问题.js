/**
 * 封装一个AJAX请求的函数
 * 进行axios的 二次封装（ajax请求）
 * post 请求参数的问题
 */


 /**
  * 1.将post请求的data对象数据转换为urlencode格式的字符串
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

    return response
  },
  error =>{
    //throw  error
    return Promise.reject(error)
  }
)


//向外暴露instance

export default instance