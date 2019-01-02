import React, { Component } from 'react';
import { Button, Modal, Form, Input, Radio, Col, Select, Row, Divider, notification, DatePicker, Upload } from 'antd';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { Link } from 'react-router-dom'
import moment from 'moment'
import { scrollToErrorForm } from '../../actions/reuse_action/reuse';
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
import cookie from 'react-cookies'


class FormTemplate extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        this.props.getListArticleByType({ type_id: 2 });
    }

    render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        //set css for form item
        //note using col for divide col. 
        //default 24.
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        return (
            <Form layout="horizontal" className="frm_properties" onSubmit={this.handleSubmit} >
                {
                    this.props.lstData.map(articleItem =>
                        <Row style={{ borderBottom: '1px solid #3cb878' }}>
                            <div className="type-sentence-title">
                                {articleItem.article_title}
                            </div>
                            {
                                articleItem.listTopic.map((at, at_key) => {
                                    if (at_key == 2 || ((at_key % 3) == 2) && at_key != 1)
                                        return (
                                            <div>
                                                <div className="col-md-4 col-sm-6 col-xs-12">
                                                    <div className="type-sentence-name">{at.at_title}</div>
                                                    <div className="type-sentence-list">
                                                        <ul>
                                                            {
                                                                at.listContent.map(atc =>
                                                                    <li>
                                                                        <a href={"#/article/view-article/" + atc.atc_id}>
                                                                            <span>{atc.atc_title}</span>
                                                                        </a>
                                                                    </li>
                                                                )
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="row type-sentence-content"></div>
                                            </div>
                                        )
                                    else
                                        return (
                                            <div className="col-md-4 col-sm-6 col-xs-12">
                                                <div className="type-sentence-name">{at.at_title}</div>
                                                <div className="type-sentence-list">
                                                    <ul>
                                                        {
                                                            at.listContent.map(atc =>
                                                                <li>
                                                                    <a href={"#/article/view-article/" + atc.atc_id}>
                                                                        <span>{atc.atc_title}</span>
                                                                    </a>
                                                                </li>
                                                            )
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        )
                                }
                                )
                            }
                        </Row>
                    )
                }
            </Form >
        )
    }
}

const CollectionCreateForm = Form.create()(FormTemplate)
export default CollectionCreateForm