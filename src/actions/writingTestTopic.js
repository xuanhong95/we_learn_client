import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listTestPagination = (params) => {
    let url = 'writing-test-topic/get-wtt-by-page';
    let type = 'LIST_WRITING_TEST_TOPIC_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertTest = (params) => {
    let url = '/writing-test-topic/insert'
    let type = 'INSERT_WRITING_TEST_TOPIC'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTestById = (params) => {
    let url = '/writing-test-topic/get-wtt-by-id?wtt_id=' + params
    let type = 'GET_WRITING_TEST_TOPIC_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const setLastSearchTest = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_WRITING_TEST_TOPIC',
        data: obj
    }
}

