import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertQA, updateQA, fetchQAById } from '../../actions/qa';
import QA from '../../components/userPanel/post_QA.jsx';
import { notification, Input, Divider } from 'antd';

class PostQA extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h3>Đăng bài</h3>
                <Divider />
                <QA {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        qaItem: state.qa.qaItem,
        actionName: state.qa.actionName,
        countFetchById: state.qa.countFetchById,
        msg: state.qa.msg,
        success: state.qa.success,
        countUpdate: state.qa.countUpdate,
        data: state.qa.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertQA: (params) => {
            dispatch(insertQA(params))
        },
        updateQA: (params) => {
            dispatch(updateQA(params))
        },
        fetchQAById: (params) => {
            dispatch(fetchQAById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostQA);