import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resendActiveCode } from '../actions/bar_action';
import { notification, Row, Form, Col, Input, Divider, Button, Radio } from 'antd';
import cookie from 'react-cookies';
const { TextArea } = Input;
const FormItem = Form.Item;

class ResendForm extends Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.userInfo = cookie.load('userInfo')
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
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };
        return (
            <div>
                <h3>Nâng cấp tài khoản Premium</h3>
                <Divider />
                <Form layout="horizontal" className="frm_properties" onSubmit={this.handleSubmit}>
                    <Row>
                        Tài khoản Premium sẽ có những đặc quyền dành riêng như: Các bài ngữ pháp nâng cao, được
                        giáo viên chữa bài Writing, ... Vui lòng chọn gói Premium của bạn
                    </Row>
                    <br></br>
                    <br></br>
                    <Row>
                        <Col className="formInputRow" span={24}>
                            <FormItem {...formItemLayout} label="Lựa chọn gói">
                                {getFieldDecorator('months',
                                )(
                                    <Radio.Group buttonStyle="solid">
                                        <Radio.Button value={1}>1 tháng Premium</Radio.Button>
                                        <Radio.Button value={3}>3 tháng Premium</Radio.Button>
                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    {
                        this.props.form.getFieldsValue().months != undefined &&
                        <span>
                            <Row>
                                <div className="col-md-offset-4 col-md-4 col-sm-offset-2 col-sm-8 col-xs-12 box-payment">
                                    <p>Tên chủ tài khoản: <b>Công ty TNHH WeLearn</b></p>
                                    <p>Số tài khoản: <b>0451 000 271 772</b></p>
                                    <p>Ngân hàng: <b>Vietcombank chi nhánh Thành Công</b></p>
                                    <p>Số tiền cần thanh toán: <b>{this.props.form.getFieldsValue().months == 1 ? "50,000 VND" : "100,000 VND"}</b></p>
                                    <p>Nội dung: <b>{this.userInfo.user_login}_Premium_{this.props.form.getFieldsValue().months == 1 ? 1 : 3}</b></p>
                                </div>
                            </Row>
                            <Row style={{ textAlign: 'center' }}>
                                <i>*Tài khoản của bạn sẽ được nâng cấp lên Premium ngay khi giao dịch chuyển khoản hoàn tất</i>
                            </Row>
                        </span>
                    }
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