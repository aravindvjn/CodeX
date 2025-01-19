import { Dispatch, SetStateAction } from "react";

export type CodeEditorType = {
    title: string;
    code: string;

}

export type CodeEditorProps = {
    setInput?: Dispatch<SetStateAction<CodeEditorType>>;
    input?: CodeEditorType
}

export type PageType = "Create Snippet" | "Edit Snippet";

export type prevActionStateType = {
    page: PageType;
    message: string;
    snippet_id: string | undefined;
}