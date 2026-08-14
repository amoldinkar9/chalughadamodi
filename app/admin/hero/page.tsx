"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X, ImageIcon } from "lucide-react";

export default function HeroAdmin() {
  const [imageUrl, setImageUrl] = useState("");
  const [mobileImageUrl, setMobileImageUrl] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [mobileImageLink, setMobileImageLink] = useState("");
  const [uploadingDesktop, setUploadingDesktop] = useState(false);
  const [uploadingMobile, setUploadingMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const desktopInputRef = useRef<HTMLInputElement | null>(null);
  const mobileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function loadCurrent() {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) return;
        const data = await res.json() as { key: string; value: string }[];
        
        const desktopSetting = data.find((s) => s.key === "hero_image_url");
        if (desktopSetting) setImageUrl(desktopSetting.value);

        const mobileSetting = data.find((s) => s.key === "hero_mobile_image_url");
        if (mobileSetting) setMobileImageUrl(mobileSetting.value);

        const desktopLinkSetting = data.find((s) => s.key === "hero_image_link");
        if (desktopLinkSetting) setImageLink(desktopLinkSetting.value);

        const mobileLinkSetting = data.find((s) => s.key === "hero_mobile_image_link");
        if (mobileLinkSetting) setMobileImageLink(mobileLinkSetting.value);
      } catch { /* ignore */ }
    }
    loadCurrent();
  }, []);

  const uploadFile = async (file: File, type: "desktop" | "mobile") => {
    if (type === "desktop") setUploadingDesktop(true);
    else setUploadingMobile(true);
    
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
      
      if (type === "desktop") {
        setImageUrl(url);
      } else {
        setMobileImageUrl(url);
      }
      toast.success(`${type === "desktop" ? "Desktop" : "Mobile"} image uploaded!`);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      if (type === "desktop") setUploadingDesktop(false);
      else setUploadingMobile(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await Promise.all([
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_image_url", value: imageUrl }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save desktop failed");
        }),
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_mobile_image_url", value: mobileImageUrl }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save mobile failed");
        }),
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_image_link", value: imageLink }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save desktop link failed");
        }),
        fetch("/api/admin/settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "hero_mobile_image_link", value: mobileImageLink }),
        }).then((res) => {
          if (!res.ok) throw new Error("Save mobile link failed");
        })
      ]);
      toast.success("Hero settings saved!");
    } catch {
      toast.error("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Hero Images</h1>
        <p className="text-sm text-muted-foreground">Change the desktop and mobile hero images on the homepage</p>
      </div>

      <div className="max-w-4xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Desktop Image Card */}
          <div className="space-y-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
            <Label className="font-semibold text-base">Desktop Hero Image (5:6 ratio)</Label>
            {imageUrl && (
              <div className="relative rounded-md overflow-hidden border" style={{ maxWidth: "280px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt="Desktop Hero Preview"
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
              onClick={() => desktopInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                if (file) uploadFile(file, "desktop");
              }}
            >
              <input
                ref={desktopInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFile(file, "desktop");
                  e.target.value = "";
                }}
              />
              {uploadingDesktop ? (
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
              placeholder="https://example.com/hero-desktop.jpg"
            />

            <Label className="font-semibold text-sm">Backlink URL (desktop image click target)</Label>
            <Input
              value={imageLink}
              onChange={(e) => setImageLink(e.target.value)}
              placeholder="https://example.com/sponsor"
            />
          </div>

          {/* Mobile Image Card */}
          <div className="space-y-4 p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
            <Label className="font-semibold text-base">Mobile Hero Image (16:9 ratio)</Label>
            {mobileImageUrl && (
              <div className="relative rounded-md overflow-hidden border" style={{ maxWidth: "280px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mobileImageUrl}
                  alt="Mobile Hero Preview"
                  className="w-full object-cover"
                  style={{ aspectRatio: "16/9" }}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6"
                  onClick={() => setMobileImageUrl("")}
                >
                  <X size={12} />
                </Button>
              </div>
            )}

            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => mobileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const file = e.dataTransfer.files[0];
                if (file) uploadFile(file, "mobile");
              }}
            >
              <input
                ref={mobileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFile(file, "mobile");
                  e.target.value = "";
                }}
              />
              {uploadingMobile ? (
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
              value={mobileImageUrl}
              onChange={(e) => setMobileImageUrl(e.target.value)}
              placeholder="https://example.com/hero-mobile.jpg"
            />

            <Label className="font-semibold text-sm">Backlink URL (mobile image click target)</Label>
            <Input
              value={mobileImageLink}
              onChange={(e) => setMobileImageLink(e.target.value)}
              placeholder="https://example.com/sponsor"
            />
          </div>
        </div>

        <Button className="w-full" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
