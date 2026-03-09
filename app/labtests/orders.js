import React, { useState, useCallback, memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const C = {
  primaryOrange: '#E05A2B',
  primaryTeal: '#006060',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  borderLight: '#E8E8E8',
};

// ─── PATIENT DATA ───
const patients = [
  { id: 'all', name: 'All', gender: null, age: null },
  { id: '1', name: 'Ganpati', gender: 'MALE', age: 25 },
];

// ─── HEADER ───
const OrdersHeader = memo(() => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerBackBtn} accessibilityLabel="Go back">
      <Ionicons name="arrow-back" size={24} color={C.textPrimary} />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>MY ORDERS</Text>
    <TouchableOpacity accessibilityLabel="Help">
      <Text style={styles.headerHelp}>Help</Text>
    </TouchableOpacity>
  </View>
));

// ─── FILTER ROW ───
const FilterRow = memo(({ selectedPatient, onOpenSheet }) => (
  <View style={styles.filterRow}>
    <Text style={styles.filterLabel}>Patient Name :</Text>
    <TouchableOpacity style={styles.filterDropdown} onPress={onOpenSheet} accessibilityLabel="Select patient">
      <Text style={styles.filterDropdownText}>{selectedPatient}</Text>
      <Ionicons name="chevron-down" size={20} color={C.textSecondary} />
    </TouchableOpacity>
  </View>
));

// ─── EMPTY STATE ───
const EmptyState = memo(() => (
  <View style={styles.emptyCard}>
    <Text style={styles.emptyTitle}>Uh oh.. :(</Text>
    <Text style={styles.emptySubtitle}>You don't have any active orders yet!</Text>
    <TouchableOpacity style={styles.orderNowBtn} accessibilityLabel="Order now">
      <Text style={styles.orderNowText}>ORDER NOW</Text>
    </TouchableOpacity>
  </View>
));

// ─── BOTTOM SHEET ───
const PatientBottomSheet = memo(({ visible, onClose, onSelect, selectedPatient }) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <Pressable style={styles.overlay} onPress={onClose}>
      <View style={styles.bottomSheet}>
        <Text style={styles.bottomSheetTitle}>Select Patient Name</Text>
        {patients.map((patient) => (
          <TouchableOpacity
            key={patient.id}
            style={[
              styles.patientCard,
              selectedPatient === patient.name && styles.patientCardActive,
            ]}
            onPress={() => onSelect(patient.name)}
            accessibilityLabel={`Select ${patient.name}`}
          >
            <View style={styles.patientInfo}>
              <Text style={styles.patientName}>{patient.name}</Text>
              {patient.gender && (
                <Text style={styles.patientMeta}>({patient.gender}, {patient.age})</Text>
              )}
            </View>
            {selectedPatient === patient.name && (
              <Ionicons name="checkmark-circle" size={22} color={C.primaryTeal} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </Pressable>
  </Modal>
));

// ─── MAIN SCREEN ───
export default function Orders() {
  const [selectedPatient, setSelectedPatient] = useState('All');
  const [sheetVisible, setSheetVisible] = useState(false);

  const openSheet = useCallback(() => setSheetVisible(true), []);
  const closeSheet = useCallback(() => setSheetVisible(false), []);
  const selectPatient = useCallback((name) => {
    setSelectedPatient(name);
    setSheetVisible(false);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <OrdersHeader />
      <View style={styles.divider} />
      <FilterRow selectedPatient={selectedPatient} onOpenSheet={openSheet} />
      <View style={styles.content}>
        <EmptyState />
      </View>
      <PatientBottomSheet
        visible={sheetVisible}
        onClose={closeSheet}
        onSelect={selectPatient}
        selectedPatient={selectedPatient}
      />
    </SafeAreaView>
  );
}

// ─── STYLES ───
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, paddingHorizontal: 16, paddingTop: 20 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, backgroundColor: '#FFF' },
  headerBackBtn: { padding: 4 },
  headerTitle: { fontSize: 16, fontWeight: '700', color: C.textPrimary, letterSpacing: 0.5 },
  headerHelp: { fontSize: 16, fontWeight: '600', color: C.textPrimary },
  divider: { height: 1, backgroundColor: C.primaryTeal, opacity: 0.3 },

  // Filter
  filterRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14 },
  filterLabel: { fontSize: 14, fontWeight: '600', color: C.textPrimary, marginRight: 12 },
  filterDropdown: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10 },
  filterDropdownText: { fontSize: 14, color: C.textPrimary },

  // Empty State
  emptyCard: { backgroundColor: '#F5F5F5', borderRadius: 12, padding: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: C.primaryTeal },
  emptySubtitle: { fontSize: 14, color: C.primaryOrange, marginTop: 8 },
  orderNowBtn: { marginTop: 16, backgroundColor: C.primaryTeal, borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  orderNowText: { fontSize: 16, fontWeight: '700', color: '#FFF', letterSpacing: 0.5 },

  // Bottom Sheet
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#FFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 40 },
  bottomSheetTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 16 },
  patientCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F8F8F8', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E8E8E8' },
  patientCardActive: { borderColor: C.primaryTeal, backgroundColor: '#F0F8F8' },
  patientInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  patientName: { fontSize: 16, fontWeight: '600', color: C.textPrimary },
  patientMeta: { fontSize: 13, color: C.textSecondary },
});
