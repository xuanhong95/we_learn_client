import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTestById } from '../../actions/writingTestTopic';
import { postComment, editComment } from '../../actions/viewWritingTest';
import ViewTest from '../../components/test/view_writing_test.jsx';
import { notification, Input, Divider, Row } from 'antd';

class PostTest extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        if (this.props.match.params.id != undefined)
            this.props.fetchTestById(this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <h3>{this.props.topicItem.wt_title}</h3>
                <Row>
                    {this.props.topicItem.wt_content}
                </Row>
                <Divider />
                <h3>Bài làm của {this.props.topicItem.full_name}</h3>
                <Row>
                    {this.props.topicItem.wtt_content}
                </Row>
                <Divider />
                <ViewTest {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        topicItem: state.writingTestTopic.topicItem,
        lstCommentByUser: state.writingTestTopic.lstCommentByUser,
        lstCommentByManager: state.writingTestTopic.lstCommentByManager,
        actionName: state.writingTestTopic.actionName,
        countFetchById: state.writingTestTopic.countFetchById,
        msg: state.writingTestTopic.msg,
        success: state.writingTestTopic.success,
        countUpdate: state.writingTestTopic.countUpdate,
        data: state.writingTestTopic.data,

        actionNameComment: state.viewWritingTest.actionName,
        countUpdateComment: state.viewWritingTest.countUpdate,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchTestById: (params) => {
            dispatch(fetchTestById(params))
        },
        postComment: (params) => {
            dispatch(postComment(params))
        },
        editComment: (params) => {
            dispatch(editComment(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTest);