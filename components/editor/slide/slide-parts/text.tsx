import React, { useEffect, useState } from "react";
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TextProps {
  content: string;
  onBlur: (content: string) => void;
  fontSize: number;
  fontStyle: string;
  fontWeight: string | number;
  alignment: "left" | "center" | "right";
  placeholder: string;
}

const Text: React.FC<TextProps> = ({
  content,
  onBlur,
  fontSize,
  fontStyle,
  fontWeight,
  alignment,
  placeholder,
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content || `<p>${placeholder}</p>`,
    onUpdate: ({ editor }) => {
      onBlur(editor.getHTML());
    },
    editorProps: {
      attributes: {
        style: `
          font-size: ${fontSize}px;
          font-style: ${fontStyle};
          font-weight: ${fontWeight};
          text-align: ${alignment};
          width: 100%;
          margin-bottom: 8px;
          background-color: transparent;
          border: none;
          color: inherit;
          outline: none;
          word-break: break-word;
          white-space: normal;
          resize: none;
        `,
      },
    },
  });

  const applyStyle = (style: string) => {
    if (!editor) return;

    if (style === "bold") {
      editor.chain().focus().toggleBold().run();
    } else if (style === "italic") {
      editor.chain().focus().toggleItalic().run();
    } else if (style === "strikeThrough") {
      editor.chain().focus().toggleStrike().run();
    } else if (style === "underline") {
      // Requires underline extension (not included in StarterKit)
      // editor.chain().focus().toggleUnderline().run();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <EditorContent editor={editor} />
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <button onClick={() => applyStyle("bold")} style={buttonStyle}>
            <b>B</b>
          </button>
          <button onClick={() => applyStyle("italic")} style={buttonStyle}>
            <i>I</i>
          </button>
          <button
            onClick={() => applyStyle("strikeThrough")}
            style={buttonStyle}
          >
            <s>S</s>
          </button>
          <button onClick={() => applyStyle("underline")} style={buttonStyle}>
            <u>U</u>
          </button>
        </BubbleMenu>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: "white",
  border: "1px solid #ccc",
  borderRadius: "3px",
  padding: "2px 5px",
  cursor: "pointer",
};

export default Text;
