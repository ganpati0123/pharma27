/**
 * ============================================================================
 * HERO SECTION + SERVICES GRID + PRESCRIPTION BAR
 * ============================================================================
 * 
 * Premium Royal Healthcare Home Screen - Top Content Sections
 * 
 * Contains:
 * 1. HeroSection - "Your trusted home for end-to-end healthcare" with
 *    animated fade-in, legacy brand logos, and powered-by divider
 * 2. ServicesGrid - 2x2 premium service cards with lift animations,
 *    gold accent borders, and smooth press interactions
 * 3. PrescriptionBar - Full-width banner with ripple animation on
 *    the "Order Now" button
 * 
 * Animations:
 * - Section entrance: staggered fade + slide up (600ms)
 * - Card press: scale down to 0.96 + lift shadow increase
 * - Button ripple: gold ripple effect on tap
 * - Logo fade-in: sequential with 80ms stagger delay
 * - Icon rotation: subtle 5deg tilt on card press
 * 
 * Performance:
 * - All components wrapped in React.memo
 * - useCallback for all event handlers
 * - Reanimated worklet-based animations for 60fps
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
  interpolate,
  Easing,
  FadeIn,
  FadeInDown,
  FadeInUp,
  SlideInRight,
  Layout,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT, MIXINS, DATA } from './theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SERVICE_CARD_SIZE = (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.lg) / 2;

// ============================================================================
// ANIMATED LOGO ITEM
// ============================================================================
const AnimatedLogoItem = React.memo(({ brand, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(15);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    const delay = 300 + index * ANIMATION.duration.stagger;
    opacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    translateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    scale.value = withDelay(delay, withSpring(1, ANIMATION.spring.gentle));
  }, [index]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <Animated.View style={[styles.logoItem, animatedStyle]}>
      <View style={styles.logoIconContainer}>
        <Ionicons name="medical" size={14} color={COLORS.apolloGreen} />
      </View>
      <Text style={styles.logoText}>{brand}</Text>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED DIVIDER LINE
// ============================================================================
const AnimatedDivider = React.memo(({ direction }) => {
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withDelay(
      200,
      withTiming(1, { duration: ANIMATION.duration.slow, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    flex: width.value,
    height: 1.5,
    backgroundColor: COLORS.divider,
    opacity: interpolate(width.value, [0, 1], [0, 0.6]),
  }));

  return <Animated.View style={animatedStyle} />;
});

// ============================================================================
// HERO SECTION COMPONENT
// ============================================================================
export const HeroSection = React.memo(({ isVisible = true }) => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const poweredOpacity = useSharedValue(0);
  const poweredScale = useSharedValue(0.95);
  const shimmerValue = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
      heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

      poweredOpacity.value = withDelay(
        400,
        withTiming(1, { duration: ANIMATION.duration.smooth })
      );
      poweredScale.value = withDelay(
        400,
        withSpring(1, ANIMATION.spring.gentle)
      );

      shimmerValue.value = withDelay(
        800,
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      );
    }
  }, [isVisible]);

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const poweredAnimatedStyle = useAnimatedStyle(() => ({
    opacity: poweredOpacity.value,
    transform: [{ scale: poweredScale.value }],
  }));

  const shimmerLineStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmerValue.value, [0, 0.5, 1], [0.3, 0.8, 0.3]),
  }));

  const brands = useMemo(() => DATA.apolloLegacyBrands, []);

  return (
    <View style={styles.heroSectionContainer}>
      <LinearGradient
        colors={[COLORS.backgroundStart, COLORS.backgroundIce, COLORS.backgroundStart]}
        style={styles.heroGradient}
      >
        {/* Main Hero Text */}
        <Animated.View style={[styles.heroTextContainer, heroAnimatedStyle]}>
          <Text style={styles.heroTitleLine1}>Your trusted home</Text>
          <Text style={styles.heroTitleLine2}>for end-to-end healthcare</Text>
        </Animated.View>

        {/* Powered By Legacy Divider */}
        <Animated.View style={[styles.poweredContainer, poweredAnimatedStyle]}>
          <View style={styles.poweredDividerRow}>
            <AnimatedDivider direction="left" />
            <Animated.View style={[styles.poweredTextContainer, shimmerLineStyle]}>
              <Text style={styles.poweredText}>POWERED BY 40+ YEARS OF LEGACY</Text>
            </Animated.View>
            <AnimatedDivider direction="right" />
          </View>
        </Animated.View>

        {/* Legacy Brand Logos */}
        <View style={styles.logosContainer}>
          <View style={styles.logosRow}>
            {brands.map((brand, index) => (
              <AnimatedLogoItem key={brand} brand={brand} index={index} />
            ))}
          </View>
        </View>

        {/* Subtle Bottom Gradient Fade */}
        <LinearGradient
          colors={['transparent', COLORS.backgroundStart]}
          style={styles.heroBottomFade}
        />
      </LinearGradient>
    </View>
  );
});

