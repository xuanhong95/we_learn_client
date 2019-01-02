import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Pagination } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import cookie from 'react-cookies'
class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            paginateNews: {
                current: 1,
                pageSize: 5,
            },
            paginateGrammar: {
                current: 1,
                pageSize: 5,
            }
        }
        this.handleNewestChange = this.handleNewestChange.bind(this)
        this.handleNewestGrammarChange = this.handleNewestGrammarChange.bind(this)
    }

    handleNewestChange(pagination) {
        let paginateNews = { ...this.state.paginateNews }
        paginateNews.current = pagination
        this.setState({
            paginateNews
        })
        this.props.listNewestPagination(paginateNews)
    }

    handleNewestGrammarChange(pagination) {
        let paginateGrammar = { ...this.state.paginateGrammar }
        paginateGrammar.current = pagination
        this.setState({
            paginateGrammar
        })
        this.props.listGrammarPagination(paginateGrammar)
    }

    componentDidMount() {
        this.props.listNewestPagination(this.state.paginateNews)
        // this.props.listGrammarPagination(this.state.paginateGrammar)
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        //set css for form item
        //note using col for divide col. 
        //default 24.

        const regex = /(<([^>]+)>)/ig;
        
        return (
            <span>
                <div className="ant-row">
                    <Row>
                        <h4>Ngữ pháp mới</h4>
                    </Row>
                    {this.props.listNewest.results != undefined && this.props.listNewest.results.map(item => {
                        return (
                            <a href={"#/article/view-article/" + item.atc_id} className="box-article col-md-12 col-sm-12 col-xs-12 col-lg-12 nopadding">
                                <div className="article-image col-md-3 col-sm-3 col-xs-3 col-lg-3 pdl0">
                                    <img src={item.img_url} />
                                </div>
                                <div className="article-content col-md-9 col-sm-9 col-xs-9 col-lg-9 nopadding">
                                    <h3>{item.atc_title}</h3>
                                    <p>{item.atc_content.replace(regex, '')}</p>
                                </div>
                            </a>
                        )
                    })
                    }
                    <Row style={{ float: 'right', marginTop: "5px" }}>
                        <Pagination
                            current={this.state.paginateNews.current}
                            onChange={this.handleNewestChange}
                            total={this.props.listNewest.total}
                            pageSize={this.state.paginateNews.pageSize} />
                    </Row>
                </div>
                {/* <div className="ant-row">
                    <Row>
                        <h4>Ngữ pháp mới</h4>
                    </Row>
                    {this.props.listNewestGrammar.results != undefined && this.props.listNewestGrammar.results.map(item => {
                        return (
                            <a href={"#/article/view-article/" + item.article_id} className="box-article col-md-12 col-sm-12 col-xs-12 col-lg-12 nopadding">
                                <div className="article-image col-md-3 col-sm-3 col-xs-3 col-lg-3 pdl0">
                                    <img src={item.img_url} />
                                </div>
                                <div className="article-content col-md-9 col-sm-9 col-xs-9 col-lg-9 nopadding">
                                    <h4>{item.article_title}</h4>
                                    <p>{item.article_content.replace(regex, '')}</p>
                                </div>
                            </a>
                        )
                    })
                    }
                    <Row style={{ float: 'right', marginTop: "5px" }}>
                        <Pagination defaultCurrent={1}
                            onChange={this.handleNewestGrammarChange}
                            total={this.props.listNewestGrammar.total}
                            pageSize={this.state.paginateGrammar.pageSize} />
                    </Row>
                </div> */}
            </span>
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm