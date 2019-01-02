import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const viewWritingTestById = (params) => {
    let url = '/qa/view-qa-by-id?qa_id=' + params
    let type = 'VIEW_WRITING_TEST_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const postComment = (params) => {
    let url = '/writing-test-topic/insert-comment'
    let type = 'POST_COMMENT_WRITING_TEST_TOPIC'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const editComment = (params) => {
    let url = '/writing-test-topic/update-comment'
    let type = 'EDIT_COMMENT_WRITING_TEST_TOPIC'
    return requestPostJsonReturnDispatch(url, params, type)
}