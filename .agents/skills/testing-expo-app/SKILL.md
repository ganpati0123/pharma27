# Testing Pharma27 Expo App

## Overview
This is a React Native app built with Expo SDK 54 and expo-router. It supports web testing via `expo start --web`.

## Setup
1. Run `npm install` in the repo root
2. Start the dev server: `npx expo start --web --port 8081`
3. Wait for bundling to complete (~30-60 seconds for first build)
4. Open `http://localhost:8081` in Chrome

## App Navigation Structure
- Main tabs are in `app/(mainTabs)/` - home, pharmacy, doctors, lab tests, insurance
- Each main feature has its own nested tab layout (e.g., `app/myhealth/_layout.js`)
- Entry files like `myhealth-entry.js` redirect to the feature's nested tabs via `router.push('/myhealth')`
- Direct URL access works: `http://localhost:8081/myhealth`, `http://localhost:8081/myhealth/records`, etc.

## Testing My Health Tabs
- Navigate to `http://localhost:8081/myhealth` to land on the My Health tab (index.js)
- Bottom tab bar has: Home (back), My Health, Records, My Meds, Insights, Assistant
- Click each tab to verify it renders without crashes
- Scroll down on each tab to verify all sections load
- Check browser console (F12) for JavaScript errors

## Key Technical Notes
- Uses `expo-linear-gradient` for gradient headers
- Uses `@expo/vector-icons` Ionicons - some icon names may not exist on web (they render blank instead of crashing)
- React Native 0.81.5 supports the `gap` flexbox property
- `react-native-web` is included for web support
- No backend - all data is mocked/static

## Common Issues
- First bundle takes 30-60 seconds; subsequent loads are faster with caching
- Some Ionicons may not render on web - this is expected behavior, not a crash
- The `back` tab in myhealth layout uses `router.replace('/')` to go back to main tabs

## Devin Secrets Needed
None - this is a purely frontend app with no backend or authentication.
