import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import BlockedAccounts from './components/BlockedAccounts';
import Header from './components/Header';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <div className="container">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/posts/:id" component={PostDetail} />
                        <Route path="/edit/:id" component={PostForm} />
                        <Route path="/register" component={Register} />
                        <Route path="/login" component={Login} />
                        <Route path="/profile/:id" component={Profile} />
                        <Route path="/blocked/:id" component={BlockedAccounts} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
