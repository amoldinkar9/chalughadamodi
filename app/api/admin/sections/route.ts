import { NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { verifyAdmin, verifyCsrf } from "@/lib/auth";
import {
  apiSuccess,
  apiError,
  apiUnauthorized,
  apiForbidden,
  apiBadRequest,
} from "@/lib/api/response";
import { SectionService } from "@/lib/services/content.service";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await verifyAdmin())) return apiUnauthorized();
  try {
    const sections = await SectionService.getSections();
    const response = apiSuccess(sections);
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
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

    // Invalidate caches so public homepage and keyword pages update immediately
    try {
      revalidatePath("/", "layout");
      revalidatePath("/");
    } catch {
      // Revalidation warning non-fatal in local/preview environments
    }

    return apiSuccess(updatedSections);
  } catch (error) {
    return apiError(error instanceof Error ? error.message : "Database error");
  }
}

export async function POST(req: NextRequest) {
  return PUT(req);
}

