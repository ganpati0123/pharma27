/**
 * ============================================================================
 * DYNAMIC PRODUCTS + FRESH SKIN + 6-STEP ROUTINE + SKIN BANK CAROUSEL
 * ============================================================================
 *
 * Rose Gold Edition - Product Discovery, Daily Routine & Bank Offers
 *
 * Contains:
 * 1. DynamicProducts - 8 products per category with:
 *    - Category tab switcher (Sunscreen, Cleansers, Powders, Perfumes, Roll-ons, Wipes)
 *    - Product cards: image, name, rating, "29 min" delivery, MRP cut, final price
 *    - Add to cart with bounce animation
 *    - Horizontal scroll per category
 *    - Entrance stagger animations
 *
 * 2. FreshSkinSection - "Daily Steps For Perfect Skin" with:
 *    - Category pills (Sunscreen, Cleanser, Moisturizer, etc.)
 *    - Product cards with pricing and add-to-cart
 *    - Section entrance fade + slide
 *
 * 3. SixStepRoutine - 6 skincare step cards with:
 *    - Cleanse -> Exfoliate -> Toner -> Serum -> Moisturize -> Sunscreen
 *    - Horizontal scroll with step numbers
 *    - Press scale + glow animations
 *    - Icon + step name + description
 *
 * 4. SkinBankCarousel - 14 banks auto-scrolling with:
 *    - "Extra 50% OFF" headlines
 *    - Bank-branded gradient cards
 *    - Infinite auto-scroll at 3s intervals
 *    - Manual swipe support
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
import {
  SKIN_COLORS,
  SKIN_LAYOUT,
  SKIN_PRODUCTS,
  PRODUCT_CATEGORY_TABS,
  SKIN_BANKS,
  FRESH_SKIN_PILLS,
  FRESH_SKIN_PRODUCTS,
  SIX_STEP_ROUTINE,
} from './SkinTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// ANIMATED PRODUCT CARD
// ============================================================================
const AnimatedProductCard = React.memo(({ product, index, onAddToCart, quantities }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateX = useSharedValue(30);
  const addButtonScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const ratingPulse = useSharedValue(0);

  const qty = (quantities && quantities[product.id]) || 0;

  useEffect(() => {
    const delay = index * 60;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.95, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(-6, ANIMATION.spring.press);
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
    if (onAddToCart) onAddToCart(product.id, 1);
  }, [product.id, onAddToCart]);

  const handleIncrement = useCallback(() => {
    addButtonScale.value = withSequence(
      withSpring(1.15, { damping: 8, stiffness: 300 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
    if (onAddToCart) onAddToCart(product.id, 1);
  }, [product.id, onAddToCart]);

  const handleDecrement = useCallback(() => {
    if (onAddToCart) onAddToCart(product.id, -1);
  }, [product.id, onAddToCart]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateX: entranceTranslateX.value },
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const addButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: addButtonScale.value }],
  }));

  return (
    <Animated.View style={[styles.productCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.productCard}
      >
        {/* Gold glow overlay */}
        <Animated.View style={[styles.productCardGlow, glowStyle]} />

        {/* Discount Badge */}
        <View style={styles.productDiscountBadge}>
          <Text style={styles.productDiscountText}>{product.discount}% OFF</Text>
        </View>

        {/* Product Image Placeholder */}
        <View style={styles.productImageContainer}>
          <LinearGradient
            colors={[COLORS.backgroundMuted, COLORS.backgroundSoft]}
            style={styles.productImagePlaceholder}
          >
            <Ionicons name={product.icon || 'medical'} size={32} color={COLORS.textMuted} />
          </LinearGradient>
        </View>

        {/* Brand Name */}
        <Text style={styles.productBrand}>{product.brand}</Text>

        {/* Product Name */}
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>

        {/* Rating */}
        <View style={styles.productRatingRow}>
          <Ionicons name="star" size={11} color={COLORS.royalGold} />
          <Text style={styles.productRatingText}>{product.rating}</Text>
          <Text style={styles.productReviewsText}>({product.reviews})</Text>
        </View>

        {/* Delivery */}
        <View style={styles.productDeliveryRow}>
          <Ionicons name="time-outline" size={10} color={COLORS.apolloGreen} />
          <Text style={styles.productDeliveryText}>{product.delivery}</Text>
        </View>

        {/* Price Section */}
        <View style={styles.productPriceRow}>
          <Text style={styles.productMrp}>MRP <Text style={styles.productMrpCut}>&#8377;{product.mrp}</Text></Text>
          <Text style={styles.productPrice}>&#8377;{product.price}</Text>
        </View>

        {/* Add to Cart / Quantity */}
        <Animated.View style={[styles.productAddArea, addButtonAnimatedStyle]}>
          {qty === 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddPress}
              style={styles.productAddButton}
            >
              <Ionicons name="add" size={16} color={COLORS.textWhite} />
              <Text style={styles.productAddText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.productQtyContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleDecrement}
                style={styles.productQtyButton}
              >
                <Text style={styles.productQtyButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.productQtyText}>{qty}</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleIncrement}
                style={styles.productQtyButton}
              >
                <Text style={styles.productQtyButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED CATEGORY TAB
// ============================================================================
const AnimatedCategoryTab = React.memo(({ tab, isActive, onPress, index }) => {
  const tabScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateX = useSharedValue(20);

  useEffect(() => {
    const delay = index * 50;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.normal }));
    entranceTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    tabScale.value = withSpring(0.93, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    tabScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const tabAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateX: entranceTranslateX.value },
      { scale: tabScale.value },
    ],
  }));

  return (
    <Animated.View style={tabAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(tab.id)}
        style={[
          styles.categoryTab,
          isActive && styles.categoryTabActive,
        ]}
      >
        <Ionicons
          name={tab.icon}
          size={14}
          color={isActive ? SKIN_COLORS.roseGold : COLORS.textTertiary}
        />
        <Text style={[
          styles.categoryTabText,
          isActive && styles.categoryTabTextActive,
        ]}>
          {tab.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// DYNAMIC PRODUCTS SECTION
// ============================================================================
export const DynamicProductsSection = React.memo(({ onAddToCart, quantities }) => {
  const [activeCategory, setActiveCategory] = useState('sunscreen');
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(30);

  const products = useMemo(() => SKIN_PRODUCTS[activeCategory] || [], [activeCategory]);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const renderProduct = useCallback(({ item, index }) => (
    <AnimatedProductCard
      product={item}
      index={index}
      onAddToCart={onAddToCart}
      quantities={quantities}
    />
  ), [onAddToCart, quantities]);

  const keyExtractor = useCallback((item) => `product-${item.id}`, []);

  return (
    <Animated.View style={[styles.dynamicProductsSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.dynamicProductsHeader}>
        <View style={styles.dynamicProductsHeaderLeft}>
          <View style={styles.dynamicProductsIconContainer}>
            <Ionicons name="bag-handle" size={20} color={SKIN_COLORS.roseGold} />
          </View>
          <View>
            <Text style={styles.dynamicProductsTitle}>Shop by Category</Text>
            <Text style={styles.dynamicProductsSubtitle}>
              Premium skincare products for you
            </Text>
          </View>
        </View>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryTabsContent}
        bounces={true}
      >
        {PRODUCT_CATEGORY_TABS.map((tab, index) => (
          <AnimatedCategoryTab
            key={tab.id}
            tab={tab}
            isActive={activeCategory === tab.id}
            onPress={handleCategoryChange}
            index={index}
          />
        ))}
      </ScrollView>

      {/* Products Horizontal Scroll */}
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.productsListContent}
        snapToInterval={SKIN_LAYOUT.productCardWidth + SPACING.md}
        decelerationRate="fast"
        bounces={true}
      />
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED FRESH SKIN PILL
// ============================================================================
const AnimatedFreshPill = React.memo(({ pill, isActive, onPress, index }) => {
  const pillScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);

  useEffect(() => {
    entranceOpacity.value = withDelay(index * 40, withTiming(1, { duration: ANIMATION.duration.normal }));
  }, [index]);

  const handlePressIn = useCallback(() => {
    pillScale.value = withSpring(0.92, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    pillScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const pillAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [{ scale: pillScale.value }],
  }));

  return (
    <Animated.View style={pillAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(pill.id)}
        style={[
          styles.freshPill,
          isActive && styles.freshPillActive,
        ]}
      >
        <Text style={[
          styles.freshPillText,
          isActive && styles.freshPillTextActive,
        ]}>
          {pill.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED FRESH PRODUCT CARD
// ============================================================================
const AnimatedFreshProductCard = React.memo(({ product, index, onAddToCart, quantities }) => {
  const cardScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateX = useSharedValue(30);
  const addButtonScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const qty = (quantities && quantities[product.id]) || 0;

  useEffect(() => {
    const delay = index * 70;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.95, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const handleAddPress = useCallback(() => {
    addButtonScale.value = withSequence(
      withSpring(1.3, { damping: 6, stiffness: 400 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
    if (onAddToCart) onAddToCart(product.id, 1);
  }, [product.id, onAddToCart]);

  const handleIncrement = useCallback(() => {
    addButtonScale.value = withSequence(
      withSpring(1.15, { damping: 8, stiffness: 300 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
    if (onAddToCart) onAddToCart(product.id, 1);
  }, [product.id, onAddToCart]);

  const handleDecrement = useCallback(() => {
    if (onAddToCart) onAddToCart(product.id, -1);
  }, [product.id, onAddToCart]);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateX: entranceTranslateX.value },
      { scale: cardScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const addButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: addButtonScale.value }],
  }));

  return (
    <Animated.View style={[styles.freshProductCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.freshProductCard}
      >
        <Animated.View style={[styles.freshProductGlow, glowStyle]} />

        {/* Discount badge */}
        <View style={styles.freshDiscountBadge}>
          <Text style={styles.freshDiscountText}>{product.discount}% OFF</Text>
        </View>

        {/* Image placeholder */}
        <View style={styles.freshProductImageContainer}>
          <LinearGradient
            colors={[COLORS.backgroundMuted, COLORS.backgroundSoft]}
            style={styles.freshProductImage}
          >
            <Ionicons name="sunny" size={28} color={COLORS.textMuted} />
          </LinearGradient>
        </View>

        {/* Brand */}
        <Text style={styles.freshProductBrand}>{product.brand}</Text>

        {/* Name */}
        <Text style={styles.freshProductName} numberOfLines={2}>{product.name}</Text>

        {/* Rating */}
        <View style={styles.freshRatingRow}>
          <Ionicons name="star" size={10} color={COLORS.royalGold} />
          <Text style={styles.freshRatingText}>{product.rating}</Text>
        </View>

        {/* Delivery */}
        <View style={styles.freshDeliveryRow}>
          <Ionicons name="time-outline" size={9} color={COLORS.apolloGreen} />
          <Text style={styles.freshDeliveryText}>{product.delivery}</Text>
        </View>

        {/* Price */}
        <View style={styles.freshPriceRow}>
          <Text style={styles.freshMrp}>&#8377;{product.mrp}</Text>
          <Text style={styles.freshPrice}>&#8377;{product.price}</Text>
        </View>

        {/* Add button */}
        <Animated.View style={[styles.freshAddArea, addButtonAnimatedStyle]}>
          {qty === 0 ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleAddPress}
              style={styles.freshAddButton}
            >
              <Ionicons name="add" size={14} color={COLORS.textWhite} />
              <Text style={styles.freshAddText}>Add</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.freshQtyContainer}>
              <TouchableOpacity onPress={handleDecrement} style={styles.freshQtyBtn}>
                <Text style={styles.freshQtyBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.freshQtyText}>{qty}</Text>
              <TouchableOpacity onPress={handleIncrement} style={styles.freshQtyBtn}>
                <Text style={styles.freshQtyBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// FRESH SKIN SECTION
// ============================================================================
export const FreshSkinSection = React.memo(({ onAddToCart, quantities }) => {
  const [activePill, setActivePill] = useState('sunscreen');
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

  const renderProduct = useCallback(({ item, index }) => (
    <AnimatedFreshProductCard
      product={item}
      index={index}
      onAddToCart={onAddToCart}
      quantities={quantities}
    />
  ), [onAddToCart, quantities]);

  const keyExtractor = useCallback((item) => `fresh-${item.id}`, []);

  return (
    <Animated.View style={[styles.freshSkinSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.freshSkinHeader}>
        <View style={styles.freshSkinHeaderContent}>
          <LinearGradient
            colors={SKIN_COLORS.gradientFreshSkin}
            style={styles.freshSkinHeaderBg}
          >
            <View style={styles.freshSkinHeaderIconContainer}>
              <Ionicons name="leaf" size={22} color={COLORS.apolloGreen} />
            </View>
            <View>
              <Text style={styles.freshSkinTitle}>Fresh Skin Care</Text>
              <Text style={styles.freshSkinSubtitle}>For Sunny Days</Text>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.freshPillsContent}
        bounces={true}
      >
        {FRESH_SKIN_PILLS.map((pill, index) => (
          <AnimatedFreshPill
            key={pill.id}
            pill={pill}
            isActive={activePill === pill.id}
            onPress={setActivePill}
            index={index}
          />
        ))}
      </ScrollView>

      {/* Products */}
      <FlatList
        data={FRESH_SKIN_PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.freshProductsListContent}
        snapToInterval={SKIN_LAYOUT.productCardWidth + SPACING.md}
        decelerationRate="fast"
        bounces={true}
      />
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED ROUTINE STEP CARD
// ============================================================================
const AnimatedRoutineStep = React.memo(({ step, index, totalSteps }) => {
  const cardScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateY = useSharedValue(30);
  const glowOpacity = useSharedValue(0);
  const iconBounce = useSharedValue(0);
  const stepPulse = useSharedValue(0);
  const connectorWidth = useSharedValue(0);

  useEffect(() => {
    const delay = 100 + index * 120;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.entrance }));
    entranceTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.bouncy));
    connectorWidth.value = withDelay(delay + 200, withTiming(1, { duration: 400, easing: Easing.out(Easing.cubic) }));

    // Step number pulse
    stepPulse.value = withDelay(
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
    cardScale.value = withSpring(0.9, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
    iconBounce.value = withSequence(
      withSpring(-6, { damping: 4, stiffness: 400 }),
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
      { scale: cardScale.value },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: iconBounce.value }],
  }));

  const stepNumberStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(stepPulse.value, [0, 1], [1, 1.1]) }],
    opacity: interpolate(stepPulse.value, [0, 1], [0.8, 1]),
  }));

  const connectorStyle = useAnimatedStyle(() => ({
    transform: [{ scaleX: connectorWidth.value }],
    opacity: connectorWidth.value,
  }));

  return (
    <View style={styles.routineStepWrapper}>
      <Animated.View style={[styles.routineStepOuter, cardAnimatedStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <View style={[styles.routineStepCard, { borderColor: step.color + '30' }]}>
            <Animated.View style={[styles.routineStepGlow, { backgroundColor: step.color + '10' }, glowStyle]} />

            {/* Step Number */}
            <Animated.View style={[styles.routineStepNumber, { backgroundColor: step.color }, stepNumberStyle]}>
              <Text style={styles.routineStepNumberText}>{index + 1}</Text>
            </Animated.View>

            {/* Icon */}
            <Animated.View style={[styles.routineStepIconContainer, { backgroundColor: step.bgColor }, iconStyle]}>
              <Ionicons name={step.icon} size={28} color={step.color} />
            </Animated.View>

            {/* Step Name */}
            <Text style={[styles.routineStepName, { color: step.color }]}>{step.step}</Text>

            {/* Description */}
            <Text style={styles.routineStepDescription}>{step.description}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* Connector Arrow */}
      {index < totalSteps - 1 && (
        <Animated.View style={[styles.routineConnector, connectorStyle]}>
          <Ionicons name="chevron-forward" size={14} color={COLORS.textLight} />
        </Animated.View>
      )}
    </View>
  );
});

// ============================================================================
// SIX STEP ROUTINE SECTION
// ============================================================================
export const SixStepRoutineSection = React.memo(() => {
  const steps = useMemo(() => SIX_STEP_ROUTINE, []);
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
    <Animated.View style={[styles.routineSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.routineSectionHeader}>
        <View style={styles.routineHeaderLeft}>
          <View style={styles.routineHeaderIconContainer}>
            <Ionicons name="sparkles" size={20} color={COLORS.royalGold} />
          </View>
          <View>
            <Text style={styles.routineSectionTitle}>6-Step Skincare Routine</Text>
            <Text style={styles.routineSectionSubtitle}>
              Daily steps for glowing, healthy skin
            </Text>
          </View>
        </View>
      </View>

      {/* Steps Horizontal Scroll */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.routineStepsContent}
        bounces={true}
      >
        {steps.map((step, index) => (
          <AnimatedRoutineStep
            key={step.id}
            step={step}
            index={index}
            totalSteps={steps.length}
          />
        ))}
      </ScrollView>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED SKIN BANK CARD
// ============================================================================
const AnimatedSkinBankCard = React.memo(({ bank, index }) => {
  const cardScale = useSharedValue(1);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    glowPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0, 1], [0.3, 0.6]),
  }));

  return (
    <Animated.View style={cardAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.skinBankCardOuter}
      >
        <LinearGradient
          colors={[bank.color, bank.gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.skinBankCard}
        >
          {/* Decorative circles */}
          <View style={styles.skinBankDecorCircle1} />
          <View style={styles.skinBankDecorCircle2} />

          {/* Glow overlay */}
          <Animated.View style={[styles.skinBankGlow, glowStyle]} />

          {/* Content */}
          <View style={styles.skinBankContent}>
            <View style={styles.skinBankHeader}>
              <View style={styles.skinBankNameBadge}>
                <Text style={styles.skinBankNameText}>{bank.name}</Text>
              </View>
              <Ionicons name="card-outline" size={18} color="rgba(255,255,255,0.6)" />
            </View>

            <Text style={styles.skinBankOfferTitle}>{bank.offer}*</Text>
            <Text style={styles.skinBankOfferDetails}>
              (Avail on Payment Page via {bank.name} DC)
            </Text>

            <View style={styles.skinBankFooter}>
              <Text style={styles.skinBankTcText}>*T&C's</Text>
              <View style={styles.skinBankApplyButton}>
                <Text style={styles.skinBankApplyText}>Apply</Text>
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// SKIN BANK CAROUSEL SECTION
// ============================================================================
export const SkinBankCarouselSection = React.memo(() => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(25);

  const banksData = useMemo(() => [...SKIN_BANKS, ...SKIN_BANKS, ...SKIN_BANKS], []);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        currentIndex.current += 1;
        if (currentIndex.current >= SKIN_BANKS.length * 2) {
          currentIndex.current = SKIN_BANKS.length;
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
          currentIndex.current = 0;
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const renderBankCard = useCallback(({ item, index }) => (
    <AnimatedSkinBankCard bank={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item, index) => `skin-bank-${index}`, []);

  const getItemLayout = useCallback((data, index) => ({
    length: SKIN_LAYOUT.bankCardWidth + SPACING.md,
    offset: (SKIN_LAYOUT.bankCardWidth + SPACING.md) * index,
    index,
  }), []);

  return (
    <Animated.View style={[styles.skinBankSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.skinBankSectionHeader}>
        <View style={styles.skinBankHeaderLeft}>
          <Ionicons name="pricetag" size={18} color={COLORS.premiumOrange} />
          <Text style={styles.skinBankSectionTitle}>Extra Offers on Skincare</Text>
        </View>
        <View style={styles.skinBankCountBadge}>
          <Text style={styles.skinBankCountText}>{SKIN_BANKS.length} Banks</Text>
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
        contentContainerStyle={styles.skinBankListContent}
        snapToInterval={SKIN_LAYOUT.bankCardWidth + SPACING.md}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        initialScrollIndex={SKIN_BANKS.length}
        bounces={false}
        overScrollMode="never"
      />

      {/* Scroll Indicator Dots */}
      <View style={styles.skinBankDotsContainer}>
        {SKIN_BANKS.slice(0, 6).map((_, index) => (
          <View
            key={`skin-dot-${index}`}
            style={[
              styles.skinBankDot,
              index === 0 && styles.skinBankDotActive,
            ]}
          />
        ))}
        <Text style={styles.skinBankDotsMore}>...</Text>
      </View>
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ========================================================================
  // DYNAMIC PRODUCTS SECTION STYLES
  // ========================================================================
  dynamicProductsSection: {
    paddingTop: SPACING.section,
  },
  dynamicProductsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  dynamicProductsHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  dynamicProductsIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SKIN_COLORS.roseGoldFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SKIN_COLORS.roseGoldSubtle,
  },
  dynamicProductsTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  dynamicProductsSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  categoryTabsContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    gap: SPACING.xs,
  },
  categoryTabActive: {
    backgroundColor: SKIN_COLORS.roseGoldFaded,
    borderColor: SKIN_COLORS.roseGold,
    borderBottomWidth: 2.5,
    borderBottomColor: SKIN_COLORS.roseGold,
  },
  categoryTabText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textTertiary,
  },
  categoryTabTextActive: {
    color: SKIN_COLORS.roseGold,
    fontWeight: '700',
  },
  productsListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // ========================================================================
  // PRODUCT CARD STYLES
  // ========================================================================
  productCardOuter: {
    width: SKIN_LAYOUT.productCardWidth,
  },
  productCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    minHeight: SKIN_LAYOUT.productCardHeight,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  productCardGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(255, 215, 0, 0.06)',
  },
  productDiscountBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.apolloGreen,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    zIndex: 1,
  },
  productDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontWeight: '900',
    fontSize: 8,
  },
  productImageContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  productImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productBrand: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  productName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
    minHeight: 32,
  },
  productRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 4,
  },
  productRatingText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textPrimary,
  },
  productReviewsText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    fontSize: 9,
  },
  productDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: SPACING.sm,
  },
  productDeliveryText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.apolloGreen,
    fontWeight: '600',
    fontSize: 9,
  },
  productPriceRow: {
    marginBottom: SPACING.sm,
  },
  productMrp: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    fontSize: 9,
  },
  productMrpCut: {
    textDecorationLine: 'line-through',
  },
  productPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  productAddArea: {
    marginTop: 'auto',
  },
  productAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.apolloGreen,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm,
    gap: 4,
    ...SHADOWS.button,
  },
  productAddText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  productQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.apolloGreenFaded,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.apolloGreen,
  },
  productQtyButton: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  productQtyButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.apolloGreen,
    fontWeight: '800',
  },
  productQtyText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.apolloGreen,
    fontWeight: '800',
    paddingHorizontal: SPACING.sm,
  },

  // ========================================================================
  // FRESH SKIN SECTION STYLES
  // ========================================================================
  freshSkinSection: {
    paddingTop: SPACING.section,
  },
  freshSkinHeader: {
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  freshSkinHeaderContent: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  freshSkinHeaderBg: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.lg,
    gap: SPACING.md,
    borderRadius: RADIUS.xl,
  },
  freshSkinHeaderIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.cardWhite,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  freshSkinTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  freshSkinSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  freshPillsContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  freshPill: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  freshPillActive: {
    backgroundColor: COLORS.apolloGreenFaded,
    borderColor: COLORS.apolloGreen,
  },
  freshPillText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textTertiary,
  },
  freshPillTextActive: {
    color: COLORS.apolloGreen,
    fontWeight: '700',
  },
  freshProductsListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // ========================================================================
  // FRESH PRODUCT CARD STYLES
  // ========================================================================
  freshProductCardOuter: {
    width: SKIN_LAYOUT.productCardWidth,
  },
  freshProductCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    minHeight: 240,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  freshProductGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.xl,
    backgroundColor: 'rgba(0, 166, 81, 0.04)',
  },
  freshDiscountBadge: {
    position: 'absolute',
    top: SPACING.sm,
    left: SPACING.sm,
    backgroundColor: COLORS.apolloGreen,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
    zIndex: 1,
  },
  freshDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontWeight: '900',
    fontSize: 8,
  },
  freshProductImageContainer: {
    alignItems: 'center',
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },
  freshProductImage: {
    width: 70,
    height: 70,
    borderRadius: RADIUS.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  freshProductBrand: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  freshProductName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: 4,
    minHeight: 30,
  },
  freshRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: 3,
  },
  freshRatingText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textPrimary,
    fontSize: 10,
  },
  freshDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: SPACING.xs,
  },
  freshDeliveryText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.apolloGreen,
    fontWeight: '600',
    fontSize: 9,
  },
  freshPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  freshMrp: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    textDecorationLine: 'line-through',
    fontSize: 10,
  },
  freshPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
    fontWeight: '800',
    fontSize: 14,
  },
  freshAddArea: {
    marginTop: 'auto',
  },
  freshAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.apolloGreen,
    borderRadius: RADIUS.md,
    paddingVertical: SPACING.sm - 2,
    gap: 3,
    ...SHADOWS.button,
  },
  freshAddText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
    fontSize: 11,
  },
  freshQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.apolloGreenFaded,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    borderColor: COLORS.apolloGreen,
  },
  freshQtyBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm - 2,
  },
  freshQtyBtnText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.apolloGreen,
    fontWeight: '800',
    fontSize: 13,
  },
  freshQtyText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.apolloGreen,
    fontWeight: '800',
    paddingHorizontal: SPACING.xs,
    fontSize: 13,
  },

  // ========================================================================
  // SIX STEP ROUTINE SECTION STYLES
  // ========================================================================
  routineSection: {
    paddingTop: SPACING.section,
  },
  routineSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  routineHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  routineHeaderIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.royalGoldFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.royalGoldSubtle,
  },
  routineSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  routineSectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  routineStepsContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: 0,
  },
  routineStepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routineStepOuter: {
    width: SKIN_LAYOUT.routineCardWidth,
  },
  routineStepCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    alignItems: 'center',
    minHeight: 150,
    borderWidth: 1.5,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  routineStepGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.xl,
  },
  routineStepNumber: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  routineStepNumberText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontWeight: '900',
    fontSize: 10,
  },
  routineStepIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  routineStepName: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '700',
    marginBottom: 3,
  },
  routineStepDescription: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    textAlign: 'center',
    fontSize: 9,
  },
  routineConnector: {
    marginHorizontal: 2,
  },

  // ========================================================================
  // SKIN BANK CAROUSEL SECTION STYLES
  // ========================================================================
  skinBankSection: {
    paddingTop: SPACING.section,
  },
  skinBankSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  skinBankHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  skinBankSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  skinBankCountBadge: {
    backgroundColor: COLORS.premiumOrangeFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
  },
  skinBankCountText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.premiumOrange,
  },
  skinBankListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // ========================================================================
  // SKIN BANK CARD STYLES
  // ========================================================================
  skinBankCardOuter: {
    width: SKIN_LAYOUT.bankCardWidth,
  },
  skinBankCard: {
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    minHeight: 130,
    overflow: 'hidden',
    position: 'relative',
  },
  skinBankDecorCircle1: {
    position: 'absolute',
    top: -15,
    right: -15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  skinBankDecorCircle2: {
    position: 'absolute',
    bottom: -10,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  skinBankGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  skinBankContent: {
    zIndex: 1,
  },
  skinBankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  skinBankNameBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
  },
  skinBankNameText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  skinBankOfferTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textWhite,
    fontWeight: '900',
    marginBottom: 4,
  },
  skinBankOfferDetails: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: SPACING.md,
    fontSize: 10,
  },
  skinBankFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skinBankTcText: {
    ...TYPOGRAPHY.caption,
    color: 'rgba(255,255,255,0.5)',
    textDecorationLine: 'underline',
    fontSize: 9,
  },
  skinBankApplyButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  skinBankApplyText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
    fontSize: 11,
  },
  skinBankDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SPACING.lg,
    gap: SPACING.xs,
  },
  skinBankDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.textLight,
  },
  skinBankDotActive: {
    backgroundColor: SKIN_COLORS.roseGold,
    width: 18,
    borderRadius: 3,
  },
  skinBankDotsMore: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textLight,
    marginLeft: 2,
    fontSize: 10,
  },
});
