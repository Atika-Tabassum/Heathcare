import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../general/Header';
import './blogPost.css'; // Import the CSS file

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const userId = JSON.parse(localStorage.getItem('userId'));
    console.log(userId);

    useEffect(() => {
        fetch(`http://localhost:3001/blog/posts/${id}`)
            .then(response => response.json())
            .then(data => setPost(data));
    }, [id]);

    if (!post) {
        return <div className="loading">Loading...</div>;
    }

    return (
<div>
    <Header/>
        <div className="blog-post">

            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p className="category">Category: {post.category_id}</p>
            <p className="author">Author: {post.author_id === userId ? 'You' : `Author ID: ${post.author_id}`}</p>
        </div>
        </div>
    );
};

export default BlogPost;
