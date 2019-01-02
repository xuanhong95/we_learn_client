import React, { Component } from 'react';
import { Button, Modal, Form, Input, Pagination, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
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
                pageSize: 1,
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
        this.setState({
            is_edited: item.comment_id,
            // editorState,
        })
        // }
        var elmnt = document.getElementById("wysiwyg-box");
        elmnt.scrollIntoView();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countUpdateComment > this.props.countUpdateComment) {
            if (nextProps.actionNameComment == "postComment") {
                notification.success({
                    message: "Thành công",
                    description: "Đăng comment thành công"
                })
                this.setState({
                    editorState: EditorState.createEmpty(),
                })
                this.props.fetchTestById(this.props.match.params.id)
            }
            else if (nextProps.actionNameComment == "editComment") {
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
                this.props.fetchTestById(this.props.match.params.id)
            }
        }
    }

    handleCommentChange(pagination) {
        let paginateComment = { ...this.state.paginateComment }
        paginateComment.current = pagination
        this.setState({
            paginateComment
        })
        // this.props.fetchTestById(paginateComment)
    }

    onEditorStateChange(editorState) {
        this.setState({
            editorState,
        });
    };

    handleSubmit() {
        let params = {};
        params.wtt_id = this.props.match.params.id
        params.content = this.props.form.getFieldsValue().content
        if (this.state.is_edited == undefined)
            this.props.postComment(params)
        else {
            params.wtc_id = this.state.is_edited
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
                        this.props.lstComment != undefined && this.props.lstComment.map(item => {
                            return (
                                <div className={item.is_admin == 1 ?
                                    "cmt-box col-md-12 col-sm-12 col-xs-12 col-lg-12 alert-success" : "cmt-box col-md-12 col-sm-12 col-xs-12 col-lg-12"}>
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
                {/* {
                    this.props.lstComment.length > 0 &&
                    <Row style={{ float: 'right', marginTop: "5px" }}>
                        <Pagination defaultCurrent={1}
                            onChange={this.handleCommentChange}
                            total={this.props.lstComment.length}
                            pageSize={this.state.paginateComment.pageSize} />
                    </Row>
                } */}
            </div>
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm