/**
 * ============================================================================
 * APOLLO 24/7 - WOMEN ESSENTIALS, BRANDS, TESTIMONIALS & TIPS
 * ============================================================================
 *
 * Premium Women section components including health essentials grid,
 * trusted brands, testimonials carousel, period tracker banner,
 * and wellness tips section.
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
// ESSENTIAL ITEM
// ============================================================================
const EssentialItem = React.memo(({ item, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 40;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.92, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[essentialStyles.itemWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={essentialStyles.item}
      >
        <View style={[essentialStyles.iconContainer, { backgroundColor: item.color + '12' }]}>
          <Ionicons name={item.icon} size={20} color={item.color} />
        </View>
        <Text style={essentialStyles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={essentialStyles.itemCount}>{item.count}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// HER HEALTH ESSENTIALS SECTION
// ============================================================================
export const HerHealthEssentialsSection = React.memo(() => {
  const essentials = useMemo(() => WOMEN_DATA.herHealthEssentials, []);

  return (
    <View style={essentialStyles.section}>
      <View style={essentialStyles.sectionHeader}>
        <Text style={essentialStyles.sectionTitle}>Her Health Essentials</Text>
        <View style={essentialStyles.badge}>
          <Ionicons name="sparkles" size={10} color={WOMEN_COLORS.womenPink} />
          <Text style={essentialStyles.badgeText}>CURATED</Text>
        </View>
      </View>

      <View style={essentialStyles.grid}>
        {essentials.map((item, index) => (
          <EssentialItem key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// BRAND CARD
// ============================================================================
const BrandCard = React.memo(({ brand, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 50;
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
    <Animated.View style={[brandStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[brandStyles.card, { backgroundColor: brand.bgColor }]}
      >
        <View style={[brandStyles.logoBg, { backgroundColor: brand.color + '15' }]}>
          <Text style={[brandStyles.logoText, { color: brand.color }]}>
            {brand.name.substring(0, 2).toUpperCase()}
          </Text>
        </View>
        <Text style={[brandStyles.brandName, { color: brand.color }]} numberOfLines={1}>
          {brand.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TRUSTED BRANDS SECTION
// ============================================================================
export const TrustedBrandsSection = React.memo(() => {
  const brands = useMemo(() => WOMEN_DATA.trustedBrands, []);

  return (
    <View style={brandStyles.section}>
      <View style={brandStyles.sectionHeader}>
        <Text style={brandStyles.sectionTitle}>Trusted Brands</Text>
        <TouchableOpacity style={brandStyles.viewAll} activeOpacity={0.7}>
          <Text style={brandStyles.viewAllText}>View All</Text>
          <Ionicons name="arrow-forward" size={14} color={WOMEN_COLORS.womenPink} />
        </TouchableOpacity>
      </View>

      <View style={brandStyles.grid}>
        {brands.map((brand, index) => (
          <BrandCard key={brand.id} brand={brand} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// TESTIMONIAL CARD
// ============================================================================
const TestimonialCard = React.memo(({ testimonial, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(40);
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
    <Animated.View style={[testimonialStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={testimonialStyles.card}
      >
        <View style={testimonialStyles.quoteIcon}>
          <Text style={testimonialStyles.quoteText}>{'\u201C'}</Text>
        </View>

        <View style={testimonialStyles.ratingRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Ionicons
              key={star}
              name={star <= testimonial.rating ? 'star' : 'star-outline'}
              size={12}
              color={WOMEN_COLORS.womenPink}
            />
          ))}
        </View>

        <Text style={testimonialStyles.testimonialText}>{testimonial.text}</Text>

        <View style={testimonialStyles.divider} />

        <View style={testimonialStyles.userRow}>
          <View style={testimonialStyles.avatar}>
            <Ionicons name={testimonial.avatar} size={18} color={WOMEN_COLORS.womenPink} />
          </View>
          <View>
            <Text style={testimonialStyles.userName}>{testimonial.name}</Text>
            <Text style={testimonialStyles.userAge}>{testimonial.age} yrs</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// TESTIMONIALS SECTION
// ============================================================================
export const WomenTestimonialsSection = React.memo(() => {
  const testimonials = useMemo(() => WOMEN_DATA.testimonials, []);

  return (
    <View style={testimonialStyles.section}>
      <View style={testimonialStyles.sectionHeader}>
        <Ionicons name="chatbubbles" size={18} color={WOMEN_COLORS.womenPink} />
        <Text style={testimonialStyles.sectionTitle}>What Women Say</Text>
      </View>

      <FlatList
        data={testimonials}
        renderItem={({ item, index }) => <TestimonialCard testimonial={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={testimonialStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// PERIOD TRACKER BANNER
// ============================================================================
export const PeriodTrackerBanner = React.memo(() => {
  const data = useMemo(() => WOMEN_DATA.periodTracker, []);
  const bannerScale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    bannerScale.value = withSpring(0.98, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    bannerScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const bannerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bannerScale.value }],
  }));

  return (
    <View style={trackerStyles.section}>
      <Animated.View style={bannerStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <LinearGradient
            colors={['#FCE4EC', '#F8BBD0']}
            style={trackerStyles.banner}
          >
            <View style={trackerStyles.content}>
              <View style={trackerStyles.textContent}>
                <View style={trackerStyles.titleRow}>
                  <Ionicons name="calendar" size={20} color={WOMEN_COLORS.womenPink} />
                  <Text style={trackerStyles.title}>{data.title}</Text>
                </View>
                <Text style={trackerStyles.subtitle}>{data.subtitle}</Text>

                {data.features.map((feature, idx) => (
                  <View key={idx} style={trackerStyles.featureRow}>
                    <Ionicons name="checkmark-circle" size={14} color={WOMEN_COLORS.womenPink} />
                    <Text style={trackerStyles.featureText}>{feature}</Text>
                  </View>
                ))}

                <TouchableOpacity style={trackerStyles.ctaButton} activeOpacity={0.7}>
                  <Text style={trackerStyles.ctaText}>Start Tracking</Text>
                  <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={trackerStyles.illustration}>
                <View style={trackerStyles.calendarIcon}>
                  <Ionicons name="calendar" size={36} color={WOMEN_COLORS.womenPinkLight} />
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// WELLNESS TIP CARD
// ============================================================================
const WellnessTipCard = React.memo(({ tip, index }) => {
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
    <Animated.View style={[tipStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={tipStyles.card}
      >
        <View style={[tipStyles.tipIcon, { backgroundColor: tip.color + '12' }]}>
          <Ionicons name={tip.icon} size={20} color={tip.color} />
        </View>
        <Text style={tipStyles.tipTitle}>{tip.title}</Text>
        <Text style={tipStyles.tipDescription}>{tip.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// WELLNESS TIPS SECTION
// ============================================================================
export const WomenWellnessTipsSection = React.memo(() => {
  const tips = useMemo(() => WOMEN_DATA.womenWellnessTips, []);

  return (
    <View style={tipStyles.section}>
      <View style={tipStyles.sectionHeader}>
        <Ionicons name="bulb" size={18} color={WOMEN_COLORS.womenPink} />
        <Text style={tipStyles.sectionTitle}>Wellness Tips for Women</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tipStyles.scrollContent}
      >
        {tips.map((tip, index) => (
          <WellnessTipCard key={tip.id} tip={tip} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// STYLES - ESSENTIALS
// ============================================================================
const essentialStyles = StyleSheet.create({
  section: { paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  badge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: WOMEN_COLORS.womenPinkFaded,
    paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.pill,
  },
  badgeText: { fontSize: 8, fontWeight: '800', color: WOMEN_COLORS.womenPink },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  itemWrapper: { width: (SCREEN_WIDTH - 56) / 4 },
  item: { alignItems: 'center' },
  iconContainer: {
    width: 48, height: 48, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs,
  },
  itemName: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary, textAlign: 'center', marginBottom: 2 },
  itemCount: { fontSize: 8, fontWeight: '500', color: COLORS.textMuted, textAlign: 'center' },
});

// ============================================================================
// STYLES - BRANDS
// ============================================================================
const brandStyles = StyleSheet.create({
  section: { paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  viewAll: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewAllText: { ...TYPOGRAPHY.labelSmall, color: WOMEN_COLORS.womenPink, fontWeight: '700' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md },
  cardWrapper: { width: WOMEN_LAYOUT.brandCardSize },
  card: {
    borderRadius: RADIUS.card, padding: SPACING.md, alignItems: 'center',
    borderWidth: 1, borderColor: COLORS.borderLight, ...SHADOWS.subtle,
  },
  logoBg: {
    width: 40, height: 40, borderRadius: 20,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.xs,
  },
  logoText: { fontSize: 13, fontWeight: '900' },
  brandName: { fontSize: 10, fontWeight: '700', textAlign: 'center' },
});

// ============================================================================
// STYLES - TESTIMONIALS
// ============================================================================
const testimonialStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: SCREEN_WIDTH * 0.7 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.xl,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, position: 'relative',
  },
  quoteIcon: { position: 'absolute', top: 8, right: 16 },
  quoteText: { fontSize: 36, color: WOMEN_COLORS.womenPinkFaded, fontWeight: '900', lineHeight: 40 },
  ratingRow: { flexDirection: 'row', gap: 2, marginBottom: SPACING.md },
  testimonialText: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, lineHeight: 20, marginBottom: SPACING.md },
  divider: { height: 1, backgroundColor: COLORS.dividerLight, marginBottom: SPACING.md },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  avatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: WOMEN_COLORS.womenPinkFaded,
    justifyContent: 'center', alignItems: 'center',
  },
  userName: { ...TYPOGRAPHY.labelMedium, color: COLORS.textPrimary },
  userAge: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary },
});

// ============================================================================
// STYLES - TRACKER
// ============================================================================
const trackerStyles = StyleSheet.create({
  section: { paddingHorizontal: SPACING.screenPadding, marginTop: SPACING.xl },
  banner: {
    borderRadius: RADIUS.xl, padding: SPACING.xl, ...SHADOWS.cardSoft,
  },
  content: { flexDirection: 'row', alignItems: 'flex-start' },
  textContent: { flex: 1, paddingRight: SPACING.md },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 4 },
  title: { fontSize: 16, fontWeight: '800', color: WOMEN_COLORS.womenPinkDark },
  subtitle: { ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary, marginBottom: SPACING.md },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm, marginBottom: 4 },
  featureText: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary, flex: 1 },
  ctaButton: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: WOMEN_COLORS.womenPink,
    paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.md, gap: SPACING.sm,
    alignSelf: 'flex-start', marginTop: SPACING.md,
  },
  ctaText: { ...TYPOGRAPHY.labelSmall, color: '#FFFFFF', fontWeight: '700' },
  illustration: { width: 80, height: 80, justifyContent: 'center', alignItems: 'center' },
  calendarIcon: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(194, 24, 91, 0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
});

// ============================================================================
// STYLES - TIPS
// ============================================================================
const tipStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: 160 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, minHeight: 150,
  },
  tipIcon: {
    width: 36, height: 36, borderRadius: 18,
    justifyContent: 'center', alignItems: 'center', marginBottom: SPACING.md,
  },
  tipTitle: { ...TYPOGRAPHY.labelLarge, color: COLORS.textPrimary, marginBottom: 4 },
  tipDescription: { fontSize: 11, color: COLORS.textTertiary, lineHeight: 16 },
});
