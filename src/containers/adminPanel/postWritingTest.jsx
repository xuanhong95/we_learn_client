import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertTest, fetchTestById } from '../../actions/writingTest';
import Test from '../../components/adminPanel/postWritingTest.jsx';
import { notification, Input, Divider } from 'antd';

class PostTest extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <h3>Đăng bài thi</h3>
                <Divider />
                <Test {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        testItem: state.writingTest.testItem,
        actionName: state.writingTest.actionName,
        countFetchById: state.writingTest.countFetchById,
        msg: state.writingTest.msg,
        success: state.writingTest.success,
        countUpdate: state.writingTest.countUpdate,
        data: state.writingTest.data,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertTest: (params) => {
            dispatch(insertTest(params))
        },
        fetchTestById: (params) => {
            dispatch(fetchTestById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTest);