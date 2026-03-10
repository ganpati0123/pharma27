# Testing Apollo 24/7 React Native App

## Overview
This is a React Native app built with Expo and expo-router. It uses Reanimated for animations and expo-linear-gradient for gradient effects.

## Running Locally

1. Install dependencies: `npm install`
2. Start Expo web dev server: `npx expo start --web --port 8081`
3. Open `http://localhost:8081` in browser

## Common Issues

### Metro Bundler "Unable to resolve" errors
If Metro fails to resolve modules that clearly exist on disk, this is usually a cache issue. Fix:
```bash
rm -rf node_modules/.cache .expo
npx expo start --web --port 8081 --clear
```
The `--clear` flag forces Metro to rebuild its module graph from scratch.

This is especially common after switching branches or pulling new files that Metro hasn't indexed yet.

### Route Groups and Imports
The app uses Expo Router with route groups like `app/(mainTabs)/`. Relative imports from inside route group directories (e.g., `../components/...`) work correctly - Metro handles the parenthesized directory names. If resolution fails, it's a cache issue, not a path issue.

## App Structure

- **Home page**: `app/(mainTabs)/index.js` - Main entry with category nav chips (All, Skin, Summer, etc.)
- **Skin page**: Rendered inline when user taps "Skin" chip. Components in `app/components/skin/`
- **Design system**: `app/components/home/theme.js` - Colors, spacing, typography, animation configs

## Testing the Skin Screen

1. Load the app at `http://localhost:8081`
2. Verify Home page renders (header with "Namaste Guest", service cards, category nav)
3. Click the "Skin" chip (second chip in category nav bar)
4. Verify Skin Screen loads with "ROSE GOLD EDITION" badge and "Skincare" title
5. Scroll through all 12 sections: Skin Concerns, Sunscreen Banner, Trusted Brands, Key Ingredients, Explore Categories, Skincare Carnival, AI Expert, Dynamic Products, Bank Carousel, Fresh Skin, 6-Step Routine, Footer
6. Click "All" chip to return to Home and verify it renders correctly

## Notes
- No CI/CD configured (no lint/test/typecheck scripts in package.json)
- No authentication required - purely frontend app
- Bottom nav bar has: Home, Doctors, Pharmacy, Lab Tests, Insurance, My Health
- The app renders well in desktop browser width; it's designed mobile-first but works on web

## Devin Secrets Needed
None - no authentication or API keys required for local testing.
