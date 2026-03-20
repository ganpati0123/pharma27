/**
 * ============================================================================
 * SKIN CONCERNS SECTION + SUNSCREEN BANNER
 * ============================================================================
 *
 * Rose Gold Edition - Premium Skin Concerns Grid & Sunscreen Promotional Banner
 *
 * Contains:
 * 1. SkinConcerns - 6 animated concern cards (Acne, Dryness, Pigmental,
 *    Fungal Infection, Blemishes, Ageing) in a 3x2 grid with:
 *    - Staggered entrance animation (fade + scale + slide up)
 *    - Press scale + glow effect
 *    - Rose gold accent shimmer on active state
 *    - Icon rotation on tap
 *    - Gradient background per concern
 *
 * 2. SunscreenBanner - Orange gradient banner with:
 *    - Expanding circles animation (continuous)
 *    - "Sunscreen That Fits Your Skin!" headline
 *    - "Explore Now" CTA with bounce animation
 *    - Parallax-like subtle movement
 *
 * ============================================================================
 */

import React, { useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import { SKIN_COLORS, SKIN_LAYOUT, SKIN_CONCERNS } from './SkinTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// ANIMATED CONCERN CARD
// ============================================================================
const AnimatedConcernCard = React.memo(({ concern, index, onPress }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const entranceOpacity = useSharedValue(0);
  const entranceScale = useSharedValue(0.8);
  const entranceTranslateY = useSharedValue(30);
  const glowOpacity = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const shimmerPosition = useSharedValue(-1);
  const borderGlow = useSharedValue(0);

  useEffect(() => {
    const delay = 100 + index * 80;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.entrance }));
    entranceScale.value = withDelay(delay, withSpring(1, ANIMATION.spring.bouncy));
    entranceTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));

    // Subtle border glow pulse
    borderGlow.value = withDelay(
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
    cardScale.value = withSpring(0.92, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(-4, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
    iconRotation.value = withSpring(12, ANIMATION.spring.bouncy);
    shimmerPosition.value = withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) });
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    cardTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
    iconRotation.value = withSpring(0, ANIMATION.spring.gentle);
    shimmerPosition.value = withTiming(-1, { duration: 400 });
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateY: entranceTranslateY.value + cardTranslateY.value },
      { scale: entranceScale.value * cardScale.value },
    ],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: `rgba(${concern.color === '#FF6B6B' ? '255,107,107' :
      concern.color === '#64B5F6' ? '100,181,246' :
      concern.color === '#A0785A' ? '160,120,90' :
      concern.color === '#66BB6A' ? '102,187,106' :
      concern.color === '#F48FB1' ? '244,143,177' :
      '171,71,188'}, ${interpolate(borderGlow.value, [0, 1], [0.15, 0.5])})`,
  }));

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmerPosition.value, [-1, 0, 1], [0, 0.4, 0]),
    transform: [{ translateX: interpolate(shimmerPosition.value, [-1, 1], [-80, 80]) }],
  }));

  return (
    <Animated.View style={[styles.concernCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress && onPress(concern)}
      >
        <Animated.View style={[styles.concernCard, borderStyle]}>
          {/* Gold glow overlay */}
          <Animated.View style={[styles.concernCardGlow, glowStyle]} />

          {/* Shimmer effect */}
          <Animated.View style={[styles.concernShimmer, shimmerStyle]} />

          {/* Gradient Background Circle */}
          <LinearGradient
            colors={concern.gradient}
            style={styles.concernIconCircle}
          >
            <Animated.View style={iconAnimatedStyle}>
              <Ionicons name={concern.icon} size={28} color={COLORS.textWhite} />
            </Animated.View>
          </LinearGradient>

          {/* Concern Title */}
          <Text style={styles.concernTitle} numberOfLines={2}>{concern.title}</Text>

          {/* Description */}
          <Text style={styles.concernDescription} numberOfLines={1}>{concern.description}</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// SKIN CONCERNS SECTION
// ============================================================================
export const SkinConcernsSection = React.memo(({ onConcernPress }) => {
  const concerns = useMemo(() => SKIN_CONCERNS, []);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(30);
  const titleShimmer = useSharedValue(0);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    titleShimmer.value = withRepeat(
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

  const titleGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(titleShimmer.value, [0, 1], [0.7, 1]),
  }));

  return (
    <Animated.View style={[styles.concernsSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.concernsSectionHeader}>
        <View style={styles.concernsHeaderLeft}>
          <View style={styles.concernsHeaderIconContainer}>
            <Ionicons name="flower" size={20} color={SKIN_COLORS.roseGold} />
          </View>
          <View>
            <Animated.Text style={[styles.concernsSectionTitle, titleGlowStyle]}>
              Skin Concerns
            </Animated.Text>
            <Text style={styles.concernsSectionSubtitle}>
              Find solutions for your skin
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.concernsViewAll}>
          <Text style={styles.concernsViewAllText}>View All</Text>
          <Ionicons name="chevron-forward" size={14} color={SKIN_COLORS.roseGold} />
        </TouchableOpacity>
      </View>

      {/* Concerns Grid - 3x2 */}
      <View style={styles.concernsGrid}>
        {concerns.map((concern, index) => (
          <AnimatedConcernCard
            key={concern.id}
            concern={concern}
            index={index}
            onPress={onConcernPress}
          />
        ))}
      </View>
    </Animated.View>
  );
});

