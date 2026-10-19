import { NextRequest } from "next/server";
import { verifyAdmin, verifyCsrf } from "@/lib/auth";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiForbidden,
  apiBadRequest,
} from "@/lib/api/response";
import { SectionService } from "@/lib/services/content.service";

export async function GET() {
  if (!(await verifyAdmin())) return apiUnauthorized();
  try {
    const sections = await SectionService.getSections();
    return apiSuccess(sections);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}

export async function PUT(req: NextRequest) {
  if (!verifyCsrf(req)) return apiForbidden("CSRF validation failed");
  if (!(await verifyAdmin())) return apiUnauthorized();

  try {
    const body = (await req.json().catch(() => null)) as {
      sections?: Array<{ id: string; enabled: boolean }>;
    } | null;

    if (!body || !Array.isArray(body.sections)) {
      return apiBadRequest("Invalid payload: 'sections' array required");
    }

    const updatedSections = await SectionService.saveSections(body.sections);
    return apiSuccess(updatedSections);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}
