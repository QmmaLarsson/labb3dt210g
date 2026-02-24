import { useState, useEffect } from "react"
import type BlogPostInterface from "../interfaces/BlogPostInterface";
import AdminBlogPost from "../components/AdminBlogPost";
import AddBlogPost from "../components/AddBlogPost";

const AdminPage = () => {
  //State för att lagra alla blogginlägg
  const [blogPosts, setBlogPosts] = useState<BlogPostInterface[]>([]);
  // State för att hantera felmeddelanden
  const [error, setError] = useState<string | null>(null);
  // State för att visa laddningsstatus
  const [loading, setLoading] = useState<boolean>(false);

  //Körs när komponenten laddas
  useEffect(() => {
    fetchBlogPosts();
  }, [])

  //Hämtar blogginlägg från API
  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("https://apidt210g.onrender.com/api/blog");

      if (res.ok) {
        const data = await res.json();
        setBlogPosts(data);
      }
    } catch (error) {
      setError("Ett fel har uppstått, försök igen senare...")
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Admin</h1>
      {error && <p className="error">{error}</p>}

      <AddBlogPost updatedBlogPost={fetchBlogPosts} />

      <section>
        <h2>Redigera och ta bort blogginlägg</h2>
        {loading && <p style={{ textAlign: "center", fontStyle: "italic" }}>Data laddas in...</p>}
        {blogPosts.map((blogPost) =>
          <AdminBlogPost blogPost={blogPost} key={blogPost._id} updatedBlogPost={fetchBlogPosts} />
        )}
      </section>
    </>
  )
}

export default AdminPage
