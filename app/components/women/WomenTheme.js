/**
 * ============================================================================
 * APOLLO 24/7 - WOMEN SECTION THEME & DATA
 * ============================================================================
 */

import { Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION } from '../home/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const WOMEN_COLORS = {
  womenPink: '#C2185B',
  womenPinkLight: '#F48FB1',
  womenPinkDark: '#880E4F',
  womenPinkFaded: 'rgba(194, 24, 91, 0.08)',
  womenPinkSubtle: 'rgba(194, 24, 91, 0.15)',
  womenPurple: '#7B1FA2',
  womenPurpleLight: '#CE93D8',
  womenPurpleFaded: 'rgba(123, 31, 162, 0.08)',
  womenRose: '#E91E63',
  womenRoseFaded: 'rgba(233, 30, 99, 0.08)',
  womenCoral: '#FF5252',
  womenCoralFaded: 'rgba(255, 82, 82, 0.08)',
  womenTeal: '#00897B',
  womenTealFaded: 'rgba(0, 137, 123, 0.08)',
  womenLavender: '#9575CD',
  womenLavenderFaded: 'rgba(149, 117, 205, 0.08)',
  gradientHero: ['#FCE4EC', '#F8BBD0'],
  gradientBanner: ['#F3E5F5', '#E1BEE7'],
  gradientMotherhood: ['#FFF3E0', '#FFE0B2'],
};

export const WOMEN_LAYOUT = {
  categoryPillWidth: 130,
  napkinCardWidth: (SCREEN_WIDTH - 56) / 3,
  motherhoodTabWidth: 100,
  productCardWidth: 150,
  brandCardSize: (SCREEN_WIDTH - 56) / 3,
  conditionCardWidth: SCREEN_WIDTH * 0.65,
  sponsorLogoWidth: 80,
};

