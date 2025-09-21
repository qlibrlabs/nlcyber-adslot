#!/bin/bash

# Build script for NLCyber AdSlot package

set -e

echo "🚀 Building NLCyber AdSlot package..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf node_modules/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run TypeScript compilation
echo "🔨 Building TypeScript..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Output directory: dist/"
    echo "📄 Files created:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Package ready for distribution!"
echo ""
echo "To publish to npm:"
echo "  npm publish"
echo ""
echo "To test locally:"
echo "  npm pack"
echo "  npm install ./nlcyber-adslot-1.0.0.tgz"
