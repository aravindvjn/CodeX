'use server'
import { query } from "@/lib/db";
import { getUserId } from "@/lib/session";
import { getAuthorData } from "../functions/getAuthorData";

export type AddCommentProps = {
    comment?: string;
    timestamp?: string;
    success?: boolean;
    message?: string;
}

export const addComment = async (prev: AddCommentProps | undefined, formData: FormData) => {
    const comment = formData.get('comment');
    const snippetId = formData.get('snippet_id');
    const userId = await getUserId();
    const parentCommentId: any = formData.get('parent_comment_id');
    const queryCode = `
      INSERT INTO comments (snippet_id, user_id, text, parent_comment_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    if (!comment) return;
    if (!snippetId || !userId) {
        return { success: false, message: 'Login and Please Continue' };
    }
    try {
        const result = await query(queryCode, [snippetId, userId, comment, parentCommentId]);
        const userData = await getAuthorData(userId)
        const commentRes = { ...result.rows[0], name: userData.name };
        return { success: true, comment: commentRes };
    } catch (error) {
        console.error('Error inserting comment:', error);
        return { success: false, message: 'Error adding comment' };
    }
};