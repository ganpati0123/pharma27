import { create } from 'zustand';

export const useInsuranceStore = create((set, get) => ({
  // User profile
  user: {
    name: 'Ganpati',
    age: 29,
    gender: 'Male',
    city: 'Delhi',
    avatar: null,
    healthScore: 85,
    memberSince: '2023',
  },

  // Notifications
  notifications: [
    { id: 1, title: 'Policy renewal in 30 days', read: false, type: 'renewal' },
    { id: 2, title: 'Claim #CLM2024 approved', read: false, type: 'claim' },
    { id: 3, title: 'New plan available: Star Health', read: true, type: 'offer' },
    { id: 4, title: 'Premium due on 15th March', read: false, type: 'payment' },
  ],
  unreadCount: 3,
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n),
    unreadCount: state.notifications.filter(n => !n.read && n.id !== id).length,
  })),

  // Theme
  isDarkMode: false,
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  // Active tab
  activeTab: 'insurance',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Insurance plans
  selectedGender: 'Male',
  setSelectedGender: (gender) => set({ selectedGender: gender }),

  selectedMembers: ['Self'],
  toggleMember: (member) => set((state) => {
    const members = state.selectedMembers.includes(member)
      ? state.selectedMembers.filter(m => m !== member)
      : [...state.selectedMembers, member];
    return { selectedMembers: members };
  }),

  childrenCount: 0,
  setChildrenCount: (count) => set({ childrenCount: count }),

  selfAge: 29,
  setSelfAge: (age) => set({ selfAge: age }),

  // Policies
  activePolicies: [
    {
      id: 'POL001',
      name: 'Reassure 3.0 Platinum',
      insurer: 'Niva Bupa',
      type: 'Health',
      premium: 14757,
      premiumFrequency: 'yearly',
      coverage: 1000000,
      startDate: '2024-01-15',
      endDate: '2025-01-14',
      status: 'active',
      members: ['Self', 'Wife'],
      claimsCount: 0,
      features: ['No room rent limit', 'No co-payment', 'Day 1 coverage for chronic'],
    },
    {
      id: 'POL002',
      name: 'Care Supreme',
      insurer: 'Care Health',
      type: 'Top-Up',
      premium: 5200,
      premiumFrequency: 'yearly',
      coverage: 5000000,
      deductible: 300000,
      startDate: '2024-03-01',
      endDate: '2025-02-28',
      status: 'active',
      members: ['Self', 'Wife', 'Mother'],
      claimsCount: 1,
      features: ['Super top-up', 'Restoration benefit', 'No claim bonus'],
    },
  ],

  expiredPolicies: [
    {
      id: 'POL003',
      name: 'Star Comprehensive',
      insurer: 'Star Health',
      type: 'Health',
      premium: 12000,
      coverage: 500000,
      startDate: '2022-06-01',
      endDate: '2023-05-31',
      status: 'expired',
      members: ['Self'],
      gracePeriod: '30 days',
    },
  ],

  // Claims
  claims: [
    {
      id: 'CLM001',
      policyId: 'POL002',
      type: 'Cashless',
      hospital: 'Apollo Hospital, Delhi',
      date: '2024-08-15',
      amount: 85000,
      status: 'approved',
      documents: ['Discharge Summary', 'Bills', 'Prescription'],
    },
    {
      id: 'CLM002',
      policyId: 'POL001',
      type: 'Reimbursement',
      hospital: 'Max Hospital, Gurgaon',
      date: '2024-11-20',
      amount: 15000,
      status: 'processing',
      documents: ['Bills', 'Prescription'],
    },
  ],

  // Premium calculator
  calculatorAge: 29,
  calculatorCity: 'Delhi',
  calculatorCoverage: 500000,
  calculatorMembers: 1,
  setCalculatorAge: (age) => set({ calculatorAge: age }),
  setCalculatorCity: (city) => set({ calculatorCity: city }),
  setCalculatorCoverage: (coverage) => set({ calculatorCoverage: coverage }),
  setCalculatorMembers: (count) => set({ calculatorMembers: count }),

  getEstimatedPremium: () => {
    const state = get();
    const basePremium = 5000;
    const ageFactor = state.calculatorAge > 45 ? 2.5 : state.calculatorAge > 35 ? 1.8 : 1;
    const coverageFactor = state.calculatorCoverage / 500000;
    const memberFactor = state.calculatorMembers;
    return Math.round(basePremium * ageFactor * coverageFactor * memberFactor);
  },

  // Top-up calculator
  topupDeductible: 300000,
  topupAmount: 5000000,
  setTopupDeductible: (val) => set({ topupDeductible: val }),
  setTopupAmount: (val) => set({ topupAmount: val }),

  getTopupPremium: () => {
    const state = get();
    const base = 2000;
    const deductibleFactor = 1 - (state.topupDeductible / 1000000) * 0.5;
    const amountFactor = state.topupAmount / 5000000;
    return Math.round(base * deductibleFactor * amountFactor);
  },

  // Favorites
  favoritesPolicies: [],
  toggleFavorite: (policyId) => set((state) => {
    const favs = state.favoritesPolicies.includes(policyId)
      ? state.favoritesPolicies.filter(id => id !== policyId)
      : [...state.favoritesPolicies, policyId];
    return { favoritesPolicies: favs };
  }),

  // Search
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),

  // Loading states
  isLoading: false,
  setIsLoading: (val) => set({ isLoading: val }),

  isRefreshing: false,
  setIsRefreshing: (val) => set({ isRefreshing: val }),

  // Filters
  filters: {
    insurers: [],
    coverage: null,
    maternity: false,
    existingDisease: null,
    roomRentType: null,
    noClaimBonus: false,
  },
  setFilter: (key, value) => set((state) => ({
    filters: { ...state.filters, [key]: value },
  })),
  resetFilters: () => set({
    filters: {
      insurers: [],
      coverage: null,
      maternity: false,
      existingDisease: null,
      roomRentType: null,
      noClaimBonus: false,
    },
  }),

  // Combined policies getter
  get policies() {
    return [
      ...this.activePolicies.map(p => ({ ...p, premium: `Rs ${p.premium.toLocaleString('en-IN')}/yr`, coverage: `Rs ${(p.coverage / 100000).toFixed(0)}L`, renewalDate: p.endDate })),
      ...this.expiredPolicies.map(p => ({ ...p, premium: `Rs ${p.premium.toLocaleString('en-IN')}/yr`, coverage: `Rs ${(p.coverage / 100000).toFixed(0)}L`, renewalDate: p.endDate })),
    ];
  },

  // Compare
  compareList: [],
  addToCompare: (plan) => set((state) => {
    if (state.compareList.length >= 3) return state;
    return { compareList: [...state.compareList, plan] };
  }),
  removeFromCompare: (planId) => set((state) => ({
    compareList: state.compareList.filter(p => p.id !== planId),
  })),
  clearCompare: () => set({ compareList: [] }),
}));

// Insurance plan data
export const INSURANCE_PLANS = [
  {
    id: 'plan1',
    name: 'Reassure 3.0 Platinum',
    insurer: 'Niva Bupa',
    insurerLogo: 'niva',
    rating: 4.5,
    cashlessHospitals: 880,
    features: ['No room rent limit', 'No co-payment', 'Chronic from Day 1', 'Maternity included'],
    coverage: 1000000,
    premium: 14757,
    premiumFrequency: 'yearly',
    claimRatio: 67,
    badge: 'MOST POPULAR',
    badgeColor: '#FF6B35',
    addOns: ['Personal Accident', 'Critical Illness', 'Hospital Cash'],
  },
  {
    id: 'plan2',
    name: 'Reassure 3.0 Black',
    insurer: 'Niva Bupa',
    insurerLogo: 'niva',
    rating: 4.7,
    cashlessHospitals: 880,
    features: ['Unlimited restoration', 'Global coverage', 'No sub-limits', 'Air ambulance'],
    coverage: 1000000,
    premium: 17351,
    premiumFrequency: 'yearly',
    claimRatio: 67,
    badge: 'PREMIUM PICK',
    badgeColor: '#1A1A2E',
    addOns: ['Super NCB', 'Consumables', 'Bariatric Surgery'],
  },
  {
    id: 'plan3',
    name: 'Aspire Platinum+',
    insurer: 'ManipalCigna',
    insurerLogo: 'manipal',
    rating: 4.3,
    cashlessHospitals: 760,
    features: ['No room rent', 'No co-pay', 'Maternity cover', 'AYUSH coverage'],
    coverage: 1000000,
    premium: 16174,
    premiumFrequency: 'yearly',
    claimRatio: 72,
    badge: 'VALUE PICK',
    badgeColor: '#2ECC71',
    addOns: ['OPD Cover', 'Dental', 'Vision Care'],
  },
  {
    id: 'plan4',
    name: 'iMandate Care',
    insurer: 'ICICI Lombard',
    insurerLogo: 'icici',
    rating: 4.4,
    cashlessHospitals: 920,
    features: ['Personal OPD', 'Wellness rewards', 'NCB up to 100%', 'Pre-post children 3-5 yrs'],
    coverage: 1000000,
    premium: 14821,
    premiumFrequency: 'yearly',
    claimRatio: 69,
    badge: 'FAST CLAIMS',
    badgeColor: '#E74C3C',
    addOns: ['Super NCB', 'Room Upgrade', 'Hospital Cash'],
  },
  {
    id: 'plan5',
    name: 'Superstar Essential',
    insurer: 'Godigit',
    insurerLogo: 'godigit',
    rating: 4.1,
    cashlessHospitals: 650,
    features: ['No room rent limit', 'Confirm your age', 'Protect bonus', 'Modern treatment'],
    coverage: 1000000,
    premium: 14620,
    premiumFrequency: 'yearly',
    claimRatio: 65,
    badge: 'NEW LAUNCH',
    badgeColor: '#9B59B6',
    addOns: ['Critical Illness', 'Personal Accident', 'Infertility'],
  },
  {
    id: 'plan6',
    name: 'Elevate',
    insurer: 'Aditya Birla',
    insurerLogo: 'adityabirla',
    rating: 4.2,
    cashlessHospitals: 810,
    features: ['Unlimited AI cover', 'Annual health check', 'Pre-post hospitalization', 'Modern treatment'],
    coverage: 1500000,
    premium: 16173,
    premiumFrequency: 'yearly',
    claimRatio: 71,
    badge: 'HIGH COVERAGE',
    badgeColor: '#3498DB',
    addOns: ['OPD Benefit', 'Maternity', 'Global Cover'],
  },
];

// Top-up plans
export const TOPUP_PLANS = [
  {
    id: 'topup1',
    name: 'Care Super Top-Up',
    insurer: 'Care Health',
    insurerLogo: 'care',
    coverage: 10000000,
    deductible: 300000,
    premium: 4200,
    premiumFrequency: 'yearly',
    claimRatio: 74,
    features: ['Flatter plan with F10-15L coverage', 'Maternity cover + waiting period benefits', 'Daycare procedures', 'Add-ons'],
    badge: 'BEST SELLER',
    badgeColor: '#FF6B35',
  },
  {
    id: 'topup2',
    name: 'Niva Super Top-Up',
    insurer: 'Niva Bupa',
    insurerLogo: 'niva',
    coverage: 5000000,
    deductible: 500000,
    premium: 3100,
    premiumFrequency: 'yearly',
    claimRatio: 67,
    features: ['Wide sum insured choices', 'Coverage recharge', 'No limit for ICU', 'PED 2yr waiting'],
    badge: 'VALUE PICK',
    badgeColor: '#2ECC71',
  },
  {
    id: 'topup3',
    name: 'Star Super Top-Up',
    insurer: 'Star Health',
    insurerLogo: 'star',
    coverage: 15000000,
    deductible: 200000,
    premium: 5800,
    premiumFrequency: 'yearly',
    claimRatio: 71,
    features: ['Highest coverage', 'Low deductible', 'Ambulance cover', 'Worldwide emergency'],
    badge: 'HIGH COVER',
    badgeColor: '#E74C3C',
  },
];

// Hospital network data
export const HOSPITALS = [
  { id: 1, name: 'Apollo Hospital', city: 'Delhi', distance: '2.5 km', rating: 4.8, specialties: ['Cardiology', 'Neurology', 'Orthopedics'], cashless: true, beds: 710, premium: true },
  { id: 2, name: 'Max Super Specialty', city: 'Gurgaon', distance: '5.2 km', rating: 4.7, specialties: ['Oncology', 'Cardiology', 'Urology'], cashless: true, beds: 500, premium: true },
  { id: 3, name: 'Fortis Hospital', city: 'Delhi', distance: '3.8 km', rating: 4.6, specialties: ['Orthopedics', 'Neurosurgery', 'Gastro'], cashless: true, beds: 450, premium: false },
  { id: 4, name: 'Medanta Medicity', city: 'Gurgaon', distance: '12.1 km', rating: 4.9, specialties: ['Heart', 'Liver', 'Kidney', 'Cancer'], cashless: true, beds: 1250, premium: true },
  { id: 5, name: 'Sir Ganga Ram Hospital', city: 'Delhi', distance: '4.5 km', rating: 4.5, specialties: ['General', 'Pediatrics', 'ENT'], cashless: true, beds: 675, premium: false },
  { id: 6, name: 'BLK Max Hospital', city: 'Delhi', distance: '6.3 km', rating: 4.4, specialties: ['Oncology', 'Bone Marrow', 'Cardiology'], cashless: true, beds: 700, premium: false },
];

// Categories
export const INSURANCE_CATEGORIES = [
  { id: 1, name: 'Health', icon: 'heart', color: '#FF6B6B', gradient: ['#FF6B6B', '#EE5A24'] },
  { id: 2, name: 'Term Life', icon: 'shield-checkmark', color: '#4ECDC4', gradient: ['#4ECDC4', '#44BD96'] },
  { id: 3, name: 'Car', icon: 'car', color: '#45B7D1', gradient: ['#45B7D1', '#2980B9'] },
  { id: 4, name: 'Two Wheeler', icon: 'bicycle', color: '#F39C12', gradient: ['#F39C12', '#E67E22'] },
  { id: 5, name: 'Travel', icon: 'airplane', color: '#9B59B6', gradient: ['#9B59B6', '#8E44AD'] },
  { id: 6, name: 'Home', icon: 'home', color: '#1ABC9C', gradient: ['#1ABC9C', '#16A085'] },
  { id: 7, name: 'Critical Illness', icon: 'medkit', color: '#E74C3C', gradient: ['#E74C3C', '#C0392B'] },
  { id: 8, name: 'Personal Accident', icon: 'bandage', color: '#3498DB', gradient: ['#3498DB', '#2C3E50'] },
  { id: 9, name: 'Cancer', icon: 'ribbon', color: '#E91E63', gradient: ['#E91E63', '#C2185B'] },
  { id: 10, name: 'Super Top-Up', icon: 'trending-up', color: '#FF9800', gradient: ['#FF9800', '#F57C00'] },
  { id: 11, name: 'Group Health', icon: 'people', color: '#607D8B', gradient: ['#607D8B', '#455A64'] },
  { id: 12, name: 'Senior Citizen', icon: 'accessibility', color: '#795548', gradient: ['#795548', '#5D4037'] },
];

// Expert data
export const EXPERTS = [
  { id: 1, name: 'Dr. Priya Sharma', specialty: 'Health Insurance Advisor', rating: 4.9, reviews: 1250, experience: '15 years', available: true, image: null },
  { id: 2, name: 'Rajesh Kumar', specialty: 'Claims Expert', rating: 4.8, reviews: 980, experience: '12 years', available: true, image: null },
  { id: 3, name: 'Anita Desai', specialty: 'Policy Comparison Expert', rating: 4.7, reviews: 750, experience: '10 years', available: false, image: null },
  { id: 4, name: 'Vikram Singh', specialty: 'Top-Up Specialist', rating: 4.6, reviews: 620, experience: '8 years', available: true, image: null },
];

// FAQ data
export const INSURANCE_FAQS = [
  { id: 1, question: 'What is health insurance?', answer: 'Health insurance is a type of insurance that covers the whole or a part of the risk of a person incurring medical expenses. It covers hospitalization expenses, day care procedures, pre and post hospitalization expenses, and more.', category: 'basics', helpful: 245, unhelpful: 12 },
  { id: 2, question: 'What is the waiting period for pre-existing diseases?', answer: 'The waiting period for pre-existing diseases varies from insurer to insurer. It typically ranges from 2 to 4 years. Some plans offer reduced waiting periods for an additional premium.', category: 'coverage', helpful: 189, unhelpful: 8 },
  { id: 3, question: 'How to file a cashless claim?', answer: 'To file a cashless claim: 1) Get admitted to a network hospital 2) Show your health card at the insurance desk 3) The hospital will send a pre-authorization request 4) Once approved, treatment costs are settled directly.', category: 'claims', helpful: 312, unhelpful: 15 },
  { id: 4, question: 'What is No Claim Bonus (NCB)?', answer: 'No Claim Bonus is a reward for not making any claims during a policy year. It increases your sum insured by a certain percentage (usually 10-50%) without any additional premium. It accumulates over the years.', category: 'benefits', helpful: 267, unhelpful: 10 },
  { id: 5, question: 'What is a Super Top-Up plan?', answer: 'A Super Top-Up plan provides additional coverage above a deductible amount. It activates when your medical expenses exceed the deductible. It is a cost-effective way to increase your health coverage.', category: 'topup', helpful: 198, unhelpful: 7 },
  { id: 6, question: 'Can I port my health insurance?', answer: 'Yes, you can port your health insurance from one insurer to another without losing continuity benefits. Apply at least 45 days before renewal. You retain waiting period credits for pre-existing conditions.', category: 'porting', helpful: 156, unhelpful: 5 },
  { id: 7, question: 'What does maternity cover include?', answer: 'Maternity cover includes normal delivery, C-section delivery, pre and post-natal expenses, newborn baby cover for initial days, and vaccination expenses. Waiting period is usually 2-4 years.', category: 'maternity', helpful: 223, unhelpful: 9 },
  { id: 8, question: 'What is restoration benefit?', answer: 'Restoration benefit restores the sum insured once it is exhausted during the policy year. If you make a claim and exhaust your sum insured, the insurer restores the full sum insured for future claims.', category: 'benefits', helpful: 178, unhelpful: 6 },
  { id: 9, question: 'How to choose the right health insurance?', answer: 'Consider: 1) Coverage amount 2) Network hospitals 3) Claim settlement ratio 4) Waiting periods 5) Room rent limits 6) Co-payment 7) Sub-limits 8) Add-on benefits 9) Premium amount 10) Customer reviews.', category: 'guide', helpful: 345, unhelpful: 14 },
  { id: 10, question: 'What tax benefits are available?', answer: 'Under Section 80D, you can claim deductions: Up to Rs 25,000 for self and family, additional Rs 25,000 for parents (Rs 50,000 if senior citizens). Preventive health check-up up to Rs 5,000 within these limits.', category: 'tax', helpful: 290, unhelpful: 11 },
];

// Special offers
export const SPECIAL_OFFERS = [
  { id: 1, title: 'Zero GST Health Cover', discount: '18%', description: 'Get health insurance with zero GST benefit', validTill: '2026-03-31', code: 'ZEROGST', color: '#FF6B35' },
  { id: 2, title: 'Family Floater Special', discount: '25%', description: 'Cover your entire family at discounted rates', validTill: '2026-04-15', code: 'FAMILY25', color: '#2ECC71' },
  { id: 3, title: 'Senior Citizen Discount', discount: '15%', description: 'Special rates for citizens above 60', validTill: '2026-03-20', code: 'SENIOR15', color: '#3498DB' },
  { id: 4, title: 'Top-Up Mega Sale', discount: '30%', description: 'Get Super Top-Up at lowest ever prices', validTill: '2026-03-25', code: 'TOPUP30', color: '#9B59B6' },
];

