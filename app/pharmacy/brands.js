/**
 * APOLLO 24|7 BRANDS TAB - Where Trusted Meets Wellness
 * Premium brand store with featured brands, A-Z directory, and exclusive offers.
 */
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, withSequence, withRepeat, interpolate, Easing } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const COLORS = {
  primary: '#0F847E', primaryDark: '#0A6B66', primaryLight: '#E8F5F4',
  accent: '#FF6B35', accentLight: '#FFF3ED', gold: '#D4A843', goldLight: '#FFF8E7',
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
const BRAND_CATEGORIES = [
  { id: 'all', label: 'All Brands' },
  { id: 'pharma', label: 'Pharma' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'ayurveda', label: 'Ayurveda' },
  { id: 'personal', label: 'Personal Care' },
  { id: 'nutrition', label: 'Nutrition' },
  { id: 'baby', label: 'Baby Care' },
];

const FEATURED_BRANDS = [
  { id: '1', name: 'Apollo Life', tagline: 'Quality You Can Trust', icon: 'medical-outline', color: '#E8F5E9', gradColors: ['#0F847E', '#0A6B66'], products: 250, rating: 4.8, category: 'pharma', featured: true, exclusive: true },
  { id: '2', name: 'Himalaya', tagline: 'Pure Herbs, Pure Care', icon: 'leaf-outline', color: '#E8F5E9', gradColors: ['#22C55E', '#16A34A'], products: 180, rating: 4.7, category: 'ayurveda', featured: true, exclusive: false },
  { id: '3', name: 'Cipla', tagline: 'Caring for Life', icon: 'medical-outline', color: '#E3F2FD', gradColors: ['#3B82F6', '#2563EB'], products: 320, rating: 4.9, category: 'pharma', featured: true, exclusive: false },
  { id: '4', name: 'Sun Pharma', tagline: 'Reaching People, Touching Lives', icon: 'sunny-outline', color: '#FFF3E0', gradColors: ['#F97316', '#EA580C'], products: 290, rating: 4.7, category: 'pharma', featured: true, exclusive: false },
  { id: '5', name: 'Dabur', tagline: 'Celebrate Life', icon: 'flask-outline', color: '#E8F5E9', gradColors: ['#84CC16', '#65A30D'], products: 200, rating: 4.6, category: 'ayurveda', featured: true, exclusive: false },
  { id: '6', name: 'Mamaearth', tagline: 'Goodness Inside', icon: 'globe-outline', color: '#FCE4EC', gradColors: ['#EC4899', '#DB2777'], products: 120, rating: 4.5, category: 'personal', featured: true, exclusive: false },
];

const ALL_BRANDS = [
  { id: 'b1', name: 'Abbott', icon: 'medical-outline', color: '#E3F2FD', products: 180, rating: 4.8, category: 'pharma', letter: 'A' },
  { id: 'b2', name: 'Alkem Labs', icon: 'flask-outline', color: '#E8F5E9', products: 150, rating: 4.6, category: 'pharma', letter: 'A' },
  { id: 'b3', name: 'Apollo Life', icon: 'medical-outline', color: '#E0F2F1', products: 250, rating: 4.8, category: 'pharma', letter: 'A' },
  { id: 'b4', name: 'Bioderma', icon: 'flower-outline', color: '#FCE4EC', products: 45, rating: 4.7, category: 'personal', letter: 'B' },
  { id: 'b5', name: 'Baidyanath', icon: 'leaf-outline', color: '#F1F8E9', products: 90, rating: 4.5, category: 'ayurveda', letter: 'B' },
  { id: 'b6', name: 'Cipla', icon: 'medical-outline', color: '#E3F2FD', products: 320, rating: 4.9, category: 'pharma', letter: 'C' },
  { id: 'b7', name: 'CeraVe', icon: 'water-outline', color: '#E0F7FA', products: 30, rating: 4.8, category: 'personal', letter: 'C' },
  { id: 'b8', name: 'Dabur', icon: 'flask-outline', color: '#E8F5E9', products: 200, rating: 4.6, category: 'ayurveda', letter: 'D' },
  { id: 'b9', name: 'Dr. Morepen', icon: 'medkit-outline', color: '#E3F2FD', products: 80, rating: 4.5, category: 'wellness', letter: 'D' },
  { id: 'b10', name: 'Ensure', icon: 'nutrition-outline', color: '#FFF3E0', products: 25, rating: 4.7, category: 'nutrition', letter: 'E' },
  { id: 'b11', name: 'Fast&Up', icon: 'flash-outline', color: '#FFF8E1', products: 40, rating: 4.6, category: 'nutrition', letter: 'F' },
  { id: 'b12', name: 'GSK', icon: 'medical-outline', color: '#E3F2FD', products: 280, rating: 4.8, category: 'pharma', letter: 'G' },
  { id: 'b13', name: 'Himalaya', icon: 'leaf-outline', color: '#E8F5E9', products: 180, rating: 4.7, category: 'ayurveda', letter: 'H' },
  { id: 'b14', name: 'Ipca Labs', icon: 'flask-outline', color: '#E3F2FD', products: 120, rating: 4.5, category: 'pharma', letter: 'I' },
  { id: 'b15', name: 'Johnson & Johnson', icon: 'happy-outline', color: '#FCE4EC', products: 95, rating: 4.6, category: 'baby', letter: 'J' },
  { id: 'b16', name: 'Kottakkal', icon: 'leaf-outline', color: '#F1F8E9', products: 70, rating: 4.4, category: 'ayurveda', letter: 'K' },
  { id: 'b17', name: 'Lupin', icon: 'medical-outline', color: '#E3F2FD', products: 200, rating: 4.7, category: 'pharma', letter: 'L' },
  { id: 'b18', name: 'Mamaearth', icon: 'globe-outline', color: '#FCE4EC', products: 120, rating: 4.5, category: 'personal', letter: 'M' },
  { id: 'b19', name: 'Mankind Pharma', icon: 'people-outline', color: '#E8EAF6', products: 240, rating: 4.6, category: 'pharma', letter: 'M' },
  { id: 'b20', name: 'Nestle', icon: 'cafe-outline', color: '#FFF3E0', products: 55, rating: 4.5, category: 'nutrition', letter: 'N' },
  { id: 'b21', name: 'Organic India', icon: 'leaf-outline', color: '#E8F5E9', products: 60, rating: 4.6, category: 'wellness', letter: 'O' },
  { id: 'b22', name: 'Patanjali', icon: 'leaf-outline', color: '#F1F8E9', products: 150, rating: 4.3, category: 'ayurveda', letter: 'P' },
  { id: 'b23', name: 'Protinex', icon: 'barbell-outline', color: '#F3E5F5', products: 20, rating: 4.5, category: 'nutrition', letter: 'P' },
  { id: 'b24', name: 'Ranbaxy', icon: 'medical-outline', color: '#E3F2FD', products: 160, rating: 4.5, category: 'pharma', letter: 'R' },
  { id: 'b25', name: 'Sun Pharma', icon: 'sunny-outline', color: '#FFF3E0', products: 290, rating: 4.7, category: 'pharma', letter: 'S' },
  { id: 'b26', name: 'Torrent Pharma', icon: 'water-outline', color: '#E0F7FA', products: 170, rating: 4.6, category: 'pharma', letter: 'T' },
  { id: 'b27', name: 'USV Limited', icon: 'fitness-outline', color: '#E8F5E9', products: 110, rating: 4.5, category: 'pharma', letter: 'U' },
  { id: 'b28', name: 'Vlcc', icon: 'sparkles-outline', color: '#FCE4EC', products: 40, rating: 4.4, category: 'personal', letter: 'V' },
  { id: 'b29', name: 'Wow Skin Science', icon: 'sparkles-outline', color: '#F3E5F5', products: 65, rating: 4.5, category: 'personal', letter: 'W' },
  { id: 'b30', name: 'Zandu', icon: 'leaf-outline', color: '#FFF8E1', products: 80, rating: 4.4, category: 'ayurveda', letter: 'Z' },
];

const BRAND_DEALS = [
  { id: '1', brand: 'Apollo Life', title: 'Flat 25% OFF', subtitle: 'On all Apollo Life products', icon: 'medical-outline', gradColors: ['#0F847E', '#0A6B66'] },
  { id: '2', brand: 'Himalaya', title: 'Buy 2 Get 1 Free', subtitle: 'On selected herbal products', icon: 'leaf-outline', gradColors: ['#22C55E', '#16A34A'] },
  { id: '3', brand: 'Cipla', title: 'Up to 30% OFF', subtitle: 'On prescription medicines', icon: 'medical-outline', gradColors: ['#3B82F6', '#2563EB'] },
];

const EXCLUSIVE_BRANDS = [
  { id: '1', name: 'Apollo Life Omega 3', price: 499, mrp: 799, brand: 'Apollo Life', icon: 'fish-outline', color: '#E0F2F1', badge: 'EXCLUSIVE' },
  { id: '2', name: 'Apollo Life Multivitamin', price: 399, mrp: 599, brand: 'Apollo Life', icon: 'sunny-outline', color: '#FFF8E1', badge: 'BESTSELLER' },
  { id: '3', name: 'Apollo Life Calcium + D3', price: 299, mrp: 450, brand: 'Apollo Life', icon: 'fitness-outline', color: '#E8F5E9', badge: 'NEW' },
  { id: '4', name: 'Apollo Life Protein Powder', price: 899, mrp: 1299, brand: 'Apollo Life', icon: 'barbell-outline', color: '#F3E5F5', badge: 'PREMIUM' },
  { id: '5', name: 'Apollo Life Immunity Kit', price: 599, mrp: 899, brand: 'Apollo Life', icon: 'shield-outline', color: '#E3F2FD', badge: 'TOP RATED' },
];

const TRENDING_BRANDS = [
  { id: '1', name: 'The Derma Co', icon: 'sparkles-outline', color: '#FCE4EC', growth: '+45%', products: 35 },
  { id: '2', name: 'Minimalist', icon: 'flask-outline', color: '#F3E5F5', growth: '+38%', products: 28 },
  { id: '3', name: 'Plum', icon: 'leaf-outline', color: '#E8F5E9', growth: '+32%', products: 42 },
  { id: '4', name: 'Dot & Key', icon: 'key-outline', color: '#FFF3E0', growth: '+28%', products: 30 },
  { id: '5', name: 'mCaffeine', icon: 'cafe-outline', color: '#FFF8E1', growth: '+25%', products: 38 },
  { id: '6', name: 'Pilgrim', icon: 'globe-outline', color: '#E3F2FD', growth: '+22%', products: 25 },
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// ============================================================================
// COMPONENTS
// ============================================================================
const BrandsHeader = React.memo(() => {
  const op = useSharedValue(0); const sc = useSharedValue(0.95);
  const shimmer = useSharedValue(-1);
  useEffect(() => {
    op.value = withTiming(1, { duration: 600 }); sc.value = withSpring(1, { damping: 15 });
    shimmer.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.linear }), -1, false);
  }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const shimmerStyle = useAnimatedStyle(() => ({ transform: [{ translateX: interpolate(shimmer.value, [-1, 1], [-SCREEN_WIDTH, SCREEN_WIDTH]) }] }));
  return (
    <Animated.View style={[styles.headerWrap, a]}>
      <LinearGradient colors={['#0F847E', '#0A6B66', '#085C57']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.headerGrad}>
        <Animated.View style={[styles.headerShimmer, shimmerStyle]}>
          <LinearGradient colors={['transparent', 'rgba(255,255,255,0.08)', 'transparent']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={StyleSheet.absoluteFill} />
        </Animated.View>
        <View style={styles.headerTop}>
          <View><Text style={styles.headerTitle}>Brand Store</Text><Text style={styles.headerSub}>Where Trusted Meets Wellness</Text></View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerBtn}><Ionicons name="search" size={22} color={COLORS.white} /></TouchableOpacity>
            <TouchableOpacity style={styles.headerBtn}><Ionicons name="heart-outline" size={22} color={COLORS.white} /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.bStats}>
          <View style={styles.bStat}><Ionicons name="pricetag-outline" size={16} color="#FFD700" /><Text style={styles.bStatNum}>500+</Text><Text style={styles.bStatLabel}>Brands</Text></View>
          <View style={styles.bStatDiv} />
          <View style={styles.bStat}><Ionicons name="cube-outline" size={16} color="#FFD700" /><Text style={styles.bStatNum}>40,000+</Text><Text style={styles.bStatLabel}>Products</Text></View>
          <View style={styles.bStatDiv} />
          <View style={styles.bStat}><Ionicons name="star-outline" size={16} color="#FFD700" /><Text style={styles.bStatNum}>100%</Text><Text style={styles.bStatLabel}>Authentic</Text></View>
        </View>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.textTertiary} />
          <TextInput style={styles.searchInput} placeholder="Search brands..." placeholderTextColor={COLORS.textTertiary} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

const BrandCategoryChip = React.memo(({ item, active, onPress, index }) => {
  const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 50, withTiming(1, { duration: 300 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value }));
  return (
    <Animated.View style={a}><TouchableOpacity onPress={() => onPress(item.id)} style={[styles.bcChip, active && styles.bcChipActive]}>
      <Text style={[styles.bcText, active && styles.bcTextActive]}>{item.label}</Text>
    </TouchableOpacity></Animated.View>
  );
});

const FeaturedBrandCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 500 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.fbCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.fbInner}>
      <LinearGradient colors={item.gradColors} style={styles.fbGrad}>
        {item.exclusive && <View style={styles.fbExBadge}><Ionicons name="diamond" size={10} color="#FFD700" /><Text style={styles.fbExText}>EXCLUSIVE</Text></View>}
        <View style={styles.fbIconWrap}><Ionicons name={item.icon} size={32} color={COLORS.white} /></View>
        <Text style={styles.fbName}>{item.name}</Text>
        <Text style={styles.fbTagline}>{item.tagline}</Text>
        <View style={styles.fbBottomRow}>
          <View style={styles.fbStat}><Text style={styles.fbStatNum}>{item.products}</Text><Text style={styles.fbStatLabel}>Products</Text></View>
          <View style={styles.fbRating}><Ionicons name="star" size={12} color="#FFD700" /><Text style={styles.fbRatingText}>{item.rating}</Text></View>
        </View>
        <TouchableOpacity style={styles.fbExploreBtn}><Text style={styles.fbExploreText}>EXPLORE</Text><Ionicons name="arrow-forward" size={14} color={COLORS.white} /></TouchableOpacity>
      </LinearGradient>
    </TouchableOpacity></Animated.View>
  );
});

const BrandDealCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 100, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 100, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.bdCard, a]}><TouchableOpacity activeOpacity={0.7}>
      <LinearGradient colors={item.gradColors} style={styles.bdGrad}>
        <Ionicons name={item.icon} size={28} color={COLORS.white} />
        <View style={styles.bdText}><Text style={styles.bdBrand}>{item.brand}</Text><Text style={styles.bdTitle}>{item.title}</Text><Text style={styles.bdSub}>{item.subtitle}</Text></View>
        <View style={styles.bdArrow}><Ionicons name="chevron-forward" size={18} color={COLORS.white} /></View>
      </LinearGradient>
    </TouchableOpacity></Animated.View>
  );
});

const ExclusiveProductCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 80, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 80, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  const disc = Math.round(((item.mrp - item.price) / item.mrp) * 100);
  return (
    <Animated.View style={[styles.epCard, a]}><View style={[styles.epInner, { backgroundColor: item.color }]}>
      <View style={styles.epBadge}><Text style={styles.epBadgeText}>{item.badge}</Text></View>
      <View style={styles.epIcon}><Ionicons name={item.icon} size={28} color={COLORS.primary} /></View>
      <Text style={styles.epName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.epBrand}>{item.brand}</Text>
      <View style={styles.epPriceRow}><Text style={styles.epPrice}>&#8377;{item.price}</Text><Text style={styles.epMrp}>&#8377;{item.mrp}</Text></View>
      <View style={styles.epDiscBadge}><LinearGradient colors={['#FF6B35', '#FF8F5E']} style={styles.epDiscGrad}><Text style={styles.epDiscText}>{disc}% OFF</Text></LinearGradient></View>
      <TouchableOpacity style={styles.epAddBtn}><LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.epAddGrad}><Text style={styles.epAddText}>ADD</Text></LinearGradient></TouchableOpacity>
    </View></Animated.View>
  );
});

const TrendingBrandCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.85); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 60, withTiming(1, { duration: 400 })); sc.value = withDelay(index * 60, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.tbCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.tbInner}>
      <View style={[styles.tbIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={22} color={COLORS.primary} /></View>
      <Text style={styles.tbName}>{item.name}</Text>
      <View style={styles.tbGrowth}><Ionicons name="trending-up" size={12} color={COLORS.success} /><Text style={styles.tbGrowthText}>{item.growth}</Text></View>
      <Text style={styles.tbProd}>{item.products} products</Text>
    </TouchableOpacity></Animated.View>
  );
});

