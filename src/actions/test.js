import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listTestPagination = (params) => {
    let url = 'create-test/get-test-by-page';
    let type = 'LIST_CREATE_TEST_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertTest = (params) => {
    let url = '/create-test/insert'
    let type = 'INSERT_CREATE_TEST'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTestById = (params) => {
    let url = '/create-test/get-test-by-id?test_id=' + params
    let type = 'GET_CREATE_TEST_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const setLastSearchTest = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_CREATE_TEST',
        data: obj
    }
}

