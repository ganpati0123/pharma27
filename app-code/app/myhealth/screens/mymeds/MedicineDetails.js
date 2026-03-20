/**
 * ============================================================================
 * MEDICINE DETAILS - COMPREHENSIVE DRUG INFORMATION
 * ============================================================================
 * Detailed view of a specific medicine with usage, side effects, alternatives
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
import { LinearGradient } from 'expo-linear-gradient';

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

export default function MedicineDetails() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const medicine = {
    name: 'Metoprolol Tartrate',
    brand: 'Betacor',
    generic: 'Metoprolol',
    type: 'Tablet',
    strength: '50mg',
    manufacturer: 'Abbott Healthcare',
    dosage: '1 tablet daily',
    duration: 'Ongoing',
    prescribedBy: 'Dr. Sarah Johnson',
    prescriptionDate: 'Mar 15, 2026',
    refillsLeft: 3,
    price: '₹120',
  };

  const alternatives = [
    { name: 'Atenolol', strength: '50mg', price: '₹85' },
    { name: 'Bisoprolol', strength: '5mg', price: '₹180' },
    { name: 'Nebivolol', strength: '5mg', price: '₹220' },
  ];

  const sideEffects = [
    { name: 'Dizziness', severity: 'common' },
    { name: 'Fatigue', severity: 'common' },
    { name: 'Nausea', severity: 'less common' },
    { name: 'Cold hands/feet', severity: 'less common' },
    { name: 'Slow heartbeat', severity: 'rare' },
  ];

  const instructions = [
    'Take in the morning with or without food',
    'Do not stop taking suddenly without consulting doctor',
    'Avoid alcohol while on this medication',
    'Store at room temperature away from moisture',
    'Take at the same time each day',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Medicine Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-social-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Medicine Hero */}
        <LinearGradient colors={[COLORS.primary, COLORS.primaryLight]} style={styles.medicineHero}>
          <View style={styles.medicineIcon}>
            <Ionicons name="medical" size={40} color={COLORS.white} />
          </View>
          <Text style={styles.medicineName}>{medicine.name}</Text>
          <Text style={styles.medicineBrand}>{medicine.brand}</Text>
          <View style={styles.medicineTags}>
            <View style={styles.medicineTag}>
              <Text style={styles.medicineTagText}>{medicine.strength}</Text>
            </View>
            <View style={styles.medicineTag}>
              <Text style={styles.medicineTagText}>{medicine.type}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Quick Info */}
        <View style={styles.quickInfo}>
          <View style={styles.quickInfoItem}>
            <Ionicons name="calendar" size={20} color={COLORS.primary} />
            <Text style={styles.quickInfoLabel}>Dosage</Text>
            <Text style={styles.quickInfoValue}>{medicine.dosage}</Text>
          </View>
          <View style={styles.quickInfoDivider} />
          <View style={styles.quickInfoItem}>
            <Ionicons name="repeat" size={20} color={COLORS.green} />
            <Text style={styles.quickInfoLabel}>Refills</Text>
            <Text style={styles.quickInfoValue}>{medicine.refillsLeft} left</Text>
          </View>
          <View style={styles.quickInfoDivider} />
          <View style={styles.quickInfoItem}>
            <Ionicons name="cash" size={20} color={COLORS.accent} />
            <Text style={styles.quickInfoLabel}>Price</Text>
            <Text style={styles.quickInfoValue}>{medicine.price}</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {['Overview', 'Alternatives', 'Side Effects', 'Instructions'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab.toLowerCase() && styles.tabActive]}
              onPress={() => setActiveTab(tab.toLowerCase())}
            >
              <Text style={[styles.tabText, activeTab === tab.toLowerCase() && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <View style={styles.tabContent}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Prescription Details</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Prescribed By</Text>
                <Text style={styles.infoValue}>{medicine.prescribedBy}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date</Text>
                <Text style={styles.infoValue}>{medicine.prescriptionDate}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Duration</Text>
                <Text style={styles.infoValue}>{medicine.duration}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Manufacturer</Text>
                <Text style={styles.infoValue}>{medicine.manufacturer}</Text>
              </View>
            </View>

            {/* Reminder Card */}
            <View style={styles.reminderCard}>
              <View style={styles.reminderContent}>
                <Ionicons name="notifications" size={24} color={COLORS.accent} />
                <View style={styles.reminderText}>
                  <Text style={styles.reminderTitle}>Daily Reminder Set</Text>
                  <Text style={styles.reminderTime}>Morning: 8:00 AM</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.editReminderBtn}>
                <Text style={styles.editReminderText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {activeTab === 'alternatives' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionSubtitle}>Generic Alternatives</Text>
            {alternatives.map((alt, index) => (
              <View key={index} style={styles.alternativeCard}>
                <View style={styles.alternativeInfo}>
                  <Text style={styles.alternativeName}>{alt.name}</Text>
                  <Text style={styles.alternativeStrength}>{alt.strength}</Text>
                </View>
                <View style={styles.alternativeAction}>
                  <Text style={styles.alternativePrice}>{alt.price}</Text>
                  <TouchableOpacity style={styles.swapButton}>
                    <Text style={styles.swapButtonText}>Swap</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {activeTab === 'side effects' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionSubtitle}>Possible Side Effects</Text>
            {sideEffects.map((effect, index) => (
              <View key={index} style={styles.sideEffectCard}>
                <View style={styles.sideEffectDot} />
                <Text style={styles.sideEffectName}>{effect.name}</Text>
                <View style={[styles.severityBadge, { backgroundColor: effect.severity === 'common' ? '#FFF3E0' : '#F5F5F5' }]}>
                  <Text style={[styles.severityText, { color: effect.severity === 'common' ? COLORS.accent : COLORS.textTertiary }]}>
                    {effect.severity}
                  </Text>
                </View>
              </View>
            ))}
            <View style={styles.warningCard}>
              <Ionicons name="warning" size={20} color={COLORS.red} />
              <Text style={styles.warningText}>Consult doctor if side effects persist or worsen</Text>
            </View>
          </View>
        )}

        {activeTab === 'instructions' && (
          <View style={styles.tabContent}>
            <Text style={styles.sectionSubtitle}>Usage Instructions</Text>
            {instructions.map((inst, index) => (
              <View key={index} style={styles.instructionItem}>
                <View style={styles.instructionNumber}>
                  <Text style={styles.instructionNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.instructionText}>{inst}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.refillButton}>
            <Ionicons name="refresh" size={20} color={COLORS.white} />
            <Text style={styles.refillButtonText}>Request Refill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton}>
            <Ionicons name="cart" size={20} color={COLORS.primary} />
            <Text style={styles.orderButtonText}>Order Now</Text>
          </TouchableOpacity>
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
  shareButton: { padding: 8 },
  medicineHero: { margin: 20, borderRadius: 24, padding: 24, alignItems: 'center' },
  medicineIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  medicineName: { fontSize: 22, fontWeight: '700', color: COLORS.white, textAlign: 'center' },
  medicineBrand: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  medicineTags: { flexDirection: 'row', marginTop: 12, gap: 8 },
  medicineTag: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  medicineTagText: { fontSize: 12, color: COLORS.white },
  quickInfo: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  quickInfoItem: { flex: 1, alignItems: 'center' },
  quickInfoDivider: { width: 1, backgroundColor: COLORS.divider },
  quickInfoLabel: { fontSize: 11, color: COLORS.textTertiary, marginTop: 6 },
  quickInfoValue: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginTop: 4 },
  tabContainer: { flexDirection: 'row', marginHorizontal: 20, marginTop: 20, backgroundColor: COLORS.white, borderRadius: 12, padding: 4 },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  tabActive: { backgroundColor: COLORS.primary },
  tabText: { fontSize: 11, color: COLORS.textSecondary, fontWeight: '500' },
  tabTextActive: { color: COLORS.white },
  tabContent: { padding: 20 },
  infoCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 16 },
  infoTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  infoLabel: { fontSize: 13, color: COLORS.textSecondary },
  infoValue: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  reminderCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  reminderContent: { flexDirection: 'row', alignItems: 'center' },
  reminderText: { marginLeft: 12 },
  reminderTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  reminderTime: { fontSize: 12, color: COLORS.textSecondary },
  editReminderBtn: { paddingHorizontal: 16, paddingVertical: 8, backgroundColor: '#F0E6FF', borderRadius: 8 },
  editReminderText: { fontSize: 12, fontWeight: '600', color: COLORS.primary },
  sectionSubtitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 16 },
  alternativeCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, padding: 16, marginBottom: 10 },
  alternativeInfo: {},
  alternativeName: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  alternativeStrength: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  alternativeAction: { alignItems: 'flex-end' },
  alternativePrice: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  swapButton: { marginTop: 8, paddingHorizontal: 12, paddingVertical: 6, backgroundColor: '#F0E6FF', borderRadius: 6 },
  swapButtonText: { fontSize: 11, fontWeight: '600', color: COLORS.primary },
  sideEffectCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 8 },
  sideEffectDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.accent, marginRight: 12 },
  sideEffectName: { flex: 1, fontSize: 14, color: COLORS.textPrimary },
  severityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  severityText: { fontSize: 10, fontWeight: '500', textTransform: 'capitalize' },
  warningCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFEBEE', borderRadius: 12, padding: 12, marginTop: 16 },
  warningText: { flex: 1, fontSize: 12, color: COLORS.red, marginLeft: 8 },
  instructionItem: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  instructionNumber: { width: 24, height: 24, borderRadius: 12, backgroundColor: COLORS.primary, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  instructionNumberText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
  instructionText: { flex: 1, fontSize: 14, color: COLORS.textSecondary, lineHeight: 20 },
  actionButtons: { flexDirection: 'row', marginHorizontal: 20, marginTop: 24, gap: 12 },
  refillButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.primary, borderRadius: 12, paddingVertical: 14 },
  refillButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.white, marginLeft: 8 },
  orderButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 12, paddingVertical: 14, borderWidth: 1, borderColor: COLORS.primary },
  orderButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.primary, marginLeft: 8 },
  bottomPadding: { height: 40 },
});
