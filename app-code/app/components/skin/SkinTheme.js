/**
 * ============================================================================
 * APOLLO 24/7 SKIN PAGE - ROSE GOLD EDITION THEME & DATA
 * ============================================================================
 *
 * Extended design system for the Skin vertical. Builds on top of the core
 * theme with rose-gold accents, skin-care specific color palettes, and
 * all data constants needed by every Skin section component.
 *
 * ============================================================================
 */

import { Dimensions } from 'react-native';
import { COLORS, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// SKIN-SPECIFIC COLORS
// ============================================================================
export const SKIN_COLORS = {
  // Rose Gold Palette
  roseGold: '#B76E79',
  roseGoldLight: '#D4A0A7',
  roseGoldDark: '#8E4F58',
  roseGoldFaded: 'rgba(183, 110, 121, 0.10)',
  roseGoldSubtle: 'rgba(183, 110, 121, 0.20)',
  roseGoldGlow: 'rgba(183, 110, 121, 0.30)',

  // Royal Purple
  royalPurple: '#4A1D6D',
  royalPurpleLight: '#6B3A8A',
  royalPurpleFaded: 'rgba(74, 29, 109, 0.08)',

  // Skin-specific accents
  acneRed: '#FF6B6B',
  drynessBlue: '#64B5F6',
  pigmentBrown: '#A0785A',
  fungalGreen: '#66BB6A',
  blemishPink: '#F48FB1',
  ageingPurple: '#AB47BC',

  // Carnival
  carnivalBlue: '#1A237E',
  carnivalGold: '#FFD700',
  carnivalSky: '#42A5F5',

  // Sunscreen
  sunscreenOrange: '#FF8F00',
  sunscreenYellow: '#FFD54F',

  // Category backgrounds
  categoryMint: '#E8F5E9',
  categoryLavender: '#EDE7F6',
  categoryPeach: '#FFF3E0',
  categorySky: '#E3F2FD',
  categoryRose: '#FCE4EC',
  categoryCream: '#FFF8E1',

  // Gradient arrays
  gradientRoseGold: ['#B76E79', '#D4A0A7'],
  gradientSunscreen: ['#FF8F00', '#FFD54F'],
  gradientCarnival: ['#1A237E', '#42A5F5'],
  gradientAIExpert: ['#FF6B35', '#FF8A5C'],
  gradientFreshSkin: ['#E8F5E9', '#C8E6C9'],
};

// ============================================================================
// SKIN PAGE LAYOUT CONSTANTS
// ============================================================================
export const SKIN_LAYOUT = {
  concernCardSize: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 2) / 3,
  brandCardWidth: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md) / 2,
  brandCardHeight: 180,
  ingredientCardWidth: SCREEN_WIDTH * 0.72,
  ingredientCardHeight: 140,
  categoryMiniSize: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.sm * 3) / 4,
  productCardWidth: 155,
  productCardHeight: 260,
  carnivalArchWidth: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.sm * 3) / 4,
  routineCardWidth: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 2) / 3,
  bankCardWidth: SCREEN_WIDTH * 0.72,
  stepCardSize: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 5) / 6,
};

// ============================================================================
// SKIN CONCERNS DATA
// ============================================================================
export const SKIN_CONCERNS = [
  {
    id: 'acne',
    title: 'Acne',
    icon: 'flame-outline',
    color: '#FF6B6B',
    bgColor: '#FFF0F0',
    gradient: ['#FF6B6B', '#FF8A8A'],
    description: 'Clear breakouts',
  },
  {
    id: 'dryness',
    title: 'Dryness',
    icon: 'water-outline',
    color: '#64B5F6',
    bgColor: '#E3F2FD',
    gradient: ['#64B5F6', '#90CAF9'],
    description: 'Deep hydration',
  },
  {
    id: 'pigmentation',
    title: 'Pigmental',
    icon: 'color-palette-outline',
    color: '#A0785A',
    bgColor: '#FFF3E0',
    gradient: ['#A0785A', '#C09878'],
    description: 'Even skin tone',
  },
  {
    id: 'fungal',
    title: 'Fungal\nInfection',
    icon: 'leaf-outline',
    color: '#66BB6A',
    bgColor: '#E8F5E9',
    gradient: ['#66BB6A', '#81C784'],
    description: 'Treat infections',
  },
  {
    id: 'blemishes',
    title: 'Blemishes',
    icon: 'sparkles-outline',
    color: '#F48FB1',
    bgColor: '#FCE4EC',
    gradient: ['#F48FB1', '#F8BBD0'],
    description: 'Spot treatment',
  },
  {
    id: 'ageing',
    title: 'Ageing',
    icon: 'timer-outline',
    color: '#AB47BC',
    bgColor: '#F3E5F5',
    gradient: ['#AB47BC', '#CE93D8'],
    description: 'Anti-wrinkle care',
  },
];

// ============================================================================
// TRUSTED BRANDS DATA
// ============================================================================
export const TRUSTED_BRANDS = [
  { id: 1, name: 'La Roche-Posay', badge: 'FEATURED', badgeColor: '#0088FF', icon: 'shield-checkmark', bgColor: '#E3F2FD' },
  { id: 2, name: 'Neutrogena', badge: 'BESTSELLER', badgeColor: '#FF6B35', icon: 'star', bgColor: '#FFF3E0' },
  { id: 3, name: 'CeraVe', badge: 'FLAT 10% OFF', badgeColor: '#00A651', icon: 'leaf', bgColor: '#E8F5E9' },
  { id: 4, name: 'Minimalist', badge: 'TRENDING', badgeColor: '#AB47BC', icon: 'trending-up', bgColor: '#F3E5F5' },
  { id: 5, name: 'Cetaphil', badge: 'BESTSELLER', badgeColor: '#FF6B35', icon: 'star', bgColor: '#FFF3E0' },
  { id: 6, name: 'The Ordinary', badge: 'FEATURED', badgeColor: '#0088FF', icon: 'diamond', bgColor: '#E3F2FD' },
  { id: 7, name: 'Pilgrim', badge: 'FLAT 15% OFF', badgeColor: '#00A651', icon: 'leaf', bgColor: '#E8F5E9' },
  { id: 8, name: 'Dermaco', badge: 'NEW LAUNCH', badgeColor: '#FF4444', icon: 'flash', bgColor: '#FFEBEE' },
  { id: 9, name: "Re'equil", badge: 'DERMA PICK', badgeColor: '#0088FF', icon: 'medkit', bgColor: '#E3F2FD' },
  { id: 10, name: 'Aqualogica', badge: 'FLAT 10% OFF', badgeColor: '#00A651', icon: 'water', bgColor: '#E8F5E9' },
  { id: 11, name: 'Foxtale', badge: 'TRENDING', badgeColor: '#AB47BC', icon: 'trending-up', bgColor: '#F3E5F5' },
  { id: 12, name: "Dr. Sheth's", badge: 'BESTSELLER', badgeColor: '#FF6B35', icon: 'star', bgColor: '#FFF3E0' },
  { id: 13, name: 'Plum', badge: 'FEATURED', badgeColor: '#0088FF', icon: 'leaf', bgColor: '#E3F2FD' },
  { id: 14, name: 'Mamaearth', badge: 'FLAT 20% OFF', badgeColor: '#00A651', icon: 'earth', bgColor: '#E8F5E9' },
];

// ============================================================================
// KEY INGREDIENTS DATA
// ============================================================================
export const KEY_INGREDIENTS = [
  {
    id: 1,
    name: 'Niacinamide',
    benefits: 'Balances Oil Production and Refines Skin Texture',
    color: '#7C4DFF',
    bgColor: '#EDE7F6',
    gradient: ['#7C4DFF', '#B388FF'],
    icon: 'flask',
  },
  {
    id: 2,
    name: 'Hyaluronic Acid',
    benefits: 'Deeply Hydrates Skin for Long-Lasting Plumpness',
    color: '#00BCD4',
    bgColor: '#E0F7FA',
    gradient: ['#00BCD4', '#4DD0E1'],
    icon: 'water',
  },
  {
    id: 3,
    name: 'Vitamin C',
    benefits: 'Brightens Complexion and Fights Free Radicals',
    color: '#FF9800',
    bgColor: '#FFF3E0',
    gradient: ['#FF9800', '#FFB74D'],
    icon: 'sunny',
  },
  {
    id: 4,
    name: 'Salicylic Acid',
    benefits: 'Unclogs Pores and Prevents Breakouts Effectively',
    color: '#4CAF50',
    bgColor: '#E8F5E9',
    gradient: ['#4CAF50', '#81C784'],
    icon: 'leaf',
  },
  {
    id: 5,
    name: 'Retinol',
    benefits: 'Boosts Collagen and Reduces Fine Lines Visibly',
    color: '#E91E63',
    bgColor: '#FCE4EC',
    gradient: ['#E91E63', '#F48FB1'],
    icon: 'diamond',
  },
  {
    id: 6,
    name: 'Alpha Arbutin',
    benefits: 'Fades Dark Spots and Evens Skin Tone Naturally',
    color: '#795548',
    bgColor: '#EFEBE9',
    gradient: ['#795548', '#A1887F'],
    icon: 'color-palette',
  },
  {
    id: 7,
    name: 'Glycolic Acid',
    benefits: 'Exfoliates Dead Cells for Smoother Radiant Skin',
    color: '#009688',
    bgColor: '#E0F2F1',
    gradient: ['#009688', '#4DB6AC'],
    icon: 'sparkles',
  },
];

// ============================================================================
// EXPLORE CATEGORIES DATA
// ============================================================================
export const EXPLORE_CATEGORIES = [
  { id: 1, name: 'Sunscreen', icon: 'sunny-outline', offer: 'Upto 50% OFF', bgColor: '#FFF8E1' },
  { id: 2, name: 'Face Wash', icon: 'water-outline', offer: 'Upto 40% OFF', bgColor: '#E3F2FD' },
  { id: 3, name: 'Moisturizer', icon: 'rainy-outline', offer: 'Upto 35% OFF', bgColor: '#E8F5E9' },
  { id: 4, name: 'Face Serum', icon: 'flask-outline', offer: 'Upto 45% OFF', bgColor: '#F3E5F5' },
  { id: 5, name: 'Face Gel', icon: 'ellipse-outline', offer: 'Upto 30% OFF', bgColor: '#E0F7FA' },
  { id: 6, name: 'Sunscreen Gel', icon: 'sunny-outline', offer: 'Upto 50% OFF', bgColor: '#FFF3E0' },
  { id: 7, name: 'Face Cleanser', icon: 'sparkles-outline', offer: 'Upto 40% OFF', bgColor: '#FCE4EC' },
  { id: 8, name: 'Face Cream', icon: 'color-fill-outline', offer: 'Upto 35% OFF', bgColor: '#EFEBE9' },
  { id: 9, name: 'Body Lotion', icon: 'body-outline', offer: 'Upto 30% OFF', bgColor: '#E8EAF6' },
  { id: 10, name: 'Body Wash', icon: 'water-outline', offer: 'Upto 25% OFF', bgColor: '#E0F2F1' },
  { id: 11, name: 'Lip Balm', icon: 'heart-outline', offer: 'Upto 20% OFF', bgColor: '#FCE4EC' },
  { id: 12, name: 'Eye Care', icon: 'eye-outline', offer: 'Upto 40% OFF', bgColor: '#E3F2FD' },
  { id: 13, name: 'Face Cream', icon: 'color-fill-outline', offer: 'Upto 45% OFF', bgColor: '#FFF8E1' },
  { id: 14, name: 'Powder', icon: 'ellipse-outline', offer: 'Upto 30% OFF', bgColor: '#F3E5F5' },
  { id: 15, name: 'Face Mist', icon: 'cloud-outline', offer: 'Upto 35% OFF', bgColor: '#E0F7FA' },
  { id: 16, name: 'Hand Wash', icon: 'hand-left-outline', offer: 'Upto 25% OFF', bgColor: '#E8F5E9' },
];

// ============================================================================
// CARNIVAL ARCHES DATA
// ============================================================================
export const CARNIVAL_ARCHES = [
  { id: 1, title: 'MINIMUM\n50% OFF', icon: 'pricetag', color: '#FF6B35', bgColor: '#FFF3E0' },
  { id: 2, title: 'BEST\nSELLERS', icon: 'star', color: '#FFD700', bgColor: '#FFF8E1' },
  { id: 3, title: 'NEW\nLAUNCH', icon: 'flash', color: '#FF4444', bgColor: '#FFEBEE' },
  { id: 4, title: 'PREMIUM\nSKINCARE', icon: 'diamond', color: '#AB47BC', bgColor: '#F3E5F5' },
  { id: 5, title: 'ACNE\nSOLUTIONS', icon: 'medkit', color: '#4CAF50', bgColor: '#E8F5E9' },
  { id: 6, title: 'MINIMALIST', icon: 'leaf', color: '#009688', bgColor: '#E0F2F1' },
  { id: 7, title: 'CERAVE', icon: 'shield-checkmark', color: '#0088FF', bgColor: '#E3F2FD' },
  { id: 8, title: 'NIVEA', icon: 'water', color: '#1565C0', bgColor: '#E3F2FD' },
];

// ============================================================================
// DYNAMIC PRODUCTS DATA - by category
// ============================================================================
export const SKIN_PRODUCTS = {
  sunscreen: [
    { id: 's1', name: 'La Shield SPF 50', brand: 'Glenmark', rating: 4.5, reviews: 2134, delivery: '29 min', mrp: 525, price: 446, discount: 15, icon: 'sunny' },
    { id: 's2', name: 'Neutrogena Ultra Sheer SPF 50+', brand: 'Neutrogena', rating: 4.7, reviews: 5672, delivery: '29 min', mrp: 750, price: 600, discount: 20, icon: 'sunny' },
    { id: 's3', name: 'Minimalist SPF 50 PA++++', brand: 'Minimalist', rating: 4.4, reviews: 3201, delivery: '29 min', mrp: 499, price: 424, discount: 15, icon: 'sunny' },
    { id: 's4', name: 'CeraVe Hydrating SPF 30', brand: 'CeraVe', rating: 4.6, reviews: 1890, delivery: '29 min', mrp: 899, price: 719, discount: 20, icon: 'sunny' },
    { id: 's5', name: 'Episoft AC SPF 30', brand: 'Glenmark', rating: 4.3, reviews: 4521, delivery: '29 min', mrp: 430, price: 365, discount: 15, icon: 'sunny' },
    { id: 's6', name: 'VLCC De-Tan SPF 50', brand: 'VLCC', rating: 4.1, reviews: 982, delivery: '29 min', mrp: 350, price: 280, discount: 20, icon: 'sunny' },
    { id: 's7', name: 'Lakme Sun Expert SPF 50', brand: 'Lakme', rating: 4.2, reviews: 3456, delivery: '29 min', mrp: 399, price: 339, discount: 15, icon: 'sunny' },
    { id: 's8', name: 'Aqualogica Glow SPF 50', brand: 'Aqualogica', rating: 4.5, reviews: 2789, delivery: '29 min', mrp: 499, price: 399, discount: 20, icon: 'sunny' },
  ],
  cleansers: [
    { id: 'c1', name: 'CeraVe Foaming Cleanser', brand: 'CeraVe', rating: 4.6, reviews: 4523, delivery: '29 min', mrp: 699, price: 559, discount: 20, icon: 'water' },
    { id: 'c2', name: 'Cetaphil Gentle Skin Cleanser', brand: 'Cetaphil', rating: 4.7, reviews: 8901, delivery: '29 min', mrp: 599, price: 479, discount: 20, icon: 'water' },
    { id: 'c3', name: 'Minimalist 2% Salicylic Acid', brand: 'Minimalist', rating: 4.4, reviews: 3210, delivery: '29 min', mrp: 349, price: 296, discount: 15, icon: 'water' },
    { id: 'c4', name: 'La Roche-Posay Effaclar', brand: 'La Roche-Posay', rating: 4.8, reviews: 1234, delivery: '29 min', mrp: 1250, price: 1000, discount: 20, icon: 'water' },
    { id: 'c5', name: 'Neutrogena Oil-Free Acne Wash', brand: 'Neutrogena', rating: 4.3, reviews: 5678, delivery: '29 min', mrp: 599, price: 479, discount: 20, icon: 'water' },
    { id: 'c6', name: 'Plum Green Tea Face Wash', brand: 'Plum', rating: 4.5, reviews: 2345, delivery: '29 min', mrp: 375, price: 300, discount: 20, icon: 'water' },
    { id: 'c7', name: "Re'equil Oil Control Cleanser", brand: "Re'equil", rating: 4.4, reviews: 1567, delivery: '29 min', mrp: 450, price: 382, discount: 15, icon: 'water' },
    { id: 'c8', name: 'Mamaearth Tea Tree Face Wash', brand: 'Mamaearth', rating: 4.2, reviews: 6789, delivery: '29 min', mrp: 349, price: 279, discount: 20, icon: 'water' },
  ],
  powders: [
    { id: 'p1', name: 'Dermaco Pore-Minimizing Powder', brand: 'Dermaco', rating: 4.3, reviews: 890, delivery: '29 min', mrp: 499, price: 399, discount: 20, icon: 'ellipse' },
    { id: 'p2', name: 'Lakme 9 to 5 Primer + Powder', brand: 'Lakme', rating: 4.5, reviews: 3456, delivery: '29 min', mrp: 599, price: 479, discount: 20, icon: 'ellipse' },
    { id: 'p3', name: 'Maybelline Fit Me Powder', brand: 'Maybelline', rating: 4.6, reviews: 7890, delivery: '29 min', mrp: 350, price: 297, discount: 15, icon: 'ellipse' },
    { id: 'p4', name: 'Innisfree No-Sebum Powder', brand: 'Innisfree', rating: 4.7, reviews: 2345, delivery: '29 min', mrp: 450, price: 360, discount: 20, icon: 'ellipse' },
    { id: 'p5', name: "L'Oreal True Match Powder", brand: "L'Oreal", rating: 4.4, reviews: 5678, delivery: '29 min', mrp: 699, price: 559, discount: 20, icon: 'ellipse' },
    { id: 'p6', name: 'SUGAR Setting Powder', brand: 'SUGAR', rating: 4.3, reviews: 1234, delivery: '29 min', mrp: 599, price: 509, discount: 15, icon: 'ellipse' },
    { id: 'p7', name: 'MAC Studio Fix Powder', brand: 'MAC', rating: 4.8, reviews: 4567, delivery: '29 min', mrp: 2900, price: 2320, discount: 20, icon: 'ellipse' },
    { id: 'p8', name: 'Nykaa SKINgenius Powder', brand: 'Nykaa', rating: 4.2, reviews: 890, delivery: '29 min', mrp: 499, price: 399, discount: 20, icon: 'ellipse' },
  ],
  perfumes: [
    { id: 'pf1', name: 'Fogg Body Spray Royal', brand: 'Fogg', rating: 4.1, reviews: 12345, delivery: '29 min', mrp: 299, price: 254, discount: 15, icon: 'sparkles' },
    { id: 'pf2', name: 'Denver Hamilton EDP', brand: 'Denver', rating: 4.3, reviews: 5678, delivery: '29 min', mrp: 499, price: 399, discount: 20, icon: 'sparkles' },
    { id: 'pf3', name: 'Wild Stone Edge EDP', brand: 'Wild Stone', rating: 4.2, reviews: 3456, delivery: '29 min', mrp: 599, price: 479, discount: 20, icon: 'sparkles' },
    { id: 'pf4', name: 'Engage Homme EDP', brand: 'Engage', rating: 4.0, reviews: 2345, delivery: '29 min', mrp: 399, price: 339, discount: 15, icon: 'sparkles' },
    { id: 'pf5', name: 'Bella Vita Luxury Perfume', brand: 'Bella Vita', rating: 4.5, reviews: 6789, delivery: '29 min', mrp: 599, price: 479, discount: 20, icon: 'sparkles' },
    { id: 'pf6', name: 'Yardley London Gentleman', brand: 'Yardley', rating: 4.4, reviews: 1234, delivery: '29 min', mrp: 450, price: 382, discount: 15, icon: 'sparkles' },
    { id: 'pf7', name: 'Park Avenue Voyage EDP', brand: 'Park Avenue', rating: 4.3, reviews: 4567, delivery: '29 min', mrp: 599, price: 479, discount: 20, icon: 'sparkles' },
    { id: 'pf8', name: 'Set Wet Body Spray Cool', brand: 'Set Wet', rating: 4.1, reviews: 8901, delivery: '29 min', mrp: 199, price: 169, discount: 15, icon: 'sparkles' },
  ],
  rollons: [
    { id: 'r1', name: 'Nivea Fresh Active Roll-On', brand: 'Nivea', rating: 4.5, reviews: 9876, delivery: '29 min', mrp: 199, price: 159, discount: 20, icon: 'fitness' },
    { id: 'r2', name: 'Rexona Motion Sense Roll-On', brand: 'Rexona', rating: 4.3, reviews: 5432, delivery: '29 min', mrp: 175, price: 148, discount: 15, icon: 'fitness' },
    { id: 'r3', name: 'Dove Original Roll-On', brand: 'Dove', rating: 4.6, reviews: 7654, delivery: '29 min', mrp: 225, price: 180, discount: 20, icon: 'fitness' },
    { id: 'r4', name: 'Engage On Roll-On', brand: 'Engage', rating: 4.1, reviews: 3210, delivery: '29 min', mrp: 125, price: 106, discount: 15, icon: 'fitness' },
    { id: 'r5', name: 'Secret Temptation Roll-On', brand: 'Secret', rating: 4.2, reviews: 2345, delivery: '29 min', mrp: 150, price: 120, discount: 20, icon: 'fitness' },
    { id: 'r6', name: "Yardley Roll-On Gentleman", brand: 'Yardley', rating: 4.4, reviews: 1234, delivery: '29 min', mrp: 199, price: 169, discount: 15, icon: 'fitness' },
    { id: 'r7', name: 'Fa Roll-On Mystic Moments', brand: 'Fa', rating: 4.0, reviews: 890, delivery: '29 min', mrp: 175, price: 140, discount: 20, icon: 'fitness' },
    { id: 'r8', name: 'Old Spice Roll-On Original', brand: 'Old Spice', rating: 4.3, reviews: 4567, delivery: '29 min', mrp: 199, price: 169, discount: 15, icon: 'fitness' },
  ],
  wipes: [
    { id: 'w1', name: 'Himalaya Purifying Neem Wipes', brand: 'Himalaya', rating: 4.4, reviews: 3456, delivery: '29 min', mrp: 125, price: 100, discount: 20, icon: 'leaf' },
    { id: 'w2', name: 'Neutrogena Makeup Remover Wipes', brand: 'Neutrogena', rating: 4.7, reviews: 5678, delivery: '29 min', mrp: 399, price: 319, discount: 20, icon: 'leaf' },
    { id: 'w3', name: 'Simple Cleansing Facial Wipes', brand: 'Simple', rating: 4.5, reviews: 2345, delivery: '29 min', mrp: 350, price: 280, discount: 20, icon: 'leaf' },
    { id: 'w4', name: 'Plum Green Tea Wipes', brand: 'Plum', rating: 4.3, reviews: 1234, delivery: '29 min', mrp: 275, price: 220, discount: 20, icon: 'leaf' },
    { id: 'w5', name: 'WOW Anti-Pollution Wipes', brand: 'WOW', rating: 4.2, reviews: 890, delivery: '29 min', mrp: 299, price: 254, discount: 15, icon: 'leaf' },
    { id: 'w6', name: "Garnier SkinActive Wipes", brand: 'Garnier', rating: 4.4, reviews: 4567, delivery: '29 min', mrp: 250, price: 200, discount: 20, icon: 'leaf' },
    { id: 'w7', name: "L'Oreal Micellar Wipes", brand: "L'Oreal", rating: 4.6, reviews: 3456, delivery: '29 min', mrp: 450, price: 360, discount: 20, icon: 'leaf' },
    { id: 'w8', name: 'Biotique Bio Fruit Wipes', brand: 'Biotique', rating: 4.1, reviews: 2345, delivery: '29 min', mrp: 199, price: 159, discount: 20, icon: 'leaf' },
  ],
};

