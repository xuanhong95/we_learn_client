import React, { Component } from 'react';
import { Button, Modal, Form, Input, Pagination, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { stateFromHTML } from 'draft-js-import-html';
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
import DraftPasteProcessor from 'draft-js/lib/DraftPasteProcessor';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import cookie from 'react-cookies'
const regex = /(<([^>]+)>)/ig;

class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // editorState: EditorState.createEmpty(),
            paginateComment: {
                current: 1,
                pageSize: 10,
            },
            is_edited: undefined,
        }
        this.userInfo = cookie.load('userInfo')
        this.onEditorStateChange = this.onEditorStateChange.bind(this)
        this.handleCommentChange = this.handleCommentChange.bind(this)
        this.editComment = this.editComment.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    editComment(item) {
        this.props.form.setFieldsValue({
            content: item.comment_content
        })
        // let contentBlock = htmlToDraft(item.comment_content);
        // if (contentBlock) {
        //     let contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        //     let editorState = EditorState.createWithContent(contentState);
        this.setState({
            is_edited: item.comment_id,
            // editorState,
        })
        // }
        var elmnt = document.getElementById("wysiwyg-box");
        elmnt.scrollIntoView();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countUpdate > this.props.countUpdate) {
            if (nextProps.actionName == "postComment") {
                notification.success({
                    message: "Thành công",
                    description: "Đăng comment thành công"
                })
                this.setState({
                    editorState: EditorState.createEmpty(),
                })
                let paginateComment = { ...this.state.paginateComment }
                this.props.listCommentByPage(paginateComment)
            }
            else if (nextProps.actionName == "editComment") {
                notification.success({
                    message: "Thành công",
                    description: "Cập nhật comment thành công"
                })
                this.setState({
                    // editorState: EditorState.createEmpty(),
                    is_edited: undefined,
                })
                this.props.form.setFieldsValue({
                    content: undefined
                })
                let paginateComment = { ...this.state.paginateComment }
                this.props.listCommentByPage(paginateComment)
            }
        }
    }

    handleCommentChange(pagination) {
        let paginateComment = { ...this.state.paginateComment }
        paginateComment.current = pagination
        this.setState({
            paginateComment
        })
        this.props.listCommentByPage(paginateComment)
    }

    componentDidMount() {
        if (this.props.match.params.id != undefined) {
            this.props.listCommentByPage(Object.assign(this.state.paginateComment, { qa_id: this.props.match.params.id }))
        }
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    handleSubmit() {
        let params = {};
        params.qa_id = this.props.match.params.id
        // params.content = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        // if (params.content.replace(regex, '').length < 22) {
        //     notification.warn({
        //         message: "Thông báo",
        //         description: "Comment phải có độ dài lớn hơn 20 ký tự"
        //     })
        //     return
        // }
        params.content = this.props.form.getFieldsValue().content
        if (this.state.is_edited == undefined)
            this.props.postComment(params)
        else {
            params.qa_comment_id = this.state.is_edited
            this.props.editComment(params)
        }
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        //set css for form item
        //note using col for divide col. 
        //default 24.
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };

        return (
            <div className="ant-row">
                <h4>Bình luận</h4>
                {this.userInfo != undefined &&
                    <div>
                        <Row id="wysiwyg-box">
                            {/* <Editor
                        placeholder="Insert comment ... "
                        editorState={this.state.editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor comment-box"
                        onEditorStateChange={this.onEditorStateChange}
                    /> */}
                            <Col className="formInputRow" span={24}>
                                <FormItem {...formItemLayout} label="">
                                    {getFieldDecorator('content',
                                        {
                                            rules: [
                                                { type: "string", required: true, whitespace: true, message: "Nhập bình luận" },
                                            ],
                                        }
                                    )(
                                        <TextArea placeholder="Nhập bình luận" rows={4} />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'right', marginTop: '5px' }}>
                            <Button size="small" type="primary" className="text-right btn btn-success" onClick={() => this.handleSubmit()}>
                                {this.state.is_edited == undefined ? "Post Comment" : "Update Comment"}
                            </Button>
                        </Row>
                    </div>
                }
                <Row>
                    {
                        this.props.lstComment.results != undefined && this.props.lstComment.results.map(item => {
                            return (
                                <div className="cmt-box col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                    <div className="cmt-user">
                                        <div className="cmt-user-info col-md-2 col-sm-2 col-xs-2 col-lg-2">
                                            <div className="cmt-user-avatar col-md-12 col-sm-12 col-xs-12 col-lg-12">
                                                <img src="https://image.flaticon.com/icons/png/512/149/149071.png"
                                                    width="48" height="48" alt={item.user_login} />
                                            </div>
                                            <p className="user-information">
                                                {item.user_login}
                                            </p>
                                        </div>
                                        <div className="cmt-user-content col-md-10 col-sm-10 col-xs-10 col-lg-10">
                                            <p>Commented at: {item.created_date}</p>
                                            <p>{ReactHtmlParser(item.comment_content)}</p>
                                            {
                                                this.userInfo != undefined && this.userInfo.id == item.user_id &&
                                                <a style={{ float: 'right' }} href="javascript:void(0);"
                                                    onClick={() => this.editComment(item)}>
                                                    {this.state.is_edited == item.comment_id ? "Editing" : "Edit"}
                                                </a>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </Row>
                <Row style={{ float: 'right', marginTop: "5px" }}>
                    <Pagination defaultCurrent={1}
                        onChange={this.handleCommentChange}
                        total={this.props.lstComment.total}
                        pageSize={this.state.paginateComment.pageSize} />
                </Row>
            </div>
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm