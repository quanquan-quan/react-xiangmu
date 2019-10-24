/**
 * 管理登录用户的reduce函数
 */

 import { SAVE_USER_TOKEN } from "../action-types";

 const initUser = {
   user:{},
   token:'',
   hasLogin:false  //是否已经登录
 }
 export default function user(state=initUser,action) {
   switch (action.type) {
     case SAVE_USER_TOKEN:
       const {user,token} =action.data
     return {
      user,
      token,
      hasLogin:true
     }
     default:
       return state
   }
 }