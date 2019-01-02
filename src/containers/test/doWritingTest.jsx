import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertTest } from '../../actions/writingTestTopic';
import DoTest from '../../components/test/do_writing_test.jsx';
import { notification, Input, Divider } from 'antd';

class PostTest extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        if (this.props.location.state != undefined) {
        } else {
            this.props.history.push('/not-found')
        }
    }

    render() {
        return (
            <div>
                <h3>{this.props.location.state != undefined ? this.props.location.state.testItem.wt_title : undefined}</h3>
                <Divider />
                <DoTest {...this.props} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        testItem: state.writingTestTopic.testItem,
        actionName: state.writingTestTopic.actionName,
        countUpdate: state.writingTestTopic.countUpdate,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        insertTest: (params) => {
            dispatch(insertTest(params))
        },
        // fetchTestById: (params) => {
        //     dispatch(fetchTestById(params))
        // },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostTest);