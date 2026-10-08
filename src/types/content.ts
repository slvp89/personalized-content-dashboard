export type ContentType = "news" | "recommendation" | "social";

export type ContentCategory = 
  | "technology" 
  | "business" 
  | "entertainment" 
  | "science" 
  | "sports" 
  | "gaming" 
  | "health";

export interface BaseContentItem {
  id: string;
  type: ContentType;
  title: string;
  summary: string;
  category: ContentCategory;
  publishedAt: string;
  imageUrl?: string;
  source: string;
  url: string;
  likes: number;
  tags: string[];
}

export interface NewsItem extends BaseContentItem {
  type: "news";
  author: string;
  readingTimeMinutes: number;
  fullContent?: string;
}

export interface RecommendationItem extends BaseContentItem {
  type: "recommendation";
  mediaType: "movie" | "music" | "podcast" | "book";
  rating: number; // e.g. 8.7 / 10
  creator: string; // Director, Artist, Author
  genre: string;
  durationOrLength: string; // e.g. "2h 14m" or "48m episode"
  trailerUrl?: string;
}

export interface SocialItem extends BaseContentItem {
  type: "social";
  authorHandle: string;
  authorName: string;
  authorAvatar: string;
  verified: boolean;
  retweets: number;
  replies: number;
  hashtags: string[];
}

export type ContentItem = NewsItem | RecommendationItem | SocialItem;

export interface UserPreferences {
  categories: ContentCategory[];
  darkMode: boolean;
  layout: "grid" | "list" | "compact";
  feedMode: "infinite" | "paginated";
  autoRefreshInterval: number; // in seconds (0 = off)
  language: "en" | "es" | "fr" | "de" | "ja";
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  bio: string;
  joinedDate: string;
}

export interface TrendingItem {
  item: ContentItem;
  rank: number;
  trendingScore: number;
  velocity: string; // e.g. "+38% this hour"
}
