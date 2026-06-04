"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Loader2,
  Undo,
  Redo,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface RichTextEditorProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  uploadFolder?: string;
}

const TEXT_COLORS = [
  { label: "Default (Black)", value: "#000000" },
  { label: "Dark Gray", value: "#374151" },
  { label: "Medium Gray", value: "#6B7280" },
  { label: "Navy Blue", value: "#0A2540" },
  { label: "Royal Blue", value: "#1D4ED8" },
  { label: "Teal Blue", value: "#0F766E" },
  { label: "Emerald Green", value: "#15803D" },
  { label: "Forest Green", value: "#2D7A4F" },
  { label: "Gold / Ochre", value: "#9A7B2E" },
  { label: "Orange", value: "#C2410C" },
  { label: "Coral / Red", value: "#C73E3E" },
  { label: "Crimson Red", value: "#B91C1C" },
  { label: "Deep Purple", value: "#6D28D9" },
  { label: "Fuchsia Pink", value: "#A21CAF" },
];

const HIGHLIGHT_COLORS = [
  { label: "None (Transparent)", value: "initial" },
  { label: "Light Gray Highlight", value: "#F3F4F6" },
  { label: "Yellow Highlight", value: "#FEF08A" },
  { label: "Soft Gold Highlight", value: "#EDD9A8" },
  { label: "Orange Highlight", value: "#FFEDD5" },
  { label: "Red Highlight", value: "#FEE2E2" },
  { label: "Pink Highlight", value: "#FCE7F3" },
  { label: "Purple Highlight", value: "#F3E8FF" },
  { label: "Blue Highlight", value: "#DBEAFE" },
  { label: "Teal Highlight", value: "#CCFBF1" },
  { label: "Green Highlight", value: "#DCFCE7" },
];

