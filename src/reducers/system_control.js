
const initialState = {
    lstGroupSelect: [],
    lstPermissionTree: [],
    lstPermissionGroup: [],
    msg: '',
    actionName: '',
    success: false,
    countFetchPage: 0,
    countUpdate: 0,
    countFetchPerByGroup: 0,
    countFetchEmailConfig: 0,
    countChangePass: 0,
    countUpdateEmailConfig: 0,
}
const systemControl = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'GET_ALL_GROUP_SELECT':
            return {
                ...state, lstGroupSelect: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_ALL_PERMISSION_TREE':
            return {
                ...state, lstPermissionTree: action.data.data ? action.data.data : [], success: action.data.success
            }
        case 'GET_ALL_PERMISSION_BY_GROUP':
            return {
                ...state, lstPermissionGroup: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPerByGroup: state.countFetchPerByGroup + 1
            }
        case 'UPDATE_PERMISSION':
            return {
                ...state, success: action.data.success, msg: action.data.msg, countUpdate: state.countUpdate + 1,
            }
        default:
            return state;
    }
}
export default systemControl