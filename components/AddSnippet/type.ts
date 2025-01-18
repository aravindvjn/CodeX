import { Dispatch, SetStateAction } from "react";

export type CodeEditorType = {
    title: string;
    code: string;

}

export type CodeEditorProps = {
    setInput?: Dispatch<SetStateAction<CodeEditorType>>;
    input?: CodeEditorType
}