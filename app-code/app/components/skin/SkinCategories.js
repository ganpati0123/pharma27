/**
 * ============================================================================
 * EXPLORE CATEGORIES + SKINCARE CARNIVAL + AI EXPERT SECTIONS
 * ============================================================================
 *
 * Rose Gold Edition - Category Discovery, Carnival Event & AI Skincare Expert
 *
 * Contains:
 * 1. ExploreCategories - 16 mini cards in 4x4 grid with:
 *    - Staggered entrance (scale + fade + slide)
 *    - "Upto 50% OFF" badge per category
 *    - Press scale with rose gold glow
 *    - Icon + category name
 *
 * 2. SkincareCarnival - Blue gradient banner with:
 *    - Giant "Skincare Carnival 2026" headline
 *    - 8 Taj Mahal arch cards in horizontal scroll
 *    - Each arch: offer title, icon, gradient background
 *    - Entrance slide + bounce animations
 *    - Auto-scrolling with pause on interaction
 *
 * 3. AISkinExpert - Orange banner with:
 *    - AI logo animation (pulsing glow)
 *    - "Get skincare advice from expert" text
 *    - "Start Chat" CTA with bounce
 *    - Doctor photo placeholder
 *    - Floating particle effects
 *
 * ============================================================================
 */

import React, { useEffect, useCallback, useMemo, useRef } from 'react';
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
import { SKIN_COLORS, SKIN_LAYOUT, EXPLORE_CATEGORIES, CARNIVAL_ARCHES } from './SkinTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// ANIMATED CATEGORY MINI CARD
// ============================================================================
const AnimatedCategoryMini = React.memo(({ category, index, onPress }) => {
  const cardScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceScale = useSharedValue(0.7);
  const entranceTranslateY = useSharedValue(20);
  const glowOpacity = useSharedValue(0);
  const iconBounce = useSharedValue(0);

  useEffect(() => {
    const delay = 50 + index * 40;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceScale.value = withDelay(delay, withSpring(1, ANIMATION.spring.bouncy));
    entranceTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.9, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
    iconBounce.value = withSequence(
      withSpring(-4, { damping: 4, stiffness: 400 }),
      withSpring(0, ANIMATION.spring.gentle)
    );
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateY: entranceTranslateY.value },
      { scale: entranceScale.value * cardScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconBounce.value }],
  }));

  return (
    <Animated.View style={[styles.categoryMiniOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress && onPress(category)}
      >
        <View style={[styles.categoryMiniCard, { backgroundColor: category.bgColor }]}>
          {/* Gold glow overlay */}
          <Animated.View style={[styles.categoryMiniGlow, glowStyle]} />

          {/* Icon */}
          <Animated.View style={iconStyle}>
            <View style={styles.categoryMiniIconCircle}>
              <Ionicons name={category.icon} size={22} color={COLORS.textSecondary} />
            </View>
          </Animated.View>

          {/* Name */}
          <Text style={styles.categoryMiniName} numberOfLines={1}>{category.name}</Text>

          {/* Offer Badge */}
          <View style={styles.categoryMiniOfferBadge}>
            <Text style={styles.categoryMiniOfferText}>{category.offer}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// EXPLORE CATEGORIES SECTION
// ============================================================================
export const ExploreCategoriesSection = React.memo(({ onCategoryPress }) => {
  const categories = useMemo(() => EXPLORE_CATEGORIES, []);
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

  return (
    <Animated.View style={[styles.categoriesSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.categoriesSectionHeader}>
        <View style={styles.categoriesHeaderLeft}>
          <View style={styles.categoriesHeaderIconContainer}>
            <Ionicons name="grid" size={20} color={COLORS.premiumOrange} />
          </View>
          <View>
            <Text style={styles.categoriesSectionTitle}>Explore Product Categories</Text>
            <Text style={styles.categoriesSectionSubtitle}>
              16 categories with exclusive deals
            </Text>
          </View>
        </View>
      </View>

      {/* Categories Grid - 4x4 */}
      <View style={styles.categoriesGrid}>
        {categories.map((category, index) => (
          <AnimatedCategoryMini
            key={category.id}
            category={category}
            index={index}
            onPress={onCategoryPress}
          />
        ))}
      </View>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED CARNIVAL ARCH CARD
// ============================================================================
const AnimatedCarnivalArch = React.memo(({ arch, index }) => {
  const cardScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateY = useSharedValue(30);
  const glowPulse = useSharedValue(0);
  const iconSpin = useSharedValue(0);

  useEffect(() => {
    const delay = index * 80;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.bouncy));

    // Glow pulse
    glowPulse.value = withDelay(
      delay + 400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.92, ANIMATION.spring.press);
    iconSpin.value = withSpring(15, ANIMATION.spring.bouncy);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    iconSpin.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateY: entranceTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0, 1], [0.3, 0.7]),
    transform: [{ scale: interpolate(glowPulse.value, [0, 1], [1, 1.06]) }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconSpin.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.carnivalArchOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View style={[styles.carnivalArch, { borderColor: arch.color + '30' }]}>
          {/* Glow */}
          <Animated.View style={[styles.carnivalArchGlow, { backgroundColor: arch.color + '15' }, glowStyle]} />

          {/* Arch top decoration */}
          <View style={[styles.carnivalArchTop, { backgroundColor: arch.bgColor }]}>
            <View style={styles.carnivalArchTopInner}>
              <Animated.View style={iconStyle}>
                <Ionicons name={arch.icon} size={24} color={arch.color} />
              </Animated.View>
            </View>
          </View>

          {/* Title */}
          <Text style={[styles.carnivalArchTitle, { color: arch.color }]} numberOfLines={2}>
            {arch.title}
          </Text>

          {/* Shop link */}
          <View style={styles.carnivalArchShop}>
            <Text style={[styles.carnivalArchShopText, { color: arch.color }]}>Shop</Text>
            <Ionicons name="chevron-forward" size={10} color={arch.color} />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// SKINCARE CARNIVAL SECTION
// ============================================================================
export const SkincareCarnivalSection = React.memo(() => {
  const arches = useMemo(() => CARNIVAL_ARCHES, []);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(30);
  const titleGlow = useSharedValue(0);
  const sparkle1 = useSharedValue(0);
  const sparkle2 = useSharedValue(0);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    titleGlow.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    sparkle1.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    sparkle2.value = withDelay(
      750,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const titleGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(titleGlow.value, [0, 1], [0.85, 1]),
    transform: [{ scale: interpolate(titleGlow.value, [0, 1], [1, 1.02]) }],
  }));

  const sparkle1Style = useAnimatedStyle(() => ({
    opacity: sparkle1.value,
    transform: [{ scale: sparkle1.value }],
  }));

  const sparkle2Style = useAnimatedStyle(() => ({
    opacity: sparkle2.value,
    transform: [{ scale: sparkle2.value }],
  }));

  return (
    <Animated.View style={[styles.carnivalSection, sectionAnimatedStyle]}>
      {/* Carnival Banner */}
      <View style={styles.carnivalBannerContainer}>
        <LinearGradient
          colors={SKIN_COLORS.gradientCarnival}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.carnivalBanner}
        >
          {/* Decorative clouds */}
          <View style={styles.carnivalCloud1} />
          <View style={styles.carnivalCloud2} />
          <View style={styles.carnivalCloud3} />

          {/* Sparkle particles */}
          <Animated.View style={[styles.carnivalSparkle1, sparkle1Style]}>
            <Ionicons name="sparkles" size={16} color="rgba(255,215,0,0.8)" />
          </Animated.View>
          <Animated.View style={[styles.carnivalSparkle2, sparkle2Style]}>
            <Ionicons name="star" size={12} color="rgba(255,215,0,0.6)" />
          </Animated.View>

          {/* Title */}
          <Animated.View style={[styles.carnivalTitleContainer, titleGlowStyle]}>
            <Text style={styles.carnivalPreTitle}>Skincare</Text>
            <Text style={styles.carnivalMainTitle}>Carnival 2026</Text>
            <Text style={styles.carnivalSubtitle}>
              Luxury Skincare at Never-Seen-Before Prices
            </Text>
          </Animated.View>

          {/* Gold accent line */}
          <View style={styles.carnivalGoldLine} />
        </LinearGradient>
      </View>

      {/* Carnival Arches - Horizontal scroll */}
      <FlatList
        data={arches}
        renderItem={({ item, index }) => (
          <AnimatedCarnivalArch arch={item} index={index} />
        )}
        keyExtractor={(item) => `arch-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carnivalArchesList}
        bounces={true}
      />
    </Animated.View>
  );
});

// ============================================================================
// FLOATING AI PARTICLE
// ============================================================================
const FloatingParticle = React.memo(({ delay, x, y, size }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-15, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const particleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: x,
    top: y,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={particleStyle}>
      <View style={[styles.aiParticle, { width: size, height: size, borderRadius: size / 2 }]} />
    </Animated.View>
  );
});

// ============================================================================
// AI SKINCARE EXPERT SECTION
// ============================================================================
export const AISkinExpertSection = React.memo(({ onStartChat }) => {
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(30);
  const aiLogoPulse = useSharedValue(0);
  const aiLogoRotation = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const buttonGlow = useSharedValue(0);
  const chatBubbleScale = useSharedValue(0);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    // AI logo pulse
    aiLogoPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Subtle rotation
    aiLogoRotation.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Chat bubble entrance
    chatBubbleScale.value = withDelay(
      600,
      withSpring(1, ANIMATION.spring.bouncy)
    );

    // Button glow
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

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const aiLogoStyle = useAnimatedStyle(() => ({
    opacity: interpolate(aiLogoPulse.value, [0, 1], [0.8, 1]),
    transform: [
      { scale: interpolate(aiLogoPulse.value, [0, 1], [1, 1.1]) },
      { rotate: `${aiLogoRotation.value}deg` },
    ],
  }));

  const aiGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(aiLogoPulse.value, [0, 1], [0.2, 0.6]),
    transform: [{ scale: interpolate(aiLogoPulse.value, [0, 1], [1, 1.3]) }],
  }));

  const chatBubbleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: chatBubbleScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const buttonGlowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(buttonGlow.value, [0, 1], [0.7, 1]),
  }));

  return (
    <Animated.View style={[styles.aiExpertSection, sectionAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onStartChat}
        style={styles.aiExpertTouchable}
      >
        <LinearGradient
          colors={SKIN_COLORS.gradientAIExpert}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.aiExpertBanner}
        >
          {/* Floating particles */}
          <FloatingParticle delay={0} x={20} y={15} size={6} />
          <FloatingParticle delay={500} x={80} y={40} size={4} />
          <FloatingParticle delay={1000} x={150} y={20} size={5} />
          <FloatingParticle delay={1500} x={240} y={35} size={4} />
          <FloatingParticle delay={2000} x={300} y={10} size={6} />

          {/* Decorative circles */}
          <View style={styles.aiDecorCircle1} />
          <View style={styles.aiDecorCircle2} />

          {/* Content Row */}
          <View style={styles.aiExpertContent}>
            {/* AI Logo */}
            <View style={styles.aiLogoContainer}>
              <Animated.View style={[styles.aiLogoGlow, aiGlowStyle]} />
              <Animated.View style={[styles.aiLogo, aiLogoStyle]}>
                <Ionicons name="hardware-chip" size={32} color={COLORS.textWhite} />
              </Animated.View>
            </View>

            {/* Text Content */}
            <View style={styles.aiTextContent}>
              <Text style={styles.aiExpertTitle}>Get the skincare</Text>
              <Text style={styles.aiExpertTitleBold}>advice you can trust</Text>
              <Text style={styles.aiExpertSubtitle}>from an expert</Text>

              {/* Chat Bubble */}
              <Animated.View style={[styles.aiChatBubble, chatBubbleStyle]}>
                <Text style={styles.aiChatBubbleText}>
                  What is the cure for acne?
                </Text>
              </Animated.View>

              {/* Start Chat Button */}
              <Animated.View style={[buttonAnimatedStyle, buttonGlowStyle]}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPressIn={handleButtonPressIn}
                  onPressOut={handleButtonPressOut}
                  onPress={onStartChat}
                  style={styles.aiStartChatButton}
                >
                  <Ionicons name="chatbubble-ellipses" size={16} color={COLORS.premiumOrange} />
                  <Text style={styles.aiStartChatText}>Start Chat</Text>
                  <Ionicons name="chevron-forward" size={14} color={COLORS.premiumOrange} />
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Doctor Placeholder */}
            <View style={styles.aiDoctorContainer}>
              <LinearGradient
                colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.08)']}
                style={styles.aiDoctorPlaceholder}
              >
                <Ionicons name="person" size={40} color="rgba(255,255,255,0.6)" />
              </LinearGradient>
            </View>
          </View>

          {/* Gold accent line */}
          <View style={styles.aiGoldLine} />
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
  // CATEGORIES SECTION STYLES
  // ========================================================================
  categoriesSection: {
    paddingTop: SPACING.section,
  },
  categoriesSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  categoriesHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  categoriesHeaderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.premiumOrangeFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.2)',
  },
  categoriesSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  categoriesSectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.sm,
  },

  // ========================================================================
  // CATEGORY MINI CARD STYLES
  // ========================================================================
  categoryMiniOuter: {
    width: SKIN_LAYOUT.categoryMiniSize,
  },
  categoryMiniCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: SKIN_LAYOUT.categoryMiniSize + 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  categoryMiniGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.lg,
    backgroundColor: 'rgba(183, 110, 121, 0.08)',
  },
  categoryMiniIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
    ...SHADOWS.subtle,
  },
  categoryMiniName: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryMiniOfferBadge: {
    backgroundColor: 'rgba(0, 166, 81, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  categoryMiniOfferText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.apolloGreen,
    fontSize: 7,
  },

  // ========================================================================
  // CARNIVAL SECTION STYLES
  // ========================================================================
  carnivalSection: {
    paddingTop: SPACING.section,
  },
  carnivalBannerContainer: {
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  carnivalBanner: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xxl,
    minHeight: 180,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carnivalCloud1: {
    position: 'absolute',
    top: -20,
    left: 30,
    width: 80,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  carnivalCloud2: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 60,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  carnivalCloud3: {
    position: 'absolute',
    bottom: 15,
    left: 60,
    width: 100,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  carnivalSparkle1: {
    position: 'absolute',
    top: 20,
    right: 40,
  },
  carnivalSparkle2: {
    position: 'absolute',
    bottom: 30,
    left: 40,
  },
  carnivalTitleContainer: {
    alignItems: 'center',
  },
  carnivalPreTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textWhite,
    opacity: 0.9,
    fontStyle: 'italic',
  },
  carnivalMainTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.royalGold,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  carnivalSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.75)',
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  carnivalGoldLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 215, 0, 0.4)',
  },
  carnivalArchesList: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // ========================================================================
  // CARNIVAL ARCH CARD STYLES
  // ========================================================================
  carnivalArchOuter: {
    width: SKIN_LAYOUT.carnivalArchWidth,
  },
  carnivalArch: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    alignItems: 'center',
    minHeight: 130,
    borderWidth: 1.5,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  carnivalArchGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.xl,
  },
  carnivalArchTop: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  carnivalArchTopInner: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardWhite,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  carnivalArchTitle: {
    ...TYPOGRAPHY.badge,
    fontSize: 9,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 13,
    marginBottom: SPACING.xs,
  },
  carnivalArchShop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  carnivalArchShopText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    fontSize: 9,
  },

  // ========================================================================
  // AI EXPERT SECTION STYLES
  // ========================================================================
  aiExpertSection: {
    paddingHorizontal: SPACING.screenPadding,
    paddingTop: SPACING.section,
  },
  aiExpertTouchable: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  aiExpertBanner: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    minHeight: 200,
    overflow: 'hidden',
    position: 'relative',
  },
  aiDecorCircle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  aiDecorCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  aiParticle: {
    backgroundColor: 'rgba(255, 215, 0, 0.6)',
  },
  aiExpertContent: {
    flexDirection: 'row',
    zIndex: 1,
  },
  aiLogoContainer: {
    position: 'relative',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginRight: SPACING.lg,
    paddingTop: SPACING.xs,
  },
  aiLogoGlow: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  aiLogo: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  aiTextContent: {
    flex: 1,
  },
  aiExpertTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textWhite,
    opacity: 0.9,
    fontWeight: '600',
  },
  aiExpertTitleBold: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textWhite,
    fontWeight: '800',
  },
  aiExpertSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SPACING.md,
  },
  aiChatBubble: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    alignSelf: 'flex-start',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  aiChatBubbleText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textWhite,
    opacity: 0.9,
    fontStyle: 'italic',
  },
  aiStartChatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    alignSelf: 'flex-start',
    gap: SPACING.sm,
    ...SHADOWS.cardSoft,
  },
  aiStartChatText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.premiumOrange,
    fontWeight: '700',
  },
  aiDoctorContainer: {
    justifyContent: 'flex-end',
    marginLeft: SPACING.sm,
  },
  aiDoctorPlaceholder: {
    width: 70,
    height: 90,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiGoldLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(255, 215, 0, 0.4)',
  },
});
