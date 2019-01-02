import {
	requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
	requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listBoPagination = (params) => {
	let url = 'bo/get-bo-by-page';
	return dispatch => {
		requestPostJson(url, params, function (response) {
			dispatch({
				type: 'LIST_BO_PAGINATION',
				data: response.data
			})
		})
	}
}

export const resetBO = () =>{
	return{
		type: 'RESET_BO'
	}
}

export const fetchSaleTaskBO = (params) => {
	let url = '/bo/get-all-sale-task-bo'
	return dispatch => {
		requestPostJson(url, params, function (response) {
			dispatch({
				type: 'GET_SALE_JOB_BO',
				data: response.data
			})
		})
	}
}

export const getBoSelectByPage = (params) => {
	let url = '/bo/get-bo-select-by-page'
	let type = 'GET_BO_SELECT_BY_PAGE'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const getProviderListByID = (params) => {
	let url = '/prov/get-prov-by-lst-id'
	let type = 'GET_PROVIDER_LIST_BY_ID'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const getProviderListByIDModal = (params) => {
	let url = '/prov/get-prov-by-lst-id'
	let type = 'GET_PROVIDER_LIST_BY_ID_MODAL'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const getAllListProvider = (params) => {
	let url = '/prov/get-all-cus-prov'
	let type = 'GET_ALL_LIST_PROVIDER'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const getPlaceSelectByPage = (params) => {
	let url = '/place/get-place-select-by-page'
	let type = 'GET_PLACE_SELECT_BY_PAGE'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTransRouteEnd = (params) => {
	let url = '/bo/get-all-trans-phase-select'
	let type = 'FETCH_TRANS_ROUTE_END'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchBoundTrans = (params) => {
	let url = '/bo/get-all-trans-router'
	let type = 'FETCH_BOUND_TRANS'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchAllInputResource = () => {
	let url = '/attr/get-all-by-type?type_id=1&status=-1'
	return dispatch => {
		requestGetJson(url, function (response) {
			dispatch({
				type: 'GET_ALL_INPUT_RESOURCE',
				data: response.data
			})
		})
	}
}

export const fetchAllBoType = () => {
	let url = '/attr/get-all-by-type?type_id=12&status=-1'
	return dispatch => {
		requestGetJson(url, function (response) {
			dispatch({
				type: 'GET_ALL_BO_TYPE',
				data: response.data
			})
		})
	}
}

export const insertBO = (params) => {
	let url = '/bo/insert'
	let type = 'INSERT_BO'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const approveBO = (params) => {
	let url = '/bo/approve'
	let type = 'APPROVE_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}

export const changePicSale = (params) => {
	let url = '/bo/change-pic-sale'
	let type = 'CHANGE_PIC_SALE_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}
export const updateStatusBO = (params) => {
	let url = '/bo/update-status-bo'
	let type = 'UPDATE_STATUS_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}
export const updateSaleStatusBO = (params) => {
	let url = '/bo/update-sale-status-bo'
	let type = 'UPDATE_SALE_STATUS_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}
export const updateBO = (params) => {
	let url = '/bo/update'
	let type = 'UPDATE_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}
export const fetchBOById = (params) => {
	let url = '/bo/get-bo-by-id?id=' + params
	let type = 'GET_BO_BY_ID'
	return requestGetJsonReturnDispatch(url, type)
}
export const getAllLinkBoById = (params) => {
	let url = '/bo/get-all-link-bo'
	let type = 'GET_ALL_LINK_BO_ID'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const getAllServiceStartEndPlace = () => {
	let url = '/attr/get-all-by-type?type_id=6&status=-1'
	let type = 'GET_ALL_SERVICE_START_END_PLACE'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllTransMethod = () => {
	let url = '/attr/get-all-by-type?type_id=18&status=-1'
	let type = 'FETCH_ALL_TRANS_METHOD'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllIncoterm = () => {
	let url = '/attr/get-all-by-type?type_id=7&status=-1'
	let type = 'FETCH_ALL_INCOTERM'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllPlaceType = () => {
	let url = '/place-type/get-all-place-type'
	let type = 'FETCH_ALL_PLACE_TYPE'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllContType = () => {
	let url = '/attr/get-all-by-type?type_id=8&status=-1'
	let type = 'FETCH_ALL_CONT_TYPE'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllTransForm = () => {
	let url = '/attr/get-all-by-type?type_id=14&status=-1'
	let type = 'FETCH_ALL_TRANS_FORM'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllProductTypeSelect = () => {
	let url = '/attr/get-all-by-type?type_id=2&status=-1'
	let type = 'FETCH_ALL_PROD_TYPE_SELECT'
	return requestGetJsonReturnDispatch(url, type)
}

export const getAllSaleTaskById = (params) => {
	let url = '/bo/get-all-sale-task-bo'
	let type = 'GET_ALL_SALE_TASK_ID'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const getAllPicBoById = (params) => {
	let url = '/bo/get-all-pic-bo'
	let type = 'GET_ALL_PIC_BO_ID'
	return requestPostJsonReturnDispatch(url, params, type)
}
export const getAllCrpByBoId = (params) => {
	let url = '/bo/get-all-crp'
	let type = 'GET_ALL_CRP_BY_BO_ID'
	return requestPostJsonReturnDispatch(url, params, type)
}
export const getAllTransPhaseByBoId = (params) => {
	let url = '/bo/get-all-trans-phase-bo'
	let type = 'GET_ALL_TRANS_PHASE_BY_BO_ID'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchAllSale = () => {
	let url = '/user/get-all-by-group-code?group_code=sal'
	let type = 'FETCH_ALL_SALE'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllSaleAdmin = () => {
	// Tạm thời lấy toàn bộ user
	let url = '/user/get-all-by-group-code?group_code='
	// let url = '/user/get-all-by-group-code?group_code=sad'
	let type = 'FETCH_ALL_SALE_ADMIN'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllTransportType = () => {
	let url = '/attr/get-all-by-type?type_id=14&status=-1'
	let type = 'FETCH_ALL_TRANSPORT_TYPE'
	return requestGetJsonReturnDispatch(url, type)
}
export const fetchAllCurrency = () => {
	let url = '/attr/get-all-by-type?type_id=15&status=-1'
	let type = 'FETCH_ALL_CURRENCY'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllFieldType = () => {
	let url = '/attr/get-all-by-type?type_id=3&status=-1'
	let type = 'FETCH_ALL_FIELD_TYPE'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllMerchandise = () => {
	let url = '/attr/get-all-by-type?type_id=4&status=-1'
	let type = 'FETCH_ALL_MERCHANDISE'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchAllConnectionType = () => {
	let url = '/attr/get-all-by-type?type_id=16&status=-1'
	let type = 'FETCH_ALL_CONNECTION_TYPE'
	return requestGetJsonReturnDispatch(url, type)
}

export const fetchTransPhaseByID = (params) => {
	let url = '/bo/get-trans-phase-by-id'
	let type = 'FETCH_TRANS_PHASE_BY_ID'
	return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchAllBusiness = () => {
	let url = '/attr/get-all-by-type?type_id=5&status=-1'
	let type = 'FETCH_ALL_BUSINESS'
	return requestGetJsonReturnDispatch(url, type)
}

export const deleteBO = (params) => {
	let url = '/bo/delete'
	let type = 'DELETE_BO'
	return requestDeleteJsonReturnDispatch(url, params, type)
}

export const deleteTransRoute = (params) => {
	let url = '/bo/delete-trans-router'
	let type = 'DELETE_TRANS_ROUTE'
	return requestDeleteJsonReturnDispatch(url, params, type)
}
export const deleteTransPhase = (params) => {
	let url = '/bo/delete-trans-phase'
	let type = 'DELETE_TRANS_PHASE'
	return requestDeleteJsonReturnDispatch(url, params, type)
}
export const deletePicBO = (params) => {
	let url = '/bo/delete-pic-bo'
	let type = 'DELETE_PIC_BO'
	return requestDeleteJsonReturnDispatch(url, params, type)
}
export const deleteLinkBO = (params) => {
	let url = '/bo/delete-link-bo'
	let type = 'DELETE_LINK_BO'
	return requestDeleteJsonReturnDispatch(url, params, type)
}
export const removeBO = (params) => {
	let url = '/bo/remove'
	let type = 'REMOVE_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}

export const setSaleBO = (params) => {
	let url = '/bo/change-pic-sale-lst-bo'
	let type = 'SET_SALE_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreBO = (params) => {
	let url = '/bo/restore'
	let type = 'RESTORE_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}

export const sendMailToSaleDept = (params) => {
	let url = 'bo/send-mail-to-sale'
	return dispatch => {
		requestPostJson(url, params, function (response) {
			// dispatch({
			// 	type: '',
			// 	data: response.data
			// })
		})
	}
}
export const setLastSearchBO = (obj) => {
	return {
		type: 'SET_LAST_SEARCH_BO',
		data: obj
	}
}

export const deleteFile = (params) => {
	let url = '/bo/delete-card-visit';
	let type = 'DELETE_ROW_IMAGE_BO'
	return requestPutJsonReturnDispatch(url, params, type)
}


