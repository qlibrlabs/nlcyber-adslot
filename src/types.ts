export interface AdStreamPublicAd {
  campaignId: number;
  title: string;
  placement: string;
  format: string;
  img: string;
  width: number;
  height: number;
  alt: string;
  link: string;
  impUrl: string;
  userCap?: number;
  pubDate: string;
}

export interface AdSlotProps {
  /** Ad placement identifier (e.g., "homepage_top", "article_sidebar") */
  placement?: string;
  /** CSS class name for styling */
  className?: string;
  /** Inline styles */
  style?: React.CSSProperties;
  /** Override ad width */
  width?: number;
  /** Override ad height */
  height?: number;
  /** Fallback width when no ad is loaded */
  fallbackWidth?: number;
  /** Fallback height when no ad is loaded */
  fallbackHeight?: number;
  /** Base URL for the ad API (defaults to https://www.nlcyber.com) */
  baseUrl?: string;
  /** Number of ads to fetch for selection (default: 5) */
  adCount?: number;
  /** Custom error message */
  errorMessage?: string;
  /** Custom loading message */
  loadingMessage?: string;
  /** Show "Advertisement" label (default: true) */
  showLabel?: boolean;
  /** Custom label text */
  labelText?: string;
  /** Enable debug logging */
  debug?: boolean;
}

export interface AdSlotConfig {
  /** Base URL for the ad API */
  baseUrl: string;
  /** Default placement */
  defaultPlacement: string;
  /** Default ad count */
  defaultAdCount: number;
  /** Enable debug mode */
  debug: boolean;
}
