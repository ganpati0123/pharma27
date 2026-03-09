/**
 * APOLLO 24|7 CONCERNS TAB - Health Concerns & Lifestyle Categories
 */
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView } from 'react-native';
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
const CONCERN_TABS = [
  { id: 'all', label: 'All' },
  { id: 'chronic', label: 'Chronic' },
  { id: 'lifestyle', label: 'Lifestyle' },
  { id: 'seasonal', label: 'Seasonal' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
];

const HEALTH_CONCERNS = [
  { id: '1', name: 'Diabetes Care', icon: 'water-outline', color: '#E3F2FD', bgColor: '#1565C0', products: 120, desc: 'Monitor & manage blood sugar', type: 'chronic' },
  { id: '2', name: 'Heart Health', icon: 'heart-outline', color: '#FCE4EC', bgColor: '#C62828', products: 85, desc: 'Cardiovascular wellness', type: 'chronic' },
  { id: '3', name: 'Acidity & Gas', icon: 'flame-outline', color: '#FFF3E0', bgColor: '#EF6C00', products: 65, desc: 'Digestive comfort solutions', type: 'lifestyle' },
  { id: '4', name: 'Joint & Bone', icon: 'body-outline', color: '#F3E5F5', bgColor: '#7B1FA2', products: 90, desc: 'Mobility & bone strength', type: 'chronic' },
  { id: '5', name: 'Cold & Cough', icon: 'snow-outline', color: '#E1F5FE', bgColor: '#0288D1', products: 75, desc: 'Respiratory relief', type: 'seasonal' },
  { id: '6', name: 'Immunity', icon: 'shield-outline', color: '#E8F5E9', bgColor: '#2E7D32', products: 110, desc: 'Strengthen your defense', type: 'lifestyle' },
  { id: '7', name: 'Skin Problems', icon: 'flower-outline', color: '#FFF8E1', bgColor: '#F9A825', products: 95, desc: 'Clear & healthy skin', type: 'lifestyle' },
  { id: '8', name: 'Hair Loss', icon: 'cut-outline', color: '#F3E5F5', bgColor: '#6A1B9A', products: 60, desc: 'Hair growth & care', type: 'lifestyle' },
  { id: '9', name: 'Eye Care', icon: 'eye-outline', color: '#E3F2FD', bgColor: '#1976D2', products: 40, desc: 'Vision & eye health', type: 'chronic' },
  { id: '10', name: 'Thyroid', icon: 'fitness-outline', color: '#E0F2F1', bgColor: '#00796B', products: 35, desc: 'Thyroid management', type: 'chronic' },
  { id: '11', name: 'PCOD/PCOS', icon: 'woman-outline', color: '#FCE4EC', bgColor: '#AD1457', products: 50, desc: 'Hormonal balance', type: 'women' },
  { id: '12', name: 'Erectile Health', icon: 'man-outline', color: '#E8EAF6', bgColor: '#283593', products: 30, desc: 'Men intimate wellness', type: 'men' },
];

const LIFESTYLE_CONCERNS = [
  { id: '1', name: 'Weight Loss', icon: 'scale-outline', color: '#E8F5E9', gradColors: ['#22C55E', '#16A34A'], desc: 'Healthy weight management', products: 150 },
  { id: '2', name: 'Stress & Anxiety', icon: 'thunderstorm-outline', color: '#F3E5F5', gradColors: ['#8B5CF6', '#7C3AED'], desc: 'Mental wellness solutions', products: 80 },
  { id: '3', name: 'Sleep Issues', icon: 'moon-outline', color: '#E3F2FD', gradColors: ['#3B82F6', '#2563EB'], desc: 'Better sleep naturally', products: 60 },
  { id: '4', name: 'Low Energy', icon: 'flash-outline', color: '#FFF3E0', gradColors: ['#F97316', '#EA580C'], desc: 'Energy boosting products', products: 90 },
  { id: '5', name: 'Digestive Issues', icon: 'restaurant-outline', color: '#FFF8E1', gradColors: ['#F59E0B', '#D97706'], desc: 'Gut health & digestion', products: 70 },
  { id: '6', name: 'Allergies', icon: 'alert-circle-outline', color: '#FCE4EC', gradColors: ['#EC4899', '#DB2777'], desc: 'Allergy relief products', products: 45 },
];

const FEATURED_SOLUTIONS = [
  { id: '1', concern: 'Diabetes', name: 'Apollo Sugar Smart Kit', price: 1299, mrp: 1999, items: 5, icon: 'water-outline', color: '#E3F2FD' },
  { id: '2', concern: 'Heart Health', name: 'CardioWell Bundle', price: 999, mrp: 1499, items: 4, icon: 'heart-outline', color: '#FCE4EC' },
  { id: '3', concern: 'Immunity', name: 'Immunity Power Pack', price: 799, mrp: 1199, items: 6, icon: 'shield-outline', color: '#E8F5E9' },
  { id: '4', concern: 'Joint Care', name: 'Joint Flex Bundle', price: 1099, mrp: 1599, items: 3, icon: 'body-outline', color: '#F3E5F5' },
];

const EXPERT_TIPS = [
  { id: '1', title: '5 Ways to Manage Diabetes Naturally', icon: 'book-outline', category: 'Diabetes', readTime: '5 min read', color: '#E3F2FD' },
  { id: '2', title: 'Heart-Healthy Foods You Should Eat', icon: 'book-outline', category: 'Heart Health', readTime: '4 min read', color: '#FCE4EC' },
  { id: '3', title: 'Boost Your Immunity This Winter', icon: 'book-outline', category: 'Immunity', readTime: '3 min read', color: '#E8F5E9' },
  { id: '4', title: 'Managing Joint Pain at Home', icon: 'book-outline', category: 'Joint Care', readTime: '6 min read', color: '#F3E5F5' },
];

const QUICK_CONSULT = [
  { id: '1', name: 'General Physician', icon: 'person-outline', color: '#E8F5E9', price: 199 },
  { id: '2', name: 'Dermatologist', icon: 'flower-outline', color: '#FCE4EC', price: 299 },
  { id: '3', name: 'Diabetologist', icon: 'water-outline', color: '#E3F2FD', price: 349 },
  { id: '4', name: 'Cardiologist', icon: 'heart-outline', color: '#FFF3E0', price: 399 },
];

// ============================================================================
// COMPONENTS
// ============================================================================
const ConcernsHeader = React.memo(() => {
  const op = useSharedValue(0); const sc = useSharedValue(0.95);
  useEffect(() => { op.value = withTiming(1, { duration: 600 }); sc.value = withSpring(1, { damping: 15 }); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.headerWrap, a]}>
      <LinearGradient colors={['#0F847E', '#0A6B66']} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <View><Text style={styles.headerTitle}>Health Concerns</Text><Text style={styles.headerSub}>Find solutions for your health needs</Text></View>
          <TouchableOpacity style={styles.headerBtn}><Ionicons name="search" size={22} color={COLORS.white} /></TouchableOpacity>
        </View>
        <View style={styles.hStats}>
          <View style={styles.hStat}><Ionicons name="medical-outline" size={18} color="#FFD700" /><Text style={styles.hStatNum}>12+</Text><Text style={styles.hStatLabel}>Concerns</Text></View>
          <View style={styles.hStatDiv} />
          <View style={styles.hStat}><Ionicons name="cube-outline" size={18} color="#FFD700" /><Text style={styles.hStatNum}>1,000+</Text><Text style={styles.hStatLabel}>Products</Text></View>
          <View style={styles.hStatDiv} />
          <View style={styles.hStat}><Ionicons name="people-outline" size={18} color="#FFD700" /><Text style={styles.hStatNum}>500+</Text><Text style={styles.hStatLabel}>Experts</Text></View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

const ConcernTabChip = React.memo(({ item, active, onPress, index }) => {
  const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 50, withTiming(1, { duration: 300 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value }));
  return (
    <Animated.View style={a}><TouchableOpacity onPress={() => onPress(item.id)} style={[styles.ctChip, active && styles.ctChipActive]}>
      <Text style={[styles.ctText, active && styles.ctTextActive]}>{item.label}</Text>
    </TouchableOpacity></Animated.View>
  );
});

const ConcernGridCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.8); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.cgCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.cgInner}>
      <View style={[styles.cgIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={28} color={item.bgColor} /></View>
      <Text style={styles.cgName}>{item.name}</Text>
      <Text style={styles.cgDesc} numberOfLines={1}>{item.desc}</Text>
      <View style={styles.cgBottom}><Text style={styles.cgProd}>{item.products} products</Text><Ionicons name="chevron-forward" size={14} color={COLORS.primary} /></View>
    </TouchableOpacity></Animated.View>
  );
});

const LifestyleConcernCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.lcCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.lcInner}>
      <LinearGradient colors={item.gradColors} style={styles.lcIconWrap}><Ionicons name={item.icon} size={24} color={COLORS.white} /></LinearGradient>
      <View style={styles.lcText}><Text style={styles.lcName}>{item.name}</Text><Text style={styles.lcDesc}>{item.desc}</Text></View>
      <View style={styles.lcRight}><Text style={styles.lcProd}>{item.products}</Text><Text style={styles.lcProdLabel}>items</Text></View>
    </TouchableOpacity></Animated.View>
  );
});

const FeaturedSolutionCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (
    <Animated.View style={[styles.fsCard, a]}><View style={[styles.fsInner, { backgroundColor: item.color }]}>
      <View style={styles.fsBadge}><Text style={styles.fsBadgeText}>{item.concern}</Text></View>
      <View style={styles.fsIcon}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View>
      <Text style={styles.fsName}>{item.name}</Text>
      <Text style={styles.fsItems}>{item.items} items included</Text>
      <View style={styles.fsPriceRow}><Text style={styles.fsPrice}>&#8377;{item.price}</Text><Text style={styles.fsMrp}>&#8377;{item.mrp}</Text></View>
      <View style={styles.fsDiscBadge}><LinearGradient colors={['#FF6B35', '#FF8F5E']} style={styles.fsDiscGrad}><Text style={styles.fsDiscText}>{disc}% OFF</Text></LinearGradient></View>
      <TouchableOpacity style={styles.fsAddBtn}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.fsAddGrad}><Text style={styles.fsAddText}>ADD BUNDLE</Text></LinearGradient></TouchableOpacity>
    </View></Animated.View>
  );
});

const ExpertTipCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.etCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.etInner}>
      <View style={[styles.etIconWrap, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={24} color={COLORS.primary} /></View>
      <View style={styles.etContent}><Text style={styles.etCat}>{item.category}</Text><Text style={styles.etTitle} numberOfLines={2}>{item.title}</Text><Text style={styles.etRead}>{item.readTime}</Text></View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
    </TouchableOpacity></Animated.View>
  );
});

const QuickConsultCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.qcCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.qcInner}>
      <View style={[styles.qcIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={24} color={COLORS.primary} /></View>
      <Text style={styles.qcName}>{item.name}</Text>
      <Text style={styles.qcPrice}>&#8377;{item.price}</Text>
      <TouchableOpacity style={styles.qcBtn}><Text style={styles.qcBtnText}>CONSULT</Text></TouchableOpacity>
    </TouchableOpacity></Animated.View>
  );
});

// ============================================================================
// MAIN
// ============================================================================
export default function Concerns() {
  const [activeTab, setActiveTab] = useState('all');
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });
  const AScrollView = Animated.createAnimatedComponent(ScrollView);

  const filteredConcerns = activeTab === 'all' ? HEALTH_CONCERNS : HEALTH_CONCERNS.filter(c => c.type === activeTab);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <AScrollView onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ConcernsHeader />

        {/* Filter Tabs */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.ctRow}>
            {CONCERN_TABS.map((item, i) => <ConcernTabChip key={item.id} item={item} active={activeTab === item.id} onPress={setActiveTab} index={i} />)}
          </ScrollView>
        </View>

        {/* Health Concerns Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Concerns</Text>
          <View style={styles.cgGrid}>{filteredConcerns.map((item, i) => <ConcernGridCard key={item.id} item={item} index={i} />)}</View>
        </View>

        {/* Lifestyle Concerns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Lifestyle Concerns</Text>
          <Text style={styles.sectionSub}>Address your daily health challenges</Text>
          {LIFESTYLE_CONCERNS.map((item, i) => <LifestyleConcernCard key={item.id} item={item} index={i} />)}
        </View>

        {/* Featured Solutions */}
        <View style={styles.section}>
          <View style={styles.sectionRow}><Text style={styles.sectionTitle}>Featured Health Bundles</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
          <FlatList data={FEATURED_SOLUTIONS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <FeaturedSolutionCard item={item} index={index} />} contentContainerStyle={styles.fsList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
        </View>

        {/* Expert Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expert Health Tips</Text>
          {EXPERT_TIPS.map((item, i) => <ExpertTipCard key={item.id} item={item} index={i} />)}
        </View>

        {/* Quick Consult */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Doctor Consult</Text>
          <Text style={styles.sectionSub}>Get expert advice for your concerns</Text>
          <View style={styles.qcGrid}>{QUICK_CONSULT.map((item, i) => <QuickConsultCard key={item.id} item={item} index={i} />)}</View>
        </View>

        {/* Consult CTA */}
        <View style={styles.consultBanner}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.consultGrad}>
          <Ionicons name="chatbubbles" size={32} color={COLORS.white} />
          <View style={styles.consultText}><Text style={styles.consultTitle}>Not sure about your concern?</Text><Text style={styles.consultSub}>Talk to our health experts for guidance</Text></View>
          <TouchableOpacity style={styles.consultBtn}><Text style={styles.consultBtnText}>ASK NOW</Text></TouchableOpacity>
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
  hStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: RADIUS.lg, paddingVertical: SPACING.md },
  hStat: { alignItems: 'center' },
  hStatNum: { fontSize: 14, fontWeight: '800', color: '#FFD700', marginTop: 2 },
  hStatLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  hStatDiv: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)' },
  section: { marginBottom: SPACING.xl, paddingHorizontal: SPACING.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.md },
  sectionSub: { fontSize: 12, color: COLORS.textTertiary, marginBottom: SPACING.md, marginTop: -SPACING.sm },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  viewAll: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { fontSize: 12, fontWeight: '600', color: COLORS.primary, marginRight: 2 },
  // Concern Tabs
  ctRow: { paddingVertical: SPACING.sm },
  ctChip: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, marginRight: SPACING.sm, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  ctChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  ctText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  ctTextActive: { color: COLORS.white },
  // Concern Grid
  cgGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cgCard: { width: '48%', marginBottom: SPACING.md },
  cgInner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 }, android: { elevation: 2 } }) },
  cgIcon: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  cgName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 2 },
  cgDesc: { fontSize: 11, color: COLORS.textTertiary, marginBottom: SPACING.sm },
  cgBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cgProd: { fontSize: 11, fontWeight: '600', color: COLORS.primary },
  // Lifestyle
  lcCard: { marginBottom: SPACING.sm },
  lcInner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 1 } }) },
  lcIconWrap: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  lcText: { flex: 1 },
  lcName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  lcDesc: { fontSize: 11, color: COLORS.textTertiary, marginTop: 1 },
  lcRight: { alignItems: 'center', marginLeft: SPACING.sm },
  lcProd: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
  lcProdLabel: { fontSize: 9, color: COLORS.textTertiary },
  // Featured Solutions
  fsList: { paddingVertical: SPACING.sm },
  fsCard: { width: 170 },
  fsInner: { borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', position: 'relative', minHeight: 220 },
  fsBadge: { position: 'absolute', top: SPACING.sm, left: SPACING.sm, backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  fsBadgeText: { color: COLORS.white, fontSize: 9, fontWeight: '800' },
  fsIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.xl, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  fsName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  fsItems: { fontSize: 10, color: COLORS.textTertiary, marginBottom: SPACING.xs },
  fsPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  fsPrice: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  fsMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  fsDiscBadge: { borderRadius: RADIUS.xs, overflow: 'hidden', marginBottom: SPACING.sm },
  fsDiscGrad: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  fsDiscText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  fsAddBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  fsAddGrad: { paddingHorizontal: SPACING.lg, paddingVertical: 6, borderRadius: RADIUS.sm },
  fsAddText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  // Expert Tips
  etCard: { marginBottom: SPACING.sm },
  etInner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 1 } }) },
  etIconWrap: { width: 48, height: 48, borderRadius: RADIUS.md, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  etContent: { flex: 1 },
  etCat: { fontSize: 10, fontWeight: '700', color: COLORS.primary, marginBottom: 2, textTransform: 'uppercase' },
  etTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, lineHeight: 18 },
  etRead: { fontSize: 10, color: COLORS.textTertiary, marginTop: 2 },
  // Quick Consult
  qcGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  qcCard: { width: '48%', marginBottom: SPACING.md },
  qcInner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 }, android: { elevation: 2 } }) },
  qcIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  qcName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  qcPrice: { fontSize: 12, color: COLORS.textTertiary, marginBottom: SPACING.sm },
  qcBtn: { backgroundColor: COLORS.primary, paddingHorizontal: SPACING.lg, paddingVertical: 6, borderRadius: RADIUS.sm },
  qcBtnText: { color: COLORS.white, fontSize: 11, fontWeight: '700' },
  // Consult Banner
  consultBanner: { marginHorizontal: SPACING.lg, borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.xl },
  consultGrad: { flexDirection: 'row', alignItems: 'center', padding: SPACING.xl },
  consultText: { flex: 1, marginLeft: SPACING.md },
  consultTitle: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  consultSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  consultBtn: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.sm },
  consultBtnText: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },
});
