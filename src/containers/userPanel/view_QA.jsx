import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postComment, editComment, viewQAById, listCommentByPage } from '../../actions/viewQA';
import QA from '../../components/userPanel/view_QA.jsx';
import { notification, Input, Divider } from 'antd';

class viewQA extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>{this.props.qaItem.qa_title}</h3>
                <p>Đăng bởi: {this.props.qaItem.user_login}</p>
                <Divider />
                <QA {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        qaItem: state.viewQA.qaItem,
        lstComment: state.viewQA.lstComment,
        actionName: state.viewQA.actionName,
        countFetchById: state.viewQA.countFetchById,
        msg: state.viewQA.msg,
        success: state.viewQA.success,
        countUpdate: state.viewQA.countUpdate,
        data: state.viewQA.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        postComment: (params) => {
            dispatch(postComment(params))
        },
        editComment: (params) => {
            dispatch(editComment(params))
        },
        viewQAById: (params) => {
            dispatch(viewQAById(params))
        },
        listCommentByPage: (params) => {
            dispatch(listCommentByPage(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(viewQA);