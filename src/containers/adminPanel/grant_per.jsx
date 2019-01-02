import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CollectionCreateForm from '../../components/adminPanel/grant_per.jsx';
import { getAllGroupSelect, updatePermission, getAllPermissionTree, getAllPermissionByGroupId } from '../../actions/system_control';
import { Collapse, Button, Modal, Form, Input, Radio } from 'antd';
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
        this.props.getAllGroupSelect();
        this.props.getAllPermissionTree();
    }

    render() {
        return (
            <div>
                <div>
                    <h3>Quản lý phân quyền</h3>
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
        lstGroupSelect: state.systemControl.lstGroupSelect,
        lstPermissionTree: state.systemControl.lstPermissionTree,
        lstPermissionGroup: state.systemControl.lstPermissionGroup,
        msg: state.systemControl.msg,
        actionName: state.systemControl.actionName,
        success: state.systemControl.success,
        countFetchPage: state.systemControl.countFetchPage,
        countFetchPerByGroup: state.systemControl.countFetchPerByGroup,
        countUpdate: state.systemControl.countUpdate,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllGroupSelect: () => {
            dispatch(getAllGroupSelect());
        },
        getAllPermissionTree: () => {
            dispatch(getAllPermissionTree());
        },
        getAllPermissionByGroupId: (params) => {
            dispatch(getAllPermissionByGroupId(params));
        },
        updatePermission: (params) => {
            dispatch(updatePermission(params));
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(GrantPerForm);
