
const initialState = {
    testItem: {},
    listTest: [],
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
const test = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_CREATE_TEST_PAGINATION':
            return {
                ...state, listTest: action.data.data ? action.data.data : [], success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'GET_CREATE_TEST_BY_ID':
            return {
                ...state, testItem: action.data.data ? action.data.data : {},
                success: action.data.success, msg: action.data.msg, countFetchById: state.countFetchById + 1,
            }
        case 'INSERT_CREATE_TEST':
            return { ...state, actionName: 'insert', countUpdate: state.countUpdate + 1, data: action.data.data ? action.data.data : undefined, }
        case 'SET_LAST_SEARCH_CREATE_TEST':
            return { ...state, lastSearchObj: action.data, }
        default:
            return state;
    }
}
export default test