/**
 * ============================================================================
 * APOLLO 24/7 - NUTRITION SCREEN (VITALITY GREEN EDITION)
 * ============================================================================
 *
 * Premium Nutrition vertical screen — 14-15 scrolls deep
 * Built with the precision of a FAANG principal architect.
 *
 * Sections (top to bottom):
 * 1. Hero Header with vitality pulse animation
 * 2. Daily Nutrition Goals (6 progress circles)
 * 3. Vitamins & Supplements Categories (10 cards)
 * 4. Protein Powders Carousel (8 products)
 * 5. Ayurvedic Nutrition Carousel (8 products)
 * 6. Superfoods Grid (8 superfoods)
 * 7. Daily Meal Planner (7 meals)
 * 8. Calorie Tracker
 * 9. Diet Types (6 diet cards)
 * 10. Nutrition For Age Groups (5 cards)
 * 11. Brand Spotlight Carousel (6 brands)
 * 12. Expert Advice (6 articles)
 * 13. Healthy Recipes (8 recipes)
 * 14. Subscription Plans (3 plans)
 * 15. Ask Apollo Nutrition
 * 16. Doctor Consultation CTA
 * 17. Footer
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
import { NT_COLORS, NT_DATA } from './NutritionTheme';
import { Footer } from '../home/DiscoverSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// VITALITY PARTICLE
// ============================================================================
const VitalityParticle = React.memo(({ delay, startX, startY, color, size }) => {
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
const SectionDivider = React.memo(({ variant = 'green' }) => {
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

  const color = variant === 'green' ? NT_COLORS.vitalityGreen : NT_COLORS.sunshineOrange;
  const icon = variant === 'green' ? 'nutrition' : 'leaf';

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
  const titleShimmer = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 600 });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
    titleShimmer.value = withRepeat(
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
    opacity: interpolate(titleShimmer.value, [0, 1], [0.85, 1]),
  }));

  return (
    <Animated.View style={[styles.heroContainer, heroStyle]}>
      <LinearGradient
        colors={['rgba(76, 175, 80, 0.08)', 'rgba(76, 175, 80, 0.02)', COLORS.backgroundPure]}
        style={styles.heroGradient}
      >
        <VitalityParticle delay={0} startX={30} startY={20} color="rgba(76,175,80,0.5)" size={4} />
        <VitalityParticle delay={700} startX={120} startY={40} color="rgba(255,152,0,0.5)" size={3} />
        <VitalityParticle delay={1400} startX={220} startY={15} color="rgba(76,175,80,0.4)" size={5} />
        <VitalityParticle delay={2100} startX={300} startY={35} color="rgba(255,152,0,0.4)" size={3} />
        <VitalityParticle delay={2800} startX={350} startY={25} color="rgba(76,175,80,0.5)" size={4} />

        <Animated.View style={[styles.heroGlow, pulseStyle]} />

        <View style={styles.heroContent}>
          <View style={styles.heroIconRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="nutrition" size={16} color={NT_COLORS.vitalityGreen} />
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>VITALITY GREEN EDITION</Text>
            </View>
          </View>
          <Animated.Text style={[styles.heroTitle, titleStyle]}>Nutrition</Animated.Text>
          <Text style={styles.heroSubtitle}>Fuel your body right</Text>
          <Text style={styles.heroDescription}>Vitamins, supplements & superfoods curated by experts</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// SECTION 2: DAILY NUTRITION GOALS
// ============================================================================
const NutritionGoalCircle = React.memo(({ item, index }) => {
  const progress = item.current / item.target;
  const progressAnim = useSharedValue(0);

  useEffect(() => {
    progressAnim.value = withDelay(index * 100, withTiming(progress, { duration: 1200, easing: Easing.out(Easing.cubic) }));
  }, [progress, index]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressAnim.value * 100}%`,
  }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 80)} style={styles.goalItem}>
      <View style={[styles.goalIconContainer, { backgroundColor: item.color + '15' }]}>
        <Ionicons name={item.icon} size={22} color={item.color} />
      </View>
      <Text style={styles.goalTitle}>{item.title}</Text>
      <View style={styles.goalProgressBar}>
        <Animated.View style={[styles.goalProgressFill, { backgroundColor: item.color }, progressStyle]} />
      </View>
      <Text style={styles.goalValue}>
        <Text style={[styles.goalCurrent, { color: item.color }]}>{item.current}</Text>
        /{item.target} {item.unit}
      </Text>
    </Animated.View>
  );
});

const DailyNutritionGoalsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Daily Nutrition Goals" subtitle="Track your daily intake" icon="analytics" color={NT_COLORS.vitalityGreen} />
      <View style={styles.goalsGrid}>
        {NT_DATA.dailyNutritionGoals.map((item, index) => (
          <NutritionGoalCircle key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 3: VITAMINS & SUPPLEMENTS
// ============================================================================
const VitaminCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 70)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.vitaminCard}>
        <LinearGradient colors={[item.color + '12', item.color + '05']} style={styles.vitaminGradient}>
          <View style={[styles.vitaminIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={24} color={item.color} />
          </View>
          <Text style={styles.vitaminTitle}>{item.title}</Text>
          <Text style={styles.vitaminDesc}>{item.desc}</Text>
          <Text style={styles.vitaminSources} numberOfLines={2}>{item.sources}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const VitaminsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Vitamins & Supplements" subtitle="Essential micronutrients" icon="medical" color={NT_COLORS.sunshineOrange} viewAll />
      <FlatList
        data={NT_DATA.vitaminCategories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <VitaminCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 4: PROTEIN POWDERS
// ============================================================================
const ProteinProductCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.proteinCard}>
        <View style={styles.proteinImage}>
          <LinearGradient colors={[NT_COLORS.proteinRedFaded, '#FFFFFF']} style={styles.proteinImageGradient}>
            <Ionicons name="barbell" size={32} color={NT_COLORS.proteinRed} />
          </LinearGradient>
          <View style={[styles.proteinDiscount, { backgroundColor: NT_COLORS.proteinRed }]}>
            <Text style={styles.proteinDiscountText}>{item.discount}% OFF</Text>
          </View>
        </View>
        <Text style={[styles.proteinBrand, { color: NT_COLORS.proteinRed }]}>{item.brand}</Text>
        <Text style={styles.proteinName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.proteinRating}>
          <Ionicons name="star" size={10} color="#FFB800" />
          <Text style={styles.proteinRatingText}>{item.rating}</Text>
        </View>
        <View style={styles.proteinPriceRow}>
          <Text style={styles.proteinPrice}>&#8377;{item.price}</Text>
          <Text style={styles.proteinOldPrice}>&#8377;{item.oldPrice}</Text>
        </View>
        <TouchableOpacity style={[styles.proteinAddButton, { backgroundColor: NT_COLORS.proteinRed }]}>
          <Text style={styles.proteinAddButtonText}>ADD</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ProteinSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Protein Powders" subtitle="Build muscle & recover faster" icon="barbell" color={NT_COLORS.proteinRed} viewAll />
      <FlatList
        data={NT_DATA.proteinProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ProteinProductCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 5: AYURVEDIC NUTRITION
// ============================================================================
const AyurvedicProductCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.ayurvedicCard}>
        <View style={styles.ayurvedicImage}>
          <LinearGradient colors={[NT_COLORS.vitalityGreenFaded, '#FFFFFF']} style={styles.ayurvedicImageGradient}>
            <Ionicons name="leaf" size={32} color={NT_COLORS.vitalityGreen} />
          </LinearGradient>
          <View style={[styles.ayurvedicDiscount, { backgroundColor: NT_COLORS.vitalityGreen }]}>
            <Text style={styles.ayurvedicDiscountText}>{item.discount}% OFF</Text>
          </View>
        </View>
        <Text style={styles.ayurvedicName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.ayurvedicRating}>
          <Ionicons name="star" size={10} color="#FFB800" />
          <Text style={styles.ayurvedicRatingText}>{item.rating}</Text>
        </View>
        <View style={styles.ayurvedicPriceRow}>
          <Text style={styles.ayurvedicPrice}>&#8377;{item.price}</Text>
          <Text style={styles.ayurvedicOldPrice}>&#8377;{item.oldPrice}</Text>
        </View>
        <TouchableOpacity style={[styles.ayurvedicAddButton, { backgroundColor: NT_COLORS.vitalityGreen }]}>
          <Text style={styles.ayurvedicAddButtonText}>ADD</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const AyurvedicSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Ayurvedic Nutrition" subtitle="Ancient wisdom, modern wellness" icon="leaf" color={NT_COLORS.vitalityGreen} viewAll />
      <FlatList
        data={NT_DATA.ayurvedicProducts}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <AyurvedicProductCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 6: SUPERFOODS
// ============================================================================
const SuperfoodCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 70)} style={[animStyle, styles.superfoodWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.superfoodCard}>
        <View style={[styles.superfoodIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>
        <View style={styles.superfoodInfo}>
          <Text style={styles.superfoodTitle}>{item.title}</Text>
          <Text style={styles.superfoodDesc} numberOfLines={2}>{item.desc}</Text>
          <View style={[styles.superfoodCalBadge, { backgroundColor: item.color + '10' }]}>
            <Ionicons name="flame" size={10} color={item.color} />
            <Text style={[styles.superfoodCalText, { color: item.color }]}>{item.calories}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
});

const SuperfoodsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Superfoods" subtitle="Nature's nutritional powerhouses" icon="star" color={NT_COLORS.vitalityGreen} viewAll />
      {NT_DATA.superfoods.map((item, index) => (
        <SuperfoodCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 7: DAILY MEAL PLANNER
// ============================================================================
const MealPlannerItem = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.mealPlannerItem}>
        <View style={[styles.mealPlannerIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={18} color={item.color} />
        </View>
        <View style={styles.mealPlannerInfo}>
          <View style={styles.mealPlannerHeader}>
            <Text style={styles.mealPlannerTime}>{item.time}</Text>
            <View style={styles.mealPlannerCalBadge}>
              <Ionicons name="flame" size={10} color={NT_COLORS.sunshineOrange} />
              <Text style={styles.mealPlannerCalText}>{item.calories} cal</Text>
            </View>
          </View>
          <Text style={styles.mealPlannerMeal}>{item.meal}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const MealPlannerSection = React.memo(() => {
  const totalCalories = NT_DATA.mealPlannerData.reduce((sum, item) => sum + item.calories, 0);

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Daily Meal Planner" subtitle={`Total: ${totalCalories} calories`} icon="calendar" color={NT_COLORS.sunshineOrange} />
      <Animated.View entering={FadeInDown.duration(600)} style={styles.mealPlannerContainer}>
        <LinearGradient colors={['#FFF8E1', '#FFF3E0']} style={styles.mealPlannerGradient}>
          {NT_DATA.mealPlannerData.map((item, index) => (
            <MealPlannerItem key={item.id} item={item} index={index} />
          ))}
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 8: CALORIE TRACKER
// ============================================================================
const CalorieTrackerSection = React.memo(() => {
  const totalConsumed = NT_DATA.calorieTracker.reduce((sum, item) => sum + item.totalCal, 0);
  const dailyTarget = 2000;
  const remaining = dailyTarget - totalConsumed;

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Today's Calorie Tracker" icon="analytics" color={NT_COLORS.sunshineOrange} />
      <Animated.View entering={FadeInDown.duration(600)} style={styles.calorieContainer}>
        <View style={styles.calorieSummary}>
          <View style={styles.calorieSummaryItem}>
            <Text style={[styles.calorieSummaryValue, { color: NT_COLORS.vitalityGreen }]}>{totalConsumed}</Text>
            <Text style={styles.calorieSummaryLabel}>Consumed</Text>
          </View>
          <View style={styles.calorieSummaryDivider} />
          <View style={styles.calorieSummaryItem}>
            <Text style={[styles.calorieSummaryValue, { color: NT_COLORS.sunshineOrange }]}>{dailyTarget}</Text>
            <Text style={styles.calorieSummaryLabel}>Target</Text>
          </View>
          <View style={styles.calorieSummaryDivider} />
          <View style={styles.calorieSummaryItem}>
            <Text style={[styles.calorieSummaryValue, { color: remaining > 0 ? NT_COLORS.oceanBlue : NT_COLORS.proteinRed }]}>{remaining}</Text>
            <Text style={styles.calorieSummaryLabel}>Remaining</Text>
          </View>
        </View>

        {NT_DATA.calorieTracker.map((item, index) => (
          <Animated.View key={item.id} entering={FadeInDown.duration(400).delay(index * 60)} style={styles.calorieItem}>
            <View style={styles.calorieItemLeft}>
              <Text style={styles.calorieItemMeal}>{item.meal}</Text>
              <Text style={styles.calorieItemTime}>{item.time}</Text>
            </View>
            <View style={styles.calorieItemRight}>
              <Text style={styles.calorieItemFoods}>{item.foods.join(', ')}</Text>
              <Text style={[styles.calorieItemCal, { color: NT_COLORS.sunshineOrange }]}>{item.totalCal} cal</Text>
            </View>
          </Animated.View>
        ))}
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 9: DIET TYPES
// ============================================================================
const DietTypeCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.dietTypeCard}>
        <LinearGradient colors={[item.color + '12', item.color + '05']} style={styles.dietTypeGradient}>
          <View style={[styles.dietTypeIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={26} color={item.color} />
          </View>
          <Text style={styles.dietTypeTitle}>{item.title}</Text>
          <Text style={styles.dietTypeDesc}>{item.desc}</Text>
          <View style={[styles.dietTypeMacroBadge, { backgroundColor: item.color + '10' }]}>
            <Text style={[styles.dietTypeMacroText, { color: item.color }]}>{item.macros}</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const DietTypesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Explore Diet Types" subtitle="Find your ideal eating pattern" icon="restaurant" color={NT_COLORS.vitalityGreen} viewAll />
      <FlatList
        data={NT_DATA.dietTypes}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <DietTypeCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 10: NUTRITION FOR AGE GROUPS
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
          <View style={styles.ageGroupNutrients}>
            {item.keyNutrients.map((nutrient, i) => (
              <View key={i} style={[styles.ageGroupNutrientChip, { backgroundColor: item.color + '10' }]}>
                <Text style={[styles.ageGroupNutrientText, { color: item.color }]}>{nutrient}</Text>
              </View>
            ))}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
});

const NutritionForAgesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Nutrition For Every Age" subtitle="Age-specific nutritional guidance" icon="people" color={NT_COLORS.oceanBlue} />
      {NT_DATA.nutritionForAges.map((item, index) => (
        <AgeGroupCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 11: BRAND SPOTLIGHT
// ============================================================================
const BrandCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.brandSpotCard}>
        <LinearGradient colors={[item.color + '12', '#FFFFFF']} style={styles.brandSpotGradient}>
          <View style={[styles.brandSpotIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name="business" size={24} color={item.color} />
          </View>
          <Text style={styles.brandSpotName}>{item.name}</Text>
          <Text style={styles.brandSpotTagline}>{item.tagline}</Text>
          <View style={[styles.brandSpotCategoryBadge, { backgroundColor: item.color + '10' }]}>
            <Text style={[styles.brandSpotCategoryText, { color: item.color }]}>{item.category}</Text>
          </View>
          <Text style={styles.brandSpotProducts}>{item.products} products</Text>
          <TouchableOpacity style={[styles.brandSpotExplore, { borderColor: item.color }]}>
            <Text style={[styles.brandSpotExploreText, { color: item.color }]}>Explore</Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const BrandSpotlightSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Brand Spotlight" subtitle="Top nutrition brands" icon="ribbon" color={NT_COLORS.sunshineOrange} viewAll />
      <FlatList
        data={NT_DATA.brandSpotlight}
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
// SECTION 12: EXPERT ADVICE
// ============================================================================
const ExpertAdviceCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.expertCard}>
        <LinearGradient colors={[item.color + '10', '#FFFFFF']} style={styles.expertGradient}>
          <View style={styles.expertHeader}>
            <View style={[styles.expertIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <View style={styles.expertReadTime}>
              <Ionicons name="time" size={10} color={COLORS.textTertiary} />
              <Text style={styles.expertReadTimeText}>{item.readTime}</Text>
            </View>
          </View>
          <Text style={styles.expertTitle}>{item.title}</Text>
          <Text style={styles.expertDesc} numberOfLines={2}>{item.desc}</Text>
          <View style={styles.expertFooter}>
            <Text style={styles.expertName}>{item.expert}</Text>
            <Ionicons name="arrow-forward" size={14} color={item.color} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ExpertAdviceSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Expert Advice" subtitle="From certified nutritionists" icon="school" color={NT_COLORS.berryPurple} viewAll />
      <FlatList
        data={NT_DATA.expertAdvice}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ExpertAdviceCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 13: HEALTHY RECIPES
// ============================================================================
const RecipeCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 70)} style={[animStyle, styles.recipeWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.recipeCard}>
        <View style={[styles.recipeIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={22} color={item.color} />
        </View>
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeTitle}>{item.title}</Text>
          <Text style={styles.recipeIngredients} numberOfLines={1}>{item.ingredients}</Text>
          <View style={styles.recipeMeta}>
            <View style={styles.recipeMetaItem}>
              <Ionicons name="time" size={10} color={COLORS.textTertiary} />
              <Text style={styles.recipeMetaText}>{item.time}</Text>
            </View>
            <View style={styles.recipeMetaItem}>
              <Ionicons name="flame" size={10} color={NT_COLORS.sunshineOrange} />
              <Text style={styles.recipeMetaText}>{item.calories} cal</Text>
            </View>
            <View style={[styles.recipeDiffBadge, {
              backgroundColor: item.difficulty === 'Easy' ? NT_COLORS.vitalityGreenFaded : NT_COLORS.sunshineOrangeFaded,
            }]}>
              <Text style={[styles.recipeDiffText, {
                color: item.difficulty === 'Easy' ? NT_COLORS.vitalityGreen : NT_COLORS.sunshineOrange,
              }]}>{item.difficulty}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
});

const RecipesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Healthy Recipes" subtitle="Nutritious & delicious" icon="restaurant" color={NT_COLORS.vitalityGreen} viewAll />
      {NT_DATA.recipes.map((item, index) => (
        <RecipeCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 14: SUBSCRIPTION PLANS
// ============================================================================
const SubscriptionPlanCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const glowAnim = useSharedValue(0);

  useEffect(() => {
    if (item.popular) {
      glowAnim.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 2000 }),
          withTiming(0, { duration: 2000 })
        ), -1, false
      );
    }
  }, [item.popular]);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowAnim.value, [0, 1], [0, 0.15]),
  }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 120)} style={[animStyle, styles.subscriptionWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut}
        style={[styles.subscriptionCard, item.popular && { borderColor: item.color, borderWidth: 2 }]}>
        {item.popular && (
          <Animated.View style={[styles.subscriptionGlow, { backgroundColor: item.color }, glowStyle]} />
        )}
        {item.popular && (
          <View style={[styles.subscriptionPopularBadge, { backgroundColor: item.color }]}>
            <Text style={styles.subscriptionPopularText}>POPULAR</Text>
          </View>
        )}
        <Text style={[styles.subscriptionTitle, { color: item.color }]}>{item.title}</Text>
        <View style={styles.subscriptionPriceRow}>
          <Text style={styles.subscriptionPrice}>&#8377;{item.price}</Text>
          <Text style={styles.subscriptionDuration}>/{item.duration}</Text>
        </View>
        <View style={styles.subscriptionFeatures}>
          {item.features.map((feature, i) => (
            <View key={i} style={styles.subscriptionFeatureItem}>
              <Ionicons name="checkmark-circle" size={14} color={item.color} />
              <Text style={styles.subscriptionFeatureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={[styles.subscriptionButton, { backgroundColor: item.color }]}>
          <Text style={styles.subscriptionButtonText}>Get Started</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const SubscriptionSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Nutrition Plans" subtitle="Expert guidance subscription" icon="card" color={NT_COLORS.oceanBlue} />
      {NT_DATA.subscriptionPlans.map((item, index) => (
        <SubscriptionPlanCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 15: ASK APOLLO
// ============================================================================
const AskApolloNutrition = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.askApolloContainer}>
        <View style={styles.askApolloHeader}>
          <View style={styles.askApolloIcon}>
            <Ionicons name="chatbubbles" size={20} color={NT_COLORS.vitalityGreen} />
          </View>
          <View>
            <Text style={styles.askApolloTitle}>Expert nutrition advice{'\n'}at your fingertips</Text>
            <Text style={styles.askApolloSubtitle}>ASK APOLLO ABOUT...</Text>
          </View>
        </View>
        <View style={styles.askApolloQuestions}>
          {[
            'What supplements should I take daily?',
            'How to increase protein intake naturally?',
            'Best foods for gut health?',
            'Is a vegan diet nutritionally complete?',
            'How much water should I drink daily?',
            'What are the signs of vitamin deficiency?',
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
// SECTION 16: DOCTOR CONSULTATION CTA
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
        <LinearGradient colors={NT_COLORS.gradientVitality} style={styles.ctaGradient}>
          <Animated.View style={[styles.ctaGlow, pulseStyle]} />
          <View style={styles.ctaContent}>
            <View style={styles.ctaIconContainer}>
              <Ionicons name="nutrition" size={36} color={COLORS.textWhite} />
            </View>
            <Text style={styles.ctaTitle}>Consult a Nutritionist</Text>
            <Text style={styles.ctaDesc}>Get personalized diet plans &{'\n'}supplement recommendations</Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Book Free Consultation</Text>
              <Ionicons name="arrow-forward" size={16} color={NT_COLORS.vitalityGreen} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// MAIN NUTRITION SCREEN
// ============================================================================
const NutritionScreen = React.memo(({ scrollY }) => {
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

      <DailyNutritionGoalsSection />
      <SectionDivider variant="green" />

      <VitaminsSection />
      <SectionDivider variant="orange" />

      <ProteinSection />
      <SectionDivider variant="green" />

      <AyurvedicSection />
      <SectionDivider variant="orange" />

      <SuperfoodsSection />
      <SectionDivider variant="green" />

      <MealPlannerSection />
      <SectionDivider variant="orange" />

      <CalorieTrackerSection />
      <SectionDivider variant="green" />

      <DietTypesSection />
      <SectionDivider variant="orange" />

      <NutritionForAgesSection />
      <SectionDivider variant="green" />

      <BrandSpotlightSection />
      <SectionDivider variant="orange" />

      <ExpertAdviceSection />
      <SectionDivider variant="green" />

      <RecipesSection />
      <SectionDivider variant="orange" />

      <SubscriptionSection />
      <SectionDivider variant="green" />

      <AskApolloNutrition />
      <SectionDivider variant="orange" />

      <DoctorConsultationCTA />
      <SectionDivider variant="green" />

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
    backgroundColor: NT_COLORS.vitalityGreen,
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
    backgroundColor: NT_COLORS.vitalityGreenFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: NT_COLORS.vitalityGreenSubtle,
  },
  heroTag: {
    backgroundColor: NT_COLORS.vitalityGreenFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: NT_COLORS.vitalityGreenSubtle,
  },
  heroTagText: {
    ...TYPOGRAPHY.badge,
    color: NT_COLORS.vitalityGreen,
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
    color: NT_COLORS.vitalityGreen,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  heroDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
  },

  // NUTRITION GOALS
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  goalItem: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 2) / 3,
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  goalIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  goalTitle: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  goalProgressBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.backgroundMuted,
    marginBottom: SPACING.xs,
    overflow: 'hidden',
  },
  goalProgressFill: {
    height: '100%',
    borderRadius: 2,
  },
  goalValue: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 9,
  },
  goalCurrent: {
    fontWeight: '800',
  },

  // VITAMINS
  vitaminCard: {
    width: SCREEN_WIDTH * 0.48,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  vitaminGradient: {
    padding: SPACING.lg,
    minHeight: 200,
  },
  vitaminIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  vitaminTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  vitaminDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  vitaminSources: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontSize: 10,
    lineHeight: 15,
    fontStyle: 'italic',
  },

  // PROTEIN PRODUCTS
  proteinCard: {
    width: 155,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.cardSoft,
  },
  proteinImage: {
    width: '100%',
    height: 100,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  proteinImageGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  proteinDiscount: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  proteinDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontSize: 8,
  },
  proteinBrand: {
    ...TYPOGRAPHY.badge,
    fontWeight: '700',
    fontSize: 9,
    marginBottom: 2,
  },
  proteinName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    minHeight: 32,
    fontSize: 11,
  },
  proteinRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: SPACING.xs,
  },
  proteinRatingText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  proteinPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  proteinPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
  },
  proteinOldPrice: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    fontSize: 10,
  },
  proteinAddButton: {
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  proteinAddButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },

  // AYURVEDIC
  ayurvedicCard: {
    width: 145,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.cardSoft,
  },
  ayurvedicImage: {
    width: '100%',
    height: 95,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  ayurvedicImageGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ayurvedicDiscount: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  ayurvedicDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontSize: 8,
  },
  ayurvedicName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    minHeight: 32,
    fontSize: 11,
  },
  ayurvedicRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: SPACING.xs,
  },
  ayurvedicRatingText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  ayurvedicPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  ayurvedicPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
  },
  ayurvedicOldPrice: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    fontSize: 10,
  },
  ayurvedicAddButton: {
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  ayurvedicAddButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },

  // SUPERFOODS
  superfoodWrapper: {
    marginBottom: SPACING.sm,
  },
  superfoodCard: {
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
  superfoodIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  superfoodInfo: { flex: 1 },
  superfoodTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  superfoodDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 16,
    marginBottom: SPACING.xs,
  },
  superfoodCalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    alignSelf: 'flex-start',
  },
  superfoodCalText: {
    ...TYPOGRAPHY.badge,
    fontSize: 9,
    fontWeight: '700',
  },

  // MEAL PLANNER
  mealPlannerContainer: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  mealPlannerGradient: {
    padding: SPACING.lg,
  },
  mealPlannerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,152,0,0.10)',
  },
  mealPlannerIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealPlannerInfo: { flex: 1 },
  mealPlannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  mealPlannerTime: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  mealPlannerCalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  mealPlannerCalText: {
    ...TYPOGRAPHY.badge,
    color: NT_COLORS.sunshineOrange,
    fontSize: 9,
  },
  mealPlannerMeal: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },

  // CALORIE TRACKER
  calorieContainer: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    ...SHADOWS.cardSoft,
  },
  calorieSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
    paddingBottom: SPACING.lg,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dividerLight,
  },
  calorieSummaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  calorieSummaryValue: {
    ...TYPOGRAPHY.h3,
    fontWeight: '800',
  },
  calorieSummaryLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  calorieSummaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: COLORS.dividerLight,
  },
  calorieItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dividerLight,
  },
  calorieItemLeft: {},
  calorieItemMeal: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  calorieItemTime: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontSize: 10,
    marginTop: 1,
  },
  calorieItemRight: {
    alignItems: 'flex-end',
  },
  calorieItemFoods: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
    maxWidth: 200,
    textAlign: 'right',
  },
  calorieItemCal: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '700',
    marginTop: 2,
  },

  // DIET TYPES
  dietTypeCard: {
    width: SCREEN_WIDTH * 0.52,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  dietTypeGradient: {
    padding: SPACING.lg,
    minHeight: 210,
  },
  dietTypeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  dietTypeTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  dietTypeDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  dietTypeMacroBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.xs,
  },
  dietTypeMacroText: {
    ...TYPOGRAPHY.badge,
    fontSize: 9,
    fontWeight: '600',
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
    marginBottom: SPACING.sm,
  },
  ageGroupNutrients: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  ageGroupNutrientChip: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  ageGroupNutrientText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
  },

  // BRAND SPOTLIGHT
  brandSpotCard: {
    width: SCREEN_WIDTH * 0.48,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  brandSpotGradient: {
    padding: SPACING.lg,
    minHeight: 220,
  },
  brandSpotIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  brandSpotName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  brandSpotTagline: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontStyle: 'italic',
    marginBottom: SPACING.sm,
  },
  brandSpotCategoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    alignSelf: 'flex-start',
    marginBottom: SPACING.sm,
  },
  brandSpotCategoryText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
  },
  brandSpotProducts: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
    marginBottom: SPACING.md,
  },
  brandSpotExplore: {
    borderWidth: 1.5,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  brandSpotExploreText: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '700',
  },

  // EXPERT ADVICE
  expertCard: {
    width: SCREEN_WIDTH * 0.65,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  expertGradient: {
    padding: SPACING.lg,
    minHeight: 200,
  },
  expertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  expertIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  expertReadTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  expertReadTimeText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 9,
  },
  expertTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  expertDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  expertFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expertName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
    fontSize: 10,
  },

  // RECIPES
  recipeWrapper: {
    marginBottom: SPACING.sm,
  },
  recipeCard: {
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
  recipeIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recipeInfo: { flex: 1 },
  recipeTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  recipeIngredients: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontSize: 10,
    marginBottom: SPACING.xs,
  },
  recipeMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  recipeMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  recipeMetaText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  recipeDiffBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 1,
    borderRadius: RADIUS.xs,
  },
  recipeDiffText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
    fontWeight: '700',
  },

  // SUBSCRIPTION PLANS
  subscriptionWrapper: {
    marginBottom: SPACING.md,
  },
  subscriptionCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.xl,
    ...SHADOWS.cardSoft,
    position: 'relative',
    overflow: 'hidden',
  },
  subscriptionGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  subscriptionPopularBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
  },
  subscriptionPopularText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontSize: 8,
    fontWeight: '800',
  },
  subscriptionTitle: {
    ...TYPOGRAPHY.h3,
    fontWeight: '800',
    marginBottom: SPACING.sm,
  },
  subscriptionPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: SPACING.lg,
  },
  subscriptionPrice: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  subscriptionDuration: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
  },
  subscriptionFeatures: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  subscriptionFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  subscriptionFeatureText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  subscriptionButton: {
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  subscriptionButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textWhite,
    fontWeight: '700',
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
    backgroundColor: NT_COLORS.vitalityGreenFaded,
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
    backgroundColor: NT_COLORS.vitalityGreen,
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
    color: NT_COLORS.vitalityGreen,
    fontWeight: '700',
  },
});

export default NutritionScreen;
