import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import TableImage from '../../components/adminPanel/tableImg.jsx';
import InsertImage from '../../components/adminPanel/filterImg.jsx';
import { listImagePagination, deleteImage, insertImage } from '../../actions/image';
import {
    Upload, Select, Button, Row, Col, Collapse, Divider,
    Pagination, Input, Form, DatePicker, notification
} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel
class ListPlaceType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            img_lstfile: [],
            filterParam: {
                file_name: '',
                status: -1,
                currentStatus: -1
            },
            filterDropdownVisible: {
            },
            searchText: {
            },
            filtered: false,
            pagination: {
                pageSize: 10,
                current: 1,
                total: 0,
                sortField: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortField,
                sortOrder: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortOrder,
                position: 'both'
            },
            selectedRowKeys: [],
        }
        //Xử lý filter
        this.onInsert = this.onInsert.bind(this);

        //Xử lý table
        this.onDelete = this.onDelete.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    copyUrl(url) {
        let element = document.createElement('input')
        document.body.appendChild(element);
        element.value = url
        element.select()
        document.execCommand('copy');
        notification.success({
            message: 'Thành công',
            description: 'Đường dẫn ảnh đã được copy vào Clipboard'
        });
    }

    handlePageChange(paginate) {
        let pagination = { ...this.state.pagination }
        pagination.current = paginate
        this.setState({
            pagination
        })
        let params = Object.assign({}, pagination, this.state.filterParam);
        this.props.listImagePagination(params)
    }

    componentDidMount() {
        let params = { ...this.state.pagination, ...this.state.filterParam }
        this.props.listImagePagination(params);
    }

    getValueFromAnotherObj(childObj, parentObj) {
        for (var k in childObj) childObj[k] = parentObj[k];
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchPage > this.props.countFetchPage) {
            const pagination = { ...this.state.pagination }
            pagination.total = nextProps.listImage.total
            this.setState({
                pagination
            })
        }
        if (nextProps.countUpdate > this.props.countUpdate) {
            if (nextProps.actionName == "insert") {
                notification.success({
                    message: 'Thành công',
                    description: 'Thêm mới ảnh thành công'
                });
                this.setState({
                    img_lstfile: []
                })
                let params = Object.assign({}, this.state.pagination, this.state.filterParam);
                this.props.listImagePagination(params);
            }
        }
        if (nextProps.countDelete > this.props.countDelete) {
            notification.success({
                message: 'Thành công',
                description: 'Xóa ảnh thành công'
            });
            let params = Object.assign({}, this.state.pagination, this.state.filterParam);
            this.props.listImagePagination(params);
        }
    }

    onDelete(img_id) {
        let params = {
            img_id
        }
        this.props.deleteImage(params)
    }

    onInsert() {
        let params = new FormData();
        this.state.img_lstfile.forEach(function (item) {
            if (!item.uploaded) {
                params.append("attachment", item.originFileObj)
            }
        })
        this.props.insertImage(params);
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

        const props_upload = {
            onRemove: (file) => {
                if (file.uploaded) {
                    if (window.confirm('Bạn có chắc chắn muốn xóa file này?')) {
                        let new_path = "";
                        let lstFile = this.state.img_lstfile;
                        var index = lstFile.indexOf(file)
                        if (index != -1) {
                            lstFile.splice(index, 1);
                        }
                        lstFile.forEach(function (element) {
                            // Chỉ lấy những file đã upload
                            if (element.uploaded)
                                new_path += element.name + ";"
                        });
                        // this.setState({
                        //     images: new_path
                        // })
                        let image_object = {
                            pic_bo_id: this.props.editRecordContact.pic_bo_id,
                            new_path: new_path,
                            file_name: file.name,
                            // file_type: "images"
                        }
                        this.props.setPathLstContactProv(new_path, this.props.editRecordContact.index)
                        this.props.deleteFile(image_object);
                    } else {
                        return false;
                    }
                }
            },
            onChange: (info) => {
                let fileList = info.fileList;
                // if (info.file.status === "error") {
                //     fileList = fileList.slice(1, 6);
                // }
                // else {
                //     if (fileList.length > 5) {
                //         fileList.shift()
                //         notification.error({
                //             message: 'Thông báo',
                //             description: 'Tối đa 5 file.'
                //         });
                //     }
                // }
                this.setState({ img_lstfile: fileList });
            },
            multiple: true,
            beforeUpload: (file) => {
                const isJPG = file.type.includes("image/");
                const isLt4M = file.size / 1024 / 1024 < 4;
                if (!isJPG) {
                    notification.error({
                        message: 'Thông báo',
                        description: 'File upload không phải file ảnh'
                    });
                    file.status = "error";
                }
                else if (!isLt4M) {
                    notification.error({
                        message: 'Thông báo',
                        description: 'File ảnh phải nhỏ hơn 4MB'
                    });
                    file.status = "error";
                }
                return false;
            },
            fileList: this.state.img_lstfile,
            listType: "picture"
        };

        return (
            <div>
                <Row>
                    <Row>
                        <Col className="gutter-row list-provider-filter" span={12}>
                            <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Ảnh">
                                <Upload {...props_upload} fileList={this.state.img_lstfile}>
                                    <Button type="primary" className="btn btn-success" id="images">Add</Button>
                                </Upload>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="gutter-row" span={24}>
                            <Button type="primary" className={"margin-bottom-5"} style={{ float: 'right' }} onClick={this.onInsert}>Thêm Ảnh</Button>
                        </Col>
                    </Row>
                    <Row>
                        {
                            this.props.listImage.results.map((item, key) => {
                                return (
                                    <div className="box-image col-md-3 col-sm-4 col-xs-6">
                                        <div className="box-image-content" onClick={() => this.copyUrl(item.url)}>
                                            <div className="image-content">
                                                <img src={item.url} />
                                            </div>
                                            <div className="text-content">
                                                {item.file_name}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Row>
                    {
                        this.props.listImage.total > 0 &&
                        <Row style={{ textAlign: "center", marginTop: "5px" }}>
                            <Pagination defaultCurrent={1}
                                onChange={this.handlePageChange}
                                total={this.props.listImage.total}
                                pageSize={this.state.pagination.pageSize} />
                        </Row>
                    }
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listImage: state.img.listImage,
        actionName: state.img.actionName,
        success: state.img.success,
        msg: state.img.msg,
        countDelete: state.img.countDelete,
        countFetchPage: state.img.countFetchPage,
        countUpdate: state.img.countUpdate,
        lastSearchObj: state.img.lastSearchObj,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listImagePagination: (params) => {
            dispatch(listImagePagination(params))
        },
        deleteImage: (params) => {
            dispatch(deleteImage(params))
        },
        insertImage: (params) => {
            dispatch(insertImage(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPlaceType);