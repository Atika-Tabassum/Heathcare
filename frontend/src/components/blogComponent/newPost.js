import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Category: {post.category_id}</p>
            <p>Author: {post.author_id === userId ? 'You' : `Author ID: ${post.author_id}`}</p>
        </div>
    );
};

export default BlogPost;
