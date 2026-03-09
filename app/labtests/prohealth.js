import React, { useState, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const C = {
  primaryOrange: '#E05A2B',
  primaryTeal: '#006060',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  amber: '#F9A825',
};

// ─── BROWSER BAR ───
const BrowserBar = memo(() => (
  <View style={styles.browserBar}>
    <TouchableOpacity style={styles.browserBtn} accessibilityLabel="Close">
      <Ionicons name="close" size={20} color={C.textSecondary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.browserBtn} accessibilityLabel="Back">
      <Ionicons name="arrow-back" size={18} color={C.textSecondary} />
    </TouchableOpacity>
    <View style={styles.browserUrlBar}>
      <Text style={styles.browserUrlText} numberOfLines={1}>Super Sunday...</Text>
    </View>
    <TouchableOpacity style={styles.browserBtn} accessibilityLabel="Share">
      <Ionicons name="share-outline" size={18} color={C.textSecondary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.browserBtn} accessibilityLabel="Bookmark">
      <Ionicons name="bookmark-outline" size={18} color={C.textSecondary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.browserBtn} accessibilityLabel="More">
      <Ionicons name="ellipsis-vertical" size={18} color={C.textSecondary} />
    </TouchableOpacity>
  </View>
));

// ─── PROHEALTH HEADER ───
const ProHealthHeader = memo(() => (
  <View style={styles.proHeader}>
    <View style={styles.proLogoRow}>
      <View style={styles.proLogo}>
        <Text style={styles.proLogoText}>PRO</Text>
        <Text style={styles.proLogoSub}>HEALTH</Text>
      </View>
      <Text style={styles.proByApollo}>BY Apollo</Text>
    </View>
    <TouchableOpacity style={styles.callToBookBtn} accessibilityLabel="Call to book">
      <Ionicons name="call" size={16} color="#FFF" />
      <Text style={styles.callToBookText}>Call to Book</Text>
    </TouchableOpacity>
  </View>
));

// ─── HERO BANNER ───
const HeroBanner = memo(() => (
  <View style={styles.heroBanner}>
    <View style={styles.heroContent}>
      <View style={styles.heroCalendar}>
        <View style={styles.calendarIcon}>
          <Ionicons name="calendar" size={40} color={C.primaryTeal} />
          <View style={styles.calendarCircle}>
            <Text style={styles.calendarDay}>SUN</Text>
          </View>
        </View>
        <View style={styles.heroIllustration}>
          <Ionicons name="person" size={50} color={C.primaryTeal} />
        </View>
      </View>
      <Text style={styles.heroTitle}>Complete Health Check{'\n'}In Just 150 Minutes</Text>
    </View>
    <View style={styles.heroQRSection}>
      <View style={styles.qrPlaceholder}>
        <Ionicons name="qr-code" size={40} color={C.textPrimary} />
      </View>
    </View>
    <View style={styles.freeCollectionStrip}>
      <Ionicons name="car" size={16} color={C.primaryTeal} />
      <Text style={styles.freeCollectionText}>FREE Home Sample Collection on Friday and Saturday</Text>
    </View>
  </View>
));

// ─── BOOKING FORM ───
const BookingForm = memo(({ name, setName, city, setCity, phone, setPhone, robotChecked, setRobotChecked }) => (
  <View style={styles.bookingForm}>
    <Text style={styles.bookingTitle}>Book A ProHealth Check</Text>

    <View style={styles.inputGroup}>
      <TextInput
        style={styles.textInput}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Your name"
        placeholderTextColor={C.textSecondary}
      />
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={styles.textInput}
        placeholder="Chennai"
        value={city}
        onChangeText={setCity}
        accessibilityLabel="City"
        placeholderTextColor={C.textSecondary}
      />
    </View>

    <View style={styles.inputGroup}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        accessibilityLabel="Phone number"
        placeholderTextColor={C.textSecondary}
      />
    </View>

    <TouchableOpacity
      style={styles.recaptchaBox}
      onPress={() => setRobotChecked(!robotChecked)}
      accessibilityLabel="I'm not a robot"
    >
      <View style={[styles.checkbox, robotChecked && styles.checkboxChecked]}>
        {robotChecked && <Ionicons name="checkmark" size={14} color="#FFF" />}
      </View>
      <Text style={styles.recaptchaText}>I'm not a robot</Text>
      <View style={styles.recaptchaLogo}>
        <Text style={styles.recaptchaLogoText}>reCAPTCHA</Text>
      </View>
    </TouchableOpacity>
  </View>
));

// ─── FIXED BOTTOM CTA ───
const BottomCTA = memo(() => (
  <View style={styles.bottomCTA}>
    <TouchableOpacity style={styles.callUsBtn} accessibilityLabel="Call us now">
      <Ionicons name="call" size={18} color="#FFF" />
      <Text style={styles.callUsBtnText}>Call Us Now</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.bookAppointmentBtn} accessibilityLabel="Book appointment">
      <Text style={styles.bookAppointmentText}>Book Appointment</Text>
    </TouchableOpacity>
  </View>
));

