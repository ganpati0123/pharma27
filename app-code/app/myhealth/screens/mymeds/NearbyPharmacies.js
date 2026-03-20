/**
 * ============================================================================
 * NEARBY PHARMACIES - FIND MEDICINES
 * ============================================================================
 * Locate nearby pharmacies and order medicines
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

export default function NearbyPharmacies() {
  const router = useRouter();

  const pharmacies = [
    { id: 1, name: 'Apollo Pharmacy', distance: '0.5 km', rating: 4.5, address: '123 Main Street', open: true, delivery: true },
    { id: 2, name: 'MedPlus', distance: '1.2 km', rating: 4.2, address: '456 Oak Avenue', open: true, delivery: true },
    { id: 3, name: 'Wellness Pharma', distance: '2.0 km', rating: 4.8, address: '789 Park Road', open: false, delivery: true },
    { id: 4, name: 'Local Medical', distance: '2.5 km', rating: 4.0, address: '321 Lake View', open: true, delivery: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Pharmacies</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchCard}>
          <Ionicons name="search" size={20} color={COLORS.textTertiary} />
          <Text style={styles.searchText}>Search medicines or pharmacies...</Text>
        </View>

        {/* Filters */}
        <View style={styles.filters}>
          <TouchableOpacity style={styles.filterChip}>
            <Ionicons name="bicycle" size={16} color={COLORS.primary} />
            <Text style={styles.filterText}>Delivery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Ionicons name="time" size={16} color={COLORS.green} />
            <Text style={styles.filterText}>Open Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterChip}>
            <Ionicons name="star" size={16} color={COLORS.accent} />
            <Text style={styles.filterText}>Top Rated</Text>
          </TouchableOpacity>
        </View>

        {/* Pharmacies List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pharmacies Near You</Text>
          {pharmacies.map((pharmacy) => (
            <TouchableOpacity key={pharmacy.id} style={styles.pharmacyCard}>
              <View style={styles.pharmacyHeader}>
                <View style={[styles.pharmacyIcon, { backgroundColor: pharmacy.open ? '#E8F5E9' : '#FFEBEE' }]}>
                  <Ionicons name="medical" size={24} color={pharmacy.open ? COLORS.green : COLORS.red} />
                </View>
                <View style={styles.pharmacyInfo}>
                  <Text style={styles.pharmacyName}>{pharmacy.name}</Text>
                  <Text style={styles.pharmacyAddress}>{pharmacy.address}</Text>
                  <View style={styles.pharmacyMeta}>
                    <View style={styles.rating}>
                      <Ionicons name="star" size={12} color={COLORS.accent} />
                      <Text style={styles.ratingText}>{pharmacy.rating}</Text>
                    </View>
                    <Text style={styles.distance}>{pharmacy.distance}</Text>
                    <View style={[styles.openBadge, { backgroundColor: pharmacy.open ? '#E8F5E9' : '#FFEBEE' }]}>
                      <Text style={[styles.openText, { color: pharmacy.open ? COLORS.green : COLORS.red }]}>
                        {pharmacy.open ? 'Open' : 'Closed'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.pharmacyActions}>
                {pharmacy.delivery && (
                  <View style={styles.deliveryBadge}>
                    <Ionicons name="bicycle" size={14} color={COLORS.blue} />
                    <Text style={styles.deliveryText}>Delivery</Text>
                  </View>
                )}
                <TouchableOpacity style={styles.orderButton}>
                  <Text style={styles.orderButtonText}>Order Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
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
  filterButton: { padding: 8 },
  searchCard: { flexDirection: 'row', alignItems: 'center', margin: 20, backgroundColor: COLORS.white, borderRadius: 12, padding: 12 },
  searchText: { fontSize: 14, color: COLORS.textTertiary, marginLeft: 8 },
  filters: { flexDirection: 'row', paddingHorizontal: 20, gap: 10 },
  filterChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, gap: 6 },
  filterText: { fontSize: 12, color: COLORS.textSecondary },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 16 },
  pharmacyCard: { backgroundColor: COLORS.white, borderRadius: 16, padding: 16, marginBottom: 12 },
  pharmacyHeader: { flexDirection: 'row' },
  pharmacyIcon: { width: 56, height: 56, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  pharmacyInfo: { flex: 1, marginLeft: 12 },
  pharmacyName: { fontSize: 16, fontWeight: '600', color: COLORS.textPrimary },
  pharmacyAddress: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  pharmacyMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 12 },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary, marginLeft: 2 },
  distance: { fontSize: 12, color: COLORS.textTertiary },
  openBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  openText: { fontSize: 10, fontWeight: '600' },
  pharmacyActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: COLORS.divider },
  deliveryBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E3F2FD', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, gap: 4 },
  deliveryText: { fontSize: 11, color: COLORS.blue, fontWeight: '500' },
  orderButton: { backgroundColor: COLORS.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  orderButtonText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  bottomPadding: { height: 40 },
});
