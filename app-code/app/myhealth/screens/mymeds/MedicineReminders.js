/**
 * ============================================================================
 * MEDICINE REMINDERS - DOSE TRACKING
 * ============================================================================
 * Manage medicine reminders and track doses
 */

import React, { useState } from 'react';
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
  red: '#E74C3C',
  accent: '#FF6B35',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function MedicineReminders() {
  const router = useRouter();

  const reminders = [
    { id: 1, medicine: 'Metoprolol 50mg', time: '8:00 AM', status: 'taken', days: 'Daily' },
    { id: 2, medicine: 'Aspirin 75mg', time: '8:00 AM', status: 'taken', days: 'Daily' },
    { id: 3, medicine: 'Vitamin D3', time: '12:00 PM', status: 'pending', days: 'Daily' },
    { id: 4, medicine: 'Metformin 500mg', time: '8:00 PM', status: 'pending', days: 'Daily' },
  ];

  const upcomingReminders = reminders.filter(r => r.status === 'pending');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine Reminders</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Today's Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Today's Progress</Text>
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>50%</Text>
            <Text style={styles.progressLabel}>2 of 4 taken</Text>
          </View>
        </View>

        {/* Upcoming */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming</Text>
          {upcomingReminders.map((reminder) => (
            <View key={reminder.id} style={styles.reminderCard}>
              <View style={styles.reminderLeft}>
                <View style={[styles.reminderIcon, { backgroundColor: '#FFF3E0' }]}>
                  <Ionicons name="medical" size={24} color={COLORS.accent} />
                </View>
                <View>
                  <Text style={styles.reminderMedicine}>{reminder.medicine}</Text>
                  <Text style={styles.reminderTime}>{reminder.time}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.takeButton}>
                <Text style={styles.takeButtonText}>Take Now</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* All Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Reminders</Text>
          {reminders.map((reminder) => (
            <View key={reminder.id} style={styles.allReminderCard}>
              <View style={styles.reminderInfo}>
                <Text style={styles.allMedicine}>{reminder.medicine}</Text>
                <Text style={styles.allTime}>{reminder.time} • {reminder.days}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: reminder.status === 'taken' ? '#E8F5E9' : '#FFF3E0' }]}>
                <Text style={[styles.statusText, { color: reminder.status === 'taken' ? COLORS.green : COLORS.accent }]}>
                  {reminder.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reminder Settings</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="notifications" size={20} color={COLORS.primary} />
                <Text style={styles.settingText}>Push Notifications</Text>
              </View>
              <Ionicons name="toggle-right" size={32} color={COLORS.primary} />
            </View>
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Ionicons name="volume-high" size={20} color={COLORS.accent} />
                <Text style={styles.settingText}>Sound</Text>
              </View>
              <Ionicons name="toggle-right" size={32} color={COLORS.primary} />
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
  summaryTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white, textAlign: 'center' },
  progressCircle: { alignItems: 'center', marginTop: 16 },
  progressNumber: { fontSize: 48, fontWeight: '800', color: COLORS.white },
  progressLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  reminderCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 10 },
  reminderLeft: { flexDirection: 'row', alignItems: 'center' },
  reminderIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  reminderMedicine: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  reminderTime: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  takeButton: { backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
  takeButtonText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  allReminderCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 8 },
  reminderInfo: {},
  allMedicine: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  allTime: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  settingsCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 4 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
  settingInfo: { flexDirection: 'row', alignItems: 'center' },
  settingText: { fontSize: 14, color: COLORS.textPrimary, marginLeft: 12 },
  bottomPadding: { height: 40 },
});
