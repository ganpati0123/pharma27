/**
 * ============================================================================
 * HEALTH GOALS - TRACK YOUR PROGRESS
 * ============================================================================
 * Set and track personal health goals with progress monitoring
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

export default function HealthGoals() {
  const router = useRouter();

  const goals = [
    { id: 1, title: 'Daily Steps', current: 7500, target: 10000, unit: 'steps', icon: 'walk', color: COLORS.green, streak: 12 },
    { id: 2, title: 'Water Intake', current: 6, target: 8, unit: 'glasses', icon: 'water', color: COLORS.blue, streak: 5 },
    { id: 3, title: 'Sleep Duration', current: 7.2, target: 8, unit: 'hours', icon: 'moon', color: '#9C27B0', streak: 3 },
    { id: 4, title: 'Workout Minutes', current: 35, target: 45, unit: 'min', icon: 'fitness', color: COLORS.accent, streak: 7 },
    { id: 5, title: 'Calories Burned', current: 320, target: 500, unit: 'kcal', icon: 'flame', color: COLORS.red, streak: 4 },
    { id: 6, title: 'Meditation', current: 12, target: 15, unit: 'min', icon: 'leaf', color: COLORS.green, streak: 2 },
  ];

  const achievements = [
    { id: 1, title: '🏆 7-Day Streak', desc: 'Complete 7 days in a row', earned: true },
    { id: 2, title: '💧 Hydration Hero', desc: 'Drink 8 glasses for 5 days', earned: true },
    { id: 3, title: '😴 Sleep Master', desc: 'Sleep 8+ hours for 7 days', earned: false },
    { id: 4, title: '🏃 Runner', desc: 'Walk 10,000 steps', earned: true },
    { id: 5, title: '🧘 Zen Mind', desc: 'Meditate for 30 days', earned: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Goals</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Overall Progress */}
        <LinearGradient colors={[COLORS.primary, COLORS.primaryLight]} style={styles.overallProgress}>
          <View style={styles.progressCircle}>
            <Text style={styles.progressNumber}>73%</Text>
            <Text style={styles.progressLabel}>Overall Progress</Text>
          </View>
          <View style={styles.progressStats}>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNumber}>4/6</Text>
              <Text style={styles.progressStatLabel}>Goals Achieved</Text>
            </View>
            <View style={styles.progressStat}>
              <Text style={styles.progressStatNumber}>12</Text>
              <Text style={styles.progressStatLabel}>Day Streak</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Goals List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Goals</Text>
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100;
            return (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <View style={[styles.goalIcon, { backgroundColor: goal.color + '20' }]}>
                    <Ionicons name={goal.icon} size={20} color={goal.color} />
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalProgress}>{goal.current} / {goal.target} {goal.unit}</Text>
                  </View>
                  <View style={styles.streakBadge}>
                    <Ionicons name="flame" size={12} color={COLORS.accent} />
                    <Text style={styles.streakText}>{goal.streak}</Text>
                  </View>
                </View>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${progress}%`, backgroundColor: goal.color }]} />
                </View>
                <View style={styles.goalActions}>
                  <TouchableOpacity style={styles.logButton}>
                    <Ionicons name="add-circle-outline" size={16} color={COLORS.primary} />
                    <Text style={styles.logText}>Log Activity</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editText}>Edit Goal</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((achievement) => (
              <View 
                key={achievement.id} 
                style={[styles.achievementCard, !achievement.earned && styles.achievementLocked]}
              >
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={[styles.achievementDesc, !achievement.earned && styles.achievementDescLocked]}>
                  {achievement.desc}
                </Text>
                {achievement.earned && (
                  <View style={styles.earnedBadge}>
                    <Ionicons name="checkmark-circle" size={16} color={COLORS.green} />
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Weekly Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Summary</Text>
          <View style={styles.weeklyCard}>
            <View style={styles.weeklyRow}>
              <Text style={styles.weeklyLabel}>Goals Completed</Text>
              <Text style={styles.weeklyValue}>4/6</Text>
            </View>
            <View style={styles.weeklyRow}>
              <Text style={styles.weeklyLabel}>Best Streak</Text>
              <Text style={styles.weeklyValue}>12 days</Text>
            </View>
            <View style={styles.weeklyRow}>
              <Text style={styles.weeklyLabel}>Most Consistent</Text>
              <Text style={styles.weeklyValue}>Daily Steps</Text>
            </View>
            <View style={styles.weeklyRow}>
              <Text style={styles.weeklyLabel}>Needs Improvement</Text>
              <Text style={styles.weeklyValue}>Meditation</Text>
            </View>
          </View>
        </View>

        {/* Add Goal */}
        <TouchableOpacity style={styles.addGoalCard}>
          <Ionicons name="add-circle-outline" size={32} color={COLORS.primary} />
          <Text style={styles.addGoalText}>Create New Goal</Text>
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
  overallProgress: { margin: 20, borderRadius: 20, padding: 24 },
  progressCircle: { alignItems: 'center', marginBottom: 20 },
  progressNumber: { fontSize: 48, fontWeight: '800', color: COLORS.white },
  progressLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)' },
  progressStats: { flexDirection: 'row', justifyContent: 'space-around' },
  progressStat: { alignItems: 'center' },
  progressStatNumber: { fontSize: 24, fontWeight: '700', color: COLORS.white },
  progressStatLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  goalCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  goalHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  goalIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  goalInfo: { flex: 1 },
  goalTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  goalProgress: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  streakBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  streakText: { fontSize: 12, fontWeight: '600', color: COLORS.accent, marginLeft: 4 },
  progressBarBg: { height: 8, backgroundColor: '#F0F0F5', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  goalActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  logButton: { flexDirection: 'row', alignItems: 'center' },
  logText: { fontSize: 13, color: COLORS.primary, fontWeight: '600', marginLeft: 4 },
  editButton: {},
  editText: { fontSize: 13, color: COLORS.textTertiary },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  achievementCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 12, padding: 12, position: 'relative' },
  achievementLocked: { opacity: 0.5 },
  achievementTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  achievementDesc: { fontSize: 11, color: COLORS.textSecondary, marginTop: 4 },
  achievementDescLocked: { color: COLORS.textTertiary },
  earnedBadge: { position: 'absolute', top: 8, right: 8 },
  weeklyCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  weeklyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  weeklyLabel: { fontSize: 14, color: COLORS.textSecondary },
  weeklyValue: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  addGoalCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginHorizontal: 20, marginTop: 24, backgroundColor: COLORS.white, borderRadius: 16, padding: 20, borderWidth: 2, borderColor: COLORS.primary, borderStyle: 'dashed' },
  addGoalText: { fontSize: 15, fontWeight: '600', color: COLORS.primary, marginLeft: 8 },
  bottomPadding: { height: 40 },
});
