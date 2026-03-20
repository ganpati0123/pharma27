/**
 * ============================================================================
 * MY APPOINTMENTS - UPCOMING & PAST VISITS
 * ============================================================================
 * Manage doctor appointments, bookings, and visit history
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

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#6B4C9A',
  primaryLight: '#8B6CBF',
  accent: '#FF6B35',
  green: '#00A651',
  red: '#E74C3C',
  blue: '#0088FF',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function MyAppointments() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('upcoming');

  const appointments = {
    upcoming: [
      { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', hospital: 'Apollo Hospital', date: 'Mar 22, 2026', time: '10:00 AM', status: 'confirmed', image: '👩‍⚕️' },
      { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Physician', hospital: 'City Medical Center', date: 'Mar 25, 2026', time: '2:30 PM', status: 'confirmed', image: '👨‍⚕️' },
      { id: 3, doctor: 'Dr. Emily Davis', specialty: 'Dermatologist', hospital: 'Skin Care Clinic', date: 'Mar 28, 2026', time: '11:00 AM', status: 'pending', image: '👩‍⚕️' },
    ],
    past: [
      { id: 4, doctor: 'Dr. James Wilson', specialty: 'Orthopedic', hospital: 'Joint Care Center', date: 'Mar 15, 2026', time: '9:00 AM', status: 'completed', image: '👨‍⚕️', notes: 'Follow-up in 2 weeks' },
      { id: 5, doctor: 'Dr. Lisa Brown', specialty: 'Ophthalmologist', hospital: 'Vision Plus', date: 'Mar 10, 2026', time: '3:00 PM', status: 'completed', image: '👩‍⚕️', notes: 'Eye test normal' },
      { id: 6, doctor: 'Dr. Robert Taylor', specialty: 'Dentist', hospital: 'Dental Care Hub', date: 'Feb 28, 2026', time: '10:30 AM', status: 'completed', image: '👨‍⚕️', notes: 'Cleaning done' },
    ],
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return COLORS.green;
      case 'pending': return COLORS.accent;
      case 'completed': return COLORS.blue;
      case 'cancelled': return COLORS.red;
      default: return COLORS.textTertiary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Appointments</Text>
        <TouchableOpacity style={styles.calendarButton}>
          <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.tabActive]} 
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.tabTextActive]}>
            Upcoming ({appointments.upcoming.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'past' && styles.tabActive]} 
          onPress={() => setActiveTab('past')}
        >
          <Text style={[styles.tabText, activeTab === 'past' && styles.tabTextActive]}>
            Past ({appointments.past.length})
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Book Card */}
        <TouchableOpacity style={styles.quickBookCard}>
          <View style={styles.quickBookContent}>
            <Ionicons name="add-circle" size={32} color={COLORS.primary} />
            <View style={styles.quickBookText}>
              <Text style={styles.quickBookTitle}>Book New Appointment</Text>
              <Text style={styles.quickBookSubtitle}>Find doctors & book instantly</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Appointments List */}
        {appointments[activeTab].map((apt) => (
          <View key={apt.id} style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatar}>
                  <Text style={styles.doctorImage}>{apt.image}</Text>
                </View>
                <View>
                  <Text style={styles.doctorName}>{apt.doctor}</Text>
                  <Text style={styles.specialty}>{apt.specialty}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(apt.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(apt.status) }]}>
                  {apt.status}
                </Text>
              </View>
            </View>

            <View style={styles.appointmentDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="business" size={16} color={COLORS.textTertiary} />
                <Text style={styles.detailText}>{apt.hospital}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={16} color={COLORS.textTertiary} />
                <Text style={styles.detailText}>{apt.date} at {apt.time}</Text>
              </View>
              {apt.notes && (
                <View style={styles.detailRow}>
                  <Ionicons name="document-text" size={16} color={COLORS.textTertiary} />
                  <Text style={styles.detailText}>{apt.notes}</Text>
                </View>
              )}
            </View>

            <View style={styles.appointmentActions}>
              {activeTab === 'upcoming' ? (
                <>
                  <TouchableOpacity style={[styles.actionButton, styles.rescheduleButton]}>
                    <Ionicons name="time-outline" size={16} color={COLORS.primary} />
                    <Text style={styles.rescheduleText}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.cancelButton]}>
                    <Ionicons name="close-circle-outline" size={16} color={COLORS.red} />
                    <Text style={styles.cancelText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <TouchableOpacity style={[styles.actionButton, styles.bookAgainButton]}>
                    <Ionicons name="refresh" size={16} color={COLORS.primary} />
                    <Text style={styles.bookAgainText}>Book Again</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.prescriptionButton]}>
                    <Ionicons name="document-text-outline" size={16} color={COLORS.green} />
                    <Text style={styles.prescriptionText}>View Prescription</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        ))}

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>Your Activity</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{appointments.upcoming.length + appointments.past.length}</Text>
              <Text style={styles.statLabel}>Total Visits</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{appointments.past.length}</Text>
              <Text style={styles.statLabel}>This Year</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>4</Text>
              <Text style={styles.statLabel}>Doctors</Text>
            </View>
          </View>
        </View>

        {/* Reminder Section */}
        <View style={styles.reminderSection}>
          <View style={styles.reminderCard}>
            <Ionicons name="notifications" size={24} color={COLORS.accent} />
            <View style={styles.reminderContent}>
              <Text style={styles.reminderTitle}>Appointment Reminders</Text>
              <Text style={styles.reminderText}>Get notified 24 hours before your appointment</Text>
            </View>
            <TouchableOpacity style={styles.reminderToggle}>
              <Ionicons name="toggle-right" size={32} color={COLORS.primary} />
            </TouchableOpacity>
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
  calendarButton: { padding: 8 },
  tabContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, gap: 12 },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12 },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  tabTextActive: { color: COLORS.white },
  quickBookCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed' },
  quickBookContent: { flexDirection: 'row', alignItems: 'center' },
  quickBookText: { marginLeft: 12 },
  quickBookTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  quickBookSubtitle: { fontSize: 12, color: COLORS.textSecondary },
  appointmentCard: { marginHorizontal: 20, marginTop: 16, backgroundColor: COLORS.white, borderRadius: 20, padding: 20 },
  appointmentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  doctorInfo: { flexDirection: 'row', alignItems: 'center' },
  doctorAvatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F0E6FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  doctorImage: { fontSize: 24 },
  doctorName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  specialty: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  appointmentDetails: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: COLORS.divider },
  detailRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  detailText: { fontSize: 13, color: COLORS.textSecondary, marginLeft: 8 },
  appointmentActions: { flexDirection: 'row', marginTop: 16, gap: 12 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, borderRadius: 10 },
  rescheduleButton: { backgroundColor: '#F0E6FF' },
  rescheduleText: { color: COLORS.primary, fontSize: 13, fontWeight: '600', marginLeft: 6 },
  cancelButton: { backgroundColor: '#FFEBEE' },
  cancelText: { color: COLORS.red, fontSize: 13, fontWeight: '600', marginLeft: 6 },
  bookAgainButton: { backgroundColor: '#F0E6FF' },
  bookAgainText: { color: COLORS.primary, fontSize: 13, fontWeight: '600', marginLeft: 6 },
  prescriptionButton: { backgroundColor: '#E8F5E9' },
  prescriptionText: { color: COLORS.green, fontSize: 13, fontWeight: '600', marginLeft: 6 },
  statsSection: { marginHorizontal: 20, marginTop: 24 },
  statsTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  statsGrid: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '700', color: COLORS.primary },
  statLabel: { fontSize: 11, color: COLORS.textTertiary, marginTop: 4 },
  reminderSection: { marginHorizontal: 20, marginTop: 24 },
  reminderCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  reminderContent: { flex: 1, marginLeft: 12 },
  reminderTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  reminderText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  reminderToggle: { padding: 4 },
  bottomPadding: { height: 40 },
});
