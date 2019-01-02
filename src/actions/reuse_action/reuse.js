
import axios from 'axios';

import { requestGetJson, requestPostFormDataReturnDispatch } from '../index.js';
import {
	notification
} from 'antd';

export const getBoOrCusByName = (params) => {
	let url = 'crp/get-owner-by-name?name=' + params.stringName + '&is_cus=' + params.type
	return dispatch => {
		requestGetJson(url, function (response) {
			dispatch({
				type: 'GET_BO_OR_CUS_BY_NAME',
				data: response.data
			})
		})
	}
}

export const setSortTable = (params) => {
	return {
		type: 'SET_SORT_TABLE',
		data: params
	}
}

export const sortTableClient = (a, b, column) => {
	var nameA = a[column].toUpperCase(); // ignore upper and lowercase
	var nameB = b[column].toUpperCase(); // ignore upper and lowercase
	if (nameA < nameB) {
		return -1;
	}
	if (nameA > nameB) {
		return 1;
	}
	return 0;
}

export const validateInputNumber = (value) => {
	let vali_value = null;
	vali_value = value.toString().replace(/[^0-9]/g, '');
	vali_value = vali_value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	return vali_value;
}

export const scrollToErrorForm = (err) => {
	notification.warning({
		message: err[Object.keys(err)[0]].errors[0].message
		// description: err[Object.keys(err)[0]].errors[0].message
	});
	let elm = document.getElementById(err[Object.keys(err)[0]].errors[0].field);
	
	if (elm != undefined) {
		let collapse_parent = elm.closest('.ant-collapse-item');
		if (collapse_parent != undefined ) {
			if (collapse_parent.firstChild.getAttribute('aria-expanded') == "false") {
				collapse_parent.firstChild.click();
			}
		}
		elm.click();
		setTimeout(() => {
			elm.focus();
		}, 300);
	}
}