import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon, Tooltip } from 'antd';
import cookie from 'react-cookies';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu
class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedSidebar: '#/',
            activeKey: ''
        }
        this.changeMenuSelect = this.changeMenuSelect.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    changeMenuSelect(e) {
        if (e.length == 0) {
            this.setState({
                activeKey: ''
            })
        }
        else {
            this.setState({
                activeKey: e[1]
            })
        }
    }

    onSelect(e) {
        this.setState({
            selectedSidebar: e.key
        })
    }

    componentDidMount() {
        if (window.location.hash != '#/dashboard') {
            this.setState({
                selectedSidebar: window.location.hash
            })
        }

        if (window.location.hash.includes('/forums/')) {
            this.setState({ activeKey: "subMenuForum" })
        }
        else if (window.location.hash.includes('/grammar/')) {
            this.setState({ activeKey: "subMenuSkill" })
        }
        else if (window.location.hash.includes('/test/')) {
            this.setState({ activeKey: "subMenuTest" })
        }
        else if (window.location.hash.includes('/system-content/')) {
            this.setState({ activeKey: "subMenuContent" })
        }
        else if (window.location.hash.includes('/system-control/')) {
            this.setState({ activeKey: "subMenuSystem" })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hash != this.props.hash) {
            if (nextProps.hash != '#/dashboard') {
                this.setState({
                    selectedSidebar: nextProps.hash
                })
            }

            if (nextProps.hash.includes('/forums/')) {
                this.setState({ activeKey: "subMenuForum" })
            }
            else if (nextProps.hash.includes('/grammar/')) {
                this.setState({ activeKey: "subMenuSkill" })
            }
            else if (nextProps.hash.includes('/test/')) {
                this.setState({ activeKey: "subMenuTest" })
            }
            else if (nextProps.hash.includes('/system-content/')) {
                this.setState({ activeKey: "subMenuContent" })
            }
            else if (nextProps.hash.includes('/system-control/')) {
                this.setState({ activeKey: "subMenuSystem" })
            }
        }
    }

    render() {
        const { activeSidebar } = this.props
        const lstPermission = cookie.load('lstPermission') || [];
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={activeSidebar}
                style={{ overflow: 'auto', height: '100vh', left: 0 }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" openKeys={[this.state.activeKey]}
                    selectedKeys={[this.state.selectedSidebar]}
                    onOpenChange={this.changeMenuSelect}
                    onSelect={this.onSelect}>
                    <Menu.Item key="#/">
                        <Link to={'/dashboard'} className="nav-link" >
                            <i style={{ width: '16px', height: '16px' }} className="fas fa-home"></i>&nbsp;&nbsp;
                            <span>Homepage</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="subMenuForum" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-user"></i>&nbsp;&nbsp;<span>Diễn đàn</span></span>}>
                        <Menu.Item key="#/forums/list-qa" >
                            <Link to={'/forums/list-qa'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Hỏi đáp</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="subMenuSkill" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-user"></i>&nbsp;&nbsp;<span>Các kỹ năng</span></span>}>
                        <Menu.Item key="#/grammar/all-grammar" >
                            <Link to={'/grammar/all-grammar'} className="nav-link" >
                                <Icon type="flag" />
                                <span>Ngữ pháp</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    {lstPermission.indexOf("TEST") > -1 &&
                        <SubMenu key="subMenuTest" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-user"></i>&nbsp;&nbsp;<span>Luyện đề thi</span></span>}>
                            {lstPermission.indexOf("USER-TEST") > -1 &&
                                <Menu.Item key="#/test/list-test" >
                                    <Link to={'/test/list-test'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Luyện thi ngữ pháp</span>
                                    </Link>
                                </Menu.Item>
                            }
                            {lstPermission.indexOf("USER-TEST") > -1 &&
                                <Menu.Item key="#/test/list-writing-test" >
                                    <Link to={'/test/list-writing-test'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Luyện thi viết</span>
                                    </Link>
                                </Menu.Item>
                            }
                        </SubMenu>
                    }
                    {lstPermission.indexOf("CONTENT") > -1 &&
                        <SubMenu key="subMenuContent" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-cogs"></i>&nbsp;&nbsp;<span>Quản lý nội dung</span></span>}>
                            {lstPermission.indexOf("LIST-TEST") > -1 &&
                                <Menu.Item key="#/system-content/list-test" >
                                    <Link to={'/system-content/list-test'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Danh sách đề thi</span>
                                    </Link>
                                </Menu.Item>
                            }
                            {lstPermission.indexOf("LIST-TEST") > -1 &&
                                <Menu.Item key="#/system-content/list-writing-test" >
                                    <Link to={'/system-content/list-writing-test'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Danh sách đề thi viết</span>
                                    </Link>
                                </Menu.Item>
                            }
                            {lstPermission.indexOf("ARTICLE") > -1 &&
                                <Menu.Item key="#/system-content/list-article" >
                                    <Link to={'/system-content/list-article'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Danh mục</span>
                                    </Link>
                                </Menu.Item>
                            }
                            {lstPermission.indexOf("ARTICLE-TOPIC") > -1 &&
                                <Menu.Item key="#/system-content/list-article-topic" >
                                    <Link to={'/system-content/list-article-topic'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Đề tài theo danh mục</span>
                                    </Link>
                                </Menu.Item>
                            }
                            {lstPermission.indexOf("TOPIC-CONTENT") > -1 &&
                                <Menu.Item key="#/system-content/list-atc" >
                                    <Link to={'/system-content/list-atc'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Bài viết theo đề tài</span>
                                    </Link>
                                </Menu.Item>
                            }
                            {lstPermission.indexOf("IMAGE-UPLOAD") > -1 &&
                                <Menu.Item key="#/system-content/upload-image" >
                                    <Link to={'/system-content/upload-image'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Upload Ảnh</span>
                                    </Link>
                                </Menu.Item>
                            }
                        </SubMenu>
                    }
                    {lstPermission.indexOf("SYS") > -1 &&
                        <SubMenu key="subMenuSystem" title={<span><i style={{ width: '16px', height: '16px' }} className="fas fa-cogs"></i>&nbsp;&nbsp;<span>Quản lý hệ thống</span></span>}>
                            {lstPermission.indexOf("USER-MANAGER") > -1 &&
                                <Menu.Item key="#/system-control/list-user" >
                                    <Link to={'/system-control/list-user'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Quản lý người dùng</span>
                                    </Link>
                                </Menu.Item>
                            }
                            {lstPermission.indexOf("PER-GROUP") > -1 &&
                                <Menu.Item key="#/system-control/grant-permission" >
                                    <Link to={'/system-control/grant-permission'} className="nav-link" >
                                        <Icon type="flag" />
                                        <span>Quản lý phân quyền</span>
                                    </Link>
                                </Menu.Item>
                            }
                        </SubMenu>
                    }
                </Menu>
            </Sider>
        )
    }


}

export default Sidebar