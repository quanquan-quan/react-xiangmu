import React, { Component } from 'react'
import LinkButton from '../../../components/link-button'
import './index.less'
/**
 * 管理界面的头部的组件
 */

export default class Header extends Component {

  logout = ()=>{
    alert('logout')
  }

  render() {
    return (
      <div className='header'>
       <div className='header-top'>
         <span>欢迎,xxx</span>
         <LinkButton onClick={this.logout}>退出</LinkButton>
       </div>
       <div className='header-bottom'>
         <div className='header-bottom-left'>折线图</div>
         <div className='header-bottom-right'>
           <span>2019-10-24 16:03:58</span>
           <img src="http://api.map.baidu.com/images/weather/day/xiaoyu.png" alt="weather"/>
            <span>小雨转多云</span>
         </div>
       </div>
      </div>
    )
  }
}
