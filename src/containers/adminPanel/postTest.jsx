import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertTest, fetchTestById } from '../../actions/test';
import Test from '../../components/adminPanel/postTest.jsx';
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
        testItem: state.test.testItem,
        actionName: state.test.actionName,
        countFetchById: state.test.countFetchById,
        msg: state.test.msg,
        success: state.test.success,
        countUpdate: state.test.countUpdate,
        data: state.test.data,
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