const BrandListCard = React.memo(({ item, index }) => {
  const sc = useSharedValue(0.9); const op = useSharedValue(0);
  useEffect(() => { op.value = withDelay(index * 30, withTiming(1, { duration: 300 })); sc.value = withDelay(index * 30, withSpring(1, { damping: 12 })); }, []);
  const a = useAnimatedStyle(() => ({ opacity: op.value, transform: [{ scale: sc.value }] }));
  return (
    <Animated.View style={[styles.blCard, a]}><TouchableOpacity activeOpacity={0.7} style={styles.blInner}>
      <View style={[styles.blIcon, { backgroundColor: item.color }]}><Ionicons name={item.icon} size={20} color={COLORS.primary} /></View>
      <View style={styles.blContent}>
        <Text style={styles.blName}>{item.name}</Text>
        <View style={styles.blInfo}><Text style={styles.blProd}>{item.products} products</Text><View style={styles.blRating}><Ionicons name="star" size={10} color="#FFD700" /><Text style={styles.blRatingText}>{item.rating}</Text></View></View>
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
    </TouchableOpacity></Animated.View>
  );
});

const AlphabetBar = React.memo(({ onPress }) => (
  <View style={styles.alphaBar}>
    {ALPHABET.map(letter => (
      <TouchableOpacity key={letter} onPress={() => onPress(letter)} style={styles.alphaBtn}>
        <Text style={styles.alphaText}>{letter}</Text>
      </TouchableOpacity>
    ))}
  </View>
));

