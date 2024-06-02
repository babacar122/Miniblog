async function fetchAndDisplayPosts() {
    try {
        const response = await fetch('/posts');
        const posts = await response.json();
        
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = '';

        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <small>Author: ${post.author.username}</small>
                <button onclick="deletePost('${post._id}')">Delete</button>
                <button onclick="showUpdateForm('${post._id}', '${post.title}', '${post.body}')">Update</button>
            `;
            postsContainer.appendChild(postElement);
        });
    } catch (err) {
        console.error('Error fetching posts:', err);
    }
}

async function createPost(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try {
        const response = await fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });

        if (response.ok) {
            alert('Post created successfully.');
            fetchAndDisplayPosts();
        } else {
            const result = await response.json();
            alert('Post creation failed: ' + result.error);
        }
    } catch (err) {
        console.error('Error creating post:', err);
    }
}

async function deletePost(postId) {
    try {
        const response = await fetch(`/posts/${postId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Post deleted successfully.');
            fetchAndDisplayPosts();
        } else {
            const result = await response.json();
            alert('Post deletion failed: ' + result.error);
        }
    } catch (err) {
        console.error('Error deleting post:', err);
    }
}

function showUpdateForm(postId, title, body) {
    document.getElementById('updateForm').style.display = 'block';
    document.getElementById('updateTitle').value = title;
    document.getElementById('updateBody').value = body;
    document.getElementById('updatePostId').value = postId;
}

async function updatePost(event) {
    event.preventDefault();

    const postId = document.getElementById('updatePostId').value;
    const title = document.getElementById('updateTitle').value;
    const body = document.getElementById('updateBody').value;

    try {
        const response = await fetch(`/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, body })
        });

        if (response.ok) {
            alert('Post updated successfully.');
            fetchAndDisplayPosts();
            document.getElementById('updateForm').reset();
            document.getElementById('updateForm').style.display = 'none';
        } else {
            const result = await response.json();
            alert('Post update failed: ' + result.error);
        }
    } catch (err) {
        console.error('Error updating post:', err);
    }
}

document.getElementById('postForm').addEventListener('submit', createPost);
document.getElementById('updateForm').addEventListener('submit', updatePost);

fetchAndDisplayPosts();
