/**
 * ============================================================================
 * TEST REPORTS - LAB RESULTS
 * ============================================================================
 * View and manage all lab test reports
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

export default function TestReports() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const reports = [
    { id: 1, testName: 'Complete Blood Count (CBC)', lab: 'Apollo Diagnostics', date: 'Mar 18, 2026', status: 'normal', category: 'Blood', doctor: 'Dr. Sarah Johnson' },
    { id: 2, testName: 'Lipid Profile', lab: 'Metropolis Labs', date: 'Mar 15, 2026', status: 'abnormal', category: 'Blood', doctor: 'Dr. Michael Chen' },
    { id: 3, testName: 'Thyroid Profile (T3, T4, TSH)', lab: 'SRL Diagnostics', date: 'Mar 10, 2026', status: 'normal', category: 'Hormone', doctor: 'Dr. Emily Davis' },
    { id: 4, testName: 'HbA1c (Diabetes)', lab: 'Apollo Diagnostics', date: 'Mar 5, 2026', status: 'prediabetic', category: 'Blood Sugar', doctor: 'Dr. James Wilson' },
    { id: 5, testName: 'Liver Function Test', lab: 'Dr. Lal PathLabs', date: 'Feb 28, 2026', status: 'normal', category: 'Liver', doctor: 'Dr. Michael Chen' },
    { id: 6, testName: 'Kidney Function Test', lab: 'Metropolis Labs', date: 'Feb 25, 2026', status: 'normal', category: 'Kidney', doctor: 'Dr. Sarah Johnson' },
  ];

  const getStatusColor = (status) => {
    if (status === 'normal') return COLORS.green;
    if (status === 'abnormal') return COLORS.red;
    return COLORS.accent;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Test Reports</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <TouchableOpacity style={[styles.filterChip, filter === 'all' && styles.filterChipActive]} onPress={() => setFilter('all')}>
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterChip, filter === 'normal' && styles.filterChipActive]} onPress={() => setFilter('normal')}>
          <Text style={[styles.filterText, filter === 'normal' && styles.filterTextActive]}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterChip, filter === 'abnormal' && styles.filterChipActive]} onPress={() => setFilter('abnormal')}>
          <Text style={[styles.filterText, filter === 'abnormal' && styles.filterTextActive]}>Abnormal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Ionicons name="document-text" size={24} color={COLORS.blue} />
            <Text style={styles.summaryNumber}>{reports.length}</Text>
            <Text style={styles.summaryLabel}>Total Reports</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="checkmark-circle" size={24} color={COLORS.green} />
            <Text style={styles.summaryNumber}>{reports.filter(r => r.status === 'normal').length}</Text>
            <Text style={styles.summaryLabel}>Normal</Text>
          </View>
          <View style={styles.summaryCard}>
            <Ionicons name="warning" size={24} color={COLORS.red} />
            <Text style={styles.summaryNumber}>{reports.filter(r => r.status === 'abnormal').length}</Text>
            <Text style={styles.summaryLabel}>Abnormal</Text>
          </View>
        </View>

        {/* Reports List */}
        {reports.map((report) => (
          <TouchableOpacity key={report.id} style={styles.reportCard}>
            <View style={styles.reportHeader}>
              <View style={[styles.categoryBadge, { backgroundColor: getStatusColor(report.status) + '20' }]}>
                <Text style={[styles.categoryText, { color: getStatusColor(report.status) }]}>{report.category}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(report.status) + '20' }]}>
                <Text style={[styles.statusText, { color: getStatusColor(report.status) }]}>{report.status}</Text>
              </View>
            </View>
            <Text style={styles.testName}>{report.testName}</Text>
            <View style={styles.reportDetails}>
              <View style={styles.detailRow}>
                <Ionicons name="business" size={14} color={COLORS.textTertiary} />
                <Text style={styles.detailText}>{report.lab}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="person" size={14} color={COLORS.textTertiary} />
                <Text style={styles.detailText}>{report.doctor}</Text>
              </View>
              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={14} color={COLORS.textTertiary} />
                <Text style={styles.detailText}>{report.date}</Text>
              </View>
            </View>
            <View style={styles.reportActions}>
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
          </TouchableOpacity>
        ))}

        {/* Book Test CTA */}
        <TouchableOpacity style={styles.bookTestCard}>
          <Ionicons name="flask" size={32} color={COLORS.primary} />
          <View style={styles.bookTestContent}>
            <Text style={styles.bookTestTitle}>Book New Test</Text>
            <Text style={styles.bookTestSubtitle}>Get tests done from home</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.primary} />
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
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: COLORS.white, borderRadius: 20 },
  filterChipActive: { backgroundColor: COLORS.primary },
  filterText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  filterTextActive: { color: COLORS.white },
  summaryRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12 },
  summaryCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  summaryNumber: { fontSize: 24, fontWeight: '700', color: COLORS.textPrimary, marginTop: 8 },
  summaryLabel: { fontSize: 11, color: COLORS.textTertiary },
  reportCard: { marginHorizontal: 20, marginTop: 16, backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  reportHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  categoryBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { fontSize: 11, fontWeight: '600' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  testName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 12 },
  reportDetails: { gap: 6 },
  detailRow: { flexDirection: 'row', alignItems: 'center' },
  detailText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 6 },
  reportActions: { flexDirection: 'row', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.divider, gap: 8 },
  actionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8, backgroundColor: '#F5F5F8', borderRadius: 8 },
  actionText: { fontSize: 11, color: COLORS.textSecondary, marginLeft: 4 },
  bookTestCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 24, backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  bookTestContent: { flex: 1, marginLeft: 12 },
  bookTestTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  bookTestSubtitle: { fontSize: 12, color: COLORS.textSecondary },
  bottomPadding: { height: 40 },
});
