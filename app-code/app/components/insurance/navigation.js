// Dynamic Routing Configuration for Insurance Detail Pages
// This file maps all clickable items to their detail page routes

import { router } from 'expo-router';
import { INSURANCE_DETAIL_PAGES } from './detailData';

// Color mappings for different categories
const colorMap = {
  'health': { gradient: ['#FF6B6B', '#EE5A24'], primary: '#FF6B6B' },
  'term-life': { gradient: ['#4ECDC4', '#44BD96'], primary: '#4ECDC4' },
  'car': { gradient: ['#45B7D1', '#2980B9'], primary: '#45B7D1' },
  'two-wheeler': { gradient: ['#F39C12', '#E67E22'], primary: '#F39C12' },
  'travel': { gradient: ['#9B59B6', '#8E44AD'], primary: '#9B59B6' },
  'home': { gradient: ['#1ABC9C', '#16A085'], primary: '#1ABC9C' },
  'critical-illness': { gradient: ['#E74C3C', '#C0392B'], primary: '#E74C3C' },
  'personal-accident': { gradient: ['#3498DB', '#2C3E50'], primary: '#3498DB' },
  'cancer': { gradient: ['#E91E63', '#C2185B'], primary: '#E91E63' },
  'super-topup': { gradient: ['#FF9800', '#F57C00'], primary: '#FF9800' },
  'group-health': { gradient: ['#607D8B', '#455A64'], primary: '#607D8B' },
  'senior-citizen': { gradient: ['#795548', '#5D4037'], primary: '#795548' },
  'offer': { gradient: ['#FF6B35', '#FF5722'], primary: '#FF6B35' },
  'expert': { gradient: ['#9B59B6', '#8E44AD'], primary: '#9B59B6' },
  'wellness': { gradient: ['#2ECC71', '#27AE60'], primary: '#2ECC71' },
  'default': { gradient: ['#FF6B35', '#FF5722'], primary: '#FF6B35' },
};

// Helper to get colors for a category
export const getCategoryColors = (categoryId) => {
  return colorMap[categoryId] || colorMap['default'];
};

// ==================== INSURANCE SECTION NAVIGATORS ====================

// Navigate to Category Detail
export const navigateToCategory = (categoryId) => {
  const categories = INSURANCE_DETAIL_PAGES.insurance?.categories || [];
  const category = categories.find(c => c.id === categoryId);
  
  if (category) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'category',
        itemId: categoryId,
        data: JSON.stringify(category),
        gradient: JSON.stringify(getCategoryColors(categoryId).gradient),
        title: category.name,
      },
    });
  }
};

// Navigate to Offer Detail
export const navigateToOffer = (offerId) => {
  const offers = INSURANCE_DETAIL_PAGES.insurance?.offers || [];
  const offer = offers.find(o => o.id === offerId);
  
  if (offer) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'offer',
        itemId: offerId,
        data: JSON.stringify(offer),
        gradient: JSON.stringify(['#FF6B35', '#FF5722']),
        title: offer.title,
      },
    });
  }
};

// Navigate to Expert Detail
export const navigateToExpert = (expertId) => {
  const experts = INSURANCE_DETAIL_PAGES.insurance?.experts || [];
  const expert = experts.find(e => e.id === expertId);
  
  if (expert) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'expert',
        itemId: expertId,
        data: JSON.stringify(expert),
        gradient: JSON.stringify(['#9B59B6', '#8E44AD']),
        title: expert.name,
      },
    });
  }
};

// Navigate to Wellness Detail
export const navigateToWellness = (wellnessId) => {
  const wellnessPrograms = INSURANCE_DETAIL_PAGES.insurance?.wellness || [];
  const wellness = wellnessPrograms.find(w => w.id === wellnessId);
  
  if (wellness) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'wellness',
        itemId: wellnessId,
        data: JSON.stringify(wellness),
        gradient: JSON.stringify(['#2ECC71', '#27AE60']),
        title: wellness.name,
      },
    });
  }
};

