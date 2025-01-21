import { query } from "@/lib/db";

export const getComments = async (snippet_id: string) => {
    try {
        const results = await query(`SELECT
    c.comment_id,
    c.text AS text,
    c.timestamp AS timestamp,
    u.name,
    u.id AS user_id,
    c.parent_comment_id
FROM
    comments c
JOIN
    users u ON c.user_id = u.id
WHERE
    c.snippet_id = $1
ORDER BY
    c.timestamp DESC;
`, [snippet_id])
        return results.rows
    } catch (error) {
        console.log(error);
        return []
    }
}