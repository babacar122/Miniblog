import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PostLists.css';

const PostsList = ({ posts }) => {
    useEffect(() => {
        document.querySelector('.posts-list').classList.add('fade-in');
    }, []);

    return (
        <div className="posts-list">
            <h2>Posts</h2>
            {posts.map(post => (
                <div key={post.post_id} className="post-card">
                    <h3 className="post-title">
                        <Link to={`/posts/${post.post_id}`}>{post.title}</Link>
                    </h3>
                    <p className="post-author">Posted by: {post.author_username}</p>
                    <p className="post-date">{new Date(post.created_at).toLocaleDateString()}</p>
                </div>
            ))}
        </div>
    );
};

export default PostsList;
