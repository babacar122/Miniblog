import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PostForm.css';

axios.defaults.withCredentials = true;

const PostForm = ({ onNewPost }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        document.querySelector('.form-container').classList.add('fade-in');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { title, body };

        axios.post('http://localhost:4000/posts/new', post, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                onNewPost(response.data);
                setTitle('');
                setBody('');
            })
            .catch(error => {
                console.error('Error creating post:', error);
                if (error.response) {
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                    console.error('Error headers:', error.response.headers);
                } else if (error.request) {
                    console.error('No response received:', error.request);
                } else {
                    console.error('Error message:', error.message);
                }
            });
    };

    return (
        <div className="form-container">
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                    />
                </div>
                <div>
                    <label>Body</label>
                    <textarea 
                        value={body} 
                        onChange={(e) => setBody(e.target.value)} 
                        required 
                    ></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default PostForm;

