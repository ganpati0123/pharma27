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
const WomensHealthHeader = memo(() => {
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
          <Text style={headerStyles.emoji}>🤰</Text>
          <Text style={headerStyles.title}>Women's Health</Text>
          <Text style={headerStyles.subtitle}>Expert Care for Every Stage</Text>
        </View>
      </View>
      <View style={headerStyles.statsRow}>
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>500+</Text>
          <Text style={headerStyles.statLabel}>Expert Doctors</Text>
        </View>
        <View style={headerStyles.statDivider} />
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>15+</Text>
          <Text style={headerStyles.statLabel}>Years Experience</Text>
        </View>
        <View style={headerStyles.statDivider} />
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>4.9</Text>
          <Text style={headerStyles.statLabel}>Rating</Text>
        </View>
      </View>
    </View>
  );
});
WomensHealthHeader.displayName = 'WomensHealthHeader';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#E91E63',
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
    color: '#E91E63',
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

// Life Stage Section
const STAGES_DATA = [
  { id: '1', name: 'Adolescent\nCare', icon: '👧', color: '#FCE4EC' },
  { id: '2', name: 'Prenatal\nCare', icon: '🤰', color: '#F8BBD9' },
  { id: '3', name: 'Postnatal\nCare', icon: '👶', color: '#F3E5F5' },
  { id: '4', name: 'Menopause\nCare', icon: '🌸', color: '#E1F5FE' },
];

