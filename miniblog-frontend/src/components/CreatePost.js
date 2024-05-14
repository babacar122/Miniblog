import React, { useState } from 'react';
import axios from 'axios';

function CreatePost() {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/posts', { content, authorId: 1 }); // Replace 1 with actual userId
    alert('Post created');
  };

  return (
    <div className="CreatePost">
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;