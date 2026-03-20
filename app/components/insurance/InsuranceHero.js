/**
 * ============================================================================
 * APOLLO 24/7 - INSURANCE HERO & CARDS SECTION
 * ============================================================================
 *
 * Premium Insurance hero banner with Apollo Assured badge,
 * insurance type cards (Have/Don't Have), and expert help banner.
 *
 * Features:
 * - Animated Apollo Assured seal with rotation & glow
 * - Spring-physics card interactions
 * - Gradient hero background with particle effects
 * - Premium expert help banner with advisor illustration
 * - Animated CTA buttons with press feedback
 * - Trust indicators with counting animations
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
  withRepeat,
  interpolate,
  Easing,
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInUp,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';
import { INSURANCE_COLORS, INSURANCE_LAYOUT, INSURANCE_DATA } from './InsuranceTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// ANIMATED ASSURED SEAL
// ============================================================================
const AssuredSeal = React.memo(() => {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0.8);
  const glowOpacity = useSharedValue(0.2);
  const innerPulse = useSharedValue(1);

  useEffect(() => {
    // Gentle continuous rotation
    rotation.value = withRepeat(
      withTiming(360, { duration: 25000, easing: Easing.linear }),
      -1,
      false
    );

    // Scale entrance
    scale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 100 }));

    // Glow pulse
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.2, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Inner badge pulse
    innerPulse.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const sealRotateStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const innerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: innerPulse.value }],
  }));

  return (
    <View style={sealStyles.container}>
      {/* Outer glow ring */}
      <Animated.View style={[sealStyles.outerGlow, glowStyle]} />
      
      {/* Rotating outer ring */}
      <Animated.View style={[sealStyles.outerRing, sealRotateStyle]}>
        <View style={sealStyles.ringDot1} />
        <View style={sealStyles.ringDot2} />
        <View style={sealStyles.ringDot3} />
        <View style={sealStyles.ringDot4} />
        <View style={sealStyles.ringDot5} />
        <View style={sealStyles.ringDot6} />
        <View style={sealStyles.ringDot7} />
        <View style={sealStyles.ringDot8} />
      </Animated.View>

      {/* Inner badge */}
      <Animated.View style={[sealStyles.innerBadge, innerStyle]}>
        <LinearGradient
          colors={INSURANCE_COLORS.gradientAssuredBadge}
          style={sealStyles.innerGradient}
        >
          <Text style={sealStyles.assuredText}>APOLLO</Text>
          <Ionicons name="shield-checkmark" size={16} color="#FFFFFF" />
          <Text style={sealStyles.assuredSubtext}>ASSURED</Text>
        </LinearGradient>
      </Animated.View>

      {/* Sparkle effects */}
      <SparkleEffect delay={0} x={-8} y={-12} />
      <SparkleEffect delay={600} x={12} y={-8} />
      <SparkleEffect delay={1200} x={-10} y={10} />
      <SparkleEffect delay={1800} x={14} y={6} />
    </View>
  );
});

// ============================================================================
// SPARKLE EFFECT
// ============================================================================
const SparkleEffect = React.memo(({ delay, x, y }) => {
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }),
          withTiming(0, { duration: 1000 })
        ),
        -1,
        false
      )
    );

    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.2, { duration: 600, easing: Easing.out(Easing.ease) }),
          withTiming(0, { duration: 800, easing: Easing.in(Easing.ease) }),
          withTiming(0, { duration: 1000 })
        ),
        -1,
        false
      )
    );
  }, [delay]);

  const sparkleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: x + 35,
    marginTop: y + 35,
    width: 6,
    height: 6,
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={sparkleStyle}>
      <Ionicons name="sparkles" size={8} color={INSURANCE_COLORS.assuredGoldLight} />
    </Animated.View>
  );
});

// ============================================================================
// HERO BANNER
// ============================================================================
export const InsuranceHeroBanner = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const titleScale = useSharedValue(0.95);
  const subtitleOpacity = useSharedValue(0);
  const descriptionOpacity = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    titleScale.value = withDelay(200, withSpring(1, { damping: 14, stiffness: 120 }));
    subtitleOpacity.value = withDelay(400, withTiming(1, { duration: 400 }));
    descriptionOpacity.value = withDelay(600, withTiming(1, { duration: 400 }));
  }, []);

  const heroAnimatedStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: titleScale.value }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const descriptionStyle = useAnimatedStyle(() => ({
    opacity: descriptionOpacity.value,
  }));

  return (
    <Animated.View style={[heroStyles.container, heroAnimatedStyle]}>
      <LinearGradient
        colors={['#FFF8F0', '#FFFFFF', '#F0FFF4']}
        style={heroStyles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background decorative elements */}
        <View style={heroStyles.bgDecoration1} />
        <View style={heroStyles.bgDecoration2} />
        <View style={heroStyles.bgDecoration3} />

        {/* Content Row */}
        <View style={heroStyles.contentRow}>
          {/* Left - Text Content */}
          <View style={heroStyles.textContent}>
            <Animated.View style={titleStyle}>
              <Text style={heroStyles.title}>
                Save up to <Text style={heroStyles.titleBold}>50%</Text>
                <Text style={heroStyles.titleAsterisk}>*</Text>
              </Text>
            </Animated.View>

            <Animated.View style={subtitleStyle}>
              <Text style={heroStyles.subtitle}>on your health cover</Text>
            </Animated.View>

            <View style={heroStyles.dividerLine} />

            <Animated.View style={descriptionStyle}>
              <Text style={heroStyles.description}>
                Apollo recommends what fits you{' '}
                <Text style={heroStyles.descriptionBold}>best</Text>
              </Text>
              <Text style={heroStyles.descriptionSub}>
                {'\u2014'} not what costs more.
              </Text>
            </Animated.View>

            {/* Trust indicator */}
            <View style={heroStyles.trustRow}>
              <View style={heroStyles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= 4 ? 'star' : 'star-half'}
                    size={12}
                    color={INSURANCE_COLORS.assuredGold}
                  />
                ))}
              </View>
              <Text style={heroStyles.trustText}>4.8 | 2.5L+ reviews</Text>
            </View>
          </View>

          {/* Right - Assured Seal */}
          <View style={heroStyles.sealContainer}>
            <AssuredSeal />
          </View>
        </View>

        {/* Bottom trust strip */}
        <View style={heroStyles.trustStrip}>
          <View style={heroStyles.trustItem}>
            <Ionicons name="shield-checkmark" size={14} color={INSURANCE_COLORS.insuranceTeal} />
            <Text style={heroStyles.trustItemText}>IRDAI Approved</Text>
          </View>
          <View style={heroStyles.trustDot} />
          <View style={heroStyles.trustItem}>
            <Ionicons name="people" size={14} color={INSURANCE_COLORS.insuranceTeal} />
            <Text style={heroStyles.trustItemText}>25L+ Families</Text>
          </View>
          <View style={heroStyles.trustDot} />
          <View style={heroStyles.trustItem}>
            <Ionicons name="checkmark-circle" size={14} color={INSURANCE_COLORS.insuranceTeal} />
            <Text style={heroStyles.trustItemText}>92% Claims</Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED INSURANCE TYPE CARD
