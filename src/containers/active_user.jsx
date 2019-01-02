import React, { Component } from 'react';
import { connect } from 'react-redux';
import { activeUser } from '../actions/bar_action';
import { notification, Row, Divider } from 'antd';
import qs from 'query-string';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let params = {}
        let user = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).user
        let code = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).code
        if (user != undefined && code != undefined) {
            console.log(params)
            params.code_active = code
            params.user_login = user
            this.props.activeUser(params)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countActive > this.props.countActive) {
            notification.success({
                message: "Thành công",
                description: "Kích hoạt tài khoản thành công"
            })
        }
    }

    render() {
        return (
            <div>
                <h3>Kích hoạt tài khoản thành công</h3>
                <Divider />
                <Row>
                    <p>Vui lòng đăng nhập <a href="#/login">tại đây</a></p>
                </Row>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        countActive: state.bar_reducer.countActive,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        activeUser: (param) => {
            dispatch(activeUser(param))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);