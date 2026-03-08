/**
 * ============================================================================
 * APOLLO 24/7 - HEALTH CHECK PACKAGES, TRUST & COUPONS
 * ============================================================================
 *
 * Premium Health Check section components including tax saver packages,
 * lab trust indicators, certifications, coupons carousel, lab process
 * steps, special offers, and offer terms.
 *
 * Features:
 * - Tax saver packages carousel with detailed features
 * - Lab trust indicators with animated stats
 * - Certification badges (NABL, CAP, UKAS)
 * - Coupons carousel with copy-to-clipboard
 * - Lab process steps with connecting lines
 * - Special offers section
 * - Offer terms & conditions accordion
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
// TAX SAVER PACKAGE CARD
// ============================================================================
const TaxSaverCard = React.memo(({ pkg, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(40);
  const cardScale = useSharedValue(1);
  const badgePulse = useSharedValue(1);

  useEffect(() => {
    const delay = index * 80;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    if (pkg.badge) {
      badgePulse.value = withDelay(delay + 500, withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500 }),
          withTiming(1, { duration: 1500 })
        ), -1, false
      ));
    }
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

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgePulse.value }],
  }));

  return (
    <Animated.View style={[taxStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={taxStyles.card}
      >
        {/* Color accent bar */}
        <View style={[taxStyles.accentBar, { backgroundColor: pkg.color }]} />

        {/* Badge */}
        {pkg.badge ? (
          <Animated.View style={[taxStyles.badge, badgeStyle, { backgroundColor: pkg.color }]}>
            <Text style={taxStyles.badgeText}>{pkg.badge}</Text>
          </Animated.View>
        ) : null}

        {/* Package name */}
        <Text style={[taxStyles.packageName, { color: pkg.color }]}>{pkg.name}</Text>

        {/* Tests count */}
        <View style={taxStyles.testsRow}>
          <Ionicons name="flask" size={12} color={pkg.color} />
          <Text style={[taxStyles.testsText, { color: pkg.color }]}>{pkg.tests} Tests</Text>
        </View>

        {/* Includes */}
        <View style={taxStyles.includesContainer}>
          {pkg.includes.map((item, idx) => (
            <View key={idx} style={taxStyles.includeRow}>
              <Ionicons name="checkmark-circle" size={12} color={HC_COLORS.healthGreen} />
              <Text style={taxStyles.includeText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Price */}
        <View style={taxStyles.priceRow}>
          <Text style={taxStyles.price}>{'\u20B9'}{pkg.price}</Text>
          <Text style={taxStyles.oldPrice}>{'\u20B9'}{pkg.oldPrice}</Text>
        </View>

        {/* Savings */}
        <View style={taxStyles.savingsRow}>
          <Ionicons name="pricetag" size={10} color="#2E7D32" />
          <Text style={taxStyles.savingsText}>
            Save {'\u20B9'}{pkg.oldPrice - pkg.price}
          </Text>
        </View>

        {/* Book CTA */}
        <TouchableOpacity style={[taxStyles.bookButton, { backgroundColor: pkg.color }]} activeOpacity={0.7}>
          <Text style={taxStyles.bookButtonText}>Book Now</Text>
          <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TAX SAVER PACKAGES SECTION
// ============================================================================
export const TaxSaverPackagesSection = React.memo(() => {
  const packages = useMemo(() => HC_DATA.taxSaverPackages, []);

  return (
    <View style={taxStyles.section}>
      <View style={taxStyles.sectionHeader}>
        <View style={taxStyles.headerIcon}>
          <Ionicons name="cash" size={18} color={HC_COLORS.healthPurple} />
        </View>
        <View>
          <Text style={taxStyles.sectionTitle}>Tax Saver Health Packages</Text>
          <Text style={taxStyles.sectionSubtitle}>Save tax under Section 80D while staying healthy</Text>
        </View>
      </View>

      <FlatList
        data={packages}
        renderItem={({ item, index }) => <TaxSaverCard pkg={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={taxStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// LAB TRUST STAT
// ============================================================================
const TrustStat = React.memo(({ stat, index }) => {
  const statOpacity = useSharedValue(0);
  const statScale = useSharedValue(0.5);
  const iconBounce = useSharedValue(0);

  useEffect(() => {
    const delay = index * 120;
    statOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    statScale.value = withDelay(delay, withSpring(1, { damping: 10, stiffness: 150 }));
    iconBounce.value = withDelay(delay + 300, withSpring(1, { damping: 8, stiffness: 200 }));
  }, [index]);

  const statStyle = useAnimatedStyle(() => ({
    opacity: statOpacity.value,
    transform: [{ scale: statScale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconBounce.value }],
  }));

  return (
    <Animated.View style={[trustStyles.statWrapper, statStyle]}>
      <Animated.View style={[trustStyles.statIcon, iconStyle, { backgroundColor: stat.color + '12' }]}>
        <Ionicons name={stat.icon} size={20} color={stat.color} />
      </Animated.View>
      <Text style={trustStyles.statValue}>{stat.value}</Text>
      <Text style={trustStyles.statLabel}>{stat.label}</Text>
    </Animated.View>
  );
});

// ============================================================================
// LAB TRUST SECTION
// ============================================================================
export const LabTrustSection = React.memo(() => {
  const { stats, certifications } = useMemo(() => HC_DATA.labTrust, []);

  return (
    <View style={trustStyles.section}>
      {/* Section Header */}
      <View style={trustStyles.sectionHeader}>
        <Ionicons name="shield-checkmark" size={18} color={HC_COLORS.healthBlue} />
        <Text style={trustStyles.sectionTitle}>Why Trust Apollo Labs</Text>
      </View>

      {/* Trust Stats */}
      <View style={trustStyles.statsGrid}>
        {stats.map((stat, index) => (
          <TrustStat key={stat.id} stat={stat} index={index} />
        ))}
      </View>

      {/* Certifications */}
      <View style={trustStyles.certContainer}>
        <Text style={trustStyles.certTitle}>Our Certifications</Text>
        <View style={trustStyles.certRow}>
          {certifications.map((cert) => (
            <View key={cert.id} style={[trustStyles.certBadge, { borderColor: cert.color + '30' }]}>
              <View style={[trustStyles.certIcon, { backgroundColor: cert.color + '12' }]}>
                <Text style={[trustStyles.certName, { color: cert.color }]}>{cert.name}</Text>
              </View>
              <Text style={trustStyles.certDescription} numberOfLines={2}>{cert.description}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
});

// ============================================================================
// COUPON CARD
// ============================================================================
const CouponCard = React.memo(({ coupon, index }) => {
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
    <Animated.View style={[couponStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[couponStyles.card, { backgroundColor: coupon.bgColor }]}
      >
        {/* Coupon notch */}
        <View style={couponStyles.notchLeft} />
        <View style={couponStyles.notchRight} />

        <View style={couponStyles.content}>
          <Text style={[couponStyles.couponTitle, { color: coupon.textColor }]}>{coupon.title}</Text>
          <Text style={couponStyles.couponSubtitle}>{coupon.subtitle}</Text>

          <View style={couponStyles.codeRow}>
            <View style={[couponStyles.codeBadge, { borderColor: coupon.textColor + '30' }]}>
              <Text style={[couponStyles.codeText, { color: coupon.textColor }]}>{coupon.code}</Text>
            </View>
            <TouchableOpacity style={couponStyles.copyButton} activeOpacity={0.7}>
              <Ionicons name="copy-outline" size={14} color={coupon.textColor} />
            </TouchableOpacity>
          </View>

          <Text style={couponStyles.termsText}>
            Min. order {'\u20B9'}{coupon.minOrder} | Max. discount {'\u20B9'}{coupon.maxDiscount}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// COUPONS SECTION
// ============================================================================
export const CouponsSection = React.memo(() => {
  const coupons = useMemo(() => HC_DATA.coupons, []);

  return (
    <View style={couponStyles.section}>
      <View style={couponStyles.sectionHeader}>
        <Ionicons name="pricetag" size={18} color={HC_COLORS.healthOrange} />
        <Text style={couponStyles.sectionTitle}>Exclusive Coupons</Text>
      </View>

      <FlatList
        data={coupons}
        renderItem={({ item, index }) => <CouponCard coupon={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={couponStyles.scrollContent}
        snapToInterval={HC_LAYOUT.couponCardWidth + SPACING.md}
        decelerationRate="fast"
      />
    </View>
  );
});

// ============================================================================
// LAB PROCESS STEPS
// ============================================================================
export const LabProcessSection = React.memo(() => {
  const steps = useMemo(() => HC_DATA.labSteps, []);

  return (
    <View style={processStyles.section}>
      <View style={processStyles.sectionHeader}>
        <Text style={processStyles.sectionTitle}>How It Works</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={processStyles.scrollContent}
      >
        {steps.map((step, index) => (
          <LabStepCard key={step.id} step={step} index={index} isLast={index === steps.length - 1} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// LAB STEP CARD
// ============================================================================
const LabStepCard = React.memo(({ step, index, isLast }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(20);
  const iconScale = useSharedValue(0);

  useEffect(() => {
    const delay = index * 120;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    iconScale.value = withDelay(delay + 200, withSpring(1, { damping: 10, stiffness: 200 }));
  }, [index]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <Animated.View style={[processStyles.stepWrapper, cardStyle]}>
      <View style={processStyles.stepContent}>
        {/* Step number */}
        <View style={processStyles.stepNumberBg}>
          <Text style={processStyles.stepNumber}>{index + 1}</Text>
        </View>

        {/* Icon */}
        <Animated.View style={[processStyles.stepIconBg, iconStyle, { backgroundColor: step.color + '12' }]}>
          <Ionicons name={step.icon} size={24} color={step.color} />
        </Animated.View>

        {/* Title */}
        <Text style={processStyles.stepTitle}>{step.title}</Text>
      </View>

      {/* Connector */}
      {!isLast && (
        <View style={processStyles.connector}>
          <Ionicons name="chevron-forward" size={14} color={COLORS.borderMedium} />
        </View>
      )}
    </Animated.View>
  );
});

// ============================================================================
// SPECIAL OFFERS SECTION
// ============================================================================
export const SpecialOffersSection = React.memo(() => {
  const offers = useMemo(() => HC_DATA.specialOffers, []);

  return (
    <View style={offerStyles.section}>
      <View style={offerStyles.sectionHeader}>
        <Ionicons name="gift" size={18} color={HC_COLORS.healthOrange} />
        <Text style={offerStyles.sectionTitle}>Special Offers</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={offerStyles.scrollContent}
      >
        {offers.map((offer, index) => (
          <SpecialOfferCard key={offer.id} offer={offer} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// SPECIAL OFFER CARD
// ============================================================================
const SpecialOfferCard = React.memo(({ offer, index }) => {
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
    <Animated.View style={[offerStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <LinearGradient
          colors={offer.bgColors}
          style={offerStyles.card}
        >
          <Text style={offerStyles.offerTitle}>{offer.title}</Text>
          <Text style={offerStyles.offerSubtitle}>{offer.subtitle}</Text>
          <View style={offerStyles.offerCodeRow}>
            <Text style={offerStyles.offerCode}>Code: {offer.code}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// OFFER TERMS SECTION
// ============================================================================
export const OfferTermsSection = React.memo(() => {
  const terms = useMemo(() => HC_DATA.offerTerms, []);
  const [expandedId, setExpandedId] = useState(null);

  return (
    <View style={termsStyles.section}>
      <View style={termsStyles.sectionHeader}>
        <Ionicons name="document-text" size={16} color={COLORS.textTertiary} />
        <Text style={termsStyles.sectionTitle}>Offer Terms & Conditions</Text>
      </View>

      {terms.map((term) => (
        <TouchableOpacity
          key={term.id}
          activeOpacity={0.7}
          onPress={() => setExpandedId(expandedId === term.id ? null : term.id)}
          style={[termsStyles.termItem, expandedId === term.id && termsStyles.termItemActive]}
        >
          <View style={termsStyles.termHeader}>
            <Text style={termsStyles.termTitle}>{term.title}</Text>
            <Ionicons
              name={expandedId === term.id ? 'chevron-up' : 'chevron-down'}
              size={16}
              color={COLORS.textTertiary}
            />
          </View>
          {expandedId === term.id && (
            <Text style={termsStyles.termContent}>{term.content}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
});

// ============================================================================
// STYLES - TAX SAVER
// ============================================================================
const taxStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  headerIcon: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: HC_COLORS.healthPurpleFaded,
    justifyContent: 'center', alignItems: 'center',
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginTop: 2 },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: HC_LAYOUT.taxPackageWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.xl,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, position: 'relative', overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute', top: 0, left: 0, right: 0, height: 3,
  },
  badge: {
    position: 'absolute', top: 8, right: 8,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  badgeText: { fontSize: 7, fontWeight: '900', color: '#FFFFFF' },
  packageName: { fontSize: 13, fontWeight: '800', marginBottom: SPACING.xs, marginTop: 4 },
  testsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginBottom: SPACING.md,
  },
  testsText: { fontSize: 11, fontWeight: '700' },
  includesContainer: { marginBottom: SPACING.md },
  includeRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginBottom: 3,
  },
  includeText: { fontSize: 10, color: COLORS.textSecondary },
  priceRow: {
    flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm,
    marginBottom: 4,
  },
  price: { fontSize: 18, fontWeight: '900', color: COLORS.textPrimary },
  oldPrice: { fontSize: 11, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  savingsRow: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    marginBottom: SPACING.md,
  },
  savingsText: { fontSize: 10, fontWeight: '700', color: '#2E7D32' },
  bookButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: SPACING.sm + 2, borderRadius: RADIUS.md, gap: 4,
  },
  bookButtonText: { ...TYPOGRAPHY.labelSmall, color: '#FFFFFF', fontWeight: '700' },
});

// ============================================================================
// STYLES - TRUST
// ============================================================================
const trustStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: SPACING.md, marginBottom: SPACING.xl,
  },
  statWrapper: {
    width: (SCREEN_WIDTH - 52) / 2,
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle,
  },
  statIcon: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  statValue: { fontSize: 18, fontWeight: '900', color: COLORS.textPrimary, marginBottom: 2 },
  statLabel: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary },
  certContainer: { marginTop: SPACING.sm },
  certTitle: { ...TYPOGRAPHY.labelLarge, color: COLORS.textPrimary, marginBottom: SPACING.md },
  certRow: { flexDirection: 'row', gap: SPACING.sm },
  certBadge: {
    flex: 1, backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card, padding: SPACING.md,
    borderWidth: 1, ...SHADOWS.subtle, alignItems: 'center',
  },
  certIcon: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm, marginBottom: SPACING.xs,
  },
  certName: { fontSize: 12, fontWeight: '900', letterSpacing: 0.5 },
  certDescription: {
    fontSize: 8, color: COLORS.textMuted, textAlign: 'center',
    lineHeight: 11,
  },
});

// ============================================================================
// STYLES - COUPONS
// ============================================================================
const couponStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: HC_LAYOUT.couponCardWidth },
  card: {
    borderRadius: RADIUS.xl, padding: SPACING.lg,
    position: 'relative', overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  notchLeft: {
    position: 'absolute', left: -8, top: '50%',
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: COLORS.backgroundPure,
    marginTop: -8,
  },
  notchRight: {
    position: 'absolute', right: -8, top: '50%',
    width: 16, height: 16, borderRadius: 8,
    backgroundColor: COLORS.backgroundPure,
    marginTop: -8,
  },
  content: {},
  couponTitle: { fontSize: 18, fontWeight: '900', marginBottom: 4 },
  couponSubtitle: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginBottom: SPACING.md },
  codeRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  codeBadge: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm, borderWidth: 1.5, borderStyle: 'dashed',
  },
  codeText: { fontSize: 12, fontWeight: '800', letterSpacing: 1 },
  copyButton: { padding: 4 },
  termsText: { fontSize: 9, color: COLORS.textMuted },
});

// ============================================================================
// STYLES - PROCESS
// ============================================================================
const processStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: {
    paddingHorizontal: SPACING.screenPadding,
  },
  stepWrapper: {
    flexDirection: 'row', alignItems: 'center',
  },
  stepContent: {
    width: HC_LAYOUT.labStepWidth, alignItems: 'center',
  },
  stepNumberBg: {
    width: 20, height: 20, borderRadius: 10,
    backgroundColor: HC_COLORS.healthBlue,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  stepNumber: { fontSize: 10, fontWeight: '800', color: '#FFFFFF' },
  stepIconBg: {
    width: 48, height: 48, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  stepTitle: {
    fontSize: 10, fontWeight: '600', color: COLORS.textSecondary,
    textAlign: 'center', lineHeight: 14,
  },
  connector: {
    paddingHorizontal: SPACING.xs,
    marginBottom: 24,
  },
});

// ============================================================================
// STYLES - OFFERS
// ============================================================================
const offerStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: 180 },
  card: {
    borderRadius: RADIUS.card, padding: SPACING.lg,
    ...SHADOWS.cardSoft,
  },
  offerTitle: { fontSize: 16, fontWeight: '900', color: COLORS.textPrimary, marginBottom: 4 },
  offerSubtitle: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginBottom: SPACING.md },
  offerCodeRow: {},
  offerCode: { fontSize: 10, fontWeight: '700', color: COLORS.textTertiary },
});

// ============================================================================
// STYLES - TERMS
// ============================================================================
const termsStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: { ...TYPOGRAPHY.labelLarge, color: COLORS.textTertiary },
  termItem: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    marginBottom: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  termItemActive: { borderColor: HC_COLORS.healthBlueSubtle },
  termHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: SPACING.md,
  },
  termTitle: { ...TYPOGRAPHY.labelMedium, color: COLORS.textSecondary },
  termContent: {
    ...TYPOGRAPHY.bodySmall, color: COLORS.textTertiary,
    paddingHorizontal: SPACING.md, paddingBottom: SPACING.md, lineHeight: 18,
  },
});
