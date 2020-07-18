import React, {PureComponent} from 'react';
import './style.css'
import Topic from './components/Topic';
import List from './components/List';
import Writer from './components/Writer';
import Recommend from './components/Recommend';
import {actionCreators} from './store';     
import {connect} from 'react-redux'

class Home extends PureComponent {

	// shouldComponentUpdate(){

	// }
	handleScrollTop() {
		window.scrollTo(0, 0);
	}
	bindEvents(){
		window.addEventListener('scroll',this.props.changeScrollTopShow)
	}
	componentDidMount(){
			this.props.changeHomeData();
			this.bindEvents();
	}

	componentWillUnmount(){
		window.removeEventListener('scroll',this.props.changeScrollTopShow())
	}
    render(){
			return(
				<div className = 'homeWrapper'>
					<div className = 'homeLeft'>
						<img alt = '' className = 'banner-img' src="//upload.jianshu.io/admin_banners/web_images/4807/80c81765b76cce7a0cbdab0b65bb34d2fafc0a9b.png?imageMogr2/auto-orient/strip|imageView2/1/w/1250/h/540"></img>
						<Topic></Topic>
						<List></List>
					</div>
					<div className = 'homeRight'>
						<Recommend></Recommend>
						<Writer></Writer>
					</div>
					{this.props.showScroll ?  <div className = 'backTop' onClick = {this.handleScrollTop}>顶部</div> : null}
         
				</div>
			)
    };  
}

const mapStateToProps = (state) =>({
  showScroll : state.home.showScroll
})
const  mapDispatch = (dispatch) => ({
   changeHomeData() {
		 const action = actionCreators.getHomeInfo();
		 dispatch(action);
	 },
	 changeScrollTopShow(){
     if(document.documentElement.scrollTop > 100){
        dispatch(actionCreators.toggleTopShow(true))
		 }else{
			  dispatch(actionCreators.toggleTopShow(false))
		 }
	 }
});

export default connect(mapStateToProps,mapDispatch)(Home);