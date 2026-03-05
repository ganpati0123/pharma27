/**
 * ============================================================================
 * APOLLO 24/7 ROYAL PREMIUM DESIGN SYSTEM
 * ============================================================================
 * 
 * A comprehensive design system built for a luxury healthcare super-app.
 * Every token, every spacing value, every shadow has been carefully crafted
 * to deliver a royal, premium experience that feels like liquid gold.
 * 
 * Design Philosophy:
 * - Royal Healthcare Luxury
 * - 8px spacing grid system
 * - Soft purple + gold accent shadows
 * - Inter typography family
 * - 300-500ms cubic-bezier animations at 60fps
 * 
 * ============================================================================
 */

import { Dimensions, Platform } from 'react-native';

// ============================================================================
// SCREEN DIMENSIONS
// ============================================================================
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============================================================================
// COLOR PALETTE
// ============================================================================
export const COLORS = {
  // Primary Brand Colors
  apolloGreen: '#00A651',
  apolloGreenLight: '#00C853',
  apolloGreenDark: '#008040',
  apolloGreenFaded: 'rgba(0, 166, 81, 0.08)',
  apolloGreenSubtle: 'rgba(0, 166, 81, 0.15)',

  // Royal Gold Palette
  royalGold: '#FFD700',
  royalGoldLight: '#FFE44D',
  royalGoldDark: '#C7A600',
  royalGoldFaded: 'rgba(255, 215, 0, 0.12)',
  royalGoldSubtle: 'rgba(255, 215, 0, 0.25)',
  royalGoldGlow: 'rgba(255, 215, 0, 0.35)',

  // Premium Orange Palette
  premiumOrange: '#FF6B35',
  premiumOrangeLight: '#FF8A5C',
  premiumOrangeDark: '#E5520F',
  premiumOrangeFaded: 'rgba(255, 107, 53, 0.10)',

  // Background Gradient Colors
  backgroundStart: '#FAFAFA',
  backgroundEnd: '#F0F8FF',
  backgroundPure: '#FFFFFF',
  backgroundSoft: '#F8F9FA',
  backgroundMuted: '#F5F5F5',
  backgroundWarm: '#FFF8F0',
  backgroundCream: '#FFFCF0',
  backgroundIce: '#F0F8FF',

  // Card Colors
  cardWhite: '#FFFFFF',
  cardElevated: '#FEFEFE',
  cardHover: '#FAFCFF',

  // Text Colors
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  textLight: '#CCCCDD',
  textWhite: '#FFFFFF',
  textGold: '#C7A600',
  textGreen: '#00A651',
  textOrange: '#FF6B35',

  // Shadow Colors
  shadowPurple: 'rgba(100, 80, 160, 0.08)',
  shadowPurpleMedium: 'rgba(100, 80, 160, 0.12)',
  shadowPurpleStrong: 'rgba(100, 80, 160, 0.18)',
  shadowGold: 'rgba(255, 215, 0, 0.15)',
  shadowGoldStrong: 'rgba(255, 215, 0, 0.25)',
  shadowBlack: 'rgba(0, 0, 0, 0.06)',
  shadowBlackMedium: 'rgba(0, 0, 0, 0.10)',

  // Gradient Arrays
  gradientRedOrange: ['#FF6B35', '#FF4444'],
  gradientGreenLight: ['#00A651', '#00C853'],
  gradientGoldShimmer: ['#FFD700', '#FFE44D', '#FFD700'],
  gradientBackground: ['#FAFAFA', '#F0F8FF'],
  gradientCardPremium: ['#FFFFFF', '#FAFCFF'],
  gradientDarkOverlay: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.05)'],
  gradientHeroBg: ['#FAFAFA', '#F0F8FF', '#FAFAFA'],

  // Divider & Border Colors
  divider: '#E8E8F0',
  dividerLight: '#F0F0F8',
  border: '#E0E0EE',
  borderLight: '#EBEBF5',
  borderGold: 'rgba(255, 215, 0, 0.3)',

  // Status Colors
  success: '#00A651',
  warning: '#FFB800',
  error: '#FF4444',
  info: '#0088FF',

  // Bank Brand Colors
  bankSBI: '#0047A3',
  bankHDFC: '#0052A4',
  bankICICI: '#F47920',
  bankAxis: '#7B2CBF',
  bankKotak: '#E31837',
  bankYesBank: '#005EB8',
  bankPNB: '#0066B2',
  bankBOB: '#ED1C24',
  bankUnion: '#FF6B35',
  bankCanara: '#0066B2',
  bankIndusInd: '#EC1C24',
  bankIDBI: '#0047A3',

  // Overlay Colors
  overlayLight: 'rgba(255, 255, 255, 0.9)',
  overlayDark: 'rgba(0, 0, 0, 0.4)',
  overlayGold: 'rgba(255, 215, 0, 0.05)',

  // Transparent
  transparent: 'transparent',
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================
export const TYPOGRAPHY = {
  // Font Families (Inter via system fonts on mobile)
  fontBold: Platform.select({
    ios: 'System',
    android: 'sans-serif-medium',
    default: 'System',
  }),
  fontRegular: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
  fontLight: Platform.select({
    ios: 'System',
    android: 'sans-serif-light',
    default: 'System',
  }),

  // Heading Sizes
  h1: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.2,
    lineHeight: 28,
  },
  h4: {
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: -0.1,
    lineHeight: 24,
  },

  // Body Sizes
  bodyLarge: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 14,
    fontWeight: '400',
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  bodySmall: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 16,
  },

  // Label Sizes
  labelLarge: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 20,
  },
  labelMedium: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
  labelSmall: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
    lineHeight: 14,
  },

  // Caption
  caption: {
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: 0.3,
    lineHeight: 14,
  },
  captionBold: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    lineHeight: 14,
  },

  // Special
  price: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  priceSmall: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: -0.1,
    lineHeight: 14,
  },
  badge: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
    lineHeight: 12,
  },
  version: {
    fontSize: 10,
    fontWeight: '300',
    letterSpacing: 1,
    lineHeight: 14,
  },
  heroDisplay: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 0.2,
    lineHeight: 26,
  },
};

