
const initialState = {
    articleItem: {},
    listTopic: [],
    lstArticle: [],
    actionName: '',
    countUpdate: 0,
    countDelete: 0,
    countRemove: 0,
    countRestore: 0,
    countFetchPage: 0,
    countFetchById: 0,
    success: false,
    lastSearchObj: null,
    msg: '',
    data: null,
}
const topicContent = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_TOPIC_PAGINATION':
            return {
                ...state, listTopic: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_ALL_LST_ARTICLE':
            return {
                ...state, lstArticle: action.data.data ? action.data.data : [], success: action.data.success,
            }
        case 'GET_TOPIC_BY_ID':
            return {
                ...state, articleItem: action.data.data ? action.data.data : {},
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
            }
        case 'INSERT_TOPIC':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        case 'UPDATE_TOPIC':
            return { ...state, actionName: 'update', countUpdate: state.countUpdate + 1, }
        case 'DELETE_TOPIC':
            return { ...state, success: action.data.success, msg: action.data.msg, countDelete: state.countDelete + 1, }
        case 'REMOVE_TOPIC':
            return { ...state, success: action.data.success, msg: action.data.msg, countRemove: state.countRemove + 1, }
        case 'RESTORE_TOPIC':
            return { ...state, success: action.data.success, msg: action.data.msg, countRestore: state.countRestore + 1, }
        case 'SET_LAST_SEARCH_TOPIC':
            return { ...state, lastSearchObj: action.data, }
        default:
            return state;
    }
}
export default topicContent