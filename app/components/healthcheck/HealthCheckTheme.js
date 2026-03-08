/**
 * ============================================================================
 * APOLLO 24/7 - HEALTH CHECK SECTION THEME & DATA
 * ============================================================================
 */

import { Dimensions } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION } from '../home/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const HC_COLORS = {
  healthBlue: '#1565C0',
  healthBlueLight: '#42A5F5',
  healthBlueDark: '#0D47A1',
  healthBlueFaded: 'rgba(21, 101, 192, 0.08)',
  healthBlueSubtle: 'rgba(21, 101, 192, 0.15)',
  healthGreen: '#2E7D32',
  healthGreenLight: '#66BB6A',
  healthGreenFaded: 'rgba(46, 125, 50, 0.08)',
  healthOrange: '#FF6B35',
  healthOrangeFaded: 'rgba(255, 107, 53, 0.08)',
  healthPurple: '#7B1FA2',
  healthPurpleFaded: 'rgba(123, 31, 162, 0.08)',
  healthRed: '#C62828',
  healthRedFaded: 'rgba(198, 40, 40, 0.08)',
  healthTeal: '#00897B',
  healthTealFaded: 'rgba(0, 137, 123, 0.08)',
  gradientHero: ['#E3F2FD', '#BBDEFB'],
  gradientPromo: ['#FFF3E0', '#FFE0B2'],
  gradientChallenge: ['#E8F5E9', '#C8E6C9'],
  gradientTaxSaver: ['#F3E5F5', '#E1BEE7'],
};

export const HC_LAYOUT = {
  promoCardWidth: SCREEN_WIDTH * 0.7,
  segmentCardWidth: (SCREEN_WIDTH - 52) / 2,
  taxPackageWidth: SCREEN_WIDTH * 0.42,
  couponCardWidth: SCREEN_WIDTH * 0.65,
  checkupCardWidth: SCREEN_WIDTH * 0.6,
  labStepWidth: 100,
};