// ============================================================================
// PRODUCT CATEGORIES TABS
// ============================================================================
export const PRODUCT_CATEGORY_TABS = [
  { id: 'sunscreen', label: 'Sunscreen', icon: 'sunny-outline' },
  { id: 'cleansers', label: 'Cleansers', icon: 'water-outline' },
  { id: 'powders', label: 'Powders', icon: 'ellipse-outline' },
  { id: 'perfumes', label: 'Perfumes', icon: 'sparkles-outline' },
  { id: 'rollons', label: 'Roll-ons', icon: 'fitness-outline' },
  { id: 'wipes', label: 'Wipes', icon: 'leaf-outline' },
];

// ============================================================================
// SKIN BANK OFFERS DATA (14 banks)
// ============================================================================
export const SKIN_BANKS = [
  { id: 1, name: 'HDFC', color: '#0052A4', gradientEnd: '#003D7A', offer: 'Extra 50% OFF' },
  { id: 2, name: 'SBI', color: '#0047A3', gradientEnd: '#003380', offer: 'Extra 40% OFF' },
  { id: 3, name: 'ICICI', color: '#F47920', gradientEnd: '#D46010', offer: 'Extra 35% OFF' },
  { id: 4, name: 'Axis', color: '#7B2CBF', gradientEnd: '#5A1E8F', offer: 'Extra 45% OFF' },
  { id: 5, name: 'Kotak', color: '#E31837', gradientEnd: '#B01228', offer: 'Extra 30% OFF' },
  { id: 6, name: 'Yes Bank', color: '#005EB8', gradientEnd: '#004A90', offer: 'Extra 25% OFF' },
  { id: 7, name: 'PNB', color: '#0066B2', gradientEnd: '#004D87', offer: 'Extra 50% OFF' },
  { id: 8, name: 'BOB', color: '#ED1C24', gradientEnd: '#C0151B', offer: 'Extra 40% OFF' },
  { id: 9, name: 'Union Bank', color: '#FF6B35', gradientEnd: '#D45525', offer: 'Extra 35% OFF' },
  { id: 10, name: 'Canara', color: '#0066B2', gradientEnd: '#004D87', offer: 'Extra 30% OFF' },
  { id: 11, name: 'IndusInd', color: '#EC1C24', gradientEnd: '#C0151B', offer: 'Extra 45% OFF' },
  { id: 12, name: 'IDBI', color: '#0047A3', gradientEnd: '#003380', offer: 'Extra 50% OFF' },
  { id: 13, name: 'Federal', color: '#1E88E5', gradientEnd: '#1565C0', offer: 'Extra 40% OFF' },
  { id: 14, name: 'Amex', color: '#006FCF', gradientEnd: '#004E94', offer: 'Extra 50% OFF' },
];

