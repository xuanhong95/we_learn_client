import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
import { Link } from 'react-router-dom'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import cookie from 'react-cookies'


class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.countUpdate > this.props.countUpdate) {
            if (nextProps.actionName == "insert") {
                notification.success({
                    message: "Success",
                    description: "Nộp bài thành công"
                })
                this.props.history.push("/test/list-writing-test/")
            }
        }
    }


    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = JSON.parse(JSON.stringify(values))
                params.wt_id = this.props.location.state.testItem.wt_id
                this.props.insertTest(params)
            } else {
                scrollToErrorForm(err)
            }
        });
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
            <Form layout="horizontal" className="frm_properties" onSubmit={this.handleSubmit} >
                <Row>
                    {this.props.location.state != undefined ? this.props.location.state.testItem.wt_content : undefined}
                </Row>
                <Divider />
                <Row>
                    <Col className="formInputRow" span={24}>
                        <FormItem {...formItemLayout} label="Bài làm">
                            {getFieldDecorator('wtt_content',
                                {
                                    rules: [
                                        { required: true, whitespace: true, message: "Nhập Bài làm" },
                                    ],
                                }
                            )(
                                <TextArea placeholder="Nhập Bài làm" rows={6} />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row style={{ textAlign: 'center', marginTop: '5px' }}>
                    <Button type="primary" className="text-right btn btn-success" htmlType="submit">
                        Nộp bài
                    </Button>
                    &nbsp;
                    <Button type="primary" className="text-right btn btn-success">
                        <Link to={'/test/list-writing-test'}
                            className="nav-link" >Back</Link>
                    </Button>
                </Row>
            </Form >
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm