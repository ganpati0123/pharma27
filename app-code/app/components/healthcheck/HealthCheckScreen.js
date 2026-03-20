/**
 * ============================================================================
 * APOLLO 24/7 - HEALTH CHECK SCREEN (PREMIUM EDITION)
 * ============================================================================
 *
 * Premium Health Check vertical screen composing all sections:
 *
 * 1. Screen Hero (Apollo Diagnostics branding)
 * 2. Promo Banners Carousel (Women's Wellness, Vitamins, etc.)
 * 3. Ultimate Health Challenge (4 segments)
 * 4. Best Value Checkups Carousel
 * 5. Tax Saver Health Packages (6 packages)
 * 6. Vitamin Deficiency Awareness + Packages
 * 7. Family Savings Banner
 * 8. Coupons Carousel
 * 9. Lab Trust Indicators + Certifications
 * 10. Lab Process Steps
 * 11. Special Offers
 * 12. Offer Terms & Conditions
 * 13. Footer
 *
 * ============================================================================
 */

import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../home/theme';
import { HC_COLORS } from './HealthCheckTheme';

// Section Components
import {
  HealthCheckScreenHero,
  PromoBannersSection,
  UltimateHealthChallengeSection,
  VitaminDeficiencySection,
  FamilySavingsBanner,
  BestValueCheckupsSection,
} from './HealthCheckHero';
import {
  TaxSaverPackagesSection,
  LabTrustSection,
  CouponsSection,
  LabProcessSection,
  SpecialOffersSection,
  OfferTermsSection,
} from './HealthCheckPackages';

// Reuse Footer from home
import { Footer } from '../home/DiscoverSection';

// ============================================================================
// SECTION DIVIDER
// ============================================================================
const HealthCheckDivider = React.memo(({ variant }) => {
  return (
    <View style={dividerStyles.container}>
      <View style={[dividerStyles.line, variant === 'blue' ? dividerStyles.lineBlue : dividerStyles.lineGreen]} />
      <View style={dividerStyles.dotContainer}>
        <Ionicons
          name={variant === 'blue' ? 'fitness' : 'flask'}
          size={10}
          color={variant === 'blue' ? HC_COLORS.healthBlue : HC_COLORS.healthGreen}
        />
      </View>
      <View style={[dividerStyles.line, variant === 'blue' ? dividerStyles.lineBlue : dividerStyles.lineGreen]} />
    </View>
  );
});

// ============================================================================
// MAIN HEALTH CHECK SCREEN
// ============================================================================
const HealthCheckScreen = React.memo(({ scrollY }) => {
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
      <HealthCheckScreenHero />

      {/* Section 1: Promo Banners */}
      <PromoBannersSection />
      <HealthCheckDivider variant="blue" />

      {/* Section 2: Ultimate Health Challenge */}
      <UltimateHealthChallengeSection />
      <HealthCheckDivider variant="green" />

      {/* Section 3: Best Value Checkups */}
      <BestValueCheckupsSection />
      <HealthCheckDivider variant="blue" />

      {/* Section 4: Tax Saver Packages */}
      <TaxSaverPackagesSection />
      <HealthCheckDivider variant="green" />

      {/* Section 5: Vitamin Deficiency */}
      <VitaminDeficiencySection />
      <HealthCheckDivider variant="blue" />

      {/* Section 6: Family Savings */}
      <FamilySavingsBanner />
      <HealthCheckDivider variant="green" />

      {/* Section 7: Coupons */}
      <CouponsSection />
      <HealthCheckDivider variant="blue" />

      {/* Section 8: Lab Trust */}
      <LabTrustSection />
      <HealthCheckDivider variant="green" />

      {/* Section 9: Lab Process */}
      <LabProcessSection />
      <HealthCheckDivider variant="blue" />

      {/* Section 10: Special Offers */}
      <SpecialOffersSection />
      <HealthCheckDivider variant="green" />

      {/* Section 11: Offer Terms */}
      <OfferTermsSection />
      <HealthCheckDivider variant="blue" />

      {/* Footer */}
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

const dividerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding + SPACING.xl,
    marginVertical: SPACING.lg,
  },
  line: { flex: 1, height: 1 },
  lineBlue: { backgroundColor: HC_COLORS.healthBlueSubtle },
  lineGreen: { backgroundColor: HC_COLORS.healthGreenFaded },
  dotContainer: { marginHorizontal: SPACING.md },
});

export default HealthCheckScreen;
