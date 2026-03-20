/**
 * ============================================================================
 * APOLLO 24/7 - SKIN SCREEN (ROSE GOLD EDITION)
 * ============================================================================
 *
 * Premium Skin vertical screen composing all 12 sections:
 *
 * 1. Skin Concerns (6 squares)
 * 2. Sunscreen Banner (expanding circles animation)
 * 3. Most Trusted Brands (14 cards 2x7)
 * 4. Find Your Key Ingredient (7 horizontal cards)
 * 5. Explore Categories (16 mini 4x4)
 * 6. Skincare Carnival Banner (8 Taj Mahal arches)
 * 7. AI Skincare Expert (orange banner)
 * 8. Dynamic Products (6 categories, 8 per category)
 * 9. Bank Carousel (14 banks auto-scroll)
 * 10. Fresh Skin Section (daily steps + products)
 * 11. 6-Step Routine (Cleanse -> Sunscreen)
 * 12. Footer (reused from home)
 *
 * Features:
 * - Staggered section entrance animations (fade + slide up)
 * - Rose gold accent glow throughout
 * - Diamond dust floating particles (gold + rose gold)
 * - Parallax-like subtle scroll effects
 * - All components React.memo wrapped for performance
 * - Reanimated worklets for 60fps animations
 * - Spring physics on all interactive elements
 * - Cart state management with bounce animations
 *
 * ============================================================================
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  withRepeat,
  interpolate,
  Easing,
  Extrapolation,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';
import { SKIN_COLORS } from './SkinTheme';

// Section Components
import { SkinConcernsSection, SunscreenBanner } from './SkinConcerns';
import { TrustedBrandsSection, KeyIngredientsSection } from './SkinBrands';
import { ExploreCategoriesSection, SkincareCarnivalSection, AISkinExpertSection } from './SkinCategories';
import {
  DynamicProductsSection,
  FreshSkinSection,
  SixStepRoutineSection,
  SkinBankCarouselSection,
} from './SkinProducts';

// Reuse Footer from home
import { Footer } from '../home/DiscoverSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

// ============================================================================
// DIAMOND DUST FLOATING PARTICLE
// ============================================================================
const DiamondDust = React.memo(({ delay, startX, startY, color, size }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const duration = 4000 + Math.random() * 3000;

    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.7, { duration: duration * 0.3, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: duration * 0.7, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );

    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-40, { duration: duration, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 0 })
        ),
        -1,
        false
      )
    );

    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(15, { duration: duration * 0.5, easing: Easing.inOut(Easing.ease) }),
          withTiming(-15, { duration: duration * 0.5, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );

    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: duration * 0.3, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: duration * 0.7, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const particleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: startX,
    top: startY,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  return <Animated.View style={particleStyle} />;
});

// ============================================================================
// ROSE GOLD SECTION DIVIDER
// ============================================================================
const SectionDivider = React.memo(({ variant }) => {
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const lineStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.15, 0.4]),
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.3, 0.8]),
    transform: [{ scale: interpolate(shimmer.value, [0, 1], [0.8, 1.2]) }],
  }));

  return (
    <View style={styles.dividerContainer}>
      <Animated.View style={[
        styles.dividerLine,
        variant === 'gold' ? styles.dividerLineGold : styles.dividerLineRose,
        lineStyle,
      ]} />
      <Animated.View style={[styles.dividerDot, dotStyle]}>
        <Ionicons
          name={variant === 'gold' ? 'diamond' : 'flower'}
          size={12}
          color={variant === 'gold' ? COLORS.royalGold : SKIN_COLORS.roseGold}
        />
      </Animated.View>
      <Animated.View style={[
        styles.dividerLine,
        variant === 'gold' ? styles.dividerLineGold : styles.dividerLineRose,
        lineStyle,
      ]} />
    </View>
  );
});

// ============================================================================
// SKIN SCREEN HERO HEADER
// ============================================================================
const SkinScreenHero = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const roseGlow = useSharedValue(0);
  const titleShimmer = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    roseGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    titleShimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(roseGlow.value, [0, 1], [0.05, 0.15]),
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(titleShimmer.value, [0, 1], [0.85, 1]),
  }));

  return (
    <Animated.View style={[styles.skinHero, heroAnimatedStyle]}>
      <LinearGradient
        colors={['rgba(183, 110, 121, 0.08)', 'rgba(183, 110, 121, 0.02)', COLORS.backgroundPrimary]}
        style={styles.skinHeroGradient}
      >
        {/* Diamond dust particles */}
        <DiamondDust delay={0} startX={30} startY={20} color="rgba(255,215,0,0.5)" size={4} />
        <DiamondDust delay={800} startX={100} startY={40} color="rgba(183,110,121,0.5)" size={3} />
        <DiamondDust delay={1600} startX={200} startY={15} color="rgba(255,215,0,0.4)" size={5} />
        <DiamondDust delay={2400} startX={280} startY={35} color="rgba(183,110,121,0.4)" size={3} />
        <DiamondDust delay={3200} startX={340} startY={25} color="rgba(255,215,0,0.5)" size={4} />

        {/* Rose gold glow background */}
        <Animated.View style={[styles.skinHeroGlow, glowStyle]} />

        {/* Hero Content */}
        <View style={styles.skinHeroContent}>
          <View style={styles.skinHeroIconRow}>
            <View style={styles.skinHeroBadge}>
              <Ionicons name="flower" size={16} color={SKIN_COLORS.roseGold} />
            </View>
            <View style={styles.skinHeroRoseTag}>
              <Text style={styles.skinHeroRoseTagText}>ROSE GOLD EDITION</Text>
            </View>
          </View>

          <Animated.Text style={[styles.skinHeroTitle, titleStyle]}>
            Skincare
          </Animated.Text>
          <Text style={styles.skinHeroSubtitle}>
            Your premium skincare destination
          </Text>
          <Text style={styles.skinHeroDescription}>
            Curated by dermatologists, loved by millions
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// MAIN SKIN SCREEN COMPONENT
// ============================================================================
const SkinScreen = React.memo(({ scrollY }) => {
  // Cart state management
  const [quantities, setQuantities] = useState({});

  const handleAddToCart = useCallback((productId, delta) => {
    setQuantities(prev => {
      const currentQty = prev[productId] || 0;
      const newQty = Math.max(0, currentQty + delta);
      if (newQty === 0) {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      }
      return { ...prev, [productId]: newQty };
    });
  }, []);

  // Scroll-based parallax
  const parallaxStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 500],
            [0, -50],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.skinScreenContainer, parallaxStyle]}>
      {/* Rose Gold Edition Hero */}
      <SkinScreenHero />

      {/* Section 1: Skin Concerns */}
      <SkinConcernsSection />
      <SectionDivider variant="rose" />

      {/* Section 2: Sunscreen Banner */}
      <SunscreenBanner />
      <SectionDivider variant="gold" />

      {/* Section 3: Trusted Brands */}
      <TrustedBrandsSection />
      <SectionDivider variant="rose" />

      {/* Section 4: Key Ingredients */}
      <KeyIngredientsSection />
      <SectionDivider variant="gold" />

      {/* Section 5: Explore Categories */}
      <ExploreCategoriesSection />
      <SectionDivider variant="rose" />

      {/* Section 6: Skincare Carnival */}
      <SkincareCarnivalSection />
      <SectionDivider variant="gold" />

      {/* Section 7: AI Skincare Expert */}
      <AISkinExpertSection />
      <SectionDivider variant="rose" />

      {/* Section 8: Dynamic Products */}
      <DynamicProductsSection
        onAddToCart={handleAddToCart}
        quantities={quantities}
      />
      <SectionDivider variant="gold" />

      {/* Section 9: Bank Carousel */}
      <SkinBankCarouselSection />
      <SectionDivider variant="rose" />

      {/* Section 10: Fresh Skin Section */}
      <FreshSkinSection
        onAddToCart={handleAddToCart}
        quantities={quantities}
      />
      <SectionDivider variant="gold" />

      {/* Section 11: 6-Step Routine */}
      <SixStepRoutineSection />
      <SectionDivider variant="rose" />

      {/* Section 12: Footer */}
      <Footer />
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  skinScreenContainer: {
    paddingBottom: SPACING.section * 2,
  },

  // ========================================================================
  // HERO STYLES
  // ========================================================================
  skinHero: {
    marginBottom: 0,
  },
  skinHeroGradient: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.screenPadding,
    position: 'relative',
    overflow: 'hidden',
  },
  skinHeroGlow: {
    position: 'absolute',
    top: -50,
    left: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.4,
    height: 150,
    borderRadius: 75,
    backgroundColor: SKIN_COLORS.roseGold,
  },
  skinHeroContent: {
    zIndex: 1,
  },
  skinHeroIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  skinHeroBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: SKIN_COLORS.roseGoldFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SKIN_COLORS.roseGoldSubtle,
  },
  skinHeroRoseTag: {
    backgroundColor: SKIN_COLORS.roseGoldFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: SKIN_COLORS.roseGoldSubtle,
  },
  skinHeroRoseTagText: {
    ...TYPOGRAPHY.badge,
    color: SKIN_COLORS.roseGold,
    letterSpacing: 1.5,
    fontSize: 9,
  },
  skinHeroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: SPACING.xs,
  },
  skinHeroSubtitle: {
    ...TYPOGRAPHY.h4,
    color: SKIN_COLORS.roseGold,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  skinHeroDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
  },

  // ========================================================================
  // DIVIDER STYLES
  // ========================================================================
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding + SPACING.xl,
    marginVertical: SPACING.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerLineGold: {
    backgroundColor: COLORS.royalGold,
  },
  dividerLineRose: {
    backgroundColor: SKIN_COLORS.roseGold,
  },
  dividerDot: {
    marginHorizontal: SPACING.md,
  },
});

export default SkinScreen;
