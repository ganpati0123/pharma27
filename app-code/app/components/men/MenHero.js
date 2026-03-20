/**
 * ============================================================================
 * APOLLO 24/7 - MEN HERO, CONCERNS, WELLBEING & FITNESS
 * ============================================================================
 *
 * Premium Men section with animated hero banner, concern cards,
 * wellbeing grid, fitness products carousel, and hair care section.
 *
 * Features:
 * - Animated hero with steel/charcoal branding
 * - 6 concern cards with descriptions & product counts
 * - 4x4 wellbeing grid (16 items)
 * - Fitness products carousel with ratings
 * - Hair care products carousel
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
  Platform,
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
// MEN SCREEN HERO
// ============================================================================
export const MenScreenHero = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const badgeScale = useSharedValue(0.8);
  const shieldPulse = useSharedValue(1);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    badgeScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 120 }));
    shieldPulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const shieldStyle = useAnimatedStyle(() => ({
    transform: [{ scale: shieldPulse.value }],
  }));

  return (
    <Animated.View style={[heroStyles.container, heroStyle]}>
      <LinearGradient
        colors={['rgba(55, 71, 79, 0.06)', 'rgba(21, 101, 192, 0.03)', COLORS.backgroundPure]}
        style={heroStyles.gradient}
      >
        {/* Shield pulse */}
        <Animated.View style={[heroStyles.shieldContainer, shieldStyle]}>
          <Ionicons name="shield" size={28} color={MEN_COLORS.menSteelFaded} />
        </Animated.View>

        <View style={heroStyles.content}>
          <View style={heroStyles.iconRow}>
            <View style={heroStyles.badge}>
              <Ionicons name="man" size={16} color={MEN_COLORS.menSteel} />
            </View>
            <Animated.View style={[heroStyles.editionTag, badgeStyle]}>
              <Text style={heroStyles.editionTagText}>MEN'S HEALTH</Text>
            </Animated.View>
          </View>
          <Text style={heroStyles.title}>Men</Text>
          <Text style={heroStyles.subtitle}>Strength, Wellness & Confidence</Text>
          <Text style={heroStyles.description}>Grooming, fitness, intimate health & daily essentials</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// CONCERN CARD
