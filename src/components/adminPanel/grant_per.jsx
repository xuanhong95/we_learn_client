import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { Row, Button, Modal, Form, Input, Col, Select, Divider, Tree, notification } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import cookie from 'react-cookies';

const TreeNode = Tree.TreeNode;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;

class ProviderInfoForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expandedKeys: [],
            autoExpandParent: true,
            checkedKeys: [],
            selectedKeys: [],
            group_id: 0
        }
        this.onCheck = this.onCheck.bind(this);
        this.onExpand = this.onExpand.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.renderTreeNodes = this.renderTreeNodes.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeGroup = this.onChangeGroup.bind(this);
        this.lstPermission = cookie.load('lstPermission') || [];
    }

    onExpand(expandedKeys) {
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
            expandedKeys,
            autoExpandParent: false,
        });
    }
    onCheck(checkedKeys) {
        let check = { ...this.state };
        this.setState({ checkedKeys });
    }
    onSelect(selectedKeys, info) {
        this.setState({ selectedKeys });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchPerByGroup > this.props.countFetchPerByGroup) {
            this.setState({
                checkedKeys: nextProps.lstPermissionGroup
            })
        }
        if (nextProps.countUpdate > this.props.countUpdate) {
            notification.success({
                message: 'Success',
                description: "Cập nhật thành công"
            });
        }
    }
    renderTreeNodes(data) {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} />;
        });
    }
    onChangeGroup(e) {
        this.setState({
            group_id: e,
        })
        this.props.getAllPermissionByGroupId(e)
    }
    handleSubmit(e) {
        let checkedKeys = [...this.state.checkedKeys]
        let params = { group_id: this.state.group_id, lst_permision: checkedKeys }
        this.props.updatePermission(params)
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
                <Form layout="horizontal">
                    <Row>
                        <Col className="gutter-row form-search-data" span={16}>
                            <label><b>Nhóm người dùng:</b> </label>
                            <Select
                                showSearch
                                style={{ width: '65%' }}
                                placeholder="Lựa chọn Nhóm người dùng"
                                onChange={this.onChangeGroup}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                {this.props.lstGroupSelect.map(item =>
                                    <Option key={item.group_id} value={item.group_id}>{item.group_name}</Option>
                                )}
                            </Select>
                        </Col>
                        <Col className="gutter-row form-search-data" span={6} offset={2}>
                            {/* {this.lstPermission.indexOf("PER-GROUP-8") > -1 && */}
                                <Button type="primary" className="btn btn-success" id="btn-update" onClick={this.handleSubmit} disabled={this.state.group_id == 0}>Cập nhật</Button>
                            {/* } */}
                        </Col>
                    </Row>
                    <Divider />
                    <Row>
                        {this.state.group_id > 0 ?
                            <Tree
                                checkable
                                onExpand={this.onExpand}
                                expandedKeys={this.state.expandedKeys}
                                autoExpandParent={this.state.autoExpandParent}
                                onCheck={this.onCheck}
                                checkedKeys={this.state.checkedKeys}
                                onSelect={this.onSelect}
                                selectedKeys={this.state.selectedKeys}
                            >
                                {this.renderTreeNodes(this.props.lstPermissionTree)}
                            </Tree>
                            :
                            <span></span>
                        }
                    </Row>
                </Form>
            </span>
        )
    }
}

const CollectionCreateForm = Form.create()(ProviderInfoForm)
export default CollectionCreateForm;