import React, { memo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DoctorsTheme } from '../../components/doctors/DoctorsTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Screen Header with Gradient
const CardiologyHeader = memo(() => {
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
          <Text style={headerStyles.emoji}>❤️</Text>
          <Text style={headerStyles.title}>Cardiology</Text>
          <Text style={headerStyles.subtitle}>Heart Health Specialists</Text>
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
CardiologyHeader.displayName = 'CardiologyHeader';

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

// Search and Filter Section
const SearchFilterSection = memo(() => (
  <View style={searchStyles.container}>
    <View style={searchStyles.searchBox}>
      <Ionicons name="search" size={20} color={DoctorsTheme.colors.textTertiary} />
      <TextInput
        style={searchStyles.input}
        placeholder="Search cardiologists, symptoms..."
        placeholderTextColor={DoctorsTheme.colors.textTertiary}
      />
      <TouchableOpacity style={searchStyles.filterBtn}>
        <Ionicons name="options" size={20} color={DoctorsTheme.colors.apolloOrange} />
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={searchStyles.filterScroll}>
      {['All', 'Available Today', 'Tomorrow', 'Video Consult', 'Hospital Visit'].map((filter, index) => (
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
SearchFilterSection.displayName = 'SearchFilterSection';

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
  filterBtn: {
    padding: 8,
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

// Top Doctors List
const CARDIOLOGISTS_DATA = [
  {
    id: '1',
    name: 'Dr. Rajesh Khanna',
    degree: 'MD, DM Cardiology',
    hospital: 'Apollo Hospitals, Delhi',
    experience: '25 years',
    rating: 4.9,
    reviews: 2847,
    nextAvailable: 'Today',
    fee: 1200,
    languages: ['English', 'Hindi'],
    image: '👨‍⚕️',
    isAvailable: true,
  },
  {
    id: '2',
    name: 'Dr. Priya Sharma',
    degree: 'DM Cardiology, FACC',
    hospital: 'Apollo Chennai',
    experience: '18 years',
    rating: 4.8,
    reviews: 1923,
    nextAvailable: 'Tomorrow',
    fee: 1500,
    languages: ['English', 'Tamil', 'Hindi'],
    image: '👩‍⚕️',
    isAvailable: true,
  },
  {
    id: '3',
    name: 'Dr. Amit Patel',
    degree: 'MD, DNB Cardiology',
    hospital: 'Apollo Mumbai',
    experience: '15 years',
    rating: 4.7,
    reviews: 1456,
    nextAvailable: 'In 2 days',
    fee: 1000,
    languages: ['English', 'Marathi', 'Hindi'],
    image: '👨‍⚕️',
    isAvailable: false,
  },
];

const TopDoctorsSection = memo(() => {
  const router = useRouter();
  const renderDoctorCard = ({ item }) => (
    <TouchableOpacity
      style={doctorStyles.card}
      accessibilityRole="button"
      accessibilityLabel={`Book appointment with ${item.name}`}
    >
      <View style={doctorStyles.cardHeader}>
        <View style={doctorStyles.avatarContainer}>
          <Text style={doctorStyles.avatar}>{item.image}</Text>
          {item.isAvailable && (
            <View style={doctorStyles.onlineBadge}>
              <Ionicons name="checkmark" size={10} color={DoctorsTheme.colors.white} />
            </View>
          )}
        </View>
        <View style={doctorStyles.doctorInfo}>
          <Text style={doctorStyles.doctorName}>{item.name}</Text>
          <Text style={doctorStyles.doctorDegree}>{item.degree}</Text>
          <Text style={doctorStyles.hospital}>{item.hospital}</Text>
        </View>
      </View>
      <View style={doctorStyles.cardBody}>
        <View style={doctorStyles.badgeRow}>
          <View style={doctorStyles.badge}>
            <Ionicons name="star" size={14} color={DoctorsTheme.colors.gold} />
            <Text style={doctorStyles.rating}>{item.rating}</Text>
            <Text style={doctorStyles.reviews}>({item.reviews}+)</Text>
          </View>
          <View style={doctorStyles.expBadge}>
            <Ionicons name="time-outline" size={12} color={DoctorsTheme.colors.teal} />
            <Text style={doctorStyles.expText}>{item.experience}</Text>
          </View>
        </View>
        <View style={doctorStyles.availabilityRow}>
          <View style={[doctorStyles.availabilityBadge, item.isAvailable ? doctorStyles.availableNow : doctorStyles.unavailable]}>
            <Text style={[doctorStyles.availabilityText, item.isAvailable ? doctorStyles.availableTextNow : doctorStyles.unavailableText]}>
              {item.nextAvailable}
            </Text>
          </View>
          <Text style={doctorStyles.fee}>₹{item.fee}</Text>
        </View>
        <View style={doctorStyles.languageRow}>
          <Text style={doctorStyles.languageLabel}>Languages: </Text>
          <Text style={doctorStyles.languageText}>{item.languages.join(', ')}</Text>
        </View>
      </View>
      <View style={doctorStyles.cardFooter}>
        <TouchableOpacity style={doctorStyles.consultBtn}>
          <Text style={doctorStyles.consultBtnText}>Book Consult</Text>
        </TouchableOpacity>
        <TouchableOpacity style={doctorStyles.profileBtn}>
          <Text style={doctorStyles.profileBtnText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={sectionStyles.container}>
      <View style={sectionStyles.header}>
        <Text style={sectionStyles.title}>Top Cardiologists</Text>
        <TouchableOpacity accessibilityRole="button">
          <Text style={sectionStyles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={CARDIOLOGISTS_DATA}
        renderItem={renderDoctorCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
});
TopDoctorsSection.displayName = 'TopDoctorsSection';

const doctorStyles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH * 0.85,
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 16,
    marginRight: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
    ...DoctorsTheme.shadow.level2,
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
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: DoctorsTheme.colors.greenBadge,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: DoctorsTheme.colors.white,
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 12,
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
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
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
  expBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  expText: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    marginLeft: 4,
  },
  availabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  availabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableNow: {
    backgroundColor: '#E8F5E9',
  },
  unavailable: {
    backgroundColor: '#FFF3E0',
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  availableTextNow: {
    color: DoctorsTheme.colors.greenBadge,
  },
  unavailableText: {
    color: DoctorsTheme.colors.apolloOrange,
  },
  fee: {
    fontSize: 18,
    fontWeight: '800',
    color: DoctorsTheme.colors.textPrimary,
  },
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageLabel: {
    fontSize: 12,
    color: DoctorsTheme.colors.textTertiary,
  },
  languageText: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
  },
  cardFooter: {
    flexDirection: 'row',
    gap: 8,
  },
  consultBtn: {
    flex: 1,
    backgroundColor: DoctorsTheme.colors.apolloOrange,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  consultBtnText: {
    color: DoctorsTheme.colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  profileBtn: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.apolloOrange,
  },
  profileBtnText: {
    color: DoctorsTheme.colors.apolloOrange,
    fontSize: 14,
    fontWeight: '700',
  },
});

const sectionStyles = StyleSheet.create({
  container: {
    paddingVertical: 16,
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
});

// Symptoms & Conditions Section
const CONDITIONS_DATA = [
  { id: '1', name: 'Chest Pain', icon: '💔', count: '2.5k+ consults' },
  { id: '2', name: 'Heart Palpitations', icon: '💓', count: '1.8k+ consults' },
  { id: '3', name: 'Shortness of Breath', icon: '😮', count: '1.2k+ consults' },
  { id: '4', name: 'High Blood Pressure', icon: '📈', count: '3k+ consults' },
  { id: '5', name: 'Heart Failure', icon: '❤️', count: '800+ consults' },
  { id: '6', name: 'Arrhythmia', icon: '💗', count: '600+ consults' },
  { id: '7', name: 'Cholesterol Issues', icon: '🩸', count: '2k+ consults' },
  { id: '8', name: 'Angina', icon: '😣', count: '900+ consults' },
];

const ConditionsSection = memo(() => (
  <View style={conditionsStyles.container}>
    <Text style={conditionsStyles.title}>Common Heart Conditions</Text>
    <View style={conditionsStyles.grid}>
      {CONDITIONS_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={conditionsStyles.item} accessibilityRole="button">
          <View style={conditionsStyles.iconWrap}>
            <Text style={conditionsStyles.icon}>{item.icon}</Text>
          </View>
          <Text style={conditionsStyles.name}>{item.name}</Text>
          <Text style={conditionsStyles.count}>{item.count}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
ConditionsSection.displayName = 'ConditionsSection';

const conditionsStyles = StyleSheet.create({
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
  item: {
    width: '48%',
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  iconWrap: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: DoctorsTheme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 26,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 4,
  },
  count: {
    fontSize: 11,
    color: DoctorsTheme.colors.textTertiary,
  },
});

// Services Section
const SERVICES_DATA = [
  { id: '1', name: 'ECG Test', icon: '📊', description: 'Heart rhythm test', price: '₹500' },
  { id: '2', name: '2D Echo', icon: '🫀', description: 'Heart ultrasound', price: '₹2500' },
  { id: '3', name: 'TMT Test', icon: '🏃', description: 'Stress test', price: '₹1800' },
  { id: '4', name: 'Holter Monitor', icon: '⌚', description: '24hr monitoring', price: '₹3000' },
];

const ServicesSection = memo(() => (
  <View style={servicesStyles.container}>
    <View style={servicesStyles.header}>
      <Text style={servicesStyles.title}>Cardiac Services & Tests</Text>
      <TouchableOpacity accessibilityRole="button">
        <Text style={servicesStyles.viewAll}>View All</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
      {SERVICES_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={servicesStyles.card} accessibilityRole="button">
          <Text style={servicesStyles.icon}>{item.icon}</Text>
          <Text style={servicesStyles.name}>{item.name}</Text>
          <Text style={servicesStyles.description}>{item.description}</Text>
          <View style={servicesStyles.priceRow}>
            <Text style={servicesStyles.price}>{item.price}</Text>
            <View style={servicesStyles.bookBtn}>
              <Text style={servicesStyles.bookText}>Book</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
ServicesSection.displayName = 'ServicesSection';

const servicesStyles = StyleSheet.create({
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
    width: 160,
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginRight: 12,
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
  },
  description: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.apolloOrange,
  },
  bookBtn: {
    backgroundColor: DoctorsTheme.colors.teal,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  bookText: {
    color: DoctorsTheme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

// Patient Reviews Section
const REVIEWS_DATA = [
  {
    id: '1',
    name: 'Rahul S.',
    rating: 5,
    date: '2 days ago',
    comment: 'Excellent consultation for chest pain. Dr. Khanna was very thorough and explained everything clearly. Highly recommend!',
    helpful: 24,
  },
  {
    id: '2',
    name: 'Anita M.',
    rating: 5,
    date: '1 week ago',
    comment: 'Great experience with the video consultation. The doctor was patient and answered all my questions about heart palpitations.',
    helpful: 18,
  },
  {
    id: '3',
    name: 'Vijay K.',
    rating: 4,
    date: '2 weeks ago',
    comment: 'Good consultation for blood pressure management. Follow-up care was excellent.',
    helpful: 12,
  },
];

const ReviewsSection = memo(() => (
  <View style={reviewsStyles.container}>
    <View style={reviewsStyles.header}>
      <Text style={reviewsStyles.title}>Patient Reviews</Text>
      <View style={reviewsStyles.ratingBadge}>
        <Ionicons name="star" size={16} color={DoctorsTheme.colors.gold} />
        <Text style={reviewsStyles.ratingText}>4.9</Text>
        <Text style={reviewsStyles.reviewsCount}>(10k+ reviews)</Text>
      </View>
    </View>
    {REVIEWS_DATA.map((review) => (
      <View key={review.id} style={reviewsStyles.reviewCard}>
        <View style={reviewsStyles.reviewHeader}>
          <View style={reviewsStyles.reviewerAvatar}>
            <Text style={reviewsStyles.avatarText}>{review.name.charAt(0)}</Text>
          </View>
          <View style={reviewsStyles.reviewerInfo}>
            <Text style={reviewsStyles.reviewerName}>{review.name}</Text>
            <View style={reviewsStyles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= review.rating ? 'star' : 'star-outline'}
                  size={12}
                  color={DoctorsTheme.colors.gold}
                />
              ))}
              <Text style={reviewsStyles.reviewDate}>{review.date}</Text>
            </View>
          </View>
        </View>
        <Text style={reviewsStyles.comment}>{review.comment}</Text>
        <View style={reviewsStyles.helpfulRow}>
          <Text style={reviewsStyles.helpfulText}>👍 {review.helpful} found this helpful</Text>
          <TouchableOpacity>
            <Text style={reviewsStyles.reportText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
    <TouchableOpacity style={reviewsStyles.seeAllBtn}>
      <Text style={reviewsStyles.seeAllText}>See All Reviews</Text>
    </TouchableOpacity>
  </View>
));
ReviewsSection.displayName = 'ReviewsSection';

const reviewsStyles = StyleSheet.create({
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF8E1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginLeft: 4,
  },
  reviewsCount: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
    marginLeft: 4,
  },
  reviewCard: {
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: DoctorsTheme.colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.white,
  },
  reviewerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.textPrimary,
    marginBottom: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewDate: {
    fontSize: 11,
    color: DoctorsTheme.colors.textTertiary,
    marginLeft: 8,
  },
  comment: {
    fontSize: 13,
    color: DoctorsTheme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  helpfulRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  helpfulText: {
    fontSize: 12,
    color: DoctorsTheme.colors.textTertiary,
  },
  reportText: {
    fontSize: 12,
    color: DoctorsTheme.colors.textTertiary,
    textDecorationLine: 'underline',
  },
  seeAllBtn: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.teal,
  },
});

// FAQ Section
const FAQ_DATA = [
  {
    id: '1',
    question: 'When should I see a cardiologist?',
    answer: 'You should consult a cardiologist if you experience chest pain, shortness of breath, heart palpitations, or have risk factors like high blood pressure, diabetes, or family history of heart disease.',
  },
  {
    id: '2',
    question: 'What happens during a cardiology consultation?',
    answer: 'The doctor will review your medical history, perform a physical examination, and may recommend tests like ECG, echo, or stress tests to assess your heart health.',
  },
  {
    id: '3',
    question: 'How to prepare for a heart checkup?',
    answer: 'Fast for 8-12 hours before tests, bring previous medical records, list of current medications, and wear comfortable clothing for the examination.',
  },
];

const FAQSection = memo(() => {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <View style={faqStyles.container}>
      <Text style={faqStyles.title}>Frequently Asked Questions</Text>
      {FAQ_DATA.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={faqStyles.faqItem}
          onPress={() => setExpandedId(expandedId === item.id ? null : item.id)}
          accessibilityRole="button"
        >
          <View style={faqStyles.questionRow}>
            <Text style={faqStyles.question}>{item.question}</Text>
            <Ionicons
              name={expandedId === item.id ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={DoctorsTheme.colors.textSecondary}
            />
          </View>
          {expandedId === item.id && (
            <Text style={faqStyles.answer}>{item.answer}</Text>
          )}
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
  faqItem: {
    backgroundColor: DoctorsTheme.colors.cardBg,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: DoctorsTheme.colors.border,
  },
  questionRow: {
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

// CTA Banner Section
const CTASection = memo(() => (
  <View style={ctaStyles.container}>
    <View style={ctaStyles.content}>
      <Text style={ctaStyles.emoji}>🏥</Text>
      <View style={ctaStyles.textContent}>
        <Text style={ctaStyles.title}>Need Immediate Care?</Text>
        <Text style={ctaStyles.subtitle}>Visit our emergency cardiac care center</Text>
      </View>
    </View>
    <TouchableOpacity style={ctaStyles.button}>
      <Text style={ctaStyles.buttonText}>Call Emergency</Text>
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
    padding: 20,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  emoji: {
    fontSize: 40,
    marginRight: 16,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: DoctorsTheme.colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
  },
  button: {
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: DoctorsTheme.colors.teal,
  },
});

// Main Screen Component
export default function CardiologyScreen() {
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
        <CardiologyHeader />
        <SearchFilterSection />
        <TopDoctorsSection />
        <ConditionsSection />
        <ServicesSection />
        <ReviewsSection />
        <FAQSection />
        <CTASection />
        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Go To Top Button */}
      {showGoToTop && (
        <TouchableOpacity style={goToTopStyles.button} onPress={scrollToTop}>
          <Ionicons name="arrow-up" size={20} color={DoctorsTheme.colors.white} />
        </TouchableOpacity>
      )}

      {/* Floating CTA */}
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
