
/**
 * 封装LinkButton的函数组件
 */

import React from 'react'
import './index.less'

//函数组件可以接收数据，但是函数内部不可以有数据
export default function LinkButton(props) {

  return <button className='link-button' {...props}/>
}


// 1.<button></button>  这样写就相当于<button/>
// 2.组件标签体的内容以children的形式传递给组件内部    children是一个属性
//   children里保存的是LinkButton标签里所有的内容，包括字符串文本以及标签对象
// 3.props 里接收children属性 
// 4. 与原生标签对应的button标签接收到的children属性会转换成原生标签的标签体内容
//    <button {...props}/> 意思是将props接受到的所有属性（children）传递给button
//    <button children={children}/> 标签体内容会变成children 标签体内容最后会以children属性传递给组件内部
//    给button上传一个children button身上就有标签体内容  并且标签体文本是外部传进来的



