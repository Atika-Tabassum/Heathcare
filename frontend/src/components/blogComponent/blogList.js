import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './bloglist.css';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3001/blog/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch blog posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="blog-list-container">
            <h1>Blog Posts</h1>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
            />
            {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <div key={post.post_id} className="blog-post">
                        <h2>{post.title}</h2>
                        <Link to={`/blog/${post.post_id}`}>Read more</Link>
                    </div>
                ))
            ) : (
                <p>No posts found</p>
            )}
        </div>
    );
};

export default BlogList;
