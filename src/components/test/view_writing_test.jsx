import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CommentPanel from '../ultilities/commentWritingTest.jsx';
import cookie from 'react-cookies'


class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            lstComment: [],
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchById > this.props.countFetchById) {
            let lstComment = []
            lstComment = lstComment.concat(nextProps.lstCommentByManager, nextProps.lstCommentByUser)
            this.setState({
                lstComment
            })
        }
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        //set css for form item
        //note using col for divide col. 
        //default 24.
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };

        return (
            <div>
                <CommentPanel
                    match={this.props.match}
                    lstComment={this.state.lstComment}
                    postComment={this.props.postComment}
                    fetchTestById={this.props.fetchTestById}
                    editComment={this.props.editComment}
                    countUpdateComment={this.props.countUpdateComment}
                    actionNameComment={this.props.actionNameComment}
                />
            </div>
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm