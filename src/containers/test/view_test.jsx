import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import ViewReadingComponent from '../../components/test/view_test.jsx';
import { insertTest, fetchTestById, getCorrectAnswerById } from '../../actions/user_test';
import { notification, Divider } from 'antd';
class ViewReadingContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <ViewReadingComponent
                    {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        testItem: state.user_test.testItem,
        actionName: state.user_test.actionName,
        countUpdate: state.user_test.countUpdate,
        countFetchById: state.user_test.countFetchById,
        correct_anwser: state.user_test.correct_anwser,
        total: state.user_test.total,
        lstCorrectAnswer: state.user_test.lstCorrectAnswer,
        countFetchCorrectAnswer: state.user_test.countFetchCorrectAnswer,
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
        getCorrectAnswerById: (params) => {
            dispatch(getCorrectAnswerById(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewReadingContainer);