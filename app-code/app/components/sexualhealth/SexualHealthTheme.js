/**
 * ============================================================================
 * SEXUAL HEALTH SCREEN - INTIMATE ROSE EDITION THEME
 * ============================================================================
 */

export const SH_COLORS = {
  // Primary Rose
  rose: '#E91E63',
  roseLight: '#F06292',
  roseDark: '#C2185B',
  roseFaded: 'rgba(233, 30, 99, 0.08)',
  roseSubtle: 'rgba(233, 30, 99, 0.15)',
  roseGlow: 'rgba(233, 30, 99, 0.25)',

  // Deep Purple
  deepPurple: '#7B2CBF',
  deepPurpleFaded: 'rgba(123, 44, 191, 0.10)',

  // Teal Wellness
  tealWellness: '#009688',
  tealWellnessFaded: 'rgba(0, 150, 136, 0.10)',

  // Warm Gold
  warmGold: '#FFB800',
  warmGoldFaded: 'rgba(255, 184, 0, 0.10)',

  // Health Blue
  healthBlue: '#0088FF',
  healthBlueFaded: 'rgba(0, 136, 255, 0.10)',

  // Gradients
  gradientRose: ['#E91E63', '#F06292'],
  gradientPurple: ['#7B2CBF', '#9B59B6'],
  gradientTeal: ['#009688', '#26A69A'],
  gradientGold: ['#FFB800', '#FFC107'],
  gradientBlue: ['#0088FF', '#33A0FF'],
};

