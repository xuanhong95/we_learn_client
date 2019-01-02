import React, { Component } from 'react';
import { connect } from 'react-redux';
import GrammarComponent from '../../components/grammar/grammar_component.jsx';
import { notification, Input, Divider } from 'antd';
import { getListArticleByType } from '../../actions/viewArticle';

class Grammar extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <GrammarComponent {...this.props}
                />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        lstData: state.viewArticle.lstData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getListArticleByType: (param) => {
            dispatch(getListArticleByType(param))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Grammar);