// ============================================================================
const InsuranceTypeCard = React.memo(({ data, index }) => {
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(40);
  const iconBounce = useSharedValue(1);
  const badgeScale = useSharedValue(0);
  const shimmerX = useSharedValue(-100);

  useEffect(() => {
    const delay = index * 150;
    cardOpacity.value = withDelay(delay + 300, withTiming(1, { duration: 500 }));
    cardTranslateY.value = withDelay(delay + 300, withSpring(0, ANIMATION.spring.gentle));
    badgeScale.value = withDelay(delay + 800, withSpring(1, { damping: 10, stiffness: 200 }));

    // Shimmer effect
    shimmerX.value = withDelay(
      delay + 1200,
      withRepeat(
        withSequence(
          withTiming(SCREEN_WIDTH, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(-100, { duration: 0 })
        ),
        -1,
        false
      )
    );
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, ANIMATION.spring.press);
    iconBounce.value = withSequence(
      withSpring(1.2, { damping: 8, stiffness: 300 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconBounce.value }],
  }));

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  return (
    <Animated.View style={[cardStyles.cardWrapper, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={cardStyles.card}
      >
        {/* Badge */}
        <Animated.View style={[cardStyles.cardBadge, badgeAnimatedStyle, { backgroundColor: data.iconColor + '15' }]}>
          <Text style={[cardStyles.cardBadgeText, { color: data.iconColor }]}>{data.badge}</Text>
        </Animated.View>

        {/* Icon */}
        <Animated.View style={[cardStyles.iconContainer, iconAnimatedStyle, { backgroundColor: data.iconBg }]}>
          <Ionicons name={data.icon} size={24} color={data.iconColor} />
        </Animated.View>

        {/* Title */}
        <Text style={cardStyles.cardTitle}>{data.title}</Text>

        {/* Subtitle + Highlight */}
        <Text style={cardStyles.cardSubtitle}>{data.subtitle}</Text>
        <View style={cardStyles.highlightRow}>
          <Text style={cardStyles.highlightPrefix}>{data.highlightPrefix}</Text>
          <Text style={cardStyles.highlightAmount}>{'\u20B9'}{data.highlight}</Text>
        </View>

        {/* Features list */}
        <View style={cardStyles.featuresContainer}>
          {data.features.map((feature, idx) => (
            <View key={idx} style={cardStyles.featureRow}>
              <Ionicons name="checkmark-circle" size={12} color={INSURANCE_COLORS.insuranceTeal} />
              <Text style={cardStyles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={[cardStyles.ctaButton, { borderColor: data.iconColor }]} activeOpacity={0.7}>
          <Text style={[cardStyles.ctaText, { color: data.iconColor }]}>{data.ctaText}</Text>
          <Ionicons name="arrow-forward" size={14} color={data.iconColor} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// INSURANCE CARDS SECTION
// ============================================================================
export const InsuranceCardsSection = React.memo(() => {
  const cards = useMemo(() => INSURANCE_DATA.insuranceCards, []);

  return (
    <View style={cardStyles.section}>
      <View style={cardStyles.cardsRow}>
        {cards.map((card, index) => (
          <InsuranceTypeCard key={card.id} data={card} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// EXPERT HELP BANNER
// ============================================================================
export const ExpertHelpBanner = React.memo(() => {
  const bannerOpacity = useSharedValue(0);
  const bannerTranslateY = useSharedValue(30);
  const ctaScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);
  const advisorFloat = useSharedValue(0);

  useEffect(() => {
    bannerOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    bannerTranslateY.value = withDelay(600, withSpring(0, ANIMATION.spring.gentle));

    // Advisor floating animation
    advisorFloat.value = withRepeat(
      withSequence(
        withTiming(8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );

    // Pulse animation for CTA
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const handleCtaPressIn = useCallback(() => {
    ctaScale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);

  const handleCtaPressOut = useCallback(() => {
    ctaScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const bannerStyle = useAnimatedStyle(() => ({
    opacity: bannerOpacity.value,
    transform: [{ translateY: bannerTranslateY.value }],
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    transform: [{ scale: ctaScale.value }],
  }));

  const advisorStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -advisorFloat.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
    transform: [{ scale: interpolate(pulseOpacity.value, [0, 0.3], [1, 1.15]) }],
  }));

  return (
    <Animated.View style={[expertStyles.container, bannerStyle]}>
      <LinearGradient
        colors={['#E8F5E9', '#F1F8E9', '#FFF8E1']}
        style={expertStyles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Background patterns */}
        <View style={expertStyles.bgPattern1} />
        <View style={expertStyles.bgPattern2} />

        {/* Content */}
        <View style={expertStyles.contentRow}>
          <View style={expertStyles.textContent}>
            <Text style={expertStyles.title}>Unsure about what plan{'\n'}to buy?</Text>
            <Text style={expertStyles.subtitle}>Our insurance advisor is just a{'\n'}click away</Text>

            {/* Availability indicator */}
            <View style={expertStyles.availableRow}>
              <View style={expertStyles.liveDot} />
              <Text style={expertStyles.availableText}>Available 9 AM - 9 PM</Text>
            </View>

            {/* CTA Button */}
            <Animated.View style={ctaStyle}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPressIn={handleCtaPressIn}
                onPressOut={handleCtaPressOut}
                style={expertStyles.ctaButton}
              >
                <Animated.View style={[expertStyles.ctaPulse, pulseStyle]} />
                <Ionicons name="call" size={16} color="#FFFFFF" />
                <Text style={expertStyles.ctaText}>Get Expert Help</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* Free consultation badge */}
            <View style={expertStyles.freeBadge}>
              <Ionicons name="gift" size={12} color={INSURANCE_COLORS.insuranceTeal} />
              <Text style={expertStyles.freeText}>Free consultation | No obligations</Text>
            </View>
          </View>

          {/* Right - Advisor illustration */}
          <Animated.View style={[expertStyles.advisorContainer, advisorStyle]}>
            <View style={expertStyles.advisorAvatar}>
              <LinearGradient
                colors={['#FFE0B2', '#FFCC80']}
                style={expertStyles.advisorAvatarGradient}
              >
                <Ionicons name="headset" size={32} color="#5D4037" />
              </LinearGradient>
            </View>
            <View style={expertStyles.advisorBubble}>
              <Text style={expertStyles.bubbleText}>Hi! How can{'\n'}I help?</Text>
            </View>
            {/* Chat dots */}
            <View style={expertStyles.chatDotsRow}>
              <View style={[expertStyles.chatDot, { backgroundColor: '#90CAF9' }]} />
              <View style={[expertStyles.chatDot, { backgroundColor: '#81C784' }]} />
              <View style={[expertStyles.chatDot, { backgroundColor: '#FFB74D' }]} />
            </View>
            {/* Advisor count badge */}
            <View style={expertStyles.advisorCountBadge}>
              <Text style={expertStyles.advisorCountText}>500+ advisors</Text>
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// TRUST STATS BAR
// ============================================================================
export const TrustStatsBar = React.memo(() => {
  const stats = useMemo(() => INSURANCE_DATA.trustStats.slice(0, 4), []);

  return (
    <View style={trustStyles.container}>
      <View style={trustStyles.statsRow}>
        {stats.map((stat, index) => (
          <TrustStatItem key={stat.id} stat={stat} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// TRUST STAT ITEM
// ============================================================================
const TrustStatItem = React.memo(({ stat, index }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const iconScale = useSharedValue(0);

  useEffect(() => {
    const delay = index * 100 + 500;
    opacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    translateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    iconScale.value = withDelay(delay + 200, withSpring(1, { damping: 10, stiffness: 200 }));
  }, [index]);

  const itemStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <Animated.View style={[trustStyles.statItem, itemStyle]}>
      <Animated.View style={[trustStyles.statIcon, iconStyle]}>
        <Ionicons name={stat.icon} size={18} color={INSURANCE_COLORS.insuranceTeal} />
      </Animated.View>
      <Text style={trustStyles.statValue}>{stat.value}</Text>
      <Text style={trustStyles.statLabel}>{stat.label}</Text>
    </Animated.View>
  );
});

// ============================================================================
// STYLES - ASSURED SEAL
// ============================================================================
const sealStyles = StyleSheet.create({
  container: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  outerGlow: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: INSURANCE_COLORS.assuredGoldFaded,
  },
  outerRing: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1.5,
    borderColor: INSURANCE_COLORS.assuredGoldSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ringDot1: { position: 'absolute', top: 0, left: '50%', marginLeft: -2, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGold },
  ringDot2: { position: 'absolute', top: 12, right: 12, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGoldLight },
  ringDot3: { position: 'absolute', right: 0, top: '50%', marginTop: -2, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGold },
  ringDot4: { position: 'absolute', bottom: 12, right: 12, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGoldLight },
  ringDot5: { position: 'absolute', bottom: 0, left: '50%', marginLeft: -2, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGold },
  ringDot6: { position: 'absolute', bottom: 12, left: 12, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGoldLight },
  ringDot7: { position: 'absolute', left: 0, top: '50%', marginTop: -2, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGold },
  ringDot8: { position: 'absolute', top: 12, left: 12, width: 4, height: 4, borderRadius: 2, backgroundColor: INSURANCE_COLORS.assuredGoldLight },
  innerBadge: {
    width: 72,
    height: 72,
    borderRadius: 36,
    overflow: 'hidden',
  },
  innerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 36,
  },
  assuredText: {
    fontSize: 8,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    marginBottom: 1,
  },
  assuredSubtext: {
    fontSize: 7,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
    marginTop: 1,
  },
});

// ============================================================================
// STYLES - HERO BANNER
// ============================================================================
const heroStyles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    marginTop: SPACING.sm,
    overflow: 'hidden',
  },
  gradient: {
    paddingHorizontal: SPACING.screenPadding,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.lg,
    position: 'relative',
    overflow: 'hidden',
  },
  bgDecoration1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(43, 138, 111, 0.04)',
  },
  bgDecoration2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(212, 160, 23, 0.04)',
  },
  bgDecoration3: {
    position: 'absolute',
    top: 20,
    left: '40%',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 53, 0.03)',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContent: {
    flex: 1,
    paddingRight: SPACING.lg,
  },
  title: {
    fontSize: 22,
    fontWeight: '400',
    color: INSURANCE_COLORS.insuranceTeal,
    lineHeight: 30,
  },
  titleBold: {
    fontSize: 28,
    fontWeight: '900',
    color: INSURANCE_COLORS.insuranceTealDark,
  },
  titleAsterisk: {
    fontSize: 16,
    color: INSURANCE_COLORS.ctaOrange,
    fontWeight: '400',
  },
  subtitle: {
    ...TYPOGRAPHY.bodyLarge,
    color: INSURANCE_COLORS.ctaOrange,
    fontWeight: '600',
    marginTop: 2,
  },
  dividerLine: {
    width: 40,
    height: 2,
    backgroundColor: INSURANCE_COLORS.assuredGold,
    marginVertical: SPACING.md,
    borderRadius: 1,
  },
  description: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    lineHeight: 22,
  },
  descriptionBold: {
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  descriptionSub: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginTop: 2,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.sm,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  trustText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  sealContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.lg,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(43, 138, 111, 0.08)',
    gap: SPACING.sm,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustItemText: {
    ...TYPOGRAPHY.caption,
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '600',
    fontSize: 10,
  },
  trustDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: INSURANCE_COLORS.insuranceTealSubtle,
  },
});

// ============================================================================
// STYLES - INSURANCE CARDS
// ============================================================================
const cardStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  cardWrapper: {
    flex: 1,
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft,
    position: 'relative',
    overflow: 'hidden',
  },
  cardBadge: {
    position: 'absolute',
    top: SPACING.sm,
    right: SPACING.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  cardBadgeText: {
    fontSize: 7,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textPrimary,
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  cardSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.md,
  },
  highlightPrefix: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  highlightAmount: {
    fontSize: 14,
    fontWeight: '800',
    color: INSURANCE_COLORS.ctaOrange,
  },
  featuresContainer: {
    marginBottom: SPACING.md,
    gap: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontSize: 9,
    color: COLORS.textTertiary,
    fontWeight: '500',
    flex: 1,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    gap: 4,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '700',
  },
});

// ============================================================================
// STYLES - EXPERT HELP
// ============================================================================
const expertStyles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  gradient: {
    padding: SPACING.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  bgPattern1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(43, 138, 111, 0.05)',
  },
  bgPattern2: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(212, 160, 23, 0.05)',
  },
  contentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    color: INSURANCE_COLORS.insuranceTealDark,
    lineHeight: 24,
    marginBottom: SPACING.sm,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: SPACING.md,
  },
  availableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: SPACING.md,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#C8E6C9',
  },
  availableText: {
    ...TYPOGRAPHY.caption,
    color: '#4CAF50',
    fontWeight: '600',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    position: 'relative',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
  ctaPulse: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: INSURANCE_COLORS.insuranceTeal,
    borderRadius: RADIUS.md,
  },
  ctaText: {
    ...TYPOGRAPHY.labelMedium,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  freeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: SPACING.md,
  },
  freeText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  advisorContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  advisorAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  advisorAvatarGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  advisorBubble: {
    position: 'absolute',
    top: -10,
    right: -20,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  bubbleText: {
    fontSize: 7,
    fontWeight: '600',
    color: COLORS.textSecondary,
    lineHeight: 10,
  },
  chatDotsRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
  },
  chatDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  advisorCountBadge: {
    marginTop: 4,
    backgroundColor: 'rgba(43, 138, 111, 0.08)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  advisorCountText: {
    fontSize: 8,
    fontWeight: '700',
    color: INSURANCE_COLORS.insuranceTeal,
  },
});

// ============================================================================
// STYLES - TRUST STATS
// ============================================================================
const trustStyles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 9,
    fontWeight: '500',
    color: COLORS.textTertiary,
    textAlign: 'center',
  },
});
