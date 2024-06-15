import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import './Header.css';

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/users/me', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    console.log("user not logged in");
                } else {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('http://localhost:4000/users/logout');
            setUser(null);
            Cookies.remove('userId');
            Cookies.remove('username');
            Cookies.remove('email');
            window.location.href = '/login';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">Blog ESP</Link>
            </div>
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/blocked">Blocked Accounts</Link>
            </nav>
            <div className="user-info">
                {user ? (
                    <>
                        <span>Welcome, {user.username}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/login">Login</Link>
                )}
            </div>
        </header>
    );
};

export default Header;
