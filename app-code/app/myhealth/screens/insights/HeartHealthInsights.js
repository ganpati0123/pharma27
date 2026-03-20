/**
 * ============================================================================
 * HEART HEALTH INSIGHTS - DETAILED CARDIOVASCULAR ANALYSIS
 * ============================================================================
 * Comprehensive heart health analytics with trends, recommendations, and predictions
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
  teal: '#00BCD4',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function HeartHealthInsights() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('week');

  const heartData = {
    currentBPM: 72,
    restingBPM: 68,
    maxBPM: 142,
    avgBPM: 74,
    trend: 'stable',
    score: 85,
  };

  const weeklyData = [
    { day: 'Mon', bpm: 72, systolic: 118, diastolic: 78 },
    { day: 'Tue', bpm: 70, systolic: 120, diastolic: 80 },
    { day: 'Wed', bpm: 75, systolic: 122, diastolic: 82 },
    { day: 'Thu', bpm: 68, systolic: 116, diastolic: 76 },
    { day: 'Fri', bpm: 74, systolic: 119, diastolic: 79 },
    { day: 'Sat', bpm: 78, systolic: 124, diastolic: 84 },
    { day: 'Sun', bpm: 72, systolic: 120, diastolic: 80 },
  ];

  const insights = [
    { type: 'positive', title: 'Excellent Resting Heart Rate', desc: 'Your resting heart rate is in the healthy range (60-100 bpm)', icon: 'heart' },
    { type: 'warning', title: 'BP Fluctuation Detected', desc: 'Your blood pressure showed slight elevation on Saturday', icon: 'trending-up' },
    { type: 'tip', title: 'Benefits of Exercise', desc: 'Regular cardio can lower your resting heart rate by 5-10 bpm', icon: 'fitness' },
  ];

  const recommendations = [
    { title: 'Maintain Regular Exercise', priority: 'high', impact: '+10% heart health' },
    { title: 'Reduce Sodium Intake', priority: 'medium', impact: 'BP control' },
    { title: 'Monitor Stress Levels', priority: 'medium', impact: 'HR stability' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Heart Health</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Heart Score Hero */}
        <LinearGradient colors={[COLORS.red, '#FF6B6B']} style={styles.heroGradient}>
          <View style={styles.heroContent}>
            <View style={styles.heartIcon}>
              <Ionicons name="heart" size={40} color={COLORS.white} />
            </View>
            <Text style={styles.heroTitle}>Heart Health Score</Text>
            <Text style={styles.heroScore}>{heartData.score}</Text>
            <Text style={styles.heroStatus}>Excellent</Text>
          </View>
        </LinearGradient>

        {/* Time Range Selector */}
        <View style={styles.timeSelector}>
          {['week', 'month', 'year'].map((range) => (
            <TouchableOpacity
              key={range}
              style={[styles.timeButton, timeRange === range && styles.timeButtonActive]}
              onPress={() => setTimeRange(range)}
            >
              <Text style={[styles.timeButtonText, timeRange === range && styles.timeButtonTextActive]}>
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Heart Rate Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="pulse" size={24} color={COLORS.red} />
            <Text style={styles.statValue}>{heartData.currentBPM}</Text>
            <Text style={styles.statLabel}>Current BPM</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="bed" size={24} color={COLORS.blue} />
            <Text style={styles.statValue}>{heartData.restingBPM}</Text>
            <Text style={styles.statLabel}>Resting BPM</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="fitness" size={24} color={COLORS.green} />
            <Text style={styles.statValue}>{heartData.maxBPM}</Text>
            <Text style={styles.statLabel}>Max BPM</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="analytics" size={24} color={COLORS.accent} />
            <Text style={styles.statValue}>{heartData.avgBPM}</Text>
            <Text style={styles.statLabel}>Average BPM</Text>
          </View>
        </View>

        {/* Heart Rate Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Heart Rate Trend</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {weeklyData.map((data, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={[styles.barFill, { height: `${(data.bpm / 100) * 100}%` }]} />
                  <Text style={styles.chartLabel}>{data.day}</Text>
                  <Text style={styles.chartValue}>{data.bpm}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Blood Pressure Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Blood Pressure Trend</Text>
          <View style={styles.bpCard}>
            <View style={styles.bpRow}>
              <View style={styles.bpItem}>
                <Text style={styles.bpLabel}>Systolic</Text>
                <Text style={[styles.bpValue, { color: COLORS.red }]}>120</Text>
                <Text style={styles.bpUnit}>mmHg avg</Text>
              </View>
              <View style={styles.bpDivider} />
              <View style={styles.bpItem}>
                <Text style={styles.bpLabel}>Diastolic</Text>
                <Text style={[styles.bpValue, { color: COLORS.blue }]}>80</Text>
                <Text style={styles.bpUnit}>mmHg avg</Text>
              </View>
            </View>
            <View style={styles.bpStatus}>
              <View style={[styles.bpStatusBadge, { backgroundColor: COLORS.green + '20' }]}>
                <Text style={[styles.bpStatusText, { color: COLORS.green }]}>Normal</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          {insights.map((insight, index) => (
            <View key={index} style={[styles.insightCard, { borderLeftColor: insight.type === 'positive' ? COLORS.green : insight.type === 'warning' ? COLORS.accent : COLORS.blue }]}>
              <Ionicons 
                name={insight.icon} 
                size={20} 
                color={insight.type === 'positive' ? COLORS.green : insight.type === 'warning' ? COLORS.accent : COLORS.blue} 
              />
              <View style={styles.insightContent}>
                <Text style={styles.insightTitle}>{insight.title}</Text>
                <Text style={styles.insightDesc}>{insight.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommendations</Text>
          {recommendations.map((rec, index) => (
            <View key={index} style={styles.recommendationCard}>
              <View style={styles.recHeader}>
                <Text style={styles.recTitle}>{rec.title}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: rec.priority === 'high' ? '#FFEBEE' : '#FFF3E0' }]}>
                  <Text style={[styles.priorityText, { color: rec.priority === 'high' ? COLORS.red : COLORS.accent }]}>{rec.priority}</Text>
                </View>
              </View>
              <Text style={styles.recImpact}>{rec.impact}</Text>
              <TouchableOpacity style={styles.recAction}>
                <Text style={styles.recActionText}>Start Now</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Risk Assessment */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Risk Assessment</Text>
          <View style={styles.riskCard}>
            <View style={styles.riskMeter}>
              <View style={[styles.riskFill, { width: '15%', backgroundColor: COLORS.green }]} />
            </View>
            <View style={styles.riskLabels}>
              <Text style={styles.riskLabel}>Low Risk</Text>
              <Text style={styles.riskLabel}>Medium</Text>
              <Text style={styles.riskLabel}>High</Text>
            </View>
            <Text style={styles.riskDesc}>Based on your current metrics, your cardiovascular risk is low. Keep up the good work!</Text>
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
  heroGradient: { margin: 20, borderRadius: 24, padding: 24 },
  heroContent: { alignItems: 'center' },
  heartIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  heroTitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 16 },
  heroScore: { fontSize: 64, fontWeight: '800', color: COLORS.white },
  heroStatus: { fontSize: 18, fontWeight: '600', color: COLORS.white },
  timeSelector: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 12, padding: 4 },
  timeButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  timeButtonActive: { backgroundColor: COLORS.primary },
  timeButtonText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  timeButtonTextActive: { color: COLORS.white },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10, marginTop: 20 },
  statCard: { width: (SCREEN_WIDTH - 46) / 2, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '700', color: COLORS.textPrimary, marginTop: 8 },
  statLabel: { fontSize: 12, color: COLORS.textTertiary, marginTop: 4 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  chartCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 140 },
  chartBar: { alignItems: 'center', flex: 1 },
  barFill: { width: 24, backgroundColor: COLORS.red, borderRadius: 8, marginBottom: 8 },
  chartLabel: { fontSize: 10, color: COLORS.textTertiary },
  chartValue: { fontSize: 10, color: COLORS.textSecondary, marginTop: 2 },
  bpCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20 },
  bpRow: { flexDirection: 'row', justifyContent: 'space-around' },
  bpItem: { alignItems: 'center' },
  bpLabel: { fontSize: 12, color: COLORS.textTertiary },
  bpValue: { fontSize: 32, fontWeight: '700', marginTop: 8 },
  bpUnit: { fontSize: 11, color: COLORS.textTertiary },
  bpDivider: { width: 1, backgroundColor: COLORS.divider },
  bpStatus: { marginTop: 16, alignItems: 'center' },
  bpStatusBadge: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  bpStatusText: { fontSize: 13, fontWeight: '600' },
  insightCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 10, borderLeftWidth: 4 },
  insightContent: { flex: 1, marginLeft: 12 },
  insightTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  insightDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  recommendationCard: { backgroundColor: COLORS.white, borderRadius: 12, padding: 16, marginBottom: 10 },
  recHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  recTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, flex: 1 },
  priorityBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  priorityText: { fontSize: 10, fontWeight: '600', textTransform: 'capitalize' },
  recImpact: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8 },
  recAction: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  recActionText: { fontSize: 13, fontWeight: '600', color: COLORS.primary },
  riskCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 20 },
  riskMeter: { height: 12, backgroundColor: '#F0F0F0', borderRadius: 6, overflow: 'hidden' },
  riskFill: { height: '100%', borderRadius: 6 },
  riskLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  riskLabel: { fontSize: 11, color: COLORS.textTertiary },
  riskDesc: { fontSize: 13, color: COLORS.textSecondary, marginTop: 16, lineHeight: 20 },
  bottomPadding: { height: 40 },
});
