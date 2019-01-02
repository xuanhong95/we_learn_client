
const initialState = {
	loading: false,
	msg: '',
}

const utility = (state = initialState, action = {}) => {
	switch (action.type) {
		case 'CALL_API':
			return { ...state, loading: action.data, }
		case 'SHOW_MSG':
			return { ...state, msg: action.data,}
		default:
			return state
	}
}
export default utility