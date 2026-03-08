/**
 * ============================================================================
 * APOLLO 24/7 - SUMMER HERO, CONCERNS & SUNSCREEN SECTIONS
 * ============================================================================
 *
 * Premium Summer section with animated hero, concern pills,
 * expert-recommended sunscreen carousel, and stay summer ready section.
 *
 * Features:
 * - Animated sun rays and heat wave effects
 * - Horizontal scrolling concern pills with active state
 * - Premium sunscreen product carousel with discount badges
 * - Stay Summer Ready category with product cards
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
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION } from '../home/theme';
import { SUMMER_COLORS, SUMMER_LAYOUT, SUMMER_DATA } from './SummerTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// SUN RAYS ANIMATION
// ============================================================================
const SunRays = React.memo(() => {
  const rotation = useSharedValue(0);
  const opacity = useSharedValue(0.3);
  const scale = useSharedValue(0.9);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 30000, easing: Easing.linear }),
      -1, false
    );
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 4000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: 4000, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
  }, []);

  const rayStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[sunStyles.raysContainer, rayStyle]}>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <View
          key={angle}
          style={[sunStyles.ray, { transform: [{ rotate: `${angle}deg` }] }]}
        />
      ))}
    </Animated.View>
  );
});

// ============================================================================
// SUMMER SCREEN HERO
// ============================================================================
export const SummerScreenHero = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const badgeScale = useSharedValue(0.8);
  const sunScale = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    badgeScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 120 }));
    sunScale.value = withDelay(500, withSpring(1, { damping: 10, stiffness: 100 }));
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  const sunStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sunScale.value }],
  }));

  return (
    <Animated.View style={[heroStyles.container, heroStyle]}>
      <LinearGradient
        colors={['rgba(255, 179, 0, 0.08)', 'rgba(255, 109, 0, 0.04)', COLORS.backgroundPure]}
        style={heroStyles.gradient}
      >
        {/* Sun animation */}
        <Animated.View style={[heroStyles.sunContainer, sunStyle]}>
          <SunRays />
          <View style={heroStyles.sunCore}>
            <Ionicons name="sunny" size={28} color={SUMMER_COLORS.sunYellow} />
          </View>
        </Animated.View>

        <View style={heroStyles.content}>
          <View style={heroStyles.iconRow}>
            <View style={heroStyles.badge}>
              <Ionicons name="sunny" size={16} color={SUMMER_COLORS.sunOrange} />
            </View>
            <Animated.View style={[heroStyles.editionTag, badgeStyle]}>
              <Text style={heroStyles.editionTagText}>SUMMER SPECIAL</Text>
            </Animated.View>
            <View style={heroStyles.newTag}>
              <Text style={heroStyles.newTagText}>NEW</Text>
            </View>
          </View>
          <Text style={heroStyles.title}>Summer</Text>
          <Text style={heroStyles.subtitle}>Beat the heat with expert picks</Text>
          <Text style={heroStyles.description}>Sunscreens, hydration & summer skincare essentials</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// CONCERN PILL
