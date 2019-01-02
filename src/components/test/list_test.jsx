import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { notification, Row } from 'antd';
import '../../scss/test.scss';
import Item from 'antd/lib/list/Item';

class ListReadingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // lstTest: [
            //     { test_id: 1, test_name: 'Reading 01', test_type: 0, question_number: 30, status: 0, last_point: 0.00, },
            //     { test_id: 2, test_name: 'Reading 02', test_type: 0, question_number: 30, status: 0, last_point: 0.00, },
            //     { test_id: 3, test_name: 'Reading 03', test_type: 0, question_number: 30, status: 1, last_point: 3.50, },
            // ]
        }
    }


    render() {
        return (
            <Row>
                {
                    this.props.lstTest.map(testItem =>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className="test-item">
                                <div className="test-item-header">
                                    {testItem.test_name}
                                </div>
                                <div className="test-item-content">
                                    <p>Số câu: <b>{testItem.question_number}</b></p>
                                    <p>Thời lượng: <b>45 phút</b></p>
                                    <p>Trạng thái: <b>{testItem.status == 0 ? "Chưa làm" : "Đã làm"}</b></p>
                                    <p>Điểm: <b>{testItem.last_point.toFixed(2)}</b></p>
                                </div>
                                <div className="button-test">
                                    <a href={"#/test/view-test/" + testItem.test_id} className={testItem.status == 0 ? "btn btn-info" : "btn btn-success"}>
                                        {testItem.status == 0 ? "Làm bài" : "Làm lại"}
                                    </a>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Row>
        )
    }
}

export default ListReadingComponent;