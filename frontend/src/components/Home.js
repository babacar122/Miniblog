import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import PostsList from './PostsList';
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
            .then(response => response.json())
            .then(data => setPosts(data))
            .catch(error => console.error('Error fetching posts:', error));
    }, []);

    const handleNewPost = (post) => {
        setPosts([post, ...posts]);
    };

    return (
        <div className="container fade-in">
            <h1>Home</h1>
            <PostForm onNewPost={handleNewPost} />
            <PostsList posts={posts} />
        </div>
    );
};

export default Home;
