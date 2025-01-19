"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ initialCode }: { initialCode: string }) {
  const [code, setCode] = useState<string>(initialCode);
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");

    const hiddenInput = document.getElementById("code") as HTMLInputElement;

    if (hiddenInput && value !== undefined) {
      hiddenInput.value = value;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      style={{ height: windowSize.height / 2 }}
      className="rounded overflow-hidden"
    >
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
      />
    </div>
  );
}
