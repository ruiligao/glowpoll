import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class QuestionList extends Component {
    state = {
        list: []
    };

    componentWillMount() {
        fetch('/api/getQuestions/0')
            .then(res => res.json())
            .then(questions => {
                this.setState({ list: questions });
            });
    }

    render() {
        return (
            <ul>
                {this.state.list.map(value =>
                    <li key={value.id}>
                        <Link to={"/topic/" + value.id}>{value.question}</Link>
                    </li>
                )}
            </ul>
        );
    }
}