// ==================== TOP UP SECTION NAVIGATORS ====================

// Navigate to Top-Up Plan Detail
export const navigateToTopUpPlan = (planId) => {
  const plans = INSURANCE_DETAIL_PAGES.topup?.plans || [];
  const plan = plans.find(p => p.id === planId);
  
  if (plan) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'topupPlan',
        itemId: planId,
        data: JSON.stringify(plan),
        gradient: JSON.stringify(['#4CAF50', '#2E7D32']),
        title: plan.name,
      },
    });
  }
};

// ==================== EXPLORE SECTION NAVIGATORS ====================

// Navigate to Trending Plan Detail
export const navigateToTrendingPlan = (planId) => {
  const trendingPlans = INSURANCE_DETAIL_PAGES.explore?.trending || [];
  const plan = trendingPlans.find(p => p.id === planId);
  
  if (plan) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'trending',
        itemId: planId,
        data: JSON.stringify(plan),
        gradient: JSON.stringify(['#E74C3C', '#C0392B']),
        title: plan.name,
      },
    });
  }
};

// Navigate to New Launch Detail
export const navigateToNewLaunch = (launchId) => {
  const launches = INSURANCE_DETAIL_PAGES.explore?.newLaunches || [];
  const launch = launches.find(l => l.id === launchId);
  
  if (launch) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'launch',
        itemId: launchId,
        data: JSON.stringify(launch),
        gradient: JSON.stringify(['#9B59B6', '#8E44AD']),
        title: launch.name,
      },
    });
  }
};

// ==================== POLICIES SECTION NAVIGATORS ====================

// Navigate to Policy Detail
export const navigateToPolicy = (policyId) => {
  const activePolicies = INSURANCE_DETAIL_PAGES.policies?.active || [];
  const expiredPolicies = INSURANCE_DETAIL_PAGES.policies?.expired || [];
  
  const policy = [...activePolicies, ...expiredPolicies].find(p => p.id === policyId);
  
  if (policy) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'policy',
        itemId: policyId,
        data: JSON.stringify(policy),
        gradient: JSON.stringify(['#FF6B35', '#FF5722']),
        title: policy.name,
      },
    });
  }
};

// ==================== HELP SECTION NAVIGATORS ====================

// Navigate to Help Category Detail
export const navigateToHelpCategory = (categoryId) => {
  const categories = INSURANCE_DETAIL_PAGES.help?.categories || [];
  const category = categories.find(c => c.id === categoryId);
  
  if (category) {
    router.push({
      pathname: '/insurance/detail',
      params: {
        type: 'helpCategory',
        itemId: categoryId,
        data: JSON.stringify(category),
        gradient: JSON.stringify(['#9B59B6', '#8E44AD']),
        title: category.title,
      },
    });
  }
};

// ==================== UNIVERSAL NAVIGATOR ====================

// Universal navigation function that handles any type
export const navigateToDetail = (section, itemId, itemType) => {
  switch(section) {
    case 'insurance':
      if (itemType === 'category') return navigateToCategory(itemId);
      if (itemType === 'offer') return navigateToOffer(itemId);
      if (itemType === 'expert') return navigateToExpert(itemId);
      if (itemType === 'wellness') return navigateToWellness(itemId);
      break;
    case 'topup':
      if (itemType === 'plan') return navigateToTopUpPlan(itemId);
      break;
    case 'explore':
      if (itemType === 'trending') return navigateToTrendingPlan(itemId);
      if (itemType === 'launch') return navigateToNewLaunch(itemId);
      break;
    case 'policies':
      if (itemType === 'policy') return navigateToPolicy(itemId);
      break;
    case 'help':
      if (itemType === 'category') return navigateToHelpCategory(itemId);
      break;
  }
};

// Export all data for reference
export { INSURANCE_DETAIL_PAGES };
