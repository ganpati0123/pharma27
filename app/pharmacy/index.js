/**
 * APOLLO 24|7 PHARMACY TAB - ULTRA PREMIUM
 * India's Most Trusted Pharmacy with smooth animations and premium UI.
 */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, withSequence, withRepeat, interpolate, Easing, Extrapolation, FadeIn, FadeInDown, FadeInRight, FadeInUp, SlideInRight, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const COLORS = {
  primary: '#0F847E', primaryDark: '#0A6B66', primaryLight: '#E8F5F4',
  accent: '#FF6B35', accentLight: '#FFF3ED', gold: '#D4A843', goldLight: '#FFF8E7',
  white: '#FFFFFF', background: '#F5F7FA', backgroundSoft: '#FAFBFC', cardWhite: '#FFFFFF',
  textPrimary: '#1A1D29', textSecondary: '#4A5568', textTertiary: '#8892A5', textLight: '#B8C1D1',
  border: '#E8ECF1', borderLight: '#F0F3F7',
  success: '#22C55E', successLight: '#ECFDF5', warning: '#F59E0B', warningLight: '#FFFBEB',
  error: '#EF4444', errorLight: '#FEF2F2',
  purple: '#8B5CF6', purpleLight: '#F3EEFF', blue: '#3B82F6', blueLight: '#EFF6FF',
  teal: '#14B8A6', tealLight: '#F0FDFA', orange: '#F97316', orangeLight: '#FFF7ED',
  pink: '#EC4899', pinkLight: '#FDF2F8', shadow: 'rgba(0,0,0,0.08)', overlay: 'rgba(0,0,0,0.5)',
};
const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
const RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, full: 999 };

