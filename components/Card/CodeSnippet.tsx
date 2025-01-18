import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";

export const CodeSnippet = ({ code }: { code: string }) => (
  <SyntaxHighlighter
    customStyle={{
      borderRadius: 6,
      padding: 10,
      overflowWrap: "break-word",    
      whiteSpace: "pre-wrap",       
      wordWrap: "break-word", 
      backgroundColor:'transparent'
    }}
    wrapLines={true}               
    showInlineLineNumbers={true}    
    language="javascript"
    style={vs2015}                
  >
    {code}
  </SyntaxHighlighter>
);
