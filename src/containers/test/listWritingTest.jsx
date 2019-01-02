import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import TableTest from '../../components/adminPanel/tableWritingTest.jsx';
import FilterTest from '../../components/adminPanel/filterTest.jsx';
import { getAllByUserId } from '../../actions/writingTest';
import { listTestPagination, setLastSearchTest } from '../../actions/writingTestTopic';
import { notification, Row, Collapse } from 'antd';
import '../../scss/test.scss';

const Panel = Collapse.Panel
class ListTest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterParam: {
                full_name: '',
                test_type: 1,
                status: -1,
                currentStatus: -1
            },
            filterDropdownVisible: {
                full_name: false,
            },
            searchText: {
                full_name: '',
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

        //Xử lý filter
        this.onClickSearch = this.onClickSearch.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
        this.changeStatusFilter = this.changeStatusFilter.bind(this);

        //Xử lý table
        this.resetSelected = this.resetSelected.bind(this)
        this.handleTableChange = this.handleTableChange.bind(this)
        this.changePageSize = this.changePageSize.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.changeInputSearch = this.changeInputSearch.bind(this)
        this.onFilterDropdownVisibleChange = this.onFilterDropdownVisibleChange.bind(this)
        this.changeTestType = this.changeTestType.bind(this)
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
        this.props.listTestPagination(params);
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
        let params = undefined;
        if (this.props.lastSearchObj != null) {
            params = this.props.lastSearchObj
            // gán lại các biến từ lastSearchObj vào state
            let pagination = { ...this.state.pagination }
            let filterParam = { ...this.state.filterParam }
            this.getValueFromAnotherObj(pagination, this.props.lastSearchObj);
            this.getValueFromAnotherObj(filterParam, this.props.lastSearchObj);
            this.setState({
                pagination, filterParam
            })
        } else {
            params = { ...this.state.pagination, ...this.state.filterParam }
        }
        this.props.getAllByUserId()
        this.props.listTestPagination(params);
    }

    getValueFromAnotherObj(childObj, parentObj) {
        for (var k in childObj) childObj[k] = parentObj[k];
    }

    componentWillUnmount() {
        let params = Object.assign({}, this.state.pagination, this.state.filterParam)
        this.props.setLastSearchTest(params)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.lastSearchObj != null && nextProps.lastSearchObj != this.props.lastSearchObj) {
            let pagination = { ...this.state.pagination }
            let filterParam = { ...this.state.filterParam }
            this.getValueFromAnotherObj(pagination, nextProps.lastSearchObj);
            this.getValueFromAnotherObj(filterParam, nextProps.lastSearchObj);
            this.setState({
                pagination, filterParam
            })
        }
        if (nextProps.countFetchPage > this.props.countFetchPage) {
            const pagination = { ...this.state.pagination }
            pagination.total = nextProps.listTest.total
            // this.resetSelected();
            this.setState({
                pagination
            })
        }
    }

    resetSelected() {
        setTimeout(() => {
            this.setState({
                selectedRowKeys: []
            });
        }, 100);
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
        this.props.listTestPagination(params)

    }
    changePageSize(value) {
        let paginationState = { ...this.state.pagination }
        paginationState.pageSize = value
        this.setState({
            pagination: paginationState
        })
        let params = Object.assign({}, paginationState, this.state.filterParam)
        this.props.listTestPagination(params)
    }

    changeStatusFilter(value) {
        let filterParam = { ...this.state.filterParam }
        filterParam.status = value;
        this.setState({
            filterParam
        })
    }
    changeTestType(value) {
        let filterParam = { ...this.state.filterParam }
        filterParam.test_type = value;
        this.setState({
            filterParam
        })
    }

    clearFilter() {
        let filterParam = {
            full_name: '',
            test_type: 1,
            status: -1,
            currentStatus: -1
        }
        let filterDropdownVisible = {
            full_name: false,
        }
        let searchText = {
            full_name: '',
        }
        let pagination = {
            pageSize: 10,
            current: 1,
            total: 0,
            sortField: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortField,
            sortOrder: this.props.lastSearchObj == null ? null : this.props.lastSearchObj.sortOrder,
            position: 'both'
        }
        let selectedRowKeys = []

        this.setState({ pagination, filterParam, searchText, filterDropdownVisible, selectedRowKeys })
        let params = Object.assign({}, pagination, filterParam);
        this.props.listTestPagination(params);
        this.resetSelected();
    }

    onClickSearch() {
        let filterObject = { ...this.state.filterParam }
        let pagination = { ...this.state.pagination }
        pagination.current = 1
        filterObject.currentStatus = filterObject.status
        this.setState({ pagination: pagination, filterParam: filterObject })
        let params = Object.assign({}, pagination, filterObject);
        this.resetSelected();
        this.props.listTestPagination(params);
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
                <Collapse className="collapse-search-area-frm" defaultActiveKey={"1"}>
                    <Panel header="Danh sách đề thi viết" key="1">
                        <Row>
                            {
                                this.props.listTestByUser.map(testItem =>
                                    <div className="col-xs-12 col-sm-6 col-md-4">
                                        <div className="test-item">
                                            <div className="test-item-header">
                                                {testItem.full_name}
                                            </div>
                                            <div className="test-item-content">
                                                <p>{testItem.wt_content}</p>
                                            </div>
                                            <div className="button-test">
                                                <Link to={{ pathname: '/test/do-writing-test', state: { testItem: testItem } }}
                                                    className={testItem.status == 0 ? "btn btn-info" : "btn btn-success"}
                                                    disabled={testItem.status}
                                                >
                                                    {testItem.status == 0 ? "Làm bài" : "Đã làm"}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </Row>
                    </Panel>
                </Collapse>
                <TableTest rowKey='index'
                    pagination={this.state.pagination}
                    searchText={this.state.searchText}
                    filterDropdownVisible={this.state.filterDropdownVisible}
                    onInputChange={this.onInputChange}
                    searchInput={this.searchInput}
                    changeInputSearch={this.changeInputSearch}
                    onFilterDropdownVisibleChange={this.onFilterDropdownVisibleChange}
                    handleTableChange={this.handleTableChange}
                    changePageSize={this.changePageSize}
                    listTest={this.props.listTest}
                    filterParam={this.state.filterParam}
                    rowSelection={rowSelection}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listTestByUser: state.writingTest.listTestByUser,
        listTest: state.writingTestTopic.listTest,
        success: state.writingTest.success,
        msg: state.writingTest.msg,
        countDelete: state.writingTest.countDelete,
        countRemove: state.writingTest.countRemove,
        countRestore: state.writingTest.countRestore,
        countFetchPage: state.writingTestTopic.countFetchPage,
        countUpdate: state.writingTest.countUpdate,
        lastSearchObj: state.writingTestTopic.lastSearchObj,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listTestPagination: (params) => {
            dispatch(listTestPagination(params))
        },
        setLastSearchTest: (param) => {
            dispatch(setLastSearchTest(param))
        },
        getAllByUserId: () => {
            dispatch(getAllByUserId())
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListTest);