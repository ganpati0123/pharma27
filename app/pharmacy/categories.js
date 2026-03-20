/**
 * APOLLO 24|7 CATEGORIES TAB - Wellness & Health Categories
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, withSequence, withRepeat, interpolate, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLORS = {
  primary: '#0F847E', primaryDark: '#0A6B66', primaryLight: '#E8F5F4',
  accent: '#FF6B35', gold: '#D4A843', white: '#FFFFFF', background: '#F5F7FA',
  textPrimary: '#1A1D29', textSecondary: '#4A5568', textTertiary: '#8892A5',
  border: '#E8ECF1', success: '#22C55E', error: '#EF4444', errorLight: '#FEF2F2',
  purple: '#8B5CF6', blue: '#3B82F6', orange: '#F97316', pink: '#EC4899',
};
const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
const RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, full: 999 };

// ============================================================================
// DATA
// ============================================================================
const MAIN_CATEGORIES = [
  { id: '1', name: 'Wellness', icon: 'heart-outline', color: '#E8F5E9', gradColors: ['#22C55E', '#16A34A'], count: 450 },
  { id: '2', name: 'Personal Care', icon: 'person-outline', color: '#E3F2FD', gradColors: ['#3B82F6', '#2563EB'], count: 380 },
  { id: '3', name: 'Nutrition', icon: 'nutrition-outline', color: '#FFF3E0', gradColors: ['#F97316', '#EA580C'], count: 290 },
  { id: '4', name: 'Baby Care', icon: 'happy-outline', color: '#FCE4EC', gradColors: ['#EC4899', '#DB2777'], count: 210 },
  { id: '5', name: 'Fitness', icon: 'barbell-outline', color: '#F3E5F5', gradColors: ['#8B5CF6', '#7C3AED'], count: 320 },
  { id: '6', name: 'Sexual Wellness', icon: 'shield-outline', color: '#E8EAF6', gradColors: ['#6366F1', '#4F46E5'], count: 150 },
  { id: '7', name: 'Elderly Care', icon: 'accessibility-outline', color: '#E0F2F1', gradColors: ['#14B8A6', '#0D9488'], count: 180 },
  { id: '8', name: 'Ayurveda', icon: 'leaf-outline', color: '#F1F8E9', gradColors: ['#84CC16', '#65A30D'], count: 260 },
];

const WELLNESS_SUB = [
  { id: '1', name: 'Vitamins & Supplements', icon: 'sunny-outline', color: '#FFF8E1', products: 120 },
  { id: '2', name: 'Immunity Boosters', icon: 'shield-checkmark-outline', color: '#E8F5E9', products: 85 },
  { id: '3', name: 'Digestive Health', icon: 'restaurant-outline', color: '#FFF3E0', products: 65 },
  { id: '4', name: 'Heart Health', icon: 'heart-outline', color: '#FCE4EC', products: 45 },
  { id: '5', name: 'Bone & Joint', icon: 'body-outline', color: '#F3E5F5', products: 55 },
  { id: '6', name: 'Eye Care', icon: 'eye-outline', color: '#E3F2FD', products: 40 },
  { id: '7', name: 'Liver Care', icon: 'fitness-outline', color: '#E0F7FA', products: 35 },
  { id: '8', name: 'Kidney Care', icon: 'water-outline', color: '#F1F8E9', products: 30 },
];

const PERSONAL_CARE_SUB = [
  { id: '1', name: 'Skin Care', icon: 'flower-outline', color: '#FCE4EC', products: 200 },
  { id: '2', name: 'Hair Care', icon: 'cut-outline', color: '#F3E5F5', products: 150 },
  { id: '3', name: 'Oral Care', icon: 'happy-outline', color: '#E3F2FD', products: 80 },
  { id: '4', name: 'Bath & Body', icon: 'water-outline', color: '#E0F2F1', products: 120 },
  { id: '5', name: 'Fragrances', icon: 'rose-outline', color: '#FFF3E0', products: 60 },
  { id: '6', name: 'Men Grooming', icon: 'man-outline', color: '#E8EAF6', products: 95 },
];

const TRENDING_IN_CATEGORY = [
  { id: '1', name: 'Protein Powders', icon: 'barbell-outline', color: '#F3E5F5', discount: '30% OFF', tag: 'TRENDING' },
  { id: '2', name: 'Face Serums', icon: 'sparkles-outline', color: '#FCE4EC', discount: '25% OFF', tag: 'HOT' },
  { id: '3', name: 'Multivitamins', icon: 'sunny-outline', color: '#FFF8E1', discount: '20% OFF', tag: 'POPULAR' },
  { id: '4', name: 'Baby Diapers', icon: 'happy-outline', color: '#E3F2FD', discount: '15% OFF', tag: 'SALE' },
  { id: '5', name: 'Omega 3 Fish Oil', icon: 'fish-outline', color: '#E0F2F1', discount: '35% OFF', tag: 'BESTSELLER' },
];

const LIFESTYLE_CATEGORIES = [
  { id: '1', name: 'Diabetes Management', icon: 'water-outline', color: '#E3F2FD', bgColor: '#1565C0', desc: 'Blood sugar monitors & more' },
  { id: '2', name: 'Weight Management', icon: 'scale-outline', color: '#E8F5E9', bgColor: '#2E7D32', desc: 'Healthy weight loss solutions' },
  { id: '3', name: 'Pain Management', icon: 'bandage-outline', color: '#FFF3E0', bgColor: '#EF6C00', desc: 'Relief from chronic pain' },
  { id: '4', name: 'Sleep & Stress', icon: 'moon-outline', color: '#F3E5F5', bgColor: '#7B1FA2', desc: 'Better sleep, less stress' },
  { id: '5', name: 'Respiratory Care', icon: 'cloud-outline', color: '#E1F5FE', bgColor: '#0288D1', desc: 'Breathe easy products' },
  { id: '6', name: 'Women Health', icon: 'woman-outline', color: '#FCE4EC', bgColor: '#C62828', desc: 'Women wellness essentials' },
];

const TOP_BRANDS_CAT = [
  { id: '1', name: 'Himalaya', icon: 'leaf-outline', color: '#E8F5E9', products: 120 },
  { id: '2', name: 'Apollo Life', icon: 'medical-outline', color: '#E3F2FD', products: 95 },
  { id: '3', name: 'Dabur', icon: 'flask-outline', color: '#FFF3E0', products: 110 },
  { id: '4', name: 'Patanjali', icon: 'leaf-outline', color: '#F1F8E9', products: 80 },
  { id: '5', name: 'Mamaearth', icon: 'globe-outline', color: '#FCE4EC', products: 70 },
  { id: '6', name: 'Wow Skin', icon: 'sparkles-outline', color: '#F3E5F5', products: 65 },
];

const SEASONAL_PICKS = [
  { id: '1', name: 'Summer Essentials', subtitle: 'Stay cool & hydrated', icon: 'sunny-outline', color: '#FFF8E1', gradColors: ['#F59E0B', '#D97706'] },
  { id: '2', name: 'Monsoon Care', subtitle: 'Protection from infections', icon: 'rainy-outline', color: '#E3F2FD', gradColors: ['#3B82F6', '#2563EB'] },
  { id: '3', name: 'Winter Wellness', subtitle: 'Immunity & skin care', icon: 'snow-outline', color: '#E8F5E9', gradColors: ['#22C55E', '#16A34A'] },
];

// ============================================================================
// COMPONENTS
// ============================================================================
const CategoryHeader = React.memo(() => {
  const op = useSharedValue(0); const sc = useSharedValue(0.95);
  useEffect(() => { op.value = withTiming(1, { duration: 600 }); sc.value = withSpring(1, { damping: 15 }); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.headerWrap, a]}>
      <LinearGradient colors={['#0F847E', '#0A6B66']} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <View><Text style={styles.headerTitle}>Categories</Text><Text style={styles.headerSub}>Browse health & wellness categories</Text></View>
          <TouchableOpacity style={styles.headerBtn}><Ionicons name="search" size={22} color={COLORS.white} /></TouchableOpacity>
        </View>
        <View style={styles.catStats}>
          <View style={styles.catStat}><Text style={styles.catStatNum}>2,500+</Text><Text style={styles.catStatLabel}>Products</Text></View>
          <View style={styles.catStatDiv} />
          <View style={styles.catStat}><Text style={styles.catStatNum}>8</Text><Text style={styles.catStatLabel}>Main Categories</Text></View>
          <View style={styles.catStatDiv} />
          <View style={styles.catStat}><Text style={styles.catStatNum}>50+</Text><Text style={styles.catStatLabel}>Sub Categories</Text></View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

const MainCategoryCard = React.memo(({ item, index, onPress }) => {
  const sc = useSharedValue(0.8); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.mcCard, a]}><TouchableOpacity activeOpacity={0.7} onPress={() => onPress(item.id)} style={styles.mcInner}>
      <LinearGradient colors={item.gradColors} style={styles.mcIconWrap}><Ionicons name={item.icon} size={28} color={COLORS.white} /></LinearGradient>
      <Text style={styles.mcName}>{item.name}</Text>
      <Text style={styles.mcCount}>{item.count} products</Text>
    </TouchableOpacity></Animated.View>
  );
});

const SubCategoryCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.scCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.scInner}>
      <View style={[styles.scIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={24} color={COLORS.primary} /></View>
      <View style={styles.scText}><Text style={styles.scName}>{item.name}</Text><Text style={styles.scProd}>{item.products} products</Text></View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
    </TouchableOpacity></Animated.View>
  );
});

const TrendingCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.trCard, a]}><View style={[styles.trInner, { backgroundColor: item.color }]}>
      <View style={styles.trTag}><Text style={styles.trTagText}>{item.tag}</Text></View>
      <View style={styles.trIconWrap}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View>
      <Text style={styles.trName}>{item.name}</Text>
      <View style={styles.trDiscBadge}><LinearGradient colors={['#FF6B35', '#FF8F5E']} style={styles.trDiscGrad}><Text style={styles.trDiscText}>{item.discount}</Text></LinearGradient></View>
      <TouchableOpacity style={styles.trShopBtn}><Text style={styles.trShopText}>SHOP NOW</Text></TouchableOpacity>
    </View></Animated.View>
  );
});

const LifestyleCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.lsCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.lsInner}>
      <View style={[styles.lsIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={24} color={item.bgColor} /></View>
      <View style={styles.lsText}><Text style={styles.lsName}>{item.name}</Text><Text style={styles.lsDesc}>{item.desc}</Text></View>
      <View style={[styles.lsArrow, { backgroundColor: `${item.bgColor}20` }]}><Ionicons name="arrow-forward" size={16} color={item.bgColor} /></View>
    </TouchableOpacity></Animated.View>
  );
});

const BrandChip = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 300 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.brCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.brInner}>
      <View style={[styles.brIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={20} color={COLORS.primary} /></View>
      <Text style={styles.brName}>{item.name}</Text>
      <Text style={styles.brProd}>{item.products} items</Text>
    </TouchableOpacity></Animated.View>
  );
});

const SeasonalCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 500 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.snCard, a]}><TouchableOpacity activeOpacity={0.7}>
      <LinearGradient colors={item.gradColors} style={styles.snGrad}>
        <Ionicons name={item.icon} size={32} color={COLORS.white} />
        <View style={styles.snText}><Text style={styles.snName}>{item.name}</Text><Text style={styles.snSub}>{item.subtitle}</Text></View>
        <View style={styles.snArrow}><Ionicons name="chevron-forward" size={18} color={COLORS.white} /></View>
      </LinearGradient>
    </TouchableOpacity></Animated.View>
  );
});

// ============================================================================
// MAIN
// ============================================================================
export default function PharmacyCategories() {
  const [activeMainCat, setActiveMainCat] = useState('1');
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });
  const AScrollView = Animated.createAnimatedComponent(ScrollView);

  const currentSubCategories = activeMainCat === '1' ? WELLNESS_SUB : PERSONAL_CARE_SUB;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <AScrollView onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <CategoryHeader />

        {/* Main Categories Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shop by Category</Text>
          <View style={styles.mcGrid}>{MAIN_CATEGORIES.map((item, i) => <MainCategoryCard key={item.id} item={item} index={i} onPress={setActiveMainCat} />)}</View>
        </View>

        {/* Sub Categories */}
        <View style={styles.section}>
          <View style={styles.sectionRow}><Text style={styles.sectionTitle}>{activeMainCat === '1' ? 'Wellness' : 'Personal Care'} Sub-categories</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
          {currentSubCategories.map((item, i) => <SubCategoryCard key={item.id} item={item} index={i} />)}
        </View>

        {/* Trending */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending in Categories</Text>
          <FlatList data={TRENDING_IN_CATEGORY} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <TrendingCard item={item} index={index} />} contentContainerStyle={styles.trList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
        </View>

        {/* Lifestyle Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle Categories</Text>
          <Text style={styles.sectionSub}>Shop by health condition</Text>
          {LIFESTYLE_CATEGORIES.map((item, i) => <LifestyleCard key={item.id} item={item} index={i} />)}
        </View>

        {/* Top Brands */}
        <View style={styles.section}>
          <View style={styles.sectionRow}><Text style={styles.sectionTitle}>Top Brands</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
          <View style={styles.brGrid}>{TOP_BRANDS_CAT.map((item, i) => <BrandChip key={item.id} item={item} index={i} />)}</View>
        </View>

        {/* Seasonal Picks */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seasonal Picks</Text>
          <FlatList data={SEASONAL_PICKS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <SeasonalCard item={item} index={index} />} contentContainerStyle={styles.snList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
        </View>

        {/* Explore Banner */}
        <View style={styles.exploreBanner}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.exploreGrad}>
          <Ionicons name="grid" size={36} color={COLORS.white} />
          <View style={styles.exploreText}><Text style={styles.exploreTitle}>Explore All Categories</Text><Text style={styles.exploreSub}>2,500+ products across 50+ categories</Text></View>
          <TouchableOpacity style={styles.exploreBtn}><Text style={styles.exploreBtnText}>BROWSE</Text></TouchableOpacity>
        </LinearGradient></View>

        <View style={{ height: 40 }} />
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
  headerWrap: { marginBottom: SPACING.md },
  headerGrad: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: RADIUS.xxl, borderBottomRightRadius: RADIUS.xxl },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.white },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  headerBtn: { padding: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full },
  catStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: RADIUS.lg, paddingVertical: SPACING.md },
  catStat: { alignItems: 'center' },
  catStatNum: { fontSize: 16, fontWeight: '800', color: '#FFD700' },
  catStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  catStatDiv: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },
  section: { marginBottom: SPACING.xl, paddingHorizontal: SPACING.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.md },
  sectionSub: { fontSize: 12, color: COLORS.textTertiary, marginBottom: SPACING.md, marginTop: -SPACING.sm },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  viewAll: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { fontSize: 12, fontWeight: '600', color: COLORS.primary, marginRight: 2 },
  // Main Categories Grid
  mcGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  mcCard: { width: '23%', marginBottom: SPACING.lg },
  mcInner: { alignItems: 'center' },
  mcIconWrap: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 }, android: { elevation: 4 } }) },
  mcName: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 1 },
  mcCount: { fontSize: 9, color: COLORS.textTertiary, textAlign: 'center' },
  // Sub Category
  scCard: { marginBottom: SPACING.sm },
  scInner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 1 } }) },
  scIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  scText: { flex: 1 },
  scName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  scProd: { fontSize: 11, color: COLORS.textTertiary, marginTop: 1 },
  // Trending
  trList: { paddingVertical: SPACING.sm },
  trCard: { width: 145 },
  trInner: { borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', position: 'relative', minHeight: 170 },
  trTag: { position: 'absolute', top: SPACING.sm, left: SPACING.sm, backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  trTagText: { color: COLORS.white, fontSize: 8, fontWeight: '800' },
  trIconWrap: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.lg, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  trName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: SPACING.xs },
  trDiscBadge: { borderRadius: RADIUS.xs, overflow: 'hidden', marginBottom: SPACING.sm },
  trDiscGrad: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.xs },
  trDiscText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  trShopBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: RADIUS.sm },
  trShopText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
  // Lifestyle
  lsCard: { marginBottom: SPACING.sm },
  lsInner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 1 } }) },
  lsIcon: { width: 48, height: 48, borderRadius: RADIUS.md, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  lsText: { flex: 1 },
  lsName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  lsDesc: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  lsArrow: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  // Brands
  brGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  brCard: { width: '31%', marginBottom: SPACING.md },
  brInner: { alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 1 } }) },
  brIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs },
  brName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center' },
  brProd: { fontSize: 10, color: COLORS.textTertiary, textAlign: 'center', marginTop: 1 },
  // Seasonal
  snList: { paddingVertical: SPACING.sm },
  snCard: { width: SCREEN_WIDTH - 80 },
  snGrad: { borderRadius: RADIUS.lg, padding: SPACING.xl, flexDirection: 'row', alignItems: 'center', minHeight: 80 },
  snText: { flex: 1, marginLeft: SPACING.md },
  snName: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  snSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  snArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  // Explore Banner
  exploreBanner: { marginHorizontal: SPACING.lg, borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.xl },
  exploreGrad: { flexDirection: 'row', alignItems: 'center', padding: SPACING.xl },
  exploreText: { flex: 1, marginLeft: SPACING.md },
  exploreTitle: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  exploreSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  exploreBtn: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.sm },
  exploreBtnText: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },
});