// ============================================================================
// DATA
// ============================================================================
const PROMO_BANNERS = [
  { id: '1', title: 'Assured Promotions', subtitle: 'Flat Discounts on Health Products', discount: '20% OFF', color: '#E8F5E9', icon: 'gift-outline' },
  { id: '2', title: 'First Order Offer', subtitle: 'Get extra savings on first order', discount: '15% OFF', color: '#E3F2FD', icon: 'star-outline' },
  { id: '3', title: 'Medicine Essentials', subtitle: 'Stock up on daily health needs', discount: '25% OFF', color: '#FFF3E0', icon: 'medical-outline' },
];
const WELLBEING_CATEGORIES = [
  { id: 'personal', label: 'Personal care', icon: 'person-outline', color: '#E8F5E9' },
  { id: 'nutrition', label: 'Nutrition', icon: 'nutrition-outline', color: '#FFF3E0' },
  { id: 'baby', label: 'Baby Care', icon: 'heart-outline', color: '#FCE4EC' },
  { id: 'sexual', label: 'Sexual Wellness', icon: 'shield-outline', color: '#E8EAF6' },
  { id: 'gifts', label: 'Gifts', icon: 'gift-outline', color: '#F3E5F5' },
];
const BUY_AGAIN_ITEMS = [
  { id: '1', name: 'Dolo 650mg', subtitle: 'Strip of 15 Tablets', price: 32.40, mrp: 36.00, delivery: 'By 11:30 PM', icon: 'medical', rating: 4.8, reviews: 12400 },
  { id: '2', name: 'Crocin Advance', subtitle: 'Strip of 20 Tabs', price: 28.60, mrp: 34.00, delivery: 'By 11:30 PM', icon: 'fitness', rating: 4.7, reviews: 8900 },
  { id: '3', name: 'Shelcal 500mg', subtitle: '15 Tablets', price: 114.80, mrp: 135.00, delivery: 'By Tomorrow', icon: 'leaf', rating: 4.5, reviews: 5600 },
  { id: '4', name: 'Pan 40mg', subtitle: 'Strip of 15', price: 78.50, mrp: 92.00, delivery: 'By 11:30 PM', icon: 'flask', rating: 4.6, reviews: 7800 },
  { id: '5', name: 'Vitamin D3', subtitle: '60 Capsules', price: 245.00, mrp: 320.00, delivery: 'By Tomorrow', icon: 'sunny', rating: 4.9, reviews: 15000 },
];
const GOODNESS_PLATE = [
  { id: '1', name: 'Saffola Fittify Hi-Protein Slim Meal Shake', price: 799, mrp: 999, icon: 'cafe-outline', color: '#FFF8E1' },
  { id: '2', name: 'Yoga Bar Muesli Fruits + Nuts', price: 349, mrp: 449, icon: 'leaf-outline', color: '#E8F5E9' },
  { id: '3', name: 'Green Velly Chia Seeds', price: 299, mrp: 499, icon: 'nutrition-outline', color: '#F1F8E9' },
  { id: '4', name: 'True Elements Granola', price: 449, mrp: 599, icon: 'restaurant-outline', color: '#FBE9E7' },
  { id: '5', name: 'Organic India Tulsi Green Tea', price: 199, mrp: 250, icon: 'water-outline', color: '#E0F2F1' },
];
const FLASH_DEALS = [
  { id: '1', name: 'Himalaya Wellness Pure Herbs', price: 199, mrp: 350, discount: '43% OFF', icon: 'leaf', color: '#E8F5E9' },
  { id: '2', name: 'Ensure Diabetes Care Powder', price: 699, mrp: 920, discount: '24% OFF', icon: 'fitness', color: '#E3F2FD' },
  { id: '3', name: 'Protinex Health Drink', price: 449, mrp: 625, discount: '28% OFF', icon: 'barbell', color: '#FFF3E0' },
  { id: '4', name: 'Volini Pain Relief Spray', price: 179, mrp: 250, discount: '28% OFF', icon: 'medkit', color: '#FCE4EC' },
];
const HEALTH_CONCERNS = [
  { id: '1', name: 'Diabetes', icon: 'water-outline', color: '#E3F2FD', bgColor: '#1565C0' },
  { id: '2', name: 'Acidity', icon: 'flame-outline', color: '#FFF3E0', bgColor: '#EF6C00' },
  { id: '3', name: 'Joint Pain', icon: 'body-outline', color: '#F3E5F5', bgColor: '#7B1FA2' },
  { id: '4', name: 'Cold & Flu', icon: 'snow-outline', color: '#E1F5FE', bgColor: '#0288D1' },
  { id: '5', name: 'Digestion', icon: 'restaurant-outline', color: '#E8F5E9', bgColor: '#2E7D32' },
  { id: '6', name: 'Immunity', icon: 'shield-outline', color: '#FFF8E1', bgColor: '#F9A825' },
  { id: '7', name: 'Heart Care', icon: 'heart-outline', color: '#FCE4EC', bgColor: '#C62828' },
  { id: '8', name: 'Skin Care', icon: 'flower-outline', color: '#F3E5F5', bgColor: '#6A1B9A' },
];
const STORE_CATEGORIES = [
  { id: '1', name: 'Tata One Sourena', subtitle: 'Premium Healthcare', icon: 'storefront-outline', color: '#E8F5E9', tagColor: '#2E7D32' },
  { id: '2', name: 'Apollo Life', subtitle: 'Trusted by Millions', icon: 'medical-outline', color: '#E3F2FD', tagColor: '#1565C0' },
  { id: '3', name: 'Wellness Forever', subtitle: 'Your Health Partner', icon: 'heart-outline', color: '#FFF3E0', tagColor: '#EF6C00' },
  { id: '4', name: 'Pharmeasy Select', subtitle: 'Curated for You', icon: 'star-outline', color: '#F3E5F5', tagColor: '#7B1FA2' },
];
const APOLLO_BEST = [
  { id: '1', name: 'My Medicines', subtitle: 'KNOW MORE', icon: 'medical-outline', color: '#0F847E' },
  { id: '2', name: 'My Membership', subtitle: 'BENEFITS', icon: 'diamond-outline', color: '#D4A843' },
  { id: '3', name: 'Ask Apollo', subtitle: 'ASSISTANT', icon: 'chatbubble-outline', color: '#3B82F6' },
  { id: '4', name: 'Health Records', subtitle: 'CHECK NOW', icon: 'document-text-outline', color: '#8B5CF6' },
];
const LAB_TESTS = [
  { id: '1', name: 'Apollo Total Vitaminogram', subtitle: '120+ tests', price: 2499, mrp: 5999, discount: '58% OFF', icon: 'flask-outline' },
  { id: '2', name: 'Complete Blood Count', subtitle: '24+ parameters', price: 399, mrp: 800, discount: '50% OFF', icon: 'water-outline' },
  { id: '3', name: 'Thyroid Profile', subtitle: 'T3, T4, TSH', price: 599, mrp: 1200, discount: '50% OFF', icon: 'fitness-outline' },
];
const SKINCARE_PRODUCTS = [
  { id: '1', name: 'Cetaphil Gentle Skin Cleanser', price: 399, mrp: 549, rating: 4.7, icon: 'water-outline', badge: 'BESTSELLER' },
  { id: '2', name: 'Neutrogena Sunscreen SPF 50+', price: 499, mrp: 699, rating: 4.5, icon: 'sunny-outline', badge: 'TRENDING' },
  { id: '3', name: 'La Roche-Posay Effaclar Duo', price: 1299, mrp: 1599, rating: 4.8, icon: 'sparkles-outline', badge: 'PREMIUM' },
  { id: '4', name: 'Bioderma Sensibio Micellar', price: 899, mrp: 1150, rating: 4.6, icon: 'flower-outline', badge: 'FEATURED' },
  { id: '5', name: 'CeraVe Moisturizing Cream', price: 599, mrp: 799, rating: 4.9, icon: 'heart-outline', badge: 'TOP RATED' },
];
const SKINCARE_50 = [
  { id: '1', name: 'Minimalist Salicylic Acid 2%', price: 349, mrp: 599, discount: '42% OFF', icon: 'flask-outline' },
  { id: '2', name: 'The Derma Co AHA BHA', price: 399, mrp: 699, discount: '43% OFF', icon: 'beaker-outline' },
  { id: '3', name: 'Plum Green Tea Face Wash', price: 259, mrp: 475, discount: '45% OFF', icon: 'leaf-outline' },
  { id: '4', name: 'Dot & Key Vitamin C Serum', price: 495, mrp: 895, discount: '45% OFF', icon: 'sunny-outline' },
];
const VALUE_DEALS = [
  { id: '1', name: 'Livfit Superfood', subtitle: 'Ayurvedic Health Mix', price: 199, mrp: 350, icon: 'leaf-outline', color: '#E8F5E9' },
  { id: '2', name: 'Nourisher Protein Bar', subtitle: 'Chocolate Flavor', price: 199, mrp: 299, icon: 'barbell-outline', color: '#FFF3E0' },
  { id: '3', name: 'Apollo Life Calcium', subtitle: '30 Tablets', price: 199, mrp: 380, icon: 'fitness-outline', color: '#E3F2FD' },
  { id: '4', name: 'Herbal Tea Pack', subtitle: 'Assorted Flavors', price: 199, mrp: 350, icon: 'cafe-outline', color: '#F3E5F5' },
];
const PHARMACIES = [
  { id: '1', name: 'Apollo Pharmacy Connaught Place', distance: '0.5 km', rating: 4.8, timing: '24/7', icon: 'storefront' },
  { id: '2', name: 'Apollo Pharmacy Rajouri Garden', distance: '1.2 km', rating: 4.6, timing: '8AM-11PM', icon: 'storefront' },
  { id: '3', name: 'Apollo Pharmacy Lajpat Nagar', distance: '2.1 km', rating: 4.7, timing: '24/7', icon: 'storefront' },
  { id: '4', name: 'Apollo Pharmacy Nehru Place', distance: '3.0 km', rating: 4.5, timing: '9AM-10PM', icon: 'storefront' },
];
const MEMBERSHIP_ITEMS = [
  { id: '1', name: 'Nitrogen Fill', subtitle: 'All 4 Tyres', price: '249', icon: 'car-outline', color: '#E8F5E9' },
  { id: '2', name: 'Wiper Fluid', subtitle: 'Premium Quality', price: '199', icon: 'water-outline', color: '#E3F2FD' },
  { id: '3', name: 'AC Service', subtitle: 'Full Check', price: '1,499', icon: 'thermometer-outline', color: '#FFF3E0' },
];
const APOLLO_SERVICES = [
  { id: '1', name: 'Premium Friday Doorstep Savings', subtitle: 'Starting at ₹15/week', icon: 'calendar-outline', color: '#0F847E' },
  { id: '2', name: 'Join Now - Exclusive Benefits', subtitle: 'Apollo Circle Membership', icon: 'diamond-outline', color: '#D4A843' },
];

// ============================================================================
// HEADER
// ============================================================================
const PharmacyHeader = React.memo(({ scrollY }) => {
  const headerOpacity = useSharedValue(0);
  const headerScale = useSharedValue(0.95);
  const shimmerPos = useSharedValue(-1);
  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) });
    headerScale.value = withSpring(1, { damping: 15, stiffness: 120 });
    shimmerPos.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.linear }), -1, false);
  }, []);
  const headerStyle = useAnimatedStyle(() => ({ opacity: headerOpacity.value, transform: [{ scale: headerScale.value }] }));
  const shimmerStyle = useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(shimmerPos.value, [-1, 1], [-SCREEN_WIDTH, SCREEN_WIDTH]) }] }));
  return (
    <Animated.View style={[styles.headerContainer, headerStyle]}>
      <LinearGradient colors={['#0F847E', '#0A6B66', '#085C57']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGradient}>
        <Animated.View style={[styles.headerShimmer, shimmerStyle]}>
          <LinearGradient colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
        </Animated.View>
        <View style={styles.headerTopRow}>
          <View style={styles.headerBadgeRow}>
            <View style={styles.trustBadge}><Ionicons name="shield-checkmark" size={14} color="#FFD700" /><Text style={styles.trustBadgeText}>Verified</Text></View>
            <View style={styles.headerDot} />
            <Text style={styles.headerSubBadge}>Trusted by 5Cr+ Customers</Text>
          </View>
          <TouchableOpacity style={styles.headerSearchBtn}><Ionicons name="search" size={22} color={COLORS.white} /></TouchableOpacity>
        </View>
        <View style={styles.headerTitleSection}>
          <Ionicons name="medical" size={28} color="#FFD700" />
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>India's Most Trusted Pharmacy</Text>
            <View style={styles.headerStatsRow}>
              <View style={styles.headerStat}><Text style={styles.headerStatNum}>40,000+</Text><Text style={styles.headerStatLabel}>PRODUCTS</Text></View>
              <View style={styles.headerStatDiv} />
              <View style={styles.headerStat}><Text style={styles.headerStatNum}>WITHOUT</Text><Text style={styles.headerStatLabel}>SIDE EFFECTS</Text></View>
            </View>
          </View>
        </View>
        <View style={styles.headerBottomRow}>
          <View style={styles.deliveryBadge}><Ionicons name="flash" size={14} color="#FFD700" /><Text style={styles.deliveryText}>Express Delivery in 30 mins</Text></View>
          <View style={styles.ratingBadge}><Ionicons name="star" size={12} color="#FFD700" /><Text style={styles.ratingText}>4.8</Text></View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// PROMO CAROUSEL
// ============================================================================
const PromoBannerCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(0.9); const opacity = useSharedValue(0);
  useEffect(() => { opacity.value = withDelay(index * 100, withTiming(1, { duration: 500 })); scale.value = withDelay(index * 100, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const s = useAnimatedStyle(() => ({ opacity: opacity.value, transform: [{ scale: scale.value }] }));
  return (
    <Animated.View style={[styles.promoCard, s]}>
      <View style={[styles.promoInner, { backgroundColor: item.color }]}>
        <View style={styles.promoContent}>
          <View style={styles.promoIcon}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View>
          <View style={styles.promoText}><Text style={styles.promoTitle} numberOfLines={1}>{item.title}</Text><Text style={styles.promoSub} numberOfLines={2}>{item.subtitle}</Text></View>
        </View>
        <View style={styles.promoDiscBadge}><LinearGradient colors={['#FF6B35', '#FF8F5E']} style={styles.promoDiscGrad}><Text style={styles.promoDiscText}>{item.discount}</Text></LinearGradient></View>
      </View>
    </Animated.View>
  );
});
const PromoBannerCarousel = React.memo(() => {
  const [activeIdx, setActiveIdx] = useState(0); const ref = useRef(null);
  useEffect(() => { const t = setInterval(() => { setActiveIdx(p => { const n = (p + 1) % PROMO_BANNERS.length; ref.current?.scrollToIndex({ index: n, animated: true }); return n; }); }, 4000); return () => clearInterval(t); }, []);
  return (
    <View style={styles.promoSection}>
      <FlatList ref={ref} data={PROMO_BANNERS} horizontal pagingEnabled showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <PromoBannerCard item={item} index={index} />} contentContainerStyle={styles.promoList} snapToInterval={SCREEN_WIDTH - 40} decelerationRate="fast" onMomentumScrollEnd={e => setActiveIdx(Math.round(e.nativeEvent.contentOffset.x / (SCREEN_WIDTH - 40)))} />
      <View style={styles.promoDots}>{PROMO_BANNERS.map((_, i) => <View key={i} style={[styles.promoDot, activeIdx === i && styles.promoDotActive]} />)}</View>
    </View>
  );
});

// ============================================================================
// WELLBEING TABS
// ============================================================================
const WellbeingChip = React.memo(({ item, active, onPress, index }) => {
  const sc = useSharedValue(0.8); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 10, stiffness: 120 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={a}><TouchableOpacity onPress={() => onPress(item.id)} activeOpacity={0.7} style={[styles.wbChip, active && styles.wbChipActive]}>
      <View style={[styles.wbChipIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={18} color={active ? COLORS.primary : COLORS.textSecondary} /></View>
      <Text style={[styles.wbChipText, active && styles.wbChipTextActive]}>{item.label}</Text>
      {active && <View style={styles.wbChipIndicator} />}
    </TouchableOpacity></Animated.View>
  );
});
const WellbeingSection = React.memo(() => {
  const [active, setActive] = useState('personal');
  return (
    <View style={styles.wbSection}><Text style={styles.sectionTitle}>Everything for your well-being</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wbChipRow}>
        {WELLBEING_CATEGORIES.map((item, i) => <WellbeingChip key={item.id} item={item} active={active === item.id} onPress={setActive} index={i} />)}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// BUY AGAIN
// ============================================================================
const BuyAgainCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0); const [qty, setQty] = useState(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 500 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (
    <Animated.View style={[styles.baCard, a]}><View style={styles.baCardInner}>
      {disc > 0 && <View style={styles.discBadge}><Text style={styles.discBadgeText}>{disc}% OFF</Text></View>}
      <View style={styles.baIconWrap}><LinearGradient colors={[COLORS.primaryLight, '#D4F1EF']} style={styles.baIconGrad}><Ionicons name={item.icon} size={36} color={COLORS.primary} /></LinearGradient></View>
      {qty === 0 ? <TouchableOpacity style={styles.addBtn} onPress={() => setQty(1)}><Ionicons name="add" size={20} color={COLORS.primary} /></TouchableOpacity> :
        <View style={styles.qtyRow}><TouchableOpacity onPress={() => setQty(Math.max(0, qty - 1))} style={styles.qtyBtn}><Ionicons name="remove" size={16} color={COLORS.primary} /></TouchableOpacity><Text style={styles.qtyText}>{qty}</Text><TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.qtyBtn}><Ionicons name="add" size={16} color={COLORS.primary} /></TouchableOpacity></View>}
      <Text style={styles.baName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.baSub} numberOfLines={1}>{item.subtitle}</Text>
      <View style={styles.baRating}><Ionicons name="star" size={10} color="#FFD700" /><Text style={styles.baRatingText}>{item.rating}</Text><Text style={styles.baReviews}>({item.reviews > 1000 ? `${(item.reviews / 1000).toFixed(1)}k` : item.reviews})</Text></View>
      <View style={styles.baPriceRow}><Text style={styles.baPrice}>&#8377;{item.price.toFixed(1)}</Text><Text style={styles.baMrp}>&#8377;{item.mrp.toFixed(0)}</Text></View>
      <View style={styles.baDelivery}><Ionicons name="time-outline" size={12} color={COLORS.primary} /><Text style={styles.baDeliveryText}>{item.delivery}</Text></View>
    </View></Animated.View>
  );
});
const BuyAgainSection = React.memo(() => (
  <View style={styles.section}><View style={styles.sectionRow}><Text style={styles.sectionTitle}>Buy Again</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
    <FlatList data={BUY_AGAIN_ITEMS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <BuyAgainCard item={item} index={index} />} contentContainerStyle={styles.baList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
  </View>
));

// ============================================================================
// GOODNESS ON PLATE
// ============================================================================
const GoodnessCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (
    <Animated.View style={[styles.gnCard, a]}><View style={[styles.gnInner, { backgroundColor: item.color }]}>
      <View style={styles.gnIcon}><Ionicons name={item.icon} size={32} color={COLORS.primary} /></View>
      <Text style={styles.gnName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.gnPriceRow}><Text style={styles.gnPrice}>&#8377;{item.price}</Text><Text style={styles.gnMrp}>&#8377;{item.mrp}</Text></View>
      {disc > 0 && <View style={styles.gnDiscBadge}><Text style={styles.gnDiscText}>{disc}% OFF</Text></View>}
      <TouchableOpacity style={styles.gnAddBtn}><Ionicons name="add" size={18} color={COLORS.white} /></TouchableOpacity>
    </View></Animated.View>
  );
});
const GoodnessSection = React.memo(() => (
  <View style={styles.section}><View style={styles.sectionRow}><View><Text style={styles.sectionTitle}>Goodness on your Plate</Text><Text style={styles.sectionSub}>Healthy food essentials</Text></View><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
    <FlatList data={GOODNESS_PLATE} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <GoodnessCard item={item} index={index} />} contentContainerStyle={styles.gnList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
  </View>
));

