/**
 * ============================================================================
 * APOLLO 24/7 - INSURANCE PLANS & BENEFITS SECTION
 * ============================================================================
 *
 * Premium health cover plans carousel, benefits grid, claim process,
 * coverage comparison, and tax benefits sections.
 *
 * Features:
 * - Auto-scrolling plans carousel with snap
 * - Animated benefit cards with staggered entrance
 * - Step-by-step claim process with connecting lines
 * - Coverage comparison with animated checkmarks
 * - Tax benefits calculator with animated bars
 * - Spring physics on all interactions
 *
 * ============================================================================
 */

import React, { useEffect, useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  ScrollView,
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
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT } from '../home/theme';
import { INSURANCE_COLORS, INSURANCE_LAYOUT, INSURANCE_DATA } from './InsuranceTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// PLAN CARD COMPONENT
// ============================================================================
const PlanCard = React.memo(({ plan, index }) => {
  const cardScale = useSharedValue(1);
  const cardOpacity = useSharedValue(0);
  const cardTranslateX = useSharedValue(50);
  const featureOpacity = useSharedValue(0);
  const ctaGlow = useSharedValue(0);
  const badgePulse = useSharedValue(1);

  useEffect(() => {
    const delay = index * 100;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 500 }));
    cardTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    featureOpacity.value = withDelay(delay + 400, withTiming(1, { duration: 400 }));

    if (plan.recommended) {
      badgePulse.value = withRepeat(
        withSequence(
          withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );

      ctaGlow.value = withRepeat(
        withSequence(
          withTiming(0.4, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      );
    }
  }, [index, plan.recommended]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.97, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateX: cardTranslateX.value }, { scale: cardScale.value }],
  }));

  const featureAnimStyle = useAnimatedStyle(() => ({
    opacity: featureOpacity.value,
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgePulse.value }],
  }));

  const ctaGlowStyle = useAnimatedStyle(() => ({
    opacity: ctaGlow.value,
  }));

  return (
    <Animated.View style={[planStyles.cardWrapper, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[planStyles.card, plan.recommended && planStyles.cardRecommended]}
      >
        {/* Top accent bar */}
        <View style={[planStyles.accentBar, { backgroundColor: plan.color }]} />

        {/* Badge */}
        <Animated.View style={[planStyles.badge, { backgroundColor: plan.color + '15' }, badgeStyle]}>
          <Text style={[planStyles.badgeText, { color: plan.color }]}>{plan.badge}</Text>
        </Animated.View>

        {/* Plan Name */}
        <Text style={planStyles.planName}>{plan.name}</Text>

        {/* Cover Amount */}
        <View style={planStyles.coverRow}>
          <Text style={planStyles.coverLabel}>Cover Amount</Text>
          <Text style={[planStyles.coverAmount, { color: plan.color }]}>{'\u20B9'}{plan.coverAmount}</Text>
        </View>

        {/* Premium */}
        <View style={planStyles.premiumRow}>
          <View style={planStyles.premiumLeft}>
            <Text style={planStyles.premiumLabel}>Starting at</Text>
            <Text style={planStyles.premiumAmount}>{'\u20B9'}{plan.premium}</Text>
          </View>
          <View style={[planStyles.dailyCostBadge, { backgroundColor: plan.color + '10' }]}>
            <Text style={[planStyles.dailyCostText, { color: plan.color }]}>
              Just {'\u20B9'}{plan.dailyCost}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View style={planStyles.divider} />

        {/* Features */}
        <Animated.View style={[planStyles.featuresContainer, featureAnimStyle]}>
          {plan.features.map((feature, idx) => (
            <View key={idx} style={planStyles.featureRow}>
              <View style={[planStyles.featureCheck, { backgroundColor: plan.color + '15' }]}>
                <Ionicons name="checkmark" size={10} color={plan.color} />
              </View>
              <Text style={planStyles.featureText}>{feature}</Text>
            </View>
          ))}
        </Animated.View>

        {/* Savings badge */}
        <View style={[planStyles.savingsBadge, { backgroundColor: '#E8F5E9' }]}>
          <Ionicons name="trending-down" size={14} color="#2E7D32" />
          <Text style={planStyles.savingsText}>{plan.savings}</Text>
        </View>

        {/* CTA Button */}
        <TouchableOpacity
          style={[planStyles.ctaButton, { backgroundColor: plan.color }]}
          activeOpacity={0.8}
        >
          <Animated.View style={[planStyles.ctaGlow, ctaGlowStyle, { backgroundColor: '#FFFFFF' }]} />
          <Text style={planStyles.ctaText}>Get This Plan</Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// PLANS CAROUSEL SECTION
// ============================================================================
export const PlansCarouselSection = React.memo(() => {
  const plans = useMemo(() => INSURANCE_DATA.plans, []);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(30);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: 500 });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const sectionStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const renderPlan = useCallback(({ item, index }) => (
    <PlanCard plan={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item) => item.id.toString(), []);

  return (
    <Animated.View style={[planStyles.section, sectionStyle]}>
      {/* Section Header */}
      <View style={planStyles.sectionHeader}>
        <View>
          <Text style={planStyles.sectionTitle}>Health Cover Plans</Text>
          <Text style={planStyles.sectionSubtitle}>Apollo-recommended plans for you</Text>
        </View>
        <TouchableOpacity style={planStyles.compareButton} activeOpacity={0.7}>
          <Text style={planStyles.compareText}>Compare</Text>
          <Ionicons name="swap-horizontal" size={14} color={INSURANCE_COLORS.insuranceTeal} />
        </TouchableOpacity>
      </View>

      {/* Plans Carousel */}
      <FlatList
        data={plans}
        renderItem={renderPlan}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={planStyles.carouselContent}
        snapToInterval={INSURANCE_LAYOUT.planCardWidth + SPACING.md}
        decelerationRate="fast"
        bounces={true}
      />
    </Animated.View>
  );
});

// ============================================================================
// BENEFIT CARD
// ============================================================================
const BenefitCard = React.memo(({ benefit, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(30);
  const iconScale = useSharedValue(0);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 80;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    iconScale.value = withDelay(delay + 200, withSpring(1, { damping: 10, stiffness: 200 }));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  return (
    <Animated.View style={[benefitStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={benefitStyles.card}
      >
        <Animated.View style={[benefitStyles.iconContainer, iconStyle, { backgroundColor: benefit.color + '12' }]}>
          <Ionicons name={benefit.icon} size={22} color={benefit.color} />
        </Animated.View>
        <Text style={benefitStyles.title}>{benefit.title}</Text>
        <Text style={benefitStyles.description}>{benefit.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// BENEFITS SECTION
// ============================================================================
export const BenefitsSection = React.memo(() => {
  const benefits = useMemo(() => INSURANCE_DATA.benefits, []);

  return (
    <View style={benefitStyles.section}>
      <View style={benefitStyles.sectionHeader}>
        <Ionicons name="star" size={18} color={INSURANCE_COLORS.assuredGold} />
        <Text style={benefitStyles.sectionTitle}>Why Apollo Insurance?</Text>
      </View>
      <Text style={benefitStyles.sectionSubtitle}>Trusted by 25 lakh+ families across India</Text>

      <View style={benefitStyles.grid}>
        {benefits.map((benefit, index) => (
          <BenefitCard key={benefit.id} benefit={benefit} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// CLAIM STEP COMPONENT
// ============================================================================
const ClaimStep = React.memo(({ step, index, isLast }) => {
  const stepOpacity = useSharedValue(0);
  const stepTranslateX = useSharedValue(-30);
  const iconScale = useSharedValue(0);
  const lineHeight = useSharedValue(0);

  useEffect(() => {
    const delay = index * 200;
    stepOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    stepTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
    iconScale.value = withDelay(delay + 100, withSpring(1, { damping: 10, stiffness: 200 }));
    if (!isLast) {
      lineHeight.value = withDelay(delay + 300, withTiming(1, { duration: 300 }));
    }
  }, [index, isLast]);

  const stepStyle = useAnimatedStyle(() => ({
    opacity: stepOpacity.value,
    transform: [{ translateX: stepTranslateX.value }],
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: lineHeight.value }],
  }));

  return (
    <Animated.View style={[claimStyles.stepContainer, stepStyle]}>
      <View style={claimStyles.stepLeft}>
        {/* Step number circle */}
        <Animated.View style={[claimStyles.stepCircle, iconStyle, { backgroundColor: step.color + '15', borderColor: step.color }]}>
          <Ionicons name={step.icon} size={20} color={step.color} />
        </Animated.View>
        {/* Connecting line */}
        {!isLast && (
          <Animated.View style={[claimStyles.connectingLine, lineStyle, { backgroundColor: step.color + '30' }]} />
        )}
      </View>
      <View style={claimStyles.stepContent}>
        <View style={claimStyles.stepHeader}>
          <Text style={[claimStyles.stepNumber, { color: step.color }]}>Step {step.step}</Text>
          <Text style={claimStyles.stepTitle}>{step.title}</Text>
        </View>
        <Text style={claimStyles.stepDescription}>{step.description}</Text>
      </View>
    </Animated.View>
  );
});

// ============================================================================
// CLAIM PROCESS SECTION
// ============================================================================
export const ClaimProcessSection = React.memo(() => {
  const steps = useMemo(() => INSURANCE_DATA.claimSteps, []);

  return (
    <View style={claimStyles.section}>
      <View style={claimStyles.sectionHeader}>
        <View style={claimStyles.sectionIcon}>
          <Ionicons name="document-text" size={18} color={INSURANCE_COLORS.insuranceTeal} />
        </View>
        <View>
          <Text style={claimStyles.sectionTitle}>Easy Claim Process</Text>
          <Text style={claimStyles.sectionSubtitle}>Get your claims settled in 4 simple steps</Text>
        </View>
      </View>

      <View style={claimStyles.stepsContainer}>
        {steps.map((step, index) => (
          <ClaimStep
            key={step.id}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
          />
        ))}
      </View>

      {/* Quick claim CTA */}
      <View style={claimStyles.quickClaimBanner}>
        <LinearGradient
          colors={['#E8F5E9', '#F1F8E9']}
          style={claimStyles.quickClaimGradient}
        >
          <View style={claimStyles.quickClaimContent}>
            <Ionicons name="flash" size={20} color="#2E7D32" />
            <View style={claimStyles.quickClaimText}>
              <Text style={claimStyles.quickClaimTitle}>30-Minute Claim Settlement</Text>
              <Text style={claimStyles.quickClaimSubtitle}>Fastest in the industry</Text>
            </View>
          </View>
          <View style={claimStyles.quickClaimBadge}>
            <Text style={claimStyles.quickClaimBadgeText}>92% ratio</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

// ============================================================================
// COVERAGE CATEGORY
// ============================================================================
const CoverageCategory = React.memo(({ category, index }) => {
  const [expanded, setExpanded] = useState(index === 0);
  const contentHeight = useSharedValue(index === 0 ? 1 : 0);
  const rotateIcon = useSharedValue(index === 0 ? 180 : 0);
  const categoryOpacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 100;
    categoryOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
  }, [index]);

  const toggleExpand = useCallback(() => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    contentHeight.value = withTiming(newExpanded ? 1 : 0, { duration: 300 });
    rotateIcon.value = withTiming(newExpanded ? 180 : 0, { duration: 300 });
  }, [expanded]);

  const contentStyle = useAnimatedStyle(() => ({
    maxHeight: interpolate(contentHeight.value, [0, 1], [0, 300]),
    opacity: contentHeight.value,
    overflow: 'hidden',
  }));

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotateIcon.value}deg` }],
  }));

  const catStyle = useAnimatedStyle(() => ({
    opacity: categoryOpacity.value,
  }));

  return (
    <Animated.View style={[coverageStyles.category, catStyle]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleExpand}
        style={coverageStyles.categoryHeader}
      >
        <View style={coverageStyles.categoryLeft}>
          <View style={coverageStyles.categoryDot} />
          <Text style={coverageStyles.categoryName}>{category.name}</Text>
          <View style={coverageStyles.countBadge}>
            <Text style={coverageStyles.countText}>{category.items.length}</Text>
          </View>
        </View>
        <Animated.View style={iconStyle}>
          <Ionicons name="chevron-down" size={18} color={COLORS.textTertiary} />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={contentStyle}>
        <View style={coverageStyles.itemsContainer}>
          {category.items.map((item, idx) => (
            <View key={idx} style={coverageStyles.coverageItem}>
              <Ionicons
                name={item.covered === true ? 'checkmark-circle' : 'add-circle'}
                size={16}
                color={item.covered === true ? '#2E7D32' : '#FF6B35'}
              />
              <Text style={coverageStyles.itemName}>{item.name}</Text>
              {item.covered === 'optional' && (
                <View style={coverageStyles.optionalBadge}>
                  <Text style={coverageStyles.optionalText}>Add-on</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
});

// ============================================================================
// COVERAGE COMPARISON SECTION
// ============================================================================
export const CoverageComparisonSection = React.memo(() => {
  const data = useMemo(() => INSURANCE_DATA.coverageComparison, []);

  return (
    <View style={coverageStyles.section}>
      <View style={coverageStyles.sectionHeader}>
        <Ionicons name="list" size={18} color={INSURANCE_COLORS.insuranceTeal} />
        <Text style={coverageStyles.sectionTitle}>{data.title}</Text>
      </View>

      <View style={coverageStyles.categoriesContainer}>
        {data.categories.map((category, index) => (
          <CoverageCategory key={category.id} category={category} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// TAX BENEFIT ITEM
// ============================================================================
const TaxBenefitItem = React.memo(({ item, index }) => {
  const barWidth = useSharedValue(0);
  const itemOpacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 150;
    itemOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    barWidth.value = withDelay(delay + 200, withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) }));
  }, [index]);

  const barStyle = useAnimatedStyle(() => ({
    width: `${barWidth.value * 100}%`,
  }));

  const itemStyle = useAnimatedStyle(() => ({
    opacity: itemOpacity.value,
  }));

  return (
    <Animated.View style={[taxStyles.item, itemStyle]}>
      <View style={taxStyles.itemHeader}>
        <View style={taxStyles.itemLeft}>
          <Ionicons name={item.icon} size={16} color={INSURANCE_COLORS.insuranceTeal} />
          <Text style={taxStyles.itemLabel}>{item.label}</Text>
        </View>
        <Text style={taxStyles.itemAmount}>{'\u20B9'}{item.amount}</Text>
      </View>
      <View style={taxStyles.barContainer}>
        <Animated.View style={[taxStyles.bar, barStyle]} />
      </View>
    </Animated.View>
  );
});

// ============================================================================
// TAX BENEFITS SECTION
// ============================================================================
export const TaxBenefitsSection = React.memo(() => {
  const data = useMemo(() => INSURANCE_DATA.taxBenefits, []);

  return (
    <View style={taxStyles.section}>
      <View style={taxStyles.sectionHeader}>
        <LinearGradient
          colors={['#E8F5E9', '#F1F8E9']}
          style={taxStyles.headerGradient}
        >
          <View style={taxStyles.headerContent}>
            <Ionicons name="calculator" size={20} color={INSURANCE_COLORS.insuranceTeal} />
            <View>
              <Text style={taxStyles.sectionTitle}>{data.title}</Text>
              <Text style={taxStyles.sectionSubtitle}>Save tax while staying protected</Text>
            </View>
          </View>
          <View style={taxStyles.totalSavings}>
            <Text style={taxStyles.totalLabel}>Max Savings</Text>
            <Text style={taxStyles.totalAmount}>{'\u20B9'}{data.seniorLimit}</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={taxStyles.itemsContainer}>
        {data.sections.map((item, index) => (
          <TaxBenefitItem key={index} item={item} index={index} />
        ))}
      </View>

      {/* Tax disclaimer */}
      <View style={taxStyles.disclaimer}>
        <Ionicons name="information-circle" size={14} color={COLORS.textTertiary} />
        <Text style={taxStyles.disclaimerText}>
          Tax benefits are subject to provisions of the Income Tax Act. Please consult your tax advisor.
        </Text>
      </View>
    </View>
  );
});

// ============================================================================
// QUICK TIPS SECTION
// ============================================================================
export const QuickTipsSection = React.memo(() => {
  const tips = useMemo(() => INSURANCE_DATA.quickTips, []);

  return (
    <View style={tipStyles.section}>
      <View style={tipStyles.sectionHeader}>
        <Ionicons name="bulb" size={18} color={INSURANCE_COLORS.assuredGold} />
        <Text style={tipStyles.sectionTitle}>Insurance Tips</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={tipStyles.scrollContent}
      >
        {tips.map((tip, index) => (
          <QuickTipCard key={tip.id} tip={tip} index={index} />
        ))}
      </ScrollView>
    </View>
  );
});

// ============================================================================
// QUICK TIP CARD
// ============================================================================
const QuickTipCard = React.memo(({ tip, index }) => {
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
        <View style={tipStyles.tipIcon}>
          <Ionicons name={tip.icon} size={20} color={INSURANCE_COLORS.insuranceTeal} />
        </View>
        <Text style={tipStyles.tipTitle}>{tip.title}</Text>
        <Text style={tipStyles.tipDescription}>{tip.description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// CRITICAL ILLNESS SECTION
// ============================================================================
export const CriticalIllnessSection = React.memo(() => {
  const illnesses = useMemo(() => INSURANCE_DATA.criticalIllness, []);

  return (
    <View style={criticalStyles.section}>
      <View style={criticalStyles.sectionHeader}>
        <Ionicons name="alert-circle" size={18} color={INSURANCE_COLORS.warningRed} />
        <Text style={criticalStyles.sectionTitle}>Critical Illness Add-ons</Text>
      </View>
      <Text style={criticalStyles.sectionSubtitle}>Extra protection for serious conditions</Text>

      <View style={criticalStyles.grid}>
        {illnesses.map((illness, index) => (
          <CriticalIllnessCard key={illness.id} illness={illness} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// CRITICAL ILLNESS CARD
// ============================================================================
const CriticalIllnessCard = React.memo(({ illness, index }) => {
  const cardOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(20);
  const cardScale = useSharedValue(1);

  useEffect(() => {
    const delay = index * 80;
    cardOpacity.value = withDelay(delay, withTiming(1, { duration: 400 }));
    cardTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }, { scale: cardScale.value }],
  }));

  return (
    <Animated.View style={[criticalStyles.cardWrapper, cardStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={criticalStyles.card}
      >
        <View style={criticalStyles.iconRow}>
          <View style={criticalStyles.iconContainer}>
            <Ionicons name={illness.icon} size={18} color={INSURANCE_COLORS.warningRed} />
          </View>
          <View style={criticalStyles.premiumBadge}>
            <Text style={criticalStyles.premiumText}>{illness.premium}</Text>
          </View>
        </View>
        <Text style={criticalStyles.illnessName}>{illness.name}</Text>
        <Text style={criticalStyles.coverAmount}>Cover: {'\u20B9'}{illness.coverAmount}</Text>
        <TouchableOpacity style={criticalStyles.addButton} activeOpacity={0.7}>
          <Text style={criticalStyles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// NETWORK HOSPITALS SECTION
// ============================================================================
export const NetworkHospitalsSection = React.memo(() => {
  const data = useMemo(() => INSURANCE_DATA.networkHospitals, []);

  return (
    <View style={networkStyles.section}>
      <View style={networkStyles.sectionHeader}>
        <Ionicons name="business" size={18} color={INSURANCE_COLORS.insuranceTeal} />
        <Text style={networkStyles.sectionTitle}>Cashless Network</Text>
      </View>

      {/* Stats row */}
      <View style={networkStyles.statsRow}>
        <View style={networkStyles.statCard}>
          <Text style={networkStyles.statValue}>{data.total}</Text>
          <Text style={networkStyles.statLabel}>Hospitals</Text>
        </View>
        <View style={networkStyles.statCard}>
          <Text style={networkStyles.statValue}>{data.cities}</Text>
          <Text style={networkStyles.statLabel}>Cities</Text>
        </View>
        <View style={networkStyles.statCard}>
          <Text style={networkStyles.statValue}>{data.apolloHospitals}</Text>
          <Text style={networkStyles.statLabel}>Apollo Hospitals</Text>
        </View>
      </View>

      {/* Top Cities */}
      <Text style={networkStyles.citiesTitle}>Top Cities</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={networkStyles.citiesScroll}
      >
        {data.topCities.map((city, index) => (
          <View key={index} style={networkStyles.cityChip}>
            <Ionicons name="location" size={12} color={INSURANCE_COLORS.insuranceTeal} />
            <Text style={networkStyles.cityName}>{city.name}</Text>
            <Text style={networkStyles.cityCount}>{city.count}+</Text>
          </View>
        ))}
      </ScrollView>

      {/* Find hospital CTA */}
      <TouchableOpacity style={networkStyles.findButton} activeOpacity={0.7}>
        <Ionicons name="search" size={16} color="#FFFFFF" />
        <Text style={networkStyles.findButtonText}>Find Nearest Hospital</Text>
      </TouchableOpacity>
    </View>
  );
});

// ============================================================================
// STYLES - PLANS
// ============================================================================
const planStyles = StyleSheet.create({
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
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
  compareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
  },
  compareText: {
    ...TYPOGRAPHY.labelSmall,
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '700',
  },
  carouselContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },
  cardWrapper: {
    width: INSURANCE_LAYOUT.planCardWidth,
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft,
    overflow: 'hidden',
    position: 'relative',
  },
  cardRecommended: {
    borderColor: INSURANCE_COLORS.insuranceTealSubtle,
    borderWidth: 2,
    ...SHADOWS.cardMedium,
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
    marginBottom: SPACING.md,
    marginTop: SPACING.xs,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 1,
  },
  planName: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  coverRow: {
    marginBottom: SPACING.md,
  },
  coverLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginBottom: 2,
  },
  coverAmount: {
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
  },
  premiumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  premiumLeft: {},
  premiumLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
  },
  premiumAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textPrimary,
  },
  dailyCostBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.sm,
  },
  dailyCostText: {
    fontSize: 10,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.dividerLight,
    marginVertical: SPACING.md,
  },
  featuresContainer: {
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.sm,
  },
  featureCheck: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 1,
  },
  featureText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  savingsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
  },
  savingsText: {
    ...TYPOGRAPHY.labelSmall,
    color: '#2E7D32',
    fontWeight: '700',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    position: 'relative',
    overflow: 'hidden',
  },
  ctaGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RADIUS.md,
  },
  ctaText: {
    ...TYPOGRAPHY.labelLarge,
    color: '#FFFFFF',
    fontWeight: '800',
  },
});

// ============================================================================
// STYLES - BENEFITS
// ============================================================================
const benefitStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 4,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  cardWrapper: {
    width: (SCREEN_WIDTH - 52) / 2,
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft,
    minHeight: 140,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  title: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 16,
  },
});

// ============================================================================
// STYLES - CLAIM PROCESS
// ============================================================================
const claimStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
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
  stepsContainer: {
    paddingLeft: SPACING.xs,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: SPACING.sm,
  },
  stepLeft: {
    alignItems: 'center',
    width: 48,
  },
  stepCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  connectingLine: {
    width: 2,
    height: 30,
    marginTop: 4,
    borderRadius: 1,
    transformOrigin: 'top',
  },
  stepContent: {
    flex: 1,
    paddingLeft: SPACING.md,
    paddingTop: 4,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 4,
  },
  stepNumber: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  stepTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
  },
  stepDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 18,
  },
  quickClaimBanner: {
    marginTop: SPACING.lg,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  quickClaimGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  quickClaimContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  quickClaimText: {},
  quickClaimTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: '#2E7D32',
  },
  quickClaimSubtitle: {
    ...TYPOGRAPHY.caption,
    color: '#4CAF50',
    marginTop: 2,
  },
  quickClaimBadge: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
  },
  quickClaimBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

// ============================================================================
// STYLES - COVERAGE COMPARISON
// ============================================================================
const coverageStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  categoriesContainer: {
    gap: SPACING.sm,
  },
  category: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: INSURANCE_COLORS.insuranceTeal,
  },
  categoryName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
  },
  countBadge: {
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: RADIUS.xs,
  },
  countText: {
    fontSize: 10,
    fontWeight: '700',
    color: INSURANCE_COLORS.insuranceTeal,
  },
  itemsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  coverageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  itemName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    flex: 1,
  },
  optionalBadge: {
    backgroundColor: INSURANCE_COLORS.ctaOrangeFaded,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: RADIUS.xs,
  },
  optionalText: {
    fontSize: 8,
    fontWeight: '700',
    color: INSURANCE_COLORS.ctaOrange,
  },
});

// ============================================================================
// STYLES - TAX BENEFITS
// ============================================================================
const taxStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  headerGradient: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.lg,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  sectionTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  totalSavings: {
    alignItems: 'flex-end',
  },
  totalLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
  },
  totalAmount: {
    ...TYPOGRAPHY.h4,
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '900',
  },
  itemsContainer: {
    gap: SPACING.lg,
  },
  item: {},
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  itemLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  itemAmount: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
  },
  barContainer: {
    height: 6,
    backgroundColor: COLORS.backgroundMuted,
    borderRadius: 3,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: INSURANCE_COLORS.insuranceTeal,
    borderRadius: 3,
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginTop: SPACING.lg,
    padding: SPACING.md,
    backgroundColor: COLORS.backgroundMuted,
    borderRadius: RADIUS.md,
  },
  disclaimerText: {
    fontSize: 10,
    color: COLORS.textTertiary,
    flex: 1,
    lineHeight: 15,
  },
});

// ============================================================================
// STYLES - QUICK TIPS
// ============================================================================
const tipStyles = StyleSheet.create({
  section: {
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  scrollContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
  },
  cardWrapper: {
    width: 160,
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft,
    minHeight: 140,
  },
  tipIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  tipTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 11,
    color: COLORS.textTertiary,
    lineHeight: 16,
  },
});

// ============================================================================
// STYLES - CRITICAL ILLNESS
// ============================================================================
const criticalStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 4,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  sectionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  cardWrapper: {
    width: (SCREEN_WIDTH - 52) / 2,
  },
  card: {
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.cardSoft,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: INSURANCE_COLORS.warningRedFaded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumBadge: {
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  premiumText: {
    fontSize: 9,
    fontWeight: '700',
    color: INSURANCE_COLORS.insuranceTeal,
  },
  illnessName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  coverAmount: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    marginBottom: SPACING.sm,
  },
  addButton: {
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
  },
  addButtonText: {
    ...TYPOGRAPHY.labelSmall,
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '700',
  },
});

// ============================================================================
// STYLES - NETWORK HOSPITALS
// ============================================================================
const networkStyles = StyleSheet.create({
  section: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  statsRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '900',
    color: INSURANCE_COLORS.insuranceTeal,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '500',
    color: COLORS.textTertiary,
    textAlign: 'center',
  },
  citiesTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  citiesScroll: {
    gap: SPACING.sm,
    paddingBottom: SPACING.md,
  },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  cityName: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  cityCount: {
    ...TYPOGRAPHY.caption,
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '700',
  },
  findButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: INSURANCE_COLORS.insuranceTeal,
    paddingVertical: SPACING.md + 2,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  findButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
