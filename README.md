# @nlcyber/adslot

A React component for displaying NLCyber advertisements on third-party websites. This package provides an easy-to-integrate ad slot component with built-in tracking, frequency capping, and responsive design.

## Features

- 🎯 **Smart Ad Selection** - Weighted rotation with priority tiers
- 📊 **Frequency Capping** - Limits impressions per user per day
- 🔒 **Secure Tracking** - JWT-based click and impression tracking
- 📱 **Responsive Design** - Works on desktop and mobile
- 🎨 **Customizable** - Flexible styling and configuration options
- 🐛 **Debug Mode** - Built-in debugging and logging
- ♿ **Accessible** - ARIA labels and semantic HTML
- 🚀 **TypeScript** - Full TypeScript support

## Installation

```bash
npm install @nlcyber/adslot
# or
yarn add @nlcyber/adslot
# or
pnpm add @nlcyber/adslot
```

## Quick Start

```tsx
import React from 'react';
import { AdSlot } from '@nlcyber/adslot';

function App() {
  return (
    <div>
      <h1>My Website</h1>
      <AdSlot placement="homepage_top" />
    </div>
  );
}

export default App;
```

## Basic Usage

### Simple Integration

```tsx
import { AdSlot } from '@nlcyber/adslot';

// Basic ad slot
<AdSlot placement="homepage_top" />

// With custom styling
<AdSlot 
  placement="article_sidebar"
  className="my-ad-class"
  style={{ margin: "20px 0" }}
/>
```

### Advanced Configuration

```tsx
import { AdSlot } from '@nlcyber/adslot';

<AdSlot
  placement="homepage_top"
  baseUrl="https://www.nlcyber.com"
  width={728}
  height={90}
  adCount={5}
  showLabel={true}
  labelText="Advertisement"
  debug={false}
  errorMessage="Ad unavailable"
  loadingMessage="Loading ad..."
/>
```

## Props

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

## Available Placements

- `homepage_top` - Banner ads (728x90)
- `article_sidebar` - Sidebar ads (300x250)
- Custom placements can be configured

## Integration Examples

### Next.js

```tsx
// pages/index.tsx
import { AdSlot } from '@nlcyber/adslot';

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to My Site</h1>
      <AdSlot placement="homepage_top" />
      
      <main>
        <p>Your content here...</p>
      </main>
      
      <AdSlot placement="article_sidebar" />
    </div>
  );
}
```

### Create React App

```tsx
// src/App.js
import React from 'react';
import { AdSlot } from '@nlcyber/adslot';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App</h1>
        <AdSlot 
          placement="homepage_top"
          className="header-ad"
        />
      </header>
      
      <main>
        <AdSlot 
          placement="article_sidebar"
          style={{ float: 'right', margin: '0 0 20px 20px' }}
        />
        <p>Your main content...</p>
      </main>
    </div>
  );
}

export default App;
```

### Gatsby

```tsx
// src/pages/index.js
import React from 'react';
import { AdSlot } from '@nlcyber/adslot';
import Layout from '../components/layout';

const IndexPage = () => {
  return (
    <Layout>
      <h1>Home Page</h1>
      <AdSlot placement="homepage_top" />
      
      <div className="content">
        <p>Your content here...</p>
      </div>
    </Layout>
  );
};

export default IndexPage;
```

### WordPress (React Integration)

```php
// WordPress theme with React
function enqueue_nlcyber_adslot() {
    wp_enqueue_script('react');
    wp_enqueue_script('react-dom');
    wp_enqueue_script('nlcyber-adslot', 'https://unpkg.com/@nlcyber/adslot/dist/index.js');
}
add_action('wp_enqueue_scripts', 'enqueue_nlcyber_adslot');
```

```html
<!-- In your WordPress template -->
<div id="ad-container"></div>
<script>
  const { AdSlot } = window.nlcyberAdslot;
  const { createElement } = React;
  
  ReactDOM.render(
    createElement(AdSlot, { placement: 'homepage_top' }),
    document.getElementById('ad-container')
  );
</script>
```

## Styling

### CSS Classes

The component adds the following CSS classes for styling:

- `.nlcyber-adslot` - Main ad container
- `.nlcyber-adslot-loading` - Loading state
- `.nlcyber-adslot-error` - Error state

### Custom Styling

```css
/* Custom ad styling */
.nlcyber-adslot {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.2s ease;
}

.nlcyber-adslot:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

/* Loading state */
.nlcyber-adslot-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Debug Mode

Enable debug mode to see detailed logging:

```tsx
<AdSlot 
  placement="homepage_top"
  debug={true}
/>
```

Debug output includes:
- API requests and responses
- Ad selection logic
- Frequency capping decisions
- Click and impression tracking

## API Integration

The component automatically handles:

- **Ad Fetching** - Retrieves ads from the NLCyber API
- **Frequency Capping** - Uses localStorage to track user impressions
- **Click Tracking** - Tracks clicks with secure JWT tokens
- **Impression Tracking** - Fires 1x1 pixel for impression counting
- **Error Handling** - Graceful fallbacks for network issues

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11 (with polyfills)

## TypeScript Support

Full TypeScript definitions are included:

```tsx
import { AdSlot, AdSlotProps, AdStreamPublicAd } from '@nlcyber/adslot';

interface MyComponentProps {
  adPlacement: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ adPlacement }) => {
  return (
    <AdSlot 
      placement={adPlacement}
      onAdLoad={(ad: AdStreamPublicAd) => {
        console.log('Ad loaded:', ad.title);
      }}
    />
  );
};
```

## Performance

- **Lazy Loading** - Ads are fetched only when the component mounts
- **Caching** - Uses browser caching for API responses
- **Minimal Bundle** - Small footprint with no external dependencies
- **Efficient Rendering** - Optimized React rendering with proper cleanup

## Security

- **JWT Tokens** - Secure tracking with short-lived tokens
- **CORS Support** - Proper cross-origin request handling
- **No Persistent IDs** - Privacy-friendly frequency capping
- **Input Validation** - Safe parameter handling

## Troubleshooting

### Common Issues

**Ads not loading:**
- Check network connectivity
- Verify the `baseUrl` is correct
- Enable debug mode to see error details
- Check browser console for CORS errors

**Styling issues:**
- Ensure the container has proper dimensions
- Check for CSS conflicts
- Use the provided CSS classes for consistent styling

**TypeScript errors:**
- Make sure you're using the latest version
- Check that React types are properly installed
- Verify import statements

### Debug Checklist

1. Enable debug mode: `<AdSlot debug={true} />`
2. Check browser console for error messages
3. Verify API endpoint is accessible
4. Test with different placements
5. Check localStorage for frequency capping data

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@nlcyber.com
- 🐛 Issues: [GitHub Issues](https://github.com/qlibrlabs/nlcyber-adslot/issues)
- 📖 Documentation: [NLCyber Docs](https://docs.nlcyber.com)

## Changelog

### v1.0.0
- Initial release
- React component for NLCyber ad integration
- TypeScript support
- Frequency capping
- Secure tracking
- Responsive design
