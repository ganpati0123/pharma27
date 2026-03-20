/**
 * ============================================================================
 * NUTRITION SCREEN - VITALITY GREEN EDITION THEME
 * ============================================================================
 */

export const NT_COLORS = {
  // Primary Vitality Green
  vitalityGreen: '#4CAF50',
  vitalityGreenLight: '#66BB6A',
  vitalityGreenDark: '#388E3C',
  vitalityGreenFaded: 'rgba(76, 175, 80, 0.08)',
  vitalityGreenSubtle: 'rgba(76, 175, 80, 0.15)',
  vitalityGreenGlow: 'rgba(76, 175, 80, 0.25)',

  // Sunshine Orange
  sunshineOrange: '#FF9800',
  sunshineOrangeFaded: 'rgba(255, 152, 0, 0.10)',

  // Berry Purple
  berryPurple: '#9C27B0',
  berryPurpleFaded: 'rgba(156, 39, 176, 0.10)',

  // Ocean Blue
  oceanBlue: '#2196F3',
  oceanBlueFaded: 'rgba(33, 150, 243, 0.10)',

  // Protein Red
  proteinRed: '#F44336',
  proteinRedFaded: 'rgba(244, 67, 54, 0.10)',

  // Golden Yellow
  goldenYellow: '#FFC107',
  goldenYellowFaded: 'rgba(255, 193, 7, 0.10)',

  // Teal
  teal: '#009688',
  tealFaded: 'rgba(0, 150, 136, 0.10)',

  // Gradients
  gradientVitality: ['#4CAF50', '#66BB6A'],
  gradientSunshine: ['#FF9800', '#FFB74D'],
  gradientBerry: ['#9C27B0', '#BA68C8'],
  gradientOcean: ['#2196F3', '#64B5F6'],
  gradientProtein: ['#F44336', '#EF5350'],
  gradientGolden: ['#FFC107', '#FFD54F'],
};

