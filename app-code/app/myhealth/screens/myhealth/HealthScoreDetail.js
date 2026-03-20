/**
 * ============================================================================
 * HEALTH SCORE DETAIL - PREMIUM ANALYTICS DASHBOARD
 * ============================================================================
 * Comprehensive health score analysis with trends, breakdowns, and recommendations
 */

import React, { useState, useMemo } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#6B4C9A',
  primaryLight: '#8B6CBF',
  primaryDark: '#4A3570',
  accent: '#FF6B35',
  green: '#00A651',
  gold: '#FFD700',
  red: '#E74C3C',
  blue: '#0088FF',
  teal: '#00BCD4',
  white: '#FFFFFF',
  background: '#F5F5F8',
  cardWhite: '#FFFFFF',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  border: '#E8E8F0',
  divider: '#EBEBF5',
};

export default function HealthScoreDetail() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const scoreData = useMemo(() => ({
    score: 78,
    previousScore: 72,
    trend: 'up',
    category: 'Excellent',
    breakdown: [
      { name: 'Physical Fitness', score: 85, color: '#4CAF50' },
      { name: 'Nutrition', score: 72, color: '#FF9800' },
      { name: 'Sleep Quality', score: 68, color: '#2196F3' },
      { name: 'Stress Management', score: 80, color: '#9C27B0' },
      { name: 'Hydration', score: 90, color: '#00BCD4' },
      { name: 'Activity Level', score: 75, color: '#FF5722' },
    ],
    weeklyData: [
      { day: 'Mon', score: 72 },
      { day: 'Tue', score: 74 },
      { day: 'Wed', score: 71 },
      { day: 'Thu', score: 76 },
      { day: 'Fri', score: 78 },
      { day: 'Sat', score: 80 },
      { day: 'Sun', score: 78 },
    ],
    recommendations: [
      { title: 'Improve Sleep', desc: 'Aim for 7-8 hours of sleep', impact: '+5 points', icon: 'moon' },
      { title: 'More Water', desc: 'Drink 8 glasses daily', impact: '+3 points', icon: 'water' },
      { title: 'Exercise', desc: 'Add 30 min workout', impact: '+4 points', icon: 'fitness' },
    ],
  }), []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Score</Text>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Score Section */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.heroGradient}
        >
          <View style={styles.scoreCircleContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNumber}>{scoreData.score}</Text>
              <Text style={styles.scoreLabel}>Health Score</Text>
            </View>
            <View style={styles.scoreTrend}>
              <Ionicons name="trending-up" size={20} color={COLORS.green} />
              <Text style={styles.trendText}>+{scoreData.score - scoreData.previousScore} from last month</Text>
            </View>
          </View>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{scoreData.category}</Text>
          </View>
        </LinearGradient>

        {/* Period Selector */}
        <View style={styles.periodSelector}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[styles.periodButton, selectedPeriod === period && styles.periodButtonActive]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[styles.periodText, selectedPeriod === period && styles.periodTextActive]}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Weekly Trend Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weekly Trend</Text>
          <View style={styles.chartContainer}>
            {scoreData.weeklyData.map((item, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.barFill, { height: `${item.score}%` }]} />
                <Text style={styles.chartLabel}>{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Score Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Score Breakdown</Text>
          {scoreData.breakdown.map((item, index) => (
            <View key={index} style={styles.breakdownItem}>
              <View style={styles.breakdownHeader}>
                <Text style={styles.breakdownName}>{item.name}</Text>
                <Text style={[styles.breakdownScore, { color: item.color }]}>{item.score}%</Text>
              </View>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${item.score}%`, backgroundColor: item.color }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Improve Your Score</Text>
          {scoreData.recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <View style={styles.recIconContainer}>
                <Ionicons name={rec.icon} size={24} color={COLORS.primary} />
              </View>
              <View style={styles.recContent}>
                <Text style={styles.recTitle}>{rec.title}</Text>
                <Text style={styles.recDesc}>{rec.desc}</Text>
              </View>
              <View style={styles.recImpact}>
                <Text style={styles.impactText}>{rec.impact}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {['🏆 7-Day Streak', '💧 Hydration Hero', '😴 Sleep Master', '🚶 Activity Champion'].map((achievement, index) => (
              <View key={index} style={styles.achievementCard}>
                <Text style={styles.achievementText}>{achievement}</Text>
              </View>
            ))}
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
  shareButton: { padding: 8 },
  heroGradient: { margin: 20, borderRadius: 24, padding: 24, alignItems: 'center' },
  scoreCircleContainer: { alignItems: 'center' },
  scoreCircle: { width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: 'rgba(255,255,255,0.5)' },
  scoreNumber: { fontSize: 56, fontWeight: '800', color: COLORS.white },
  scoreLabel: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  scoreTrend: { flexDirection: 'row', alignItems: 'center', marginTop: 12, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  trendText: { color: COLORS.white, fontSize: 12, marginLeft: 4 },
  categoryBadge: { marginTop: 16, backgroundColor: COLORS.green, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  categoryText: { color: COLORS.white, fontWeight: '600', fontSize: 14 },
  periodSelector: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 12, padding: 4 },
  periodButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  periodButtonActive: { backgroundColor: COLORS.primary },
  periodText: { fontSize: 14, color: COLORS.textSecondary, fontWeight: '500' },
  periodTextActive: { color: COLORS.white, fontWeight: '600' },
  section: { marginTop: 24, marginHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 150, backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  chartBar: { alignItems: 'center', flex: 1 },
  barFill: { width: 24, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 8 },
  chartLabel: { fontSize: 10, color: COLORS.textTertiary },
  breakdownItem: { marginBottom: 16 },
  breakdownHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  breakdownName: { fontSize: 14, color: COLORS.textPrimary },
  breakdownScore: { fontSize: 14, fontWeight: '700' },
  progressBarBg: { height: 8, backgroundColor: COLORS.border, borderRadius: 4, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 4 },
  recommendationCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  recIconContainer: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#F0E6FF', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  recContent: { flex: 1 },
  recTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  recDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  recImpact: { backgroundColor: '#E8F5E9', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8 },
  impactText: { fontSize: 12, fontWeight: '600', color: COLORS.green },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  achievementCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  achievementText: { fontSize: 14, fontWeight: '500', color: COLORS.textPrimary },
  bottomPadding: { height: 40 },
});
