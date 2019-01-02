
const initialState = {
    articleItem: {},
    listArticle: [],
    lstArticleTopic: [],
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
const article = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_ARTICLE_PAGINATION':
            return {
                ...state, listArticle: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_ALL_LST_ARTICLE_TOPIC':
            return {
                ...state, lstArticleTopic: action.data.data ? action.data.data : [], success: action.data.success,
            }
        case 'GET_ARTICLE_BY_ID':
            return {
                ...state, articleItem: action.data.data ? action.data.data : {},
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
            }
        case 'INSERT_ARTICLE':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        case 'UPDATE_ARTICLE':
            return { ...state, actionName: 'update', countUpdate: state.countUpdate + 1, }
        case 'DELETE_ARTICLE':
            return { ...state, success: action.data.success, msg: action.data.msg, countDelete: state.countDelete + 1, }
        case 'REMOVE_ARTICLE':
            return { ...state, success: action.data.success, msg: action.data.msg, countRemove: state.countRemove + 1, }
        case 'RESTORE_ARTICLE':
            return { ...state, success: action.data.success, msg: action.data.msg, countRestore: state.countRestore + 1, }
        case 'SET_LAST_SEARCH_ARTICLE':
            return { ...state, lastSearchObj: action.data, }
        default:
            return state;
    }
}
export default article