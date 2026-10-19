import { NextRequest } from "next/server";
import { verifyAdmin, verifyCsrf } from "@/lib/auth";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiForbidden,
  apiNotFound,
  apiBadRequest,
} from "@/lib/api/response";
import { GalleryService } from "@/lib/services/content.service";

export async function GET() {
  if (!(await verifyAdmin())) return apiUnauthorized();
  try {
    const list = await GalleryService.list();
    return apiSuccess(list);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}

export async function POST(req: NextRequest) {
  if (!verifyCsrf(req)) return apiForbidden("CSRF validation failed");
  if (!(await verifyAdmin())) return apiUnauthorized();

  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body) return apiBadRequest("Request body required");

    const created = await GalleryService.create(body);
    return apiSuccess(created, 201);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}

export async function PUT(req: NextRequest) {
  if (!verifyCsrf(req)) return apiForbidden("CSRF validation failed");
  if (!(await verifyAdmin())) return apiUnauthorized();

  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || !body.id || typeof body.id !== "string") {
      return apiBadRequest("Valid ID required");
    }

    const { id, ...updates } = body;
    const updated = await GalleryService.update(id, updates);
    if (!updated) return apiNotFound("Job recruitment not found");

    return apiSuccess(updated);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}

export async function DELETE(req: NextRequest) {
  if (!verifyCsrf(req)) return apiForbidden("CSRF validation failed");
  if (!(await verifyAdmin())) return apiUnauthorized();

  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || !body.id || typeof body.id !== "string") {
      return apiBadRequest("Valid ID required");
    }

    await GalleryService.delete(body.id);
    return apiSuccess({ success: true });
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}
