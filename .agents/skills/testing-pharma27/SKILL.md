# Testing Pharma27 React Native App

## Overview
Pharma27 is an Expo-based React Native healthcare super-app (Apollo 24/7 clone) with tab navigation, animated carousels, and a modular Home screen.

## Environment Setup

### Dependencies
```bash
npm install
```

### Web Platform (required for browser testing)
The project may not include web deps by default. If `npx expo start --web` fails with missing `react-native-web`:
```bash
npx expo install react-native-web react-dom @expo/metro-runtime
```

### Start Dev Server
```bash
npx expo start --web --port 8081
```
The app will be available at `http://localhost:8081`.

**Note:** Initial bundle takes ~20s. The page may appear partially loaded while animations initialize — wait 2-3 seconds for full render.

## Project Structure
- `app/(mainTabs)/index.js` — Main Home screen (~960 lines)
- `app/(mainTabs)/_layout.js` — Tab bar layout (6 tabs)
- `app/(mainTabs)/BuyAgainScreen.js` — Buy Again detail screen
- `app/components/home/theme.js` — Design system tokens
- `app/components/home/HeroAndServices.js` — Hero, services grid, prescription bar
- `app/components/home/ShoppingSection.js` — Buy Again, medicine carousel, bank offers
- `app/components/home/DiscoverSection.js` — Curated offerings, content cards, Ask Apollo, trust badges, footer
- `app/{doctors,pharmacy,labtests,insurance,myhealth}/index.js` — Placeholder tab screens

## Key Test Flows

### 1. Home Screen Full Render
- Load `http://localhost:8081`
- Verify 14 sections render: Header, Search bar, Category nav, Hero, Services grid, Prescription banner, Buy Again, Medicine cards, Bank offers carousel, Curated offerings, Promotion banners, Content cards, Ask Apollo carousel, Trust badges, Footer
- Verify exactly 6 tabs at bottom: Home, Doctors, Pharmacy, Lab Tests, Insurance, My Health

### 2. Add to Cart
- Scroll to Buy Again section
- Click green "Add" button on any medicine card
- Verify: button changes to quantity counter (- N +), cart badge in header updates

### 3. View All → BuyAgainScreen → Back
- Click "View All >" in Buy Again section header
- Verify BuyAgainScreen loads at `/BuyAgainScreen`
- Click back chevron (top-left) — should return to Home with cart state preserved

### 4. Tab Navigation
- Click any tab (e.g., Doctors) — should navigate to placeholder screen
- Click Home tab — should return to Home screen

### 5. Auto-Scrolling Carousels
- Bank Offers carousel auto-scrolls through bank cards
- Ask Apollo poster carousel auto-scrolls through health topics
- Both should scroll smoothly without glitches

## Known Patterns & Gotchas
- Tab entry files (e.g., `doctors-entry.js`) use `router.push()` in `useEffect` to redirect tabs to stack screens — this is a fragile pattern that may cause flicker on slower devices
- `BuyAgainScreen.js` lives in `(mainTabs)/` but is hidden from the tab bar via `href: null` in the layout
- No lint/typecheck/CI scripts are configured in this project
- The app uses `react-native-reanimated` v4 worklets extensively — the babel plugin is auto-included via `babel-preset-expo`
- All components use `React.memo` with `useCallback`/`useMemo` for performance

## Devin Secrets Needed
None — this is a purely frontend app with no auth or API keys required.
