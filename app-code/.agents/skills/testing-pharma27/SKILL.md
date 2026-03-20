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

#### Browser Testing
```bash
npx expo start --web --port 8081
```
The app will be available at `http://localhost:8081`.

#### Mobile Device Testing (Expo Go)
```bash
npx expo start --tunnel
```
- First run will prompt to install `@expo/ngrok@^4.1.0` globally — answer Y
- Once tunnel is ready, a QR code and `exp://` URL will be displayed
- Scan QR code with Expo Go (Android) or Camera app (iOS)
- Web version is also available at `http://localhost:8081` simultaneously

**Note:** Initial bundle takes ~20s. The page may appear partially loaded while animations initialize — wait 2-3 seconds for full render.

## Project Structure
- `app/(mainTabs)/index.js` — Main Home screen (~960 lines)
- `app/(mainTabs)/_layout.js` — Tab bar layout (6 tabs)
- `app/(mainTabs)/BuyAgainScreen.js` — Buy Again detail screen
- `app/cart.js` — Cart screen (~1013 lines) with quantity controls, price breakdown
- `app/account.js` — Account/profile screen (~919 lines) with menu, orders, settings
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

### 2. Add to Cart (Medicine Interaction)
- Scroll to Buy Again section
- Click green "Add" button on any medicine card
- Verify: button changes to quantity counter (- N +), cart badge in header updates
- Click "+" to increment — counter and badge should both update
- Add a second medicine — badge should reflect total count across all medicines

### 3. Cart Page
- Click cart icon (top-right, next to search bar) to navigate to `/cart`
- Verify "My Cart" header with item count badge
- Verify 3 pre-loaded items: Dolo 650 (₹84), Augmentin 625 (₹228), Cetrizine 10mg (₹18)
- Test quantity increment: click "+" on any item, verify price updates (e.g. Augmentin ₹228 → ₹456 at qty 2)
- Verify delivery fee logic: FREE when subtotal > ₹500, otherwise ₹49
- Verify Price Details section: Subtotal, Discount, Delivery Fee, Total
- Verify "Proceed to Checkout" button at bottom
- Click back arrow (top-left) to return to Home — cart state should be preserved

### 4. Account Page
- Click profile avatar (top-right, gold-bordered person icon) to navigate to `/account`
- Verify "My Account" header with green gradient profile card
- Verify profile info: Guest User, +91 98765 43210, guest@apollo247.com
- Verify all 10 menu items: My Orders, My Prescriptions, Health Records, Appointments, Subscriptions, Insurance, Saved Addresses, Payment Methods, Notifications, Help & Support
- Verify Logout button at bottom (red text)
- Click "My Orders" — verify Order History with 3 sample orders (Delivered/Cancelled statuses, Reorder buttons)
- Click back to menu, click "Edit Profile" — verify Profile Settings form (Name, Phone, Email, Address fields + Save Changes button)
- Navigate back to Home

### 5. View All → BuyAgainScreen → Back
- Click "View All >" in Buy Again section header
- Verify BuyAgainScreen loads at `/BuyAgainScreen`
- Click back chevron (top-left) — should return to Home with cart state preserved

### 6. Tab Navigation
- Click any tab (e.g., Doctors) — should navigate to placeholder screen
- Click Home tab — should return to Home screen

### 7. Auto-Scrolling Carousels
- Bank Offers carousel auto-scrolls through bank cards
- Ask Apollo poster carousel auto-scrolls through health topics
- Both should scroll smoothly without glitches

## Navigation Paths (from code)
- Home → Cart: Click cart icon in SearchBarRow (index.js line 574, `router.push('/cart')`)
- Home → Account: Click profile avatar in StickyHeader (index.js line 571, `router.push('/account')`)
- Cart → Home: Back arrow (cart.js, `router.back()`)
- Account → Home: Back arrow (account.js, `router.back()`)
- Account → Orders: Tap "My Orders" menu item (sets `activeSection` to `'orders'`)
- Account → Settings: Tap "Edit Profile" button (sets `activeSection` to `'settings'`)

## Known Patterns & Gotchas
- Tab entry files (e.g., `doctors-entry.js`) use `router.push()` in `useEffect` to redirect tabs to stack screens — this is a fragile pattern that may cause flicker on slower devices
- `BuyAgainScreen.js` lives in `(mainTabs)/` but is hidden from the tab bar via `href: null` in the layout
- No lint/typecheck/CI scripts are configured in this project
- The app uses `react-native-reanimated` v4 worklets extensively — the babel plugin is auto-included via `babel-preset-expo`
- All components use `React.memo` with `useCallback`/`useMemo` for performance
- Cart screen has pre-loaded sample items (Dolo 650, Augmentin 625, Cetrizine 10mg) regardless of what's added from Home
- Account page uses internal state (`activeSection`) to switch between menu/orders/settings views rather than separate routes
- Some package version mismatches may show warnings at startup (e.g. async-storage, expo-linear-gradient, gesture-handler, reanimated) but these don't block functionality
- When using tunnel mode, ngrok package is installed globally on first use

## Devin Secrets Needed
None — this is a purely frontend app with no auth or API keys required.
