import React, {Component} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {withRouter} from 'react-router-dom';
class Detail extends  Component {
    componentDidMount(){
        this.props.getDetail(this.props.match.params.id);
    }
    render(){
        return(
            <div className = 'detailWrapper'>
                <div className = 'header'>
                 {this.props.title}
                </div>
                <div className = 'content' dangerouslySetInnerHTML = {{__html:this.props.content}}>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
title : state.detail.title,
content : state.detail.content
})

const mapDispatch = (dispatch) => ({
    getDetail(id) {
     dispatch(actionCreators.getDetail(id));
     }
})

export default connect(mapStateToProps, mapDispatch)(withRouter(Detail));