/**
 * ============================================================================
 * APOLLO 24/7 - MEN GROOMING, INTIMATE, BRANDS, TESTIMONIALS & TIPS
 * ============================================================================
 *
 * Premium Men section components including grooming tabs with products,
 * intimate health tabs with products, trusted brands grid, testimonials
 * carousel, and wellness tips section.
 *
 * Features:
 * - Grooming tabs (Razor, Shaving Foam, Perfume, etc.) with product carousel
 * - Intimate health tabs (Condoms, Lubricants, etc.) with product carousel
 * - Trusted brands grid (12 brands)
 * - Testimonials carousel
 * - Men's wellness tips section
 * - Spring physics on all interactions
 *
 * ============================================================================
 */

import React, { useEffect, useCallback, useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION } from '../home/theme';
import { MEN_COLORS, MEN_LAYOUT, MEN_DATA } from './MenTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// GROOMING PRODUCT CARD
// ============================================================================
const GroomingProductCard = React.memo(({ product, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 60;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[groomStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={groomStyles.card}
      >
        {product.badge ? (
          <View style={groomStyles.badge}>
            <Text style={groomStyles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <View style={groomStyles.imageContainer}>
          <LinearGradient colors={['#ECEFF1', '#CFD8DC']} style={groomStyles.imagePlaceholder}>
            <Ionicons name="sparkles" size={24} color={MEN_COLORS.menSteelLight} />
          </LinearGradient>

          <View style={groomStyles.ratingBadge}>
            <Ionicons name="star" size={8} color="#FFFFFF" />
            <Text style={groomStyles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        <View style={groomStyles.discountRow}>
          <Text style={groomStyles.discountText}>{product.discount}% off</Text>
        </View>

        <Text style={groomStyles.brand}>{product.brand}</Text>
        <Text style={groomStyles.productName} numberOfLines={2}>{product.name}</Text>

        <View style={groomStyles.deliveryRow}>
          <Ionicons name="flash" size={10} color="#2E7D32" />
          <Text style={groomStyles.deliveryText}>{product.delivery}</Text>
        </View>

        <View style={groomStyles.priceRow}>
          <Text style={groomStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={groomStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        <TouchableOpacity style={groomStyles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={groomStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// GROOMING ESSENTIALS SECTION
// ============================================================================
export const GroomingEssentialsSection = React.memo(() => {
  const [activeTab, setActiveTab] = useState('razor');
  const tabs = useMemo(() => MEN_DATA.groomingTabs, []);
  const products = useMemo(() => MEN_DATA.groomingProducts, []);

  return (
    <View style={groomStyles.section}>
      <View style={groomStyles.sectionHeader}>
        <Ionicons name="sparkles" size={18} color={MEN_COLORS.menSteel} />
        <View>
          <Text style={groomStyles.sectionTitle}>Grooming Essentials</Text>
          <Text style={groomStyles.sectionSubtitle}>Premium grooming for the modern man</Text>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={groomStyles.tabsScroll}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => setActiveTab(tab.id)}
            style={[
              groomStyles.tab,
              activeTab === tab.id && groomStyles.tabActive,
            ]}
          >
            <Ionicons
              name={tab.icon}
              size={14}
              color={activeTab === tab.id ? MEN_COLORS.menSteel : COLORS.textTertiary}
            />
            <Text style={[
              groomStyles.tabText,
              activeTab === tab.id && groomStyles.tabTextActive,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <FlatList
        data={products}
        renderItem={({ item, index }) => <GroomingProductCard product={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={groomStyles.productScroll}
      />
    </View>
  );
});

// ============================================================================
// INTIMATE PRODUCT CARD
// ============================================================================
const IntimateProductCard = React.memo(({ product, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 60;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[intimateStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={intimateStyles.card}
      >
        {product.badge ? (
          <View style={intimateStyles.badge}>
            <Text style={intimateStyles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <View style={intimateStyles.imageContainer}>
          <LinearGradient colors={['#ECEFF1', '#CFD8DC']} style={intimateStyles.imagePlaceholder}>
            <Ionicons name="shield" size={24} color={MEN_COLORS.menSteelLight} />
          </LinearGradient>

          <View style={intimateStyles.ratingBadge}>
            <Ionicons name="star" size={8} color="#FFFFFF" />
            <Text style={intimateStyles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        {product.variant && (
          <View style={intimateStyles.variantBadge}>
            <Text style={intimateStyles.variantText}>{product.variant}</Text>
          </View>
        )}

        <View style={intimateStyles.discountRow}>
          <Text style={intimateStyles.discountText}>{product.discount}% off</Text>
        </View>

        <Text style={intimateStyles.brand}>{product.brand}</Text>
        <Text style={intimateStyles.productName} numberOfLines={2}>{product.name}</Text>

        <View style={intimateStyles.deliveryRow}>
          <Ionicons name="flash" size={10} color="#2E7D32" />
          <Text style={intimateStyles.deliveryText}>{product.delivery}</Text>
        </View>

        <View style={intimateStyles.priceRow}>
          <Text style={intimateStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={intimateStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        <TouchableOpacity style={intimateStyles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={intimateStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// INTIMATE HEALTH SECTION
// ============================================================================
export const IntimateHealthSection = React.memo(() => {
  const [activeTab, setActiveTab] = useState('condoms');
  const tabs = useMemo(() => MEN_DATA.intimateTabs, []);
  const products = useMemo(() => MEN_DATA.intimateProducts, []);

  return (
    <View style={intimateStyles.section}>
      <View style={intimateStyles.sectionHeader}>
        <Ionicons name="heart" size={18} color={MEN_COLORS.menRed} />
        <View>
          <Text style={intimateStyles.sectionTitle}>Intimate Health</Text>
          <Text style={intimateStyles.sectionSubtitle}>Discreet packaging & fast delivery</Text>
        </View>
      </View>

      {/* Privacy badge */}
      <View style={intimateStyles.privacyBadge}>
        <Ionicons name="lock-closed" size={12} color={MEN_COLORS.menGreen} />
        <Text style={intimateStyles.privacyText}>100% Discreet Packaging Guaranteed</Text>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={intimateStyles.tabsScroll}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => setActiveTab(tab.id)}
            style={[
              intimateStyles.tab,
              activeTab === tab.id && intimateStyles.tabActive,
            ]}
          >
            <Ionicons
              name={tab.icon}
              size={14}
              color={activeTab === tab.id ? MEN_COLORS.menRed : COLORS.textTertiary}
            />
            <Text style={[
              intimateStyles.tabText,
              activeTab === tab.id && intimateStyles.tabTextActive,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <FlatList
        data={products}
        renderItem={({ item, index }) => <IntimateProductCard product={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={intimateStyles.productScroll}
      />
    </View>
  );
});

// ============================================================================
// BRAND CARD
// ============================================================================
const BrandCard = React.memo(({ brand, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 50;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.94, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[brandStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[brandStyles.card, { backgroundColor: brand.bgColor }]}
      >
        <View style={[brandStyles.logoBg, { backgroundColor: brand.color + '15' }]}>
          <Text style={[brandStyles.logoText, { color: brand.color }]}>
            {brand.name.substring(0, 2).toUpperCase()}
          </Text>
        </View>
        <Text style={[brandStyles.brandName, { color: brand.color }]} numberOfLines={1}>
          {brand.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TRUSTED BRANDS SECTION
// ============================================================================
export const MenTrustedBrandsSection = React.memo(() => {
  const brands = useMemo(() => MEN_DATA.trustedBrands, []);

  return (
    <View style={brandStyles.section}>
      <View style={brandStyles.sectionHeader}>
        <Text style={brandStyles.sectionTitle}>Trusted Brands for Men</Text>
        <TouchableOpacity style={brandStyles.viewAll} activeOpacity={0.7}>
          <Text style={brandStyles.viewAllText}>View All</Text>
          <Ionicons name="arrow-forward" size={14} color={MEN_COLORS.menSteel} />
        </TouchableOpacity>
      </View>

      <View style={brandStyles.grid}>
        {brands.map((brand, index) => (
          <BrandCard key={brand.id} brand={brand} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================
const TestimonialCard = React.memo(({ testimonial, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(40);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 100;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.97, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[testimonialStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={testimonialStyles.card}
      >
        <View style={testimonialStyles.quoteIcon}>
          <Text style={testimonialStyles.quoteText}>{'\u201C'}</Text>
        </View>

        <View style={testimonialStyles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= testimonial.rating ? 'star' : 'star-outline'}
              size={12}
              color={MEN_COLORS.menBlue}
            />
          ))}
        </View>

        <Text style={testimonialStyles.testimonialText}>{testimonial.text}</Text>

        <View style={testimonialStyles.divider} />

        <View style={testimonialStyles.userRow}>
          <View style={testimonialStyles.avatar}>
            <Ionicons name={testimonial.avatar} size={18} color={MEN_COLORS.menSteel} />
          </View>
          <View>
            <Text style={testimonialStyles.userName}>{testimonial.name}</Text>
            <Text style={testimonialStyles.userAge}>{testimonial.age} yrs</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================
export const MenTestimonialsSection = React.memo(() => {
  const testimonials = useMemo(() => MEN_DATA.testimonials, []);

  return (
    <View style={testimonialStyles.section}>
      <View style={testimonialStyles.sectionHeader}>
        <Ionicons name="chatbubbles" size={18} color={MEN_COLORS.menSteel} />
        <Text style={testimonialStyles.sectionTitle}>What Men Say</Text>
      </View>

      <FlatList
        data={testimonials}
        renderItem={({ item, index }) => <TestimonialCard testimonial={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={testimonialStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// WELLNESS TIP CARD
// ============================================================================
const WellnessTipCard = React.memo(({ tip, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 80;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[tipStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={tipStyles.card}
      >
        <View style={[tipStyles.tipIcon, { backgroundColor: tip.color + '12' }]}>
          <Ionicons name={tip.icon} size={20} color={tip.color} />
        </View>
        <Text style={tipStyles.tipTitle}>{tip.title}</Text>
        <Text style={tipStyles.tipDescription}>{tip.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// MEN WELLNESS TIPS SECTION
// ============================================================================
export const MenWellnessTipsSection = React.memo(() => {
  const tips = useMemo(() => MEN_DATA.menWellnessTips, []);

  return (
    <View style={tipStyles.section}>
      <View style={tipStyles.sectionHeader}>
        <Ionicons name="bulb" size={18} color={MEN_COLORS.menSteel} />
        <Text style={tipStyles.sectionTitle}>Men's Wellness Tips</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tipStyles.scrollContent}
      >
        {tips.map((tip, index) => (
          <WellnessTipCard key={tip.id} tip={tip} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// STYLES - GROOMING
// ============================================================================
const groomStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginTop: 2 },
  tabsScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.sm, marginBottom: SPACING.lg },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill, backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1, borderColor: COLORS.borderLight,
  },
  tabActive: {
    backgroundColor: MEN_COLORS.menSteelFaded,
    borderColor: MEN_COLORS.menSteel,
  },
  tabText: { ...TYPOGRAPHY.labelSmall, color: COLORS.textTertiary, fontWeight: '600' },
  tabTextActive: { color: MEN_COLORS.menSteel, fontWeight: '700' },
  productScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: MEN_LAYOUT.productCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle, position: 'relative', overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: 4, left: 4, zIndex: 1,
    backgroundColor: MEN_COLORS.menSteel,
    paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  badgeText: { fontSize: 7, fontWeight: '900', color: '#FFFFFF' },
  imageContainer: {
    width: '100%', height: 90, borderRadius: RADIUS.sm,
    overflow: 'hidden', marginBottom: 4, position: 'relative',
  },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ratingBadge: {
    position: 'absolute', bottom: 4, right: 4,
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 4,
    paddingVertical: 1, borderRadius: 3,
  },
  ratingText: { fontSize: 8, fontWeight: '700', color: '#FFFFFF' },
  discountRow: { marginBottom: 2 },
  discountText: { fontSize: 9, fontWeight: '700', color: '#E53935' },
  brand: { fontSize: 10, fontWeight: '700', color: MEN_COLORS.menSteel, marginBottom: 1 },
  productName: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, lineHeight: 15, marginBottom: 4 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 4 },
  deliveryText: { fontSize: 9, fontWeight: '600', color: '#2E7D32' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: SPACING.xs },
  price: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
  oldPrice: { fontSize: 10, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, paddingVertical: 5,
    borderRadius: RADIUS.sm, gap: 2,
  },
  addButtonText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
});

// ============================================================================
// STYLES - INTIMATE
// ============================================================================
const intimateStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.sm,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginTop: 2 },
  privacyBadge: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginHorizontal: SPACING.screenPadding,
    backgroundColor: MEN_COLORS.menGreenFaded,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.pill, marginBottom: SPACING.lg,
    alignSelf: 'flex-start',
  },
  privacyText: { fontSize: 10, fontWeight: '700', color: MEN_COLORS.menGreen },
  tabsScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.sm, marginBottom: SPACING.lg },
  tab: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill, backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1, borderColor: COLORS.borderLight,
  },
  tabActive: {
    backgroundColor: MEN_COLORS.menRedFaded,
    borderColor: MEN_COLORS.menRed,
  },
  tabText: { ...TYPOGRAPHY.labelSmall, color: COLORS.textTertiary, fontWeight: '600' },
  tabTextActive: { color: MEN_COLORS.menRed, fontWeight: '700' },
  productScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: MEN_LAYOUT.productCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle, position: 'relative', overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: 4, left: 4, zIndex: 1,
    backgroundColor: MEN_COLORS.menRed,
    paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  badgeText: { fontSize: 7, fontWeight: '900', color: '#FFFFFF' },
  imageContainer: {
    width: '100%', height: 90, borderRadius: RADIUS.sm,
    overflow: 'hidden', marginBottom: 4, position: 'relative',
  },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ratingBadge: {
    position: 'absolute', bottom: 4, right: 4,
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 4,
    paddingVertical: 1, borderRadius: 3,
  },
  ratingText: { fontSize: 8, fontWeight: '700', color: '#FFFFFF' },
  variantBadge: {
    backgroundColor: MEN_COLORS.menSteelFaded,
    paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
    alignSelf: 'flex-start', marginBottom: 2,
  },
  variantText: { fontSize: 8, fontWeight: '600', color: MEN_COLORS.menSteel },
  discountRow: { marginBottom: 2 },
  discountText: { fontSize: 9, fontWeight: '700', color: '#E53935' },
  brand: { fontSize: 10, fontWeight: '700', color: MEN_COLORS.menRed, marginBottom: 1 },
  productName: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, lineHeight: 15, marginBottom: 4 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 4 },
  deliveryText: { fontSize: 9, fontWeight: '600', color: '#2E7D32' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: SPACING.xs },
  price: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
  oldPrice: { fontSize: 10, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, paddingVertical: 5,
    borderRadius: RADIUS.sm, gap: 2,
  },
  addButtonText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
});

// ============================================================================
// STYLES - BRANDS
// ============================================================================
const brandStyles = StyleSheet.create({
  section: { paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  viewAll: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewAllText: { ...TYPOGRAPHY.labelSmall, color: MEN_COLORS.menSteel, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  cardWrapper: { width: MEN_LAYOUT.brandCardSize },
  card: {
    borderRadius: RADIUS.card, padding: SPACING.md, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.borderLight, ...SHADOWS.subtle,
  },
  logoBg: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs,
  },
  logoText: { fontSize: 13, fontWeight: '900' },
  brandName: { fontSize: 10, fontWeight: '700', textAlign: 'center' },
});

// ============================================================================
// STYLES - TESTIMONIALS
// ============================================================================
const testimonialStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: SCREEN_WIDTH * 0.7 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.xl,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, position: 'relative',
  },
  quoteIcon: { position: 'absolute', top: 8, right: 16 },
  quoteText: { fontSize: 36, color: MEN_COLORS.menBlueFaded, fontWeight: '900', lineHeight: 40 },
  ratingRow: { flexDirection: 'row', gap: 2, marginBottom: SPACING.md },
  testimonialText: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, lineHeight: 20, marginBottom: SPACING.md },
  divider: { height: 1, backgroundColor: COLORS.dividerLight, marginBottom: SPACING.md },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: MEN_COLORS.menSteelFaded,
    justifyContent: 'center', alignItems: 'center',
  },
  userName: { ...TYPOGRAPHY.labelMedium, color: COLORS.textPrimary },
  userAge: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary },
});

// ============================================================================
// STYLES - TIPS
// ============================================================================
const tipStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: 160 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, minHeight: 150,
  },
  tipIcon: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md,
  },
  tipTitle: { ...TYPOGRAPHY.labelLarge, color: COLORS.textPrimary, marginBottom: 4 },
  tipDescription: { fontSize: 11, color: COLORS.textTertiary, lineHeight: 16 },
});
