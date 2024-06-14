import React, { useState } from 'react';
import axios from 'axios';
import './PostForm.css';

const PostForm = ({ onNewPost }) => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = { title, body };

        axios.post('http://localhost:4000/posts/', post)
            .then(response => {
                onNewPost(response.data);
                setTitle('');
                setBody('');
            })
            .catch(error => {
                console.error('Error creating post:', error);
            });
    };

    return (
        <div>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div>
                    <label>Body</label>
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                </div>
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default PostForm;
