
const initialState = {
    listNewest: {},
    listNewestGrammar: {},
    actionName: '',
    countFetchPage: 0,
    countFetchPageGrammar: 0,
    success: false,
    msg: '',
}
const home = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'LIST_NEWEST_PAGINATION':
            return {
                ...state, listNewest: action.data.data ? action.data.data : {}, success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'LIST_NEWEST_GRAMMAR_PAGINATION':
            return {
                ...state, listNewestGrammar: action.data.data ? action.data.data : {}, success: action.data.success,
                countFetchPageGrammar: state.countFetchPageGrammar + 1
            }
        default:
            return state;
    }
}
export default home