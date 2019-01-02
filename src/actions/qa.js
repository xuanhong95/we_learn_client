import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listQAPagination = (params) => {
    let url = 'qa/get-qa-by-page';
    let type = 'LIST_QA_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertQA = (params) => {
    let url = '/qa/insert'
    let type = 'INSERT_QA'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const updateQA = (params) => {
    let url = '/qa/update'
    let type = 'UPDATE_QA'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchQAById = (params) => {
    let url = '/qa/get-qa-by-id?qa_id=' + params
    let type = 'GET_QA_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const deleteQA = (params) => {
    let url = '/qa/delete'
    let type = 'DELETE_QA'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const removeQA = (params) => {
    let url = '/qa/remove'
    let type = 'REMOVE_QA'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreQA = (params) => {
    let url = '/qa/restore'
    let type = 'RESTORE_QA'
    return requestPutJsonReturnDispatch(url, params, type)
}


export const setLastSearchQA = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_QA',
        data: obj
    }
}

