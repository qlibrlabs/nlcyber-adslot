# API Reference

## AdSlot Component

The main React component for displaying NLCyber advertisements.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placement` | `string` | `"homepage_top"` | Ad placement identifier |
| `className` | `string` | `""` | CSS class name for styling |
| `style` | `React.CSSProperties` | `{}` | Inline styles |
| `width` | `number` | `undefined` | Override ad width |
| `height` | `number` | `undefined` | Override ad height |
| `fallbackWidth` | `number` | `728` | Fallback width when no ad is loaded |
| `fallbackHeight` | `number` | `90` | Fallback height when no ad is loaded |
| `baseUrl` | `string` | `"https://www.nlcyber.com"` | Base URL for the ad API |
| `adCount` | `number` | `5` | Number of ads to fetch for selection |
| `errorMessage` | `string` | `"Ad unavailable"` | Custom error message |
| `loadingMessage` | `string` | `"Loading ad..."` | Custom loading message |
| `showLabel` | `boolean` | `true` | Show "Advertisement" label |
| `labelText` | `string` | `"Advertisement"` | Custom label text |
| `debug` | `boolean` | `false` | Enable debug logging |

### Example Usage

```tsx
import { AdSlot } from 'nlcyber-adslot';

// Basic usage
<AdSlot placement="homepage_top" />

// Advanced configuration
<AdSlot
  placement="article_sidebar"
  baseUrl="https://www.nlcyber.com"
  width={300}
  height={250}
  debug={true}
  showLabel={true}
  labelText="Sponsored Content"
/>
```

## Types

### AdStreamPublicAd

```typescript
interface AdStreamPublicAd {
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
```

### AdSlotProps

```typescript
interface AdSlotProps {
  placement?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
  fallbackWidth?: number;
  fallbackHeight?: number;
  baseUrl?: string;
  adCount?: number;
  errorMessage?: string;
  loadingMessage?: string;
  showLabel?: boolean;
  labelText?: string;
  debug?: boolean;
}
```

## Available Placements

- `homepage_top` - Banner ads (728x90)
- `article_sidebar` - Sidebar ads (300x250)
- Custom placements can be configured

## API Endpoints

The component automatically calls these endpoints:

- `GET /api/ads` - Fetch ads for a placement
- `GET /api/clk` - Click tracking
- `GET /api/i.gif` - Impression tracking

## Error Handling

The component gracefully handles:
- Network errors
- Invalid API responses
- Missing ads
- Image loading failures
- localStorage errors
