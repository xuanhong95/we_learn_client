import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Row, Button, Modal, Form, Input, Col, Select, Divider, Tree, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

class ProviderInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            new_value: undefined,
            confirm_value: undefined,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setNewValue = this.setNewValue.bind(this);
        this.setConfirmValue = this.setConfirmValue.bind(this);
        this.validateInput = this.validateInput.bind(this);
    }

    setNewValue(e) {
        this.setState({
            new_value: e.target.value
        })
    }

    setConfirmValue(e) {
        this.setState({
            confirm_value: e.target.value
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countChangePass > this.props.countChangePass) {
            if (nextProps.success == true) {
                notification.success({
                    message: 'Success',
                    description: "Đổi mật khẩu thành công"
                });
            }
            this.props.history.push('/')
        }
    }

    validateInput(rule, value, callback) {
        switch (rule.field) {
            case 'old_password':
                if (value == "" || value == undefined) {
                    callback('Nhập mật khẩu cũ');
                    return;
                }
                else if (value.length > 50) {
                    callback('Mật khẩu cũ không quá 50 ký tự');
                    return;
                }
                break;
            case 'new_password':
                this.props.form.setFieldsValue({
                    confirm_password: this.state.confirm_value
                })
                if (value == "" || value == undefined) {
                    callback('Nhập mật khẩu mới');
                    return;
                }
                else if (value.length > 50) {
                    callback('Mật khẩu mới không quá 50 ký tự');
                    return;
                }
                break;
            case 'confirm_password':
                if (value == "" || value == undefined) {
                    callback('Nhập xác nhận mật khẩu');
                    return;
                }
                else if (value.length > 50) {
                    callback('Xác nhận mật khẩu không quá 50 ký tự');
                    return;
                }
                else if (this.state.new_value != value) {
                    callback('Xác nhận mật khẩu không chính xác');
                    return;
                }
                break;
        }
        callback();
        return;
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.changePassword(values)
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
                <Divider />
                <Form layout="horizontal" onSubmit={this.handleSubmit}>
                    <Row>
                        <Col className="formInputRow" span={18}>
                            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="Mật khẩu cũ">
                                {getFieldDecorator('old_password',
                                    {
                                        rules: [{ required: true, validator: this.validateInput }]
                                    }
                                )(
                                    <Input placeholder="Nhập mật khẩu cũ" type="password" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="formInputRow" span={18}>
                            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="Mật khẩu mới">
                                {getFieldDecorator('new_password',
                                    {
                                        rules: [{ required: true, validator: this.validateInput }]
                                    }
                                )(
                                    <Input placeholder="Nhập mật khẩu mới" onChange={this.setNewValue} type="password" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="formInputRow" span={18}>
                            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} label="Xác nhận mật khẩu">
                                {getFieldDecorator('confirm_password',
                                    {
                                        rules: [{ required: true, validator: this.validateInput }]
                                    }
                                )(
                                    <Input placeholder="Xác nhận mật khẩu" onChange={this.setConfirmValue} type="password" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Button type="primary" size='default' htmlType="submit">Cập nhật</Button>
                    </Row>
                </Form>
            </span>
        )
    }
}

const CollectionCreateForm = Form.create()(ProviderInfoForm)
export default CollectionCreateForm;