/**
 * APOLLO 24|7 - CONCERN DETAIL PAGE
 * Ultra Premium Concern Detail with Super PRO MAX UI
 * Completely unique design for health concern details
 */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, interpolate, Extrapolation, FadeIn, FadeInDown, FadeInUp, SlideInRight, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getConcernById } from '../concernData';

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

const ConcernHeader = ({ concern, onBack }) => {
  const scrollY = useSharedValue(0);
  
  const headerStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolate(scrollY.value, [0, 150], [concern?.bgColor || COLORS.primary, COLORS.primary], Extrapolation.CLAMP),
  }));

  return (
    <Animated.View style={[styles.headerContainer, headerStyle]}>
      <LinearGradient colors={[concern?.bgColor || COLORS.primary, COLORS.primaryDark]} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleArea}>
            <Text style={styles.headerConcernName}>{concern?.name || 'Health Concern'}</Text>
            <Text style={styles.headerConcernProducts}>{concern?.products}+ Products</Text>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.headerDescription}>{concern?.desc}</Text>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{concern?.products}+</Text>
            <Text style={styles.statLabel}>Products</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>50+</Text>
            <Text style={styles.statLabel}>Brands</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>4.7</Text>
            <Text style={styles.statLabel}>Avg Rating</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const QuickActionsSection = ({ concern }) => {
  return (
    <View style={styles.quickActionsSection}>
      <View style={styles.quickActionsRow}>
        <TouchableOpacity style={styles.quickActionCard}>
          <LinearGradient colors={[COLORS.primaryLight, COLORS.white]} style={styles.quickActionGrad}>
            <Ionicons name="chatbubbles" size={24} color={COLORS.primary} />
            <Text style={styles.quickActionText}>Ask Expert</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionCard}>
          <LinearGradient colors={[COLORS.accentLight, COLORS.white]} style={styles.quickActionGrad}>
            <Ionicons name="document-text" size={24} color={COLORS.accent} />
            <Text style={styles.quickActionText}>Upload RX</Text>
          </LinearGradient>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.quickActionCard}>
          <LinearGradient colors={[COLORS.goldLight, COLORS.white]} style={styles.quickActionGrad}>
            <Ionicons name="calendar" size={24} color={COLORS.gold} />
            <Text style={styles.quickActionText}>Book Test</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const FeaturedProductsSection = ({ concern }) => {
  return (
    <View style={styles.featuredProductsSection}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Recommended Products</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        data={concern?.products || []}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
        renderItem={({ item, index }) => (
          <Animated.View entering={SlideInRight.delay(index * 100)}>
            <TouchableOpacity style={styles.featuredCard}>
              <View style={[styles.featuredImageWrap, { backgroundColor: concern?.color || COLORS.primaryLight }]}>
                <Ionicons name="medical" size={36} color={concern?.bgColor || COLORS.primary} />
                <View style={styles.discountBadge}>
                  <Text style={styles.discountText}>{item.discount}</Text>
                </View>
              </View>
              
              <Text style={styles.featuredName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.featuredBrand}>{item.brand}</Text>
              
              <View style={styles.featuredRatingRow}>
                <Ionicons name="star" size={12} color="#FFD700" />
                <Text style={styles.featuredRating}>{item.rating}</Text>
                <Text style={styles.featuredReviews}>({Math.floor(Math.random() * 500) + 100})</Text>
              </View>
              
              <View style={styles.featuredPriceRow}>
                <Text style={styles.featuredPrice}>₹{item.price}</Text>
                <Text style={styles.featuredMrp}>₹{item.mrp}</Text>
              </View>
              
              <TouchableOpacity style={styles.addToCartBtn}>
                <Ionicons name="add" size={18} color={COLORS.white} />
              </TouchableOpacity>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
};

const HealthTipsSection = ({ concern }) => {
  return (
    <View style={styles.healthTipsSection}>
      <View style={styles.sectionTitleRow}>
        <Ionicons name="leaf" size={22} color={COLORS.success} />
        <Text style={styles.sectionTitle}>Health Tips</Text>
      </View>
      
      <View style={styles.tipsGrid}>
        {concern?.tips?.map((tip, idx) => (
          <Animated.View key={idx} entering={FadeInDown.delay(idx * 120)} style={styles.tipCard}>
            <View style={styles.tipIconWrap}>
              <Ionicons name="checkmark-circle" size={24} color={COLORS.success} />
            </View>
            <Text style={styles.tipText}>{tip}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const ExpertArticlesSection = ({ concern }) => {
  return (
    <View style={styles.expertArticlesSection}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Expert Articles</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {concern?.expertTips?.map((article, idx) => (
        <Animated.View key={idx} entering={FadeInLeft.delay(idx * 100)}>
          <TouchableOpacity style={styles.articleCard}>
            <View style={[styles.articleIcon, { backgroundColor: concern?.color || COLORS.primaryLight }]}>
              <Ionicons name="document-text" size={24} color={concern?.bgColor || COLORS.primary} />
            </View>
            <View style={styles.articleContent}>
              <Text style={styles.articleTitle}>{article.title}</Text>
              <View style={styles.articleMeta}>
                <View style={styles.articleCategory}>
                  <Text style={styles.articleCategoryText}>{article.category}</Text>
                </View>
                <Text style={styles.articleReadTime}>{article.readTime} read</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const TreatmentPackSection = ({ concern }) => {
  return (
    <View style={styles.treatmentPackSection}>
      <LinearGradient colors={[concern?.bgColor || COLORS.primary, concern?.bgColor ? concern?.bgColor + 'CC' : COLORS.primaryDark]} style={styles.packBanner}>
        <View style={styles.packContent}>
          <Text style={styles.packTitle}>Complete Treatment Pack</Text>
          <Text style={styles.packSubtitle}>Everything you need for {concern?.name?.toLowerCase()}</Text>
          
          <View style={styles.packFeatures}>
            <View style={styles.packFeature}>
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
              <Text style={styles.packFeatureText}>Genuine Products</Text>
            </View>
            <View style={styles.packFeature}>
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
              <Text style={styles.packFeatureText}>Expert Guidance</Text>
            </View>
            <View style={styles.packFeature}>
              <Ionicons name="checkmark" size={16} color={COLORS.white} />
              <Text style={styles.packFeatureText}>Best Value</Text>
            </View>
          </View>
          
          <View style={styles.packPricing}>
            <View style={styles.packPriceRow}>
              <Text style={styles.packPriceLabel}>Pack Price:</Text>
              <Text style={styles.packPriceValue}>₹{Math.floor(Math.random() * 500) + 700}</Text>
            </View>
            <TouchableOpacity style={styles.packBuyBtn}>
              <Text style={styles.packBuyText}>Buy Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const FAQsSection = ({ concern }) => {
  const [expanded, setExpanded] = useState({});

  const toggleFaq = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <View style={styles.faqSection}>
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      </View>
      
      {concern?.faqs?.map((faq, idx) => (
        <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)}>
          <TouchableOpacity 
            style={styles.faqCard}
            onPress={() => toggleFaq(idx)}
          >
            <View style={styles.faqHeader}>
              <View style={styles.faqIcon}>
                <Ionicons name="help-circle" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.faqQuestion}>{faq.q}</Text>
            </View>
            
            {expanded[idx] && (
              <Animated.View entering={FadeInDown.duration(200)}>
                <View style={styles.faqAnswerRow}>
                  <Ionicons name="information-circle" size={16} color={COLORS.success} />
                  <Text style={styles.faqAnswer}>{faq.a}</Text>
                </View>
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

const RelatedConcernsSection = () => {
  const relatedConcerns = [
    { id: 'immunity', name: 'Immunity', icon: 'shield-outline', color: '#E8F5E9' },
    { id: 'digestive', name: 'Digestive Health', icon: 'restaurant-outline', color: '#FFF3E0' },
    { id: 'energy', name: 'Energy Boost', icon: 'flash-outline', color: '#F3E5F5' },
  ];

  return (
    <View style={styles.relatedConcernsSection}>
      <Text style={styles.sectionTitle}>Related Concerns</Text>
      
      <View style={styles.relatedConcernsGrid}>
        {relatedConcerns.map((item, idx) => (
          <Animated.View key={item.id} entering={FadeInUp.delay(idx * 100)}>
            <TouchableOpacity style={[styles.relatedConcernCard, { backgroundColor: item.color }]}>
              <Ionicons name={item.icon} size={28} color={COLORS.primary} />
              <Text style={styles.relatedConcernName}>{item.name}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const StickyBottomSection = ({ concern }) => {
  return (
    <View style={styles.stickyBottom}>
      <View style={styles.bottomContent}>
        <View style={styles.bottomLeft}>
          <Text style={styles.bottomLabel}>Starting from</Text>
          <Text style={styles.bottomPrice}>₹{concern?.products?.[0]?.price || 99}</Text>
        </View>
        
        <TouchableOpacity style={styles.shopNowBtn}>
          <LinearGradient colors={[COLORS.accent, '#FF8F5E']} style={styles.shopNowGrad}>
            <Text style={styles.shopNowText}>Shop Now</Text>
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
export default function ConcernDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const [concern, setConcern] = useState(null);
  
  useEffect(() => {
    if (id) {
      const c = getConcernById(id);
      setConcern(c);
    }
  }, [id]);

  if (!concern) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={concern?.bgColor} />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <ConcernHeader 
          concern={concern} 
          onBack={() => router.back()} 
        />
        
        <QuickActionsSection concern={concern} />
        <FeaturedProductsSection concern={concern} />
        <HealthTipsSection concern={concern} />
        <ExpertArticlesSection concern={concern} />
        <TreatmentPackSection concern={concern} />
        <FAQsSection concern={concern} />
        <RelatedConcernsSection />
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      <StickyBottomSection concern={concern} />
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
  headerConcernName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerConcernProducts: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  searchBtn: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
  },
  headerDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: SPACING.lg,
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.lg,
    paddingVertical: SPACING.md,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
  },
  statLabel: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  // Quick Actions
  quickActionsSection: {
    marginTop: 180,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    marginHorizontal: SPACING.xs,
  },
  quickActionGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
      android: { elevation: 3 },
    }),
  },
  quickActionText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.xs,
  },
  // Featured Products
  featuredProductsSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
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
  featuredList: {
    paddingHorizontal: SPACING.lg,
  },
  featuredCard: {
    width: 150,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginRight: SPACING.md,
    position: 'relative',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  featuredImageWrap: {
    width: '100%',
    height: 80,
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
  featuredName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
    height: 32,
  },
  featuredBrand: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  featuredRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  featuredRating: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  featuredReviews: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginLeft: 2,
  },
  featuredPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  featuredPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  featuredMrp: {
    fontSize: 12,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: SPACING.xs,
  },
  addToCartBtn: {
    position: 'absolute',
    bottom: SPACING.sm,
    right: SPACING.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Health Tips
  healthTipsSection: {
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
  tipsGrid: {
    marginTop: SPACING.md,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  tipIconWrap: {
    marginRight: SPACING.md,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  // Expert Articles
  expertArticlesSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  articleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  articleIcon: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  articleContent: {
    flex: 1,
  },
  articleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  articleMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  articleCategory: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    marginRight: SPACING.sm,
  },
  articleCategoryText: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.primary,
  },
  articleReadTime: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  // Treatment Pack
  treatmentPackSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  packBanner: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
      android: { elevation: 6 },
    }),
  },
  packContent: {},
  packTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  packSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SPACING.md,
  },
  packFeatures: {
    marginBottom: SPACING.lg,
  },
  packFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  packFeatureText: {
    fontSize: 13,
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  packPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  packPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  packPriceLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  packPriceValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  packBuyBtn: {
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.lg,
  },
  packBuyText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
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
    marginBottom: SPACING.sm,
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
  faqIcon: {
    marginRight: SPACING.sm,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  faqArrow: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
  },
  faqAnswerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  faqAnswer: {
    flex: 1,
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
    lineHeight: 18,
  },
  // Related Concerns
  relatedConcernsSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  relatedConcernsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  relatedConcernCard: {
    flex: 1,
    alignItems: 'center',
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.xs,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  relatedConcernName: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  // Sticky Bottom
  stickyBottom: {
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
  shopNowBtn: {
    flex: 1,
    marginLeft: SPACING.lg,
  },
  shopNowGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  shopNowText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginRight: SPACING.sm,
  },
  bottomSpacer: {
    height: 100,
  },
});
