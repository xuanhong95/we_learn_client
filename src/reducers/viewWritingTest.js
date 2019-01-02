
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
const viewWritingTest = (state = initialState, action = {}) => {
    switch (action.type) {
        case 'POST_COMMENT_WRITING_TEST_TOPIC':
            return { ...state, actionName: 'postComment', countUpdate: state.countUpdate + 1, }
        case 'EDIT_COMMENT_WRITING_TEST_TOPIC':
            return { ...state, actionName: 'editComment', countUpdate: state.countUpdate + 1, }
        default:
            return state;
    }
}
export default viewWritingTest