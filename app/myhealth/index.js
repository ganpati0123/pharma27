/**
 * ============================================================================
 * MY HEALTH TAB - PREMIUM ROYAL HEALTH DASHBOARD
 * ============================================================================
 * A comprehensive health dashboard with user profile, search, health insights,
 * quick categories, health score, recommended tests, vitals tracker, BMI,
 * WhatsApp upload, appointments, family profiles, goals, tips, wellness,
 * emergency contacts, help & support, and footer.
 * ============================================================================
 */

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#6B4C9A',
  primaryLight: '#8B6CBF',
  primaryDark: '#4A3570',
  accent: '#FF6B35',
  green: '#00A651',
  gold: '#FFD700',
  red: '#E74C3C',
  blue: '#0088FF',
  teal: '#00BCD4',
  purple: '#9C27B0',
  white: '#FFFFFF',
  background: '#F5F5F8',
  cardWhite: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  border: '#E8E8F0',
  divider: '#EBEBF5',
  shadow: 'rgba(100, 80, 160, 0.12)',
};

/* ==================== USER PROFILE HEADER ==================== */
const UserProfileHeader = React.memo(() => {
  return (
    <LinearGradient colors={['#6B4C9A', '#8B6CBF']} style={styles.profileHeader}>
      <SafeAreaView>
        <View style={styles.profileHeaderContent}>
          <View style={styles.profileHeaderLeft}>
            <Text style={styles.profileHeaderLabel}>Showing Records Of</Text>
            <View style={styles.profileHeaderNameRow}>
              <View style={styles.profileAvatar}>
                <Ionicons name="person" size={20} color={COLORS.primary} />
              </View>
              <Text style={styles.profileHeaderName}>Ganpati</Text>
              <Ionicons name="chevron-down" size={16} color={COLORS.white} />
            </View>
          </View>
          <View style={styles.profileHeaderRight}>
            <TouchableOpacity style={styles.profileHeaderIcon}>
              <Ionicons name="help-circle-outline" size={26} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileHeaderIcon}>
              <Ionicons name="person-circle-outline" size={26} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
});

