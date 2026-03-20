/**
 * ============================================================================
 * APOLLO 24/7 - MEN SECTION THEME & DATA
 * ============================================================================
 */

import { Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION } from '../home/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const MEN_COLORS = {
  menBlue: '#1565C0',
  menBlueLight: '#42A5F5',
  menBlueDark: '#0D47A1',
  menBlueFaded: 'rgba(21, 101, 192, 0.08)',
  menBlueSubtle: 'rgba(21, 101, 192, 0.15)',
  menSteel: '#37474F',
  menSteelLight: '#78909C',
  menSteelFaded: 'rgba(55, 71, 79, 0.08)',
  menCharcoal: '#263238',
  menOrange: '#E65100',
  menOrangeFaded: 'rgba(230, 81, 0, 0.08)',
  menGreen: '#2E7D32',
  menGreenFaded: 'rgba(46, 125, 50, 0.08)',
  menRed: '#C62828',
  menRedFaded: 'rgba(198, 40, 40, 0.08)',
  menPurple: '#6A1B9A',
  menPurpleFaded: 'rgba(106, 27, 154, 0.08)',
  menTeal: '#00695C',
  menTealFaded: 'rgba(0, 105, 92, 0.08)',
  gradientHero: ['#263238', '#37474F'],
  gradientWellness: ['#E3F2FD', '#BBDEFB'],
  gradientFitness: ['#E8F5E9', '#C8E6C9'],
};

export const MEN_LAYOUT = {
  concernCardWidth: SCREEN_WIDTH * 0.38,
  wellbeingCardSize: (SCREEN_WIDTH - 56) / 4,
  groomingTabWidth: 100,
  intimateTabWidth: 100,
  productCardWidth: 150,
  brandCardSize: (SCREEN_WIDTH - 60) / 3,
};

