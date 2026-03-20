import React, { memo, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DoctorsTheme, SPECIALITIES, SYMPTOMS, TESTS_DATA, LIFESTYLE_CONDITIONS, EXPLORE_OFFERINGS } from '../components/doctors/DoctorsTheme';
import StickyHeader from '../components/doctors/StickyHeader';
import SearchBarAnimated from '../components/doctors/SearchBarAnimated';
import SpecialityGrid from '../components/doctors/SpecialityGrid';
import FloatingAskApollo from '../components/doctors/FloatingAskApollo';
import GoToTopButton from '../components/doctors/GoToTopButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Hero Banner Section
const HeroBanner = memo(() => (
  <View style={heroBannerStyles.container}>
    <View style={heroBannerStyles.badge}>
      <Text style={heroBannerStyles.badgeText}>4.9+ TOP-RATED APOLLO DOCTORS</Text>
    </View>
    <Text style={heroBannerStyles.title}>Find the Right Doctor{'\n'}For Your Symptoms</Text>
    <TouchableOpacity
      style={heroBannerStyles.ctaButton}
      accessibilityRole="button"
      accessibilityLabel="Book your appointment"
    >
      <Text style={heroBannerStyles.ctaText}>Book Your Appointment</Text>
    </TouchableOpacity>
    <Text style={heroBannerStyles.illustration}>👨‍⚕️</Text>
  </View>
));
HeroBanner.displayName = 'HeroBanner';

const heroBannerStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 16,
    padding: 20,
    minHeight: 160,
    overflow: 'hidden',
  },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  badgeText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    color: DoctorsTheme.colors.white,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 26,
    marginBottom: 14,
  },
  ctaButton: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: DoctorsTheme.colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  illustration: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 60,
    opacity: 0.8,
  },
});

// Ask Apollo Widget
const AskApolloWidget = memo(() => (
  <View style={askApolloStyles.container}>
    <View style={askApolloStyles.header}>
      <Text style={askApolloStyles.headerTitle}>Need expert guidance on{'\n'}Doctors & Specialities?</Text>
      <View style={askApolloStyles.aiBadge}>
        <Text style={askApolloStyles.aiBadgeText}>ASK APOLLO ABOUT...</Text>
      </View>
    </View>
    <TouchableOpacity style={askApolloStyles.chip} accessibilityRole="button">
      <Text style={askApolloStyles.chipText}>✦ What conditions are treated by a Urologist?</Text>
      <Ionicons name="chevron-forward" size={14} color={DoctorsTheme.colors.textSecondary} />
    </TouchableOpacity>
    <View style={askApolloStyles.inputRow}>
      <TextInput
        style={askApolloStyles.input}
        placeholder="Or Just Ask Apollo..."
        placeholderTextColor={DoctorsTheme.colors.textTertiary}
        accessibilityLabel="Ask Apollo input"
      />
    </View>
  </View>
));
AskApolloWidget.displayName = 'AskApolloWidget';

const askApolloStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: DoctorsTheme.colors.cream,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8E0D8',
  },
  header: {
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    lineHeight: 22,
    marginBottom: 6,
  },
  aiBadge: {
    alignSelf: 'flex-start',
  },
  aiBadgeText: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  chipText: {
    flex: 1,
    fontSize: 13,
    color: DoctorsTheme.colors.textPrimary,
  },
  inputRow: {
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  input: {
    fontSize: 14,
    color: DoctorsTheme.colors.textPrimary,
    height: 40,
  },
});

// Physio Banner
const PhysioBanner = memo(() => (
  <TouchableOpacity style={physioStyles.container} accessibilityRole="button" accessibilityLabel="Apollo Physio at Home">
    <View style={physioStyles.content}>
      <Text style={physioStyles.icon}>🏋️</Text>
      <View style={{ flex: 1 }}>
        <Text style={physioStyles.title}>Apollo Physio at Home</Text>
        <Text style={physioStyles.subtitle}>Book Free Consult</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={DoctorsTheme.colors.textSecondary} />
    </View>
  </TouchableOpacity>
));
PhysioBanner.displayName = 'PhysioBanner';

const physioStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
    marginTop: 2,
  },
});

// Search Doctors By Section with Tabs
const SearchDoctorsBy = memo(() => {
  const [activeTab, setActiveTab] = useState('Symptoms');
  const tabs = ['Symptoms', 'Offerings', 'Lifestyle Conditions'];

  const symptomsForDisplay = SYMPTOMS.slice(0, 8);
  const rows = [];
  for (let i = 0; i < symptomsForDisplay.length; i += 4) {
    rows.push(symptomsForDisplay.slice(i, i + 4));
  }

  return (
    <View style={searchByStyles.container}>
      <Text style={searchByStyles.sectionTitle}>Search Doctors by</Text>
      <View style={searchByStyles.tabRow}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[searchByStyles.tab, activeTab === tab && searchByStyles.activeTab]}
            onPress={() => setActiveTab(tab)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab }}
          >
            <Text style={[searchByStyles.tabText, activeTab === tab && searchByStyles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={searchByStyles.row}>
          {row.map((item) => (
            <TouchableOpacity key={item.id} style={searchByStyles.item} accessibilityRole="button">
              <View style={[searchByStyles.iconContainer, { backgroundColor: item.color }]}>
                <Text style={searchByStyles.icon}>{item.icon}</Text>
              </View>
              <Text style={searchByStyles.label} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
});
SearchDoctorsBy.displayName = 'SearchDoctorsBy';

const searchByStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 12,
  },
  tabRow: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: DoctorsTheme.colors.border,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 4,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: DoctorsTheme.colors.apolloOrange,
  },
  tabText: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: DoctorsTheme.colors.apolloOrange,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '25%',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 11,
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    lineHeight: 14,
  },
});

// Tests Carousel
const TestsCarousel = memo(() => (
  <View style={testsStyles.container}>
    <Text style={testsStyles.sectionTitle}>Tests you might need today</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {TESTS_DATA.map((test) => (
        <View key={test.id} style={testsStyles.card}>
          <View style={[testsStyles.tag, { backgroundColor: test.tagColor }]}>
            <Text style={testsStyles.tagText}>{test.tag}</Text>
          </View>
          <Text style={testsStyles.cardTitle}>{test.name}</Text>
          <Text style={testsStyles.cardSubtitle}>{test.subtitle}</Text>
          <Text style={testsStyles.includes}>{test.includes}</Text>
          <Text style={testsStyles.description} numberOfLines={3}>{test.description}</Text>
          <View style={testsStyles.bottomTag}>
            <Text style={testsStyles.bottomTagText}>TOP BOOKED TESTS</Text>
          </View>
          <TouchableOpacity style={testsStyles.viewButton} accessibilityRole="button">
            <Text style={testsStyles.viewButtonText}>View all tests ▸</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  </View>
));
TestsCarousel.displayName = 'TestsCarousel';

const testsStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    width: SCREEN_WIDTH * 0.75,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    padding: 16,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  tag: {
    alignSelf: 'flex-start',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 8,
  },
  tagText: {
    color: DoctorsTheme.colors.white,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
    marginBottom: 6,
  },
  includes: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 17,
    marginBottom: 12,
  },
  bottomTag: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  bottomTagText: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  viewButton: {
    alignSelf: 'center',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: DoctorsTheme.colors.apolloOrange,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  viewButtonText: {
    color: DoctorsTheme.colors.apolloOrange,
    fontSize: 13,
    fontWeight: '700',
  },
});

// Insurance Promo Banner
const InsurancePromoBanner = memo(() => (
  <View style={insuranceStyles.container}>
    <Text style={insuranceStyles.icon}>🛡️</Text>
    <View style={{ flex: 1 }}>
      <Text style={insuranceStyles.title}>Stay Insured & Get Free Family Doctor!</Text>
      <Text style={insuranceStyles.subtitle}>Plan With 24×7 Consultations</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={DoctorsTheme.colors.white} />
  </View>
));
InsurancePromoBanner.displayName = 'InsurancePromoBanner';

const insuranceStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: DoctorsTheme.colors.terracotta,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.white,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
});

// Explore Other Offerings
const ExploreOfferings = memo(() => (
  <View style={exploreStyles.container}>
    <Text style={exploreStyles.sectionTitle}>Explore Other Offerings</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {EXPLORE_OFFERINGS.map((item) => (
        <TouchableOpacity key={item.id} style={exploreStyles.card} accessibilityRole="button">
          <View style={[exploreStyles.iconContainer, { backgroundColor: item.color }]}>
            <Text style={exploreStyles.icon}>{item.icon}</Text>
          </View>
          <Text style={exploreStyles.label}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
ExploreOfferings.displayName = 'ExploreOfferings';

const exploreStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    width: 120,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    padding: 14,
    marginLeft: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
});

// Lifestyle Conditions Grid
const LifestyleGrid = memo(() => (
  <View style={lifestyleStyles.container}>
    <Text style={lifestyleStyles.sectionTitle}>Consult For Lifestyle Related Conditions</Text>
    <View style={lifestyleStyles.row}>
      {LIFESTYLE_CONDITIONS.map((item) => (
        <TouchableOpacity key={item.id} style={lifestyleStyles.item} accessibilityRole="button">
          <View style={[lifestyleStyles.iconContainer, { backgroundColor: item.color }]}>
            <Text style={lifestyleStyles.icon}>{item.icon}</Text>
          </View>
          <Text style={lifestyleStyles.label}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
LifestyleGrid.displayName = 'LifestyleGrid';

const lifestyleStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '25%',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 26,
  },
  label: {
    fontSize: 11,
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
});

// On-Time Guarantee Banner
const OnTimeGuaranteeBanner = memo(() => (
  <TouchableOpacity style={ontimeBannerStyles.container} accessibilityRole="button">
    <View style={ontimeBannerStyles.left}>
      <Text style={ontimeBannerStyles.title}>On-Time Guarantee</Text>
      <Text style={ontimeBannerStyles.subtitle}>Get 100% Refund & a Free Consult if Doctor{'\n'}doesn't join on time for Online Consult</Text>
      <View style={ontimeBannerStyles.cta}>
        <Text style={ontimeBannerStyles.ctaText}>Consult Now</Text>
      </View>
    </View>
    <View style={ontimeBannerStyles.right}>
      <Text style={ontimeBannerStyles.clock}>⏰</Text>
      <View style={ontimeBannerStyles.refundBadge}>
        <Text style={ontimeBannerStyles.refundText}>100%</Text>
        <Text style={ontimeBannerStyles.refundLabel}>Refund</Text>
      </View>
    </View>
  </TouchableOpacity>
));
OnTimeGuaranteeBanner.displayName = 'OnTimeGuaranteeBanner';

const ontimeBannerStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#E8F5E9',
    borderRadius: 14,
    flexDirection: 'row',
    padding: 16,
    overflow: 'hidden',
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 16,
    marginBottom: 10,
  },
  cta: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: DoctorsTheme.colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  right: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  clock: {
    fontSize: 40,
  },
  refundBadge: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginTop: 4,
    alignItems: 'center',
  },
  refundText: {
    color: DoctorsTheme.colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  refundLabel: {
    color: DoctorsTheme.colors.white,
    fontSize: 9,
    fontWeight: '600',
  },
});

// Services Row
const ServicesRow = memo(() => {
  const services = [
    { id: 'online', name: 'Online\nConsult', icon: '💻', color: '#E1F5FE' },
    { id: 'hospital', name: 'Hospital\nVisit', icon: '🏥', color: '#F3E5F5' },
    { id: 'surgical', name: 'Surgical\nCare', icon: '🔬', color: '#FFF3E0' },
  ];

  return (
    <View style={servicesStyles.container}>
      {services.map((item) => (
        <TouchableOpacity key={item.id} style={servicesStyles.item} accessibilityRole="button">
          <View style={[servicesStyles.iconContainer, { backgroundColor: item.color }]}>
            <Text style={servicesStyles.icon}>{item.icon}</Text>
          </View>
          <Text style={servicesStyles.label}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});
ServicesRow.displayName = 'ServicesRow';

const servicesStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  item: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    fontSize: 11,
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 15,
  },
});

// Family Care Plan
const FamilyCareBanner = memo(() => (
  <TouchableOpacity style={familyStyles.container} accessibilityRole="button">
    <View style={{ flex: 1 }}>
      <Text style={familyStyles.title}>One Plan. Complete{'\n'}Family Care.</Text>
      <Text style={familyStyles.subtitle}>Get unlimited doctor{'\n'}consults for your family</Text>
      <View style={familyStyles.cta}>
        <Text style={familyStyles.ctaText}>Upgrade Now</Text>
      </View>
    </View>
    <View style={familyStyles.badge}>
      <Text style={familyStyles.badgeText}>Family{'\n'}Care Plan</Text>
    </View>
  </TouchableOpacity>
));
FamilyCareBanner.displayName = 'FamilyCareBanner';

const familyStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFF8E1',
    borderRadius: 14,
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0E6C0',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 17,
    marginBottom: 10,
  },
  cta: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  ctaText: {
    color: DoctorsTheme.colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  badge: {
    backgroundColor: '#FFD54F',
    borderRadius: 10,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
});

// Instant Doctor Consult
const InstantDoctorBanner = memo(() => (
  <TouchableOpacity style={instantStyles.container} accessibilityRole="button">
    <View style={instantStyles.iconWrap}>
      <Text style={instantStyles.icon}>🩺</Text>
    </View>
    <View style={{ flex: 1 }}>
      <Text style={instantStyles.title}>Instant Doctor Consult</Text>
      <Text style={instantStyles.subtitle}>Connect in under 5 seconds</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={DoctorsTheme.colors.textSecondary} />
  </TouchableOpacity>
));
InstantDoctorBanner.displayName = 'InstantDoctorBanner';

const instantStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 4,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  iconWrap: {
    marginRight: 12,
  },
  icon: {
    fontSize: 28,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 2,
  },
});

// Spotlight
const SpotlightBanner = memo(() => (
  <View style={spotlightStyles.container}>
    <Text style={spotlightStyles.sectionTitle}>In the Spotlight</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      <View style={spotlightStyles.card}>
        <Text style={spotlightStyles.cardIcon}>🩺</Text>
        <Text style={spotlightStyles.cardTitle}>MANAGE DIABETES ON THE GO{'\n'}WITH ENGLISH COOLERS BAGS</Text>
      </View>
      <View style={[spotlightStyles.card, { backgroundColor: '#E8F5E9' }]}>
        <Text style={spotlightStyles.cardIcon}>💊</Text>
        <Text style={spotlightStyles.cardTitle}>NEW HEALTH{'\n'}PACKAGES AVAILABLE</Text>
      </View>
    </ScrollView>
  </View>
));
SpotlightBanner.displayName = 'SpotlightBanner';

const spotlightStyles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: '#FFF3E0',
    borderRadius: 14,
    padding: 16,
    marginLeft: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 80,
  },
  cardIcon: {
    fontSize: 36,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    flex: 1,
    lineHeight: 18,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 2: DOCTOR SPECIALTIES DEEP DIVE - Comprehensive Specialties Section
// ─────────────────────────────────────────────────────────────────────────────

// Extended Specialties with Detailed Information
const EXTENDED_SPECIALTIES = [
  { id: 'cardio', name: 'Cardiology', icon: '❤️', color: '#FFEBEE', doctors: 450, experience: '1-30+ yrs', desc: 'Heart & cardiovascular system' },
  { id: 'neuro', name: 'Neurology', icon: '🧠', color: '#E3F2FD', doctors: 320, experience: '1-25+ yrs', desc: 'Brain, spine & nervous system' },
  { id: 'ortho', name: 'Orthopedics', icon: '🦴', color: '#FFF3E0', doctors: 380, experience: '1-28+ yrs', desc: 'Bones, joints & muscles' },
  { id: 'derma', name: 'Dermatology', icon: '✨', color: '#F3E5F5', doctors: 290, experience: '1-20+ yrs', desc: 'Skin, hair & nails' },
  { id: 'gastro', name: 'Gastroenterology', icon: '🫃', color: '#E8F5E9', doctors: 240, experience: '1-25+ yrs', desc: 'Digestive system & liver' },
  { id: 'pulmo', name: 'Pulmonology', icon: '🫁', color: '#E0F7FA', doctors: 180, experience: '1-22+ yrs', desc: 'Lungs & respiratory system' },
  { id: 'nephro', name: 'Nephrology', icon: '🫘', color: '#FCE4EC', doctors: 150, experience: '1-20+ yrs', desc: 'Kidney & urinary system' },
  { id: 'endo', name: 'Endocrinology', icon: '💉', color: '#FFF8E1', doctors: 160, experience: '1-18+ yrs', desc: 'Hormones & metabolism' },
  { id: 'rheum', name: 'Rheumatology', icon: '🤲', color: '#F1F8E9', doctors: 120, experience: '1-15+ yrs', desc: 'Arthritis & joint diseases' },
  { id: 'psych', name: 'Psychiatry', icon: '🧘', color: '#E8EAF6', doctors: 200, experience: '1-25+ yrs', desc: 'Mental health & behavior' },
  { id: 'uro', name: 'Urology', icon: '🧬', color: '#E0F2F1', doctors: 210, experience: '1-20+ yrs', desc: 'Urinary tract & male health' },
  { id: 'ophthal', name: 'Ophthalmology', icon: '👁️', color: '#FFFDE7', doctors: 280, experience: '1-25+ yrs', desc: 'Eye care & vision' },
  { id: 'ent', name: 'ENT', icon: '👂', color: '#FBE9E7', doctors: 250, experience: '1-20+ yrs', desc: 'Ear, nose & throat' },
  { id: 'gyne', name: 'Gynecology', icon: '🌸', color: '#FCE4EC', doctors: 350, experience: '1-30+ yrs', desc: "Women's health" },
  { id: 'pedi', name: 'Pediatrics', icon: '👶', color: '#E1F5FE', doctors: 400, experience: '1-25+ yrs', desc: 'Child healthcare' },
  { id: 'onco', name: 'Oncology', icon: '🎗️', color: '#F3E5F5', doctors: 180, experience: '1-30+ yrs', desc: 'Cancer treatment' },
];

const ExtendedSpecialtiesGrid = memo(() => (
  <View style={extendedSpecialtiesStyles.container}>
    <View style={extendedSpecialtiesStyles.headerRow}>
      <Text style={extendedSpecialtiesStyles.sectionTitle}>All Doctor Specialties</Text>
      <TouchableOpacity style={extendedSpecialtiesStyles.viewAllBtn}>
        <Text style={extendedSpecialtiesStyles.viewAllText}>View All</Text>
        <Ionicons name="chevron-forward" size={14} color={DoctorsTheme.colors.teal} />
      </TouchableOpacity>
    </View>
    <View style={extendedSpecialtiesStyles.grid}>
      {EXTENDED_SPECIALTIES.map((item) => (
        <TouchableOpacity key={item.id} style={extendedSpecialtiesStyles.card} accessibilityRole="button">
          <View style={[extendedSpecialtiesStyles.iconContainer, { backgroundColor: item.color }]}>
            <Text style={extendedSpecialtiesStyles.icon}>{item.icon}</Text>
          </View>
          <Text style={extendedSpecialtiesStyles.name}>{item.name}</Text>
          <Text style={extendedSpecialtiesStyles.doctors}>{item.doctors}+ Doctors</Text>
          <Text style={extendedSpecialtiesStyles.exp}>{item.experience}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
ExtendedSpecialtiesGrid.displayName = 'ExtendedSpecialtiesGrid';

const extendedSpecialtiesStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '31%',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: 12,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
  doctors: {
    fontSize: 10,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 4,
  },
  exp: {
    fontSize: 9,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
  },
});

// Top Cities for Doctor Consultation
const TOP_CITIES = [
  { id: 'delhi', name: 'Delhi', icon: '🏛️', doctors: 5000, hospitals: 250 },
  { id: 'mumbai', name: 'Mumbai', icon: '🌆', doctors: 4500, hospitals: 200 },
  { id: 'bangalore', name: 'Bangalore', icon: '🌐', doctors: 4000, hospitals: 180 },
  { id: 'chennai', name: 'Chennai', icon: '🏖️', doctors: 3500, hospitals: 150 },
  { id: 'hyderabad', name: 'Hyderabad', icon: '🕌', doctors: 3000, hospitals: 140 },
  { id: 'kolkata', name: 'Kolkata', icon: '🌉', doctors: 2800, hospitals: 120 },
  { id: 'pune', name: 'Pune', icon: '🏞️', doctors: 2500, hospitals: 110 },
  { id: 'ahmedabad', name: 'Ahmedabad', icon: '🕉️', doctors: 2000, hospitals: 90 },
];

const CitiesSection = memo(() => (
  <View style={citiesStyles.container}>
    <Text style={citiesStyles.sectionTitle}>Consult Top Doctors in Major Cities</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {TOP_CITIES.map((city) => (
        <TouchableOpacity key={city.id} style={citiesStyles.card} accessibilityRole="button">
          <Text style={citiesStyles.icon}>{city.icon}</Text>
          <Text style={citiesStyles.name}>{city.name}</Text>
          <Text style={citiesStyles.doctors}>{city.doctors}+ Doctors</Text>
          <Text style={citiesStyles.hospitals}>{city.hospitals} Hospitals</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
CitiesSection.displayName = 'CitiesSection';

const citiesStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    width: 130,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    padding: 14,
    marginLeft: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  doctors: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 4,
  },
  hospitals: {
    fontSize: 10,
    color: DoctorsTheme.colors.teal,
  },
});

// Hospital Networks
const HOSPITAL_NETWORKS = [
  { id: 'apollo', name: 'Apollo Hospitals', icon: '🏥', color: '#0F847E', hospitals: 70, cities: 20 },
  { id: 'fortis', name: 'Fortis Healthcare', icon: '🏩', color: '#1565C0', hospitals: 55, cities: 18 },
  { id: 'max', name: 'Max Healthcare', icon: '🏨', color: '#E91E63', hospitals: 40, cities: 15 },
  { id: 'medanta', name: 'Medanta', icon: '🩺', color: '#FF5722', hospitals: 25, cities: 12 },
  { id: 'narayana', name: 'Narayana Health', icon: '❤️', color: '#7B1FA2', hospitals: 30, cities: 10 },
];

const HospitalNetworks = memo(() => (
  <View style={hospitalStyles.container}>
    <Text style={hospitalStyles.sectionTitle}>Book Appointments at Top Hospitals</Text>
    {HOSPITAL_NETWORKS.map((network) => (
      <TouchableOpacity key={network.id} style={hospitalStyles.row} accessibilityRole="button">
        <View style={[hospitalStyles.iconContainer, { backgroundColor: network.color + '20' }]}>
          <Text style={hospitalStyles.icon}>{network.icon}</Text>
        </View>
        <View style={hospitalStyles.info}>
          <Text style={hospitalStyles.name}>{network.name}</Text>
          <Text style={hospitalStyles.details}>{network.hospitals} Hospitals • {network.cities} Cities</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={DoctorsTheme.colors.textSecondary} />
      </TouchableOpacity>
    ))}
  </View>
));
HospitalNetworks.displayName = 'HospitalNetworks';

const hospitalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  details: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 2,
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 3: HEALTH CONDITIONS & SYMPTOMS - Comprehensive Symptom Checker
// ─────────────────────────────────────────────────────────────────────────────

// Common Symptoms Database
const COMMON_SYMPTOMS = [
  { id: 'fever', name: 'Fever', icon: '🌡️', color: '#FFEBEE', category: 'General', severity: 'Mild to Severe' },
  { id: 'cough', name: 'Cough', icon: '😷', color: '#E3F2FD', category: 'Respiratory', severity: 'Mild to Moderate' },
  { id: 'headache', name: 'Headache', icon: '🤕', color: '#FFF3E0', category: 'Neurological', severity: 'Mild to Severe' },
  { id: 'stomach', name: 'Stomach Pain', icon: '🤢', color: '#E8F5E9', category: 'Digestive', severity: 'Mild to Severe' },
  { id: 'fatigue', name: 'Fatigue', icon: '😴', color: '#F3E5F5', category: 'General', severity: 'Mild to Moderate' },
  { id: 'rash', name: 'Skin Rash', icon: '🔴', color: '#FCE4EC', category: 'Dermatological', severity: 'Mild' },
  { id: 'chest', name: 'Chest Pain', icon: '💔', color: '#FFCDD2', category: 'Cardiac', severity: 'Severe' },
  { id: 'breathing', name: 'Shortness of Breath', icon: '😮‍💨', color: '#B3E5FC', category: 'Respiratory', severity: 'Moderate to Severe' },
  { id: 'joint', name: 'Joint Pain', icon: '🦴', color: '#FFF8E1', category: 'Orthopedic', severity: 'Mild to Moderate' },
  { id: 'throat', name: 'Sore Throat', icon: '🗣️', color: '#E0F7FA', category: 'ENT', severity: 'Mild' },
  { id: 'nausea', name: 'Nausea', icon: '🤮', color: '#F1F8E9', category: 'Digestive', severity: 'Mild' },
  { id: 'dizziness', name: 'Dizziness', icon: '😵', color: '#E8EAF6', category: 'Neurological', severity: 'Mild to Moderate' },
];

const SymptomsSection = memo(() => (
  <View style={symptomsStyles.container}>
    <View style={symptomsStyles.headerRow}>
      <Text style={symptomsStyles.sectionTitle}>Search by Symptoms</Text>
      <TouchableOpacity>
        <Text style={symptomsStyles.viewAll}>Symptom Checker →</Text>
      </TouchableOpacity>
    </View>
    <View style={symptomsStyles.grid}>
      {COMMON_SYMPTOMS.map((symptom) => (
        <TouchableOpacity key={symptom.id} style={symptomsStyles.card} accessibilityRole="button">
          <View style={[symptomsStyles.iconContainer, { backgroundColor: symptom.color }]}>
            <Text style={symptomsStyles.icon}>{symptom.icon}</Text>
          </View>
          <Text style={symptomsStyles.name}>{symptom.name}</Text>
          <Text style={symptomsStyles.category}>{symptom.category}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
SymptomsSection.displayName = 'SymptomsSection';

const symptomsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  viewAll: {
    fontSize: 13,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '31%',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 22,
  },
  name: {
    fontSize: 11,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
  category: {
    fontSize: 9,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 2,
  },
});

// Health Conditions by Category
const HEALTH_CONDITIONS = [
  { id: 'diabetes', name: 'Diabetes', icon: '💉', color: '#E3F2FD', patients: '77M+', desc: 'Blood sugar management' },
  { id: 'bp', name: 'Blood Pressure', icon: '❤️', color: '#FFEBEE', patients: '65M+', desc: 'Hypertension control' },
  { id: 'thyroid', name: 'Thyroid', icon: '🦋', color: '#FFF3E0', patients: '42M+', desc: 'Thyroid disorders' },
  { id: 'heart', name: 'Heart Disease', icon: '💓', color: '#FCE4EC', patients: '30M+', desc: 'Cardiac care' },
  { id: 'asthma', name: 'Asthma', icon: '🫁', color: '#E0F7FA', patients: '25M+', desc: 'Respiratory care' },
  { id: 'arthritis', name: 'Arthritis', icon: '🤲', color: '#F1F8E9', patients: '20M+', desc: 'Joint care' },
  { id: 'cancer', name: 'Cancer', icon: '🎗️', color: '#F3E5F5', patients: '15M+', desc: 'Oncology care' },
  { id: 'kidney', name: 'Kidney Disease', icon: '🫘', color: '#EFEBE9', patients: '10M+', desc: 'Nephrology care' },
];

const HealthConditionsSection = memo(() => (
  <View style={conditionsStyles.container}>
    <Text style={conditionsStyles.sectionTitle}>Manage Chronic Conditions</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {HEALTH_CONDITIONS.map((condition) => (
        <TouchableOpacity key={condition.id} style={conditionsStyles.card} accessibilityRole="button">
          <View style={[conditionsStyles.iconContainer, { backgroundColor: condition.color }]}>
            <Text style={conditionsStyles.icon}>{condition.icon}</Text>
          </View>
          <Text style={conditionsStyles.name}>{condition.name}</Text>
          <Text style={conditionsStyles.patients}>{condition.patients} Patients</Text>
          <Text style={conditionsStyles.desc}>{condition.desc}</Text>
          <TouchableOpacity style={conditionsStyles.consultBtn}>
            <Text style={conditionsStyles.consultText}>Consult Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
HealthConditionsSection.displayName = 'HealthConditionsSection';

const conditionsStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    width: 160,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 14,
    padding: 14,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  patients: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 4,
  },
  desc: {
    fontSize: 11,
    color: DoctorsTheme.colors.teal,
    marginTop: 4,
  },
  consultBtn: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  consultText: {
    color: DoctorsTheme.colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
});

// ─────────────────────────────────────────────────────────────────────────────
// PAGE 4: SERVICES & PACKAGES - Comprehensive Healthcare Services
// ─────────────────────────────────────────────────────────────────────────────

// Online Consultation Services
const ONLINE_SERVICES = [
  { id: 'video', name: 'Video Consultation', icon: '📹', color: '#E3F2FD', doctors: 5000, avgTime: '< 5 min', desc: 'Face-to-face video call with doctors' },
  { id: 'audio', name: 'Audio Consultation', icon: '📞', color: '#E8F5E9', doctors: 4500, avgTime: '< 3 min', desc: 'Voice call for quick consultations' },
  { id: 'chat', name: 'Chat Consultation', icon: '💬', color: '#FFF3E0', doctors: 4000, avgTime: '< 10 min', desc: 'Text-based doctor consultation' },
  { id: 'prescription', name: 'E-Prescriptions', icon: '📝', color: '#F3E5F5', doctors: 5500, avgTime: 'Instant', desc: 'Digital prescriptions sent instantly' },
];

const OnlineServicesSection = memo(() => (
  <View style={onlineServicesStyles.container}>
    <Text style={onlineServicesStyles.sectionTitle}>Online Consultation Services</Text>
    {ONLINE_SERVICES.map((service) => (
      <TouchableOpacity key={service.id} style={onlineServicesStyles.row} accessibilityRole="button">
        <View style={[onlineServicesStyles.iconContainer, { backgroundColor: service.color }]}>
          <Text style={onlineServicesStyles.icon}>{service.icon}</Text>
        </View>
        <View style={onlineServicesStyles.info}>
          <Text style={onlineServicesStyles.name}>{service.name}</Text>
          <Text style={onlineServicesStyles.desc}>{service.desc}</Text>
          <View style={onlineServicesStyles.stats}>
            <Text style={onlineServicesStyles.stat}>{service.doctors}+ Doctors</Text>
            <Text style={onlineServicesStyles.statDivider}>•</Text>
            <Text style={onlineServicesStyles.stat}>{service.avgTime}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color={DoctorsTheme.colors.teal} />
      </TouchableOpacity>
    ))}
  </View>
));
OnlineServicesSection.displayName = 'OnlineServicesSection';

const onlineServicesStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 26,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  desc: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 2,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  stat: {
    fontSize: 11,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
  },
  statDivider: {
    marginHorizontal: 6,
    color: DoctorsTheme.colors.textSecondary,
  },
});

// Health Packages
const HEALTH_PACKAGES = [
  { id: 'basic', name: 'Basic Health Checkup', icon: '🩺', price: 999, mrp: 2499, tests: 30, includes: 'CBC, LFT, KFT, Lipid Profile, Thyroid' },
  { id: 'comprehensive', name: 'Comprehensive Full Body', icon: '🏥', price: 3499, mrp: 7999, tests: 80, includes: 'All Basic + Vitamin D, B12, HbA1c, CRP' },
  { id: 'diabetes', name: 'Diabetes Care Package', icon: '💉', price: 799, mrp: 1999, tests: 25, includes: 'Fasting Sugar, Post Prandial, HbA1c, Lipid Profile' },
  { id: 'cardiac', name: 'Heart Care Package', icon: '❤️', price: 2499, mrp: 5999, tests: 45, includes: 'ECG, Echo, TMT, Lipid Profile, CRP' },
  { id: 'senior', name: 'Senior Citizen Pack', icon: '👴', price: 2999, mrp: 6999, tests: 60, includes: 'Complete Health Check + Bone Density' },
  { id: 'women', name: "Women's Wellness", icon: '🌸', price: 1999, mrp: 4999, tests: 40, includes: 'Pap Smear, Breast Exam, Thyroid, Vitamin' },
];

const HealthPackagesSection = memo(() => (
  <View style={packagesStyles.container}>
    <View style={packagesStyles.headerRow}>
      <Text style={packagesStyles.sectionTitle}>Health Packages</Text>
      <TouchableOpacity>
        <Text style={packagesStyles.viewAll}>View All Packages →</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {HEALTH_PACKAGES.map((pkg) => (
        <TouchableOpacity key={pkg.id} style={packagesStyles.card} accessibilityRole="button">
          <View style={packagesStyles.cardHeader}>
            <Text style={packagesStyles.icon}>{pkg.icon}</Text>
            <View style={packagesStyles.discountBadge}>
              <Text style={packagesStyles.discountText}>{Math.round((1 - pkg.price / pkg.mrp) * 100)}% OFF</Text>
            </View>
          </View>
          <Text style={packagesStyles.name}>{pkg.name}</Text>
          <Text style={packagesStyles.includes}>{pkg.includes}</Text>
          <View style={packagesStyles.testsRow}>
            <Text style={packagesStyles.tests}>{pkg.tests} Tests</Text>
          </View>
          <View style={packagesStyles.priceRow}>
            <Text style={packagesStyles.price}>₹{pkg.price}</Text>
            <Text style={packagesStyles.mrp}>₹{pkg.mrp}</Text>
          </View>
          <TouchableOpacity style={packagesStyles.bookBtn}>
            <Text style={packagesStyles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
HealthPackagesSection.displayName = 'HealthPackagesSection';

const packagesStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  viewAll: {
    fontSize: 13,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
  },
  card: {
    width: 200,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 14,
    padding: 14,
    marginLeft: 16,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  icon: {
    fontSize: 32,
  },
  discountBadge: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  includes: {
    fontSize: 10,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 14,
  },
  testsRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  tests: {
    fontSize: 11,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  mrp: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  bookBtn: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  bookText: {
    color: DoctorsTheme.colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
});

// Additional Services
const ADDITIONAL_SERVICES = [
  { id: 'homecare', name: 'Home Care Services', icon: '🏠', color: '#E8F5E9', desc: 'Nursing, physiotherapy at home' },
  { id: 'ambulance', name: 'Ambulance Service', icon: '🚑', color: '#FFEBEE', desc: '24/7 emergency ambulance' },
  { id: 'medicine', name: 'Medicine Delivery', icon: '💊', color: '#E3F2FD', desc: 'Free home delivery' },
  { id: 'reports', name: 'Digital Health Records', icon: '📋', color: '#FFF3E0', desc: 'Secure online reports' },
  { id: 'insurance', name: 'Health Insurance', icon: '🛡️', color: '#F3E5F5', desc: 'Cashless treatments' },
  { id: 'careplan', name: 'Personalized Care Plan', icon: '📱', color: '#E0F7FA', desc: 'Custom health roadmap' },
];

const AdditionalServicesSection = memo(() => (
  <View style={additionalStyles.container}>
    <Text style={additionalStyles.sectionTitle}>More Healthcare Services</Text>
    <View style={additionalStyles.grid}>
      {ADDITIONAL_SERVICES.map((service) => (
        <TouchableOpacity key={service.id} style={additionalStyles.card} accessibilityRole="button">
          <View style={[additionalStyles.iconContainer, { backgroundColor: service.color }]}>
            <Text style={additionalStyles.icon}>{service.icon}</Text>
          </View>
          <Text style={additionalStyles.name}>{service.name}</Text>
          <Text style={additionalStyles.desc}>{service.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
AdditionalServicesSection.displayName = 'AdditionalServicesSection';

const additionalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '31%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 22,
  },
  name: {
    fontSize: 10,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
  desc: {
    fontSize: 8,
    color: DoctorsTheme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});

// Doctor Reviews Section
const DOCTOR_REVIEWS = [
  { id: '1', doctorName: 'Dr. Rahul Sharma', specialty: 'Cardiologist', hospital: 'Apollo Hospital', rating: 4.9, reviews: 2500, experience: '15 years', patient: 'Mr. Amit Patel', comment: 'Excellent consultation. Dr. Sharma explained everything clearly and the treatment was very effective.' },
  { id: '2', doctorName: 'Dr. Priya Singh', specialty: 'Dermatologist', hospital: 'Fortis', rating: 4.8, reviews: 1800, experience: '12 years', patient: 'Ms. Sneha Gupta', comment: 'Very patient and understanding. My skin condition improved significantly after the treatment.' },
  { id: '3', doctorName: 'Dr. Vikram Mehta', specialty: 'Orthopedist', hospital: 'Max Healthcare', rating: 4.9, reviews: 3200, experience: '20 years', patient: 'Mr. Rajesh Kumar', comment: 'Best doctor for joint problems. The surgery was successful and recovery was smooth.' },
];

const DoctorReviewsSection = memo(() => (
  <View style={reviewsStyles.container}>
    <Text style={reviewsStyles.sectionTitle}>Patient Reviews & Testimonials</Text>
    {DOCTOR_REVIEWS.map((review) => (
      <View key={review.id} style={reviewsStyles.card}>
        <View style={reviewsStyles.header}>
          <View style={reviewsStyles.avatar}>
            <Text style={reviewsStyles.avatarText}>{review.doctorName.charAt(4)}</Text>
          </View>
          <View style={reviewsStyles.doctorInfo}>
            <Text style={reviewsStyles.doctorName}>{review.doctorName}</Text>
            <Text style={reviewsStyles.specialty}>{review.specialty} • {review.experience}</Text>
            <Text style={reviewsStyles.hospital}>{review.hospital}</Text>
          </View>
          <View style={reviewsStyles.ratingBadge}>
            <Text style={reviewsStyles.rating}>⭐ {review.rating}</Text>
            <Text style={reviewsStyles.reviews}>{review.reviews} reviews</Text>
          </View>
        </View>
        <View style={reviewsStyles.patientSection}>
          <Text style={reviewsStyles.patientLabel}>Patient:</Text>
          <Text style={reviewsStyles.patientName}>{review.patient}</Text>
        </View>
        <Text style={reviewsStyles.comment}>"{review.comment}"</Text>
        <View style={reviewsStyles.footer}>
          <TouchableOpacity style={reviewsStyles.consultBtn}>
            <Text style={reviewsStyles.consultText}>Consult Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={reviewsStyles.profileBtn}>
            <Text style={reviewsStyles.profileText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </View>
));
DoctorReviewsSection.displayName = 'DoctorReviewsSection';

const reviewsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FAFAFA',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 16,
  },
  card: {
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: DoctorsTheme.colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: DoctorsTheme.colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  specialty: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 2,
  },
  hospital: {
    fontSize: 11,
    color: DoctorsTheme.colors.teal,
    marginTop: 2,
  },
  ratingBadge: {
    alignItems: 'flex-end',
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  reviews: {
    fontSize: 10,
    color: DoctorsTheme.colors.textSecondary,
  },
  patientSection: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  patientLabel: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
  },
  patientName: {
    fontSize: 12,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    marginLeft: 4,
  },
  comment: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
    fontStyle: 'italic',
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
  },
  consultBtn: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  consultText: {
    color: DoctorsTheme.colors.white,
    fontSize: 13,
    fontWeight: '700',
  },
  profileBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.teal,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  profileText: {
    color: DoctorsTheme.colors.teal,
    fontSize: 13,
    fontWeight: '700',
  },
});

// FAQ Section
const FAQ_DATA = [
  { id: '1', question: 'How do I book an online doctor consultation?', answer: 'Simply search for your symptoms or select a specialty, choose a doctor, and click on "Book Consultation" to connect via video, audio, or chat.' },
  { id: '2', question: 'Are online consultations as effective as in-person visits?', answer: 'Yes, for many conditions online consultations are equally effective. Our doctors can diagnose, prescribe medicines, and recommend tests online.' },
  { id: '3', question: 'How long does it take to get a doctor on call?', answer: 'Our average wait time is less than 5 minutes. We have 5000+ doctors available 24/7 for instant consultations.' },
  { id: '4', question: 'Can I get a prescription online?', answer: 'Yes, our doctors can provide e-prescriptions which are legally valid and can be used to buy medicines from any pharmacy.' },
  { id: '5', question: 'What payment methods are accepted?', answer: 'We accept all major credit/debit cards, UPI, digital wallets, and insurance cards for doctor consultations.' },
];

const FAQSection = memo(() => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={faqStyles.container}>
      <Text style={faqStyles.sectionTitle}>Frequently Asked Questions</Text>
      {FAQ_DATA.map((item) => (
        <View key={item.id} style={faqStyles.item}>
          <TouchableOpacity style={faqStyles.questionRow} onPress={() => toggleExpand(item.id)}>
            <Text style={faqStyles.question}>{item.question}</Text>
            <Ionicons name={expanded[item.id] ? 'remove' : 'add'} size={20} color={DoctorsTheme.colors.teal} />
          </TouchableOpacity>
          {expanded[item.id] && (
            <Text style={faqStyles.answer}>{item.answer}</Text>
          )}
        </View>
      ))}
    </View>
  );
});
FAQSection.displayName = 'FAQSection';

const faqStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 16,
  },
  item: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
  },
  question: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    marginRight: 10,
  },
  answer: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 18,
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});

// App Download Section
const AppDownloadSection = memo(() => (
  <View style={appDownloadStyles.container}>
    <View style={appDownloadStyles.content}>
      <Text style={appDownloadStyles.title}>Download Our App</Text>
      <Text style={appDownloadStyles.subtitle}>Get 20% off on first consultation</Text>
      <View style={appDownloadStyles.buttons}>
        <TouchableOpacity style={appDownloadStyles.playStoreBtn}>
          <Text style={appDownloadStyles.btnIcon}>▶️</Text>
          <View style={appDownloadStyles.btnText}>
            <Text style={appDownloadStyles.btnSmallText}>Get it on</Text>
            <Text style={appDownloadStyles.btnBigText}>Google Play</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={appDownloadStyles.appStoreBtn}>
          <Text style={appDownloadStyles.btnIcon}>🍎</Text>
          <View style={appDownloadStyles.btnText}>
            <Text style={appDownloadStyles.btnSmallText}>Download on the</Text>
            <Text style={appDownloadStyles.btnBigText}>App Store</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
));
AppDownloadSection.displayName = 'AppDownloadSection';

const appDownloadStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 16,
    padding: 20,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: DoctorsTheme.colors.white,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
  },
  playStoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  appStoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  btnIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  btnText: {},
  btnSmallText: {
    fontSize: 10,
    color: DoctorsTheme.colors.textSecondary,
  },
  btnBigText: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
});

// Main Doctors Index Screen
export default function DoctorsIndex() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [showGoToTop, setShowGoToTop] = useState(false);

  const handleScroll = useCallback((event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowGoToTop(offsetY > 500);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  const handleSpecialityPress = useCallback((speciality) => {
    // Navigate to appropriate specialty screen based on id
    const screenMap = {
      'cardio': '/doctors/specialty/cardiology',
      'derma': '/doctors/specialty/dermatology',
      'gp': '/doctors/specialty/generalpractitioner',
      'women': '/doctors/specialty/womenshealth',
      'psych': '/doctors/specialty/psychiatry',
      'ortho': '/doctors/specialty/orthopaedics',
      'ent': '/doctors/specialty/generalpractitioner',
      'uro': '/doctors/specialty/cardiology',
      'paed': '/doctors/specialty/generalpractitioner',
      'digest': '/doctors/specialty/generalpractitioner',
      'neuro': '/doctors/specialty/psychiatry',
      'diab': '/doctors/specialty/generalpractitioner',
      'thyroid': '/doctors/specialty/womenshealth',
    };
    const route = screenMap[speciality.id] || '/doctors/specialty/generalpractitioner';
    router.push(route);
  }, [router]);

  return (
    <View style={styles.container}>
      <StickyHeader backgroundColor={DoctorsTheme.colors.headerLavender} />

      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <SearchBarAnimated borderColor={DoctorsTheme.colors.teal} />
        <OnTimeGuaranteeBanner />
        <ServicesRow />
        <FamilyCareBanner />
        <InstantDoctorBanner />
        <SpecialityGrid 
          data={SPECIALITIES} 
          title="Find Doctor by Speciality" 
          showViewAll 
          columns={4} 
          onItemPress={handleSpecialityPress}
        />
        <HeroBanner />
        <SpotlightBanner />
        <AskApolloWidget />
        <PhysioBanner />
        <SearchDoctorsBy />
        <TestsCarousel />
        <InsurancePromoBanner />
        <ExploreOfferings />
        <LifestyleGrid />
        
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        {/* PAGE 2: EXTENDED SPECIALTIES & CITIES */}
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        <ExtendedSpecialtiesGrid />
        <CitiesSection />
        <HospitalNetworks />
        
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        {/* PAGE 3: HEALTH CONDITIONS & SYMPTOMS */}
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        <SymptomsSection />
        <HealthConditionsSection />
        
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        {/* PAGE 4: SERVICES, PACKAGES, REVIEWS & FAQ */}
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        <OnlineServicesSection />
        <HealthPackagesSection />
        <AdditionalServicesSection />
        <DoctorReviewsSection />
        <FAQSection />
        <AppDownloadSection />
        
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        {/* ADDITIONAL PAGE 5: DOCTOR CONSULTATION PROCESS & MORE */}
        {/* ───────────────────────────────────────────────────────────────────────────── */}
        <ConsultationProcessSection />
        <ConditionSpecialistsSection />
        <AvailabilitySection />
        <VideoFeaturesSection />
        <InsurancePartnersSection />
        <CorporateSection />
        <EmergencySection />
        <HealthTipsSection />
        <ExtraFAQSection />
        <TrustBadgesSection />
        
        <View style={{ height: 40 }} />
      </ScrollView>

      <FloatingAskApollo />
      <GoToTopButton visible={showGoToTop} onPress={scrollToTop} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.white,
  },
  scrollView: {
    flex: 1,
  },
});