// ============================================================================
// ANIMATED SERVICE CARD
// ============================================================================
const AnimatedServiceCard = React.memo(({ service, index, onPress }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const shadowOpacity = useSharedValue(0.08);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateY = useSharedValue(40);
  const arrowTranslateX = useSharedValue(0);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 120;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.entrance }));
    entranceTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(ANIMATION.scale.pressed, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(ANIMATION.translate.cardLift, ANIMATION.spring.press);
    iconRotation.value = withSpring(ANIMATION.rotation.iconTilt, ANIMATION.spring.bouncy);
    shadowOpacity.value = withTiming(0.18, { duration: ANIMATION.duration.fast });
    arrowTranslateX.value = withSpring(4, ANIMATION.spring.bouncy);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    cardTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    iconRotation.value = withSpring(0, ANIMATION.spring.gentle);
    shadowOpacity.value = withTiming(0.08, { duration: ANIMATION.duration.normal });
    arrowTranslateX.value = withSpring(0, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateY: entranceTranslateY.value + cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowTranslateX.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.serviceCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.serviceCard]}
      >
        {/* Gold glow overlay */}
        <Animated.View style={[styles.serviceCardGlow, glowStyle]} />

        {/* Card Content */}
        <View style={styles.serviceCardContent}>
          {/* Service Icon with colored background */}
          <Animated.View style={iconAnimatedStyle}>
            <View style={[styles.serviceIconContainer, { backgroundColor: service.bgColor }]}>
              <View style={[styles.serviceIconInner, { backgroundColor: service.color }]}>
                <Ionicons name={service.icon} size={LAYOUT.iconService} color={COLORS.textWhite} />
              </View>
            </View>
          </Animated.View>

          {/* Service Title */}
          <Text style={styles.serviceTitle}>{service.title}</Text>

          {/* Offer Badge */}
          <View style={[styles.serviceOfferBadge, { backgroundColor: service.bgColor }]}>
            <Text style={[styles.serviceOfferText, { color: service.color }]}>
              {service.offer}
            </Text>
          </View>

          {/* Arrow */}
          <Animated.View style={[styles.serviceArrowContainer, arrowAnimatedStyle]}>
            <View style={[styles.serviceArrowCircle, { backgroundColor: service.bgColor }]}>
              <Ionicons name="chevron-forward" size={14} color={service.color} />
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// SERVICES GRID COMPONENT
// ============================================================================
export const ServicesGrid = React.memo(({ onServicePress }) => {
  const services = useMemo(() => DATA.services, []);

  const handlePress = useCallback((service) => {
    if (onServicePress) {
      onServicePress(service);
    }
  }, [onServicePress]);

  return (
    <View style={styles.servicesSection}>
      <View style={styles.servicesGrid}>
        {services.map((service, index) => (
          <AnimatedServiceCard
            key={service.id}
            service={service}
            index={index}
            onPress={() => handlePress(service)}
          />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// ANIMATED PRESCRIPTION BUTTON WITH RIPPLE
// ============================================================================
const AnimatedOrderButton = React.memo(({ onPress }) => {
  const buttonScale = useSharedValue(1);
  const buttonGlow = useSharedValue(0);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    buttonScale.value = withSpring(0.95, ANIMATION.spring.press);
    buttonGlow.value = withTiming(1, { duration: ANIMATION.duration.fast });
    rippleScale.value = withTiming(0, { duration: 0 });
    rippleOpacity.value = withTiming(0.3, { duration: 0 });
  }, []);

  const handlePressOut = useCallback(() => {
    buttonScale.value = withSpring(1, ANIMATION.spring.gentle);
    buttonGlow.value = withTiming(0, { duration: ANIMATION.duration.normal });
    rippleScale.value = withTiming(2, { duration: ANIMATION.duration.smooth });
    rippleOpacity.value = withTiming(0, { duration: ANIMATION.duration.smooth });
  }, []);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: RADIUS.button,
    backgroundColor: COLORS.royalGold,
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));

  return (
    <Animated.View style={buttonAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.orderButton}
      >
        <Animated.View style={rippleStyle} />
        <Text style={styles.orderButtonText}>Order Now</Text>
        <Ionicons name="chevron-forward" size={14} color={COLORS.textWhite} style={styles.orderButtonIcon} />
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// PRESCRIPTION BAR COMPONENT
// ============================================================================
export const PrescriptionBar = React.memo(({ onOrderPress }) => {
  const barOpacity = useSharedValue(0);
  const barTranslateX = useSharedValue(-30);
  const iconBounce = useSharedValue(0);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    barOpacity.value = withDelay(200, withTiming(1, { duration: ANIMATION.duration.smooth }));
    barTranslateX.value = withDelay(200, withSpring(0, ANIMATION.spring.gentle));

    const startPulse = () => {
      iconBounce.value = withSequence(
        withTiming(0, { duration: 0 }),
        withDelay(2000, withSequence(
          withSpring(-3, { damping: 4, stiffness: 300 }),
          withSpring(0, { damping: 8, stiffness: 200 }),
        ))
      );
      pulseScale.value = withSequence(
        withTiming(1, { duration: 0 }),
        withDelay(2000, withSequence(
          withTiming(1.15, { duration: 300 }),
          withTiming(1, { duration: 300 }),
        ))
      );
    };
    startPulse();
    const interval = setInterval(startPulse, 4000);
    return () => clearInterval(interval);
  }, []);

  const barAnimatedStyle = useAnimatedStyle(() => ({
    opacity: barOpacity.value,
    transform: [{ translateX: barTranslateX.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: iconBounce.value },
      { scale: pulseScale.value },
    ],
  }));

  return (
    <Animated.View style={[styles.prescriptionBarContainer, barAnimatedStyle]}>
      <View style={styles.prescriptionBar}>
        {/* Left Rx Icon with subtle animation */}
        <Animated.View style={[styles.prescriptionIconContainer, iconAnimatedStyle]}>
          <LinearGradient
            colors={[COLORS.apolloGreen, COLORS.apolloGreenLight]}
            style={styles.prescriptionIconGradient}
          >
            <Ionicons name="document-text" size={22} color={COLORS.textWhite} />
          </LinearGradient>
        </Animated.View>

        {/* Text Content */}
        <View style={styles.prescriptionTextContainer}>
          <Text style={styles.prescriptionTitle}>Place An Order With Prescription</Text>
          <Text style={styles.prescriptionSubtitle}>Upload prescription & get medicines delivered</Text>
        </View>

        {/* Order Now Button with Ripple */}
        <AnimatedOrderButton onPress={onOrderPress} />
      </View>

      {/* Decorative gold accent line */}
      <View style={styles.prescriptionGoldAccent} />
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ========================================================================
  // HERO SECTION STYLES
  // ========================================================================
  heroSectionContainer: {
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  heroGradient: {
    paddingTop: SPACING.xxxl,
    paddingBottom: SPACING.lg,
    alignItems: 'center',
  },
  heroTextContainer: {
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.xxl,
  },
  heroTitleLine1: {
    ...TYPOGRAPHY.heroDisplay,
    color: COLORS.textPrimary,
    textAlign: 'center',
    includeFontPadding: false,
  },
  heroTitleLine2: {
    ...TYPOGRAPHY.heroSubtitle,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SPACING.xs,
    includeFontPadding: false,
  },
  poweredContainer: {
    width: '100%',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.xxl,
  },
  poweredDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  poweredTextContainer: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.royalGoldFaded,
    borderRadius: RADIUS.pill,
  },
  poweredText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textGold,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  logosContainer: {
    width: '100%',
    paddingHorizontal: SPACING.md,
  },
  logosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: SPACING.xs,
  },
  logoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.pill,
    gap: SPACING.xs,
    ...SHADOWS.subtle,
    borderWidth: 0.5,
    borderColor: COLORS.borderLight,
  },
  logoIconContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.apolloGreenFaded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.apolloGreen,
    letterSpacing: 0.3,
  },
  heroBottomFade: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },

  // ========================================================================
  // SERVICES GRID STYLES
  // ========================================================================
  servicesSection: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.lg,
  },
  serviceCardOuter: {
    width: SERVICE_CARD_SIZE,
  },
  serviceCard: {
    width: '100%',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    minHeight: SERVICE_CARD_SIZE * 0.95,
    ...SHADOWS.cardMedium,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  serviceCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RADIUS.card,
    borderWidth: 1.5,
    borderColor: COLORS.royalGold,
    backgroundColor: COLORS.royalGoldFaded,
  },
  serviceCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  serviceIconInner: {
    width: 42,
    height: 42,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  serviceTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
    lineHeight: 20,
  },
  serviceOfferBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    marginBottom: SPACING.sm,
  },
  serviceOfferText: {
    ...TYPOGRAPHY.captionBold,
    letterSpacing: 0.3,
  },
  serviceArrowContainer: {
    alignSelf: 'flex-end',
  },
  serviceArrowCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ========================================================================
  // PRESCRIPTION BAR STYLES
  // ========================================================================
  prescriptionBarContainer: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section,
  },
  prescriptionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    ...SHADOWS.cardMedium,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    gap: SPACING.md,
  },
  prescriptionIconContainer: {
    flexShrink: 0,
  },
  prescriptionIconGradient: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.button,
  },
  prescriptionTextContainer: {
    flex: 1,
  },
  prescriptionTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  prescriptionSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.apolloGreen,
    borderRadius: RADIUS.button,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    ...SHADOWS.button,
    overflow: 'hidden',
    gap: SPACING.xs,
  },
  orderButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
  },
  orderButtonIcon: {
    marginLeft: -2,
  },
  prescriptionGoldAccent: {
    height: 2,
    marginHorizontal: SPACING.xxl,
    marginTop: -1,
    backgroundColor: COLORS.royalGoldFaded,
    borderBottomLeftRadius: RADIUS.sm,
    borderBottomRightRadius: RADIUS.sm,
  },
});

// ============================================================================
// EXPORT
// ============================================================================
export default {
  HeroSection,
  ServicesGrid,
  PrescriptionBar,
};
