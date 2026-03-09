// Apollo 24|7 Doctors Design System
export const DoctorsTheme = {
  colors: {
    apolloOrange: '#E05A2B',
    teal: '#006B6B',
    headerLavender: '#C8D4F0',
    headerPeach: '#F5E6D8',
    headerLightBlue: '#B0D8E8',
    darkGray: '#555555',
    lightGray: '#8E8E93',
    cardBg: '#F5F5F5',
    white: '#FFFFFF',
    black: '#000000',
    cream: '#FFF8F0',
    terracotta: '#8B3A2A',
    gold: '#DAA520',
    lightTeal: '#E6F5F5',
    lightOrange: '#FFF0EB',
    border: '#E5E5E5',
    textPrimary: '#1A1A1A',
    textSecondary: '#666666',
    textTertiary: '#999999',
    greenBadge: '#2E7D32',
    redBadge: '#D32F2F',
    surgeryPeach: '#F5E6D8',
    onTimeBlue: '#B0D8E8',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 12,
    xl: 16,
    round: 999,
  },
  typography: {
    headerLarge: {
      fontSize: 20,
      fontWeight: '700',
    },
    headerMedium: {
      fontSize: 18,
      fontWeight: '700',
    },
    headerSmall: {
      fontSize: 16,
      fontWeight: '600',
    },
    body: {
      fontSize: 14,
      fontWeight: '400',
    },
    bodyBold: {
      fontSize: 14,
      fontWeight: '600',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
    },
    tabLabel: {
      fontSize: 11,
      fontWeight: '500',
    },
    small: {
      fontSize: 10,
      fontWeight: '400',
    },
  },
  shadow: {
    level1: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.08,
      shadowRadius: 4,
      elevation: 2,
    },
    level2: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 4,
    },
  },
};

// Speciality data with emoji icons
export const SPECIALITIES = [
  { id: 'gp', name: 'General\nPractitioner', icon: '👨‍⚕️', color: '#E3F2FD' },
  { id: 'derma', name: 'Dermatology', icon: '🔍', color: '#FFF3E0' },
  { id: 'psych', name: 'Psychiatry', icon: '🧠', color: '#F3E5F5' },
  { id: 'ent', name: 'ENT', icon: '👂', color: '#E8F5E9' },
  { id: 'women', name: "Women's\nHealth", icon: '🤰', color: '#FCE4EC' },
  { id: 'cardio', name: 'Cardiology', icon: '❤️', color: '#FFEBEE' },
  { id: 'uro', name: 'Urology', icon: '🫘', color: '#E0F2F1' },
  { id: 'paed', name: 'Paediatrics', icon: '👶', color: '#E8EAF6' },
  { id: 'digest', name: 'Digestive\nHealth', icon: '🫁', color: '#FFF8E1' },
  { id: 'neuro', name: 'Neurology', icon: '🧬', color: '#E1F5FE' },
  { id: 'diab', name: 'Diabetology', icon: '💉', color: '#F1F8E9' },
  { id: 'ortho', name: 'Orthopaedics', icon: '🦴', color: '#EFEBE9' },
];

export const ONLINE_SPECIALITIES = [
  { id: 'gp', name: 'General\nPractitioner', icon: '👨‍⚕️', color: '#E3F2FD' },
  { id: 'women', name: "Women's\nHealth", icon: '🤰', color: '#FCE4EC' },
  { id: 'derma', name: 'Dermatology', icon: '🔍', color: '#FFF3E0' },
  { id: 'psych', name: 'Psychiatry', icon: '🧠', color: '#F3E5F5' },
  { id: 'uro', name: 'Urology', icon: '🫘', color: '#E0F2F1' },
  { id: 'ent', name: 'ENT', icon: '👂', color: '#E8F5E9' },
  { id: 'cardio', name: 'Cardiology', icon: '❤️', color: '#FFEBEE' },
  { id: 'paed', name: 'Paediatrics', icon: '👶', color: '#E8EAF6' },
  { id: 'digest', name: 'Digestive\nHealth', icon: '🫁', color: '#FFF8E1' },
  { id: 'neuro', name: 'Neurology', icon: '🧬', color: '#E1F5FE' },
  { id: 'ortho', name: 'Orthopaedics', icon: '🦴', color: '#EFEBE9' },
  { id: 'thyroid', name: 'Thyroid', icon: '🦋', color: '#E0F7FA' },
  { id: 'diab', name: 'Diabetology', icon: '💉', color: '#F1F8E9' },
];

export const ONTIME_SPECIALITIES = [
  { id: 'gp', name: 'General\nPractitioner /...', icon: '👨‍⚕️', color: '#E3F2FD' },
  { id: 'obstetrics', name: 'Obstetrics\n& Gynaecolo...', icon: '🤰', color: '#FCE4EC' },
  { id: 'psych', name: 'Psychiatry', icon: '🧠', color: '#F3E5F5' },
  { id: 'ent', name: 'ENT', icon: '👂', color: '#E8F5E9' },
  { id: 'paed', name: 'Paediatrics', icon: '👶', color: '#E8EAF6' },
  { id: 'derma', name: 'Dermatology', icon: '🔍', color: '#FFF3E0' },
  { id: 'uro', name: 'Urology', icon: '🫘', color: '#E0F2F1' },
  { id: 'gastro', name: 'Gastroenterol\nogy', icon: '🫁', color: '#FFF8E1' },
  { id: 'diet', name: 'Dietetics', icon: '📋', color: '#E8F5E9' },
];

export const SYMPTOMS = [
  { id: 'stress', name: 'Stress', icon: '😰', color: '#F3E5F5' },
  { id: 'fever', name: 'Fever', icon: '🌡️', color: '#FFEBEE' },
  { id: 'runny', name: 'Running\nNose', icon: '🤧', color: '#E8F5E9' },
  { id: 'throat', name: 'Throat\nPain', icon: '😮', color: '#FFF3E0' },
  { id: 'cough', name: 'Cough', icon: '🫁', color: '#E1F5FE' },
  { id: 'hairfall', name: 'Hair Fall', icon: '💇', color: '#F1F8E9' },
  { id: 'acne', name: 'Acne', icon: '😣', color: '#FCE4EC' },
  { id: 'viewall', name: 'View All', icon: '➡️', color: '#E0E0E0' },
];

export const ONLINE_SYMPTOMS = [
  { id: 'cough', name: 'Cough', icon: '🫁', color: '#E1F5FE' },
  { id: 'runny', name: 'Runny\nnose', icon: '🤧', color: '#E8F5E9' },
  { id: 'stress', name: 'Stress', icon: '😰', color: '#F3E5F5' },
  { id: 'throat', name: 'Throat\nPain', icon: '😮', color: '#FFF3E0' },
  { id: 'fever', name: 'Fever', icon: '🌡️', color: '#FFEBEE' },
  { id: 'irregular', name: 'Irregular\nperiods', icon: '📅', color: '#FCE4EC' },
  { id: 'hairfall', name: 'Hair\nfall', icon: '💇', color: '#F1F8E9' },
  { id: 'acne', name: 'Acne', icon: '😣', color: '#FCE4EC' },
];

export const SURGERY_HEART_PROCEDURES = [
  { id: 'bypass', name: 'Heart Bypass\nSurgery', icon: '❤️' },
  { id: 'angioplasty', name: 'Angioplasty', icon: '💓' },
  { id: 'rfa', name: 'Radiofrequency\nAblation', icon: '⚡' },
  { id: 'tavr', name: 'Transcatheter\nAortic Valve Repl...', icon: '🫀' },
  { id: 'mitral', name: 'Mitral Valve\nReplacement', icon: '💗' },
  { id: 'open', name: 'Open Heart\nSurgery', icon: '🏥' },
];

export const SURGERY_GYNEC_PROCEDURES = [
  { id: 'uterus', name: 'Uterus\nRemoval', icon: '🏥' },
  { id: 'csection', name: 'C-Section', icon: '👶' },
  { id: 'fibroid', name: 'Fibroid\nRemoval', icon: '🔬' },
  { id: 'ovarian', name: 'Ovarian Cyst\nRemoval', icon: '💊' },
];

export const SURGERY_GASTRO_PROCEDURES = [
  { id: 'gallbladder', name: 'Gallbladder\nRemoval', icon: '🏥' },
  { id: 'appendix', name: 'Appendix\nRemoval', icon: '🔬' },
  { id: 'hernia', name: 'Hernia\nRepair', icon: '💪' },
  { id: 'piles', name: 'Piles\nSurgery', icon: '💊' },
];

export const SURGERY_CONDITIONS = [
  { id: 'gallstones', name: 'Gallstones', icon: '🫁' },
  { id: 'appendicitis', name: 'Appendicitis', icon: '😣' },
  { id: 'blocked', name: 'Blocked Heart\nArteries', icon: '❤️' },
  { id: 'piles', name: 'Piles', icon: '💊' },
  { id: 'hernia', name: 'Hernia', icon: '💪' },
  { id: 'ovarian', name: 'Ovarian Cyst', icon: '🔬' },
  { id: 'breast', name: 'Breast Cancer', icon: '🎗️' },
  { id: 'prostate', name: 'Prostate\nEnlargement', icon: '🏥' },
];

export const COMMON_PROCEDURES = [
  { id: 'knee', name: 'Knee\nReplacement', icon: '🦵' },
  { id: 'gallbladder', name: 'Gallbladder\nRemoval', icon: '🫁' },
  { id: 'circumcision', name: 'Circumcision', icon: '🏥' },
  { id: 'hernia', name: 'Hernia', icon: '💪' },
  { id: 'csection', name: 'C-Section', icon: '👶' },
  { id: 'appendix', name: 'Appendix\nRemoval', icon: '🔬' },
  { id: 'piles', name: 'Piles\nSurgery', icon: '💊' },
  { id: 'hip', name: 'Hip\nReplacement', icon: '🦴' },
];

export const OUR_SPECIALITIES = [
  { id: 'heart', name: 'Heart\nSurgeries', icon: '❤️', color: '#FFEBEE' },
  { id: 'brain', name: 'Brain/Spine\nSurgeries', icon: '🧠', color: '#F3E5F5' },
  { id: 'gastro', name: 'Gastro\nSurgeries', icon: '🫁', color: '#FFF8E1' },
  { id: 'ortho', name: 'Orthopaedic\nsurgeries', icon: '🦴', color: '#EFEBE9' },
  { id: 'procto', name: 'Proctology\nSurgeries', icon: '🏥', color: '#E0F2F1' },
  { id: 'transplant', name: 'Organ\nTransplant', icon: '🫀', color: '#E8F5E9' },
  { id: 'maternity', name: 'Maternity\nSurgeries', icon: '🤰', color: '#FCE4EC' },
  { id: 'cancer', name: 'Cancer\nSurgeries', icon: '🎗️', color: '#FFF3E0' },
  { id: 'eye', name: 'Eye\nSurgeries', icon: '👁️', color: '#E1F5FE' },
];

export const LIFESTYLE_CONDITIONS = [
  { id: 'diabetes', name: 'Diabetes', icon: '💉', color: '#E8F5E9' },
  { id: 'pcos', name: 'PCOS', icon: '🤰', color: '#FCE4EC' },
  { id: 'hypertension', name: 'Hypertension', icon: '❤️', color: '#FFEBEE' },
  { id: 'obesity', name: 'Obesity', icon: '⚖️', color: '#FFF3E0' },
];

export const TESTS_DATA = [
  {
    id: 'vitamin',
    name: 'Apollo Vitamin Check - Basic',
    subtitle: 'with Smart Reports',
    includes: 'Includes: VITAMIN B12, CALCIUM, SERUM +1 more',
    description: 'Fatigue, low mood, weak immunity, or muscle pain often trace back to vitamin and mineral gaps.',
    tag: 'TOP BOOKED TESTS',
    tagColor: '#E05A2B',
  },
  {
    id: 'thyroid',
    name: 'Thyroid Profile - Complete',
    subtitle: 'with Smart Reports',
    includes: 'Includes: TSH, T3, T4, Free T3, Free T4',
    description: 'Comprehensive thyroid function assessment for metabolism and energy regulation.',
    tag: 'RECOMMENDED',
    tagColor: '#006B6B',
  },
];

export const EXPLORE_OFFERINGS = [
  { id: 'ayurveda', name: 'Apollo\nAyurveda', icon: '🌿', color: '#E8F5E9' },
  { id: 'askApollo', name: 'Ask\nApollo', icon: '🤖', color: '#E1F5FE' },
];

export const WHY_CHOOSE_STATS = [
  { id: 'hospitals', number: '73+', label: 'Apollo\nHospitals' },
  { id: 'experts', number: '11000+', label: 'Top Experts\nin India' },
  { id: 'admissions', number: '569000+', label: 'Admissions\nEvery Year' },
  { id: 'years', number: '40 Years', label: 'Healthcare\nExcellence' },
];

export const SURGERY_TABS = [
  { id: 'heart', name: 'Heart' },
  { id: 'gynec', name: 'Gynec' },
  { id: 'gastro', name: 'Gastro' },
  { id: 'bone', name: 'Bone & Joints' },
];

export const TIPS_BEFORE_SURGERY = [
  {
    id: 'second',
    title: 'Second Opinion:\nA Smarter First\nStep',
    color: '#E8F5E9',
  },
  {
    id: 'costs',
    title: 'Plan Better:\nUnderstand\nCosts &\nCoverage',
    color: '#FFF3E0',
  },
  {
    id: 'prepared',
    title: 'Be Prepared\nfor Your\nHospital Visit',
    color: '#E1F5FE',
  },
];

export const ASSISTANT_CHIPS = [
  'Symptoms & Treatment',
  'Diet & Nutrition',
  'Skin & Hair Care',
  'Book Appointment',
  'Order Medicines',
];
