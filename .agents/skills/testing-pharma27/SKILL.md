# Testing Pharma27 Expo App

## Overview
Pharma27 is a React Native + Expo healthcare super-app (Apollo 24|7 clone). It uses expo-router for file-based routing with nested tab navigators.

## Running Locally

1. Install dependencies: `npm install` (from repo root)
2. Start Expo web server: `npx expo start --web --port 8081`
   - Port 8081 may be in use; accept the prompt to use an alternate port (e.g., 8082)
   - The server runs as a foreground process - use a background shell
3. Open `http://localhost:<port>` in Chrome
4. The app loads to the Home screen with bottom tab navigation

## App Structure

- **Main tabs** (`app/(mainTabs)/`): Home, Doctors, Pharmacy, Lab Tests, Insurance, My Health
- **Doctors sub-tabs** (`app/doctors/`): Doctors (index), Online, Surgery, On-Time, Assistant
  - Each sub-tab has its own bottom tab bar within the Doctors section
  - The "Home" tab in the Doctors sub-nav navigates back to the main Home screen

## Testing Navigation

- Click "Doctors" in the main bottom tab bar to enter the Doctors section
- The Doctors section has its own nested bottom tabs: Home (back), Doctors, Online, Surgery, On-Time, Assistant
- Active tab is highlighted in Apollo Orange (#E05A2B)
- Scrollable screens (Doctors, Surgery) show a "Go To Top" button after scrolling ~500px
- Floating "Ask Apollo" bubble appears on most screens with a bobbing animation

## Key Testing Points

- **Search bar animation**: The search bar placeholder text rotates every 3 seconds with a fade transition
- **Surgery hero text**: Cycles between "Expert Surgeons", "World-Class Hospitals", "Advanced Technology"
- **Floating bubble**: Should have a continuous bobbing animation (translateY)
- **Tab switching**: All 5 sub-tabs should render without crashes
- **Scroll performance**: Uses scrollEventThrottle={16} for smooth scroll tracking

## Build Verification

- Run `npx expo export --platform web` to verify the build compiles without errors
- No CI checks are configured on this repo currently

## Known Considerations

- All icons use emoji placeholders rather than custom image assets
- All data is mock/hardcoded in `DoctorsTheme.js` - no real API calls
- Files use `.js` extension (not `.ts`) following existing repo convention
- Package version warnings may appear on startup but don't affect functionality

## Devin Secrets Needed

None - this is a local-only Expo app with no authentication or API keys required.
