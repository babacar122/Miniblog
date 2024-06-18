import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/posts/${id}`)
            .then(response => {
                setPost(response.data);
                document.querySelector('.post-detail-container').classList.add('fade-in');
            })
            .catch(error => {
                if (axios.isCancel(error)) {
                  console.log('Request canceled:', error.message);
                } else {
                  console.error('Error fetching post details:', error);
                  if (error.response) {
                    console.error('Error status:', error.response.status);
                    console.error('Error data:', error.response.data);
                    console.error('Error headers:', error.response.headers);
                  } else if (error.request) {
                    console.error('No response received:', error.request);
                  } else {
                    console.error('Error message:', error.message);
                  }
                  setError(error);
                }
              });
    }, [id]);

    /*useEffect(() => {
      axios.get(`http://localhost:4000/users/${post.user_id}`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.error('Error fetching post details:', error);
          if (error.response) {
            console.error('Error status:', error.response.status);
            console.error('Error data:', error.response.data);
            console.error('Error headers:', error.response.headers);
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
          setError(error);
        }
      });
    })
      */

    return (
        <div className="post-detail-container">
            {post ? (
                <div className="post-detail">
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-body">{post.content}</p>
                    <p className="post-author">Posted by: {post.author}</p>
                    <p className="post-date">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostDetail;
