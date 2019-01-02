
import axios from 'axios';

import {
	requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
	requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

// import {configUrl} from './config.js';
// export const api_url = configUrl;


export const login = (username, password) => {
	var params = {
		username: username,
		password: password
	}, url = 'login';
	return dispatch => {
		requestPostJson(url, params, function (response) {
			if (response.status === 200) {
				if (response.data.success)
					dispatch({
						type: 'LOGIN_SUCCESS',
						data: response.data.data,
						token: response.headers.authorization,
						lstPermission: response.data.lstPermission
					});
				else {
					dispatch({
						type: 'LOGIN_FAIL',
						msg: response.data.msg
					});
				}

			}
			else {
				alert("Wrong username or password")
			}
		})
	}
}
export const logout = () => {
	var params = {}
	var url = 'logout'
	return dispath => {
		requestPostJson(url, params, function (response) {
			dispath({
				type: 'LOGOUT',
				data: response.data
			})
		})
	}
}

export const signUp = (params) => {
	let url = '/sign-up'
	let type = 'SIGN_UP'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const sidebarCollapse = () => {
	return {
		type: 'SIDEBAR_COLLAPSE'
	}
}

export const resetStoreBar = () => {
	return {
		type: 'RESET_STORE_BAR'
	}
}

export const activeUser = (params) => {
	let url = '/active-account'
	let type = 'ACTIVE_ACCOUNT'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const resendActiveCode = (params) => {
	let url = '/resend-active-code'
	let type = 'RESEND_ACTIVE_CODE'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const changePassword = (params) => {
    let url = '/user/update-password';
    let type = 'CHANGE_PASSWORD'
    return requestPutJsonReturnDispatch(url, params, type)
}