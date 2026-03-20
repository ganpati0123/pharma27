/**
 * ============================================================================
 * APOLLO 24/7 - BABY & MOTHER CARE SCREEN (SOFT SKY BLUE EDITION)
 * ============================================================================
 *
 * Premium Baby & Mother Care vertical screen — 3+ scrolls deep
 * Built with the precision of a FAANG principal architect.
 *
 * Sections (top to bottom):
 * 1. Hero Header with soft sky blue animation
 * 2. Shop by Category (8 categories grid)
 * 3. Everything Your Little One Needs (product carousel)
 * 4. Best Diaper Brands (6 brand cards)
 * 5. Feeding Essentials (product carousel)
 * 6. Bath & Skin Care (product carousel)
 * 7. Baby Food & Nutrition (product carousel)
 * 8. Shop By Age (5 age group cards)
 * 9. Brand Spotlight (8 brand carousel)
 * 10. Expert Tips & Guides (8 articles)
 * 11. Mother Care Products (product carousel)
 * 12. Health & Safety Products (product carousel)
 * 13. Baby Milestones Tracker (6 milestone cards)
 * 14. Toy Categories (6 toy cards)
 * 15. Vaccination Schedule (8 schedule items)
 * 16. Nursery Essentials (6 nursery items)
 * 17. FAQ Section (6 FAQs)
 * 18. Ask Apollo Baby
 * 19. Doctor Consultation CTA
 * 20. Footer
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
import { BB_COLORS, BB_DATA } from './BabyTheme';
import { Footer } from '../home/DiscoverSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// SKY PARTICLE (Soft floating bubbles)
// ============================================================================
const SkyParticle = React.memo(({ delay, startX, startY, color, size }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const duration = 4000 + Math.random() * 3000;
    opacity.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(0.6, { duration: duration * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration * 0.7, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    ));
    translateY.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(-25, { duration: duration, easing: Easing.out(Easing.ease) }),
        withTiming(0, { duration: 0 })
      ), -1, false
    ));
    translateX.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(8, { duration: duration * 0.5, easing: Easing.inOut(Easing.ease) }),
        withTiming(-8, { duration: duration * 0.5, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    ));
    scale.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(1.3, { duration: duration * 0.3 }),
        withTiming(0, { duration: duration * 0.7 })
      ), -1, false
    ));
  }, [delay]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    left: startX,
    top: startY,
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: color,
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
      { scale: scale.value },
    ],
  }));

  return <Animated.View style={style} />;
});

// ============================================================================
// SECTION DIVIDER (Baby-themed with star/heart icons)
// ============================================================================
const SectionDivider = React.memo(({ variant = 'blue' }) => {
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
    opacity: interpolate(shimmer.value, [0, 1], [0.12, 0.35]),
  }));
  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.3, 0.85]),
    transform: [{ scale: interpolate(shimmer.value, [0, 1], [0.8, 1.2]) }],
  }));

  const colorMap = {
    blue: BB_COLORS.skyBlue,
    pink: BB_COLORS.candyPink,
    green: BB_COLORS.mintGreen,
    yellow: BB_COLORS.sunshineYellow,
    purple: BB_COLORS.lavenderPurple,
    coral: BB_COLORS.coralOrange,
  };
  const iconMap = {
    blue: 'star',
    pink: 'heart',
    green: 'leaf',
    yellow: 'sunny',
    purple: 'moon',
    coral: 'happy',
  };

  const color = colorMap[variant] || BB_COLORS.skyBlue;
  const icon = iconMap[variant] || 'star';

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
const SectionHeader = React.memo(({ title, subtitle, icon, color, viewAll, badge }) => {
  return (
    <Animated.View entering={FadeInDown.duration(600).delay(100)} style={styles.sectionHeaderContainer}>
      <View style={styles.sectionHeaderLeft}>
        {icon && (
          <View style={[styles.sectionIconBadge, { backgroundColor: color + '15' }]}>
            <Ionicons name={icon} size={18} color={color} />
          </View>
        )}
        <View style={{ flex: 1 }}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {badge && (
              <View style={[styles.sectionBadge, { backgroundColor: color + '15' }]}>
                <Text style={[styles.sectionBadgeText, { color }]}>{badge}</Text>
              </View>
            )}
          </View>
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
  const titleShimmer = useSharedValue(0);
  const starRotate = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 600 });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
    titleShimmer.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2500 }),
        withTiming(0, { duration: 2500 })
      ), -1, false
    );
    starRotate.value = withRepeat(
      withTiming(360, { duration: 12000, easing: Easing.linear }),
      -1, false
    );
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: interpolate(pulseScale.value, [1, 1.05], [0.04, 0.12]),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(titleShimmer.value, [0, 1], [0.88, 1]),
  }));
  const starStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${starRotate.value}deg` }],
  }));

  return (
    <Animated.View style={[styles.heroContainer, heroStyle]}>
      <LinearGradient
        colors={['rgba(66, 165, 245, 0.08)', 'rgba(244, 143, 177, 0.04)', COLORS.backgroundPure]}
        style={styles.heroGradient}
      >
        <SkyParticle delay={0} startX={25} startY={18} color="rgba(66,165,245,0.45)" size={5} />
        <SkyParticle delay={600} startX={110} startY={38} color="rgba(244,143,177,0.45)" size={4} />
        <SkyParticle delay={1200} startX={200} startY={12} color="rgba(102,187,106,0.40)" size={6} />
        <SkyParticle delay={1800} startX={290} startY={32} color="rgba(255,213,79,0.40)" size={4} />
        <SkyParticle delay={2400} startX={340} startY={22} color="rgba(186,104,200,0.40)" size={5} />
        <SkyParticle delay={3000} startX={70} startY={45} color="rgba(66,165,245,0.35)" size={3} />
        <SkyParticle delay={3600} startX={160} startY={50} color="rgba(244,143,177,0.35)" size={4} />

        <Animated.View style={[styles.heroGlow, pulseStyle]} />

        <View style={styles.heroContent}>
          <View style={styles.heroIconRow}>
            <View style={styles.heroBadge}>
              <Animated.View style={starStyle}>
                <Ionicons name="star" size={16} color={BB_COLORS.skyBlue} />
              </Animated.View>
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>SOFT SKY BLUE EDITION</Text>
            </View>
          </View>
          <Animated.Text style={[styles.heroTitle, titleStyle]}>Baby & Mother</Animated.Text>
          <Text style={styles.heroSubtitle}>Everything for your little star</Text>
          <Text style={styles.heroDescription}>Premium baby care products from trusted brands</Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>5000+</Text>
              <Text style={styles.heroStatLabel}>Products</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>100+</Text>
              <Text style={styles.heroStatLabel}>Brands</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>4.7</Text>
              <Text style={styles.heroStatLabel}>Rating</Text>
            </View>
          </View>

          <View style={styles.heroFeatures}>
            {['100% Genuine', 'Safe & Tested', 'Free Returns'].map((f, i) => (
              <View key={i} style={styles.heroFeatureItem}>
                <Ionicons name="checkmark-circle" size={14} color={BB_COLORS.skyBlue} />
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
    scale.value = withSpring(0.90, ANIMATION.spring.press);
    rotation.value = withSpring(4, ANIMATION.spring.bouncy);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
    rotation.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 70)} style={[animStyle, styles.categoryCardWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.categoryCard}>
        <View style={[styles.categoryIcon, { backgroundColor: item.bgColor }]}>
          <Ionicons name={item.icon} size={26} color={item.color} />
        </View>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categoryCount}>{item.count} items</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ShopByCategorySection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Shop by Category" icon="grid" color={BB_COLORS.skyBlue} viewAll />
      <View style={styles.categoryGrid}>
        {BB_DATA.categories.map((item, index) => (
          <CategoryCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 3: EVERYTHING YOUR LITTLE ONE NEEDS (Product carousel)
// ============================================================================
const BabyProductCard = React.memo(({ item, index, accentColor }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  const cardColor = accentColor || item.color || BB_COLORS.skyBlue;

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 80)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.productCard}>
        <View style={styles.productImage}>
          <LinearGradient colors={[cardColor + '15', cardColor + '06']} style={styles.productImageGradient}>
            <Ionicons name={item.icon || 'happy'} size={30} color={cardColor} />
          </LinearGradient>
          <View style={[styles.productDiscount, { backgroundColor: cardColor }]}>
            <Text style={styles.productDiscountText}>{item.discount}% OFF</Text>
          </View>
        </View>
        {item.brand && <Text style={[styles.productBrand, { color: cardColor }]}>{item.brand}</Text>}
        {item.category && (
          <View style={[styles.productCategoryBadge, { backgroundColor: cardColor + '10' }]}>
            <Text style={[styles.productCategoryText, { color: cardColor }]}>{item.category}</Text>
          </View>
        )}
        <Text style={styles.productName} numberOfLines={2}>{item.name || item.title}</Text>
        <View style={styles.productRating}>
          <Ionicons name="star" size={10} color="#FFB800" />
          <Text style={styles.productRatingText}>{item.rating}</Text>
        </View>
        <View style={styles.productPriceRow}>
          <Text style={styles.productPrice}>&#8377;{item.price}</Text>
          <Text style={styles.productOldPrice}>&#8377;{item.oldPrice}</Text>
        </View>
        {item.age && (
          <View style={[styles.productAgeBadge, { backgroundColor: cardColor + '10' }]}>
            <Ionicons name="happy" size={10} color={cardColor} />
            <Text style={[styles.productAgeText, { color: cardColor }]}>{item.age}</Text>
          </View>
        )}
        <TouchableOpacity style={[styles.productAddButton, { backgroundColor: cardColor }]}>
          <Text style={styles.productAddButtonText}>ADD</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const EverythingBabyNeedsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader
        title="Everything Your Little One Needs"
        subtitle="Curated essentials for every stage"
        icon="happy"
        color={BB_COLORS.skyBlue}
        viewAll
        badge="POPULAR"
      />
      <FlatList
        data={BB_DATA.essentialNeeds}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <BabyProductCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 4: BEST DIAPER BRANDS
// ============================================================================
const DiaperBrandCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 100)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.diaperBrandCard}>
        <LinearGradient colors={[item.color + '12', '#FFFFFF']} style={styles.diaperBrandGradient}>
          <View style={[styles.diaperBrandIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name="water" size={28} color={item.color} />
          </View>
          <Text style={styles.diaperBrandName}>{item.brand}</Text>
          <Text style={styles.diaperBrandTagline}>{item.tagline}</Text>
          <View style={styles.diaperBrandMeta}>
            <View style={styles.diaperBrandRating}>
              <Ionicons name="star" size={10} color="#FFB800" />
              <Text style={styles.diaperBrandRatingText}>{item.rating}</Text>
            </View>
            <Text style={styles.diaperBrandProducts}>{item.products} products</Text>
          </View>
          <View style={styles.diaperBrandInfoRow}>
            <View style={[styles.diaperBrandPopular, { backgroundColor: item.color + '15' }]}>
              <Text style={[styles.diaperBrandPopularText, { color: item.color }]}>{item.popular}</Text>
            </View>
            <View style={styles.diaperBrandSize}>
              <Text style={styles.diaperBrandSizeText}>{item.size}</Text>
            </View>
          </View>
          <TouchableOpacity style={[styles.diaperBrandExplore, { borderColor: item.color }]}>
            <Text style={[styles.diaperBrandExploreText, { color: item.color }]}>Shop Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const DiaperBrandsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Best Diaper Brands" subtitle="Trusted by millions of parents" icon="water" color={BB_COLORS.skyBlue} viewAll />
      <FlatList
        data={BB_DATA.diaperBrands}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <DiaperBrandCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 5: FEEDING ESSENTIALS
// ============================================================================
const FeedingSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Feeding Essentials" subtitle="Bottles, pumps & accessories" icon="cafe" color={BB_COLORS.coralOrange} viewAll />
      <FlatList
        data={BB_DATA.feedingProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BabyProductCard item={{ ...item, icon: 'cafe', color: BB_COLORS.coralOrange }} index={index} accentColor={BB_COLORS.coralOrange} />
        )}
      />
    </View>
  );
});

// ============================================================================
// SECTION 6: BATH & SKIN CARE
// ============================================================================
const BathSkinCareSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Bath & Skin Care" subtitle="Gentle care for delicate skin" icon="water" color={BB_COLORS.candyPink} viewAll />
      <FlatList
        data={BB_DATA.bathProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BabyProductCard item={{ ...item, icon: 'flower', color: BB_COLORS.candyPink }} index={index} accentColor={BB_COLORS.candyPink} />
        )}
      />
    </View>
  );
});

// ============================================================================
// SECTION 7: BABY FOOD & NUTRITION
// ============================================================================
const BabyFoodSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Baby Food & Nutrition" subtitle="Age-appropriate nutrition" icon="nutrition" color={BB_COLORS.mintGreen} viewAll />
      <FlatList
        data={BB_DATA.babyFoodProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BabyProductCard item={{ ...item, icon: 'nutrition', color: BB_COLORS.mintGreen }} index={index} accentColor={BB_COLORS.mintGreen} />
        )}
      />
    </View>
  );
});

// ============================================================================
// SECTION 8: SHOP BY AGE
// ============================================================================
const AgeGroupCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 80)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.ageGroupCard}>
        <View style={[styles.ageGroupIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.ageGroupInfo}>
          <Text style={styles.ageGroupTitle}>{item.title}</Text>
          <Text style={styles.ageGroupDesc} numberOfLines={2}>{item.desc}</Text>
          <Text style={styles.ageGroupProducts}>{item.products} products</Text>
          <View style={styles.ageGroupKeyItems}>
            {item.keyItems.map((keyItem, i) => (
              <View key={i} style={[styles.ageGroupChip, { backgroundColor: item.color + '10' }]}>
                <Text style={[styles.ageGroupChipText, { color: item.color }]}>{keyItem}</Text>
              </View>
            ))}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
});

const ShopByAgeSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Shop By Age" subtitle="Find products for every stage" icon="people" color={BB_COLORS.skyBlue} />
      {BB_DATA.shopByAge.map((item, index) => (
        <AgeGroupCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 9: BRAND SPOTLIGHT
// ============================================================================
const BrandSpotlightCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 80)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.brandCard}>
        <LinearGradient colors={[item.color + '12', '#FFFFFF']} style={styles.brandGradient}>
          <View style={[styles.brandIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name="business" size={24} color={item.color} />
          </View>
          <Text style={styles.brandName}>{item.name}</Text>
          <Text style={styles.brandTagline}>{item.tagline}</Text>
          <View style={[styles.brandCategoryBadge, { backgroundColor: item.color + '10' }]}>
            <Text style={[styles.brandCategoryText, { color: item.color }]}>{item.category}</Text>
          </View>
          <View style={styles.brandFooter}>
            <View style={styles.brandRating}>
              <Ionicons name="star" size={10} color="#FFB800" />
              <Text style={styles.brandRatingText}>{item.rating}</Text>
            </View>
            <Text style={styles.brandProducts}>{item.products} products</Text>
          </View>
          <TouchableOpacity style={[styles.brandExplore, { borderColor: item.color }]}>
            <Text style={[styles.brandExploreText, { color: item.color }]}>Explore</Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const BrandSpotlightSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Brand Spotlight" subtitle="Brands parents love" icon="ribbon" color={BB_COLORS.lavenderPurple} viewAll />
      <FlatList
        data={BB_DATA.brandSpotlight}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <BrandSpotlightCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 10: EXPERT TIPS & GUIDES
// ============================================================================
const ExpertTipCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 80)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.expertTipCard}>
        <LinearGradient colors={[item.color + '10', '#FFFFFF']} style={styles.expertTipGradient}>
          <View style={styles.expertTipHeader}>
            <View style={[styles.expertTipIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <View style={styles.expertTipReadTime}>
              <Ionicons name="time" size={10} color={COLORS.textTertiary} />
              <Text style={styles.expertTipReadTimeText}>{item.readTime}</Text>
            </View>
          </View>
          <Text style={styles.expertTipTitle}>{item.title}</Text>
          <Text style={styles.expertTipDesc} numberOfLines={3}>{item.desc}</Text>
          <View style={styles.expertTipFooter}>
            <Text style={[styles.expertTipReadMore, { color: item.color }]}>Read More</Text>
            <Ionicons name="arrow-forward" size={14} color={item.color} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ExpertTipsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Expert Tips & Guides" subtitle="From pediatricians & parents" icon="school" color={BB_COLORS.softTeal} viewAll />
      <FlatList
        data={BB_DATA.expertTips}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ExpertTipCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 11: MOTHER CARE PRODUCTS
// ============================================================================
const MotherCareSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Mother Care" subtitle="For the superhero mom" icon="heart" color={BB_COLORS.candyPink} viewAll badge="NEW" />
      <FlatList
        data={BB_DATA.motherCareProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BabyProductCard item={{ ...item, icon: 'heart', color: BB_COLORS.candyPink }} index={index} accentColor={BB_COLORS.candyPink} />
        )}
      />
    </View>
  );
});

// ============================================================================
// SECTION 12: HEALTH & SAFETY PRODUCTS
// ============================================================================
const HealthSafetySection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Health & Safety" subtitle="Keep your baby safe & healthy" icon="shield-checkmark" color={BB_COLORS.softTeal} viewAll />
      <FlatList
        data={BB_DATA.healthSafetyProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <BabyProductCard item={{ ...item, icon: 'shield-checkmark', color: BB_COLORS.softTeal }} index={index} accentColor={BB_COLORS.softTeal} />
        )}
      />
    </View>
  );
});

// ============================================================================
// SECTION 13: BABY MILESTONES TRACKER
// ============================================================================
const MilestoneCard = React.memo(({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.97, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 80)} style={animStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => setExpanded(!expanded)}
        style={[styles.milestoneCard, expanded && { borderColor: item.color + '30' }]}
      >
        <View style={styles.milestoneHeader}>
          <View style={[styles.milestoneIcon, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon} size={22} color={item.color} />
          </View>
          <View style={styles.milestoneHeaderInfo}>
            <Text style={[styles.milestoneMonth, { color: item.color }]}>{item.month}</Text>
            <Text style={styles.milestoneTitle}>{item.title}</Text>
          </View>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={item.color} />
        </View>
        {expanded && (
          <Animated.View entering={FadeInDown.duration(300)} style={styles.milestoneContent}>
            {item.milestones.map((milestone, i) => (
              <View key={i} style={styles.milestoneItem}>
                <View style={[styles.milestoneBullet, { backgroundColor: item.color }]} />
                <Text style={styles.milestoneText}>{milestone}</Text>
              </View>
            ))}
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

const MilestonesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Baby Milestones" subtitle="Track your baby's development" icon="analytics" color={BB_COLORS.skyBlue} />
      {BB_DATA.milestones.map((item, index) => (
        <MilestoneCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 14: TOY CATEGORIES
// ============================================================================
const ToyCategoryCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.93, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 80)} style={[animStyle, styles.toyCategoryWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.toyCategoryCard}>
        <LinearGradient colors={[item.color + '12', item.color + '05']} style={styles.toyCategoryGradient}>
          <View style={[styles.toyCategoryIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={26} color={item.color} />
          </View>
          <Text style={styles.toyCategoryTitle}>{item.title}</Text>
          <Text style={styles.toyCategoryDesc}>{item.desc}</Text>
          <Text style={[styles.toyCategoryPrice, { color: item.color }]}>{item.priceRange}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ToyCategoriesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Toys & Development" subtitle="Play, learn & grow" icon="happy" color={BB_COLORS.sunshineYellow} viewAll />
      <View style={styles.toyCategoryGrid}>
        {BB_DATA.toyCategories.map((item, index) => (
          <ToyCategoryCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 15: VACCINATION SCHEDULE
// ============================================================================
const VaccinationItem = React.memo(({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 60)} style={animStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => setExpanded(!expanded)}
        style={[styles.vaccinationItem, expanded && { borderColor: item.color + '30' }]}
      >
        <View style={styles.vaccinationHeader}>
          <View style={[styles.vaccinationTimeline, { backgroundColor: item.color }]}>
            <View style={styles.vaccinationDot} />
          </View>
          <View style={styles.vaccinationInfo}>
            <Text style={[styles.vaccinationAge, { color: item.color }]}>{item.age}</Text>
            <Text style={styles.vaccinationCount}>{item.vaccines.length} vaccines</Text>
          </View>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={item.color} />
        </View>
        {expanded && (
          <Animated.View entering={FadeInDown.duration(300)} style={styles.vaccinationList}>
            {item.vaccines.map((vaccine, i) => (
              <View key={i} style={styles.vaccinationVaccineItem}>
                <Ionicons name="checkmark-circle" size={14} color={item.color} />
                <Text style={styles.vaccinationVaccineText}>{vaccine}</Text>
              </View>
            ))}
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

const VaccinationScheduleSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Vaccination Schedule" subtitle="Never miss an immunization" icon="shield-checkmark" color={BB_COLORS.softTeal} />
      {BB_DATA.vaccinationSchedule.map((item, index) => (
        <VaccinationItem key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 16: NURSERY ESSENTIALS
// ============================================================================
const NurseryCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 80)} style={[animStyle, styles.nurseryWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.nurseryCard}>
        <View style={[styles.nurseryIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>
        <View style={styles.nurseryInfo}>
          <Text style={styles.nurseryTitle}>{item.title}</Text>
          <Text style={styles.nurseryDesc}>{item.desc}</Text>
          <Text style={[styles.nurseryPrice, { color: item.color }]}>{item.priceRange}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
});

const NurseryEssentialsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Nursery Essentials" subtitle="Set up baby's room" icon="home" color={BB_COLORS.lavenderPurple} viewAll />
      {BB_DATA.nurseryEssentials.map((item, index) => (
        <NurseryCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 17: FAQ SECTION
// ============================================================================
const FAQItem = React.memo(({ item, index }) => {
  const [expanded, setExpanded] = useState(false);
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.98, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 60)} style={animStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => setExpanded(!expanded)}
        style={[styles.faqItem, expanded && styles.faqItemExpanded]}
      >
        <View style={styles.faqHeader}>
          <View style={styles.faqQuestionRow}>
            <View style={styles.faqNumberBadge}>
              <Text style={styles.faqNumber}>{index + 1}</Text>
            </View>
            <Text style={styles.faqQuestion}>{item.question}</Text>
          </View>
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={BB_COLORS.skyBlue} />
        </View>
        {expanded && (
          <Animated.View entering={FadeInDown.duration(300)} style={styles.faqAnswer}>
            <Text style={styles.faqAnswerText}>{item.answer}</Text>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

const FAQSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Frequently Asked Questions" icon="help-circle" color={BB_COLORS.skyBlue} />
      {BB_DATA.faqData.map((item, index) => (
        <FAQItem key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 18: ASK APOLLO BABY
// ============================================================================
const AskApolloBaby = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.askApolloContainer}>
        <View style={styles.askApolloHeader}>
          <View style={styles.askApolloIcon}>
            <Ionicons name="chatbubbles" size={20} color={BB_COLORS.skyBlue} />
          </View>
          <View>
            <Text style={styles.askApolloTitle}>Expert baby care advice{'\n'}at your fingertips</Text>
            <Text style={styles.askApolloSubtitle}>ASK APOLLO ABOUT...</Text>
          </View>
        </View>
        <View style={styles.askApolloQuestions}>
          {[
            'When should I start solid foods for my baby?',
            'What diaper size is right for my newborn?',
            'How often should I bathe my baby?',
            'Which baby products are safe for sensitive skin?',
            'What are the must-have items for a newborn?',
            'How to soothe a teething baby naturally?',
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
// SECTION 19: DOCTOR CONSULTATION CTA
// ============================================================================
const DoctorConsultationCTA = React.memo(() => {
  const pulse = useSharedValue(0);
  const starRotate = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ), -1, false
    );
    starRotate.value = withRepeat(
      withTiming(360, { duration: 15000, easing: Easing.linear }),
      -1, false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.3, 0.7]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, 1.05]) }],
  }));
  const starStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${starRotate.value}deg` }],
  }));

  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.ctaContainer}>
        <LinearGradient colors={BB_COLORS.gradientSkyBlue} style={styles.ctaGradient}>
          <Animated.View style={[styles.ctaGlow, pulseStyle]} />
          <View style={styles.ctaContent}>
            <View style={styles.ctaIconContainer}>
              <Animated.View style={starStyle}>
                <Ionicons name="star" size={32} color={COLORS.textWhite} />
              </Animated.View>
            </View>
            <Text style={styles.ctaTitle}>Consult a Paediatrician</Text>
            <Text style={styles.ctaDesc}>Get expert guidance for your{'\n'}baby's health & development</Text>
            <View style={styles.ctaFeatures}>
              {['24/7 Available', 'Verified Doctors', 'E-Prescription'].map((f, i) => (
                <View key={i} style={styles.ctaFeatureItem}>
                  <Ionicons name="checkmark-circle" size={14} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.ctaFeatureText}>{f}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Book Consultation</Text>
              <Ionicons name="arrow-forward" size={16} color={BB_COLORS.skyBlue} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// MAIN BABY SCREEN
// ============================================================================
const BabyScreen = React.memo(({ scrollY }) => {
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
      <SectionDivider variant="blue" />

      <EverythingBabyNeedsSection />
      <SectionDivider variant="pink" />

      <DiaperBrandsSection />
      <SectionDivider variant="blue" />

      <FeedingSection />
      <SectionDivider variant="coral" />

      <BathSkinCareSection />
      <SectionDivider variant="pink" />

      <BabyFoodSection />
      <SectionDivider variant="green" />

      <ShopByAgeSection />
      <SectionDivider variant="blue" />

      <BrandSpotlightSection />
      <SectionDivider variant="purple" />

      <ExpertTipsSection />
      <SectionDivider variant="green" />

      <MotherCareSection />
      <SectionDivider variant="pink" />

      <HealthSafetySection />
      <SectionDivider variant="blue" />

      <MilestonesSection />
      <SectionDivider variant="yellow" />

      <ToyCategoriesSection />
      <SectionDivider variant="purple" />

      <VaccinationScheduleSection />
      <SectionDivider variant="green" />

      <NurseryEssentialsSection />
      <SectionDivider variant="blue" />

      <FAQSection />
      <SectionDivider variant="pink" />

      <AskApolloBaby />
      <SectionDivider variant="blue" />

      <DoctorConsultationCTA />
      <SectionDivider variant="blue" />

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
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  sectionBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  sectionBadgeText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '800',
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
    left: SCREEN_WIDTH * 0.25,
    width: SCREEN_WIDTH * 0.5,
    height: 160,
    borderRadius: 80,
    backgroundColor: BB_COLORS.skyBlue,
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
    backgroundColor: BB_COLORS.skyBlueFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: BB_COLORS.skyBlueSubtle,
  },
  heroTag: {
    backgroundColor: BB_COLORS.skyBlueFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: BB_COLORS.skyBlueSubtle,
  },
  heroTagText: {
    ...TYPOGRAPHY.badge,
    color: BB_COLORS.skyBlue,
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
    color: BB_COLORS.skyBlue,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  heroDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
    marginBottom: SPACING.lg,
  },
  heroStats: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    ...SHADOWS.cardSoft,
    marginBottom: SPACING.lg,
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    ...TYPOGRAPHY.h3,
    color: BB_COLORS.skyBlue,
    fontWeight: '800',
  },
  heroStatLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  heroStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.dividerLight,
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
    width: 50,
    height: 50,
    borderRadius: 25,
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

  // PRODUCT CARDS (shared across multiple sections)
  productCard: {
    width: 155,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.cardSoft,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  productImageGradient: {
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
  productCategoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 1,
    borderRadius: RADIUS.xs,
    alignSelf: 'flex-start',
    marginBottom: SPACING.xs,
  },
  productCategoryText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
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
  productAgeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  productAgeText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
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

  // DIAPER BRANDS
  diaperBrandCard: {
    width: SCREEN_WIDTH * 0.52,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  diaperBrandGradient: {
    padding: SPACING.lg,
    minHeight: 250,
  },
  diaperBrandIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  diaperBrandName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  diaperBrandTagline: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
    marginBottom: SPACING.md,
  },
  diaperBrandMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  diaperBrandRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  diaperBrandRatingText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  diaperBrandProducts: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  diaperBrandInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  diaperBrandPopular: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  diaperBrandPopularText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
  },
  diaperBrandSize: {
    backgroundColor: COLORS.backgroundMuted,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  diaperBrandSizeText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 8,
  },
  diaperBrandExplore: {
    borderWidth: 1.5,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  diaperBrandExploreText: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '700',
  },

  // AGE GROUPS
  ageGroupCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    gap: SPACING.md,
  },
  ageGroupIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ageGroupInfo: { flex: 1 },
  ageGroupTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  ageGroupDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 16,
    marginBottom: SPACING.xs,
  },
  ageGroupProducts: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textSecondary,
    fontSize: 9,
    marginBottom: SPACING.sm,
  },
  ageGroupKeyItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  ageGroupChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  ageGroupChipText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
  },

  // BRAND SPOTLIGHT
  brandCard: {
    width: SCREEN_WIDTH * 0.48,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  brandGradient: {
    padding: SPACING.lg,
    minHeight: 230,
  },
  brandIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  brandName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  brandTagline: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
    marginBottom: SPACING.sm,
  },
  brandCategoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  brandCategoryText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
  },
  brandFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  brandRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  brandRatingText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  brandProducts: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  brandExplore: {
    borderWidth: 1.5,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  brandExploreText: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '700',
  },

  // EXPERT TIPS
  expertTipCard: {
    width: SCREEN_WIDTH * 0.65,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  expertTipGradient: {
    padding: SPACING.lg,
    minHeight: 210,
  },
  expertTipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  expertTipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expertTipReadTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  expertTipReadTimeText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 9,
  },
  expertTipTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  expertTipDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  expertTipFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expertTipReadMore: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '600',
  },

  // MILESTONES
  milestoneCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  milestoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  milestoneIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneHeaderInfo: { flex: 1 },
  milestoneMonth: {
    ...TYPOGRAPHY.badge,
    fontWeight: '700',
    fontSize: 10,
  },
  milestoneTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginTop: 1,
  },
  milestoneContent: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
    gap: SPACING.sm,
  },
  milestoneItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  milestoneBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  milestoneText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },

  // TOY CATEGORIES
  toyCategoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  toyCategoryWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md) / 2,
  },
  toyCategoryCard: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  toyCategoryGradient: {
    padding: SPACING.lg,
    alignItems: 'center',
    minHeight: 160,
  },
  toyCategoryIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  toyCategoryTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  toyCategoryDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginBottom: SPACING.sm,
    lineHeight: 15,
  },
  toyCategoryPrice: {
    ...TYPOGRAPHY.badge,
    fontWeight: '700',
    fontSize: 10,
  },

  // VACCINATION
  vaccinationItem: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  vaccinationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  vaccinationTimeline: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaccinationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.textWhite,
  },
  vaccinationInfo: { flex: 1 },
  vaccinationAge: {
    ...TYPOGRAPHY.labelLarge,
    fontWeight: '700',
  },
  vaccinationCount: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontSize: 10,
    marginTop: 1,
  },
  vaccinationList: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
    gap: SPACING.sm,
  },
  vaccinationVaccineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  vaccinationVaccineText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },

  // NURSERY
  nurseryWrapper: {
    marginBottom: SPACING.sm,
  },
  nurseryCard: {
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
  nurseryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nurseryInfo: { flex: 1 },
  nurseryTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  nurseryDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  nurseryPrice: {
    ...TYPOGRAPHY.badge,
    fontWeight: '700',
    fontSize: 10,
  },

  // FAQ
  faqItem: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  faqItemExpanded: {
    borderColor: BB_COLORS.skyBlueSubtle,
    ...SHADOWS.cardSoft,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    flex: 1,
  },
  faqNumberBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: BB_COLORS.skyBlueFaded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqNumber: {
    ...TYPOGRAPHY.badge,
    color: BB_COLORS.skyBlue,
    fontWeight: '800',
    fontSize: 10,
  },
  faqQuestion: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    flex: 1,
    fontSize: 13,
  },
  faqAnswer: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
  },
  faqAnswerText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    lineHeight: 22,
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
    backgroundColor: BB_COLORS.skyBlueFaded,
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
    backgroundColor: BB_COLORS.skyBlue,
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
    marginBottom: SPACING.lg,
  },
  ctaFeatures: {
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  ctaFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  ctaFeatureText: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
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
    color: BB_COLORS.skyBlue,
    fontWeight: '700',
  },
});

export default BabyScreen;
