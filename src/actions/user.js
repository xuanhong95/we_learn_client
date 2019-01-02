import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const listUserPagination = (params) => {
    let url = 'user/get-user-by-page';
    let type = 'LIST_USER_PAGINATION'
    return requestPostJsonReturnDispatch(url, params, type)
}

export const activePremium = (params) => {
    let url = 'user/active-premium';
    let type = 'ACTIVE_PREMIUM'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const deleteUser = (params) => {
    let url = '/user/delete'
    let type = 'DELETE_USER'
    return requestDeleteJsonReturnDispatch(url, params, type)
}

export const removeUser = (params) => {
    let url = '/user/remove'
    let type = 'REMOVE_USER'
    return requestPutJsonReturnDispatch(url, params, type)
}

export const restoreUser = (params) => {
    let url = '/user/restore'
    let type = 'RESTORE_USER'
    return requestPutJsonReturnDispatch(url, params, type)
}
