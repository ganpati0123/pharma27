/**
 * ============================================================================
 * DISCOVER SECTION - CURATED + PROMOTIONS + CONTENT + ASK APOLLO + TRUST + FOOTER
 * ============================================================================
 * 
 * Premium Royal Healthcare Home Screen - Discovery & Trust Sections
 * 
 * Contains:
 * 1. CuratedOfferings - 3 vertical premium cards with icon, title, subtitle
 *    and smooth press/lift animations
 * 2. PromotionBanners - Auto-scrolling promotional banners with badge tags
 *    (LIMITED, EXCLUSIVE, NEW, PREMIUM) and navigation arrows
 * 3. ContentCards - Two large side-by-side cards:
 *    - Apollo 24|7 "Think About It" -> Watch on JioHotstar
 *    - PRO Health -> Explore More
 * 4. AskApolloCarousel - 14 poster cards with red gradient backgrounds,
 *    doctor illustration, "Find Answer" button, auto-scroll
 * 5. TrustBadges - Three circular gold seal badges:
 *    Safe & Secure, Fully Reliable, Genuine Products
 * 6. Footer - Version info, "Live Healthy", "Crafted with love in India",
 *    powered by brands
 * 
 * ============================================================================
 */

import React, { useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
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
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS, SHADOWS, ANIMATION, LAYOUT, MIXINS, DATA } from './theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const POSTER_CARD_WIDTH = LAYOUT.posterCardWidth;
const PROMOTION_CARD_WIDTH = LAYOUT.promotionBannerWidth;

