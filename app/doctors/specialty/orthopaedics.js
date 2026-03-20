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

// Header
const OrthopaedicsHeader = memo(() => {
  const router = useRouter();
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.gradient}>
        <TouchableOpacity onPress={() => router.back()} style={headerStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color={DoctorsTheme.colors.white} />
        </TouchableOpacity>
        <View style={headerStyles.titleContainer}>
          <Text style={headerStyles.emoji}>🦴</Text>
          <Text style={headerStyles.title}>Orthopaedics</Text>
          <Text style={headerStyles.subtitle}>Bone, Joint & Muscle Care</Text>
        </View>
      </View>
      <View style={headerStyles.statsRow}>
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>400+</Text>
          <Text style={headerStyles.statLabel}>Expert Doctors</Text>
        </View>
        <View style={headerStyles.statDivider} />
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>20+</Text>
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
OrthopaedicsHeader.displayName = 'OrthopaedicsHeader';

const headerStyles = StyleSheet.create({
  container: { backgroundColor: '#5D4037' },
  gradient: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 24 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  titleContainer: { alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: DoctorsTheme.colors.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  statsRow: { flexDirection: 'row', backgroundColor: DoctorsTheme.colors.white, paddingVertical: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#5D4037' },
  statLabel: { fontSize: 11, color: DoctorsTheme.colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: DoctorsTheme.colors.border },
});

// Body Parts
const BODY_PARTS_DATA = [
  { id: '1', name: 'Knee', icon: '🦵', color: '#EFEBE9' },
  { id: '2', name: 'Spine', icon: '🪜', color: '#E0E0E0' },
  { id: '3', name: 'Shoulder', icon: '💪', color: '#EFEBE9' },
  { id: '4', name: 'Hip', icon: '🦴', color: '#E0E0E0' },
];

const BodyPartsSection = memo(() => (
  <View style={bpStyles.container}>
    <Text style={bpStyles.title}>Select Body Part</Text>
    <View style={bpStyles.grid}>
      {BODY_PARTS_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={[bpStyles.item, { backgroundColor: item.color }]} accessibilityRole="button">
          <Text style={bpStyles.icon}>{item.icon}</Text>
          <Text style={bpStyles.name}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
BodyPartsSection.displayName = 'BodyPartsSection';

const bpStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary, marginBottom: 16 },
  grid: { flexDirection: 'row', justifyContent: 'space-between' },
  item: { width: '23%', borderRadius: 12, padding: 12, alignItems: 'center' },
  icon: { fontSize: 32, marginBottom: 6 },
  name: { fontSize: 12, fontWeight: '600', color: DoctorsTheme.colors.textPrimary },
});

// Conditions
const CONDITIONS_DATA = [
  { id: '1', name: 'Arthritis', icon: '🦴', count: '5k+ cases' },
  { id: '2', name: 'Back Pain', icon: '😫', count: '8k+ cases' },
  { id: '3', name: 'Sports Injury', icon: '🏃', count: '4k+ cases' },
  { id: '4', name: 'Fracture', icon: '🦴', count: '3k+ cases' },
  { id: '5', name: 'Joint Pain', icon: '💪', count: '6k+ cases' },
  { id: '6', name: 'Slip Disc', icon: '🪜', count: '2k+ cases' },
];

const ConditionsSection = memo(() => (
  <View style={condStyles.container}>
    <Text style={condStyles.title}>Common Conditions</Text>
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
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  item: { width: '31%', backgroundColor: DoctorsTheme.colors.cardBg', borderRadius: 12, padding: 12, marginBottom: 8, alignItems: 'center', borderWidth: 1, borderColor: DoctorsTheme.colors.border },
  icon: { fontSize: 28, marginBottom: 6 },
  name: { fontSize: 12, fontWeight: '600', color: DoctorsTheme.colors.textPrimary', textAlign: 'center', marginBottom: 4 },
  count: { fontSize: 10, color: DoctorsTheme.colors.textTertiary },
});

// Treatments
const TREATMENTS_DATA = [
  { id: '1', name: 'Knee Replacement', icon: '🦵', price: 'From ₹2.5L' },
  { id: '2', name: 'Hip Replacement', icon: '🦴', price: 'From ₹2L' },
  { id: '3', name: 'ACL Reconstruction', icon: '🏃', price: 'From ₹1.5L' },
  { id: '4', name: 'Spine Surgery', icon: '🪜', price: 'From ₹3L' },
];

const TreatmentsSection = memo(() => (
  <View style={treatStyles.container}>
    <View style={treatStyles.header}>
      <Text style={treatStyles.title}>Surgical Treatments</Text>
      <Text style={treatStyles.viewAll}>View All</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
      {TREATMENTS_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={treatStyles.card} accessibilityRole="button">
          <Text style={treatStyles.icon}>{item.icon}</Text>
          <Text style={treatStyles.name}>{item.name}</Text>
          <Text style={treatStyles.price}>{item.price}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
TreatmentsSection.displayName = 'TreatmentsSection';

const treatStyles = StyleSheet.create({
  container: { paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white', marginTop: 8 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary' },
  viewAll: { fontSize: 14, fontWeight: '600', color: '#5D4037' },
  card: { width: 160, backgroundColor: '#EFEBE9', borderRadius: 12, padding: 16, marginRight: 12, alignItems: 'center' },
  icon: { fontSize: 36, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '700', color: DoctorsTheme.colors.textPrimary', textAlign: 'center', marginBottom: 6 },
  price: { fontSize: 14, fontWeight: '600', color: '#5D4037' },
});

// Doctors
const DOCTORS_DATA = [
  { id: '1', name: 'Dr. Rajesh Malhotra', degree: 'MS, MCh Ortho', hospital: 'Apollo Delhi', experience: '25 years', rating: 4.9, reviews: 3256, fee: 1500, image: '👨‍⚕️', available: 'Today' },
  { id: '2', name: 'Dr. Priya Singh', degree: 'MS, DNB Ortho', hospital: 'Apollo Chennai', experience: '18 years', rating: 4.8, reviews: 2156, fee: 1200, image: '👩‍⚕️', available: 'Tomorrow' },
];

const DoctorsSection = memo(() => (
  <View style={docStyles.container}>
    <Text style={docStyles.title}>Top Orthopaedic Surgeons</Text>
    {DOCTORS_DATA.map((doctor) => (
      <TouchableOpacity key={doctor.id} style={docStyles.card} accessibilityRole="button">
        <View style={docStyles.cardHeader}>
          <Text style={docStyles.avatar}>{doctor.image}</Text>
          <View style={docStyles.info}>
            <Text style={docStyles.name}>{doctor.name}</Text>
            <Text style={docStyles.degree}>{doctor.degree}</Text>
            <Text style={docStyles.hospital}>{doctor.hospital}</Text>
          </View>
        </View>
        <View style={docStyles.cardBody}>
          <View style={docStyles.ratingRow}>
            <Ionicons name="star" size={14} color={DoctorsTheme.colors.gold} />
            <Text style={docStyles.rating}>{doctor.rating}</Text>
            <Text style={docStyles.reviews}>({doctor.reviews}+)</Text>
          </View>
          <Text style={docStyles.exp}>{doctor.experience}</Text>
        </View>
        <View style={docStyles.cardFooter}>
          <Text style={docStyles.fee}>₹{doctor.fee}</Text>
          <TouchableOpacity style={docStyles.bookBtn}><Text style={docStyles.bookBtnText}>Book</Text></TouchableOpacity>
        </View>
      </TouchableOpacity>
    ))}
  </View>
));
DoctorsSection.displayName = 'DoctorsSection';

const docStyles = StyleSheet.create({
  container: { paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary', paddingHorizontal: 16, marginBottom: 12 },
  card: { marginHorizontal: 16, backgroundColor: DoctorsTheme.colors.white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: DoctorsTheme.colors.border, ...DoctorsTheme.shadow.level1 },
  cardHeader: { flexDirection: 'row', marginBottom: 12 },
  avatar: { fontSize: 56 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 17, fontWeight: '700', color: DoctorsTheme.colors.textPrimary', marginBottom: 2 },
  degree: { fontSize: 13, color: '#5D4037', fontWeight: '600', marginBottom: 2 },
  hospital: { fontSize: 12, color: DoctorsTheme.colors.textSecondary },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: DoctorsTheme.colors.border, paddingTop: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 14, fontWeight: '700', marginLeft: 4 },
  reviews: { fontSize: 12, color: DoctorsTheme.colors.textSecondary },
  exp: { fontSize: 12, color: DoctorsTheme.colors.textSecondary },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: DoctorsTheme.colors.border },
  fee: { fontSize: 18, fontWeight: '800', color: DoctorsTheme.colors.textPrimary },
  bookBtn: { backgroundColor: '#5D4037', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 10 },
  bookBtnText: { color: DoctorsTheme.colors.white, fontSize: 14, fontWeight: '700' },
});

// Physio Services
const PHYSIO_DATA = [
  { id: '1', name: 'Post-Surgery Rehab', icon: '🏥' },
  { id: '2', name: 'Sports Injury Rehab', icon: '🏃' },
  { id: '3', name: 'Joint Pain Relief', icon: '💪' },
  { id: '4', name: 'Back Pain Management', icon: '🪜' },
];

const PhysioSection = memo(() => (
  <View style={physioStyles.container}>
    <Text style={physioStyles.title}>Physiotherapy Services</Text>
    <View style={physioStyles.grid}>
      {PHYSIO_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={physioStyles.item} accessibilityRole="button">
          <Text style={physioStyles.icon}>{item.icon}</Text>
          <Text style={physioStyles.name}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
PhysioSection.displayName = 'PhysioSection';

const physioStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  item: { width: '48%', backgroundColor: '#EFEBE9', borderRadius: 12, padding: 14, marginBottom: 10, alignItems: 'center' },
  icon: { fontSize: 32, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '600', color: DoctorsTheme.colors.textPrimary', textAlign: 'center' },
});

// CTA
const CTASection = memo(() => (
  <View style={ctaStyles.container}>
    <Text style={ctaStyles.emoji}>🏃</Text>
    <Text style={ctaStyles.title}>Get Back to Motion</Text>
    <Text style={ctaStyles.subtitle}>Expert orthopedic care for all ages</Text>
    <TouchableOpacity style={ctaStyles.button}><Text style={ctaStyles.buttonText}>Book Appointment</Text></TouchableOpacity>
  </View>
));
CTASection.displayName = 'CTASection';

const ctaStyles = StyleSheet.create({
  container: { marginHorizontal: 16, marginVertical: 16, backgroundColor: '#5D4037', borderRadius: 16, padding: 24, alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: DoctorsTheme.colors.white, marginBottom: 6 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
  button: { backgroundColor: DoctorsTheme.colors.white', borderRadius: 12, paddingHorizontal: 32, paddingVertical: 14 },
  buttonText: { color: '#5D4037', fontSize: 16, fontWeight: '700' },
});

// Main
export default function OrthopaedicsScreen() {
  const scrollRef = useRef(null);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const handleScroll = useCallback((event) => { setShowGoToTop(event.nativeEvent.contentOffset.y > 500); }, []);
  const scrollToTop = useCallback(() => { scrollRef.current?.scrollTo({ y: 0, animated: true }); }, []);

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        <OrthopaedicsHeader />
        <BodyPartsSection />
        <ConditionsSection />
        <TreatmentsSection />
        <DoctorsSection />
        <PhysioSection />
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
          <Ionicons name="calendar" size={22} color={DoctorsTheme.colors.white} />
          <Text style={floatingStyles.ctaText}>Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DoctorsTheme.colors.cardBg },
});

const goToTopStyles = StyleSheet.create({
  button: { position: 'absolute', right: 16, bottom: 100, width: 44, height: 44, borderRadius: 22, backgroundColor: '#5D4037', justifyContent: 'center', alignItems: 'center', ...DoctorsTheme.shadow.level2 },
});

const floatingStyles = StyleSheet.create({
  container: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: DoctorsTheme.colors.white', paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: DoctorsTheme.colors.border },
  ctaButton: { backgroundColor: '#5D4037', borderRadius: 12, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  ctaText: { fontSize: 16, fontWeight: '700', color: DoctorsTheme.colors.white },
});
