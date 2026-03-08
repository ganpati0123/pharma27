/**
 * ============================================================================
 * APOLLO 24/7 - WOMEN HERO, CATEGORIES, NAPKINS & MOTHERHOOD
 * ============================================================================
 *
 * Premium Women section with animated hero banner, category pills,
 * sanitary napkin size selector, motherhood care tabs, and condition cards.
 *
 * Features:
 * - Animated "Celebrate Her Health" hero banner with sponsors
 * - Horizontal category pills with active state
 * - Interactive napkin size selector with size guide
 * - Motherhood care tabs with product carousel
 * - Condition awareness cards (PCOS, Cramps, etc.)
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
import { WOMEN_COLORS, WOMEN_LAYOUT, WOMEN_DATA } from './WomenTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// WOMEN SCREEN HERO
// ============================================================================
export const WomenScreenHero = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const badgeScale = useSharedValue(0.8);
  const heartPulse = useSharedValue(1);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    badgeScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 120 }));
    heartPulse.value = withRepeat(
      withSequence(
        withTiming(1.15, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) })
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

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartPulse.value }],
  }));

  return (
    <Animated.View style={[heroStyles.container, heroStyle]}>
      <LinearGradient
        colors={['rgba(194, 24, 91, 0.06)', 'rgba(233, 30, 99, 0.03)', COLORS.backgroundPure]}
        style={heroStyles.gradient}
      >
        {/* Heart pulse */}
        <Animated.View style={[heroStyles.heartContainer, heartStyle]}>
          <Ionicons name="heart" size={28} color={WOMEN_COLORS.womenPinkFaded} />
        </Animated.View>

        <View style={heroStyles.content}>
          <View style={heroStyles.iconRow}>
            <View style={heroStyles.badge}>
              <Ionicons name="flower" size={16} color={WOMEN_COLORS.womenPink} />
            </View>
            <Animated.View style={[heroStyles.editionTag, badgeStyle]}>
              <Text style={heroStyles.editionTagText}>WOMEN'S WELLNESS</Text>
            </Animated.View>
          </View>
          <Text style={heroStyles.title}>Women</Text>
          <Text style={heroStyles.subtitle}>Celebrate Her Health</Text>
          <Text style={heroStyles.description}>Feminine care, nutrition & motherhood essentials</Text>

          {/* Sponsors */}
          <View style={heroStyles.sponsorRow}>
            <Text style={heroStyles.sponsorLabel}>Powered by</Text>
            {WOMEN_DATA.heroBanner.sponsors.map((sponsor) => (
              <View key={sponsor.id} style={[heroStyles.sponsorBadge, { backgroundColor: sponsor.color + '10', borderColor: sponsor.color + '20' }]}>
                <Text style={[heroStyles.sponsorText, { color: sponsor.color }]}>{sponsor.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// CATEGORY PILL
// ============================================================================
const CategoryPill = React.memo(({ category, index, isActive, onPress }) => {
  const pillScale = useSharedValue(1);
  const pillOpacity = useSharedValue(0);
  const pillTranslateX = useSharedValue(20);

  useEffect(() => {
    const delay = index * 50;
    pillOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    pillTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    pillScale.value = withSpring(0.93, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    pillScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const pillStyle = useAnimatedStyle(() => ({
    opacity: pillOpacity.value,
    transform: [{ translateX: pillTranslateX.value }, { scale: pillScale.value }],
  }));

  return (
    <Animated.View style={pillStyle}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(category.id)}
        style={[
          catStyles.pill,
          isActive && { backgroundColor: category.color + '12', borderColor: category.color },
        ]}
      >
        <Ionicons name={category.icon} size={14} color={isActive ? category.color : COLORS.textTertiary} />
        <Text style={[catStyles.pillText, isActive && { color: category.color, fontWeight: '700' }]}>
          {category.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// CATEGORIES SECTION
// ============================================================================
export const CategoriesSection = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState(1);
  const categories = useMemo(() => WOMEN_DATA.categories, []);

  return (
    <View style={catStyles.section}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={catStyles.scrollContent}
      >
        {categories.map((cat, index) => (
          <CategoryPill
            key={cat.id}
            category={cat}
            index={index}
            isActive={activeCategory === cat.id}
            onPress={setActiveCategory}
          />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// NAPKIN SIZE CARD
// ============================================================================
const NapkinSizeCard = React.memo(({ napkin, index, isSelected, onPress }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 60;
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
    <Animated.View style={[napkinStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(napkin.id)}
        style={[
          napkinStyles.card,
          isSelected && { borderColor: napkin.color, backgroundColor: napkin.color + '08' },
        ]}
      >
        {/* Size indicator */}
        <View style={[napkinStyles.sizeIndicator, { backgroundColor: napkin.color + '15' }]}>
          <Text style={[napkinStyles.sizeText, { color: napkin.color }]}>{napkin.size}</Text>
        </View>

        <Text style={napkinStyles.description}>{napkin.description}</Text>
        <Text style={napkinStyles.length}>{napkin.length}</Text>
        <Text style={napkinStyles.pads}>{napkin.pads}</Text>

        {isSelected && (
          <View style={[napkinStyles.selectedIndicator, { backgroundColor: napkin.color }]}>
            <Ionicons name="checkmark" size={10} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// NAPKIN SIZE SELECTOR SECTION
// ============================================================================
export const NapkinSizeSelectorSection = React.memo(() => {
  const [selectedSize, setSelectedSize] = useState(3);
  const napkinSizes = useMemo(() => WOMEN_DATA.napkinSizes, []);

  return (
    <View style={napkinStyles.section}>
      <View style={napkinStyles.sectionHeader}>
        <Text style={napkinStyles.sectionTitle}>Choose Your Size</Text>
        <Text style={napkinStyles.sectionSubtitle}>Find the perfect pad for your flow</Text>
      </View>

      <View style={napkinStyles.grid}>
        {napkinSizes.map((napkin, index) => (
          <NapkinSizeCard
            key={napkin.id}
            napkin={napkin}
            index={index}
            isSelected={selectedSize === napkin.id}
            onPress={setSelectedSize}
          />
        ))}
      </View>

      {/* Shop selected */}
      <TouchableOpacity style={napkinStyles.shopButton} activeOpacity={0.7}>
        <Text style={napkinStyles.shopButtonText}>
          Shop {napkinSizes.find(n => n.id === selectedSize)?.size} Pads
        </Text>
        <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
});

// ============================================================================
// MOTHERHOOD PRODUCT CARD
// ============================================================================
const MotherhoodProductCard = React.memo(({ product, index }) => {
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
    <Animated.View style={[motherhoodStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={motherhoodStyles.card}
      >
        {product.badge ? (
          <View style={motherhoodStyles.badge}>
            <Text style={motherhoodStyles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <View style={motherhoodStyles.imageContainer}>
          <LinearGradient colors={['#FCE4EC', '#F8BBD0']} style={motherhoodStyles.imagePlaceholder}>
            <Ionicons name="heart" size={24} color={WOMEN_COLORS.womenPinkLight} />
          </LinearGradient>

          <View style={motherhoodStyles.ratingBadge}>
            <Ionicons name="star" size={8} color="#FFFFFF" />
            <Text style={motherhoodStyles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        <View style={motherhoodStyles.discountRow}>
          <Text style={motherhoodStyles.discountText}>{product.discount}% off</Text>
        </View>

        <Text style={motherhoodStyles.brand}>{product.brand}</Text>
        <Text style={motherhoodStyles.productName} numberOfLines={2}>{product.name}</Text>

        <View style={motherhoodStyles.deliveryRow}>
          <Ionicons name="flash" size={10} color="#2E7D32" />
          <Text style={motherhoodStyles.deliveryText}>{product.delivery}</Text>
        </View>

        <View style={motherhoodStyles.priceRow}>
          <Text style={motherhoodStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={motherhoodStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        <TouchableOpacity style={motherhoodStyles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={motherhoodStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// MOTHERHOOD CARE SECTION
// ============================================================================
export const MotherhoodCareSection = React.memo(() => {
  const [activeTab, setActiveTab] = useState('pregnancy_nutrition');
  const tabs = useMemo(() => WOMEN_DATA.motherhoodTabs, []);
  const products = useMemo(() => WOMEN_DATA.motherhoodProducts, []);

  return (
    <View style={motherhoodStyles.section}>
      <View style={motherhoodStyles.sectionHeader}>
        <Ionicons name="heart" size={18} color={WOMEN_COLORS.womenPink} />
        <View>
          <Text style={motherhoodStyles.sectionTitle}>Motherhood Care</Text>
          <Text style={motherhoodStyles.sectionSubtitle}>Everything for expecting & new moms</Text>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={motherhoodStyles.tabsScroll}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => setActiveTab(tab.id)}
            style={[
              motherhoodStyles.tab,
              activeTab === tab.id && motherhoodStyles.tabActive,
            ]}
          >
            <Ionicons
              name={tab.icon}
              size={14}
              color={activeTab === tab.id ? WOMEN_COLORS.womenPink : COLORS.textTertiary}
            />
            <Text style={[
              motherhoodStyles.tabText,
              activeTab === tab.id && motherhoodStyles.tabTextActive,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <FlatList
        data={products}
        renderItem={({ item, index }) => <MotherhoodProductCard product={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={motherhoodStyles.productScroll}
      />
    </View>
  );
});

// ============================================================================
// CONDITION CARD
// ============================================================================
const ConditionCard = React.memo(({ condition, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(50);
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
    <Animated.View style={[conditionStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[conditionStyles.card, { backgroundColor: condition.bgColor }]}
      >
        {/* Header */}
        <View style={conditionStyles.cardHeader}>
          <View style={[conditionStyles.iconBg, { backgroundColor: condition.color + '15' }]}>
            <Ionicons name={condition.icon} size={20} color={condition.color} />
          </View>
          <Text style={[conditionStyles.conditionName, { color: condition.color }]}>{condition.name}</Text>
        </View>

        {/* Description */}
        <Text style={conditionStyles.description}>{condition.description}</Text>

        {/* Symptoms */}
        <Text style={conditionStyles.symptomsLabel}>Common Symptoms:</Text>
        <View style={conditionStyles.symptomsRow}>
          {condition.symptoms.map((symptom, idx) => (
            <View key={idx} style={conditionStyles.symptomChip}>
              <Text style={conditionStyles.symptomText}>{symptom}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={conditionStyles.ctaRow}>
          <View style={conditionStyles.productsCount}>
            <Text style={conditionStyles.productsCountText}>{condition.products}+ products</Text>
          </View>
          <TouchableOpacity style={[conditionStyles.shopButton, { backgroundColor: condition.color }]} activeOpacity={0.7}>
            <Text style={conditionStyles.shopButtonText}>Shop Now</Text>
            <Ionicons name="arrow-forward" size={12} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Top product */}
        <View style={conditionStyles.topProductRow}>
          <Ionicons name="star" size={10} color={condition.color} />
          <Text style={conditionStyles.topProductText}>Top: {condition.topProduct}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// HER HEALTH CONDITIONS SECTION
// ============================================================================
export const HerHealthConditionsSection = React.memo(() => {
  const conditions = useMemo(() => WOMEN_DATA.conditionCards, []);

  return (
    <View style={conditionStyles.section}>
      <View style={conditionStyles.sectionHeader}>
        <Ionicons name="medical" size={18} color={WOMEN_COLORS.womenPink} />
        <View>
          <Text style={conditionStyles.sectionTitle}>Her Health Conditions</Text>
          <Text style={conditionStyles.sectionSubtitle}>Awareness & care for common conditions</Text>
        </View>
      </View>

      <FlatList
        data={conditions}
        renderItem={({ item, index }) => <ConditionCard condition={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={conditionStyles.scrollContent}
        snapToInterval={WOMEN_LAYOUT.conditionCardWidth + SPACING.md}
        decelerationRate="fast"
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
  heartContainer: {
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
    backgroundColor: WOMEN_COLORS.womenPinkFaded,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: WOMEN_COLORS.womenPinkSubtle,
  },
  editionTag: {
    backgroundColor: WOMEN_COLORS.womenPinkFaded,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1, borderColor: WOMEN_COLORS.womenPinkSubtle,
  },
  editionTagText: {
    ...TYPOGRAPHY.badge, color: WOMEN_COLORS.womenPink,
    letterSpacing: 1.5, fontSize: 9,
  },
  title: {
    fontSize: 36, fontWeight: '900', color: COLORS.textPrimary,
    letterSpacing: -0.5, marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.h4, color: WOMEN_COLORS.womenPink,
    fontWeight: '600', marginBottom: SPACING.xs,
  },
  description: { ...TYPOGRAPHY.bodyMedium, color: COLORS.textTertiary, marginBottom: SPACING.md },
  sponsorRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  sponsorLabel: { ...TYPOGRAPHY.caption, color: COLORS.textMuted },
  sponsorBadge: {
    paddingHorizontal: SPACING.sm, paddingVertical: 3,
    borderRadius: RADIUS.sm, borderWidth: 1,
  },
  sponsorText: { fontSize: 9, fontWeight: '700' },
});

// ============================================================================
// STYLES - CATEGORIES
// ============================================================================
const catStyles = StyleSheet.create({
  section: { marginTop: SPACING.lg },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.sm },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1, borderColor: COLORS.borderLight,
  },
  pillText: { ...TYPOGRAPHY.labelSmall, color: COLORS.textSecondary, fontWeight: '600' },
});

// ============================================================================
// STYLES - NAPKIN
// ============================================================================
const napkinStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl,
  },
  sectionHeader: { marginBottom: SPACING.lg },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: { ...TYPOGRAPHY.bodySmall, color: COLORS.textTertiary, marginTop: 2 },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  cardWrapper: { width: WOMEN_LAYOUT.napkinCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.md, borderWidth: 1.5, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle, alignItems: 'center', position: 'relative',
  },
  sizeIndicator: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill, marginBottom: SPACING.xs,
  },
  sizeText: { fontSize: 12, fontWeight: '800' },
  description: { fontSize: 9, color: COLORS.textTertiary, textAlign: 'center', marginBottom: 2 },
  length: { fontSize: 10, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 1 },
  pads: { fontSize: 8, color: COLORS.textMuted },
  selectedIndicator: {
    position: 'absolute', top: 4, right: 4,
    width: 18, height: 18, borderRadius: 9,
    justifyContent: 'center', alignItems: 'center',
  },
  shopButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: WOMEN_COLORS.womenPink,
    paddingVertical: SPACING.md, borderRadius: RADIUS.md, gap: SPACING.sm,
  },
  shopButtonText: { ...TYPOGRAPHY.labelLarge, color: '#FFFFFF', fontWeight: '700' },
});

// ============================================================================
// STYLES - MOTHERHOOD
// ============================================================================
const motherhoodStyles = StyleSheet.create({
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
    backgroundColor: WOMEN_COLORS.womenPinkFaded,
    borderColor: WOMEN_COLORS.womenPink,
  },
  tabText: { ...TYPOGRAPHY.labelSmall, color: COLORS.textTertiary, fontWeight: '600' },
  tabTextActive: { color: WOMEN_COLORS.womenPink, fontWeight: '700' },
  productScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: WOMEN_LAYOUT.productCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle, position: 'relative', overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: 4, left: 4, zIndex: 1,
    backgroundColor: WOMEN_COLORS.womenPink,
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
  brand: { fontSize: 10, fontWeight: '700', color: WOMEN_COLORS.womenPink, marginBottom: 1 },
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
// STYLES - CONDITIONS
// ============================================================================
const conditionStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginTop: 2 },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: WOMEN_LAYOUT.conditionCardWidth },
  card: {
    borderRadius: RADIUS.xl, padding: SPACING.lg,
    ...SHADOWS.cardSoft,
  },
  cardHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  iconBg: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
  },
  conditionName: { fontSize: 16, fontWeight: '800' },
  description: {
    ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary,
    lineHeight: 18, marginBottom: SPACING.md,
  },
  symptomsLabel: { ...TYPOGRAPHY.labelSmall, color: COLORS.textTertiary, marginBottom: SPACING.xs },
  symptomsRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 4,
    marginBottom: SPACING.md,
  },
  symptomChip: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  symptomText: { fontSize: 9, fontWeight: '600', color: COLORS.textSecondary },
  ctaRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  productsCount: {},
  productsCountText: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary },
  shopButton: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: SPACING.md, paddingVertical: 6,
    borderRadius: RADIUS.md, gap: 4,
  },
  shopButtonText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
  topProductRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
  },
  topProductText: { fontSize: 9, fontWeight: '600', color: COLORS.textTertiary },
});
