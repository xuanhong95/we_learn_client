import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment'
import {
    notification, Row, Pagination,
    Button, Radio, Divider, Modal
} from 'antd';
import '../../scss/test.scss';
const RadioGroup = Radio.Group;

class ViewReadingComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lstQuestion: {
                results: [],
                total: 0,
            },
            lstUserAnswer: [],
            current: 1,
            lstQuestionDisplay: [],
            renderQuestion: false,
            modalResultVisible: false,
            disabledBtn: false,
        }
        this.renderLstQuestion = this.renderLstQuestion.bind(this)
        this.changePage = this.changePage.bind(this)
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
        this.setLstUserAnswerDefault = this.setLstUserAnswerDefault.bind(this)
        this.sendUserAnswer = this.sendUserAnswer.bind(this)
        this.showResultsModal = this.showResultsModal.bind(this)
        this.modalResultsCancel = this.modalResultsCancel.bind(this)
        this.getCorrentAnswer = this.getCorrentAnswer.bind(this)
    }

    getCorrentAnswer() {
        this.props.getCorrectAnswerById({ test_id: this.props.match.params.id })
        this.modalResultsCancel()
    }

    showResultsModal() {
        this.setState({
            modalResultVisible: true,
        });
    }


    modalResultsCancel(e) {
        this.setState({
            modalResultVisible: false,
        });
    }

    onChangeAnswer(ta_id, tq_id) {
        let lstUserAnswer = [...this.state.lstUserAnswer]
        lstUserAnswer.forEach(item => {
            if (item.tq_id == tq_id) {
                item.us_choice = ta_id
            }
        })
        this.setState({
            lstUserAnswer
        })
    }

    changePage(current) {
        this.setState({
            current
        })
        this.renderLstQuestion(current);
    }

    renderLstQuestion(currentPage) {
        let lstQuestionDisplay = []
        let current = (currentPage - 1) * 5
        for (var i = current; i < current + 5; i++) {
            if (this.state.lstQuestion.results[i] == undefined)
                break;
            lstQuestionDisplay.push(this.state.lstQuestion.results[i])
        }
        this.setState({
            lstQuestionDisplay
        })
    }

    setLstUserAnswerDefault() {
        let lstUserAnswer = [];
        if (this.state.lstQuestion.results != undefined) {
            let answerItem = {}
            this.state.lstQuestion.results.map(item => {
                answerItem.tq_id = item.tq_id
                answerItem.us_choice = null
                lstUserAnswer.push(answerItem)
                answerItem = {}
            })
        }
        this.setState({
            lstUserAnswer
        })
    }

    componentDidMount() {
        this.renderLstQuestion(this.state.current);
        let _that = this
        var countDownDate = new Date().getTime() + 45 * 60000;
        // Update the count down every 1 second
        this.x = setInterval(function () {
            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.round((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="demo"
            document.getElementById("demo").innerHTML =
                + minutes + ":" + seconds;
            // If the count down is over, write some text 
            if (distance < 0) {
                clearInterval(x);
                document.getElementById("demo").innerHTML = "Hết giờ"
                _that.sendUserAnswer();
            }
        }, 1000);

        if (this.props.match.params.id != undefined) {
            this.props.fetchTestById(this.props.match.params.id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countFetchById > this.props.countFetchById) {
            this.setState({
                lstQuestion: nextProps.testItem,
                renderQuestion: true,
            })
        }
        if (nextProps.countUpdate > this.props.countUpdate) {
            if (nextProps.actionName == "insert") {
                this.showResultsModal();
                this.setState({
                    disabledBtn: true
                })
                clearInterval(this.x);
                document.getElementById("demo").innerHTML = "Kết quả (" +
                    nextProps.correct_anwser + "/" + nextProps.total + "): "
                    + ((nextProps.correct_anwser / nextProps.total) * 10).toFixed(2)
            }
        }
        if (nextProps.countFetchCorrectAnswer > this.props.countFetchCorrectAnswer) {
            let lstQuestion = { ...this.state.lstQuestion }
            lstQuestion.results.map((item, key) => {
                item = Object.assign(item, nextProps.lstCorrectAnswer[key]);
            })
            this.setState({
                lstQuestion,
                renderQuestion: true,
                current: 1,
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.x)
    }

    sendUserAnswer() {
        let params = {
            user_answer: this.state.lstUserAnswer,
            test_id: this.props.match.params.id
        }
        this.props.insertTest(params)
    }

    render() {
        if (this.state.renderQuestion) {
            this.renderLstQuestion(this.state.current)
            this.setLstUserAnswerDefault(this.state.lstQuestion)
            this.setState({
                renderQuestion: false,
            })
        }
        const { current } = this.state;
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
            fontWeight: 400,
            marginLeft: 30,
        };
        return (
            <div>
                <Modal className="modal-subprovider"
                    visible={this.state.modalResultVisible}
                    title="Kết quả"
                    onCancel={this.modalResultsCancel}
                    destroyOnClose={true}
                    maskClosable={false}
                    footer={[
                        <Button key="show"
                            onClick={this.getCorrentAnswer}>
                            Xem kết quả</Button>,
                        <Button key="back" onClick={this.modalResultsCancel}>Trở về</Button>,
                    ]}
                >
                    <p>Số câu đúng: {this.props.correct_anwser}/{this.props.total}</p>
                    <p>Điểm: <span style={{ color: 'green' }}>{((this.props.correct_anwser / this.props.total) * 10).toFixed(2)}</span></p>
                </Modal>
                <h3 style={{ float: 'left' }}>Làm bài thi</h3>
                <h3 id="demo" style={{ float: 'right', color: 'green' }}>45:00</h3>
                <Divider />
                <Row>
                    <Row>
                        {
                            this.state.lstQuestionDisplay.map((item, key) =>
                                <div>
                                    <h5>Câu {(key + 1) + ((current - 1) * 5)} : {item.tq_content}
                                        <span style={{ color: '#f54261' }}>{item.correct_answer != undefined ? " (Đáp án: " + item.correct_answer + ")" : ""}</span>
                                    </h5>
                                    <RadioGroup onChange={(e) => this.onChangeAnswer(e.target.value, item.tq_id)}>
                                        {item.lst_anwser.map(itemAnswer =>
                                            <Radio style={radioStyle} value={itemAnswer.ta_id}>{itemAnswer.ta_content}</Radio>
                                        )}
                                    </RadioGroup>
                                    <ul>

                                    </ul>
                                </div>
                            )
                        }
                    </Row>
                    <Row style={{ textAlign: 'center' }}>
                        <Pagination
                            onChange={this.changePage}
                            defaultCurrent={this.state.current}
                            current={this.state.current}
                            pageSize={5}
                            total={this.state.lstQuestion.total} />
                        <Button
                            style={{ marginTop: '10px' }}
                            type="primary"
                            className="btn btn-success"
                            onClick={() => this.sendUserAnswer()}
                            disabled={this.state.disabledBtn}
                        >
                            Nộp bài
                        </Button>
                        {
                            this.state.disabledBtn &&
                            <span>
                                &nbsp;
                                <Button type="primary" className="btn btn-success"
                                    style={{ marginTop: '10px' }}
                                >
                                    <Link to={'/test/list-test'}
                                        className="nav-link" >Trở lại</Link>
                                </Button>
                            </span>
                        }
                    </Row>
                </Row>
            </div>

        )
    }
}

export default ViewReadingComponent;