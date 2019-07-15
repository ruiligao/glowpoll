import React, { Component } from 'react';
import { Answer } from './Answer';

export class QnA extends Component {
    render() {
        return (
            <div>
                <h2>{this.props.topic.question}</h2>
                <Answer val='a' txt={this.props.topic.a} />
                <Answer val='b' txt={this.props.topic.b} />
                <Answer val='c' txt={this.props.topic.c} />
            </div>
        );
    }
}