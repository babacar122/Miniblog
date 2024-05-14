import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import Signup from './components/Signup';
import Login from './components/Login';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import './index.css';

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/login" component={Login} />
      <Route path="/posts" component={PostList} />
      <Route path="/create-post" component={CreatePost} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
