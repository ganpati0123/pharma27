/**
 * ============================================================================
 * HEALTH ENCYCLOPEDIA - AI HEALTH TOPICS
 * ============================================================================
 * Browse health topics and learn about conditions
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
  red: '#E74C3C',
  white: '#FFFFFF',
  background: '#F5F5F8',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
};

export default function HealthEncyclopedia() {
  const router = useRouter();

  const topics = [
    { id: 1, title: 'Common Cold', category: 'Respiratory', icon: 'thermometer', color: COLORS.blue, articles: 12 },
    { id: 2, title: 'Diabetes', category: 'Endocrine', icon: 'water', color: COLORS.accent, articles: 18 },
    { id: 3, title: 'Heart Disease', category: 'Cardiovascular', icon: 'heart', color: COLORS.red, articles: 24 },
    { id: 4, title: 'Mental Health', category: 'Brain', icon: 'happy', color: COLORS.primary, articles: 15 },
    { id: 5, title: 'Nutrition', category: 'Diet', icon: 'nutrition', color: COLORS.green, articles: 20 },
    { id: 6, title: 'Exercise', category: 'Fitness', icon: 'fitness', color: '#4CAF50', articles: 16 },
    { id: 7, title: 'Sleep', category: 'Wellness', icon: 'moon', color: '#9C27B0', articles: 10 },
    { id: 8, title: 'Allergies', category: 'Immune', icon: 'warning', color: '#FF9800', articles: 8 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Encyclopedia</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured */}
        <View style={styles.featuredCard}>
          <View style={styles.featuredContent}>
            <Ionicons name="book" size={32} color={COLORS.white} />
            <Text style={styles.featuredTitle}>Featured Topic</Text>
            <Text style={styles.featuredText}>Understanding Heart Health</Text>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse by Category</Text>
          <View style={styles.categoriesGrid}>
            {topics.map((topic) => (
              <TouchableOpacity key={topic.id} style={styles.topicCard}>
                <View style={[styles.topicIcon, { backgroundColor: topic.color + '20' }]}>
                  <Ionicons name={topic.icon} size={24} color={topic.color} />
                </View>
                <Text style={styles.topicTitle}>{topic.title}</Text>
                <Text style={styles.topicCategory}>{topic.category}</Text>
                <Text style={styles.topicArticles}>{topic.articles} articles</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Articles</Text>
          <View style={styles.articlesCard}>
            <View style={styles.articleItem}>
              <Text style={styles.articleTitle}>10 Tips for Better Sleep</Text>
              <Text style={styles.articleCategory}>Sleep • 5 min read</Text>
            </View>
            <View style={styles.articleItem}>
              <Text style={styles.articleTitle}>Understanding Blood Pressure</Text>
              <Text style={styles.articleCategory}>Heart • 8 min read</Text>
            </View>
            <View style={styles.articleItem}>
              <Text style={styles.articleTitle}>Diabetes Diet Guide</Text>
              <Text style={styles.articleCategory}>Diabetes • 10 min read</Text>
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
  searchButton: { padding: 8 },
  featuredCard: { margin: 20, backgroundColor: COLORS.primary, borderRadius: 20, padding: 24 },
  featuredContent: { alignItems: 'center' },
  featuredTitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 12 },
  featuredText: { fontSize: 22, fontWeight: '700', color: COLORS.white, marginTop: 8 },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  topicCard: { width: '47%', backgroundColor: COLORS.white, borderRadius: 16, padding: 16 },
  topicIcon: { width: 48, height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  topicTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary, marginTop: 12 },
  topicCategory: { fontSize: 12, color: COLORS.textSecondary, marginTop: 4 },
  topicArticles: { fontSize: 11, color: COLORS.textTertiary, marginTop: 4 },
  articlesCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 4 },
  articleItem: { padding: 16, borderBottomWidth: 1, borderBottomColor: COLORS.divider },
  articleTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textPrimary },
  articleCategory: { fontSize: 12, color: COLORS.textTertiary, marginTop: 4 },
  bottomPadding: { height: 40 },
});
