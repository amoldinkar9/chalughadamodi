"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  Layers,
  CloudUpload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { SectionItem } from "@/lib/config/sections";
import { DEFAULT_HOMEPAGE_SECTIONS } from "@/lib/config/sections";

interface SectionManagerProps {
  initialSections?: SectionItem[];
}

export function SectionManager({ initialSections }: SectionManagerProps) {
  const [sections, setSections] = useState<SectionItem[]>(() => {
    if (initialSections && initialSections.length > 0) {
      return initialSections;
    }
    return [];
  });
  const [loading, setLoading] = useState(() => !initialSections || initialSections.length === 0);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved" | "error">("saved");
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const pendingSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const latestSectionsRef = useRef<SectionItem[]>([]);

  // Keep latestSectionsRef in sync
  useEffect(() => {
    latestSectionsRef.current = sections;
  }, [sections]);

  // Persist sections to API
  const persistToApi = useCallback(async (listToSave: SectionItem[], showToast = false) => {
    setSaveStatus("saving");
    try {
      const payload = listToSave.map((s) => ({ id: s.id, enabled: s.enabled }));

      const res = await fetch("/api/admin/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: payload }),
      });

      if (!res.ok) {
        const errJson = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(errJson.error || "Failed to persist changes");
      }

      const json = (await res.json()) as SectionItem[] | { data?: SectionItem[] };
      const savedData: SectionItem[] = Array.isArray(json)
        ? json
        : Array.isArray(json?.data)
        ? json.data
        : listToSave;
      setSections(savedData);
      setSaveStatus("saved");

      if (showToast) {
        toast.success("Section layout saved and published to live website!");
      }
    } catch (err) {
      setSaveStatus("error");
      toast.error(err instanceof Error ? err.message : "Error saving changes");
    }
  }, []);

  // Debounced auto-save
  const triggerAutoSave = useCallback((updatedList: SectionItem[]) => {
    setSaveStatus("unsaved");
    if (pendingSaveTimeoutRef.current) {
      clearTimeout(pendingSaveTimeoutRef.current);
    }
    pendingSaveTimeoutRef.current = setTimeout(() => {
      persistToApi(updatedList, false);
    }, 400); // 400ms debounce
  }, [persistToApi]);

  // Load sections on mount
  useEffect(() => {
    async function loadSections() {
      try {
        const res = await fetch(`/api/admin/sections?t=${Date.now()}`, {
          cache: "no-store",
          headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
        });

        if (!res.ok) throw new Error("Failed to load section configuration");
        const json = (await res.json()) as SectionItem[] | { data?: SectionItem[] };
        const data: SectionItem[] = Array.isArray(json)
          ? json
          : Array.isArray(json?.data)
          ? json.data
          : (initialSections && initialSections.length > 0 ? initialSections : DEFAULT_HOMEPAGE_SECTIONS);
        setSections(data);
        setSaveStatus("saved");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Error loading sections");
        if (initialSections && initialSections.length > 0) {
          setSections(initialSections);
        }
      } finally {
        setLoading(false);
      }
    }
    loadSections();
  }, [initialSections]);

  // Flush any pending save on unmount or tab close
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (pendingSaveTimeoutRef.current) {
        clearTimeout(pendingSaveTimeoutRef.current);
        // Use sendBeacon for reliable delivery if tab closes
        try {
          const payload = latestSectionsRef.current.map((s) => ({ id: s.id, enabled: s.enabled }));
          const blob = new Blob([JSON.stringify({ sections: payload })], { type: "application/json" });
          navigator.sendBeacon("/api/admin/sections", blob);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (pendingSaveTimeoutRef.current) {
        clearTimeout(pendingSaveTimeoutRef.current);
      }
    };
  }, []);

  const handleToggle = (id: string, enabled: boolean) => {
    const updated = sections.map((s) => (s.id === id ? { ...s, enabled } : s));
    setSections(updated);
    triggerAutoSave(updated);
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= sections.length) return;
    const updated = [...sections];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setSections(updated);
    triggerAutoSave(updated);
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
    triggerAutoSave(defaults);
    toast.info("Reset to default order and auto-saved.");
  };

  const handleToggleAll = (enabled: boolean) => {
    const updated = sections.map((s) => ({ ...s, enabled }));
    setSections(updated);
    triggerAutoSave(updated);
    toast.info(enabled ? "All sections enabled & saved" : "All sections disabled & saved");
  };

  const handleManualSave = () => {
    if (pendingSaveTimeoutRef.current) {
      clearTimeout(pendingSaveTimeoutRef.current);
    }
    persistToApi(sections, true);
  };

  const activeCount = sections.filter((s) => s.enabled).length;
  const disabledCount = sections.length - activeCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-foreground">Loading sections layout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Sliders className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Homepage Section Manager
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-300 mt-1.5">
            Enable or disable sections, or drag and drop to reorder. <strong>Changes are auto-saved automatically.</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Auto-save indicator */}
          <div className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-800 bg-background shadow-xs">
            {saveStatus === "saving" && (
              <>
                <CloudUpload className="h-3.5 w-3.5 text-primary animate-pulse" />
                <span className="text-primary font-medium">Auto-saving...</span>
              </>
            )}
            {saveStatus === "saved" && (
              <>
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-400">All changes saved</span>
              </>
            )}
            {saveStatus === "unsaved" && (
              <>
                <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                <span className="text-amber-700 dark:text-amber-400">Unsaved changes</span>
              </>
            )}
            {saveStatus === "error" && (
              <span className="text-red-600 dark:text-red-400 font-medium">Save failed</span>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("/", "_blank")}
            className="gap-2 font-medium border-slate-300 dark:border-slate-700 text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <ExternalLink size={15} />
            View Live Site
          </Button>

          <Button
            onClick={handleManualSave}
            disabled={saveStatus === "saving"}
            size="sm"
            className="gap-2 min-w-[120px] font-semibold shadow"
          >
            {saveStatus === "saving" ? (
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

      {/* Stats and Action Bar - High Contrast */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Sections Card */}
        <Card className="bg-card border-slate-200 dark:border-slate-800 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Total Sections
              </p>
              <p className="text-3xl font-extrabold text-foreground mt-1">
                {sections.length}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
              <Layers size={22} />
            </div>
          </CardContent>
        </Card>

        {/* Active Sections Card */}
        <Card className="bg-card border-emerald-200 dark:border-emerald-900/50 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
                Active / Visible
              </p>
              <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">
                {activeCount}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              <Eye size={22} />
            </div>
          </CardContent>
        </Card>

        {/* Disabled Sections Card */}
        <Card className="bg-card border-amber-200 dark:border-amber-900/50 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                Disabled / Hidden
              </p>
              <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-400 mt-1">
                {disabledCount}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <EyeOff size={22} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Controls Bar - High Contrast */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-100/80 dark:bg-slate-900/80 p-3.5 rounded-xl border border-slate-300 dark:border-slate-800 text-sm">
        <div className="flex items-center gap-2.5 text-foreground">
          <span className="font-bold text-foreground">Controls:</span>
          <span className="text-slate-700 dark:text-slate-300">
            Drag via the grip handle or use ▲ ▼ buttons to reorder. <em>Auto-saved automatically.</em>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleToggleAll(true)}
            className="text-xs h-8 font-semibold bg-background border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Enable All
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => handleToggleAll(false)}
            className="text-xs h-8 font-semibold bg-background border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            Disable All
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="text-xs h-8 gap-1.5 font-semibold bg-background border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <RotateCcw size={13} />
            Reset Order
          </Button>
        </div>
      </div>

      {/* Draggable Sections List - High Contrast Cards */}
      <div className="space-y-3.5">
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
              className={`group relative flex items-center justify-between gap-4 p-4 rounded-xl border transition-all duration-150 ${
                !section.enabled
                  ? "bg-slate-100/70 dark:bg-slate-900/60 border-dashed border-slate-400 dark:border-slate-700"
                  : "bg-card border-slate-300 dark:border-slate-800 shadow-sm hover:border-primary/80 hover:shadow-md"
              } ${
                isDragging ? "opacity-30 border-primary border-2 scale-[0.99]" : ""
              } ${
                isOver ? "border-primary ring-2 ring-primary/30 bg-primary/10" : ""
              }`}
            >
              {/* Left Column: Drag handle + Index + Title */}
              <div className="flex items-center gap-3.5 min-w-0">
                {/* Drag Grip Handle */}
                <div
                  className="cursor-grab active:cursor-grabbing p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Drag and drop to reorder"
                >
                  <GripVertical size={20} />
                </div>

                {/* Section Position Badge - High Contrast */}
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-extrabold text-sm shrink-0 shadow-sm">
                  {index + 1}
                </div>

                {/* Section Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    {/* Primary English Name */}
                    <span className="font-bold text-base text-foreground truncate">
                      {section.name}
                    </span>

                    {/* Marathi Tag - High Contrast Pill */}
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-200/90 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                      {section.marathiName}
                    </span>

                    {/* Visibility Status Badge */}
                    {section.enabled ? (
                      <Badge
                        variant="outline"
                        className="bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700 text-xs font-bold gap-1 px-2.5 py-0.5 shadow-none"
                      >
                        <CheckCircle2 size={13} className="text-emerald-700 dark:text-emerald-400" />
                        Active
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200 border-amber-300 dark:border-amber-700 text-xs font-bold gap-1 px-2.5 py-0.5 shadow-none"
                      >
                        <EyeOff size={13} className="text-amber-700 dark:text-amber-400" />
                        Hidden
                      </Badge>
                    )}
                  </div>

                  {/* Description - Crisp Readable Text */}
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">
                    {section.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Up/Down buttons + Switch */}
              <div className="flex items-center gap-3.5 shrink-0">
                {/* Single-Click Reorder Buttons */}
                <div className="flex items-center gap-1.5 border-r border-slate-300 dark:border-slate-700 pr-3.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40"
                    disabled={index === 0}
                    onClick={() => moveSection(index, index - 1)}
                    title="Move section up"
                  >
                    <ArrowUp size={16} />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40"
                    disabled={index === sections.length - 1}
                    onClick={() => moveSection(index, index + 1)}
                    title="Move section down"
                  >
                    <ArrowDown size={16} />
                  </Button>
                </div>

                {/* Enable / Disable Switch */}
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-bold hidden sm:inline ${
                    section.enabled ? "text-emerald-700 dark:text-emerald-400" : "text-amber-700 dark:text-amber-400"
                  }`}>
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
    </div>
  );
}
