import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listTopicPagination = (params) => {
    let url = 'article-topic/get-topic-by-page';
    let type = 'LIST_TOPIC_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const insertTopic = (params) => {
    let url = '/article-topic/insert'
    let type = 'INSERT_TOPIC'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const updateTopic = (params) => {
    let url = '/article-topic/update'
    let type = 'UPDATE_TOPIC'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const fetchTopicById = (params) => {
    let url = '/article-topic/get-topic-by-id?at_id=' + params
    let type = 'GET_TOPIC_BY_ID'
    return requestGetJsonReturnDispatch(url, type)
}

export const deleteTopic = (params) => {
    let url = '/article-topic/delete'
    let type = 'DELETE_TOPIC'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const removeTopic = (params) => {
    let url = '/article-topic/remove'
    let type = 'REMOVE_TOPIC'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreTopic = (params) => {
    let url = '/article-topic/restore'
    let type = 'RESTORE_TOPIC'
    return requestPutJsonReturnDispatch(url, params, type)
}


export const setLastSearchTopic = (obj) => {
    return {
        type: 'SET_LAST_SEARCH_TOPIC',
        data: obj
    }
}

export const getAllListArticle = () => {
    let url = '/article/get-all-list-article'
    let type = 'GET_ALL_LST_ARTICLE'
    return requestGetJsonReturnDispatch(url, type)
}
