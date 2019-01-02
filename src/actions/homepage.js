import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listNewestPagination = (params) => {
    let url = 'home/get-newest-by-page';
    let type = 'LIST_NEWEST_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const listGrammarPagination = (params) => {
    let url = 'home/get-newest-grammar-by-page';
    let type = 'LIST_NEWEST_GRAMMAR_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}