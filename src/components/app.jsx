import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import { renderRoutes } from 'react-router-config'
import TopbarContainer from '../containers/topbar_container.jsx'
import SidebarContainer from '../containers/sidebar_container.jsx'
import { Layout, Menu, Icon, Spin } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
import 'antd/dist/antd.css';
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let token = cookie.load('token')
    if (token === undefined || token == '') {
      // this.props.history.push('/login')
    }
  }

  render() {
    const { route } = this.props
    return (
      <Layout>
        <SidebarContainer hash={window.location.hash} />
        <Layout>
          <Spin size="large" tip="Loading..." spinning={this.props.loading}>
            <TopbarContainer {...this.props} />
            <Content style={{ margin: '24px 16px 0' }}>
              <div style={{ padding: 24, background: '#fff', minHeight: 'auto' }}>
                {renderRoutes(route.routes)}
              </div>
            </Content>
            <Footer style={{ textAlign: 'left' }}>
              We Learn - ©2018
            </Footer>
          </Spin>
        </Layout>
      </Layout>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    loading: state.utility.loading,
    msg: state.utility.msg
  }
}
// export default App;
export default connect(mapStateToProps)(App);