const LifeStageSection = memo(() => (
  <View style={stageStyles.container}>
    <Text style={stageStyles.title}>Care by Life Stage</Text>
    <View style={stageStyles.grid}>
      {STAGES_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={[stageStyles.card, { backgroundColor: item.color }]} accessibilityRole="button">
          <Text style={stageStyles.icon}>{item.icon}</Text>
          <Text style={stageStyles.name}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
LifeStageSection.displayName = 'LifeStageSection';

const stageStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
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
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: {
    fontSize: 40,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
});

// Common Conditions Section
const CONDITIONS_DATA = [
  { id: '1', name: 'PCOS/PCOD', icon: '🔄', count: '5k+ consults' },
  { id: '2', name: 'Irregular Periods', icon: '📅', count: '4k+ consults' },
  { id: '3', name: 'Pregnancy', icon: '🤰', count: '10k+ consults' },
  { id: '4', name: 'Fertility Issues', icon: '💝', count: '3k+ consults' },
  { id: '5', name: 'Menopause', icon: '🌸', count: '2k+ consults' },
  { id: '6', name: 'Thyroid', icon: '🦋', count: '3k+ consults' },
];

const ConditionsSection = memo(() => (
  <View style={condStyles.container}>
    <View style={condStyles.header}>
      <Text style={condStyles.title}>Common Conditions</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={condStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <View style={condStyles.grid}>
      {CONDITIONS_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={condStyles.item} accessibilityRole="button">
          <Text style={condStyles.icon}>{item.icon}</Text>
          <Text style={condStyles.name}>{item.name}</Text>
          <Text style={condStyles.count}>{item.count}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
ConditionsSection.displayName = 'ConditionsSection';

const condStyles = StyleSheet.create({
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
    color: '#E91E63',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '31%',
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  icon: {
    fontSize: 28,
    marginBottom: 6,
  },
  name: {
    fontSize: 11,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  count: {
    fontSize: 10,
    color: DoctorsTheme.colors.textTertiary,
  },
});

// Packages Section
const PACKAGES_DATA = [
  {
    id: '1',
    name: 'Women's Wellness Package',
    tests: '28 Tests',
    price: '₹1999',
    originalPrice: '₹3999',
    badge: 'POPULAR',
  },
  {
    id: '2',
    name: 'PCOD/PCOS Screening',
    tests: '15 Tests',
    price: '₹1299',
    originalPrice: '₹2599',
    badge: null,
  },
  {
    id: '3',
    name: 'Pregnancy Care Panel',
    tests: '35 Tests',
    price: '₹4999',
    originalPrice: '₹9999',
    badge: 'COMPLETE',
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
          {pkg.badge && (
            <View style={pkgStyles.badge}>
              <Text style={pkgStyles.badgeText}>{pkg.badge}</Text>
            </View>
          )}
          <Text style={pkgStyles.name}>{pkg.name}</Text>
          <Text style={pkgStyles.tests}>{pkg.tests}</Text>
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
    color: '#E91E63',
  },
  card: {
    width: 200,
    backgroundColor: '#FCE4EC',
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#F8BBD9',
  },
  badge: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  badgeText: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  tests: {
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
    color: '#E91E63',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 13,
    color: DoctorsTheme.colors.textTertiary,
    textDecorationLine: 'line-through',
  },
  bookBtn: {
    backgroundColor: '#E91E63',
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

// Doctors Section
const DOCTORS_DATA = [
  {
    id: '1',
    name: 'Dr. Lakshmi Devi',
    degree: 'MD, DGO',
    hospital: 'Apollo Chennai',
    experience: '25 years',
    rating: 4.9,
    reviews: 4521,
    nextAvailable: 'Today',
    fee: 800,
    image: '👩‍⚕️',
  },
  {
    id: '2',
    name: 'Dr. Sunita Rao',
    degree: 'MD, DNB, FRCOG',
    hospital: 'Apollo Hyderabad',
    experience: '20 years',
    rating: 4.8,
    reviews: 3245,
    nextAvailable: 'Tomorrow',
    fee: 1000,
    image: '👩‍⚕️',
  },
];

const DoctorsSection = memo(() => (
  <View style={docStyles.container}>
    <View style={docStyles.header}>
      <Text style={docStyles.title}>Top Gynecologists</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={docStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    {DOCTORS_DATA.map((doctor) => (
      <TouchableOpacity key={doctor.id} style={docStyles.card} accessibilityRole="button">
        <View style={docStyles.cardHeader}>
          <View style={docStyles.avatarContainer}>
            <Text style={docStyles.avatar}>{doctor.image}</Text>
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
        </View>
        <View style={docStyles.cardFooter}>
          <View style={docStyles.priceInfo}>
            <Text style={docStyles.fee}>₹{doctor.fee}</Text>
            <Text style={docStyles.availability}>• {doctor.nextAvailable}</Text>
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
    color: '#E91E63',
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
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    fontSize: 40,
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
    color: '#E91E63',
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
    backgroundColor: '#E91E63',
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
  { id: '1', name: 'Normal Delivery', icon: '👶', desc: 'Natural birth care' },
  { id: '2', name: 'C-Section', icon: '🏥', desc: 'Surgical delivery' },
  { id: '3', name: 'Laparoscopy', icon: '🔬', desc: 'Minimally invasive' },
  { id: '4', name: 'IVF', icon: '🧬', desc: 'Fertility treatment' },
];

const ServicesSection = memo(() => (
  <View style={svcStyles.container}>
    <Text style={svcStyles.title}>Services We Offer</Text>
    <View style={svcStyles.grid}>
      {SERVICES_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={svcStyles.card} accessibilityRole="button">
          <Text style={svcStyles.icon}>{item.icon}</Text>
          <Text style={svcStyles.name}>{item.name}</Text>
          <Text style={svcStyles.desc}>{item.desc}</Text>
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
    backgroundColor: '#FCE4EC',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  desc: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
  },
});

// Tips Section
const TIPS_DATA = [
  { id: '1', title: 'Prenatal Vitamins', desc: 'Essential supplements during pregnancy', icon: '💊' },
  { id: '2', title: 'Healthy Diet', desc: 'Nutrition tips for expecting mothers', icon: '🥗' },
  { id: '3', title: 'Exercise Guide', desc: 'Safe workouts during pregnancy', icon: '🧘' },
];

const TipsSection = memo(() => (
  <View style={tipsStyles.container}>
    <Text style={tipsStyles.title}>Pregnancy Tips</Text>
    {TIPS_DATA.map((tip) => (
      <TouchableOpacity key={tip.id} style={tipsStyles.card} accessibilityRole="button">
        <Text style={tipsStyles.icon}>{tip.icon}</Text>
        <View style={tipsStyles.content}>
          <Text style={tipsStyles.tipTitle}>{tip.title}</Text>
          <Text style={tipsStyles.tipDesc}>{tip.desc}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#E91E63" />
      </TouchableOpacity>
    ))}
  </View>
));
TipsSection.displayName = 'TipsSection';

const tipsStyles = StyleSheet.create({
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  icon: {
    fontSize: 32,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
  },
  tipDesc: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
  },
});

// Reviews Section
const ReviewsSection = memo(() => (
  <View style={revStyles.container}>
    <View style={revStyles.header}>
      <Text style={revStyles.title}>Patient Reviews</Text>
      <View style={revStyles.ratingBadge}>
        <Text style={revStyles.ratingText}>4.9 ★</Text>
      </View>
    </View>
    <View style={revStyles.reviewCard}>
      <View style={revStyles.reviewHeader}>
        <View style={revStyles.avatar}>
          <Text style={revStyles.avatarText}>P</Text>
        </View>
        <View>
          <Text style={revStyles.reviewerName}>Priya Menon</Text>
          <Text style={revStyles.reviewDate}>1 week ago</Text>
        </View>
      </View>
      <Text style={revStyles.reviewText}>
        Dr. Lakshmi Devi was amazing throughout my pregnancy journey. Her expertise and
        care made me feel confident and safe. Highly recommend!
      </Text>
      <Text style={revStyles.helpful}>👍 56 found this helpful</Text>
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
    color: '#E91E63',
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
    backgroundColor: '#E91E63',
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

// CTA Section
const CTASection = memo(() => (
  <View style={ctaStyles.container}>
    <Text style={ctaStyles.emoji}>🤰</Text>
    <Text style={ctaStyles.title}>Pregnant? Start Your Journey</Text>
    <Text style={ctaStyles.subtitle}>Get expert prenatal care from day one</Text>
    <TouchableOpacity style={ctaStyles.button}>
      <Text style={ctaStyles.buttonText}>Book First Consultation</Text>
    </TouchableOpacity>
  </View>
));
CTASection.displayName = 'CTASection';

const ctaStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#FCE4EC',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F8BBD9',
  },
  emoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: DoctorsTheme.colors.textSecondary,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#E91E63',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
    width: '100%',
  },
  buttonText: {
    color: DoctorsTheme.colors.white,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});

// Main Screen
export default function WomensHealthScreen() {
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
        <WomensHealthHeader />
        <LifeStageSection />
        <ConditionsSection />
        <PackagesSection />
        <DoctorsSection />
        <ServicesSection />
        <TipsSection />
        <ReviewsSection />
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
          <Text style={floatingStyles.ctaText}>Consult Now</Text>
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
    backgroundColor: '#E91E63',
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
    backgroundColor: '#E91E63',
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
