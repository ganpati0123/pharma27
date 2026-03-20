import React, { memo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DoctorsTheme } from '../../components/doctors/DoctorsTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Header Component
const DermatologyHeader = memo(() => {
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
          <Text style={headerStyles.emoji}>🔬</Text>
          <Text style={headerStyles.title}>Dermatology</Text>
          <Text style={headerStyles.subtitle}>Skin, Hair & Beauty Experts</Text>
        </View>
      </View>
      <View style={headerStyles.statsRow}>
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>400+</Text>
          <Text style={headerStyles.statLabel}>Expert Doctors</Text>
        </View>
        <View style={headerStyles.statDivider} />
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>12+</Text>
          <Text style={headerStyles.statLabel}>Years Experience</Text>
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
DermatologyHeader.displayName = 'DermatologyHeader';

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
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
    fontSize: 28,
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
    color: DoctorsTheme.colors.apolloOrange,
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

// Search Section
const SearchSection = memo(() => (
  <View style={searchStyles.container}>
    <View style={searchStyles.searchBox}>
      <Ionicons name="search" size={20} color={DoctorsTheme.colors.textTertiary} />
      <TextInput
        style={searchStyles.input}
        placeholder="Search dermatologists, skin conditions..."
        placeholderTextColor={DoctorsTheme.colors.textTertiary}
      />
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={searchStyles.filterScroll}>
      {['All', 'Acne', 'Hair Fall', 'Skin Lightening', 'Anti-Aging'].map((filter, index) => (
        <TouchableOpacity
          key={filter}
          style={[searchStyles.filterChip, index === 0 && searchStyles.filterChipActive]}
          accessibilityRole="button"
        >
          <Text style={[searchStyles.filterText, index === 0 && searchStyles.filterTextActive]}>
            {filter}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
SearchSection.displayName = 'SearchSection';

const searchStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: DoctorsTheme.colors.white,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 15,
    color: DoctorsTheme.colors.textPrimary,
  },
  filterScroll: {
    marginTop: 12,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: DoctorsTheme.colors.cardBg,
    marginRight: 8,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  filterChipActive: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderColor: DoctorsTheme.colors.apolloOrange,
  },
  filterText: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: DoctorsTheme.colors.white,
  },
});

// Featured Treatments
const TREATMENTS_DATA = [
  { id: '1', name: 'Acne Treatment', icon: '😣', desc: 'Get rid of pimples & scars', price: 'From ₹500' },
  { id: '2', name: 'Hair Fall Control', icon: '💇', desc: 'Stop hair loss & regrow', price: 'From ₹800' },
  { id: '3', name: 'Skin Whitening', icon: '✨', desc: 'Brighten & glow your skin', price: 'From ₹2000' },
  { id: '4', name: 'Anti-Aging', icon: '🧴', desc: 'Reduce wrinkles & fine lines', price: 'From ₹1500' },
  { id: '5', name: 'Laser Hair Removal', icon: '🔦', desc: 'Permanent hair reduction', price: 'From ₹5000' },
  { id: '6', name: 'Pigmentation', icon: '🎨', desc: 'Remove dark spots & marks', price: 'From ₹1200' },
];

const TreatmentsSection = memo(() => (
  <View style={treatStyles.container}>
    <View style={treatStyles.header}>
      <Text style={treatStyles.title}>Popular Treatments</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={treatStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <View style={treatStyles.grid}>
      {TREATMENTS_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={treatStyles.card} accessibilityRole="button">
          <Text style={treatStyles.icon}>{item.icon}</Text>
          <Text style={treatStyles.name}>{item.name}</Text>
          <Text style={treatStyles.desc}>{item.desc}</Text>
          <Text style={treatStyles.price}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
TreatmentsSection.displayName = 'TreatmentsSection';

const treatStyles = StyleSheet.create({
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
    color: DoctorsTheme.colors.apolloOrange,
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
    padding: 14,
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
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 4,
    textAlign: 'center',
  },
  desc: {
    fontSize: 11,
    color: DoctorsTheme.colors.textSecondary,
    marginBottom: 8,
    textAlign: 'center',
  },
  price: {
    fontSize: 13,
    fontWeight: '600',
    color: DoctorsTheme.colors.apolloOrange,
  },
});

// Doctors List
const DERMATOLOGISTS_DATA = [
  {
    id: '1',
    name: 'Dr. Anjali Reddy',
    degree: 'MD, DDVL Dermatology',
    hospital: 'Apollo Hospitals, Hyderabad',
    experience: '15 years',
    rating: 4.9,
    reviews: 3245,
    nextAvailable: 'Today',
    fee: 800,
    image: '👩‍⚕️',
    specializations: ['Acne', 'Skin Lightening'],
  },
  {
    id: '2',
    name: 'Dr. Vikas Malhotra',
    degree: 'DNB, MD Dermatology',
    hospital: 'Apollo Mumbai',
    experience: '12 years',
    rating: 4.8,
    reviews: 2156,
    nextAvailable: 'Tomorrow',
    fee: 1000,
    image: '👨‍⚕️',
    specializations: ['Hair Fall', 'Laser Treatment'],
  },
];

const DoctorsSection = memo(() => (
  <View style={docStyles.container}>
    <View style={docStyles.header}>
      <Text style={docStyles.title}>Top Dermatologists</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={docStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    {DERMATOLOGISTS_DATA.map((doctor) => (
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
          <View style={docStyles.specRow}>
            {doctor.specializations.map((spec, idx) => (
              <View key={idx} style={docStyles.specBadge}>
                <Text style={docStyles.specText}>{spec}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={docStyles.cardFooter}>
          <View style={docStyles.priceRow}>
            <Text style={docStyles.fee}>₹{doctor.fee}</Text>
            <Text style={docStyles.availability}>• {doctor.nextAvailable}</Text>
          </View>
          <TouchableOpacity style={docStyles.bookBtn}>
            <Text style={docStyles.bookBtnText}>Book Now</Text>
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
    color: DoctorsTheme.colors.apolloOrange,
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
    backgroundColor: DoctorsTheme.colors.cardBg,
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
    color: DoctorsTheme.colors.apolloOrange,
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
    marginBottom: 8,
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
  specRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specText: {
    fontSize: 11,
    color: DoctorsTheme.colors.teal,
    fontWeight: '500',
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
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fee: {
    fontSize: 18,
    fontWeight: '800',
    color: DoctorsTheme.colors.textPrimary,
  },
  availability: {
    fontSize: 12,
    color: DoctorsTheme.colors.greenBadge,
    marginLeft: 6,
  },
  bookBtn: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  bookBtnText: {
    color: DoctorsTheme.colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
});

// Before After Section
const BeforeAfterSection = memo(() => (
  <View style={baStyles.container}>
    <Text style={baStyles.title}>Before & After Results</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
      {[
        { id: '1', before: '😔', after: '😊', treatment: 'Acne Treatment' },
        { id: '2', before: '😟', after: '😄', treatment: 'Skin Lightening' },
        { id: '3', before: '😔', after: '🤩', treatment: 'Hair Fall Control' },
      ].map((item) => (
        <View key={item.id} style={baStyles.card}>
          <View style={baStyles.imagesRow}>
            <View style={baStyles.imageBox}>
              <Text style={baStyles.imageEmoji}>📷</Text>
              <Text style={baStyles.imageLabel}>Before</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={DoctorsTheme.colors.apolloOrange} />
            <View style={baStyles.imageBox}>
              <Text style={baStyles.imageEmoji}>📷</Text>
              <Text style={baStyles.imageLabel}>After</Text>
            </View>
          </View>
          <Text style={baStyles.treatment}>{item.treatment}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
));
BeforeAfterSection.displayName = 'BeforeAfterSection';

const baStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: DoctorsTheme.colors.white,
    marginTop: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  card: {
    width: 200,
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  imagesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  imageBox: {
    alignItems: 'center',
  },
  imageEmoji: {
    fontSize: 40,
    marginBottom: 4,
  },
  imageLabel: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    fontWeight: '500',
  },
  treatment: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
  },
});

// Products Section
const PRODUCTS_DATA = [
  { id: '1', name: 'Acne Face Wash', brand: 'Acnestar', price: '₹249', rating: 4.5 },
  { id: '2', name: 'Hair Growth Oil', brand: 'Scalpe Plus', price: '₹399', rating: 4.7 },
  { id: '3', name: 'Sunscreen SPF 50', brand: 'Lotus', price: '₹599', rating: 4.6 },
  { id: '4', name: 'Moisturizer', brand: 'Cetaphil', price: '₹549', rating: 4.8 },
];

const ProductsSection = memo(() => (
  <View style={prodStyles.container}>
    <View style={prodStyles.header}>
      <Text style={prodStyles.title}>Recommended Products</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={prodStyles.viewAll}>Shop Now</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
      {PRODUCTS_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={prodStyles.card} accessibilityRole="button">
          <View style={prodStyles.productImage}>
            <Text style={prodStyles.productEmoji}>🧴</Text>
          </View>
          <Text style={prodStyles.productName} numberOfLines={2}>{item.name}</Text>
          <Text style={prodStyles.brand}>{item.brand}</Text>
          <View style={prodStyles.priceRow}>
            <Text style={prodStyles.price}>{item.price}</Text>
            <View style={prodStyles.ratingBadge}>
              <Ionicons name="star" size={10} color={DoctorsTheme.colors.gold} />
              <Text style={prodStyles.rating}>{item.rating}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
ProductsSection.displayName = 'ProductsSection';

const prodStyles = StyleSheet.create({
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
    color: DoctorsTheme.colors.apolloOrange,
  },
  card: {
    width: 140,
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  productImage: {
    height: 80,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productEmoji: {
    fontSize: 40,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 2,
  },
  brand: {
    fontSize: 11,
    color: DoctorsTheme.colors.textTertiary,
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.apolloOrange,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.white,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  rating: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 2,
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
          <Text style={revStyles.avatarText}>S</Text>
        </View>
        <View>
          <Text style={revStyles.reviewerName}>Sofia Khan</Text>
          <Text style={revStyles.reviewDate}>3 days ago</Text>
        </View>
      </View>
      <Text style={revStyles.reviewText}>
        Amazing results! Had severe acne issues for years. After 3 months of treatment,
        my skin is completely clear. Highly recommend Dr. Anjali!
      </Text>
      <Text style={revStyles.helpful}>👍 45 found this helpful</Text>
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
    backgroundColor: DoctorsTheme.colors.apolloOrange,
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
    <Text style={ctaStyles.emoji}>💬</Text>
    <Text style={ctaStyles.title}>Get Free Skin Analysis</Text>
    <Text style={ctaStyles.subtitle}>Upload your photo and get expert advice</Text>
    <TouchableOpacity style={ctaStyles.button}>
      <Text style={ctaStyles.buttonText}>Upload Photo</Text>
    </TouchableOpacity>
  </View>
));
CTASection.displayName = 'CTASection';

const ctaStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: '#FFF3E0',
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
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: DoctorsTheme.colors.textSecondary,
    marginBottom: 16,
  },
  button: {
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  buttonText: {
    color: DoctorsTheme.colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
});

// Main Screen
export default function DermatologyScreen() {
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
        <DermatologyHeader />
        <SearchSection />
        <TreatmentsSection />
        <DoctorsSection />
        <BeforeAfterSection />
        <ProductsSection />
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
          <Text style={floatingStyles.ctaText}>Video Consult Now</Text>
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
    backgroundColor: DoctorsTheme.colors.apolloOrange,
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
