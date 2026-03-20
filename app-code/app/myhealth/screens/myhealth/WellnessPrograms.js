/**
 * ============================================================================
 * WELLNESS PROGRAMS - HEALTH PROGRAMS
 * ============================================================================
 * Browse and enroll in wellness and health programs
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
  accent: '#FF6B35',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function WellnessPrograms() {
  const router = useRouter();

  const programs = [
    { id: 1, title: 'Weight Management', duration: '12 Weeks', rating: 4.8, enrolled: 12500, price: '₹2,999', icon: 'scale', color: '#4CAF50' },
    { id: 2, title: 'Diabetes Control', duration: '8 Weeks', rating: 4.9, enrolled: 8200, price: '₹3,499', icon: 'water', color: '#2196F3' },
    { id: 3, title: 'Heart Health', duration: '10 Weeks', rating: 4.7, enrolled: 5600, price: '₹2,499', icon: 'heart', color: '#E53935' },
    { id: 4, title: 'Stress Management', duration: '6 Weeks', rating: 4.6, enrolled: 9800, price: '₹1,999', icon: 'leaf', color: '#9C27B0' },
    { id: 5, title: 'Sleep Improvement', duration: '4 Weeks', rating: 4.8, enrolled: 7100, price: '₹1,499', icon: 'moon', color: '#3F51B5' },
    { id: 6, title: 'Immunity Boost', duration: '4 Weeks', rating: 4.5, enrolled: 15000, price: '₹999', icon: 'shield-checkmark', color: '#FF9800' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Wellness Programs</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <Ionicons name="star" size={32} color={COLORS.gold} />
            <Text style={styles.featuredTitle}>Featured Program</Text>
            <Text style={styles.featuredText}>Complete Health Transformation</Text>
            <TouchableOpacity style={styles.featuredButton}>
              <Text style={styles.featuredButtonText}>Explore Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Programs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Programs</Text>
          {programs.map((program) => (
            <View key={program.id} style={styles.programCard}>
              <View style={[styles.programIcon, { backgroundColor: program.color + '20' }]}>
                <Ionicons name={program.icon} size={32} color={program.color} />
              </View>
              <View style={styles.programInfo}>
                <Text style={styles.programTitle}>{program.title}</Text>
                <Text style={styles.programDuration}>{program.duration}</Text>
                <View style={styles.programMeta}>
                  <View style={styles.rating}>
                    <Ionicons name="star" size={12} color={COLORS.gold} />
                    <Text style={styles.ratingText}>{program.rating}</Text>
                  </View>
                  <Text style={styles.enrolled}>{program.enrolled.toLocaleString()} enrolled</Text>
                </View>
              </View>
              <View style={styles.programRight}>
                <Text style={styles.programPrice}>{program.price}</Text>
                <TouchableOpacity style={styles.enrollButton}>
                  <Text style={styles.enrollButtonText}>Enroll</Text>
                </TouchableOpacity>
              </View>
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
  searchButton: { padding: 8 },
  featuredCard: { margin: 20, backgroundColor: COLORS.primary, borderRadius: 20, padding: 24 },
  featuredContent: { alignItems: 'center' },
  featuredTitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 12 },
  featuredText: { fontSize: 22, fontWeight: '700', color: COLORS.white, marginTop: 8 },
  featuredButton: { marginTop: 16, backgroundColor: COLORS.white, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  featuredButtonText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  programCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  programIcon: { width: 64, height: 64, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  programInfo: { flex: 1, marginLeft: 14 },
  programTitle: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  programDuration: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  programMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, marginLeft: 2 },
  enrolled: { fontSize: 11, color: COLORS.textTertiary },
  programRight: { alignItems: 'flex-end' },
  programPrice: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary },
  enrollButton: { marginTop: 8, backgroundColor: COLORS.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  enrollButtonText: { fontSize: 12, fontWeight: '600', color: COLORS.white },
  bottomPadding: { height: 40 },
});
