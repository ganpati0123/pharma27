/**
 * ============================================================================
 * APOLLO 24/7 - INSURANCE SCREEN (PREMIUM EDITION)
 * ============================================================================
 *
 * Premium Insurance vertical screen composing all sections:
 *
 * 1. Hero Banner (Save up to 50% + Apollo Assured seal)
 * 2. Insurance Type Cards (Have/Don't Have Insurance)
 * 3. Expert Help Banner (Advisor + CTA)
 * 4. Trust Stats Bar (25L+ Families, 14K+ Hospitals, etc.)
 * 5. Health Cover Plans Carousel (4 premium plans)
 * 6. Benefits Grid (Why Apollo Insurance - 6 cards)
 * 7. Claim Process (4 steps with connecting lines)
 * 8. Coverage Comparison (Expandable categories)
 * 9. Partners Section (12 insurance partners)
 * 10. Testimonials Carousel (Customer stories)
 * 11. Premium Calculator (Age-based estimation)
 * 12. Tax Benefits (Section 80D breakdown)
 * 13. Critical Illness Add-ons (6 conditions)
 * 14. Network Hospitals (14K+ hospitals)
 * 15. Quick Tips (6 insurance tips)
 * 16. FAQ Accordion (8 questions)
 * 17. Footer
 *
 * ============================================================================
 */

import React, { useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  interpolate,
  Extrapolation,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION } from '../home/theme';
import { INSURANCE_COLORS } from './InsuranceTheme';

// Section Components
import { InsuranceHeroBanner, InsuranceCardsSection, ExpertHelpBanner, TrustStatsBar } from './InsuranceHero';
import { PlansCarouselSection, BenefitsSection, ClaimProcessSection, CoverageComparisonSection, TaxBenefitsSection, QuickTipsSection, CriticalIllnessSection, NetworkHospitalsSection } from './InsurancePlans';
import { PartnersSection, TestimonialsSection, FaqSection, PremiumCalculatorSection } from './InsurancePartners';

// Reuse Footer from home
import { Footer } from '../home/DiscoverSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// SECTION DIVIDER
// ============================================================================
const InsuranceDivider = React.memo(({ variant }) => {
  return (
    <View style={dividerStyles.container}>
      <View style={[dividerStyles.line, variant === 'teal' ? dividerStyles.lineTeal : dividerStyles.lineGold]} />
      <View style={dividerStyles.dotContainer}>
        <Ionicons
          name={variant === 'teal' ? 'shield' : 'diamond'}
          size={10}
          color={variant === 'teal' ? INSURANCE_COLORS.insuranceTeal : INSURANCE_COLORS.assuredGold}
        />
      </View>
      <View style={[dividerStyles.line, variant === 'teal' ? dividerStyles.lineTeal : dividerStyles.lineGold]} />
    </View>
  );
});

