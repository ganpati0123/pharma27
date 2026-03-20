/**
 * ============================================================================
 * SLEEP INSIGHTS - COMPREHENSIVE SLEEP ANALYSIS
 * ============================================================================
 * Track sleep patterns, duration, quality, and get personalized recommendations
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
  purple: '#9C27B0',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function SleepInsights() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('week');

  const sleepData = {
    avgDuration: 7.2,
    avgQuality: 82,
    avgBedtime: '10:30 PM',
    avgWakeTime: '5:45 AM',
    score: 78,
  };

  const weeklyData = [
    { day: 'Mon', duration: 7.5, quality: 85 },
    { day: 'Tue', duration: 7.0, quality: 78 },
    { day: 'Wed', duration: 6.8, quality: 75 },
    { day: 'Thu', duration: 7.2, quality: 82 },
    { day: 'Fri', duration: 7.8, quality: 88 },
    { day: 'Sat', duration: 8.2, quality: 92 },
    { day: 'Sun', duration: 7.0, quality: 80 },
  ];

  const sleepStages = [
    { name: 'Deep Sleep', hours: 1.8, percentage: 25, color: '#1A237E' },
    { name: 'Light Sleep', hours: 3.6, percentage: 50, color: '#3949AB' },
    { name: 'REM', hours: 1.4, percentage: 20, color: '#5C6BC0' },
    { name: 'Awake', hours: 0.4, percentage: 5, color: '#9FA8DA' },
  ];

  const insights = [
    { type: 'positive', title: 'Great Weekend Sleep', desc: 'You got 8+ hours of sleep on Saturday!', icon: 'moon' },
    { type: 'tip', title: 'Consistent Schedule', desc: 'Try to sleep and wake at the same time daily.', icon: 'time' },
    { type: 'warning', title: 'Late Bedtime', desc: 'Your average bedtime is 10:30 PM. Aim for 10 PM.', icon: 'warning' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sleep Analysis</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Ionicons name="information-circle-outline" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Sleep Score Hero */}
        <LinearGradient colors={['#1A237E', '#3949AB']} style={styles.heroGradient}>
          <View style={styles.heroContent}>
            <Ionicons name="moon" size={48} color={COLORS.white} />
            <Text style={styles.heroTitle}>Sleep Score</Text>
            <Text style={styles.heroScore}>{sleepData.score}</Text>
            <View style={styles.heroStats}>
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>{sleepData.avgDuration}h</Text>
                <Text style={styles.heroStatLabel}>Avg Duration</Text>
              </View>
              <View style={styles.heroStatDivider} />
              <View style={styles.heroStat}>
                <Text style={styles.heroStatValue}>{sleepData.avgQuality}%</Text>
                <Text style={styles.heroStatLabel}>Quality</Text>
              </View>
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

        {/* Sleep Schedule */}
        <View style={styles.scheduleCard}>
          <Text style={styles.scheduleTitle}>Average Schedule</Text>
          <View style={styles.scheduleRow}>
            <View style={styles.scheduleItem}>
              <Ionicons name="bed" size={24} color={COLORS.purple} />
              <Text style={styles.scheduleLabel}>Bedtime</Text>
              <Text style={styles.scheduleValue}>{sleepData.avgBedtime}</Text>
            </View>
            <View style={styles.scheduleDivider} />
            <View style={styles.scheduleItem}>
              <Ionicons name="sunny" size={24} color={COLORS.accent} />
              <Text style={styles.scheduleLabel}>Wake Up</Text>
              <Text style={styles.scheduleValue}>{sleepData.avgWakeTime}</Text>
            </View>
          </View>
        </View>

        {/* Sleep Duration Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep Duration (hours)</Text>
          <View style={styles.chartCard}>
            <View style={styles.chartContainer}>
              {weeklyData.map((data, index) => (
                <View key={index} style={styles.chartBar}>
                  <View style={[styles.barFill, { height: `${(data.duration / 10) * 100}%`, backgroundColor: data.duration >= 7 ? COLORS.green : COLORS.accent }]} />
                  <Text style={styles.chartLabel}>{data.day}</Text>
                  <Text style={styles.chartValue}>{data.duration}h</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Sleep Stages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep Stages</Text>
          <View style={styles.stagesCard}>
            {sleepStages.map((stage, index) => (
              <View key={index} style={styles.stageRow}>
                <View style={[styles.stageColor, { backgroundColor: stage.color }]} />
                <Text style={styles.stageName}>{stage.name}</Text>
                <Text style={styles.stageHours}>{stage.hours}h</Text>
                <Text style={styles.stagePercent}>{stage.percentage}%</Text>
              </View>
            ))}
          </View>
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

        {/* Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep Tips</Text>
          <View style={styles.tipsCard}>
            <View style={styles.tipItem}>
              <Ionicons name="phone-portrait" size={20} color={COLORS.red} />
              <Text style={styles.tipText}>Avoid screens 1 hour before bed</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="cafe" size={20} color={COLORS.accent} />
              <Text style={styles.tipText}>Limit caffeine after 2 PM</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="thermometer" size={20} color={COLORS.blue} />
              <Text style={styles.tipText}>Keep bedroom cool (65-68°F)</Text>
            </View>
            <View style={styles.tipItem}>
              <Ionicons name="walk" size={20} color={COLORS.green} />
              <Text style={styles.tipText}>Exercise regularly, but not late</Text>
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
  heroTitle: { fontSize: 16, color: 'rgba(255,255,255,0.8)', marginTop: 12 },
  heroScore: { fontSize: 64, fontWeight: '800', color: COLORS.white },
  heroStats: { flexDirection: 'row', marginTop: 16 },
  heroStat: { alignItems: 'center', paddingHorizontal: 24 },
  heroStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.3)' },
  heroStatValue: { fontSize: 20, fontWeight: '700', color: COLORS.white },
  heroStatLabel: { fontSize: 12, color: 'rgba(255,255,255,0.8)', marginTop: 4 },
  timeSelector: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: COLORS.white, borderRadius: 12, padding: 4 },
  timeButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 10 },
  timeButtonActive: { backgroundColor: COLORS.primary },
  timeButtonText: { fontSize: 13, color: COLORS.textSecondary, fontWeight: '500' },
  timeButtonTextActive: { color: COLORS.white },
  scheduleCard: { margin: 20, backgroundColor: COLORS.white, borderRadius: 16, padding: 20 },
  scheduleTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 16 },
  scheduleRow: { flexDirection: 'row', justifyContent: 'space-around' },
  scheduleItem: { alignItems: 'center' },
  scheduleDivider: { width: 1, backgroundColor: COLORS.divider },
  scheduleLabel: { fontSize: 12, color: COLORS.textTertiary, marginTop: 8 },
  scheduleValue: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginTop: 4 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  chartCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120 },
  chartBar: { alignItems: 'center', flex: 1 },
  barFill: { width: 24, borderRadius: 8, marginBottom: 8 },
  chartLabel: { fontSize: 10, color: COLORS.textTertiary },
  chartValue: { fontSize: 10, color: COLORS.textSecondary },
  stagesCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  stageRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  stageColor: { width: 16, height: 16, borderRadius: 4, marginRight: 12 },
  stageName: { flex: 1, fontSize: 14, color: COLORS.textPrimary },
  stageHours: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, width: 50 },
  stagePercent: { fontSize: 14, color: COLORS.textSecondary, width: 50, textAlign: 'right' },
  insightCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 12, padding: 14, marginBottom: 10, borderLeftWidth: 4 },
  insightContent: { flex: 1, marginLeft: 12 },
  insightTitle: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  insightDesc: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  tipsCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  tipItem: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  tipText: { flex: 1, fontSize: 14, color: COLORS.textSecondary, marginLeft: 12 },
  bottomPadding: { height: 40 },
});
