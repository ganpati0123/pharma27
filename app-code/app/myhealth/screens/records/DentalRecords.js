/**
 * ============================================================================
 * DENTAL RECORDS - ORAL HEALTH HISTORY
 * ============================================================================
 * View and manage dental records, appointments, and treatments
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

const COLORS = {
  primary: '#6B4C9A',
  green: '#00A651',
  blue: '#0088FF',
  accent: '#FF6B35',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function DentalRecords() {
  const router = useRouter();

  const records = [
    { id: 1, treatment: 'Dental Cleaning', date: 'Mar 5, 2026', dentist: 'Dr. Priya Sharma', clinic: 'Smile Care', notes: 'Routine cleaning, no issues', status: 'completed' },
    { id: 2, treatment: 'Root Canal', date: 'Jan 20, 2026', dentist: 'Dr. Raj Malhotra', clinic: 'Apollo Dental', notes: 'Tooth #36, crown placed', status: 'completed' },
    { id: 3, treatment: 'Tooth Filling', date: 'Nov 15, 2025', dentist: 'Dr. Priya Sharma', clinic: 'Smile Care', notes: 'Composite filling on tooth #24', status: 'completed' },
  ];

  const upcomingAppointments = [
    { id: 1, treatment: 'Follow-up Checkup', date: 'Apr 10, 2026', dentist: 'Dr. Priya Sharma', clinic: 'Smile Care' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dental Records</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Ionicons name="happy" size={28} color={COLORS.white} />
              <Text style={styles.summaryNumber}>{records.length}</Text>
              <Text style={styles.summaryLabel}>Treatments</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryNumber}>Good</Text>
              <Text style={styles.summaryLabel}>Oral Health</Text>
            </View>
          </View>
        </View>

        {/* Upcoming */}
        {upcomingAppointments.map((apt) => (
          <View key={apt.id} style={styles.upcomingCard}>
            <View style={styles.upcomingIcon}>
              <Ionicons name="calendar" size={24} color={COLORS.blue} />
            </View>
            <View style={styles.upcomingContent}>
              <Text style={styles.upcomingTitle}>{apt.treatment}</Text>
              <Text style={styles.upcomingDate}>{apt.date} • {apt.dentist}</Text>
            </View>
            <TouchableOpacity style={styles.viewBtn}>
              <Text style={styles.viewBtnText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Treatment History</Text>
          {records.map((record) => (
            <View key={record.id} style={styles.recordCard}>
              <View style={styles.recordHeader}>
                <View style={[styles.recordIcon, { backgroundColor: '#E8F5E9' }]}>
                  <Ionicons name="happy" size={24} color={COLORS.green} />
                </View>
                <View style={styles.recordInfo}>
                  <Text style={styles.recordTreatment}>{record.treatment}</Text>
                  <Text style={styles.recordDate}>{record.date}</Text>
                </View>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>{record.status}</Text>
                </View>
              </View>
              <View style={styles.recordDetails}>
                <Text style={styles.recordDetail}>📍 {record.clinic}</Text>
                <Text style={styles.recordDetail}>👨‍⚕️ {record.dentist}</Text>
              </View>
              <Text style={styles.recordNotes}>"{record.notes}"</Text>
            </View>
          ))}
        </View>

        {/* Care Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Oral Care Tips</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <Ionicons name="brush" size={20} color={COLORS.primary} />
              <Text style={styles.tipText}>Brush twice daily for 2 minutes</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="floss" size={20} color={COLORS.green} />
              <Text style={styles.tipText}>Floss daily to clean between teeth</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="cafe" size={20} color={COLORS.accent} />
              <Text style={styles.tipText}>Limit sugary foods and drinks</Text>
            </View>
          </View>
        </View>

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
  summaryNumber: { fontSize: 24, fontWeight: '700', color: COLORS.white, marginTop: 8 },
  summaryLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  upcomingCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderLeftWidth: 4, borderLeftColor: COLORS.blue },
  upcomingIcon: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#E3F2FD', justifyContent: 'center', alignItems: 'center' },
  upcomingContent: { flex: 1, marginLeft: 12 },
  upcomingTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  upcomingDate: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  viewBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: COLORS.blue, borderRadius: 8 },
  viewBtnText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  recordCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  recordHeader: { flexDirection: 'row', alignItems: 'center' },
  recordIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  recordInfo: { flex: 1, marginLeft: 12 },
  recordTreatment: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  recordDate: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  statusBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', color: COLORS.green, textTransform: 'capitalize' },
  recordDetails: { flexDirection: 'row', marginTop: 12, gap: 16 },
  recordDetail: { fontSize: 12, color: COLORS.textSecondary },
  recordNotes: { fontSize: 13, color: COLORS.textSecondary, marginTop: 12, fontStyle: 'italic' },
  tipsCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  tipItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tipText: { fontSize: 14, color: COLORS.textSecondary, marginLeft: 12 },
  bottomPadding: { height: 40 },
});
