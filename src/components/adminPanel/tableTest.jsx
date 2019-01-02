import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, Button, Select, Tooltip, Icon } from 'antd';
import FilterTable from '../../components/ultilities/filter_table.jsx'
import cookie from 'react-cookies'

const lstPermission = cookie.load('lstPermission') || [];

const TableOpportunity = ({ listTest, filterDropdownVisible, searchText, changeInputSearch, onFilterDropdownVisibleChange, onInputChange, pagination,
    searchInput, changePageSize, filterParam, rowSelection, handleTableChange }) => {
    let data = listTest.results;
    let disableFunc = rowSelection == undefined || rowSelection.selectedRowKeys.length == 0
    const columns = [
        {
            title: '#', key: "index", width: '4%', dataIndex: "index",
            render: (text, record, index) => (
                <span>{(index + 1) + (pagination.current - 1) * pagination.pageSize}</span>
            )
        },
        {
            title: 'Tiêu đề đề thi', dataIndex: "test_name", filter: false, sorter: true,
            sortOrder: pagination.sortField == 'test_name' ? pagination.sortOrder : false,
            filterDropdown: <FilterTable
                value={searchText.test_name}
                onInputChange={onInputChange}
                searchInput={searchInput}
                changeInputSearch={changeInputSearch}
                fieldName="test_name"
            />,
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: filterDropdownVisible.test_name,
            onFilterDropdownVisibleChange: (visible) => onFilterDropdownVisibleChange(visible, 'test_name'),
            render: (text, record) =>
                <Link to={'/system-content/post-test/' + record.test_id}
                    className="nav-link" ><span>{text}</span></Link>

        },
        {
            title: 'Số lượng câu hỏi', dataIndex: "question_number", width: '20%',
        },
        {
            title: 'Ngày tạo', dataIndex: "created_date", width: '15%',
        },
        {
            title: 'Người tạo', dataIndex: "full_name", width: '15%',
        },
        // {
        //     title: 'Chức năng', dataIndex: "action", width: '10%', align: "center",
        //     render: (text, record) =>
        //         filterParam.currentStatus != -2 ?
        //             <span>
        //                 {lstPermission.indexOf("PROPERTIES-8") > -1 &&
        //                     <Link to={'/system-content/post-test/' + record.test_id}
        //                         className="nav-link"><i className="fa fa-edit" title="Cập nhật"></i></Link>
        //                 }
        //                 {lstPermission.indexOf("PROPERTIES-8") > -1 &&
        //                     <span>
        //                         <Divider type="vertical" />
        //                         <Popconfirm className="nav-link" title="Bạn có muốn xóa đề thi này không?" onConfirm={() => onRemove(record.test_id)}>
        //                             <a href="#" title="Xóa"><i className="far fa-trash-alt"></i></a>
        //                         </Popconfirm>
        //                     </span>
        //                 }
        //             </span>
        //             :
        //             <span>
        //                 {lstPermission.indexOf("PROPERTIES-8") > -1 &&
        //                     <a onClick={() => onRestore(record.test_id)} title="Hoàn tác"><i className="fas fa-window-restore"></i></a>
        //                 }
        //                 {lstPermission.indexOf("PROPERTIES-8") > -1 &&
        //                     <span>
        //                         <Divider type="vertical" />
        //                         <Popconfirm className="nav-link" title="Xóa vĩnh viễn sẽ không hoàn tác được. Bạn có chắc chắn muốn xóa không?" onConfirm={() => onDelete(record.test_id)}>
        //                             <a href="#" title="Xóa vĩnh viễn"><i className="fas fa-eraser"></i></a>
        //                         </Popconfirm>
        //                     </span>
        //                 }
        //             </span>
        // }
    ]
    return (
        <div>
            {lstPermission.indexOf("LIST-TEST") > -1 &&
                <Button type="primary" size='large' className="margin-bottom-5">
                    <Link to={'/system-content/post-test/'}
                        className="nav-link" >Add</Link>
                </Button>
            }
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
                rowKey="test_id"
                bordered
                pagination={pagination}
                onChange={handleTableChange}
                dataSource={data}
                scrollY={500} />
        </div>

    )
}
export default TableOpportunity;