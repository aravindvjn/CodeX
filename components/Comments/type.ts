export type CommentTypes = {
    comment_id: string | number;
    snippet_id: string,
    user_id: string,
    text: string,
    timestamp: string,
    parent_comment_id: string | number | null;
    name: string
}