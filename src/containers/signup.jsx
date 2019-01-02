
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, resetStoreBar, signUp } from '../actions/bar_action';
import SignupForm from '../components/signup_form.jsx';
const SignUp = (props) => (
	<SignupForm {...props} />
)
const mapStateToProps = (state) => {
	return {
		token: state.bar_reducer.token,
		lstPermission: state.bar_reducer.lstPermission,
		userInfo: state.bar_reducer.userInfo,
		msg: state.bar_reducer.msg,
		loginSuccess: state.bar_reducer.loginSuccess,
		loginFail: state.bar_reducer.loginFail,
		countSignUp: state.bar_reducer.countSignUp,
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		login: (username, password) => {
			dispatch(login(username, password))
		},
		resetStoreBar: () => {
			dispatch(resetStoreBar())
		},
		signUp: (params) => {
			dispatch(signUp(params))
		},
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
