// Comprehensive Insurance Detail Pages Data Configuration
// This file contains all clickable items and their unique page configurations

export const INSURANCE_DETAIL_PAGES = {
  // ==================== INSURANCE SECTION (from index.js) ====================
  insurance: {
    // From INSURANCE_CATEGORIES - 12 categories
    categories: [
      { id: 'health', name: 'Health', icon: 'heart', color: '#FF6B6B', gradient: ['#FF6B6B', '#EE5A24'], 
        description: 'Comprehensive health coverage for you and your family',
        features: ['Cashless hospitalization', 'Pre & post hospitalisation', 'Day care treatments', 'No claim bonus'],
        coverage: ['3L', '5L', '10L', '25L', '50L', '1Cr'],
        insurers: ['Niva Bupa', 'Care Health', 'Star Health', 'Apollo Munich', 'ManipalCigna'],
        taxBenefit: 'Up to Rs 1.5L under 80D',
        claimRatio: '85%+ claim settlement',
        networkHospitals: '10000+',
      },
      { id: 'term-life', name: 'Term Life', icon: 'shield-checkmark', color: '#4ECDC4', gradient: ['#4ECDC4', '#44BD96'],
        description: 'Financial protection for your family\'s future',
        features: ['Death benefit', 'Accidental death', 'Disability rider', 'Critical illness'],
        coverage: ['50L', '1Cr', '2Cr', '5Cr', '10Cr'],
        insurers: ['HDFC Life', 'ICICI Prudential', 'Kotak Life', 'Max Life', 'SBI Life'],
        taxBenefit: 'Death benefit tax-free under 10(10D)',
        claimRatio: '98%+ claim settlement',
        networkHospitals: 'N/A',
      },
      { id: 'car', name: 'Car Insurance', icon: 'car', color: '#45B7D1', gradient: ['#45B7D1', '#2980B9'],
        description: 'Comprehensive car insurance with best coverage',
        features: ['Own damage cover', 'Third party liability', 'Zero depreciation', 'Engine protection'],
        coverage: ['IDV based', 'Comprehensive', 'Third Party'],
        insurers: ['Bajaj Allianz', 'ICICI Lombard', 'HDFC Ergo', 'Reliance General', 'Kotak General'],
        taxBenefit: 'Premium qualifies for 80D if self-driven',
        claimRatio: '90%+ claim settlement',
        networkHospitals: '5000+ garages',
      },
      { id: 'two-wheeler', name: 'Two Wheeler', icon: 'bicycle', color: '#F39C12', gradient: ['#F39C12', '#E67E22'],
        description: 'Two-wheeler insurance for safe rides',
        features: ['Own damage cover', 'Third party liability', 'Accessories cover', 'Pillion rider cover'],
        coverage: ['IDV based', 'Comprehensive', 'Third Party'],
        insurers: ['Bajaj Allianz', 'ICICI Lombard', 'HDFC Ergo', 'Reliance General', 'Tata AIG'],
        taxBenefit: 'Premium qualifies for 80D',
        claimRatio: '88%+ claim settlement',
        networkHospitals: '4000+ garages',
      },
      { id: 'travel', name: 'Travel Insurance', icon: 'airplane', color: '#9B59B6', gradient: ['#9B59B6', '#8E44AD'],
        description: 'Travel worry-free with comprehensive coverage',
        features: ['Trip cancellation', 'Baggage loss', 'Flight delay', 'Medical emergency', 'Personal liability'],
        coverage: ['Domestic', 'International', 'Schengen', 'USA/Canada'],
        insurers: ['Bajaj Allianz', 'ICICI Lombard', 'HDFC Ergo', 'Reliance General', 'Tata AIG'],
        taxBenefit: 'Business travel qualifies for deduction',
        claimRatio: '95%+ claim settlement',
        networkHospitals: 'Global network',
      },
      { id: 'home', name: 'Home Insurance', icon: 'home', color: '#1ABC9C', gradient: ['#1ABC9C', '#16A085'],
        description: 'Protect your home from uncertainties',
        features: ['Fire & burglary', 'Natural calamities', 'Liability cover', 'Contents cover'],
        coverage: ['Building', 'Contents', 'Both'],
        insurers: ['Bajaj Allianz', 'ICICI Lombard', 'HDFC Ergo', 'Reliance General', 'Tata AIG'],
        taxBenefit: 'Home loan interest qualifies for 24/80EE',
        claimRatio: '92%+ claim settlement',
        networkHospitals: 'N/A',
      },
      { id: 'critical-illness', name: 'Critical Illness', icon: 'medkit', color: '#E74C3C', gradient: ['#E74C3C', '#C0392B'],
        description: 'Lump sum payment on diagnosis of critical illness',
        features: ['Cancer cover', 'Heart disease', 'Kidney failure', 'Stroke', 'Organ transplant'],
        coverage: ['5L', '10L', '25L', '50L', '1Cr'],
        insurers: ['HDFC Life', 'ICICI Prudential', 'Kotak Life', 'Max Life', 'Star Health'],
        taxBenefit: 'Up to Rs 1L under 80D',
        claimRatio: '94%+ claim settlement',
        networkHospitals: '10000+',
      },
      { id: 'personal-accident', name: 'Personal Accident', icon: 'bandage', color: '#3498DB', gradient: ['#3498DB', '#2C3E50'],
        description: 'Financial protection against accidents',
        features: ['Accidental death', 'Permanent disability', 'Temporary disability', 'Hospital cash'],
        coverage: ['5L', '10L', '25L', '50L', '1Cr'],
        insurers: ['Bajaj Allianz', 'ICICI Lombard', 'HDFC Ergo', 'Reliance General', 'Tata AIG'],
        taxBenefit: 'Up to Rs 1.5L under 80D',
        claimRatio: '96%+ claim settlement',
        networkHospitals: '10000+',
      },
      { id: 'cancer', name: 'Cancer Insurance', icon: 'ribbon', color: '#E91E63', gradient: ['#E91E63', '#C2185B'],
        description: 'Specialized cover for cancer treatment',
        features: ['Early stage cancer', 'Major cancer', 'Treatment cover', 'Recovery benefit'],
        coverage: ['5L', '10L', '25L', '50L', '1Cr'],
        insurers: ['HDFC Life', 'ICICI Prudential', 'Kotak Life', 'Max Life', 'Star Health'],
        taxBenefit: 'Up to Rs 1L under 80D',
        claimRatio: '93%+ claim settlement',
        networkHospitals: '10000+',
      },
      { id: 'super-topup', name: 'Super Top-Up', icon: 'trending-up', color: '#FF9800', gradient: ['#FF9800', '#F57C00'],
        description: 'Extra coverage above your base health insurance',
        features: ['High sum insured', 'Deductible options', 'No claim bonus', 'Restoration benefit'],
        coverage: ['5L', '10L', '15L', '20L', '25L', '50L', '1Cr'],
        insurers: ['Niva Bupa', 'Care Health', 'Star Health', 'Apollo Munich', 'ManipalCigna'],
        taxBenefit: 'Up to Rs 1.5L under 80D',
        claimRatio: '88%+ claim settlement',
        networkHospitals: '10000+',
      },
      { id: 'group-health', name: 'Group Health', icon: 'people', color: '#607D8B', gradient: ['#607D8B', '#455A64'],
        description: 'Health insurance for employees and members',
        features: ['Group coverage', 'Customizable benefits', 'No waiting period', 'Family coverage'],
        coverage: ['As per group', 'Corporate', ' SME', 'Associations'],
        insurers: ['Niva Bupa', 'Care Health', 'Star Health', 'Apollo Munich', 'ManipalCigna'],
        taxBenefit: 'Business expense deduction',
        claimRatio: '90%+ claim settlement',
        networkHospitals: '10000+',
      },
      { id: 'senior-citizen', name: 'Senior Citizen', icon: 'accessibility', color: '#795548', gradient: ['#795548', '#5D4037'],
        description: 'Specialized health cover for senior citizens',
        features: ['High coverage', 'Pre-existing diseases', 'No medical test', 'Affordable premium'],
        coverage: ['5L', '10L', '15L', '20L', '25L'],
        insurers: ['Niva Bupa', 'Care Health', 'Star Health', 'Apollo Munich', 'Reliance General'],
        taxBenefit: 'Up to Rs 50K under 80D (parents)',
        claimRatio: '85%+ claim settlement',
        networkHospitals: '10000+',
      },
    ],
    // Special Offers - 4 items
    offers: [
      { id: 'zero-gst', title: 'Zero GST Health Cover', discount: '18%', description: 'Get health insurance with zero GST benefit', validTill: '2026-03-31', code: 'ZEROGST', color: '#FF6B35',
        heroImage: 'discount', benefits: ['Zero GST on premium', 'Instant policy', 'Digital card', '24/7 support'],
        eligibility: 'New customers, All age groups', minPremium: 5000, maxDiscount: '18%',
      },
      { id: 'family-floater', title: 'Family Floater Special', discount: '25%', description: 'Cover your entire family at discounted rates', validTill: '2026-04-15', code: 'FAMILY25', color: '#2ECC71',
        heroImage: 'family', benefits: ['Up to 25% discount', 'Covers 4 members', 'No room rent limit', 'Maternity cover'],
        eligibility: 'Family of 3-4 members', minPremium: 8000, maxDiscount: '25%',
      },
      { id: 'senior-discount', title: 'Senior Citizen Discount', discount: '15%', description: 'Special rates for citizens above 60', validTill: '2026-03-20', code: 'SENIOR15', color: '#3498DB',
        heroImage: 'senior', benefits: ['15% off', 'No medical test', 'Pre-existing cover', 'Easy claims'],
        eligibility: 'Age 60-75 years', minPremium: 10000, maxDiscount: '15%',
      },
      { id: 'topup-mega', title: 'Top-Up Mega Sale', discount: '30%', description: 'Get Super Top-Up at lowest ever prices', validTill: '2026-03-25', code: 'TOPUP30', color: '#9B59B6',
        heroImage: 'topup', benefits: ['30% discount', 'High coverage', 'Low deductible', 'Restore benefit'],
        eligibility: 'Existing health insurance holders', minPremium: 3000, maxDiscount: '30%',
      },
    ],
    // Experts - 4 items
    experts: [
      { id: 'expert-1', name: 'Dr. Priya Sharma', specialty: 'Health Insurance Advisor', rating: 4.9, reviews: 1250, experience: '15 years', available: true,
        expertise: ['Health Insurance', 'Family Plans', 'Critical Illness'], consultFee: 'Free', languages: ['English', 'Hindi', 'Marathi'],
      },
      { id: 'expert-2', name: 'Rajesh Kumar', specialty: 'Claims Expert', rating: 4.8, reviews: 980, experience: '12 years', available: true,
        expertise: ['Claims Processing', 'Reimbursement', 'Cashless Claims'], consultFee: '₹299', languages: ['English', 'Hindi', 'Tamil'],
      },
      { id: 'expert-3', name: 'Anita Desai', specialty: 'Policy Comparison Expert', rating: 4.7, reviews: 750, experience: '10 years', available: false,
        expertise: ['Plan Comparison', 'Term Insurance', 'Investment Plans'], consultFee: '₹199', languages: ['English', 'Hindi', 'Gujarati'],
      },
      { id: 'expert-4', name: 'Vikram Singh', specialty: 'Top-Up Specialist', rating: 4.6, reviews: 620, experience: '8 years', available: true,
        expertise: ['Super Top-Up', 'Health Insurance', 'Deductible Plans'], consultFee: 'Free', languages: ['English', 'Hindi', 'Punjabi'],
      },
    ],
    // Wellness Programs - 4 items
    wellness: [
      { id: 'wellness-1', name: 'Step Counter Challenge', icon: 'walk', target: '10,000 steps/day', reward: '5% premium discount', progress: 72,
        description: 'Track your daily steps and earn premium discounts', duration: '30 days', participants: '50,000+',
      },
      { id: 'wellness-2', name: 'Gym Membership', icon: 'fitness', discount: 'Up to 50% off', partners: ['Cult.fit', 'Gold Gym', 'Anytime Fitness'], active: true,
        description: 'Get exclusive discounts on gym memberships', validity: '1 year', coverage: 'All cities',
      },
      { id: 'wellness-3', name: 'Annual Health Check-Up', icon: 'medical', value: 'Worth Rs 3,000', frequency: 'Once a year', booked: false,
        description: 'Comprehensive health check-up at no extra cost', tests: '50+ tests', locations: '500+ centers',
      },
      { id: 'wellness-4', name: 'Yoga & Meditation', icon: 'leaf', sessions: '12 free sessions', partner: 'Fitternity', active: false,
        description: 'Free yoga and meditation sessions for mental wellness', duration: '3 months', instructors: '100+',
      },
    ],
  },

  // ==================== TOP UP SECTION ====================
  topup: {
    plans: [
      { id: 'care-super-topup', name: 'Care Health Super Top-Up', insurer: 'Care Health', coverage: '5L-50L', deductible: '3L-15L', premium: '₹3,500/yr',
        features: ['No room rent limit', 'Day care procedures', 'Modern treatments', 'Restoration benefit'], claimRatio: 88,
      },
      { id: 'reassure-topup', name: 'Reassure Top-Up', insurer: 'Niva Bupa', coverage: '5L-1Cr', deductible: '5L-20L', premium: '₹4,200/yr',
        features: ['Unlimited restoration', 'Global emergency', 'No sub-limits', 'Air ambulance'], claimRatio: 85,
      },
      { id: 'star-topup', name: 'Star Super Top-Up', insurer: 'Star Health', coverage: '3L-25L', deductible: '2L-10L', premium: '₹2,800/yr',
        features: ['Automatic recharge', 'Repatriation benefit', 'HIV cover', 'Bariatric surgery'], claimRatio: 90,
      },
      { id: 'apollo-pro', name: 'Apollo ProHealth Top-Up', insurer: 'Apollo Munich', coverage: '5L-50L', deductible: '3L-15L', premium: '₹3,200/yr',
        features: ['No co-payment', 'Alternative treatments', 'Vaccination cover', 'Organ donor'], claimRatio: 87,
      },
    ],
    calculators: [
      { id: 'calc-1', name: 'Premium Calculator', description: 'Calculate your premium based on age, coverage, and members' },
      { id: 'calc-2', name: 'Deductible Optimizer', description: 'Find the optimal deductible for maximum savings' },
      { id: 'calc-3', name: 'Savings Calculator', description: 'Calculate savings with top-up vs base plan' },
    ],
    benefits: [
      { id: 'benefit-1', title: 'Wide Sum Insured', icon: 'shield-checkmark', description: 'Options from F5 lakh to F1 Crore' },
      { id: 'benefit-2', title: 'In-Patient Care', icon: 'bed', description: 'Hospitalization costs covered up to sum insured' },
      { id: 'benefit-3', title: 'Coverage Recharge', icon: 'refresh', description: 'Automatic recharge of 100% of SI' },
      { id: 'benefit-4', title: 'No Limit for ICU', icon: 'medkit', description: 'No limit on ICU costs, doctor fee' },
    ],
  },

  // ==================== EXPLORE SECTION ====================
  explore: {
    trending: [
      { id: 'trending-1', name: 'Reassure 3.0 Platinum', insurer: 'Niva Bupa', cover: '10L', premium: '₹14,757/yr', users: '12,500', rating: 4.5 },
      { id: 'trending-2', name: 'Care Supreme', insurer: 'Care Health', cover: '15L', premium: '₹16,500/yr', users: '10,200', rating: 4.3 },
      { id: 'trending-3', name: 'Aspire Platinum+', insurer: 'ManipalCigna', cover: '10L', premium: '₹16,174/yr', users: '8,900', rating: 4.7 },
      { id: 'trending-4', name: 'Star Comprehensive', insurer: 'Star Health', cover: '5L', premium: '₹12,000/yr', users: '7,800', rating: 4.2 },
    ],
    newLaunches: [
      { id: 'launch-1', name: 'Apollo ProHealth Plus', insurer: 'Apollo Munich', cover: '25L', premium: '₹899/mo', tag: 'Just Launched', color: '#9B59B6' },
      { id: 'launch-2', name: 'Care Advantage 2026', insurer: 'Care Health', cover: '50L', premium: '₹1,199/mo', tag: 'New', color: '#FF6B35' },
      { id: 'launch-3', name: 'Star Young India', insurer: 'Star Health', cover: '10L', premium: '₹499/mo', tag: 'Introductory', color: '#2ECC71' },
    ],
    priceDrops: [
      { id: 'price-1', name: 'Optima Restore', insurer: 'HDFC Ergo', oldPremium: '₹18,000', newPremium: '₹14,500', discount: '19%' },
      { id: 'price-2', name: 'Health Edge', insurer: 'Reliance', oldPremium: '₹15,000', newPremium: '₹12,000', discount: '20%' },
      { id: 'price-3', name: 'My Health', insurer: 'ManipalCigna', oldPremium: '₹20,000', newPremium: '₹16,500', discount: '17%' },
    ],
    expertPicks: [
      { id: 'expert-pick-1', name: 'For Families', recommendation: 'Reassure 3.0', reason: 'Best restoration benefit', icon: 'people' },
      { id: 'expert-pick-2', name: 'For Seniors', recommendation: 'Care Senior', reason: 'No medical test required', icon: 'accessibility' },
      { id: 'expert-pick-3', name: 'For Budget', recommendation: 'Star Essential', reason: 'Affordable premium', icon: 'wallet' },
    ],
    seasonalOffers: [
      { id: 'seasonal-1', title: 'Holi Special', discount: '20%', description: 'Festive season offer on family plans', code: 'HOLI20' },
      { id: 'seasonal-2', title: 'New Year Sale', discount: '25%', description: 'New year discount on all plans', code: 'NEWYEAR25' },
    ],
    combos: [
      { id: 'combo-1', title: 'Health + Top-Up', plans: 2, savings: '₹5,000/yr', discount: '15%' },
      { id: 'combo-2', title: 'Health + Term Life', plans: 2, savings: '₹8,000/yr', discount: '20%' },
    ],
    discover: [
      { id: 'discover-1', title: 'Claim Process', icon: 'document-text', description: 'Learn how to file a claim' },
      { id: 'discover-2', title: 'Network Hospitals', icon: 'business', description: 'Find hospitals near you' },
      { id: 'discover-3', title: 'Tax Benefits', icon: 'receipt', description: 'Save tax with insurance' },
      { id: 'discover-4', title: 'Wellness Benefits', icon: 'fitness', description: 'Earn rewards with health' },
    ],
  },

  // ==================== MY POLICIES SECTION ====================
  policies: {
    active: [
      { id: 'POL001', name: 'Reassure 3.0 Platinum', insurer: 'Niva Bupa', type: 'Health', premium: 14757, coverage: '10L', status: 'active', members: ['Self', 'Wife'], claimsCount: 0 },
      { id: 'POL002', name: 'Care Supreme', insurer: 'Care Health', type: 'Top-Up', premium: 5200, coverage: '50L', status: 'active', members: ['Self', 'Wife', 'Mother'], claimsCount: 1 },
    ],
    expired: [
      { id: 'POL003', name: 'Star Comprehensive', insurer: 'Star Health', type: 'Health', premium: 12000, coverage: '5L', status: 'expired', members: ['Self'], gracePeriod: '30 days' },
    ],
    actions: [
      { id: 'action-view', title: 'View Policy', icon: 'document-text', description: 'View policy details and documents' },
      { id: 'action-download', title: 'Download', icon: 'download', description: 'Download policy PDF' },
      { id: 'action-renew', title: 'Renew', icon: 'refresh', description: 'Renew your policy' },
      { id: 'action-claim', title: 'File Claim', icon: 'medical', description: 'Submit a claim request' },
      { id: 'action-port', title: 'Port Policy', icon: 'swap-horizontal', description: 'Port to another insurer' },
    ],
  },

  // ==================== HELP SECTION ====================
  help: {
    categories: [
      { id: 'policy-basics', title: 'Policy Basics', icon: 'shield-checkmark', count: 12, color: '#FF6B35',
        articles: ['What is health insurance?', 'Types of health plans', 'Sum insured explained', 'Waiting periods'] },
      { id: 'claims', title: 'Claims', icon: 'document-text', count: 18, color: '#E74C3C',
        articles: ['How to file a claim', 'Cashless claim process', 'Reimbursement process', 'Required documents'] },
      { id: 'payments', title: 'Payments', icon: 'card', count: 9, color: '#3498DB',
        articles: ['Payment methods', 'EMI options', 'GST benefit', 'Premium payment'] },
      { id: 'coverage', title: 'Coverage', icon: 'umbrella', count: 15, color: '#4CAF50',
        articles: 'What is covered', 'Pre-existing diseases', 'Maternity cover', 'Critical illness' },
      { id: 'renewal', title: 'Renewal', icon: 'refresh', count: 7, color: '#F39C12',
        articles: ['Renewal process', 'NCB transfer', 'Policy porting', 'Grace period'] },
      { id: 'topup', title: 'Top-Up', icon: 'trending-up', count: 8, color: '#9B59B6',
        articles: ['How top-up works', 'Deductible explained', 'Super top-up vs top-up', 'When to buy'] },
    ],
    claimSteps: [
      { step: 1, title: 'Intimate the Claim', desc: 'Contact insurer within 24-48 hours', icon: 'call' },
      { step: 2, title: 'Submit Documents', desc: 'Upload required medical documents', icon: 'document-attach' },
      { step: 3, title: 'Claim Assessment', desc: 'Insurer reviews your claim', icon: 'search' },
      { step: 4, title: 'Claim Settlement', desc: 'Receive payment upon approval', icon: 'checkmark-done' },
    ],
    troubleshooting: [
      { id: 'trouble-1', title: 'Claim Rejected', icon: 'alert-circle', color: '#E74C3C', description: 'Common reasons and solutions' },
      { id: 'trouble-2', title: 'Payment Failed', icon: 'card', color: '#F39C12', description: 'How to retry payment' },
      { id: 'trouble-3', title: 'Policy Not Found', icon: 'search', color: '#3498DB', description: 'Search your policy' },
    ],
    videos: [
      { id: 'video-1', title: 'How to Buy Insurance', duration: '3:45', views: '1.2L' },
      { id: 'video-2', title: 'Filing a Cashless Claim', duration: '4:20', views: '89K' },
      { id: 'video-3', title: 'Understanding Premiums', duration: '2:30', views: '56K' },
    ],
  },
};

