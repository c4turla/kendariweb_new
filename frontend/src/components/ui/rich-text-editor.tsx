"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const { Quill } = require("react-quill-new");
      (window as any).Quill = Quill;
      const ImageResize = require("quill-image-resize-module-react").default;
      Quill.register("modules/imageResize", ImageResize);
      setIsMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const { Quill } = require("react-quill-new");
    const container = document.querySelector(".quill-dark-wrapper .ql-container");
    if (!container) return;

    const quill = Quill.find(container);
    if (!quill) return;

    const root = quill.root as HTMLElement;

    let draggedImageInfo: {
      index: number;
      src: string;
      style: string;
      width: string;
      height: string;
    } | null = null;

    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG") {
        const blot = Quill.find(target);
        if (blot) {
          const index = quill.getIndex(blot);
          draggedImageInfo = {
            index,
            src: target.getAttribute("src") || "",
            style: target.getAttribute("style") || "",
            width: target.getAttribute("width") || "",
            height: target.getAttribute("height") || ""
          };
          e.dataTransfer?.setData("text/plain", "[image]");
        }
      }
    };

    const handleDragOver = (e: DragEvent) => {
      if (draggedImageInfo) {
        e.preventDefault();
      }
    };

    const handleDrop = (e: DragEvent) => {
      if (!draggedImageInfo) return;
      e.preventDefault();

      let dropIndex = quill.getLength();
      
      if (document.caretRangeFromPoint) {
        const caretRange = document.caretRangeFromPoint(e.clientX, e.clientY);
        if (caretRange) {
          const container = caretRange.startContainer;
          const offset = caretRange.startOffset;
          const blot = Quill.find(container);
          if (blot) {
            dropIndex = quill.getIndex(blot) + offset;
          }
        }
      } else if ((e as any).rangeParent) {
        const rangeParent = (e as any).rangeParent;
        const rangeOffset = (e as any).rangeOffset;
        const blot = Quill.find(rangeParent);
        if (blot) {
          dropIndex = quill.getIndex(blot) + rangeOffset;
        }
      }

      // Remove original image
      quill.deleteText(draggedImageInfo.index, 1);

      // Calculate target index
      let targetIndex = dropIndex;
      if (targetIndex > draggedImageInfo.index) {
        targetIndex = Math.max(0, targetIndex - 1);
      }

      // Insert new image
      quill.insertEmbed(targetIndex, "image", draggedImageInfo.src);

      const info = draggedImageInfo;
      draggedImageInfo = null;

      setTimeout(() => {
        const [blot] = quill.getLeaf(targetIndex);
        if (blot && blot.domNode && blot.domNode.tagName === "IMG") {
          const img = blot.domNode as HTMLImageElement;
          if (info.style) img.setAttribute("style", info.style);
          if (info.width) img.setAttribute("width", info.width);
          if (info.height) img.setAttribute("height", info.height);
          
          onChange(quill.root.innerHTML);
        }
      }, 0);
    };

    root.addEventListener("dragstart", handleDragStart);
    root.addEventListener("dragover", handleDragOver);
    root.addEventListener("drop", handleDrop);

    return () => {
      root.removeEventListener("dragstart", handleDragStart);
      root.removeEventListener("dragover", handleDragOver);
      root.removeEventListener("drop", handleDrop);
    };
  }, [isMounted, onChange]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image", "code-block"],
      ["clean"],
    ],
    imageResize: {
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "align",
    "link",
    "image",
    "code-block",
  ];

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full bg-[#161619] border border-[#1f1f23] rounded-xl animate-pulse flex items-center justify-center text-zinc-600 text-xs">
        Loading Quill editor...
      </div>
    );
  }

  return (
    <div className="quill-dark-wrapper transition-all">
      <style jsx global>{`
        .quill-dark-wrapper .ql-toolbar.ql-snow {
          border: 1px solid #1f1f23 !important;
          background-color: #0f0f11 !important;
          border-top-left-radius: 0.75rem !important;
          border-top-right-radius: 0.75rem !important;
          padding: 8px 12px !important;
        }
        .quill-dark-wrapper .ql-container.ql-snow {
          border: 1px solid #1f1f23 !important;
          border-top: none !important;
          background-color: #161619 !important;
          color: #f4f4f5 !important;
          border-bottom-left-radius: 0.75rem !important;
          border-bottom-right-radius: 0.75rem !important;
          font-family: inherit !important;
          font-size: 0.875rem !important;
        }
        .quill-dark-wrapper .ql-editor {
          min-height: 500px !important;
          max-height: 800px !important;
          overflow-y: auto !important;
          line-height: 1.6 !important;
        }
        .quill-dark-wrapper .ql-snow .ql-stroke {
          stroke: #94a3b8 !important;
        }
        .quill-dark-wrapper .ql-snow .ql-fill {
          fill: #94a3b8 !important;
        }
        .quill-dark-wrapper .ql-snow .ql-picker {
          color: #94a3b8 !important;
        }
        .quill-dark-wrapper .ql-snow .ql-picker-options {
          background-color: #0f0f11 !important;
          border: 1px solid #1f1f23 !important;
          border-radius: 0.5rem !important;
        }
        .quill-dark-wrapper .ql-snow .ql-picker-item:hover,
        .quill-dark-wrapper .ql-snow .ql-picker-label:hover {
          color: #3b82f6 !important;
        }
        .quill-dark-wrapper .ql-snow a {
          color: #3b82f6 !important;
        }
        .quill-dark-wrapper .ql-editor.ql-blank::before {
          color: #4b5563 !important;
          font-style: normal !important;
        }
      `}</style>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Tulis artikel berkualitas Anda di sini..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
}
