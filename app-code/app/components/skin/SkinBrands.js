/**
 * ============================================================================
 * TRUSTED BRANDS + KEY INGREDIENTS SECTIONS
 * ============================================================================
 *
 * Rose Gold Edition - Premium Brand Showcase & Ingredient Discovery
 *
 * Contains:
 * 1. TrustedBrands - 14 brand cards in 2x7 grid with:
 *    - Staggered entrance animations
 *    - Badge overlay (FLAT 10% OFF, FEATURED, BESTSELLER, etc.)
 *    - Press scale + gold shimmer border
 *    - Product image placeholder with brand icon
 *    - Hover lift with rose gold glow
 *
 * 2. KeyIngredients - 7 horizontal scrolling cards with:
 *    - Gradient left accent bar per ingredient
 *    - Benefits text with ingredient icon
 *    - Entrance slide-in from right
 *    - Press scale + shadow lift
 *    - Product image placeholder
 *
 * ============================================================================
 */

import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';
import { SKIN_COLORS, SKIN_LAYOUT, TRUSTED_BRANDS, KEY_INGREDIENTS } from './SkinTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// ANIMATED BRAND CARD
// ============================================================================
const AnimatedBrandCard = React.memo(({ brand, index, onPress }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const entranceOpacity = useSharedValue(0);
  const entranceScale = useSharedValue(0.85);
  const glowOpacity = useSharedValue(0);
  const badgePulse = useSharedValue(0);
  const iconBounce = useSharedValue(0);
  const borderShimmer = useSharedValue(0);

  useEffect(() => {
    const delay = 80 + index * 60;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceScale.value = withDelay(delay, withSpring(1, ANIMATION.spring.gentle));

    // Badge subtle pulse
    badgePulse.value = withDelay(
      delay + 300,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );

    // Border shimmer
    borderShimmer.value = withDelay(
      delay + 600,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.94, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(-6, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
    iconBounce.value = withSequence(
      withSpring(-5, { damping: 4, stiffness: 400 }),
      withSpring(0, ANIMATION.spring.gentle)
    );
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    cardTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateY: cardTranslateY.value },
      { scale: entranceScale.value * cardScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(badgePulse.value, [0, 1], [1, 1.05]) }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconBounce.value }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: `rgba(255, 215, 0, ${interpolate(borderShimmer.value, [0, 1], [0.08, 0.25])})`,
  }));

  return (
    <Animated.View style={[styles.brandCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress && onPress(brand)}
      >
        <Animated.View style={[styles.brandCard, borderStyle]}>
          {/* Gold glow overlay */}
          <Animated.View style={[styles.brandCardGlow, glowStyle]} />

          {/* Badge */}
          <Animated.View style={[styles.brandBadge, { backgroundColor: brand.badgeColor }, badgeAnimatedStyle]}>
            <Text style={styles.brandBadgeText}>{brand.badge}</Text>
          </Animated.View>

          {/* Product Image Placeholder */}
          <Animated.View style={[styles.brandImageContainer, iconAnimatedStyle]}>
            <LinearGradient
              colors={[brand.bgColor, COLORS.cardWhite]}
              style={styles.brandImagePlaceholder}
            >
              <Ionicons name={brand.icon} size={36} color={brand.badgeColor} />
            </LinearGradient>
          </Animated.View>

          {/* Brand Name */}
          <Text style={styles.brandName} numberOfLines={2}>{brand.name}</Text>

          {/* Shop Now link */}
          <View style={styles.brandShopRow}>
            <Text style={styles.brandShopText}>Shop Now</Text>
            <Ionicons name="chevron-forward" size={12} color={SKIN_COLORS.roseGold} />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TRUSTED BRANDS SECTION
// ============================================================================
export const TrustedBrandsSection = React.memo(({ onBrandPress }) => {
  const brands = useMemo(() => TRUSTED_BRANDS, []);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(30);
  const headerShimmer = useSharedValue(0);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    headerShimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const headerGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(headerShimmer.value, [0, 1], [0.8, 1]),
  }));

  return (
    <Animated.View style={[styles.brandsSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.brandsSectionHeader}>
        <View style={styles.brandsHeaderLeft}>
          <View style={styles.brandsHeaderIconContainer}>
            <Ionicons name="heart" size={20} color={SKIN_COLORS.roseGold} />
          </View>
          <View>
            <Animated.Text style={[styles.brandsSectionTitle, headerGlowStyle]}>
              Most Trusted Brands
            </Animated.Text>
            <Text style={styles.brandsSectionSubtitle}>
              Dermatologist recommended skincare
            </Text>
          </View>
        </View>
        <View style={styles.brandsCountBadge}>
          <Text style={styles.brandsCountText}>{brands.length} Brands</Text>
        </View>
      </View>

      {/* Brands Grid - 2 columns */}
      <View style={styles.brandsGrid}>
        {brands.map((brand, index) => (
          <AnimatedBrandCard
            key={brand.id}
            brand={brand}
            index={index}
            onPress={onBrandPress}
          />
        ))}
      </View>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED INGREDIENT CARD
// ============================================================================
const AnimatedIngredientCard = React.memo(({ ingredient, index }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateX = useSharedValue(40);
  const glowOpacity = useSharedValue(0);
  const accentPulse = useSharedValue(0);
  const iconRotation = useSharedValue(0);

  useEffect(() => {
    const delay = index * 100;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));

    accentPulse.value = withDelay(
      delay + 500,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(-4, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
    iconRotation.value = withSpring(8, ANIMATION.spring.bouncy);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    cardTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
    iconRotation.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateX: entranceTranslateX.value },
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const accentStyle = useAnimatedStyle(() => ({
    opacity: interpolate(accentPulse.value, [0, 1], [0.7, 1]),
    transform: [{ scaleY: interpolate(accentPulse.value, [0, 1], [0.95, 1.05]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.ingredientCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.ingredientCard}
      >
        {/* Gold glow overlay */}
        <Animated.View style={[styles.ingredientCardGlow, glowStyle]} />

        {/* Left Accent Bar */}
        <Animated.View style={accentStyle}>
          <LinearGradient
            colors={ingredient.gradient}
            style={styles.ingredientAccentBar}
          />
        </Animated.View>

        {/* Content */}
        <View style={styles.ingredientContent}>
          {/* Top row: icon + name */}
          <View style={styles.ingredientTopRow}>
            <Animated.View style={[styles.ingredientIconContainer, { backgroundColor: ingredient.bgColor }, iconStyle]}>
              <Ionicons name={ingredient.icon} size={24} color={ingredient.color} />
            </Animated.View>
            <View style={styles.ingredientTextContainer}>
              <Text style={[styles.ingredientName, { color: ingredient.color }]}>
                {ingredient.name}
              </Text>
              <Text style={styles.ingredientBenefits} numberOfLines={2}>
                {ingredient.benefits}
              </Text>
            </View>
          </View>

          {/* Product image placeholder */}
          <View style={styles.ingredientProductRow}>
            <LinearGradient
              colors={[ingredient.bgColor, COLORS.cardWhite]}
              style={styles.ingredientProductImage}
            >
              <Ionicons name="flask" size={20} color={ingredient.color} />
            </LinearGradient>
            <View style={styles.ingredientExploreContainer}>
              <Text style={[styles.ingredientExploreText, { color: ingredient.color }]}>
                Explore Products
              </Text>
              <Ionicons name="chevron-forward" size={12} color={ingredient.color} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// KEY INGREDIENTS SECTION
// ============================================================================
export const KeyIngredientsSection = React.memo(() => {
  const ingredients = useMemo(() => KEY_INGREDIENTS, []);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(30);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const renderIngredient = useCallback(({ item, index }) => (
    <AnimatedIngredientCard ingredient={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item) => `ingredient-${item.id}`, []);

  return (
    <Animated.View style={[styles.ingredientsSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.ingredientsSectionHeader}>
        <View style={styles.ingredientsHeaderLeft}>
          <View style={styles.ingredientsHeaderIconContainer}>
            <Ionicons name="flask" size={20} color={COLORS.apolloGreen} />
          </View>
          <View>
            <Text style={styles.ingredientsSectionTitle}>Find Your Key Ingredient</Text>
            <Text style={styles.ingredientsSectionSubtitle}>
              Science-backed ingredients for your skin
            </Text>
          </View>
        </View>
      </View>

      {/* Ingredients Horizontal Scroll */}
      <FlatList
        data={ingredients}
        renderItem={renderIngredient}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.ingredientsListContent}
        snapToInterval={SKIN_LAYOUT.ingredientCardWidth + SPACING.md}
        decelerationRate="fast"
        bounces={true}
      />
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ========================================================================
  // BRANDS SECTION STYLES
  // ========================================================================
  brandsSection: {
    paddingTop: SPACING.section,
  },
  brandsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  brandsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  brandsHeaderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SKIN_COLORS.roseGoldFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SKIN_COLORS.roseGoldSubtle,
  },
  brandsSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  brandsSectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  brandsCountBadge: {
    backgroundColor: SKIN_COLORS.roseGoldFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: SKIN_COLORS.roseGoldSubtle,
  },
  brandsCountText: {
    ...TYPOGRAPHY.labelSmall,
    color: SKIN_COLORS.roseGold,
  },
  brandsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // ========================================================================
  // BRAND CARD STYLES
  // ========================================================================
  brandCardOuter: {
    width: SKIN_LAYOUT.brandCardWidth,
  },
  brandCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    alignItems: 'center',
    minHeight: SKIN_LAYOUT.brandCardHeight,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  brandCardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(255, 215, 0, 0.06)',
  },
  brandBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    zIndex: 1,
  },
  brandBadgeText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontWeight: '900',
    fontSize: 8,
  },
  brandImageContainer: {
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  brandImagePlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  brandName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  brandShopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  brandShopText: {
    ...TYPOGRAPHY.bodySmall,
    color: SKIN_COLORS.roseGold,
    fontWeight: '600',
  },

  // ========================================================================
  // INGREDIENTS SECTION STYLES
  // ========================================================================
  ingredientsSection: {
    paddingTop: SPACING.section,
  },
  ingredientsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  ingredientsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  ingredientsHeaderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.apolloGreenFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.apolloGreenSubtle,
  },
  ingredientsSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  ingredientsSectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  ingredientsListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // ========================================================================
  // INGREDIENT CARD STYLES
  // ========================================================================
  ingredientCardOuter: {
    width: SKIN_LAYOUT.ingredientCardWidth,
  },
  ingredientCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    flexDirection: 'row',
    overflow: 'hidden',
    minHeight: SKIN_LAYOUT.ingredientCardHeight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft,
  },
  ingredientCardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(255, 215, 0, 0.06)',
  },
  ingredientAccentBar: {
    width: 5,
    height: '100%',
  },
  ingredientContent: {
    flex: 1,
    padding: SPACING.lg,
    justifyContent: 'space-between',
  },
  ingredientTopRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    alignItems: 'flex-start',
  },
  ingredientIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  ingredientTextContainer: {
    flex: 1,
  },
  ingredientName: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    marginBottom: 4,
  },
  ingredientBenefits: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  ingredientProductRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  ingredientProductImage: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientExploreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ingredientExploreText: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '600',
  },
});
