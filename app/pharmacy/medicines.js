/**
 * APOLLO 24|7 MEDICINES TAB - Premium Medicine Browse & Search
 */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, withSequence, withRepeat, interpolate, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLORS = {
  primary: '#0F847E', primaryDark: '#0A6B66', primaryLight: '#E8F5F4',
  accent: '#FF6B35', accentLight: '#FFF3ED', gold: '#D4A843',
  white: '#FFFFFF', background: '#F5F7FA', cardWhite: '#FFFFFF',
  textPrimary: '#1A1D29', textSecondary: '#4A5568', textTertiary: '#8892A5',
  border: '#E8ECF1', success: '#22C55E', error: '#EF4444', errorLight: '#FEF2F2',
  purple: '#8B5CF6', blue: '#3B82F6', orange: '#F97316', pink: '#EC4899',
};
const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
const RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, full: 999 };

// ============================================================================
// DATA
// ============================================================================
const MEDICINE_CATEGORIES = [
  { id: '1', name: 'All', icon: 'grid-outline', active: true },
  { id: '2', name: 'Prescription', icon: 'document-text-outline', active: false },
  { id: '3', name: 'OTC', icon: 'cart-outline', active: false },
  { id: '4', name: 'Ayurvedic', icon: 'leaf-outline', active: false },
  { id: '5', name: 'Homeopathy', icon: 'flask-outline', active: false },
  { id: '6', name: 'Vitamins', icon: 'sunny-outline', active: false },
];

const TOP_MEDICINES = [
  { id: '1', name: 'Dolo 650mg Tablet', brand: 'Micro Labs', form: 'Strip of 15 Tablets', price: 32.40, mrp: 36.00, rating: 4.8, reviews: 12400, delivery: 'By 11:30 PM Today', icon: 'medical', prescription: false, bestseller: true },
  { id: '2', name: 'Crocin Advance 500mg', brand: 'GSK Pharma', form: 'Strip of 20 Tablets', price: 28.60, mrp: 34.00, rating: 4.7, reviews: 8900, delivery: 'By 11:30 PM Today', icon: 'fitness', prescription: false, bestseller: true },
  { id: '3', name: 'Shelcal 500mg Tablet', brand: 'Torrent Pharma', form: 'Strip of 15 Tablets', price: 114.80, mrp: 135.00, rating: 4.5, reviews: 5600, delivery: 'By Tomorrow 10 AM', icon: 'leaf', prescription: false, bestseller: false },
  { id: '4', name: 'Pan 40mg Tablet', brand: 'Alkem Labs', form: 'Strip of 15 Tablets', price: 78.50, mrp: 92.00, rating: 4.6, reviews: 7800, delivery: 'By 11:30 PM Today', icon: 'flask', prescription: true, bestseller: false },
  { id: '5', name: 'Azithromycin 500mg', brand: 'Cipla', form: 'Strip of 3 Tablets', price: 67.20, mrp: 79.00, rating: 4.4, reviews: 6200, delivery: 'By Tomorrow 10 AM', icon: 'medkit', prescription: true, bestseller: false },
  { id: '6', name: 'Vitamin D3 60K IU', brand: 'USV Limited', form: 'Strip of 4 Capsules', price: 120.00, mrp: 150.00, rating: 4.9, reviews: 15000, delivery: 'By 11:30 PM Today', icon: 'sunny', prescription: false, bestseller: true },
  { id: '7', name: 'Cetirizine 10mg', brand: 'Dr Reddys', form: 'Strip of 10 Tablets', price: 18.50, mrp: 22.00, rating: 4.3, reviews: 4500, delivery: 'By 11:30 PM Today', icon: 'water', prescription: false, bestseller: false },
  { id: '8', name: 'Amoxicillin 500mg', brand: 'Cipla', form: 'Strip of 15 Capsules', price: 89.00, mrp: 105.00, rating: 4.5, reviews: 7100, delivery: 'By Tomorrow 10 AM', icon: 'medical', prescription: true, bestseller: false },
  { id: '9', name: 'Pantoprazole 40mg', brand: 'Sun Pharma', form: 'Strip of 15 Tablets', price: 85.00, mrp: 100.00, rating: 4.6, reviews: 5800, delivery: 'By 11:30 PM Today', icon: 'flask', prescription: true, bestseller: false },
  { id: '10', name: 'Metformin 500mg', brand: 'USV Limited', form: 'Strip of 20 Tablets', price: 25.00, mrp: 32.00, rating: 4.7, reviews: 9200, delivery: 'By Tomorrow 10 AM', icon: 'fitness', prescription: true, bestseller: true },
];

const QUICK_ORDER_ITEMS = [
  { id: '1', name: 'Upload Prescription', icon: 'camera-outline', color: '#E8F5E9', desc: 'Get medicines delivered' },
  { id: '2', name: 'My Orders', icon: 'receipt-outline', color: '#E3F2FD', desc: 'Track your orders' },
  { id: '3', name: 'Medicine Reminders', icon: 'alarm-outline', color: '#FFF3E0', desc: 'Never miss a dose' },
  { id: '4', name: 'Health Records', icon: 'document-text-outline', color: '#F3E5F5', desc: 'Store prescriptions' },
];

const POPULAR_SEARCHES = ['Dolo 650', 'Crocin', 'Vitamin D3', 'Paracetamol', 'Azithromycin', 'Cetirizine', 'Amoxicillin', 'Shelcal'];

const FEATURED_OFFERS = [
  { id: '1', title: 'Flat 20% OFF', subtitle: 'On all prescription medicines', color: '#E8F5E9', icon: 'pricetag-outline' },
  { id: '2', title: 'Buy 2 Get 1 Free', subtitle: 'On selected vitamins', color: '#FFF3E0', icon: 'gift-outline' },
  { id: '3', title: 'Free Delivery', subtitle: 'On orders above ₹499', color: '#E3F2FD', icon: 'car-outline' },
];

const HEALTH_PACKS = [
  { id: '1', name: 'Diabetes Care Pack', items: 5, price: 899, mrp: 1299, icon: 'water-outline', color: '#E3F2FD' },
  { id: '2', name: 'Heart Health Pack', items: 4, price: 1199, mrp: 1699, icon: 'heart-outline', color: '#FCE4EC' },
  { id: '3', name: 'Immunity Booster Pack', items: 6, price: 749, mrp: 1099, icon: 'shield-outline', color: '#E8F5E9' },
  { id: '4', name: 'Joint Care Pack', items: 3, price: 599, mrp: 899, icon: 'body-outline', color: '#F3E5F5' },
];

// ============================================================================
// COMPONENTS
// ============================================================================
const MedicineHeader = React.memo(() => {
  const headerOp = useSharedValue(0); const headerSc = useSharedValue(0.95);
  useEffect(() => { headerOp.value = withTiming(1, { duration: 600 }); headerSc.value = withSpring(1, { damping: 15 }); }, []);
  const hs = useAnimatedStyle(() => ({ opacity: headerOp.value, transform: [{ scale: headerSc.value }] }));
  return (
    <Animated.View style={[styles.headerWrap, hs]}>
      <LinearGradient colors={['#0F847E', '#0A6B66']} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <View><Text style={styles.headerTitle}>Medicines</Text><Text style={styles.headerSub}>Order medicines with ease</Text></View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerBtn}><Ionicons name="notifications-outline" size={22} color={COLORS.white} /></TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}><Ionicons name="cart-outline" size={22} color={COLORS.white} /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textTertiary} />
          <TextInput style={styles.searchInput} placeholder="Search medicines, health products..." placeholderTextColor={COLORS.textTertiary} />
          <TouchableOpacity style={styles.searchCam}><Ionicons name="camera-outline" size={20} color={COLORS.primary} /></TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

const QuickOrderCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.8); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.qoCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.qoInner}>
      <View style={[styles.qoIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={24} color={COLORS.primary} /></View>
      <Text style={styles.qoName}>{item.name}</Text><Text style={styles.qoDesc}>{item.desc}</Text>
    </TouchableOpacity></Animated.View>
  );
});

const PopularSearchChip = React.memo(({ text, index }) => {
  const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 50, withTiming(1, { duration: 300 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value }));
  return (<Animated.View style={a}><TouchableOpacity style={styles.psChip}><Ionicons name="search-outline" size={14} color={COLORS.textTertiary} /><Text style={styles.psText}>{text}</Text></TouchableOpacity></Animated.View>);
});

const CategoryChip = React.memo(({ item, active, onPress, index }) => {
  const sc = useSharedValue(0.8); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 300 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={a}><TouchableOpacity onPress={() => onPress(item.id)} style={[styles.catChip, active && styles.catChipActive]}>
      <Ionicons name={item.icon} size={16} color={active ? COLORS.white : COLORS.textSecondary} />
      <Text style={[styles.catText, active && styles.catTextActive]}>{item.name}</Text>
    </TouchableOpacity></Animated.View>
  );
});

const FeaturedOfferCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.foCard, a]}><View style={[styles.foInner, { backgroundColor: item.color }]}>
      <Ionicons name={item.icon} size={28} color={COLORS.primary} />
      <Text style={styles.foTitle}>{item.title}</Text><Text style={styles.foSub}>{item.subtitle}</Text>
    </View></Animated.View>
  );
});

const MedicineCard = React.memo(({ item, index, isGrid }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0); const [qty, setQty] = useState(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);

  if (isGrid) {
    return (
      <Animated.View style={[styles.mgCard, a]}><View style={styles.mgInner}>
        {item.bestseller && <View style={styles.bsBadge}><Text style={styles.bsBadgeText}>BESTSELLER</Text></View>}
        {item.prescription && <View style={styles.rxBadge}><Ionicons name="document-text" size={10} color={COLORS.white} /><Text style={styles.rxBadgeText}>Rx</Text></View>}
        {disc > 0 && <View style={styles.discBadge}><Text style={styles.discText}>{disc}% OFF</Text></View>}
        <View style={styles.mgIconWrap}><LinearGradient colors={[COLORS.primaryLight, '#D4F1EF']} style={styles.mgIconGrad}><Ionicons name={item.icon} size={32} color={COLORS.primary} /></LinearGradient></View>
        <Text style={styles.mgName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.mgBrand}>{item.brand}</Text>
        <Text style={styles.mgForm}>{item.form}</Text>
        <View style={styles.mgRating}><Ionicons name="star" size={10} color="#FFD700" /><Text style={styles.mgRatingText}>{item.rating}</Text><Text style={styles.mgReviews}>({item.reviews > 1000 ? `${(item.reviews / 1000).toFixed(1)}k` : item.reviews})</Text></View>
        <View style={styles.mgPriceRow}><Text style={styles.mgPrice}>&#8377;{item.price.toFixed(1)}</Text><Text style={styles.mgMrp}>&#8377;{item.mrp.toFixed(0)}</Text></View>
        <View style={styles.mgDelivery}><Ionicons name="time-outline" size={10} color={COLORS.primary} /><Text style={styles.mgDeliveryText}>{item.delivery}</Text></View>
        {qty === 0 ? <TouchableOpacity style={styles.mgAddBtn} onPress={() => setQty(1)}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.mgAddGrad}><Text style={styles.mgAddText}>ADD</Text></LinearGradient></TouchableOpacity> :
          <View style={styles.mgQtyRow}><TouchableOpacity onPress={() => setQty(Math.max(0, qty - 1))} style={styles.mgQtyBtn}><Ionicons name="remove" size={14} color={COLORS.primary} /></TouchableOpacity><Text style={styles.mgQtyText}>{qty}</Text><TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.mgQtyBtn}><Ionicons name="add" size={14} color={COLORS.primary} /></TouchableOpacity></View>}
      </View></Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.mlCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.mlInner}>
      <View style={styles.mlLeft}>
        <LinearGradient colors={[COLORS.primaryLight, '#D4F1EF']} style={styles.mlIconGrad}><Ionicons name={item.icon} size={32} color={COLORS.primary} /></LinearGradient>
        {item.bestseller && <View style={styles.mlBsBadge}><Text style={styles.mlBsText}>BESTSELLER</Text></View>}
      </View>
      <View style={styles.mlContent}>
        <View style={styles.mlRow1}><Text style={styles.mlName} numberOfLines={1}>{item.name}</Text>{item.prescription && <View style={styles.mlRxBadge}><Text style={styles.mlRxText}>Rx</Text></View>}</View>
        <Text style={styles.mlBrand}>{item.brand} | {item.form}</Text>
        <View style={styles.mlRating}><Ionicons name="star" size={10} color="#FFD700" /><Text style={styles.mlRatingText}>{item.rating}</Text><Text style={styles.mlReviews}>({item.reviews > 1000 ? `${(item.reviews / 1000).toFixed(1)}k` : item.reviews})</Text></View>
        <View style={styles.mlBottomRow}>
          <View><View style={styles.mlPriceRow}><Text style={styles.mlPrice}>&#8377;{item.price.toFixed(1)}</Text><Text style={styles.mlMrp}>&#8377;{item.mrp.toFixed(0)}</Text>{disc > 0 && <View style={styles.mlDiscBadge}><Text style={styles.mlDiscText}>{disc}% OFF</Text></View>}</View><View style={styles.mlDelivery}><Ionicons name="time-outline" size={10} color={COLORS.primary} /><Text style={styles.mlDeliveryText}>{item.delivery}</Text></View></View>
          {qty === 0 ? <TouchableOpacity style={styles.mlAddBtn} onPress={() => setQty(1)}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.mlAddGrad}><Text style={styles.mlAddBtnText}>ADD</Text></LinearGradient></TouchableOpacity> :
            <View style={styles.mlQtyRow}><TouchableOpacity onPress={() => setQty(Math.max(0, qty - 1))} style={styles.mlQtyBtn}><Ionicons name="remove" size={14} color={COLORS.primary} /></TouchableOpacity><Text style={styles.mlQtyVal}>{qty}</Text><TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.mlQtyBtn}><Ionicons name="add" size={14} color={COLORS.primary} /></TouchableOpacity></View>}
        </View>
      </View>
    </TouchableOpacity></Animated.View>
  );
});

const HealthPackCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (
    <Animated.View style={[styles.hpCard, a]}><View style={[styles.hpInner, { backgroundColor: item.color }]}>
      <View style={styles.hpIcon}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View>
      <Text style={styles.hpName}>{item.name}</Text>
      <Text style={styles.hpItems}>{item.items} essential items</Text>
      <View style={styles.hpPriceRow}><Text style={styles.hpPrice}>&#8377;{item.price}</Text><Text style={styles.hpMrp}>&#8377;{item.mrp}</Text></View>
      <View style={styles.hpDiscBadge}><Text style={styles.hpDiscText}>{disc}% OFF</Text></View>
      <TouchableOpacity style={styles.hpAddBtn}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.hpAddGrad}><Text style={styles.hpAddText}>ADD PACK</Text></LinearGradient></TouchableOpacity>
    </View></Animated.View>
  );
});

// ============================================================================
// MAIN
// ============================================================================
export default function Medicines() {
  const [viewMode, setViewMode] = useState('grid');
  const [activeCat, setActiveCat] = useState('1');
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });
  const AScrollView = Animated.createAnimatedComponent(ScrollView);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <AScrollView onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <MedicineHeader />

        {/* Quick Order */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.qoGrid}>{QUICK_ORDER_ITEMS.map((item, i) => <QuickOrderCard key={item.id} item={item} index={i} />)}</View>
        </View>

        {/* Popular Searches */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Searches</Text>
          <View style={styles.psWrap}>{POPULAR_SEARCHES.map((text, i) => <PopularSearchChip key={i} text={text} index={i} />)}</View>
        </View>

        {/* Featured Offers */}
        <FlatList data={FEATURED_OFFERS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <FeaturedOfferCard item={item} index={index} />} contentContainerStyle={styles.foList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />

        {/* Category Filter + View Toggle */}
        <View style={styles.section}>
          <View style={styles.filterRow}>
            <Text style={styles.sectionTitle}>All Medicines</Text>
            <View style={styles.viewToggle}>
              <TouchableOpacity onPress={() => setViewMode('grid')} style={[styles.viewBtn, viewMode === 'grid' && styles.viewBtnActive]}><Ionicons name="grid" size={18} color={viewMode === 'grid' ? COLORS.white : COLORS.textTertiary} /></TouchableOpacity>
              <TouchableOpacity onPress={() => setViewMode('list')} style={[styles.viewBtn, viewMode === 'list' && styles.viewBtnActive]}><Ionicons name="list" size={18} color={viewMode === 'list' ? COLORS.white : COLORS.textTertiary} /></TouchableOpacity>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catRow}>
            {MEDICINE_CATEGORIES.map((item, i) => <CategoryChip key={item.id} item={item} active={activeCat === item.id} onPress={setActiveCat} index={i} />)}
          </ScrollView>
        </View>

        {/* Medicine List/Grid */}
        <View style={styles.section}>
          {viewMode === 'grid' ? (
            <View style={styles.mgGrid}>{TOP_MEDICINES.map((item, i) => <MedicineCard key={item.id} item={item} index={i} isGrid={true} />)}</View>
          ) : (
            TOP_MEDICINES.map((item, i) => <MedicineCard key={item.id} item={item} index={i} isGrid={false} />)
          )}
        </View>

        {/* Health Packs */}
        <View style={styles.section}>
          <View style={styles.sectionRow}><Text style={styles.sectionTitle}>Health Packs</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
          <FlatList data={HEALTH_PACKS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <HealthPackCard item={item} index={index} />} contentContainerStyle={styles.hpList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
        </View>

        {/* Upload Rx Banner */}
        <View style={styles.rxBanner}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.rxBannerGrad}>
          <Ionicons name="camera" size={32} color={COLORS.white} />
          <View style={styles.rxBannerText}><Text style={styles.rxBannerTitle}>Upload Prescription</Text><Text style={styles.rxBannerSub}>Get medicines delivered to your doorstep</Text></View>
          <TouchableOpacity style={styles.rxBannerBtn}><Text style={styles.rxBannerBtnText}>UPLOAD</Text></TouchableOpacity>
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
  headerActions: { flexDirection: 'row' },
  headerBtn: { padding: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full, marginLeft: SPACING.sm },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.md, height: 44 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.textPrimary, marginLeft: SPACING.sm },
  searchCam: { padding: SPACING.xs, backgroundColor: COLORS.primaryLight, borderRadius: RADIUS.sm },
  section: { marginBottom: SPACING.xl, paddingHorizontal: SPACING.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.md },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  viewAll: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { fontSize: 12, fontWeight: '600', color: COLORS.primary, marginRight: 2 },
  qoGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  qoCard: { width: '48%', marginBottom: SPACING.md },
  qoInner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.lg, alignItems: 'center', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 }, android: { elevation: 2 } }) },
  qoIcon: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm },
  qoName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center' },
  qoDesc: { fontSize: 10, color: COLORS.textTertiary, textAlign: 'center', marginTop: 2 },
  psWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  psChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, marginRight: SPACING.sm, marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.border },
  psText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: SPACING.xs },
  foList: { paddingHorizontal: SPACING.lg, marginBottom: SPACING.xl },
  foCard: { width: 200 },
  foInner: { borderRadius: RADIUS.lg, padding: SPACING.lg, alignItems: 'center', minHeight: 100 },
  foTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginTop: SPACING.sm },
  foSub: { fontSize: 11, color: COLORS.textTertiary, textAlign: 'center', marginTop: 2 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  viewToggle: { flexDirection: 'row', backgroundColor: COLORS.border, borderRadius: RADIUS.sm, padding: 2 },
  viewBtn: { padding: SPACING.sm, borderRadius: RADIUS.xs },
  viewBtnActive: { backgroundColor: COLORS.primary },
  catRow: { paddingVertical: SPACING.sm },
  catChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, marginRight: SPACING.sm, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  catChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  catText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, marginLeft: SPACING.xs },
  catTextActive: { color: COLORS.white },
  // Grid card
  mgGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  mgCard: { width: '48%', marginBottom: SPACING.md },
  mgInner: { backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, position: 'relative', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 }, android: { elevation: 2 } }) },
  bsBadge: { position: 'absolute', top: SPACING.sm, left: SPACING.sm, backgroundColor: '#FFD700', paddingHorizontal: 6, paddingVertical: 1, borderRadius: RADIUS.xs, zIndex: 1 },
  bsBadgeText: { fontSize: 8, fontWeight: '800', color: COLORS.textPrimary },
  rxBadge: { position: 'absolute', top: SPACING.sm, right: SPACING.sm, backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs, flexDirection: 'row', alignItems: 'center', zIndex: 1 },
  rxBadgeText: { fontSize: 9, fontWeight: '800', color: COLORS.white, marginLeft: 2 },
  discBadge: { position: 'absolute', bottom: 60, left: SPACING.sm, backgroundColor: COLORS.errorLight, paddingHorizontal: 6, paddingVertical: 1, borderRadius: RADIUS.xs, zIndex: 1 },
  discText: { fontSize: 9, fontWeight: '700', color: COLORS.error },
  mgIconWrap: { alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.xl },
  mgIconGrad: { width: 60, height: 60, borderRadius: RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  mgName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 2 },
  mgBrand: { fontSize: 10, color: COLORS.textTertiary, marginBottom: 1 },
  mgForm: { fontSize: 10, color: COLORS.textTertiary, marginBottom: SPACING.xs },
  mgRating: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  mgRatingText: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary, marginLeft: 2 },
  mgReviews: { fontSize: 9, color: COLORS.textTertiary, marginLeft: 2 },
  mgPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  mgPrice: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  mgMrp: { fontSize: 10, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  mgDelivery: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.sm },
  mgDeliveryText: { fontSize: 9, color: COLORS.primary, fontWeight: '600', marginLeft: 2 },
  mgAddBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  mgAddGrad: { paddingVertical: 6, alignItems: 'center', borderRadius: RADIUS.sm },
  mgAddText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  mgQtyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primaryLight, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.primary, paddingVertical: 2 },
  mgQtyBtn: { paddingHorizontal: 10 },
  mgQtyText: { fontSize: 12, fontWeight: '700', color: COLORS.primary },
  // List card
  mlCard: { marginBottom: SPACING.md },
  mlInner: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 }, android: { elevation: 2 } }) },
  mlLeft: { alignItems: 'center', marginRight: SPACING.md },
  mlIconGrad: { width: 64, height: 64, borderRadius: RADIUS.lg, justifyContent: 'center', alignItems: 'center' },
  mlBsBadge: { backgroundColor: '#FFD700', paddingHorizontal: 4, paddingVertical: 1, borderRadius: RADIUS.xs, marginTop: SPACING.xs },
  mlBsText: { fontSize: 7, fontWeight: '800', color: COLORS.textPrimary },
  mlContent: { flex: 1 },
  mlRow1: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  mlName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, flex: 1 },
  mlRxBadge: { backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 1, borderRadius: RADIUS.xs, marginLeft: SPACING.xs },
  mlRxText: { fontSize: 9, fontWeight: '800', color: COLORS.white },
  mlBrand: { fontSize: 11, color: COLORS.textTertiary, marginBottom: SPACING.xs },
  mlRating: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.xs },
  mlRatingText: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary, marginLeft: 2 },
  mlReviews: { fontSize: 9, color: COLORS.textTertiary, marginLeft: 2 },
  mlBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  mlPriceRow: { flexDirection: 'row', alignItems: 'center' },
  mlPrice: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  mlMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  mlDiscBadge: { backgroundColor: COLORS.errorLight, paddingHorizontal: 4, paddingVertical: 1, borderRadius: RADIUS.xs, marginLeft: 4 },
  mlDiscText: { fontSize: 9, fontWeight: '700', color: COLORS.error },
  mlDelivery: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  mlDeliveryText: { fontSize: 10, color: COLORS.primary, fontWeight: '600', marginLeft: 2 },
  mlAddBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  mlAddGrad: { paddingHorizontal: SPACING.lg, paddingVertical: 6, borderRadius: RADIUS.sm },
  mlAddBtnText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  mlQtyRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primaryLight, borderRadius: RADIUS.sm, borderWidth: 1, borderColor: COLORS.primary },
  mlQtyBtn: { paddingHorizontal: 8, paddingVertical: 4 },
  mlQtyVal: { fontSize: 12, fontWeight: '700', color: COLORS.primary, marginHorizontal: 4 },
  // Health Packs
  hpList: { paddingVertical: SPACING.sm },
  hpCard: { width: 170 },
  hpInner: { borderRadius: RADIUS.lg, padding: SPACING.lg, alignItems: 'center', minHeight: 200 },
  hpIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  hpName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  hpItems: { fontSize: 11, color: COLORS.textTertiary, marginBottom: SPACING.sm },
  hpPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  hpPrice: { fontSize: 16, fontWeight: '800', color: COLORS.textPrimary },
  hpMrp: { fontSize: 12, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 6 },
  hpDiscBadge: { backgroundColor: COLORS.errorLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs, marginBottom: SPACING.sm },
  hpDiscText: { color: COLORS.error, fontSize: 10, fontWeight: '700' },
  hpAddBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  hpAddGrad: { paddingHorizontal: SPACING.xl, paddingVertical: 6, borderRadius: RADIUS.sm },
  hpAddText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  // Rx Banner
  rxBanner: { marginHorizontal: SPACING.lg, borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.xl },
  rxBannerGrad: { flexDirection: 'row', alignItems: 'center', padding: SPACING.xl },
  rxBannerText: { flex: 1, marginLeft: SPACING.md },
  rxBannerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  rxBannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  rxBannerBtn: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.sm },
  rxBannerBtnText: { color: COLORS.primary, fontSize: 12, fontWeight: '700' },
});
