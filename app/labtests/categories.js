import React, { memo, useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  bgBeige: '#F5EDE0',
  borderLight: '#E8E8E8',
};

// ─── HEADER ───
const CategoriesHeader = memo(() => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerBackBtn} accessibilityLabel="Go back">
      <Ionicons name="arrow-back" size={24} color={C.textPrimary} />
    </TouchableOpacity>
    <View style={{ flex: 1 }} />
    <TouchableOpacity style={styles.headerIconBtn} accessibilityLabel="Search">
      <Ionicons name="search" size={22} color={C.textPrimary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerIconBtn} accessibilityLabel="Cart">
      <Ionicons name="cart-outline" size={22} color={C.textPrimary} />
    </TouchableOpacity>
  </View>
));

// ─── CATEGORY CIRCLE COMPONENT ───
const CategoryCircle = memo(({ icon, label, color, bgColor }) => (
  <TouchableOpacity style={styles.categoryItem} accessibilityLabel={label}>
    <View style={[styles.categoryCircle, { backgroundColor: bgColor || '#F5F0EB' }]}>
      <Ionicons name={icon} size={28} color={color || C.primaryOrange} />
    </View>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
));

// ─── SECTION 1: BROWSE BY AGE & GENDER ───
const ageGenderItems = [
  { icon: 'woman', label: 'For Women', color: '#E8A0BF', bgColor: '#FCE4EC' },
  { icon: 'man', label: 'For Men', color: '#4A90D9', bgColor: '#E3F2FD' },
  { icon: 'people', label: 'For Seniors', color: '#7B8D9E', bgColor: '#ECEFF1' },
];

const BrowseByAgeGender = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Browse by age and gender group</Text>
    <View style={styles.circleRow}>
      {ageGenderItems.map((item, i) => (
        <CategoryCircle key={i} {...item} />
      ))}
    </View>
  </View>
));

// ─── SECTION 2: OVERALL WELLNESS ───
const wellnessItems = [
  { icon: 'body', label: 'Full-body\ncheckups', color: '#E05A2B' },
  { icon: 'nutrition', label: 'Vitamins &\nNutrition', color: '#4CAF50' },
  { icon: 'medical', label: 'Hormone\nHealth', color: '#E91E63' },
  { icon: 'heart', label: 'Fertility', color: '#9C27B0' },
  { icon: 'shield-checkmark', label: 'Immunity', color: '#2196F3' },
  { icon: 'cut', label: 'Hairfall', color: '#795548' },
  { icon: 'male-female', label: 'Sexual\nHealth', color: '#FF5722' },
  { icon: 'woman', label: 'Pregnancy', color: '#E8A0BF' },
];

const OverallWellness = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Overall Wellness & General Health</Text>
    <View style={styles.circleGrid}>
      {wellnessItems.map((item, i) => (
        <CategoryCircle key={i} {...item} />
      ))}
    </View>
  </View>
));

// ─── SECTION 3: LONG TERM HEALTH ───
const longTermItems = [
  { icon: 'water', label: 'Diabetes', color: '#1976D2' },
  { icon: 'heart-circle', label: 'Cardiac', color: '#D32F2F' },
  { icon: 'pulse', label: 'Thyroid', color: '#7B1FA2' },
  { icon: 'fitness', label: 'Bones &\nJoint Health', color: '#5D4037' },
  { icon: 'scale', label: 'Obesity', color: '#FF9800' },
  { icon: 'ribbon', label: 'Cancer', color: '#E91E63' },
];

const LongTermHealth = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Long term health conditions</Text>
    <View style={styles.circleGrid}>
      {longTermItems.map((item, i) => (
        <CategoryCircle key={i} {...item} />
      ))}
    </View>
  </View>
));

// ─── SECTION 4: LIFESTYLE CHECKS ───
const lifestyleItems = [
  { icon: 'hand-left', label: 'Arthritis', color: '#795548' },
  { icon: 'trending-down', label: 'Weight\nManagement', color: '#FF9800' },
  { icon: 'barbell', label: 'Fitness', color: '#4CAF50' },
  { icon: 'thunderstorm', label: 'Stress\nManagement', color: '#9C27B0' },
  { icon: 'leaf', label: 'Gut Health', color: '#2E7D32' },
  { icon: 'restaurant', label: 'Nutrition\nDeficiency', color: '#E65100' },
  { icon: 'wine', label: 'Alcohol', color: '#D32F2F' },
];

const LifestyleChecks = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Lifestyle Checks (New Launch)</Text>
    <View style={styles.circleGrid}>
      {lifestyleItems.map((item, i) => (
        <CategoryCircle key={i} {...item} />
      ))}
    </View>
  </View>
));

// ─── SECTION 5: ILLNESS & SYMPTOMS ───
const illnessItems = [
  { icon: 'thermometer', label: 'Fever &\nInfection', color: '#F44336' },
  { icon: 'medical', label: 'Liver', color: '#8D6E63' },
  { icon: 'water', label: 'Kidney', color: '#1565C0' },
  { icon: 'cloud', label: 'Respiratory\nIssues', color: '#78909C' },
  { icon: 'flower', label: 'Allergies', color: '#AB47BC' },
  { icon: 'shield', label: 'Hepatitis\nScreening', color: '#EF6C00' },
  { icon: 'water-outline', label: 'Blood\nStudies', color: '#C62828' },
];

