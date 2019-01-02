const initialState = {
	activeSidebar: false,
	token: '',
	lstPermission: [],
	userInfo: {},
	loginSuccess: false,
	loginFail: false,
	msg: '',
	logoutSuccess: false,
	countSignUp: 0,
	countActive: 0,
	countResend: 0,
	countChangePass: 0,
}
const bar_reducer = (state = initialState, action = {}) => {
	switch (action.type) {
		case 'SIDEBAR_COLLAPSE':
			return { ...state, activeSidebar: !state.activeSidebar, }
		case 'LOGIN_SUCCESS':
			return {
				...state, token: action.token, userInfo: action.data,
				lstPermission: action.lstPermission, loginSuccess: true,
			}
		case 'LOGIN_FAIL':
			return { ...state, msg: action.msg, loginFail: true, loginSuccess: false, }
		case 'LOGOUT':
			return { ...state, msg: action.data, logoutSuccess: true, }
		case 'SIGN_UP':
			return { ...state, countSignUp: state.countSignUp + 1, }
		case 'ACTIVE_ACCOUNT':
			return { ...state, countActive: state.countActive + 1, }
		case 'RESEND_ACTIVE_CODE':
			return { ...state, countResend: state.countResend + 1, }
		case 'CHANGE_PASSWORD':
			return {
				...state, success: action.data.success, msg: action.data.msg, countChangePass: state.countChangePass + 1,
			}
		case 'RESET_STORE_BAR':
			return state = initialState
		default:
			return state;
	}
}
export default bar_reducer