/**
 * ============================================================================
 * APOLLO 24/7 - SUMMER SECTION THEME & DATA
 * ============================================================================
 */

import { Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION } from '../home/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const SUMMER_COLORS = {
  sunYellow: '#FFB300',
  sunYellowLight: '#FFD54F',
  sunYellowDark: '#FF8F00',
  sunYellowFaded: 'rgba(255, 179, 0, 0.10)',
  sunYellowSubtle: 'rgba(255, 179, 0, 0.20)',
  sunOrange: '#FF6D00',
  sunOrangeLight: '#FF9E40',
  sunOrangeFaded: 'rgba(255, 109, 0, 0.08)',
  skyBlue: '#0288D1',
  skyBlueLight: '#4FC3F7',
  skyBlueFaded: 'rgba(2, 136, 209, 0.08)',
  freshGreen: '#2E7D32',
  freshGreenLight: '#66BB6A',
  freshGreenFaded: 'rgba(46, 125, 50, 0.08)',
  coolCyan: '#00ACC1',
  coolCyanFaded: 'rgba(0, 172, 193, 0.08)',
  summerBg: '#FFFDE7',
  summerBgLight: '#FFFFF0',
  gradientSummerHero: ['#FFB300', '#FF6D00'],
  gradientSunscreen: ['#FFF8E1', '#FFF3E0'],
  gradientCool: ['#E0F7FA', '#B2EBF2'],
  gradientDeal: ['#FF6D00', '#FF3D00'],
};

export const SUMMER_LAYOUT = {
  concernPillWidth: 120,
  sunscreenCardWidth: SCREEN_WIDTH * 0.42,
  brandCardSize: (SCREEN_WIDTH - 60) / 3,
  essentialCardSize: (SCREEN_WIDTH - 56) / 4,
  dealCardWidth: SCREEN_WIDTH * 0.75,
  productCardWidth: 150,
};

