import React, { Component } from 'react';
import moment from 'moment'
import { AutoComplete, Select, Button, Row, Col, Collapse, Divider, Input, Form, DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel

const FilterOpportunity = (props) => {
    const { filterParam, status, onClickSearch, changeStatusFilter,
        clearFilter, changeArticleType, lstArticleTopic } = props
    // const dateString = moment('2014-12-13', 'YYYY-MM-DD').toDate();
    // const dateObj = new Date(dateString);
    // const momentObj = moment(dateObj);
    return (
        <Collapse className="collapse-search-area-frm">
            <Panel header="Tìm kiếm">
                <Row>
                    <Col className="gutter-row list-provider-filter" span={12}>
                        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Danh mục">
                            <Select placeholder="Chọn Danh mục" value={filterParam.at_id} onChange={changeArticleType}>
                                <Option key={-1} value={-1}>Tất cả</Option>
                                {lstArticleTopic.map(item =>
                                    <Option key={item.at_id} value={item.at_id}>{item.at_title}</Option>
                                )}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col className="gutter-row list-provider-filter" span={12}>
                        <FormItem labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} label="Trạng thái">
                            <Select placeholder="Chọn Trạng thái" value={filterParam.status} onChange={changeStatusFilter}>
                                {status.map(type =>
                                    <Select.Option key={type.type_name} value={type.type_name}>{type.name}</Select.Option>
                                )
                                }
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col className="gutter-row" span={24}>
                        <Button type="primary" className={"margin-bottom-5"} style={{ float: 'right', marginLeft: '5px' }} onClick={clearFilter}>Clear</Button>
                        <Button type="primary" className={"margin-bottom-5"} style={{ float: 'right' }} onClick={onClickSearch}>Tìm kiếm</Button>
                    </Col>
                </Row>
            </Panel>
        </Collapse >
    )
}

export default FilterOpportunity