export default function RichTextEditor({
  id,
  value,
  onChange,
  placeholder = "टाइप करा...",
  uploadFolder = "general",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textColorInputRef = useRef<HTMLInputElement>(null);
  const bgColorInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeStyles, setActiveStyles] = useState({
    bold: false,
    italic: false,
    underline: false,
    unorderedList: false,
    orderedList: false,
  });

  // Keep editor content synchronized with the external value
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      onChange(html === "<br>" ? "" : html);
      updateActiveStyles();
    }
  };

  const executeCommand = (command: string, arg: string = "") => {
    try {
      document.execCommand("styleWithCSS", false, "true");
    } catch (e) {}
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      editorRef.current.focus();
    }
    handleInput();
  };

  const updateActiveStyles = () => {
    setActiveStyles({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
      orderedList: document.queryCommandState("insertOrderedList"),
    });
  };

  const handleLink = () => {
    const selection = window.getSelection();
    let defaultUrl = "https://";
    
    if (selection && selection.rangeCount > 0) {
      const node = selection.anchorNode;
      if (node && node.parentElement && node.parentElement.tagName === "A") {
        defaultUrl = node.parentElement.getAttribute("href") || "https://";
      }
    }

    const url = prompt("Enter hyperlink URL:", defaultUrl);
    if (url !== null) {
      if (url.trim() === "") {
        executeCommand("unlink");
      } else {
        executeCommand("createLink", url);
      }
    }
  };

  const handleCustomTextColor = () => {
    const hex = prompt("Enter custom Hex color code (e.g. #D4A24C) or leave empty for color picker:");
    if (hex !== null) {
      if (hex.trim() === "") {
        textColorInputRef.current?.click();
      } else {
        let formattedHex = hex.trim();
        if (!formattedHex.startsWith("#")) {
          formattedHex = "#" + formattedHex;
        }
        if (/^#[0-9A-F]{6}$/i.test(formattedHex) || /^#[0-9A-F]{3}$/i.test(formattedHex)) {
          executeCommand("foreColor", formattedHex);
        } else {
          alert("Invalid Hex color format. Please enter a format like #3b82f6.");
        }
      }
    }
  };

  const handleCustomBgColor = () => {
    const hex = prompt("Enter custom Hex highlight color (e.g. #EDD9A8) or leave empty for color picker:");
    if (hex !== null) {
      if (hex.trim() === "") {
        bgColorInputRef.current?.click();
      } else {
        let formattedHex = hex.trim();
        if (!formattedHex.startsWith("#")) {
          formattedHex = "#" + formattedHex;
        }
        if (/^#[0-9A-F]{6}$/i.test(formattedHex) || /^#[0-9A-F]{3}$/i.test(formattedHex)) {
          executeCommand("backColor", formattedHex);
        } else {
          alert("Invalid Hex color format. Please enter a format like #EDD9A8.");
        }
      }
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", uploadFolder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const { url } = (await res.json()) as { url: string };
      executeCommand("insertImage", url);
    } catch (err) {
      alert("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="border border-input rounded-md bg-background focus-within:ring-1 focus-within:ring-ring focus-within:border-ring overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap gap-1 items-center p-2 border-b bg-muted/30 select-none">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${activeStyles.bold ? "bg-muted text-primary" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("bold")}
          title="Bold"
        >
          <Bold size={16} />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${activeStyles.italic ? "bg-muted text-primary" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("italic")}
          title="Italic"
        >
          <Italic size={16} />
        </Button>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${activeStyles.underline ? "bg-muted text-primary" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("underline")}
          title="Underline"
        >
          <Underline size={16} />
        </Button>

        <span className="w-[1px] h-6 bg-border mx-1" />

        {/* Font Size Dropdown */}
        <select
          className="h-8 rounded-md border border-input bg-background px-2 text-xs font-semibold focus:outline-none"
          onMouseDown={(e) => e.stopPropagation()}
          onChange={(e) => executeCommand("fontSize", e.target.value)}
          defaultValue="3"
          title="Font Size"
        >
          <option value="1">Small</option>
          <option value="3">Normal</option>
          <option value="5">Large</option>
          <option value="6">Extra Large</option>
        </select>

        {/* Text Color Dropdown */}
        <div className="flex items-center gap-0.5">
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-xs font-semibold focus:outline-none"
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => executeCommand("foreColor", e.target.value)}
            defaultValue="#000000"
            title="Text Color"
          >
            {TEXT_COLORS.map((col) => (
              <option key={col.value} value={col.value}>
                {col.label}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleCustomTextColor}
            title="Custom Hex / Color Picker"
          >
            <Palette size={15} />
          </Button>
        </div>

        {/* Text Highlight Background */}
        <div className="flex items-center gap-0.5">
          <select
            className="h-8 rounded-md border border-input bg-background px-2 text-xs font-semibold focus:outline-none"
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => executeCommand("backColor", e.target.value)}
            defaultValue="initial"
            title="Highlight Color"
          >
            {HIGHLIGHT_COLORS.map((col) => (
              <option key={col.value} value={col.value}>
                {col.label}
              </option>
            ))}
          </select>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleCustomBgColor}
            title="Custom Highlight Hex / Picker"
          >
            <Palette size={15} />
          </Button>
        </div>

        <span className="w-[1px] h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("justifyLeft")}
          title="Align Left"
        >
          <AlignLeft size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("justifyCenter")}
          title="Align Center"
        >
          <AlignCenter size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("justifyRight")}
          title="Align Right"
        >
          <AlignRight size={16} />
        </Button>

        <span className="w-[1px] h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${activeStyles.unorderedList ? "bg-muted text-primary" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("insertUnorderedList")}
          title="Bulleted List"
        >
          <List size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`h-8 w-8 ${activeStyles.orderedList ? "bg-muted text-primary" : ""}`}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("insertOrderedList")}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </Button>

        <span className="w-[1px] h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onMouseDown={(e) => e.preventDefault()}
          onClick={handleLink}
          title="Insert Link"
        >
          <LinkIcon size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 relative"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          title="Insert Image"
        >
          {isUploading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <ImageIcon size={16} />
          )}
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <input
          ref={textColorInputRef}
          type="color"
          className="hidden w-0 h-0 p-0 border-0"
          onChange={(e) => executeCommand("foreColor", e.target.value)}
        />
        <input
          ref={bgColorInputRef}
          type="color"
          className="hidden w-0 h-0 p-0 border-0"
          onChange={(e) => executeCommand("backColor", e.target.value)}
        />

        <span className="w-[1px] h-6 bg-border mx-1" />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("undo")}
          title="Undo"
        >
          <Undo size={16} />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => executeCommand("redo")}
          title="Redo"
        >
          <Redo size={16} />
        </Button>
      </div>

      {/* Editable Content Canvas */}
      <div
        ref={editorRef}
        id={id}
        contentEditable
        className="min-h-[200px] max-h-[400px] overflow-y-auto p-4 focus:outline-none rich-editor-content prose prose-sm max-w-none"
        onInput={handleInput}
        onKeyUp={updateActiveStyles}
        onMouseUp={updateActiveStyles}
        style={{ whiteSpace: "normal" }}
      />
    </div>
  );
}
