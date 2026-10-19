"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  GripVertical,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Save,
  CheckCircle2,
  EyeOff,
  Eye,
  Sliders,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SectionItem } from "@/lib/config/sections";
import { DEFAULT_HOMEPAGE_SECTIONS } from "@/lib/config/sections";

export function SectionManager() {
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const initialSectionsRef = useRef<string>("");

  useEffect(() => {
    async function loadSections() {
      try {
        const res = await fetch("/api/admin/sections");
        if (!res.ok) throw new Error("Failed to load section configuration");
        const json = (await res.json()) as { success: boolean; data: SectionItem[] };
        const data = json.data || DEFAULT_HOMEPAGE_SECTIONS;
        setSections(data);
        initialSectionsRef.current = JSON.stringify(data);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error loading sections");
        setSections(DEFAULT_HOMEPAGE_SECTIONS);
      } finally {
        setLoading(false);
      }
    }
    loadSections();
  }, []);

  const checkIfChanged = (updated: SectionItem[]) => {
    const isDifferent = JSON.stringify(updated) !== initialSectionsRef.current;
    setHasChanges(isDifferent);
  };

  const handleToggle = (id: string, enabled: boolean) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, enabled } : s));
    setSections(updated);
    checkIfChanged(updated);
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= sections.length) return;
    const updated = [...sections];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setSections(updated);
    checkIfChanged(updated);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverIdx !== index) {
      setDragOverIdx(index);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) {
      setDraggedIdx(null);
      setDragOverIdx(null);
      return;
    }
    moveSection(draggedIdx, targetIdx);
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    setDragOverIdx(null);
  };

  const handleReset = () => {
    const defaults = DEFAULT_HOMEPAGE_SECTIONS.map((s) => ({ ...s }));
    setSections(defaults);
    checkIfChanged(defaults);
    toast.info("Reset to default order. Remember to save changes.");
  };

  const handleToggleAll = (enabled: boolean) => {
    const updated = sections.map((s) => ({ ...s, enabled }));
    setSections(updated);
    checkIfChanged(updated);
    toast.info(enabled ? "All sections enabled" : "All sections disabled");
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = sections.map((s) => ({ id: s.id, enabled: s.enabled }));
      const res = await fetch("/api/admin/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: payload }),
      });

      if (!res.ok) {
        const errJson = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errJson.error || "Failed to save section layout");
      }

      const json = (await res.json()) as { success: boolean; data: SectionItem[] };
      const savedData = json.data || sections;
      setSections(savedData);
      initialSectionsRef.current = JSON.stringify(savedData);
      setHasChanges(false);
      toast.success("Section layout and visibility updated successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error saving changes");
    } finally {
      setSaving(false);
    }
  };

  const activeCount = sections.filter((s) => s.enabled).length;
  const disabledCount = sections.length - activeCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading sections layout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Homepage Section Manager</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Enable or disable sections, or drag and drop to reorder their display sequence across the homepage and keyword landing pages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("/", "_blank")}
            className="gap-2"
          >
            <ExternalLink size={15} />
            View Live Site
          </Button>

          <Button
            onClick={handleSave}
            disabled={saving || !hasChanges}
            size="sm"
            className="gap-2 min-w-[130px]"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={15} />
                Save Layout
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats and Action Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-card/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Total Sections
              </p>
              <p className="text-2xl font-bold mt-1">{sections.length}</p>
            </div>
            <div className="p-2.5 rounded-full bg-primary/10 text-primary">
              <Sliders size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Active / Visible
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {activeCount}
              </p>
            </div>
            <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Eye size={20} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card/50">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Disabled / Hidden
              </p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {disabledCount}
              </p>
            </div>
            <div className="p-2.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <EyeOff size={20} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-muted/40 p-3 rounded-lg border text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-medium text-foreground">Controls:</span>
          <span>Drag via handle or click ▲ ▼ to reorder.</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleToggleAll(true)}
            className="text-xs h-8"
          >
            Enable All
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleToggleAll(false)}
            className="text-xs h-8"
          >
            Disable All
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-xs h-8 gap-1"
          >
            <RotateCcw size={13} />
            Reset Order
          </Button>
        </div>
      </div>

      {/* Unsaved alert banner */}
      {hasChanges && (
        <div className="flex items-center justify-between bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="font-medium">You have unsaved layout modifications.</span>
          </div>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={saving}
            className="h-8 gap-1.5"
          >
            <Save size={14} />
            Save Now
          </Button>
        </div>
      )}

      {/* Draggable Sections List */}
      <div className="space-y-3">
        {sections.map((section, index) => {
          const isDragging = draggedIdx === index;
          const isOver = dragOverIdx === index;

          return (
            <div
              key={section.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className={`group relative flex items-center justify-between gap-4 p-4 rounded-xl border bg-card transition-all duration-150 ${
                !section.enabled ? "opacity-60 bg-muted/20 border-dashed" : "shadow-sm hover:border-primary/50"
              } ${isDragging ? "opacity-25 border-primary border-2 scale-[0.99]" : ""} ${
                isOver ? "border-primary ring-2 ring-primary/20 bg-primary/5" : ""
              }`}
            >
              {/* Left Column: Drag handle + Index + Title */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="cursor-grab active:cursor-grabbing p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  title="Drag and drop to reorder"
                >
                  <GripVertical size={20} />
                </div>

                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-muted text-xs font-bold text-muted-foreground shrink-0">
                  {index + 1}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-base text-foreground truncate">
                      {section.name}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium px-2 py-0.5 rounded bg-muted/60">
                      {section.marathiName}
                    </span>
                    {section.enabled ? (
                      <Badge
                        variant="outline"
                        className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-[11px] gap-1"
                      >
                        <CheckCircle2 size={12} />
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-muted text-muted-foreground border-muted-foreground/20 text-[11px] gap-1"
                      >
                        <EyeOff size={12} />
                        Hidden
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Up/Down buttons + Switch */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center gap-1 border-r pr-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    disabled={index === 0}
                    onClick={() => moveSection(index, index - 1)}
                    title="Move section up"
                  >
                    <ArrowUp size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    disabled={index === sections.length - 1}
                    onClick={() => moveSection(index, index + 1)}
                    title="Move section down"
                  >
                    <ArrowDown size={16} />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    {section.enabled ? "Enabled" : "Disabled"}
                  </span>
                  <Switch
                    checked={section.enabled}
                    onCheckedChange={(checked) => handleToggle(section.id, checked)}
                    aria-label={`Toggle ${section.name}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Save button if dirty */}
      {hasChanges && (
        <div className="sticky bottom-6 z-20 flex justify-end">
          <Button
            size="lg"
            onClick={handleSave}
            disabled={saving}
            className="shadow-lg gap-2 px-6"
          >
            {saving ? "Saving Changes..." : "Save Section Layout"}
          </Button>
        </div>
      )}
    </div>
  );
}
