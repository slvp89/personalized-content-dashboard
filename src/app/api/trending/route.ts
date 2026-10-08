import { NextResponse } from "next/server";
import { mockContentDataset } from "@/lib/mockData";
import { TrendingItem } from "@/types/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  // Sort items by likes descending to simulate top trending
  let sorted = [...mockContentDataset].sort((a, b) => b.likes - a.likes);

  if (category && category !== "all") {
    sorted = sorted.filter((item) => item.category === category);
  }

  const velocities = ["+64% this hour", "+48% today", "+37% this hour", "+29% today", "+22% today", "+18% this hour", "+15% today", "+12% today"];

  const trending: TrendingItem[] = sorted.slice(0, 8).map((item, index) => ({
    item,
    rank: index + 1,
    trendingScore: Math.round(item.likes * 1.45 + (10 - index) * 120),
    velocity: velocities[index % velocities.length],
  }));

  return NextResponse.json({
    success: true,
    data: trending,
    total: trending.length,
    timestamp: new Date().toISOString(),
  });
}