// ============================================================================
// MAIN
// ============================================================================
export default function Brands() {
  const [activeCat, setActiveCat] = useState('all');
  const [activeLetter, setActiveLetter] = useState(null);
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({ onScroll: (e) => { scrollY.value = e.contentOffset.y; } });
  const AScrollView = Animated.createAnimatedComponent(ScrollView);

  const filteredBrands = useMemo(() => {
    let brands = ALL_BRANDS;
    if (activeCat !== 'all') brands = brands.filter(b => b.category === activeCat);
    if (activeLetter) brands = brands.filter(b => b.letter === activeLetter);
    return brands;
  }, [activeCat, activeLetter]);

  const groupedBrands = useMemo(() => {
    const groups = {};
    filteredBrands.forEach(b => {
      if (!groups[b.letter]) groups[b.letter] = [];
      groups[b.letter].push(b);
    });
    return groups;
  }, [filteredBrands]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <AScrollView onScroll={scrollHandler} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <BrandsHeader />

        {/* Category Filter */}
        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.bcRow}>
            {BRAND_CATEGORIES.map((item, i) => <BrandCategoryChip key={item.id} item={item} active={activeCat === item.id} onPress={setActiveCat} index={i} />)}
          </ScrollView>
        </View>

        {/* Featured Brands */}
        <View style={styles.section}>
          <View style={styles.sectionRow}><Text style={styles.sectionTitle}>Featured Brands</Text><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
          <FlatList data={FEATURED_BRANDS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <FeaturedBrandCard item={item} index={index} />} contentContainerStyle={styles.fbList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
        </View>

        {/* Brand Deals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand Deals</Text>
          {BRAND_DEALS.map((item, i) => <BrandDealCard key={item.id} item={item} index={i} />)}
        </View>

        {/* Exclusive Products */}
        <View style={styles.section}>
          <View style={styles.sectionRow}><View><Text style={styles.sectionTitle}>Exclusive on Apollo</Text><Text style={styles.sectionSub}>Only available on Apollo 24|7</Text></View><TouchableOpacity style={styles.viewAll}><Text style={styles.viewAllText}>View All</Text><Ionicons name="chevron-forward" size={16} color={COLORS.primary} /></TouchableOpacity></View>
          <FlatList data={EXCLUSIVE_BRANDS} horizontal showsHorizontalScrollIndicator={false} keyExtractor={i => i.id} renderItem={({ item, index }) => <ExclusiveProductCard item={item} index={index} />} contentContainerStyle={styles.epList} ItemSeparatorComponent={() => <View style={{ width: 12 }} />} />
        </View>

        {/* Trending Brands */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Brands</Text>
          <Text style={styles.sectionSub}>Fastest growing brands this month</Text>
          <View style={styles.tbGrid}>{TRENDING_BRANDS.map((item, i) => <TrendingBrandCard key={item.id} item={item} index={i} />)}</View>
        </View>

        {/* A-Z Brand Directory */}
        <View style={styles.section}>
          <View style={styles.sectionRow}><Text style={styles.sectionTitle}>All Brands A-Z</Text>
            {activeLetter && <TouchableOpacity onPress={() => setActiveLetter(null)} style={styles.clearFilter}><Text style={styles.clearFilterText}>Clear Filter</Text><Ionicons name="close-circle" size={14} color={COLORS.primary} /></TouchableOpacity>}
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.alphaRow}>
            {ALPHABET.map(letter => (
              <TouchableOpacity key={letter} onPress={() => setActiveLetter(activeLetter === letter ? null : letter)} style={[styles.alphaChip, activeLetter === letter && styles.alphaChipActive]}>
                <Text style={[styles.alphaChipText, activeLetter === letter && styles.alphaChipTextActive]}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {Object.keys(groupedBrands).sort().map(letter => (
            <View key={letter}>
              <View style={styles.letterHeader}><Text style={styles.letterText}>{letter}</Text></View>
              {groupedBrands[letter].map((item, i) => <BrandListCard key={item.id} item={item} index={i} />)}
            </View>
          ))}
        </View>

        {/* Brand Partner Banner */}
        <View style={styles.partnerBanner}><LinearGradient colors={[COLORS.gold, '#C4952E']} style={styles.partnerGrad}>
          <Ionicons name="diamond" size={32} color={COLORS.white} />
          <View style={styles.partnerText}><Text style={styles.partnerTitle}>Become a Brand Partner</Text><Text style={styles.partnerSub}>Join 500+ brands on Apollo 24|7</Text></View>
          <TouchableOpacity style={styles.partnerBtn}><Text style={styles.partnerBtnText}>LEARN MORE</Text></TouchableOpacity>
        </LinearGradient></View>

        {/* Footer */}
        <View style={styles.footerWrap}>
          <LinearGradient colors={[COLORS.primaryLight, '#D4F1EF', COLORS.white]} style={styles.footerGrad}>
            <Ionicons name="pricetag" size={36} color={COLORS.primary} />
            <Text style={styles.footerTitle}>Where Trusted Meets Wellness</Text>
            <Text style={styles.footerSub}>500+ authentic brands, 40,000+ products</Text>
            <View style={styles.footerDiv} />
            <Text style={styles.footerCopy}>Apollo 24|7 Brand Store</Text>
          </LinearGradient>
        </View>

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
  headerGrad: { paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10, paddingBottom: SPACING.xl, paddingHorizontal: SPACING.lg, borderBottomLeftRadius: RADIUS.xxl, borderBottomRightRadius: RADIUS.xxl, overflow: 'hidden', position: 'relative' },
  headerShimmer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.lg },
  headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.white },
  headerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  headerActions: { flexDirection: 'row' },
  headerBtn: { padding: SPACING.sm, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: RADIUS.full, marginLeft: SPACING.sm },
  bStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: RADIUS.lg, paddingVertical: SPACING.md, marginBottom: SPACING.lg },
  bStat: { alignItems: 'center' },
  bStatNum: { fontSize: 14, fontWeight: '800', color: '#FFD700', marginTop: 2 },
  bStatLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)', marginTop: 1 },
  bStatDiv: { width: 1, height: 36, backgroundColor: 'rgba(255,255,255,0.2)' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.md, height: 40 },
  searchInput: { flex: 1, fontSize: 13, color: COLORS.textPrimary, marginLeft: SPACING.sm },
  section: { marginBottom: SPACING.xl, paddingHorizontal: SPACING.lg },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: SPACING.xs },
  sectionSub: { fontSize: 12, color: COLORS.textTertiary, marginBottom: SPACING.md },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md },
  viewAll: { flexDirection: 'row', alignItems: 'center' },
  viewAllText: { fontSize: 12, fontWeight: '600', color: COLORS.primary, marginRight: 2 },
  // Brand Category
  bcRow: { paddingVertical: SPACING.sm },
  bcChip: { paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, marginRight: SPACING.sm, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  bcChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  bcText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  bcTextActive: { color: COLORS.white },
  // Featured Brands
  fbList: { paddingVertical: SPACING.sm },
  fbCard: { width: 200 },
  fbInner: { borderRadius: RADIUS.xl, overflow: 'hidden', ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10 }, android: { elevation: 6 } }) },
  fbGrad: { padding: SPACING.xl, alignItems: 'center', position: 'relative', minHeight: 240 },
  fbExBadge: { position: 'absolute', top: SPACING.sm, right: SPACING.sm, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.full },
  fbExText: { color: '#FFD700', fontSize: 9, fontWeight: '800', marginLeft: 3 },
  fbIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md },
  fbName: { fontSize: 18, fontWeight: '800', color: COLORS.white, textAlign: 'center', marginBottom: 2 },
  fbTagline: { fontSize: 11, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: SPACING.md },
  fbBottomRow: { flexDirection: 'row', alignItems: 'center', marginBottom: SPACING.md },
  fbStat: { alignItems: 'center', marginRight: SPACING.lg },
  fbStatNum: { fontSize: 16, fontWeight: '800', color: COLORS.white },
  fbStatLabel: { fontSize: 9, color: 'rgba(255,255,255,0.7)' },
  fbRating: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.full },
  fbRatingText: { color: COLORS.white, fontSize: 12, fontWeight: '700', marginLeft: 3 },
  fbExploreBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.full },
  fbExploreText: { color: COLORS.white, fontSize: 12, fontWeight: '700', marginRight: 4 },
  // Brand Deals
  bdCard: { marginBottom: SPACING.md },
  bdGrad: { borderRadius: RADIUS.lg, padding: SPACING.xl, flexDirection: 'row', alignItems: 'center', minHeight: 80 },
  bdText: { flex: 1, marginLeft: SPACING.md },
  bdBrand: { fontSize: 10, fontWeight: '800', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 1 },
  bdTitle: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  bdSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  bdArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  // Exclusive Products
  epList: { paddingVertical: SPACING.sm },
  epCard: { width: 155 },
  epInner: { borderRadius: RADIUS.lg, padding: SPACING.md, alignItems: 'center', position: 'relative', minHeight: 210 },
  epBadge: { position: 'absolute', top: SPACING.sm, left: SPACING.sm, backgroundColor: COLORS.primary, paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs, zIndex: 1 },
  epBadgeText: { color: COLORS.white, fontSize: 8, fontWeight: '800' },
  epIcon: { width: 52, height: 52, borderRadius: 26, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.sm, marginTop: SPACING.lg, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  epName: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  epBrand: { fontSize: 10, color: COLORS.textTertiary, marginBottom: SPACING.xs },
  epPriceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  epPrice: { fontSize: 15, fontWeight: '800', color: COLORS.textPrimary },
  epMrp: { fontSize: 11, color: COLORS.textTertiary, textDecorationLine: 'line-through', marginLeft: 4 },
  epDiscBadge: { borderRadius: RADIUS.xs, overflow: 'hidden', marginBottom: SPACING.sm },
  epDiscGrad: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs },
  epDiscText: { color: COLORS.white, fontSize: 10, fontWeight: '800' },
  epAddBtn: { borderRadius: RADIUS.sm, overflow: 'hidden' },
  epAddGrad: { paddingHorizontal: SPACING.xl, paddingVertical: 6, borderRadius: RADIUS.sm },
  epAddText: { color: COLORS.white, fontSize: 12, fontWeight: '700' },
  // Trending Brands
  tbGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  tbCard: { width: '31%', marginBottom: SPACING.md },
  tbInner: { alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.lg, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 }, android: { elevation: 1 } }) },
  tbIcon: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs },
  tbName: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 2 },
  tbGrowth: { flexDirection: 'row', alignItems: 'center', marginBottom: 2 },
  tbGrowthText: { fontSize: 10, fontWeight: '700', color: COLORS.success, marginLeft: 2 },
  tbProd: { fontSize: 9, color: COLORS.textTertiary },
  // A-Z Directory
  alphaRow: { paddingVertical: SPACING.sm },
  alphaChip: { width: 30, height: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', marginRight: 4, backgroundColor: COLORS.white, borderWidth: 1, borderColor: COLORS.border },
  alphaChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  alphaChipText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  alphaChipTextActive: { color: COLORS.white },
  clearFilter: { flexDirection: 'row', alignItems: 'center' },
  clearFilterText: { fontSize: 12, fontWeight: '600', color: COLORS.primary, marginRight: 4 },
  letterHeader: { paddingVertical: SPACING.sm, borderBottomWidth: 1, borderBottomColor: COLORS.border, marginBottom: SPACING.sm, marginTop: SPACING.sm },
  letterText: { fontSize: 16, fontWeight: '800', color: COLORS.primary },
  blCard: { marginBottom: SPACING.sm },
  blInner: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: RADIUS.md, padding: SPACING.md, ...Platform.select({ ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3 }, android: { elevation: 1 } }) },
  blIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  blContent: { flex: 1 },
  blName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  blInfo: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  blProd: { fontSize: 11, color: COLORS.textTertiary, marginRight: SPACING.md },
  blRating: { flexDirection: 'row', alignItems: 'center' },
  blRatingText: { fontSize: 11, fontWeight: '600', color: COLORS.textSecondary, marginLeft: 2 },
  // Partner Banner
  partnerBanner: { marginHorizontal: SPACING.lg, borderRadius: RADIUS.xl, overflow: 'hidden', marginBottom: SPACING.xl },
  partnerGrad: { flexDirection: 'row', alignItems: 'center', padding: SPACING.xl },
  partnerText: { flex: 1, marginLeft: SPACING.md },
  partnerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  partnerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  partnerBtn: { backgroundColor: COLORS.white, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.sm },
  partnerBtnText: { color: COLORS.gold, fontSize: 12, fontWeight: '700' },
  // Footer
  footerWrap: { marginHorizontal: SPACING.lg, borderRadius: RADIUS.xxl, overflow: 'hidden', marginBottom: SPACING.xl },
  footerGrad: { padding: SPACING.xxxl, alignItems: 'center' },
  footerTitle: { fontSize: 22, fontWeight: '800', color: COLORS.primary, marginTop: SPACING.md, textAlign: 'center' },
  footerSub: { fontSize: 12, color: COLORS.textTertiary, marginTop: SPACING.xs, textAlign: 'center' },
  footerDiv: { width: 60, height: 2, backgroundColor: COLORS.primary, borderRadius: 1, marginVertical: SPACING.lg },
  footerCopy: { fontSize: 12, color: COLORS.textTertiary },
});
