/**
 * ============================================================================
 * APOLLO 24/7 - HEALTH CHECK HERO, PROMOS & SEGMENTS
 * ============================================================================
 *
 * Premium Health Check section with promo banners carousel,
 * ultimate health challenge card, segment cards, and vitamin
 * deficiency awareness section.
 *
 * Features:
 * - Auto-scrolling promo banner carousel with coupon codes
 * - Animated ultimate health challenge with stats
 * - Segment selection cards (Men/Women 18-45, Sr Men/Women)
 * - Vitamin deficiency awareness with package cards
 * - Family savings banner
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
import { HC_COLORS, HC_LAYOUT, HC_DATA } from './HealthCheckTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// HEALTH CHECK SCREEN HERO
// ============================================================================
export const HealthCheckScreenHero = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const badgeScale = useSharedValue(0.8);
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    badgeScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 120 }));
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
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

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  return (
    <Animated.View style={[heroStyles.container, heroStyle]}>
      <LinearGradient
        colors={['rgba(21, 101, 192, 0.06)', 'rgba(46, 125, 50, 0.03)', COLORS.backgroundPure]}
        style={heroStyles.gradient}
      >
        {/* Pulse icon */}
        <Animated.View style={[heroStyles.pulseIcon, pulseStyle]}>
          <Ionicons name="fitness" size={28} color={HC_COLORS.healthBlueFaded} />
        </Animated.View>

        <View style={heroStyles.content}>
          <View style={heroStyles.iconRow}>
            <View style={heroStyles.badge}>
              <Ionicons name="fitness" size={16} color={HC_COLORS.healthBlue} />
            </View>
            <Animated.View style={[heroStyles.editionTag, badgeStyle]}>
              <Text style={heroStyles.editionTagText}>APOLLO DIAGNOSTICS</Text>
            </Animated.View>
          </View>
          <Text style={heroStyles.title}>Health Check</Text>
          <Text style={heroStyles.subtitle}>Preventive care at your doorstep</Text>
          <Text style={heroStyles.description}>Lab tests, full body checkups & health packages</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// PROMO BANNER CARD
// ============================================================================
const PromoBannerCard = React.memo(({ promo, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(50);
  const cardScale = useSharedValue(1);
  const couponPulse = useSharedValue(1);

  useEffect(() => {
    const delay = index * 100;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    couponPulse.value = withDelay(delay + 600, withRepeat(
      withSequence(
        withTiming(1.03, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ), -1, false
    ));
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

  const couponStyle = useAnimatedStyle(() => ({
    transform: [{ scale: couponPulse.value }],
  }));

  return (
    <Animated.View style={[promoStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[promoStyles.card, { backgroundColor: promo.bgColor }]}
      >
        {/* Icon */}
        <View style={[promoStyles.iconContainer, { backgroundColor: promo.textColor + '15' }]}>
          <Ionicons name={promo.icon} size={28} color={promo.textColor} />
        </View>

        {/* Content */}
        <View style={promoStyles.content}>
          <Text style={[promoStyles.title, { color: promo.textColor }]}>{promo.title}</Text>
          <Text style={[promoStyles.discount, { color: promo.textColor }]}>{promo.discount}</Text>
          <Text style={promoStyles.subtitle}>{promo.subtitle}</Text>

          {/* Coupon code */}
          <Animated.View style={[promoStyles.couponBadge, couponStyle, { borderColor: promo.textColor + '30' }]}>
            <Ionicons name="pricetag" size={10} color={promo.textColor} />
            <Text style={[promoStyles.couponText, { color: promo.textColor }]}>{promo.coupon}</Text>
          </Animated.View>
        </View>

        {/* Arrow */}
        <View style={[promoStyles.arrowCircle, { backgroundColor: promo.textColor + '15' }]}>
          <Ionicons name="arrow-forward" size={16} color={promo.textColor} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// PROMO BANNERS SECTION
// ============================================================================
export const PromoBannersSection = React.memo(() => {
  const promos = useMemo(() => HC_DATA.promoBanners, []);

  return (
    <View style={promoStyles.section}>
      <FlatList
        data={promos}
        renderItem={({ item, index }) => <PromoBannerCard promo={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={promoStyles.scrollContent}
        snapToInterval={HC_LAYOUT.promoCardWidth + SPACING.md}
        decelerationRate="fast"
      />
    </View>
  );
});

// ============================================================================
// SEGMENT CARD
// ============================================================================
const SegmentCard = React.memo(({ segment, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 100;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[segmentStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={segmentStyles.card}
      >
        {segment.popular && (
          <View style={segmentStyles.popularBadge}>
            <Text style={segmentStyles.popularText}>POPULAR</Text>
          </View>
        )}

        <View style={[segmentStyles.iconContainer, { backgroundColor: segment.color + '12' }]}>
          <Ionicons name={segment.icon} size={24} color={segment.color} />
        </View>

        <Text style={segmentStyles.segmentName}>{segment.name}</Text>
        <Text style={segmentStyles.description} numberOfLines={2}>{segment.description}</Text>

        <View style={segmentStyles.testsRow}>
          <Ionicons name="flask" size={12} color={segment.color} />
          <Text style={[segmentStyles.testsText, { color: segment.color }]}>
            {segment.tests} Tests
          </Text>
        </View>

        <View style={segmentStyles.priceRow}>
          <Text style={segmentStyles.price}>{'\u20B9'}{segment.price}</Text>
          <Text style={segmentStyles.oldPrice}>{'\u20B9'}{segment.oldPrice}</Text>
        </View>

        <View style={segmentStyles.discountBadge}>
          <Text style={segmentStyles.discountText}>{segment.discount}% OFF</Text>
        </View>

        <TouchableOpacity style={[segmentStyles.bookButton, { backgroundColor: segment.color }]} activeOpacity={0.7}>
          <Text style={segmentStyles.bookButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ULTIMATE HEALTH CHALLENGE SECTION
// ============================================================================
export const UltimateHealthChallengeSection = React.memo(() => {
  const data = useMemo(() => HC_DATA.ultimateChallenge, []);

  return (
    <View style={segmentStyles.section}>
      {/* Section Header */}
      <View style={segmentStyles.sectionHeader}>
        <LinearGradient
          colors={['#E8F5E9', '#C8E6C9']}
          style={segmentStyles.headerGradient}
        >
          <View style={segmentStyles.headerContent}>
            <View style={segmentStyles.headerIcon}>
              <Ionicons name="trophy" size={20} color={HC_COLORS.healthGreen} />
            </View>
            <View style={segmentStyles.headerText}>
              <View style={segmentStyles.headerTitleRow}>
                <Text style={segmentStyles.headerTitle}>{data.title}</Text>
                <View style={segmentStyles.headerBadge}>
                  <Text style={segmentStyles.headerBadgeText}>{data.badge}</Text>
                </View>
              </View>
              <Text style={segmentStyles.headerSubtitle}>{data.subtitle}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={segmentStyles.statsRow}>
            <View style={segmentStyles.statItem}>
              <Text style={segmentStyles.statValue}>{data.stats.tests}</Text>
              <Text style={segmentStyles.statLabel}>Tests</Text>
            </View>
            <View style={segmentStyles.statDivider} />
            <View style={segmentStyles.statItem}>
              <Text style={segmentStyles.statValue}>{data.stats.parameters}</Text>
              <Text style={segmentStyles.statLabel}>Parameters</Text>
            </View>
            <View style={segmentStyles.statDivider} />
            <View style={segmentStyles.statItem}>
              <Text style={segmentStyles.statValue}>{data.stats.reports}</Text>
              <Text style={segmentStyles.statLabel}>Reports</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Segment Cards */}
      <View style={segmentStyles.grid}>
        {data.segments.map((segment, index) => (
          <SegmentCard key={segment.id} segment={segment} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// VITAMIN DEFICIENCY SECTION
// ============================================================================
export const VitaminDeficiencySection = React.memo(() => {
  const data = useMemo(() => HC_DATA.vitaminDeficiency, []);

  return (
    <View style={vitaminStyles.section}>
      {/* Awareness Banner */}
      <View style={vitaminStyles.banner}>
        <LinearGradient
          colors={['#FFF8E1', '#FFECB3']}
          style={vitaminStyles.bannerGradient}
        >
          <View style={vitaminStyles.bannerContent}>
            <Ionicons name="warning" size={24} color="#F57F17" />
            <View style={vitaminStyles.bannerText}>
              <Text style={vitaminStyles.bannerTitle}>{data.title}</Text>
              <Text style={vitaminStyles.bannerSubtitle}>{data.subtitle}</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Vitamin Packages */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={vitaminStyles.scrollContent}
      >
        {data.packages.map((pkg, index) => (
          <VitaminPackageCard key={pkg.id} pkg={pkg} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// VITAMIN PACKAGE CARD
// ============================================================================
const VitaminPackageCard = React.memo(({ pkg, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
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
    <Animated.View style={[vitaminStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[vitaminStyles.card, { borderColor: pkg.color + '30' }]}
      >
        <View style={[vitaminStyles.cardAccent, { backgroundColor: pkg.color }]} />

        <Text style={[vitaminStyles.packageName, { color: pkg.color }]}>{pkg.name}</Text>
        <Text style={vitaminStyles.packageTests}>{pkg.tests}</Text>
        <Text style={vitaminStyles.packageIncludes}>{pkg.includes}</Text>

        <View style={vitaminStyles.priceRow}>
          <Text style={vitaminStyles.price}>{'\u20B9'}{pkg.price}</Text>
          <Text style={vitaminStyles.oldPrice}>{'\u20B9'}{pkg.oldPrice}</Text>
        </View>

        <TouchableOpacity style={[vitaminStyles.bookButton, { backgroundColor: pkg.color }]} activeOpacity={0.7}>
          <Text style={vitaminStyles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// FAMILY SAVINGS BANNER
// ============================================================================
export const FamilySavingsBanner = React.memo(() => {
  const data = useMemo(() => HC_DATA.familySavings, []);

  return (
    <View style={familyStyles.section}>
      <View style={familyStyles.banner}>
        <LinearGradient
          colors={['#E3F2FD', '#BBDEFB']}
          style={familyStyles.gradient}
        >
          <View style={familyStyles.content}>
            <View style={familyStyles.textContent}>
              <Text style={familyStyles.title}>{data.title}</Text>
              <Text style={familyStyles.subtitle}>{data.subtitle}</Text>

              <View style={familyStyles.codeRow}>
                <Text style={familyStyles.codeLabel}>Code:</Text>
                <View style={familyStyles.codeBadge}>
                  <Text style={familyStyles.codeText}>{data.code}</Text>
                </View>
              </View>

              {data.features.map((feature, idx) => (
                <View key={idx} style={familyStyles.featureRow}>
                  <Ionicons name="checkmark-circle" size={14} color={HC_COLORS.healthGreen} />
                  <Text style={familyStyles.featureText}>{feature}</Text>
                </View>
              ))}

              <TouchableOpacity style={familyStyles.ctaButton} activeOpacity={0.7}>
                <Text style={familyStyles.ctaText}>Book Now</Text>
                <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Illustration */}
            <View style={familyStyles.illustration}>
              <View style={familyStyles.familyIconBg}>
                <Ionicons name="people" size={40} color={HC_COLORS.healthBlue} />
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

// ============================================================================
// BEST VALUE CHECKUPS SECTION
// ============================================================================
export const BestValueCheckupsSection = React.memo(() => {
  const checkups = useMemo(() => HC_DATA.bestValueCheckups, []);

  return (
    <View style={checkupStyles.section}>
      <View style={checkupStyles.sectionHeader}>
        <Ionicons name="ribbon" size={18} color={HC_COLORS.healthBlue} />
        <Text style={checkupStyles.sectionTitle}>Best-Value Full Body Checkups</Text>
      </View>

      <FlatList
        data={checkups}
        renderItem={({ item, index }) => <CheckupCard checkup={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={checkupStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// CHECKUP CARD
// ============================================================================
const CheckupCard = React.memo(({ checkup, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
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
    <Animated.View style={[checkupStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={checkupStyles.card}
      >
        {checkup.badge ? (
          <View style={checkupStyles.badge}>
            <Text style={checkupStyles.badgeText}>{checkup.badge}</Text>
          </View>
        ) : null}

        <View style={checkupStyles.includesTag}>
          <Text style={checkupStyles.includesText}>{checkup.includes}</Text>
        </View>

        <Text style={checkupStyles.checkupName} numberOfLines={2}>{checkup.name}</Text>

        <View style={checkupStyles.testsRow}>
          <Ionicons name="flask" size={12} color={HC_COLORS.healthBlue} />
          <Text style={checkupStyles.testsCount}>{checkup.tests} Tests</Text>
        </View>

        <View style={checkupStyles.priceRow}>
          <Text style={checkupStyles.oldPrice}>{'\u20B9'}{checkup.oldPrice}</Text>
        </View>
        <View style={checkupStyles.currentPriceRow}>
          <Text style={checkupStyles.nowLabel}>Now at </Text>
          <Text style={checkupStyles.price}>{'\u20B9'}{checkup.price.toLocaleString()}</Text>
          <Ionicons name="chevron-forward" size={16} color={HC_COLORS.healthBlue} />
        </View>
      </TouchableOpacity>
    </Animated.View>
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
  pulseIcon: {
    position: 'absolute', top: -5, right: -5,
    width: 60, height: 60,
    justifyContent: 'center', alignItems: 'center',
    opacity: 0.3,
  },
  content: { zIndex: 1 },
  iconRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  badge: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: HC_COLORS.healthBlueFaded,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: HC_COLORS.healthBlueSubtle,
  },
  editionTag: {
    backgroundColor: HC_COLORS.healthBlueFaded,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1, borderColor: HC_COLORS.healthBlueSubtle,
  },
  editionTagText: {
    ...TYPOGRAPHY.badge, color: HC_COLORS.healthBlue,
    letterSpacing: 1.5, fontSize: 9,
  },
  title: {
    fontSize: 36, fontWeight: '900', color: COLORS.textPrimary,
    letterSpacing: -0.5, marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.h4, color: HC_COLORS.healthBlue,
    fontWeight: '600', marginBottom: SPACING.xs,
  },
  description: { ...TYPOGRAPHY.bodyMedium, color: COLORS.textTertiary },
});

// ============================================================================
// STYLES - PROMO
// ============================================================================
const promoStyles = StyleSheet.create({
  section: { marginTop: SPACING.lg },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: HC_LAYOUT.promoCardWidth },
  card: {
    borderRadius: RADIUS.xl, padding: SPACING.lg,
    flexDirection: 'row', alignItems: 'center',
    ...SHADOWS.cardSoft, overflow: 'hidden', position: 'relative',
  },
  iconContainer: {
    width: 52, height: 52, borderRadius: 26,
    justifyContent: 'center', alignItems: 'center',
    marginRight: SPACING.md,
  },
  content: { flex: 1 },
  title: { fontSize: 14, fontWeight: '800', marginBottom: 2 },
  discount: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
  subtitle: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, marginBottom: SPACING.sm },
  couponBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm, paddingVertical: 3,
    borderRadius: RADIUS.sm, borderWidth: 1,
    borderStyle: 'dashed',
  },
  couponText: { fontSize: 10, fontWeight: '800', letterSpacing: 0.5 },
  arrowCircle: {
    width: 32, height: 32, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
    marginLeft: SPACING.sm,
  },
});

// ============================================================================
// STYLES - SEGMENTS
// ============================================================================
const segmentStyles = StyleSheet.create({
  section: { paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl },
  sectionHeader: {
    borderRadius: RADIUS.xl, overflow: 'hidden',
    marginBottom: SPACING.lg, ...SHADOWS.cardSoft,
  },
  headerGradient: { padding: SPACING.lg },
  headerContent: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  headerIcon: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(46, 125, 50, 0.15)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerText: { flex: 1 },
  headerTitleRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
  },
  headerTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  headerBadge: {
    backgroundColor: HC_COLORS.healthGreen,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  headerBadgeText: { fontSize: 8, fontWeight: '900', color: '#FFFFFF' },
  headerSubtitle: {
    ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    paddingTop: SPACING.md,
    borderTopWidth: 1, borderTopColor: 'rgba(46, 125, 50, 0.15)',
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 16, fontWeight: '900', color: HC_COLORS.healthGreen },
  statLabel: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(46, 125, 50, 0.15)' },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md,
  },
  cardWrapper: { width: HC_LAYOUT.segmentCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, position: 'relative', overflow: 'hidden',
  },
  popularBadge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  popularText: { fontSize: 7, fontWeight: '900', color: HC_COLORS.healthGreen },
  iconContainer: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  segmentName: { ...TYPOGRAPHY.labelLarge, color: COLORS.textPrimary, marginBottom: 4 },
  description: { fontSize: 10, color: COLORS.textTertiary, lineHeight: 14, marginBottom: SPACING.sm },
  testsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginBottom: SPACING.sm,
  },
  testsText: { fontSize: 11, fontWeight: '700' },
  priceRow: {
    flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  price: { fontSize: 16, fontWeight: '900', color: COLORS.textPrimary },
  oldPrice: { fontSize: 11, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  discountBadge: {
    backgroundColor: '#FFEBEE', paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: RADIUS.xs, alignSelf: 'flex-start', marginBottom: SPACING.md,
  },
  discountText: { fontSize: 10, fontWeight: '700', color: '#E53935' },
  bookButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: SPACING.sm + 2, borderRadius: RADIUS.md,
    gap: 4,
  },
  bookButtonText: { ...TYPOGRAPHY.labelSmall, color: '#FFFFFF', fontWeight: '700' },
});

// ============================================================================
// STYLES - VITAMIN
// ============================================================================
const vitaminStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  banner: {
    marginHorizontal: SPACING.screenPadding,
    borderRadius: RADIUS.xl, overflow: 'hidden',
    marginBottom: SPACING.lg, ...SHADOWS.cardSoft,
  },
  bannerGradient: { padding: SPACING.lg },
  bannerContent: {
    flexDirection: 'row', alignItems: 'flex-start', gap: SPACING.md,
  },
  bannerText: { flex: 1 },
  bannerTitle: {
    fontSize: 16, fontWeight: '800', color: '#E65100',
    lineHeight: 22, marginBottom: 4,
  },
  bannerSubtitle: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: 160 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.lg, borderWidth: 1.5,
    ...SHADOWS.cardSoft, position: 'relative', overflow: 'hidden',
  },
  cardAccent: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
  },
  packageName: { fontSize: 13, fontWeight: '800', marginBottom: 4, marginTop: 4 },
  packageTests: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginBottom: 2 },
  packageIncludes: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginBottom: SPACING.md },
  priceRow: {
    flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  price: { fontSize: 16, fontWeight: '900', color: COLORS.textPrimary },
  oldPrice: { fontSize: 11, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  bookButton: {
    alignItems: 'center', paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
  },
  bookButtonText: { ...TYPOGRAPHY.labelSmall, color: '#FFFFFF', fontWeight: '700' },
});

// ============================================================================
// STYLES - FAMILY
// ============================================================================
const familyStyles = StyleSheet.create({
  section: { paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl },
  banner: {
    borderRadius: RADIUS.xl, overflow: 'hidden', ...SHADOWS.cardSoft,
  },
  gradient: { padding: SPACING.xl },
  content: { flexDirection: 'row', alignItems: 'flex-start' },
  textContent: { flex: 1, paddingRight: SPACING.md },
  title: {
    fontSize: 17, fontWeight: '800', color: COLORS.textPrimary,
    lineHeight: 24, marginBottom: 4,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary,
    lineHeight: 18, marginBottom: SPACING.md,
  },
  codeRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  codeLabel: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary },
  codeBadge: {
    backgroundColor: HC_COLORS.healthBlue,
    paddingHorizontal: SPACING.sm, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  codeText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF', letterSpacing: 0.5 },
  featureRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: 4,
  },
  featureText: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, flex: 1 },
  ctaButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: HC_COLORS.healthBlue,
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md, gap: SPACING.sm,
    alignSelf: 'flex-start', marginTop: SPACING.md,
  },
  ctaText: { ...TYPOGRAPHY.labelSmall, color: '#FFFFFF', fontWeight: '700' },
  illustration: {
    width: 80, height: 80,
    justifyContent: 'center', alignItems: 'center',
  },
  familyIconBg: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(21, 101, 192, 0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
});

// ============================================================================
// STYLES - CHECKUP
// ============================================================================
const checkupStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: HC_LAYOUT.checkupCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, position: 'relative', overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: 8, right: 8,
    backgroundColor: HC_COLORS.healthBlue,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  badgeText: { fontSize: 7, fontWeight: '900', color: '#FFFFFF' },
  includesTag: {
    backgroundColor: HC_COLORS.healthBlueFaded,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
    alignSelf: 'flex-start', marginBottom: SPACING.sm,
  },
  includesText: { fontSize: 9, fontWeight: '700', color: HC_COLORS.healthBlue },
  checkupName: {
    ...TYPOGRAPHY.labelLarge, color: COLORS.textPrimary,
    lineHeight: 20, marginBottom: SPACING.sm,
  },
  testsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginBottom: SPACING.sm,
  },
  testsCount: { fontSize: 11, fontWeight: '700', color: HC_COLORS.healthBlue },
  priceRow: { marginBottom: 2 },
  oldPrice: { fontSize: 12, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  currentPriceRow: {
    flexDirection: 'row', alignItems: 'center',
  },
  nowLabel: { ...TYPOGRAPHY.bodySmall, color: COLORS.textTertiary },
  price: { fontSize: 18, fontWeight: '900', color: HC_COLORS.healthBlue },
});
