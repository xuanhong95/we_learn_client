import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertArticle, updateArticle, fetchArticleById } from '../../../actions/art';
import Topic from '../../../components/adminPanel/Topic/postArticle.jsx';
import { notification, Input, Divider } from 'antd';

class PostTopic extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h3>Nội dung danh mục</h3>
                <Divider />
                <Topic {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        articleItem: state.art.articleItem,
        actionName: state.art.actionName,
        countFetchById: state.art.countFetchById,
        msg: state.art.msg,
        success: state.art.success,
        countUpdate: state.art.countUpdate,
        data: state.art.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertArticle: (params) => {
            dispatch(insertArticle(params))
        },
        updateArticle: (params) => {
            dispatch(updateArticle(params))
        },
        fetchArticleById: (params) => {
            dispatch(fetchArticleById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTopic);