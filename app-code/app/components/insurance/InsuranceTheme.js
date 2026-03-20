/**
 * ============================================================================
 * APOLLO 24/7 - INSURANCE SECTION THEME & DATA
 * ============================================================================
 * 
 * Premium Insurance section design tokens, data constants, and shared
 * utilities. Built with the same royal design system as the main app.
 * 
 * ============================================================================
 */

import { Dimensions, Platform } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// INSURANCE-SPECIFIC COLORS
// ============================================================================
export const INSURANCE_COLORS = {
  // Primary Insurance Brand
  insuranceTeal: '#2B8A6F',
  insuranceTealLight: '#3DA882',
  insuranceTealDark: '#1E6B54',
  insuranceTealFaded: 'rgba(43, 138, 111, 0.08)',
  insuranceTealSubtle: 'rgba(43, 138, 111, 0.15)',
  insuranceTealGlow: 'rgba(43, 138, 111, 0.25)',

  // Shield / Assured Colors
  assuredGold: '#D4A017',
  assuredGoldLight: '#F0C75E',
  assuredGoldDark: '#A67C00',
  assuredGoldFaded: 'rgba(212, 160, 23, 0.10)',
  assuredGoldSubtle: 'rgba(212, 160, 23, 0.20)',

  // Premium Orange for CTAs
  ctaOrange: '#FF6B35',
  ctaOrangeLight: '#FF8A5C',
  ctaOrangeFaded: 'rgba(255, 107, 53, 0.10)',

  // Health Cover Blue
  coverBlue: '#1565C0',
  coverBlueLight: '#42A5F5',
  coverBlueFaded: 'rgba(21, 101, 192, 0.08)',

  // Success Green
  successGreen: '#2E7D32',
  successGreenLight: '#4CAF50',
  successGreenFaded: 'rgba(46, 125, 50, 0.08)',

  // Warning Red
  warningRed: '#C62828',
  warningRedLight: '#EF5350',
  warningRedFaded: 'rgba(198, 40, 40, 0.08)',

  // Background variants
  insuranceBg: '#FFF8F0',
  insuranceBgLight: '#FFFDF9',
  insuranceBgTeal: 'rgba(43, 138, 111, 0.03)',
  insuranceBgGold: 'rgba(212, 160, 23, 0.03)',

  // Gradients
  gradientInsuranceHero: ['#2B8A6F', '#1E6B54'],
  gradientAssuredBadge: ['#D4A017', '#F0C75E'],
  gradientCoverCard: ['#FFFFFF', '#FFF8F0'],
  gradientExpertBanner: ['#1565C0', '#0D47A1'],
  gradientCtaButton: ['#FF6B35', '#FF8A5C'],
  gradientTealButton: ['#2B8A6F', '#3DA882'],
  gradientPartnerCard: ['#FFFFFF', '#F5F5F5'],

  // Partner brand colors
  hdfcErgo: '#E31837',
  iciciLombard: '#F47920',
  nivaBupa: '#00A0DC',
  careHealth: '#FF6B00',
  starHealth: '#1B5E20',
  bajajAllianz: '#004B87',
  maxBupa: '#C41E3A',
  relianceGeneral: '#D32F2F',
  tataaig: '#003D79',
  sbiGeneral: '#0047A3',
  nationalInsurance: '#003366',
  newIndiaAssurance: '#1A237E',
};

// ============================================================================
// INSURANCE LAYOUT CONSTANTS
// ============================================================================
export const INSURANCE_LAYOUT = {
  heroBannerHeight: 220,
  insuranceCardWidth: (SCREEN_WIDTH - 52) / 2,
  insuranceCardHeight: 180,
  partnerLogoSize: 60,
  partnerCardWidth: 100,
  partnerCardHeight: 80,
  expertBannerHeight: 200,
  planCardWidth: SCREEN_WIDTH * 0.78,
  planCardHeight: 260,
  benefitIconSize: 48,
  ctaButtonHeight: 52,
  featureCardWidth: (SCREEN_WIDTH - 52) / 2,
  featureCardHeight: 140,
  comparisonCardWidth: SCREEN_WIDTH - 40,
  testimonialCardWidth: SCREEN_WIDTH * 0.82,
  testimonialCardHeight: 200,
  claimStepSize: 64,
  faqItemHeight: 56,
  statsCardWidth: (SCREEN_WIDTH - 60) / 3,
  coverageBarHeight: 8,
};

