import type BlogPostInterface from "../interfaces/BlogPostInterface";
import "./BlogPost.css";
import { Link } from "react-router-dom";

const BlogPost = ({ blogPost }: { blogPost: BlogPostInterface }) => {
    return (
        <article>
            <h2>{blogPost.title}</h2>
            <p>{blogPost.text}</p>
            <p className="blog-date"><b>Postad: </b>{new Date(blogPost.createdAt).toLocaleDateString()}</p>
            <Link to={"/blog/" + blogPost._id}>
                <button className="blogpost-btn">Läs mer</button>
            </Link>
        </article>
    );
};

export default BlogPost;