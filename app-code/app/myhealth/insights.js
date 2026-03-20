/**
 * ============================================================================
 * INSIGHTS TAB - PREMIUM HEALTH ANALYTICS & INSIGHTS
 * ============================================================================
 * Health Insights page with health data overview, upload records prompt,
 * vitals trends, risk assessment, organ health, lifestyle score, nutrition
 * tracker, sleep analysis, fitness insights, mental wellness, preventive
 * care, health predictions, and personalized recommendations.
 * ============================================================================
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#6B4C9A',
  primaryLight: '#8B6CBF',
  primaryDark: '#4A3570',
  accent: '#FF6B35',
  green: '#00A651',
  red: '#E74C3C',
  blue: '#2196F3',
  teal: '#00BCD4',
  purple: '#9C27B0',
  orange: '#FF9800',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  border: '#E8E8F0',
  divider: '#EBEBF5',
  shadow: 'rgba(107, 76, 154, 0.12)',
};

/* ==================== HEADER ==================== */
const InsightsHeader = React.memo(() => {
  return (
    <LinearGradient colors={['#6B4C9A', '#8B6CBF']} style={styles.header}>
      <SafeAreaView>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>Health Insights</Text>
            <Text style={styles.headerSubtitle}>Your Health Data Simplified</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="notifications-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerIcon}>
              <Ionicons name="settings-outline" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
});

/* ==================== DEMO TOGGLE ==================== */
const DemoToggle = React.memo(({ isDemoMode, setIsDemoMode }) => {
  return (
    <View style={styles.demoToggleContainer}>
      <View style={styles.demoToggle}>
        <Ionicons name="flask" size={18} color={isDemoMode ? COLORS.primary : COLORS.textTertiary} />
        <Text style={styles.demoToggleText}>View Demo Insights</Text>
        <Switch
          value={isDemoMode}
          onValueChange={setIsDemoMode}
          trackColor={{ false: '#E0E0E8', true: COLORS.primaryLight }}
          thumbColor={isDemoMode ? COLORS.primary : '#f4f3f4'}
        />
      </View>
    </View>
  );
});

/* ==================== OVERALL HEALTH SCORE ==================== */
const OverallHealthScore = React.memo(() => {
  return (
    <View style={styles.healthScoreSection}>
      <View style={styles.healthScoreCard}>
        <LinearGradient colors={['#667eea', '#764ba2']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.healthScoreGradient}>
          <View style={styles.healthScoreTop}>
            <View style={styles.healthScoreCircleOuter}>
              <View style={styles.healthScoreCircleInner}>
                <Text style={styles.healthScoreValue}>82</Text>
                <Text style={styles.healthScoreOutOf}>/100</Text>
              </View>
            </View>
            <View style={styles.healthScoreInfo}>
              <Text style={styles.healthScoreLabel}>Overall Health Score</Text>
              <Text style={styles.healthScoreStatus}>Very Good</Text>
              <Text style={styles.healthScoreChange}>+5 from last month</Text>
            </View>
          </View>
          <View style={styles.healthScoreCategories}>
            {[
              { label: 'Heart', score: 88, icon: 'heart', color: '#FF6B6B' },
              { label: 'Metabolic', score: 75, icon: 'flash', color: '#4DA6FF' },
              { label: 'Immunity', score: 82, icon: 'shield', color: '#69F0AE' },
              { label: 'Mental', score: 78, icon: 'happy', color: '#FFD93D' },
              { label: 'Fitness', score: 85, icon: 'fitness', color: '#FF8A65' },
            ].map((cat) => (
              <View key={cat.label} style={styles.healthScoreCat}>
                <Ionicons name={cat.icon} size={16} color={cat.color} />
                <Text style={styles.healthScoreCatLabel}>{cat.label}</Text>
                <Text style={styles.healthScoreCatValue}>{cat.score}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== UPLOAD RECORDS PROMPT ==================== */
const UploadRecordsPrompt = React.memo(() => {
  return (
    <View style={styles.uploadPromptSection}>
      <View style={styles.uploadPromptCard}>
        <View style={styles.uploadPromptIllustration}>
          <View style={styles.uploadPromptIconContainer}>
            <Ionicons name="document-text" size={32} color={COLORS.primary} />
          </View>
          <View style={[styles.uploadPromptFloatingIcon, { top: -5, right: -5 }]}>
            <Ionicons name="add-circle" size={20} color={COLORS.accent} />
          </View>
        </View>
        <View style={styles.uploadPromptContent}>
          <Text style={styles.uploadPromptTitle}>Upload your health records</Text>
          <Text style={styles.uploadPromptDesc}>Upload your medical records to unlock personalized health insights, risk analysis, and recommendations.</Text>
          <TouchableOpacity style={styles.uploadPromptButton}>
            <Ionicons name="cloud-upload" size={18} color={COLORS.white} />
            <Text style={styles.uploadPromptButtonText}>Upload Records</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

/* ==================== VITALS TRENDS ==================== */
const VitalsTrends = React.memo(() => {
  const vitals = useMemo(() => [
    { id: 'bp', label: 'Blood Pressure', current: '120/80', unit: 'mmHg', trend: 'stable', trendValue: '0%', history: [118, 122, 120, 119, 121, 120], icon: 'heart', color: '#E74C3C', status: 'Normal', range: '90/60 - 120/80' },
    { id: 'sugar', label: 'Blood Sugar', current: '95', unit: 'mg/dL', trend: 'down', trendValue: '-5%', history: [105, 100, 98, 96, 95, 95], icon: 'water', color: '#2196F3', status: 'Normal', range: '70 - 100' },
    { id: 'cholesterol', label: 'Total Cholesterol', current: '185', unit: 'mg/dL', trend: 'down', trendValue: '-8%', history: [210, 205, 198, 192, 188, 185], icon: 'analytics', color: '#FF9800', status: 'Optimal', range: 'Below 200' },
    { id: 'hba1c', label: 'HbA1c', current: '5.4', unit: '%', trend: 'stable', trendValue: '0%', history: [5.6, 5.5, 5.5, 5.4, 5.4, 5.4], icon: 'pulse', color: '#9C27B0', status: 'Normal', range: 'Below 5.7' },
  ], []);

  const getTrendIcon = (trend) => trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'remove';
  const getTrendColor = (trend) => trend === 'down' ? '#4CAF50' : trend === 'up' ? '#F44336' : '#9E9E9E';

  return (
    <View style={styles.vitalsTrendsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Vitals Trends</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>View Details</Text></TouchableOpacity>
      </View>
      {vitals.map((vital) => (
        <TouchableOpacity key={vital.id} style={styles.vitalTrendCard} activeOpacity={0.7}>
          <View style={styles.vitalTrendLeft}>
            <View style={[styles.vitalTrendIconBg, { backgroundColor: vital.color + '15' }]}>
              <Ionicons name={vital.icon} size={22} color={vital.color} />
            </View>
          </View>
          <View style={styles.vitalTrendCenter}>
            <Text style={styles.vitalTrendLabel}>{vital.label}</Text>
            <View style={styles.vitalTrendValueRow}>
              <Text style={[styles.vitalTrendValue, { color: vital.color }]}>{vital.current}</Text>
              <Text style={styles.vitalTrendUnit}>{vital.unit}</Text>
            </View>
            <Text style={styles.vitalTrendRange}>Normal: {vital.range}</Text>
          </View>
          <View style={styles.vitalTrendRight}>
            <View style={[styles.vitalTrendStatusBadge, { backgroundColor: vital.status === 'Normal' || vital.status === 'Optimal' ? '#E8F5E9' : '#FFF3E0' }]}>
              <Text style={[styles.vitalTrendStatusText, { color: vital.status === 'Normal' || vital.status === 'Optimal' ? '#2E7D32' : '#E65100' }]}>{vital.status}</Text>
            </View>
            <View style={styles.vitalTrendChangeRow}>
              <Ionicons name={getTrendIcon(vital.trend)} size={14} color={getTrendColor(vital.trend)} />
              <Text style={[styles.vitalTrendChangeText, { color: getTrendColor(vital.trend) }]}>{vital.trendValue}</Text>
            </View>
            <View style={styles.miniChart}>
              {vital.history.map((val, idx) => {
                const max = Math.max(...vital.history);
                const min = Math.min(...vital.history);
                const range = max - min || 1;
                const height = Math.max(((val - min) / range) * 24, 4);
                return <View key={idx} style={[styles.miniChartBar, { height, backgroundColor: vital.color + '60' }]} />;
              })}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});

/* ==================== RISK ASSESSMENT ==================== */
const RiskAssessment = React.memo(() => {
  const risks = useMemo(() => [
    { id: '1', condition: 'Type 2 Diabetes', riskLevel: 'Low', riskScore: 15, icon: 'water', color: '#4CAF50', description: 'Your blood sugar levels and HbA1c are within normal range. Continue maintaining a healthy diet and exercise routine.' },
    { id: '2', condition: 'Cardiovascular Disease', riskLevel: 'Low-Moderate', riskScore: 25, icon: 'heart', color: '#FF9800', description: 'Slightly elevated cholesterol levels. Consider reducing saturated fat intake and increasing physical activity.' },
    { id: '3', condition: 'Hypertension', riskLevel: 'Low', riskScore: 10, icon: 'pulse', color: '#4CAF50', description: 'Blood pressure readings are consistently within normal range. Maintain current lifestyle habits.' },
    { id: '4', condition: 'Vitamin D Deficiency', riskLevel: 'Moderate', riskScore: 45, icon: 'sunny', color: '#F44336', description: 'Recent tests show borderline Vitamin D levels. Consider supplementation and increased sun exposure.' },
    { id: '5', condition: 'Thyroid Disorders', riskLevel: 'Low', riskScore: 12, icon: 'shield', color: '#4CAF50', description: 'Thyroid function tests are normal. No immediate concern detected.' },
  ], []);

  const getRiskColor = (level) => {
    if (level === 'Low') return '#4CAF50';
    if (level === 'Low-Moderate') return '#FF9800';
    if (level === 'Moderate') return '#F44336';
    return '#9E9E9E';
  };

  return (
    <View style={styles.riskSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Risk Assessment</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>Full Report</Text></TouchableOpacity>
      </View>
      {risks.map((risk) => (
        <View key={risk.id} style={styles.riskCard}>
          <View style={styles.riskCardTop}>
            <View style={[styles.riskIconBg, { backgroundColor: risk.color + '15' }]}>
              <Ionicons name={risk.icon} size={22} color={risk.color} />
            </View>
            <View style={styles.riskCardInfo}>
              <Text style={styles.riskCondition}>{risk.condition}</Text>
              <View style={[styles.riskLevelBadge, { backgroundColor: getRiskColor(risk.riskLevel) + '15' }]}>
                <Text style={[styles.riskLevelText, { color: getRiskColor(risk.riskLevel) }]}>{risk.riskLevel} Risk</Text>
              </View>
            </View>
            <View style={styles.riskScoreContainer}>
              <Text style={[styles.riskScoreValue, { color: getRiskColor(risk.riskLevel) }]}>{risk.riskScore}%</Text>
            </View>
          </View>
          <View style={styles.riskProgressBar}>
            <View style={[styles.riskProgressFill, { width: `${risk.riskScore}%`, backgroundColor: getRiskColor(risk.riskLevel) }]} />
          </View>
          <Text style={styles.riskDescription}>{risk.description}</Text>
        </View>
      ))}
    </View>
  );
});

/* ==================== ORGAN HEALTH DASHBOARD ==================== */
const OrganHealthDashboard = React.memo(() => {
  const organs = useMemo(() => [
    { id: '1', name: 'Heart', score: 88, icon: 'heart', color: '#E74C3C', status: 'Excellent', lastCheck: 'Feb 2026' },
    { id: '2', name: 'Liver', score: 82, icon: 'leaf', color: '#4CAF50', status: 'Good', lastCheck: 'Jan 2026' },
    { id: '3', name: 'Kidneys', score: 90, icon: 'water', color: '#2196F3', status: 'Excellent', lastCheck: 'Feb 2026' },
    { id: '4', name: 'Thyroid', score: 85, icon: 'flash', color: '#9C27B0', status: 'Good', lastCheck: 'Jan 2026' },
    { id: '5', name: 'Lungs', score: 92, icon: 'cloud', color: '#00BCD4', status: 'Excellent', lastCheck: 'Dec 2025' },
    { id: '6', name: 'Bones', score: 78, icon: 'body', color: '#FF9800', status: 'Good', lastCheck: 'Nov 2025' },
  ], []);

  return (
    <View style={styles.organSection}>
      <Text style={styles.sectionTitle}>Organ Health Dashboard</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.organScrollContent}>
        {organs.map((organ) => (
          <TouchableOpacity key={organ.id} style={styles.organCard} activeOpacity={0.7}>
            <View style={[styles.organIconBg, { backgroundColor: organ.color + '15' }]}>
              <Ionicons name={organ.icon} size={28} color={organ.color} />
            </View>
            <Text style={styles.organName}>{organ.name}</Text>
            <View style={styles.organScoreContainer}>
              <Text style={[styles.organScore, { color: organ.color }]}>{organ.score}</Text>
              <Text style={styles.organScoreTotal}>/100</Text>
            </View>
            <View style={styles.organProgressBar}>
              <View style={[styles.organProgressFill, { width: `${organ.score}%`, backgroundColor: organ.color }]} />
            </View>
            <View style={[styles.organStatusBadge, { backgroundColor: organ.color + '15' }]}>
              <Text style={[styles.organStatusText, { color: organ.color }]}>{organ.status}</Text>
            </View>
            <Text style={styles.organLastCheck}>Last: {organ.lastCheck}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== LIFESTYLE SCORE ==================== */
const LifestyleScore = React.memo(() => {
  const factors = useMemo(() => [
    { label: 'Diet & Nutrition', score: 72, icon: 'nutrition', color: '#4CAF50', tip: 'Increase fiber intake and reduce processed foods' },
    { label: 'Physical Activity', score: 65, icon: 'fitness', color: '#2196F3', tip: 'Add 30 min moderate exercise 3x per week' },
    { label: 'Sleep Quality', score: 80, icon: 'moon', color: '#9C27B0', tip: 'Maintain consistent sleep schedule, aim for 7-8 hours' },
    { label: 'Stress Management', score: 55, icon: 'leaf', color: '#FF9800', tip: 'Practice daily meditation or breathing exercises' },
    { label: 'Hydration', score: 68, icon: 'water', color: '#00BCD4', tip: 'Drink at least 8 glasses of water daily' },
    { label: 'Screen Time', score: 45, icon: 'phone-portrait', color: '#E74C3C', tip: 'Reduce screen time before bed, take frequent breaks' },
  ], []);

  return (
    <View style={styles.lifestyleSection}>
      <Text style={styles.sectionTitle}>Lifestyle Score</Text>
      <View style={styles.lifestyleOverall}>
        <LinearGradient colors={['#E8F5E9', '#C8E6C9']} style={styles.lifestyleOverallGradient}>
          <View style={styles.lifestyleOverallScore}>
            <Text style={styles.lifestyleOverallValue}>64</Text>
            <Text style={styles.lifestyleOverallLabel}>/100</Text>
          </View>
          <Text style={styles.lifestyleOverallStatus}>Room for Improvement</Text>
          <Text style={styles.lifestyleOverallDesc}>Your lifestyle score reflects your daily habits. Small changes can make a big difference!</Text>
        </LinearGradient>
      </View>
      {factors.map((factor) => (
        <View key={factor.label} style={styles.lifestyleCard}>
          <View style={styles.lifestyleCardTop}>
            <View style={[styles.lifestyleIconBg, { backgroundColor: factor.color + '15' }]}>
              <Ionicons name={factor.icon} size={20} color={factor.color} />
            </View>
            <View style={styles.lifestyleCardInfo}>
              <Text style={styles.lifestyleFactorLabel}>{factor.label}</Text>
              <View style={styles.lifestyleProgressContainer}>
                <View style={styles.lifestyleProgressBg}>
                  <View style={[styles.lifestyleProgressFill, { width: `${factor.score}%`, backgroundColor: factor.color }]} />
                </View>
                <Text style={[styles.lifestyleFactorScore, { color: factor.color }]}>{factor.score}%</Text>
              </View>
            </View>
          </View>
          <View style={styles.lifestyleTipRow}>
            <Ionicons name="bulb" size={14} color={COLORS.orange} />
            <Text style={styles.lifestyleTip}>{factor.tip}</Text>
          </View>
        </View>
      ))}
    </View>
  );
});

/* ==================== NUTRITION INSIGHTS ==================== */
const NutritionInsights = React.memo(() => {
  const nutrients = useMemo(() => [
    { name: 'Vitamin D', level: 28, unit: 'ng/mL', status: 'Low', optimal: '30-100', icon: 'sunny', color: '#FF9800' },
    { name: 'Vitamin B12', level: 450, unit: 'pg/mL', status: 'Normal', optimal: '200-900', icon: 'flash', color: '#4CAF50' },
    { name: 'Iron', level: 85, unit: 'ug/dL', status: 'Normal', optimal: '60-170', icon: 'shield', color: '#4CAF50' },
    { name: 'Calcium', level: 9.2, unit: 'mg/dL', status: 'Normal', optimal: '8.5-10.5', icon: 'body', color: '#4CAF50' },
    { name: 'Omega-3', level: 'Low', unit: '', status: 'Low', optimal: 'Adequate', icon: 'fish', color: '#F44336' },
  ], []);

  return (
    <View style={styles.nutritionSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Nutrition Insights</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>See All</Text></TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.nutritionScrollContent}>
        {nutrients.map((nutrient) => (
          <View key={nutrient.name} style={styles.nutrientCard}>
            <View style={[styles.nutrientIconBg, { backgroundColor: nutrient.color + '15' }]}>
              <Ionicons name={nutrient.icon} size={22} color={nutrient.color} />
            </View>
            <Text style={styles.nutrientName}>{nutrient.name}</Text>
            <Text style={[styles.nutrientLevel, { color: nutrient.color }]}>{nutrient.level} {nutrient.unit}</Text>
            <View style={[styles.nutrientStatusBadge, { backgroundColor: nutrient.color + '15' }]}>
              <Text style={[styles.nutrientStatusText, { color: nutrient.color }]}>{nutrient.status}</Text>
            </View>
            <Text style={styles.nutrientOptimal}>Optimal: {nutrient.optimal}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== SLEEP ANALYSIS ==================== */
const SleepAnalysis = React.memo(() => {
  const sleepData = useMemo(() => [
    { day: 'Mon', hours: 7.5, deep: 1.8, light: 4.2, rem: 1.5 },
    { day: 'Tue', hours: 6.2, deep: 1.2, light: 3.5, rem: 1.5 },
    { day: 'Wed', hours: 8.0, deep: 2.0, light: 4.0, rem: 2.0 },
    { day: 'Thu', hours: 7.0, deep: 1.5, light: 4.0, rem: 1.5 },
    { day: 'Fri', hours: 5.5, deep: 1.0, light: 3.0, rem: 1.5 },
    { day: 'Sat', hours: 8.5, deep: 2.2, light: 4.3, rem: 2.0 },
    { day: 'Sun', hours: 7.8, deep: 1.7, light: 4.1, rem: 2.0 },
  ], []);

  return (
    <View style={styles.sleepSection}>
      <Text style={styles.sectionTitle}>Sleep Analysis</Text>
      <View style={styles.sleepCard}>
        <LinearGradient colors={['#1A237E', '#283593']} style={styles.sleepGradient}>
          <View style={styles.sleepSummary}>
            <View style={styles.sleepAverage}>
              <Text style={styles.sleepAverageValue}>7.2</Text>
              <Text style={styles.sleepAverageUnit}>hrs avg</Text>
            </View>
            <View style={styles.sleepStats}>
              <View style={styles.sleepStat}><Text style={styles.sleepStatValue}>1.6h</Text><Text style={styles.sleepStatLabel}>Deep</Text></View>
              <View style={styles.sleepStat}><Text style={styles.sleepStatValue}>3.9h</Text><Text style={styles.sleepStatLabel}>Light</Text></View>
              <View style={styles.sleepStat}><Text style={styles.sleepStatValue}>1.7h</Text><Text style={styles.sleepStatLabel}>REM</Text></View>
            </View>
          </View>
          <View style={styles.sleepChartContainer}>
            {sleepData.map((day) => (
              <View key={day.day} style={styles.sleepBarColumn}>
                <View style={[styles.sleepBar, { height: Math.max((day.hours / 10) * 60, 8) }]}>
                  <View style={[styles.sleepBarDeep, { flex: day.deep }]} />
                  <View style={[styles.sleepBarLight, { flex: day.light }]} />
                  <View style={[styles.sleepBarRem, { flex: day.rem }]} />
                </View>
                <Text style={styles.sleepBarLabel}>{day.day}</Text>
                <Text style={styles.sleepBarHours}>{day.hours}h</Text>
              </View>
            ))}
          </View>
          <View style={styles.sleepLegend}>
            <View style={styles.sleepLegendItem}><View style={[styles.sleepLegendDot, { backgroundColor: '#3949AB' }]} /><Text style={styles.sleepLegendText}>Deep</Text></View>
            <View style={styles.sleepLegendItem}><View style={[styles.sleepLegendDot, { backgroundColor: '#7986CB' }]} /><Text style={styles.sleepLegendText}>Light</Text></View>
            <View style={styles.sleepLegendItem}><View style={[styles.sleepLegendDot, { backgroundColor: '#C5CAE9' }]} /><Text style={styles.sleepLegendText}>REM</Text></View>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== PERSONALIZED RECOMMENDATIONS ==================== */
const Recommendations = React.memo(() => {
  const recommendations = useMemo(() => [
    { id: '1', title: 'Increase Vitamin D Intake', category: 'Nutrition', priority: 'High', icon: 'sunny', color: '#FF9800', description: 'Your Vitamin D levels are below optimal. Consider 15-20 min morning sun exposure and supplements (60,000 IU weekly).', action: 'Order Vitamin D Supplement' },
    { id: '2', title: 'Add Cardio Exercise', category: 'Fitness', priority: 'Medium', icon: 'fitness', color: '#2196F3', description: 'Include 150 minutes of moderate aerobic activity per week. Start with brisk walking or cycling.', action: 'View Exercise Plans' },
    { id: '3', title: 'Reduce Screen Time Before Bed', category: 'Sleep', priority: 'High', icon: 'moon', color: '#9C27B0', description: 'Blue light exposure is affecting your sleep quality. Enable night mode 2 hours before bedtime.', action: 'Set Reminder' },
    { id: '4', title: 'Include Omega-3 Rich Foods', category: 'Diet', priority: 'Medium', icon: 'nutrition', color: '#4CAF50', description: 'Add walnuts, flaxseeds, and fatty fish to your diet. Consider fish oil supplements for heart health.', action: 'View Meal Plans' },
    { id: '5', title: 'Practice Stress Management', category: 'Mental Health', priority: 'Medium', icon: 'leaf', color: '#00BCD4', description: 'Your stress indicators suggest elevated cortisol. Try 10 min daily meditation or progressive muscle relaxation.', action: 'Start Guided Session' },
    { id: '6', title: 'Schedule Annual Eye Exam', category: 'Preventive', priority: 'Low', icon: 'eye', color: '#E91E63', description: 'It has been over 12 months since your last eye examination. Regular checkups prevent vision problems.', action: 'Book Appointment' },
  ], []);

  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#F44336';
    if (priority === 'Medium') return '#FF9800';
    return '#4CAF50';
  };

  return (
    <View style={styles.recsSection}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Personalized Recommendations</Text>
      </View>
      {recommendations.map((rec) => (
        <View key={rec.id} style={styles.recCard}>
          <View style={styles.recCardTop}>
            <View style={[styles.recIconBg, { backgroundColor: rec.color + '15' }]}>
              <Ionicons name={rec.icon} size={22} color={rec.color} />
            </View>
            <View style={styles.recCardInfo}>
              <Text style={styles.recTitle}>{rec.title}</Text>
              <View style={styles.recMetaRow}>
                <View style={[styles.recCategoryBadge, { backgroundColor: rec.color + '15' }]}>
                  <Text style={[styles.recCategoryText, { color: rec.color }]}>{rec.category}</Text>
                </View>
                <View style={[styles.recPriorityBadge, { backgroundColor: getPriorityColor(rec.priority) + '15' }]}>
                  <Text style={[styles.recPriorityText, { color: getPriorityColor(rec.priority) }]}>{rec.priority} Priority</Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.recDescription}>{rec.description}</Text>
          <TouchableOpacity style={[styles.recActionButton, { backgroundColor: rec.color }]}>
            <Text style={styles.recActionText}>{rec.action}</Text>
            <Ionicons name="arrow-forward" size={14} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
});

/* ==================== HEALTH PREDICTIONS ==================== */
const HealthPredictions = React.memo(() => {
  return (
    <View style={styles.predictionsSection}>
      <Text style={styles.sectionTitle}>AI Health Predictions</Text>
      <View style={styles.predictionsCard}>
        <LinearGradient colors={['#4A148C', '#7B1FA2']} style={styles.predictionsGradient}>
          <View style={styles.predictionsIconRow}>
            <View style={styles.predictionsIconContainer}>
              <Ionicons name="sparkles" size={28} color="#FFD700" />
            </View>
            <Text style={styles.predictionsTitle}>AI-Powered Health Forecast</Text>
          </View>
          <Text style={styles.predictionsDesc}>Based on your current health data, vitals trends, and lifestyle patterns, our AI has generated the following health predictions for the next 6 months.</Text>
          <View style={styles.predictionsList}>
            {[
              { prediction: 'Blood sugar levels likely to remain stable with current diet', confidence: '92%', icon: 'checkmark-circle', color: '#69F0AE' },
              { prediction: 'Vitamin D levels may improve with recommended supplementation', confidence: '85%', icon: 'trending-up', color: '#4DA6FF' },
              { prediction: 'Cholesterol levels projected to reach optimal range', confidence: '78%', icon: 'trending-down', color: '#FFD93D' },
              { prediction: 'Sleep quality may decline if screen time is not managed', confidence: '71%', icon: 'warning', color: '#FF8A65' },
            ].map((item, idx) => (
              <View key={idx} style={styles.predictionItem}>
                <Ionicons name={item.icon} size={18} color={item.color} />
                <View style={styles.predictionItemInfo}>
                  <Text style={styles.predictionText}>{item.prediction}</Text>
                  <Text style={styles.predictionConfidence}>Confidence: {item.confidence}</Text>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.predictionsButton}>
            <Ionicons name="analytics" size={18} color="#4A148C" />
            <Text style={styles.predictionsButtonText}>View Detailed Report</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== MEDICINE MANAGEMENT INSIGHTS ==================== */
const MedicineInsights = React.memo(() => {
  return (
    <View style={styles.medInsightsSection}>
      <Text style={styles.sectionTitle}>Medicine Management</Text>
      <View style={styles.medInsightsGrid}>
        {[
          { title: 'Adherence Rate', value: '87%', subtitle: 'This month', icon: 'checkmark-circle', color: '#4CAF50', bgColor: '#E8F5E9' },
          { title: 'Active Medicines', value: '5', subtitle: 'Currently taking', icon: 'medical', color: '#2196F3', bgColor: '#E3F2FD' },
          { title: 'Interactions', value: '2', subtitle: 'Found', icon: 'warning', color: '#FF9800', bgColor: '#FFF3E0' },
          { title: 'Next Refill', value: '4 days', subtitle: 'Metformin', icon: 'time', color: '#E74C3C', bgColor: '#FFEBEE' },
        ].map((item) => (
          <TouchableOpacity key={item.title} style={[styles.medInsightCard, { backgroundColor: item.bgColor }]} activeOpacity={0.7}>
            <Ionicons name={item.icon} size={28} color={item.color} />
            <Text style={[styles.medInsightValue, { color: item.color }]}>{item.value}</Text>
            <Text style={styles.medInsightTitle}>{item.title}</Text>
            <Text style={styles.medInsightSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

/* ==================== HELP BAR ==================== */
const HelpBar = React.memo(() => {
  return (
    <View style={styles.helpBarContainer}>
      <View style={styles.helpBar}>
        <LinearGradient colors={['#37474F', '#263238']} style={styles.helpBarGradient}>
          <View style={styles.helpBarContent}>
            <Text style={styles.helpBarText}>Need help understanding{'\n'}your insights?</Text>
            <TouchableOpacity style={styles.helpBarButton}>
              <Ionicons name="chatbubble-ellipses" size={18} color={COLORS.white} />
              <Text style={styles.helpBarButtonText}>Ask AI Assistant</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== FOOTER ==================== */
const InsightsFooter = React.memo(() => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerDivider} />
      <Text style={styles.footerBrand}>Apollo 24|7 Health Insights</Text>
      <Text style={styles.footerDesc}>AI-powered analytics for a healthier you</Text>
      <View style={styles.footerBadges}>
        <View style={styles.footerBadge}><Ionicons name="sparkles" size={14} color={COLORS.primary} /><Text style={styles.footerBadgeText}>AI Powered</Text></View>
        <View style={styles.footerBadge}><Ionicons name="shield-checkmark" size={14} color={COLORS.green} /><Text style={styles.footerBadgeText}>Clinically Validated</Text></View>
      </View>
    </View>
  );
});

/* ==================== MAIN COMPONENT ==================== */
export default function Insights() {
  const [isDemoMode, setIsDemoMode] = useState(true);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
      <InsightsHeader />
      <DemoToggle isDemoMode={isDemoMode} setIsDemoMode={setIsDemoMode} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true} contentContainerStyle={styles.scrollContent}>
        <OverallHealthScore />
        <UploadRecordsPrompt />
        <VitalsTrends />
        <RiskAssessment />
        <OrganHealthDashboard />
        <LifestyleScore />
        <NutritionInsights />
        <SleepAnalysis />
        <MedicineInsights />
        <HealthPredictions />
        <Recommendations />
        <HelpBar />
        <InsightsFooter />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  header: { paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0 },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  headerLeft: { flex: 1 },
  headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.white },
  headerSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 2 },
  headerRight: { flexDirection: 'row', gap: 12 },
  headerIcon: { padding: 4 },
  demoToggleContainer: { backgroundColor: COLORS.white, paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  demoToggle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  demoToggleText: { flex: 1, fontSize: 14, fontWeight: '600', color: COLORS.textSecondary },
  healthScoreSection: { marginTop: 20 },
  healthScoreCard: { marginHorizontal: 20, borderRadius: 20, overflow: 'hidden' },
  healthScoreGradient: { padding: 24 },
  healthScoreTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  healthScoreCircleOuter: { width: 90, height: 90, borderRadius: 45, borderWidth: 3, borderColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center', marginRight: 20 },
  healthScoreCircleInner: { width: 76, height: 76, borderRadius: 38, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center' },
  healthScoreValue: { fontSize: 28, fontWeight: '800', color: COLORS.white },
  healthScoreOutOf: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
  healthScoreInfo: { flex: 1 },
  healthScoreLabel: { fontSize: 13, color: 'rgba(255,255,255,0.7)' },
  healthScoreStatus: { fontSize: 24, fontWeight: '800', color: COLORS.white, marginTop: 2 },
  healthScoreChange: { fontSize: 12, color: '#69F0AE', marginTop: 4 },
  healthScoreCategories: { flexDirection: 'row', justifyContent: 'space-between', paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' },
  healthScoreCat: { alignItems: 'center', gap: 4 },
  healthScoreCatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)' },
  healthScoreCatValue: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  uploadPromptSection: { marginTop: 24, paddingHorizontal: 20 },
  uploadPromptCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 16, padding: 20, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  uploadPromptIllustration: { marginRight: 16, position: 'relative' },
  uploadPromptIconContainer: { width: 56, height: 56, borderRadius: 16, backgroundColor: COLORS.primary + '10', justifyContent: 'center', alignItems: 'center' },
  uploadPromptFloatingIcon: { position: 'absolute' },
  uploadPromptContent: { flex: 1 },
  uploadPromptTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 6 },
  uploadPromptDesc: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 12 },
  uploadPromptButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.primary, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10, gap: 6, alignSelf: 'flex-start' },
  uploadPromptButtonText: { fontSize: 13, fontWeight: '700', color: COLORS.white },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, paddingHorizontal: 20 },
  sectionViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  vitalsTrendsSection: { marginTop: 28 },
  vitalTrendCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 12, borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  vitalTrendLeft: { marginRight: 12 },
  vitalTrendIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  vitalTrendCenter: { flex: 1 },
  vitalTrendLabel: { fontSize: 13, color: COLORS.textTertiary, marginBottom: 2 },
  vitalTrendValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 4 },
  vitalTrendValue: { fontSize: 20, fontWeight: '800' },
  vitalTrendUnit: { fontSize: 11, color: COLORS.textTertiary },
  vitalTrendRange: { fontSize: 10, color: COLORS.textMuted, marginTop: 2 },
  vitalTrendRight: { alignItems: 'flex-end', width: 80 },
  vitalTrendStatusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginBottom: 4 },
  vitalTrendStatusText: { fontSize: 10, fontWeight: '600' },
  vitalTrendChangeRow: { flexDirection: 'row', alignItems: 'center', gap: 2, marginBottom: 4 },
  vitalTrendChangeText: { fontSize: 11, fontWeight: '600' },
  miniChart: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 24 },
  miniChartBar: { width: 8, borderRadius: 2 },
  riskSection: { marginTop: 28 },
  riskCard: { backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 12, borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  riskCardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  riskIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  riskCardInfo: { flex: 1 },
  riskCondition: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  riskLevelBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, alignSelf: 'flex-start' },
  riskLevelText: { fontSize: 10, fontWeight: '700' },
  riskScoreContainer: { alignItems: 'center' },
  riskScoreValue: { fontSize: 18, fontWeight: '800' },
  riskProgressBar: { height: 6, borderRadius: 3, backgroundColor: '#F0F0F5', marginBottom: 10, overflow: 'hidden' },
  riskProgressFill: { height: '100%', borderRadius: 3 },
  riskDescription: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  organSection: { marginTop: 28 },
  organScrollContent: { paddingHorizontal: 20, gap: 12, paddingTop: 16 },
  organCard: { width: 140, backgroundColor: COLORS.white, borderRadius: 18, padding: 16, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  organIconBg: { width: 52, height: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  organName: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 6 },
  organScoreContainer: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 8 },
  organScore: { fontSize: 22, fontWeight: '800' },
  organScoreTotal: { fontSize: 12, color: COLORS.textTertiary },
  organProgressBar: { width: '100%', height: 6, borderRadius: 3, backgroundColor: '#F0F0F5', marginBottom: 8, overflow: 'hidden' },
  organProgressFill: { height: '100%', borderRadius: 3 },
  organStatusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginBottom: 6 },
  organStatusText: { fontSize: 10, fontWeight: '600' },
  organLastCheck: { fontSize: 9, color: COLORS.textMuted },
  lifestyleSection: { marginTop: 28 },
  lifestyleOverall: { marginHorizontal: 20, marginTop: 16, borderRadius: 16, overflow: 'hidden', marginBottom: 16 },
  lifestyleOverallGradient: { padding: 20, alignItems: 'center' },
  lifestyleOverallScore: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  lifestyleOverallValue: { fontSize: 36, fontWeight: '800', color: '#2E7D32' },
  lifestyleOverallLabel: { fontSize: 16, color: '#4CAF50', marginLeft: 4 },
  lifestyleOverallStatus: { fontSize: 16, fontWeight: '700', color: '#2E7D32', marginBottom: 4 },
  lifestyleOverallDesc: { fontSize: 12, color: '#4A6A4A', textAlign: 'center', lineHeight: 18 },
  lifestyleCard: { backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 10, borderRadius: 14, padding: 14, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 6, elevation: 2 },
  lifestyleCardTop: { flexDirection: 'row', alignItems: 'center' },
  lifestyleIconBg: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  lifestyleCardInfo: { flex: 1 },
  lifestyleFactorLabel: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 6 },
  lifestyleProgressContainer: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  lifestyleProgressBg: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#F0F0F5', overflow: 'hidden' },
  lifestyleProgressFill: { height: '100%', borderRadius: 3 },
  lifestyleFactorScore: { fontSize: 13, fontWeight: '700', minWidth: 36, textAlign: 'right' },
  lifestyleTipRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 6, paddingTop: 8, borderTopWidth: 1, borderTopColor: COLORS.divider },
  lifestyleTip: { fontSize: 11, color: COLORS.textSecondary, flex: 1 },
  nutritionSection: { marginTop: 28 },
  nutritionScrollContent: { paddingHorizontal: 20, gap: 12, paddingTop: 16 },
  nutrientCard: { width: 140, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 12, elevation: 4 },
  nutrientIconBg: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  nutrientName: { fontSize: 13, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  nutrientLevel: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  nutrientStatusBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginBottom: 6 },
  nutrientStatusText: { fontSize: 10, fontWeight: '600' },
  nutrientOptimal: { fontSize: 9, color: COLORS.textMuted, textAlign: 'center' },
  sleepSection: { marginTop: 28 },
  sleepCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 20, overflow: 'hidden' },
  sleepGradient: { padding: 24 },
  sleepSummary: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  sleepAverage: { alignItems: 'center', marginRight: 24 },
  sleepAverageValue: { fontSize: 36, fontWeight: '800', color: COLORS.white },
  sleepAverageUnit: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  sleepStats: { flex: 1, flexDirection: 'row', justifyContent: 'space-around' },
  sleepStat: { alignItems: 'center' },
  sleepStatValue: { fontSize: 16, fontWeight: '700', color: COLORS.white },
  sleepStatLabel: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  sleepChartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', marginBottom: 16, height: 80 },
  sleepBarColumn: { alignItems: 'center' },
  sleepBar: { width: 24, borderRadius: 6, overflow: 'hidden', flexDirection: 'column' },
  sleepBarDeep: { backgroundColor: '#3949AB' },
  sleepBarLight: { backgroundColor: '#7986CB' },
  sleepBarRem: { backgroundColor: '#C5CAE9' },
  sleepBarLabel: { fontSize: 10, color: 'rgba(255,255,255,0.7)', marginTop: 4 },
  sleepBarHours: { fontSize: 9, color: 'rgba(255,255,255,0.5)' },
  sleepLegend: { flexDirection: 'row', justifyContent: 'center', gap: 20 },
  sleepLegendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sleepLegendDot: { width: 10, height: 10, borderRadius: 5 },
  sleepLegendText: { fontSize: 11, color: 'rgba(255,255,255,0.7)' },
  recsSection: { marginTop: 28 },
  recCard: { backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 14, borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  recCardTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  recIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  recCardInfo: { flex: 1 },
  recTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 6 },
  recMetaRow: { flexDirection: 'row', gap: 8 },
  recCategoryBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  recCategoryText: { fontSize: 10, fontWeight: '600' },
  recPriorityBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  recPriorityText: { fontSize: 10, fontWeight: '600' },
  recDescription: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18, marginBottom: 12 },
  recActionButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingVertical: 10, gap: 6 },
  recActionText: { fontSize: 13, fontWeight: '700', color: COLORS.white },
  predictionsSection: { marginTop: 28, paddingHorizontal: 20 },
  predictionsCard: { borderRadius: 20, overflow: 'hidden', marginTop: 16 },
  predictionsGradient: { padding: 24 },
  predictionsIconRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  predictionsIconContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  predictionsTitle: { fontSize: 18, fontWeight: '700', color: COLORS.white },
  predictionsDesc: { fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 20, marginBottom: 16 },
  predictionsList: { marginBottom: 16 },
  predictionItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12 },
  predictionItemInfo: { flex: 1 },
  predictionText: { fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 18 },
  predictionConfidence: { fontSize: 10, color: 'rgba(255,255,255,0.5)', marginTop: 2 },
  predictionsButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.white, borderRadius: 12, paddingVertical: 12, gap: 8 },
  predictionsButtonText: { fontSize: 14, fontWeight: '700', color: '#4A148C' },
  medInsightsSection: { marginTop: 28 },
  medInsightsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12, marginTop: 16 },
  medInsightCard: { width: (SCREEN_WIDTH - 52) / 2, borderRadius: 16, padding: 18, alignItems: 'center' },
  medInsightValue: { fontSize: 24, fontWeight: '800', marginTop: 10, marginBottom: 4 },
  medInsightTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  medInsightSubtitle: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  helpBarContainer: { marginTop: 28, paddingHorizontal: 20 },
  helpBar: { borderRadius: 16, overflow: 'hidden' },
  helpBarGradient: { padding: 20 },
  helpBarContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  helpBarText: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20, flex: 1 },
  helpBarButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, gap: 6 },
  helpBarButtonText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  footer: { alignItems: 'center', paddingVertical: 32, marginTop: 20 },
  footerDivider: { width: 60, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginBottom: 16 },
  footerBrand: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  footerDesc: { fontSize: 12, color: COLORS.textTertiary, marginTop: 4 },
  footerBadges: { flexDirection: 'row', gap: 16, marginTop: 12 },
  footerBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerBadgeText: { fontSize: 10, color: COLORS.textTertiary, fontWeight: '500' },
});