/* ==================== SEARCH BAR ==================== */
const SearchBar = React.memo(() => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={22} color={COLORS.accent} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Record"
          placeholderTextColor={COLORS.textTertiary}
          value={searchText}
          onChangeText={setSearchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close-circle" size={20} color={COLORS.textTertiary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

/* ==================== HEALTH INSIGHTS BANNER ==================== */
const HealthInsightsBanner = React.memo(() => {
  return (
    <View style={styles.insightsBanner}>
      <LinearGradient
        colors={['#F0E6FF', '#E8D5FF', '#F5EEFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.insightsBannerGradient}
      >
        <View style={styles.insightsBannerLeft}>
          <View style={styles.insightsBannerIconContainer}>
            <Ionicons name="body" size={40} color={COLORS.primary} />
          </View>
        </View>
        <View style={styles.insightsBannerContent}>
          <Text style={styles.insightsBannerIntro}>INTRODUCING</Text>
          <Text style={styles.insightsBannerTitle}>HEALTH INSIGHTS</Text>
          <Text style={styles.insightsBannerSubtitle}>Your Health Data Simplified</Text>
          <TouchableOpacity style={styles.insightsBannerButton}>
            <Text style={styles.insightsBannerButtonText}>Unlock Insights</Text>
            <Ionicons name="arrow-forward-circle" size={18} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.insightsBannerRight}>
          <View style={styles.insightsBannerDecoIcon}>
            <Ionicons name="bar-chart" size={20} color={COLORS.primaryLight} />
          </View>
          <View style={[styles.insightsBannerDecoIcon, { marginTop: 8 }]}>
            <Ionicons name="shield-checkmark" size={20} color={COLORS.green} />
          </View>
          <View style={[styles.insightsBannerDecoIcon, { marginTop: 8 }]}>
            <Ionicons name="sparkles" size={20} color={COLORS.gold} />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
});

/* ==================== QUICK ACCESS CATEGORIES ==================== */
const QuickAccessCategories = React.memo(() => {
  const categories = useMemo(() => [
    { id: 'prescriptions', icon: 'document-text', label: 'My\nPrescriptions', color: COLORS.primary, bgColor: '#F0E6FF' },
    { id: 'reports', icon: 'flask', label: 'Test\nReports', color: COLORS.blue, bgColor: '#E6F3FF' },
    { id: 'bills', icon: 'receipt', label: 'Bills', color: COLORS.green, bgColor: '#E6FFE6' },
    { id: 'gmail', icon: 'mail', label: 'Fetched\nfrom Gmail', color: COLORS.red, bgColor: '#FFE6E6' },
    { id: 'insurance', icon: 'shield-checkmark', label: 'Insurance\nDocs', color: COLORS.teal, bgColor: '#E0F7FA' },
    { id: 'xrays', icon: 'scan', label: 'X-Rays &\nScans', color: COLORS.accent, bgColor: '#FFF0E6' },
    { id: 'vaccination', icon: 'medkit', label: 'Vaccination\nRecords', color: '#9C27B0', bgColor: '#F3E5F5' },
    { id: 'dental', icon: 'happy', label: 'Dental\nRecords', color: '#00BCD4', bgColor: '#E0F7FA' },
  ], []);

  return (
    <View style={styles.categoriesSection}>
      <View style={styles.categoriesSectionHeader}>
        <Text style={styles.categoriesSectionTitle}>Your Health at Your Fingertips</Text>
        <TouchableOpacity>
          <Text style={styles.categoriesViewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScrollContent}>
        {categories.map((cat) => (
          <TouchableOpacity key={cat.id} style={styles.categoryItem} activeOpacity={0.7}>
            <View style={[styles.categoryIconContainer, { backgroundColor: cat.bgColor }]}>
              <Ionicons name={cat.icon} size={28} color={cat.color} />
            </View>
            <Text style={styles.categoryLabel}>{cat.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== HEALTH SCORE CARD ==================== */
const HealthScoreCard = React.memo(() => {
  return (
    <View style={styles.healthScoreSection}>
      <Text style={styles.sectionTitle}>Your Health Score</Text>
      <View style={styles.healthScoreCard}>
        <LinearGradient colors={['#667eea', '#764ba2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.healthScoreGradient}>
          <View style={styles.healthScoreTop}>
            <View style={styles.healthScoreCircle}>
              <Text style={styles.healthScoreNumber}>78</Text>
              <Text style={styles.healthScoreOutOf}>/100</Text>
            </View>
            <View style={styles.healthScoreInfo}>
              <Text style={styles.healthScoreLabel}>Overall Health</Text>
              <Text style={styles.healthScoreStatus}>Good</Text>
              <Text style={styles.healthScoreDesc}>Based on your recent health records and vitals tracking</Text>
            </View>
          </View>
          <View style={styles.healthScoreBreakdown}>
            {[
              { icon: 'heart', label: 'Heart', value: '85%', color: '#FF6B6B' },
              { icon: 'fitness', label: 'Fitness', value: '72%', color: '#4DA6FF' },
              { icon: 'moon', label: 'Sleep', value: '68%', color: '#B388FF' },
              { icon: 'nutrition', label: 'Diet', value: '80%', color: '#69F0AE' },
            ].map((item) => (
              <View key={item.label} style={styles.healthScoreItem}>
                <Ionicons name={item.icon} size={16} color={item.color} />
                <Text style={styles.healthScoreItemLabel}>{item.label}</Text>
                <Text style={styles.healthScoreItemValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== RECOMMENDED TESTS ==================== */
const RecommendedTests = React.memo(() => {
  const tests = useMemo(() => [
    { id: '1', name: 'Lipid Profile Test', includes: 'LDL CHOLESTEROL, VLDL CHOLESTEROL', moreCount: 6, description: 'A lipid profile measures cholesterol and triglycerides, spotting imbalances before they harm your heart. For men in their 20s, it\'s an early step to protect long-term cardiovascular...', price: 499, originalPrice: 899, discount: '44% OFF', icon: 'water', color: COLORS.blue },
    { id: '2', name: 'Complete Blood Count', includes: 'RBC, WBC, PLATELETS', moreCount: 12, description: 'A CBC provides a comprehensive look at your blood cells, helping detect infections, anemia, and other conditions early for proactive health management...', price: 399, originalPrice: 699, discount: '43% OFF', icon: 'water', color: COLORS.red },
    { id: '3', name: 'Thyroid Function Test', includes: 'TSH, T3, T4', moreCount: 4, description: 'Monitor your thyroid gland function to detect hypothyroidism or hyperthyroidism early. Essential for maintaining metabolism and energy levels...', price: 599, originalPrice: 999, discount: '40% OFF', icon: 'pulse', color: COLORS.purple },
    { id: '4', name: 'HbA1c Test', includes: 'GLYCATED HEMOGLOBIN', moreCount: 2, description: 'Measures your average blood sugar over the past 2-3 months. Critical for diabetes monitoring and prevention of long-term complications...', price: 449, originalPrice: 799, discount: '44% OFF', icon: 'analytics', color: COLORS.accent },
  ], []);

  return (
    <View style={styles.testsSection}>
      <Text style={styles.sectionTitle}>Tests you might need today</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.testsScrollContent} snapToInterval={SCREEN_WIDTH * 0.8 + 16} decelerationRate="fast">
        {tests.map((test) => (
          <View key={test.id} style={styles.testCard}>
            <View style={styles.testCardHeader}>
              <View style={[styles.testIconBg, { backgroundColor: test.color + '20' }]}>
                <Ionicons name={test.icon} size={24} color={test.color} />
              </View>
              <View style={styles.testCardHeaderText}>
                <Text style={styles.testName}>{test.name}</Text>
                <Text style={styles.testIncludes}>Includes {test.includes} +{test.moreCount} more</Text>
              </View>
            </View>
            <Text style={styles.testDescription} numberOfLines={3}>{test.description}</Text>
            <View style={styles.testPriceRow}>
              <Text style={styles.testPrice}>&#8377;{test.price}</Text>
              <Text style={styles.testOriginalPrice}>&#8377;{test.originalPrice}</Text>
              <View style={styles.testDiscountBadge}>
                <Text style={styles.testDiscountText}>{test.discount}</Text>
              </View>
            </View>
            <View style={styles.testRecommendedRow}>
              <Ionicons name="person-circle" size={18} color={COLORS.primary} />
              <Text style={styles.testRecommendedLabel}>RECOMMENDED FOR</Text>
              <View style={styles.testRecommendedAvatar}>
                <Ionicons name="person" size={12} color={COLORS.white} />
              </View>
              <Text style={styles.testRecommendedName}>Ganpati</Text>
            </View>
            <TouchableOpacity style={styles.testBookButton}>
              <Text style={styles.testBookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.viewAllTestsButton}>
        <Text style={styles.viewAllTestsText}>View all tests</Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.primary} />
      </TouchableOpacity>
    </View>
  );
});

/* ==================== VITALS TRACKER ==================== */
const VitalsTracker = React.memo(() => {
  const vitals = useMemo(() => [
    { id: 'bp', label: 'Blood Pressure', value: '120/80', unit: 'mmHg', icon: 'heart', color: '#E74C3C', trend: 'stable', lastUpdated: '2 days ago', normal: '90/60 - 120/80' },
    { id: 'sugar', label: 'Blood Sugar', value: '95', unit: 'mg/dL', icon: 'water', color: '#3498DB', trend: 'down', lastUpdated: '1 day ago', normal: '70 - 100' },
    { id: 'weight', label: 'Weight', value: '72', unit: 'kg', icon: 'scale', color: '#2ECC71', trend: 'stable', lastUpdated: '3 days ago', normal: 'BMI 18.5 - 24.9' },
    { id: 'temp', label: 'Temperature', value: '98.4', unit: 'F', icon: 'thermometer', color: '#F39C12', trend: 'stable', lastUpdated: '1 day ago', normal: '97.8 - 99.1' },
    { id: 'oxygen', label: 'SpO2', value: '98', unit: '%', icon: 'pulse', color: '#9B59B6', trend: 'up', lastUpdated: '6 hours ago', normal: '95 - 100' },
    { id: 'heartrate', label: 'Heart Rate', value: '72', unit: 'bpm', icon: 'fitness', color: '#E91E63', trend: 'stable', lastUpdated: '6 hours ago', normal: '60 - 100' },
  ], []);

  const getTrendIcon = (trend) => {
    if (trend === 'up') return 'trending-up';
    if (trend === 'down') return 'trending-down';
    return 'remove';
  };
  const getTrendColor = (trend) => {
    if (trend === 'up') return '#2ECC71';
    if (trend === 'down') return '#3498DB';
    return '#95A5A6';
  };

  return (
    <View style={styles.vitalsSection}>
      <View style={styles.vitalsSectionHeader}>
        <Text style={styles.sectionTitle}>Vitals Dashboard</Text>
        <TouchableOpacity style={styles.vitalsAddButton}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          <Text style={styles.vitalsAddText}>Log Vitals</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.vitalsGrid}>
        {vitals.map((vital) => (
          <TouchableOpacity key={vital.id} style={styles.vitalCard} activeOpacity={0.7}>
            <View style={styles.vitalCardTop}>
              <View style={[styles.vitalIconBg, { backgroundColor: vital.color + '15' }]}>
                <Ionicons name={vital.icon} size={20} color={vital.color} />
              </View>
              <View style={[styles.vitalTrendBadge, { backgroundColor: getTrendColor(vital.trend) + '15' }]}>
                <Ionicons name={getTrendIcon(vital.trend)} size={14} color={getTrendColor(vital.trend)} />
              </View>
            </View>
            <Text style={styles.vitalLabel}>{vital.label}</Text>
            <View style={styles.vitalValueRow}>
              <Text style={[styles.vitalValue, { color: vital.color }]}>{vital.value}</Text>
              <Text style={styles.vitalUnit}>{vital.unit}</Text>
            </View>
            <Text style={styles.vitalNormal}>Normal: {vital.normal}</Text>
            <Text style={styles.vitalUpdated}>{vital.lastUpdated}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

/* ==================== BMI SECTION ==================== */
const BMISection = React.memo(() => {
  return (
    <View style={styles.bmiSection}>
      <Text style={styles.sectionTitle}>BMI Calculator</Text>
      <View style={styles.bmiCard}>
        <LinearGradient colors={['#E8F5E9', '#C8E6C9', '#A5D6A7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.bmiGradient}>
          <View style={styles.bmiTop}>
            <View style={styles.bmiCircle}>
              <Text style={styles.bmiValue}>23.4</Text>
              <Text style={styles.bmiLabel}>BMI</Text>
            </View>
            <View style={styles.bmiInfo}>
              <Text style={[styles.bmiCategory, { color: '#2ECC71' }]}>Normal Weight</Text>
              <Text style={styles.bmiDesc}>Your BMI is within the healthy range. Keep maintaining your current lifestyle and diet habits.</Text>
            </View>
          </View>
          <View style={styles.bmiScale}>
            <View style={styles.bmiScaleBar}>
              <View style={[styles.bmiScaleSegment, { flex: 1, backgroundColor: '#4FC3F7' }]} />
              <View style={[styles.bmiScaleSegment, { flex: 1, backgroundColor: '#81C784' }]} />
              <View style={[styles.bmiScaleSegment, { flex: 1, backgroundColor: '#FFD54F' }]} />
              <View style={[styles.bmiScaleSegment, { flex: 1, backgroundColor: '#FF8A65' }]} />
              <View style={[styles.bmiScaleSegment, { flex: 1, backgroundColor: '#E57373' }]} />
            </View>
            <View style={styles.bmiScaleLabels}>
              <Text style={styles.bmiScaleLabel}>Under</Text>
              <Text style={styles.bmiScaleLabel}>Normal</Text>
              <Text style={styles.bmiScaleLabel}>Over</Text>
              <Text style={styles.bmiScaleLabel}>Obese I</Text>
              <Text style={styles.bmiScaleLabel}>Obese II</Text>
            </View>
          </View>
          <View style={styles.bmiStats}>
            <View style={styles.bmiStatItem}>
              <Text style={styles.bmiStatValue}>72 kg</Text>
              <Text style={styles.bmiStatLabel}>Weight</Text>
            </View>
            <View style={styles.bmiStatDivider} />
            <View style={styles.bmiStatItem}>
              <Text style={styles.bmiStatValue}>175 cm</Text>
              <Text style={styles.bmiStatLabel}>Height</Text>
            </View>
            <View style={styles.bmiStatDivider} />
            <View style={styles.bmiStatItem}>
              <Text style={styles.bmiStatValue}>25 yr</Text>
              <Text style={styles.bmiStatLabel}>Age</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== WHATSAPP UPLOAD ==================== */
const WhatsAppUpload = React.memo(() => {
  return (
    <View style={styles.whatsappSection}>
      <View style={styles.whatsappCard}>
        <LinearGradient colors={['#1B5E20', '#2E7D32', '#388E3C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.whatsappGradient}>
          <View style={styles.whatsappContent}>
            <View style={styles.whatsappIconContainer}>
              <Ionicons name="logo-whatsapp" size={48} color={COLORS.white} />
            </View>
            <Text style={styles.whatsappTitle}>Easily Upload Records via Whatsapp</Text>
            <Text style={styles.whatsappDesc}>Never lose a record again! Just take a picture and upload it via Whatsapp</Text>
            <TouchableOpacity style={styles.whatsappButton}>
              <Text style={styles.whatsappButtonText}>Try Now</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== UPCOMING APPOINTMENTS ==================== */
const UpcomingAppointments = React.memo(() => {
  const appointments = useMemo(() => [
    { id: '1', doctor: 'Dr. Priya Sharma', specialty: 'Cardiologist', date: 'Mar 15, 2026', time: '10:30 AM', type: 'In-Person', status: 'Confirmed', icon: 'heart', color: '#E74C3C' },
    { id: '2', doctor: 'Dr. Rahul Verma', specialty: 'Dermatologist', date: 'Mar 18, 2026', time: '2:00 PM', type: 'Video Call', status: 'Pending', icon: 'videocam', color: '#3498DB' },
    { id: '3', doctor: 'Dr. Anita Singh', specialty: 'General Physician', date: 'Mar 22, 2026', time: '11:00 AM', type: 'In-Person', status: 'Confirmed', icon: 'medkit', color: '#2ECC71' },
  ], []);

  return (
    <View style={styles.appointmentsSection}>
      <View style={styles.appointmentsSectionHeader}>
        <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
        <TouchableOpacity><Text style={styles.appointmentsViewAll}>See All</Text></TouchableOpacity>
      </View>
      {appointments.map((apt) => (
        <TouchableOpacity key={apt.id} style={styles.appointmentCard} activeOpacity={0.7}>
          <View style={[styles.appointmentIconBg, { backgroundColor: apt.color + '15' }]}>
            <Ionicons name={apt.icon} size={24} color={apt.color} />
          </View>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentDoctor}>{apt.doctor}</Text>
            <Text style={styles.appointmentSpecialty}>{apt.specialty}</Text>
            <View style={styles.appointmentTimeRow}>
              <Ionicons name="calendar" size={12} color={COLORS.textTertiary} />
              <Text style={styles.appointmentDate}>{apt.date}</Text>
              <Ionicons name="time" size={12} color={COLORS.textTertiary} />
              <Text style={styles.appointmentTime}>{apt.time}</Text>
            </View>
          </View>
          <View style={styles.appointmentRight}>
            <View style={[styles.appointmentTypeBadge, { backgroundColor: apt.type === 'Video Call' ? '#E3F2FD' : '#E8F5E9' }]}>
              <Ionicons name={apt.type === 'Video Call' ? 'videocam' : 'location'} size={10} color={apt.type === 'Video Call' ? '#1565C0' : '#2E7D32'} />
              <Text style={[styles.appointmentTypeText, { color: apt.type === 'Video Call' ? '#1565C0' : '#2E7D32' }]}>{apt.type}</Text>
            </View>
            <View style={[styles.appointmentStatusBadge, { backgroundColor: apt.status === 'Confirmed' ? '#E8F5E9' : '#FFF3E0' }]}>
              <Text style={[styles.appointmentStatusText, { color: apt.status === 'Confirmed' ? '#2E7D32' : '#E65100' }]}>{apt.status}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});

/* ==================== FAMILY PROFILES ==================== */
const FamilyProfiles = React.memo(() => {
  const familyMembers = useMemo(() => [
    { id: '1', name: 'Ganpati', relation: 'Self', healthScore: 78, avatar: 'person', color: '#6B4C9A', records: 12 },
    { id: '2', name: 'Priya', relation: 'Spouse', healthScore: 85, avatar: 'person', color: '#E91E63', records: 8 },
    { id: '3', name: 'Raj Kumar', relation: 'Father', healthScore: 65, avatar: 'person', color: '#FF9800', records: 24 },
    { id: '4', name: 'Sunita', relation: 'Mother', healthScore: 70, avatar: 'person', color: '#4CAF50', records: 18 },
  ], []);

  return (
    <View style={styles.familySection}>
      <View style={styles.familySectionHeader}>
        <Text style={styles.sectionTitle}>Family Health Profiles</Text>
        <TouchableOpacity style={styles.addFamilyButton}>
          <Ionicons name="add-circle" size={24} color={COLORS.primary} />
          <Text style={styles.addFamilyText}>Add Member</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.familyScrollContent}>
        {familyMembers.map((member) => (
          <TouchableOpacity key={member.id} style={styles.familyCard} activeOpacity={0.7}>
            <View style={[styles.familyAvatarContainer, { borderColor: member.color }]}>
              <View style={[styles.familyAvatar, { backgroundColor: member.color + '20' }]}>
                <Ionicons name={member.avatar} size={28} color={member.color} />
              </View>
            </View>
            <Text style={styles.familyName}>{member.name}</Text>
            <Text style={styles.familyRelation}>{member.relation}</Text>
            <View style={styles.familyDivider} />
            <View style={styles.familyStatsRow}>
              <View style={styles.familyStat}>
                <Text style={styles.familyStatValue}>{member.healthScore}%</Text>
                <Text style={styles.familyStatLabel}>Score</Text>
              </View>
              <View style={styles.familyStatDividerLine} />
              <View style={styles.familyStat}>
                <Text style={styles.familyStatValue}>{member.records}</Text>
                <Text style={styles.familyStatLabel}>Records</Text>
              </View>
            </View>
            <TouchableOpacity style={[styles.familyViewButton, { borderColor: member.color }]}>
              <Text style={[styles.familyViewText, { color: member.color }]}>View Profile</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== HEALTH GOALS ==================== */
const HealthGoals = React.memo(() => {
  const goals = useMemo(() => [
    { id: '1', title: 'Walk 10,000 Steps Daily', progress: 0.72, current: '7,200', target: '10,000', unit: 'steps', icon: 'walk', color: '#4CAF50', streak: 5 },
    { id: '2', title: 'Drink 8 Glasses of Water', progress: 0.625, current: '5', target: '8', unit: 'glasses', icon: 'water', color: '#2196F3', streak: 12 },
    { id: '3', title: 'Sleep 8 Hours', progress: 0.875, current: '7', target: '8', unit: 'hours', icon: 'moon', color: '#9C27B0', streak: 3 },
    { id: '4', title: 'Meditate 15 Minutes', progress: 1.0, current: '15', target: '15', unit: 'min', icon: 'flower', color: '#FF9800', streak: 8 },
    { id: '5', title: 'Eat 5 Fruits & Vegetables', progress: 0.6, current: '3', target: '5', unit: 'servings', icon: 'nutrition', color: '#E91E63', streak: 2 },
  ], []);

  return (
    <View style={styles.goalsSection}>
      <View style={styles.goalsSectionHeader}>
        <Text style={styles.sectionTitle}>Health Goals</Text>
        <TouchableOpacity><Text style={styles.goalsEditText}>Edit Goals</Text></TouchableOpacity>
      </View>
      {goals.map((goal) => (
        <View key={goal.id} style={styles.goalCard}>
          <View style={styles.goalCardTop}>
            <View style={[styles.goalIconBg, { backgroundColor: goal.color + '15' }]}>
              <Ionicons name={goal.icon} size={22} color={goal.color} />
            </View>
            <View style={styles.goalInfo}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <Text style={styles.goalProgressText}>{goal.current} / {goal.target} {goal.unit}</Text>
            </View>
            <View style={styles.goalStreakBadge}>
              <Ionicons name="flame" size={14} color="#FF6B35" />
              <Text style={styles.goalStreakText}>{goal.streak}</Text>
            </View>
          </View>
          <View style={styles.goalProgressBarContainer}>
            <View style={styles.goalProgressBarBg}>
              <View style={[styles.goalProgressBarFill, { width: `${Math.min(goal.progress * 100, 100)}%`, backgroundColor: goal.color }]} />
            </View>
            <Text style={[styles.goalPercentage, { color: goal.color }]}>{Math.round(goal.progress * 100)}%</Text>
          </View>
        </View>
      ))}
    </View>
  );
});

/* ==================== HEALTH TIPS ==================== */
const HealthTips = React.memo(() => {
  const tips = useMemo(() => [
    { id: '1', title: 'Morning Hydration Ritual', description: 'Start your day with warm lemon water to boost metabolism, aid digestion, and kickstart your immune system. Add a pinch of turmeric for anti-inflammatory benefits.', icon: 'water', color: '#2196F3', category: 'Wellness', readTime: '3 min read' },
    { id: '2', title: 'The 20-20-20 Eye Rule', description: 'Every 20 minutes, look at something 20 feet away for 20 seconds. This simple practice prevents digital eye strain and maintains healthy vision.', icon: 'eye', color: '#4CAF50', category: 'Eye Care', readTime: '2 min read' },
    { id: '3', title: 'Power of Deep Breathing', description: 'Practice 4-7-8 breathing technique: Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Reduces anxiety and improves sleep.', icon: 'leaf', color: '#9C27B0', category: 'Mental Health', readTime: '4 min read' },
    { id: '4', title: 'Heart-Healthy Diet Tips', description: 'Include omega-3 rich foods like walnuts, flaxseeds, and fatty fish in your daily diet. Reduce sodium and increase potassium intake.', icon: 'heart', color: '#E91E63', category: 'Heart Health', readTime: '5 min read' },
    { id: '5', title: 'Vitamin D & Immunity', description: 'Get 15-20 minutes of morning sunlight daily for natural Vitamin D synthesis. Strengthens bones, boosts immunity, and improves mood.', icon: 'sunny', color: '#FF9800', category: 'Immunity', readTime: '3 min read' },
    { id: '6', title: 'Posture Perfect', description: 'Maintain proper posture while sitting: feet flat, knees at 90 degrees, screen at eye level. Take standing breaks every 30 minutes.', icon: 'body', color: '#00BCD4', category: 'Ergonomics', readTime: '4 min read' },
  ], []);

  return (
    <View style={styles.tipsSection}>
      <View style={styles.tipsSectionHeader}>
        <Text style={styles.sectionTitle}>Health Tips & Articles</Text>
        <TouchableOpacity><Text style={styles.tipsViewAll}>View All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tipsScrollContent}>
        {tips.map((tip) => (
          <TouchableOpacity key={tip.id} style={styles.tipCard} activeOpacity={0.7}>
            <View style={[styles.tipIconBg, { backgroundColor: tip.color + '15' }]}>
              <Ionicons name={tip.icon} size={28} color={tip.color} />
            </View>
            <View style={styles.tipCategoryRow}>
              <Text style={[styles.tipCategory, { color: tip.color }]}>{tip.category}</Text>
              <Text style={styles.tipReadTime}>{tip.readTime}</Text>
            </View>
            <Text style={styles.tipTitle}>{tip.title}</Text>
            <Text style={styles.tipDescription} numberOfLines={3}>{tip.description}</Text>
            <TouchableOpacity style={styles.tipReadMore}>
              <Text style={[styles.tipReadMoreText, { color: tip.color }]}>Read More</Text>
              <Ionicons name="arrow-forward" size={14} color={tip.color} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== WELLNESS PROGRAMS ==================== */
const WellnessPrograms = React.memo(() => {
  const programs = useMemo(() => [
    { id: '1', title: 'Weight Management Pro', duration: '12 Weeks', sessions: 36, price: 2999, rating: 4.8, enrolled: '2.5K+', icon: 'fitness', color: '#4CAF50', description: 'Personalized diet plans, workout routines, and weekly consultations with certified nutritionists.' },
    { id: '2', title: 'Stress-Free Living', duration: '8 Weeks', sessions: 24, price: 1999, rating: 4.9, enrolled: '3.1K+', icon: 'leaf', color: '#9C27B0', description: 'Guided meditation, yoga sessions, breathing exercises, and CBT techniques for stress management.' },
    { id: '3', title: 'Heart Health Program', duration: '16 Weeks', sessions: 48, price: 3999, rating: 4.7, enrolled: '1.8K+', icon: 'heart', color: '#E91E63', description: 'Comprehensive cardiovascular health program with diet planning, exercise regimen, and monitoring.' },
    { id: '4', title: 'Diabetes Reversal', duration: '24 Weeks', sessions: 72, price: 4999, rating: 4.6, enrolled: '1.2K+', icon: 'analytics', color: '#FF9800', description: 'Evidence-based program to manage and potentially reverse Type 2 diabetes through lifestyle changes.' },
  ], []);

  return (
    <View style={styles.wellnessSection}>
      <View style={styles.wellnessSectionHeader}>
        <Text style={styles.sectionTitle}>Wellness Programs</Text>
        <TouchableOpacity><Text style={styles.wellnessViewAll}>Explore All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wellnessScrollContent}>
        {programs.map((program) => (
          <View key={program.id} style={styles.wellnessCard}>
            <LinearGradient colors={[program.color + '10', program.color + '05']} style={styles.wellnessCardGradient}>
              <View style={styles.wellnessCardHeader}>
                <View style={[styles.wellnessIconBg, { backgroundColor: program.color + '20' }]}>
                  <Ionicons name={program.icon} size={24} color={program.color} />
                </View>
                <View style={styles.wellnessRatingBadge}>
                  <Ionicons name="star" size={12} color="#FFD700" />
                  <Text style={styles.wellnessRatingText}>{program.rating}</Text>
                </View>
              </View>
              <Text style={styles.wellnessTitle}>{program.title}</Text>
              <Text style={styles.wellnessDescription} numberOfLines={2}>{program.description}</Text>
              <View style={styles.wellnessStatsRow}>
                <View style={styles.wellnessStat}><Ionicons name="time" size={14} color={COLORS.textTertiary} /><Text style={styles.wellnessStatText}>{program.duration}</Text></View>
                <View style={styles.wellnessStat}><Ionicons name="videocam" size={14} color={COLORS.textTertiary} /><Text style={styles.wellnessStatText}>{program.sessions} Sessions</Text></View>
              </View>
              <View style={styles.wellnessBottomRow}>
                <View>
                  <Text style={styles.wellnessPrice}>&#8377;{program.price}</Text>
                  <Text style={styles.wellnessEnrolled}>{program.enrolled} enrolled</Text>
                </View>
                <TouchableOpacity style={[styles.wellnessJoinButton, { backgroundColor: program.color }]}>
                  <Text style={styles.wellnessJoinText}>Join Now</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== EMERGENCY CONTACTS ==================== */
const EmergencyContacts = React.memo(() => {
  const contacts = useMemo(() => [
    { id: '1', name: 'Emergency Ambulance', number: '108', icon: 'car', color: '#E74C3C', type: 'Emergency' },
    { id: '2', name: 'Apollo 24|7 Helpline', number: '1860-500-1066', icon: 'call', color: '#6B4C9A', type: 'Helpline' },
    { id: '3', name: 'Poison Control', number: '1800-11-6117', icon: 'warning', color: '#FF9800', type: 'Emergency' },
    { id: '4', name: 'Mental Health Helpline', number: '08046110007', icon: 'heart', color: '#2196F3', type: 'Support' },
  ], []);

  return (
    <View style={styles.emergencySection}>
      <Text style={styles.sectionTitle}>Emergency Contacts</Text>
      <View style={styles.emergencyGrid}>
        {contacts.map((contact) => (
          <TouchableOpacity key={contact.id} style={styles.emergencyCard} activeOpacity={0.7}>
            <View style={[styles.emergencyIconBg, { backgroundColor: contact.color + '15' }]}>
              <Ionicons name={contact.icon} size={24} color={contact.color} />
            </View>
            <Text style={styles.emergencyName}>{contact.name}</Text>
            <Text style={[styles.emergencyNumber, { color: contact.color }]}>{contact.number}</Text>
            <View style={[styles.emergencyTypeBadge, { backgroundColor: contact.color + '15' }]}>
              <Text style={[styles.emergencyTypeText, { color: contact.color }]}>{contact.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

/* ==================== HELP & SUPPORT ==================== */
const HelpSupport = React.memo(() => {
  const helpItems = useMemo(() => [
    { id: '1', title: 'Raise an issue', icon: 'help-circle', color: COLORS.primary },
    { id: '2', title: 'FAQs', icon: 'chatbubble-ellipses', color: COLORS.blue },
    { id: '3', title: 'Contact Us', icon: 'call', color: COLORS.green },
    { id: '4', title: 'Privacy Policy', icon: 'lock-closed', color: COLORS.accent },
  ], []);

  return (
    <View style={styles.helpSection}>
      <Text style={styles.sectionTitle}>Help & Support</Text>
      {helpItems.map((item) => (
        <TouchableOpacity key={item.id} style={styles.helpItem} activeOpacity={0.7}>
          <View style={[styles.helpIconBg, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon} size={22} color={item.color} />
          </View>
          <Text style={styles.helpItemTitle}>{item.title}</Text>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
        </TouchableOpacity>
      ))}
    </View>
  );
});

/* ==================== FOOTER ==================== */
const HealthFooter = React.memo(() => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerDivider} />
      <Text style={styles.footerBrand}>Apollo 24|7</Text>
      <Text style={styles.footerVersion}>Version 8.2.1</Text>
      <Text style={styles.footerCopyright}>Trusted by 50M+ users across India</Text>
      <Text style={styles.footerTagline}>Your Health, Our Priority</Text>
      <View style={styles.footerBadges}>
        <View style={styles.footerBadge}><Ionicons name="shield-checkmark" size={16} color={COLORS.green} /><Text style={styles.footerBadgeText}>HIPAA Compliant</Text></View>
        <View style={styles.footerBadge}><Ionicons name="lock-closed" size={16} color={COLORS.primary} /><Text style={styles.footerBadgeText}>256-bit Encrypted</Text></View>
        <View style={styles.footerBadge}><Ionicons name="checkmark-circle" size={16} color={COLORS.blue} /><Text style={styles.footerBadgeText}>ISO 27001</Text></View>
      </View>
    </View>
  );
});

/* ==================== MAIN COMPONENT ==================== */
export default function MyHealthIndex() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <UserProfileHeader />
      <SearchBar />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true} contentContainerStyle={styles.scrollContent}>
        <HealthInsightsBanner />
        <QuickAccessCategories />
        <HealthScoreCard />
        <RecommendedTests />
        <VitalsTracker />
        <BMISection />
        <WhatsAppUpload />
        <UpcomingAppointments />
        <FamilyProfiles />
        <HealthGoals />
        <HealthTips />
        <WellnessPrograms />
        <EmergencyContacts />
        <HelpSupport />
        <HealthFooter />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  profileHeader: { paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0 },
  profileHeaderContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  profileHeaderLeft: { flex: 1 },
  profileHeaderLabel: { fontSize: 12, color: 'rgba(255,255,255,0.7)', letterSpacing: 0.5 },
  profileHeaderNameRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  profileAvatar: { width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', marginRight: 8 },
  profileHeaderName: { fontSize: 18, fontWeight: '700', color: '#fff', marginRight: 6 },
  profileHeaderRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  profileHeaderIcon: { padding: 4 },
  searchContainer: { paddingHorizontal: 20, paddingVertical: 12, backgroundColor: '#fff' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8F8FC', borderRadius: 30, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.textPrimary, marginLeft: 10, paddingVertical: 0 },
  insightsBanner: { marginHorizontal: 20, marginTop: 16, borderRadius: 16, overflow: 'hidden' },
  insightsBannerGradient: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  insightsBannerLeft: { marginRight: 12 },
  insightsBannerIconContainer: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(107,76,154,0.15)', justifyContent: 'center', alignItems: 'center' },
  insightsBannerContent: { flex: 1 },
  insightsBannerIntro: { fontSize: 10, fontWeight: '800', color: COLORS.primary, letterSpacing: 2 },
  insightsBannerTitle: { fontSize: 18, fontWeight: '800', color: COLORS.primaryDark, marginTop: 2 },
  insightsBannerSubtitle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  insightsBannerButton: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6 },
  insightsBannerButtonText: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  insightsBannerRight: { alignItems: 'center', gap: 4 },
  insightsBannerDecoIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center' },
  categoriesSection: { marginTop: 24 },
  categoriesSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  categoriesSectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  categoriesViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  categoriesScrollContent: { paddingHorizontal: 20, gap: 16 },
  categoryItem: { alignItems: 'center', width: 72 },
  categoryIconContainer: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  categoryLabel: { fontSize: 11, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, paddingHorizontal: 20 },
  healthScoreSection: { marginTop: 28 },
  healthScoreCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 20, overflow: 'hidden' },
  healthScoreGradient: { padding: 24 },
  healthScoreTop: { flexDirection: 'row', alignItems: 'center' },
  healthScoreCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 20, borderWidth: 3, borderColor: 'rgba(255,255,255,0.4)' },
  healthScoreNumber: { fontSize: 28, fontWeight: '800', color: '#fff' },
  healthScoreOutOf: { fontSize: 12, color: 'rgba(255,255,255,0.7)' },
  healthScoreInfo: { flex: 1 },
  healthScoreLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', fontWeight: '600' },
  healthScoreStatus: { fontSize: 24, fontWeight: '800', color: '#fff' },
  healthScoreDesc: { fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 4, lineHeight: 16 },
  healthScoreBreakdown: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 24, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' },
  healthScoreItem: { alignItems: 'center', gap: 4 },
  healthScoreItemLabel: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  healthScoreItemValue: { fontSize: 16, fontWeight: '700', color: '#fff' },
  testsSection: { marginTop: 28 },
  testsScrollContent: { paddingHorizontal: 20, gap: 16, paddingTop: 16 },
  testCard: { width: SCREEN_WIDTH * 0.8, backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  testCardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  testIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  testCardHeaderText: { flex: 1 },
  testName: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  testIncludes: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  testDescription: { fontSize: 13, color: COLORS.textSecondary, lineHeight: 19, marginBottom: 12 },
  testPriceRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  testPrice: { fontSize: 18, fontWeight: '800', color: COLORS.textPrimary },
  testOriginalPrice: { fontSize: 14, color: COLORS.textTertiary, textDecorationLine: 'line-through' },
  testDiscountBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  testDiscountText: { fontSize: 11, fontWeight: '700', color: '#2E7D32' },
  testRecommendedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  testRecommendedLabel: { fontSize: 10, fontWeight: '600', color: COLORS.textTertiary, letterSpacing: 0.5 },
  testRecommendedAvatar: { width: 20, height: 20, borderRadius: 10, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center' },
  testRecommendedName: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  testBookButton: { backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  testBookButtonText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  viewAllTestsButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, gap: 4 },
  viewAllTestsText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  vitalsSection: { marginTop: 28 },
  vitalsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  vitalsAddButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  vitalsAddText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  vitalsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  vitalCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  vitalCardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  vitalIconBg: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  vitalTrendBadge: { width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  vitalLabel: { fontSize: 12, color: COLORS.textTertiary, marginBottom: 4 },
  vitalValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  vitalValue: { fontSize: 22, fontWeight: '800' },
  vitalUnit: { fontSize: 12, color: COLORS.textTertiary },
  vitalNormal: { fontSize: 10, color: COLORS.textMuted, marginTop: 6 },
  vitalUpdated: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  bmiSection: { marginTop: 28 },
  bmiCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 20, overflow: 'hidden' },
  bmiGradient: { padding: 24 },
  bmiTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  bmiCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.8)', justifyContent: 'center', alignItems: 'center', marginRight: 20, borderWidth: 3, borderColor: '#2ECC71' },
  bmiValue: { fontSize: 24, fontWeight: '800', color: '#2E7D32' },
  bmiLabel: { fontSize: 11, fontWeight: '600', color: '#4CAF50' },
  bmiInfo: { flex: 1 },
  bmiCategory: { fontSize: 20, fontWeight: '700' },
  bmiDesc: { fontSize: 12, color: '#4A6A4A', marginTop: 4, lineHeight: 18 },
  bmiScale: { marginBottom: 20 },
  bmiScaleBar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2 },
  bmiScaleSegment: { borderRadius: 2 },
  bmiScaleLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 },
  bmiScaleLabel: { fontSize: 9, color: '#4A6A4A', fontWeight: '500' },
  bmiStats: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 12, paddingVertical: 16 },
  bmiStatItem: { alignItems: 'center' },
  bmiStatValue: { fontSize: 18, fontWeight: '700', color: '#2E7D32' },
  bmiStatLabel: { fontSize: 11, color: '#4A6A4A', marginTop: 2 },
  bmiStatDivider: { width: 1, backgroundColor: '#C8E6C9' },
  whatsappSection: { marginTop: 28, paddingHorizontal: 20 },
  whatsappCard: { borderRadius: 20, overflow: 'hidden' },
  whatsappGradient: { padding: 28 },
  whatsappContent: { alignItems: 'center' },
  whatsappIconContainer: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  whatsappTitle: { fontSize: 18, fontWeight: '700', color: '#fff', textAlign: 'center', marginBottom: 8 },
  whatsappDesc: { fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  whatsappButton: { backgroundColor: '#fff', borderRadius: 30, paddingHorizontal: 32, paddingVertical: 14 },
  whatsappButtonText: { fontSize: 15, fontWeight: '700', color: '#2E7D32' },
  appointmentsSection: { marginTop: 28 },
  appointmentsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  appointmentsViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  appointmentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 12, borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  appointmentIconBg: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  appointmentInfo: { flex: 1 },
  appointmentDoctor: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  appointmentSpecialty: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  appointmentTimeRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  appointmentDate: { fontSize: 11, color: COLORS.textSecondary, marginRight: 8 },
  appointmentTime: { fontSize: 11, color: COLORS.textSecondary },
  appointmentRight: { alignItems: 'flex-end', gap: 6 },
  appointmentTypeBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, gap: 4 },
  appointmentTypeText: { fontSize: 10, fontWeight: '600' },
  appointmentStatusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  appointmentStatusText: { fontSize: 10, fontWeight: '600' },
  familySection: { marginTop: 28 },
  familySectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  addFamilyButton: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  addFamilyText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  familyScrollContent: { paddingHorizontal: 20, gap: 16 },
  familyCard: { width: 160, backgroundColor: '#fff', borderRadius: 20, padding: 20, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  familyAvatarContainer: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  familyAvatar: { width: 52, height: 52, borderRadius: 26, justifyContent: 'center', alignItems: 'center' },
  familyName: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary },
  familyRelation: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  familyDivider: { width: '80%', height: 1, backgroundColor: COLORS.divider, marginVertical: 12 },
  familyStatsRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  familyStat: { alignItems: 'center' },
  familyStatValue: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  familyStatLabel: { fontSize: 10, color: COLORS.textTertiary },
  familyStatDividerLine: { width: 1, height: 24, backgroundColor: COLORS.divider },
  familyViewButton: { marginTop: 12, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5 },
  familyViewText: { fontSize: 12, fontWeight: '600' },
  goalsSection: { marginTop: 28 },
  goalsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  goalsEditText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  goalCard: { backgroundColor: '#fff', marginHorizontal: 20, marginBottom: 12, borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  goalCardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  goalIconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  goalInfo: { flex: 1 },
  goalTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  goalProgressText: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  goalStreakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  goalStreakText: { fontSize: 12, fontWeight: '700', color: '#FF6B35' },
  goalProgressBarContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalProgressBarBg: { flex: 1, height: 8, borderRadius: 4, backgroundColor: '#F0F0F5', overflow: 'hidden' },
  goalProgressBarFill: { height: '100%', borderRadius: 4 },
  goalPercentage: { fontSize: 12, fontWeight: '700', minWidth: 36, textAlign: 'right' },
  tipsSection: { marginTop: 28 },
  tipsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  tipsViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  tipsScrollContent: { paddingHorizontal: 20, gap: 16 },
  tipCard: { width: 260, backgroundColor: '#fff', borderRadius: 20, padding: 20, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  tipIconBg: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  tipCategoryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  tipCategory: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  tipReadTime: { fontSize: 10, color: COLORS.textTertiary },
  tipTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  tipDescription: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 12 },
  tipReadMore: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  tipReadMoreText: { fontSize: 13, fontWeight: '600' },
  wellnessSection: { marginTop: 28 },
  wellnessSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  wellnessViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  wellnessScrollContent: { paddingHorizontal: 20, gap: 16 },
  wellnessCard: { width: 280, borderRadius: 20, overflow: 'hidden', backgroundColor: '#fff', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  wellnessCardGradient: { padding: 20 },
  wellnessCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  wellnessIconBg: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  wellnessRatingBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFDE7', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, gap: 4 },
  wellnessRatingText: { fontSize: 12, fontWeight: '700', color: '#F57F17' },
  wellnessTitle: { fontSize: 17, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  wellnessDescription: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 12 },
  wellnessStatsRow: { flexDirection: 'row', gap: 16, marginBottom: 16 },
  wellnessStat: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  wellnessStatText: { fontSize: 12, color: COLORS.textSecondary },
  wellnessBottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  wellnessPrice: { fontSize: 20, fontWeight: '800', color: COLORS.textPrimary },
  wellnessEnrolled: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  wellnessJoinButton: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 14 },
  wellnessJoinText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  emergencySection: { marginTop: 28 },
  emergencyGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12, marginTop: 16 },
  emergencyCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  emergencyIconBg: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  emergencyName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 4 },
  emergencyNumber: { fontSize: 14, fontWeight: '700', marginBottom: 8 },
  emergencyTypeBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8 },
  emergencyTypeText: { fontSize: 10, fontWeight: '600' },
  helpSection: { marginTop: 28 },
  helpItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 20, marginTop: 10, borderRadius: 14, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  helpIconBg: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  helpItemTitle: { flex: 1, fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  footer: { alignItems: 'center', paddingVertical: 32, marginTop: 20 },
  footerDivider: { width: 60, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginBottom: 16 },
  footerBrand: { fontSize: 18, fontWeight: '700', color: COLORS.primary },
  footerVersion: { fontSize: 11, color: COLORS.textTertiary, marginTop: 4 },
  footerCopyright: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8 },
  footerTagline: { fontSize: 11, color: COLORS.textTertiary, marginTop: 4, fontStyle: 'italic' },
  footerBadges: { flexDirection: 'row', gap: 16, marginTop: 16 },
  footerBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerBadgeText: { fontSize: 10, color: COLORS.textTertiary, fontWeight: '500' },
});