// ============================================================================
const ConcernPill = React.memo(({ concern, index, isActive, onPress }) => {
  const pillScale = useSharedValue(1);
  const pillOpacity = useSharedValue(0);
  const pillTranslateX = useSharedValue(20);

  useEffect(() => {
    const delay = index * 60;
    pillOpacity.value = withDelay(delay, withTiming(1, { duration: 300 }));
    pillTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    pillScale.value = withSpring(0.93, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    pillScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const pillStyle = useAnimatedStyle(() => ({
    opacity: pillOpacity.value,
    transform: [{ translateX: pillTranslateX.value }, { scale: pillScale.value }],
  }));

  return (
    <Animated.View style={pillStyle}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(concern.id)}
        style={[
          concernStyles.pill,
          isActive && { backgroundColor: concern.color + '15', borderColor: concern.color },
        ]}
      >
        <Ionicons
          name={concern.icon}
          size={16}
          color={isActive ? concern.color : COLORS.textTertiary}
        />
        <Text style={[
          concernStyles.pillText,
          isActive && { color: concern.color, fontWeight: '700' },
        ]}>
          {concern.label}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// CONCERNS SECTION
// ============================================================================
export const ConcernsSection = React.memo(() => {
  const [activeConcern, setActiveConcern] = useState(1);
  const concerns = useMemo(() => SUMMER_DATA.concerns, []);

  const handleConcernPress = useCallback((id) => {
    setActiveConcern(id);
  }, []);

  return (
    <View style={concernStyles.section}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={concernStyles.scrollContent}
      >
        {concerns.map((concern, index) => (
          <ConcernPill
            key={concern.id}
            concern={concern}
            index={index}
            isActive={activeConcern === concern.id}
            onPress={handleConcernPress}
          />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// EXPERT SUNSCREEN CARD
// ============================================================================
const ExpertSunscreenCard = React.memo(({ product, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(50);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 120;
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
    <Animated.View style={[expertStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={expertStyles.card}
      >
        {/* Badge */}
        {product.badge ? (
          <View style={expertStyles.badge}>
            <Text style={expertStyles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        {/* Product Image Placeholder */}
        <View style={expertStyles.imageContainer}>
          <LinearGradient
            colors={['#FFF8E1', '#FFF3E0']}
            style={expertStyles.imagePlaceholder}
          >
            <Ionicons name="sunny" size={40} color={SUMMER_COLORS.sunYellowLight} />
          </LinearGradient>

          {/* Discount badge */}
          <View style={expertStyles.discountBadge}>
            <Text style={expertStyles.discountText}>-{product.discount}%</Text>
          </View>

          {/* Rating */}
          <View style={expertStyles.ratingBadge}>
            <Ionicons name="star" size={10} color="#FFFFFF" />
            <Text style={expertStyles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        {/* Brand */}
        <Text style={expertStyles.brand}>{product.brand}</Text>

        {/* Product Name */}
        <Text style={expertStyles.productName} numberOfLines={2}>{product.name}</Text>

        {/* Description */}
        <Text style={expertStyles.description} numberOfLines={2}>{product.description}</Text>

        {/* Features */}
        <View style={expertStyles.featuresRow}>
          {product.features.slice(0, 3).map((feature, idx) => (
            <View key={idx} style={expertStyles.featureChip}>
              <Text style={expertStyles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Price */}
        <View style={expertStyles.priceRow}>
          <Text style={expertStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={expertStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        {/* Shop Now button */}
        <TouchableOpacity style={expertStyles.shopButton} activeOpacity={0.7}>
          <Text style={expertStyles.shopButtonText}>Shop Now</Text>
          <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// EXPERT RECOMMENDED SUNSCREENS
// ============================================================================
export const ExpertSunscreensSection = React.memo(() => {
  const products = useMemo(() => SUMMER_DATA.expertSunscreens, []);

  return (
    <View style={expertStyles.section}>
      <View style={expertStyles.sectionHeader}>
        <View style={expertStyles.headerIcon}>
          <Ionicons name="ribbon" size={16} color={SUMMER_COLORS.sunOrange} />
        </View>
        <View>
          <Text style={expertStyles.sectionTitle}>Expert Recommended Sunscreens</Text>
          <Text style={expertStyles.sectionSubtitle}>Dermatologist-approved picks for Indian skin</Text>
        </View>
      </View>

      <FlatList
        data={products}
        renderItem={({ item, index }) => <ExpertSunscreenCard product={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={expertStyles.scrollContent}
        snapToInterval={SCREEN_WIDTH * 0.75 + SPACING.md}
        decelerationRate="fast"
      />
    </View>
  );
});

// ============================================================================
// SUNSCREEN PRODUCT CARD (for carousel)
// ============================================================================
const SunscreenProductCard = React.memo(({ product, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 60;
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
    <Animated.View style={[sunscreenStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={sunscreenStyles.card}
      >
        {/* Badge */}
        {product.badge ? (
          <View style={sunscreenStyles.badge}>
            <Text style={sunscreenStyles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        {/* Image */}
        <View style={sunscreenStyles.imageContainer}>
          <LinearGradient
            colors={['#FFF8E1', '#FFFDE7']}
            style={sunscreenStyles.imagePlaceholder}
          >
            <Ionicons name="sunny-outline" size={32} color={SUMMER_COLORS.sunYellowLight} />
          </LinearGradient>

          {/* SPF Badge */}
          <View style={sunscreenStyles.spfBadge}>
            <Text style={sunscreenStyles.spfText}>SPF {product.spf}</Text>
          </View>
        </View>

        {/* Discount */}
        <View style={sunscreenStyles.discountRow}>
          <View style={sunscreenStyles.discountBadge}>
            <Text style={sunscreenStyles.discountText}>{product.discount}% OFF</Text>
          </View>
          <View style={sunscreenStyles.typeBadge}>
            <Text style={sunscreenStyles.typeText}>{product.type}</Text>
          </View>
        </View>

        {/* Brand */}
        <Text style={sunscreenStyles.brand}>{product.brand}</Text>
        <Text style={sunscreenStyles.name} numberOfLines={2}>{product.name}</Text>

        {/* Rating */}
        <View style={sunscreenStyles.ratingRow}>
          <Ionicons name="star" size={10} color={SUMMER_COLORS.sunYellow} />
          <Text style={sunscreenStyles.ratingValue}>{product.rating}</Text>
          <Text style={sunscreenStyles.reviewCount}>{product.reviews}</Text>
        </View>

        {/* Variant */}
        <Text style={sunscreenStyles.variant}>{product.variant}</Text>

        {/* Delivery */}
        <View style={sunscreenStyles.deliveryRow}>
          <Ionicons name="flash" size={10} color={SUMMER_COLORS.freshGreen} />
          <Text style={sunscreenStyles.deliveryText}>{product.delivery}</Text>
        </View>

        {/* Price */}
        <View style={sunscreenStyles.priceRow}>
          <Text style={sunscreenStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={sunscreenStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        {/* Add to Cart */}
        <TouchableOpacity style={sunscreenStyles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={sunscreenStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// SUNSCREEN CAROUSEL SECTION
// ============================================================================
export const SunscreenCarouselSection = React.memo(() => {
  const sunscreens = useMemo(() => SUMMER_DATA.sunscreens, []);

  return (
    <View style={sunscreenStyles.section}>
      <View style={sunscreenStyles.sectionHeader}>
        <Text style={sunscreenStyles.sectionTitle}>Top Sunscreens</Text>
        <TouchableOpacity style={sunscreenStyles.viewAll} activeOpacity={0.7}>
          <Text style={sunscreenStyles.viewAllText}>View All</Text>
          <Ionicons name="arrow-forward" size={14} color={SUMMER_COLORS.sunOrange} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={sunscreens}
        renderItem={({ item, index }) => <SunscreenProductCard product={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={sunscreenStyles.scrollContent}
      />
    </View>
  );
});

// ============================================================================
// STAY SUMMER READY SECTION
// ============================================================================
export const StaySummerReadySection = React.memo(() => {
  const categories = useMemo(() => SUMMER_DATA.staySummerReady, []);
  const products = useMemo(() => SUMMER_DATA.staySummerProducts, []);
  const [activeCategory, setActiveCategory] = useState('Perfumes');

  return (
    <View style={readyStyles.section}>
      <View style={readyStyles.sectionHeader}>
        <Text style={readyStyles.sectionTitle}>Stay Summer Ready</Text>
      </View>

      {/* Category pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={readyStyles.categoryScroll}
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            activeOpacity={0.7}
            onPress={() => setActiveCategory(cat.name)}
            style={[
              readyStyles.categoryPill,
              activeCategory === cat.name && readyStyles.categoryPillActive,
            ]}
          >
            <Ionicons
              name={cat.icon}
              size={14}
              color={activeCategory === cat.name ? cat.color : COLORS.textTertiary}
            />
            <Text style={[
              readyStyles.categoryText,
              activeCategory === cat.name && { color: cat.color, fontWeight: '700' },
            ]}>
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Product cards */}
      <FlatList
        data={products}
        renderItem={({ item, index }) => <StaySummerProductCard product={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={readyStyles.productScroll}
      />
    </View>
  );
});

// ============================================================================
// STAY SUMMER PRODUCT CARD
// ============================================================================
const StaySummerProductCard = React.memo(({ product, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 60;
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
    <Animated.View style={[readyStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={readyStyles.card}
      >
        {product.badge ? (
          <View style={readyStyles.productBadge}>
            <Text style={readyStyles.productBadgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <View style={readyStyles.imageContainer}>
          <LinearGradient colors={['#F5F5F5', '#EEEEEE']} style={readyStyles.imagePlaceholder}>
            <Ionicons name="sparkles" size={24} color="#BDBDBD" />
          </LinearGradient>
        </View>

        <View style={readyStyles.discountRow}>
          <Text style={readyStyles.discountText}>{product.discount}% off</Text>
        </View>

        <Text style={readyStyles.variant}>{product.variant}</Text>
        <Text style={readyStyles.brand}>{product.brand}</Text>
        <Text style={readyStyles.productName} numberOfLines={1}>{product.name}</Text>

        <View style={readyStyles.deliveryRow}>
          <Ionicons name="flash" size={10} color={SUMMER_COLORS.freshGreen} />
          <Text style={readyStyles.deliveryText}>{product.delivery}</Text>
        </View>

        <View style={readyStyles.priceRow}>
          <Text style={readyStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={readyStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        <TouchableOpacity style={readyStyles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={readyStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// PROTECT YOUR GLOW SECTION
// ============================================================================
export const ProtectGlowSection = React.memo(() => {
  const tabs = useMemo(() => SUMMER_DATA.protectGlow, []);
  const products = useMemo(() => SUMMER_DATA.protectGlowProducts, []);
  const [activeTab, setActiveTab] = useState('cleanser');

  return (
    <View style={glowStyles.section}>
      <View style={glowStyles.sectionHeader}>
        <Text style={glowStyles.sectionTitle}>Protect Your Glow</Text>
        <View style={glowStyles.sparkleIcon}>
          <Ionicons name="sparkles" size={16} color={SUMMER_COLORS.sunYellow} />
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={glowStyles.tabsScroll}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => setActiveTab(tab.id)}
            style={[
              glowStyles.tab,
              activeTab === tab.id && glowStyles.tabActive,
            ]}
          >
            <Text style={[
              glowStyles.tabText,
              activeTab === tab.id && glowStyles.tabTextActive,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Products */}
      <FlatList
        data={products}
        renderItem={({ item, index }) => <GlowProductCard product={item} index={index} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={glowStyles.productScroll}
      />
    </View>
  );
});

// ============================================================================
// GLOW PRODUCT CARD
// ============================================================================
const GlowProductCard = React.memo(({ product, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(30);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 60;
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
    <Animated.View style={[glowStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={glowStyles.card}
      >
        {product.badge ? (
          <View style={glowStyles.badge}>
            <Text style={glowStyles.badgeText}>{product.badge}</Text>
          </View>
        ) : null}

        <View style={glowStyles.imageContainer}>
          <LinearGradient colors={['#F5F5F5', '#EEEEEE']} style={glowStyles.imagePlaceholder}>
            <Ionicons name="flask" size={24} color="#BDBDBD" />
          </LinearGradient>

          <View style={glowStyles.ratingBadge}>
            <Ionicons name="star" size={8} color="#FFFFFF" />
            <Text style={glowStyles.ratingText}>{product.rating}</Text>
          </View>
        </View>

        <Text style={glowStyles.brand}>{product.brand}</Text>
        <Text style={glowStyles.productName} numberOfLines={2}>{product.name}</Text>

        <View style={glowStyles.deliveryRow}>
          <Ionicons name="flash" size={10} color={SUMMER_COLORS.freshGreen} />
          <Text style={glowStyles.deliveryText}>{product.delivery}</Text>
        </View>

        <View style={glowStyles.discountRow}>
          <Text style={glowStyles.discountPct}>{product.discount}% off</Text>
        </View>

        <View style={glowStyles.priceRow}>
          <Text style={glowStyles.price}>{'\u20B9'}{product.price}</Text>
          <Text style={glowStyles.oldPrice}>{'\u20B9'}{product.oldPrice}</Text>
        </View>

        <TouchableOpacity style={glowStyles.addButton} activeOpacity={0.7}>
          <Ionicons name="add" size={16} color="#FFFFFF" />
          <Text style={glowStyles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// STYLES - SUN RAYS
// ============================================================================
const sunStyles = StyleSheet.create({
  raysContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  ray: {
    position: 'absolute',
    width: 2,
    height: 40,
    backgroundColor: SUMMER_COLORS.sunYellowLight,
    borderRadius: 1,
    top: 0,
    left: 39,
    transformOrigin: 'bottom center',
  },
});

// ============================================================================
// STYLES - HERO
// ============================================================================
const heroStyles = StyleSheet.create({
  container: { marginBottom: 0 },
  gradient: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.screenPadding,
    position: 'relative',
    overflow: 'hidden',
  },
  sunContainer: {
    position: 'absolute',
    top: -10,
    right: -10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sunCore: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: SUMMER_COLORS.sunYellowFaded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: { zIndex: 1 },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  badge: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: SUMMER_COLORS.sunOrangeFaded,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: SUMMER_COLORS.sunYellowSubtle,
  },
  editionTag: {
    backgroundColor: SUMMER_COLORS.sunYellowFaded,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1, borderColor: SUMMER_COLORS.sunYellowSubtle,
  },
  editionTagText: {
    ...TYPOGRAPHY.badge, color: SUMMER_COLORS.sunOrange,
    letterSpacing: 1.5, fontSize: 9,
  },
  newTag: {
    backgroundColor: '#E53935',
    paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  newTagText: { fontSize: 8, fontWeight: '900', color: '#FFFFFF', letterSpacing: 1 },
  title: {
    fontSize: 36, fontWeight: '900', color: COLORS.textPrimary,
    letterSpacing: -0.5, marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.h4, color: SUMMER_COLORS.sunOrange,
    fontWeight: '600', marginBottom: SPACING.xs,
  },
  description: { ...TYPOGRAPHY.bodyMedium, color: COLORS.textTertiary },
});

// ============================================================================
// STYLES - CONCERNS
// ============================================================================
const concernStyles = StyleSheet.create({
  section: { marginTop: SPACING.lg },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.sm },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.pill,
    backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1, borderColor: COLORS.borderLight,
  },
  pillText: { ...TYPOGRAPHY.labelSmall, color: COLORS.textSecondary, fontWeight: '600' },
});

// ============================================================================
// STYLES - EXPERT SUNSCREENS
// ============================================================================
const expertStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.md,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  headerIcon: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: SUMMER_COLORS.sunOrangeFaded,
    justifyContent: 'center', alignItems: 'center',
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sectionSubtitle: { ...TYPOGRAPHY.caption, color: COLORS.textTertiary, marginTop: 2 },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: SCREEN_WIDTH * 0.75 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.xl,
    padding: SPACING.lg, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: SPACING.sm, right: SPACING.sm, zIndex: 1,
    backgroundColor: SUMMER_COLORS.sunOrange, paddingHorizontal: SPACING.sm,
    paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  badgeText: { fontSize: 8, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 },
  imageContainer: {
    width: '100%', height: 120, borderRadius: RADIUS.lg,
    overflow: 'hidden', marginBottom: SPACING.md, position: 'relative',
  },
  imagePlaceholder: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
  },
  discountBadge: {
    position: 'absolute', top: SPACING.sm, left: SPACING.sm,
    backgroundColor: '#E53935', paddingHorizontal: 6, paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  discountText: { fontSize: 10, fontWeight: '800', color: '#FFFFFF' },
  ratingBadge: {
    position: 'absolute', bottom: SPACING.sm, right: SPACING.sm,
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 6,
    paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  ratingText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
  brand: {
    fontSize: 12, fontWeight: '800', color: SUMMER_COLORS.sunOrange,
    letterSpacing: 0.5, marginBottom: 2,
  },
  productName: {
    ...TYPOGRAPHY.labelLarge, color: COLORS.textPrimary, marginBottom: 4,
  },
  description: {
    ...TYPOGRAPHY.bodySmall, color: COLORS.textTertiary,
    lineHeight: 18, marginBottom: SPACING.md,
  },
  featuresRow: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: SPACING.md,
  },
  featureChip: {
    backgroundColor: SUMMER_COLORS.sunYellowFaded,
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: RADIUS.xs,
  },
  featureText: { fontSize: 9, fontWeight: '700', color: SUMMER_COLORS.sunOrange },
  priceRow: {
    flexDirection: 'row', alignItems: 'baseline', gap: SPACING.sm, marginBottom: SPACING.md,
  },
  price: { fontSize: 18, fontWeight: '900', color: COLORS.textPrimary },
  oldPrice: {
    fontSize: 13, color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  shopButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: SUMMER_COLORS.sunOrange,
    paddingVertical: SPACING.md, borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  shopButtonText: { ...TYPOGRAPHY.labelLarge, color: '#FFFFFF', fontWeight: '700' },
});

// ============================================================================
// STYLES - SUNSCREEN CAROUSEL
// ============================================================================
const sunscreenStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.lg,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  viewAll: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  viewAllText: { ...TYPOGRAPHY.labelSmall, color: SUMMER_COLORS.sunOrange, fontWeight: '700' },
  scrollContent: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: SUMMER_LAYOUT.sunscreenCardWidth },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.md, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft, position: 'relative', overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: 6, left: 6, zIndex: 1,
    backgroundColor: SUMMER_COLORS.sunOrange,
    paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  badgeText: { fontSize: 7, fontWeight: '900', color: '#FFFFFF' },
  imageContainer: {
    width: '100%', height: 100, borderRadius: RADIUS.md,
    overflow: 'hidden', marginBottom: SPACING.sm, position: 'relative',
  },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  spfBadge: {
    position: 'absolute', bottom: 4, right: 4,
    backgroundColor: SUMMER_COLORS.sunYellow,
    paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  spfText: { fontSize: 8, fontWeight: '800', color: '#FFFFFF' },
  discountRow: {
    flexDirection: 'row', gap: 4, marginBottom: 4,
  },
  discountBadge: {
    backgroundColor: '#FFEBEE', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  discountText: { fontSize: 9, fontWeight: '700', color: '#E53935' },
  typeBadge: {
    backgroundColor: SUMMER_COLORS.skyBlueFaded,
    paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  typeText: { fontSize: 9, fontWeight: '600', color: SUMMER_COLORS.skyBlue },
  brand: { fontSize: 10, fontWeight: '700', color: SUMMER_COLORS.sunOrange, marginBottom: 2 },
  name: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, lineHeight: 15, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 2 },
  ratingValue: { fontSize: 10, fontWeight: '700', color: COLORS.textPrimary },
  reviewCount: { fontSize: 9, color: COLORS.textTertiary },
  variant: { fontSize: 9, color: COLORS.textMuted, marginBottom: 2 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 4 },
  deliveryText: { fontSize: 9, fontWeight: '600', color: SUMMER_COLORS.freshGreen },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: SPACING.sm },
  price: { fontSize: 14, fontWeight: '800', color: COLORS.textPrimary },
  oldPrice: { fontSize: 10, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, paddingVertical: 6,
    borderRadius: RADIUS.sm, gap: 2,
  },
  addButtonText: { fontSize: 11, fontWeight: '700', color: '#FFFFFF' },
});

// ============================================================================
// STYLES - STAY SUMMER READY
// ============================================================================
const readyStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: { paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.md },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  categoryScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.sm, marginBottom: SPACING.lg },
  categoryPill: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill, backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1, borderColor: COLORS.borderLight,
  },
  categoryPillActive: {
    backgroundColor: SUMMER_COLORS.sunYellowFaded,
    borderColor: SUMMER_COLORS.sunYellow,
  },
  categoryText: { ...TYPOGRAPHY.labelSmall, color: COLORS.textTertiary, fontWeight: '600' },
  productScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: 150 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle, position: 'relative', overflow: 'hidden',
  },
  productBadge: {
    position: 'absolute', top: 4, left: 4, zIndex: 1,
    backgroundColor: SUMMER_COLORS.sunOrange,
    paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  productBadgeText: { fontSize: 7, fontWeight: '900', color: '#FFFFFF' },
  imageContainer: {
    width: '100%', height: 80, borderRadius: RADIUS.sm,
    overflow: 'hidden', marginBottom: 4,
  },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  discountRow: { marginBottom: 2 },
  discountText: { fontSize: 9, fontWeight: '700', color: '#E53935' },
  variant: { fontSize: 8, color: COLORS.textMuted, marginBottom: 2 },
  brand: { fontSize: 10, fontWeight: '700', color: COLORS.textSecondary, marginBottom: 1 },
  productName: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 2 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 4 },
  deliveryText: { fontSize: 9, fontWeight: '600', color: SUMMER_COLORS.freshGreen },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: SPACING.xs },
  price: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
  oldPrice: { fontSize: 10, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, paddingVertical: 5,
    borderRadius: RADIUS.sm, gap: 2,
  },
  addButtonText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
});

// ============================================================================
// STYLES - PROTECT YOUR GLOW
// ============================================================================
const glowStyles = StyleSheet.create({
  section: { marginTop: SPACING.xl },
  sectionHeader: {
    flexDirection: 'row', alignItems: 'center', gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding, marginBottom: SPACING.md,
  },
  sectionTitle: { ...TYPOGRAPHY.h4, color: COLORS.textPrimary },
  sparkleIcon: {},
  tabsScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.sm, marginBottom: SPACING.lg },
  tab: {
    paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill, backgroundColor: COLORS.backgroundMuted,
    borderWidth: 1, borderColor: COLORS.borderLight,
  },
  tabActive: {
    backgroundColor: SUMMER_COLORS.sunYellowFaded,
    borderColor: SUMMER_COLORS.sunYellow,
  },
  tabText: { ...TYPOGRAPHY.labelSmall, color: COLORS.textTertiary, fontWeight: '600' },
  tabTextActive: { color: SUMMER_COLORS.sunOrange, fontWeight: '700' },
  productScroll: { paddingHorizontal: SPACING.screenPadding, gap: SPACING.md },
  cardWrapper: { width: 155 },
  card: {
    backgroundColor: COLORS.cardWhite, borderRadius: RADIUS.card,
    padding: SPACING.sm, borderWidth: 1, borderColor: COLORS.borderLight,
    ...SHADOWS.subtle, position: 'relative', overflow: 'hidden',
  },
  badge: {
    position: 'absolute', top: 4, left: 4, zIndex: 1,
    backgroundColor: '#E53935', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 3,
  },
  badgeText: { fontSize: 7, fontWeight: '900', color: '#FFFFFF' },
  imageContainer: {
    width: '100%', height: 90, borderRadius: RADIUS.sm,
    overflow: 'hidden', marginBottom: 4, position: 'relative',
  },
  imagePlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  ratingBadge: {
    position: 'absolute', bottom: 4, right: 4,
    flexDirection: 'row', alignItems: 'center', gap: 2,
    backgroundColor: 'rgba(0,0,0,0.6)', paddingHorizontal: 4,
    paddingVertical: 1, borderRadius: 3,
  },
  ratingText: { fontSize: 8, fontWeight: '700', color: '#FFFFFF' },
  brand: { fontSize: 10, fontWeight: '700', color: SUMMER_COLORS.sunOrange, marginBottom: 1 },
  productName: { fontSize: 11, fontWeight: '600', color: COLORS.textPrimary, lineHeight: 15, marginBottom: 4 },
  deliveryRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 2 },
  deliveryText: { fontSize: 9, fontWeight: '600', color: SUMMER_COLORS.freshGreen },
  discountRow: { marginBottom: 2 },
  discountPct: { fontSize: 9, fontWeight: '700', color: '#E53935' },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4, marginBottom: SPACING.xs },
  price: { fontSize: 13, fontWeight: '800', color: COLORS.textPrimary },
  oldPrice: { fontSize: 10, color: COLORS.textMuted, textDecorationLine: 'line-through' },
  addButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: COLORS.primary, paddingVertical: 5,
    borderRadius: RADIUS.sm, gap: 2,
  },
  addButtonText: { fontSize: 10, fontWeight: '700', color: '#FFFFFF' },
});
