/**
 * ============================================================================
 * BABY SCREEN - SOFT SKY BLUE EDITION THEME
 * ============================================================================
 *
 * Comprehensive data & color tokens for the Baby & Mother Care screen.
 * Covers diapers, feeding, bath & skin, toys, mother care, health,
 * brand spotlight, age-based shopping, expert tips, and more.
 *
 * ============================================================================
 */

export const BB_COLORS = {
  // Primary Soft Sky Blue
  skyBlue: '#42A5F5',
  skyBlueLight: '#64B5F6',
  skyBlueDark: '#1E88E5',
  skyBlueFaded: 'rgba(66, 165, 245, 0.08)',
  skyBlueSubtle: 'rgba(66, 165, 245, 0.15)',
  skyBlueGlow: 'rgba(66, 165, 245, 0.25)',

  // Candy Pink
  candyPink: '#F48FB1',
  candyPinkFaded: 'rgba(244, 143, 177, 0.10)',

  // Mint Green
  mintGreen: '#66BB6A',
  mintGreenFaded: 'rgba(102, 187, 106, 0.10)',

  // Sunshine Yellow
  sunshineYellow: '#FFD54F',
  sunshineYellowFaded: 'rgba(255, 213, 79, 0.10)',

  // Lavender Purple
  lavenderPurple: '#BA68C8',
  lavenderPurpleFaded: 'rgba(186, 104, 200, 0.10)',

  // Coral Orange
  coralOrange: '#FF8A65',
  coralOrangeFaded: 'rgba(255, 138, 101, 0.10)',

  // Soft Teal
  softTeal: '#4DB6AC',
  softTealFaded: 'rgba(77, 182, 172, 0.10)',

  // Warm Peach
  warmPeach: '#FFAB91',
  warmPeachFaded: 'rgba(255, 171, 145, 0.10)',

  // Gradients
  gradientSkyBlue: ['#42A5F5', '#64B5F6'],
  gradientCandyPink: ['#F48FB1', '#F8BBD0'],
  gradientMintGreen: ['#66BB6A', '#81C784'],
  gradientSunshine: ['#FFD54F', '#FFE082'],
  gradientLavender: ['#BA68C8', '#CE93D8'],
  gradientCoral: ['#FF8A65', '#FFAB91'],
  gradientSoftTeal: ['#4DB6AC', '#80CBC4'],
};

