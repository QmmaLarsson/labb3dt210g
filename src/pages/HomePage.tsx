import { useState, useEffect } from "react"
import type BlogPostInterface from "../interfaces/BlogPostInterface";
import BlogPost from "../components/BlogPost";

const HomePage = () => {

    //State för att lagra alla bloginlägg
    const [posts, setPosts] = useState<BlogPostInterface[]>([]);
    // State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);
    // State för att visa laddningsstatus
    const [loading, setLoading] = useState<boolean>(false);

    //Körs när komponenten laddas
    useEffect(() => {
        fetchPosts();
    }, [])

    //Hämtar blogginlägg från API
    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const res = await fetch("https://apidt210g.onrender.com/api/blog");

            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            setError("Ett fel har uppstått, försök igen senare...")
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h1>Blogginlägg</h1>
            {error && <p className="error">{error}</p>}

            <section>
                {loading && <p style={{ textAlign: "center", fontStyle: "italic" }}>Data laddas in...</p>}
                {posts.map((post) => (
                    <BlogPost blogPost={post} key={post._id} />
                ))}
            </section>
        </>
    )
}

export default HomePage