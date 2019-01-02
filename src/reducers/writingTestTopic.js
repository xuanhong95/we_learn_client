
const initialState = {
    topicItem: {},
    lstCommentByUser: [],
    lstCommentByManager: [],
    listTest: [],
    listTestByUser: [],
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
const writingTestTopic = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_WRITING_TEST_TOPIC_PAGINATION':
            return {
                ...state, listTest: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_LST_WRITING_TEST_BY_USER_ID':
            return {
                ...state, listTestByUser: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_WRITING_TEST_TOPIC_BY_ID':
            return {
                ...state,
                topicItem: action.data.topicItem ? action.data.topicItem : {},
                lstCommentByUser: action.data.lstCommentByUser ? action.data.lstCommentByUser : [],
                lstCommentByManager: action.data.lstCommentByManager ? action.data.lstCommentByManager : [],
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
            }
        case 'INSERT_WRITING_TEST_TOPIC':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, }
        case 'SET_LAST_SEARCH_WRITING_TEST_TOPIC':
            return { ...state, lastSearchObj: action.data, }
        default:
            return state;
    }
}
export default writingTestTopic