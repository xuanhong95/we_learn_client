

const initialState = {
	listDataSourceName: [],
	checkError: 0,
	sortTable: {},
}

const reUseFuntion = (state = initialState, action = {}) => {
	switch (action.type) {
		case 'GET_BO_OR_CUS_BY_NAME':
			return { ...state, listDataSourceName: action.data.data, msg: action.data.msg, checkError: state.checkError + 1 }
		case 'SET_SORT_TABLE':
			return { ...state, sortTable: action.data, }
		default:
			return state
	}
}
export default reUseFuntion