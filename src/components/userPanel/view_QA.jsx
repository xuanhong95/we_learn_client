import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import CommentPanel from '../ultilities/commentPanel.jsx';
import cookie from 'react-cookies'


class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
        }
    }

    componentDidMount() {
        if (this.props.match.params.id != undefined) {
            this.props.viewQAById(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchById > this.props.countFetchById) {
            let contentBlock = htmlToDraft(nextProps.qaItem.qa_content);
            if (contentBlock) {
                let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                let editorState = EditorState.createWithContent(contentState);
                this.state = {
                    editorState,
                };
            }
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
                <Row>
                    {ReactHtmlParser(this.props.qaItem.qa_content)}
                </Row>
                <Divider />
                <CommentPanel
                    match={this.props.match}
                    listCommentByPage={this.props.listCommentByPage}
                    lstComment={this.props.lstComment}
                    postComment={this.props.postComment}
                    editComment={this.props.editComment}
                    countUpdate={this.props.countUpdate}
                    actionName={this.props.actionName}
                />
            </div>
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm