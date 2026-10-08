import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { receiveLiveItem } from "@/store/slices/contentSlice";
import { liveIncomingFeedItems } from "@/lib/mockData";

export function useRealtimeFeed() {
  const dispatch = useAppDispatch();
  const isLiveSimulationActive = useAppSelector((state) => state.content.isLiveSimulationActive);
  const autoRefreshInterval = useAppSelector((state) => state.preferences.autoRefreshInterval);
  const nextItemIndexRef = useRef(0);

  useEffect(() => {
    if (!isLiveSimulationActive || autoRefreshInterval <= 0) return;

    // Interval to simulate live feed push events
    const intervalMs = Math.max(autoRefreshInterval * 1000, 15000);
    const timer = setInterval(() => {
      if (liveIncomingFeedItems.length > 0) {
        const itemToPush = liveIncomingFeedItems[nextItemIndexRef.current % liveIncomingFeedItems.length];
        // Clone with refreshed timestamp and unique id
        const freshItem = {
          ...itemToPush,
          id: `${itemToPush.id}-${Date.now()}`,
          publishedAt: new Date().toISOString(),
        };
        dispatch(receiveLiveItem(freshItem));
        nextItemIndexRef.current += 1;
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [dispatch, isLiveSimulationActive, autoRefreshInterval]);
}