export const MEN_DATA = {
  concerns: [
    { id: 1, name: 'Sexual Wellness', icon: 'heart', color: '#C62828', bgColor: '#FFEBEE', description: 'Performance & intimate health', products: '100+' },
    { id: 2, name: 'Hair Growth', icon: 'cut', color: '#5D4037', bgColor: '#EFEBE9', description: 'Hair fall solutions & regrowth', products: '80+' },
    { id: 3, name: 'Fitness', icon: 'fitness', color: '#1565C0', bgColor: '#E3F2FD', description: 'Protein, supplements & more', products: '200+' },
    { id: 4, name: 'Daily Wellness', icon: 'shield', color: '#2E7D32', bgColor: '#E8F5E9', description: 'Vitamins & daily nutrition', products: '150+' },
    { id: 5, name: 'Grooming', icon: 'sparkles', color: '#37474F', bgColor: '#ECEFF1', description: 'Skincare & personal care', products: '120+' },
    { id: 6, name: 'Stress Relief', icon: 'leaf', color: '#6A1B9A', bgColor: '#F3E5F5', description: 'Sleep, calm & mental health', products: '60+' },
  ],

  wellbeingGrid: [
    { id: 1, name: 'Condoms', icon: 'shield', color: '#C62828' },
    { id: 2, name: 'Hair Serum', icon: 'water', color: '#5D4037' },
    { id: 3, name: 'Perfumes', icon: 'sparkles', color: '#6A1B9A' },
    { id: 4, name: 'Face Wash', icon: 'water', color: '#1565C0' },
    { id: 5, name: 'Protein', icon: 'fitness', color: '#2E7D32' },
    { id: 6, name: 'Amino Acids', icon: 'flask', color: '#E65100' },
    { id: 7, name: 'Supplements', icon: 'medical', color: '#00695C' },
    { id: 8, name: 'Shilajit', icon: 'diamond', color: '#37474F' },
    { id: 9, name: 'Delay Sprays', icon: 'time', color: '#C62828' },
    { id: 10, name: 'Body Wash', icon: 'water', color: '#0288D1' },
    { id: 11, name: 'Beard Oil', icon: 'water', color: '#5D4037' },
    { id: 12, name: 'Pre-Workout', icon: 'flash', color: '#FF6D00' },
    { id: 13, name: 'Multivitamin', icon: 'shield', color: '#388E3C' },
    { id: 14, name: 'Omega-3', icon: 'water', color: '#1565C0' },
    { id: 15, name: 'Deodorant', icon: 'sparkles', color: '#7B1FA2' },
    { id: 16, name: 'Hair Wax', icon: 'cut', color: '#455A64' },
  ],

  groomingTabs: [
    { id: 'razor', label: 'Razor', icon: 'cut' },
    { id: 'shaving_foam', label: 'Shaving Foam', icon: 'water' },
    { id: 'perfume', label: 'Perfume', icon: 'sparkles' },
    { id: 'cartridge', label: 'Cartridge', icon: 'build' },
    { id: 'aftershave', label: 'After Shave', icon: 'water' },
    { id: 'beard', label: 'Beard Styling', icon: 'cut' },
  ],

  groomingProducts: [
    { id: 1, brand: 'Gillette', name: 'Mach3 Turbo Razor', price: 449, oldPrice: 599, discount: 25, rating: 4.6, reviews: '15K+', delivery: '29 mins', badge: 'BESTSELLER' },
    { id: 2, brand: 'Bombay Shaving', name: 'Precision Safety Razor', price: 599, oldPrice: 799, discount: 25, rating: 4.5, reviews: '8K+', delivery: '29 mins', badge: '' },
    { id: 3, brand: 'Philips', name: 'OneBlade Pro QP6520', price: 3299, oldPrice: 4499, discount: 27, rating: 4.8, reviews: '12K+', delivery: '3 hours', badge: 'PREMIUM' },
    { id: 4, brand: 'Beardo', name: 'Godfather Beard Oil', price: 399, oldPrice: 550, discount: 27, rating: 4.4, reviews: '10K+', delivery: '29 mins', badge: '' },
    { id: 5, brand: 'Ustraa', name: 'Beard Growth Oil', price: 350, oldPrice: 500, discount: 30, rating: 4.5, reviews: '9K+', delivery: '29 mins', badge: 'TRENDING' },
    { id: 6, brand: 'The Man Company', name: 'Charcoal Face Wash', price: 299, oldPrice: 399, discount: 25, rating: 4.3, reviews: '7K+', delivery: '29 mins', badge: '' },
  ],

  intimateTabs: [
    { id: 'condoms', label: 'Condoms', icon: 'shield' },
    { id: 'lubricants', label: 'Lubricants', icon: 'water' },
    { id: 'massagers', label: 'Massagers', icon: 'hand-left' },
    { id: 'delay_sprays', label: 'Delay Sprays', icon: 'time' },
    { id: 'intimate_oil', label: 'Intimate Oil', icon: 'water' },
  ],

  intimateProducts: [
    { id: 1, brand: 'Durex', name: 'Air Ultra Thin Condoms', price: 249, oldPrice: 350, discount: 29, rating: 4.5, reviews: '20K+', delivery: '29 mins', badge: 'BESTSELLER', variant: '10 Count' },
    { id: 2, brand: 'Manforce', name: 'Game 3-in-1 Ribbed', price: 199, oldPrice: 280, discount: 29, rating: 4.3, reviews: '12K+', delivery: '29 mins', badge: '', variant: '10 Count' },
    { id: 3, brand: 'Skore', name: 'Champion Dotted Condoms', price: 175, oldPrice: 250, discount: 30, rating: 4.4, reviews: '8K+', delivery: '29 mins', badge: '', variant: '10 Count' },
    { id: 4, brand: 'KamaSutra', name: 'Longlast Condoms', price: 225, oldPrice: 320, discount: 30, rating: 4.2, reviews: '6K+', delivery: '3 hours', badge: 'POPULAR', variant: '12 Count' },
    { id: 5, brand: 'Durex', name: 'Play Lube Gel', price: 350, oldPrice: 450, discount: 22, rating: 4.6, reviews: '5K+', delivery: '29 mins', badge: '', variant: '50ml' },
    { id: 6, brand: 'Man Matters', name: 'Delay Spray for Men', price: 499, oldPrice: 699, discount: 29, rating: 4.1, reviews: '3K+', delivery: '29 mins', badge: 'DISCREET', variant: '20ml' },
  ],

  trustedBrands: [
    { id: 1, name: 'Gillette', color: '#0D47A1', bgColor: '#E3F2FD' },
    { id: 2, name: 'Beardo', color: '#37474F', bgColor: '#ECEFF1' },
    { id: 3, name: 'Ustraa', color: '#E65100', bgColor: '#FFF3E0' },
    { id: 4, name: 'Man Company', color: '#263238', bgColor: '#CFD8DC' },
    { id: 5, name: 'Bombay Shaving', color: '#1565C0', bgColor: '#E3F2FD' },
    { id: 6, name: 'Durex', color: '#C62828', bgColor: '#FFEBEE' },
    { id: 7, name: 'MuscleBlaze', color: '#2E7D32', bgColor: '#E8F5E9' },
    { id: 8, name: 'Old Spice', color: '#B71C1C', bgColor: '#FFEBEE' },
    { id: 9, name: 'Nivea Men', color: '#0D47A1', bgColor: '#E3F2FD' },
    { id: 10, name: 'Park Avenue', color: '#1B5E20', bgColor: '#E8F5E9' },
    { id: 11, name: 'Philips', color: '#37474F', bgColor: '#ECEFF1' },
    { id: 12, name: 'Man Matters', color: '#6A1B9A', bgColor: '#F3E5F5' },
  ],

  fitnessProducts: [
    { id: 1, brand: 'MuscleBlaze', name: 'Biozyme Whey Protein 2kg', price: 3999, oldPrice: 5999, discount: 33, rating: 4.7, reviews: '25K+', delivery: '3 hours', badge: 'BESTSELLER' },
    { id: 2, brand: 'Optimum Nutrition', name: 'Gold Standard 100% Whey 2lb', price: 4499, oldPrice: 5999, discount: 25, rating: 4.8, reviews: '18K+', delivery: '3 hours', badge: 'PREMIUM' },
    { id: 3, brand: 'Fast&Up', name: 'Activate Pre-Workout 30 tabs', price: 899, oldPrice: 1200, discount: 25, rating: 4.5, reviews: '8K+', delivery: '29 mins', badge: '' },
    { id: 4, brand: 'GNC', name: 'Mega Men Multivitamin 60 tabs', price: 1299, oldPrice: 1699, discount: 24, rating: 4.6, reviews: '6K+', delivery: '29 mins', badge: 'DOCTOR PICK' },
    { id: 5, brand: 'HealthKart', name: 'HK Vitals Fish Oil 60 caps', price: 499, oldPrice: 699, discount: 29, rating: 4.4, reviews: '10K+', delivery: '29 mins', badge: '' },
    { id: 6, brand: 'Kapiva', name: 'Himalayan Shilajit Resin 20g', price: 1599, oldPrice: 2499, discount: 36, rating: 4.3, reviews: '4K+', delivery: '29 mins', badge: 'TRENDING' },
  ],

  testimonials: [
    { id: 1, name: 'Rahul M.', age: 30, text: 'The protein supplements section has everything I need. Fast delivery and genuine products.', rating: 5, avatar: 'man' },
    { id: 2, name: 'Arjun S.', age: 27, text: 'Great grooming products collection. The beard oil from Beardo changed my grooming routine.', rating: 4, avatar: 'man' },
    { id: 3, name: 'Vikram P.', age: 35, text: 'Discreet packaging for intimate products is much appreciated. Reliable and fast delivery.', rating: 5, avatar: 'man' },
    { id: 4, name: 'Karan D.', age: 28, text: 'The fitness section is comprehensive. Found everything from pre-workout to recovery supplements.', rating: 5, avatar: 'man' },
  ],

  menWellnessTips: [
    { id: 1, title: 'Protein Intake', description: 'Aim for 1.6-2.2g protein per kg body weight for muscle building.', icon: 'fitness', color: '#2E7D32' },
    { id: 2, title: 'Testosterone Health', description: 'Zinc, Vitamin D, and quality sleep are key for hormonal balance.', icon: 'shield', color: '#1565C0' },
    { id: 3, title: 'Heart Health', description: 'Men over 30 should monitor cholesterol and blood pressure regularly.', icon: 'heart', color: '#C62828' },
    { id: 4, title: 'Stress Management', description: 'Regular exercise and meditation reduce cortisol levels significantly.', icon: 'leaf', color: '#6A1B9A' },
    { id: 5, title: 'Grooming Routine', description: 'Daily face wash, weekly exfoliation, and daily SPF protection.', icon: 'sparkles', color: '#37474F' },
    { id: 6, title: 'Sleep Quality', description: '7-9 hours of quality sleep is essential for recovery and health.', icon: 'moon', color: '#00695C' },
  ],

  hairCareProducts: [
    { id: 1, brand: 'Man Matters', name: 'Hair Growth Kit', price: 1499, oldPrice: 2499, discount: 40, rating: 4.3, reviews: '5K+', delivery: '29 mins', badge: 'POPULAR' },
    { id: 2, brand: 'Beardo', name: 'Hair Growth Pro Serum', price: 599, oldPrice: 899, discount: 33, rating: 4.4, reviews: '7K+', delivery: '29 mins', badge: '' },
    { id: 3, brand: 'Traya', name: 'Hair Loss Treatment Kit', price: 1999, oldPrice: 3499, discount: 43, rating: 4.2, reviews: '3K+', delivery: '3 hours', badge: 'DOCTOR PICK' },
    { id: 4, brand: 'Minoxidil', name: 'Topical Solution 5% 60ml', price: 499, oldPrice: 650, discount: 23, rating: 4.5, reviews: '15K+', delivery: '29 mins', badge: 'BESTSELLER' },
  ],
};

export default { MEN_COLORS, MEN_LAYOUT, MEN_DATA };
