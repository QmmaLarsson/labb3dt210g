import type BlogPostInterface from "../interfaces/BlogPostInterface";
import "./BlogPost.css";

const BlogPost = ({ blogPost }: { blogPost: BlogPostInterface }) => {
    return (
        <article>
            <h3>{blogPost.title}</h3>
            <p>{blogPost.text}</p>
            <p><b>Postad: </b>{new Date(blogPost.createdAt).toLocaleDateString()}</p>
        </article>
    );
};

export default BlogPost;