export const WOMEN_DATA = {
  heroBanner: {
    title: 'Celebrate Her Health',
    subtitle: 'Every woman deserves the best care',
    sponsors: [
      { id: 1, name: 'Stayfree', color: '#E53935' },
      { id: 2, name: 'Horlicks', color: '#FF8F00' },
      { id: 3, name: 'Ensure', color: '#1565C0' },
    ],
  },

  categories: [
    { id: 1, label: 'Feminine Hygiene', icon: 'flower', color: '#E91E63', active: true },
    { id: 2, label: 'Skin Care', icon: 'sparkles', color: '#7B1FA2', active: false },
    { id: 3, label: 'Hair Care', icon: 'cut', color: '#FF5722', active: false },
    { id: 4, label: 'Women Nutrition', icon: 'nutrition', color: '#2E7D32', active: false },
    { id: 5, label: 'Mother Care', icon: 'heart', color: '#C2185B', active: false },
    { id: 6, label: 'Intimate Wash', icon: 'water', color: '#00897B', active: false },
    { id: 7, label: 'Period Pain', icon: 'medical', color: '#D32F2F', active: false },
    { id: 8, label: 'Fertility', icon: 'leaf', color: '#388E3C', active: false },
  ],

  napkinSizes: [
    { id: 1, size: 'Regular', description: 'Light flow days', length: '230mm', pads: '8-10 pads', icon: 'remove', color: '#66BB6A' },
    { id: 2, size: 'Medium', description: 'Normal flow', length: '250mm', pads: '6-8 pads', icon: 'remove', color: '#42A5F5' },
    { id: 3, size: 'Large', description: 'Heavy flow', length: '280mm', pads: '6-8 pads', icon: 'remove', color: '#7E57C2' },
    { id: 4, size: 'XL', description: 'Very heavy flow', length: '310mm', pads: '6-7 pads', icon: 'remove', color: '#EF5350' },
    { id: 5, size: 'XXL', description: 'Night use', length: '340mm', pads: '6-7 pads', icon: 'remove', color: '#AB47BC' },
    { id: 6, size: 'XXXL', description: 'Extra night protection', length: '410mm', pads: '5-6 pads', icon: 'remove', color: '#EC407A' },
  ],

  motherhoodTabs: [
    { id: 'pregnancy_nutrition', label: 'Pregnancy Nutrition', icon: 'nutrition' },
    { id: 'lactation', label: 'Lactation Supplement', icon: 'water' },
    { id: 'breast_pumps', label: 'Breast Pumps', icon: 'medical' },
    { id: 'stretch_marks', label: 'Stretch Mark Care', icon: 'sparkles' },
    { id: 'pregnancy_tests', label: 'Pregnancy Tests', icon: 'flask' },
    { id: 'nursing_pads', label: 'Nursing Pads', icon: 'heart' },
  ],

  motherhoodProducts: [
    { id: 1, brand: 'Prenatal DHA', name: 'DHA + Folic Acid + Iron Capsules', price: 699, oldPrice: 899, discount: 22, rating: 4.6, reviews: '5K+', delivery: '29 mins', badge: 'BESTSELLER' },
    { id: 2, brand: 'Horlicks Mother', name: "Mother's Plus Health Drink", price: 549, oldPrice: 650, discount: 16, rating: 4.5, reviews: '8K+', delivery: '29 mins', badge: '' },
    { id: 3, brand: 'Similac', name: 'Similac Mom Prenatal Nutrition', price: 899, oldPrice: 1099, discount: 18, rating: 4.7, reviews: '3K+', delivery: '3 hours', badge: 'PREMIUM' },
    { id: 4, brand: 'Pregnacare', name: 'Max Pregnancy Multivitamin', price: 1199, oldPrice: 1499, discount: 20, rating: 4.8, reviews: '2K+', delivery: '29 mins', badge: 'DOCTOR PICK' },
    { id: 5, brand: 'MamaEarth', name: 'Body Butter for Stretch Marks', price: 399, oldPrice: 499, discount: 20, rating: 4.4, reviews: '6K+', delivery: '29 mins', badge: '' },
    { id: 6, brand: 'Medela', name: 'Swing Maxi Double Electric Pump', price: 12999, oldPrice: 15999, discount: 19, rating: 4.9, reviews: '1K+', delivery: 'Tomorrow', badge: 'PREMIUM' },
  ],

  herHealthEssentials: [
    { id: 1, name: 'Iron Supplements', icon: 'fitness', color: '#C62828', count: '50+ products' },
    { id: 2, name: 'Calcium + Vit D', icon: 'medical', color: '#1565C0', count: '40+ products' },
    { id: 3, name: 'Folic Acid', icon: 'leaf', color: '#2E7D32', count: '30+ products' },
    { id: 4, name: 'Biotin', icon: 'sparkles', color: '#7B1FA2', count: '35+ products' },
    { id: 5, name: 'Multivitamins', icon: 'shield', color: '#FF6B35', count: '60+ products' },
    { id: 6, name: 'Omega-3 DHA', icon: 'water', color: '#0288D1', count: '25+ products' },
    { id: 7, name: 'Probiotics', icon: 'medical', color: '#00897B', count: '20+ products' },
    { id: 8, name: 'Evening Primrose', icon: 'flower', color: '#E91E63', count: '15+ products' },
    { id: 9, name: 'Cranberry', icon: 'nutrition', color: '#D32F2F', count: '18+ products' },
    { id: 10, name: 'Collagen', icon: 'sparkles', color: '#9C27B0', count: '22+ products' },
    { id: 11, name: 'Hair Vitamins', icon: 'cut', color: '#5D4037', count: '28+ products' },
    { id: 12, name: 'UTI Care', icon: 'shield', color: '#00ACC1', count: '12+ products' },
  ],

  conditionCards: [
    {
      id: 1, name: 'PCOS / PCOD', icon: 'medical',
      color: '#7B1FA2', bgColor: '#F3E5F5',
      description: 'Polycystic Ovary Syndrome affects 1 in 5 women in India. Manage symptoms with right supplements.',
      symptoms: ['Irregular periods', 'Weight gain', 'Acne', 'Hair thinning'],
      products: 4, topProduct: 'Inositol + Folic Acid',
    },
    {
      id: 2, name: 'Menstrual Pain', icon: 'pulse',
      color: '#C62828', bgColor: '#FFEBEE',
      description: 'Period cramps affect 80% of women. Find relief with proven solutions.',
      symptoms: ['Lower abdomen pain', 'Back pain', 'Nausea', 'Fatigue'],
      products: 6, topProduct: 'Meftal Spas',
    },
    {
      id: 3, name: 'Cramps & Bloating', icon: 'water',
      color: '#00897B', bgColor: '#E0F2F1',
      description: 'PMS symptoms can be managed with supplements and lifestyle changes.',
      symptoms: ['Bloating', 'Mood swings', 'Breast tenderness', 'Headache'],
      products: 5, topProduct: 'Magnesium + B6',
    },
    {
      id: 4, name: 'Urinary Tract', icon: 'shield',
      color: '#1565C0', bgColor: '#E3F2FD',
      description: 'UTIs are common in women. Prevent and manage with cranberry & probiotics.',
      symptoms: ['Burning sensation', 'Frequent urination', 'Pain', 'Cloudy urine'],
      products: 3, topProduct: 'Cranberry Extract',
    },
    {
      id: 5, name: 'Hormonal Imbalance', icon: 'analytics',
      color: '#E91E63', bgColor: '#FCE4EC',
      description: 'Hormonal fluctuations can affect mood, weight, and overall health.',
      symptoms: ['Mood swings', 'Weight changes', 'Sleep issues', 'Fatigue'],
      products: 4, topProduct: 'Vitex (Chasteberry)',
    },
  ],

  trustedBrands: [
    { id: 1, name: 'Horlicks', color: '#FF8F00', bgColor: '#FFF8E1' },
    { id: 2, name: 'Stayfree', color: '#E53935', bgColor: '#FFEBEE' },
    { id: 3, name: 'Whisper', color: '#1565C0', bgColor: '#E3F2FD' },
    { id: 4, name: 'Sofy', color: '#7B1FA2', bgColor: '#F3E5F5' },
    { id: 5, name: 'Nua', color: '#00897B', bgColor: '#E0F2F1' },
    { id: 6, name: 'Sirona', color: '#E91E63', bgColor: '#FCE4EC' },
    { id: 7, name: 'PeeSafe', color: '#FF6B35', bgColor: '#FFF3E0' },
    { id: 8, name: 'Plush', color: '#9C27B0', bgColor: '#F3E5F5' },
    { id: 9, name: 'Carmesi', color: '#00ACC1', bgColor: '#E0F7FA' },
    { id: 10, name: 'Everteen', color: '#2E7D32', bgColor: '#E8F5E9' },
    { id: 11, name: 'VWash', color: '#C2185B', bgColor: '#FCE4EC' },
    { id: 12, name: 'Kotex', color: '#D32F2F', bgColor: '#FFEBEE' },
  ],

  testimonials: [
    { id: 1, name: 'Priya S.', age: 28, text: 'Apollo 24/7 has been a lifesaver for my PCOS management. Easy to order supplements monthly.', rating: 5, avatar: 'woman' },
    { id: 2, name: 'Ananya R.', age: 32, text: 'The motherhood care section helped me find everything I needed during pregnancy. Fast delivery!', rating: 5, avatar: 'woman' },
    { id: 3, name: 'Meera K.', age: 25, text: 'Love the napkin size guide! Finally found the right fit. The auto-repeat order is so convenient.', rating: 4, avatar: 'woman' },
    { id: 4, name: 'Divya T.', age: 35, text: 'The iron and calcium combo they recommended really improved my energy levels.', rating: 5, avatar: 'woman' },
  ],

  periodTracker: {
    title: 'Track Your Cycle',
    subtitle: 'Get personalized product recommendations',
    features: ['Predict next period', 'Fertile window alerts', 'Symptom tracking', 'Product reminders'],
  },

  womenWellnessTips: [
    { id: 1, title: 'Iron-Rich Diet', description: 'Include spinach, lentils, and fortified cereals to prevent anemia.', icon: 'nutrition', color: '#C62828' },
    { id: 2, title: 'Calcium Intake', description: 'Women need 1000mg calcium daily. Dairy, almonds, and supplements help.', icon: 'medical', color: '#1565C0' },
    { id: 3, title: 'Regular Check-ups', description: 'Annual pap smear and mammogram after 30 can be life-saving.', icon: 'fitness', color: '#2E7D32' },
    { id: 4, title: 'Hormonal Balance', description: 'Exercise, sleep, and stress management help balance hormones.', icon: 'analytics', color: '#7B1FA2' },
    { id: 5, title: 'Bone Health', description: 'Weight-bearing exercises + Vitamin D prevent osteoporosis.', icon: 'body', color: '#E91E63' },
    { id: 6, title: 'Mental Wellness', description: 'Mindfulness and therapy support emotional wellbeing.', icon: 'happy', color: '#00897B' },
  ],
};

export default { WOMEN_COLORS, WOMEN_LAYOUT, WOMEN_DATA };
