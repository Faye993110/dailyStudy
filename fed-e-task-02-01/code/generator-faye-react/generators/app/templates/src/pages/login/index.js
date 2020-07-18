import React, {PureComponent} from 'react';
import './style.css';
import {connect} from 'react-redux';
import {actionCreators} from './store';
import {Redirect} from 'react-router-dom'

class Login extends  PureComponent {
    componentDidMount(){
       
    }
    render(){
        const {loginStatus}=this.props;
        if(!loginStatus){
            return(
                <div className = 'loginWrapper'>
                   <div className = 'loginBox'>
                       <input className = 'input' placeholder = 'ID' ref={(input) => {this.account = input}}></input>
                       <input className = 'input' placeholder = 'Password' type = 'password' ref={(input) => {this.password = input}}></input>
                       <button onClick = {() => {this.props.login(this.account.value, this.password.value)}} className = 'loginbutton'>登陆</button>
                   </div>
                </div>
            )
        }else{
            return <Redirect to = '/' />
        }
        
    }
}
const mapStateToProps = (state) => ({
   loginStatus: state.login.login
})

const mapDispatch = (dispatch) => ({
   login(account, password){
      dispatch(actionCreators.login(account,password));
   }
  
})

export default connect(mapStateToProps, mapDispatch)(Login);