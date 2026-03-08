/**
 * ============================================================================
 * APOLLO 24/7 - WOMEN SCREEN (PREMIUM EDITION)
 * ============================================================================
 *
 * Premium Women vertical screen composing all sections:
 *
 * 1. Screen Hero (Celebrate Her Health + sponsors)
 * 2. Category Pills (Feminine Hygiene, Skin, Hair, etc.)
 * 3. Napkin Size Selector (Regular to XXXL)
 * 4. Motherhood Care (Tabs + product carousel)
 * 5. Her Health Conditions (PCOS, Cramps, etc.)
 * 6. Her Health Essentials (12 items grid)
 * 7. Period Tracker Banner
 * 8. Trusted Brands (12 brands grid)
 * 9. Testimonials Carousel
 * 10. Wellness Tips
 * 11. Footer
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
import { WOMEN_COLORS } from './WomenTheme';

// Section Components
import {
  WomenScreenHero,
  CategoriesSection,
  NapkinSizeSelectorSection,
  MotherhoodCareSection,
  HerHealthConditionsSection,
} from './WomenHero';
import {
  HerHealthEssentialsSection,
  TrustedBrandsSection,
  WomenTestimonialsSection,
  PeriodTrackerBanner,
  WomenWellnessTipsSection,
} from './WomenEssentials';

// Reuse Footer from home
import { Footer } from '../home/DiscoverSection';

// ============================================================================
// SECTION DIVIDER
// ============================================================================
const WomenDivider = React.memo(({ variant }) => {
  return (
    <View style={dividerStyles.container}>
      <View style={[dividerStyles.line, variant === 'pink' ? dividerStyles.linePink : dividerStyles.linePurple]} />
      <View style={dividerStyles.dotContainer}>
        <Ionicons
          name={variant === 'pink' ? 'flower' : 'heart'}
          size={10}
          color={variant === 'pink' ? WOMEN_COLORS.womenPink : WOMEN_COLORS.womenPurple}
        />
      </View>
      <View style={[dividerStyles.line, variant === 'pink' ? dividerStyles.linePink : dividerStyles.linePurple]} />
    </View>
  );
});

// ============================================================================
// MAIN WOMEN SCREEN
// ============================================================================
const WomenScreen = React.memo(({ scrollY }) => {
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
      <WomenScreenHero />

      {/* Section 1: Category Pills */}
      <CategoriesSection />
      <WomenDivider variant="pink" />

      {/* Section 2: Napkin Size Selector */}
      <NapkinSizeSelectorSection />
      <WomenDivider variant="purple" />

      {/* Section 3: Motherhood Care */}
      <MotherhoodCareSection />
      <WomenDivider variant="pink" />

      {/* Section 4: Her Health Conditions */}
      <HerHealthConditionsSection />
      <WomenDivider variant="purple" />

      {/* Section 5: Her Health Essentials */}
      <HerHealthEssentialsSection />
      <WomenDivider variant="pink" />

      {/* Section 6: Period Tracker */}
      <PeriodTrackerBanner />
      <WomenDivider variant="purple" />

      {/* Section 7: Trusted Brands */}
      <TrustedBrandsSection />
      <WomenDivider variant="pink" />

      {/* Section 8: Testimonials */}
      <WomenTestimonialsSection />
      <WomenDivider variant="purple" />

      {/* Section 9: Wellness Tips */}
      <WomenWellnessTipsSection />
      <WomenDivider variant="pink" />

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
  linePink: { backgroundColor: WOMEN_COLORS.womenPinkSubtle },
  linePurple: { backgroundColor: WOMEN_COLORS.womenPurpleFaded },
  dotContainer: { marginHorizontal: SPACING.md },
});

export default WomenScreen;
