import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, Button, Select, Tooltip, Icon } from 'antd';
import FilterTable from '../../components/ultilities/filter_table.jsx'
import cookie from 'react-cookies'

const lstPermission = cookie.load('lstPermission') || [];

const TableOpportunity = ({ listUser, filterDropdownVisible, searchText, changeInputSearch,
    onFilterDropdownVisibleChange, onInputChange, pagination,
    searchInput, changePageSize, handleTableChange, activePremium }) => {
    let data = listUser.results;
    const columns = [
        {
            title: '#', key: "index", width: '4%', dataIndex: "index",
            render: (text, record, index) => (
                <span>{(index + 1) + (pagination.current - 1) * pagination.pageSize}</span>
            )
        },
        {
            title: 'Mã người dùng', dataIndex: "user_login",
            filterDropdown: <FilterTable
                value={searchText.user_login}
                onInputChange={onInputChange}
                searchInput={searchInput}
                changeInputSearch={changeInputSearch}
                fieldName="user_login"
            />,
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: filterDropdownVisible.user_login,
            onFilterDropdownVisibleChange: (visible) => onFilterDropdownVisibleChange(visible, 'user_login'),
        },
        {
            title: 'Tên người dùng', dataIndex: "full_name",
            filterDropdown: <FilterTable
                value={searchText.full_name}
                onInputChange={onInputChange}
                searchInput={searchInput}
                changeInputSearch={changeInputSearch}
                fieldName="full_name"
            />,
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: filterDropdownVisible.full_name,
            onFilterDropdownVisibleChange: (visible) => onFilterDropdownVisibleChange(visible, 'full_name'),
        },
        {
            title: 'Email', dataIndex: "email",
            filterDropdown: <FilterTable
                value={searchText.email}
                onInputChange={onInputChange}
                searchInput={searchInput}
                changeInputSearch={changeInputSearch}
                fieldName="email"
            />,
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: filterDropdownVisible.email,
            onFilterDropdownVisibleChange: (visible) => onFilterDropdownVisibleChange(visible, 'email'),
        },
        {
            title: 'Loại người dùng', dataIndex: "group_id",
            render: (text, record) => {
                if (text == 2)
                    return "Người dùng cơ bản"
                else if (text == 3)
                    return "Người dùng nâng cao"
            }
        },
        {
            title: 'Chức năng', dataIndex: "action", width: '25%', align: "center",
            render: (text, record) => {
                if (record.group_id == 2) {
                    return (
                        <span>
                            <Popconfirm className="nav-link" title="Nâng cấp Premium 1 tháng?"
                                onConfirm={() => activePremium({ days: 30, user_id: record.user_id })}>
                                <a href="#" title="Premium 1 month">
                                    <Button type="primary" size='small  ' className="margin-bottom-5">
                                        1 Month
                            </Button>
                                </a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm className="nav-link" title="Nâng cấp Premium 3 tháng?"
                                onConfirm={() => activePremium({ days: 90, user_id: record.user_id })}>
                                <a href="#" title="Premium 1 month">
                                    <Button type="primary" size='small  ' className="margin-bottom-5">
                                        3 Months
                            </Button>
                                </a>
                            </Popconfirm>
                        </span>
                    )
                }
            }
        }
    ]
    return (
        <div>
            <Select
                value={pagination.pageSize}
                onChange={changePageSize}
                style={{ width: 60, float: 'right' }}>
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={50}>50</Select.Option>
            </Select>
            <Table
                size='small'
                className='table-provider'
                columns={columns}
                rowKey="user_id"
                bordered
                pagination={pagination}
                onChange={handleTableChange}
                dataSource={data}
                scrollY={500} />
        </div>

    )
}
export default TableOpportunity;