// ============================================================================
const ConcernCard = React.memo(({ concern, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(40);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 80;
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
    <Animated.View style={[concernStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[concernStyles.card, { backgroundColor: concern.bgColor }]}
      >
        <View style={[concernStyles.iconBg, { backgroundColor: concern.color + '15' }]}>
          <Ionicons name={concern.icon} size={22} color={concern.color} />
        </View>
        <Text style={[concernStyles.name, { color: concern.color }]}>{concern.name}</Text>
        <Text style={concernStyles.description}>{concern.description}</Text>
        <View style={concernStyles.productsBadge}>
          <Text style={[concernStyles.productsText, { color: concern.color }]}>{concern.products} products</Text>
          <Ionicons name="chevron-forward" size={12} color={concern.color} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// CONCERNS SECTION
// ============================================================================
export const ConcernsSection = React.memo(() => {
  const concerns = useMemo(() => MEN_DATA.concerns, []);

  return (
    <View style={concernStyles.section}>
      <View style={concernStyles.sectionHeader}>
        <Ionicons name="pulse" size={18} color={MEN_COLORS.menSteel} />
        <Text style={concernStyles.sectionTitle}>Health Concerns</Text>
      </View>

      <FlatList
        data={concerns}
        renderItem={({ item, index }) => <ConcernCard concern={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={concernStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// WELLBEING ITEM
// ============================================================================
const WellbeingItem = React.memo(({ item, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 30;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.9, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[wellbeingStyles.itemWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={wellbeingStyles.item}
      >
        <View style={[wellbeingStyles.iconContainer, { backgroundColor: item.color + '12' }]}>
          <Ionicons name={item.icon} size={20} color={item.color} />
        </View>
        <Text style={wellbeingStyles.itemName} numberOfLines={1}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// WELLBEING GRID SECTION
// ============================================================================
export const WellbeingGridSection = React.memo(() => {
  const items = useMemo(() => MEN_DATA.wellbeingGrid, []);

  return (
    <View style={wellbeingStyles.section}>
      <View style={wellbeingStyles.sectionHeader}>
        <Text style={wellbeingStyles.sectionTitle}>Men's Wellbeing</Text>
        <View style={wellbeingStyles.badge}>
          <Ionicons name="shield" size={10} color={MEN_COLORS.menSteel} />
          <Text style={wellbeingStyles.badgeText}>ESSENTIALS</Text>
        </View>
      </View>

      <View style={wellbeingStyles.grid}>
        {items.map((item, index) => (
          <WellbeingItem key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// PRODUCT CARD (SHARED)
// ============================================================================
const MenProductCard = React.memo(({ product, index, accentColor }) => {
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
    <Animated.View style={[productStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={productStyles.card}
      >
        {product.badge ? (
          <View style={[productStyles.badge, { backgroundColor: accentColor || MEN_COLORS.menSteel }]}>
            <Text style={productStyles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <View style={productStyles.imageContainer}>
          <LinearGradient colors={['#ECEFF1', '#CFD8DC']} style={productStyles.imagePlaceholder}>
            <Ionicons name="cube" size={24} color={MEN_COLORS.menSteelLight} />
          </LinearGradient>

          <View style={productStyles.ratingBadge}>
            <Ionicons name="star" size={8} color="#FFFFFF" />
            <Text style={productStyles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        {product.variant && (
          <View style={productStyles.variantBadge}>
            <Text style={productStyles.variantText}>{product.variant}</Text>
          </View>
        )}

        <View style={productStyles.discountRow}>
          <Text style={productStyles.discountText}>{product.discount}% off</Text>
        </View>

        <Text style={[productStyles.brand, { color: accentColor || MEN_COLORS.menSteel }]}>{product.brand}</Text>
        <Text style={productStyles.productName} numberOfLines={2}>{product.name}</Text>

        <View style={productStyles.deliveryRow}>
          <Ionicons name="flash" size={10} color="#2E7D32" />
          <Text style={productStyles.deliveryText}>{product.delivery}</Text>
        </View>

        <View style={productStyles.priceRow}>
          <Text style={productStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={productStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        <TouchableOpacity style={productStyles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={productStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// FITNESS PRODUCTS SECTION
// ============================================================================
export const FitnessProductsSection = React.memo(() => {
  const products = useMemo(() => MEN_DATA.fitnessProducts, []);

  return (
    <View style={fitnessStyles.section}>
      <View style={fitnessStyles.sectionHeader}>
        <Ionicons name="fitness" size={18} color={MEN_COLORS.menGreen} />
        <View>
          <Text style={fitnessStyles.sectionTitle}>Fitness & Supplements</Text>
          <Text style={fitnessStyles.sectionSubtitle}>Protein, pre-workout & daily nutrition</Text>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item, index }) => <MenProductCard product={item} index={index} accentColor={MEN_COLORS.menGreen} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={fitnessStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// HAIR CARE PRODUCTS SECTION
// ============================================================================
export const HairCareProductsSection = React.memo(() => {
  const products = useMemo(() => MEN_DATA.hairCareProducts, []);

  return (
    <View style={fitnessStyles.section}>
      <View style={fitnessStyles.sectionHeader}>
        <Ionicons name="cut" size={18} color="#5D4037" />
        <View>
          <Text style={fitnessStyles.sectionTitle}>Hair Growth Solutions</Text>
          <Text style={fitnessStyles.sectionSubtitle}>Combat hair fall with proven treatments</Text>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item, index }) => <MenProductCard product={item} index={index} accentColor="#5D4037" />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={fitnessStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// STYLES - HERO
// ============================================================================
const heroStyles = StyleSheet.create({
  container: { marginBottom: 0 },
  gradient: {
    paddingTop: SPACING.lg, paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.screenPadding,
    position: 'relative', overflow: 'hidden',
  },
  shieldContainer: {
    position: 'absolute', top: -5, right: -5,
    width: 60, height: 60,
    justifyContent: 'center', alignItems: 'center', opacity: 0.4,
  },
  content: { zIndex: 1 },
  iconRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  badge: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: MEN_COLORS.menSteelFaded,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: MEN_COLORS.menBlueSubtle,
  },
  editionTag: {
    backgroundColor: MEN_COLORS.menSteelFaded,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1, borderColor: MEN_COLORS.menBlueSubtle,
  },
  editionTagText: {
    ...TYPOGRAPHY.badge, color: MEN_COLORS.menSteel,
    letterSpacing: 1.5, fontSize: 9,
  },
  title: {
    fontSize: 36, fontWeight: '900', color: COLORS.textPrimary,
    letterSpacing: -0.5, marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.h4, color: MEN_COLORS.menSteel,
    fontWeight: '600', marginBottom: SPACING.xs,
  },
  description: { ...TYPOGRAPHY.bodyMedium, color: COLORS.textTertiary },
});

// ============================================================================
// STYLES - CONCERNS
// ============================================================================
const concernStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: MEN_LAYOUT.concernCardWidth },
  card: {
    borderRadius: RADIUS.xl, padding: SPACING.lg,
    ...SHADOWS.cardSoft, minHeight: 160,
  },
  iconBg: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  name: { fontSize: 14, fontWeight: '800', marginBottom: 4 },
  description: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, lineHeight: 18, marginBottom: SPACING.md },
  productsBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
  },
  productsText: { fontSize: 11, fontWeight: '700' },
});

// ============================================================================
// STYLES - WELLBEING
// ============================================================================
const wellbeingStyles = StyleSheet.create({
  section: { paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: MEN_COLORS.menSteelFaded,
    paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.pill,
  },
  badgeText: { fontSize: 8, fontWeight: '800', color: MEN_COLORS.menSteel },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  itemWrapper: { width: MEN_LAYOUT.wellbeingCardSize },
  item: { alignItems: 'center' },
  iconContainer: {
    width: 48, height: 48, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs,
  },
  itemName: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary, textAlign: 'center' },
});

// ============================================================================
// STYLES - PRODUCT CARD
// ============================================================================
const productStyles = StyleSheet.create({
  cardWrapper: { width: MEN_LAYOUT.productCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle, position: 'relative', overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: 4, left: 4, zIndex: 1,
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
  brand: { fontSize: 10, fontWeight: '700', marginBottom: 1 },
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
// STYLES - FITNESS
// ============================================================================
const fitnessStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginTop: 2 },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
});
