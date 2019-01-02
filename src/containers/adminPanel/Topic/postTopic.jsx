import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertTopic, updateTopic, fetchTopicById, getAllListArticle } from '../../../actions/topic';
import Topic from '../../../components/adminPanel/Topic/postTopic.jsx';
import { notification, Input, Divider } from 'antd';

class PostTopic extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h3>Nội dung đề tài</h3>
                <Divider />
                <Topic {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        articleItem: state.topic.articleItem,
        actionName: state.topic.actionName,
        countFetchById: state.topic.countFetchById,
        msg: state.topic.msg,
        success: state.topic.success,
        countUpdate: state.topic.countUpdate,
        data: state.topic.data,
        lstArticle: state.topic.lstArticle,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertTopic: (params) => {
            dispatch(insertTopic(params))
        },
        updateTopic: (params) => {
            dispatch(updateTopic(params))
        },
        fetchTopicById: (params) => {
            dispatch(fetchTopicById(params))
        },
        getAllListArticle: () => {
            dispatch(getAllListArticle())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTopic);