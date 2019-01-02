import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, Button, Select, Tooltip, Icon } from 'antd';
import FilterTable from '../../../components/ultilities/filter_table.jsx'
import cookie from 'react-cookies'

const lstPermission = cookie.load('lstPermission') || [];

const TableOpportunity = ({ listTopic, filterDropdownVisible, searchText, changeInputSearch, onFilterDropdownVisibleChange, onInputChange, pagination, onDelete, onRemove,
    searchInput, onRestore, changePageSize, handleDelete, handleRestore, filterParam, rowSelection, handleTableChange }) => {
    let data = listTopic.results;
    let disableFunc = rowSelection == undefined || rowSelection.selectedRowKeys.length == 0
    const columns = [
        {
            title: '#', key: "index", width: '4%', dataIndex: "index",
            render: (text, record, index) => (
                <span>{(index + 1) + (pagination.current - 1) * pagination.pageSize}</span>
            )
        },
        {
            title: 'Tiêu đề bài viết', dataIndex: "at_title", filter: false, sorter: true,
            sortOrder: pagination.sortField == 'at_title' ? pagination.sortOrder : false,
            filterDropdown: <FilterTable
                value={searchText.at_title}
                onInputChange={onInputChange}
                searchInput={searchInput}
                changeInputSearch={changeInputSearch}
                fieldName="at_title"
            />,
            filterIcon: <Icon type="filter" style={{ color: '#108ee9' }} />,
            filterDropdownVisible: filterDropdownVisible.at_title,
            onFilterDropdownVisibleChange: (visible) => onFilterDropdownVisibleChange(visible, 'at_title'),
            render: (text, record) =>
                <Link to={'/system-content/post-article-topic/' + record.at_id}
                    className="nav-link" ><span>{text}</span></Link>

        },
        {
            title: 'Danh mục', dataIndex: "article_title", width: '20%',
        },
        {
            title: 'Ngày tạo', dataIndex: "created_date", width: '15%',
        },
        {
            title: 'Người tạo', dataIndex: "full_name", width: '15%',
        },
        {
            title: 'Chức năng', dataIndex: "action", width: '10%', align: "center",
            render: (text, record) =>
                filterParam.currentStatus != -2 ?
                    <span>
                        {lstPermission.indexOf("ARTICLE-TOPIC-3") > -1 &&
                            <Link to={'/system-content/post-article-topic/' + record.at_id}
                                className="nav-link"><i className="fa fa-edit" title="Cập nhật"></i></Link>
                        }
                        {lstPermission.indexOf("ARTICLE-TOPIC-4") > -1 &&
                            <span>
                                <Divider type="vertical" />
                                <Popconfirm className="nav-link" title="Bạn có muốn xóa bài viết này không?" onConfirm={() => onRemove(record.at_id)}>
                                    <a href="#" title="Xóa"><i className="far fa-trash-alt"></i></a>
                                </Popconfirm>
                            </span>
                        }
                    </span>
                    :
                    <span>
                        {lstPermission.indexOf("ARTICLE-TOPIC-5") > -1 &&
                            <a onClick={() => onRestore(record.at_id)} title="Hoàn tác"><i className="fas fa-window-restore"></i></a>
                        }
                        {lstPermission.indexOf("ARTICLE-TOPIC-6") > -1 &&
                            <span>
                                <Divider type="vertical" />
                                <Popconfirm className="nav-link" title="Xóa vĩnh viễn sẽ không hoàn tác được. Bạn có chắc chắn muốn xóa không?" onConfirm={() => onDelete(record.at_id)}>
                                    <a href="#" title="Xóa vĩnh viễn"><i className="fas fa-eraser"></i></a>
                                </Popconfirm>
                            </span>
                        }
                    </span>
        }
    ]
    return (
        <div>
            {lstPermission.indexOf("ARTICLE-TOPIC-2") > -1 &&
                <Button type="primary" size='large' className="margin-bottom-5">
                    <Link to={'/system-content/post-article-topic/'}
                        className="nav-link" >Add</Link>
                </Button>
            }
            <span className={filterParam.currentStatus != -2 ? "hidden-element" : ""}>
                <Divider type="vertical" />
                {lstPermission.indexOf("ARTICLE-TOPIC-5") > -1 &&
                    <Button type="primary" size='large' disabled={rowSelection == undefined || rowSelection.selectedRowKeys.length == 0} className="margin-bottom-5" onClick={handleRestore}>
                        Restore
            </Button>
                }
                {lstPermission.indexOf("ARTICLE-TOPIC-6") > -1 &&
                    <span>
                        <Divider type="vertical" />
                        <Popconfirm className="nav-link" title="Xóa vĩnh viễn sẽ không hoàn tác được. Bạn có muốn xóa không?" onConfirm={() => handleDelete()}>
                            <Button type="primary" disabled={rowSelection == undefined || rowSelection.selectedRowKeys.length == 0} size='large' className="margin-bottom-5">
                                Delete
                		</Button>
                        </Popconfirm>
                    </span>
                }
            </span>
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
                rowKey="at_id"
                bordered
                pagination={pagination}
                onChange={handleTableChange}
                dataSource={data}
                rowSelection={rowSelection}
                scrollY={500} />
        </div>

    )
}
export default TableOpportunity;