
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {login, resetStoreBar} from '../actions/bar_action';
import LoginForm from '../components/login_form.jsx';
const Login = (props) => (
	<LoginForm {...props}/>
)
const mapStateToProps = (state) =>{
	return{
		token: state.bar_reducer.token,
		lstPermission: state.bar_reducer.lstPermission,
		userInfo: state.bar_reducer.userInfo,
		msg: state.bar_reducer.msg,
		loginSuccess: state.bar_reducer.loginSuccess,
		loginFail: state.bar_reducer.loginFail
	}
}
const mapDispatchToProps = (dispatch) =>{
	return{
		login: (username, password) => {
			dispatch(login(username,password))
		},
		resetStoreBar: () =>{
			dispatch(resetStoreBar())
		}
	}	
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