export const BB_DATA = {
  // ==========================================
  // MAIN CATEGORIES
  // ==========================================
  categories: [
    { id: 1, title: 'Diapers &\nWipes', icon: 'water', color: '#42A5F5', bgColor: 'rgba(66,165,245,0.10)', count: '500+' },
    { id: 2, title: 'Feeding\nEssentials', icon: 'cafe', color: '#FF8A65', bgColor: 'rgba(255,138,101,0.10)', count: '350+' },
    { id: 3, title: 'Bath &\nSkin Care', icon: 'water', color: '#F48FB1', bgColor: 'rgba(244,143,177,0.10)', count: '400+' },
    { id: 4, title: 'Baby\nFood', icon: 'nutrition', color: '#66BB6A', bgColor: 'rgba(102,187,106,0.10)', count: '250+' },
    { id: 5, title: 'Health &\nSafety', icon: 'shield-checkmark', color: '#4DB6AC', bgColor: 'rgba(77,182,172,0.10)', count: '180+' },
    { id: 6, title: 'Toys &\nGames', icon: 'happy', color: '#FFD54F', bgColor: 'rgba(255,213,79,0.10)', count: '600+' },
    { id: 7, title: 'Clothing &\nAccessories', icon: 'shirt', color: '#BA68C8', bgColor: 'rgba(186,104,200,0.10)', count: '450+' },
    { id: 8, title: 'Mother\nCare', icon: 'heart', color: '#EF5350', bgColor: 'rgba(239,83,80,0.10)', count: '300+' },
  ],

  // ==========================================
  // EVERYTHING YOUR LITTLE ONE NEEDS
  // ==========================================
  essentialNeeds: [
    { id: 1, title: 'Pampers Premium Care Pants L 44s', price: 899, oldPrice: 1199, discount: 25, rating: 4.8, brand: 'Pampers', category: 'Diapers', icon: 'water', color: '#42A5F5' },
    { id: 2, title: 'Huggies Wonder Pants M 50s', price: 649, oldPrice: 899, discount: 28, rating: 4.6, brand: 'Huggies', category: 'Diapers', icon: 'water', color: '#42A5F5' },
    { id: 3, title: 'Philips Avent Natural Bottle 260ml', price: 699, oldPrice: 899, discount: 22, rating: 4.7, brand: 'Philips', category: 'Feeding', icon: 'cafe', color: '#FF8A65' },
    { id: 4, title: 'Johnson\'s Baby Shampoo 500ml', price: 325, oldPrice: 450, discount: 28, rating: 4.9, brand: 'Johnson\'s', category: 'Bath', icon: 'water', color: '#F48FB1' },
    { id: 5, title: 'Cerelac Baby Food Stage 1 300g', price: 225, oldPrice: 310, discount: 27, rating: 4.5, brand: 'Nestle', category: 'Food', icon: 'nutrition', color: '#66BB6A' },
    { id: 6, title: 'Himalaya Baby Cream 200ml', price: 175, oldPrice: 235, discount: 26, rating: 4.6, brand: 'Himalaya', category: 'Skin', icon: 'flower', color: '#F48FB1' },
    { id: 7, title: 'Chicco Baby Nail Scissors', price: 399, oldPrice: 525, discount: 24, rating: 4.4, brand: 'Chicco', category: 'Safety', icon: 'shield', color: '#4DB6AC' },
    { id: 8, title: 'Mee Mee Soft Toy Bunny', price: 499, oldPrice: 699, discount: 29, rating: 4.3, brand: 'Mee Mee', category: 'Toys', icon: 'happy', color: '#FFD54F' },
    { id: 9, title: 'MamyPoko Pants Extra Absorb L 42s', price: 799, oldPrice: 1099, discount: 27, rating: 4.7, brand: 'MamyPoko', category: 'Diapers', icon: 'water', color: '#42A5F5' },
    { id: 10, title: 'Pigeon Silicone Pacifier M', price: 199, oldPrice: 275, discount: 28, rating: 4.5, brand: 'Pigeon', category: 'Feeding', icon: 'cafe', color: '#FF8A65' },
  ],

  // ==========================================
  // DIAPER BRANDS
  // ==========================================
  diaperBrands: [
    { id: 1, brand: 'Pampers', tagline: 'Premium softness for baby', products: 45, color: '#1976D2', popular: 'Premium Care', rating: 4.8, size: 'NB-XXL' },
    { id: 2, brand: 'Huggies', tagline: 'Hugs your baby gently', products: 38, color: '#FF7043', popular: 'Wonder Pants', rating: 4.6, size: 'S-XXL' },
    { id: 3, brand: 'MamyPoko', tagline: 'Extra absorb technology', products: 32, color: '#AB47BC', popular: 'Extra Absorb', rating: 4.7, size: 'NB-XXL' },
    { id: 4, brand: 'Himalaya', tagline: 'Herbal & gentle', products: 18, color: '#26A69A', popular: 'Total Care', rating: 4.5, size: 'S-XL' },
    { id: 5, brand: 'Bella Baby', tagline: 'European quality', products: 15, color: '#EF5350', popular: 'Happy Diapers', rating: 4.3, size: 'NB-L' },
    { id: 6, brand: 'Supples', tagline: 'Premium at best price', products: 12, color: '#66BB6A', popular: 'Comfy Pants', rating: 4.4, size: 'S-XL' },
  ],

  // ==========================================
  // FEEDING ESSENTIALS
  // ==========================================
  feedingProducts: [
    { id: 1, name: 'Philips Avent Natural Bottle 260ml Twin Pack', price: 1299, oldPrice: 1799, discount: 28, rating: 4.8, brand: 'Philips Avent' },
    { id: 2, name: 'Pigeon Wide Neck Bottle 240ml', price: 499, oldPrice: 699, discount: 29, rating: 4.6, brand: 'Pigeon' },
    { id: 3, name: 'Dr. Brown\'s Options+ Bottle 270ml', price: 799, oldPrice: 1099, discount: 27, rating: 4.7, brand: 'Dr. Brown\'s' },
    { id: 4, name: 'Mee Mee 2-in-1 Bottle 150ml', price: 349, oldPrice: 475, discount: 27, rating: 4.4, brand: 'Mee Mee' },
    { id: 5, name: 'Medela Calma Bottle 150ml', price: 1199, oldPrice: 1599, discount: 25, rating: 4.8, brand: 'Medela' },
    { id: 6, name: 'Chicco Natural Feeling 250ml', price: 599, oldPrice: 825, discount: 27, rating: 4.5, brand: 'Chicco' },
    { id: 7, name: 'NUK Nature Sense Bottle 260ml', price: 699, oldPrice: 950, discount: 26, rating: 4.6, brand: 'NUK' },
    { id: 8, name: 'Luvlap Wide Neck Bottle 250ml', price: 299, oldPrice: 425, discount: 30, rating: 4.3, brand: 'LuvLap' },
  ],

  // ==========================================
  // BATH & SKIN CARE
  // ==========================================
  bathProducts: [
    { id: 1, name: 'Johnson\'s Baby Shampoo 500ml', price: 325, oldPrice: 450, discount: 28, rating: 4.9, brand: 'Johnson\'s' },
    { id: 2, name: 'Himalaya Baby Gentle Wash 400ml', price: 245, oldPrice: 335, discount: 27, rating: 4.7, brand: 'Himalaya' },
    { id: 3, name: 'Chicco Baby Moments Body Lotion 500ml', price: 399, oldPrice: 550, discount: 27, rating: 4.5, brand: 'Chicco' },
    { id: 4, name: 'Sebamed Baby Wash 200ml', price: 499, oldPrice: 699, discount: 29, rating: 4.8, brand: 'Sebamed' },
    { id: 5, name: 'Mamaearth Gentle Cleansing Shampoo 200ml', price: 275, oldPrice: 399, discount: 31, rating: 4.6, brand: 'Mamaearth' },
    { id: 6, name: 'Aveeno Baby Daily Moisture Lotion 227ml', price: 599, oldPrice: 799, discount: 25, rating: 4.7, brand: 'Aveeno' },
    { id: 7, name: 'Pigeon Baby Milky Lotion 200ml', price: 325, oldPrice: 450, discount: 28, rating: 4.4, brand: 'Pigeon' },
    { id: 8, name: 'Cetaphil Baby Wash & Shampoo 230ml', price: 445, oldPrice: 599, discount: 26, rating: 4.8, brand: 'Cetaphil' },
  ],

  // ==========================================
  // BABY FOOD & NUTRITION
  // ==========================================
  babyFoodProducts: [
    { id: 1, name: 'Cerelac Baby Food Stage 1 Wheat 300g', price: 225, oldPrice: 310, discount: 27, rating: 4.5, brand: 'Nestle', age: '6+ months' },
    { id: 2, name: 'Cerelac Stage 2 Wheat Apple 300g', price: 235, oldPrice: 320, discount: 27, rating: 4.6, brand: 'Nestle', age: '8+ months' },
    { id: 3, name: 'Aptamil Gold+ Stage 1 400g', price: 699, oldPrice: 899, discount: 22, rating: 4.7, brand: 'Aptamil', age: '0-6 months' },
    { id: 4, name: 'Similac Advance Stage 1 400g', price: 599, oldPrice: 799, discount: 25, rating: 4.6, brand: 'Similac', age: '0-6 months' },
    { id: 5, name: 'Horlicks Junior 1-2-3 Vanilla 500g', price: 345, oldPrice: 475, discount: 27, rating: 4.4, brand: 'Horlicks', age: '1-3 years' },
    { id: 6, name: 'Enfamil A+ Stage 1 400g', price: 725, oldPrice: 950, discount: 24, rating: 4.7, brand: 'Enfamil', age: '0-6 months' },
    { id: 7, name: 'Pediasure Complete Vanilla 400g', price: 565, oldPrice: 750, discount: 25, rating: 4.5, brand: 'Pediasure', age: '2+ years' },
    { id: 8, name: 'Cerelac Multi Grain 5 Grain 300g', price: 245, oldPrice: 335, discount: 27, rating: 4.5, brand: 'Nestle', age: '12+ months' },
  ],

  // ==========================================
  // SHOP BY AGE
  // ==========================================
  shopByAge: [
    { id: 1, title: 'Newborn (0-3 months)', desc: 'Gentle products for the tiniest ones', icon: 'heart', color: '#F48FB1', products: 250, keyItems: ['Newborn Diapers', 'Soft Wipes', 'Swaddles', 'Mittens'] },
    { id: 2, title: 'Infant (3-6 months)', desc: 'Essential care for growing babies', icon: 'happy', color: '#42A5F5', products: 320, keyItems: ['Stage 1 Food', 'Bottles', 'Teethers', 'Rattles'] },
    { id: 3, title: 'Crawler (6-12 months)', desc: 'Products for adventurous explorers', icon: 'walk', color: '#66BB6A', products: 280, keyItems: ['Stage 2 Food', 'Sippy Cups', 'Safety Gates', 'Play Mats'] },
    { id: 4, title: 'Toddler (1-2 years)', desc: 'Growing up products for active toddlers', icon: 'bicycle', color: '#FF8A65', products: 350, keyItems: ['Toddler Food', 'Training Pants', 'Walking Shoes', 'Learning Toys'] },
    { id: 5, title: 'Pre-schooler (2-5 years)', desc: 'Learning & development essentials', icon: 'school', color: '#BA68C8', products: 400, keyItems: ['Educational Toys', 'Storybooks', 'Art Supplies', 'Big Kid Clothes'] },
  ],

  // ==========================================
  // BRAND SPOTLIGHT
  // ==========================================
  brandSpotlight: [
    { id: 1, name: 'Johnson\'s Baby', tagline: 'Gentle care since 1886', products: 85, color: '#E91E63', category: 'Bath & Skin', rating: 4.8 },
    { id: 2, name: 'Pampers', tagline: 'Love the change', products: 45, color: '#1976D2', category: 'Diapers', rating: 4.7 },
    { id: 3, name: 'Himalaya Baby', tagline: 'Herbal goodness', products: 60, color: '#009688', category: 'Natural Care', rating: 4.6 },
    { id: 4, name: 'Chicco', tagline: 'Where there\'s a baby', products: 120, color: '#FF7043', category: 'Everything Baby', rating: 4.7 },
    { id: 5, name: 'Philips Avent', tagline: 'Nurturing innovation', products: 50, color: '#0288D1', category: 'Feeding', rating: 4.8 },
    { id: 6, name: 'Mamaearth', tagline: 'Goodness inside', products: 40, color: '#66BB6A', category: 'Natural', rating: 4.5 },
    { id: 7, name: 'Pigeon', tagline: 'Only the best for baby', products: 75, color: '#AB47BC', category: 'Feeding & Care', rating: 4.6 },
    { id: 8, name: 'Mee Mee', tagline: 'From India with love', products: 95, color: '#FFB74D', category: 'Affordable Range', rating: 4.3 },
  ],

  // ==========================================
  // EXPERT TIPS
  // ==========================================
  expertTips: [
    { id: 1, title: 'Choosing the Right Diaper Size', desc: 'A guide to picking the perfect fit for your baby\'s comfort. Wrong size can cause leaks and rashes. Check weight ranges and look for snug fit around waist and thighs.', icon: 'water', color: '#42A5F5', readTime: '4 min' },
    { id: 2, title: 'Breastfeeding vs Formula', desc: 'Understanding the pros and cons of each feeding method. Both have their place in baby nutrition. Consult your pediatrician for personalized advice.', icon: 'cafe', color: '#FF8A65', readTime: '6 min' },
    { id: 3, title: 'Baby Skin Care Routine', desc: 'Step-by-step guide for maintaining your baby\'s delicate skin. Use fragrance-free products, moisturize after bath, and protect from sun exposure.', icon: 'flower', color: '#F48FB1', readTime: '5 min' },
    { id: 4, title: 'When to Start Solid Foods', desc: 'Signs your baby is ready for solids and the best foods to start with. Most babies are ready around 6 months. Start with single-grain cereals and pureed fruits.', icon: 'nutrition', color: '#66BB6A', readTime: '5 min' },
    { id: 5, title: 'Baby Sleep Training Tips', desc: 'Gentle methods to help your baby develop healthy sleep patterns. Establish bedtime routine, keep room dark and cool, and be consistent with schedules.', icon: 'moon', color: '#BA68C8', readTime: '7 min' },
    { id: 6, title: 'Vaccination Schedule Guide', desc: 'Complete immunization schedule from birth to 5 years. Keep records updated and never miss scheduled vaccinations. Ask your pediatrician about catch-up schedules.', icon: 'shield-checkmark', color: '#4DB6AC', readTime: '8 min' },
    { id: 7, title: 'Teething Relief Methods', desc: 'Natural and safe ways to soothe your teething baby. Cold teethers, gentle gum massage, and safe pain relief options recommended by pediatricians.', icon: 'happy', color: '#FFD54F', readTime: '4 min' },
    { id: 8, title: 'Baby-proofing Your Home', desc: 'Essential safety measures room by room. Cover outlets, secure furniture, install safety gates, remove choking hazards, and lock cabinets with harmful substances.', icon: 'home', color: '#EF5350', readTime: '6 min' },
  ],

  // ==========================================
  // MOTHER CARE PRODUCTS
  // ==========================================
  motherCareProducts: [
    { id: 1, name: 'Medela Swing Breast Pump', price: 4999, oldPrice: 6499, discount: 23, rating: 4.8, brand: 'Medela' },
    { id: 2, name: 'Bella Mama Stretch Mark Cream 100ml', price: 445, oldPrice: 599, discount: 26, rating: 4.5, brand: 'Bella' },
    { id: 3, name: 'Chicco Mammy Anti-Stretch Mark Cream', price: 799, oldPrice: 1099, discount: 27, rating: 4.6, brand: 'Chicco' },
    { id: 4, name: 'Pigeon Nursing Pads 36s', price: 349, oldPrice: 475, discount: 27, rating: 4.7, brand: 'Pigeon' },
    { id: 5, name: 'Himalaya Protective Sunscreen 100ml', price: 225, oldPrice: 310, discount: 27, rating: 4.4, brand: 'Himalaya' },
    { id: 6, name: 'Morph Maternity Feeding Pillow', price: 1599, oldPrice: 2199, discount: 27, rating: 4.6, brand: 'Morph' },
    { id: 7, name: 'PregnaCare New Mum 56 Tabs', price: 899, oldPrice: 1199, discount: 25, rating: 4.5, brand: 'PregnaCare' },
    { id: 8, name: 'Palmer\'s Cocoa Butter Tummy Butter', price: 599, oldPrice: 799, discount: 25, rating: 4.7, brand: 'Palmer\'s' },
  ],

  // ==========================================
  // HEALTH & SAFETY PRODUCTS
  // ==========================================
  healthSafetyProducts: [
    { id: 1, name: 'Omron Digital Thermometer MC-246', price: 299, oldPrice: 425, discount: 30, rating: 4.7, brand: 'Omron' },
    { id: 2, name: 'Vicks BabyRub Soothing Ointment 50ml', price: 145, oldPrice: 199, discount: 27, rating: 4.6, brand: 'Vicks' },
    { id: 3, name: 'Woodward\'s Gripe Water 130ml', price: 65, oldPrice: 90, discount: 28, rating: 4.5, brand: 'Woodward\'s' },
    { id: 4, name: 'Calpol Infant Drops 15ml', price: 85, oldPrice: 115, discount: 26, rating: 4.7, brand: 'Calpol' },
    { id: 5, name: 'Sebamed Baby Lip Balm SPF30', price: 399, oldPrice: 550, discount: 27, rating: 4.4, brand: 'Sebamed' },
    { id: 6, name: 'Chicco Safety Nail Clippers', price: 275, oldPrice: 375, discount: 27, rating: 4.5, brand: 'Chicco' },
    { id: 7, name: 'Pigeon Nasal Aspirator', price: 325, oldPrice: 450, discount: 28, rating: 4.6, brand: 'Pigeon' },
    { id: 8, name: 'Mee Mee Baby Mosquito Repellent', price: 199, oldPrice: 275, discount: 28, rating: 4.3, brand: 'Mee Mee' },
  ],

  // ==========================================
  // MILESTONES & DEVELOPMENT
  // ==========================================
  milestones: [
    { id: 1, month: '0-1 Month', title: 'Newborn Stage', milestones: ['Lifts head briefly', 'Responds to sounds', 'Grasps reflexively', 'Recognizes parent\'s voice'], icon: 'heart', color: '#F48FB1' },
    { id: 2, month: '2-3 Months', title: 'Social Smiling', milestones: ['First social smile', 'Coos and gurgles', 'Follows objects', 'Holds head steady'], icon: 'happy', color: '#42A5F5' },
    { id: 3, month: '4-6 Months', title: 'Rolling Over', milestones: ['Rolls both ways', 'Sits with support', 'Reaches for objects', 'Babbles consonants'], icon: 'body', color: '#66BB6A' },
    { id: 4, month: '7-9 Months', title: 'Crawling Stage', milestones: ['Crawls forward', 'Pulls to stand', 'Responds to name', 'Object permanence'], icon: 'walk', color: '#FF8A65' },
    { id: 5, month: '10-12 Months', title: 'First Steps', milestones: ['Stands alone', 'First words', 'Pincer grasp', 'Waves bye-bye'], icon: 'walk', color: '#BA68C8' },
    { id: 6, month: '1-2 Years', title: 'Walking & Talking', milestones: ['Walks independently', '50+ words', 'Follows instructions', 'Parallel play'], icon: 'bicycle', color: '#4DB6AC' },
  ],

  // ==========================================
  // TOYS & DEVELOPMENT
  // ==========================================
  toyCategories: [
    { id: 1, title: 'Soft Toys', desc: 'Cuddly companions for your little one', icon: 'heart', color: '#F48FB1', priceRange: '₹199-₹1999' },
    { id: 2, title: 'Musical Toys', desc: 'Stimulate hearing and rhythm', icon: 'musical-notes', color: '#FFD54F', priceRange: '₹299-₹2499' },
    { id: 3, title: 'Building Blocks', desc: 'Develop motor skills and creativity', icon: 'cube', color: '#42A5F5', priceRange: '₹199-₹1499' },
    { id: 4, title: 'Educational Toys', desc: 'Learn while playing', icon: 'school', color: '#66BB6A', priceRange: '₹249-₹2999' },
    { id: 5, title: 'Teethers & Rattles', desc: 'Safe for chewing and shaking', icon: 'happy', color: '#FF8A65', priceRange: '₹99-₹699' },
    { id: 6, title: 'Activity Gyms', desc: 'Full body play and exploration', icon: 'fitness', color: '#BA68C8', priceRange: '₹999-₹4999' },
  ],

  // ==========================================
  // VACCINATION SCHEDULE
  // ==========================================
  vaccinationSchedule: [
    { id: 1, age: 'Birth', vaccines: ['BCG', 'OPV-0', 'Hep B-1'], color: '#F48FB1' },
    { id: 2, age: '6 Weeks', vaccines: ['DTwP/DTaP-1', 'IPV-1', 'Hep B-2', 'Hib-1', 'RV-1', 'PCV-1'], color: '#42A5F5' },
    { id: 3, age: '10 Weeks', vaccines: ['DTwP/DTaP-2', 'IPV-2', 'Hib-2', 'RV-2', 'PCV-2'], color: '#66BB6A' },
    { id: 4, age: '14 Weeks', vaccines: ['DTwP/DTaP-3', 'IPV-3', 'Hib-3', 'RV-3', 'PCV-3'], color: '#FF8A65' },
    { id: 5, age: '6 Months', vaccines: ['Hep B-3', 'OPV-1', 'Influenza-1'], color: '#BA68C8' },
    { id: 6, age: '9 Months', vaccines: ['MMR-1', 'MCV-1'], color: '#4DB6AC' },
    { id: 7, age: '12 Months', vaccines: ['Hep A-1', 'PCV Booster'], color: '#FFD54F' },
    { id: 8, age: '15-18 Months', vaccines: ['MMR-2', 'Varicella-1', 'DTwP/DTaP B1', 'Hib B1', 'IPV B1'], color: '#EF5350' },
  ],

  // ==========================================
  // NURSERY ESSENTIALS
  // ==========================================
  nurseryEssentials: [
    { id: 1, title: 'Baby Crib', desc: 'Safe and comfortable sleeping space', icon: 'bed', color: '#42A5F5', priceRange: '₹3,999-₹15,999' },
    { id: 2, title: 'Baby Monitor', desc: 'Keep watch while baby sleeps', icon: 'videocam', color: '#66BB6A', priceRange: '₹2,499-₹8,999' },
    { id: 3, title: 'Changing Table', desc: 'Convenient diaper changing station', icon: 'apps', color: '#F48FB1', priceRange: '₹1,999-₹7,999' },
    { id: 4, title: 'Night Light', desc: 'Soft glow for nighttime feedings', icon: 'moon', color: '#FFD54F', priceRange: '₹299-₹1,499' },
    { id: 5, title: 'Stroller', desc: 'Comfortable travel for baby', icon: 'walk', color: '#FF8A65', priceRange: '₹4,999-₹25,999' },
    { id: 6, title: 'Car Seat', desc: 'Safe travel on the road', icon: 'car', color: '#4DB6AC', priceRange: '₹5,999-₹20,999' },
  ],

  // ==========================================
  // FAQ DATA
  // ==========================================
  faqData: [
    { id: 1, question: 'What size diaper should I buy for my newborn?', answer: 'Most newborns start with Size NB (Newborn) or Size 1. NB fits babies up to 5kg, while Size 1 fits 4-8kg. Check the weight range on the pack and ensure a snug fit around waist and thighs without red marks.' },
    { id: 2, question: 'When should I start solid foods?', answer: 'Most pediatricians recommend starting solids around 6 months. Signs of readiness include sitting with support, showing interest in food, loss of tongue-thrust reflex, and good head control. Start with single-grain cereals or pureed vegetables.' },
    { id: 3, question: 'How often should I bathe my newborn?', answer: 'Newborns only need a bath 2-3 times per week. Too frequent bathing can dry out their delicate skin. Use lukewarm water and gentle, fragrance-free products. Sponge baths are recommended until the umbilical cord stump falls off.' },
    { id: 4, question: 'What baby products are safe for sensitive skin?', answer: 'Look for products that are hypoallergenic, fragrance-free, and dermatologist-tested. Brands like Sebamed, Cetaphil Baby, and Himalaya Baby are known for gentle formulations. Always do a patch test before using new products.' },
    { id: 5, question: 'How to choose the right baby bottle?', answer: 'Consider your baby\'s age and feeding style. Anti-colic bottles (like Dr. Brown\'s) reduce gas, wide-neck bottles mimic breastfeeding, and small bottles (125ml) suit newborns while larger ones (260ml) suit older babies. BPA-free is essential.' },
    { id: 6, question: 'What are the essential items for a newborn?', answer: 'Must-haves include: diapers, wipes, onesies, swaddles, feeding supplies (bottles or nursing accessories), a car seat, gentle wash and lotion, a safe sleep space, and a thermometer. Stock up on sizes NB and 0-3 months.' },
  ],
};
