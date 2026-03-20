/**
 * ============================================================================
 * INSURANCE DOCUMENTS - HEALTH INSURANCE RECORDS
 * ============================================================================
 * Manage all health insurance policy documents
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
  teal: '#00BCD4',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function InsuranceDocuments() {
  const router = useRouter();

  const policies = [
    { id: 1, provider: 'Star Health', policyNo: 'SHA/2024/123456', type: 'Family Health', sumInsured: '₹10,00,000', premium: '₹25,000/year', validTill: 'Mar 2027', status: 'active', color: '#2196F3' },
    { id: 2, provider: 'ICICI Lombard', policyNo: 'ICL/2023/789012', type: 'Personal Accident', sumInsured: '₹5,00,000', premium: '₹3,500/year', validTill: 'Jun 2026', status: 'active', color: '#4CAF50' },
    { id: 3, provider: 'HDFC ERGO', policyNo: 'HDFC/2022/345678', type: 'Critical Illness', sumInsured: '₹25,00,000', premium: '₹15,000/year', validTill: 'Dec 2025', status: 'expired', color: '#9C27B0' },
  ];

  const claims = [
    { id: 1, claimNo: 'CLM/2026/001', hospital: 'Apollo Hospital', amount: '₹45,000', status: 'approved', date: 'Feb 2026' },
    { id: 2, claimNo: 'CLM/2026/002', hospital: 'City Medical', amount: '₹12,000', status: 'pending', date: 'Mar 2026' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Insurance Documents</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Active Coverage Summary */}
        <View style={styles.coverageCard}>
          <Text style={styles.coverageTitle}>Active Coverage</Text>
          <View style={styles.coverageRow}>
            <View style={styles.coverageItem}>
              <Ionicons name="shield-checkmark" size={24} color={COLORS.green} />
              <Text style={styles.coverageValue}>₹10L</Text>
              <Text style={styles.coverageLabel}>Sum Insured</Text>
            </View>
            <View style={styles.coverageDivider} />
            <View style={styles.coverageItem}>
              <Ionicons name="document-text" size={24} color={COLORS.blue} />
              <Text style={styles.coverageValue}>2</Text>
              <Text style={styles.coverageLabel}>Active Policies</Text>
            </View>
            <View style={styles.coverageDivider} />
            <View style={styles.coverageItem}>
              <Ionicons name="cash" size={24} color={COLORS.accent} />
              <Text style={styles.coverageValue}>₹57K</Text>
              <Text style={styles.coverageLabel}>Claimed</Text>
            </View>
          </View>
        </View>

        {/* Policies Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Policies</Text>
          {policies.map((policy) => (
            <View key={policy.id} style={styles.policyCard}>
              <View style={styles.policyHeader}>
                <View style={[styles.providerIcon, { backgroundColor: policy.color + '20' }]}>
                  <Ionicons name="shield" size={24} color={policy.color} />
                </View>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{policy.provider}</Text>
                  <Text style={styles.policyType}>{policy.type}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: policy.status === 'active' ? '#E8F5E9' : '#FFEBEE' }]}>
                  <Text style={[styles.statusText, { color: policy.status === 'active' ? COLORS.green : COLORS.red }]}>{policy.status}</Text>
                </View>
              </View>
              
              <View style={styles.policyDetails}>
                <View style={styles.policyDetailRow}>
                  <Text style={styles.policyDetailLabel}>Policy No.</Text>
                  <Text style={styles.policyDetailValue}>{policy.policyNo}</Text>
                </View>
                <View style={styles.policyDetailRow}>
                  <Text style={styles.policyDetailLabel}>Sum Insured</Text>
                  <Text style={styles.policyDetailValue}>{policy.sumInsured}</Text>
                </View>
                <View style={styles.policyDetailRow}>
                  <Text style={styles.policyDetailLabel}>Premium</Text>
                  <Text style={styles.policyDetailValue}>{policy.premium}</Text>
                </View>
                <View style={styles.policyDetailRow}>
                  <Text style={styles.policyDetailLabel}>Valid Till</Text>
                  <Text style={styles.policyDetailValue}>{policy.validTill}</Text>
                </View>
              </View>

              <View style={styles.policyActions}>
                <TouchableOpacity style={styles.policyActionBtn}>
                  <Ionicons name="eye-outline" size={16} color={COLORS.primary} />
                  <Text style={styles.policyActionText}>View Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.policyActionBtn}>
                  <Ionicons name="card-outline" size={16} color={COLORS.green} />
                  <Text style={styles.policyActionText}>Claim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.policyActionBtn}>
                  <Ionicons name="refresh" size={16} color={COLORS.blue} />
                  <Text style={styles.policyActionText}>Renew</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Claims Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Claims</Text>
          {claims.map((claim) => (
            <View key={claim.id} style={styles.claimCard}>
              <View style={styles.claimInfo}>
                <Text style={styles.claimNo}>{claim.claimNo}</Text>
                <Text style={styles.claimHospital}>{claim.hospital}</Text>
              </View>
              <View style={styles.claimAmount}>
                <Text style={styles.claimAmountValue}>{claim.amount}</Text>
                <View style={[styles.claimStatus, { backgroundColor: claim.status === 'approved' ? '#E8F5E9' : '#FFF3E0' }]}>
                  <Text style={[styles.claimStatusText, { color: claim.status === 'approved' ? COLORS.green : COLORS.accent }]}>{claim.status}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="add-circle" size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>Buy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="document-text" size={24} color={COLORS.blue} />
              <Text style={styles.actionText}>File Claim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="call" size={24} color={COLORS.green} />
              <Text style={styles.actionText}>Support</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calculator" size={24} color={COLORS.accent} />
              <Text style={styles.actionText}>Calculator</Text>
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
  addButton: { padding: 8 },
  coverageCard: { margin: 20, backgroundColor: COLORS.primary, borderRadius: 20, padding: 20 },
  coverageTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white, marginBottom: 16 },
  coverageRow: { flexDirection: 'row', justifyContent: 'space-around' },
  coverageItem: { alignItems: 'center' },
  coverageValue: { fontSize: 20, fontWeight: '700', color: COLORS.white, marginTop: 8 },
  coverageLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
  coverageDivider: { width: 1, height: 50, backgroundColor: 'rgba(255,255,255,0.3)' },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  policyCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  policyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  providerIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  providerInfo: { flex: 1 },
  providerName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  policyType: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
  policyDetails: { backgroundColor: '#F5F5F8', borderRadius: 12, padding: 12, marginBottom: 12 },
  policyDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  policyDetailLabel: { fontSize: 12, color: COLORS.textTertiary },
  policyDetailValue: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary },
  policyActions: { flexDirection: 'row', gap: 8 },
  policyActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 10, backgroundColor: '#F5F5F8', borderRadius: 8 },
  policyActionText: { fontSize: 11, color: COLORS.textSecondary, marginLeft: 4 },
  claimCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, padding: 16, marginBottom: 10 },
  claimInfo: {},
  claimNo: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  claimHospital: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  claimAmount: { alignItems: 'flex-end' },
  claimAmountValue: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  claimStatus: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 4 },
  claimStatusText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  actionText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8 },
  bottomPadding: { height: 40 },
});