export const SUMMER_DATA = {
  concerns: [
    { id: 1, label: 'Sun Protection', icon: 'sunny', color: '#FF6D00', active: true },
    { id: 2, label: 'Stay Hydrated', icon: 'water', color: '#0288D1', active: false },
    { id: 3, label: 'Excess Oil', icon: 'water-outline', color: '#FF8F00', active: false },
    { id: 4, label: 'Acne', icon: 'ellipse', color: '#E53935', active: false },
    { id: 5, label: 'Fungal Infection', icon: 'bug', color: '#7B1FA2', active: false },
    { id: 6, label: 'Heat Rash', icon: 'flame', color: '#D84315', active: false },
    { id: 7, label: 'Dark Spots', icon: 'contrast', color: '#5D4037', active: false },
    { id: 8, label: 'Dehydration', icon: 'thermometer', color: '#1565C0', active: false },
  ],

  sunscreens: [
    { id: 1, brand: 'Neutrogena', name: 'Ultra Sheer Dry Touch SPF 50+', price: 699, oldPrice: 899, discount: 22, rating: 4.5, reviews: '12K+', delivery: '29 mins', spf: '50+', type: 'Gel', badge: 'BESTSELLER', variant: '80ml' },
    { id: 2, brand: 'ACNE-UV', name: 'Gel Sunscreen SPF 50 PA+++', price: 549, oldPrice: 650, discount: 16, rating: 4.4, reviews: '8K+', delivery: '29 mins', spf: '50', type: 'Gel', badge: 'TRENDING', variant: '50g' },
    { id: 3, brand: 'Photostable', name: 'Gold Plus Matte Finish SPF 55', price: 799, oldPrice: 999, discount: 20, rating: 4.6, reviews: '15K+', delivery: '3 hours', spf: '55', type: 'Cream', badge: 'PREMIUM', variant: '50g' },
    { id: 4, brand: 'Minimalist', name: 'Multi Vitamin SPF 50 PA++++', price: 499, oldPrice: 599, discount: 17, rating: 4.7, reviews: '20K+', delivery: '29 mins', spf: '50', type: 'Gel', badge: 'TOP RATED', variant: '50ml' },
    { id: 5, brand: 'La Shield', name: 'Mineral Screen SPF 50', price: 599, oldPrice: 750, discount: 20, rating: 4.3, reviews: '6K+', delivery: '3 hours', spf: '50', type: 'Mineral', badge: '', variant: '50g' },
    { id: 6, brand: 'UV Doux', name: 'Silicone Sunscreen SPF 50', price: 649, oldPrice: 820, discount: 21, rating: 4.4, reviews: '9K+', delivery: '29 mins', spf: '50', type: 'Silicone', badge: 'DOCTOR PICK', variant: '75g' },
    { id: 7, brand: 'Derma Co', name: 'Hyaluronic Sunscreen SPF 50', price: 449, oldPrice: 549, discount: 18, rating: 4.5, reviews: '11K+', delivery: '29 mins', spf: '50', type: 'Gel', badge: '', variant: '50g' },
    { id: 8, brand: 'Cetaphil', name: 'Sun SPF 50+ Light Gel', price: 899, oldPrice: 1100, discount: 18, rating: 4.6, reviews: '7K+', delivery: '3 hours', spf: '50+', type: 'Gel', badge: 'DERM FAVE', variant: '50ml' },
  ],

  brands: [
    { id: 1, name: 'Nivea', discount: 'Upto 50% OFF', color: '#003DA5', bgColor: '#E3F2FD' },
    { id: 2, name: 'Ponds', discount: 'Upto 30% OFF', color: '#00695C', bgColor: '#E0F2F1' },
    { id: 3, name: 'Cetaphil', discount: 'Upto 25% OFF', color: '#1565C0', bgColor: '#E8EAF6' },
    { id: 4, name: 'Apollo Pharmacy', discount: 'Upto 35% OFF', color: '#00A651', bgColor: '#E8F5E9' },
    { id: 5, name: 'Fast&Up', discount: 'Upto 35% OFF', color: '#FF6D00', bgColor: '#FFF3E0' },
    { id: 6, name: 'Neutrogena', discount: 'Upto 30% OFF', color: '#E65100', bgColor: '#FBE9E7' },
    { id: 7, name: 'Old Spice', discount: 'Upto 40% OFF', color: '#B71C1C', bgColor: '#FFEBEE' },
    { id: 8, name: 'Garnier', discount: 'Upto 25% OFF', color: '#2E7D32', bgColor: '#E8F5E9' },
    { id: 9, name: 'Biotique', discount: 'Upto 45% OFF', color: '#33691E', bgColor: '#F1F8E9' },
    { id: 10, name: 'Himalaya', discount: 'Upto 30% OFF', color: '#1B5E20', bgColor: '#E8F5E9' },
    { id: 11, name: 'Mamaearth', discount: 'Upto 35% OFF', color: '#F57C00', bgColor: '#FFF8E1' },
    { id: 12, name: 'Zandu', discount: 'Flat 10% OFF', color: '#E65100', bgColor: '#FBE9E7' },
  ],

  essentials: [
    { id: 1, name: 'Sunscreen', icon: 'sunny', color: '#FF6D00', count: '200+ products' },
    { id: 2, name: 'Face Wash', icon: 'water', color: '#0288D1', count: '150+ products' },
    { id: 3, name: 'Moisturizer', icon: 'sparkles', color: '#7B1FA2', count: '180+ products' },
    { id: 4, name: 'After Sun', icon: 'leaf', color: '#2E7D32', count: '80+ products' },
    { id: 5, name: 'Aloe Vera', icon: 'leaf', color: '#388E3C', count: '60+ products' },
    { id: 6, name: 'Electrolytes', icon: 'flash', color: '#F57C00', count: '90+ products' },
    { id: 7, name: 'Cooling Spray', icon: 'snow', color: '#00ACC1', count: '40+ products' },
    { id: 8, name: 'Face Gel', icon: 'ellipse', color: '#5C6BC0', count: '70+ products' },
    { id: 9, name: 'Lip Balm', icon: 'heart', color: '#EC407A', count: '50+ products' },
    { id: 10, name: 'Body Wash', icon: 'water', color: '#26A69A', count: '120+ products' },
    { id: 11, name: 'Roll On', icon: 'refresh', color: '#5D4037', count: '35+ products' },
    { id: 12, name: 'Wipes', icon: 'documents', color: '#78909C', count: '45+ products' },
    { id: 13, name: 'Talcum', icon: 'sparkles', color: '#9575CD', count: '30+ products' },
    { id: 14, name: 'ORS', icon: 'medical', color: '#FF7043', count: '25+ products' },
    { id: 15, name: 'Immunity', icon: 'shield', color: '#66BB6A', count: '55+ products' },
    { id: 16, name: 'Supplements', icon: 'fitness', color: '#42A5F5', count: '100+ products' },
  ],

  staySummerReady: [
    { id: 1, name: 'Perfumes', icon: 'sparkles', color: '#9C27B0' },
    { id: 2, name: 'Talcum Powder', icon: 'sparkles', color: '#5C6BC0' },
    { id: 3, name: 'Wipes', icon: 'documents', color: '#00ACC1' },
    { id: 4, name: 'Roll Ons', icon: 'refresh', color: '#43A047' },
  ],

  staySummerProducts: [
    { id: 1, brand: 'Park Avenue', name: 'Discoverer Eau De...', price: 399.5, oldPrice: 599, discount: 30, delivery: '29 mins', variant: '100 ml spray Bottle', badge: 'BESTSELLER' },
    { id: 2, brand: 'Fogg Scent', name: 'Impressio Perfume...', price: 249.5, oldPrice: 450, discount: 38, delivery: '1 hr', variant: '75 ml spray Bottle', badge: '' },
    { id: 3, brand: 'Park Avenue', name: 'Eau De Parfum...', price: 290.5, oldPrice: 599, discount: 50, delivery: '29 mins', variant: '100 ml spray Bottle', badge: '' },
    { id: 4, brand: 'Wild Stone', name: 'Ultra Sensual EDP', price: 375, oldPrice: 599, discount: 37, delivery: '3 hours', variant: '100 ml spray', badge: 'TRENDING' },
    { id: 5, brand: 'Engage', name: 'Homme Deodorant', price: 199, oldPrice: 275, discount: 28, delivery: '29 mins', variant: '165 ml spray', badge: '' },
    { id: 6, brand: 'Denver', name: 'Hamilton Imperial', price: 225, oldPrice: 350, discount: 36, delivery: '29 mins', variant: '100 ml spray', badge: '' },
  ],

  protectGlow: [
    { id: 'cleanser', label: 'Cleansers' },
    { id: 'serum', label: 'Face Serums' },
    { id: 'bodywash', label: 'Body Wash' },
    { id: 'facegel', label: 'Face Gel' },
    { id: 'toner', label: 'Toner' },
    { id: 'facemask', label: 'Face Mask' },
  ],

  protectGlowProducts: [
    { id: 1, brand: 'Cetaphil', name: 'Oily Skin Cleanser, 118 ml', price: 559.2, oldPrice: 699, discount: 20, delivery: '29 mins', badge: 'BUY 2, +3% OFF', rating: 4.5 },
    { id: 2, brand: 'CeraVe', name: 'Hydrating Cleanser 88 ml', price: 290.4, oldPrice: 330, discount: 12, delivery: '29 mins', badge: '', rating: 4.6 },
    { id: 3, brand: 'Cetaphil', name: 'Gentle Skin Cleanser', price: 356.07, oldPrice: 420, discount: 15, delivery: '29 mins', badge: 'BUY 2, +3% OFF', rating: 4.4 },
    { id: 4, brand: 'Simple', name: 'Refreshing Face Wash Gel', price: 299, oldPrice: 375, discount: 20, delivery: '3 hours', badge: '', rating: 4.3 },
    { id: 5, brand: 'Himalaya', name: 'Purifying Neem Face Wash', price: 189, oldPrice: 225, discount: 16, delivery: '29 mins', badge: 'BESTSELLER', rating: 4.7 },
    { id: 6, brand: 'Plum', name: 'Green Tea Pore Cleansing', price: 345, oldPrice: 425, discount: 19, delivery: '29 mins', badge: '', rating: 4.4 },
  ],

  dealOfDay: {
    title: 'Deal of the Day',
    product: {
      name: 'Neutrogena Ultra Sheer Combo Pack',
      description: 'SPF 50+ Sunscreen 80ml + Hydro Boost Water Gel 50g',
      originalPrice: 1598,
      dealPrice: 899,
      discount: 44,
      rating: 4.7,
      reviews: '25K+',
      stock: 'Only 23 left!',
      endTime: '23:59:59',
    },
  },

  expertSunscreens: [
    {
      id: 1,
      brand: 'La Roche-Posay',
      name: 'Anthelios UVMune 400 SPF 50+',
      description: 'Derm-recommended daily sun protection. Ultra-long UVA protection.',
      price: 1299,
      oldPrice: 1699,
      discount: 24,
      badge: 'DERMATOLOGIST PICK',
      features: ['SPF 50+', 'PA++++', 'Fragrance Free', 'Non-Comedogenic'],
      rating: 4.8,
    },
    {
      id: 2,
      brand: 'Bioderma',
      name: 'Photoderm MAX SPF 50+',
      description: 'Patented Cellular Bioprotection for sensitive skin.',
      price: 1099,
      oldPrice: 1450,
      discount: 24,
      badge: 'AWARD WINNER',
      features: ['SPF 50+', 'Water Resistant', 'Hypoallergenic'],
      rating: 4.7,
    },
    {
      id: 3,
      brand: 'Avene',
      name: 'Very High Protection Fluid SPF 50+',
      description: 'Thermal spring water enriched. For sensitive skin.',
      price: 1599,
      oldPrice: 1999,
      discount: 20,
      badge: 'LUXURY PICK',
      features: ['SPF 50+', 'Thermal Water', 'Ultra-Light'],
      rating: 4.9,
    },
  ],

  summerHydration: [
    { id: 1, name: 'Glucose Drinks', icon: 'cafe', color: '#FF8F00' },
    { id: 2, name: 'Herbal Juice', icon: 'leaf', color: '#2E7D32' },
    { id: 3, name: 'Immunity Supplements', icon: 'shield', color: '#1565C0' },
    { id: 4, name: 'Skin Supplements', icon: 'sparkles', color: '#7B1FA2' },
    { id: 5, name: 'Fruit Juice', icon: 'nutrition', color: '#E65100' },
    { id: 6, name: 'Coconut Water', icon: 'water', color: '#00695C' },
  ],
};

export default { SUMMER_COLORS, SUMMER_LAYOUT, SUMMER_DATA };