const IllnessSymptoms = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Illness & Symptoms Based</Text>
    <View style={styles.circleGrid}>
      {illnessItems.map((item, i) => (
        <CategoryCircle key={i} {...item} />
      ))}
    </View>
  </View>
));

// ─── SECTION 6: SPECIALISED TESTS ───
const specialisedItems = [
  { icon: 'code-working', label: 'Genetic\nTesting', color: '#00897B' },
  { icon: 'fast-food', label: 'Food Allergy\n& Intolerance', color: '#F4511E' },
];

const SpecialisedTests = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Specialised & Advanced Tests</Text>
    <View style={styles.circleGrid}>
      {specialisedItems.map((item, i) => (
        <CategoryCircle key={i} {...item} />
      ))}
    </View>
  </View>
));

// ─── SECTION 7: ASK APOLLO AI CARD ───
const AskApolloAICard = memo(() => (
  <View style={styles.sectionPadding}>
    <View style={styles.askApolloCard}>
      <View style={styles.askApolloHeader}>
        <View style={{ flex: 1 }}>
          <View style={styles.aiLabel}>
            <Text style={styles.aiLabelText}>AI</Text>
          </View>
          <Text style={styles.askApolloTitle}>Need help in choosing{'\n'}the right test?</Text>
          <Text style={styles.askApolloSubLabel}>ASK APOLLO ABOUT...</Text>
        </View>
        <View style={styles.askApolloSquare}>
          <Text style={styles.askApolloSquareText}>Ask{'\n'}Apollo</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.askApolloChip}>
        <Text style={styles.askApolloChipIcon}>*</Text>
        <Text style={styles.askApolloChipText}>Which tests are useful for thyroid problems?</Text>
        <Ionicons name="chevron-forward" size={16} color={C.primaryOrange} />
      </TouchableOpacity>
      <View style={styles.askApolloInput}>
        <Text style={styles.askApolloInputText}>Or Just Ask Apollo...</Text>
        <Ionicons name="send" size={20} color={C.primaryOrange} />
      </View>
    </View>
  </View>
));

// ─── MAIN SCREEN ───
export default function LabCategories() {
  const scrollRef = useRef(null);
  const [showGoTop, setShowGoTop] = useState(false);

  const handleScroll = useCallback((event) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowGoTop(y > 600);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <CategoriesHeader />
        <BrowseByAgeGender />
        <OverallWellness />
        <LongTermHealth />
        <LifestyleChecks />
        <IllnessSymptoms />
        <SpecialisedTests />
        <AskApolloAICard />
        <View style={{ height: 80 }} />
      </ScrollView>
      {showGoTop && (
        <TouchableOpacity style={styles.goTopButton} onPress={scrollToTop} accessibilityLabel="Go to top">
          <Ionicons name="arrow-up" size={14} color="#FFF" />
          <Text style={styles.goTopText}>Go To Top</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}

// ─── STYLES ───
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, backgroundColor: '#FFF' },
  sectionPadding: { paddingHorizontal: 16, marginTop: 20 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  headerBackBtn: { padding: 4 },
  headerIconBtn: { padding: 8 },

  // Section Title
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 16 },

  // Category Circles
  circleRow: { flexDirection: 'row', justifyContent: 'flex-start', gap: 20 },
  circleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  categoryItem: { width: (SCREEN_WIDTH - 32 - 24) / 4, alignItems: 'center', marginBottom: 12 },
  categoryCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  categoryLabel: { fontSize: 11, color: C.textSecondary, textAlign: 'center', lineHeight: 14 },

  // Ask Apollo
  askApolloCard: { backgroundColor: C.bgBeige, borderRadius: 16, padding: 16 },
  askApolloHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  aiLabel: { backgroundColor: '#E0E0E0', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 6 },
  aiLabelText: { fontSize: 10, fontWeight: '700', color: C.textPrimary },
  askApolloTitle: { fontSize: 16, fontWeight: '700', color: C.textPrimary, lineHeight: 22, marginBottom: 6 },
  askApolloSubLabel: { fontSize: 10, fontWeight: '600', color: C.textSecondary, letterSpacing: 0.5 },
  askApolloSquare: { backgroundColor: C.primaryOrange, borderRadius: 8, width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
  askApolloSquareText: { fontSize: 11, fontWeight: '700', color: '#FFF', textAlign: 'center', lineHeight: 14 },
  askApolloChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 10 },
  askApolloChipIcon: { fontSize: 14, color: C.primaryOrange, marginRight: 6 },
  askApolloChipText: { flex: 1, fontSize: 13, color: C.primaryOrange },
  askApolloInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10 },
  askApolloInputText: { flex: 1, fontSize: 14, color: C.textSecondary },

  // Go To Top
  goTopButton: { position: 'absolute', bottom: 80, alignSelf: 'center', left: SCREEN_WIDTH / 2 - 50, flexDirection: 'row', alignItems: 'center', backgroundColor: C.primaryTeal, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, elevation: 6, gap: 4 },
  goTopText: { fontSize: 12, fontWeight: '600', color: '#FFF' },
});
