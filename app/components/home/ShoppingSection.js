/**
 * ============================================================================
 * SHOPPING SECTION - BUY AGAIN + MEDICINE CARDS + BANK OFFERS CAROUSEL
 * ============================================================================
 * 
 * Premium Royal Healthcare Home Screen - Shopping & Offers Sections
 * 
 * Contains:
 * 1. BuyAgainSection - Header with "Buy Again" / "View All" + tab switcher
 *    (All / Medicines) with animated underline indicator
 * 2. MedicineCarousel - Horizontal scroll of medicine cards with:
 *    - Add to cart button with quantity toggle (+ / 1 + -)
 *    - Price display with strikethrough old price
 *    - Discount badge with percentage
 *    - Delivery time estimate
 *    - Smooth press scale animations
 *    - Cart badge bounce on add
 * 3. BankOffersCarousel - Auto-scrolling infinite carousel with 12 bank
 *    offer cards, each branded with bank colors, featuring:
 *    - "Extra 10% OFF*" headline
 *    - Bank-specific payment details
 *    - T&C indicator
 *    - Smooth infinite auto-scroll at 3s interval
 *    - Manual swipe support
 * 
 * Animations:
 * - Tab switch: animated gold underline slide (300ms)
 * - Medicine card press: scale 0.96 + lift shadow
 * - Add button: bounce scale on tap
 * - Cart badge: bounce on update
 * - Bank carousel: smooth infinite auto-scroll
 * - Section entrance: fade + slide up
 * 
 * ============================================================================
 */

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
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
  runOnJS,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT, MIXINS, DATA } from './theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANK_CARD_WIDTH = LAYOUT.bankCardWidth;
const MEDICINE_CARD_W = LAYOUT.medicineCardWidth;
const MEDICINE_CARD_H = LAYOUT.medicineCardHeight;

// ============================================================================
// ANIMATED TAB INDICATOR
// ============================================================================
const AnimatedTabIndicator = React.memo(({ activeIndex, tabWidths }) => {
  const translateX = useSharedValue(0);
  const indicatorWidth = useSharedValue(40);

  useEffect(() => {
    let offset = 0;
    for (let i = 0; i < activeIndex; i++) {
      offset += (tabWidths[i] || 60) + SPACING.lg;
    }
    translateX.value = withSpring(offset, ANIMATION.spring.snappy);
    indicatorWidth.value = withSpring(tabWidths[activeIndex] || 40, ANIMATION.spring.snappy);
  }, [activeIndex, tabWidths]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    width: indicatorWidth.value,
  }));

  return (
    <Animated.View style={[styles.tabIndicator, indicatorStyle]} />
  );
});

