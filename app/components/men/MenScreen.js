/**
 * ============================================================================
 * APOLLO 24/7 - MEN SCREEN (PREMIUM EDITION)
 * ============================================================================
 *
 * Premium Men vertical screen composing all sections:
 *
 * 1. Screen Hero (Strength, Wellness & Confidence)
 * 2. Health Concerns (6 concern cards)
 * 3. Men's Wellbeing Grid (4x4 - 16 items)
 * 4. Fitness & Supplements Carousel
 * 5. Hair Growth Solutions Carousel
 * 6. Grooming Essentials (Tabs + products)
 * 7. Intimate Health (Tabs + products)
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
import { MEN_COLORS } from './MenTheme';

// Section Components
import {
  MenScreenHero,
  ConcernsSection,
  WellbeingGridSection,
  FitnessProductsSection,
  HairCareProductsSection,
} from './MenHero';
import {
  GroomingEssentialsSection,
  IntimateHealthSection,
  MenTrustedBrandsSection,
  MenTestimonialsSection,
  MenWellnessTipsSection,
} from './MenProducts';

// Reuse Footer from home
import { Footer } from '../home/DiscoverSection';

// ============================================================================
// SECTION DIVIDER
// ============================================================================
const MenDivider = React.memo(({ variant }) => {
  return (
    <View style={dividerStyles.container}>
      <View style={[dividerStyles.line, variant === 'steel' ? dividerStyles.lineSteel : dividerStyles.lineBlue]} />
      <View style={dividerStyles.dotContainer}>
        <Ionicons
          name={variant === 'steel' ? 'shield' : 'man'}
          size={10}
          color={variant === 'steel' ? MEN_COLORS.menSteel : MEN_COLORS.menBlue}
        />
      </View>
      <View style={[dividerStyles.line, variant === 'steel' ? dividerStyles.lineSteel : dividerStyles.lineBlue]} />
    </View>
  );
});

// ============================================================================
// MAIN MEN SCREEN
// ============================================================================
const MenScreen = React.memo(({ scrollY }) => {
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
      <MenScreenHero />

      {/* Section 1: Health Concerns */}
      <ConcernsSection />
      <MenDivider variant="steel" />

      {/* Section 2: Wellbeing Grid */}
      <WellbeingGridSection />
      <MenDivider variant="blue" />

      {/* Section 3: Fitness & Supplements */}
      <FitnessProductsSection />
      <MenDivider variant="steel" />

      {/* Section 4: Hair Growth Solutions */}
      <HairCareProductsSection />
      <MenDivider variant="blue" />

      {/* Section 5: Grooming Essentials */}
      <GroomingEssentialsSection />
      <MenDivider variant="steel" />

      {/* Section 6: Intimate Health */}
      <IntimateHealthSection />
      <MenDivider variant="blue" />

      {/* Section 7: Trusted Brands */}
      <MenTrustedBrandsSection />
      <MenDivider variant="steel" />

      {/* Section 8: Testimonials */}
      <MenTestimonialsSection />
      <MenDivider variant="blue" />

      {/* Section 9: Wellness Tips */}
      <MenWellnessTipsSection />
      <MenDivider variant="steel" />

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
  lineSteel: { backgroundColor: MEN_COLORS.menSteelFaded },
  lineBlue: { backgroundColor: MEN_COLORS.menBlueFaded },
  dotContainer: { marginHorizontal: SPACING.md },
});

export default MenScreen;
