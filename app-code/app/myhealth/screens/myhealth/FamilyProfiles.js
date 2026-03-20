/**
 * ============================================================================
 * FAMILY PROFILES - MANAGE FAMILY HEALTH
 * ============================================================================
 * Add and manage family member health profiles
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

export default function FamilyProfiles() {
  const router = useRouter();

  const familyMembers = [
    { id: 1, name: 'Ganpati', relation: 'Self', age: 28, gender: 'Male', color: COLORS.primary, icon: 'person' },
    { id: 2, name: 'Priya', relation: 'Wife', age: 26, gender: 'Female', color: '#E91E63', icon: 'woman' },
    { id: 3, name: 'Raj', relation: 'Father', age: 55, gender: 'Male', color: '#2196F3', icon: 'man' },
    { id: 4, name: 'Meera', relation: 'Mother', age: 50, gender: 'Female', color: '#9C27B0', icon: 'woman' },
  ];

  const getHealthStatus = (member) => {
    const statuses = [
      { label: 'Healthy', color: COLORS.green },
      { label: 'Needs Attention', color: COLORS.accent },
      { label: 'Under Care', color: COLORS.blue },
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Family Profiles</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="person-add-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Family Health Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Family Health Overview</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewNumber}>{familyMembers.length}</Text>
              <Text style={styles.overviewLabel}>Members</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewStat}>
              <Text style={styles.overviewNumber}>3</Text>
              <Text style={styles.overviewLabel}>Healthy</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewStat}>
              <Text style={styles.overviewNumber}>1</Text>
              <Text style={styles.overviewLabel}>Attention</Text>
            </View>
          </View>
        </View>

        {/* Family Members List */}
        {familyMembers.map((member) => {
          const status = getHealthStatus(member);
          return (
            <TouchableOpacity key={member.id} style={styles.memberCard}>
              <View style={[styles.memberAvatar, { backgroundColor: member.color + '20' }]}>
                <Ionicons name={member.icon} size={28} color={member.color} />
              </View>
              <View style={styles.memberInfo}>
                <View style={styles.memberHeader}>
                  <Text style={styles.memberName}>{member.name}</Text>
                  <View style={[styles.statusBadge, { backgroundColor: status.color + '20' }]}>
                    <Text style={[styles.statusText, { color: status.color }]}>{status.label}</Text>
                  </View>
                </View>
                <Text style={styles.memberRelation}>{member.relation} • {member.age} years • {member.gender}</Text>
                <View style={styles.memberStats}>
                  <View style={styles.memberStat}>
                    <Ionicons name="heart" size={14} color={COLORS.red} />
                    <Text style={styles.memberStatText}>72 bpm</Text>
                  </View>
                  <View style={styles.memberStat}>
                    <Ionicons name="scale" size={14} color={COLORS.teal} />
                    <Text style={styles.memberStatText}>70 kg</Text>
                  </View>
                  <View style={styles.memberStat}>
                    <Ionicons name="fitness" size={14} color={COLORS.green} />
                    <Text style={styles.memberStatText}>Active</Text>
                  </View>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={COLORS.textTertiary} />
            </TouchableOpacity>
          );
        })}

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="share-social" size={24} color={COLORS.blue} />
              <Text style={styles.actionText}>Share Records</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="notifications" size={24} color={COLORS.accent} />
              <Text style={styles.actionText}>Reminders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calendar" size={24} color={COLORS.green} />
              <Text style={styles.actionText}>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="file-tray" size={24} color={COLORS.primary} />
              <Text style={styles.actionText}>All Records</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Member Card */}
        <TouchableOpacity style={styles.addMemberCard}>
          <Ionicons name="add-circle" size={32} color={COLORS.primary} />
          <View style={styles.addMemberContent}>
            <Text style={styles.addMemberTitle}>Add Family Member</Text>
            <Text style={styles.addMemberSubtitle}>Track health of your loved ones</Text>
          </View>
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
  overviewCard: { margin: 20, backgroundColor: COLORS.primary, borderRadius: 20, padding: 20 },
  overviewTitle: { fontSize: 16, fontWeight: '600', color: COLORS.white, marginBottom: 16 },
  overviewStats: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
  overviewStat: { alignItems: 'center' },
  overviewNumber: { fontSize: 28, fontWeight: '700', color: COLORS.white },
  overviewLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  overviewDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.3)' },
  memberCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 12, backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  memberAvatar: { width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  memberInfo: { flex: 1 },
  memberHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  memberName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginRight: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: '600' },
  memberRelation: { fontSize: 12, color: COLORS.textTertiary },
  memberStats: { flexDirection: 'row', marginTop: 8, gap: 12 },
  memberStat: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  memberStatText: { fontSize: 11, color: COLORS.textSecondary },
  actionsSection: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  actionText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8 },
  addMemberCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginTop: 24, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed' },
  addMemberContent: { marginLeft: 12 },
  addMemberTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  addMemberSubtitle: { fontSize: 12, color: COLORS.textSecondary },
  bottomPadding: { height: 40 },
});
