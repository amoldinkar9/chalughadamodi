import { apiSuccess, apiError } from "@/lib/api/response";
import { PublicContentService } from "@/lib/services/content.service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const content = await PublicContentService.getCombinedContent();
    return apiSuccess(content, 200, {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to load public content";
    return apiError(message, 500);
  }
}
