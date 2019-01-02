
const initialState = {
    listUser: [],
    actionName: '',
    countUpdate: 0,
    countDelete: 0,
    countRemove: 0,
    countRestore: 0,
    countFetchPage: 0,
    success: false,
    msg: '',
    data: null,
}
const user = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_USER_PAGINATION':
            return {
                ...state, listUser: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'ACTIVE_PREMIUM':
            return { ...state, success: action.data.success, msg: action.data.msg, countUpdate: state.countUpdate + 1, }
        case 'DELETE_USER':
            return { ...state, success: action.data.success, msg: action.data.msg, countDelete: state.countDelete + 1, }
        case 'REMOVE_USER':
            return { ...state, success: action.data.success, msg: action.data.msg, countRemove: state.countRemove + 1, }
        case 'RESTORE_USER':
            return { ...state, success: action.data.success, msg: action.data.msg, countRestore: state.countRestore + 1, }
        default:
            return state;
    }
}
export default user