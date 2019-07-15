import React, { Component } from 'react';
import { MapFactory } from '../map/MapFactory';
import { QnA } from './QnA';
// import ReactImage from './react.png';

export default class TopicDetails extends Component {
    state = {
        username: null,
        mapData: null,
        topic: {}
    };

    componentWillMount() {
        var id = this.props.match.params.id;
        console.log("TopicDetails " + id);
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));

        fetch(`/api/getData/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (!data || !data.topic || !data.map || data.map.length <= 0) return;
                this.setState({ topic: data.topic });
                const mapFactory = new MapFactory();
                let map = mapFactory.makeMap('map', data);
            });
    }

    render() {
        const mapStyle = {
            position: 'relative',
            width: '1000px',
            height: '600px'
        };
        return (
            <div>
                {this.state.username ? <h1>{`Hello ${this.state.username}`}</h1> : <h1>Loading.. please wait!</h1>}
                <QnA topic={this.state.topic} />
                <div id="map" style={mapStyle} ></div>
            </div>
        );
    }
}
