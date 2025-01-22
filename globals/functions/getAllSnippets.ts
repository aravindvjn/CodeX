import { query } from "@/lib/db";
import { getUserId } from "@/lib/session";
type GetSnippetsType = {
    slug?: string;
    search?: string;
}
export const getAllSnippets = async ({ slug, search }: GetSnippetsType) => {
    try {
        // Construct the query base
        let sqlQuery = `
        SELECT 
            snippets.id AS snippet_id,
            snippets.code,
            snippets.title,
            snippets.language,
            snippets.updated_at,
            snippets.created_at,
            users.id AS user_id,
            users.name,
            users.email,
            users.username 
        FROM snippets
        JOIN users ON snippets.author_id = users.id
    `;

        const queryParams: string[] = [];
        let conditionClauses: string[] = [];

        if (slug) {
            conditionClauses.push(`snippets.language = $${queryParams.length + 1}`);
            queryParams.push(slug);
        }

        if (search) {
            conditionClauses.push(`(snippets.title ILIKE $${queryParams.length + 1} OR snippets.code ILIKE $${queryParams.length + 1})`);
            queryParams.push(`%${search}%`);
        }

        if (conditionClauses.length > 0) {
            sqlQuery += ` WHERE ${conditionClauses.join(' AND ')}`;
        }


        const results = await query(sqlQuery, queryParams);

        return results.rows.length > 0 ? results.rows : [];
    } catch (error) {
        console.error("Error fetching snippets:", error);
        return [];
    }
};
