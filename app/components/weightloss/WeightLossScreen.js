/**
 * ============================================================================
 * APOLLO 24/7 - WEIGHT LOSS SCREEN (EMERALD FITNESS EDITION)
 * ============================================================================
 *
 * Premium Weight Loss vertical screen — 14-15 scrolls deep
 * Built with the precision of a FAANG principal architect.
 *
 * Sections (top to bottom):
 * 1. Hero Header with fitness pulse animation
 * 2. Smarter Health Choices (3 horizontal cards)
 * 3. Start Your Weight Loss Journey Today (CTA banner)
 * 4. Everything For Your Weight Loss Journey (4 cards grid)
 * 5. Obesity's Health Risks (horizontal carousel)
 * 6. Health Tools For You (4-icon grid)
 * 7. Know Your Food (search + info)
 * 8. BMI Calculator Section
 * 9. Diet Plans (6 cards)
 * 10. Exercise Routines (6 cards)
 * 11. Weekly Meal Plan
 * 12. Weight Loss Supplements (product carousel)
 * 13. Success Stories (testimonials)
 * 14. Doctor Consultation CTA
 * 15. Footer
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
  TextInput,
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
import { WL_COLORS, WL_DATA } from './WeightLossTheme';
import { Footer } from '../home/DiscoverSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// FLOATING ENERGY PARTICLE
// ============================================================================
const EnergyParticle = React.memo(({ delay, startX, startY, color, size }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const duration = 3500 + Math.random() * 2500;
    opacity.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(0.8, { duration: duration * 0.3, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: duration * 0.7, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    ));
    translateY.value = withDelay(delay, withRepeat(
      withSequence(
        withTiming(-35, { duration: duration, easing: Easing.out(Easing.ease) }),
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
const SectionDivider = React.memo(({ variant = 'emerald' }) => {
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

  const color = variant === 'emerald' ? WL_COLORS.emerald : WL_COLORS.fitnessOrange;
  const icon = variant === 'emerald' ? 'leaf' : 'flame';

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
        <View>
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
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));
  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: interpolate(pulseScale.value, [1, 1.05], [0.05, 0.15]),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(titleShimmer.value, [0, 1], [0.85, 1]),
  }));

  return (
    <Animated.View style={[styles.heroContainer, heroStyle]}>
      <LinearGradient
        colors={['rgba(0, 166, 81, 0.08)', 'rgba(0, 166, 81, 0.02)', COLORS.backgroundPure]}
        style={styles.heroGradient}
      >
        <EnergyParticle delay={0} startX={30} startY={20} color="rgba(0,166,81,0.5)" size={4} />
        <EnergyParticle delay={700} startX={100} startY={40} color="rgba(255,107,53,0.5)" size={3} />
        <EnergyParticle delay={1400} startX={200} startY={15} color="rgba(0,166,81,0.4)" size={5} />
        <EnergyParticle delay={2100} startX={280} startY={35} color="rgba(255,107,53,0.4)" size={3} />
        <EnergyParticle delay={2800} startX={340} startY={25} color="rgba(0,166,81,0.5)" size={4} />

        <Animated.View style={[styles.heroGlow, pulseStyle]} />

        <View style={styles.heroContent}>
          <View style={styles.heroIconRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="barbell" size={16} color={WL_COLORS.emerald} />
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>EMERALD FITNESS EDITION</Text>
            </View>
          </View>
          <Animated.Text style={[styles.heroTitle, titleStyle]}>Weight Loss</Animated.Text>
          <Text style={styles.heroSubtitle}>Your premium fitness destination</Text>
          <Text style={styles.heroDescription}>Guided by doctors, powered by science</Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// SECTION 2: SMARTER HEALTH CHOICES
// ============================================================================
const SmarterChoiceCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.smarterCard}
      >
        <LinearGradient colors={item.gradient} style={styles.smarterCardGradient}>
          <View style={styles.smarterCardIcon}>
            <Ionicons name={item.icon} size={24} color={COLORS.textPrimary} />
          </View>
          <Text style={styles.smarterCardTitle}>{item.title}</Text>
          <Text style={styles.smarterCardDesc}>{item.desc}</Text>
        </LinearGradient>
        <View style={styles.smarterCardArrow}>
          <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const SmarterHealthChoicesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Smarter Health Choices" icon="bulb" color={WL_COLORS.emerald} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}>
        {WL_DATA.smarterChoices.map((item, index) => (
          <SmarterChoiceCard key={item.id} item={item} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// SECTION 3: START YOUR JOURNEY CTA BANNER
// ============================================================================
const JourneyBanner = React.memo(() => {
  const bannerScale = useSharedValue(0.95);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    bannerScale.value = withSpring(1, ANIMATION.spring.gentle);
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ), -1, false
    );
  }, []);

  const bannerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bannerScale.value }],
  }));
  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInUp.duration(600)} style={[styles.journeyBanner, bannerStyle]}>
        <LinearGradient colors={['#E8F5E9', '#C8E6C9', '#A5D6A7']} style={styles.journeyBannerGradient}>
          <Animated.View style={[styles.journeyBannerGlow, glowStyle]} />
          <View style={styles.journeyBannerContent}>
            <Text style={styles.journeyBannerTitle}>Start Your Weight Loss{'\n'}Journey <Text style={styles.journeyBannerBold}>Today</Text></Text>
            <Text style={styles.journeyBannerDesc}>Get Trusted Advice to Begin{'\n'}Your Journey</Text>
            <TouchableOpacity style={styles.journeyBannerButton}>
              <Text style={styles.journeyBannerButtonText}>Consult A Doctor For Free</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.journeyBannerIconContainer}>
            <View style={styles.journeyBannerCircle}>
              <Ionicons name="fitness" size={40} color={WL_COLORS.emerald} />
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 4: EVERYTHING FOR YOUR WEIGHT LOSS JOURNEY
// ============================================================================
const JourneyCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 120)} style={[animStyle, styles.journeyCardWrapper]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.journeyCard}
      >
        <View style={[styles.journeyCardIconContainer, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={28} color={item.color} />
        </View>
        <Text style={styles.journeyCardTitle}>{item.title}</Text>
        <Text style={styles.journeyCardDesc}>{item.desc}</Text>
        <View style={styles.journeyCardArrow}>
          <Ionicons name="chevron-forward" size={14} color={COLORS.textTertiary} />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const EverythingForJourneySection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Everything For Your Weight Loss Journey" icon="map" color={WL_COLORS.emerald} />
      <View style={styles.journeyGrid}>
        {WL_DATA.journeyCards.map((item, index) => (
          <JourneyCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 5: OBESITY'S HEALTH RISKS CAROUSEL
// ============================================================================
const HealthRiskCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.riskCard}
      >
        <LinearGradient colors={['#FFFFFF', '#FFF8F0']} style={styles.riskCardGradient}>
          <View style={styles.riskCardHeader}>
            <View style={[styles.riskCardIcon, { backgroundColor: WL_COLORS.calorieRedFaded }]}>
              <Ionicons name={item.icon} size={22} color={WL_COLORS.calorieRed} />
            </View>
          </View>
          <Text style={styles.riskCardTitle}>{item.title}</Text>
          <Text style={styles.riskCardDesc}>{item.desc}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ObesityHealthRisksSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Obesity's Health Risks" subtitle="Know the dangers" icon="warning" color={WL_COLORS.calorieRed} />
      <FlatList
        data={WL_DATA.healthRisks}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <HealthRiskCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 6: HEALTH TOOLS FOR YOU
// ============================================================================
const HealthToolItem = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, ANIMATION.spring.press);
    rotation.value = withSpring(5, ANIMATION.spring.bouncy);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
    rotation.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View entering={FadeInUp.duration(500).delay(index * 100)} style={[animStyle, styles.toolItemWrapper]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.toolItem}
      >
        <View style={[styles.toolItemIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={28} color={item.color} />
          {item.badge && (
            <View style={styles.toolBadge}>
              <Text style={styles.toolBadgeText}>{item.badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.toolItemTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const HealthToolsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Health Tools For You" icon="apps" color={WL_COLORS.emerald} />
      <View style={styles.toolsGrid}>
        {WL_DATA.healthTools.map((item, index) => (
          <HealthToolItem key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 7: KNOW YOUR FOOD
// ============================================================================
const KnowYourFoodSection = React.memo(() => {
  const [searchText, setSearchText] = useState('');
  const borderAnim = useSharedValue(0);

  useEffect(() => {
    borderAnim.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 3000 }),
        withTiming(0, { duration: 3000 })
      ), -1, false
    );
  }, []);

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: interpolate(borderAnim.value, [0, 1], [0.1, 0.3]) > 0.2
      ? WL_COLORS.emerald : COLORS.borderLight,
  }));

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Know Your Food" icon="nutrition" color={WL_COLORS.emerald} />
      <Animated.View entering={FadeInDown.duration(600)} style={styles.knowFoodContainer}>
        <LinearGradient colors={['#E8F5E9', '#F1F8E9']} style={styles.knowFoodBanner}>
          <View style={styles.knowFoodBannerContent}>
            <Text style={styles.knowFoodBannerTitle}>Wondering how to savour your{'\n'}favorite treats?</Text>
            <Text style={styles.knowFoodBannerDesc}>Enjoy tasty meals while managing sugar intake,{'\n'}curated by trusted dieticians</Text>
          </View>
          <View style={styles.knowFoodToggle}>
            <Ionicons name="ellipse" size={24} color={WL_COLORS.emerald} />
          </View>
        </LinearGradient>
        <Animated.View style={[styles.knowFoodSearch, borderStyle]}>
          <Ionicons name="search" size={18} color={COLORS.textTertiary} />
          <TextInput
            style={styles.knowFoodSearchInput}
            placeholder="Eg: Gulab Jamun"
            placeholderTextColor={COLORS.textMuted}
            value={searchText}
            onChangeText={setSearchText}
          />
        </Animated.View>
        <View style={styles.knowFoodCategories}>
          {['Fruits', 'Vegetables', 'Grains', 'Dairy', 'Protein', 'Sweets'].map((cat, i) => (
            <TouchableOpacity key={i} style={styles.knowFoodCategoryChip}>
              <Text style={styles.knowFoodCategoryText}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 8: BMI CALCULATOR
// ============================================================================
const BMICalculatorSection = React.memo(() => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);

  const calculateBMI = useCallback(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      setBmi((w / (h * h)).toFixed(1));
    }
  }, [height, weight]);

  const getBMICategory = useCallback((val) => {
    const v = parseFloat(val);
    if (v < 18.5) return { label: 'Underweight', color: '#0088FF' };
    if (v < 25) return { label: 'Normal', color: '#4CAF50' };
    if (v < 30) return { label: 'Overweight', color: '#FFB800' };
    if (v < 35) return { label: 'Obese I', color: '#FF6B35' };
    if (v < 40) return { label: 'Obese II', color: '#FF4444' };
    return { label: 'Obese III', color: '#D32F2F' };
  }, []);

  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="BMI Calculator" subtitle="Know your Body Mass Index" icon="calculator" color={WL_COLORS.healthBlue} />
      <Animated.View entering={FadeInDown.duration(600)} style={styles.bmiContainer}>
        <LinearGradient colors={['#E3F2FD', '#BBDEFB']} style={styles.bmiGradient}>
          <View style={styles.bmiInputRow}>
            <View style={styles.bmiInputGroup}>
              <Text style={styles.bmiInputLabel}>Height (cm)</Text>
              <TextInput
                style={styles.bmiInput}
                keyboardType="numeric"
                placeholder="170"
                placeholderTextColor={COLORS.textMuted}
                value={height}
                onChangeText={setHeight}
              />
            </View>
            <View style={styles.bmiInputGroup}>
              <Text style={styles.bmiInputLabel}>Weight (kg)</Text>
              <TextInput
                style={styles.bmiInput}
                keyboardType="numeric"
                placeholder="70"
                placeholderTextColor={COLORS.textMuted}
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.bmiButton} onPress={calculateBMI}>
            <LinearGradient colors={WL_COLORS.gradientEmerald} style={styles.bmiButtonGradient}>
              <Text style={styles.bmiButtonText}>Calculate BMI</Text>
            </LinearGradient>
          </TouchableOpacity>
          {bmi && (
            <Animated.View entering={FadeInDown.duration(400)} style={styles.bmiResult}>
              <Text style={styles.bmiResultValue}>{bmi}</Text>
              <View style={[styles.bmiResultBadge, { backgroundColor: getBMICategory(bmi).color + '20' }]}>
                <Text style={[styles.bmiResultLabel, { color: getBMICategory(bmi).color }]}>
                  {getBMICategory(bmi).label}
                </Text>
              </View>
            </Animated.View>
          )}
        </LinearGradient>
        <View style={styles.bmiScaleContainer}>
          {WL_DATA.bmiCategories.map((cat, i) => (
            <View key={i} style={styles.bmiScaleItem}>
              <View style={[styles.bmiScaleDot, { backgroundColor: cat.color }]} />
              <Text style={styles.bmiScaleRange}>{cat.range}</Text>
              <Text style={styles.bmiScaleLabel}>{cat.label}</Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 9: DIET PLANS
// ============================================================================
const DietPlanCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 80)} style={[animStyle, styles.dietPlanCardWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.dietPlanCard}>
        <View style={[styles.dietPlanIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <View style={styles.dietPlanInfo}>
          <Text style={styles.dietPlanTitle}>{item.title}</Text>
          <Text style={styles.dietPlanDesc} numberOfLines={2}>{item.desc}</Text>
          <View style={styles.dietPlanMeta}>
            <View style={styles.dietPlanMetaItem}>
              <Ionicons name="flame-outline" size={12} color={WL_COLORS.fitnessOrange} />
              <Text style={styles.dietPlanMetaText}>{item.calories} cal/day</Text>
            </View>
            <View style={styles.dietPlanMetaItem}>
              <Ionicons name="time-outline" size={12} color={WL_COLORS.healthBlue} />
              <Text style={styles.dietPlanMetaText}>{item.duration}</Text>
            </View>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={16} color={COLORS.textTertiary} />
      </TouchableOpacity>
    </Animated.View>
  );
});

const DietPlansSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Diet Plans" subtitle="Expert-curated meal plans" icon="restaurant" color={WL_COLORS.fitnessOrange} viewAll />
      {WL_DATA.dietPlans.map((item, index) => (
        <DietPlanCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 10: EXERCISE ROUTINES
// ============================================================================
const ExerciseCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.exerciseCard}>
        <LinearGradient colors={[item.color + '15', item.color + '08']} style={styles.exerciseCardGradient}>
          <View style={[styles.exerciseCardIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={28} color={item.color} />
          </View>
          <Text style={styles.exerciseCardTitle}>{item.title}</Text>
          <Text style={styles.exerciseCardDesc} numberOfLines={2}>{item.desc}</Text>
          <View style={styles.exerciseCardMeta}>
            <View style={[styles.exerciseCardBadge, { backgroundColor: item.color + '15' }]}>
              <Ionicons name="flame" size={10} color={item.color} />
              <Text style={[styles.exerciseCardBadgeText, { color: item.color }]}>{item.calories}</Text>
            </View>
            <View style={[styles.exerciseCardBadge, { backgroundColor: COLORS.backgroundMuted }]}>
              <Text style={styles.exerciseCardLevelText}>{item.level}</Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ExerciseRoutinesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Exercise Routines" subtitle="Burn calories effectively" icon="barbell" color={WL_COLORS.emerald} viewAll />
      <FlatList
        data={WL_DATA.exercises}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ExerciseCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 11: WEEKLY MEAL PLAN
// ============================================================================
const MealPlanDayCard = React.memo(({ item, index }) => {
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
        style={[styles.mealPlanDayCard, expanded && styles.mealPlanDayCardExpanded]}
      >
        <View style={styles.mealPlanDayHeader}>
          <View style={styles.mealPlanDayLeft}>
            <View style={[styles.mealPlanDayDot, { backgroundColor: WL_COLORS.emerald }]} />
            <Text style={styles.mealPlanDayName}>{item.day}</Text>
          </View>
          <View style={styles.mealPlanDayRight}>
            <Text style={styles.mealPlanCalories}>{item.calories} cal</Text>
            <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={16} color={COLORS.textTertiary} />
          </View>
        </View>
        {expanded && (
          <Animated.View entering={FadeInDown.duration(300)} style={styles.mealPlanDayDetails}>
            <View style={styles.mealPlanMealRow}>
              <View style={[styles.mealPlanMealIcon, { backgroundColor: WL_COLORS.fitnessOrangeFaded }]}>
                <Ionicons name="sunny" size={14} color={WL_COLORS.fitnessOrange} />
              </View>
              <View style={styles.mealPlanMealInfo}>
                <Text style={styles.mealPlanMealLabel}>Breakfast</Text>
                <Text style={styles.mealPlanMealText}>{item.breakfast}</Text>
              </View>
            </View>
            <View style={styles.mealPlanMealRow}>
              <View style={[styles.mealPlanMealIcon, { backgroundColor: WL_COLORS.emeraldFaded }]}>
                <Ionicons name="partly-sunny" size={14} color={WL_COLORS.emerald} />
              </View>
              <View style={styles.mealPlanMealInfo}>
                <Text style={styles.mealPlanMealLabel}>Lunch</Text>
                <Text style={styles.mealPlanMealText}>{item.lunch}</Text>
              </View>
            </View>
            <View style={styles.mealPlanMealRow}>
              <View style={[styles.mealPlanMealIcon, { backgroundColor: WL_COLORS.healthBlueFaded }]}>
                <Ionicons name="moon" size={14} color={WL_COLORS.healthBlue} />
              </View>
              <View style={styles.mealPlanMealInfo}>
                <Text style={styles.mealPlanMealLabel}>Dinner</Text>
                <Text style={styles.mealPlanMealText}>{item.dinner}</Text>
              </View>
            </View>
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
});

const WeeklyMealPlanSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Weekly Meal Plan" subtitle="7-day balanced nutrition" icon="calendar" color={WL_COLORS.emerald} />
      {WL_DATA.weeklyMealPlan.map((item, index) => (
        <MealPlanDayCard key={item.day} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 12: WEIGHT LOSS SUPPLEMENTS
// ============================================================================
const SupplementCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.supplementCard}>
        <View style={styles.supplementCardImage}>
          <LinearGradient colors={['#E8F5E9', '#C8E6C9']} style={styles.supplementCardImageGradient}>
            <Ionicons name="leaf" size={32} color={WL_COLORS.emerald} />
          </LinearGradient>
          <View style={styles.supplementDiscount}>
            <Text style={styles.supplementDiscountText}>{item.discount}% OFF</Text>
          </View>
        </View>
        <Text style={styles.supplementName} numberOfLines={2}>{item.name}</Text>
        <View style={styles.supplementRating}>
          <Ionicons name="star" size={10} color="#FFB800" />
          <Text style={styles.supplementRatingText}>{item.rating}</Text>
        </View>
        <View style={styles.supplementPriceRow}>
          <Text style={styles.supplementPrice}>&#8377;{item.price}</Text>
          <Text style={styles.supplementOldPrice}>&#8377;{item.oldPrice}</Text>
        </View>
        <TouchableOpacity style={styles.supplementAddButton}>
          <Text style={styles.supplementAddButtonText}>ADD</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const SupplementsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Weight Loss Supplements" subtitle="Doctor recommended" icon="leaf" color={WL_COLORS.emerald} viewAll />
      <FlatList
        data={WL_DATA.supplements}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <SupplementCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 13: SUCCESS STORIES
// ============================================================================
const SuccessStoryCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 120)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.storyCard}>
        <LinearGradient colors={['#FFFFFF', '#F8FFF8']} style={styles.storyCardGradient}>
          <View style={styles.storyCardHeader}>
            <View style={styles.storyCardAvatar}>
              <Ionicons name="person" size={24} color={WL_COLORS.emerald} />
            </View>
            <View style={styles.storyCardInfo}>
              <Text style={styles.storyCardName}>{item.name}</Text>
              <View style={styles.storyCardStats}>
                <View style={styles.storyCardStat}>
                  <Ionicons name="trending-down" size={12} color={WL_COLORS.emerald} />
                  <Text style={styles.storyCardStatText}>Lost {item.lost}</Text>
                </View>
                <View style={styles.storyCardStat}>
                  <Ionicons name="time" size={12} color={WL_COLORS.healthBlue} />
                  <Text style={styles.storyCardStatText}>{item.duration}</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.storyCardQuote}>"{item.quote}"</Text>
          <View style={styles.storyCardRating}>
            {Array.from({ length: 5 }, (_, i) => (
              <Ionicons key={i} name={i < item.rating ? 'star' : 'star-outline'} size={14} color="#FFB800" />
            ))}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const SuccessStoriesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Success Stories" subtitle="Real transformations" icon="trophy" color={WL_COLORS.emerald} />
      <FlatList
        data={WL_DATA.successStories}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <SuccessStoryCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 14: DOCTOR CONSULTATION CTA
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
      <Animated.View entering={FadeInUp.duration(600)} style={styles.doctorCTAContainer}>
        <LinearGradient colors={WL_COLORS.gradientEmerald} style={styles.doctorCTAGradient}>
          <Animated.View style={[styles.doctorCTAGlow, pulseStyle]} />
          <View style={styles.doctorCTAContent}>
            <View style={styles.doctorCTAIconContainer}>
              <Ionicons name="medkit" size={32} color={COLORS.textWhite} />
            </View>
            <Text style={styles.doctorCTATitle}>Consult a Weight Loss{'\n'}Specialist</Text>
            <Text style={styles.doctorCTADesc}>Get personalized diet and exercise plans from certified doctors</Text>
            <TouchableOpacity style={styles.doctorCTAButton}>
              <Text style={styles.doctorCTAButtonText}>Book Free Consultation</Text>
              <Ionicons name="arrow-forward" size={16} color={WL_COLORS.emerald} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 15: ASK APOLLO WEIGHT LOSS
// ============================================================================
const AskApolloWeightLoss = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.askApolloContainer}>
        <View style={styles.askApolloHeader}>
          <View style={styles.askApolloIcon}>
            <Ionicons name="chatbubbles" size={20} color={WL_COLORS.emerald} />
          </View>
          <View>
            <Text style={styles.askApolloTitle}>Private advice for weight{'\n'}management concerns</Text>
            <Text style={styles.askApolloSubtitle}>ASK APOLLO ABOUT...</Text>
          </View>
        </View>
        <View style={styles.askApolloQuestions}>
          {[
            'What is the best diet for quick weight loss?',
            'How many calories should I eat daily?',
            'Is intermittent fasting safe for me?',
            'Which supplements help with weight loss?',
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
// MAIN WEIGHT LOSS SCREEN
// ============================================================================
const WeightLossScreen = React.memo(({ scrollY }) => {
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
      <SmarterHealthChoicesSection />
      <SectionDivider variant="emerald" />
      <JourneyBanner />
      <SectionDivider variant="orange" />
      <EverythingForJourneySection />
      <SectionDivider variant="emerald" />
      <ObesityHealthRisksSection />
      <SectionDivider variant="orange" />
      <HealthToolsSection />
      <SectionDivider variant="emerald" />
      <KnowYourFoodSection />
      <SectionDivider variant="orange" />
      <BMICalculatorSection />
      <SectionDivider variant="emerald" />
      <DietPlansSection />
      <SectionDivider variant="orange" />
      <ExerciseRoutinesSection />
      <SectionDivider variant="emerald" />
      <WeeklyMealPlanSection />
      <SectionDivider variant="orange" />
      <SupplementsSection />
      <SectionDivider variant="emerald" />
      <SuccessStoriesSection />
      <SectionDivider variant="orange" />
      <AskApolloWeightLoss />
      <SectionDivider variant="emerald" />
      <DoctorConsultationCTA />
      <SectionDivider variant="emerald" />
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
    backgroundColor: WL_COLORS.emerald,
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
    backgroundColor: WL_COLORS.emeraldFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: WL_COLORS.emeraldSubtle,
  },
  heroTag: {
    backgroundColor: WL_COLORS.emeraldFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: WL_COLORS.emeraldSubtle,
  },
  heroTagText: {
    ...TYPOGRAPHY.badge,
    color: WL_COLORS.emerald,
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
    color: WL_COLORS.emerald,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  heroDescription: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
  },

  // SMARTER CHOICES
  smarterCard: {
    width: SCREEN_WIDTH * 0.52,
    borderRadius: RADIUS.card,
    backgroundColor: COLORS.cardWhite,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  smarterCardGradient: {
    padding: SPACING.lg,
    minHeight: 160,
  },
  smarterCardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  smarterCardTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  smarterCardDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  smarterCardArrow: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.backgroundMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // JOURNEY BANNER
  journeyBanner: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  journeyBannerGradient: {
    padding: SPACING.xl,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 160,
  },
  journeyBannerGlow: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: WL_COLORS.emerald,
  },
  journeyBannerContent: { flex: 1, zIndex: 1 },
  journeyBannerTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  journeyBannerBold: {
    fontWeight: '900',
    color: WL_COLORS.emerald,
  },
  journeyBannerDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  journeyBannerButton: {
    backgroundColor: COLORS.textPrimary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.button,
    alignSelf: 'flex-start',
  },
  journeyBannerButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  journeyBannerIconContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  journeyBannerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.cardSoft,
  },

  // JOURNEY CARDS GRID
  journeyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  journeyCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md) / 2,
  },
  journeyCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    ...SHADOWS.cardSoft,
    minHeight: 170,
    position: 'relative',
  },
  journeyCardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  journeyCardTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  journeyCardDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 16,
  },
  journeyCardArrow: {
    position: 'absolute',
    bottom: SPACING.md,
    right: SPACING.md,
  },

  // HEALTH RISKS
  riskCard: {
    width: SCREEN_WIDTH * 0.7,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  riskCardGradient: {
    padding: SPACING.lg,
    minHeight: 200,
  },
  riskCardHeader: {
    marginBottom: SPACING.md,
  },
  riskCardIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  riskCardTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.sm,
  },
  riskCardDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },

  // HEALTH TOOLS
  toolsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toolItemWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 3) / 4,
    alignItems: 'center',
  },
  toolItem: {
    alignItems: 'center',
  },
  toolItemIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  toolBadge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: WL_COLORS.fitnessOrange,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: RADIUS.xs,
  },
  toolBadgeText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontSize: 7,
  },
  toolItemTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },

  // KNOW YOUR FOOD
  knowFoodContainer: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  knowFoodBanner: {
    padding: SPACING.lg,
    flexDirection: 'row',
    alignItems: 'center',
  },
  knowFoodBannerContent: { flex: 1 },
  knowFoodBannerTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  knowFoodBannerDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
  knowFoodToggle: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  knowFoodSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.search,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    backgroundColor: COLORS.backgroundMuted,
    gap: SPACING.sm,
  },
  knowFoodSearchInput: {
    flex: 1,
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    padding: 0,
  },
  knowFoodCategories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  knowFoodCategoryChip: {
    backgroundColor: COLORS.backgroundMuted,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.chip,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  knowFoodCategoryText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },

  // BMI CALCULATOR
  bmiContainer: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  bmiGradient: {
    padding: SPACING.xl,
  },
  bmiInputRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  bmiInputGroup: { flex: 1 },
  bmiInputLabel: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  bmiInput: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm + 2,
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textPrimary,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  bmiButton: {
    borderRadius: RADIUS.button,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  bmiButtonGradient: {
    paddingVertical: SPACING.md + 2,
    alignItems: 'center',
    borderRadius: RADIUS.button,
  },
  bmiButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  bmiResult: {
    alignItems: 'center',
    paddingTop: SPACING.md,
  },
  bmiResultValue: {
    fontSize: 48,
    fontWeight: '900',
    color: COLORS.textPrimary,
  },
  bmiResultBadge: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.pill,
    marginTop: SPACING.sm,
  },
  bmiResultLabel: {
    ...TYPOGRAPHY.labelLarge,
    fontWeight: '700',
  },
  bmiScaleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: SPACING.lg,
    gap: SPACING.sm,
  },
  bmiScaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
    width: '45%',
    marginBottom: SPACING.xs,
  },
  bmiScaleDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  bmiScaleRange: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  bmiScaleLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
  },

  // DIET PLANS
  dietPlanCardWrapper: {
    marginBottom: SPACING.md,
  },
  dietPlanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    ...SHADOWS.cardSoft,
    gap: SPACING.md,
  },
  dietPlanIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dietPlanInfo: { flex: 1 },
  dietPlanTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  dietPlanDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.xs,
  },
  dietPlanMeta: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  dietPlanMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  dietPlanMetaText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
    fontSize: 10,
  },

  // EXERCISE CARDS
  exerciseCard: {
    width: SCREEN_WIDTH * 0.45,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  exerciseCardGradient: {
    padding: SPACING.lg,
    minHeight: 200,
  },
  exerciseCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  exerciseCardTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  exerciseCardDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.md,
    lineHeight: 16,
  },
  exerciseCardMeta: {
    flexDirection: 'row',
    gap: SPACING.sm,
    flexWrap: 'wrap',
  },
  exerciseCardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
    gap: 3,
  },
  exerciseCardBadgeText: {
    ...TYPOGRAPHY.badge,
    fontSize: 9,
  },
  exerciseCardLevelText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textSecondary,
    fontSize: 9,
  },

  // WEEKLY MEAL PLAN
  mealPlanDayCard: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.sm,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  mealPlanDayCardExpanded: {
    borderColor: WL_COLORS.emeraldSubtle,
    ...SHADOWS.cardSoft,
  },
  mealPlanDayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealPlanDayLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  mealPlanDayDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  mealPlanDayName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
  },
  mealPlanDayRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  mealPlanCalories: {
    ...TYPOGRAPHY.bodySmall,
    color: WL_COLORS.fitnessOrange,
    fontWeight: '600',
  },
  mealPlanDayDetails: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
  },
  mealPlanMealRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  mealPlanMealIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealPlanMealInfo: { flex: 1 },
  mealPlanMealLabel: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    letterSpacing: 1,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  mealPlanMealText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },

  // SUPPLEMENTS
  supplementCard: {
    width: 140,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.cardSoft,
  },
  supplementCardImage: {
    width: '100%',
    height: 100,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    position: 'relative',
  },
  supplementCardImageGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  supplementDiscount: {
    position: 'absolute',
    top: SPACING.xs,
    left: SPACING.xs,
    backgroundColor: WL_COLORS.emerald,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  supplementDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontSize: 8,
  },
  supplementName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '500',
    marginBottom: SPACING.xs,
    minHeight: 32,
  },
  supplementRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginBottom: SPACING.xs,
  },
  supplementRatingText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  supplementPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.sm,
  },
  supplementPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
  },
  supplementOldPrice: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
    fontSize: 10,
  },
  supplementAddButton: {
    backgroundColor: WL_COLORS.emerald,
    paddingVertical: SPACING.xs + 2,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  supplementAddButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },

  // SUCCESS STORIES
  storyCard: {
    width: SCREEN_WIDTH * 0.75,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  storyCardGradient: {
    padding: SPACING.lg,
  },
  storyCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  storyCardAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: WL_COLORS.emeraldFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: WL_COLORS.emeraldSubtle,
  },
  storyCardInfo: { flex: 1 },
  storyCardName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
  },
  storyCardStats: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginTop: 2,
  },
  storyCardStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  storyCardStatText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  storyCardQuote: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  storyCardRating: {
    flexDirection: 'row',
    gap: 2,
  },

  // DOCTOR CTA
  doctorCTAContainer: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  doctorCTAGradient: {
    padding: SPACING.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  doctorCTAGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  doctorCTAContent: { zIndex: 1, alignItems: 'center' },
  doctorCTAIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  doctorCTATitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textWhite,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  doctorCTADesc: {
    ...TYPOGRAPHY.bodyMedium,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  doctorCTAButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    gap: SPACING.sm,
    ...SHADOWS.button,
  },
  doctorCTAButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: WL_COLORS.emerald,
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
    backgroundColor: WL_COLORS.emeraldFaded,
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
    backgroundColor: WL_COLORS.emerald,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.button,
    gap: SPACING.sm,
  },
  askApolloButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
});

export default WeightLossScreen;
