import React from 'react';
import Topbar from '../components/topbar.jsx';
import { connect } from 'react-redux';
import {logout, sidebarCollapse, resetStoreBar} from '../actions/bar_action';
// import {getIsLoggedIn} from '../selectors'
const TopbarContainer = (props) => <Topbar {...props} />

const mapStateToProps = state => {
	return{
		activeSidebar: state.bar_reducer.activeSidebar,
		logoutSuccess: state.bar_reducer.logoutSuccess,
	}
}
const mapDispatchToProps = (dispatch) =>{
	return {
		logout: () => {
			dispatch(logout())
		},
		resetStoreBar: () =>{
			dispatch(resetStoreBar())
		},
		sidebarCollapse: () => {
			dispatch(sidebarCollapse())
		}
	}
}
	

export default connect(mapStateToProps, mapDispatchToProps)(TopbarContainer)