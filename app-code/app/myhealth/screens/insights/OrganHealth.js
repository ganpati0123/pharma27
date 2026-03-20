/**
 * ============================================================================
 * ORGAN HEALTH - BODY SYSTEM INSIGHTS
 * ============================================================================
 * Analyze health of different body organs and systems
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
  red: '#E74C3C',
  accent: '#FF6B35',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function OrganHealth() {
  const router = useRouter();

  const organs = [
    { id: 'heart', name: 'Heart', icon: 'heart', health: 85, status: 'Excellent', color: '#E53935' },
    { id: 'lungs', name: 'Lungs', icon: 'water', health: 82, status: 'Good', color: '#1E88E5' },
    { id: 'liver', name: 'Liver', icon: 'medkit', health: 78, status: 'Good', color: '#8E24AA' },
    { id: 'kidneys', name: 'Kidneys', icon: 'drop', health: 90, status: 'Excellent', color: '#00897B' },
    { id: 'brain', name: 'Brain', icon: 'bulb', health: 88, status: 'Excellent', color: '#FDD835' },
    { id: 'stomach', name: 'Stomach', icon: 'restaurant', health: 72, status: 'Fair', color: '#FB8C00' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Organ Health</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overall Score */}
        <View style={styles.overallCard}>
          <Text style={styles.overallTitle}>Overall Organ Health</Text>
          <Text style={styles.overallScore}>83%</Text>
          <Text style={styles.overallStatus}>Excellent</Text>
        </View>

        {/* Organ Grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Body Systems</Text>
          {organs.map((organ) => (
            <TouchableOpacity key={organ.id} style={styles.organCard}>
              <View style={[styles.organIcon, { backgroundColor: organ.color + '20' }]}>
                <Ionicons name={organ.icon} size={28} color={organ.color} />
              </View>
              <View style={styles.organInfo}>
                <Text style={styles.organName}>{organ.name}</Text>
                <View style={styles.organProgress}>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${organ.health}%`, backgroundColor: organ.color }]} />
                  </View>
                  <Text style={styles.organHealth}>{organ.health}%</Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: organ.health >= 80 ? '#E8F5E9' : organ.health >= 60 ? '#FFF3E0' : '#FFEBEE' }]}>
                <Text style={[styles.statusText, { color: organ.health >= 80 ? COLORS.green : organ.health >= 60 ? COLORS.accent : COLORS.red }]}>
                  {organ.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          <View style={styles.recCard}>
            <View style={styles.recItem}>
              <Ionicons name="fitness" size={20} color={COLORS.green} />
              <Text style={styles.recText}>Regular exercise improves heart and lung function</Text>
            </View>
            <View style={styles.recItem}>
              <Ionicons name="water" size={20} color={COLORS.blue} />
              <Text style={styles.recText}>Stay hydrated for better kidney function</Text>
            </View>
            <View style={styles.recItem}>
              <Ionicons name="restaurant" size={20} color={COLORS.accent} />
              <Text style={styles.recText}>Balanced diet supports liver and stomach health</Text>
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
  infoButton: { padding: 8 },
  overallCard: { margin: 20, backgroundColor: COLORS.primary, borderRadius: 20, padding: 24, alignItems: 'center' },
  overallTitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  overallScore: { fontSize: 56, fontWeight: '800', color: COLORS.white, marginTop: 8 },
  overallStatus: { fontSize: 18, fontWeight: '600', color: COLORS.white, marginTop: 4 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  organCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  organIcon: { width: 56, height: 56, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  organInfo: { flex: 1, marginLeft: 14 },
  organName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  organProgress: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  progressBg: { flex: 1, height: 8, backgroundColor: '#F0F0F5', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4 },
  organHealth: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary, width: 35 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 10, fontWeight: '600' },
  recCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  recItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  recText: { flex: 1, fontSize: 14, color: COLORS.textSecondary, marginLeft: 12 },
  bottomPadding: { height: 40 },
});
