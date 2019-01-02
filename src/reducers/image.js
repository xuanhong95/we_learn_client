
const initialState = {
    listImage: {
        results: [],
        total: 0,
    },
    actionName: '',
    countUpdate: 0,
    countDelete: 0,
    countFetchPage: 0,
    success: false,
    lastSearchObj: null,
    msg: '',
    data: null,
}
const img = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_IMAGE_PAGINATION':
            return {
                ...state, listImage: action.data.data ? action.data.data : {
                    results: [],
                    total: 0,
                },
                success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'INSERT_IMAGE':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        case 'DELETE_IMAGE':
            return { ...state, success: action.data.success, msg: action.data.msg, countDelete: state.countDelete + 1, }
        default:
            return state;
    }
}
export default img