// ============================================================================
// EXPANDING CIRCLE ANIMATION
// ============================================================================
const ExpandingCircle = React.memo(({ delay, size, color }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0, { duration: 0 }),
          withTiming(1, { duration: 3000, easing: Easing.out(Easing.ease) })
        ),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.6, { duration: 0 }),
          withTiming(0, { duration: 3000, easing: Easing.out(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const circleStyle = useAnimatedStyle(() => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    position: 'absolute',
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return <Animated.View style={circleStyle} />;
});

// ============================================================================
// SUNSCREEN BANNER
// ============================================================================
export const SunscreenBanner = React.memo(({ onExplorePress }) => {
  const bannerOpacity = useSharedValue(0);
  const bannerTranslateY = useSharedValue(30);
  const buttonScale = useSharedValue(1);
  const buttonGlow = useSharedValue(0);
  const sunRotation = useSharedValue(0);
  const textSlideX = useSharedValue(-20);

  useEffect(() => {
    bannerOpacity.value = withDelay(200, withTiming(1, { duration: ANIMATION.duration.entrance }));
    bannerTranslateY.value = withDelay(200, withSpring(0, ANIMATION.spring.gentle));
    textSlideX.value = withDelay(400, withSpring(0, ANIMATION.spring.gentle));

    // Sun icon continuous rotation
    sunRotation.value = withRepeat(
      withTiming(360, { duration: 15000, easing: Easing.linear }),
      -1,
      false
    );

    // Button subtle pulse
    buttonGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const handleButtonPressIn = useCallback(() => {
    buttonScale.value = withSpring(0.92, ANIMATION.spring.press);
  }, []);

  const handleButtonPressOut = useCallback(() => {
    buttonScale.value = withSequence(
      withSpring(1.08, { damping: 6, stiffness: 400 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
  }, []);

  const bannerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: bannerOpacity.value,
    transform: [{ translateY: bannerTranslateY.value }],
  }));

  const sunAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${sunRotation.value}deg` }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: textSlideX.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const buttonGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(buttonGlow.value, [0, 1], [0.6, 1]),
  }));

  return (
    <Animated.View style={[styles.sunscreenBannerContainer, bannerAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onExplorePress}
        style={styles.sunscreenBannerTouchable}
      >
        <LinearGradient
          colors={SKIN_COLORS.gradientSunscreen}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.sunscreenBanner}
        >
          {/* Expanding Circles Animation */}
          <View style={styles.sunscreenCirclesContainer}>
            <ExpandingCircle delay={0} size={120} color="rgba(255,255,255,0.12)" />
            <ExpandingCircle delay={750} size={120} color="rgba(255,255,255,0.10)" />
            <ExpandingCircle delay={1500} size={120} color="rgba(255,255,255,0.08)" />
            <ExpandingCircle delay={2250} size={120} color="rgba(255,255,255,0.06)" />
          </View>

          {/* Decorative sun rays */}
          <View style={styles.sunscreenDecorTop} />
          <View style={styles.sunscreenDecorBottom} />

          {/* Content */}
          <View style={styles.sunscreenContent}>
            {/* Sun Icon */}
            <Animated.View style={[styles.sunscreenSunIcon, sunAnimatedStyle]}>
              <Ionicons name="sunny" size={48} color="rgba(255,255,255,0.9)" />
            </Animated.View>

            {/* Text */}
            <Animated.View style={[styles.sunscreenTextContent, textAnimatedStyle]}>
              <Text style={styles.sunscreenTitle}>Sunscreen That Fits</Text>
              <Text style={styles.sunscreenTitleBold}>Your Skin!</Text>
              <Text style={styles.sunscreenSubtitle}>
                Dermatologist recommended SPF protection
              </Text>
            </Animated.View>

            {/* Explore Button */}
            <Animated.View style={[buttonAnimatedStyle, buttonGlowStyle]}>
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={handleButtonPressIn}
                onPressOut={handleButtonPressOut}
                onPress={onExplorePress}
                style={styles.sunscreenExploreButton}
              >
                <Text style={styles.sunscreenExploreText}>Explore Now</Text>
                <Ionicons name="arrow-forward" size={16} color={SKIN_COLORS.sunscreenOrange} />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Gold accent line */}
          <View style={styles.sunscreenGoldLine} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ========================================================================
  // CONCERNS SECTION STYLES
  // ========================================================================
  concernsSection: {
    paddingTop: SPACING.section,
  },
  concernsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  concernsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  concernsHeaderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SKIN_COLORS.roseGoldFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SKIN_COLORS.roseGoldSubtle,
  },
  concernsSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  concernsSectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  concernsViewAll: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    backgroundColor: SKIN_COLORS.roseGoldFaded,
  },
  concernsViewAllText: {
    ...TYPOGRAPHY.labelMedium,
    color: SKIN_COLORS.roseGold,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // ========================================================================
  // CONCERN CARD STYLES
  // ========================================================================
  concernCardOuter: {
    width: SKIN_LAYOUT.concernCardSize,
  },
  concernCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: SKIN_LAYOUT.concernCardSize + 20,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  concernCardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(183, 110, 121, 0.08)',
  },
  concernShimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 60,
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    transform: [{ skewX: '-20deg' }],
  },
  concernIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    ...SHADOWS.cardSoft,
  },
  concernTitle: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
    minHeight: 32,
  },
  concernDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    textAlign: 'center',
  },

  // ========================================================================
  // SUNSCREEN BANNER STYLES
  // ========================================================================
  sunscreenBannerContainer: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section,
  },
  sunscreenBannerTouchable: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  sunscreenBanner: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    minHeight: 160,
    overflow: 'hidden',
    position: 'relative',
  },
  sunscreenCirclesContainer: {
    position: 'absolute',
    top: '50%',
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
  },
  sunscreenDecorTop: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  sunscreenDecorBottom: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  sunscreenContent: {
    zIndex: 1,
  },
  sunscreenSunIcon: {
    marginBottom: SPACING.md,
  },
  sunscreenTextContent: {
    marginBottom: SPACING.lg,
  },
  sunscreenTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textWhite,
    opacity: 0.95,
  },
  sunscreenTitleBold: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textWhite,
    fontWeight: '900',
  },
  sunscreenSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.85)',
    marginTop: SPACING.xs,
  },
  sunscreenExploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    alignSelf: 'flex-start',
    gap: SPACING.sm,
    ...SHADOWS.cardSoft,
  },
  sunscreenExploreText: {
    ...TYPOGRAPHY.labelLarge,
    color: SKIN_COLORS.sunscreenOrange,
    fontWeight: '700',
  },
  sunscreenGoldLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 215, 0, 0.4)',
  },
});