// ============================================================================
// FRESH SKIN CATEGORY PILLS
// ============================================================================
export const FRESH_SKIN_PILLS = [
  { id: 'sunscreen', label: 'Sunscreen' },
  { id: 'cleanser', label: 'Cleanser' },
  { id: 'moisturizer', label: 'Moisturizer' },
  { id: 'facewash', label: 'Face Wash' },
  { id: 'serum', label: 'Serum' },
  { id: 'toner', label: 'Toner' },
];

// ============================================================================
// FRESH SKIN PRODUCTS
// ============================================================================
export const FRESH_SKIN_PRODUCTS = [
  { id: 'fs1', name: 'Fixderma Shadow SPF 50+', brand: 'Fixderma', rating: 4.5, mrp: 630, price: 537, discount: 15, delivery: '29 min' },
  { id: 'fs2', name: 'La Shield Expert Urban SPF 50', brand: 'La Shield', rating: 4.4, mrp: 750, price: 637, discount: 15, delivery: '29 min' },
  { id: 'fs3', name: 'Cetaphil Sun SPF 50', brand: 'Cetaphil', rating: 4.6, mrp: 1050, price: 892, discount: 15, delivery: '29 min' },
  { id: 'fs4', name: 'Minimalist SPF 50 PA++++', brand: 'Minimalist', rating: 4.3, mrp: 499, price: 424, discount: 15, delivery: '29 min' },
  { id: 'fs5', name: 'Aqualogica Glow SPF 50', brand: 'Aqualogica', rating: 4.5, mrp: 499, price: 399, discount: 20, delivery: '29 min' },
  { id: 'fs6', name: 'Foxtale Dewy SPF 50', brand: 'Foxtale', rating: 4.4, mrp: 550, price: 440, discount: 20, delivery: '29 min' },
];

