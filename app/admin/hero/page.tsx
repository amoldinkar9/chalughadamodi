"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, ImageIcon } from "lucide-react";

export default function HeroAdmin() {
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const loadCurrent = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) return;
      const data = await res.json() as { key: string; value: string }[];
      const setting = data.find((s) => s.key === "hero_image_url");
      if (setting) setImageUrl(setting.value);
    } catch { /* ignore */ }
    setLoaded(true);
  };

  if (!loaded) {
    loadCurrent();
  }

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", "hero");
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) {
        const err = await res.json() as Record<string, string>;
        throw new Error(err.error || "Upload failed");
      }
      const { url } = await res.json() as { url: string };
      setImageUrl(url);
      toast.success("Image uploaded!");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "hero_image_url", value: imageUrl }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast.success("Hero image saved!");
    } catch {
      toast.error("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hero Image</h1>
        <p className="text-sm text-muted-foreground">Change the hero image on the homepage</p>
      </div>

      <div className="max-w-lg space-y-6">
        <div className="space-y-2">
          <Label>Hero Image (5:6 ratio)</Label>
          {imageUrl && (
            <div className="relative rounded-md overflow-hidden border" style={{ maxWidth: "320px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="Hero Preview"
                className="w-full object-cover"
                style={{ aspectRatio: "5/6" }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => setImageUrl("")}
              >
                <X size={12} />
              </Button>
            </div>
          )}

          <div
            className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const file = e.dataTransfer.files[0];
              if (file) uploadFile(file);
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file);
                e.target.value = "";
              }}
            />
            {uploading ? (
              <p className="text-sm text-muted-foreground">Uploading...</p>
            ) : (
              <>
                <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click or drag image here (max 5MB)</p>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ImageIcon size={12} />
            <span>Or paste a URL:</span>
          </div>
          <Input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/hero.jpg"
          />
        </div>

        <Button className="w-full" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </Button>
      </div>
    </div>
  );
}
