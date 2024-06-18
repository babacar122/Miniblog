import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import PostsList from './components/PostsList'
import BlockedAccounts from './components/BlockedAccounts';
import Header from './components/Header';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <Header />
                <div className="container">
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/posts/" element={<PostsList />} />
                        <Route path="/edit/:id" element={<PostForm />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile/" element={<Profile />} />
                        <Route path="/blocked/" element={<BlockedAccounts />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
