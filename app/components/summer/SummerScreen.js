/**
 * ============================================================================
 * APOLLO 24/7 - SUMMER SCREEN (PREMIUM EDITION)
 * ============================================================================
 *
 * Premium Summer vertical screen composing all sections:
 *
 * 1. Screen Hero (Summer branding + sun animation)
 * 2. Concern Pills (Sun Protection, Hydration, Oil, etc.)
 * 3. Expert Recommended Sunscreens (Dermatologist picks)
 * 4. Stay Summer Ready (Perfumes, Talcum, Wipes, Roll Ons)
 * 5. Top Sunscreens Carousel (8 products)
 * 6. Complete Summer Essentials (4x4 grid - 16 items)
 * 7. Protect Your Glow (Cleansers, Serums, etc.)
 * 8. Shop By Brand (12 brands with discounts)
 * 9. Deal of the Day (Countdown timer + product)
 * 10. Summer Hydration (6 categories)
 * 11. Summer Care Tips (6 expert tips)
 * 12. Footer
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
import { COLORS, SPACING } from '../home/theme';
import { SUMMER_COLORS } from './SummerTheme';
import { Ionicons } from '@expo/vector-icons';

// Section Components
import {
  SummerScreenHero,
  ConcernsSection,
  ExpertSunscreensSection,
  SunscreenCarouselSection,
  StaySummerReadySection,
  ProtectGlowSection,
} from './SummerHero';
import {
  SummerEssentialsSection,
  ShopByBrandSection,
  DealOfDaySection,
  SummerHydrationSection,
  SummerTipsSection,
} from './SummerEssentials';

// Reuse Footer from home
import { Footer } from '../home/DiscoverSection';

// ============================================================================
// SECTION DIVIDER
// ============================================================================
const SummerDivider = React.memo(({ variant }) => {
  return (
    <View style={dividerStyles.container}>
      <View style={[dividerStyles.line, variant === 'sun' ? dividerStyles.lineSun : dividerStyles.lineCool]} />
      <View style={dividerStyles.dotContainer}>
        <Ionicons
          name={variant === 'sun' ? 'sunny' : 'water'}
          size={10}
          color={variant === 'sun' ? SUMMER_COLORS.sunYellow : SUMMER_COLORS.skyBlue}
        />
      </View>
      <View style={[dividerStyles.line, variant === 'sun' ? dividerStyles.lineSun : dividerStyles.lineCool]} />
    </View>
  );
});

// ============================================================================
// MAIN SUMMER SCREEN
// ============================================================================
const SummerScreen = React.memo(({ scrollY }) => {
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
      <SummerScreenHero />

      {/* Section 1: Concern Pills */}
      <ConcernsSection />
      <SummerDivider variant="sun" />

      {/* Section 2: Expert Recommended Sunscreens */}
      <ExpertSunscreensSection />
      <SummerDivider variant="cool" />

      {/* Section 3: Stay Summer Ready */}
      <StaySummerReadySection />
      <SummerDivider variant="sun" />

      {/* Section 4: Top Sunscreens Carousel */}
      <SunscreenCarouselSection />
      <SummerDivider variant="cool" />

      {/* Section 5: Complete Summer Essentials */}
      <SummerEssentialsSection />
      <SummerDivider variant="sun" />

      {/* Section 6: Protect Your Glow */}
      <ProtectGlowSection />
      <SummerDivider variant="cool" />

      {/* Section 7: Shop By Brand */}
      <ShopByBrandSection />
      <SummerDivider variant="sun" />

      {/* Section 8: Deal of the Day */}
      <DealOfDaySection />
      <SummerDivider variant="cool" />

      {/* Section 9: Summer Hydration */}
      <SummerHydrationSection />
      <SummerDivider variant="sun" />

      {/* Section 10: Summer Care Tips */}
      <SummerTipsSection />
      <SummerDivider variant="cool" />

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
  lineSun: { backgroundColor: SUMMER_COLORS.sunYellowSubtle },
  lineCool: { backgroundColor: SUMMER_COLORS.skyBlueFaded },
  dotContainer: { marginHorizontal: SPACING.md },
});

export default SummerScreen;