// ─── MAIN SCREEN ───
export default function ProHealth() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('Chennai');
  const [phone, setPhone] = useState('');
  const [robotChecked, setRobotChecked] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <BrowserBar />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <ProHealthHeader />
        <HeroBanner />
        <BookingForm
          name={name}
          setName={setName}
          city={city}
          setCity={setCity}
          phone={phone}
          setPhone={setPhone}
          robotChecked={robotChecked}
          setRobotChecked={setRobotChecked}
        />
      </ScrollView>
      <BottomCTA />
    </SafeAreaView>
  );
}

// ─── STYLES ───
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, backgroundColor: '#FFF' },

  // Browser Bar
  browserBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', paddingHorizontal: 8, paddingVertical: 8, gap: 4 },
  browserBtn: { padding: 4 },
  browserUrlBar: { flex: 1, backgroundColor: '#FFF', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  browserUrlText: { fontSize: 13, color: C.textSecondary },

  // ProHealth Header
  proHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  proLogoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  proLogo: { alignItems: 'center' },
  proLogoText: { fontSize: 16, fontWeight: '800', color: C.primaryTeal, letterSpacing: 2 },
  proLogoSub: { fontSize: 8, color: C.primaryTeal, letterSpacing: 1, marginTop: -2 },
  proByApollo: { fontSize: 12, color: C.textSecondary },
  callToBookBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.amber, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, gap: 6 },
  callToBookText: { fontSize: 13, fontWeight: '600', color: '#FFF' },

  // Hero Banner
  heroBanner: { backgroundColor: '#E8F5E9', paddingHorizontal: 16, paddingVertical: 20 },
  heroContent: { flexDirection: 'row', marginBottom: 16 },
  heroCalendar: { flexDirection: 'row', alignItems: 'flex-start', marginRight: 16 },
  calendarIcon: { position: 'relative' },
  calendarCircle: { position: 'absolute', bottom: 2, right: -4, backgroundColor: C.primaryOrange, borderRadius: 10, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' },
  calendarDay: { fontSize: 7, fontWeight: '700', color: '#FFF' },
  heroIllustration: { marginLeft: 8 },
  heroTitle: { flex: 1, fontSize: 18, fontWeight: '700', color: C.textPrimary, lineHeight: 24 },
  heroQRSection: { alignItems: 'center', marginBottom: 12 },
  qrPlaceholder: { width: 80, height: 80, backgroundColor: '#FFF', borderRadius: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  freeCollectionStrip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  freeCollectionText: { fontSize: 12, color: C.textPrimary, flex: 1 },

  // Booking Form
  bookingForm: { paddingHorizontal: 16, paddingVertical: 20 },
  bookingTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary, marginBottom: 20 },
  inputGroup: { marginBottom: 14 },
  textInput: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: C.textPrimary, backgroundColor: '#FFF' },
  recaptchaBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 14, backgroundColor: '#FAFAFA', marginTop: 8 },
  checkbox: { width: 22, height: 22, borderWidth: 2, borderColor: '#CCC', borderRadius: 3, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  checkboxChecked: { backgroundColor: C.primaryTeal, borderColor: C.primaryTeal },
  recaptchaText: { flex: 1, fontSize: 14, color: C.textPrimary },
  recaptchaLogo: { alignItems: 'center' },
  recaptchaLogoText: { fontSize: 9, color: '#999', fontWeight: '600' },

  // Bottom CTA
  bottomCTA: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#FFF', borderTopWidth: 1, borderTopColor: '#E8E8E8', elevation: 10, shadowColor: '#000', shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.15, shadowRadius: 6 },
  callUsBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: C.primaryTeal, paddingVertical: 16, gap: 8 },
  callUsBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
  bookAppointmentBtn: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.primaryOrange, paddingVertical: 16 },
  bookAppointmentText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
});
