"use client";

import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, Upload, X, ImageIcon, GripVertical } from "lucide-react";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useEffect } from "react";
import Sortable from "sortablejs";

interface FieldConfig {
  key: string;
  label: string;
  type: "text" | "textarea" | "switch" | "number" | "image" | "date" | "richtext";
  placeholder?: string;
  uploadFolder?: string;
  aspectRatio?: string;
  rows?: number;
  maxLength?: number;
}

interface AdminCrudPageProps {
  title: string;
  apiPath: string;
  fields: FieldConfig[];
  columns: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData: any[];
}



export default function AdminCrudPage({ title, apiPath, fields, columns, initialData }: AdminCrudPageProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<any[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editItem, setEditItem] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const uploadFile = async (file: File, folder: string, fieldKey: string) => {
    setUploading((prev) => ({ ...prev, [fieldKey]: true }));
    try {
      const body = new FormData();
      body.append("file", file);
      body.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      if (!res.ok) {
        const err = await res.json() as Record<string, string>;
        throw new Error(err.error || "Upload failed");
      }
      const { url } = await res.json() as { url: string };
      setFormData((prev: Record<string, unknown>) => ({ ...prev, [fieldKey]: url }));
      toast.success("Image uploaded!");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading((prev) => ({ ...prev, [fieldKey]: false }));
    }
  };

  const resetForm = () => {
    const defaults: Record<string, string | boolean | number> = {};
    fields.forEach((f) => {
      if (f.key === "published") defaults[f.key] = true;
      else if (f.key === "display_order") {
        const maxOrder = items.reduce((max, item) => Math.max(max, item.display_order || 0), 0);
        defaults[f.key] = maxOrder + 1;
      } else if (f.type === "switch") defaults[f.key] = false;
      else if (f.type === "number") defaults[f.key] = 0;
      else defaults[f.key] = "";
    });
    setFormData(defaults);
    setEditItem(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openEdit = (item: any) => {
    setEditItem(item);
    const data: Record<string, unknown> = {};
    fields.forEach((f) => {
      if (f.type === "switch") data[f.key] = !!item[f.key];
      else if (f.type === "number") data[f.key] = item[f.key] ?? 0;
      else data[f.key] = item[f.key] ?? "";
    });
    setFormData(data);
    setDialogOpen(true);
  };

  const openCreate = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (editItem) {
        const res = await fetch(apiPath, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editItem.id, ...formData }),
        });
        if (!res.ok) {
          let errMsg = "Update failed";
          try {
            const errResult = await res.json() as Record<string, unknown>;
            if (errResult?.error) errMsg = String(errResult.error);
          } catch {}
          throw new Error(errMsg);
        }
        const result = await res.json() as Record<string, unknown>;
        setItems(items.map((i) => (i.id === result.id ? result : i)));
        toast.success("Updated successfully!");
      } else {
        const payload = { ...formData, published: true };
        const res = await fetch(apiPath, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          let errMsg = "Create failed";
          try {
            const errResult = await res.json() as Record<string, unknown>;
            if (errResult?.error) errMsg = String(errResult.error);
          } catch {}
          throw new Error(errMsg);
        }
        const result = await res.json() as Record<string, unknown>;
        setItems([...items, result]);
        toast.success("New entry created!");
      }
      setDialogOpen(false);
      resetForm();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(apiPath, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setItems(items.filter((i) => i.id !== id));
      toast.success("Deleted successfully!");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const togglePublish = async (item: { id: string; published: boolean }) => {
    try {
      const res = await fetch(apiPath, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, published: !item.published }),
      });
      if (!res.ok) throw new Error("Toggle failed");
      const updated = await res.json() as Record<string, unknown>;
      setItems(items.map((i) => (i.id === updated.id ? updated : i)));
      toast.success(updated.published ? "Published!" : "Unpublished!");
    } catch {
      toast.error("Toggle failed.");
    }
  };

  const tableBodyRef = useRef<HTMLTableSectionElement | null>(null);
  const sortedItems = [...items].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  useEffect(() => {
    if (!tableBodyRef.current || sortedItems.length === 0) return;

    const sortable = new Sortable(tableBodyRef.current, {
      handle: ".drag-handle",
      animation: 150,
      ghostClass: "bg-accent/50",
      onEnd: async (evt) => {
        const { oldIndex, newIndex } = evt;
        if (oldIndex === undefined || newIndex === undefined || oldIndex === newIndex) return;

        // Revert SortableJS DOM move to keep React in control of rendering
        const parent = evt.from;
        const child = evt.item;
        parent.removeChild(child);
        const referenceNode = parent.children[oldIndex] || null;
        parent.insertBefore(child, referenceNode);

        // Compute new ordered array
        const reordered = [...sortedItems];
        const [movedItem] = reordered.splice(oldIndex, 1);
        reordered.splice(newIndex, 0, movedItem);

        const updated = reordered.map((item, idx) => ({
          ...item,
          display_order: idx + 1,
        }));

        setItems(updated);

        const changedItems = updated.filter((item, idx) => {
          const originalItem = sortedItems.find((orig) => orig.id === item.id);
          return originalItem?.display_order !== (idx + 1);
        });

        try {
          for (const item of changedItems) {
            await fetch(apiPath, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: item.id, display_order: item.display_order }),
            });
          }
          toast.success("Order saved successfully!");
        } catch {
          toast.error("Failed to save new order to database.");
        }
      },
    });

    return () => {
      sortable.destroy();
    };
  }, [sortedItems, apiPath]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">{items.length} entries</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger render={<Button />} onClick={openCreate}>
            <Plus size={16} className="mr-2" /> Add New
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editItem ? "Edit" : "New"} {title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              {fields.map((field) => (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key}>{field.label}</Label>
                  {field.type === "textarea" ? (
                    <div className="space-y-1">
                      <Textarea
                        id={field.key}
                        value={formData[field.key] || ""}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        placeholder={field.placeholder}
                        rows={field.rows || 3}
                        maxLength={field.maxLength}
                      />
                      {field.maxLength && (
                        <div className="text-right text-xs text-muted-foreground mt-1">
                          {(formData[field.key] || "").length} / {field.maxLength}
                        </div>
                      )}
                    </div>
                  ) : field.type === "richtext" ? (
                    <RichTextEditor
                      id={field.key}
                      value={formData[field.key] || ""}
                      onChange={(html) => setFormData({ ...formData, [field.key]: html })}
                      placeholder={field.placeholder}
                      uploadFolder={field.uploadFolder || "general"}
                    />
                  ) : field.type === "switch" ? (
                    <div className="flex items-center gap-2">
                      <Switch
                        id={field.key}
                        checked={!!formData[field.key]}
                        onCheckedChange={(v) => setFormData({ ...formData, [field.key]: v })}
                      />
                      <span className="text-sm text-muted-foreground">
                        {formData[field.key] ? "Yes" : "No"}
                      </span>
                    </div>
                  ) : field.type === "image" ? (
                    <div className="space-y-3">
                      {formData[field.key] && (
                        <div className="relative rounded-md overflow-hidden border" style={{ maxWidth: "280px" }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={formData[field.key]}
                            alt="Preview"
                            className="w-full object-cover"
                            style={field.aspectRatio ? { aspectRatio: field.aspectRatio } : { maxHeight: "12rem" }}
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2 h-6 w-6"
                            onClick={() => setFormData({ ...formData, [field.key]: "" })}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      )}
                      <div
                        className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => fileInputRefs.current[field.key]?.click()}
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          const file = e.dataTransfer.files[0];
                          if (file) uploadFile(file, field.uploadFolder || "general", field.key);
                        }}
                      >
                        <input
                          ref={(el) => { fileInputRefs.current[field.key] = el; }}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) uploadFile(file, field.uploadFolder || "general", field.key);
                            e.target.value = "";
                          }}
                        />
                        {uploading[field.key] ? (
                          <p className="text-sm text-muted-foreground">Uploading...</p>
                        ) : (
                          <>
                            <Upload size={24} className="mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground">
                              Click or drag image here (max 5MB)
                            </p>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ImageIcon size={12} />
                        <span>Or paste a URL:</span>
                      </div>
                      <Input
                        id={field.key}
                        value={formData[field.key] || ""}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        placeholder={field.placeholder || "https://example.com/image.jpg"}
                      />
                    </div>
                  ) : field.type === "date" ? (
                    <Input
                      id={field.key}
                      type="date"
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    />
                  ) : field.type === "number" ? (
                    <Input
                      id={field.key}
                      type="number"
                      value={formData[field.key] || 0}
                      onChange={(e) => setFormData({ ...formData, [field.key]: parseInt(e.target.value) || 0 })}
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <Input
                      id={field.key}
                      value={formData[field.key] || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
              <Button className="w-full" onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : editItem ? "Save Changes" : "Create"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center">Drag</TableHead>
              {columns.map((col) => (
                <TableHead key={col}>{fields.find((f) => f.key === col)?.label || col}</TableHead>
              ))}
              <TableHead>Published</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody ref={tableBodyRef}>
            {sortedItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 3} className="text-center py-8 text-muted-foreground">
                  No entries yet. Click &quot;Add New&quot; to get started.
                </TableCell>
              </TableRow>
            ) : (
              sortedItems.map((item, idx) => (
                <TableRow key={item.id} data-id={item.id}>
                  <TableCell className="drag-handle cursor-grab active:cursor-grabbing text-muted-foreground w-[50px] text-center align-middle">
                    <GripVertical size={16} className="mx-auto" />
                  </TableCell>
                  {columns.map((col) => (
                    <TableCell key={col} className="max-w-[200px] truncate align-middle">
                      {typeof item[col] === "boolean" ? (
                        item[col] ? <Badge variant="default">Yes</Badge> : <Badge variant="secondary">No</Badge>
                      ) : (
                        String(item[col] ?? "")
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="align-middle">
                    <Switch
                      checked={item.published}
                      onCheckedChange={() => togglePublish(item)}
                    />
                  </TableCell>
                  <TableCell className="align-middle">
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(item)}>
                        <Pencil size={14} />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger render={<Button variant="ghost" size="icon" className="text-destructive" />}>
                          <Trash2 size={14} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This entry will be permanently deleted.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
