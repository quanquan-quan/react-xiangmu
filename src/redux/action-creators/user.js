/**
 * 操作登录用户信息数据的action creator
 */
import { reqLogin } from "../../api";
import { message } from "antd";
import { SAVE_USER_TOKEN } from "../action-types";


/**
 * 保存user和token的同步action creator
 */
const saveUserToken = (user,token) =>({type:SAVE_USER_TOKEN,data: {user,token}})

 /**
  * 用于登录请求的异步action creator
  */

  export function loginAsync({username,password}) {
    //返回一个异步action函数
    return async dispatch=>{  //action函数接受一个固定参数dispatch
        // 1.执行异步请求 (执行异步请求要调用发请求的方法src/api/ajax.js))
      const result = await reqLogin({username,password})
        //2.根据结果分分发同步action
        if(result.status===0){
          //登录成功
         const {user,token}= result.data
         //将user,token保存在local中

         // 分发保存user,token信息的同步action
         dispatch(saveUserToken(user,token))

        }else{
          //登录失败
          message.error(result.msg)
        }

    }
  }