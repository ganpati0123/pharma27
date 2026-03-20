/**
 * ============================================================================
 * VITALS TRACKER - COMPREHENSIVE HEALTH METRICS
 * ============================================================================
 * Track all vital signs with charts, history, and insights
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

export default function VitalsTracker() {
  const router = useRouter();
  const [selectedVital, setSelectedVital] = useState('heart');

  const vitalsData = useMemo(() => ({
    heart: { 
      name: 'Heart Rate', 
      icon: 'heart', 
      unit: 'bpm', 
      current: 72, 
      normal: '60-100',
      status: 'normal',
      trend: [68, 72, 75, 70, 72, 74, 72],
      history: [
        { date: 'Today', value: 72, status: 'normal' },
        { date: 'Yesterday', value: 70, status: 'normal' },
        { date: '2 days ago', value: 75, status: 'normal' },
        { date: '3 days ago', value: 68, status: 'normal' },
      ]
    },
    bloodPressure: { 
      name: 'Blood Pressure', 
      icon: 'pulse', 
      unit: 'mmHg', 
      current: '120/80', 
      normal: '90/60-120/80',
      status: 'normal',
      trend: [118, 122, 119, 121, 120],
      history: [
        { date: 'Today', value: '120/80', status: 'normal' },
        { date: 'Yesterday', value: '118/78', status: 'normal' },
        { date: '2 days ago', value: '122/82', status: 'elevated' },
      ]
    },
    temperature: { 
      name: 'Temperature', 
      icon: 'thermometer', 
      unit: '°F', 
      current: 98.6, 
      normal: '97-99',
      status: 'normal',
      trend: [98.4, 98.6, 98.5, 98.6, 98.7],
      history: [
        { date: 'Today', value: '98.6°F', status: 'normal' },
        { date: 'Yesterday', value: '98.4°F', status: 'normal' },
      ]
    },
    oxygen: { 
      name: 'SpO2', 
      icon: 'water', 
      unit: '%', 
      current: 98, 
      normal: '95-100',
      status: 'normal',
      trend: [97, 98, 99, 98, 98],
      history: [
        { date: 'Today', value: '98%', status: 'normal' },
        { date: 'Yesterday', value: '97%', status: 'normal' },
      ]
    },
    glucose: { 
      name: 'Blood Glucose', 
      icon: 'flask', 
      unit: 'mg/dL', 
      current: 95, 
      normal: '70-100',
      status: 'normal',
      trend: [92, 98, 95, 90, 95],
      history: [
        { date: 'Fasting', value: '95 mg/dL', status: 'normal' },
        { date: 'Before Meal', value: '92 mg/dL', status: 'normal' },
      ]
    },
    weight: { 
      name: 'Weight', 
      icon: 'scale', 
      unit: 'kg', 
      current: 72.5, 
      normal: '65-80',
      status: 'normal',
      trend: [73, 72.8, 72.6, 72.5],
      history: [
        { date: 'Today', value: '72.5 kg', status: 'normal' },
        { date: 'Last Week', value: '73.0 kg', status: 'normal' },
        { date: 'Last Month', value: '74.2 kg', status: 'normal' },
      ]
    },
  }), []);

  const vitalCategories = Object.keys(vitalsData);

  const getStatusColor = (status) => {
    switch(status) {
      case 'normal': return COLORS.green;
      case 'elevated': return COLORS.accent;
      case 'high': return COLORS.red;
      default: return COLORS.textTertiary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vitals Tracker</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Vital Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vitalSelector}>
          {vitalCategories.map((key) => (
            <TouchableOpacity
              key={key}
              style={[styles.vitalTab, selectedVital === key && styles.vitalTabActive]}
              onPress={() => setSelectedVital(key)}
            >
              <Ionicons 
                name={vitalsData[key].icon} 
                size={20} 
                color={selectedVital === key ? COLORS.white : COLORS.textSecondary} 
              />
              <Text style={[styles.vitalTabText, selectedVital === key && styles.vitalTabTextActive]}>
                {vitalsData[key].name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Current Vital Display */}
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.vitalHero}
        >
          <View style={styles.vitalHeroHeader}>
            <Ionicons name={vitalsData[selectedVital].icon} size={40} color={COLORS.white} />
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(vitalsData[selectedVital].status) }]}>
              <Text style={styles.statusText}>{vitalsData[selectedVital].status.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.currentValue}>
            {vitalsData[selectedVital].current}
            <Text style={styles.unit}> {vitalsData[selectedVital].unit}</Text>
          </Text>
          <Text style={styles.normalRange}>Normal: {vitalsData[selectedVital].normal}</Text>
        </LinearGradient>

        {/* Trend Chart */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trend (Last 7 Days)</Text>
          <View style={styles.chartContainer}>
            {vitalsData[selectedVital].trend.map((value, index) => (
              <View key={index} style={styles.chartBar}>
                <View style={[styles.barFill, { height: `${(value / 150) * 100}%` }]} />
                <Text style={styles.chartLabel}>{value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>History</Text>
          {vitalsData[selectedVital].history.map((item, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={styles.historyLeft}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <Text style={styles.historyValue}>{item.value}</Text>
              </View>
              <View style={[styles.historyStatus, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text style={[styles.historyStatusText, { color: getStatusColor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Quick Add */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Add</Text>
          <View style={styles.quickAddGrid}>
            {vitalCategories.slice(0, 6).map((key) => (
              <TouchableOpacity key={key} style={styles.quickAddCard}>
                <Ionicons name={vitalsData[key].icon} size={24} color={COLORS.primary} />
                <Text style={styles.quickAddText}>{vitalsData[key].name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          <View style={styles.insightCard}>
            <Ionicons name="bulb" size={24} color={COLORS.accent} />
            <View style={styles.insightContent}>
              <Text style={styles.insightTitle}>Great Progress!</Text>
              <Text style={styles.insightText}>Your heart rate has been consistent this week. Keep up the good work!</Text>
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
  addButton: { padding: 8 },
  vitalSelector: { paddingVertical: 12, paddingHorizontal: 16 },
  vitalTab: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: COLORS.white, borderRadius: 20, marginRight: 10 },
  vitalTabActive: { backgroundColor: COLORS.primary },
  vitalTabText: { fontSize: 12, color: COLORS.textSecondary, marginLeft: 6 },
  vitalTabTextActive: { color: COLORS.white },
  vitalHero: { margin: 20, borderRadius: 24, padding: 24 },
  vitalHeroHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  statusText: { color: COLORS.white, fontSize: 10, fontWeight: '700' },
  currentValue: { fontSize: 56, fontWeight: '800', color: COLORS.white, marginTop: 16 },
  unit: { fontSize: 24 },
  normalRange: { color: 'rgba(255,255,255,0.8)', fontSize: 14, marginTop: 8 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: 120, backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  chartBar: { alignItems: 'center', flex: 1 },
  barFill: { width: 28, backgroundColor: COLORS.primary, borderRadius: 8, marginBottom: 8 },
  chartLabel: { fontSize: 10, color: COLORS.textTertiary },
  historyItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, padding: 16, marginBottom: 10 },
  historyLeft: {},
  historyDate: { fontSize: 12, color: COLORS.textTertiary },
  historyValue: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary, marginTop: 4 },
  historyStatus: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  historyStatusText: { fontSize: 12, fontWeight: '600' },
  quickAddGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  quickAddCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 12, padding: 16, alignItems: 'center' },
  quickAddText: { fontSize: 12, color: COLORS.textSecondary, marginTop: 8 },
  insightCard: { flexDirection: 'row', backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  insightContent: { flex: 1, marginLeft: 12 },
  insightTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  insightText: { fontSize: 13, color: COLORS.textSecondary, marginTop: 4 },
  bottomPadding: { height: 40 },
});
