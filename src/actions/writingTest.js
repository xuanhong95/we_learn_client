import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listTestPagination = (params) => {
    let url = 'writing-test/get-wt-by-page';
    let type = 'LIST_CREATE_WRITING_TEST_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertTest = (params) => {
    let url = '/writing-test/insert'
    let type = 'INSERT_CREATE_WRITING_TEST'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTestById = (params) => {
    let url = '/writing-test/get-wt-by-id?wt_id=' + params
    let type = 'GET_CREATE_WRITING_TEST_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const getAllByUserId = () => {
    let url = '/writing-test/get-wt-by-user-id'
    let type = 'GET_LST_WRITING_TEST_BY_USER_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const setLastSearchTest = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_CREATE_WRITING_TEST',
        data: obj
    }
}

