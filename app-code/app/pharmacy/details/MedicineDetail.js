/**
 * APOLLO 24|7 - MEDICINE DETAIL PAGE
 * Ultra Premium Medicine Detail with Super PRO MAX UI
 * Complete unique design for medicine details
 */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView, TextInput, Image, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedScrollHandler, withTiming, withSpring, withDelay, interpolate, Extrapolation, FadeIn, FadeInDown, FadeInUp, SlideInRight, ZoomIn, SlideInLeft } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getMedicineById } from '../medicineData';

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

const Header = ({ medicine, onBack, onCart }) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      translateY.value = event.contentOffset.y;
      opacity.value = interpolate(event.contentOffset.y, [0, 100], [1, 0], Extrapolation.CLAMP);
    }
  });

  return (
    <Animated.View style={[styles.headerWrapper, { transform: [{ translateY: translateY.value * 0.5 }] }]}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.headerGrad}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={onBack} style={styles.headerBtn}>
            <Ionicons name="arrow-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerTitle}>{medicine?.name || 'Medicine Details'}</Text>
            <Text style={styles.headerSub}>{medicine?.brand}</Text>
          </View>
          <TouchableOpacity onPress={onCart} style={styles.headerBtn}>
            <Ionicons name="cart-outline" size={24} color={COLORS.white} />
            <View style={styles.cartBadge}><Text style={styles.cartBadgeText}>2</Text></View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const ProductImageSection = ({ medicine }) => {
  const badgeScale = useSharedValue(0);
  
  useEffect(() => {
    badgeScale.value = withSpring(1, { damping: 10, stiffness: 100 });
  }, []);

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }]
  }));

  return (
    <View style={styles.productImageSection}>
      <LinearGradient colors={[COLORS.primaryLight, '#D4F1EF', COLORS.white]} style={styles.imageGradient}>
        <View style={styles.imageContainer}>
          <View style={styles.medicineIconWrap}>
            <Ionicons name="medical" size={80} color={COLORS.primary} />
          </View>
          
          {medicine?.bestseller && (
            <Animated.View style={[styles.bestsellerBadge, badgeStyle]}>
              <LinearGradient colors={['#FFD700', '#FFB800']} style={styles.bestsellerGrad}>
                <Text style={styles.bestsellerText}>BESTSELLER</Text>
              </LinearGradient>
            </Animated.View>
          )}
          
          {medicine?.prescription && (
            <View style={styles.rxBadge}>
              <Text style={styles.rxBadgeText}>RX</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const PricingSection = ({ medicine }) => {
  const discount = Math.round(((medicine.mrp - medicine.price) / medicine.mrp) * 100);
  
  return (
    <View style={styles.pricingSection}>
      <View style={styles.pricingMain}>
        <Text style={styles.priceLabel}>Our Price</Text>
        <View style={styles.priceRow}>
          <Text style={styles.priceSymbol}>₹</Text>
          <Text style={styles.priceValue}>{medicine.price}</Text>
        </View>
        <View style={styles.mrpRow}>
          <Text style={styles.mrpLabel}>MRP:</Text>
          <Text style={styles.mrpValue}>₹{medicine.mrp}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}% OFF</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.savingsCard}>
        <Ionicons name="pricetag" size={16} color={COLORS.success} />
        <Text style={styles.savingsText}>You save ₹{medicine.mrp - medicine.price}</Text>
      </View>
      
      <View style={styles.deliveryInfo}>
        <View style={styles.deliveryRow}>
          <Ionicons name="time-outline" size={18} color={COLORS.primary} />
          <Text style={styles.deliveryText}>{medicine.delivery}</Text>
        </View>
        <View style={styles.deliveryRow}>
          <Ionicons name="location-outline" size={18} color={COLORS.primary} />
          <Text style={styles.deliveryText}>Free delivery above ₹499</Text>
        </View>
      </View>
    </View>
  );
};

const RatingReviewsSection = ({ medicine }) => {
  return (
    <View style={styles.ratingReviewsSection}>
      <View style={styles.ratingCard}>
        <View style={styles.ratingLeft}>
          <Text style={styles.ratingValue}>{medicine.rating}</Text>
          <View style={styles.starsRow}>
            {[1,2,3,4,5].map((star) => (
              <Ionicons 
                key={star} 
                name={star <= Math.floor(medicine.rating) ? "star" : "star-outline"} 
                size={14} 
                color="#FFD700" 
              />
            ))}
          </View>
          <Text style={styles.ratingCount}>{medicine.reviews.toLocaleString()} ratings</Text>
        </View>
        <View style={styles.ratingRight}>
          {[5,4,3,2,1].map((rating, idx) => {
            const percentage = rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 6 : rating === 2 ? 3 : 1;
            return (
              <View key={rating} style={styles.ratingBarRow}>
                <Text style={styles.ratingBarLabel}>{rating}</Text>
                <View style={styles.ratingBarBg}>
                  <View style={[styles.ratingBarFill, { width: `${percentage}%` }]} />
                </View>
                <Text style={styles.ratingBarPercent}>{percentage}%</Text>
              </View>
            );
          })}
        </View>
      </View>
      
      <TouchableOpacity style={styles.writeReviewBtn}>
        <Ionicons name="pencil" size={16} color={COLORS.primary} />
        <Text style={styles.writeReviewText}>Write a Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProductDetailsSection = ({ medicine }) => {
  const [expanded, setExpanded] = useState({ description: true, composition: false, uses: false, dosage: false, warnings: false });
  
  const toggleSection = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { key: 'description', title: 'Description', content: medicine.description, icon: 'document-text-outline' },
    { key: 'composition', title: 'Composition', content: medicine.composition, icon: 'flask-outline' },
    { key: 'uses', title: 'Uses', content: medicine.uses?.join('\n• '), icon: 'medkit-outline' },
    { key: 'dosage', title: 'Dosage', content: medicine.dosage, icon: 'timer-outline' },
    { key: 'warnings', title: 'Warnings', content: medicine.warnings?.join('\n• '), icon: 'warning-outline' },
  ];

  return (
    <View style={styles.productDetailsSection}>
      <Text style={styles.sectionTitle}>Product Details</Text>
      
      {sections.map((section) => (
        <View key={section.key} style={styles.accordionItem}>
          <TouchableOpacity 
            style={styles.accordionHeader}
            onPress={() => toggleSection(section.key)}
          >
            <View style={styles.accordionTitleRow}>
              <Ionicons name={section.icon} size={20} color={COLORS.primary} />
              <Text style={styles.accordionTitle}>{section.title}</Text>
            </View>
            <Ionicons 
              name={expanded[section.key] ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={COLORS.textTertiary} 
            />
          </TouchableOpacity>
          
          {expanded[section.key] && (
            <Animated.View entering={FadeInDown.duration(300)}>
              <Text style={styles.accordionContent}>
                {section.key === 'uses' || section.key === 'warnings' ? '• ' + section.content : section.content}
              </Text>
            </Animated.View>
          )}
        </View>
      ))}
    </View>
  );
};

const AlternativesSection = ({ medicine }) => {
  return (
    <View style={styles.alternativesSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Alternatives</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        data={medicine.alternatives || []}
        keyExtractor={(item, idx) => `alt-${idx}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.alternativesList}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.delay(index * 100)}>
            <TouchableOpacity style={styles.alternativeCard}>
              <View style={styles.alternativeIcon}>
                <Ionicons name="medical-outline" size={24} color={COLORS.primary} />
              </View>
              <Text style={styles.alternativeName} numberOfLines={1}>{item}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
};

const RelatedProductsSection = ({ medicine }) => {
  return (
    <View style={styles.relatedSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Related Products</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        horizontal
        data={medicine.relatedProducts || []}
        keyExtractor={(item, idx) => `rel-${idx}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.relatedList}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.delay(index * 80)} style={styles.relatedCard}>
            <TouchableOpacity style={styles.relatedInner}>
              <View style={styles.relatedImageWrap}>
                <Ionicons name="medical" size={28} color={COLORS.primary} />
              </View>
              <Text style={styles.relatedName} numberOfLines={1}>{item}</Text>
              <Text style={styles.relatedBrand} numberOfLines={1}>{medicine.brand}</Text>
              <View style={styles.relatedPriceRow}>
                <Text style={styles.relatedPrice}>₹{medicine.price - 5}</Text>
                <Text style={styles.relatedMrp}>₹{medicine.mrp}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
};

const FAQsSection = ({ medicine }) => {
  const [expandedFaq, setExpandedFaq] = useState({});
  
  const toggleFaq = (idx) => {
    setExpandedFaq(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <View style={styles.faqSection}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      {medicine.faqs?.map((faq, idx) => (
        <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)}>
          <TouchableOpacity 
            style={styles.faqItem}
            onPress={() => toggleFaq(idx)}
          >
            <View style={styles.faqQuestionRow}>
              <Ionicons name="help-circle-outline" size={20} color={COLORS.primary} />
              <Text style={styles.faqQuestion}>{faq.q}</Text>
            </View>
            
            {expandedFaq[idx] && (
              <Animated.View entering={FadeInDown.duration(200)}>
                <View style={styles.faqAnswerRow}>
                  <Ionicons name="checkmark-circle" size={16} color={COLORS.success} />
                  <Text style={styles.faqAnswer}>{faq.a}</Text>
                </View>
              </Animated.View>
            )}
            
            <Ionicons 
              name={expandedFaq[idx] ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={COLORS.textTertiary} 
            />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

const TrustBadgesSection = () => {
  const badges = [
    { icon: 'shield-checkmark', title: '100% Genuine', desc: 'All products' },
    { icon: 'time', title: 'Fast Delivery', desc: 'Same day' },
    { icon: 'refresh', title: 'Easy Returns', desc: '7 days' },
    { icon: 'headset', title: '24/7 Support', desc: 'Always here' },
  ];

  return (
    <View style={styles.trustBadgesSection}>
      <View style={styles.trustBadgesGrid}>
        {badges.map((badge, idx) => (
          <Animated.View key={idx} entering={FadeInUp.delay(idx * 100)} style={styles.trustBadgeItem}>
            <View style={styles.trustBadgeIcon}>
              <Ionicons name={badge.icon} size={24} color={COLORS.primary} />
            </View>
            <Text style={styles.trustBadgeTitle}>{badge.title}</Text>
            <Text style={styles.trustBadgeDesc}>{badge.desc}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const StickyBottomBar = ({ medicine, quantity, setQuantity, onAddToCart, onBuyNow }) => {
  const translateY = useSharedValue(100);
  
  useEffect(() => {
    translateY.value = withSpring(0, { damping: 15 });
  }, []);

  const barStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }]
  }));

  return (
    <Animated.View style={[styles.stickyBottomBar, barStyle]}>
      <LinearGradient colors={[COLORS.white, COLORS.background]} style={styles.stickyGrad}>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Qty</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity 
              style={styles.qtyBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Ionicons name="remove" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyValue}>{quantity}</Text>
            <TouchableOpacity 
              style={styles.qtyBtn}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.addToCartBtn} onPress={onAddToCart}>
            <LinearGradient colors={[COLORS.primaryLight, COLORS.primary]} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={styles.addCartGrad}>
              <Ionicons name="cart" size={20} color={COLORS.white} />
              <Text style={styles.addCartText}>Add to Cart</Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.buyNowBtn} onPress={onBuyNow}>
            <LinearGradient colors={[COLORS.accent, '#FF8F5E']} style={styles.buyNowGrad}>
              <Text style={styles.buyNowText}>Buy Now</Text>
              <Text style={styles.buyNowPrice}>₹{medicine.price * quantity}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

// =====================================================================
// MAIN COMPONENT
// =====================================================================
export default function MedicineDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollViewRef = useRef(null);
  const [quantity, setQuantity] = useState(1);
  const [medicine, setMedicine] = useState(null);
  
  useEffect(() => {
    if (id) {
      const med = getMedicineById(id);
      setMedicine(med);
    }
  }, [id]);

  if (!medicine) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Header 
          medicine={medicine} 
          onBack={() => router.back()} 
          onCart={() => router.push('/cart')}
        />
        
        <ProductImageSection medicine={medicine} />
        <PricingSection medicine={medicine} />
        <RatingReviewsSection medicine={medicine} />
        <ProductDetailsSection medicine={medicine} />
        <AlternativesSection medicine={medicine} />
        <RelatedProductsSection medicine={medicine} />
        <FAQsSection medicine={medicine} />
        <TrustBadgesSection />
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
      
      <StickyBottomBar 
        medicine={medicine}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={() => {}}
        onBuyNow={() => router.push('/cart')}
      />
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
  scrollContent: {
    paddingBottom: 120,
  },
  // Header
  headerWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerGrad: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
    paddingBottom: 20,
    paddingHorizontal: SPACING.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBtn: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
    marginRight: SPACING.md,
  },
  headerTitleWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  headerSub: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: COLORS.accent,
    borderRadius: RADIUS.full,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '700',
  },
  // Product Image Section
  productImageSection: {
    marginTop: 80,
  },
  imageGradient: {
    paddingVertical: SPACING.xxxl,
    alignItems: 'center',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  medicineIconWrap: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
      android: { elevation: 8 },
    }),
  },
  bestsellerBadge: {
    position: 'absolute',
    top: 10,
    left: -20,
  },
  bestsellerGrad: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  bestsellerText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  rxBadge: {
    position: 'absolute',
    top: 10,
    right: -20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.xs,
  },
  rxBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.white,
  },
  // Pricing Section
  pricingSection: {
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.lg,
    marginTop: -SPACING.xl,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8 },
      android: { elevation: 4 },
    }),
  },
  pricingMain: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  priceLabel: {
    fontSize: 12,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  priceSymbol: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginTop: 4,
  },
  priceValue: {
    fontSize: 40,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  mrpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  mrpLabel: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  mrpValue: {
    fontSize: 14,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: SPACING.xs,
  },
  discountBadge: {
    backgroundColor: COLORS.errorLight,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    marginLeft: SPACING.sm,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.error,
  },
  savingsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.successLight,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  savingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.success,
    marginLeft: SPACING.sm,
  },
  deliveryInfo: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: SPACING.md,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  deliveryText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  // Rating Reviews
  ratingReviewsSection: {
    margin: SPACING.lg,
  },
  ratingCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  ratingLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.xl,
  },
  ratingValue: {
    fontSize: 36,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: SPACING.xs,
  },
  ratingCount: {
    fontSize: 11,
    color: COLORS.textTertiary,
  },
  ratingRight: {
    flex: 1,
    justifyContent: 'center',
  },
  ratingBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingBarLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    width: 15,
  },
  ratingBarBg: {
    flex: 1,
    height: 8,
    backgroundColor: COLORS.borderLight,
    borderRadius: 4,
    marginHorizontal: SPACING.sm,
  },
  ratingBarFill: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
  ratingBarPercent: {
    fontSize: 10,
    color: COLORS.textTertiary,
    width: 30,
    textAlign: 'right',
  },
  writeReviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginTop: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  writeReviewText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginLeft: SPACING.sm,
  },
  // Product Details
  productDetailsSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  accordionItem: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  accordionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  accordionContent: {
    fontSize: 13,
    color: COLORS.textSecondary,
    lineHeight: 20,
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  // Alternatives
  alternativesSection: {
    marginBottom: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primary,
  },
  alternativesList: {
    paddingHorizontal: SPACING.lg,
  },
  alternativeCard: {
    alignItems: 'center',
    marginRight: SPACING.md,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  alternativeIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  alternativeName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  // Related Products
  relatedSection: {
    marginBottom: SPACING.lg,
  },
  relatedList: {
    paddingHorizontal: SPACING.lg,
  },
  relatedCard: {
    marginRight: SPACING.md,
    width: 140,
  },
  relatedInner: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  relatedImageWrap: {
    width: 60,
    height: 60,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  relatedName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  relatedBrand: {
    fontSize: 10,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  relatedPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  relatedPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  relatedMrp: {
    fontSize: 10,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    marginLeft: 4,
  },
  // FAQs
  faqSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  faqItem: {
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
    alignItems: 'flex-start',
    flex: 1,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
    marginLeft: SPACING.sm,
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
    fontSize: 13,
    color: COLORS.textSecondary,
    flex: 1,
    marginLeft: SPACING.sm,
    lineHeight: 18,
  },
  // Trust Badges
  trustBadgesSection: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  trustBadgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trustBadgeItem: {
    width: '48%',
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
  trustBadgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  trustBadgeTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  trustBadgeDesc: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  // Sticky Bottom Bar
  stickyBottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  stickyGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
    paddingBottom: Platform.OS === 'ios' ? 30 : SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  quantitySection: {
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  quantityLabel: {
    fontSize: 11,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.xs,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
      android: { elevation: 1 },
    }),
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginHorizontal: SPACING.md,
    minWidth: 30,
    textAlign: 'center',
  },
  bottomButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  addToCartBtn: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  addCartGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  addCartText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  buyNowBtn: {
    flex: 1,
  },
  buyNowGrad: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
  },
  buyNowText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  buyNowPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
    marginLeft: SPACING.sm,
  },
  bottomSpacer: {
    height: 100,
  },
});
