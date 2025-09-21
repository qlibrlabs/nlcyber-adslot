# Integration Guide

This guide covers different ways to integrate the NLCyber AdSlot component into your website.

## Installation Methods

### 1. NPM Package (Recommended for React projects)

```bash
npm install @nlcyber/adslot
```

```tsx
import { AdSlot } from '@nlcyber/adslot';

function App() {
  return <AdSlot placement="homepage_top" />;
}
```

### 2. CDN (For HTML/JavaScript)

```html
<!-- Include React first -->
<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

<!-- Include NLCyber AdSlot -->
<script src="https://unpkg.com/@nlcyber/adslot@latest/dist/nlcyber-adslot.js"></script>

<script>
  const { AdSlot } = window.nlcyberAdslot;
  ReactDOM.render(
    React.createElement(AdSlot, { placement: 'homepage_top' }),
    document.getElementById('ad-container')
  );
</script>
```

### 3. Direct Download

Download the built files from GitHub releases and host them yourself.

## Framework-Specific Integration

### Next.js

```tsx
// pages/index.tsx
import { AdSlot } from '@nlcyber/adslot';

export default function HomePage() {
  return (
    <div>
      <h1>My Website</h1>
      <AdSlot placement="homepage_top" />
    </div>
  );
}
```

### Create React App

```jsx
// src/App.js
import React from 'react';
import { AdSlot } from '@nlcyber/adslot';

function App() {
  return (
    <div className="App">
      <AdSlot placement="homepage_top" />
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
    </Layout>
  );
};

export default IndexPage;
```

### WordPress

For WordPress sites, you can use the CDN method or create a custom plugin.

```php
// In your WordPress theme
function enqueue_nlcyber_adslot() {
    wp_enqueue_script('react', 'https://unpkg.com/react@18/umd/react.production.min.js');
    wp_enqueue_script('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js');
    wp_enqueue_script('nlcyber-adslot', 'https://unpkg.com/@nlcyber/adslot@latest/dist/nlcyber-adslot.js');
}
add_action('wp_enqueue_scripts', 'enqueue_nlcyber_adslot');
```

## Styling

### CSS Classes

The component adds these CSS classes:
- `.nlcyber-adslot` - Main ad container
- `.nlcyber-adslot-loading` - Loading state
- `.nlcyber-adslot-error` - Error state

### Custom Styling

```css
.nlcyber-adslot {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nlcyber-adslot:hover {
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
```

## Configuration

### Environment Variables

For development, you can set:
```env
REACT_APP_NLCYBER_DEBUG=true
REACT_APP_NLCYBER_BASE_URL=https://www.nlcyber.com
```

### Debug Mode

Enable debug mode to see detailed logging:

```tsx
<AdSlot 
  placement="homepage_top"
  debug={process.env.NODE_ENV === 'development'}
/>
```

## Best Practices

1. **Placement Strategy**: Use appropriate placements for different page sections
2. **Loading States**: Always provide fallback content for loading states
3. **Error Handling**: Handle cases where ads fail to load
4. **Performance**: Use lazy loading for ads below the fold
5. **Accessibility**: Ensure ads don't interfere with screen readers

## Troubleshooting

### Common Issues

1. **Ads not loading**: Check network connectivity and API endpoint
2. **CORS errors**: Ensure your domain is whitelisted
3. **Styling issues**: Check for CSS conflicts
4. **TypeScript errors**: Ensure proper type imports

### Debug Checklist

1. Enable debug mode
2. Check browser console for errors
3. Verify API endpoint accessibility
4. Test with different placements
5. Check localStorage for frequency capping
