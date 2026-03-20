/**
 * ============================================================================
 * APOLLO 24/7 ROYAL PREMIUM HOME SCREEN
 * ============================================================================
 * 
 * A luxury healthcare super-app home screen built with the precision and
 * polish of a FAANG principal architect. Every pixel, every animation,
 * every micro-interaction has been crafted to deliver a royal, premium
 * experience that feels like liquid gold flowing through the user's fingers.
 * 
 * Architecture:
 * - Modular section-based composition
 * - React.memo on all components for 60fps performance
 * - Reanimated worklet-based animations
 * - FlatList virtualization for heavy lists
 * - 8px spacing grid system throughout
 * - Soft purple + gold accent shadow system
 * 
 * Sections (top to bottom):
 * 1. StickyHeader - Namaste greeting, location, wallet, profile
 * 2. SearchBar - Premium rounded search with AI assistant badge
 * 3. CategoryNav - Horizontal scrollable chips with gold underline
 * 4. HeroSection - Trust messaging with legacy brand logos
 * 5. ServicesGrid - 2x2 premium service cards
 * 6. PrescriptionBar - Rx order banner with ripple button
 * 7. BuyAgainSection - Tabs + horizontal medicine cards
 * 8. BankOffersCarousel - Auto-scrolling bank offer cards
 * 9. CuratedOfferings - 3 vertical premium offering cards
 * 10. PromotionBanners - Auto-scrolling promotional banners
 * 11. ContentCards - Apollo 24|7 + PRO Health cards
 * 12. AskApolloCarousel - 14 health topic poster cards
 * 13. TrustBadges - Gold seal trust indicators
 * 14. Footer - Version, branding, powered-by
 * 
 * ============================================================================
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
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
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Section Components
import { HeroSection, ServicesGrid, PrescriptionBar } from '../components/home/HeroAndServices';
import { BuyAgainHeader, MedicineCarousel, BankOffersCarousel } from '../components/home/ShoppingSection';
import { CuratedOfferings, PromotionBanners, ContentCards, AskApolloCarousel, TrustBadges, Footer } from '../components/home/DiscoverSection';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT, MIXINS, DATA } from '../components/home/theme';

// Skin Screen (Rose Gold Edition)
import SkinScreen from '../components/skin/SkinScreen';

// New Premium Section Screens
import InsuranceScreen from '../components/insurance/InsuranceScreen';
import SummerScreen from '../components/summer/SummerScreen';
import HealthCheckScreen from '../components/healthcheck/HealthCheckScreen';
import WomenScreen from '../components/women/WomenScreen';
import MenScreen from '../components/men/MenScreen';

// New Healthcare Category Screens
import WeightLossScreen from '../components/weightloss/WeightLossScreen';
import InstantDrScreen from '../components/instantdr/InstantDrScreen';
import SexualHealthScreen from '../components/sexualhealth/SexualHealthScreen';
import NutritionScreen from '../components/nutrition/NutritionScreen';
import BabyScreen from '../components/baby/BabyScreen';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

// ============================================================================
// ANIMATED APOLLO LOGO
// ============================================================================
const AnimatedApolloLogo = React.memo(() => {
  const rotation = useSharedValue(0);
  const glowOpacity = useSharedValue(0.3);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Subtle continuous rotation
    rotation.value = withRepeat(
      withTiming(360, { duration: 20000, easing: Easing.linear }),
      -1,
      false
    );

    // Gold glow pulse
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.6, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.3, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.apolloLogoContainer}>
      <Animated.View style={[styles.apolloLogoGlow, glowStyle]} />
      <Animated.View style={[styles.apolloLogoInner, logoAnimatedStyle]}>
        <Ionicons name="medical" size={18} color={COLORS.apolloGreen} />
      </Animated.View>
    </View>
  );
});

// ============================================================================
// ANIMATED WALLET BADGE
// ============================================================================
const AnimatedWalletBadge = React.memo(() => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const walletAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={walletAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.walletBadge}
      >
        <Text style={styles.walletAmountText}>&#8377;50</Text>
        <View style={styles.walletHcBadge}>
          <Text style={styles.walletHcText}>HC</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED PROFILE AVATAR
// ============================================================================
const AnimatedProfileAvatar = React.memo(({ onPress }) => {
  const scale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const borderPulse = useSharedValue(0);

  useEffect(() => {
    borderPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 2500, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.9, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
  }, []);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.bouncy);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const avatarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(borderPulse.value, [0, 1], [0.3, 0.7]),
    transform: [{ scale: interpolate(borderPulse.value, [0, 1], [1, 1.12]) }],
  }));

  return (
    <Animated.View style={avatarAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.profileAvatarContainer}
      >
        <Animated.View style={[styles.profileAvatarGlow, glowStyle]} />
        <View style={styles.profileAvatar}>
          <Ionicons name="person" size={20} color={COLORS.royalGold} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// STICKY HEADER COMPONENT
// ============================================================================
const StickyHeader = React.memo(({ scrollY, onProfilePress }) => {
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateY = useSharedValue(-20);

  useEffect(() => {
    entranceOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });
    entranceTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const elevation = interpolate(
      scrollY.value,
      [0, 50],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity: entranceOpacity.value,
      transform: [{ translateY: entranceTranslateY.value }],
      shadowOpacity: elevation * 0.12,
    };
  });

  return (
    <Animated.View style={[styles.stickyHeader, headerAnimatedStyle]}>
      <LinearGradient
        colors={[COLORS.cardWhite, COLORS.backgroundSoft]}
        style={styles.headerGradient}
      >
        {/* Left side: Greeting + Location */}
        <View style={styles.headerLeft}>
          <View style={styles.greetingRow}>
            <Text style={styles.greetingText}>Namaste </Text>
            <Text style={styles.greetingName}>Guest</Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.locationRow}>
            <Ionicons name="location-sharp" size={12} color={COLORS.premiumOrange} />
            <Text style={styles.locationText}>Delhi 110001</Text>
            <Ionicons name="chevron-down" size={12} color={COLORS.textTertiary} />
          </TouchableOpacity>
        </View>

        {/* Right side: Logo + Wallet + Profile */}
        <View style={styles.headerRight}>
          <AnimatedApolloLogo />
          <AnimatedWalletBadge />
          <AnimatedProfileAvatar onPress={onProfilePress} />
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// SEARCH BAR COMPONENT
// ============================================================================
const SearchBarRow = React.memo(({ cartCount, scrollY, onCartPress }) => {
  const searchScale = useSharedValue(1);
  const cartBounce = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateY = useSharedValue(15);
  const aiPulse = useSharedValue(0);

  useEffect(() => {
    entranceOpacity.value = withDelay(100, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceTranslateY.value = withDelay(100, withSpring(0, ANIMATION.spring.gentle));

    // AI badge subtle pulse
    aiPulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  // Bounce cart badge when count changes
  useEffect(() => {
    if (cartCount > 0) {
      cartBounce.value = withSequence(
        withSpring(1.4, { damping: 4, stiffness: 400 }),
        withSpring(1, ANIMATION.spring.gentle)
      );
    }
  }, [cartCount]);

  const searchAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [{ translateY: entranceTranslateY.value }],
  }));

  const cartBadgeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartBounce.value }],
  }));

  const aiPulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(aiPulse.value, [0, 1], [0.7, 1]),
    transform: [{ scale: interpolate(aiPulse.value, [0, 1], [0.95, 1.05]) }],
  }));

  const handleSearchPressIn = useCallback(() => {
    searchScale.value = withSpring(0.98, ANIMATION.spring.press);
  }, []);

  const handleSearchPressOut = useCallback(() => {
    searchScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const searchBarScaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: searchScale.value }],
  }));

  return (
    <Animated.View style={[styles.searchBarContainer, searchAnimatedStyle]}>
      {/* Search Field */}
      <Animated.View style={[styles.searchBarOuter, searchBarScaleStyle]}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPressIn={handleSearchPressIn}
          onPressOut={handleSearchPressOut}
          style={styles.searchBar}
        >
          <View style={styles.searchIconContainer}>
            <Ionicons name="search" size={18} color={COLORS.textTertiary} />
          </View>
          <Text style={styles.searchPlaceholder}>Search medicines, doctors, labs...</Text>
          <Animated.View style={[styles.aiAssistantBadge, aiPulseStyle]}>
            <LinearGradient
              colors={[COLORS.apolloGreen, COLORS.apolloGreenLight]}
              style={styles.aiGradient}
            >
              <Text style={styles.aiText}>AI</Text>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>

      {/* Cart Button */}
      <TouchableOpacity activeOpacity={0.7} style={styles.cartButton} onPress={onCartPress}>
        <View style={styles.cartIconContainer}>
          <Ionicons name="cart-outline" size={22} color={COLORS.apolloGreen} />
        </View>
        {cartCount > 0 && (
          <Animated.View style={[styles.cartBadge, cartBadgeAnimatedStyle]}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED CATEGORY CHIP
// ============================================================================
const AnimatedCategoryChip = React.memo(({ category, isActive, onPress, index }) => {
  const chipScale = useSharedValue(1);
  const chipOpacity = useSharedValue(0);
  const chipTranslateX = useSharedValue(20);
  const iconRotation = useSharedValue(0);

  useEffect(() => {
    const delay = index * 50;
    chipOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.normal }));
    chipTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    chipScale.value = withSpring(0.93, ANIMATION.spring.press);
    iconRotation.value = withSpring(ANIMATION.rotation.iconTilt, ANIMATION.spring.bouncy);
  }, []);

  const handlePressOut = useCallback(() => {
    chipScale.value = withSpring(1, ANIMATION.spring.gentle);
    iconRotation.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const chipAnimatedStyle = useAnimatedStyle(() => ({
    opacity: chipOpacity.value,
    transform: [
      { translateX: chipTranslateX.value },
      { scale: chipScale.value },
    ],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  return (
    <Animated.View style={chipAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(category.id)}
        style={[
          styles.categoryChip,
          isActive && styles.categoryChipActive,
        ]}
      >
        <Animated.View style={iconStyle}>
          <Ionicons
            name={category.icon}
            size={16}
            color={isActive ? COLORS.apolloGreen : COLORS.textTertiary}
          />
        </Animated.View>
        <Text style={[
          styles.categoryText,
          isActive && styles.categoryTextActive,
        ]}>
          {category.label}
        </Text>
        {category.isNew && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// CATEGORY NAVIGATION
// ============================================================================
const CategoryNav = React.memo(({ selectedCategory, onCategoryChange }) => {
  const categories = useMemo(() => DATA.categories, []);
  const navOpacity = useSharedValue(0);

  useEffect(() => {
    navOpacity.value = withDelay(200, withTiming(1, { duration: ANIMATION.duration.smooth }));
  }, []);

  const navAnimatedStyle = useAnimatedStyle(() => ({
    opacity: navOpacity.value,
  }));

  return (
    <Animated.View style={[styles.categoryNavContainer, navAnimatedStyle]}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryNavContent}
        bounces={true}
        overScrollMode="never"
      >
        {categories.map((category, index) => (
          <AnimatedCategoryChip
            key={category.id}
            category={category}
            isActive={selectedCategory === category.id}
            onPress={onCategoryChange}
            index={index}
          />
        ))}
      </ScrollView>
      {/* Bottom gold accent line */}
      <View style={styles.categoryNavBottomLine} />
    </Animated.View>
  );
});

// ============================================================================
// MAIN HOME SCREEN COMPONENT
// ============================================================================
export default function HomeScreen() {
  // ========================================================================
  // STATE
  // ========================================================================
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartCount, setCartCount] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [medicineQuantities, setMedicineQuantities] = useState({});

  // ========================================================================
  // REFS & ANIMATED VALUES
  // ========================================================================
  const scrollY = useSharedValue(0);
  const router = useRouter();

  // ========================================================================
  // SCROLL HANDLER
  // ========================================================================
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  // ========================================================================
  // CALLBACKS
  // ========================================================================
  const handleCategoryChange = useCallback((categoryId) => {
    setSelectedCategory(categoryId);
  }, []);

  const handleServicePress = useCallback((service) => {
    // Navigate to service-specific screen
  }, []);

  const handleOrderPress = useCallback(() => {
    // Navigate to prescription upload
  }, []);

  const handleViewAllBuyAgain = useCallback(() => {
    router.push('/BuyAgainScreen');
  }, [router]);

  const handleTabChange = useCallback((tabIndex) => {
    setActiveTab(tabIndex);
  }, []);

  const handleAddToCart = useCallback((medicineId, delta) => {
    setMedicineQuantities(prev => {
      const current = prev[medicineId] || 0;
      const next = Math.max(0, current + delta);
      const newState = { ...prev, [medicineId]: next };
      return newState;
    });
    if (delta > 0) {
      setCartCount(prev => prev + 1);
    } else {
      setCartCount(prev => Math.max(0, prev - 1));
    }
  }, []);

  // ========================================================================
  // RENDER
  // ========================================================================
  return (
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={COLORS.cardWhite}
          translucent={false}
        />

        {/* Background Gradient */}
        <LinearGradient
          colors={COLORS.gradientBackground}
          style={styles.backgroundGradient}
        />

        {/* Sticky Header */}
        <StickyHeader scrollY={scrollY} onProfilePress={() => router.push('/account')} />

        {/* Search Bar */}
        <SearchBarRow cartCount={cartCount} scrollY={scrollY} onCartPress={() => router.push('/cart')} />

        {/* Category Navigation */}
        <CategoryNav
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Scrollable Content */}
        <AnimatedScrollView
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          bounces={true}
          overScrollMode="never"
          removeClippedSubviews={Platform.OS === 'android'}
        >
          {selectedCategory === 'skin' ? (
            /* ============================================ */
            /* SKIN PAGE (Rose Gold Edition) */
            /* ============================================ */
            <SkinScreen scrollY={scrollY} />
          ) : selectedCategory === 'insurance' ? (
            /* ============================================ */
            /* INSURANCE PAGE */
            /* ============================================ */
            <InsuranceScreen scrollY={scrollY} />
          ) : selectedCategory === 'summer' ? (
            /* ============================================ */
            /* SUMMER PAGE */
            /* ============================================ */
            <SummerScreen scrollY={scrollY} />
          ) : selectedCategory === 'healthcheck' ? (
            /* ============================================ */
            /* HEALTH CHECK PAGE */
            /* ============================================ */
            <HealthCheckScreen scrollY={scrollY} />
          ) : selectedCategory === 'women' ? (
            /* ============================================ */
            /* WOMEN PAGE */
            /* ============================================ */
            <WomenScreen scrollY={scrollY} />
          ) : selectedCategory === 'men' ? (
            /* ============================================ */
            /* MEN PAGE */
            /* ============================================ */
            <MenScreen scrollY={scrollY} />
          ) : selectedCategory === 'weightloss' ? (
            /* ============================================ */
            /* WEIGHT LOSS PAGE (Emerald Edition) */
            /* ============================================ */
            <WeightLossScreen scrollY={scrollY} />
          ) : selectedCategory === 'instantdr' ? (
            /* ============================================ */
            /* INSTANT DR PAGE (Medical Blue Edition) */
            /* ============================================ */
            <InstantDrScreen scrollY={scrollY} />
          ) : selectedCategory === 'sexualhealth' ? (
            /* ============================================ */
            /* SEXUAL HEALTH PAGE (Rose Edition) */
            /* ============================================ */
            <SexualHealthScreen scrollY={scrollY} />
          ) : selectedCategory === 'nutrition' ? (
            /* ============================================ */
            /* NUTRITION PAGE (Vitality Edition) */
            /* ============================================ */
            <NutritionScreen scrollY={scrollY} />
          ) : selectedCategory === 'baby' ? (
            /* ============================================ */
            /* BABY PAGE (Sky Blue Edition) */
            /* ============================================ */
            <BabyScreen scrollY={scrollY} />
          ) : (
            /* ============================================ */
            /* HOME PAGE (Default) */
            /* ============================================ */
            <>
              {/* Hero Section */}
              <HeroSection isVisible={true} />

              {/* Services Grid - 2x2 */}
              <ServicesGrid onServicePress={handleServicePress} />

              {/* Prescription Order Bar */}
              <PrescriptionBar onOrderPress={handleOrderPress} />

              {/* Buy Again Section */}
              <BuyAgainHeader
                onViewAll={handleViewAllBuyAgain}
                activeTab={activeTab}
                onTabChange={handleTabChange}
              />

              {/* Medicine Cards Carousel */}
              <MedicineCarousel
                onAddToCart={handleAddToCart}
                quantities={medicineQuantities}
              />

              {/* Bank Offers Auto Carousel */}
              <BankOffersCarousel />

              {/* Curated Offerings */}
              <CuratedOfferings />

              {/* Promotion Banners Auto Carousel */}
              <PromotionBanners />

              {/* Content Cards */}
              <ContentCards />

              {/* Ask Apollo Poster Carousel */}
              <AskApolloCarousel />

              {/* Trust Badges */}
              <TrustBadges />

              {/* Footer */}
              <Footer />
            </>
          )}

          {/* Bottom Spacer for tab bar */}
          <View style={styles.bottomSpacer} />
        </AnimatedScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ========================================================================
  // ROOT & CONTAINER STYLES
  // ========================================================================
  rootContainer: {
    flex: 1,
    backgroundColor: COLORS.backgroundStart,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.cardWhite,
  },
  backgroundGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: SPACING.lg,
  },
  bottomSpacer: {
    height: SPACING.xxl,
  },

  // ========================================================================
  // STICKY HEADER STYLES
  // ========================================================================
  stickyHeader: {
    zIndex: 100,
    ...SHADOWS.header,
  },
  headerGradient: {
    height: LAYOUT.headerHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.dividerLight,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  greetingText: {
    ...TYPOGRAPHY.bodyLarge,
    color: COLORS.textSecondary,
  },
  greetingName: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 3,
  },
  locationText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },

  // ========================================================================
  // APOLLO LOGO STYLES
  // ========================================================================
  apolloLogoContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  apolloLogoGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.royalGoldGlow,
  },
  apolloLogoInner: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: COLORS.cardWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.apolloGreenSubtle,
    ...SHADOWS.subtle,
  },

  // ========================================================================
  // WALLET BADGE STYLES
  // ========================================================================
  walletBadge: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  walletAmountText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  walletHcBadge: {
    backgroundColor: COLORS.apolloGreen,
    borderRadius: RADIUS.xs,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginTop: 1,
  },
  walletHcText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontWeight: '900',
    fontSize: 8,
  },

  // ========================================================================
  // PROFILE AVATAR STYLES
  // ========================================================================
  profileAvatarContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarGlow: {
    position: 'absolute',
    width: LAYOUT.profileAvatarSize + 8,
    height: LAYOUT.profileAvatarSize + 8,
    borderRadius: (LAYOUT.profileAvatarSize + 8) / 2,
    backgroundColor: COLORS.royalGoldGlow,
  },
  profileAvatar: {
    width: LAYOUT.profileAvatarSize,
    height: LAYOUT.profileAvatarSize,
    borderRadius: LAYOUT.profileAvatarSize / 2,
    backgroundColor: COLORS.backgroundCream,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.royalGold,
    ...SHADOWS.goldGlow,
  },

  // ========================================================================
  // SEARCH BAR STYLES
  // ========================================================================
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    paddingVertical: SPACING.md,
    gap: SPACING.md,
    backgroundColor: COLORS.cardWhite,
  },
  searchBarOuter: {
    flex: 1,
  },
  searchBar: {
    height: LAYOUT.searchBarHeight,
    backgroundColor: COLORS.backgroundMuted,
    borderRadius: RADIUS.search,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  searchIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.cardWhite,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.subtle,
  },
  searchPlaceholder: {
    flex: 1,
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textMuted,
  },
  aiAssistantBadge: {
    overflow: 'hidden',
    borderRadius: LAYOUT.aiBadgeSize / 2,
  },
  aiGradient: {
    width: LAYOUT.aiBadgeSize,
    height: LAYOUT.aiBadgeSize,
    borderRadius: LAYOUT.aiBadgeSize / 2,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.button,
  },
  aiText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontWeight: '900',
    fontSize: 11,
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.backgroundMuted,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cartIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: LAYOUT.cartBadgeSize,
    height: LAYOUT.cartBadgeSize,
    borderRadius: LAYOUT.cartBadgeSize / 2,
    backgroundColor: COLORS.premiumOrange,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.cardWhite,
    ...SHADOWS.subtle,
  },
  cartBadgeText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontWeight: '900',
    fontSize: 9,
  },

  // ========================================================================
  // CATEGORY NAVIGATION STYLES
  // ========================================================================
  categoryNavContainer: {
    backgroundColor: COLORS.cardWhite,
    paddingTop: SPACING.xs,
    position: 'relative',
  },
  categoryNavContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 1,
    borderRadius: RADIUS.chip,
    backgroundColor: COLORS.backgroundMuted,
    gap: SPACING.xs + 2,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  categoryChipActive: {
    backgroundColor: COLORS.royalGoldFaded,
    borderColor: COLORS.royalGold,
    borderBottomWidth: 2.5,
    borderBottomColor: COLORS.royalGold,
    ...SHADOWS.goldGlow,
  },
  categoryText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textTertiary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.apolloGreen,
    fontWeight: '700',
  },
  newBadge: {
    backgroundColor: COLORS.premiumOrangeFaded,
    borderRadius: RADIUS.xs,
    paddingHorizontal: 5,
    paddingVertical: 1,
    marginLeft: 2,
  },
  newBadgeText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.premiumOrange,
    fontWeight: '900',
    fontSize: 7,
  },
  categoryNavBottomLine: {
    height: 1,
    backgroundColor: COLORS.dividerLight,
  },
});