// ============================================================================
// 6-STEP ROUTINE DATA
// ============================================================================
export const SIX_STEP_ROUTINE = [
  { id: 1, step: 'Cleanse', icon: 'water-outline', color: '#64B5F6', bgColor: '#E3F2FD', description: 'Start fresh' },
  { id: 2, step: 'Exfoliate', icon: 'sparkles-outline', color: '#FF8A65', bgColor: '#FBE9E7', description: 'Remove dead cells' },
  { id: 3, step: 'Toner', icon: 'flask-outline', color: '#AB47BC', bgColor: '#F3E5F5', description: 'Balance pH' },
  { id: 4, step: 'Serum', icon: 'color-fill-outline', color: '#FF7043', bgColor: '#FFF3E0', description: 'Target concerns' },
  { id: 5, step: 'Moisturize', icon: 'rainy-outline', color: '#66BB6A', bgColor: '#E8F5E9', description: 'Lock in hydration' },
  { id: 6, step: 'Sunscreen', icon: 'sunny-outline', color: '#FFA726', bgColor: '#FFF8E1', description: 'UV protection' },
];

export default {
  SKIN_COLORS,
  SKIN_LAYOUT,
  SKIN_CONCERNS,
  TRUSTED_BRANDS,
  KEY_INGREDIENTS,
  EXPLORE_CATEGORIES,
  CARNIVAL_ARCHES,
  SKIN_PRODUCTS,
  PRODUCT_CATEGORY_TABS,
  SKIN_BANKS,
  FRESH_SKIN_PILLS,
  FRESH_SKIN_PRODUCTS,
  SIX_STEP_ROUTINE,
};
