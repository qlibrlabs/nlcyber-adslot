# Troubleshooting Guide

This guide helps you resolve common issues when using the NLCyber AdSlot component.

## Common Issues

### Ads Not Loading

**Symptoms:**
- Ad slot shows loading state indefinitely
- Error message "Ad unavailable" appears
- No ads display on the page

**Possible Causes:**
1. Network connectivity issues
2. Incorrect API endpoint
3. CORS policy blocking requests
4. Invalid placement parameter

**Solutions:**
1. Check network connectivity
2. Verify the `baseUrl` prop is correct
3. Enable debug mode to see detailed error messages
4. Test the API endpoint directly in browser
5. Check browser console for CORS errors

```tsx
<AdSlot 
  placement="homepage_top"
  baseUrl="https://www.nlcyber.com"
  debug={true}
/>
```

### CORS Errors

**Symptoms:**
- Console shows "Access to fetch at '...' from origin '...' has been blocked by CORS policy"
- Ads fail to load with network errors

**Solutions:**
1. Ensure your domain is whitelisted on the NLCyber server
2. Use the correct `baseUrl` prop
3. Contact NLCyber support to add your domain to CORS whitelist

### TypeScript Errors

**Symptoms:**
- TypeScript compiler errors
- IDE showing type errors
- Build failures

**Solutions:**
1. Ensure you're using the latest version
2. Check that React types are properly installed
3. Verify import statements

```bash
npm install @types/react @types/react-dom
```

```tsx
import { AdSlot, AdSlotProps } from '@nlcyber/adslot';
```

### Styling Issues

**Symptoms:**
- Ads appear with wrong dimensions
- CSS conflicts with existing styles
- Responsive layout problems

**Solutions:**
1. Use the provided CSS classes for consistent styling
2. Override styles with higher specificity
3. Use the `style` prop for inline styles
4. Check for CSS conflicts

```css
.nlcyber-adslot {
  /* Your custom styles */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
}
```

### Frequency Capping Issues

**Symptoms:**
- Same ad shows repeatedly
- Ads stop showing after a few impressions
- localStorage errors

**Solutions:**
1. Check localStorage is available and not blocked
2. Clear localStorage to reset frequency capping
3. Adjust `userCap` values in campaign settings

```javascript
// Clear frequency capping data
localStorage.clear();
```

### Performance Issues

**Symptoms:**
- Slow page loading
- High memory usage
- Multiple API requests

**Solutions:**
1. Use lazy loading for ads below the fold
2. Implement proper cleanup in useEffect
3. Monitor network requests in dev tools

```tsx
import { lazy, Suspense } from 'react';

const AdSlot = lazy(() => import('@nlcyber/adslot').then(module => ({ default: module.AdSlot })));

function App() {
  return (
    <Suspense fallback={<div>Loading ad...</div>}>
      <AdSlot placement="homepage_top" />
    </Suspense>
  );
}
```

## Debug Mode

Enable debug mode to get detailed logging:

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
- Error details

## Browser Compatibility

### Supported Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11 (with polyfills)

### Polyfills for IE11

If you need to support Internet Explorer 11, add these polyfills:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es6,fetch,Promise"></script>
```

## Getting Help

### Before Reporting Issues

1. Check this troubleshooting guide
2. Enable debug mode and check console logs
3. Test with different browsers
4. Verify your environment setup

### Reporting Issues

When reporting issues, include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Environment details (OS, browser, React version)
- Debug logs (if available)
- Screenshots or videos

### Contact Information

- 📧 Email: support@nlcyber.com
- 🐛 Issues: [GitHub Issues](https://github.com/nlcyber/nlcyber-adslot/issues)
- 📖 Documentation: [NLCyber Docs](https://docs.nlcyber.com)

## Testing Checklist

Before deploying to production:

- [ ] Test with different placements
- [ ] Verify ads load correctly
- [ ] Check click tracking works
- [ ] Test impression tracking
- [ ] Verify frequency capping
- [ ] Test error handling
- [ ] Check responsive design
- [ ] Test with different browsers
- [ ] Verify accessibility
- [ ] Check performance impact
