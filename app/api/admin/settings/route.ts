import { NextRequest } from "next/server";
import { verifyAdmin, verifyCsrf } from "@/lib/auth";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiForbidden,
  apiBadRequest,
} from "@/lib/api/response";
import { SettingsService } from "@/lib/services/content.service";

export async function GET() {
  if (!(await verifyAdmin())) return apiUnauthorized();
  try {
    const settings = await SettingsService.getAll();
    return apiSuccess(settings);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}

export async function PUT(req: NextRequest) {
  if (!verifyCsrf(req)) return apiForbidden("CSRF validation failed");
  if (!(await verifyAdmin())) return apiUnauthorized();

  try {
    const body = (await req.json().catch(() => null)) as Record<string, unknown> | null;
    if (!body || !body.key || typeof body.key !== "string") {
      return apiBadRequest("Valid setting key required");
    }

    const row = await SettingsService.set(body.key, String(body.value ?? ""));
    return apiSuccess(row);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}