// ============================================================================
// BUY AGAIN SECTION HEADER
// ============================================================================
export const BuyAgainHeader = React.memo(({ onViewAll, activeTab, onTabChange }) => {
  const headerOpacity = useSharedValue(0);
  const headerTranslateY = useSharedValue(20);
  const [tabWidths, setTabWidths] = useState([40, 80]);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });
    headerTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: headerOpacity.value,
    transform: [{ translateY: headerTranslateY.value }],
  }));

  const viewAllScale = useSharedValue(1);

  const handleViewAllPressIn = useCallback(() => {
    viewAllScale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);

  const handleViewAllPressOut = useCallback(() => {
    viewAllScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const viewAllAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: viewAllScale.value }],
  }));

  const tabs = useMemo(() => ['All', 'Medicines'], []);

  return (
    <Animated.View style={[styles.buyAgainContainer, headerAnimatedStyle]}>
      {/* Title Row */}
      <View style={styles.buyAgainTitleRow}>
        <View style={styles.buyAgainTitleContainer}>
          <Text style={styles.buyAgainTitle}>Buy Again</Text>
          <View style={styles.buyAgainTitleAccent} />
        </View>
        <Animated.View style={viewAllAnimatedStyle}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPressIn={handleViewAllPressIn}
            onPressOut={handleViewAllPressOut}
            onPress={onViewAll}
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View All</Text>
            <Ionicons name="chevron-forward" size={14} color={COLORS.apolloGreen} />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Tab Row */}
      <View style={styles.tabsContainer}>
        <View style={styles.tabsRow}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.7}
              onPress={() => onTabChange(index)}
              onLayout={(e) => {
                const w = e.nativeEvent.layout.width;
                setTabWidths(prev => {
                  const next = [...prev];
                  next[index] = w;
                  return next;
                });
              }}
              style={styles.tabButton}
            >
              <Text style={[
                styles.tabText,
                activeTab === index && styles.tabTextActive,
              ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <AnimatedTabIndicator activeIndex={activeTab} tabWidths={tabWidths} />
      </View>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED MEDICINE CARD
// ============================================================================
const AnimatedMedicineCard = React.memo(({ item, index, onAddToCart, quantities }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const addButtonScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateX = useSharedValue(30);
  const glowOpacity = useSharedValue(0);

  const qty = quantities[item.id] || 0;

  useEffect(() => {
    const delay = index * 80;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(ANIMATION.scale.pressed, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(ANIMATION.translate.cardLift, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    cardTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const handleAddPress = useCallback(() => {
    addButtonScale.value = withSequence(
      withSpring(1.3, { damping: 6, stiffness: 400 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
    onAddToCart(item.id, 1);
  }, [item.id, onAddToCart]);

  const handleIncrement = useCallback(() => {
    addButtonScale.value = withSequence(
      withSpring(1.15, { damping: 8, stiffness: 300 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
    onAddToCart(item.id, 1);
  }, [item.id, onAddToCart]);

  const handleDecrement = useCallback(() => {
    onAddToCart(item.id, -1);
  }, [item.id, onAddToCart]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateX: entranceTranslateX.value },
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const addButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: addButtonScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.medicineCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.medicineCard}
      >
        {/* Gold glow border on hover */}
        <Animated.View style={[styles.medicineCardGlow, glowStyle]} />

        {/* Add / Quantity Button */}
        <Animated.View style={[styles.medicineAddArea, addButtonAnimatedStyle]}>
          {qty === 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddPress}
              style={styles.medicineAddButton}
            >
              <Text style={styles.medicineAddText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.medicineQtyContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleDecrement}
                style={styles.medicineQtyButton}
              >
                <Text style={styles.medicineQtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.medicineQtyText}>{qty}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleIncrement}
                style={styles.medicineQtyButton}
              >
                <Text style={styles.medicineQtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>

        {/* Medicine Image Placeholder */}
        <View style={styles.medicineImageContainer}>
          <LinearGradient
            colors={[COLORS.backgroundMuted, COLORS.backgroundSoft]}
            style={styles.medicineImagePlaceholder}
          >
            <Ionicons name="medical" size={24} color={COLORS.textMuted} />
          </LinearGradient>
        </View>

        {/* Medicine Name */}
        <Text style={styles.medicineName} numberOfLines={2}>
          {item.name}
        </Text>

        {/* Price Section */}
        <View style={styles.medicinePriceRow}>
          <Text style={styles.medicineUnitPrice}>
            <Text style={styles.medicineCurrency}>&#8377;</Text>
            {item.price}/unit
          </Text>
        </View>

        <View style={styles.medicinePriceDetails}>
          <Text style={styles.medicineOldPrice}>&#8377;{item.oldPrice}</Text>
          <View style={styles.medicineDiscountBadge}>
            <Text style={styles.medicineDiscountText}>{item.discount}% OFF</Text>
          </View>
        </View>

        {/* Delivery Estimate */}
        <View style={styles.medicineDeliveryRow}>
          <Ionicons name="time-outline" size={10} color={COLORS.apolloGreen} />
          <Text style={styles.medicineDeliveryText}>By {item.delivery}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// MEDICINE CAROUSEL
// ============================================================================
export const MedicineCarousel = React.memo(({ onAddToCart, quantities }) => {
  const medicines = useMemo(() => DATA.medicines, []);

  const renderMedicine = useCallback(({ item, index }) => (
    <AnimatedMedicineCard
      item={item}
      index={index}
      onAddToCart={onAddToCart}
      quantities={quantities}
    />
  ), [onAddToCart, quantities]);

  const keyExtractor = useCallback((item) => `medicine-${item.id}`, []);

  return (
    <View style={styles.medicineCarouselContainer}>
      <FlatList
        data={medicines}
        renderItem={renderMedicine}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.medicineListContent}
        snapToInterval={MEDICINE_CARD_W + SPACING.md}
        decelerationRate="fast"
        bounces={true}
        overScrollMode="never"
      />
    </View>
  );
});

// ============================================================================
// ANIMATED BANK CARD
// ============================================================================
const AnimatedBankCard = React.memo(({ bank, index }) => {
  const cardScale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.97, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  return (
    <Animated.View style={cardAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.bankCardOuter}
      >
        <LinearGradient
          colors={[bank.color, bank.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.bankCard}
        >
          {/* Decorative circles */}
          <View style={styles.bankCardDecorCircle1} />
          <View style={styles.bankCardDecorCircle2} />

          {/* Bank Offer Content */}
          <View style={styles.bankCardContent}>
            <View style={styles.bankCardHeader}>
              <View style={styles.bankNameBadge}>
                <Text style={styles.bankNameText}>{bank.name}</Text>
              </View>
              <Ionicons name="card-outline" size={18} color="rgba(255,255,255,0.6)" />
            </View>

            <Text style={styles.bankOfferTitle}>Extra 10% OFF*</Text>
            <Text style={styles.bankOfferDetails}>
              (Avail on Payment Page via {bank.name} DC)
            </Text>

            <View style={styles.bankCardFooter}>
              <Text style={styles.bankTcText}>*T&C's</Text>
              <View style={styles.bankApplyButton}>
                <Text style={styles.bankApplyText}>Apply</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// BANK OFFERS CAROUSEL
// ============================================================================
export const BankOffersCarousel = React.memo(() => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(25);

  const banksData = useMemo(() => [...DATA.banks, ...DATA.banks, ...DATA.banks], []);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        currentIndex.current += 1;
        if (currentIndex.current >= DATA.banks.length * 2) {
          currentIndex.current = DATA.banks.length;
          flatListRef.current.scrollToIndex({
            index: currentIndex.current,
            animated: false,
          });
        }
        try {
          flatListRef.current.scrollToIndex({
            index: currentIndex.current,
            animated: true,
          });
        } catch (e) {
          // Scroll index out of range, reset
          currentIndex.current = 0;
        }
      }
    }, LAYOUT.carouselBankScrollInterval);

    return () => clearInterval(scrollInterval);
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const renderBankCard = useCallback(({ item, index }) => (
    <AnimatedBankCard bank={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item, index) => `bank-${index}`, []);

  const getItemLayout = useCallback((data, index) => ({
    length: BANK_CARD_WIDTH + SPACING.md,
    offset: (BANK_CARD_WIDTH + SPACING.md) * index,
    index,
  }), []);

  return (
    <Animated.View style={[styles.bankOffersContainer, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.bankOffersSectionHeader}>
        <View style={styles.bankOffersHeaderLeft}>
          <Ionicons name="pricetag" size={18} color={COLORS.premiumOrange} />
          <Text style={styles.bankOffersSectionTitle}>Bank Offers</Text>
        </View>
        <View style={styles.bankOffersCountBadge}>
          <Text style={styles.bankOffersCountText}>{DATA.banks.length} Banks</Text>
        </View>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={banksData}
        renderItem={renderBankCard}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bankListContent}
        snapToInterval={BANK_CARD_WIDTH + SPACING.md}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        initialScrollIndex={DATA.banks.length}
        bounces={false}
        overScrollMode="never"
      />

      {/* Scroll Indicator Dots */}
      <View style={styles.bankDotsContainer}>
        {DATA.banks.slice(0, 5).map((_, index) => (
          <View
            key={`dot-${index}`}
            style={[
              styles.bankDot,
              index === 0 && styles.bankDotActive,
            ]}
          />
        ))}
        <Text style={styles.bankDotsMore}>...</Text>
      </View>
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ========================================================================
  // BUY AGAIN HEADER STYLES
  // ========================================================================
  buyAgainContainer: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section + 4,
  },
  buyAgainTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  buyAgainTitleContainer: {
    position: 'relative',
  },
  buyAgainTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  buyAgainTitleAccent: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    width: 40,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.apolloGreen,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    backgroundColor: COLORS.apolloGreenFaded,
    borderRadius: RADIUS.pill,
    gap: 2,
  },
  viewAllText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.apolloGreen,
  },
  tabsContainer: {
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dividerLight,
    paddingBottom: 0,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: SPACING.lg,
  },
  tabButton: {
    paddingBottom: SPACING.md,
  },
  tabText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  tabTextActive: {
    color: COLORS.apolloGreen,
    fontWeight: '700',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 2.5,
    backgroundColor: COLORS.royalGold,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  // ========================================================================
  // MEDICINE CARD STYLES
  // ========================================================================
  medicineCarouselContainer: {
    marginTop: SPACING.lg,
  },
  medicineListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
    paddingRight: SPACING.screenPadding + SPACING.md,
  },
  medicineCardOuter: {
    width: MEDICINE_CARD_W,
  },
  medicineCard: {
    width: MEDICINE_CARD_W,
    minHeight: MEDICINE_CARD_H,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    ...SHADOWS.cardSoft,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  medicineCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    borderColor: COLORS.royalGold,
    backgroundColor: COLORS.royalGoldFaded,
  },
  medicineAddArea: {
    alignSelf: 'flex-end',
    marginBottom: SPACING.xs,
    zIndex: 10,
  },
  medicineAddButton: {
    backgroundColor: COLORS.apolloGreen,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    ...SHADOWS.button,
  },
  medicineAddText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textWhite,
    fontWeight: '800',
  },
  medicineQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.apolloGreen,
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
    ...SHADOWS.button,
  },
  medicineQtyButton: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },
  medicineQtyButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '800',
  },
  medicineQtyText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '800',
    paddingHorizontal: SPACING.xs,
    minWidth: 18,
    textAlign: 'center',
  },
  medicineImageContainer: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  medicineImagePlaceholder: {
    width: 64,
    height: 64,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    minHeight: 32,
    lineHeight: 16,
  },
  medicinePriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  medicineCurrency: {
    fontWeight: '800',
  },
  medicineUnitPrice: {
    ...TYPOGRAPHY.priceSmall,
    color: COLORS.textPrimary,
  },
  medicinePriceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  medicineOldPrice: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  medicineDiscountBadge: {
    backgroundColor: COLORS.premiumOrangeFaded,
    borderRadius: RADIUS.xs,
    paddingHorizontal: SPACING.xs,
    paddingVertical: 1,
  },
  medicineDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.premiumOrange,
  },
  medicineDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 2,
  },
  medicineDeliveryText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.apolloGreen,
    fontWeight: '500',
  },

  // ========================================================================
  // BANK OFFERS CAROUSEL STYLES
  // ========================================================================
  bankOffersContainer: {
    marginTop: SPACING.section + 4,
  },
  bankOffersSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  bankOffersHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  bankOffersSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  bankOffersCountBadge: {
    backgroundColor: COLORS.premiumOrangeFaded,
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  bankOffersCountText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.premiumOrange,
  },
  bankListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
    paddingRight: SPACING.screenPadding + SPACING.md,
  },
  bankCardOuter: {
    width: BANK_CARD_WIDTH,
  },
  bankCard: {
    width: BANK_CARD_WIDTH,
    height: LAYOUT.bankCardHeight,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  bankCardDecorCircle1: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  bankCardDecorCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  bankCardContent: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  bankCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankNameBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
  },
  bankNameText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textWhite,
    fontWeight: '800',
  },
  bankOfferTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textWhite,
    fontWeight: '800',
    marginTop: SPACING.sm,
  },
  bankOfferDetails: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 16,
  },
  bankCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  bankTcText: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255,255,255,0.6)',
    fontStyle: 'italic',
  },
  bankApplyButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  bankApplyText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  bankDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.md,
    gap: SPACING.xs,
  },
  bankDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.divider,
  },
  bankDotActive: {
    width: 18,
    backgroundColor: COLORS.apolloGreen,
    borderRadius: 3,
  },
  bankDotsMore: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginLeft: 2,
  },
});

// ============================================================================
// EXPORT
// ============================================================================
export default {
  BuyAgainHeader,
  MedicineCarousel,
  BankOffersCarousel,
};
