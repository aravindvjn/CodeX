import { query } from "@/lib/db"

export const getSnippetsByUserId = async (user_id: string) => {
    try {
        const results = await query(`SELECT * FROM snippets WHERE author_id = $1`, [user_id])
        if (results.rows.length > 0) {
            return results.rows
        }
        return []
    } catch (error) {
        console.error("Error in getSnippetsByUserId")
        return []
    }

}