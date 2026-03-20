/**
 * ============================================================================
 * X-RAYS & SCANS - IMAGING RECORDS
 * ============================================================================
 * View and manage all X-rays, MRI, CT scans and other imaging records
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
  blue: '#0088FF',
  accent: '#FF6B35',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function XraysAndScans() {
  const router = useRouter();

  const scans = [
    { id: 1, name: 'Chest X-Ray', date: 'Feb 28, 2026', hospital: 'Apollo Hospital', doctor: 'Dr. Sarah', status: 'normal', findings: 'No abnormalities detected', icon: 'scan' },
    { id: 2, name: 'MRI Brain', date: 'Jan 15, 2026', hospital: 'Metropolis Labs', doctor: 'Dr. Michael', status: 'normal', findings: 'Normal scan results', icon: 'pulse' },
    { id: 3, name: 'CT Scan Abdomen', date: 'Dec 10, 2025', hospital: 'City Medical', doctor: 'Dr. Emily', status: 'findings', findings: 'Minor gallstones detected', icon: 'scan' },
    { id: 4, name: 'Ultrasound', date: 'Nov 20, 2025', hospital: 'Apollo Hospital', doctor: 'Dr. James', status: 'normal', findings: 'Normal ultrasound', icon: 'water' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>X-Rays & Scans</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="scan" size={24} color={COLORS.blue} />
            <Text style={styles.statNumber}>{scans.length}</Text>
            <Text style={styles.statLabel}>Total Scans</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.green} />
            <Text style={styles.statNumber}>{scans.filter(s => s.status === 'normal').length}</Text>
            <Text style={styles.statLabel}>Normal</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="document-text" size={24} color={COLORS.accent} />
            <Text style={styles.statNumber}>{scans.filter(s => s.status === 'findings').length}</Text>
            <Text style={styles.statLabel}>Findings</Text>
          </View>
        </View>

        {/* Scan Cards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Scans</Text>
          {scans.map((scan) => (
            <View key={scan.id} style={styles.scanCard}>
              <View style={styles.scanHeader}>
                <View style={[styles.scanIcon, { backgroundColor: scan.status === 'normal' ? '#E8F5E9' : '#FFF3E0' }]}>
                  <Ionicons name={scan.icon} size={24} color={scan.status === 'normal' ? COLORS.green : COLORS.accent} />
                </View>
                <View style={styles.scanInfo}>
                  <Text style={styles.scanName}>{scan.name}</Text>
                  <Text style={styles.scanDate}>{scan.date}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: scan.status === 'normal' ? '#E8F5E9' : '#FFF3E0' }]}>
                  <Text style={[styles.statusText, { color: scan.status === 'normal' ? COLORS.green : COLORS.accent }]}>
                    {scan.status === 'normal' ? 'Normal' : 'Findings'}
                  </Text>
                </View>
              </View>
              <View style={styles.scanDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="business" size={14} color={COLORS.textTertiary} />
                  <Text style={styles.detailText}>{scan.hospital}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="person" size={14} color={COLORS.textTertiary} />
                  <Text style={styles.detailText}>{scan.doctor}</Text>
                </View>
              </View>
              <Text style={styles.findingsLabel}>Findings: {scan.findings}</Text>
              <View style={styles.scanActions}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="eye-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.actionText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="download-outline" size={16} color={COLORS.blue} />
                  <Text style={styles.actionText}>Download</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn}>
                  <Ionicons name="share-social-outline" size={16} color={COLORS.green} />
                  <Text style={styles.actionText}>Share</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, paddingTop: 20, gap: 12 },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  statNumber: { fontSize: 24, fontWeight: '700', color: COLORS.textPrimary, marginTop: 8 },
  statLabel: { fontSize: 11, color: COLORS.textTertiary },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  scanCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  scanHeader: { flexDirection: 'row', alignItems: 'center' },
  scanIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  scanInfo: { flex: 1, marginLeft: 12 },
  scanName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  scanDate: { fontSize: 12, color: COLORS.textTertiary, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600' },
  scanDetails: { flexDirection: 'row', marginTop: 12, gap: 16 },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 4 },
  findingsLabel: { fontSize: 13, color: COLORS.textSecondary, marginTop: 12, fontStyle: 'italic' },
  scanActions: { flexDirection: 'row', marginTop: 16, gap: 8 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: '#F5F5F8', borderRadius: 8 },
  actionText: { fontSize: 11, color: COLORS.textSecondary, marginLeft: 4 },
  bottomPadding: { height: 40 },
});
