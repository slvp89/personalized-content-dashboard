import { NextResponse } from "next/server";
import { mockContentDataset } from "@/lib/mockData";
import { ContentItem } from "@/types/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoriesParam = searchParams.get("categories"); // comma separated
  const typeParam = searchParams.get("type"); // "all" | "news" | "recommendation" | "social"
  const query = searchParams.get("q")?.toLowerCase();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  let results: ContentItem[] = [...mockContentDataset];

  // Filter by Type
  if (typeParam && typeParam !== "all") {
    results = results.filter((item) => item.type === typeParam);
  }

  // Filter by user preference categories
  if (categoriesParam && categoriesParam !== "all") {
    const selectedCategories = categoriesParam.split(",").map((c) => c.trim().toLowerCase());
    results = results.filter((item) => selectedCategories.includes(item.category.toLowerCase()));
  }

  // Filter by Search Query
  if (query) {
    results = results.filter((item) => {
      const matchTitle = item.title.toLowerCase().includes(query);
      const matchSummary = item.summary.toLowerCase().includes(query);
      const matchSource = item.source.toLowerCase().includes(query);
      const matchTags = item.tags.some((t) => t.toLowerCase().includes(query));

      let matchExtra = false;
      if (item.type === "news") {
        matchExtra = item.author.toLowerCase().includes(query);
      } else if (item.type === "recommendation") {
        matchExtra = item.creator.toLowerCase().includes(query) || item.genre.toLowerCase().includes(query);
      } else if (item.type === "social") {
        matchExtra =
          item.authorName.toLowerCase().includes(query) ||
          item.authorHandle.toLowerCase().includes(query) ||
          item.hashtags.some((h) => h.toLowerCase().includes(query));
      }

      return matchTitle || matchSummary || matchSource || matchTags || matchExtra;
    });
  }

  // Sort by published date descending
  results.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Pagination slice
  const startIndex = (page - 1) * limit;
  const paginatedData = results.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    success: true,
    data: paginatedData,
    pagination: {
      page,
      limit,
      total: results.length,
      totalPages: Math.ceil(results.length / limit) || 1,
      hasMore: startIndex + limit < results.length,
    },
    timestamp: new Date().toISOString(),
  });
}
