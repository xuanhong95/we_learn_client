import React, { Component } from 'react';
import { connect } from 'react-redux';
import { viewArticleById } from '../../actions/viewArticle';
import Article from '../../components/userPanel/viewArticle.jsx';
import { notification, Input, Divider } from 'antd';

class viewArticle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h3>{this.props.articleItem.atc_title}</h3>
                <p>Đăng bởi: {this.props.articleItem.full_name}</p>
                <Divider />
                <Article {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        articleItem: state.viewArticle.articleItem,
        actionName: state.viewArticle.actionName,
        countFetchById: state.viewArticle.countFetchById,
        msg: state.viewArticle.msg,
        success: state.viewArticle.success,
        countUpdate: state.viewArticle.countUpdate,
        data: state.viewArticle.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        viewArticleById: (params) => {
            dispatch(viewArticleById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(viewArticle);