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

// Main Doctors Index Screen
export default function DoctorsIndex() {
  const scrollRef = useRef(null);
  const [showGoToTop, setShowGoToTop] = useState(false);

  const handleScroll = useCallback((event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowGoToTop(offsetY > 500);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

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
        <SpecialityGrid data={SPECIALITIES} title="Find Doctor by Speciality" showViewAll columns={4} />
        <HeroBanner />
        <SpotlightBanner />
        <AskApolloWidget />
        <PhysioBanner />
        <SearchDoctorsBy />
        <TestsCarousel />
        <InsurancePromoBanner />
        <ExploreOfferings />
        <LifestyleGrid />
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
