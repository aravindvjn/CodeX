import { authOptions } from "@/lib/authOptions";
import { query } from "@/lib/db";
import { getServerSession } from "next-auth";

export const getSnippetById = async (id: string) => {
    try {
        const session = await getServerSession(authOptions)
        const user_id = session?.user?.id
        const results = await query('SELECT snippets.id AS snippet_id, snippets.title, snippets.code,snippets.language,snippets.updated_at, snippets.created_at, users.id AS user_id, users.name AS name, users.email AS email,users.username AS username FROM snippets JOIN users ON snippets.author_id = users.id WHERE snippets.id = $1;', [id]);
        if (results.rows.length > 0) {
            const snippet = results.rows[0];
            return {
                ...snippet,
                you: user_id === snippet.user_id
            };
        }
        return null;
    } catch (error) {
        console.log(error);
        return null
    }
}