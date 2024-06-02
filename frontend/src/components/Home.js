import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostForm from './PostForm';
import PostsList from './PostsList';
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);

    const fetchPosts = () => {
        axios.get('/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    };

    useEffect(() => {
        fetchPosts();
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