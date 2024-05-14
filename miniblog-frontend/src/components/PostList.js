import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    await axios.post('/api/posts/like', { postId, userId: 1 }); // Replace 1 with actual userId
    alert('Post liked');
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    const content = e.target[0].value;
    await axios.post('/api/posts/comment', { postId, userId: 1, content }); // Replace 1 with actual userId
    alert('Comment added');
  };

  return (
    <div className="PostList">
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <p>{post.content}</p>
          <button onClick={() => handleLike(post.id)}>Like</button>
          <form onSubmit={(e) => handleComment(e, post.id)}>
            <input type="text" placeholder="Add a comment" />
            <button type="submit">Comment</button>
          </form>
          <div className="comments">
            {post.comments.map((comment, index) => (
              <p key={index}>{comment.content}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;