export const SH_DATA = {
  categories: [
    { id: 1, title: 'Condoms', icon: 'shield-checkmark', color: '#E91E63', bgColor: 'rgba(233,30,99,0.10)', count: '500+' },
    { id: 2, title: 'Pregnancy\nTest Kits', icon: 'medical', color: '#7B2CBF', bgColor: 'rgba(123,44,191,0.10)', count: '50+' },
    { id: 3, title: 'Lubricants', icon: 'water', color: '#009688', bgColor: 'rgba(0,150,136,0.10)', count: '200+' },
    { id: 4, title: 'Sexual Oil', icon: 'leaf', color: '#FF6B35', bgColor: 'rgba(255,107,53,0.10)', count: '150+' },
    { id: 5, title: 'Sexual\nWellness', icon: 'heart', color: '#0088FF', bgColor: 'rgba(0,136,255,0.10)', count: '300+' },
    { id: 6, title: 'Intimate\nHygiene', icon: 'sparkles', color: '#4CAF50', bgColor: 'rgba(76,175,80,0.10)', count: '100+' },
    { id: 7, title: 'Supplements', icon: 'nutrition', color: '#FFB800', bgColor: 'rgba(255,184,0,0.10)', count: '250+' },
    { id: 8, title: 'Devices', icon: 'hardware-chip', color: '#9B59B6', bgColor: 'rgba(155,89,182,0.10)', count: '80+' },
  ],

  trustedBrands: [
    { id: 1, name: 'Durex', color: '#0066CC', rating: 4.8 },
    { id: 2, name: 'Manforce', color: '#E91E63', rating: 4.5 },
    { id: 3, name: 'Skore', color: '#FF6B35', rating: 4.4 },
    { id: 4, name: 'KamaSutra', color: '#9B59B6', rating: 4.6 },
    { id: 5, name: 'Moods', color: '#4CAF50', rating: 4.3 },
    { id: 6, name: 'Prega News', color: '#0088FF', rating: 4.7 },
    { id: 7, name: 'i-know', color: '#FF4444', rating: 4.5 },
    { id: 8, name: 'V-Wash', color: '#009688', rating: 4.6 },
  ],

  shopByConcern: [
    { id: 1, title: 'Premature\nEjaculation', icon: 'time', color: '#E91E63', products: 45 },
    { id: 2, title: 'Erectile\nDysfunction', icon: 'trending-down', color: '#7B2CBF', products: 38 },
    { id: 3, title: 'Low Libido', icon: 'battery-half', color: '#FF6B35', products: 52 },
    { id: 4, title: 'Fertility\nSupport', icon: 'flower', color: '#4CAF50', products: 28 },
    { id: 5, title: 'Vaginal\nDryness', icon: 'water', color: '#009688', products: 35 },
    { id: 6, title: 'Hormonal\nBalance', icon: 'analytics', color: '#0088FF', products: 42 },
    { id: 7, title: 'STI\nPrevention', icon: 'shield', color: '#FF4444', products: 30 },
    { id: 8, title: 'Menstrual\nHealth', icon: 'calendar', color: '#FFB800', products: 48 },
  ],

  performanceProducts: [
    { id: 1, name: 'Durex Extra Time Condoms 10s', price: 225, oldPrice: 299, discount: 25, rating: 4.7, brand: 'Durex' },
    { id: 2, name: 'Manforce Staylong Gel 8g', price: 155, oldPrice: 199, discount: 22, rating: 4.5, brand: 'Manforce' },
    { id: 3, name: 'KamaSutra Longlast Condoms 12s', price: 175, oldPrice: 250, discount: 30, rating: 4.4, brand: 'KamaSutra' },
    { id: 4, name: 'Skore Not Out Condoms 10s', price: 140, oldPrice: 180, discount: 22, rating: 4.3, brand: 'Skore' },
    { id: 5, name: 'Durex Mutual Climax Condoms 10s', price: 280, oldPrice: 350, discount: 20, rating: 4.8, brand: 'Durex' },
    { id: 6, name: 'Manforce Litchi Condoms 10s', price: 99, oldPrice: 130, discount: 24, rating: 4.2, brand: 'Manforce' },
    { id: 7, name: 'Moods All Day Condoms 12s', price: 165, oldPrice: 220, discount: 25, rating: 4.3, brand: 'Moods' },
    { id: 8, name: 'Skore Champion Condoms 10s', price: 120, oldPrice: 160, discount: 25, rating: 4.4, brand: 'Skore' },
  ],

  intimateProducts: [
    { id: 1, name: 'V-Wash Plus Expert Intimate Hygiene 200ml', price: 255, oldPrice: 340, discount: 25, rating: 4.7 },
    { id: 2, name: 'Durex Lube Strawberry 50ml', price: 185, oldPrice: 250, discount: 26, rating: 4.5 },
    { id: 3, name: 'Prega News Pregnancy Test Kit', price: 55, oldPrice: 75, discount: 27, rating: 4.8 },
    { id: 4, name: 'i-know Ovulation Test Kit', price: 425, oldPrice: 599, discount: 29, rating: 4.6 },
    { id: 5, name: 'Himalaya Intimate Wash 200ml', price: 165, oldPrice: 225, discount: 27, rating: 4.4 },
    { id: 6, name: 'KY Jelly Personal Lubricant 50g', price: 215, oldPrice: 285, discount: 25, rating: 4.5 },
    { id: 7, name: 'Gynaecosid Vaginal Cleanser 100ml', price: 135, oldPrice: 180, discount: 25, rating: 4.3 },
    { id: 8, name: 'Clean & Dry Intimate Wash 190ml', price: 145, oldPrice: 195, discount: 26, rating: 4.4 },
  ],

  topCondomBrands: [
    { id: 1, brand: 'Durex', tagline: 'Love has no pause', products: 45, color: '#0066CC', popular: 'Air Thin' },
    { id: 2, brand: 'Manforce', tagline: 'Be a hero in bed', products: 38, color: '#E91E63', popular: 'Staylong' },
    { id: 3, brand: 'Skore', tagline: 'Not just a condom', products: 28, color: '#FF6B35', popular: 'Not Out' },
    { id: 4, brand: 'KamaSutra', tagline: 'Art of lovemaking', products: 32, color: '#9B59B6', popular: 'Longlast' },
    { id: 5, brand: 'Moods', tagline: 'Every mood matters', products: 25, color: '#4CAF50', popular: 'All Day' },
    { id: 6, brand: 'Playgard', tagline: 'Play safe, play smart', products: 20, color: '#FFB800', popular: 'Super Dotted' },
  ],

  wellnessTips: [
    { id: 1, title: 'Communication is Key', desc: 'Open dialogue with your partner about desires and boundaries builds trust and intimacy', icon: 'chatbubbles', color: '#E91E63' },
    { id: 2, title: 'Safe Practices', desc: 'Always use protection to prevent STIs and unwanted pregnancy. Consult a doctor for guidance', icon: 'shield-checkmark', color: '#009688' },
    { id: 3, title: 'Mental Health Matters', desc: 'Stress and anxiety can affect sexual performance. Practice mindfulness and seek help if needed', icon: 'brain', color: '#7B2CBF' },
    { id: 4, title: 'Nutrition & Exercise', desc: 'A healthy diet and regular exercise improve blood flow and boost libido naturally', icon: 'nutrition', color: '#4CAF50' },
    { id: 5, title: 'Regular Check-ups', desc: 'Annual health screenings including STI tests are essential for sexual wellbeing', icon: 'medical', color: '#0088FF' },
    { id: 6, title: 'Sleep Quality', desc: 'Good sleep is crucial for hormonal balance and sexual health. Aim for 7-8 hours nightly', icon: 'moon', color: '#FFB800' },
  ],

  discreetFeatures: [
    { id: 1, title: 'Discreet Packaging', desc: 'Plain packaging with no product info', icon: 'cube', color: '#7B2CBF' },
    { id: 2, title: 'Confidential Delivery', desc: 'No product name on delivery slip', icon: 'lock-closed', color: '#E91E63' },
    { id: 3, title: 'Secure Payment', desc: '100% encrypted transactions', icon: 'shield-checkmark', color: '#009688' },
    { id: 4, title: 'Quick Delivery', desc: 'Same-day delivery available', icon: 'flash', color: '#FF6B35' },
  ],

  doctorSpecialists: [
    { id: 1, name: 'Dr. Arun Mehta', specialty: 'Sexologist', experience: '15 yrs', rating: 4.9, fee: 599, available: true },
    { id: 2, name: 'Dr. Priya Kapoor', specialty: 'Gynaecologist', experience: '12 yrs', rating: 4.8, fee: 699, available: true },
    { id: 3, name: 'Dr. Sanjay Rao', specialty: 'Urologist', experience: '18 yrs', rating: 4.9, fee: 799, available: false },
    { id: 4, name: 'Dr. Meera Nair', specialty: 'Andrologist', experience: '14 yrs', rating: 4.7, fee: 649, available: true },
  ],
};
