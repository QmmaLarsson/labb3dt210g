import type BlogPostInterface from "../interfaces/BlogPostInterface";
import "./BlogPost.css";
import { Link } from "react-router-dom";

const BlogPost = ({ blogPost }: { blogPost: BlogPostInterface }) => {
    return (
        <article>
            <h3>{blogPost.title}</h3>
            <p>{blogPost.text}</p>
            <p><b>Postad: </b>{new Date(blogPost.createdAt).toLocaleDateString()}</p>
            <Link to={"/blog/" + blogPost._id}>
                <button>Läs mer</button>
            </Link>
        </article>
    );
};

export default BlogPost;