// ============================================================================
// INSURANCE HERO HEADER
// ============================================================================
const InsuranceScreenHero = React.memo(() => {
  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const badgeScale = useSharedValue(0.8);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: ANIMATION.duration.entrance });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    badgeScale.value = withDelay(300, withSpring(1, { damping: 12, stiffness: 120 }));
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslateY.value }],
  }));

  const badgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: badgeScale.value }],
  }));

  return (
    <Animated.View style={[heroStyles.container, heroStyle]}>
      <LinearGradient
        colors={['rgba(43, 138, 111, 0.05)', 'rgba(212, 160, 23, 0.03)', COLORS.backgroundPure]}
        style={heroStyles.gradient}
      >
        <View style={heroStyles.content}>
          <View style={heroStyles.iconRow}>
            <View style={heroStyles.badge}>
              <Ionicons name="shield-checkmark" size={16} color={INSURANCE_COLORS.insuranceTeal} />
            </View>
            <Animated.View style={[heroStyles.editionTag, badgeStyle]}>
              <Text style={heroStyles.editionTagText}>APOLLO ASSURED</Text>
            </Animated.View>
          </View>

          <Text style={heroStyles.title}>Insurance</Text>
          <Text style={heroStyles.subtitle}>
            Your trusted health cover destination
          </Text>
          <Text style={heroStyles.description}>
            Compare plans, get expert advice, stay protected
          </Text>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// MAIN INSURANCE SCREEN
// ============================================================================
const InsuranceScreen = React.memo(({ scrollY }) => {
  // Scroll-based parallax
  const parallaxStyle = useAnimatedStyle(() => {
    if (!scrollY) return {};
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 500],
            [0, -50],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, parallaxStyle]}>
      {/* Screen Hero */}
      <InsuranceScreenHero />

      {/* Section 1: Hero Banner */}
      <InsuranceHeroBanner />
      <InsuranceDivider variant="teal" />

      {/* Section 2: Insurance Cards */}
      <InsuranceCardsSection />
      <InsuranceDivider variant="gold" />

      {/* Section 3: Expert Help Banner */}
      <ExpertHelpBanner />
      <InsuranceDivider variant="teal" />

      {/* Section 4: Trust Stats */}
      <TrustStatsBar />
      <InsuranceDivider variant="gold" />

      {/* Section 5: Health Cover Plans */}
      <PlansCarouselSection />
      <InsuranceDivider variant="teal" />

      {/* Section 6: Benefits */}
      <BenefitsSection />
      <InsuranceDivider variant="gold" />

      {/* Section 7: Claim Process */}
      <ClaimProcessSection />
      <InsuranceDivider variant="teal" />

      {/* Section 8: Coverage Comparison */}
      <CoverageComparisonSection />
      <InsuranceDivider variant="gold" />

      {/* Section 9: Partners */}
      <PartnersSection />
      <InsuranceDivider variant="teal" />

      {/* Section 10: Testimonials */}
      <TestimonialsSection />
      <InsuranceDivider variant="gold" />

      {/* Section 11: Premium Calculator */}
      <PremiumCalculatorSection />
      <InsuranceDivider variant="teal" />

      {/* Section 12: Tax Benefits */}
      <TaxBenefitsSection />
      <InsuranceDivider variant="gold" />

      {/* Section 13: Critical Illness */}
      <CriticalIllnessSection />
      <InsuranceDivider variant="teal" />

      {/* Section 14: Network Hospitals */}
      <NetworkHospitalsSection />
      <InsuranceDivider variant="gold" />

      {/* Section 15: Quick Tips */}
      <QuickTipsSection />
      <InsuranceDivider variant="teal" />

      {/* Section 16: FAQ */}
      <FaqSection />
      <InsuranceDivider variant="gold" />

      {/* Section 17: Footer */}
      <Footer />
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    paddingBottom: SPACING.section * 2,
  },
});

const heroStyles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  gradient: {
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.xl,
    paddingHorizontal: SPACING.screenPadding,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: INSURANCE_COLORS.insuranceTealSubtle,
  },
  editionTag: {
    backgroundColor: INSURANCE_COLORS.insuranceTealFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: INSURANCE_COLORS.insuranceTealSubtle,
  },
  editionTagText: {
    ...TYPOGRAPHY.badge,
    color: INSURANCE_COLORS.insuranceTeal,
    letterSpacing: 1.5,
    fontSize: 9,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: COLORS.textPrimary,
    letterSpacing: -0.5,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.h4,
    color: INSURANCE_COLORS.insuranceTeal,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  description: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textTertiary,
  },
});

const dividerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding + SPACING.xl,
    marginVertical: SPACING.lg,
  },
  line: {
    flex: 1,
    height: 1,
  },
  lineTeal: {
    backgroundColor: INSURANCE_COLORS.insuranceTealSubtle,
  },
  lineGold: {
    backgroundColor: INSURANCE_COLORS.assuredGoldSubtle,
  },
  dotContainer: {
    marginHorizontal: SPACING.md,
  },
});

export default InsuranceScreen;
