/**
 * ============================================================================
 * APOLLO 24/7 - SEXUAL HEALTH SCREEN (INTIMATE ROSE EDITION)
 * ============================================================================
 *
 * Premium Sexual Health vertical screen — 14-15 scrolls deep
 * Built with the precision of a FAANG principal architect.
 *
 * Sections (top to bottom):
 * 1. Hero Header with rose pulse animation
 * 2. Shop by Category (8 categories grid)
 * 3. Brands You Know & Trust (horizontal carousel)
 * 4. Shop By Concern (8 concern cards)
 * 5. Support for Your Performance (product carousel)
 * 6. Private Advice Banner
 * 7. Support for Your Intimate Health (product carousel)
 * 8. Explore Condoms from Top Brands
 * 9. Wellness Tips (6 cards)
 * 10. Discreet Delivery Features
 * 11. Doctor Specialists
 * 12. Ask Apollo Section
 * 13. Doctor Consultation CTA
 * 14. Footer
 *
 * ============================================================================
 */

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';
import { SH_COLORS, SH_DATA } from './SexualHealthTheme';
import { Footer } from '../home/DiscoverSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// ROSE PARTICLE
// ============================================================================
const RoseParticle = React.memo(({ delay, startX, startY, color, size }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const duration = 3500 + Math.random() * 2500;
    opacity.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(0.7, { duration: duration * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration * 0.7, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    ));
    translateY.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(-30, { duration: duration, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 0 })
      ), -1, false
    ));
    scale.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(1.2, { duration: duration * 0.3 }),
        withTiming(0, { duration: duration * 0.7 })
      ), -1, false
    ));
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute', left: startX, top: startY,
    width: size, height: size, borderRadius: size / 2,
    backgroundColor: color, opacity: opacity.value,
    transform: [{ translateY: translateY.value }, { scale: scale.value }],
  }));

  return <Animated.View style={style} />;
});

// ============================================================================
// SECTION DIVIDER
// ============================================================================
const SectionDivider = React.memo(({ variant = 'rose' }) => {
  const shimmer = useSharedValue(0);
  useEffect(() => {
    shimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
  }, []);

  const lineStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.15, 0.4]),
  }));
  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.3, 0.8]),
    transform: [{ scale: interpolate(shimmer.value, [0, 1], [0.8, 1.2]) }],
  }));

  const color = variant === 'rose' ? SH_COLORS.rose : SH_COLORS.deepPurple;
  const icon = variant === 'rose' ? 'heart' : 'shield-checkmark';

  return (
    <View style={styles.dividerContainer}>
      <Animated.View style={[styles.dividerLine, { backgroundColor: color }, lineStyle]} />
      <Animated.View style={[styles.dividerDot, dotStyle]}>
        <Ionicons name={icon} size={12} color={color} />
      </Animated.View>
      <Animated.View style={[styles.dividerLine, { backgroundColor: color }, lineStyle]} />
    </View>
  );
});

// ============================================================================
// ANIMATED SECTION HEADER
// ============================================================================
const SectionHeader = React.memo(({ title, subtitle, icon, color, viewAll }) => {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.sectionHeaderContainer}>
      <View style={styles.sectionHeaderLeft}>
        {icon && (
          <View style={[styles.sectionIconBadge, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={18} color={color} />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {viewAll && (
        <TouchableOpacity style={styles.viewAllButton}>
          <Text style={[styles.viewAllText, { color }]}>View All</Text>
          <Ionicons name="chevron-forward" size={14} color={color} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
});

// ============================================================================
// SECTION 1: HERO HEADER
// ============================================================================
const HeroSection = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const pulseScale = useSharedValue(1);
  const heartbeat = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 600 });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
    heartbeat.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500 }),
        withTiming(0, { duration: 2500 })
      ), -1, false
    );
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: interpolate(pulseScale.value, [1, 1.06], [0.05, 0.15]),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(heartbeat.value, [0, 1], [0.85, 1]),
  }));

  return (
    <Animated.View style={[styles.heroContainer, heroStyle]}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0.08)', 'rgba(233, 30, 99, 0.02)', COLORS.backgroundPure]}
        style={styles.heroGradient}
      >
        <RoseParticle delay={0} startX={30} startY={20} color="rgba(233,30,99,0.5)" size={4} />
        <RoseParticle delay={700} startX={120} startY={40} color="rgba(123,44,191,0.5)" size={3} />
        <RoseParticle delay={1400} startX={220} startY={15} color="rgba(233,30,99,0.4)" size={5} />
        <RoseParticle delay={2100} startX={300} startY={35} color="rgba(123,44,191,0.4)" size={3} />
        <RoseParticle delay={2800} startX={350} startY={25} color="rgba(233,30,99,0.5)" size={4} />

        <Animated.View style={[styles.heroGlow, pulseStyle]} />

        <View style={styles.heroContent}>
          <View style={styles.heroIconRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="heart" size={16} color={SH_COLORS.rose} />
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>INTIMATE ROSE EDITION</Text>
            </View>
          </View>
          <Animated.Text style={[styles.heroTitle, titleStyle]}>Sexual Health</Animated.Text>
          <Text style={styles.heroSubtitle}>Your wellness, your privacy</Text>
          <Text style={styles.heroDescription}>100% discreet delivery & confidential consultations</Text>

          <View style={styles.heroFeatures}>
            {['Discreet Packaging', 'Doctor Verified', '100% Genuine'].map((f, i) => (
              <View key={i} style={styles.heroFeatureItem}>
                <Ionicons name="checkmark-circle" size={14} color={SH_COLORS.rose} />
                <Text style={styles.heroFeatureText}>{f}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// SECTION 2: SHOP BY CATEGORY
// ============================================================================
const CategoryCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, ANIMATION.spring.press);
    rotation.value = withSpring(3, ANIMATION.spring.bouncy);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
    rotation.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 60)} style={[animStyle, styles.categoryCardWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.categoryCard}>
        <View style={[styles.categoryIcon, { backgroundColor: item.bgColor }]}>
          <Ionicons name={item.icon} size={26} color={item.color} />
        </View>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categoryCount}>{item.count} products</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ShopByCategorySection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Shop by Category" icon="grid" color={SH_COLORS.rose} viewAll />
      <View style={styles.categoryGrid}>
        {SH_DATA.categories.map((item, index) => (
          <CategoryCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 3: BRANDS YOU KNOW & TRUST
// ============================================================================
const BrandCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.94, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 80)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.brandCard}>
        <LinearGradient colors={[item.color + '12', item.color + '05']} style={styles.brandCardGradient}>
          <View style={[styles.brandIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name="business" size={22} color={item.color} />
          </View>
          <Text style={styles.brandName}>{item.name}</Text>
          <View style={styles.brandRating}>
            <Ionicons name="star" size={10} color="#FFB800" />
            <Text style={styles.brandRatingText}>{item.rating}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const TrustedBrandsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Brands You Know & Trust" icon="ribbon" color={SH_COLORS.deepPurple} viewAll />
      <FlatList
        data={SH_DATA.trustedBrands}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <BrandCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 4: SHOP BY CONCERN
// ============================================================================
const ConcernCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.94, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 60)} style={[animStyle, styles.concernCardWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.concernCard}>
        <View style={[styles.concernIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <Text style={styles.concernTitle}>{item.title}</Text>
        <Text style={styles.concernProducts}>{item.products} products</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ShopByConcernSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Shop By Concern" icon="medkit" color={SH_COLORS.rose} viewAll />
      <View style={styles.concernGrid}>
        {SH_DATA.shopByConcern.map((item, index) => (
          <ConcernCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 5: PERFORMANCE PRODUCTS
// ============================================================================
const ProductCard = React.memo(({ item, index, accentColor }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const cardColor = accentColor || SH_COLORS.rose;

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 80)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.productCard}>
        <View style={styles.productCardImage}>
          <LinearGradient colors={[cardColor + '15', cardColor + '08']} style={styles.productCardImageGradient}>
            <Ionicons name="shield-checkmark" size={32} color={cardColor} />
          </LinearGradient>
          <View style={[styles.productDiscount, { backgroundColor: cardColor }]}>
            <Text style={styles.productDiscountText}>{item.discount}% OFF</Text>
          </View>
        </View>
        {item.brand && <Text style={[styles.productBrand, { color: cardColor }]}>{item.brand}</Text>}
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.productRating}>
          <Ionicons name="star" size={10} color="#FFB800" />
          <Text style={styles.productRatingText}>{item.rating}</Text>
        </View>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>&#8377;{item.price}</Text>
          <Text style={styles.productOldPrice}>&#8377;{item.oldPrice}</Text>
        </View>
        <TouchableOpacity style={[styles.productAddButton, { backgroundColor: cardColor }]}>
          <Text style={styles.productAddButtonText}>ADD</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const PerformanceProductsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Support for Your Performance" subtitle="Bestselling products" icon="trending-up" color={SH_COLORS.rose} viewAll />
      <FlatList
        data={SH_DATA.performanceProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ProductCard item={item} index={index} accentColor={SH_COLORS.rose} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 6: PRIVATE ADVICE BANNER
// ============================================================================
const PrivateAdviceBanner = React.memo(() => {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ), -1, false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.2, 0.5]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, 1.1]) }],
  }));

  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.adviceBanner}>
        <LinearGradient colors={SH_COLORS.gradientRose} style={styles.adviceBannerGradient}>
          <Animated.View style={[styles.adviceBannerGlow, pulseStyle]} />
          <View style={styles.adviceBannerContent}>
            <View style={styles.adviceBannerIcon}>
              <Ionicons name="lock-closed" size={32} color={COLORS.textWhite} />
            </View>
            <Text style={styles.adviceBannerTitle}>Private advice for sexual{'\n'}health concerns</Text>
            <Text style={styles.adviceBannerDesc}>Confidential consultations with{'\n'}certified specialists</Text>
            <View style={styles.adviceAskContainer}>
              <Text style={styles.adviceAskLabel}>ASK APOLLO ABOUT...</Text>
              {[
                'What is the treatment for premature ejaculation?',
                'How to improve stamina naturally?',
                'Is erectile dysfunction treatable?',
              ].map((q, i) => (
                <TouchableOpacity key={i} style={styles.adviceAskQuestion}>
                  <Text style={styles.adviceAskQuestionText}>{q}</Text>
                  <Ionicons name="chevron-forward" size={14} color="rgba(255,255,255,0.7)" />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.adviceBannerButton}>
              <Ionicons name="medical" size={16} color={SH_COLORS.rose} />
              <Text style={styles.adviceBannerButtonText}>Dr Just Ask Apollo</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 7: INTIMATE HEALTH PRODUCTS
// ============================================================================
const IntimateHealthSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Support for Your Intimate Health" subtitle="Hygiene & care essentials" icon="sparkles" color={SH_COLORS.tealWellness} viewAll />
      <FlatList
        data={SH_DATA.intimateProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ProductCard item={item} index={index} accentColor={SH_COLORS.tealWellness} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 8: TOP CONDOM BRANDS
// ============================================================================
const CondomBrandCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 100)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.condomBrandCard}>
        <LinearGradient colors={[item.color + '12', '#FFFFFF']} style={styles.condomBrandGradient}>
          <View style={[styles.condomBrandIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name="shield-checkmark" size={28} color={item.color} />
          </View>
          <Text style={styles.condomBrandName}>{item.brand}</Text>
          <Text style={styles.condomBrandTagline}>{item.tagline}</Text>
          <View style={styles.condomBrandMeta}>
            <Text style={styles.condomBrandProducts}>{item.products} products</Text>
            <View style={[styles.condomBrandPopular, { backgroundColor: item.color + '15' }]}>
              <Text style={[styles.condomBrandPopularText, { color: item.color }]}>{item.popular}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.condomBrandExplore, { borderColor: item.color }]}>
            <Text style={[styles.condomBrandExploreText, { color: item.color }]}>Explore</Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const TopCondomBrandsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Explore Condoms from Top Brands" icon="shield-checkmark" color={SH_COLORS.rose} viewAll />
      <FlatList
        data={SH_DATA.topCondomBrands}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <CondomBrandCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 9: WELLNESS TIPS
// ============================================================================
const WellnessTipCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 80)} style={[animStyle, styles.wellnessTipWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.wellnessTipCard}>
        <View style={[styles.wellnessTipIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>
        <View style={styles.wellnessTipInfo}>
          <Text style={styles.wellnessTipTitle}>{item.title}</Text>
          <Text style={styles.wellnessTipDesc} numberOfLines={3}>{item.desc}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
});

const WellnessTipsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Sexual Wellness Tips" subtitle="Expert guidance for better health" icon="bulb" color={SH_COLORS.deepPurple} />
      {SH_DATA.wellnessTips.map((item, index) => (
        <WellnessTipCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 10: DISCREET DELIVERY FEATURES
// ============================================================================
const DiscreetFeatureCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.94, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 100)} style={[animStyle, styles.discreetFeatureWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.discreetFeatureCard}>
        <View style={[styles.discreetFeatureIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <Text style={styles.discreetFeatureTitle}>{item.title}</Text>
        <Text style={styles.discreetFeatureDesc}>{item.desc}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const DiscreetDeliverySection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Your Privacy is Our Priority" icon="lock-closed" color={SH_COLORS.deepPurple} />
      <View style={styles.discreetGrid}>
        {SH_DATA.discreetFeatures.map((item, index) => (
          <DiscreetFeatureCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 11: DOCTOR SPECIALISTS
// ============================================================================
const SpecialistCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 100)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.specialistCard}>
        <LinearGradient colors={['#FFFFFF', '#FFF0F5']} style={styles.specialistGradient}>
          <View style={styles.specialistHeader}>
            <View style={styles.specialistAvatar}>
              <Ionicons name="person" size={26} color={SH_COLORS.rose} />
            </View>
            {item.available && (
              <View style={styles.specialistOnline}>
                <View style={styles.specialistOnlineDot} />
                <Text style={styles.specialistOnlineText}>Online</Text>
              </View>
            )}
          </View>
          <Text style={styles.specialistName}>{item.name}</Text>
          <Text style={styles.specialistSpecialty}>{item.specialty}</Text>
          <View style={styles.specialistMeta}>
            <View style={styles.specialistMetaItem}>
              <Ionicons name="briefcase" size={10} color={COLORS.textTertiary} />
              <Text style={styles.specialistMetaText}>{item.experience}</Text>
            </View>
            <View style={styles.specialistMetaItem}>
              <Ionicons name="star" size={10} color="#FFB800" />
              <Text style={styles.specialistMetaText}>{item.rating}</Text>
            </View>
          </View>
          <View style={styles.specialistFooter}>
            <Text style={styles.specialistFee}>&#8377;{item.fee}</Text>
            <TouchableOpacity style={[styles.specialistConsultButton, !item.available && styles.specialistConsultDisabled]}>
              <Text style={[styles.specialistConsultText, !item.available && styles.specialistConsultTextDisabled]}>
                {item.available ? 'Consult' : 'Busy'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const DoctorSpecialistsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Consult Specialists" subtitle="Confidential consultations" icon="medical" color={SH_COLORS.rose} viewAll />
      <FlatList
        data={SH_DATA.doctorSpecialists}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <SpecialistCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 12: ASK APOLLO
// ============================================================================
const AskApolloSexualHealth = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.askApolloContainer}>
        <View style={styles.askApolloHeader}>
          <View style={styles.askApolloIcon}>
            <Ionicons name="chatbubbles" size={20} color={SH_COLORS.rose} />
          </View>
          <View>
            <Text style={styles.askApolloTitle}>Private advice for sexual{'\n'}health concerns</Text>
            <Text style={styles.askApolloSubtitle}>ASK APOLLO ABOUT...</Text>
          </View>
        </View>
        <View style={styles.askApolloQuestions}>
          {[
            'How to use condoms correctly for maximum protection?',
            'What are the symptoms of common STIs?',
            'Is it normal to experience low libido?',
            'How can I improve my intimate health naturally?',
            'When should I see a sexologist?',
          ].map((q, i) => (
            <TouchableOpacity key={i} style={styles.askApolloQuestion}>
              <Text style={styles.askApolloQuestionText}>{q}</Text>
              <Ionicons name="chevron-forward" size={14} color={COLORS.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={styles.askApolloButton}>
          <Ionicons name="medical" size={16} color={COLORS.textWhite} />
          <Text style={styles.askApolloButtonText}>Dr Just Ask Apollo</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 13: DOCTOR CONSULTATION CTA
// ============================================================================
const DoctorConsultationCTA = React.memo(() => {
  const pulse = useSharedValue(0);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ), -1, false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.3, 0.7]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, 1.05]) }],
  }));

  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.ctaContainer}>
        <LinearGradient colors={SH_COLORS.gradientRose} style={styles.ctaGradient}>
          <Animated.View style={[styles.ctaGlow, pulseStyle]} />
          <View style={styles.ctaContent}>
            <View style={styles.ctaIconContainer}>
              <Ionicons name="lock-closed" size={36} color={COLORS.textWhite} />
            </View>
            <Text style={styles.ctaTitle}>Confidential Doctor{'\n'}Consultation</Text>
            <Text style={styles.ctaDesc}>Speak privately with certified sexual{'\n'}health specialists from home</Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Book Private Consultation</Text>
              <Ionicons name="arrow-forward" size={16} color={SH_COLORS.rose} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// MAIN SEXUAL HEALTH SCREEN
// ============================================================================
const SexualHealthScreen = React.memo(({ scrollY }) => {
  const parallaxStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    return {
      transform: [{
        translateY: interpolate(scrollY.value, [0, 500], [0, -50], Extrapolation.CLAMP),
      }],
    };
  });

  return (
    <Animated.View style={[styles.screenContainer, parallaxStyle]}>
      <HeroSection />

      <ShopByCategorySection />
      <SectionDivider variant="rose" />

      <TrustedBrandsSection />
      <SectionDivider variant="purple" />

      <ShopByConcernSection />
      <SectionDivider variant="rose" />

      <PerformanceProductsSection />
      <SectionDivider variant="purple" />

      <PrivateAdviceBanner />
      <SectionDivider variant="rose" />

      <IntimateHealthSection />
      <SectionDivider variant="purple" />

      <TopCondomBrandsSection />
      <SectionDivider variant="rose" />

      <WellnessTipsSection />
      <SectionDivider variant="purple" />

      <DiscreetDeliverySection />
      <SectionDivider variant="rose" />

      <DoctorSpecialistsSection />
      <SectionDivider variant="purple" />

      <AskApolloSexualHealth />
      <SectionDivider variant="rose" />

      <DoctorConsultationCTA />
      <SectionDivider variant="rose" />

      <Footer />
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  screenContainer: {
    paddingBottom: SPACING.section * 2,
  },

  // DIVIDER
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding + SPACING.xl,
    marginVertical: SPACING.lg,
  },
  dividerLine: { flex: 1, height: 1 },
  dividerDot: { marginHorizontal: SPACING.md },

  // SECTION HEADER
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  sectionIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
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
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  viewAllText: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '600',
  },
  sectionContainer: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section,
  },
  horizontalScrollContent: {
    paddingRight: SPACING.screenPadding,
    gap: SPACING.md,
  },

  // HERO
  heroContainer: { marginBottom: 0 },
  heroGradient: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.screenPadding,
    position: 'relative',
    overflow: 'hidden',
  },
  heroGlow: {
    position: 'absolute',
    top: -50,
    left: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.4,
    height: 150,
    borderRadius: 75,
    backgroundColor: SH_COLORS.rose,
  },
  heroContent: { zIndex: 1 },
  heroIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  heroBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: SH_COLORS.roseFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: SH_COLORS.roseSubtle,
  },
  heroTag: {
    backgroundColor: SH_COLORS.roseFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: SH_COLORS.roseSubtle,
  },
  heroTagText: {
    ...TYPOGRAPHY.badge,
    color: SH_COLORS.rose,
    letterSpacing: 1.5,
    fontSize: 9,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: SPACING.xs,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.h4,
    color: SH_COLORS.rose,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  heroDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
    marginBottom: SPACING.lg,
  },
  heroFeatures: {
    gap: SPACING.sm,
  },
  heroFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  heroFeatureText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },

  // CATEGORY GRID
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  categoryCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 3) / 4,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 14,
    minHeight: 28,
  },
  categoryCount: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 8,
    marginTop: 2,
  },

  // BRAND CARDS
  brandCard: {
    width: 100,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  brandCardGradient: {
    padding: SPACING.md,
    alignItems: 'center',
    minHeight: 110,
  },
  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  brandName: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  brandRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  brandRatingText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textSecondary,
    fontSize: 9,
  },

  // CONCERN GRID
  concernGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  concernCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 3) / 4,
  },
  concernCard: {
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    minHeight: 110,
  },
  concernIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  concernTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 14,
    minHeight: 28,
  },
  concernProducts: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 8,
    marginTop: 2,
  },

  // PRODUCT CARDS
  productCard: {
    width: 150,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.cardSoft,
  },
  productCardImage: {
    width: '100%',
    height: 100,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  productCardImageGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productDiscount: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  productDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontSize: 8,
  },
  productBrand: {
    ...TYPOGRAPHY.badge,
    fontWeight: '700',
    fontSize: 9,
    marginBottom: 2,
  },
  productName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    minHeight: 32,
    fontSize: 11,
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: SPACING.xs,
  },
  productRatingText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  productPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  productPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
  },
  productOldPrice: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    fontSize: 10,
  },
  productAddButton: {
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  productAddButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },

  // ADVICE BANNER
  adviceBanner: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  adviceBannerGradient: {
    padding: SPACING.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  adviceBannerGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  adviceBannerContent: { zIndex: 1 },
  adviceBannerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  adviceBannerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textWhite,
    marginBottom: SPACING.sm,
  },
  adviceBannerDesc: {
    ...TYPOGRAPHY.bodyMedium,
    color: 'rgba(255,255,255,0.85)',
    marginBottom: SPACING.lg,
  },
  adviceAskContainer: {
    marginBottom: SPACING.lg,
  },
  adviceAskLabel: {
    ...TYPOGRAPHY.badge,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.5,
    marginBottom: SPACING.md,
  },
  adviceAskQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.15)',
  },
  adviceAskQuestionText: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.9)',
    flex: 1,
  },
  adviceBannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.cardWhite,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.button,
    gap: SPACING.sm,
  },
  adviceBannerButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: SH_COLORS.rose,
    fontWeight: '700',
  },

  // CONDOM BRANDS
  condomBrandCard: {
    width: SCREEN_WIDTH * 0.48,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  condomBrandGradient: {
    padding: SPACING.lg,
    minHeight: 200,
  },
  condomBrandIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  condomBrandName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  condomBrandTagline: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
    marginBottom: SPACING.md,
  },
  condomBrandMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  condomBrandProducts: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  condomBrandPopular: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  condomBrandPopularText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
  },
  condomBrandExplore: {
    borderWidth: 1.5,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  condomBrandExploreText: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '700',
  },

  // WELLNESS TIPS
  wellnessTipWrapper: {
    marginBottom: SPACING.sm,
  },
  wellnessTipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    gap: SPACING.md,
  },
  wellnessTipIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wellnessTipInfo: { flex: 1 },
  wellnessTipTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  wellnessTipDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 16,
  },

  // DISCREET FEATURES
  discreetGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  discreetFeatureWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md) / 2,
  },
  discreetFeatureCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    alignItems: 'center',
    ...SHADOWS.cardSoft,
    minHeight: 130,
  },
  discreetFeatureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  discreetFeatureTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  discreetFeatureDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: 16,
  },

  // SPECIALIST CARDS
  specialistCard: {
    width: SCREEN_WIDTH * 0.55,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  specialistGradient: {
    padding: SPACING.lg,
  },
  specialistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  specialistAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: SH_COLORS.roseFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: SH_COLORS.roseSubtle,
  },
  specialistOnline: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,166,81,0.10)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  specialistOnlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00A651',
  },
  specialistOnlineText: {
    ...TYPOGRAPHY.badge,
    color: '#00A651',
    fontSize: 9,
  },
  specialistName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  specialistSpecialty: {
    ...TYPOGRAPHY.bodySmall,
    color: SH_COLORS.rose,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  specialistMeta: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  specialistMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  specialistMetaText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  specialistFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
  },
  specialistFee: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  specialistConsultButton: {
    backgroundColor: SH_COLORS.rose,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.button,
  },
  specialistConsultDisabled: {
    backgroundColor: COLORS.backgroundMuted,
  },
  specialistConsultText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  specialistConsultTextDisabled: {
    color: COLORS.textTertiary,
  },

  // ASK APOLLO
  askApolloContainer: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    ...SHADOWS.cardSoft,
  },
  askApolloHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  askApolloIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: SH_COLORS.roseFaded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  askApolloTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    lineHeight: 18,
  },
  askApolloSubtitle: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  askApolloQuestions: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  askApolloQuestion: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    backgroundColor: COLORS.backgroundMuted,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  askApolloQuestionText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
  },
  askApolloButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: SH_COLORS.rose,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.button,
    gap: SPACING.sm,
  },
  askApolloButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textWhite,
    fontWeight: '700',
  },

  // CTA
  ctaContainer: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  ctaGradient: {
    padding: SPACING.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  ctaContent: { zIndex: 1, alignItems: 'center' },
  ctaIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  ctaTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textWhite,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  ctaDesc: {
    ...TYPOGRAPHY.bodyMedium,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    gap: SPACING.sm,
    ...SHADOWS.button,
  },
  ctaButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: SH_COLORS.rose,
    fontWeight: '700',
  },
});

export default SexualHealthScreen;
