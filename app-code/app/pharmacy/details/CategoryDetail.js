/**
 * APOLLO 24|7 - CATEGORY DETAIL PAGE
 * Ultra Premium Category Detail with Super PRO MAX UI
 * Completely unique design for category details
 */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, interpolate, Extrapolation, FadeIn, FadeInDown, FadeInUp, SlideInRight, ZoomIn, SlideInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getCategoryById } from '../categoryData';

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
  pink: '#EC4899', pinkLight: '#FDF2F8',
};
const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
const RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, full: 999 };

// =====================================================================
// ANIMATED COMPONENTS
// =====================================================================
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const CategoryHeader = ({ category, onBack }) => {
  const scrollY = useSharedValue(0);
  
  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolate(scrollY.value, [0, 100], [category?.gradColors?.[0] || COLORS.primary, COLORS.primary], Extrapolation.CLAMP),
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    }
  });

  return (
    <Animated.View style={[styles.headerContainer, headerStyle]}>
      <LinearGradient colors={[category?.gradColors?.[0] || COLORS.primary, category?.gradColors?.[1] || COLORS.primaryDark]} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleArea}>
            <Text style={styles.headerCategoryName}>{category?.name || 'Category'}</Text>
            <Text style={styles.headerCategoryCount}>{category?.count}+ Products</Text>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.headerFeatures}>
          {category?.features?.map((feature, idx) => (
            <View key={idx} style={styles.featureChip}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.white} />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const HeroBannerSection = ({ category }) => {
  return (
    <View style={styles.heroBannerSection}>
      <LinearGradient colors={[category?.gradColors?.[0] || COLORS.primary, category?.gradColors?.[1] || COLORS.primaryDark]} style={styles.heroBanner}>
        <View style={styles.heroContent}>
          <View style={styles.heroLeft}>
            <Text style={styles.heroTitle}>Flat 25% OFF</Text>
            <Text style={styles.heroSubtitle}>On all {category?.name} products</Text>
            <TouchableOpacity style={styles.heroCtaBtn}>
              <Text style={styles.heroCtaText}>Shop Now</Text>
              <Ionicons name="arrow-forward" size={16} color={category?.gradColors?.[0]} />
            </TouchableOpacity>
          </View>
          <View style={styles.heroRight}>
            <View style={styles.heroIconWrap}>
              <Ionicons name={category?.icon || 'grid'} size={48} color={COLORS.white} />
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const QuickFilterSection = () => {
  const filters = ['Popular', 'New', 'Price: Low to High', 'Price: High to Low', 'Discount'];
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <View style={styles.filterSection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
        {filters.map((filter, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.filterChip, activeFilter === idx && styles.filterChipActive]}
            onPress={() => setActiveFilter(idx)}
          >
            <Text style={[styles.filterText, activeFilter === idx && styles.filterTextActive]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const ProductsGridSection = ({ category }) => {
  return (
    <View style={styles.productsSection}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Popular Products</Text>
        <Text style={styles.productCount}>{category?.products?.length || 0} items</Text>
      </View>
      
      <View style={styles.productsGrid}>
        {category?.products?.map((product, idx) => (
          <Animated.View key={product.id} entering={FadeInDown.delay(idx * 80)} style={styles.productCard}>
            <TouchableOpacity style={styles.productInner}>
              <View style={styles.productImageWrap}>
                <Ionicons name="medical" size={32} color={COLORS.primary} />
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.productBrand}>{product.brand}</Text>
              
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
              
              <View style={styles.priceRow}>
                <Text style={styles.priceValue}>₹{product.price}</Text>
                <Text style={styles.mrpValue}>₹{product.mrp}</Text>
              </View>
              
              <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>ADD</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const SubCategoriesSection = ({ category }) => {
  return (
    <View style={styles.subCategoriesSection}>
      <Text style={styles.sectionTitle}>Shop by Sub-Category</Text>
      
      <View style={styles.subCategoriesGrid}>
        {category?.subCategories?.map((subCat, idx) => (
          <Animated.View key={idx} entering={FadeInRight.delay(idx * 100)}>
            <TouchableOpacity style={styles.subCategoryCard}>
              <View style={[styles.subCatIcon, { backgroundColor: category?.gradColors?.[0] + '20' }]}>
                <Ionicons name="folder" size={20} color={category?.gradColors?.[0]} />
              </View>
              <Text style={styles.subCatName} numberOfLines={1}>{subCat}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const TipsSection = ({ category }) => {
  return (
    <View style={styles.tipsSection}>
      <View style={styles.tipsHeader}>
        <Ionicons name="bulb" size={24} color={COLORS.gold} />
        <Text style={styles.tipsTitle}>Pro Tips</Text>
      </View>
      
      {category?.tips?.map((tip, idx) => (
        <Animated.View key={idx} entering={FadeInLeft.delay(idx * 150)} style={styles.tipItem}>
          <View style={styles.tipNumber}>
            <Text style={styles.tipNumberText}>{idx + 1}</Text>
          </View>
          <Text style={styles.tipText}>{tip}</Text>
        </Animated.View>
      ))}
    </View>
  );
};

const FAQsSection = ({ category }) => {
  const [expanded, setExpanded] = useState({});

  const toggleFaq = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <View style={styles.faqSection}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      {category?.faqs?.map((faq, idx) => (
        <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)}>
          <TouchableOpacity 
            style={styles.faqCard}
            onPress={() => toggleFaq(idx)}
          >
            <View style={styles.faqQuestionRow}>
              <Ionicons name="help-circle" size={20} color={COLORS.primary} />
              <Text style={styles.faqQuestion}>{faq.q}</Text>
            </View>
            
            {expanded[idx] && (
              <Animated.View entering={FadeInDown.duration(200)}>
                <Text style={styles.faqAnswer}>{faq.a}</Text>
              </Animated.View>
            )}
            
            <Ionicons 
              name={expanded[idx] ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={COLORS.textTertiary} 
            />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const TrustSection = () => {
  return (
    <View style={styles.trustSection}>
      <LinearGradient colors={[COLORS.primaryLight, '#D4F1EF']} style={styles.trustGradient}>
        <View style={styles.trustContent}>
          <Ionicons name="shield-checkmark" size={40} color={COLORS.primary} />
          <Text style={styles.trustTitle}>100% Authentic Products</Text>
          <Text style={styles.trustSubtitle}>All products are sourced directly from manufacturers</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const BottomBar = ({ category }) => {
  const minPrice = category?.products?.reduce((min, p) => p.price < min ? p.price : min, category?.products?.[0]?.price || 0);
  
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomBarContent}>
        <View style={styles.priceInfo}>
          <Text style={styles.priceLabel}>Starting from</Text>
          <Text style={styles.priceValue}>₹{minPrice}</Text>
        </View>
        
        <TouchableOpacity style={styles.viewAllBtn}>
          <LinearGradient colors={[COLORS.accent, '#FF8F5E']} style={styles.viewAllGrad}>
            <Text style={styles.viewAllText}>View All Products</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// =====================================================================
// MAIN COMPONENT
// =====================================================================
export default function CategoryDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const [category, setCategory] = useState(null);
  
  useEffect(() => {
    if (id) {
      const cat = getCategoryById(id);
      setCategory(cat);
    }
  }, [id]);

  if (!category) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={category?.gradColors?.[0]} />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <CategoryHeader 
          category={category} 
          onBack={() => router.back()} 
        />
        
        <HeroBannerSection category={category} />
        <QuickFilterSection />
        <ProductsGridSection category={category} />
        <SubCategoriesSection category={category} />
        <TipsSection category={category} />
        <FAQsSection category={category} />
        <TrustSection />
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      <BottomBar category={category} />
    </View>
  );
}

// =====================================================================
// STYLES
// =====================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  // Header
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerGrad: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  backBtn: {
    padding: SPACING.sm,
    marginRight: SPACING.md,
  },
  headerTitleArea: {
    flex: 1,
  },
  headerCategoryName: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerCategoryCount: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  searchBtn: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
  },
  headerFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: SPACING.sm,
  },
  featureChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  featureText: {
    fontSize: 11,
    color: COLORS.white,
    marginLeft: 4,
  },
  // Hero Banner
  heroBannerSection: {
    marginHorizontal: SPACING.lg,
    marginTop: 140,
    marginBottom: SPACING.lg,
  },
  heroBanner: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
      android: { elevation: 6 },
    }),
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroLeft: {
    flex: 1,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: SPACING.md,
  },
  heroCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    alignSelf: 'flex-start',
  },
  heroCtaText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: SPACING.xs,
  },
  heroRight: {
    marginLeft: SPACING.lg,
  },
  heroIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Filter
  filterSection: {
    marginBottom: SPACING.lg,
    paddingHorizontal: SPACING.lg,
  },
  filterScroll: {
    paddingRight: SPACING.lg,
  },
  filterChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  // Products
  productsSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  productCount: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '48%',
    marginBottom: SPACING.md,
  },
  productInner: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  productImageWrap: {
    width: '100%',
    height: 80,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  discountBadge: {
    position: 'absolute',
    top: SPACING.xs,
    right: SPACING.xs,
    backgroundColor: COLORS.errorLight,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  discountText: {
    fontSize: 9,
    fontWeight: '700',
    color: COLORS.error,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
    height: 32,
  },
  productBrand: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  mrpValue: {
    fontSize: 12,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: SPACING.xs,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.white,
  },
  // Sub Categories
  subCategoriesSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  subCategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  subCategoryCard: {
    width: '31%',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  subCatIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  subCatName: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  // Tips
  tipsSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  tipsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  tipNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  tipNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  // FAQs
  faqSection: {
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    lineHeight: 18,
  },
  // Trust
  trustSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  trustGradient: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    alignItems: 'center',
  },
  trustContent: {
    alignItems: 'center',
  },
  trustTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: SPACING.md,
    textAlign: 'center',
  },
  trustSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  // Bottom Bar
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingBottom: Platform.OS === 'ios' ? 30 : SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.08, shadowRadius: 8 },
      android: { elevation: 8 },
    }),
  },
  bottomBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceInfo: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  priceValue: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  viewAllBtn: {
    flex: 1,
  },
  viewAllGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
  bottomSpacer: {
    height: 100,
  },
});