// Get unique page config by ID
export const getDetailPageConfig = (section, itemId) => {
  const sectionData = INSURANCE_DETAIL_PAGES[section];
  if (!sectionData) return null;
  
  // Search in categories
  if (sectionData.categories) {
    const category = sectionData.categories.find(c => c.id === itemId || c.name.toLowerCase().replace(/ /g, '-') === itemId);
    if (category) return { type: 'category', data: category };
  }
  
  // Search in offers
  if (sectionData.offers) {
    const offer = sectionData.offers.find(o => o.id === itemId);
    if (offer) return { type: 'offer', data: offer };
  }
  
  // Search in experts
  if (sectionData.experts) {
    const expert = sectionData.experts.find(e => e.id === itemId);
    if (expert) return { type: 'expert', data: expert };
  }
  
  // Search in wellness
  if (sectionData.wellness) {
    const wellness = sectionData.wellness.find(w => w.id === itemId);
    if (wellness) return { type: 'wellness', data: wellness };
  }
  
  // Search in plans (topup)
  if (sectionData.plans) {
    const plan = sectionData.plans.find(p => p.id === itemId);
    if (plan) return { type: 'plan', data: plan };
  }
  
  // Search in trending
  if (sectionData.trending) {
    const trending = sectionData.trending.find(t => t.id === itemId);
    if (trending) return { type: 'trending', data: trending };
  }
  
  // Search in new launches
  if (sectionData.newLaunches) {
    const launch = sectionData.newLaunches.find(l => l.id === itemId);
    if (launch) return { type: 'launch', data: launch };
  }
  
  // Search in active policies
  if (sectionData.active) {
    const policy = sectionData.active.find(p => p.id === itemId);
    if (policy) return { type: 'activePolicy', data: policy };
  }
  
  // Search in help categories
  if (sectionData.categories) {
    const helpCat = sectionData.categories.find(c => c.id === itemId);
    if (helpCat) return { type: 'helpCategory', data: helpCat };
  }
  
  return null;
};

export default INSURANCE_DETAIL_PAGES;
