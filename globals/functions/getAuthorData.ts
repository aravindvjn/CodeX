import { query } from "@/lib/db"

export const getAuthorData = async (author_id: string) => {
    try {
        const results = await query(`SELECT id,name,email,bio,created_at FROM users WHERE id = $1`, [author_id])
        if (results.rows.length > 0) {
            return results.rows[0]
        }
        return null
    } catch (error) {
        console.error(error)
        return null
    }
}