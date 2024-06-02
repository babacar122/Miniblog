import React from 'react';
import { Link } from 'react-router-dom';
import './PostsList.css';

const PostsList = ({ posts }) => {
    return (
        <div className="posts-list">
            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post._id} className="post-card">
                    <h3 className="post-title">
                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                    </h3>
                    <p className="post-author">Posted by: {post.author.username}</p>
                    <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default PostsList;
