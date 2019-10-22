/**
 * 封装一个AJAX请求的函数
 * 进行axios的 二次封装（ajax请求）
 */
import axios from 'axios'


//创建一个instance
const instance = axios.create({
  timeout: 10000 //超时时间为10s
})

//添加请求拦截器
instance.interceptors.request.use(config=>{


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