export const HC_DATA = {
  promoBanners: [
    { id: 1, title: "Women's Wellness", discount: '60% off', coupon: 'WOMENCARE15', bgColor: '#FFF0F5', textColor: '#C2185B', icon: 'woman', subtitle: 'Full body checkup + vitamin panel' },
    { id: 2, title: 'Vitamin Tests', discount: '60% off', coupon: 'VITAMIN60', bgColor: '#FFFDE7', textColor: '#F57F17', icon: 'sunny', subtitle: 'Vit D, B12, Iron & more' },
    { id: 3, title: 'Diabetes Screening', discount: '50% off', coupon: 'DIABETES50', bgColor: '#E8F5E9', textColor: '#2E7D32', icon: 'pulse', subtitle: 'HbA1c + fasting glucose + lipid panel' },
    { id: 4, title: 'Heart Health Check', discount: '45% off', coupon: 'HEART45', bgColor: '#FCE4EC', textColor: '#C62828', icon: 'heart', subtitle: 'ECG + lipid profile + cardiac markers' },
    { id: 5, title: 'Thyroid Panel', discount: '55% off', coupon: 'THYROID55', bgColor: '#E0F7FA', textColor: '#00838F', icon: 'medical', subtitle: 'Complete T3, T4, TSH panel' },
  ],

  ultimateChallenge: {
    title: 'Ultimate Health Challenge',
    subtitle: 'Comprehensive health assessment at unbeatable prices',
    badge: 'POPULAR',
    stats: { tests: '80+', parameters: '200+', reports: '24 hrs' },
    segments: [
      { id: 1, name: 'Men 18-45', icon: 'man', tests: 82, price: 1999, oldPrice: 4999, discount: 60, color: '#1565C0', popular: true, description: 'Complete health screening for young men' },
      { id: 2, name: 'Women 18-45', icon: 'woman', tests: 85, price: 2199, oldPrice: 5499, discount: 60, color: '#C2185B', popular: true, description: 'Full body + hormone panel for young women' },
      { id: 3, name: 'Sr Men 45+', icon: 'man', tests: 90, price: 2999, oldPrice: 6999, discount: 57, color: '#00695C', popular: false, description: 'Advanced screening for senior men' },
      { id: 4, name: 'Sr Women 45+', icon: 'woman', tests: 92, price: 3199, oldPrice: 7499, discount: 57, color: '#7B1FA2', popular: false, description: 'Complete senior women health package' },
    ],
  },

  taxSaverPackages: [
    { id: 1, name: 'Tax Saver Essential', tests: 60, price: 1499, oldPrice: 3999, includes: ['CBC', 'Liver', 'Kidney', 'Thyroid', 'Lipid', 'Diabetes'], color: '#1565C0', badge: '' },
    { id: 2, name: 'Tax Saver Xpert', tests: 87, price: 2499, oldPrice: 5999, includes: ['Essential +', 'Vitamin Panel', 'Cardiac', 'Hormone', 'Cancer Markers'], color: '#FF6B35', badge: 'POPULAR' },
    { id: 3, name: 'Tax Saver Gold', tests: 99, price: 3599, oldPrice: 8999, includes: ['Xpert +', 'Full Body', 'Genetic Risk', 'Allergy Panel', 'Bone Density'], color: '#D4A017', badge: 'BEST VALUE' },
    { id: 4, name: 'Tax Saver Platinum', tests: 110, price: 4999, oldPrice: 12999, includes: ['Gold +', 'MRI Brain', 'CT Chest', 'PET Scan', 'Advanced Genomics'], color: '#7B1FA2', badge: 'PREMIUM' },
    { id: 5, name: 'Advance M', tests: 67, price: 1799, oldPrice: 4499, includes: ['Men Panel', 'PSA', 'Testosterone', 'Liver', 'Kidney', 'Diabetes'], color: '#00897B', badge: '' },
    { id: 6, name: 'Advance F', tests: 72, price: 1999, oldPrice: 4999, includes: ['Women Panel', 'Hormone', 'Iron', 'Calcium', 'Thyroid', 'Pap Smear'], color: '#C2185B', badge: '' },
  ],

  bestValueCheckups: [
    { id: 1, name: 'Full Body Health Checkup Gold', tests: 71, includes: 'INCLUDES VIT B12', price: 2080, oldPrice: 5200, badge: '' },
    { id: 2, name: 'Full Body Checkup Platinum', tests: 99, includes: 'INCLUDES VIT D, B12', price: 3599, oldPrice: 8999, badge: 'BESTSELLER' },
    { id: 3, name: 'Apollo Comprehensive Health Check', tests: 120, includes: 'INCLUDES VIT D, B12, IRON', price: 4999, oldPrice: 11999, badge: 'PREMIUM' },
    { id: 4, name: 'Basic Health Checkup', tests: 45, includes: 'INCLUDES CBC, LIPID', price: 999, oldPrice: 2499, badge: 'BUDGET PICK' },
  ],

  coupons: [
    { id: 1, code: 'WELCOME25', title: 'FLAT 25% OFF', subtitle: 'on your first order', minOrder: 999, maxDiscount: 500, bgColor: '#E3F2FD', textColor: '#1565C0' },
    { id: 2, code: 'FAMILY20', title: 'FLAT 20% OFF', subtitle: 'on family packages', minOrder: 2999, maxDiscount: 1000, bgColor: '#E8F5E9', textColor: '#2E7D32' },
    { id: 3, code: 'SENIOR30', title: '30% OFF', subtitle: 'for 60+ age group', minOrder: 1499, maxDiscount: 750, bgColor: '#FFF3E0', textColor: '#E65100' },
    { id: 4, code: 'VITAMIN50', title: 'FLAT 50% OFF', subtitle: 'on vitamin tests', minOrder: 499, maxDiscount: 300, bgColor: '#F3E5F5', textColor: '#7B1FA2' },
    { id: 5, code: 'HEART40', title: '40% OFF', subtitle: 'on cardiac packages', minOrder: 1999, maxDiscount: 800, bgColor: '#FCE4EC', textColor: '#C62828' },
  ],

  labTrust: {
    stats: [
      { id: 1, value: '5M+', label: 'tests done', icon: 'flask', color: '#1565C0' },
      { id: 2, value: '120+', label: 'laboratories', icon: 'business', color: '#2E7D32' },
      { id: 3, value: '38 years', label: 'legacy', icon: 'shield', color: '#FF6B35' },
      { id: 4, value: '1200+', label: 'centers', icon: 'location', color: '#7B1FA2' },
    ],
    certifications: [
      { id: 1, name: 'NABL', description: 'National Accreditation Board for Testing and Calibration Laboratories', color: '#1565C0' },
      { id: 2, name: 'CAP', description: 'College of American Pathologists', color: '#C62828' },
      { id: 3, name: 'UKAS', description: 'United Kingdom Accreditation Service', color: '#2E7D32' },
    ],
  },

  vitaminDeficiency: {
    title: '7 in 10 Indians Are\nVitamin Deficient',
    subtitle: 'Check For Your Family Today',
    packages: [
      { id: 1, name: 'Vitamin Basic', tests: 'Vitamin D & B12', includes: '+ Calcium', price: 599, oldPrice: 1499, color: '#FF9800' },
      { id: 2, name: 'Vitamin Essential', tests: 'Vitamin D & B12', includes: '+ 34 Tests', price: 999, oldPrice: 2499, color: '#4CAF50' },
      { id: 3, name: 'Vitamin Advance', tests: 'Vitamin D & B12', includes: '+ 39 Tests', price: 1499, oldPrice: 3999, color: '#2196F3' },
    ],
  },

  familySavings: {
    title: 'Bigger Savings on\nFull Body Checks!',
    subtitle: 'Book for 2+ Members\nand Save More',
    code: 'FAMILY',
    features: ['100% Refund if all results are normal', 'Smart Report with health insights'],
  },

  labSteps: [
    { id: 1, title: 'How to book\nwith us', icon: 'cart', color: '#1565C0' },
    { id: 2, title: 'Home Sample\nCollection Process', icon: 'home', color: '#2E7D32' },
    { id: 3, title: 'State of the Art\nCentres', icon: 'business', color: '#7B1FA2' },
    { id: 4, title: 'Track Your\nReports Online', icon: 'document-text', color: '#FF6B35' },
  ],

  offerTerms: [
    { id: 1, title: 'Offer Eligibility', content: 'Available for all users aged 18+ across India.' },
    { id: 2, title: 'Refund Criteria', content: '100% refund if all test results come normal within reference ranges.' },
    { id: 3, title: 'Refund Process', content: 'Refund initiated within 7 working days to original payment method.' },
    { id: 4, title: 'Offer Limitations', content: 'Cannot be combined with other offers. Valid once per user.' },
    { id: 5, title: 'Dispute Resolution', content: 'Contact Apollo support for any queries regarding offers.' },
  ],

  specialOffers: [
    { id: 1, code: 'WELCOME25', title: 'FLAT 25% OFF', subtitle: 'on your first order', bgColors: ['#E3F2FD', '#BBDEFB'] },
    { id: 2, code: 'HEALTHUP', title: 'FLAT 30% OFF', subtitle: 'on full body checkups', bgColors: ['#E8F5E9', '#C8E6C9'] },
    { id: 3, code: 'VITAMIN50', title: '50% OFF', subtitle: 'on vitamin tests', bgColors: ['#FFF8E1', '#FFECB3'] },
  ],
};

export default { HC_COLORS, HC_LAYOUT, HC_DATA };
