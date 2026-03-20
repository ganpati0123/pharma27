/**
 * ============================================================================
 * APOLLO 24/7 - SUMMER ESSENTIALS, BRANDS, DEAL OF DAY & HYDRATION
 * ============================================================================
 *
 * Premium Summer section components including essentials grid,
 * brands grid with discount offers, deal of the day countdown,
 * and summer hydration section.
 *
 * Features:
 * - 4x4 essentials grid with animated entrance
 * - Brand cards with discount badges and brand colors
 * - Deal of the day with animated countdown timer
 * - Summer hydration category grid
 * - Spring physics on all interactions
 * - Staggered entrance animations
 *
 * ============================================================================
 */

import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
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
import { SUMMER_COLORS, SUMMER_LAYOUT, SUMMER_DATA } from './SummerTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// ESSENTIAL ITEM CARD
// ============================================================================
const EssentialItem = React.memo(({ item, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(1);
  const iconBounce = useSharedValue(0);

  useEffect(() => {
    const delay = index * 40;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    iconBounce.value = withDelay(delay + 200, withSpring(1, { damping: 10, stiffness: 200 }));
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

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconBounce.value }],
  }));

  return (
    <Animated.View style={[essentialStyles.itemWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={essentialStyles.item}
      >
        <Animated.View style={[essentialStyles.iconContainer, iconStyle, { backgroundColor: item.color + '12' }]}>
          <Ionicons name={item.icon} size={20} color={item.color} />
        </Animated.View>
        <Text style={essentialStyles.itemName} numberOfLines={1}>{item.name}</Text>
        <Text style={essentialStyles.itemCount}>{item.count}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// COMPLETE SUMMER ESSENTIALS SECTION
// ============================================================================
export const SummerEssentialsSection = React.memo(() => {
  const essentials = useMemo(() => SUMMER_DATA.essentials, []);

  return (
    <View style={essentialStyles.section}>
      <View style={essentialStyles.sectionHeader}>
        <Text style={essentialStyles.sectionTitle}>Complete Summer Essentials</Text>
        <View style={essentialStyles.headerBadges}>
          <View style={essentialStyles.trendingBadge}>
            <Text style={essentialStyles.trendingText}>TRENDING</Text>
          </View>
          <View style={essentialStyles.topSaleBadge}>
            <Text style={essentialStyles.topSaleText}>TOP SALE</Text>
          </View>
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
        {/* Brand logo area */}
        <View style={brandStyles.logoContainer}>
          <View style={[brandStyles.logoBg, { backgroundColor: brand.color + '15' }]}>
            <Text style={[brandStyles.logoText, { color: brand.color }]}>{brand.name.substring(0, 2).toUpperCase()}</Text>
          </View>
        </View>

        {/* Brand Name */}
        <Text style={[brandStyles.brandName, { color: brand.color }]} numberOfLines={1}>
          {brand.name}
        </Text>

        {/* Discount */}
        <Text style={brandStyles.discount}>{brand.discount}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// SHOP BY BRAND SECTION
// ============================================================================
export const ShopByBrandSection = React.memo(() => {
  const brands = useMemo(() => SUMMER_DATA.brands, []);

  return (
    <View style={brandStyles.section}>
      <View style={brandStyles.sectionHeader}>
        <Text style={brandStyles.sectionTitle}>Shop By Brand</Text>
        <View style={brandStyles.dealBadge}>
          <Ionicons name="pricetag" size={12} color={SUMMER_COLORS.sunOrange} />
          <Text style={brandStyles.dealBadgeText}>Brand of the Day</Text>
        </View>
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
// DEAL OF THE DAY SECTION
// ============================================================================
export const DealOfDaySection = React.memo(() => {
  const deal = useMemo(() => SUMMER_DATA.dealOfDay, []);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });
  const timerRef = useRef(null);
  const cardScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0);
  const timerPulse = useSharedValue(1);

  useEffect(() => {
    // Countdown timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);

    // Pulse animation for urgency
    pulseOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1, false
    );

    // Timer pulse
    timerPulse.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1, false
    );

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.97, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulseOpacity.value,
  }));

  const timerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: timerPulse.value }],
  }));

  const formatTime = (num) => num.toString().padStart(2, '0');

  return (
    <View style={dealStyles.section}>
      <View style={dealStyles.sectionHeader}>
        <View style={dealStyles.headerLeft}>
          <Ionicons name="flash" size={18} color={SUMMER_COLORS.sunOrange} />
          <Text style={dealStyles.sectionTitle}>{deal.title}</Text>
        </View>

        {/* Timer */}
        <Animated.View style={[dealStyles.timerContainer, timerStyle]}>
          <View style={dealStyles.timerUnit}>
            <Text style={dealStyles.timerValue}>{formatTime(timeLeft.hours)}</Text>
            <Text style={dealStyles.timerLabel}>HRS</Text>
          </View>
          <Text style={dealStyles.timerSeparator}>:</Text>
          <View style={dealStyles.timerUnit}>
            <Text style={dealStyles.timerValue}>{formatTime(timeLeft.minutes)}</Text>
            <Text style={dealStyles.timerLabel}>MIN</Text>
          </View>
          <Text style={dealStyles.timerSeparator}>:</Text>
          <View style={dealStyles.timerUnit}>
            <Text style={dealStyles.timerValue}>{formatTime(timeLeft.seconds)}</Text>
            <Text style={dealStyles.timerLabel}>SEC</Text>
          </View>
        </Animated.View>
      </View>

      <Animated.View style={cardStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={dealStyles.card}
        >
          {/* Pulse background */}
          <Animated.View style={[dealStyles.pulseBg, pulseStyle]} />

          {/* Deal badge */}
          <View style={dealStyles.dealBadge}>
            <LinearGradient
              colors={SUMMER_COLORS.gradientDeal}
              style={dealStyles.dealBadgeGradient}
            >
              <Text style={dealStyles.dealBadgeText}>{deal.product.discount}% OFF</Text>
            </LinearGradient>
          </View>

          {/* Product Image */}
          <View style={dealStyles.imageContainer}>
            <LinearGradient
              colors={['#FFF8E1', '#FFF3E0']}
              style={dealStyles.imagePlaceholder}
            >
              <Ionicons name="gift" size={48} color={SUMMER_COLORS.sunYellowLight} />
            </LinearGradient>
          </View>

          {/* Product Info */}
          <View style={dealStyles.infoContainer}>
            <Text style={dealStyles.productName}>{deal.product.name}</Text>
            <Text style={dealStyles.productDescription}>{deal.product.description}</Text>

            {/* Rating */}
            <View style={dealStyles.ratingRow}>
              <View style={dealStyles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= 4 ? 'star' : 'star-half'}
                    size={12}
                    color={SUMMER_COLORS.sunYellow}
                  />
                ))}
              </View>
              <Text style={dealStyles.ratingText}>{deal.product.rating} | {deal.product.reviews} reviews</Text>
            </View>

            {/* Price */}
            <View style={dealStyles.priceRow}>
              <Text style={dealStyles.dealPrice}>{'\u20B9'}{deal.product.dealPrice}</Text>
              <Text style={dealStyles.originalPrice}>{'\u20B9'}{deal.product.originalPrice}</Text>
              <View style={dealStyles.saveBadge}>
                <Text style={dealStyles.saveText}>Save {'\u20B9'}{deal.product.originalPrice - deal.product.dealPrice}</Text>
              </View>
            </View>

            {/* Stock indicator */}
            <View style={dealStyles.stockRow}>
              <View style={dealStyles.stockBarBg}>
                <View style={dealStyles.stockBar} />
              </View>
              <Text style={dealStyles.stockText}>{deal.product.stock}</Text>
            </View>

            {/* CTA */}
            <TouchableOpacity style={dealStyles.grabButton} activeOpacity={0.7}>
              <Ionicons name="flash" size={16} color="#FFFFFF" />
              <Text style={dealStyles.grabButtonText}>Grab This Deal</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// HYDRATION ITEM
