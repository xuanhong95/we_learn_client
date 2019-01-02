import React from 'react';
import Sidebar from '../components/sidebar.jsx';
import { connect } from 'react-redux';
import {logout} from '../actions';
// import {getIsLoggedIn} from '../selectors'
const SidebarContainer = (props) => <Sidebar {...props}/>

const mapStateToProps = state => {
	return{
		activeSidebar: state.bar_reducer.activeSidebar
	}	
}
const mapDispatchToProps = (dispatch) =>{
	return {
		logout: () => {
			dispatch(logout())
		}
	}
}
	

export default connect(mapStateToProps, mapDispatchToProps)(SidebarContainer)