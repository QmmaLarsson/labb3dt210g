import { useState } from "react";

const AddBlogPost = ({ updatedBlogPost }: { updatedBlogPost: () => void }) => {
    //State för titel
    const [title, setTitle] = useState("");
    // State för beskrivning
    const [text, setText] = useState("");
    //State för att hantera felmeddelanden
    const [error, setError] = useState<string | null>(null);

    //Lägger till ett nytt blogginlägg till listan med hjälp av ett formulär
    const addBlogPost = async (e: any) => {
        e.preventDefault();
        setError(null);

        //Validering av titel
        if (title.trim().length < 3) {
            setError("Titel måste vara minst 3 tecken.");
            return;
        }

        //Validering av beskrivning
        if (text.length > 2000) {
            setError("Beskrivningen får vara max 2000 tecken.");
            return;
        }

        //Skapar ett nytt blogginlägg-objekt
        const newBlogPost = {
            title,
            text
        };

        try {
            //Skickar POST-anrop till API 
            const res = await fetch("https://apidt210g.onrender.com/api/blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBlogPost),
            });

            if (res.ok) {
                //Rensa formulär
                setTitle("");
                setText("");
                //Hämta uppdaterad lista
                updatedBlogPost();
            } else {
                setError("Ett fel har uppstått, försök igen senare...");
            }
        } catch {
            setError("Ett fel har uppstått, försök igen senare...");
        }
    };

    return (
        <form className="addForm" onSubmit={addBlogPost}>
            <h2>Lägg till ett nytt Blogginlägg</h2>
            <label htmlFor="title"><b>Titel:</b></label>
            <br />
            <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <br />
            <label htmlFor="text"><b>Text:</b></label>
            <br />
            <textarea name="text" id="text" value={text} onChange={(e) => setText(e.target.value)} />
            <br />
            <button className="addBtn" type="submit">Lägg till</button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default AddBlogPost;