// Reviews
export const REVIEWS = [
  { id: 1, user: 'Amit K.', rating: 5, date: '2026-02-15', plan: 'Reassure 3.0', comment: 'Excellent claim settlement experience. Got cashless approval within 2 hours at Apollo Hospital.', verified: true, helpful: 45 },
  { id: 2, user: 'Sneha R.', rating: 4, date: '2026-02-10', plan: 'Care Supreme', comment: 'Good coverage and affordable premium. The renewal process was seamless. Would recommend to everyone.', verified: true, helpful: 32 },
  { id: 3, user: 'Rahul M.', rating: 5, date: '2026-01-28', plan: 'Aspire Platinum+', comment: 'The maternity benefit is outstanding. Both delivery and newborn cover were excellent. Very satisfied!', verified: true, helpful: 67 },
  { id: 4, user: 'Priya S.', rating: 4, date: '2026-01-15', plan: 'Elevate', comment: 'Wide network of hospitals. The wellness program with gym discounts is a great addition. Premium is reasonable.', verified: false, helpful: 23 },
  { id: 5, user: 'Vikash T.', rating: 3, date: '2025-12-20', plan: 'Superstar Essential', comment: 'Decent plan but claim process took longer than expected. Eventually settled in 10 days. Coverage is good.', verified: true, helpful: 18 },
];

// Wellness programs
export const WELLNESS_PROGRAMS = [
  { id: 1, name: 'Step Counter Challenge', icon: 'walk', target: '10,000 steps/day', reward: '5% premium discount', progress: 72 },
  { id: 2, name: 'Gym Membership', icon: 'fitness', discount: 'Up to 50% off', partners: ['Cult.fit', 'Gold Gym', 'Anytime Fitness'], active: true },
  { id: 3, name: 'Annual Health Check-Up', icon: 'medical', value: 'Worth Rs 3,000', frequency: 'Once a year', booked: false },
  { id: 4, name: 'Yoga & Meditation', icon: 'leaf', sessions: '12 free sessions', partner: 'Fitternity', active: false },
];

// Theme colors
export const THEME = {
  light: {
    primary: '#FF6B35',
    primaryDark: '#E65100',
    primaryLight: '#FFE0B2',
    secondary: '#2ECC71',
    accent: '#3498DB',
    background: '#F5F5F5',
    surface: '#FFFFFF',
    surfaceVariant: '#F8F9FA',
    text: '#1A1A2E',
    textSecondary: '#666666',
    textTertiary: '#999999',
    border: '#E0E0E0',
    divider: '#F0F0F0',
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F39C12',
    info: '#3498DB',
    card: '#FFFFFF',
    shadow: '#000000',
    tabBar: '#FFFFFF',
    tabBarActive: '#FF6B35',
    tabBarInactive: '#8E8E93',
    gradient: ['#FF6B35', '#FF8F00'],
    headerGradient: ['#FF6B35', '#FF5722', '#E64A19'],
  },
  dark: {
    primary: '#FF8F00',
    primaryDark: '#FF6B35',
    primaryLight: '#3D2E1F',
    secondary: '#00C853',
    accent: '#448AFF',
    background: '#121212',
    surface: '#1E1E1E',
    surfaceVariant: '#2C2C2C',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    textTertiary: '#707070',
    border: '#333333',
    divider: '#2A2A2A',
    error: '#FF5252',
    success: '#69F0AE',
    warning: '#FFD740',
    info: '#448AFF',
    card: '#1E1E1E',
    shadow: '#000000',
    tabBar: '#1E1E1E',
    tabBarActive: '#FF8F00',
    tabBarInactive: '#666666',
    gradient: ['#FF8F00', '#FF6B35'],
    headerGradient: ['#1A1A2E', '#16213E', '#0F3460'],
  },
};
