/**
 * ============================================================================
 * FITNESS INSIGHTS - ACTIVITY & WORKOUT TRACKING
 * ============================================================================
 * Comprehensive fitness analytics with workouts, calories, steps, and trends
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

export default function FitnessInsights() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('week');

  const fitnessData = {
    steps: 7500,
    calories: 320,
    activeMinutes: 45,
    distance: 5.2,
    workouts: 4,
    score: 82,
  };

  const weeklySteps = [6500, 8200, 7000, 9100, 8500, 6200, 7500];

  const recentWorkouts = [
    { id: 1, name: 'Morning Run', duration: '30 min', calories: 280, date: 'Today', icon: 'walk' },
    { id: 2, name: 'Weight Training', duration: '45 min', calories: 350, date: 'Yesterday', icon: 'fitness' },
    { id: 3, name: 'Yoga Session', duration: '60 min', calories: 180, date: 'Mar 17', icon: 'leaf' },
    { id: 4, name: 'Cycling', duration: '40 min', calories: 320, date: 'Mar 16', icon: 'bicycle' },
  ];

  const goals = [
    { name: 'Steps', current: 7500, target: 10000, color: COLORS.blue },
    { name: 'Calories', current: 320, target: 500, color: COLORS.accent },
    { name: 'Active Min', current: 45, target: 60, color: COLORS.green },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fitness Activity</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="trophy" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Fitness Score Hero */}
        <LinearGradient colors={[COLORS.green, '#4CAF50']} style={styles.heroGradient}>
          <View style={styles.heroContent}>
            <Ionicons name="fitness" size={48} color={COLORS.white} />
            <Text style={styles.heroTitle}>Fitness Score</Text>
            <Text style={styles.heroScore}>{fitnessData.score}</Text>
            <Text style={styles.heroStatus}>Excellent</Text>
          </View>
        </LinearGradient>

        {/* Time Range Selector */}
        <View style={styles.timeSelector}>
          {['week', 'month', 'year'].map((range) => (
            <TouchableOpacity key={range} style={[styles.timeButton, timeRange === range && styles.timeButtonActive]} onPress={() => setTimeRange(range)}>
              <Text style={[styles.timeButtonText, timeRange === range && styles.timeButtonTextActive]}>
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="walk" size={24} color={COLORS.blue} />
            <Text style={styles.statValue}>{fitnessData.steps.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="flame" size={24} color={COLORS.accent} />
            <Text style={styles.statValue}>{fitnessData.calories}</Text>
            <Text style={styles.statLabel}>Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="timer" size={24} color={COLORS.green} />
            <Text style={styles.statValue}>{fitnessData.activeMinutes}</Text>
            <Text style={styles.statLabel}>Active Min</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="map" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{fitnessData.distance}</Text>
            <Text style={styles.statLabel}>KM</Text>
          </View>
        </View>

        {/* Steps Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Steps</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {weeklySteps.map((steps, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={[styles.barFill, { height: `${(steps / 12000) * 100}%`, backgroundColor: steps >= 10000 ? COLORS.green : steps >= 7000 ? COLORS.blue : COLORS.accent }]} />
                  <Text style={styles.chartLabel}>{['M','T','W','T','F','S','S'][index]}</Text>
                  <Text style={styles.chartValue}>{Math.round(steps/1000)}k</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Goals Progress */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          {goals.map((goal, index) => (
            <View key={index} style={styles.goalCard}>
              <View style={styles.goalHeader}>
                <Text style={styles.goalName}>{goal.name}</Text>
                <Text style={styles.goalProgress}>{goal.current} / {goal.target}</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${(goal.current / goal.target) * 100}%`, backgroundColor: goal.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          {recentWorkouts.map((workout) => (
            <View key={workout.id} style={styles.workoutCard}>
              <View style={[styles.workoutIcon, { backgroundColor: COLORS.green + '20' }]}>
                <Ionicons name={workout.icon} size={24} color={COLORS.green} />
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <Text style={styles.workoutDetails}>{workout.duration} • {workout.calories} cal</Text>
              </View>
              <Text style={styles.workoutDate}>{workout.date}</Text>
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
  infoButton: { padding: 8 },
  heroGradient: { margin: 20, borderRadius: 24, padding: 24 },
  heroContent: { alignItems: 'center' },
  heroTitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 12 },
  heroScore: { fontSize: 64, fontWeight: '800', color: COLORS.white },
  heroStatus: { fontSize: 18, fontWeight: '600', color: COLORS.white, marginTop: 8 },
  timeSelector: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 12, padding: 4 },
  timeButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  timeButtonActive: { backgroundColor: COLORS.primary },
  timeButtonText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  timeButtonTextActive: { color: COLORS.white },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10, marginTop: 20 },
  statCard: { width: (SCREEN_WIDTH - 46) / 2, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '700', color: COLORS.textPrimary, marginTop: 8 },
  statLabel: { fontSize: 12, color: COLORS.textTertiary, marginTop: 4 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  chartCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  chartBar: { alignItems: 'center', flex: 1 },
  barFill: { width: 24, borderRadius: 8, marginBottom: 8 },
  chartLabel: { fontSize: 10, color: COLORS.textTertiary },
  chartValue: { fontSize: 10, color: COLORS.textSecondary },
  goalCard: { backgroundColor: COLORS.white, borderRadius: 12, padding: 16, marginBottom: 10 },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  goalName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  goalProgress: { fontSize: 12, color: COLORS.textSecondary },
  progressBarBg: { height: 8, backgroundColor: '#F0F0F0', borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  workoutCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 10 },
  workoutIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  workoutInfo: { flex: 1, marginLeft: 12 },
  workoutName: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  workoutDetails: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  workoutDate: { fontSize: 12, color: COLORS.textTertiary },
  bottomPadding: { height: 40 },
});