// ============================================================================
// FLASH DEALS WITH COUNTDOWN
// ============================================================================
const CountdownTimer = React.memo(() => {
  const [time, setTime] = useState({ h: 5, m: 42, s: 18 });
  useEffect(() => { const t = setInterval(() => { setTime(p => { let { h, m, s } = p; s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; m = 59; s = 59; } return { h, m, s }; }); }, 1000); return () => clearInterval(t); }, []);
  const f = n => n.toString().padStart(2, '0');
  return (<View style={styles.cdContainer}><View style={styles.cdBox}><Text style={styles.cdNum}>{f(time.h)}</Text></View><Text style={styles.cdSep}>:</Text><View style={styles.cdBox}><Text style={styles.cdNum}>{f(time.m)}</Text></View><Text style={styles.cdSep}>:</Text><View style={styles.cdBox}><Text style={styles.cdNum}>{f(time.s)}</Text></View></View>);
});
const FlashDealCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.fdCard, a]}><View style={[styles.fdInner, { backgroundColor: item.color }]}>
      <View style={styles.fdBadge}><LinearGradient colors={['#FF6B35', '#FF8F5E']} style={styles.fdBadgeGrad}><Text style={styles.fdBadgeText}>{item.discount}</Text></LinearGradient></View>
      <View style={styles.fdIcon}><Ionicons name={item.icon} size={32} color={COLORS.primary} /></View>
      <Text style={styles.fdName} numberOfLines={2}>{item.name}</Text>
      <View style={styles.fdPriceRow}><Text style={styles.fdPrice}>&#8377;{item.price}</Text><Text style={styles.fdMrp}>&#8377;{item.mrp}</Text></View>
      <TouchableOpacity style={styles.fdAddBtn}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.fdAddGrad}><Text style={styles.fdAddText}>ADD</Text></LinearGradient></TouchableOpacity>
    </View></Animated.View>
  );
});
const FlashDealsSection = React.memo(() => (
  <View style={styles.fdContainer}><LinearGradient colors={['#FFF8E7', '#FFFDF5']} style={styles.fdGradient}>
    <View style={styles.fdHeader}><View style={styles.fdHeaderLeft}><Ionicons name="flash" size={20} color="#FF6B35" /><Text style={styles.fdTitle}>Save All Deals</Text></View><CountdownTimer /></View>
    <FlatList data={FLASH_DEALS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <FlashDealCard item={item} index={index} />} contentContainerStyle={styles.fdList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
  </LinearGradient></View>
));

// ============================================================================
// CONCERNS
// ============================================================================
const ConcernCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.8); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.ccCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.ccInner}><View style={[styles.ccIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={24} color={item.bgColor} /></View><Text style={styles.ccName}>{item.name}</Text></TouchableOpacity></Animated.View>);
});
const ConcernsSection = React.memo(() => (
  <View style={styles.section}><Text style={styles.sectionTitle}>Address Your Concerns</Text><Text style={styles.sectionSub}>Shop by health needs</Text><View style={styles.ccGrid}>{HEALTH_CONCERNS.map((item, i) => <ConcernCard key={item.id} item={item} index={i} />)}</View></View>
));

// ============================================================================
// STORES
// ============================================================================
const StoreCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 500 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.stCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.stInner}><LinearGradient colors={[item.color, COLORS.white]} style={styles.stGrad}><View style={styles.stIcon}><Ionicons name={item.icon} size={28} color={item.tagColor} /></View><Text style={styles.stName}>{item.name}</Text><Text style={styles.stSub}>{item.subtitle}</Text><View style={[styles.stTag, { backgroundColor: item.tagColor }]}><Text style={styles.stTagText}>EXPLORE</Text></View></LinearGradient></TouchableOpacity></Animated.View>);
});
const ExploreStoresSection = React.memo(() => (
  <View style={styles.section}><Text style={styles.sectionTitle}>Explore Our Stores</Text><FlatList data={STORE_CATEGORIES} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <StoreCard item={item} index={index} />} contentContainerStyle={styles.stList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} /></View>
));

// ============================================================================
// APOLLO SECTION
// ============================================================================
const ApolloServiceCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.9); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 500 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.asCard, a]}><TouchableOpacity activeOpacity={0.7}><LinearGradient colors={[item.color, item.color === '#0F847E' ? '#0A6B66' : '#C4952E']} style={styles.asGrad}><Ionicons name={item.icon} size={28} color={COLORS.white} /><View style={styles.asTextWrap}><Text style={styles.asName}>{item.name}</Text><Text style={styles.asSub}>{item.subtitle}</Text></View><View style={styles.asArrow}><Ionicons name="chevron-forward" size={18} color={COLORS.white} /></View></LinearGradient></TouchableOpacity></Animated.View>);
});
const ApolloBestCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.abCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.abInner}><View style={[styles.abIcon, { backgroundColor: `${item.color}15` }]}><Ionicons name={item.icon} size={28} color={item.color} /></View><Text style={styles.abName}>{item.name}</Text><Text style={[styles.abSub, { color: item.color }]}>{item.subtitle}</Text></TouchableOpacity></Animated.View>);
});
const MembershipCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.memCard, a]}><View style={[styles.memInner, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={24} color={COLORS.primary} /><Text style={styles.memName}>{item.name}</Text><Text style={styles.memSub}>{item.subtitle}</Text><Text style={styles.memPrice}>&#8377;{item.price}</Text></View></Animated.View>);
});
const ApolloSection = React.memo(() => (
  <View style={styles.apolloWrap}>
    <View style={styles.section}><FlatList data={APOLLO_SERVICES} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <ApolloServiceCard item={item} index={index} />} contentContainerStyle={styles.asListC} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} /></View>
    <View style={styles.section}><FlatList data={MEMBERSHIP_ITEMS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <MembershipCard item={item} index={index} />} contentContainerStyle={styles.memListC} ItemSeparatorComponent={() => <View style={{ width: 10 }} />} /></View>
    <View style={styles.section}><Text style={styles.sectionTitle}>Get the Best of Apollo</Text><View style={styles.abGrid}>{APOLLO_BEST.map((item, i) => <ApolloBestCard key={item.id} item={item} index={i} />)}</View></View>
  </View>
));

// ============================================================================
// LAB TESTS
// ============================================================================
const LabTestCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 500 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.ltCard, a]}><View style={styles.ltInner}><View style={styles.ltBadge}><LinearGradient colors={['#FF6B35', '#FF8F5E']} style={styles.ltBadgeGrad}><Text style={styles.ltBadgeText}>{item.discount}</Text></LinearGradient></View><View style={styles.ltIcon}><Ionicons name={item.icon} size={32} color={COLORS.primary} /></View><Text style={styles.ltName} numberOfLines={2}>{item.name}</Text><Text style={styles.ltSub}>{item.subtitle}</Text><View style={styles.ltPriceRow}><Text style={styles.ltPrice}>&#8377;{item.price}</Text><Text style={styles.ltMrp}>&#8377;{item.mrp}</Text></View><TouchableOpacity style={styles.ltBookBtn}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.ltBookGrad}><Text style={styles.ltBookText}>BOOK NOW</Text></LinearGradient></TouchableOpacity></View></Animated.View>);
});
const LabTestsSection = React.memo(() => (
  <View style={styles.section}><View style={styles.sponsBadge}><Text style={styles.sponsText}>Sponsored</Text></View><Text style={styles.sectionTitle}>Popular Lab Tests</Text><FlatList data={LAB_TESTS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <LabTestCard item={item} index={index} />} contentContainerStyle={styles.ltList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} /></View>
));

// ============================================================================
// HOLIDAY BANNER
// ============================================================================
const HolidayBanner = React.memo(() => {
  const pulse = useSharedValue(1);
  useEffect(() => { pulse.value = withRepeat(withSequence(withTiming(1.02, { duration: 1500, easing: Easing.inOut(Easing.ease) }), withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })), -1, false); }, []);
  const ps = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));
  return (<View style={styles.hlBanner}><LinearGradient colors={['#FF6B35', '#FF8F5E', '#FFB088']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hlGrad}><View style={styles.hlContent}><Animated.View style={ps}><Text style={styles.hlEmoji}>🎉</Text></Animated.View><View style={styles.hlTextWrap}><Text style={styles.hlTitle}>Holiday Offer! Order today and get a bonus basket</Text><Text style={styles.hlSub}>Complimentary health kit with orders above ₹999</Text></View></View><TouchableOpacity style={styles.hlBtn}><Text style={styles.hlBtnText}>Shop Now</Text><Ionicons name="arrow-forward" size={16} color={COLORS.white} /></TouchableOpacity></LinearGradient></View>);
});

// ============================================================================
// SKINCARE
// ============================================================================
const SkincareCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (<Animated.View style={[styles.scCard, a]}><View style={styles.scInner}><View style={styles.scBadge}><Text style={styles.scBadgeText}>{item.badge}</Text></View><View style={styles.scIcon}><Ionicons name={item.icon} size={32} color={COLORS.primary} /></View><Text style={styles.scName} numberOfLines={2}>{item.name}</Text><View style={styles.scRating}><Ionicons name="star" size={10} color="#FFD700" /><Text style={styles.scRatingText}>{item.rating}</Text></View><View style={styles.scPriceRow}><Text style={styles.scPrice}>&#8377;{item.price}</Text><Text style={styles.scMrp}>&#8377;{item.mrp}</Text></View>{disc > 0 && <Text style={styles.scDisc}>{disc}% OFF</Text>}<TouchableOpacity style={styles.scAddBtn}><Ionicons name="add" size={18} color={COLORS.white} /></TouchableOpacity></View></Animated.View>);
});
const BestSkincareSection = React.memo(() => (
  <View style={styles.section}><View style={styles.sectionRow}><Text style={styles.sectionTitle}>Best Of Skincare By Experts</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View><FlatList data={SKINCARE_PRODUCTS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <SkincareCard item={item} index={index} />} contentContainerStyle={styles.scList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} /></View>
));
const Skincare50Card = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.s50Card, a]}><View style={styles.s50Inner}><View style={styles.s50Badge}><LinearGradient colors={['#FF6B35', '#FF8F5E']} style={styles.s50BadgeGrad}><Text style={styles.s50BadgeText}>{item.discount}</Text></LinearGradient></View><View style={styles.s50Icon}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View><Text style={styles.s50Name} numberOfLines={2}>{item.name}</Text><View style={styles.s50PriceRow}><Text style={styles.s50Price}>&#8377;{item.price}</Text><Text style={styles.s50Mrp}>&#8377;{item.mrp}</Text></View><TouchableOpacity style={styles.s50AddBtn}><Text style={styles.s50AddText}>ADD</Text></TouchableOpacity></View></Animated.View>);
});
const Skincare50Section = React.memo(() => (
  <View style={styles.section}><View style={styles.sectionRow}><View><Text style={styles.sectionTitle}>Skincare 50% Off</Text><Text style={styles.sectionSub}>Premium skincare at half price</Text></View><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View><FlatList data={SKINCARE_50} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <Skincare50Card item={item} index={index} />} contentContainerStyle={styles.s50List} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} /></View>
));

// ============================================================================
// VALUE DEALS
// ============================================================================
const ValueDealCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (<Animated.View style={[styles.vdCard, a]}><View style={[styles.vdInner, { backgroundColor: item.color }]}><View style={styles.vdIcon}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View><Text style={styles.vdName} numberOfLines={1}>{item.name}</Text><Text style={styles.vdSub} numberOfLines={1}>{item.subtitle}</Text><View style={styles.vdPriceRow}><Text style={styles.vdPrice}>&#8377;{item.price}</Text><Text style={styles.vdMrp}>&#8377;{item.mrp}</Text></View><View style={styles.vdDiscBadge}><Text style={styles.vdDiscText}>{disc}% OFF</Text></View></View></Animated.View>);
});
const ValueDealsSection = React.memo(() => (
  <View style={styles.section}><View style={styles.sectionRow}><View><Text style={styles.sectionTitle}>Value Deals at &#8377;199</Text><Text style={styles.sectionSub}>Everything at ₹199</Text></View><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View><FlatList data={VALUE_DEALS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <ValueDealCard item={item} index={index} />} contentContainerStyle={styles.vdList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} /></View>
));

// ============================================================================
// PHARMACIES NEAR
// ============================================================================
const PharmacyNearCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12, stiffness: 100 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (<Animated.View style={[styles.pnCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.pnInner}><View style={styles.pnIcon}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View><View style={styles.pnContent}><Text style={styles.pnName} numberOfLines={1}>{item.name}</Text><View style={styles.pnInfo}><View style={styles.pnDist}><Ionicons name="location-outline" size={12} color={COLORS.textTertiary} /><Text style={styles.pnDistText}>{item.distance}</Text></View><View style={styles.pnRat}><Ionicons name="star" size={12} color="#FFD700" /><Text style={styles.pnRatText}>{item.rating}</Text></View></View><View style={styles.pnTiming}><Ionicons name="time-outline" size={12} color={COLORS.success} /><Text style={styles.pnTimingText}>{item.timing}</Text></View></View><Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} /></TouchableOpacity></Animated.View>);
});
const PharmaciesNearSection = React.memo(() => (
  <View style={styles.section}><View style={styles.sectionRow}><Text style={styles.sectionTitle}>Pharmacies Near You</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>{PHARMACIES.map((item, i) => <PharmacyNearCard key={item.id} item={item} index={i} />)}</View>
));

