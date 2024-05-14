import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to MiniBlog</h1>
        <nav>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/create-post">Create Post</Link>
        </nav>
      </header>
    </div>
  );
}

export default App;