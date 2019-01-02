
const initialState = {
    qaItem: {},
    // qa_title: "Tieu de bai viet",
    // qa_content: "<div>Example <b>HTML</b> string</div>",
    lstComment: {},
    actionName: '',
    countUpdate: 0,
    countDelete: 0,
    countRemove: 0,
    countRestore: 0,
    countFetchPage: 0,
    countFetchLstCmt: 0,
    countFetchById: 0,
    success: false,
    lastSearchObj: null,
    msg: '',
    data: null,
}
const viewQA = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'VIEW_QA_BY_ID':
            return {
                ...state, qaItem: action.data.data ? action.data.data : {}, success: action.data.success,
                countFetchPage: state.countFetchPage + 1
            }
        case 'LIST_COMMENT_BY_PAGE':
            return {
                ...state, lstComment: action.data.data ? action.data.data : {}, success: action.data.success,
                countFetchLstCmt: state.countFetchLstCmt + 1
            }
        case 'POST_COMMENT_QA':
            return { ...state, actionName: 'postComment', countUpdate: state.countUpdate + 1, }
        case 'EDIT_COMMENT_QA':
            return { ...state, actionName: 'editComment', countUpdate: state.countUpdate + 1, }
        default:
            return state;
    }
}
export default viewQA