/**
 * ============================================================================
 * APOLLO 24/7 - INSTANT DR SCREEN (MEDICAL BLUE EDITION)
 * ============================================================================
 *
 * Premium Instant Doctor vertical screen — 14-15 scrolls deep
 * Built with the precision of a FAANG principal architect.
 *
 * Sections (top to bottom):
 * 1. Hero Header with medical pulse animation
 * 2. Choose Doctor Specialty (12 specialties grid)
 * 3. Select Symptom for GP Consult (8 symptoms)
 * 4. Select Symptom for Gynaecologist Consult (6 symptoms)
 * 5. Select Symptom for Dermatology Consult (6 symptoms)
 * 6. Select Symptom for Paediatrician Consult (4 symptoms)
 * 7. Select Symptom for Cardiology Consult (4 symptoms)
 * 8. Select Symptom for Orthopaedic Consult (6 symptoms)
 * 9. Select Symptom for ENT Consult (6 symptoms)
 * 10. Select Symptom for Neurology Consult (4 symptoms)
 * 11. Consultation Features (Video/Audio/Chat/In-Clinic)
 * 12. Top Doctors Carousel
 * 13. Video Consult Banner CTA
 * 14. Emergency Services
 * 15. Health Packages
 * 16. Lab Tests Section
 * 17. Medicine Reminders
 * 18. Health Articles
 * 19. Testimonials
 * 20. Ask Apollo Section
 * 21. FAQ Section
 * 22. Doctor Consultation CTA
 * 23. Footer
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
import { DR_COLORS, DR_DATA } from './InstantDrTheme';
import { Footer } from '../home/DiscoverSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// MEDICAL PULSE PARTICLE
// ============================================================================
const MedicalPulse = React.memo(({ delay, startX, startY, color, size }) => {
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
    opacity: interpolate(shimmer.value, [0, 1], [0.15, 0.4]),
  }));
  const dotStyle = useAnimatedStyle(() => ({
    opacity: interpolate(shimmer.value, [0, 1], [0.3, 0.8]),
    transform: [{ scale: interpolate(shimmer.value, [0, 1], [0.8, 1.2]) }],
  }));

  const color = variant === 'blue' ? DR_COLORS.medicalBlue : DR_COLORS.healthGreen;
  const icon = variant === 'blue' ? 'pulse' : 'medical';

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
  const heartbeat = useSharedValue(0);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 600 });
    heroTranslateY.value = withSpring(0, ANIMATION.spring.gentle);
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.08, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(1.04, { duration: 600, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1800, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
    heartbeat.value = withRepeat(
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
    opacity: interpolate(pulseScale.value, [1, 1.08], [0.05, 0.18]),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(heartbeat.value, [0, 1], [0.85, 1]),
  }));

  return (
    <Animated.View style={[styles.heroContainer, heroStyle]}>
      <LinearGradient
        colors={['rgba(0, 136, 255, 0.08)', 'rgba(0, 136, 255, 0.02)', COLORS.backgroundPure]}
        style={styles.heroGradient}
      >
        <MedicalPulse delay={0} startX={30} startY={20} color="rgba(0,136,255,0.5)" size={4} />
        <MedicalPulse delay={700} startX={120} startY={40} color="rgba(0,166,81,0.5)" size={3} />
        <MedicalPulse delay={1400} startX={220} startY={15} color="rgba(0,136,255,0.4)" size={5} />
        <MedicalPulse delay={2100} startX={300} startY={35} color="rgba(0,166,81,0.4)" size={3} />
        <MedicalPulse delay={2800} startX={350} startY={25} color="rgba(0,136,255,0.5)" size={4} />

        <Animated.View style={[styles.heroGlow, pulseStyle]} />

        <View style={styles.heroContent}>
          <View style={styles.heroIconRow}>
            <View style={styles.heroBadge}>
              <Ionicons name="pulse" size={16} color={DR_COLORS.medicalBlue} />
            </View>
            <View style={styles.heroTag}>
              <Text style={styles.heroTagText}>MEDICAL BLUE EDITION</Text>
            </View>
          </View>
          <Animated.Text style={[styles.heroTitle, titleStyle]}>Instant Dr.</Animated.Text>
          <Text style={styles.heroSubtitle}>Consult top doctors instantly</Text>
          <Text style={styles.heroDescription}>24/7 video, audio & chat consultations</Text>

          <View style={styles.heroStats}>
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>50L+</Text>
              <Text style={styles.heroStatLabel}>Consultations</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>5000+</Text>
              <Text style={styles.heroStatLabel}>Doctors</Text>
            </View>
            <View style={styles.heroStatDivider} />
            <View style={styles.heroStatItem}>
              <Text style={styles.heroStatValue}>4.8</Text>
              <Text style={styles.heroStatLabel}>Rating</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
});

// ============================================================================
// SECTION 2: CHOOSE DOCTOR SPECIALTY
// ============================================================================
const SpecialtyCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, ANIMATION.spring.press);
    rotation.value = withSpring(3, ANIMATION.spring.bouncy);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
    rotation.value = withSpring(0, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 60)} style={[animStyle, styles.specialtyCardWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.specialtyCard}>
        <View style={[styles.specialtyIcon, { backgroundColor: item.bgColor }]}>
          <Ionicons name={item.icon} size={28} color={item.color} />
        </View>
        <Text style={styles.specialtyTitle}>{item.title}</Text>
        <View style={styles.specialtyMeta}>
          <Ionicons name="star" size={10} color="#FFB800" />
          <Text style={styles.specialtyRating}>{item.rating}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

const DoctorSpecialtySection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Choose doctor specialty" icon="medical" color={DR_COLORS.medicalBlue} viewAll />
      <View style={styles.specialtyGrid}>
        {DR_DATA.specialties.map((item, index) => (
          <SpecialtyCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// GENERIC SYMPTOM SECTION COMPONENT
// ============================================================================
const SymptomCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.92, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInUp.duration(400).delay(index * 80)} style={[animStyle, styles.symptomCardWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.symptomCard}>
        <View style={[styles.symptomIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </View>
        <Text style={styles.symptomTitle}>{item.title}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
});

const SymptomSection = React.memo(({ title, symptoms, color, icon }) => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title={title} icon={icon} color={color} />
      <View style={styles.symptomGrid}>
        {symptoms.map((item, index) => (
          <SymptomCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 11: CONSULTATION FEATURES
// ============================================================================
const ConsultFeatureCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.94, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 100)} style={[animStyle, styles.consultFeatureWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.consultFeatureCard}>
        <LinearGradient colors={[item.color + '15', item.color + '05']} style={styles.consultFeatureGradient}>
          <View style={[styles.consultFeatureIcon, { backgroundColor: item.color + '20' }]}>
            <Ionicons name={item.icon} size={28} color={item.color} />
          </View>
          <Text style={styles.consultFeatureTitle}>{item.title}</Text>
          <Text style={styles.consultFeatureDesc}>{item.desc}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const ConsultFeaturesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="How would you like to consult?" icon="options" color={DR_COLORS.medicalBlue} />
      <View style={styles.consultFeatureGrid}>
        {DR_DATA.consultFeatures.map((item, index) => (
          <ConsultFeatureCard key={item.id} item={item} index={index} />
        ))}
      </View>
    </View>
  );
});

// ============================================================================
// SECTION 12: TOP DOCTORS CAROUSEL
// ============================================================================
const DoctorCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 100)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.doctorCard}>
        <LinearGradient colors={['#FFFFFF', '#F8FBFF']} style={styles.doctorCardGradient}>
          <View style={styles.doctorCardHeader}>
            <View style={styles.doctorAvatar}>
              <Ionicons name="person" size={28} color={DR_COLORS.medicalBlue} />
            </View>
            {item.available && (
              <View style={styles.doctorOnlineBadge}>
                <View style={styles.doctorOnlineDot} />
                <Text style={styles.doctorOnlineText}>Online</Text>
              </View>
            )}
          </View>

          <Text style={styles.doctorName}>{item.name}</Text>
          <Text style={styles.doctorSpecialty}>{item.specialty}</Text>

          <View style={styles.doctorMetaRow}>
            <View style={styles.doctorMetaItem}>
              <Ionicons name="briefcase" size={10} color={COLORS.textTertiary} />
              <Text style={styles.doctorMetaText}>{item.experience}</Text>
            </View>
            <View style={styles.doctorMetaItem}>
              <Ionicons name="star" size={10} color="#FFB800" />
              <Text style={styles.doctorMetaText}>{item.rating}</Text>
            </View>
            <View style={styles.doctorMetaItem}>
              <Ionicons name="chatbubbles" size={10} color={COLORS.textTertiary} />
              <Text style={styles.doctorMetaText}>{item.consultations}</Text>
            </View>
          </View>

          <View style={styles.doctorLanguages}>
            {item.languages.map((lang, i) => (
              <View key={i} style={styles.doctorLanguageChip}>
                <Text style={styles.doctorLanguageText}>{lang}</Text>
              </View>
            ))}
          </View>

          <View style={styles.doctorFooter}>
            <Text style={styles.doctorFee}>&#8377;{item.fee}</Text>
            <TouchableOpacity style={[styles.doctorConsultButton, !item.available && styles.doctorConsultButtonDisabled]}>
              <Text style={[styles.doctorConsultButtonText, !item.available && styles.doctorConsultButtonTextDisabled]}>
                {item.available ? 'Consult Now' : 'Unavailable'}
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const TopDoctorsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Top Doctors" subtitle="Highly rated specialists" icon="people" color={DR_COLORS.medicalBlue} viewAll />
      <FlatList
        data={DR_DATA.topDoctors}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <DoctorCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 13: VIDEO CONSULT BANNER
// ============================================================================
const VideoConsultBanner = React.memo(() => {
  const pulse = useSharedValue(0);
  const cameraRotate = useSharedValue(0);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 2000 })
      ), -1, false
    );
    cameraRotate.value = withRepeat(
      withSequence(
        withTiming(5, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-5, { duration: 3000, easing: Easing.inOut(Easing.ease) })
      ), -1, false
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pulse.value, [0, 1], [0.2, 0.5]),
    transform: [{ scale: interpolate(pulse.value, [0, 1], [1, 1.1]) }],
  }));
  const cameraStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${cameraRotate.value}deg` }],
  }));

  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInUp.duration(600)} style={styles.videoBanner}>
        <LinearGradient colors={DR_COLORS.gradientMedicalBlue} style={styles.videoBannerGradient}>
          <Animated.View style={[styles.videoBannerGlow, pulseStyle]} />
          <View style={styles.videoBannerContent}>
            <Animated.View style={cameraStyle}>
              <View style={styles.videoBannerIcon}>
                <Ionicons name="videocam" size={36} color={COLORS.textWhite} />
              </View>
            </Animated.View>
            <Text style={styles.videoBannerTitle}>Video Consultation</Text>
            <Text style={styles.videoBannerDesc}>Connect face-to-face with{'\n'}top specialists from home</Text>
            <View style={styles.videoBannerFeatures}>
              <View style={styles.videoBannerFeature}>
                <Ionicons name="checkmark-circle" size={14} color="rgba(255,255,255,0.9)" />
                <Text style={styles.videoBannerFeatureText}>Available 24/7</Text>
              </View>
              <View style={styles.videoBannerFeature}>
                <Ionicons name="checkmark-circle" size={14} color="rgba(255,255,255,0.9)" />
                <Text style={styles.videoBannerFeatureText}>E-Prescription</Text>
              </View>
              <View style={styles.videoBannerFeature}>
                <Ionicons name="checkmark-circle" size={14} color="rgba(255,255,255,0.9)" />
                <Text style={styles.videoBannerFeatureText}>Follow-up Free</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.videoBannerButton}>
              <Text style={styles.videoBannerButtonText}>Start Video Consult</Text>
              <Ionicons name="arrow-forward" size={16} color={DR_COLORS.medicalBlue} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 14: EMERGENCY SERVICES
// ============================================================================
const EmergencyCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const blinkOpacity = useSharedValue(1);

  useEffect(() => {
    if (index === 0) {
      blinkOpacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ), -1, false
      );
    }
  }, [index]);

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);

  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));
  const blinkStyle = useAnimatedStyle(() => ({ opacity: blinkOpacity.value }));

  return (
    <Animated.View entering={FadeInDown.duration(500).delay(index * 100)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.emergencyCard}>
        <Animated.View style={[styles.emergencyIcon, { backgroundColor: item.color + '15' }, index === 0 ? blinkStyle : {}]}>
          <Ionicons name={item.icon} size={24} color={item.color} />
        </Animated.View>
        <View style={styles.emergencyInfo}>
          <Text style={styles.emergencyTitle}>{item.title}</Text>
          <Text style={styles.emergencyDesc}>{item.desc}</Text>
        </View>
        <TouchableOpacity style={[styles.emergencyCallButton, { backgroundColor: item.color }]}>
          <Ionicons name="call" size={16} color={COLORS.textWhite} />
          <Text style={styles.emergencyCallText}>{item.phone}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const EmergencySection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Emergency Services" subtitle="24/7 immediate help" icon="alert-circle" color={DR_COLORS.emergencyRed} />
      {DR_DATA.emergencyServices.map((item, index) => (
        <EmergencyCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 15: HEALTH PACKAGES
// ============================================================================
const HealthPackageCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.packageCard}>
        <LinearGradient colors={[item.color + '10', item.color + '05']} style={styles.packageCardGradient}>
          <View style={styles.packageCardHeader}>
            <View style={[styles.packageIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <View style={[styles.packageDiscount, { backgroundColor: item.color }]}>
              <Text style={styles.packageDiscountText}>{item.discount}% OFF</Text>
            </View>
          </View>
          <Text style={styles.packageTitle}>{item.title}</Text>
          <Text style={styles.packageTests}>{item.tests} Tests Included</Text>
          <View style={styles.packagePriceRow}>
            <Text style={styles.packagePrice}>&#8377;{item.price}</Text>
            <Text style={styles.packageOldPrice}>&#8377;{item.oldPrice}</Text>
          </View>
          <TouchableOpacity style={[styles.packageBookButton, { borderColor: item.color }]}>
            <Text style={[styles.packageBookText, { color: item.color }]}>Book Now</Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const HealthPackagesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Health Packages" subtitle="Comprehensive health checks" icon="shield-checkmark" color={DR_COLORS.medicalBlue} viewAll />
      <FlatList
        data={DR_DATA.healthPackages}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <HealthPackageCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 16: LAB TESTS
// ============================================================================
const LabTestCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.95, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInDown.duration(400).delay(index * 70)} style={[animStyle, styles.labTestWrapper]}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.labTestCard}>
        <View style={[styles.labTestIcon, { backgroundColor: item.color + '15' }]}>
          <Ionicons name={item.icon} size={20} color={item.color} />
        </View>
        <View style={styles.labTestInfo}>
          <Text style={styles.labTestTitle}>{item.title}</Text>
          <View style={styles.labTestPriceRow}>
            <Text style={styles.labTestPrice}>&#8377;{item.price}</Text>
            <View style={[styles.labTestDiscount, { backgroundColor: item.color + '15' }]}>
              <Text style={[styles.labTestDiscountText, { color: item.color }]}>{item.discount}% OFF</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.labTestBookButton}>
          <Text style={styles.labTestBookText}>Book</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
});

const LabTestsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Popular Lab Tests" subtitle="Book from home" icon="flask" color={DR_COLORS.healthGreen} viewAll />
      {DR_DATA.labTests.map((item, index) => (
        <LabTestCard key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 17: MEDICINE REMINDERS
// ============================================================================
const MedicineReminderSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Medicine Reminders" subtitle="Never miss a dose" icon="alarm" color={DR_COLORS.specialistPurple} />
      <Animated.View entering={FadeInDown.duration(600)} style={styles.reminderContainer}>
        <LinearGradient colors={['#F3E5F5', '#EDE7F6']} style={styles.reminderGradient}>
          {DR_DATA.medicinReminders.map((item, index) => (
            <View key={item.id} style={[styles.reminderItem, index < DR_DATA.medicinReminders.length - 1 && styles.reminderItemBorder]}>
              <View style={[styles.reminderIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={18} color={item.color} />
              </View>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderMedicine}>{item.medicine}</Text>
                <Text style={styles.reminderTime}>{item.time} - {item.frequency}</Text>
              </View>
              <TouchableOpacity style={styles.reminderToggle}>
                <Ionicons name="notifications" size={18} color={DR_COLORS.specialistPurple} />
              </TouchableOpacity>
            </View>
          ))}
          <TouchableOpacity style={styles.reminderAddButton}>
            <Ionicons name="add-circle" size={20} color={DR_COLORS.specialistPurple} />
            <Text style={styles.reminderAddText}>Add Reminder</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// SECTION 18: HEALTH ARTICLES
// ============================================================================
const ArticleCard = React.memo(({ item, index }) => {
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
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.articleCard}>
        <LinearGradient colors={[item.color + '10', '#FFFFFF']} style={styles.articleCardGradient}>
          <View style={styles.articleCardHeader}>
            <View style={[styles.articleIcon, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <View style={styles.articleCategoryBadge}>
              <Text style={styles.articleCategoryText}>{item.category}</Text>
            </View>
          </View>
          <Text style={styles.articleTitle}>{item.title}</Text>
          <Text style={styles.articleDesc} numberOfLines={2}>{item.desc}</Text>
          <View style={styles.articleFooter}>
            <View style={styles.articleReadTime}>
              <Ionicons name="time" size={12} color={COLORS.textTertiary} />
              <Text style={styles.articleReadTimeText}>{item.readTime} read</Text>
            </View>
            <Ionicons name="arrow-forward" size={14} color={item.color} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const HealthArticlesSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="Health Articles" subtitle="Expert medical insights" icon="document-text" color={DR_COLORS.medicalBlue} viewAll />
      <FlatList
        data={DR_DATA.healthArticles}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <ArticleCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 19: TESTIMONIALS
// ============================================================================
const TestimonialCard = React.memo(({ item, index }) => {
  const scale = useSharedValue(1);
  const handlePressIn = useCallback(() => {
    scale.value = withSpring(0.96, ANIMATION.spring.press);
  }, []);
  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, ANIMATION.spring.gentle);
  }, []);
  const animStyle = useAnimatedStyle(() => ({ transform: [{ scale: scale.value }] }));

  return (
    <Animated.View entering={FadeInRight.duration(500).delay(index * 100)} style={animStyle}>
      <TouchableOpacity activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut} style={styles.testimonialCard}>
        <LinearGradient colors={['#FFFFFF', '#F8FBFF']} style={styles.testimonialGradient}>
          <View style={styles.testimonialHeader}>
            <View style={styles.testimonialAvatar}>
              <Ionicons name="person" size={22} color={DR_COLORS.medicalBlue} />
            </View>
            <View style={styles.testimonialInfo}>
              <Text style={styles.testimonialName}>{item.name}</Text>
              <Text style={styles.testimonialSpecialty}>{item.specialty}</Text>
            </View>
          </View>
          <Text style={styles.testimonialComment}>"{item.comment}"</Text>
          <View style={styles.testimonialRating}>
            {Array.from({ length: 5 }, (_, i) => (
              <Ionicons key={i} name={i < item.rating ? 'star' : 'star-outline'} size={14} color="#FFB800" />
            ))}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

const TestimonialsSection = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <SectionHeader title="What Patients Say" subtitle="Verified reviews" icon="chatbubbles" color={DR_COLORS.medicalBlue} />
      <FlatList
        data={DR_DATA.testimonials}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => <TestimonialCard item={item} index={index} />}
      />
    </View>
  );
});

// ============================================================================
// SECTION 20: ASK APOLLO
// ============================================================================
const AskApolloDoctor = React.memo(() => {
  return (
    <View style={styles.sectionContainer}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.askApolloContainer}>
        <View style={styles.askApolloHeader}>
          <View style={styles.askApolloIcon}>
            <Ionicons name="chatbubbles" size={20} color={DR_COLORS.medicalBlue} />
          </View>
          <View>
            <Text style={styles.askApolloTitle}>Private advice for your{'\n'}health concerns</Text>
            <Text style={styles.askApolloSubtitle}>ASK APOLLO ABOUT...</Text>
          </View>
        </View>
        <View style={styles.askApolloQuestions}>
          {[
            'What is the treatment for premature ejaculation?',
            'How to manage high blood pressure naturally?',
            'What are the early signs of diabetes?',
            'Is my child\'s growth on track?',
            'When should I see a dermatologist for acne?',
            'What causes frequent headaches?',
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
// SECTION 21: FAQ SECTION
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
          <Ionicons name={expanded ? 'chevron-up' : 'chevron-down'} size={18} color={DR_COLORS.medicalBlue} />
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
      <SectionHeader title="Frequently Asked Questions" icon="help-circle" color={DR_COLORS.medicalBlue} />
      {DR_DATA.faqData.map((item, index) => (
        <FAQItem key={item.id} item={item} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// SECTION 22: DOCTOR CONSULTATION CTA
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
        <LinearGradient colors={DR_COLORS.gradientMedicalBlue} style={styles.ctaGradient}>
          <Animated.View style={[styles.ctaGlow, pulseStyle]} />
          <View style={styles.ctaContent}>
            <View style={styles.ctaIconContainer}>
              <Ionicons name="videocam" size={36} color={COLORS.textWhite} />
            </View>
            <Text style={styles.ctaTitle}>Need to see a doctor?</Text>
            <Text style={styles.ctaDesc}>Get instant access to 5000+ verified{'\n'}specialists available 24/7</Text>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Consult Now</Text>
              <Ionicons name="arrow-forward" size={16} color={DR_COLORS.medicalBlue} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// MAIN INSTANT DR SCREEN
// ============================================================================
const InstantDrScreen = React.memo(({ scrollY }) => {
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

      <DoctorSpecialtySection />
      <SectionDivider variant="blue" />

      <SymptomSection title="Select symptom for GP consult" symptoms={DR_DATA.gpSymptoms} color={DR_COLORS.medicalBlue} icon="thermometer" />
      <SectionDivider variant="green" />

      <SymptomSection title="Select symptom for Gynaecologist consult" symptoms={DR_DATA.gynaeSymptoms} color="#E91E63" icon="woman" />
      <SectionDivider variant="blue" />

      <SymptomSection title="Select symptom for Dermatology consult" symptoms={DR_DATA.dermaSymptoms} color="#9B59B6" icon="flower" />
      <SectionDivider variant="green" />

      <SymptomSection title="Select symptom for Paediatrician consult" symptoms={DR_DATA.paediaSymptoms} color="#FF6B35" icon="happy" />
      <SectionDivider variant="blue" />

      <SymptomSection title="Select symptom for Cardiology consult" symptoms={DR_DATA.cardioSymptoms} color="#FF4444" icon="heart" />
      <SectionDivider variant="green" />

      <SymptomSection title="Select symptom for Orthopaedic consult" symptoms={DR_DATA.orthoSymptoms} color="#009688" icon="body" />
      <SectionDivider variant="blue" />

      <SymptomSection title="Select symptom for ENT consult" symptoms={DR_DATA.entSymptoms} color="#FFB800" icon="ear" />
      <SectionDivider variant="green" />

      <SymptomSection title="Select symptom for Neurology consult" symptoms={DR_DATA.neuroSymptoms} color="#0066CC" icon="pulse" />
      <SectionDivider variant="blue" />

      <ConsultFeaturesSection />
      <SectionDivider variant="green" />

      <TopDoctorsSection />
      <SectionDivider variant="blue" />

      <VideoConsultBanner />
      <SectionDivider variant="green" />

      <EmergencySection />
      <SectionDivider variant="blue" />

      <HealthPackagesSection />
      <SectionDivider variant="green" />

      <LabTestsSection />
      <SectionDivider variant="blue" />

      <MedicineReminderSection />
      <SectionDivider variant="green" />

      <HealthArticlesSection />
      <SectionDivider variant="blue" />

      <TestimonialsSection />
      <SectionDivider variant="green" />

      <AskApolloDoctor />
      <SectionDivider variant="blue" />

      <FAQSection />
      <SectionDivider variant="green" />

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
    left: SCREEN_WIDTH * 0.3,
    width: SCREEN_WIDTH * 0.4,
    height: 150,
    borderRadius: 75,
    backgroundColor: DR_COLORS.medicalBlue,
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
    backgroundColor: DR_COLORS.medicalBlueFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DR_COLORS.medicalBlueSubtle,
  },
  heroTag: {
    backgroundColor: DR_COLORS.medicalBlueFaded,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: DR_COLORS.medicalBlueSubtle,
  },
  heroTagText: {
    ...TYPOGRAPHY.badge,
    color: DR_COLORS.medicalBlue,
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
    color: DR_COLORS.medicalBlue,
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
  },
  heroStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  heroStatValue: {
    ...TYPOGRAPHY.h3,
    color: DR_COLORS.medicalBlue,
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

  // SPECIALTY GRID
  specialtyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  specialtyCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 3) / 4,
  },
  specialtyCard: {
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  specialtyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  specialtyTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 14,
    minHeight: 28,
  },
  specialtyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: SPACING.xs,
  },
  specialtyRating: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textSecondary,
    fontSize: 9,
  },

  // SYMPTOM GRID
  symptomGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  symptomCardWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md * 3) / 4,
  },
  symptomCard: {
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.md,
    ...SHADOWS.subtle,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  symptomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  symptomTitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 14,
  },

  // CONSULT FEATURES
  consultFeatureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.md,
  },
  consultFeatureWrapper: {
    width: (SCREEN_WIDTH - SPACING.screenPadding * 2 - SPACING.md) / 2,
  },
  consultFeatureCard: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  consultFeatureGradient: {
    padding: SPACING.lg,
    alignItems: 'center',
    minHeight: 130,
  },
  consultFeatureIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  consultFeatureTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  consultFeatureDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginTop: 2,
  },

  // DOCTOR CARDS
  doctorCard: {
    width: SCREEN_WIDTH * 0.65,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  doctorCardGradient: {
    padding: SPACING.lg,
  },
  doctorCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  doctorAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: DR_COLORS.medicalBlueFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: DR_COLORS.medicalBlueSubtle,
  },
  doctorOnlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 166, 81, 0.10)',
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.pill,
  },
  doctorOnlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#00A651',
  },
  doctorOnlineText: {
    ...TYPOGRAPHY.badge,
    color: '#00A651',
    fontSize: 9,
  },
  doctorName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  doctorSpecialty: {
    ...TYPOGRAPHY.bodySmall,
    color: DR_COLORS.medicalBlue,
    fontWeight: '500',
    marginBottom: SPACING.sm,
  },
  doctorMetaRow: {
    flexDirection: 'row',
    gap: SPACING.md,
    marginBottom: SPACING.sm,
  },
  doctorMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  doctorMetaText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontSize: 10,
  },
  doctorLanguages: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginBottom: SPACING.md,
    flexWrap: 'wrap',
  },
  doctorLanguageChip: {
    backgroundColor: COLORS.backgroundMuted,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  doctorLanguageText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 8,
  },
  doctorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.dividerLight,
  },
  doctorFee: {
    ...TYPOGRAPHY.h4,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  doctorConsultButton: {
    backgroundColor: DR_COLORS.medicalBlue,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.button,
  },
  doctorConsultButtonDisabled: {
    backgroundColor: COLORS.backgroundMuted,
  },
  doctorConsultButtonText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
  },
  doctorConsultButtonTextDisabled: {
    color: COLORS.textTertiary,
  },

  // VIDEO BANNER
  videoBanner: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardMedium,
  },
  videoBannerGradient: {
    padding: SPACING.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  videoBannerGlow: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  videoBannerContent: { zIndex: 1, alignItems: 'center' },
  videoBannerIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  videoBannerTitle: {
    ...TYPOGRAPHY.h2,
    color: COLORS.textWhite,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  videoBannerDesc: {
    ...TYPOGRAPHY.bodyMedium,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  videoBannerFeatures: {
    gap: SPACING.sm,
    marginBottom: SPACING.xl,
  },
  videoBannerFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  videoBannerFeatureText: {
    ...TYPOGRAPHY.bodySmall,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  videoBannerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.pill,
    gap: SPACING.sm,
    ...SHADOWS.button,
  },
  videoBannerButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: DR_COLORS.medicalBlue,
    fontWeight: '700',
  },

  // EMERGENCY
  emergencyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.cardWhite,
    borderRadius: RADIUS.card,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    ...SHADOWS.cardSoft,
    gap: SPACING.md,
  },
  emergencyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyInfo: { flex: 1 },
  emergencyTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
  },
  emergencyDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 2,
  },
  emergencyCallButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.button,
    gap: SPACING.xs,
  },
  emergencyCallText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
    fontSize: 10,
  },

  // HEALTH PACKAGES
  packageCard: {
    width: SCREEN_WIDTH * 0.55,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  packageCardGradient: {
    padding: SPACING.lg,
    minHeight: 220,
  },
  packageCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  packageIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packageDiscount: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 3,
    borderRadius: RADIUS.xs,
  },
  packageDiscountText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textWhite,
    fontSize: 9,
  },
  packageTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  packageTests: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginBottom: SPACING.md,
  },
  packagePriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  packagePrice: {
    ...TYPOGRAPHY.h3,
    color: COLORS.textPrimary,
    fontWeight: '800',
  },
  packageOldPrice: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  packageBookButton: {
    borderWidth: 1.5,
    paddingVertical: SPACING.sm + 2,
    borderRadius: RADIUS.button,
    alignItems: 'center',
  },
  packageBookText: {
    ...TYPOGRAPHY.labelMedium,
    fontWeight: '700',
  },

  // LAB TESTS
  labTestWrapper: {
    marginBottom: SPACING.sm,
  },
  labTestCard: {
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
  labTestIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labTestInfo: { flex: 1 },
  labTestTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: 2,
    fontSize: 13,
  },
  labTestPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  labTestPrice: {
    ...TYPOGRAPHY.price,
    color: COLORS.textPrimary,
  },
  labTestDiscount: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 1,
    borderRadius: RADIUS.xs,
  },
  labTestDiscountText: {
    ...TYPOGRAPHY.badge,
    fontSize: 8,
  },
  labTestBookButton: {
    backgroundColor: DR_COLORS.healthGreen,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.button,
  },
  labTestBookText: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textWhite,
    fontWeight: '700',
    fontSize: 11,
  },

  // MEDICINE REMINDERS
  reminderContainer: {
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  reminderGradient: {
    padding: SPACING.lg,
  },
  reminderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    gap: SPACING.md,
  },
  reminderItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123,44,191,0.10)',
  },
  reminderIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInfo: { flex: 1 },
  reminderMedicine: {
    ...TYPOGRAPHY.labelMedium,
    color: COLORS.textPrimary,
    fontWeight: '600',
  },
  reminderTime: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    marginTop: 1,
  },
  reminderToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(123,44,191,0.10)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderAddButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
  },
  reminderAddText: {
    ...TYPOGRAPHY.labelMedium,
    color: DR_COLORS.specialistPurple,
    fontWeight: '600',
  },

  // ARTICLES
  articleCard: {
    width: SCREEN_WIDTH * 0.6,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  articleCardGradient: {
    padding: SPACING.lg,
    minHeight: 190,
  },
  articleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.md,
  },
  articleIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  articleCategoryBadge: {
    backgroundColor: COLORS.backgroundMuted,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
  },
  articleCategoryText: {
    ...TYPOGRAPHY.badge,
    color: COLORS.textTertiary,
    fontSize: 8,
  },
  articleTitle: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
    marginBottom: SPACING.xs,
  },
  articleDesc: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    lineHeight: 16,
    marginBottom: SPACING.md,
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  articleReadTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  articleReadTimeText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textTertiary,
    fontSize: 10,
  },

  // TESTIMONIALS
  testimonialCard: {
    width: SCREEN_WIDTH * 0.72,
    borderRadius: RADIUS.card,
    overflow: 'hidden',
    ...SHADOWS.cardSoft,
  },
  testimonialGradient: {
    padding: SPACING.lg,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  testimonialAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DR_COLORS.medicalBlueFaded,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: DR_COLORS.medicalBlueSubtle,
  },
  testimonialInfo: { flex: 1 },
  testimonialName: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textPrimary,
  },
  testimonialSpecialty: {
    ...TYPOGRAPHY.bodySmall,
    color: DR_COLORS.medicalBlue,
    fontSize: 10,
  },
  testimonialComment: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  testimonialRating: {
    flexDirection: 'row',
    gap: 2,
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
    backgroundColor: DR_COLORS.medicalBlueFaded,
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
    backgroundColor: DR_COLORS.medicalBlue,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.button,
    gap: SPACING.sm,
  },
  askApolloButtonText: {
    ...TYPOGRAPHY.labelLarge,
    color: COLORS.textWhite,
    fontWeight: '700',
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
    borderColor: DR_COLORS.medicalBlueSubtle,
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
    backgroundColor: DR_COLORS.medicalBlueFaded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqNumber: {
    ...TYPOGRAPHY.badge,
    color: DR_COLORS.medicalBlue,
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
    color: DR_COLORS.medicalBlue,
    fontWeight: '700',
  },
});

export default InstantDrScreen;
