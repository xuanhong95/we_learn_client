import axios from 'axios';
import cookie from 'react-cookies';
import { configUrl } from './config.js';
// import {requestPostJson} from './CallServer.js';
import React, { Component } from 'react';
import { notification } from 'antd'

export const baseURL = configUrl;
export const deleteToken = () => {
	cookie.remove('token', { path: '/' })
	document.location.href = '/#/login'
}

const token = cookie.load('token');
export const requestPostJson = (url, params, callback) => {
	axios({
		method: 'POST',
		baseURL: baseURL,
		url: url,
		data: params,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': cookie.load('token')
		}
	}).then(function (response) {
		if (response.data.code != undefined) {
			if (response.data.code == '401')
				deleteToken()
			else if (response.data.code == '404'){
				document.location.href = '/#/not-found'
			}
		} else {
			callback(response)
		}
	});
}
export const requestPostFormData = (url, params, callback) => {
	axios({
		method: 'POST',
		baseURL: baseURL,
		url: url,
		data: params,
		headers: {
			// 'Content-Type': 'multipart/form-data',
			'Authorization': cookie.load('token'),
		}
	}).then(function (response) {
		if (response.data.code != undefined) {
			if (response.data.code == '401')
				deleteToken()
			else if (response.data.code == '404'){
				document.location.href = '/#/not-found'
			}
		} else {
			callback(response)
		}
	});
}
export const requestGetJson = (url, callback) => {
	axios({
		method: 'GET',
		baseURL: baseURL,
		url: url,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': cookie.load('token')
		}
	}).then(function (response) {
		if (response.data.code != undefined) {
			if (response.data.code == '401')
				deleteToken()
			else if (response.data.code == '404'){
				document.location.href = '/#/not-found'
			}
		} else {
			callback(response)
		}
	})
}
export const requestPutJson = (url, params, callback) => {
	axios({
		method: 'PUT',
		baseURL: baseURL,
		url: url,
		data: params,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': cookie.load('token')
		},
		validateStatus: function (status) {
			return status >= 200 && status < 500;
		}
	}).then(function (response) {
		if (response.data.code != undefined) {
			if (response.data.code == '401')
				deleteToken()
			else if (response.data.code == '404'){
				document.location.href = '/#/not-found'
			}
		} else {
			callback(response)
		}
	});
}

export const requestDeleteJson = (url, params, callback) => {
	axios({
		method: 'DELETE',
		baseURL: baseURL,
		url: url,
		data: params,
		headers: {
			'Content-Type': 'application/json',
			'Authorization': cookie.load('token')
		},
		validateStatus: function (status) {
			return status >= 200 && status < 500;
		}
	}).then(function (response) {
		if (response.data.code != undefined) {
			if (response.data.code == '401')
				deleteToken()
			else if (response.data.code == '404'){
				document.location.href = '/#/not-found'
			}
		} else {
			callback(response)
		}
	});
}

export const requestPostJsonReturnDispatch = (url, params, type) => {
	return dispatch => {
		dispatch({ type: 'CALL_API', data: true })
		axios({
			method: 'POST',
			baseURL: baseURL,
			url: url,
			data: params,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': cookie.load('token')
			}
		}).then(function (response) {
			dispatch({ type: 'CALL_API', data: false })
			if (response.data.code != undefined) {
				if (response.data.code == '401')
					deleteToken()
				else if (response.data.code == '404'){
					document.location.href = '/#/not-found'
				}
			} else {
				if (response.data.success) {
					dispatch({
						type: type,
						data: response.data
					})
				} else {
					console.log(response.data.msg); notification.error({
						message: 'Lỗi',
						description: response.data.msg
					});
				}

			}
		});
	}
}
export const requestPostFormDataReturnDispatch = (url, params, type) => {
	return dispatch => {
		dispatch({ type: 'CALL_API', data: true })
		axios({
			method: 'POST',
			baseURL: baseURL,
			url: url,
			data: params,
			headers: {
				// 'Content-Type': 'multipart/form-data',
				'Authorization': cookie.load('token'),
			}
		}).then(function (response) {
			dispatch({ type: 'CALL_API', data: false })
			if (response.data.code != undefined) {
				if (response.data.code == '401')
					deleteToken()
				else if (response.data.code == '404'){
					document.location.href = '/#/not-found'
				}
			} else {
				if (response.data.success) {
					dispatch({
						type: type,
						data: response.data
					})
				} else {
					console.log(response.data.msg); notification.error({
						message: 'Lỗi',
						description: response.data.msg
					});
				}

			}
		});
	}
}
export const requestGetJsonReturnDispatch = (url, type) => {
	return dispatch => {
		dispatch({ type: 'CALL_API', data: true })
		axios({
			method: 'GET',
			baseURL: baseURL,
			url: url,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': cookie.load('token')
			}
		}).then(function (response) {
			dispatch({ type: 'CALL_API', data: false })
			if (response.data.code != undefined) {
				if (response.data.code == '401')
					deleteToken()
				else if (response.data.code == '404'){
					document.location.href = '/#/not-found'
				}
			} else {
				if (response.data.success) {
					dispatch({
						type: type,
						data: response.data
					})
				} else {
					console.log(response.data.msg); notification.error({
						message: 'Lỗi',
						description: response.data.msg
					});
				}

			}
		});
	}
}
export const requestPutJsonReturnDispatch = (url, params, type) => {
	return dispatch => {
		dispatch({ type: 'CALL_API', data: true })
		axios({
			method: 'PUT',
			baseURL: baseURL,
			url: url,
			data: params,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': cookie.load('token')
			},
			validateStatus: function (status) {
				return status >= 200 && status < 500;
			}
		}).then(function (response) {
			dispatch({ type: 'CALL_API', data: false })
			if (response.data.code != undefined) {
				if (response.data.code == '401')
					deleteToken()
				else if (response.data.code == '404'){
					document.location.href = '/#/not-found'
				}
			} else {
				if (response.data.success) {
					dispatch({
						type: type,
						data: response.data
					})
				} else {
					console.log(response.data.msg); notification.error({
						message: 'Lỗi',
						description: response.data.msg
					});
				}

			}
		});
	}
}

export const requestDeleteJsonReturnDispatch = (url, params, type) => {
	return dispatch => {
		dispatch({ type: 'CALL_API', data: true })
		axios({
			method: 'DELETE',
			baseURL: baseURL,
			url: url,
			data: params,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': cookie.load('token')
			},
			validateStatus: function (status) {
				return status >= 200 && status < 500;
			}
		}).then(function (response) {
			dispatch({ type: 'CALL_API', data: false })
			if (response.data.code != undefined) {
				if (response.data.code == '401')
					deleteToken()
				else if (response.data.code == '404'){
					document.location.href = '/#/not-found'
				}
			} else {
				if (response.data.success) {
					dispatch({
						type: type,
						data: response.data
					})
				} else {
					console.log(response.data.msg); notification.error({
						message: 'Lỗi',
						description: response.data.msg
					});
				}

			}
		});
	}
}