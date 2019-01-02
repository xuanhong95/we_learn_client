import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionCreateForm from '../components/change_password.jsx';
import { Collapse, Button, Modal, Form, Input, Radio } from 'antd';
import { changePassword } from '../actions/bar_action';
import { notification } from 'antd';
const { TextArea } = Input;
const Panel = Collapse.Panel;
const FormItem = Form.Item;


class GrantPerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        };
    }

    callback(key) {
        
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Thay đổi password</h3>
                </div>
                <CollectionCreateForm
                    ref={this.saveFormRef}
                    {...this.props}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        success: state.bar_reducer.success,
        msg: state.bar_reducer.msg,
        countChangePass: state.bar_reducer.countChangePass,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        // getAllGroupSelect: () => {
        //     dispatch(getAllGroupSelect());
        // },
        // getAllPermissionTree: () => {
        //     dispatch(getAllPermissionTree());
        // },
        // getAllPermissionByGroupId: (params) => {
        //     dispatch(getAllPermissionByGroupId(params));
        // },
        changePassword: (params) => {
            dispatch(changePassword(params));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GrantPerForm);
