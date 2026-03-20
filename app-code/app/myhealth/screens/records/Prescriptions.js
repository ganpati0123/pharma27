/**
 * ============================================================================
 * MY PRESCRIPTIONS - MEDICATION RECORDS
 * ============================================================================
 * View and manage all prescription records
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

export default function MyPrescriptions() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const prescriptions = [
    { id: 1, doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: 'Mar 15, 2026', medicines: ['Aspirin 75mg', 'Metoprolol 25mg', 'Rosuvastatin 10mg'], validUntil: 'Mar 15, 2027', status: 'active', hospital: 'Apollo Hospital' },
    { id: 2, doctor: 'Dr. Michael Chen', specialty: 'General Physician', date: 'Mar 10, 2026', medicines: ['Amoxicillin 500mg', 'Cetirizine 10mg', 'Paracetamol 500mg'], validUntil: 'Mar 10, 2026', status: 'expired', hospital: 'City Medical Center' },
    { id: 3, doctor: 'Dr. Emily Davis', specialty: 'Dermatologist', date: 'Feb 28, 2026', medicines: ['Mometasone Cream', 'Hydroxyzine 25mg'], validUntil: 'Feb 28, 2027', status: 'active', hospital: 'Skin Care Clinic' },
    { id: 4, doctor: 'Dr. James Wilson', specialty: 'Orthopedic', date: 'Feb 20, 2026', medicines: ['Diclofenac Gel', 'Calcium D3', 'Vitamin D3'], validUntil: 'Feb 20, 2027', status: 'active', hospital: 'Joint Care Center' },
  ];

  const filteredPrescriptions = filter === 'all' ? prescriptions : prescriptions.filter(p => p.status === filter);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Prescriptions</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="camera-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['all', 'active', 'expired'].map((f) => (
          <TouchableOpacity key={f} style={[styles.filterTab, filter === f && styles.filterTabActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={24} color={COLORS.primary} />
            <Text style={styles.statNumber}>{prescriptions.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.green} />
            <Text style={styles.statNumber}>{prescriptions.filter(p => p.status === 'active').length}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color={COLORS.accent} />
            <Text style={styles.statNumber}>{prescriptions.filter(p => p.status === 'expired').length}</Text>
            <Text style={styles.statLabel}>Expired</Text>
          </View>
        </View>

        {/* Prescriptions List */}
        {filteredPrescriptions.map((rx) => (
          <View key={rx.id} style={styles.prescriptionCard}>
            <View style={styles.rxHeader}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatar}>
                  <Ionicons name="person" size={20} color={COLORS.primary} />
                </View>
                <View>
                  <Text style={styles.doctorName}>{rx.doctor}</Text>
                  <Text style={styles.specialty}>{rx.specialty} • {rx.hospital}</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: rx.status === 'active' ? '#E8F5E9' : '#FFEBEE' }]}>
                <Text style={[styles.statusText, { color: rx.status === 'active' ? COLORS.green : COLORS.red }]}>
                  {rx.status}
                </Text>
              </View>
            </View>

            <View style={styles.rxDateRow}>
              <Ionicons name="calendar" size={14} color={COLORS.textTertiary} />
              <Text style={styles.rxDate}>{rx.date}</Text>
              <Text style={styles.validUntil}>Valid until: {rx.validUntil}</Text>
            </View>

            <View style={styles.medicinesSection}>
              <Text style={styles.medicinesTitle}>Medicines ({rx.medicines.length})</Text>
              {rx.medicines.map((med, index) => (
                <View key={index} style={styles.medicineItem}>
                  <View style={styles.medicineDot} />
                  <Text style={styles.medicineName}>{med}</Text>
                </View>
              ))}
            </View>

            <View style={styles.rxActions}>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="download-outline" size={16} color={COLORS.blue} />
                <Text style={styles.actionText}>Download</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="share-social-outline" size={16} color={COLORS.green} />
                <Text style={styles.actionText}>Share</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionButton}>
                <Ionicons name="repeat" size={16} color={COLORS.primary} />
                <Text style={styles.actionText}>Refill</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Upload Prompt */}
        <TouchableOpacity style={styles.uploadPrompt}>
          <Ionicons name="cloud-upload-outline" size={32} color={COLORS.primary} />
          <Text style={styles.uploadPromptText}>Upload Prescription</Text>
          <Text style={styles.uploadPromptSubtext}>Scan or upload your prescription</Text>
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
  uploadButton: { padding: 8 },
  filterContainer: { flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 12, gap: 10 },
  filterTab: { flex: 1, paddingVertical: 10, alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 10 },
  filterTabActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  filterTextActive: { color: COLORS.white },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12 },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '700', color: COLORS.textPrimary, marginTop: 8 },
  statLabel: { fontSize: 11, color: COLORS.textTertiary },
  prescriptionCard: { marginHorizontal: 20, marginTop: 16, backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  rxHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  doctorInfo: { flexDirection: 'row', alignItems: 'center' },
  doctorAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F0E6FF', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  doctorName: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  specialty: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  rxDateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.divider },
  rxDate: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 6 },
  validUntil: { fontSize: 11, color: COLORS.textTertiary, marginLeft: 'auto' },
  medicinesSection: { marginTop: 12 },
  medicinesTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 8 },
  medicineItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  medicineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: COLORS.primary, marginRight: 8 },
  medicineName: { fontSize: 13, color: COLORS.textSecondary },
  rxActions: { flexDirection: 'row', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.divider, gap: 8 },
  actionButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, backgroundColor: '#F5F5F8', borderRadius: 8 },
  actionText: { fontSize: 11, color: COLORS.textSecondary, marginLeft: 4 },
  uploadPrompt: { marginHorizontal: 20, marginTop: 24, backgroundColor: COLORS.white, borderRadius: 16, padding: 24, alignItems: 'center', borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed' },
  uploadPromptText: { fontSize: 15, fontWeight: '600', color: COLORS.primary, marginTop: 12 },
  uploadPromptSubtext: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  bottomPadding: { height: 40 },
});
