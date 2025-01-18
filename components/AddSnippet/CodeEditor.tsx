"use client";
import { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";

export default function CodeEditor() {
  const [code, setCode] = useState<string>("");
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  //Handle Change in code
  const handleEditorChange = (value: any) => {
    setCode(value || "");

    const hiddenInput = document.getElementById("code") as HTMLInputElement;

    if (hiddenInput) {
      hiddenInput.value = value;
    }
  };

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

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
