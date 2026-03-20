import React, { memo, useRef, useState, useCallback } from 'react';
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
import { DoctorsTheme } from '../../components/doctors/DoctorsTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Header Component
const GeneralPractitionerHeader = memo(() => {
  const router = useRouter();
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.gradient}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={headerStyles.backButton}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={DoctorsTheme.colors.white} />
        </TouchableOpacity>
        <View style={headerStyles.titleContainer}>
          <Text style={headerStyles.emoji}>👨‍⚕️</Text>
          <Text style={headerStyles.title}>General Practitioner</Text>
          <Text style={headerStyles.subtitle}>Primary Care & Family Doctors</Text>
        </View>
      </View>
      <View style={headerStyles.statsRow}>
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>1000+</Text>
          <Text style={headerStyles.statLabel}>Expert Doctors</Text>
        </View>
        <View style={headerStyles.statDivider} />
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>24/7</Text>
          <Text style={headerStyles.statLabel}>Available</Text>
        </View>
        <View style={headerStyles.statDivider} />
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>4.8</Text>
          <Text style={headerStyles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
});
GeneralPractitionerHeader.displayName = 'GeneralPractitionerHeader';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: DoctorsTheme.colors.teal,
  },
  gradient: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: DoctorsTheme.colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: DoctorsTheme.colors.white,
    paddingVertical: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: DoctorsTheme.colors.teal,
  },
  statLabel: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: DoctorsTheme.colors.border,
  },
});

// Quick Consult Banner
const QuickConsultBanner = memo(() => (
  <View style={bannerStyles.container}>
    <View style={bannerStyles.content}>
      <Text style={bannerStyles.emoji}>🚑</Text>
      <View style={bannerStyles.textContent}>
        <Text style={bannerStyles.title}>Instant Video Consult</Text>
        <Text style={bannerStyles.subtitle}>Connect with a doctor in under 10 minutes</Text>
      </View>
    </View>
    <TouchableOpacity style={bannerStyles.button}>
      <Text style={bannerStyles.buttonText}>Start Now</Text>
    </TouchableOpacity>
  </View>
));
QuickConsultBanner.displayName = 'QuickConsultBanner';

const bannerStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    padding: 16,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 40,
    marginRight: 12,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
  },
  button: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: DoctorsTheme.colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});

// Common Symptoms Section
const SYMPTOMS_DATA = [
  { id: '1', name: 'Fever', icon: '🌡️', count: '10k+ cases' },
  { id: '2', name: 'Cold & Cough', icon: '🤧', count: '8k+ cases' },
  { id: '3', name: 'Headache', icon: '😫', count: '6k+ cases' },
  { id: '4', name: 'Stomach Pain', icon: '🤕', count: '5k+ cases' },
  { id: '5', name: 'Fatigue', icon: '😴', count: '4k+ cases' },
  { id: '6', name: 'Allergies', icon: '🤧', count: '3k+ cases' },
  { id: '7', name: 'Body Aches', icon: '💪', count: '3k+ cases' },
  { id: '8', name: 'Skin Rash', icon: '🔴', count: '2k+ cases' },
];

const SymptomsSection = memo(() => (
  <View style={symptomStyles.container}>
    <View style={symptomStyles.header}>
      <Text style={symptomStyles.title}>Common Symptoms</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={symptomStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <View style={symptomStyles.grid}>
      {SYMPTOMS_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={symptomStyles.item} accessibilityRole="button">
          <View style={symptomStyles.iconWrap}>
            <Text style={symptomStyles.icon}>{item.icon}</Text>
          </View>
          <Text style={symptomStyles.name}>{item.name}</Text>
          <Text style={symptomStyles.count}>{item.count}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
SymptomsSection.displayName = 'SymptomsSection';

const symptomStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.teal,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '23%',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: DoctorsTheme.colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  icon: {
    fontSize: 24,
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
  count: {
    fontSize: 10,
    color: DoctorsTheme.colors.textTertiary,
    marginTop: 2,
  },
});

// Health Packages Section
const PACKAGES_DATA = [
  {
    id: '1',
    name: 'Full Body Checkup',
    tests: '58 Tests',
    includes: 'Blood, Sugar, Thyroid, Liver, Kidney',
    price: '₹2999',
    originalPrice: '₹5999',
    discount: '50% OFF',
  },
  {
    id: '2',
    name: 'Diabetes Screening',
    tests: '12 Tests',
    includes: 'Fasting Sugar, HbA1c, Insulin',
    price: '₹799',
    originalPrice: '₹1599',
    discount: '50% OFF',
  },
  {
    id: '3',
    name: 'Heart Health Package',
    tests: '18 Tests',
    includes: 'ECG, Lipid Profile, BP Check',
    price: '₹1299',
    originalPrice: '₹2599',
    discount: '50% OFF',
  },
];

const PackagesSection = memo(() => (
  <View style={pkgStyles.container}>
    <View style={pkgStyles.header}>
      <Text style={pkgStyles.title}>Health Packages</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={pkgStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
      {PACKAGES_DATA.map((pkg) => (
        <TouchableOpacity key={pkg.id} style={pkgStyles.card} accessibilityRole="button">
          <View style={pkgStyles.discountBadge}>
            <Text style={pkgStyles.discountText}>{pkg.discount}</Text>
          </View>
          <Text style={pkgStyles.name}>{pkg.name}</Text>
          <Text style={pkgStyles.tests}>{pkg.tests}</Text>
          <Text style={pkgStyles.includes} numberOfLines={2}>{pkg.includes}</Text>
          <View style={pkgStyles.priceRow}>
            <Text style={pkgStyles.price}>{pkg.price}</Text>
            <Text style={pkgStyles.originalPrice}>{pkg.originalPrice}</Text>
          </View>
          <TouchableOpacity style={pkgStyles.bookBtn}>
            <Text style={pkgStyles.bookBtnText}>Book Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
PackagesSection.displayName = 'PackagesSection';

const pkgStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.teal,
  },
  card: {
    width: 220,
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  discountBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  discountText: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  tests: {
    fontSize: 13,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
    marginBottom: 4,
  },
  includes: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: DoctorsTheme.colors.apolloOrange,
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 13,
    color: DoctorsTheme.colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  bookBtn: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  bookBtnText: {
    color: DoctorsTheme.colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

// Top Doctors Section
const DOCTORS_DATA = [
  {
    id: '1',
    name: 'Dr. Suresh Kumar',
    degree: 'MBBS, MD',
    hospital: 'Apollo Clinic, Delhi',
    experience: '20 years',
    rating: 4.9,
    reviews: 4521,
    nextAvailable: 'Available Now',
    fee: 500,
    languages: ['English', 'Hindi'],
    image: '👨‍⚕️',
  },
  {
    id: '2',
    name: 'Dr. Meera Singh',
    degree: 'MBBS, DNB',
    hospital: 'Apollo Chennai',
    experience: '15 years',
    rating: 4.8,
    reviews: 3156,
    nextAvailable: 'Today',
    fee: 400,
    languages: ['English', 'Tamil', 'Hindi'],
    image: '👩‍⚕️',
  },
];

const DoctorsSection = memo(() => (
  <View style={docStyles.container}>
    <View style={docStyles.header}>
      <Text style={docStyles.title}>Top General Physicians</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={docStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    {DOCTORS_DATA.map((doctor) => (
      <TouchableOpacity key={doctor.id} style={docStyles.card} accessibilityRole="button">
        <View style={docStyles.cardHeader}>
          <View style={docStyles.avatarContainer}>
            <Text style={docStyles.avatar}>{doctor.image}</Text>
            <View style={docStyles.onlineBadge} />
          </View>
          <View style={docStyles.doctorInfo}>
            <Text style={docStyles.doctorName}>{doctor.name}</Text>
            <Text style={docStyles.doctorDegree}>{doctor.degree}</Text>
            <Text style={docStyles.hospital}>{doctor.hospital}</Text>
          </View>
        </View>
        <View style={docStyles.cardBody}>
          <View style={docStyles.badgeRow}>
            <View style={docStyles.ratingBadge}>
              <Ionicons name="star" size={12} color={DoctorsTheme.colors.gold} />
              <Text style={docStyles.rating}>{doctor.rating}</Text>
              <Text style={docStyles.reviews}>({doctor.reviews}+)</Text>
            </View>
            <Text style={docStyles.exp}>{doctor.experience}</Text>
          </View>
          <Text style={docStyles.languages}>{doctor.languages.join(' • ')}</Text>
        </View>
        <View style={docStyles.cardFooter}>
          <View style={docStyles.priceInfo}>
            <Text style={docStyles.fee}>₹{doctor.fee}</Text>
            <Text style={docStyles.availability}>{doctor.nextAvailable}</Text>
          </View>
          <TouchableOpacity style={docStyles.bookBtn}>
            <Text style={docStyles.bookBtnText}>Book</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ))}
  </View>
));
DoctorsSection.displayName = 'DoctorsSection';

const docStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.teal,
  },
  card: {
    marginHorizontal: 16,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level1,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    fontSize: 56,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: DoctorsTheme.colors.greenBadge,
    borderWidth: 2,
    borderColor: DoctorsTheme.colors.white,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  doctorName: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 2,
  },
  doctorDegree: {
    fontSize: 13,
    color: DoctorsTheme.colors.teal,
    fontWeight: '600',
    marginBottom: 2,
  },
  hospital: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
  },
  cardBody: {
    borderTopWidth: 1,
    borderTopColor: DoctorsTheme.colors.border,
    paddingTop: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginLeft: 4,
  },
  reviews: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
  },
  exp: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
  },
  languages: {
    fontSize: 12,
    color: DoctorsTheme.colors.textTertiary,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: DoctorsTheme.colors.border,
  },
  priceInfo: {
    flex: 1,
  },
  fee: {
    fontSize: 18,
    fontWeight: '800',
    color: DoctorsTheme.colors.textPrimary,
  },
  availability: {
    fontSize: 12,
    color: DoctorsTheme.colors.greenBadge,
    marginTop: 2,
  },
  bookBtn: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  bookBtnText: {
    color: DoctorsTheme.colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

// Services Section
const SERVICES_DATA = [
  { id: '1', name: 'Online Consultation', icon: '💻', available: '24/7' },
  { id: '2', name: 'Home Visit', icon: '🏠', available: 'Available' },
  { id: '3', name: 'Lab Tests', icon: '🩸', available: 'At Home' },
  { id: '4', name: 'Medicines', icon: '💊', available: 'Delivery' },
];

const ServicesSection = memo(() => (
  <View style={svcStyles.container}>
    <Text style={svcStyles.title}>Services We Offer</Text>
    <View style={svcStyles.grid}>
      {SERVICES_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={svcStyles.card} accessibilityRole="button">
          <Text style={svcStyles.icon}>{item.icon}</Text>
          <Text style={svcStyles.name}>{item.name}</Text>
          <Text style={svcStyles.available}>{item.available}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
ServicesSection.displayName = 'ServicesSection';

const svcStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
    marginTop: 8,
  },
  title: {
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
    width: '48%',
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  available: {
    fontSize: 11,
    color: DoctorsTheme.colors.teal,
    fontWeight: '500',
  },
});

// Why Choose Section
const WHY_DATA = [
  { id: '1', icon: '⏱️', title: 'Quick Consultation', desc: 'Connect in under 10 mins' },
  { id: '2', icon: '💊', title: 'Free Medicines', desc: 'Up to ₹500 worth' },
  { id: '3', icon: '📋', title: 'Medical Records', desc: 'Digital prescriptions' },
  { id: '4', icon: '🔒', title: 'Privacy First', desc: '100% confidential' },
];

const WhyChooseSection = memo(() => (
  <View style={whyStyles.container}>
    <Text style={whyStyles.title}>Why Choose Apollo GP?</Text>
    <View style={whyStyles.grid}>
      {WHY_DATA.map((item) => (
        <View key={item.id} style={whyStyles.card}>
          <Text style={whyStyles.icon}>{item.icon}</Text>
          <Text style={whyStyles.cardTitle}>{item.title}</Text>
          <Text style={whyStyles.desc}>{item.desc}</Text>
        </View>
      ))}
    </View>
  </View>
));
WhyChooseSection.displayName = 'WhyChooseSection';

const whyStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
    marginTop: 8,
  },
  title: {
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
    width: '48%',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  desc: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    textAlign: 'center',
  },
});

// Reviews Section
const ReviewsSection = memo(() => (
  <View style={revStyles.container}>
    <View style={revStyles.header}>
      <Text style={revStyles.title}>Patient Reviews</Text>
      <View style={revStyles.ratingBadge}>
        <Text style={revStyles.ratingText}>4.8 ★</Text>
      </View>
    </View>
    <View style={revStyles.reviewCard}>
      <View style={revStyles.reviewHeader}>
        <View style={revStyles.avatar}>
          <Text style={revStyles.avatarText}>R</Text>
        </View>
        <View>
          <Text style={revStyles.reviewerName}>Rahul Sharma</Text>
          <Text style={revStyles.reviewDate}>Yesterday</Text>
        </View>
      </View>
      <Text style={revStyles.reviewText}>
        Excellent experience! The doctor was very patient and listened to all my concerns.
        Got my prescription within 15 minutes. Highly recommend!
      </Text>
      <Text style={revStyles.helpful}>👍 32 found this helpful</Text>
    </View>
  </View>
));
ReviewsSection.displayName = 'ReviewsSection';

const revStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
  },
  ratingBadge: {
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
  },
  reviewCard: {
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DoctorsTheme.colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.white,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
  },
  reviewDate: {
    fontSize: 11,
    color: DoctorsTheme.colors.textTertiary,
  },
  reviewText: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  helpful: {
    fontSize: 12,
    color: DoctorsTheme.colors.textTertiary,
  },
});

// FAQ Section
const FAQ_DATA = [
  { id: '1', q: 'What can a general physician treat?', a: 'General physicians treat common illnesses like fever, cold, cough, infections, digestive issues, and provide preventive care.' },
  { id: '2', q: 'Is online consultation effective?', a: 'Yes, for most common conditions, online consultations are effective. Our doctors can diagnose and prescribe medicines online.' },
  { id: '3', q: 'How long does a consultation take?', a: 'A typical online consultation takes 10-15 minutes. For complex cases, doctors may take more time.' },
];

const FAQSection = memo(() => {
  const [expandedId, setExpandedId] = useState(null);
  return (
    <View style={faqStyles.container}>
      <Text style={faqStyles.title}>Frequently Asked Questions</Text>
      {FAQ_DATA.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={faqStyles.item}
          onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
        >
          <View style={faqStyles.qRow}>
            <Text style={faqStyles.question}>{item.q}</Text>
            <Ionicons name={expandedId === item.id ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
          </View>
          {expandedId === item.id && <Text style={faqStyles.answer}>{item.a}</Text>}
        </TouchableOpacity>
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
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 16,
  },
  item: {
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  qRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    marginRight: 10,
  },
  answer: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 20,
    marginTop: 10,
  },
});

// CTA Section
const CTASection = memo(() => (
  <View style={ctaStyles.container}>
    <Text style={ctaStyles.emoji}>👨‍⚕️</Text>
    <Text style={ctaStyles.title}>Your Family's Health, Our Priority</Text>
    <Text style={ctaStyles.subtitle}>Get expert primary care for you and your family</Text>
    <TouchableOpacity style={ctaStyles.button}>
      <Text style={ctaStyles.buttonText}>Start Free Consultation</Text>
    </TouchableOpacity>
  </View>
));
CTASection.displayName = 'CTASection';

const ctaStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: DoctorsTheme.colors.white,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    width: '100%',
  },
  buttonText: {
    color: DoctorsTheme.colors.teal,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

// Main Screen
export default function GeneralPractitionerScreen() {
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
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <GeneralPractitionerHeader />
        <QuickConsultBanner />
        <SymptomsSection />
        <PackagesSection />
        <DoctorsSection />
        <ServicesSection />
        <WhyChooseSection />
        <ReviewsSection />
        <FAQSection />
        <CTASection />
        <View style={{ height: 100 }} />
      </ScrollView>

      {showGoToTop && (
        <TouchableOpacity style={goToTopStyles.button} onPress={scrollToTop}>
          <Ionicons name="arrow-up" size={20} color={DoctorsTheme.colors.white} />
        </TouchableOpacity>
      )}

      <View style={floatingStyles.container}>
        <TouchableOpacity style={floatingStyles.ctaButton}>
          <Ionicons name="videocam" size={22} color={DoctorsTheme.colors.white} />
          <Text style={floatingStyles.ctaText}>Start Free Consult</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.cardBg,
  },
  scrollView: {
    flex: 1,
  },
});

const goToTopStyles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    justifyContent: 'center',
    alignItems: 'center',
    ...DoctorsTheme.shadow.level2,
  },
});

const floatingStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: DoctorsTheme.colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: DoctorsTheme.colors.border,
  },
  ctaButton: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  ctaText: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.white,
  },
});
