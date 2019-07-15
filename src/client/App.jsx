import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './app.css';
import TopicDetails from './components/TopicDetails';
import QuestionList from './components/QuestionList';

function Index() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default class App extends Component {
  state = {
    username: null,
    mapData: null,
    topic: {}
  };

  getTopicDetails({ match }) {
    return (
      <div>
        <h3>ID: {match.params.id}</h3>
      </div>
    );
  }

  componentWillMount() {
    fetch('/api/login', {
      method: 'post',
      body: JSON.stringify({ email: 'yxz@hotmail.com', password: "xyz" })
    })
      .then(res => res.json())
      .then(data => {
        console.log("login");
        console.log(data);
      });
  }

  render() {
    return (
      <Router>
        <div>
          <h2>Accounts</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
            <li>
              <Link to="/users/">Users</Link>
            </li>
            <li>
              <Link to="/topic/1">First map</Link>
            </li>
          </ul>
          <QuestionList />
          <Route path="/" exact component={Index} />
          <Route path="/about/" component={About} />
          <Route path="/users/" component={Users} />
          <Route path="/topic/:id" component={TopicDetails} />
        </div>
      </Router>
    );
  }
}
