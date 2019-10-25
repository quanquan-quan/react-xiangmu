/**
 * local数据存储的工具函数的封装
 * 提供三个功能
 *     1. 保存
 *     2. 读
 *     3. 删除
 */

 //使用store插件封装local存储
 import store from "store";

 // 1. 保存       
 function set(key,value) {
   //localStorage.setItem(key, value instanceof Object ? JSON.stringify(value):value) 
   store.set(key,value)    // 保存指定key和value 的数据
  }

 // 2. 读
 function get(key,defaultvalue) {
  if(defaultvalue===undefined){
    throw new Error('get() 必须指定默认值');
    
  }
  
  return store.get(key,defaultvalue)     // 获取指定key对应的值，如果没有，返回指定的默认值
  //  const value = localStorage.getItem(key)
  //   if(defaultvalue instanceof Object){
  //     return JSON.parse(value) || defaultvalue  //defaultvalues是默认值
  //   }
  //   return value || defaultvalue
 }

 // 3. 删除    
 function remove(key) {
  //localStorage.removeItem(key)
  if(key){               //删除指定key的数据
    store.remove()
  }else{                  // 如果不传key则删除所有
    store.clearAll()
  }
  
 }

 //暴露出去
  
export default{
  set,
  get,
  remove,
  KEYS:{
    USER_KEY:'user_key',
    TOKEN_KEY:'token_key'
  }
}