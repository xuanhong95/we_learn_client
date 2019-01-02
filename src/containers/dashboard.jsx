import React, { Component } from 'react';
import { connect } from 'react-redux';
import Homepage from '../components/dashboard.jsx';
import { listNewestPagination, listGrammarPagination } from '../actions/homepage'
import { notification, Input, Divider } from 'antd';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>Trang chủ</h3>
                <Divider />
                <Homepage {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listNewest: state.home.listNewest,
        listNewestGrammar: state.home.listNewestGrammar,
        countFetchPage: state.home.countFetchPage,
        countFetchPageGrammar: state.home.countFetchPageGrammar,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        listNewestPagination: (param) => {
            dispatch(listNewestPagination(param))
        },
        listGrammarPagination: (param) => {
            dispatch(listGrammarPagination(param))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);