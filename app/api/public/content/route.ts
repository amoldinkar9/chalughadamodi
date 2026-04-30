import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { PublicContent } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  const [announcements, gallery, magazines, tests, testimonials, faqs] = await Promise.all([
    supabase.from("announcements").select("*").eq("published", true).order("display_order"),
    supabase.from("gallery").select("*").eq("published", true).order("display_order"),
    supabase.from("magazines").select("*").eq("published", true).order("display_order"),
    supabase.from("tests").select("*").eq("published", true).order("display_order"),
    supabase.from("testimonials").select("*").eq("published", true).order("display_order"),
    supabase.from("faqs").select("*").eq("published", true).order("display_order"),
  ]);

  const content: PublicContent = {
    announcements: announcements.data || [],
    gallery: gallery.data || [],
    magazines: magazines.data || [],
    tests: tests.data || [],
    testimonials: testimonials.data || [],
    faqs: faqs.data || [],
  };

  return NextResponse.json(content);
}
