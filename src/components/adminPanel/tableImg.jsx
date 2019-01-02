import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, Button, Select, Tooltip, Icon } from 'antd';
import FilterTable from '../../components/ultilities/filter_table.jsx'
import cookie from 'react-cookies'

const lstPermission = cookie.load('lstPermission') || [];

const TableOpportunity = ({ listImage, filterDropdownVisible, searchText, changeInputSearch, onFilterDropdownVisibleChange, onInputChange, pagination, onDelete, onRemove,
    searchInput, onRestore, changePageSize, filterParam, handleTableChange }) => {
    let data = listImage.results;
    const columns = [
        {
            title: '#', key: "index", width: '4%', dataIndex: "index",
            render: (text, record, index) => (
                <span>{(index + 1) + (pagination.current - 1) * pagination.pageSize}</span>
            )
        },
        {
            title: 'Tên ảnh', dataIndex: "article_title", filter: false, sorter: true,
            sortOrder: pagination.sortField == 'article_title' ? pagination.sortOrder : false,
            filterDropdown: <FilterTable
                value={searchText.article_title}
                onInputChange={onInputChange}
                searchInput={searchInput}
                changeInputSearch={changeInputSearch}
                fieldName="article_title"
            />,
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: filterDropdownVisible.article_title,
            onFilterDropdownVisibleChange: (visible) => onFilterDropdownVisibleChange(visible, 'article_title'),
            render: (text, record) =>
                <Link to={'/system-content/post-article/' + record.article_id}
                    className="nav-link" ><span>{text}</span></Link>

        },
        {
            title: 'Người tạo', dataIndex: "created_name", width: '30%',
        },
        {
            title: 'Chức năng', dataIndex: "action", width: '20%', align: "center",
            render: (text, record) =>
                filterParam.currentStatus != -2 ?
                    <span>
                        {lstPermission.indexOf("PROPERTIES-8") > -1 &&
                            <Link to={'/system-content/post-article/' + record.article_id}
                                className="nav-link"><i className="fa fa-edit" title="Cập nhật"></i></Link>
                        }
                        {lstPermission.indexOf("PROPERTIES-8") > -1 &&
                            <span>
                                <Divider type="vertical" />
                                <Popconfirm className="nav-link" title="Bạn có muốn xóa phòng ban này không?" onConfirm={() => onRemove(record.article_id)}>
                                    <a href="#" title="Xóa"><i className="far fa-trash-alt"></i></a>
                                </Popconfirm>
                            </span>
                        }
                    </span>
                    :
                    <span>
                        {lstPermission.indexOf("PROPERTIES-8") > -1 &&
                            <a onClick={() => onRestore(record.article_id)} title="Hoàn tác"><i className="fas fa-window-restore"></i></a>
                        }
                        {lstPermission.indexOf("PROPERTIES-8") > -1 &&
                            <span>
                                <Divider type="vertical" />
                                <Popconfirm className="nav-link" title="Xóa vĩnh viễn sẽ không hoàn tác được. Bạn có chắc chắn muốn xóa không?" onConfirm={() => onDelete(record.article_id)}>
                                    <a href="#" title="Xóa vĩnh viễn"><i className="fas fa-eraser"></i></a>
                                </Popconfirm>
                            </span>
                        }
                    </span>
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
                rowKey="article_id"
                bordered
                pagination={pagination}
                onChange={handleTableChange}
                dataSource={data}
                scrollY={500} />
        </div>

    )
}
export default TableOpportunity;