import React, {PureComponent} from 'react';
import './topic.css';
import {connect} from 'react-redux';
import {actionCreators} from '../store';
import {Link} from 'react-router-dom'
class List extends PureComponent {
	
    render(){
      return(
					<div>
						{
							(this.props.articleList||[]).map((item,index) => {
								return(
									<Link key = {index} to = {'/detail/' + item.id} >
                  <div key = {index} className = 'listItem'>
										<img src={item.imgUrl} alt = ''></img>
										<div className = 'listInfo'>
												<h3>{item.title}</h3>
												<p>{item.desc}</p>
										</div>
							  	</div>
									</Link>
								)
							})
						}
            <div className = 'loadMore' onClick = {()=>this.props.getMoreList(this.props.page)}>loadMore</div>
					</div>
      )
    }
}

const mapStateToProps = (state)=>({
	 articleList : state.home.articleList,
	 page: state.home.articlePage
})
const mapDispatchToProps = (dispatch) => ({
   getMoreList(page){
     dispatch(actionCreators.getMoreList(page))
	 }
})
export default connect(mapStateToProps,mapDispatchToProps)(List);