import React, { useEffect, useRef, useState } from "react";
import { AdStreamPublicAd, AdSlotProps } from "./types";

// Utility functions for frequency capping
function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function capKey(cid: number): string {
  return `nlcyber_adCap:${cid}:${todayKey()}`;
}

function getCapCount(cid: number): number {
  if (typeof window === "undefined") return 0;
  try {
    return Number(localStorage.getItem(capKey(cid)) ?? "0");
  } catch {
    return 0;
  }
}

function bumpCap(cid: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(capKey(cid), String(getCapCount(cid) + 1));
  } catch {
    // Ignore localStorage errors
  }
}

// Default configuration
const DEFAULT_CONFIG = {
  baseUrl: "https://www.nlcyber.com",
  defaultPlacement: "homepage_top",
  defaultAdCount: 5,
  debug: false,
};

export default function AdSlot({
  placement = DEFAULT_CONFIG.defaultPlacement,
  className = "",
  style = {},
  width,
  height,
  fallbackWidth = 728,
  fallbackHeight = 90,
  baseUrl = DEFAULT_CONFIG.baseUrl,
  adCount = DEFAULT_CONFIG.defaultAdCount,
  errorMessage = "Ad unavailable",
  loadingMessage = "Loading ad...",
  showLabel = true,
  labelText = "Advertisement",
  debug = DEFAULT_CONFIG.debug,
}: AdSlotProps) {
  const [ad, setAd] = useState<AdStreamPublicAd | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const seenRef = useRef(false);

  // Build API URL
  const apiUrl = `${baseUrl}/api/ads?placement=${encodeURIComponent(placement)}&n=${Math.min(adCount, 20)}`;

  useEffect(() => {
    let cancelled = false;

    const fetchAd = async () => {
      try {
        setLoading(true);
        setError(null);

        if (debug) {
          console.log(`[NLCyber AdSlot] Fetching ads from: ${apiUrl}`);
        }

        const res = await fetch(apiUrl, { 
          cache: "no-store",
          mode: "cors",
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch ads: ${res.status} ${res.statusText}`);
        }

        const items: AdStreamPublicAd[] = await res.json();

        if (cancelled) return;

        if (debug) {
          console.log(`[NLCyber AdSlot] Received ${items.length} ads for placement: ${placement}`);
        }

        // Find an ad that hasn't exceeded user cap
        const candidate = items.find(
          (x) => getCapCount(x.campaignId) < (x.userCap || 3)
        ) ?? items[0];

        if (candidate) {
          if (debug) {
            console.log(`[NLCyber AdSlot] Selected ad: ${candidate.title} (ID: ${candidate.campaignId})`);
          }
          setAd(candidate);
        } else {
          if (debug) {
            console.log(`[NLCyber AdSlot] No eligible ads found for placement: ${placement}`);
          }
          setAd(null);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMsg = err instanceof Error ? err.message : "Failed to load ad";
          setError(errorMsg);
          if (debug) {
            console.error("[NLCyber AdSlot] Fetch error:", err);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchAd();
    return () => {
      cancelled = true;
    };
  }, [apiUrl, placement, adCount, debug]);

  useEffect(() => {
    if (ad && !seenRef.current) {
      seenRef.current = true;
      bumpCap(ad.campaignId);

      if (debug) {
        console.log(`[NLCyber AdSlot] Tracking impression for ad: ${ad.campaignId}`);
      }

      // Fire impression tracking
      fetch(ad.impUrl, {
        mode: "no-cors",
        cache: "no-store",
      }).catch((err) => {
        if (debug) {
          console.warn("[NLCyber AdSlot] Impression tracking failed:", err);
        }
      });
    }
  }, [ad, debug]);

  // Loading state
  if (loading) {
    return (
      <div
        className={`nlcyber-adslot-loading ${className}`}
        style={{
          width: width || fallbackWidth,
          height: height || fallbackHeight,
          display: "inline-block",
          backgroundColor: "#f5f5f5",
          border: "1px dashed #ccc",
          borderRadius: "4px",
          ...style,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#666",
            fontSize: "12px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {loadingMessage}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className={`nlcyber-adslot-error ${className}`}
        style={{
          width: width || fallbackWidth,
          height: height || fallbackHeight,
          display: "inline-block",
          backgroundColor: "#f5f5f5",
          border: "1px dashed #ccc",
          borderRadius: "4px",
          ...style,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#999",
            fontSize: "11px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {errorMessage}
        </div>
      </div>
    );
  }

  // No ad available
  if (!ad) {
    return null;
  }

  // Use configured dimensions or ad dimensions
  const displayWidth = width || ad.width;
  const displayHeight = height || ad.height;

  return (
    <div
      className={`nlcyber-adslot ${className}`}
      style={{
        width: displayWidth,
        height: displayHeight,
        display: "inline-block",
        ...style,
      }}
    >
      <a
        href={ad.link}
        aria-label={ad.title}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block" }}
        onClick={() => {
          if (debug) {
            console.log(`[NLCyber AdSlot] Ad clicked: ${ad.title} (ID: ${ad.campaignId})`);
          }
        }}
      >
        <img
          src={ad.img}
          width={displayWidth}
          height={displayHeight}
          alt={ad.alt}
          style={{
            display: "block",
            width: displayWidth,
            height: displayHeight,
            objectFit: width || height ? "cover" : "contain",
            borderRadius: "4px",
          }}
          onError={(e) => {
            if (debug) {
              console.warn("[NLCyber AdSlot] Ad image failed to load:", ad.img);
            }
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      </a>
      {showLabel && (
        <div
          style={{
            fontSize: 11,
            color: "#666",
            marginTop: 2,
            textAlign: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          {labelText}
        </div>
      )}
    </div>
  );
}
