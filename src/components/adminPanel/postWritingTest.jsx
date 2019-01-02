import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import {
    Collapse, Button, Modal, Form, Input, Table, Col, Select, InputNumber, Upload,
    notification, Icon, Row, Divider, Popconfirm
} from 'antd';
import { Link } from 'react-router-dom';
import cookie from 'react-cookies'
import { scrollToErrorForm, validateInputNumber } from '../../actions/reuse_action/reuse';
import axios from 'axios';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;


class GeneralInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            lst_answer: [],
            lstQuestion: [],
            pagination: {
                page: 1,
                pageSize: 10,
                position: 'both'
            },
            ta_content: undefined,
            test_name: undefined,
        }
        this.lstPermission = cookie.load('lstPermission') || [];
        this.disableUpdate = false;
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.id != undefined) {
            this.props.fetchTestById(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countUpdate > this.props.countUpdate) {
            if (nextProps.actionName == "insert") {
                notification.success({
                    message: "Thành công",
                    description: "Tạo đề thi thành công"
                })
                this.props.history.push('/system-content/list-writing-test')
            }
        }
        if (nextProps.countFetchById > this.props.countFetchById) {
            this.props.form.setFieldsValue({
                wt_content: nextProps.testItem.wt_content,
                wt_title: nextProps.testItem.wt_title
            })
        }
    }

    setIndexArrObject(listObj) {
        let i = 0;
        listObj.forEach(function (element) {
            element.rowKey = i++;
        })
        return listObj
    }

    handleSubmit(e) {
        this.setState({
            disableUpdate: true
        })
        setTimeout(() => {
            this.setState({
                disableUpdate: false
            })
        }, 300);
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let params = { ...values }
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
            <span>
                <Form layout="vertical" className="contact-modal" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col className="formInputRow" span={24} >
                            <FormItem {...formItemLayout} label="Tiêu đề">
                                {getFieldDecorator('wt_title', {
                                    rules: [
                                        { required: true, whitespace: true, message: "Nhập Tiêu đề" },
                                        { max: 500, message: "Tiêu đề tối đa 500 ký tự" }],
                                })(
                                    <Input placeholder="Nhập Tiêu đề" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="formInputRow" span={24} >
                            <FormItem {...formItemLayout} label="Nội dung">
                                {getFieldDecorator('wt_content', {
                                    rules: [
                                        { required: true, whitespace: true, message: "Nhập Nội dung" },
                                    ],
                                })(
                                    <TextArea placeholder="Nhập nội dung" rows={6} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center', marginTop: 10 }}>
                        {
                            this.props.match.params.id == undefined &&
                            <Button type="primary" key="add-test" size='large' className="margin-bottom-5" htmlType="submit">
                                Tạo đề thi
				            </Button>
                        }
                        &nbsp;
                        <Button type="primary" key="return" size='large' className="margin-bottom-5">
                            <Link to={'/system-content/list-writing-test'}
                                className="nav-link" >Trở lại</Link>
                        </Button>
                    </Row>
                </Form>
            </span >
        )
    }
}

const CollectionCreateForm = Form.create()(GeneralInfoForm)
export default CollectionCreateForm;