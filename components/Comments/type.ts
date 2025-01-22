import { Dispatch, SetStateAction } from "react";

export type CommentTypes = {
    comment_id: string | number;
    snippet_id: string,
    user_id: string,
    text: string,
    timestamp: string,
    parent_comment_id: string | number | null;
    name: string;
    setReply?: SetReplyType;
    reply?: ReplyType;
    replies_count?: string
}
export type ReplyType = { name: string, comment_id: string | number } | undefined
export type SetReplyType = Dispatch<SetStateAction<ReplyType>>