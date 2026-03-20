/**
 * ============================================================================
 * VACCINATION RECORDS - IMMUNIZATION HISTORY
 * ============================================================================
 * View and manage all vaccination records and upcoming vaccines
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#6B4C9A',
  green: '#00A651',
  red: '#E74C3C',
  blue: '#0088FF',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function VaccinationRecords() {
  const router = useRouter();

  const vaccinations = [
    { id: 1, name: 'COVID-19 Vaccine', dose: 'Booster', date: 'Jan 15, 2026', provider: 'Apollo Hospital', status: 'completed', nextDue: null, icon: 'medkit' },
    { id: 2, name: 'Influenza (Flu)', dose: 'Annual', date: 'Nov 20, 2025', provider: 'City Clinic', status: 'completed', nextDue: 'Nov 2026', icon: 'water' },
    { id: 3, name: 'Tetanus (TT)', dose: 'Booster', date: 'Mar 10, 2024', provider: 'Government Hospital', status: 'completed', nextDue: 'Mar 2034', icon: 'shield-checkmark' },
    { id: 4, name: 'Hepatitis B', dose: '3rd Dose', date: 'Jun 15, 2023', provider: 'Metropolis Labs', status: 'completed', nextDue: null, icon: 'medkit' },
  ];

  const upcomingVaccines = [
    { name: 'Flu Shot 2026', dueDate: 'Nov 2026', category: 'Recommended' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vaccination Records</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{vaccinations.length}</Text>
              <Text style={styles.summaryLabel}>Total Vaccines</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{vaccinations.filter(v => v.status === 'completed').length}</Text>
              <Text style={styles.summaryLabel}>Completed</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>{upcomingVaccines.length}</Text>
              <Text style={styles.summaryLabel}>Upcoming</Text>
            </View>
          </View>
        </View>

        {/* Upcoming */}
        {upcomingVaccines.map((vaccine, index) => (
          <View key={index} style={styles.upcomingCard}>
            <View style={styles.upcomingIcon}>
              <Ionicons name="notifications" size={24} color={COLORS.blue} />
            </View>
            <View style={styles.upcomingContent}>
              <Text style={styles.upcomingTitle}>{vaccine.name}</Text>
              <Text style={styles.upcomingDate}>Due: {vaccine.dueDate}</Text>
            </View>
            <TouchableOpacity style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>Book</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Vaccination History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vaccination History</Text>
          {vaccinations.map((vaccine) => (
            <View key={vaccine.id} style={styles.vaccineCard}>
              <View style={[styles.vaccineIcon, { backgroundColor: COLORS.green + '20' }]}>
                <Ionicons name={vaccine.icon} size={24} color={COLORS.green} />
              </View>
              <View style={styles.vaccineInfo}>
                <Text style={styles.vaccineName}>{vaccine.name}</Text>
                <Text style={styles.vaccineDose}>{vaccine.dose}</Text>
                <Text style={styles.vaccineProvider}>{vaccine.provider}</Text>
              </View>
              <View style={styles.vaccineRight}>
                <Text style={styles.vaccineDate}>{vaccine.date}</Text>
                {vaccine.nextDue ? (
                  <Text style={styles.vaccineNextDue}>Next: {vaccine.nextDue}</Text>
                ) : (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color={COLORS.green} />
                    <Text style={styles.completedText}>Completed</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Certificate Upload */}
        <TouchableOpacity style={styles.uploadCard}>
          <Ionicons name="cloud-upload" size={32} color={COLORS.primary} />
          <Text style={styles.uploadTitle}>Upload Vaccination Certificate</Text>
          <Text style={styles.uploadSubtitle}>Add your vaccine certificates</Text>
        </TouchableOpacity>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: COLORS.white },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  addButton: { padding: 8 },
  summaryCard: { margin: 20, backgroundColor: COLORS.primary, borderRadius: 16, padding: 20 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-around' },
  summaryItem: { alignItems: 'center' },
  summaryNumber: { fontSize: 28, fontWeight: '700', color: COLORS.white },
  summaryLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  summaryDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  upcomingCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: COLORS.blue },
  upcomingIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  upcomingContent: { flex: 1, marginLeft: 12 },
  upcomingTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  upcomingDate: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  bookBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: COLORS.blue, borderRadius: 8 },
  bookBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  vaccineCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  vaccineIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  vaccineInfo: { flex: 1, marginLeft: 12 },
  vaccineName: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  vaccineDose: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  vaccineProvider: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  vaccineRight: { alignItems: 'flex-end' },
  vaccineDate: { fontSize: 12, color: COLORS.textSecondary },
  vaccineNextDue: { fontSize: 11, color: COLORS.blue, marginTop: 4 },
  completedBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  completedText: { fontSize: 11, color: COLORS.green, marginLeft: 4 },
  uploadCard: { flexDirection: 'column', alignItems: 'center', marginHorizontal: 20, marginTop: 24, backgroundColor: COLORS.white, borderRadius: 16, padding: 24, borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed' },
  uploadTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginTop: 12 },
  uploadSubtitle: { fontSize: 12, color: COLORS.textSecondary },
  bottomPadding: { height: 40 },
});
