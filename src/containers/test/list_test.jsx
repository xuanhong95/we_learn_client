import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import ListReadingComponent from '../../components/test/list_test.jsx';
import { listAllTest, } from '../../actions/user_test';
import { notification, Divider } from 'antd';
class ListReadingContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
        this.props.listAllTest({})
    }

    render() {
        return (
            <div>
                <h3>Danh sách đề thi</h3>
                <Divider />
                <ListReadingComponent
                    {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        lstTest: state.user_test.lstTest,
        success: state.user_test.success,
        msg: state.user_test.msg,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        listAllTest: (params) => {
            dispatch(listAllTest(params))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListReadingContainer);