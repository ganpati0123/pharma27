/**
 * ============================================================================
 * APOLLO 24/7 - INSURANCE PARTNERS & TESTIMONIALS SECTION
 * ============================================================================
 *
 * Premium insurance partner logos carousel, testimonial cards,
 * FAQ accordion, and age-based premium calculator.
 *
 * Features:
 * - Auto-scrolling partner logos with brand colors
 * - Animated testimonial cards with star ratings
 * - Expandable FAQ accordion with smooth animations
 * - Age-based premium calculator with interactive selection
 * - Spring physics on all interactions
 * - Staggered entrance animations
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
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';
import { INSURANCE_COLORS, INSURANCE_LAYOUT, INSURANCE_DATA } from './InsuranceTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// PARTNER LOGO CARD
// ============================================================================
const PartnerLogoCard = React.memo(({ partner, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const cardScale = useSharedValue(1);
  const ratingPulse = useSharedValue(0);

  useEffect(() => {
    const delay = index * 60;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));

    ratingPulse.value = withDelay(
      delay + 800,
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
    cardScale.value = withSpring(0.94, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }, { scale: cardScale.value }],
  }));

  const ratingStyle = useAnimatedStyle(() => ({
    opacity: interpolate(ratingPulse.value, [0, 1], [0.7, 1]),
  }));

  return (
    <Animated.View style={[partnerStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={partnerStyles.card}
      >
        {/* Partner Logo Area */}
        <View style={[partnerStyles.logoContainer, { backgroundColor: partner.color + '10' }]}>
          <Text style={[partnerStyles.logoText, { color: partner.color }]}>{partner.shortName}</Text>
        </View>

        {/* Partner Name */}
        <Text style={partnerStyles.partnerName} numberOfLines={1}>{partner.name}</Text>

        {/* Rating */}
        <Animated.View style={[partnerStyles.ratingRow, ratingStyle]}>
          <Ionicons name="star" size={10} color={INSURANCE_COLORS.assuredGold} />
          <Text style={partnerStyles.ratingText}>{partner.rating}</Text>
        </Animated.View>

        {/* Claim Ratio */}
        <View style={partnerStyles.claimRow}>
          <Text style={partnerStyles.claimLabel}>Claim:</Text>
          <Text style={[partnerStyles.claimValue, { color: partner.color }]}>{partner.claimRatio}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// PARTNERS SECTION
