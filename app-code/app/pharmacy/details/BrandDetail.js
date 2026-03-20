/**
 * APOLLO 24|7 - BRAND DETAIL PAGE
 * Ultra Premium Brand Detail with Super PRO MAX UI
 * Completely unique design for brand details
 */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, interpolate, Extrapolation, FadeIn, FadeInDown, FadeInUp, SlideInRight, ZoomIn, FadeInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getBrandById } from '../brandData';

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

const BrandHeader = ({ brand, onBack }) => {
  return (
    <View style={styles.headerContainer}>
      <LinearGradient colors={[brand?.gradColors?.[0] || COLORS.primary, brand?.gradColors?.[1] || COLORS.primaryDark]} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleArea}>
            <Text style={styles.headerBrandName}>{brand?.name || 'Brand'}</Text>
            <Text style={styles.headerBrandTagline}>{brand?.tagline}</Text>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        {brand?.exclusive && (
          <View style={styles.exclusiveBadge}>
            <Ionicons name="star" size={12} color={COLORS.gold} />
            <Text style={styles.exclusiveText}>Exclusive Partner</Text>
          </View>
        )}
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{brand?.products || 0}</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statBox}>
            <View style={styles.ratingBox}>
              <Ionicons name="star" size={14} color="#FFD700" />
              <Text style={styles.statNumberSmall}>{brand?.rating}</Text>
            </View>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Authentic</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const BrandIntroSection = ({ brand }) => {
  return (
    <View style={styles.introSection}>
      <View style={styles.introCard}>
        <View style={[styles.brandLogoWrap, { backgroundColor: brand?.color || COLORS.primaryLight }]}>
          <Ionicons name={brand?.icon || 'medical'} size={48} color={brand?.gradColors?.[0] || COLORS.primary} />
        </View>
        
        <Text style={styles.brandDescription}>{brand?.description}</Text>
        
        <View style={styles.highlightsContainer}>
          {brand?.highlights?.map((highlight, idx) => (
            <View key={idx} style={styles.highlightChip}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.success} />
              <Text style={styles.highlightText}>{highlight}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const FeaturesBannerSection = ({ brand }) => {
  return (
    <View style={styles.featuresBannerSection}>
      <View style={styles.featuresRow}>
        {brand?.features?.map((feature, idx) => (
          <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)} style={styles.featureCard}>
            <LinearGradient colors={[brand?.gradColors?.[0] || COLORS.primary, brand?.gradColors?.[1] || COLORS.primaryDark]} style={styles.featureGrad}>
              <Ionicons name="shield-checkmark" size={24} color={COLORS.white} />
              <Text style={styles.featureText}>{feature}</Text>
            </LinearGradient>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const ProductsSection = ({ brand }) => {
  return (
    <View style={styles.productsSection}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Popular Products</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All {brand?.products}+</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.productsGrid}>
        {brand?.products?.map((product, idx) => (
          <Animated.View key={product.id} entering={FadeInUp.delay(idx * 80)} style={styles.productCard}>
            <TouchableOpacity style={styles.productInner}>
              <View style={[styles.productImageWrap, { backgroundColor: brand?.color || COLORS.primaryLight }]}>
                <Ionicons name="medical" size={28} color={brand?.gradColors?.[0] || COLORS.primary} />
                {product.discount && (
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{product.discount}</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
              <Text style={styles.productCategory}>{product.category}</Text>
              
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={11} color="#FFD700" />
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

const AboutBrandSection = ({ brand }) => {
  return (
    <View style={styles.aboutSection}>
      <Text style={styles.sectionTitle}>About {brand?.name}</Text>
      
      <View style={styles.aboutCard}>
        <Text style={styles.aboutText}>{brand?.about}</Text>
        
        <View style={styles.aboutFeatures}>
          <View style={styles.aboutFeature}>
            <View style={[styles.aboutIconWrap, { backgroundColor: COLORS.successLight }]}>
              <Ionicons name="shield-checkmark" size={20} color={COLORS.success} />
            </View>
            <View style={styles.aboutFeatureContent}>
              <Text style={styles.aboutFeatureTitle}>Quality Assured</Text>
              <Text style={styles.aboutFeatureDesc}>All products undergo strict quality checks</Text>
            </View>
          </View>
          
          <View style={styles.aboutFeature}>
            <View style={[styles.aboutIconWrap, { backgroundColor: COLORS.primaryLight }]}>
              <Ionicons name="leaf" size={20} color={COLORS.primary} />
            </View>
            <View style={styles.aboutFeatureContent}>
              <Text style={styles.aboutFeatureTitle}>Natural Ingredients</Text>
              <Text style={styles.aboutFeatureDesc}>Sourced from trusted suppliers</Text>
            </View>
          </View>
          
          <View style={styles.aboutFeature}>
            <View style={[styles.aboutIconWrap, { backgroundColor: COLORS.goldLight }]}>
              <Ionicons name="ribbon" size={20} color={COLORS.gold} />
            </View>
            <View style={styles.aboutFeatureContent}>
              <Text style={styles.aboutFeatureTitle}>Trusted Brand</Text>
              <Text style={styles.aboutFeatureDesc}>Millions of satisfied customers</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const CategoryTabsSection = ({ brand }) => {
  const categories = ['All', 'Top Sellers', 'New Arrivals', 'Best Value'];
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <View style={styles.categoryTabsSection}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryTabsScroll}>
        {categories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            style={[styles.categoryTab, activeCategory === idx && styles.categoryTabActive]}
            onPress={() => setActiveCategory(idx)}
          >
            <Text style={[styles.categoryTabText, activeCategory === idx && styles.categoryTabTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const DealsSection = ({ brand }) => {
  const deals = [
    { title: 'Flat 25% OFF', subtitle: 'On all products', icon: 'pricetag', color: '#E8F5E9' },
    { title: 'Buy 2 Get 1', subtitle: 'On selected items', icon: 'gift', color: '#FFF3E0' },
    { title: 'Free Delivery', subtitle: 'Above ₹499', icon: 'car', color: '#E3F2FD' },
  ];

  return (
    <View style={styles.dealsSection}>
      <Text style={styles.sectionTitle}>Special Offers</Text>
      
      {deals.map((deal, idx) => (
        <Animated.View key={idx} entering={FadeInLeft.delay(idx * 100)}>
          <TouchableOpacity style={[styles.dealCard, { backgroundColor: deal.color }]}>
            <View style={styles.dealContent}>
              <View style={styles.dealIconWrap}>
                <Ionicons name={deal.icon} size={24} color={COLORS.primary} />
              </View>
              <View style={styles.dealTextWrap}>
                <Text style={styles.dealTitle}>{deal.title}</Text>
                <Text style={styles.dealSubtitle}>{deal.subtitle}</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const ReviewsSection = ({ brand }) => {
  const reviews = [
    { user: 'Rajesh K.', rating: 5, comment: 'Great quality products! Highly recommend.', date: '2 days ago' },
    { user: 'Priya S.', rating: 4, comment: 'Fast delivery and good packaging.', date: '1 week ago' },
    { user: 'Amit M.', rating: 5, comment: 'Trustworthy brand for all health needs.', date: '2 weeks ago' },
  ];

  return (
    <View style={styles.reviewsSection}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Customer Reviews</Text>
        <View style={styles.ratingSummary}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingSummaryText}>{brand?.rating}</Text>
          <Text style={styles.ratingSummaryLabel}>(500+ reviews)</Text>
        </View>
      </View>
      
      {reviews.map((review, idx) => (
        <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)}>
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUserAvatar}>
                <Text style={styles.reviewUserInitial}>{review.user.charAt(0)}</Text>
              </View>
              <View style={styles.reviewUserInfo}>
                <Text style={styles.reviewUserName}>{review.user}</Text>
                <View style={styles.reviewRating}>
                  {[1,2,3,4,5].map((star) => (
                    <Ionicons 
                      key={star} 
                      name={star <= review.rating ? "star" : "star-outline"} 
                      size={12} 
                      color="#FFD700" 
                    />
                  ))}
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.reviewComment}>{review.comment}</Text>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

const FAQsSection = ({ brand }) => {
  const [expanded, setExpanded] = useState({});

  const toggleFaq = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <View style={styles.faqSection}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      {brand?.faqs?.map((faq, idx) => (
        <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)}>
          <TouchableOpacity 
            style={styles.faqCard}
            onPress={() => toggleFaq(idx)}
          >
            <View style={styles.faqHeader}>
              <Ionicons name="help-circle-outline" size={20} color={COLORS.primary} />
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
              style={styles.faqArrow}
            />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const TrustBadgesSection = () => {
  return (
    <View style={styles.trustBadgesSection}>
      <LinearGradient colors={[COLORS.primaryLight, '#D4F1EF']} style={styles.trustGradient}>
        <View style={styles.trustContent}>
          <View style={styles.trustBadgesRow}>
            <View style={styles.trustBadgeItem}>
              <Ionicons name="shield-checkmark" size={28} color={COLORS.primary} />
              <Text style={styles.trustBadgeText}>100% Genuine</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <Ionicons name="time" size={28} color={COLORS.primary} />
              <Text style={styles.trustBadgeText}>Fast Delivery</Text>
            </View>
            <View style={styles.trustBadgeItem}>
              <Ionicons name="refresh" size={28} color={COLORS.primary} />
              <Text style={styles.trustBadgeText}>Easy Returns</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const StickyBottomBar = ({ brand }) => {
  return (
    <View style={styles.stickyBottomBar}>
      <View style={styles.bottomContent}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomLabel}>Starting from</Text>
          <Text style={styles.bottomPrice}>₹{brand?.products?.[0]?.price || 99}</Text>
        </View>
        
        <TouchableOpacity style={styles.shopBtn}>
          <LinearGradient colors={[COLORS.accent, '#FF8F5E']} style={styles.shopBtnGrad}>
            <Text style={styles.shopBtnText}>Shop Now</Text>
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
export default function BrandDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const [brand, setBrand] = useState(null);
  
  useEffect(() => {
    if (id) {
      const b = getBrandById(id);
      setBrand(b);
    }
  }, [id]);

  if (!brand) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={brand?.gradColors?.[0]} />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <BrandHeader 
          brand={brand} 
          onBack={() => router.back()} 
        />
        
        <BrandIntroSection brand={brand} />
        <FeaturesBannerSection brand={brand} />
        <CategoryTabsSection brand={brand} />
        <ProductsSection brand={brand} />
        <DealsSection brand={brand} />
        <AboutBrandSection brand={brand} />
        <ReviewsSection brand={brand} />
        <FAQsSection brand={brand} />
        <TrustBadgesSection />
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      <StickyBottomBar brand={brand} />
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
    marginBottom: SPACING.md,
  },
  backBtn: {
    padding: SPACING.sm,
    marginRight: SPACING.md,
  },
  headerTitleArea: {
    flex: 1,
  },
  headerBrandName: {
    fontSize: 26,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerBrandTagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  searchBtn: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
  },
  exclusiveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    marginBottom: SPACING.md,
  },
  exclusiveText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.gold,
    marginLeft: SPACING.xs,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.white,
  },
  statNumberSmall: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: 4,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Intro
  introSection: {
    marginTop: 200,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  brandLogoWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8 },
      android: { elevation: 6 },
    }),
  },
  brandDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  highlightChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
    margin: 4,
  },
  highlightText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.success,
    marginLeft: 4,
  },
  // Features Banner
  featuresBannerSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  featureCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  featureGrad: {
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6 },
      android: { elevation: 4 },
    }),
  },
  featureText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.white,
    marginTop: SPACING.xs,
    textAlign: 'center',
  },
  // Category Tabs
  categoryTabsSection: {
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  categoryTabsScroll: {
    paddingRight: SPACING.lg,
  },
  categoryTab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  categoryTabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  categoryTabTextActive: {
    color: COLORS.white,
  },
  // Products
  productsSection: {
    marginHorizontal: SPACING.lg,
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
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
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
    height: 70,
    borderRadius: RADIUS.md,
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
  productCategory: {
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
  // Deals
  dealsSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  dealCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  dealContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dealIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  dealTextWrap: {
    flex: 1,
  },
  dealTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  dealSubtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  // About
  aboutSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  aboutCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    marginTop: SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  aboutText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 22,
    marginBottom: SPACING.lg,
  },
  aboutFeatures: {},
  aboutFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  aboutIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  aboutFeatureContent: {
    flex: 1,
  },
  aboutFeatureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  aboutFeatureDesc: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  // Reviews
  reviewsSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingSummaryText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginLeft: 4,
  },
  ratingSummaryLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginLeft: 4,
  },
  reviewCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  reviewUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  reviewUserInitial: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  reviewUserInfo: {
    flex: 1,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  reviewDate: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginLeft: SPACING.sm,
  },
  reviewComment: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  // FAQs
  faqSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginTop: SPACING.sm,
    position: 'relative',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  faqArrow: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
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
  // Trust Badges
  trustBadgesSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  trustGradient: {
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
  },
  trustContent: {},
  trustBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  trustBadgeItem: {
    alignItems: 'center',
  },
  trustBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  // Sticky Bottom
  stickyBottomBar: {
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
  bottomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottomLeft: {},
  bottomLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  bottomPrice: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  shopBtn: {
    flex: 1,
    marginLeft: SPACING.lg,
  },
  shopBtnGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  shopBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
  bottomSpacer: {
    height: 100,
  },
});
