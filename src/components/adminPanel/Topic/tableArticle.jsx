import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Divider, Popconfirm, Button, Select, Tooltip, Icon } from 'antd';
import FilterTable from '../../../components/ultilities/filter_table.jsx'
import cookie from 'react-cookies'

const lstPermission = cookie.load('lstPermission') || [];

const TableOpportunity = ({ listArticle, filterDropdownVisible, searchText, changeInputSearch, onFilterDropdownVisibleChange, onInputChange, pagination, onDelete, onRemove,
    searchInput, onRestore, changePageSize, handleDelete, handleRestore, filterParam, rowSelection, handleTableChange }) => {
    let data = listArticle.results;
    let disableFunc = rowSelection == undefined || rowSelection.selectedRowKeys.length == 0
    const columns = [
        {
            title: '#', key: "index", width: '4%', dataIndex: "index",
            render: (text, record, index) => (
                <span>{(index + 1) + (pagination.current - 1) * pagination.pageSize}</span>
            )
        },
        {
            title: 'Danh mục', dataIndex: "article_title",
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
            title: 'Danh mục', dataIndex: "article_type_name", width: '20%',
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
                        {lstPermission.indexOf("ARTICLE-3") > -1 &&
                            <Link to={'/system-content/post-article/' + record.article_id}
                                className="nav-link"><i className="fa fa-edit" title="Cập nhật"></i></Link>
                        }
                        {lstPermission.indexOf("ARTICLE-4") > -1 &&
                            <span>
                                <Divider type="vertical" />
                                <Popconfirm className="nav-link" title="Bạn có muốn xóa bài viết này không?" onConfirm={() => onRemove(record.article_id)}>
                                    <a href="#" title="Xóa"><i className="far fa-trash-alt"></i></a>
                                </Popconfirm>
                            </span>
                        }
                    </span>
                    :
                    <span>
                        {lstPermission.indexOf("ARTICLE-5") > -1 &&
                            <a onClick={() => onRestore(record.article_id)} title="Hoàn tác"><i className="fas fa-window-restore"></i></a>
                        }
                        {lstPermission.indexOf("ARTICLE-6") > -1 &&
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
            {lstPermission.indexOf("ARTICLE-2") > -1 &&
                <Button type="primary" size='large' className="margin-bottom-5">
                    <Link to={'/system-content/post-article/'}
                        className="nav-link" >Add</Link>
                </Button>
            }
            <span className={filterParam.currentStatus != -2 ? "hidden-element" : ""}>
                <Divider type="vertical" />
                {lstPermission.indexOf("ARTICLE-5") > -1 &&
                    <Button type="primary" size='large' disabled={rowSelection == undefined || rowSelection.selectedRowKeys.length == 0} className="margin-bottom-5" onClick={handleRestore}>
                        Restore
            </Button>
                }
                {lstPermission.indexOf("ARTICLE-6") > -1 &&
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
                rowKey="article_id"
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