// ============================================================================
// FOOTER
// ============================================================================
const LiveHealthyFooter = React.memo(() => {
  const heartScale = useSharedValue(1);
  useEffect(() => { heartScale.value = withRepeat(withSequence(withTiming(1.15, { duration: 800, easing: Easing.inOut(Easing.ease) }), withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })), -1, false); }, []);
  const hs = useAnimatedStyle(() => ({ transform: [{ scale: heartScale.value }] }));
  return (<View style={styles.lhFooter}><LinearGradient colors={[COLORS.primaryLight, '#D4F1EF', COLORS.white]} style={styles.lhGrad}><Animated.View style={hs}><Ionicons name="heart" size={40} color={COLORS.primary} /></Animated.View><Text style={styles.lhTitle}>Live Healthy</Text><Text style={styles.lhSub}>with Apollo 24|7</Text><View style={styles.lhDiv} /><Text style={styles.lhCopy}>Your trusted health partner</Text><View style={styles.lhSocial}>{['logo-facebook', 'logo-twitter', 'logo-instagram', 'logo-youtube'].map((icon, i) => <TouchableOpacity key={i} style={styles.socialBtn}><Ionicons name={icon} size={20} color={COLORS.primary} /></TouchableOpacity>)}</View></LinearGradient></View>);
});

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function PharmacyIndex() {
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });
  const AScrollView = Animated.createAnimatedComponent(ScrollView);
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <AScrollView onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} bounces={true}>
        <PharmacyHeader scrollY={scrollY} />
        <PromoBannerCarousel />
        <WellbeingSection />
        <BuyAgainSection />
        <GoodnessSection />
        <FlashDealsSection />
        <ConcernsSection />
        <ExploreStoresSection />
        <ApolloSection />
        <LabTestsSection />
        <HolidayBanner />
        <BestSkincareSection />
        <Skincare50Section />
        <ValueDealsSection />
        <PharmaciesNearSection />
        <LiveHealthyFooter />
      </AScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { paddingBottom: 20 },
  headerContainer: { marginBottom: SPACING.md },
  headerGradient: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: RADIUS.xxl, borderBottomRightRadius: RADIUS.xxl, overflow: 'hidden', position: 'relative' },
  headerShimmer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  headerTopRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  headerBadgeRow: { flexDirection: 'row', alignItems: 'center' },
  trustBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  trustBadgeText: { color: '#FFD700', fontSize: 11, fontWeight: '700', marginLeft: 4 },
  headerDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: SPACING.sm },
  headerSubBadge: { color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '500' },
  headerSearchBtn: { padding: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full },
  headerTitleSection: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.lg },
  headerTitleWrap: { marginLeft: SPACING.md, flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.white, letterSpacing: -0.3, marginBottom: SPACING.sm },
  headerStatsRow: { flexDirection: 'row', alignItems: 'center' },
  headerStat: { alignItems: 'center' },
  headerStatNum: { fontSize: 13, fontWeight: '800', color: '#FFD700' },
  headerStatLabel: { fontSize: 9, fontWeight: '600', color: 'rgba(255,255,255,0.7)', letterSpacing: 1 },
  headerStatDiv: { width: 1, height: 24, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: SPACING.lg },
  headerBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  deliveryBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full },
  deliveryText: { color: COLORS.white, fontSize: 12, fontWeight: '600', marginLeft: 6 },
  ratingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,215,0,0.15)', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full },
  ratingText: { color: '#FFD700', fontSize: 12, fontWeight: '700', marginLeft: 4 },
  promoSection: { marginBottom: SPACING.lg },
  promoList: { paddingHorizontal: SPACING.lg },
  promoCard: { width: SCREEN_WIDTH - 40, marginRight: SPACING.md },
  promoInner: { borderRadius: RADIUS.lg, padding: SPACING.lg, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', overflow: 'hidden', minHeight: 100 },
  promoContent: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  promoIcon: { width: 50, height: 50, borderRadius: RADIUS.md, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 3 } }) },
  promoText: { marginLeft: SPACING.md, flex: 1 },
  promoTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 2 },
  promoSub: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 16 },
  promoDiscBadge: { position: 'absolute', top: SPACING.sm, right: SPACING.sm },
  promoDiscGrad: { paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs, borderRadius: RADIUS.sm },
  promoDiscText: { color: COLORS.white, fontSize: 11, fontWeight: '800' },
  promoDots: { flexDirection: 'row', justifyContent: 'center', marginTop: SPACING.md },
  promoDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.border, marginHorizontal: 3 },
  promoDotActive: { backgroundColor: COLORS.primary, width: 24 },
  section: { marginBottom: SPACING.xl, paddingHorizontal: SPACING.lg },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  sectionSub: { fontSize: 12, color: COLORS.textTertiary },
  viewAll: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { fontSize: 12, fontWeight: '600', color: COLORS.primary, marginRight: 2 },
  wbSection: { marginBottom: SPACING.xl, paddingHorizontal: SPACING.lg },
  wbChipRow: { paddingVertical: SPACING.sm },
  wbChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, marginRight: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  wbChipActive: { borderColor: COLORS.primary, backgroundColor: COLORS.primaryLight },
  wbChipIcon: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.sm },
  wbChipText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  wbChipTextActive: { color: COLORS.primary },
  wbChipIndicator: { position: 'absolute', bottom: -1, left: '30%', right: '30%', height: 2, backgroundColor: COLORS.primary, borderRadius: 1 },
  baList: { paddingVertical: SPACING.sm },
  baCard: { width: 155 },
  baCardInner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 }, android: { elevation: 3 } }), position: 'relative' },
  discBadge: { position: 'absolute', top: SPACING.sm, left: SPACING.sm, backgroundColor: COLORS.error, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs, zIndex: 1 },
  discBadgeText: { color: COLORS.white, fontSize: 9, fontWeight: '800' },
  baIconWrap: { alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.sm },
  baIconGrad: { width: 70, height: 70, borderRadius: RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  addBtn: { position: 'absolute', top: SPACING.sm, right: SPACING.sm, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.primary, zIndex: 1 },
  qtyRow: { position: 'absolute', top: SPACING.sm, right: SPACING.sm, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primaryLight, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.primary, zIndex: 1 },
  qtyBtn: { padding: 4 },
  qtyText: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginHorizontal: 6 },
  baName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 2 },
  baSub: { fontSize: 12, color: COLORS.textTertiary, marginBottom: SPACING.xs },
  baRating: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  baRatingText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, marginLeft: 2 },
  baReviews: { fontSize: 10, color: COLORS.textTertiary, marginLeft: 2 },
  baPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  baPrice: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  baMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 6 },
  baDelivery: { flexDirection: 'row', alignItems: 'center' },
  baDeliveryText: { fontSize: 11, color: COLORS.primary, fontWeight: '600', marginLeft: 4 },
  gnList: { paddingVertical: SPACING.sm },
  gnCard: { width: 140 },
  gnInner: { borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', position: 'relative', minHeight: 160 },
  gnIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  gnName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: SPACING.xs },
  gnPriceRow: { flexDirection: 'row', alignItems: 'center' },
  gnPrice: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  gnMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  gnDiscBadge: { backgroundColor: COLORS.errorLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs, marginTop: 4 },
  gnDiscText: { color: COLORS.error, fontSize: 10, fontWeight: '700' },
  gnAddBtn: { position: 'absolute', bottom: SPACING.sm, right: SPACING.sm, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  fdContainer: { marginBottom: SPACING.xl, marginHorizontal: SPACING.lg, borderRadius: RADIUS.xl, overflow: 'hidden' },
  fdGradient: { padding: SPACING.lg },
  fdHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  fdHeaderLeft: { flexDirection: 'row', alignItems: 'center' },
  fdTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginLeft: SPACING.sm },
  cdContainer: { flexDirection: 'row', alignItems: 'center' },
  cdBox: { backgroundColor: COLORS.textPrimary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: RADIUS.sm },
  cdNum: { color: COLORS.white, fontSize: 14, fontWeight: '800' },
  cdSep: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary, marginHorizontal: 2 },
  fdList: { paddingVertical: SPACING.sm },
  fdCard: { width: 145 },
  fdInner: { borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', position: 'relative', minHeight: 180 },
  fdBadge: { position: 'absolute', top: SPACING.sm, left: SPACING.sm, zIndex: 1 },
  fdBadgeGrad: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  fdBadgeText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  fdIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.lg, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  fdName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: SPACING.xs },
  fdPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  fdPrice: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  fdMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  fdAddBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  fdAddGrad: { paddingHorizontal: SPACING.xl, paddingVertical: 6, borderRadius: RADIUS.sm },
  fdAddText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  ccGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: SPACING.md },
  ccCard: { width: '23%', marginBottom: SPACING.md },
  ccInner: { alignItems: 'center' },
  ccIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 4 }, android: { elevation: 2 } }) },
  ccName: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary, textAlign: 'center' },
  stList: { paddingVertical: SPACING.sm },
  stCard: { width: 160 },
  stInner: { borderRadius: RADIUS.lg, overflow: 'hidden', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 }, android: { elevation: 3 } }) },
  stGrad: { padding: SPACING.lg, alignItems: 'center', minHeight: 140 },
  stIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  stName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  stSub: { fontSize: 10, color: COLORS.textTertiary, textAlign: 'center', marginBottom: SPACING.sm },
  stTag: { paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs, borderRadius: RADIUS.full },
  stTagText: { color: COLORS.white, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  apolloWrap: { marginBottom: SPACING.md },
  asListC: { paddingVertical: SPACING.sm },
  asCard: { width: SCREEN_WIDTH - 80 },
  asGrad: { borderRadius: RADIUS.lg, padding: SPACING.xl, flexDirection: 'row', alignItems: 'center', minHeight: 80 },
  asTextWrap: { flex: 1, marginLeft: SPACING.md },
  asName: { color: COLORS.white, fontSize: 14, fontWeight: '600' },
  asSub: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
  asArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  memListC: { paddingVertical: SPACING.sm },
  memCard: { width: 120 },
  memInner: { borderRadius: RADIUS.md, padding: SPACING.md, alignItems: 'center', minHeight: 100 },
  memName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginTop: SPACING.xs },
  memSub: { fontSize: 10, color: COLORS.textTertiary, textAlign: 'center', marginTop: 2 },
  memPrice: { fontSize: 14, fontWeight: '600', color: COLORS.primary, marginTop: SPACING.xs },
  abGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: SPACING.md },
  abCard: { width: '23%' },
  abInner: { alignItems: 'center' },
  abIcon: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs },
  abName: { fontSize: 10, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  abSub: { fontSize: 9, fontWeight: '700', letterSpacing: 0.3, textAlign: 'center' },
  sponsBadge: { backgroundColor: COLORS.border, paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.xs, alignSelf: 'flex-start', marginBottom: SPACING.xs },
  sponsText: { fontSize: 10, color: COLORS.textTertiary, fontWeight: '500' },
  ltList: { paddingVertical: SPACING.sm },
  ltCard: { width: 180 },
  ltInner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', position: 'relative', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 }, android: { elevation: 3 } }), minHeight: 200 },
  ltBadge: { position: 'absolute', top: SPACING.sm, right: SPACING.sm, zIndex: 1 },
  ltBadgeGrad: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  ltBadgeText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  ltIcon: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.sm },
  ltName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  ltSub: { fontSize: 12, color: COLORS.textTertiary, textAlign: 'center', marginBottom: SPACING.sm },
  ltPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  ltPrice: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  ltMrp: { fontSize: 12, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 6 },
  ltBookBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  ltBookGrad: { paddingHorizontal: SPACING.xl, paddingVertical: 8, borderRadius: RADIUS.sm },
  ltBookText: { color: COLORS.white, fontSize: 12, fontWeight: '700', letterSpacing: 0.5 },
  hlBanner: { marginHorizontal: SPACING.lg, marginBottom: SPACING.xl, borderRadius: RADIUS.xl, overflow: 'hidden' },
  hlGrad: { padding: SPACING.xl },
  hlContent: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  hlEmoji: { fontSize: 36, marginRight: SPACING.md },
  hlTextWrap: { flex: 1 },
  hlTitle: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginBottom: 4, lineHeight: 20 },
  hlSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  hlBtn: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full },
  hlBtnText: { color: COLORS.white, fontSize: 14, fontWeight: '600', marginRight: 6 },
  scList: { paddingVertical: SPACING.sm },
  scCard: { width: 155 },
  scInner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, position: 'relative', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 }, android: { elevation: 3 } }), minHeight: 200 },
  scBadge: { backgroundColor: COLORS.primaryLight, paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.xs, alignSelf: 'flex-start', marginBottom: SPACING.sm },
  scBadgeText: { color: COLORS.primary, fontSize: 9, fontWeight: '800' },
  scIcon: { width: 60, height: 60, borderRadius: RADIUS.lg, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginBottom: SPACING.sm },
  scName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  scRating: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  scRatingText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, marginLeft: 2 },
  scPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  scPrice: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  scMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 6 },
  scDisc: { fontSize: 10, fontWeight: '700', color: COLORS.success },
  scAddBtn: { position: 'absolute', bottom: SPACING.sm, right: SPACING.sm, width: 28, height: 28, borderRadius: 14, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  s50List: { paddingVertical: SPACING.sm },
  s50Card: { width: 145 },
  s50Inner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', position: 'relative', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 }, android: { elevation: 3 } }), minHeight: 170 },
  s50Badge: { position: 'absolute', top: SPACING.sm, left: SPACING.sm, zIndex: 1 },
  s50BadgeGrad: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  s50BadgeText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  s50Icon: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.lg },
  s50Name: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: SPACING.xs },
  s50PriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  s50Price: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  s50Mrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  s50AddBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: 6, borderRadius: RADIUS.sm },
  s50AddText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  vdList: { paddingVertical: SPACING.sm },
  vdCard: { width: 140 },
  vdInner: { borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', minHeight: 160 },
  vdIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  vdName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  vdSub: { fontSize: 10, color: COLORS.textTertiary, textAlign: 'center', marginBottom: SPACING.xs },
  vdPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  vdPrice: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  vdMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  vdDiscBadge: { backgroundColor: COLORS.errorLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  vdDiscText: { color: COLORS.error, fontSize: 10, fontWeight: '700' },
  pnCard: { marginBottom: SPACING.md },
  pnInner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 }, android: { elevation: 2 } }) },
  pnIcon: { width: 48, height: 48, borderRadius: RADIUS.md, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  pnContent: { flex: 1 },
  pnName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  pnInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  pnDist: { flexDirection: 'row', alignItems: 'center', marginRight: SPACING.md },
  pnDistText: { fontSize: 12, color: COLORS.textTertiary, marginLeft: 2 },
  pnRat: { flexDirection: 'row', alignItems: 'center' },
  pnRatText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginLeft: 2 },
  pnTiming: { flexDirection: 'row', alignItems: 'center' },
  pnTimingText: { fontSize: 11, color: COLORS.success, fontWeight: '600', marginLeft: 4 },
  lhFooter: { marginHorizontal: SPACING.lg, borderRadius: RADIUS.xxl, overflow: 'hidden', marginBottom: SPACING.xl },
  lhGrad: { padding: SPACING.xxxl, alignItems: 'center' },
  lhTitle: { fontSize: 26, fontWeight: '800', color: COLORS.primary, marginTop: SPACING.md, letterSpacing: -0.5 },
  lhSub: { fontSize: 14, color: COLORS.textTertiary, marginTop: SPACING.xs },
  lhDiv: { width: 60, height: 2, backgroundColor: COLORS.primary, borderRadius: 1, marginVertical: SPACING.lg },
  lhCopy: { fontSize: 12, color: COLORS.textTertiary, marginBottom: SPACING.md },
  lhSocial: { flexDirection: 'row', alignItems: 'center' },
  socialBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: COLORS.primaryLight, justifyContent: 'center', alignItems: 'center', marginHorizontal: SPACING.sm },
});
