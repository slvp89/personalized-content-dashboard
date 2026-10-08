import { NextResponse } from "next/server";
import { mockContentDataset } from "@/lib/mockData";
import { SocialItem } from "@/types/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const hashtag = searchParams.get("hashtag");
  const query = searchParams.get("q")?.toLowerCase();

  let socialItems = mockContentDataset.filter(
    (item): item is SocialItem => item.type === "social"
  );

  if (category && category !== "all") {
    socialItems = socialItems.filter((item) => item.category === category);
  }

  if (hashtag) {
    const cleanTag = hashtag.replace("#", "").toLowerCase();
    socialItems = socialItems.filter((item) =>
      item.hashtags.some((h) => h.toLowerCase() === cleanTag)
    );
  }

  if (query) {
    socialItems = socialItems.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.authorName.toLowerCase().includes(query) ||
        item.authorHandle.toLowerCase().includes(query) ||
        item.hashtags.some((h) => h.toLowerCase().includes(query))
    );
  }

  return NextResponse.json({
    success: true,
    data: socialItems,
    total: socialItems.length,
    timestamp: new Date().toISOString(),
  });
}
