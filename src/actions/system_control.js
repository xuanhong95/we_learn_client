import {
    requestPostJson, requestGetJson, requestPutJson, requestDeleteJson,
    requestPostJsonReturnDispatch, requestPutJsonReturnDispatch, requestGetJsonReturnDispatch, requestDeleteJsonReturnDispatch
} from './index.js';

export const getAllGroupSelect = () => {
    let url = '/permission/get-all-group-select'
    let type = 'GET_ALL_GROUP_SELECT'
    return requestGetJsonReturnDispatch(url, type)
}
export const getAllPermissionTree = () => {
    let url = '/permission/get-all-permission-tree'
    let type = 'GET_ALL_PERMISSION_TREE'
    return requestGetJsonReturnDispatch(url, type)
}
export const getAllPermissionByGroupId = (params) => {
    let url = '/permission/get-permission-tree-by-group?group_id=' + params
    let type = 'GET_ALL_PERMISSION_BY_GROUP'
    return requestGetJsonReturnDispatch(url, type)
}

export const updatePermission = (params) => {
    let url = '/permission/update'
    let type = 'UPDATE_PERMISSION'
    return requestPutJsonReturnDispatch(url, params, type)
}