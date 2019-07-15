import React, { Component } from 'react';

export class Answer extends Component {
    render() {
        if (this.props.txt) {
            let id = "r+" + this.props.val;
            return (
                <div>
                    <input type="radio" id={id} name="rate" value={this.props.val} />
                    <label htmlFor={id} >{this.props.txt}</label>
                </div>
            );
        }
        return null;
    }
}