// ============================================================================
// ANIMATED CURATED CARD
// ============================================================================
const AnimatedCuratedCard = React.memo(({ item, index }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateX = useSharedValue(-30);
  const glowOpacity = useSharedValue(0);
  const iconRotation = useSharedValue(0);
  const arrowTranslateX = useSharedValue(0);

  useEffect(() => {
    const delay = index * 100;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    entranceTranslateX.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(ANIMATION.scale.pressed, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(ANIMATION.translate.cardLift, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
    iconRotation.value = withSpring(ANIMATION.rotation.iconTilt, ANIMATION.spring.bouncy);
    arrowTranslateX.value = withSpring(4, ANIMATION.spring.bouncy);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    cardTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
    iconRotation.value = withSpring(0, ANIMATION.spring.gentle);
    arrowTranslateX.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateX: entranceTranslateX.value },
      { translateY: cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotation.value}deg` }],
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowTranslateX.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={cardAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.curatedCard}
      >
        {/* Gold glow overlay */}
        <Animated.View style={[styles.curatedCardGlow, glowStyle]} />

        {/* Icon */}
        <Animated.View style={iconAnimatedStyle}>
          <View style={[styles.curatedIconContainer, { backgroundColor: item.bgColor }]}>
            <Ionicons name={item.icon} size={28} color={item.color} />
          </View>
        </Animated.View>

        {/* Text Content */}
        <View style={styles.curatedTextContent}>
          <Text style={styles.curatedCardTitle}>{item.title}</Text>
          <Text style={styles.curatedCardSubtitle}>{item.subtitle}</Text>
        </View>

        {/* Arrow */}
        <Animated.View style={arrowAnimatedStyle}>
          <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// CURATED OFFERINGS SECTION
// ============================================================================
export const CuratedOfferings = React.memo(() => {
  const offerings = useMemo(() => DATA.curatedOfferings, []);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(25);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  return (
    <Animated.View style={[styles.curatedSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.curatedHeader}>
        <View style={styles.curatedHeaderLeft}>
          <Ionicons name="star" size={18} color={COLORS.royalGold} />
          <Text style={styles.curatedSectionTitle}>Curated Offerings For You</Text>
        </View>
      </View>

      {/* Cards */}
      {offerings.map((item, index) => (
        <AnimatedCuratedCard key={item.id} item={item} index={index} />
      ))}
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED PROMOTION BANNER
// ============================================================================
const AnimatedPromotionBanner = React.memo(({ banner, index }) => {
  const cardScale = useSharedValue(1);
  const arrowTranslateX = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.97, ANIMATION.spring.press);
    arrowTranslateX.value = withSpring(6, ANIMATION.spring.bouncy);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    arrowTranslateX.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowTranslateX.value }],
  }));

  const badgeColors = {
    'LIMITED': { bg: '#FFE0E0', text: '#FF4444' },
    'EXCLUSIVE': { bg: '#E0F0FF', text: '#0088FF' },
    'NEW': { bg: '#E0FFE8', text: '#00A651' },
    'PREMIUM': { bg: '#FFF0E0', text: '#FF8800' },
  };

  const badgeStyle = badgeColors[banner.badge] || badgeColors['NEW'];

  return (
    <Animated.View style={cardAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.promotionBanner}
      >
        <LinearGradient
          colors={[COLORS.cardWhite, COLORS.backgroundIce]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promotionBannerGradient}
        >
          {/* Decorative element */}
          <View style={styles.promotionDecorStripe} />

          {/* Badge */}
          <View style={[styles.promotionBadge, { backgroundColor: badgeStyle.bg }]}>
            <Text style={[styles.promotionBadgeText, { color: badgeStyle.text }]}>
              {banner.badge}
            </Text>
          </View>

          {/* Content */}
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>{banner.title}</Text>
            <Text style={styles.promotionSubtitle} numberOfLines={2}>
              {banner.subtitle}
            </Text>
          </View>

          {/* Arrow */}
          <Animated.View style={[styles.promotionArrow, arrowAnimatedStyle]}>
            <View style={styles.promotionArrowCircle}>
              <Ionicons name="chevron-forward" size={16} color={COLORS.apolloGreen} />
            </View>
          </Animated.View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// PROMOTION BANNERS CAROUSEL
// ============================================================================
export const PromotionBanners = React.memo(() => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(25);

  const bannersData = useMemo(() => [...DATA.banners, ...DATA.banners, ...DATA.banners], []);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        currentIndex.current += 1;
        if (currentIndex.current >= DATA.banners.length * 2) {
          currentIndex.current = DATA.banners.length;
          flatListRef.current.scrollToIndex({
            index: currentIndex.current,
            animated: false,
          });
        }
        try {
          flatListRef.current.scrollToIndex({
            index: currentIndex.current,
            animated: true,
          });
        } catch (e) {
          currentIndex.current = 0;
        }
      }
    }, LAYOUT.carouselAutoScrollInterval);

    return () => clearInterval(scrollInterval);
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const renderBanner = useCallback(({ item, index }) => (
    <AnimatedPromotionBanner banner={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item, index) => `promo-${index}`, []);

  const getItemLayout = useCallback((data, index) => ({
    length: PROMOTION_CARD_WIDTH + SPACING.md,
    offset: (PROMOTION_CARD_WIDTH + SPACING.md) * index,
    index,
  }), []);

  return (
    <Animated.View style={[styles.promotionSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.promotionSectionHeader}>
        <Ionicons name="megaphone" size={18} color={COLORS.premiumOrange} />
        <Text style={styles.promotionSectionTitle}>Exclusive Promotions</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={bannersData}
        renderItem={renderBanner}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.promotionListContent}
        snapToInterval={PROMOTION_CARD_WIDTH + SPACING.md}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        initialScrollIndex={DATA.banners.length}
        bounces={false}
        overScrollMode="never"
      />
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED CONTENT CARD
// ============================================================================
const AnimatedContentCard = React.memo(({ title, subtitle, description, buttonText, gradientColors, iconName, index }) => {
  const cardScale = useSharedValue(1);
  const cardTranslateY = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const entranceOpacity = useSharedValue(0);
  const entranceTranslateY = useSharedValue(30);
  const glowOpacity = useSharedValue(0);

  useEffect(() => {
    const delay = index * 150;
    entranceOpacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.entrance }));
    entranceTranslateY.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));
  }, [index]);

  const handleCardPressIn = useCallback(() => {
    cardScale.value = withSpring(ANIMATION.scale.pressed, ANIMATION.spring.press);
    cardTranslateY.value = withSpring(ANIMATION.translate.cardLift, ANIMATION.spring.press);
    glowOpacity.value = withTiming(1, { duration: ANIMATION.duration.fast });
  }, []);

  const handleCardPressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
    cardTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    glowOpacity.value = withTiming(0, { duration: ANIMATION.duration.normal });
  }, []);

  const handleButtonPressIn = useCallback(() => {
    buttonScale.value = withSpring(0.92, ANIMATION.spring.press);
  }, []);

  const handleButtonPressOut = useCallback(() => {
    buttonScale.value = withSequence(
      withSpring(1.05, { damping: 6, stiffness: 400 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    opacity: entranceOpacity.value,
    transform: [
      { translateY: entranceTranslateY.value + cardTranslateY.value },
      { scale: cardScale.value },
    ],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  return (
    <Animated.View style={[styles.contentCardOuter, cardAnimatedStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handleCardPressIn}
        onPressOut={handleCardPressOut}
        style={styles.contentCard}
      >
        {/* Gold glow */}
        <Animated.View style={[styles.contentCardGlow, glowStyle]} />

        {/* Top accent gradient */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.contentCardAccent}
        />

        {/* Icon */}
        <View style={[styles.contentCardIconContainer, { backgroundColor: gradientColors[0] + '18' }]}>
          <Ionicons name={iconName} size={28} color={gradientColors[0]} />
        </View>

        {/* Title */}
        <Text style={[styles.contentCardTitle, { color: gradientColors[0] }]}>{title}</Text>

        {/* Subtitle */}
        {subtitle && (
          <Text style={styles.contentCardSubtitle}>{subtitle}</Text>
        )}

        {/* Description */}
        <Text style={styles.contentCardDescription}>{description}</Text>

        {/* Button */}
        <Animated.View style={buttonAnimatedStyle}>
          <TouchableOpacity
            activeOpacity={1}
            onPressIn={handleButtonPressIn}
            onPressOut={handleButtonPressOut}
            style={[styles.contentCardButton, { backgroundColor: gradientColors[0] }]}
          >
            <Text style={styles.contentCardButtonText}>{buttonText}</Text>
            <Ionicons name="chevron-forward" size={12} color={COLORS.textWhite} />
          </TouchableOpacity>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// CONTENT CARDS SECTION
// ============================================================================
export const ContentCards = React.memo(() => {
  return (
    <View style={styles.contentCardsSection}>
      <AnimatedContentCard
        title="Apollo 24|7"
        subtitle="Think About It"
        description="Health Explained by Experts"
        buttonText="Watch on JioHotstar"
        gradientColors={[COLORS.apolloGreen, COLORS.apolloGreenLight]}
        iconName="play-circle"
        index={0}
      />
      <AnimatedContentCard
        title="PRO Health"
        subtitle={null}
        description="Apollo's Personalised Health Program"
        buttonText="Explore More"
        gradientColors={[COLORS.premiumOrange, '#FF8A5C']}
        iconName="heart-circle"
        index={1}
      />
    </View>
  );
});

// ============================================================================
// ANIMATED ASK APOLLO POSTER
// ============================================================================
const AnimatedPosterCard = React.memo(({ poster, index }) => {
  const cardScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.97, ANIMATION.spring.press);
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const handleButtonPressIn = useCallback(() => {
    buttonScale.value = withSpring(0.9, ANIMATION.spring.press);
  }, []);

  const handleButtonPressOut = useCallback(() => {
    buttonScale.value = withSequence(
      withSpring(1.08, { damping: 6, stiffness: 400 }),
      withSpring(1, ANIMATION.spring.gentle)
    );
  }, []);

  const cardAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <Animated.View style={cardAnimatedStyle}>
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.posterCardOuter}
      >
        <LinearGradient
          colors={['#E84040', '#FF6B35']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.posterCard}
        >
          {/* Decorative circles */}
          <View style={styles.posterDecorCircle1} />
          <View style={styles.posterDecorCircle2} />
          <View style={styles.posterDecorCircle3} />

          {/* Content */}
          <View style={styles.posterContent}>
            <View style={styles.posterAskBadge}>
              <Ionicons name="chatbubble-ellipses" size={12} color={COLORS.textWhite} />
              <Text style={styles.posterAskBadgeText}>Ask Apollo</Text>
            </View>

            <Text style={styles.posterTitle}>{poster.title}</Text>
            <Text style={styles.posterDescription} numberOfLines={3}>
              {poster.description}
            </Text>

            <Animated.View style={buttonAnimatedStyle}>
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={handleButtonPressIn}
                onPressOut={handleButtonPressOut}
                style={styles.posterButton}
              >
                <Text style={styles.posterButtonText}>Find Answer</Text>
                <Ionicons name="arrow-forward" size={12} color={COLORS.premiumOrange} />
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* Doctor Illustration */}
          <View style={styles.posterIllustration}>
            <View style={styles.posterDoctorCircle}>
              <Ionicons name="person" size={36} color="rgba(255,255,255,0.9)" />
            </View>
            <View style={styles.posterStethoscope}>
              <Ionicons name="medical" size={14} color="rgba(255,255,255,0.7)" />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ASK APOLLO POSTER CAROUSEL
// ============================================================================
export const AskApolloCarousel = React.memo(() => {
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);
  const sectionOpacity = useSharedValue(0);
  const sectionTranslateY = useSharedValue(25);

  const postersData = useMemo(() => [...DATA.posters, ...DATA.posters], []);

  useEffect(() => {
    sectionOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });
    sectionTranslateY.value = withSpring(0, ANIMATION.spring.gentle);

    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        currentIndex.current += 1;
        if (currentIndex.current >= DATA.posters.length) {
          currentIndex.current = 0;
          flatListRef.current.scrollToIndex({
            index: currentIndex.current,
            animated: false,
          });
        }
        try {
          flatListRef.current.scrollToIndex({
            index: currentIndex.current,
            animated: true,
          });
        } catch (e) {
          currentIndex.current = 0;
        }
      }
    }, LAYOUT.carouselPosterScrollInterval);

    return () => clearInterval(scrollInterval);
  }, []);

  const sectionAnimatedStyle = useAnimatedStyle(() => ({
    opacity: sectionOpacity.value,
    transform: [{ translateY: sectionTranslateY.value }],
  }));

  const renderPoster = useCallback(({ item, index }) => (
    <AnimatedPosterCard poster={item} index={index} />
  ), []);

  const keyExtractor = useCallback((item, index) => `poster-${index}`, []);

  const getItemLayout = useCallback((data, index) => ({
    length: POSTER_CARD_WIDTH + SPACING.md,
    offset: (POSTER_CARD_WIDTH + SPACING.md) * index,
    index,
  }), []);

  return (
    <Animated.View style={[styles.askApolloSection, sectionAnimatedStyle]}>
      {/* Section Header */}
      <View style={styles.askApolloHeader}>
        <View style={styles.askApolloHeaderLeft}>
          <View style={styles.askApolloIconContainer}>
            <Ionicons name="chatbubbles" size={18} color={COLORS.textWhite} />
          </View>
          <Text style={styles.askApolloSectionTitle}>Ask Apollo</Text>
        </View>
        <View style={styles.askApolloPosterCount}>
          <Text style={styles.askApolloPosterCountText}>{DATA.posters.length} Topics</Text>
        </View>
      </View>

      <FlatList
        ref={flatListRef}
        data={postersData}
        renderItem={renderPoster}
        keyExtractor={keyExtractor}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.posterListContent}
        snapToInterval={POSTER_CARD_WIDTH + SPACING.md}
        decelerationRate="fast"
        getItemLayout={getItemLayout}
        bounces={false}
        overScrollMode="never"
      />
    </Animated.View>
  );
});

// ============================================================================
// ANIMATED TRUST BADGE
// ============================================================================
const AnimatedTrustBadge = React.memo(({ badge, index }) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(-10);
  const glowPulse = useSharedValue(0);

  useEffect(() => {
    const delay = 200 + index * 150;
    opacity.value = withDelay(delay, withTiming(1, { duration: ANIMATION.duration.smooth }));
    scale.value = withDelay(delay, withSpring(1, ANIMATION.spring.bouncy));
    rotation.value = withDelay(delay, withSpring(0, ANIMATION.spring.gentle));

    // Subtle pulse glow
    glowPulse.value = withDelay(
      delay + 500,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(0, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [index]);

  const badgeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { scale: scale.value },
      { rotate: `${rotation.value}deg` },
    ],
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(glowPulse.value, [0, 1], [0.15, 0.4]),
    transform: [{ scale: interpolate(glowPulse.value, [0, 1], [1, 1.15]) }],
  }));

  return (
    <Animated.View style={[styles.trustBadgeItem, badgeAnimatedStyle]}>
      {/* Gold glow pulse */}
      <Animated.View style={[styles.trustBadgeGlow, glowStyle]} />

      {/* Badge Circle */}
      <View style={styles.trustBadgeCircle}>
        <LinearGradient
          colors={[COLORS.royalGoldLight, COLORS.royalGold]}
          style={styles.trustBadgeGradient}
        >
          <View style={styles.trustBadgeInnerCircle}>
            <Ionicons name={badge.icon} size={26} color={badge.color} />
          </View>
        </LinearGradient>
      </View>

      {/* Badge Text */}
      <Text style={styles.trustBadgeText}>{badge.title}</Text>
    </Animated.View>
  );
});

// ============================================================================
// TRUST BADGES SECTION
// ============================================================================
export const TrustBadges = React.memo(() => {
  const badges = useMemo(() => DATA.trustBadges, []);

  return (
    <View style={styles.trustBadgesSection}>
      <View style={styles.trustBadgesRow}>
        {badges.map((badge, index) => (
          <AnimatedTrustBadge key={badge.id} badge={badge} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// FOOTER COMPONENT
// ============================================================================
export const Footer = React.memo(() => {
  const footerOpacity = useSharedValue(0);
  const heartScale = useSharedValue(1);

  useEffect(() => {
    footerOpacity.value = withTiming(1, { duration: ANIMATION.duration.smooth });

    // Heartbeat animation
    heartScale.value = withRepeat(
      withSequence(
        withTiming(1.2, { duration: 300 }),
        withTiming(1, { duration: 300 }),
        withTiming(1.15, { duration: 250 }),
        withTiming(1, { duration: 250 }),
        withTiming(1, { duration: 1500 }),
      ),
      -1,
      false
    );
  }, []);

  const footerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: footerOpacity.value,
  }));

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  return (
    <Animated.View style={[styles.footerContainer, footerAnimatedStyle]}>
      <LinearGradient
        colors={[COLORS.backgroundStart, COLORS.backgroundIce]}
        style={styles.footerGradient}
      >
        {/* Version */}
        <Text style={styles.versionText}>PROD - v 9.0.3 (612)</Text>

        {/* Decorative Divider */}
        <View style={styles.footerDivider}>
          <View style={styles.footerDividerLine} />
          <View style={styles.footerDividerDiamond}>
            <Ionicons name="diamond" size={10} color={COLORS.royalGold} />
          </View>
          <View style={styles.footerDividerLine} />
        </View>

        {/* Live Healthy */}
        <Text style={styles.liveHealthyText}>Live Healthy</Text>

        {/* Crafted with love */}
        <View style={styles.craftedRow}>
          <Text style={styles.craftedText}>Crafted with </Text>
          <Animated.View style={heartAnimatedStyle}>
            <Text style={styles.craftedHeart}>&#10084;&#65039;</Text>
          </Animated.View>
          <Text style={styles.craftedText}> in India</Text>
        </View>

        {/* Powered By */}
        <View style={styles.poweredByContainer}>
          <Text style={styles.poweredByLabel}>Powered by:</Text>
          <View style={styles.poweredByBrandsRow}>
            {['Apollo Pharmacy', 'Apollo 24/7', 'Apollo Hospitals'].map((brand, index) => (
              <View key={brand} style={styles.poweredByBrandItem}>
                {index > 0 && <View style={styles.poweredByDot} />}
                <Text style={styles.poweredByBrandText}>{brand}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Bottom gold accent */}
        <View style={styles.footerBottomAccent} />
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  // ========================================================================
  // CURATED OFFERINGS STYLES
  // ========================================================================
  curatedSection: {
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section + 4,
  },
  curatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  curatedHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  curatedSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  curatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    marginBottom: SPACING.md,
    ...SHADOWS.cardSoft,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    gap: SPACING.lg,
    overflow: 'hidden',
  },
  curatedCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RADIUS.card,
    borderWidth: 1.5,
    borderColor: COLORS.royalGold,
    backgroundColor: COLORS.royalGoldFaded,
  },
  curatedIconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  curatedTextContent: {
    flex: 1,
  },
  curatedCardTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  curatedCardSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
  },

  // ========================================================================
  // PROMOTION BANNERS STYLES
  // ========================================================================
  promotionSection: {
    marginTop: SPACING.section + 4,
  },
  promotionSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  promotionSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  promotionListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
    paddingRight: SPACING.screenPadding + SPACING.md,
  },
  promotionBanner: {
    width: PROMOTION_CARD_WIDTH,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  promotionBannerGradient: {
    width: '100%',
    height: LAYOUT.promotionBannerHeight,
    padding: SPACING.cardPadding,
    borderRadius: RADIUS.card,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
  },
  promotionDecorStripe: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    backgroundColor: COLORS.apolloGreen,
  },
  promotionBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  promotionBadgeText: {
    ...TYPOGRAPHY.badge,
    fontWeight: '800',
  },
  promotionContent: {
    flex: 1,
    justifyContent: 'center',
  },
  promotionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  promotionSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  promotionArrow: {
    alignSelf: 'flex-end',
  },
  promotionArrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.apolloGreenFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.apolloGreenSubtle,
  },

  // ========================================================================
  // CONTENT CARDS STYLES
  // ========================================================================
  contentCardsSection: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.screenPadding,
    marginTop: SPACING.section + 4,
    gap: SPACING.md,
  },
  contentCardOuter: {
    flex: 1,
  },
  contentCard: {
    flex: 1,
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding,
    minHeight: LAYOUT.contentCardMinHeight,
    ...SHADOWS.cardMedium,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  contentCardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RADIUS.card,
    borderWidth: 1.5,
    borderColor: COLORS.royalGold,
    backgroundColor: COLORS.royalGoldFaded,
  },
  contentCardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
  },
  contentCardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  contentCardTitle: {
    ...TYPOGRAPHY.labelLarge,
    marginBottom: SPACING.xs,
    fontWeight: '800',
  },
  contentCardSubtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  contentCardDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.md,
    lineHeight: 17,
  },
  contentCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm - 1,
    borderRadius: RADIUS.sm,
    gap: SPACING.xs,
    ...SHADOWS.button,
  },
  contentCardButtonText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textWhite,
    fontWeight: '700',
  },

  // ========================================================================
  // ASK APOLLO POSTER STYLES
  // ========================================================================
  askApolloSection: {
    marginTop: SPACING.section + 4,
  },
  askApolloHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.screenPadding,
    marginBottom: SPACING.lg,
  },
  askApolloHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  askApolloIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#E84040',
    justifyContent: 'center',
    alignItems: 'center',
  },
  askApolloSectionTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
  },
  askApolloPosterCount: {
    backgroundColor: '#FFE0E0',
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
  },
  askApolloPosterCountText: {
    ...TYPOGRAPHY.captionBold,
    color: '#E84040',
  },
  posterListContent: {
    paddingHorizontal: SPACING.screenPadding,
    gap: SPACING.md,
    paddingRight: SPACING.screenPadding + SPACING.md,
  },
  posterCardOuter: {
    width: POSTER_CARD_WIDTH,
  },
  posterCard: {
    width: POSTER_CARD_WIDTH,
    height: LAYOUT.posterCardHeight,
    borderRadius: RADIUS.card,
    padding: SPACING.cardPadding + 2,
    flexDirection: 'row',
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  posterDecorCircle1: {
    position: 'absolute',
    top: -30,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  posterDecorCircle2: {
    position: 'absolute',
    bottom: -25,
    left: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  posterDecorCircle3: {
    position: 'absolute',
    top: 40,
    right: 60,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  posterContent: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  posterAskBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.pill,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    gap: 4,
  },
  posterAskBadgeText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textWhite,
  },
  posterTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textWhite,
    marginTop: SPACING.sm,
  },
  posterDescription: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.85)',
    lineHeight: 17,
    marginTop: SPACING.xs,
  },
  posterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: COLORS.textWhite,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm - 1,
    gap: SPACING.xs,
    marginTop: SPACING.sm,
    ...SHADOWS.subtle,
  },
  posterButtonText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.premiumOrange,
    fontWeight: '800',
  },
  posterIllustration: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  posterDoctorCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  posterStethoscope: {
    position: 'absolute',
    bottom: 20,
    right: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ========================================================================
  // TRUST BADGES STYLES
  // ========================================================================
  trustBadgesSection: {
    marginTop: SPACING.section + 8,
    paddingVertical: SPACING.xxl,
  },
  trustBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: SPACING.screenPadding,
  },
  trustBadgeItem: {
    alignItems: 'center',
    width: 90,
  },
  trustBadgeGlow: {
    position: 'absolute',
    top: -4,
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.royalGoldGlow,
  },
  trustBadgeCircle: {
    width: LAYOUT.trustBadgeSize,
    height: LAYOUT.trustBadgeSize,
    borderRadius: LAYOUT.trustBadgeSize / 2,
    overflow: 'hidden',
    marginBottom: SPACING.sm,
    ...SHADOWS.goldGlowStrong,
  },
  trustBadgeGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
  },
  trustBadgeInnerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: LAYOUT.trustBadgeSize / 2,
    backgroundColor: COLORS.cardWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustBadgeText: {
    ...TYPOGRAPHY.labelSmall,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 14,
  },

  // ========================================================================
  // FOOTER STYLES
  // ========================================================================
  footerContainer: {
    marginTop: SPACING.sm,
  },
  footerGradient: {
    alignItems: 'center',
    paddingVertical: SPACING.xxxl,
    paddingHorizontal: SPACING.screenPadding,
  },
  versionText: {
    ...TYPOGRAPHY.version,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    marginBottom: SPACING.lg,
  },
  footerDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    marginBottom: SPACING.lg,
    gap: SPACING.sm,
  },
  footerDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.divider,
  },
  footerDividerDiamond: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveHealthyText: {
    fontSize: 36,
    fontWeight: '200',
    color: COLORS.apolloGreen,
    letterSpacing: 2,
    marginBottom: SPACING.md,
    opacity: 0.25,
  },
  craftedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  craftedText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
  },
  craftedHeart: {
    fontSize: 14,
  },
  poweredByContainer: {
    alignItems: 'center',
  },
  poweredByLabel: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textMuted,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  poweredByBrandsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poweredByBrandItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  poweredByDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.divider,
    marginHorizontal: SPACING.sm,
  },
  poweredByBrandText: {
    ...TYPOGRAPHY.captionBold,
    color: COLORS.textTertiary,
  },
  footerBottomAccent: {
    width: 40,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.royalGoldFaded,
    marginTop: SPACING.xxl,
  },
});

// ============================================================================
// EXPORT
// ============================================================================
export default {
  CuratedOfferings,
  PromotionBanners,
  ContentCards,
  AskApolloCarousel,
  TrustBadges,
  Footer,
};
