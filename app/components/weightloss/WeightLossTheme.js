/**
 * ============================================================================
 * WEIGHT LOSS SCREEN - EMERALD FITNESS EDITION THEME
 * ============================================================================
 */

export const WL_COLORS = {
  // Primary Emerald Palette
  emerald: '#00A651',
  emeraldLight: '#00C853',
  emeraldDark: '#007A3D',
  emeraldFaded: 'rgba(0, 166, 81, 0.08)',
  emeraldSubtle: 'rgba(0, 166, 81, 0.15)',
  emeraldGlow: 'rgba(0, 166, 81, 0.25)',

  // Fitness Orange
  fitnessOrange: '#FF6B35',
  fitnessOrangeLight: '#FF8A5C',
  fitnessOrangeFaded: 'rgba(255, 107, 53, 0.10)',

  // Health Blue
  healthBlue: '#0088FF',
  healthBlueFaded: 'rgba(0, 136, 255, 0.10)',

  // Calorie Red
  calorieRed: '#FF4444',
  calorieRedFaded: 'rgba(255, 68, 68, 0.10)',

  // Success Green
  successGreen: '#4CAF50',
  successGreenFaded: 'rgba(76, 175, 80, 0.10)',

  // Gradient Arrays
  gradientEmerald: ['#00A651', '#00C853'],
  gradientOrangeFitness: ['#FF6B35', '#FF8A5C'],
  gradientBlueCool: ['#0088FF', '#00AAFF'],
  gradientHealthy: ['#00A651', '#4CAF50'],
  gradientSunrise: ['#FF6B35', '#FFB800'],
  gradientPurpleWellness: ['#7B2CBF', '#9B59B6'],
};

