# Testing the Insurance Module

## Local Dev Setup

1. Run `npm install` in the repo root
2. Start the Expo web dev server: `npx expo start --web --port 8081`
3. Wait for bundling to complete (~40-60s on first run)
4. Open `http://localhost:8081` in the browser

## Navigating to the Insurance Module

- From the home screen, click the **Insurance** tab in the bottom navigation bar
- This navigates to `/insurance` which renders a nested tab layout with sub-tabs: Home, Insurance, Top Up, Explore, My Policies, Help
- The Insurance entry point is at `app/(mainTabs)/insurance-entry.js` which does `router.push('/insurance')`

## Key Routes

| Route | Screen | How to Reach |
|-------|--------|-------------|
| `/insurance` | Main Insurance tab | Click Insurance tab from home |
| `/insurance/topup` | Top Up tab | Click Top Up sub-tab |
| `/insurance/explore` | Explore tab | Click Explore sub-tab |
| `/insurance/policies` | My Policies tab | Click My Policies sub-tab |
| `/insurance/help` | Help tab | Click Help sub-tab |
| `/insurance/health-insurance` | Health Insurance dedicated | Click "Health Insurance" card on main tab |
| `/insurance/topup-dedicated` | Top-Up dedicated | Click "Super Top-Up" card on main tab |

The `health-insurance` and `topup-dedicated` routes are hidden from tabs via `href: null` in `_layout.js`.

## Testing Dark Mode

There is **no UI toggle** for dark mode in the app. The dark mode state is managed by a Zustand store (`useInsuranceStore`) with `isDarkMode` and `toggleDarkMode`.

To test dark mode from the browser console, you need to temporarily expose the store on `window`:

1. In `app/components/insurance/store.js`, temporarily add inside the `create()` call:
   ```js
   ...(typeof window !== 'undefined' && (window.__insuranceStore = { getState: () => get(), toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })) }) && {}),
   ```
2. Reload the page
3. In browser console: `window.__insuranceStore.toggleDarkMode()`
4. **Revert the change after testing** - do not commit this

Dark mode affects: container backgrounds, skeleton placeholder backgrounds, StatusBar colors, and tab bar styling. Internal card content sections may still use hardcoded light-mode colors.

## Testing Skeleton Loading

- Skeleton loaders appear automatically on initial page load for ~0.8-1.2s depending on the screen
- On page refresh (F5), you can see the skeleton state briefly before content loads
- Pull-to-refresh also triggers skeleton re-display (sets `isLoading(true)`)

## Testing Pull-to-Refresh

- Pull-to-refresh uses React Native's `RefreshControl`
- **Web limitation**: Pull-to-refresh gesture may not work with mouse on web - this is a known platform limitation
- Pull-to-refresh is primarily a mobile feature; testing on a real device or emulator is recommended for this

## Testing Animations (FadeInSection)

- All content sections are wrapped in `FadeInSection` with staggered delays (100ms-1200ms)
- On page load, sections should fade in and slide up sequentially
- Animation uses React Native's `Animated` API with `useNativeDriver: true`
- On web, the native driver warning may appear in console (`useNativeDriver` falls back to JS-based animation on web) - this is expected

## Known Console Warnings (Not Bugs)

- Route warnings about missing default exports for various component files (unrelated to Insurance module)
- `useNativeDriver` warning - expected on web platform
- `props.pointerEvents` deprecation warning - React Native web compatibility issue

## Project Notes

- No ESLint config or TypeScript in this project
- No CI configured on the repo
- State management: Zustand (`app/components/insurance/store.js`)
- Navigation: Expo Router with nested Tabs layout
- Styling: React Native StyleSheet (no styled-components or similar)
- Gradient backgrounds: `expo-linear-gradient`
