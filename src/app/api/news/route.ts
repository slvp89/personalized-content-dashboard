import { NextResponse } from "next/server";
import { mockContentDataset } from "@/lib/mockData";
import { NewsItem } from "@/types/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q")?.toLowerCase();

  let newsItems = mockContentDataset.filter((item): item is NewsItem => item.type === "news");

  if (category && category !== "all") {
    newsItems = newsItems.filter((item) => item.category === category);
  }

  if (query) {
    newsItems = newsItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    success: true,
    data: newsItems,
    total: newsItems.length,
    timestamp: new Date().toISOString(),
  });
}