// ============================================================================
// INSURANCE DATA CONSTANTS
// ============================================================================
export const INSURANCE_DATA = {
  // Hero Banner
  heroBanner: {
    title: 'Save up to 50%*',
    subtitle: 'on your health cover',
    description: 'Apollo recommends what fits you best\n-- not what costs more.',
    badgeText: 'APOLLO ASSURED',
    starRating: 4.8,
    reviewCount: '2.5L+',
    trustText: 'Trusted by 25 Lakh+ families',
  },

  // Insurance Cards (Have / Don't Have)
  insuranceCards: [
    {
      id: 'topup',
      title: 'Have Health\nInsurance?',
      subtitle: 'Top-Up, to 1 Cr',
      highlight: '1/day*',
      highlightPrefix: 'from just ',
      icon: 'shield-checkmark',
      iconBg: '#E8F5E9',
      iconColor: '#2E7D32',
      ctaText: 'Continue',
      badge: 'POPULAR',
      features: ['No medical test', 'Instant policy', 'Tax benefits'],
    },
    {
      id: 'fresh',
      title: "Don't have\nInsurance yet?",
      subtitle: 'Health Covers starts',
      highlight: '20/day*',
      highlightPrefix: 'from ',
      icon: 'heart-circle',
      iconBg: '#FFF3E0',
      iconColor: '#FF6B35',
      ctaText: 'Continue',
      badge: 'RECOMMENDED',
      features: ['Family cover', 'Cashless claims', 'No waiting'],
    },
  ],

  // Expert Help Banner
  expertHelp: {
    title: 'Unsure about what plan\nto buy?',
    subtitle: 'Our insurance advisor is just a\nclick away',
    ctaText: 'Get Expert Help',
    ctaIcon: 'call',
    availableText: 'Available 9 AM - 9 PM',
    advisorCount: '500+ certified advisors',
    freeConsultation: true,
  },

  // Insurance Partners
  partners: [
    { id: 1, name: 'Star Health', color: '#1B5E20', shortName: 'STAR', rating: 4.6, claimRatio: '68%' },
    { id: 2, name: 'HDFC Ergo', color: '#E31837', shortName: 'HDFC', rating: 4.7, claimRatio: '92%' },
    { id: 3, name: 'ICICI Lombard', color: '#F47920', shortName: 'ICICI', rating: 4.5, claimRatio: '89%' },
    { id: 4, name: 'Niva Bupa', color: '#00A0DC', shortName: 'niva', rating: 4.6, claimRatio: '90%' },
    { id: 5, name: 'Care Health', color: '#FF6B00', shortName: 'care', rating: 4.4, claimRatio: '87%' },
    { id: 6, name: 'Bajaj Allianz', color: '#004B87', shortName: 'BAJAJ', rating: 4.5, claimRatio: '91%' },
    { id: 7, name: 'Max Bupa', color: '#C41E3A', shortName: 'MAX', rating: 4.3, claimRatio: '85%' },
    { id: 8, name: 'Reliance General', color: '#D32F2F', shortName: 'RGI', rating: 4.2, claimRatio: '82%' },
    { id: 9, name: 'Tata AIG', color: '#003D79', shortName: 'TATA', rating: 4.6, claimRatio: '93%' },
    { id: 10, name: 'SBI General', color: '#0047A3', shortName: 'SBI', rating: 4.3, claimRatio: '84%' },
    { id: 11, name: 'National Insurance', color: '#003366', shortName: 'NIC', rating: 4.1, claimRatio: '78%' },
    { id: 12, name: 'New India Assurance', color: '#1A237E', shortName: 'NIA', rating: 4.2, claimRatio: '80%' },
  ],

  // Health Cover Plans
  plans: [
    {
      id: 1,
      name: 'Apollo Health Shield',
      badge: 'MOST POPULAR',
      coverAmount: '5 Lakh',
      premium: '499/month',
      dailyCost: '17/day',
      features: [
        'Cashless treatment at 14,000+ hospitals',
        'No room rent capping',
        'Pre & post hospitalisation cover',
        'Day care procedures covered',
        'Free annual health checkup',
        'Ambulance cover up to 2,000',
        'AYUSH treatment covered',
        'Maternity benefit available',
      ],
      savings: 'Save 40% vs market',
      color: '#2B8A6F',
      recommended: true,
    },
    {
      id: 2,
      name: 'Apollo Family Floater',
      badge: 'BEST VALUE',
      coverAmount: '10 Lakh',
      premium: '899/month',
      dailyCost: '30/day',
      features: [
        'Cover entire family under one plan',
        'Cashless at Apollo & partner hospitals',
        'Unlimited restoration benefit',
        'Newborn baby coverage from day 1',
        'Annual health checkup for all members',
        'Global emergency cover',
        'Organ donor expenses covered',
        'Mental illness coverage included',
      ],
      savings: 'Save 50% vs individual plans',
      color: '#1565C0',
      recommended: false,
    },
    {
      id: 3,
      name: 'Apollo Super Top-Up',
      badge: 'SMART CHOICE',
      coverAmount: '1 Crore',
      premium: '299/month',
      dailyCost: '10/day',
      features: [
        'Top-up over existing insurance',
        'Deductible as low as 3 Lakh',
        'No sub-limits on room rent',
        'Critical illness cover included',
        'Air ambulance cover up to 5 Lakh',
        'Second opinion from Apollo doctors',
        'Worldwide emergency coverage',
        'Cumulative bonus up to 100%',
      ],
      savings: 'Just 1/day for 1 Cr cover',
      color: '#FF6B35',
      recommended: false,
    },
    {
      id: 4,
      name: 'Apollo Senior Citizen',
      badge: 'FOR PARENTS',
      coverAmount: '15 Lakh',
      premium: '1,299/month',
      dailyCost: '43/day',
      features: [
        'Entry age up to 75 years',
        'Pre-existing disease cover from year 2',
        'Domiciliary treatment covered',
        'Cataract surgery covered up to 50K',
        'Joint replacement covered',
        'Home healthcare services included',
        'Psychiatric consultation covered',
        'Personal accident cover add-on',
      ],
      savings: 'Protect parents, save 35%',
      color: '#7B2CBF',
      recommended: false,
    },
  ],

  // Benefits / Why Apollo Insurance
  benefits: [
    { id: 1, icon: 'shield-checkmark', title: 'Apollo Assured', description: 'Every plan vetted by Apollo health experts for quality and value', color: '#2B8A6F' },
    { id: 2, icon: 'cash', title: 'Cashless Claims', description: 'Instant cashless treatment at 14,000+ network hospitals across India', color: '#1565C0' },
    { id: 3, icon: 'time', title: 'Quick Settlement', description: 'Claims settled in as fast as 30 minutes with zero paperwork hassle', color: '#FF6B35' },
    { id: 4, icon: 'people', title: 'Expert Advisors', description: '500+ certified insurance advisors to help you choose the right plan', color: '#7B2CBF' },
    { id: 5, icon: 'fitness', title: 'Health Rewards', description: 'Earn HealthCoins for healthy habits and get premium discounts', color: '#D4A017' },
    { id: 6, icon: 'document-text', title: 'Digital-First', description: 'Fully digital onboarding, claims, and policy management experience', color: '#00A0DC' },
  ],

  // Claim Process Steps
  claimSteps: [
    { id: 1, step: '01', title: 'Intimate Claim', description: 'Call our 24/7 helpline or submit claim online through the app', icon: 'call', color: '#2B8A6F' },
    { id: 2, step: '02', title: 'Upload Documents', description: 'Upload hospital bills, prescriptions, and discharge summary', icon: 'cloud-upload', color: '#1565C0' },
    { id: 3, step: '03', title: 'Claim Processing', description: 'Our team reviews and processes your claim within 30 minutes', icon: 'hourglass', color: '#FF6B35' },
    { id: 4, step: '04', title: 'Settlement', description: 'Amount directly credited to your bank account or hospital', icon: 'checkmark-circle', color: '#2E7D32' },
  ],

  // Coverage Comparison
  coverageComparison: {
    title: 'What does Health Insurance cover?',
    categories: [
      {
        id: 1,
        name: 'Hospitalisation',
        items: [
          { name: 'Room charges', covered: true },
          { name: 'ICU charges', covered: true },
          { name: 'Doctor fees', covered: true },
          { name: 'Nursing charges', covered: true },
          { name: 'Surgery costs', covered: true },
          { name: 'Anesthesia charges', covered: true },
        ],
      },
      {
        id: 2,
        name: 'Pre-Hospitalisation',
        items: [
          { name: 'Diagnostic tests', covered: true },
          { name: 'Doctor consultations', covered: true },
          { name: 'Medicines', covered: true },
          { name: 'X-rays & scans', covered: true },
        ],
      },
      {
        id: 3,
        name: 'Post-Hospitalisation',
        items: [
          { name: 'Follow-up consultations', covered: true },
          { name: 'Medicines post discharge', covered: true },
          { name: 'Physiotherapy', covered: true },
          { name: 'Home nursing', covered: true },
        ],
      },
      {
        id: 4,
        name: 'Additional Benefits',
        items: [
          { name: 'Ambulance charges', covered: true },
          { name: 'Day care procedures', covered: true },
          { name: 'AYUSH treatments', covered: true },
          { name: 'Organ donor expenses', covered: true },
          { name: 'Annual health checkup', covered: true },
          { name: 'Maternity benefits', covered: 'optional' },
        ],
      },
    ],
  },

  // Testimonials
  testimonials: [
    {
      id: 1,
      name: 'Rajesh Kumar',
      age: 42,
      location: 'Mumbai',
      rating: 5,
      text: 'Apollo Insurance made my claim process incredibly smooth. Within 30 minutes of submitting my documents, the claim was approved. Cashless treatment at Apollo Hospital was hassle-free.',
      claimAmount: '2,50,000',
      planName: 'Apollo Health Shield',
      avatar: 'person',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      age: 35,
      location: 'Delhi',
      rating: 5,
      text: 'Best decision to get family floater plan. When my daughter needed hospitalization, everything was covered. The advisor helped us choose the perfect plan for our family of 4.',
      claimAmount: '1,80,000',
      planName: 'Apollo Family Floater',
      avatar: 'woman',
    },
    {
      id: 3,
      name: 'Venkat Rao',
      age: 58,
      location: 'Hyderabad',
      rating: 5,
      text: 'Got the Super Top-Up plan on my advisor\'s recommendation. Best value for money. When I needed knee replacement surgery, the entire cost of 8 lakhs was covered seamlessly.',
      claimAmount: '8,00,000',
      planName: 'Apollo Super Top-Up',
      avatar: 'person',
    },
    {
      id: 4,
      name: 'Meera Patel',
      age: 30,
      location: 'Ahmedabad',
      rating: 4,
      text: 'The maternity benefit was a lifesaver. All pregnancy-related expenses including delivery were covered. Apollo Health Records integration made document management easy.',
      claimAmount: '1,20,000',
      planName: 'Apollo Health Shield',
      avatar: 'woman',
    },
  ],

  // Trust Stats
  trustStats: [
    { id: 1, value: '25L+', label: 'Families Protected', icon: 'people' },
    { id: 2, value: '14K+', label: 'Network Hospitals', icon: 'business' },
    { id: 3, value: '92%', label: 'Claim Ratio', icon: 'trending-up' },
    { id: 4, value: '30 min', label: 'Avg Claim Time', icon: 'time' },
    { id: 5, value: '500+', label: 'Expert Advisors', icon: 'school' },
    { id: 6, value: '12+', label: 'Insurance Partners', icon: 'handshake' },
  ],

  // FAQs
  faqs: [
    { id: 1, question: 'What is the waiting period for pre-existing diseases?', answer: 'Most Apollo Insurance plans have a waiting period of 2-4 years for pre-existing diseases. Some plans offer reduced waiting periods with additional premium.' },
    { id: 2, question: 'Can I port my existing health insurance to Apollo?', answer: 'Yes, you can port your existing health insurance to any Apollo-recommended plan. Your accumulated no-claim bonus and waiting period credits will be carried forward.' },
    { id: 3, question: 'How does cashless claim work?', answer: 'Simply show your health card at any of our 14,000+ network hospitals. The insurer directly settles the bill with the hospital. No upfront payment needed from your side.' },
    { id: 4, question: 'Is there a tax benefit on health insurance?', answer: 'Yes, premiums paid for health insurance are eligible for tax deduction under Section 80D of the Income Tax Act up to 25,000 for self and 50,000 for senior citizen parents.' },
    { id: 5, question: 'What documents are needed for a claim?', answer: 'Hospital discharge summary, original bills, prescription copies, diagnostic reports, and a filled claim form. All can be submitted digitally through the Apollo app.' },
    { id: 6, question: 'Can I add family members later?', answer: 'Yes, you can add new family members during policy renewal. Newborn babies can be added from day 1 under family floater plans at no additional cost for the first 90 days.' },
    { id: 7, question: 'What is a Super Top-Up plan?', answer: 'A Super Top-Up plan provides additional coverage above your existing insurance deductible. It\'s a cost-effective way to increase your health cover to 1 Crore or more.' },
    { id: 8, question: 'Are COVID-19 treatments covered?', answer: 'Yes, all Apollo Insurance plans cover COVID-19 related hospitalisation, including home treatment as per IRDAI guidelines. Vaccination costs may also be covered under some plans.' },
  ],

  // Tax Benefits Info
  taxBenefits: {
    title: 'Tax Benefits under Section 80D',
    selfLimit: '25,000',
    parentsLimit: '50,000',
    seniorLimit: '1,00,000',
    sections: [
      { label: 'Self & Family (< 60 yrs)', amount: '25,000', icon: 'person' },
      { label: 'Parents (< 60 yrs)', amount: '25,000', icon: 'people' },
      { label: 'Parents (60+ yrs)', amount: '50,000', icon: 'heart' },
      { label: 'Preventive Checkup', amount: '5,000', icon: 'fitness' },
    ],
  },

  // Network Hospital Stats
  networkHospitals: {
    total: '14,000+',
    cities: '1,000+',
    apolloHospitals: '71',
    multiSpecialty: '2,500+',
    topCities: [
      { name: 'Mumbai', count: 1200 },
      { name: 'Delhi NCR', count: 1500 },
      { name: 'Bangalore', count: 800 },
      { name: 'Chennai', count: 700 },
      { name: 'Hyderabad', count: 650 },
      { name: 'Kolkata', count: 500 },
      { name: 'Pune', count: 450 },
      { name: 'Ahmedabad', count: 400 },
    ],
  },

  // Quick Tips
  quickTips: [
    { id: 1, title: 'Start Early', description: 'Lower premiums when you\'re young and healthy. Don\'t wait for a health scare.', icon: 'alarm' },
    { id: 2, title: 'Adequate Cover', description: 'Ensure cover is at least 10x your monthly income to handle medical emergencies.', icon: 'wallet' },
    { id: 3, title: 'Family First', description: 'Family floater plans are more economical than individual plans for each member.', icon: 'home' },
    { id: 4, title: 'Top-Up Wisely', description: 'Add a Super Top-Up to your employer insurance for comprehensive coverage.', icon: 'trending-up' },
    { id: 5, title: 'Review Annually', description: 'Review and upgrade your health insurance every year as your needs change.', icon: 'refresh' },
    { id: 6, title: 'Check Network', description: 'Ensure your preferred hospitals are in the insurer\'s cashless network.', icon: 'location' },
  ],

  // Premium Calculator Data
  ageGroups: [
    { label: '18-25', premium: 350, cover: '5L' },
    { label: '26-35', premium: 499, cover: '5L' },
    { label: '36-45', premium: 750, cover: '5L' },
    { label: '46-55', premium: 1100, cover: '5L' },
    { label: '56-65', premium: 1600, cover: '5L' },
    { label: '65+', premium: 2200, cover: '5L' },
  ],

  // Critical Illness Add-ons
  criticalIllness: [
    { id: 1, name: 'Cancer', icon: 'medical', coverAmount: '10 Lakh', premium: '+99/month' },
    { id: 2, name: 'Heart Attack', icon: 'heart', coverAmount: '10 Lakh', premium: '+99/month' },
    { id: 3, name: 'Kidney Failure', icon: 'fitness', coverAmount: '5 Lakh', premium: '+79/month' },
    { id: 4, name: 'Stroke', icon: 'pulse', coverAmount: '10 Lakh', premium: '+89/month' },
    { id: 5, name: 'Organ Transplant', icon: 'body', coverAmount: '15 Lakh', premium: '+129/month' },
    { id: 6, name: 'Paralysis', icon: 'accessibility', coverAmount: '10 Lakh', premium: '+99/month' },
  ],
};

export default {
  INSURANCE_COLORS,
  INSURANCE_LAYOUT,
  INSURANCE_DATA,
};