// ============================================================================
// SPACING (8px Grid System)
// ============================================================================
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  section: 24,
  screenPadding: 20,
  cardPadding: 16,
  chipPadding: 12,
  gap: {
    tiny: 4,
    small: 8,
    medium: 12,
    large: 16,
    xlarge: 20,
    section: 24,
  },
};

// ============================================================================
// BORDER RADIUS
// ============================================================================
export const RADIUS = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 24,
  pill: 30,
  circle: 9999,
  card: 16,
  button: 12,
  chip: 20,
  avatar: 9999,
  badge: 10,
  search: 30,
};

// ============================================================================
// SHADOWS
// ============================================================================
export const SHADOWS = {
  // Card Shadows - Soft purple + gold accent
  cardSoft: {
    shadowColor: COLORS.shadowPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  cardMedium: {
    shadowColor: COLORS.shadowPurpleMedium,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
  },
  cardStrong: {
    shadowColor: COLORS.shadowPurpleStrong,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 24,
    elevation: 8,
  },
  cardElevated: {
    shadowColor: COLORS.shadowPurpleMedium,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 6,
  },

  // Gold Glow Shadows
  goldGlow: {
    shadowColor: COLORS.shadowGold,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 2,
  },
  goldGlowStrong: {
    shadowColor: COLORS.shadowGoldStrong,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },

  // Header Shadow
  header: {
    shadowColor: COLORS.shadowPurple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4,
  },

  // Button Shadow
  button: {
    shadowColor: COLORS.apolloGreen,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 3,
  },

  // Floating Shadow
  floating: {
    shadowColor: COLORS.shadowPurpleStrong,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 1,
    shadowRadius: 32,
    elevation: 12,
  },

  // Subtle Shadow
  subtle: {
    shadowColor: COLORS.shadowBlack,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
  },

  // Inner Glow (simulated)
  innerGlow: {
    borderWidth: 1,
    borderColor: COLORS.royalGoldFaded,
  },
};

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================
export const ANIMATION = {
  // Duration Constants
  duration: {
    instant: 100,
    fast: 200,
    normal: 300,
    smooth: 400,
    slow: 500,
    carousel: 4000,
    entrance: 600,
    stagger: 80,
  },

  // Spring Configurations
  spring: {
    gentle: {
      damping: 20,
      stiffness: 150,
      mass: 1,
    },
    bouncy: {
      damping: 12,
      stiffness: 180,
      mass: 0.8,
    },
    snappy: {
      damping: 28,
      stiffness: 300,
      mass: 0.6,
    },
    smooth: {
      damping: 25,
      stiffness: 200,
      mass: 0.9,
    },
    press: {
      damping: 15,
      stiffness: 250,
      mass: 0.5,
    },
  },

  // Cubic Bezier Easing
  easing: {
    premium: [0.25, 0.1, 0.25, 1.0],
    smooth: [0.4, 0.0, 0.2, 1.0],
    decelerate: [0.0, 0.0, 0.2, 1.0],
    accelerate: [0.4, 0.0, 1.0, 1.0],
    standard: [0.4, 0.0, 0.6, 1.0],
  },

  // Scale Values
  scale: {
    pressed: 0.96,
    hover: 1.02,
    active: 0.98,
    bounce: 1.05,
    cardLift: 1.01,
  },

  // Translation Values
  translate: {
    cardLift: -5,
    buttonPress: 1,
    slideIn: 30,
    fadeSlide: 20,
  },

  // Rotation Values
  rotation: {
    iconTilt: 5,
    subtle: 2,
  },

  // Opacity Values
  opacity: {
    pressed: 0.85,
    disabled: 0.5,
    overlay: 0.4,
    subtle: 0.7,
  },
};

// ============================================================================
// LAYOUT CONSTANTS
// ============================================================================
export const LAYOUT = {
  screenWidth: SCREEN_WIDTH,
  screenHeight: SCREEN_HEIGHT,

  // Header
  headerHeight: 80,
  searchBarHeight: 60,
  categoryNavHeight: 56,
  stickyHeaderTotal: 80 + 60 + 56,

  // Card Sizes
  serviceCardSize: (SCREEN_WIDTH - 40 - 16) / 2,
  medicineCardWidth: 130,
  medicineCardHeight: 200,
  bankCardWidth: SCREEN_WIDTH * 0.75,
  bankCardHeight: 120,
  posterCardWidth: SCREEN_WIDTH * 0.82,
  posterCardHeight: 180,
  promotionBannerWidth: SCREEN_WIDTH * 0.85,
  promotionBannerHeight: 140,
  contentCardMinHeight: 180,
  curatedCardHeight: 72,

  // Badge Sizes
  cartBadgeSize: 20,
  trustBadgeSize: 64,
  aiBadgeSize: 34,
  walletBadgeSize: 40,
  profileAvatarSize: 42,

  // Icon Sizes
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
  iconXLarge: 32,
  iconService: 36,

  // Carousel
  carouselAutoScrollInterval: 3500,
  carouselBankScrollInterval: 3000,
  carouselPosterScrollInterval: 4000,

  // Bottom Tab
  tabBarHeight: 70,
};

// ============================================================================
// SHARED STYLE MIXINS
// ============================================================================
export const MIXINS = {
  // Centered content
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Row layout
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Row with space between
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  // Absolute fill
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  // Premium card base
  premiumCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    ...SHADOWS.cardSoft,
  },

  // Elevated premium card
  elevatedCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    ...SHADOWS.cardMedium,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },

  // Section container
  sectionContainer: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section,
  },

  // Section header row
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.screenPadding,
  },

  // Gold accent border
  goldBorder: {
    borderWidth: 1.5,
    borderColor: COLORS.royalGold,
  },

  // Gold glow effect
  goldGlowEffect: {
    borderWidth: 1,
    borderColor: COLORS.royalGoldFaded,
    ...SHADOWS.goldGlow,
  },

  // Premium button
  premiumButton: {
    backgroundColor: COLORS.apolloGreen,
    borderRadius: RADIUS.button,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    ...SHADOWS.button,
  },

  // Chip style
  chip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.backgroundMuted,
  },

  // Active chip style
  chipActive: {
    backgroundColor: COLORS.royalGoldFaded,
    borderBottomWidth: 2.5,
    borderBottomColor: COLORS.royalGold,
  },

  // Divider line
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },

  // Badge circle
  badgeCircle: {
    width: LAYOUT.cartBadgeSize,
    height: LAYOUT.cartBadgeSize,
    borderRadius: LAYOUT.cartBadgeSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

// ============================================================================
// DATA CONSTANTS
// ============================================================================
export const DATA = {
  categories: [
    { id: 'all', label: 'All', icon: 'apps-outline' },
    { id: 'skin', label: 'Skin', icon: 'flower-outline' },
    { id: 'summer', label: 'Summer', icon: 'sunny-outline', isNew: true },
    { id: 'women', label: 'Women', icon: 'woman-outline' },
    { id: 'healthcheck', label: 'Health Check', icon: 'fitness-outline' },
    { id: 'men', label: 'Men', icon: 'man-outline' },
    { id: 'insurance', label: 'Insurance', icon: 'shield-outline' },
    { id: 'weightloss', label: 'Weight Loss', icon: 'barbell-outline' },
    { id: 'nutrition', label: 'Nutrition', icon: 'nutrition-outline' },
    { id: 'instantdr', label: 'Instant Dr', icon: 'pulse-outline' },
    { id: 'sexualhealth', label: 'Sexual Health', icon: 'heart-outline' },
  ],

  services: [
    {
      id: 1,
      title: 'Apollo\nPharmacy',
      icon: 'medkit',
      offer: 'Up to 25% OFF',
      color: COLORS.apolloGreen,
      bgColor: 'rgba(0, 166, 81, 0.08)',
      accentColor: '#E8F5E9',
    },
    {
      id: 2,
      title: 'Lab Tests\nAt Home',
      icon: 'flask',
      offer: 'Starting @299',
      color: COLORS.premiumOrange,
      bgColor: 'rgba(255, 107, 53, 0.08)',
      accentColor: '#FFF3E0',
    },
    {
      id: 3,
      title: 'Doctor\nConsultation',
      icon: 'videocam',
      offer: 'From @199',
      color: COLORS.royalGold,
      bgColor: 'rgba(255, 215, 0, 0.08)',
      accentColor: '#FFFDE7',
    },
    {
      id: 4,
      title: 'Apollo\nInsurance',
      icon: 'shield-checkmark',
      offer: 'Save up to 40%',
      color: COLORS.apolloGreen,
      bgColor: 'rgba(0, 166, 81, 0.08)',
      accentColor: '#E8F5E9',
    },
  ],

  medicines: [
    { id: 1, name: "Walaphage 850 Tablet 15's", price: 3.6, oldPrice: 4.0, discount: 10, delivery: '11:30 PM', qty: 0 },
    { id: 2, name: "Dolo 650 Tablet 15's", price: 2.8, oldPrice: 3.5, discount: 20, delivery: '10:30 PM', qty: 0 },
    { id: 3, name: "Augmentin 625 Duo Tablet 10's", price: 15.2, oldPrice: 18.9, discount: 19, delivery: '12:00 AM', qty: 0 },
    { id: 4, name: "Cetrizine 10mg Tablet 10's", price: 1.2, oldPrice: 1.5, discount: 20, delivery: '9:30 PM', qty: 0 },
    { id: 5, name: "Paracetamol 500mg Tablet 10's", price: 0.8, oldPrice: 1.0, discount: 20, delivery: '8:30 PM', qty: 0 },
    { id: 6, name: "Metformin 500mg Tablet 20's", price: 2.1, oldPrice: 2.8, discount: 25, delivery: '11:00 PM', qty: 0 },
    { id: 7, name: "Atorvastatin 10mg Tablet 15's", price: 4.5, oldPrice: 5.6, discount: 20, delivery: '10:00 PM', qty: 0 },
    { id: 8, name: "Amlodipine 5mg Tablet 15's", price: 1.8, oldPrice: 2.3, discount: 22, delivery: '9:00 PM', qty: 0 },
  ],

  banks: [
    { id: 1, name: 'SBI', color: '#0047A3', gradientEnd: '#003380' },
    { id: 2, name: 'HDFC', color: '#0052A4', gradientEnd: '#003D7A' },
    { id: 3, name: 'ICICI', color: '#F47920', gradientEnd: '#D46010' },
    { id: 4, name: 'Axis', color: '#7B2CBF', gradientEnd: '#5A1E8F' },
    { id: 5, name: 'Kotak', color: '#E31837', gradientEnd: '#B01228' },
    { id: 6, name: 'Yes Bank', color: '#005EB8', gradientEnd: '#004A90' },
    { id: 7, name: 'PNB', color: '#0066B2', gradientEnd: '#004D87' },
    { id: 8, name: 'BOB', color: '#ED1C24', gradientEnd: '#C0151B' },
    { id: 9, name: 'Union Bank', color: '#FF6B35', gradientEnd: '#D45525' },
    { id: 10, name: 'Canara', color: '#0066B2', gradientEnd: '#004D87' },
    { id: 11, name: 'IndusInd', color: '#EC1C24', gradientEnd: '#C0151B' },
    { id: 12, name: 'IDBI', color: '#0047A3', gradientEnd: '#003380' },
  ],

  posters: [
    { id: 1, title: 'Oral Cancer', description: 'Early detection saves lives. Learn about symptoms, risk factors and prevention methods for oral cancer.' },
    { id: 2, title: 'Heart Health', description: 'Understanding cardiovascular risks and maintaining a healthy heart through lifestyle changes.' },
    { id: 3, title: 'Diabetes Care', description: 'Comprehensive guide to managing diabetes and living a balanced, healthy life every day.' },
    { id: 4, title: 'Mental Wellness', description: 'Prioritizing mental health in today\'s fast-paced world with expert guidance and support.' },
    { id: 5, title: 'Bone Health', description: 'Preventing osteoporosis and maintaining strong, healthy bones throughout every stage of life.' },
    { id: 6, title: 'Eye Care', description: 'Protecting your precious vision and preventing common eye disorders with expert tips.' },
    { id: 7, title: 'Skin Health', description: 'Essential dermatology tips for maintaining healthy, glowing and radiant skin naturally.' },
    { id: 8, title: 'Immunity Boost', description: 'Natural and proven ways to strengthen your immune system and stay healthy year-round.' },
    { id: 9, title: 'Sleep Disorders', description: 'Understanding sleep patterns, improving quality and tackling insomnia effectively.' },
    { id: 10, title: 'Nutrition Basics', description: 'Building a balanced, nutrient-rich diet for optimal health, energy and wellness.' },
    { id: 11, title: 'Exercise Benefits', description: 'How regular physical activity and movement transforms your overall health dramatically.' },
    { id: 12, title: 'Stress Management', description: 'Effective and proven techniques to manage daily stress, anxiety and build resilience.' },
    { id: 13, title: "Women's Health", description: 'Comprehensive healthcare solutions and guidance for women at every life stage.' },
    { id: 14, title: 'Senior Care', description: 'Specialized healthcare solutions, tips and support for elderly wellness and vitality.' },
  ],

  banners: [
    { id: 1, title: 'Family Insurance Offer', subtitle: 'Get 20% OFF on family health insurance plans. Protect your loved ones today.', badge: 'LIMITED' },
    { id: 2, title: 'ICICI PF NPS Plan', subtitle: 'Unlock upto 18% discounts under ICICI PF NPS SWASTHYA EQUITY Plus Plan', badge: 'EXCLUSIVE' },
    { id: 3, title: 'Summer Health Camp', subtitle: 'Special health checkup packages at discounted rates. Book your slot now!', badge: 'NEW' },
    { id: 4, title: 'Apollo Circle Benefits', subtitle: 'Join Apollo Circle for exclusive member discounts and free consultations.', badge: 'PREMIUM' },
  ],

  curatedOfferings: [
    { id: 1, title: 'Apollo SBI Card SELECT', subtitle: 'Exclusive healthcare credit card benefits', icon: 'card', color: '#0047A3', bgColor: '#E8EEF5' },
    { id: 2, title: 'Join Circle Membership', subtitle: 'Unlock premium health benefits & savings', icon: 'people-circle', color: '#00A651', bgColor: '#E8F5E9' },
    { id: 3, title: 'My Health Records & Insights', subtitle: 'Track and manage your health journey', icon: 'folder-open', color: '#FF6B35', bgColor: '#FFF3E0' },
  ],

  apolloLegacyBrands: [
    'Apollo Pharmacy',
    'Apollo Diagnostics',
    'Apollo 24/7',
    'Apollo Hospitals',
    'Apollo Insurance',
  ],

  trustBadges: [
    { id: 1, title: 'Safe &\nSecure', icon: 'shield-checkmark', color: '#00A651' },
    { id: 2, title: 'Fully\nReliable', icon: 'checkmark-circle', color: '#0088FF' },
    { id: 3, title: 'Genuine\nProducts', icon: 'ribbon', color: '#FFB800' },
  ],
};

// ============================================================================
// EXPORTS
// ============================================================================
export default {
  COLORS,
  TYPOGRAPHY,
  SPACING,
  RADIUS,
  SHADOWS,
  ANIMATION,
  LAYOUT,
  MIXINS,
  DATA,
};
