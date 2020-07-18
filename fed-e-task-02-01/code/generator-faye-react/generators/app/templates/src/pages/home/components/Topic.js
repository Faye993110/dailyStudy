import React, {Component} from 'react';
import './topic.css';
import {connect} from 'react-redux'
class Topic extends  Component {
    render(){
        return(
            <div className = 'topicWrapper'>
                {(this.props.topList|| []).map((item) => {
                    return(
                      <div className = 'topicItem' key = {item.id}>
                        <img alt = '' className = 'topic-pic' src = {item.imgUrl}></img>
                        {item.title}
                      </div>
                    )
                })}
               
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
topList: state.home.topicList,

})
export default connect(mapStateToProps, null)(Topic);