export const NT_DATA = {
  dailyNutritionGoals: [
    { id: 1, title: 'Calories', current: 1450, target: 2000, unit: 'kcal', icon: 'flame', color: '#FF9800' },
    { id: 2, title: 'Protein', current: 55, target: 75, unit: 'g', icon: 'barbell', color: '#F44336' },
    { id: 3, title: 'Carbs', current: 180, target: 250, unit: 'g', icon: 'nutrition', color: '#4CAF50' },
    { id: 4, title: 'Fat', current: 45, target: 65, unit: 'g', icon: 'water', color: '#2196F3' },
    { id: 5, title: 'Fiber', current: 18, target: 30, unit: 'g', icon: 'leaf', color: '#009688' },
    { id: 6, title: 'Water', current: 5, target: 8, unit: 'glasses', icon: 'water', color: '#00BCD4' },
  ],

  vitaminCategories: [
    { id: 1, title: 'Vitamin A', desc: 'Eye health & immunity', icon: 'eye', color: '#FF9800', sources: 'Carrots, Sweet Potato, Spinach' },
    { id: 2, title: 'Vitamin B12', desc: 'Energy & nerve function', icon: 'flash', color: '#F44336', sources: 'Eggs, Milk, Fish, Fortified cereals' },
    { id: 3, title: 'Vitamin C', desc: 'Immunity & skin health', icon: 'shield-checkmark', color: '#FFC107', sources: 'Citrus fruits, Bell peppers, Broccoli' },
    { id: 4, title: 'Vitamin D', desc: 'Bone & immune health', icon: 'sunny', color: '#FF5722', sources: 'Sunlight, Fatty fish, Fortified milk' },
    { id: 5, title: 'Vitamin E', desc: 'Antioxidant protection', icon: 'leaf', color: '#4CAF50', sources: 'Nuts, Seeds, Olive oil, Avocado' },
    { id: 6, title: 'Vitamin K', desc: 'Blood clotting & bones', icon: 'medkit', color: '#009688', sources: 'Leafy greens, Broccoli, Sprouts' },
    { id: 7, title: 'Iron', desc: 'Oxygen transport in blood', icon: 'fitness', color: '#F44336', sources: 'Spinach, Lentils, Red meat, Tofu' },
    { id: 8, title: 'Calcium', desc: 'Strong bones & teeth', icon: 'body', color: '#2196F3', sources: 'Milk, Yogurt, Cheese, Almonds' },
    { id: 9, title: 'Zinc', desc: 'Immune function & healing', icon: 'shield', color: '#9C27B0', sources: 'Pumpkin seeds, Chickpeas, Cashews' },
    { id: 10, title: 'Omega-3', desc: 'Heart & brain health', icon: 'heart', color: '#E91E63', sources: 'Salmon, Walnuts, Chia seeds, Flax' },
  ],

  proteinProducts: [
    { id: 1, name: 'MuscleBlaze Raw Whey Protein 1kg', price: 1299, oldPrice: 1999, discount: 35, rating: 4.5, brand: 'MuscleBlaze' },
    { id: 2, name: 'Optimum Nutrition Gold Standard 2lb', price: 2999, oldPrice: 4499, discount: 33, rating: 4.8, brand: 'ON' },
    { id: 3, name: 'Oziva Plant Protein 1kg', price: 1599, oldPrice: 2199, discount: 27, rating: 4.3, brand: 'Oziva' },
    { id: 4, name: 'MyProtein Impact Whey 1kg', price: 1799, oldPrice: 2599, discount: 31, rating: 4.6, brand: 'MyProtein' },
    { id: 5, name: 'Amway Nutrilite Protein 500g', price: 1899, oldPrice: 2499, discount: 24, rating: 4.4, brand: 'Amway' },
    { id: 6, name: 'GNC Pro Performance 2lb', price: 2499, oldPrice: 3499, discount: 29, rating: 4.5, brand: 'GNC' },
    { id: 7, name: 'HealthKart HK Vitals Protein 1kg', price: 999, oldPrice: 1499, discount: 33, rating: 4.2, brand: 'HealthKart' },
    { id: 8, name: 'Boldfit Plant Protein 1kg', price: 1099, oldPrice: 1699, discount: 35, rating: 4.1, brand: 'Boldfit' },
  ],

  ayurvedicProducts: [
    { id: 1, name: 'Ashwagandha Extract 500mg', price: 299, oldPrice: 449, discount: 33, rating: 4.6 },
    { id: 2, name: 'Chyawanprash 500g', price: 199, oldPrice: 275, discount: 28, rating: 4.7 },
    { id: 3, name: 'Triphala Tablets 60s', price: 149, oldPrice: 225, discount: 34, rating: 4.4 },
    { id: 4, name: 'Giloy Juice 500ml', price: 175, oldPrice: 250, discount: 30, rating: 4.3 },
    { id: 5, name: 'Brahmi Capsules 60s', price: 245, oldPrice: 350, discount: 30, rating: 4.5 },
    { id: 6, name: 'Shilajit Resin 20g', price: 599, oldPrice: 899, discount: 33, rating: 4.7 },
    { id: 7, name: 'Moringa Powder 200g', price: 199, oldPrice: 299, discount: 33, rating: 4.2 },
    { id: 8, name: 'Amla Juice 500ml', price: 125, oldPrice: 175, discount: 29, rating: 4.4 },
  ],

  superfoods: [
    { id: 1, title: 'Chia Seeds', desc: 'Rich in omega-3, fiber & protein. Great for smoothies and puddings', icon: 'leaf', color: '#4CAF50', calories: '486 cal/100g' },
    { id: 2, title: 'Quinoa', desc: 'Complete protein source with all 9 essential amino acids', icon: 'nutrition', color: '#FF9800', calories: '368 cal/100g' },
    { id: 3, title: 'Blueberries', desc: 'Packed with antioxidants, vitamins C & K, and manganese', icon: 'ellipse', color: '#9C27B0', calories: '57 cal/100g' },
    { id: 4, title: 'Kale', desc: 'Nutrient-dense leafy green loaded with vitamins A, C & K', icon: 'leaf', color: '#388E3C', calories: '35 cal/100g' },
    { id: 5, title: 'Turmeric', desc: 'Powerful anti-inflammatory with curcumin for joint health', icon: 'flame', color: '#FFC107', calories: '312 cal/100g' },
    { id: 6, title: 'Almonds', desc: 'Heart-healthy nuts rich in vitamin E, magnesium & fiber', icon: 'nutrition', color: '#795548', calories: '579 cal/100g' },
    { id: 7, title: 'Avocado', desc: 'Healthy monounsaturated fats with potassium & fiber', icon: 'leaf', color: '#66BB6A', calories: '160 cal/100g' },
    { id: 8, title: 'Sweet Potato', desc: 'Complex carbs with beta-carotene, vitamin A & fiber', icon: 'nutrition', color: '#FF5722', calories: '86 cal/100g' },
  ],

  dietTypes: [
    { id: 1, title: 'Keto Diet', desc: 'High fat, very low carb for ketosis', icon: 'flame', color: '#FF9800', macros: 'Fat: 70%, Protein: 25%, Carbs: 5%' },
    { id: 2, title: 'Vegan', desc: 'Plant-based nutrition for wellness', icon: 'leaf', color: '#4CAF50', macros: 'Carbs: 55%, Protein: 20%, Fat: 25%' },
    { id: 3, title: 'Paleo', desc: 'Whole foods like our ancestors ate', icon: 'body', color: '#795548', macros: 'Protein: 30%, Fat: 40%, Carbs: 30%' },
    { id: 4, title: 'Mediterranean', desc: 'Heart-healthy olive oil & fish based', icon: 'heart', color: '#2196F3', macros: 'Carbs: 50%, Fat: 35%, Protein: 15%' },
    { id: 5, title: 'Intermittent\nFasting', desc: 'Time-restricted eating pattern', icon: 'time', color: '#9C27B0', macros: 'Flexible macros, time-based' },
    { id: 6, title: 'DASH Diet', desc: 'Dietary approach to stop hypertension', icon: 'heart', color: '#F44336', macros: 'Carbs: 55%, Protein: 18%, Fat: 27%' },
  ],

  mealPlannerData: [
    { id: 1, time: 'Early Morning', meal: 'Warm lemon water + 5 soaked almonds', calories: 65, icon: 'sunny', color: '#FFC107' },
    { id: 2, time: 'Breakfast', meal: 'Oats porridge with berries & chia seeds', calories: 350, icon: 'cafe', color: '#FF9800' },
    { id: 3, time: 'Mid-Morning', meal: 'Green smoothie with spinach & banana', calories: 180, icon: 'leaf', color: '#4CAF50' },
    { id: 4, time: 'Lunch', meal: 'Brown rice + dal + sabzi + salad + curd', calories: 550, icon: 'restaurant', color: '#2196F3' },
    { id: 5, time: 'Evening Snack', meal: 'Roasted makhana + green tea', calories: 120, icon: 'cafe', color: '#009688' },
    { id: 6, time: 'Dinner', meal: 'Multigrain roti + paneer sabzi + soup', calories: 450, icon: 'moon', color: '#9C27B0' },
    { id: 7, time: 'Before Bed', meal: 'Warm turmeric milk', calories: 85, icon: 'moon', color: '#795548' },
  ],

  nutritionForAges: [
    { id: 1, title: 'Children (2-12)', desc: 'Growth essentials, calcium, vitamin D, protein-rich foods', icon: 'happy', color: '#FF9800', keyNutrients: ['Calcium', 'Vitamin D', 'Iron', 'Protein'] },
    { id: 2, title: 'Teens (13-19)', desc: 'Bone development, energy for growth, iron for girls', icon: 'person', color: '#2196F3', keyNutrients: ['Iron', 'Calcium', 'Zinc', 'B Vitamins'] },
    { id: 3, title: 'Adults (20-40)', desc: 'Balanced macros, antioxidants, stress management nutrients', icon: 'body', color: '#4CAF50', keyNutrients: ['Omega-3', 'Vitamin B12', 'Magnesium', 'Folate'] },
    { id: 4, title: 'Middle Age (40-60)', desc: 'Heart health, bone density, metabolic support', icon: 'heart', color: '#F44336', keyNutrients: ['CoQ10', 'Vitamin D', 'Calcium', 'Fiber'] },
    { id: 5, title: 'Seniors (60+)', desc: 'Joint health, cognitive function, immune support', icon: 'medical', color: '#9C27B0', keyNutrients: ['Vitamin B12', 'Vitamin D', 'Calcium', 'Omega-3'] },
  ],

  brandSpotlight: [
    { id: 1, name: 'MuscleBlaze', tagline: 'Fuel Your Ambition', products: 120, color: '#F44336', category: 'Protein' },
    { id: 2, name: 'Oziva', tagline: 'Clean & Plant Based', products: 85, color: '#4CAF50', category: 'Plant Nutrition' },
    { id: 3, name: 'HealthKart', tagline: 'Your Health Partner', products: 200, color: '#2196F3', category: 'Supplements' },
    { id: 4, name: 'Himalaya', tagline: 'Nature\'s Way', products: 150, color: '#009688', category: 'Ayurvedic' },
    { id: 5, name: 'Amway Nutrilite', tagline: 'Best of Nature', products: 95, color: '#FF9800', category: 'Multivitamins' },
    { id: 6, name: 'GNC', tagline: 'Live Well', products: 110, color: '#9C27B0', category: 'Sports Nutrition' },
  ],

  expertAdvice: [
    { id: 1, title: 'How much protein do you really need?', desc: 'A registered dietitian explains the optimal protein intake for your body type and activity level', expert: 'Dr. Neha Sharma, RD', readTime: '5 min', icon: 'barbell', color: '#F44336' },
    { id: 2, title: 'The truth about detox diets', desc: 'Separating fact from fiction about popular detox and cleanse programs', expert: 'Dr. Amit Patel, MD', readTime: '7 min', icon: 'leaf', color: '#4CAF50' },
    { id: 3, title: 'Gut health and nutrition connection', desc: 'How your diet directly impacts your gut microbiome and overall health', expert: 'Dr. Priya Reddy, GI', readTime: '6 min', icon: 'nutrition', color: '#FF9800' },
    { id: 4, title: 'Supplements you actually need', desc: 'Which supplements are worth taking and which are just marketing hype', expert: 'Dr. Vikram Das, MD', readTime: '8 min', icon: 'medical', color: '#2196F3' },
    { id: 5, title: 'Indian superfoods for daily diet', desc: 'Traditional Indian ingredients that are nutritional powerhouses', expert: 'Dr. Kavitha Iyer, RD', readTime: '5 min', icon: 'star', color: '#9C27B0' },
    { id: 6, title: 'Meal timing and metabolism', desc: 'Does when you eat matter as much as what you eat?', expert: 'Dr. Sanjay Kumar, MD', readTime: '6 min', icon: 'time', color: '#009688' },
  ],

  recipes: [
    { id: 1, title: 'Protein Smoothie Bowl', time: '10 min', calories: 350, difficulty: 'Easy', icon: 'cafe', color: '#F44336', ingredients: 'Banana, Greek Yogurt, Berries, Granola, Chia Seeds' },
    { id: 2, title: 'Quinoa Salad Bowl', time: '15 min', calories: 420, difficulty: 'Easy', icon: 'leaf', color: '#4CAF50', ingredients: 'Quinoa, Chickpeas, Cucumber, Tomato, Feta' },
    { id: 3, title: 'Grilled Paneer Tikka', time: '25 min', calories: 380, difficulty: 'Medium', icon: 'flame', color: '#FF9800', ingredients: 'Paneer, Yogurt, Spices, Bell Peppers, Onion' },
    { id: 4, title: 'Oats Khichdi', time: '20 min', calories: 290, difficulty: 'Easy', icon: 'nutrition', color: '#009688', ingredients: 'Oats, Moong Dal, Vegetables, Ghee, Cumin' },
    { id: 5, title: 'Sprout Chaat', time: '10 min', calories: 180, difficulty: 'Easy', icon: 'leaf', color: '#66BB6A', ingredients: 'Mixed Sprouts, Onion, Tomato, Lemon, Chaat Masala' },
    { id: 6, title: 'Ragi Dosa', time: '30 min', calories: 220, difficulty: 'Medium', icon: 'nutrition', color: '#795548', ingredients: 'Ragi Flour, Rice Flour, Urad Dal, Cumin, Coconut' },
    { id: 7, title: 'Avocado Toast', time: '5 min', calories: 310, difficulty: 'Easy', icon: 'cafe', color: '#4CAF50', ingredients: 'Whole Wheat Bread, Avocado, Eggs, Cherry Tomatoes' },
    { id: 8, title: 'Dal Palak', time: '35 min', calories: 260, difficulty: 'Easy', icon: 'leaf', color: '#388E3C', ingredients: 'Moong Dal, Spinach, Garlic, Cumin, Turmeric' },
  ],

  subscriptionPlans: [
    { id: 1, title: 'Basic', price: 299, duration: 'month', features: ['Personalized meal plans', 'Calorie tracking', 'Basic recipes'], color: '#4CAF50', popular: false },
    { id: 2, title: 'Pro', price: 599, duration: 'month', features: ['Everything in Basic', 'Expert consultations', 'Advanced analytics', 'Supplement guidance'], color: '#2196F3', popular: true },
    { id: 3, title: 'Premium', price: 999, duration: 'month', features: ['Everything in Pro', '1-on-1 dietitian', 'Custom workout plans', 'Weekly check-ins', 'Priority support'], color: '#9C27B0', popular: false },
  ],

  calorieTracker: [
    { id: 1, meal: 'Breakfast', foods: ['2 Idli + Sambar', 'Green Tea'], totalCal: 280, time: '8:00 AM' },
    { id: 2, meal: 'Snack', foods: ['1 Apple', '10 Almonds'], totalCal: 165, time: '11:00 AM' },
    { id: 3, meal: 'Lunch', foods: ['Brown Rice', 'Dal Fry', 'Sabzi', 'Curd'], totalCal: 520, time: '1:00 PM' },
    { id: 4, meal: 'Snack', foods: ['Makhana 30g', 'Green Tea'], totalCal: 110, time: '4:30 PM' },
    { id: 5, meal: 'Dinner', foods: ['2 Multigrain Roti', 'Paneer Sabzi'], totalCal: 420, time: '8:00 PM' },
  ],
};
