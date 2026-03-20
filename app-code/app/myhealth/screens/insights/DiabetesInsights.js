/**
 * ============================================================================
 * DIABETES INSIGHTS - BLOOD SUGAR TRACKING & ANALYSIS
 * ============================================================================
 * Comprehensive diabetes management with glucose trends, predictions, and diet recommendations
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

export default function DiabetesInsights() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('week');

  const glucoseData = {
    fasting: 95,
    postMeal: 120,
    hba1c: 5.8,
    trend: 'stable',
    score: 78,
  };

  const glucoseReadings = [
    { time: 'Morning', value: 95, status: 'normal' },
    { time: 'Before Lunch', value: 102, status: 'normal' },
    { time: 'After Lunch', value: 125, status: 'elevated' },
    { time: 'Before Dinner', value: 98, status: 'normal' },
    { time: 'Bedtime', value: 105, status: 'normal' },
  ];

  const weeklyTrend = [92, 98, 95, 100, 97, 95, 95];

  const insights = [
    { type: 'warning', title: 'Post-Lunch Spike', desc: 'Your blood sugar rises after lunch. Consider lighter meals.', icon: 'warning' },
    { type: 'positive', title: 'Consistent Fasting', desc: 'Your fasting glucose is stable within normal range.', icon: 'checkmark-circle' },
    { type: 'tip', title: 'Fiber Intake', desc: 'Add more fiber to help control post-meal spikes.', icon: 'nutrition' },
  ];

  const recommendations = [
    { title: 'Reduce Carb Intake at Lunch', priority: 'high', impact: 'Lower post-meal glucose' },
    { title: 'Add 30min Walk After Meals', priority: 'medium', impact: 'Improve insulin sensitivity' },
    { title: 'Increase Water Intake', priority: 'low', impact: 'Better glucose metabolism' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diabetes Care</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Diabetes Score Hero */}
        <LinearGradient colors={[COLORS.accent, '#FF8F5E']} style={styles.heroGradient}>
          <View style={styles.heroContent}>
            <View style={styles.heroIcon}>
              <Ionicons name="water" size={40} color={COLORS.white} />
            </View>
            <Text style={styles.heroTitle}>Diabetes Management</Text>
            <Text style={styles.heroScore}>{glucoseData.score}</Text>
            <View style={[styles.statusBadge, { backgroundColor: 'rgba(255,255,255,0.3)' }]}>
              <Text style={styles.statusText}>Prediabetic Risk</Text>
            </View>
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

        {/* Glucose Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="sunny" size={24} color={COLORS.accent} />
            <Text style={styles.statValue}>{glucoseData.fasting}</Text>
            <Text style={styles.statLabel}>Fasting (mg/dL)</Text>
            <Text style={[styles.statStatus, { color: COLORS.green }]}>Normal</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="restaurant" size={24} color={COLORS.blue} />
            <Text style={styles.statValue}>{glucoseData.postMeal}</Text>
            <Text style={styles.statLabel}>Post Meal (mg/dL)</Text>
            <Text style={[styles.statStatus, { color: COLORS.accent }]}>Elevated</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="analytics" size={24} color={COLORS.primary} />
            <Text style={styles.statValue}>{glucoseData.hba1c}%</Text>
            <Text style={styles.statLabel}>HbA1c</Text>
            <Text style={[styles.statStatus, { color: COLORS.accent }]}>Prediabetic</Text>
          </View>
        </View>

        {/* Glucose Trend Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Glucose Trend (mg/dL)</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {weeklyTrend.map((value, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={[styles.barFill, { height: `${(value / 180) * 100}%`, backgroundColor: value > 130 ? COLORS.red : value > 100 ? COLORS.accent : COLORS.green }]} />
                  <Text style={styles.chartLabel}>{['M','T','W','T','F','S','S'][index]}</Text>
                  <Text style={styles.chartValue}>{value}</Text>
                </View>
              ))}
            </View>
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.green }]} />
                <Text style={styles.legendText}>Normal (&lt;100)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.accent }]} />
                <Text style={styles.legendText}>Elevated (100-130)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: COLORS.red }]} />
                <Text style={styles.legendText}>High (&gt;130)</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Daily Readings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Readings</Text>
          {glucoseReadings.map((reading, index) => (
            <View key={index} style={styles.readingCard}>
              <Text style={styles.readingTime}>{reading.time}</Text>
              <View style={styles.readingValue}>
                <Text style={styles.readingNumber}>{reading.value}</Text>
                <Text style={styles.readingUnit}>mg/dL</Text>
              </View>
              <View style={[styles.readingStatus, { backgroundColor: reading.status === 'normal' ? '#E8F5E9' : '#FFF3E0' }]}>
                <Text style={[styles.readingStatusText, { color: reading.status === 'normal' ? COLORS.green : COLORS.accent }]}>{reading.status}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          {insights.map((insight, index) => (
            <View key={index} style={[styles.insightCard, { borderLeftColor: insight.type === 'positive' ? COLORS.green : insight.type === 'warning' ? COLORS.accent : COLORS.blue }]}>
              <Ionicons name={insight.icon} size={20} color={insight.type === 'positive' ? COLORS.green : insight.type === 'warning' ? COLORS.accent : COLORS.blue} />
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
                <View style={[styles.priorityBadge, { backgroundColor: rec.priority === 'high' ? '#FFEBEE' : rec.priority === 'medium' ? '#FFF3E0' : '#E3F2FD' }]}>
                  <Text style={[styles.priorityText, { color: rec.priority === 'high' ? COLORS.red : rec.priority === 'medium' ? COLORS.accent : COLORS.blue }]}>{rec.priority}</Text>
                </View>
              </View>
              <Text style={styles.recImpact}>{rec.impact}</Text>
              <TouchableOpacity style={styles.recAction}>
                <Text style={styles.recActionText}>Take Action</Text>
                <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Food Recommendations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diet Suggestions</Text>
          <View style={styles.dietCard}>
            <View style={styles.dietRow}>
              <View style={styles.dietIconGreen}>
                <Ionicons name="checkmark-circle" size={20} color={COLORS.green} />
              </View>
              <View style={styles.dietContent}>
                <Text style={styles.dietTitle}>Include More</Text>
                <Text style={styles.dietItems}>Leafy greens, whole grains, nuts, berries</Text>
              </View>
            </View>
            <View style={styles.dietRow}>
              <View style={styles.dietIconRed}>
                <Ionicons name="close-circle" size={20} color={COLORS.red} />
              </View>
              <View style={styles.dietContent}>
                <Text style={styles.dietTitle}>Limit</Text>
                <Text style={styles.dietItems}>White rice, sugary drinks, processed foods</Text>
              </View>
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
  heroGradient: { margin: 20, borderRadius: 24, padding: 24 },
  heroContent: { alignItems: 'center' },
  heroIcon: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  heroTitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 16 },
  heroScore: { fontSize: 64, fontWeight: '800', color: COLORS.white },
  statusBadge: { marginTop: 12, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  statusText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  timeSelector: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 12, padding: 4 },
  timeButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  timeButtonActive: { backgroundColor: COLORS.primary },
  timeButtonText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  timeButtonTextActive: { color: COLORS.white },
  statsGrid: { flexDirection: 'row', paddingHorizontal: 16, gap: 10, marginTop: 20 },
  statCard: { flex: 1, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 28, fontWeight: '700', color: COLORS.textPrimary, marginTop: 8 },
  statLabel: { fontSize: 10, color: COLORS.textTertiary, marginTop: 4, textAlign: 'center' },
  statStatus: { fontSize: 10, fontWeight: '600', marginTop: 4 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  chartCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  chartBar: { alignItems: 'center', flex: 1 },
  barFill: { width: 24, borderRadius: 8, marginBottom: 8 },
  chartLabel: { fontSize: 10, color: COLORS.textTertiary },
  chartValue: { fontSize: 10, color: COLORS.textSecondary },
  chartLegend: { flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 16, flexWrap: 'wrap' },
  legendItem: { flexDirection: 'row', alignItems: 'center' },
  legendDot: { width: 8, height: 8, borderRadius: 4, marginRight: 4 },
  legendText: { fontSize: 10, color: COLORS.textTertiary },
  readingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 8 },
  readingTime: { flex: 1, fontSize: 14, color: COLORS.textSecondary },
  readingValue: { flexDirection: 'row', alignItems: 'baseline', marginRight: 12 },
  readingNumber: { fontSize: 20, fontWeight: '700', color: COLORS.textPrimary },
  readingUnit: { fontSize: 11, color: COLORS.textTertiary, marginLeft: 2 },
  readingStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  readingStatusText: { fontSize: 11, fontWeight: '600', textTransform: 'capitalize' },
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
  dietCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  dietRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 },
  dietIconGreen: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  dietIconRed: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center' },
  dietContent: { flex: 1, marginLeft: 12 },
  dietTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  dietItems: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  bottomPadding: { height: 40 },
});