// ============================================================================
const HydrationItem = React.memo(({ item, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(20);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 60;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
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

  return (
    <Animated.View style={[hydrationStyles.itemWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={hydrationStyles.item}
      >
        <View style={[hydrationStyles.iconContainer, { backgroundColor: item.color + '12' }]}>
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>
        <Text style={hydrationStyles.itemName} numberOfLines={2}>{item.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// SUMMER HYDRATION SECTION
// ============================================================================
export const SummerHydrationSection = React.memo(() => {
  const items = useMemo(() => SUMMER_DATA.summerHydration, []);

  return (
    <View style={hydrationStyles.section}>
      <View style={hydrationStyles.sectionHeader}>
        <Ionicons name="water" size={18} color={SUMMER_COLORS.skyBlue} />
        <Text style={hydrationStyles.sectionTitle}>Summer Hydration</Text>
      </View>
      <Text style={hydrationStyles.sectionSubtitle}>Stay cool and refreshed this summer</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={hydrationStyles.scrollContent}
      >
        {items.map((item, index) => (
          <HydrationItem key={item.id} item={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// SUMMER TIPS SECTION
// ============================================================================
export const SummerTipsSection = React.memo(() => {
  const tips = useMemo(() => [
    { id: 1, title: 'Apply Sunscreen Every 2 Hours', description: 'Reapply sunscreen frequently, especially after swimming or sweating.', icon: 'sunny', color: '#FF6D00' },
    { id: 2, title: 'Drink 3-4 Litres Water Daily', description: 'Stay hydrated to prevent heat stroke and dehydration in summer.', icon: 'water', color: '#0288D1' },
    { id: 3, title: 'Wear Light Cotton Clothes', description: 'Cotton allows skin to breathe and helps regulate body temperature.', icon: 'shirt', color: '#7B1FA2' },
    { id: 4, title: 'Eat Seasonal Fruits', description: 'Watermelon, mango, and cucumber help keep you cool naturally.', icon: 'nutrition', color: '#2E7D32' },
    { id: 5, title: 'Avoid Peak Sun Hours', description: 'Stay indoors between 12-4 PM when UV rays are strongest.', icon: 'time', color: '#E65100' },
    { id: 6, title: 'Use Cooling Face Mists', description: 'A quick spritz of face mist can instantly refresh and hydrate skin.', icon: 'snow', color: '#00ACC1' },
  ], []);

  return (
    <View style={tipStyles.section}>
      <View style={tipStyles.sectionHeader}>
        <Ionicons name="bulb" size={18} color={SUMMER_COLORS.sunYellow} />
        <Text style={tipStyles.sectionTitle}>Summer Care Tips</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tipStyles.scrollContent}
      >
        {tips.map((tip, index) => (
          <SummerTipCard key={tip.id} tip={tip} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// SUMMER TIP CARD
// ============================================================================
const SummerTipCard = React.memo(({ tip, index }) => {
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
// STYLES - ESSENTIALS
// ============================================================================
const essentialStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  headerBadges: { flexDirection: 'row', gap: SPACING.xs },
  trendingBadge: {
    backgroundColor: '#FFEBEE',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  trendingText: { fontSize: 8, fontWeight: '900', color: '#E53935', letterSpacing: 0.5 },
  topSaleBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  topSaleText: { fontSize: 8, fontWeight: '900', color: '#2E7D32', letterSpacing: 0.5 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  itemWrapper: {
    width: (SCREEN_WIDTH - 56) / 4,
  },
  item: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 48, height: 48, borderRadius: 24,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  itemName: {
    fontSize: 10, fontWeight: '600', color: COLORS.textSecondary,
    textAlign: 'center', marginBottom: 2,
  },
  itemCount: {
    fontSize: 8, fontWeight: '500', color: COLORS.textMuted,
    textAlign: 'center',
  },
});

// ============================================================================
// STYLES - BRANDS
// ============================================================================
const brandStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  dealBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: SUMMER_COLORS.sunOrangeFaded,
    paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.pill,
  },
  dealBadgeText: { fontSize: 9, fontWeight: '700', color: SUMMER_COLORS.sunOrange },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  cardWrapper: {
    width: (SCREEN_WIDTH - 60) / 3,
  },
  card: {
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.subtle,
  },
  logoContainer: { marginBottom: SPACING.sm },
  logoBg: {
    width: 44, height: 44, borderRadius: 22,
    justifyContent: 'center', alignItems: 'center',
  },
  logoText: { fontSize: 14, fontWeight: '900' },
  brandName: {
    fontSize: 11, fontWeight: '700', textAlign: 'center',
    marginBottom: 4,
  },
  discount: {
    fontSize: 9, fontWeight: '600', color: COLORS.textTertiary,
    textAlign: 'center',
  },
});

// ============================================================================
// STYLES - DEAL OF DAY
// ============================================================================
const dealStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  timerContainer: {
    flexDirection: 'row', alignItems: 'center', gap: 2,
  },
  timerUnit: {
    backgroundColor: '#1A1A1A',
    paddingHorizontal: 6, paddingVertical: 3, borderRadius: 4,
    alignItems: 'center', minWidth: 32,
  },
  timerValue: { fontSize: 12, fontWeight: '900', color: '#FFFFFF' },
  timerLabel: { fontSize: 6, fontWeight: '600', color: '#BDBDBD' },
  timerSeparator: { fontSize: 14, fontWeight: '900', color: '#1A1A1A' },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardMedium,
    position: 'relative',
  },
  pulseBg: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: SUMMER_COLORS.sunYellowFaded,
  },
  dealBadge: {
    position: 'absolute', top: SPACING.md, left: SPACING.md, zIndex: 2,
  },
  dealBadgeGradient: {
    paddingHorizontal: SPACING.md, paddingVertical: 4, borderRadius: RADIUS.sm,
  },
  dealBadgeText: { fontSize: 12, fontWeight: '900', color: '#FFFFFF' },
  imageContainer: {
    width: '100%', height: 180,
  },
  imagePlaceholder: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  infoContainer: {
    padding: SPACING.lg,
  },
  productName: {
    ...TYPOGRAPHY.h4, color: COLORS.textPrimary, marginBottom: 4,
  },
  productDescription: {
    ...TYPOGRAPHY.bodySmall, color: COLORS.textSecondary,
    lineHeight: 18, marginBottom: SPACING.md,
  },
  ratingRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  starsRow: { flexDirection: 'row', gap: 1 },
  ratingText: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary },
  priceRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  dealPrice: { fontSize: 22, fontWeight: '900', color: COLORS.textPrimary },
  originalPrice: {
    fontSize: 14, color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  saveBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  saveText: { fontSize: 10, fontWeight: '700', color: '#2E7D32' },
  stockRow: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  stockBarBg: {
    flex: 1, height: 6, backgroundColor: '#FFEBEE',
    borderRadius: 3, overflow: 'hidden',
  },
  stockBar: {
    width: '35%', height: '100%',
    backgroundColor: '#E53935', borderRadius: 3,
  },
  stockText: { fontSize: 10, fontWeight: '700', color: '#E53935' },
  grabButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: SUMMER_COLORS.sunOrange,
    paddingVertical: SPACING.md + 2, borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  grabButtonText: { ...TYPOGRAPHY.labelLarge, color: '#FFFFFF', fontWeight: '800' },
});

// ============================================================================
// STYLES - HYDRATION
// ============================================================================
const hydrationStyles = StyleSheet.create({
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: 4,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: {
    ...TYPOGRAPHY.bodySmall, color: COLORS.textTertiary,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  itemWrapper: { width: 90 },
  item: { alignItems: 'center' },
  iconContainer: {
    width: 56, height: 56, borderRadius: 28,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  itemName: {
    fontSize: 10, fontWeight: '600', color: COLORS.textSecondary,
    textAlign: 'center',
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
    justifyContent: 'center', alignItems: 'center',
    marginBottom: SPACING.md,
  },
  tipTitle: { ...TYPOGRAPHY.labelLarge, color: COLORS.textPrimary, marginBottom: 4 },
  tipDescription: { fontSize: 11, color: COLORS.textTertiary, lineHeight: 16 },
});
