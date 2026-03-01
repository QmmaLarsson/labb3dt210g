import { useState } from "react";
import type BlogPostInterface from "../interfaces/BlogPostInterface";
import "./BlogPost.css";
import "./AdminBlogPost.css";

const AdminBlogPost = ({ blogPost, updatedBlogPost }: { blogPost: BlogPostInterface, updatedBlogPost: Function }) => {
    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);
    //State för att hantera inputfält
    const [title, setTitle] = useState(blogPost.title);
    //State för text
    const [text, setText] = useState(blogPost.text);
    //State för att spara
    const [saving, setSaving] = useState(false);

    //Spara ändringar
    const saveBlogPost = async () => {
        //Validera inputfälten
        if (title.trim().length < 3) {
            setError("Titeln måste vara minst 3 tecken.");
            return;
        }

        if (text.trim().length < 3) {
            setError("Beskrivningen måste vara minst 3 tecken.");
            return;
        }

        if (text.length > 2000) {
            setError("Beskrivningen får vara max 2000 tecken.");
            return;
        }

        try {
            setError(null);
            setSaving(true);

            const updatedPost = {
                ...blogPost,
                title,
                text
            };

            //Skickar PUT-request till API
            const res = await fetch("https://apidt210g.onrender.com/api/blog/" + blogPost._id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(updatedPost)
            });

            //Om uppdateringen lyckas hämtas alla blogginlägg igen
            if (res.ok) {
                updatedBlogPost();
            } else {
                setError("Ett fel har uppstått, försök igen senare...");
            }
        } catch {
            setError("Ett fel har uppstått, försök igen senare...");
        } finally {
            setSaving(false);
        }
    };

    //Tar bort ett blogginlägg när användaren klickar på "Ta bort"
    const deleteBlogPost = async () => {
        //Alert-ruta som frågar om man vill fortsätta
        const confirmed = window.confirm("Är du säker på att du vill ta bort detta blogginlägg?");
        if (!confirmed) return;

        try {
            setError(null);

            //Skickar DELETE-request till API
            const res = await fetch(`https://apidt210g.onrender.com/api/blog/${blogPost._id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            //Om delete lyckas hämtas alla blogginlägg igen
            if (res.ok) {
                updatedBlogPost();
            } else {
                setError("Ett fel har uppstått, försök igen senare...");
            }
        } catch {
            setError("Ett fel har uppstått, försök igen senare...");
        }
    };

    return (
        <article>
            <form className="updateForm">
                <label><b>Titel:</b></label>
                <br />
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <label><b>Text:</b></label>
                <br />
                <textarea value={text} onChange={(e) => setText(e.target.value)} />
                <br />
                <button type="button" className="blogpost-btn" onClick={saveBlogPost} disabled={saving}>
                    Spara
                </button>
                <button type="button" className="delete-btn" onClick={deleteBlogPost} style={{ marginLeft: "10px" }}>
                    Ta bort
                </button>
            </form>
            <p className="blog-date"><b>Postad: </b>{new Date(blogPost.createdAt).toLocaleDateString()}</p>
            {error && <p className="error">{error}</p>}
        </article>
    );
};

export default AdminBlogPost;