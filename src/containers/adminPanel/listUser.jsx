import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import TableUser from '../../components/adminPanel/tableUser.jsx';
import {
    listUserPagination, activePremium
} from '../../actions/user';
import { notification } from 'antd';
const WAIT_INTERVAL = 500;
class ListUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterParam: {
                status: -1,
                currentStatus: -1
            },
            filterDropdownVisible: {
                user_login: false,
                full_name: false,
                email: false,
            },
            searchText: {
                user_login: '',
                full_name: '',
                email: '',
            },
            filtered: false,
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                sortField: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortField,
                sortOrder: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortOrder,
            },
            selectedRowKeys: [],
        }
        this.searchInput = undefined;


        //Xử lý table
        this.handleTableChange = this.handleTableChange.bind(this)
        this.changePageSize = this.changePageSize.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.changeInputSearch = this.changeInputSearch.bind(this)
        this.onFilterDropdownVisibleChange = this.onFilterDropdownVisibleChange.bind(this)
    }

    onInputChange(e, column) {
        let searchText = this.state.searchText
        searchText[column] = e.target.value
        this.setState({ searchText: searchText });
        let filterDropdownVisible = { ...this.state.filterDropdownVisible }
        filterDropdownVisible[column] = false

        let filterObject = { ...this.state.filterParam }
        let pagination = { ...this.state.pagination }
        pagination.current = 1
        this.setState({ pagination: pagination, filterParam: filterObject })
        let params = Object.assign({}, pagination, filterObject, this.state.searchText);

        if (this.timer) {
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(() => {
            this.props.listUserPagination(params);
        }, WAIT_INTERVAL);
    }

    changeInputSearch(ele) {
        this.searchInput = ele
    }

    onFilterDropdownVisibleChange(visible, column) {
        let filterDropdownVisible = this.state.filterDropdownVisible
        filterDropdownVisible[column] = visible
        this.setState({
            filterDropdownVisible: filterDropdownVisible,
        }, () => this.searchInput && this.searchInput.focus());
    }

    componentDidMount() {
        let params = { ...this.state.pagination, ...this.state.filterParam }
        this.props.listUserPagination(params);
    }

    getValueFromAnotherObj(childObj, parentObj) {
        for (var k in childObj) childObj[k] = parentObj[k];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchPage > this.props.countFetchPage) {
            const pagination = { ...this.state.pagination }
            pagination.total = nextProps.listUser.total
            // this.resetSelected();
            this.setState({
                pagination
            })
        }
        if (nextProps.countUpdate > this.props.countUpdate) {
            notification.success({
                message: 'Thành công',
                description: 'Nâng cấp tài khoản thành công'
            });
            let params = Object.assign({}, this.state.pagination, this.state.filterParam);
            this.props.listUserPagination(params);
        }
    }

    handleTableChange(pagination, filters, sorter) {
        let filterParam = { ...this.state.filterParam }
        let params = Object.assign({}, filterParam);
        params.pageSize = pagination.pageSize
        params.current = pagination.current
        if (sorter.columnKey != null || sorter.columnKey != undefined) {
            params.sortField = sorter.columnKey;
            params.sortOrder = sorter.order;
            pagination.sortField = sorter.columnKey;
            pagination.sortOrder = sorter.order;
        }
        else {
            pagination.sortField = null;
            pagination.sortOrder = null;
        }
        this.setState({
            pagination: pagination
        })
        this.props.listUserPagination(params)

    }
    changePageSize(value) {
        let paginationState = { ...this.state.pagination }
        paginationState.pageSize = value
        this.setState({
            pagination: paginationState
        })
        let params = Object.assign({}, paginationState, this.state.filterParam)
        this.props.listUserPagination(params)
    }

    render() {
        const { selectedRowKeys } = this.state;
        let rowSelection = {
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeys
                })
            },
            hideDefaultSelections: true,
        };
        if (this.state.filterParam.currentStatus != -2) {
            rowSelection = undefined;
        }

        return (
            <div>
                <TableUser rowKey='index'
                    pagination={this.state.pagination}
                    searchText={this.state.searchText}
                    filterDropdownVisible={this.state.filterDropdownVisible}
                    onInputChange={this.onInputChange}
                    searchInput={this.searchInput}
                    changeInputSearch={this.changeInputSearch}
                    onFilterDropdownVisibleChange={this.onFilterDropdownVisibleChange}
                    handleTableChange={this.handleTableChange}
                    changePageSize={this.changePageSize}
                    listUser={this.props.listUser}
                    activePremium={this.props.activePremium}
                    filterParam={this.state.filterParam}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listUser: state.user.listUser,
        success: state.user.success,
        msg: state.user.msg,
        countFetchPage: state.user.countFetchPage,
        countUpdate: state.user.countUpdate,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listUserPagination: (params) => {
            dispatch(listUserPagination(params))
        },
        activePremium: (params) => {
            dispatch(activePremium(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListUser);