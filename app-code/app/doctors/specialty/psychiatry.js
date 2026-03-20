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
const PsychiatryHeader = memo(() => {
  const router = useRouter();
  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.gradient}>
        <TouchableOpacity onPress={() => router.back()} style={headerStyles.backButton}>
          <Ionicons name="arrow-back" size={24} color={DoctorsTheme.colors.white} />
        </TouchableOpacity>
        <View style={headerStyles.titleContainer}>
          <Text style={headerStyles.emoji}>🧠</Text>
          <Text style={headerStyles.title}>Psychiatry</Text>
          <Text style={headerStyles.subtitle}>Mental Health & Wellness</Text>
        </View>
      </View>
      <View style={headerStyles.statsRow}>
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>300+</Text>
          <Text style={headerStyles.statLabel}>Expert Doctors</Text>
        </View>
        <View style={headerStyles.statDivider} />
        <View style={headerStyles.statItem}>
          <Text style={headerStyles.statNumber}>10+</Text>
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
PsychiatryHeader.displayName = 'PsychiatryHeader';

const headerStyles = StyleSheet.create({
  container: { backgroundColor: '#7B1FA2' },
  gradient: { paddingTop: 50, paddingHorizontal: 16, paddingBottom: 24 },
  backButton: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  titleContainer: { alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 8 },
  title: { fontSize: 28, fontWeight: '800', color: DoctorsTheme.colors.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '500' },
  statsRow: {
    flexDirection: 'row', backgroundColor: DoctorsTheme.colors.white, paddingVertical: 16,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#7B1FA2' },
  statLabel: { fontSize: 11, color: DoctorsTheme.colors.textSecondary, marginTop: 2 },
  statDivider: { width: 1, backgroundColor: DoctorsTheme.colors.border },
});

// Quick Support Banner
const QuickSupportBanner = memo(() => (
  <View style={bannerStyles.container}>
    <Text style={bannerStyles.emoji}>🧘</Text>
    <View style={bannerStyles.content}>
      <Text style={bannerStyles.title}>Need Someone to Talk To?</Text>
      <Text style={bannerStyles.subtitle}>Connect with certified therapists today</Text>
    </View>
    <TouchableOpacity style={bannerStyles.button}>
      <Text style={bannerStyles.buttonText}>Start Chat</Text>
    </TouchableOpacity>
  </View>
));
QuickSupportBanner.displayName = 'QuickSupportBanner';

const bannerStyles = StyleSheet.create({
  container: {
    marginHorizontal: 16, marginTop: 16, backgroundColor: '#F3E5F5', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center',
  },
  emoji: { fontSize: 40, marginRight: 12 },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: DoctorsTheme.colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 12, color: DoctorsTheme.colors.textSecondary },
  button: { backgroundColor: '#7B1FA2', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 10 },
  buttonText: { color: DoctorsTheme.colors.white, fontSize: 13, fontWeight: '700' },
});

// Conditions
const CONDITIONS_DATA = [
  { id: '1', name: 'Anxiety', icon: '😰', count: '8k+ cases' },
  { id: '2', name: 'Depression', icon: '😔', count: '6k+ cases' },
  { id: '3', name: 'Stress', icon: '😓', count: '10k+ cases' },
  { id: '4', name: 'Sleep Issues', icon: '😴', count: '5k+ cases' },
  { id: '5', name: 'Relationship', icon: '💑', count: '3k+ cases' },
  { id: '6', name: 'Trauma', icon: '💔', count: '2k+ cases' },
];

const ConditionsSection = memo(() => (
  <View style={condStyles.container}>
    <Text style={condStyles.title}>Common Concerns</Text>
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
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white, marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  item: { width: '31%', backgroundColor: DoctorsTheme.colors.cardBg', borderRadius: 12, padding: 12, marginBottom: 8, alignItems: 'center', borderWidth: 1, borderColor: DoctorsTheme.colors.border },
  icon: { fontSize: 28, marginBottom: 6 },
  name: { fontSize: 12, fontWeight: '600', color: DoctorsTheme.colors.textPrimary, textAlign: 'center', marginBottom: 4 },
  count: { fontSize: 10, color: DoctorsTheme.colors.textTertiary },
});

// Therapy Types
const THERAPY_DATA = [
  { id: '1', name: 'Cognitive\nBehavioral', icon: '🧠', desc: 'Change negative thought patterns' },
  { id: '2', name: 'Talk\nTherapy', icon: '💬', desc: 'Open up in a safe space' },
  { id: '3', name: 'Mindfulness', icon: '🧘', desc: 'Meditation & awareness' },
  { id: '4', name: 'Couples\nTherapy', icon: '💑', desc: 'Relationship counseling' },
];

const TherapySection = memo(() => (
  <View style={therapyStyles.container}>
    <Text style={therapyStyles.title}>Types of Therapy</Text>
    <View style={therapyStyles.grid}>
      {THERAPY_DATA.map((item) => (
        <TouchableOpacity key={item.id} style={therapyStyles.card} accessibilityRole="button">
          <Text style={therapyStyles.icon}>{item.icon}</Text>
          <Text style={therapyStyles.name}>{item.name}</Text>
          <Text style={therapyStyles.desc}>{item.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
TherapySection.displayName = 'TherapySection';

const therapyStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#F3E5F5', borderRadius: 12, padding: 14, marginBottom: 10, alignItems: 'center' },
  icon: { fontSize: 32, marginBottom: 8 },
  name: { fontSize: 14, fontWeight: '700', color: DoctorsTheme.colors.textPrimary, textAlign: 'center', marginBottom: 4 },
  desc: { fontSize: 11, color: DoctorsTheme.colors.textSecondary, textAlign: 'center' },
});

// Doctors
const DOCTORS_DATA = [
  { id: '1', name: 'Dr. Rahul Verma', degree: 'MD, DPM Psychiatry', hospital: 'Apollo Delhi', experience: '18 years', rating: 4.9, reviews: 2156, fee: 1200, image: '👨‍⚕️', available: 'Today' },
  { id: '2', name: 'Dr. Anjali Patel', degree: 'MD, DPM, MPhil', hospital: 'Apollo Mumbai', experience: '15 years', rating: 4.8, reviews: 1845, fee: 1000, image: '👩‍⚕️', available: 'Tomorrow' },
];

const DoctorsSection = memo(() => (
  <View style={docStyles.container}>
    <Text style={docStyles.title}>Top Psychiatrists</Text>
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
  container: { paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary', paddingHorizontal: 16, marginBottom: 12 },
  card: { marginHorizontal: 16, backgroundColor: DoctorsTheme.colors.white', borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: DoctorsTheme.colors.border, ...DoctorsTheme.shadow.level1 },
  cardHeader: { flexDirection: 'row', marginBottom: 12 },
  avatar: { fontSize: 56 },
  info: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 17, fontWeight: '700', color: DoctorsTheme.colors.textPrimary, marginBottom: 2 },
  degree: { fontSize: 13, color: '#7B1FA2', fontWeight: '600', marginBottom: 2 },
  hospital: { fontSize: 12, color: DoctorsTheme.colors.textSecondary },
  cardBody: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: DoctorsTheme.colors.border, paddingTop: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 14, fontWeight: '700', marginLeft: 4 },
  reviews: { fontSize: 12, color: DoctorsTheme.colors.textSecondary },
  exp: { fontSize: 12, color: DoctorsTheme.colors.textSecondary },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: DoctorsTheme.colors.border },
  fee: { fontSize: 18, fontWeight: '800', color: DoctorsTheme.colors.textPrimary },
  bookBtn: { backgroundColor: '#7B1FA2', borderRadius: 10, paddingHorizontal: 24, paddingVertical: 10 },
  bookBtnText: { color: DoctorsTheme.colors.white, fontSize: 14, fontWeight: '700' },
});

// Why Choose
const WHY_DATA = [
  { id: '1', icon: '🔒', title: '100% Confidential', desc: 'Your privacy is protected' },
  { id: '2', icon: '👨‍⚕️', title: 'Certified Experts', desc: 'Licensed therapists' },
  { id: '3', icon: '💬', title: 'Flexible Sessions', desc: 'Chat, call, or video' },
  { id: '4', icon: '📱', title: '24/7 Support', desc: 'Anytime access' },
];

const WhyChooseSection = memo(() => (
  <View style={whyStyles.container}>
    <Text style={whyStyles.title}>Why Choose Us</Text>
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
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: DoctorsTheme.colors.white', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: DoctorsTheme.colors.textPrimary', marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', alignItems: 'center', marginBottom: 16 },
  icon: { fontSize: 32, marginBottom: 8 },
  cardTitle: { fontSize: 14, fontWeight: '700', color: DoctorsTheme.colors.textPrimary, marginBottom: 4, textAlign: 'center' },
  desc: { fontSize: 11, color: DoctorsTheme.colors.textSecondary', textAlign: 'center' },
});

// CTA
const CTASection = memo(() => (
  <View style={ctaStyles.container}>
    <Text style={ctaStyles.emoji}>🤝</Text>
    <Text style={ctaStyles.title}>Take the First Step</Text>
    <Text style={ctaStyles.subtitle}>Your mental health matters</Text>
    <TouchableOpacity style={ctaStyles.button}>
      <Text style={ctaStyles.buttonText}>Book Consultation</Text>
    </TouchableOpacity>
  </View>
));
CTASection.displayName = 'CTASection';

const ctaStyles = StyleSheet.create({
  container: { marginHorizontal: 16, marginVertical: 16, backgroundColor: '#7B1FA2', borderRadius: 16, padding: 24, alignItems: 'center' },
  emoji: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', color: DoctorsTheme.colors.white, marginBottom: 6 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
  button: { backgroundColor: DoctorsTheme.colors.white, borderRadius: 12, paddingHorizontal: 32, paddingVertical: 14 },
  buttonText: { color: '#7B1FA2', fontSize: 16, fontWeight: '700' },
});

// Main
export default function PsychiatryScreen() {
  const scrollRef = useRef(null);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const handleScroll = useCallback((event) => { setShowGoToTop(event.nativeEvent.contentOffset.y > 500); }, []);
  const scrollToTop = useCallback(() => { scrollRef.current?.scrollTo({ y: 0, animated: true }); }, []);

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        <PsychiatryHeader />
        <QuickSupportBanner />
        <ConditionsSection />
        <TherapySection />
        <DoctorsSection />
        <WhyChooseSection />
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
          <Ionicons name="chatbubble" size={22} color={DoctorsTheme.colors.white} />
          <Text style={floatingStyles.ctaText}>Start Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: DoctorsTheme.colors.cardBg },
});

const goToTopStyles = StyleSheet.create({
  button: { position: 'absolute', right: 16, bottom: 100, width: 44, height: 44, borderRadius: 22, backgroundColor: '#7B1FA2', justifyContent: 'center', alignItems: 'center', ...DoctorsTheme.shadow.level2 },
});

const floatingStyles = StyleSheet.create({
  container: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: DoctorsTheme.colors.white, paddingHorizontal: 16, paddingVertical: 12, borderTopWidth: 1, borderTopColor: DoctorsTheme.colors.border },
  ctaButton: { backgroundColor: '#7B1FA2', borderRadius: 12, paddingVertical: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 8 },
  ctaText: { fontSize: 16, fontWeight: '700', color: DoctorsTheme.colors.white },
});
