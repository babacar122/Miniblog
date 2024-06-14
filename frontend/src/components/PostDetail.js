import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/posts/${id}`)
            .then(response => {
                setPost(response.data);
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
            });
    }, [id]);

    return (
        <div className="post-detail-container fade-in">
            {post ? (
                <div className="post-detail">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-body">{post.body}</p>
                    <p className="post-author">Posted by: {post.author.username}</p>
                    <p className="post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
