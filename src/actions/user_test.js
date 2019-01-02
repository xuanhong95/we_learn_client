import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listAllTest = (params) => {
    let url = 'test/get-list-test';
    let type = 'LIST_ALL_TEST'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertTest = (params) => {
    let url = '/user-answer/insert'
    let type = 'USER_DO_TEST'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const getCorrectAnswerById = (params) => {
    let url = '/test/get-correct-anwser-by-id'
    let type = 'GET_CORRECT_ANSWER_BY_ID'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTestById = (params) => {
    let url = '/test/get-test-by-id?test_id=' + params
    let type = 'VIEW_TEST_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

