import { query } from "@/lib/db";

export const getAllSnippets = async () => {
    try {
        const sqlQuery = `
            SELECT 
                snippets.id AS snippet_id,
                snippets.code,
                snippets.title,
                snippets.created_at AS created_at,
                users.id AS user_id,
                users.name,
                users.email 
            FROM snippets
            JOIN users ON snippets.author_id = users.id;
        `;
        
        const results = await query(sqlQuery);

        if (results.rows.length > 0) {
            const snippets = results.rows;
            return snippets;
        }

        return [];
    } catch (error) {
        console.error("Error fetching snippets:", error);
        return [];
    }
}