// ============================================================================
export const PartnersSection = React.memo(() => {
  const partners = useMemo(() => INSURANCE_DATA.partners, []);
  const sectionOpacity = useSharedValue(0);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: 500 });
  }, []);

  const sectionStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
  }));

  return (
    <Animated.View style={[partnerStyles.section, sectionStyle]}>
      {/* Section Header */}
      <View style={partnerStyles.sectionHeader}>
        <Text style={partnerStyles.sectionTitle}>APOLLO TOP HEALTH INSURANCE PLANS</Text>
        <Text style={partnerStyles.sectionSubtitle}>Compare & choose from India's best insurers</Text>
      </View>

      {/* Partners Grid - 2 rows */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={partnerStyles.scrollContent}
      >
        {partners.map((partner, index) => (
          <PartnerLogoCard key={partner.id} partner={partner} index={index} />
        ))}
      </ScrollView>

      {/* View All Partners */}
      <TouchableOpacity style={partnerStyles.viewAllButton} activeOpacity={0.7}>
        <Text style={partnerStyles.viewAllText}>View All 12+ Partners</Text>
        <Ionicons name="arrow-forward" size={14} color={INSURANCE_COLORS.insuranceTeal} />
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================
const TestimonialCard = React.memo(({ testimonial, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(40);
  const cardScale = useSharedValue(1);
  const quoteOpacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 100;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    quoteOpacity.value = withDelay(delay + 400, withTiming(1, { duration: 400 }));
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

  const quoteStyle = useAnimatedStyle(() => ({
    opacity: quoteOpacity.value,
  }));

  return (
    <Animated.View style={[testimonialStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={testimonialStyles.card}
      >
        {/* Quote icon */}
        <View style={testimonialStyles.quoteIcon}>
          <Text style={testimonialStyles.quoteText}>{'\u201C'}</Text>
        </View>

        {/* Rating */}
        <View style={testimonialStyles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= testimonial.rating ? 'star' : 'star-outline'}
              size={14}
              color={INSURANCE_COLORS.assuredGold}
            />
          ))}
        </View>

        {/* Testimonial text */}
        <Animated.Text style={[testimonialStyles.testimonialText, quoteStyle]}>
          {testimonial.text}
        </Animated.Text>

        {/* Claim info */}
        <View style={testimonialStyles.claimInfo}>
          <View style={testimonialStyles.claimBadge}>
            <Ionicons name="checkmark-circle" size={14} color="#2E7D32" />
            <Text style={testimonialStyles.claimBadgeText}>
              Claim: {'\u20B9'}{testimonial.claimAmount}
            </Text>
          </View>
          <Text style={testimonialStyles.planName}>{testimonial.planName}</Text>
        </View>

        {/* Divider */}
        <View style={testimonialStyles.divider} />

        {/* User info */}
        <View style={testimonialStyles.userRow}>
          <View style={testimonialStyles.avatar}>
            <Ionicons
              name={testimonial.avatar}
              size={18}
              color={INSURANCE_COLORS.insuranceTeal}
            />
          </View>
          <View style={testimonialStyles.userInfo}>
            <Text style={testimonialStyles.userName}>{testimonial.name}</Text>
            <Text style={testimonialStyles.userLocation}>
              {testimonial.age} yrs, {testimonial.location}
            </Text>
          </View>
          <View style={testimonialStyles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={12} color={INSURANCE_COLORS.insuranceTeal} />
            <Text style={testimonialStyles.verifiedText}>Verified</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================
export const TestimonialsSection = React.memo(() => {
  const testimonials = useMemo(() => INSURANCE_DATA.testimonials, []);

  const renderTestimonial = useCallback(({ item, index }) => (
    <TestimonialCard testimonial={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <View style={testimonialStyles.section}>
      <View style={testimonialStyles.sectionHeader}>
        <Ionicons name="chatbubbles" size={18} color={INSURANCE_COLORS.insuranceTeal} />
        <View>
          <Text style={testimonialStyles.sectionTitle}>What Our Customers Say</Text>
          <Text style={testimonialStyles.sectionSubtitle}>Real stories from real families</Text>
        </View>
      </View>

      <FlatList
        data={testimonials}
        renderItem={renderTestimonial}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={testimonialStyles.scrollContent}
        snapToInterval={INSURANCE_LAYOUT.testimonialCardWidth + SPACING.md}
        decelerationRate="fast"
      />
    </View>
  );
});

// ============================================================================
// FAQ ITEM
// ============================================================================
const FaqItem = React.memo(({ faq, index }) => {
  const [expanded, setExpanded] = useState(false);
  const contentHeight = useSharedValue(0);
  const rotateIcon = useSharedValue(0);
  const itemOpacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 60;
    itemOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, [index]);

  const toggleExpand = useCallback(() => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    contentHeight.value = withTiming(newExpanded ? 1 : 0, { duration: 300, easing: Easing.inOut(Easing.ease) });
    rotateIcon.value = withTiming(newExpanded ? 180 : 0, { duration: 300 });
  }, [expanded]);

  const contentStyle = useAnimatedStyle(() => ({
    maxHeight: interpolate(contentHeight.value, [0, 1], [0, 200]),
    opacity: contentHeight.value,
    overflow: 'hidden',
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateIcon.value}deg` }],
  }));

  const itemStyle = useAnimatedStyle(() => ({
    opacity: itemOpacity.value,
  }));

  return (
    <Animated.View style={[faqStyles.item, itemStyle, expanded && faqStyles.itemExpanded]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleExpand}
        style={faqStyles.questionRow}
      >
        <View style={faqStyles.questionLeft}>
          <View style={faqStyles.questionDot}>
            <Text style={faqStyles.questionNumber}>{index + 1}</Text>
          </View>
          <Text style={faqStyles.questionText}>{faq.question}</Text>
        </View>
        <Animated.View style={iconStyle}>
          <Ionicons name="chevron-down" size={18} color={COLORS.textTertiary} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={contentStyle}>
        <View style={faqStyles.answerContainer}>
          <Text style={faqStyles.answerText}>{faq.answer}</Text>
        </View>
      </Animated.View>
    </Animated.View>
  );
});

// ============================================================================
// FAQ SECTION
// ============================================================================
export const FaqSection = React.memo(() => {
  const faqs = useMemo(() => INSURANCE_DATA.faqs, []);

  return (
    <View style={faqStyles.section}>
      <View style={faqStyles.sectionHeader}>
        <Ionicons name="help-circle" size={18} color={INSURANCE_COLORS.insuranceTeal} />
        <Text style={faqStyles.sectionTitle}>Frequently Asked Questions</Text>
      </View>

      <View style={faqStyles.faqList}>
        {faqs.map((faq, index) => (
          <FaqItem key={faq.id} faq={faq} index={index} />
        ))}
      </View>

      {/* Still have questions CTA */}
      <View style={faqStyles.helpBanner}>
        <LinearGradient
          colors={['#FFF3E0', '#FFF8E1']}
          style={faqStyles.helpGradient}
        >
          <View style={faqStyles.helpContent}>
            <Ionicons name="chatbubble-ellipses" size={24} color={INSURANCE_COLORS.ctaOrange} />
            <View style={faqStyles.helpText}>
              <Text style={faqStyles.helpTitle}>Still have questions?</Text>
              <Text style={faqStyles.helpSubtitle}>Chat with our insurance experts 24/7</Text>
            </View>
          </View>
          <TouchableOpacity style={faqStyles.chatButton} activeOpacity={0.7}>
            <Text style={faqStyles.chatButtonText}>Chat Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
});

// ============================================================================
// PREMIUM CALCULATOR
// ============================================================================
export const PremiumCalculatorSection = React.memo(() => {
  const [selectedAge, setSelectedAge] = useState(1);
  const ageGroups = useMemo(() => INSURANCE_DATA.ageGroups, []);
  const barAnimation = useSharedValue(0);

  useEffect(() => {
    barAnimation.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
  }, [selectedAge]);

  const handleAgeSelect = useCallback((index) => {
    barAnimation.value = 0;
    setSelectedAge(index);
    barAnimation.value = withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) });
  }, []);

  return (
    <View style={calcStyles.section}>
      <View style={calcStyles.sectionHeader}>
        <Ionicons name="calculator" size={18} color={INSURANCE_COLORS.insuranceTeal} />
        <View>
          <Text style={calcStyles.sectionTitle}>Quick Premium Estimate</Text>
          <Text style={calcStyles.sectionSubtitle}>See indicative premiums by age group</Text>
        </View>
      </View>

      {/* Age Group Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={calcStyles.ageGroupScroll}
      >
        {ageGroups.map((group, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.7}
            onPress={() => handleAgeSelect(index)}
            style={[
              calcStyles.ageChip,
              selectedAge === index && calcStyles.ageChipActive,
            ]}
          >
            <Text style={[
              calcStyles.ageText,
              selectedAge === index && calcStyles.ageTextActive,
            ]}>
              {group.label} yrs
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Selected Premium Display */}
      <View style={calcStyles.premiumDisplay}>
        <LinearGradient
          colors={['#F0FFF4', '#E8F5E9']}
          style={calcStyles.premiumGradient}
        >
          <View style={calcStyles.premiumContent}>
            <View style={calcStyles.premiumLeft}>
              <Text style={calcStyles.premiumLabel}>Estimated Monthly Premium</Text>
              <View style={calcStyles.premiumAmountRow}>
                <Text style={calcStyles.premiumRupee}>{'\u20B9'}</Text>
                <Text style={calcStyles.premiumAmount}>{ageGroups[selectedAge].premium}</Text>
                <Text style={calcStyles.premiumPeriod}>/month</Text>
              </View>
              <Text style={calcStyles.premiumCover}>
                For {'\u20B9'}{ageGroups[selectedAge].cover} health cover
              </Text>
            </View>
            <View style={calcStyles.premiumRight}>
              <View style={calcStyles.dailyCostCircle}>
                <Text style={calcStyles.dailyCostValue}>
                  {'\u20B9'}{Math.round(ageGroups[selectedAge].premium / 30)}
                </Text>
                <Text style={calcStyles.dailyCostLabel}>per day</Text>
              </View>
            </View>
          </View>

          {/* Premium comparison bars */}
          <View style={calcStyles.comparisonContainer}>
            <Text style={calcStyles.comparisonTitle}>Compare with daily expenses</Text>
            <View style={calcStyles.comparisonItems}>
              <ComparisonBar label="Coffee" amount={150} premium={ageGroups[selectedAge].premium / 30} />
              <ComparisonBar label="Insurance" amount={ageGroups[selectedAge].premium / 30} premium={ageGroups[selectedAge].premium / 30} isInsurance />
              <ComparisonBar label="Snacks" amount={100} premium={ageGroups[selectedAge].premium / 30} />
            </View>
          </View>

          {/* Get quote CTA */}
          <TouchableOpacity style={calcStyles.quoteButton} activeOpacity={0.7}>
            <Text style={calcStyles.quoteButtonText}>Get Exact Quote</Text>
            <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {/* Disclaimer */}
      <Text style={calcStyles.disclaimer}>
        * Premiums are indicative and may vary based on health conditions, city, and plan features.
      </Text>
    </View>
  );
});

// ============================================================================
// COMPARISON BAR
// ============================================================================
const ComparisonBar = React.memo(({ label, amount, premium, isInsurance }) => {
  const barWidth = useSharedValue(0);

  useEffect(() => {
    barWidth.value = withDelay(200, withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }));
  }, [amount]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value * Math.min((amount / 150) * 100, 100)}%`,
  }));

  return (
    <View style={calcStyles.comparisonItem}>
      <View style={calcStyles.comparisonLabelRow}>
        <Text style={[calcStyles.comparisonLabel, isInsurance && calcStyles.comparisonLabelHighlight]}>
          {label}
        </Text>
        <Text style={[calcStyles.comparisonAmount, isInsurance && calcStyles.comparisonAmountHighlight]}>
          {'\u20B9'}{Math.round(amount)}
        </Text>
      </View>
      <View style={calcStyles.comparisonBarBg}>
        <Animated.View style={[
          calcStyles.comparisonBar,
          barStyle,
          isInsurance && calcStyles.comparisonBarHighlight,
        ]} />
      </View>
    </View>
  );
});

// ============================================================================
// STYLES - PARTNERS
// ============================================================================
const partnerStyles = StyleSheet.create({
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.textPrimary,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 4,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },
  cardWrapper: {
    width: 100,
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.subtle,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  logoText: {
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  partnerName: {
    fontSize: 10,
    fontWeight: '600',
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginBottom: 2,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.textPrimary,
  },
  claimRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  claimLabel: {
    fontSize: 8,
    color: COLORS.textTertiary,
  },
  claimValue: {
    fontSize: 9,
    fontWeight: '800',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    marginTop: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  viewAllText: {
    ...TYPOGRAPHY.labelMedium,
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '700',
  },
});

// ============================================================================
// STYLES - TESTIMONIALS
// ============================================================================
const testimonialStyles = StyleSheet.create({
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  scrollContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },
  cardWrapper: {
    width: INSURANCE_LAYOUT.testimonialCardWidth,
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft,
  },
  quoteIcon: {
    position: 'absolute',
    top: 8,
    right: 16,
  },
  quoteText: {
    fontSize: 40,
    color: INSURANCE_COLORS.insuranceTealFaded,
    fontWeight: '900',
    lineHeight: 44,
  },
  ratingRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: SPACING.md,
  },
  testimonialText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  claimInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  claimBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  claimBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2E7D32',
  },
  planName: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.dividerLight,
    marginBottom: SPACING.md,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textPrimary,
  },
  userLocation: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  verifiedText: {
    fontSize: 8,
    fontWeight: '700',
    color: INSURANCE_COLORS.insuranceTeal,
  },
});

// ============================================================================
// STYLES - FAQ
// ============================================================================
const faqStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  faqList: {
    gap: SPACING.sm,
  },
  item: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  itemExpanded: {
    borderColor: INSURANCE_COLORS.insuranceTealSubtle,
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  questionLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    gap: SPACING.md,
  },
  questionDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  questionNumber: {
    fontSize: 10,
    fontWeight: '800',
    color: INSURANCE_COLORS.insuranceTeal,
  },
  questionText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  answerContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    paddingLeft: SPACING.lg + 36,
  },
  answerText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  helpBanner: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  helpGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  helpContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  helpText: {},
  helpTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: INSURANCE_COLORS.ctaOrange,
  },
  helpSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  chatButton: {
    backgroundColor: INSURANCE_COLORS.ctaOrange,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md,
  },
  chatButtonText: {
    ...TYPOGRAPHY.labelSmall,
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

// ============================================================================
// STYLES - PREMIUM CALCULATOR
// ============================================================================
const calcStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  ageGroupScroll: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  ageChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  ageChipActive: {
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    borderColor: INSURANCE_COLORS.insuranceTeal,
  },
  ageText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textTertiary,
    fontWeight: '600',
  },
  ageTextActive: {
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '800',
  },
  premiumDisplay: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  premiumGradient: {
    padding: SPACING.xl,
  },
  premiumContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  premiumLeft: {},
  premiumLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  premiumAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  premiumRupee: {
    fontSize: 18,
    fontWeight: '600',
    color: INSURANCE_COLORS.insuranceTeal,
  },
  premiumAmount: {
    fontSize: 32,
    fontWeight: '900',
    color: INSURANCE_COLORS.insuranceTeal,
    letterSpacing: -1,
  },
  premiumPeriod: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginLeft: 4,
  },
  premiumCover: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
  premiumRight: {},
  dailyCostCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: INSURANCE_COLORS.insuranceTealSubtle,
  },
  dailyCostValue: {
    fontSize: 14,
    fontWeight: '900',
    color: INSURANCE_COLORS.insuranceTeal,
  },
  dailyCostLabel: {
    fontSize: 8,
    fontWeight: '600',
    color: COLORS.textTertiary,
  },
  comparisonContainer: {
    marginBottom: SPACING.xl,
  },
  comparisonTitle: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.md,
  },
  comparisonItems: {
    gap: SPACING.md,
  },
  comparisonItem: {},
  comparisonLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  comparisonLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
  },
  comparisonLabelHighlight: {
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '700',
  },
  comparisonAmount: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontWeight: '600',
  },
  comparisonAmountHighlight: {
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '800',
  },
  comparisonBarBg: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  comparisonBar: {
    height: '100%',
    backgroundColor: '#BDBDBD',
    borderRadius: 3,
  },
  comparisonBarHighlight: {
    backgroundColor: INSURANCE_COLORS.insuranceTeal,
  },
  quoteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: INSURANCE_COLORS.insuranceTeal,
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  quoteButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: '#FFFFFF',
    fontWeight: '800',
  },
  disclaimer: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginTop: SPACING.md,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
