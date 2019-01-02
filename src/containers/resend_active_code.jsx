import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resendActiveCode } from '../actions/bar_action';
import { notification, Row, Form, Col, Input, Divider, Button } from 'antd';
const { TextArea } = Input;
const FormItem = Form.Item;

class ResendForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countResend > this.props.countResend) {
            notification.success({
                message: "Thành công",
                description: "Vui lòng kiểm tra lại email để kích hoạt tài khoản"
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params = JSON.parse(JSON.stringify(values))

                this.props.resendActiveCode(params)
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
            <div>
                <h3>Gửi lại email kích hoạt</h3>
                <Divider />
                <Form layout="horizontal" className="frm_properties" onSubmit={this.handleSubmit} >
                    <Row>
                        <Col className="formInputRow" span={18}>
                            <FormItem {...formItemLayout} label="Email">
                                {getFieldDecorator('email',
                                    {
                                        rules: [{ type: "string", max: 50, message: "Không nhập quá 50 ký tự" },
                                        { type: "string", required: true, whitespace: true, message: "Nhập Email" },
                                        ],
                                    }
                                )(
                                    <Input placeholder="Nhập Email" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row style={{ textAlign: 'center', marginTop: '5px' }}>
                        <Button type="primary" className="text-right btn btn-success" htmlType="submit">
                            Gửi lại
                        </Button>
                        &nbsp;
                    </Row>
                </Form >
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        countResend: state.bar_reducer.countResend,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resendActiveCode: (param) => {
            dispatch(resendActiveCode(param))
        },
    }
}

const CollectionCreateForm = Form.create()(ResendForm)
export default connect(mapStateToProps, mapDispatchToProps)(CollectionCreateForm);