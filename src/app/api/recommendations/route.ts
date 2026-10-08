import { NextResponse } from "next/server";
import { mockContentDataset } from "@/lib/mockData";
import { RecommendationItem } from "@/types/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const mediaType = searchParams.get("mediaType");
  const query = searchParams.get("q")?.toLowerCase();

  let recItems = mockContentDataset.filter(
    (item): item is RecommendationItem => item.type === "recommendation"
  );

  if (category && category !== "all") {
    recItems = recItems.filter((item) => item.category === category);
  }

  if (mediaType && mediaType !== "all") {
    recItems = recItems.filter((item) => item.mediaType === mediaType);
  }

  if (query) {
    recItems = recItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.creator.toLowerCase().includes(query) ||
        item.genre.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    success: true,
    data: recItems,
    total: recItems.length,
    timestamp: new Date().toISOString(),
  });
}
