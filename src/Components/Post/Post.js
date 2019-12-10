import React from 'react';
import './Post.css'

const Post = props => {
    return (
        <div className="Post">
            <p className="author">Author: <span>{props.author}</span></p>
            <p className="author-post">{props.message}</p>
        </div>
    );
};

export default Post;