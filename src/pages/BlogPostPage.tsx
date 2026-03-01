import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type BlogPostInterface from "../interfaces/BlogPostInterface";
import "./BlogPostPage.css";

const BlogPostPage = () => {
    const { id } = useParams<{ id: string }>();

    //State för det enskilda blogginlägget
    const [post, setPost] = useState<BlogPostInterface | null>(null);
    //State för felmeddelanden
    const [error, setError] = useState<string | null>(null);
    //State för laddningsstatus
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        //Hämtar enskilt blogginlägg
        const fetchPost = async () => {
            try {
                setLoading(true);
                setError(null);

                //GET-anrop till externt API
                const res = await fetch(`https://apidt210g.onrender.com/api/blog/${id}`);

                if (!res.ok) {
                    throw new Error("Kunde inte hämta posten");
                }

                const data = await res.json();
                setPost(data);
            } catch (err) {
                setError("Ett fel har uppstått, försök igen senare...");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchPost();
    }, [id]);

    //Visa felmeddelande om något gick fel
    if (error) return <p className="error">{error}</p>;
    //Visa laddningsmeddelande
    if (loading) return <p>Laddar...</p>;
    //Om inget inlägg hittas
    if (!post) return <p>Inlägget kunde inte hittas.</p>;

    return (
        <div>
            <h1>{post.title}</h1>
            <div className="blogpost-page">
                <p>{post.text}</p>
                <p className="blog-date"><b>Postad: </b>{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default BlogPostPage;