export const WL_DATA = {
  smarterChoices: [
    { id: 1, title: 'Explore Weight\nLoss Supplements', desc: 'Opt for options that\nsupport metabolism\n& control appetite', icon: 'leaf', gradient: ['#E8F5E9', '#C8E6C9'] },
    { id: 2, title: 'Adopt a\nZero-Sugar Lifestyle', desc: 'Switch to natural\nsweeteners like\nstevia, monk fruit', icon: 'nutrition', gradient: ['#FFF3E0', '#FFE0B2'] },
    { id: 3, title: 'Smart Portion\nWithout Sacrifice', desc: 'Opt for mindful\noptions that help\ncontrol appetite', icon: 'resize', gradient: ['#E3F2FD', '#BBDEFB'] },
  ],
  journeyCards: [
    { id: 1, title: 'Prescription Medicines', desc: 'Medically supervised\nweight loss products', icon: 'medkit', color: '#00A651' },
    { id: 2, title: 'Mindful Eating', desc: 'Controlled portions\n& a balanced diet', icon: 'restaurant', color: '#FF6B35' },
    { id: 3, title: 'Natural Remedies', desc: 'Green tea, apple cider, etc\ncan boost metabolism', icon: 'leaf', color: '#4CAF50' },
    { id: 4, title: 'Medical Investigation', desc: 'Check for conditions\nlike Diabetes, Thyroid,\nPCOS, etc.', icon: 'analytics', color: '#0088FF' },
  ],
  healthRisks: [
    { id: 1, title: 'Certain Cancers', desc: 'Obesity increases the risk of certain cancers, particularly in women — such as breast, ovarian, and endometrial cancers', icon: 'warning' },
    { id: 2, title: 'Heart Disease', desc: 'Excess weight puts enormous strain on the cardiovascular system, leading to hypertension, coronary artery disease, and heart failure', icon: 'heart-dislike' },
    { id: 3, title: 'Type 2 Diabetes', desc: 'Obesity is the leading risk factor for developing type 2 diabetes, affecting insulin resistance and blood sugar regulation', icon: 'fitness' },
    { id: 4, title: 'Joint Problems', desc: 'Excess weight increases stress on joints, especially knees and hips, leading to osteoarthritis and chronic pain', icon: 'body' },
    { id: 5, title: 'Sleep Apnea', desc: 'Obesity significantly increases the risk of obstructive sleep apnea, affecting sleep quality and overall health', icon: 'moon' },
    { id: 6, title: 'Liver Disease', desc: 'Non-alcoholic fatty liver disease is strongly associated with obesity, potentially leading to cirrhosis', icon: 'medical' },
  ],
  healthTools: [
    { id: 1, title: 'Steps\nCounter', icon: 'footsteps', color: '#00A651', badge: null },
    { id: 2, title: 'Calorie\nCounter', icon: 'flame', color: '#FF6B35', badge: 'NEW' },
    { id: 3, title: 'Track\nSugar', icon: 'cube', color: '#FF4444', badge: null },
    { id: 4, title: 'Know\nYour Food', icon: 'nutrition', color: '#4CAF50', badge: null },
  ],
  dietPlans: [
    { id: 1, title: 'Keto Diet Plan', desc: 'High fat, low carb diet for rapid weight loss', calories: '1200-1500', duration: '12 weeks', icon: 'flame', color: '#FF6B35' },
    { id: 2, title: 'Mediterranean Diet', desc: 'Heart-healthy eating with olive oil, fish & veggies', calories: '1500-1800', duration: '16 weeks', icon: 'leaf', color: '#4CAF50' },
    { id: 3, title: 'Intermittent Fasting', desc: '16:8 or 5:2 fasting protocols for metabolic health', calories: '1400-1600', duration: '8 weeks', icon: 'time', color: '#0088FF' },
    { id: 4, title: 'DASH Diet', desc: 'Dietary approach to stop hypertension & lose weight', calories: '1600-2000', duration: '10 weeks', icon: 'heart', color: '#E91E63' },
    { id: 5, title: 'Plant-Based Diet', desc: 'Whole food plant-based nutrition for sustainable weight loss', calories: '1300-1600', duration: '12 weeks', icon: 'nutrition', color: '#00A651' },
    { id: 6, title: 'Low-Carb Diet', desc: 'Reduce carbohydrate intake for effective fat burning', calories: '1200-1500', duration: '10 weeks', icon: 'barbell', color: '#7B2CBF' },
  ],
  exercises: [
    { id: 1, title: 'Morning HIIT', desc: '20 min high-intensity interval training', calories: '300-400 cal', level: 'Intermediate', icon: 'flash', color: '#FF6B35' },
    { id: 2, title: 'Yoga Flow', desc: '30 min gentle yoga for flexibility & mindfulness', calories: '150-200 cal', level: 'Beginner', icon: 'body', color: '#9B59B6' },
    { id: 3, title: 'Strength Training', desc: '45 min resistance workout for muscle building', calories: '400-500 cal', level: 'Advanced', icon: 'barbell', color: '#00A651' },
    { id: 4, title: 'Cardio Blast', desc: '30 min running, cycling or swimming', calories: '350-450 cal', level: 'Intermediate', icon: 'bicycle', color: '#0088FF' },
    { id: 5, title: 'Pilates Core', desc: '25 min core-strengthening pilates session', calories: '200-300 cal', level: 'Beginner', icon: 'fitness', color: '#E91E63' },
    { id: 6, title: 'Dance Fitness', desc: '35 min fun dance workout for full body', calories: '300-400 cal', level: 'Beginner', icon: 'musical-notes', color: '#FFB800' },
  ],
  successStories: [
    { id: 1, name: 'Priya Sharma', lost: '18 kg', duration: '6 months', quote: 'Apollo\'s weight loss program completely transformed my life. The doctors were incredibly supportive throughout my journey.', rating: 5 },
    { id: 2, name: 'Rahul Verma', lost: '25 kg', duration: '8 months', quote: 'The combination of diet planning and regular consultations made all the difference. I feel like a new person!', rating: 5 },
    { id: 3, name: 'Anita Desai', lost: '12 kg', duration: '4 months', quote: 'Intermittent fasting guidance from Apollo doctors helped me achieve my target weight safely and effectively.', rating: 4 },
    { id: 4, name: 'Vikram Singh', lost: '30 kg', duration: '10 months', quote: 'From being pre-diabetic to running marathons — Apollo\'s holistic approach to weight management changed everything.', rating: 5 },
  ],
  supplements: [
    { id: 1, name: 'Apollo Life Garcinia', price: 499, oldPrice: 699, discount: 29, rating: 4.3 },
    { id: 2, name: 'Green Tea Extract 500mg', price: 349, oldPrice: 499, discount: 30, rating: 4.5 },
    { id: 3, name: 'Apple Cider Vinegar Caps', price: 599, oldPrice: 799, discount: 25, rating: 4.2 },
    { id: 4, name: 'CLA 1000mg Softgels', price: 799, oldPrice: 1099, discount: 27, rating: 4.4 },
    { id: 5, name: 'L-Carnitine 500mg', price: 649, oldPrice: 899, discount: 28, rating: 4.1 },
    { id: 6, name: 'Omega-3 Fish Oil', price: 449, oldPrice: 599, discount: 25, rating: 4.6 },
    { id: 7, name: 'Protein Shake Mix', price: 899, oldPrice: 1299, discount: 31, rating: 4.7 },
    { id: 8, name: 'Fiber Supplement', price: 299, oldPrice: 449, discount: 33, rating: 4.0 },
  ],
  bmiCategories: [
    { range: '< 18.5', label: 'Underweight', color: '#0088FF' },
    { range: '18.5 - 24.9', label: 'Normal', color: '#4CAF50' },
    { range: '25.0 - 29.9', label: 'Overweight', color: '#FFB800' },
    { range: '30.0 - 34.9', label: 'Obese I', color: '#FF6B35' },
    { range: '35.0 - 39.9', label: 'Obese II', color: '#FF4444' },
    { range: '40+', label: 'Obese III', color: '#D32F2F' },
  ],
  weeklyMealPlan: [
    { day: 'Monday', breakfast: 'Oats with berries & almonds', lunch: 'Grilled chicken salad', dinner: 'Quinoa & vegetable stir-fry', calories: 1450 },
    { day: 'Tuesday', breakfast: 'Greek yogurt parfait', lunch: 'Lentil soup with whole wheat bread', dinner: 'Baked salmon with steamed broccoli', calories: 1380 },
    { day: 'Wednesday', breakfast: 'Smoothie bowl with chia seeds', lunch: 'Brown rice & rajma curry', dinner: 'Grilled paneer with salad', calories: 1420 },
    { day: 'Thursday', breakfast: 'Whole wheat toast with avocado', lunch: 'Chicken breast with quinoa', dinner: 'Vegetable soup with multigrain bread', calories: 1350 },
    { day: 'Friday', breakfast: 'Idli with sambar', lunch: 'Fish curry with brown rice', dinner: 'Mixed vegetable stew', calories: 1400 },
    { day: 'Saturday', breakfast: 'Poha with peanuts & veggies', lunch: 'Sprout salad with paneer tikka', dinner: 'Dal khichdi with raita', calories: 1370 },
    { day: 'Sunday', breakfast: 'Moong dal chilla', lunch: 'Tandoori chicken with salad', dinner: 'Vegetable biryani (low oil)', calories: 1480 },
  ],
};
