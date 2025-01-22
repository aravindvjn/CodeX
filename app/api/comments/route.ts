import { query } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const url = new URL(req.url)
        const snippet_id = url.searchParams.get('snippet_id')
        const comment_id = url.searchParams.get('comment_id')
        const page = url.searchParams.get('page') || '1'
        const limit = 5;
        const offset = (parseInt(page) - 1) * limit;
        let queryCode = `     SELECT
                c.comment_id,
                c.text AS text,
                c.timestamp AS timestamp,
                u.name,
                u.id AS user_id,
                u.username AS username,
                c.parent_comment_id,
                (SELECT COUNT(*) FROM comments WHERE parent_comment_id = c.comment_id) AS replies_count
            FROM
                comments c
            JOIN
                users u ON c.user_id = u.id`

        let params = [snippet_id, offset, limit]

        if (snippet_id) {
            queryCode += ` WHERE
            c.snippet_id = $1 AND parent_comment_id is NULL
        ORDER BY c.timestamp DESC OFFSET $2 LIMIT $3;`
        } else {
            queryCode += ` WHERE parent_comment_id = $1
        ORDER BY c.timestamp DESC OFFSET $2 LIMIT $3;`
            params = [comment_id, offset, limit]
        }
        const results = await query(queryCode, params as string[])
        return NextResponse.json(results.rows || [], { status: 200 })
    } catch (error) {
        console.log('Error in sending comments', error)
    }
}