/**
 * 向外暴露一个总的reducer函数
 */

 import {combineReducers} from 'redux'  //合并并暴露
 import user from './user'
 import xxx from './xxx'
 export default combineReducers({
  user,
  xxx
 })