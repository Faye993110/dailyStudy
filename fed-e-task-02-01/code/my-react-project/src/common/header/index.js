import React, {Component} from 'react';
import './header.css';
import '../../statics/confont/iconfont.css';
import { CSSTransition } from 'react-transition-group';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Link} from 'react-router-dom';
import {actionCreators as loginActionCreators} from '../../pages/login/store'

class Header extends Component{
    
	getListArea(){
		const {focused, list, page, mouseIn, totalPage, handleChangePage} = this.props;
		const copyList = list || [];
		const pageList = [];
		for(let i = (page-1) * 10; i < page * 10; i++){
			if(copyList[i]){
        pageList.push(<span key = {copyList[i]}>{copyList[i]}</span>);
			}
		}
		if(focused || mouseIn){
			return(
			<div className ="SearchInfo" 
						onMouseEnter = {this.props.onMouseEnter}
						onMouseLeave = {this.props.onMouseLeave}>
				<div className = 'SearchInfoTitle'>
					热门搜索
					<span className = 'SearchInfoSwitch' onClick = {()=>{handleChangePage(page, totalPage,this.spinIcon)}}>
					<i ref = {(icon) => {this.spinIcon = icon}} className='iconfont spin'>&#xe851;</i>换一批</span>
				</div>
				<div className = 'SearchInfoItem'>
					{pageList}
				</div>
			</div>)
			
		}else{
			 return ('')
		}
	}
	render() {
		const {focused, handleInputFocuse,handleInputBlur,list,login,logout} = this.props;
		
		return (
			<div className='headerWrapper'>
				  <Link to = '/'><div className='logo'></div></Link>
					<div className='nav'>
							<div className='navItem left active'>首页</div>
							<div className='navItem left'>下载APP</div>
							{login ? (<div onClick = {logout} className='navItem right'>退出</div> 
							):(
							<Link to = '/login'><div className='navItem right'>登陆</div></Link>)}
							<div className='navItem right'><i className='iconfont'>&#xe636;</i></div>
							<CSSTransition
									timeout={100}
									in={focused}
									classNames="slide">
							<div className='searchWrapper'>
									<input onFocus = {() => handleInputFocuse(list)} 
												 onBlur = {handleInputBlur}
												 className = {focused ? 'focused navSearch' : 'navSearch'}  placeholder="搜索"></input>
									<i className = {focused ? 'focused iconfont zoom' : 'iconfont zoom' }>&#xe62a;</i>
									{this.getListArea()}
							</div>
							</CSSTransition>
					</div>
					<div className='addition'>
						    <Link to ='/write'>
							<div className = "button writting"><i className='iconfont'>&#xe617;</i>写文章</div>
							</Link>
							<div className = "button reg">注册</div>
					</div>
			</div>
		);
	}
}





const mapStateToProps = (state) => {
  return{
		focused: state.header.focused,
		list: state.header.list,
		page: state.header.page,
		mouseIn: state.header.mouseIn,
		totalPage : state.header.totalPage,
		login : state.login.login
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
        handleInputBlur(){
			dispatch(actionCreators.searchBlur());
        },
        handleInputFocuse(list){
			(list.length === 0) && dispatch(actionCreators.getList()); 
			dispatch(actionCreators.searchFocus());
         
		},
		onMouseEnter(){
			dispatch(actionCreators.mouseEnter())
		},
		onMouseLeave(){
			dispatch(actionCreators.mouseLeave())
		},
		handleChangePage(page, totalPage, spin){
			let orginAngle = spin.style.transform.replace(/[^0-9]/ig,'')
			if(orginAngle){
				orginAngle = parseInt(orginAngle, 10);
			}else{
				orginAngle = 0;
			}
	orginAngle = orginAngle + 360;
			spin.style.transform = `rotate(${orginAngle}deg)`
		//	console.log(spin.style.transform);
		if(page < totalPage){
			dispatch(actionCreators.changePage(page+1))
		}else{
			dispatch(actionCreators.changePage(1))
		}
		},
		logout() {
			dispatch(loginActionCreators.logout())
		}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);