import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const FILTER_CATEGORIES = [
  { key: 'insurers', label: 'Insurers' },
  { key: 'coverage', label: 'Coverage' },
  { key: 'maternity', label: 'Maternity coverage' },
  { key: 'existingDisease', label: 'Existing diseases waiting period' },
  { key: 'roomRent', label: 'Room rent type' },
  { key: 'noClaimBonus', label: 'No claim bonus' },
];

const INSURER_OPTIONS = ['Niva Bupa', 'Care Health', 'Star Health', 'ManipalCigna', 'ICICI Lombard', 'Aditya Birla', 'Godigit', 'HDFC Ergo'];
const COVERAGE_OPTIONS = ['3 Lakh', '5 Lakh', '10 Lakh', '15 Lakh', '25 Lakh', '50 Lakh', '1 Crore'];
const ROOM_RENT_OPTIONS = ['No room rent limit', 'Single private room', 'Twin sharing', 'Any room type'];
const WAITING_OPTIONS = ['1 Year', '2 Years', '3 Years', '4 Years'];

const FilterModal = ({ visible, onClose, onApply, currentFilters }) => {
  const [activeCategory, setActiveCategory] = useState('insurers');
  const [filters, setFilters] = useState(currentFilters || {});
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }).start();
    } else {
      Animated.timing(slideAnim, { toValue: SCREEN_HEIGHT, duration: 250, useNativeDriver: true }).start();
    }
  }, [visible]);

  const toggleFilter = (key, value) => {
    setFilters(prev => {
      if (key === 'insurers') {
        const list = prev.insurers || [];
        return { ...prev, insurers: list.includes(value) ? list.filter(v => v !== value) : [...list, value] };
      }
      if (key === 'maternity' || key === 'noClaimBonus') {
        return { ...prev, [key]: !prev[key] };
      }
      return { ...prev, [key]: prev[key] === value ? null : value };
    });
  };

  const clearAll = () => setFilters({});

  const renderFilterContent = () => {
    switch (activeCategory) {
      case 'insurers':
        return INSURER_OPTIONS.map(opt => (
          <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggleFilter('insurers', opt)}>
            <View style={[styles.checkbox, (filters.insurers || []).includes(opt) && styles.checkboxActive]}>
              {(filters.insurers || []).includes(opt) && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ));
      case 'coverage':
        return COVERAGE_OPTIONS.map(opt => (
          <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggleFilter('coverage', opt)}>
            <View style={[styles.radio, filters.coverage === opt && styles.radioActive]}>
              {filters.coverage === opt && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ));
      case 'maternity':
        return (
          <TouchableOpacity style={styles.optionRow} onPress={() => toggleFilter('maternity', true)}>
            <View style={[styles.checkbox, filters.maternity && styles.checkboxActive]}>
              {filters.maternity && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.optionText}>With maternity cover</Text>
          </TouchableOpacity>
        );
      case 'existingDisease':
        return WAITING_OPTIONS.map(opt => (
          <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggleFilter('existingDisease', opt)}>
            <View style={[styles.radio, filters.existingDisease === opt && styles.radioActive]}>
              {filters.existingDisease === opt && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ));
      case 'roomRent':
        return ROOM_RENT_OPTIONS.map(opt => (
          <TouchableOpacity key={opt} style={styles.optionRow} onPress={() => toggleFilter('roomRent', opt)}>
            <View style={[styles.radio, filters.roomRent === opt && styles.radioActive]}>
              {filters.roomRent === opt && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.optionText}>{opt}</Text>
          </TouchableOpacity>
        ));
      case 'noClaimBonus':
        return (
          <TouchableOpacity style={styles.optionRow} onPress={() => toggleFilter('noClaimBonus', true)}>
            <View style={[styles.checkbox, filters.noClaimBonus && styles.checkboxActive]}>
              {filters.noClaimBonus && <Ionicons name="checkmark" size={14} color="#fff" />}
            </View>
            <Text style={styles.optionText}>With No Claim Bonus</Text>
          </TouchableOpacity>
        );
      default:
        return null;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.overlayBg} onPress={onClose} activeOpacity={1} />
        <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Category sidebar */}
            <ScrollView style={styles.sidebar} showsVerticalScrollIndicator={false}>
              {FILTER_CATEGORIES.map(cat => (
                <TouchableOpacity
                  key={cat.key}
                  style={[styles.categoryItem, activeCategory === cat.key && styles.categoryItemActive]}
                  onPress={() => setActiveCategory(cat.key)}
                >
                  <Text style={[styles.categoryText, activeCategory === cat.key && styles.categoryTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Filter options */}
            <ScrollView style={styles.options} showsVerticalScrollIndicator={false}>
              {renderFilterContent()}
            </ScrollView>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.clearBtn} onPress={clearAll}>
              <Text style={styles.clearText}>Clear all</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.applyBtn}
              onPress={() => { onApply(filters); onClose(); }}
            >
              <Text style={styles.applyText}>Done</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end' },
  overlayBg: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.5)' },
  container: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: SCREEN_HEIGHT * 0.7, overflow: 'hidden' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  title: { fontSize: 22, fontWeight: '700', color: '#1A1A2E' },
  closeBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },
  content: { flexDirection: 'row', minHeight: 300 },
  sidebar: { width: '40%', borderRightWidth: 1, borderRightColor: '#F0F0F0', backgroundColor: '#FAFAFA' },
  categoryItem: { paddingVertical: 16, paddingHorizontal: 16, borderLeftWidth: 3, borderLeftColor: 'transparent' },
  categoryItemActive: { backgroundColor: '#FFF3E0', borderLeftColor: '#FF6B35' },
  categoryText: { fontSize: 14, color: '#666' },
  categoryTextActive: { color: '#FF6B35', fontWeight: '600' },
  options: { flex: 1, padding: 16 },
  optionRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  checkbox: { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: '#DDD', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  checkboxActive: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  radio: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#DDD', marginRight: 12, justifyContent: 'center', alignItems: 'center' },
  radioActive: { borderColor: '#FF6B35' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF6B35' },
  optionText: { fontSize: 14, color: '#333', flex: 1 },
  footer: { flexDirection: 'row', padding: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0', gap: 12 },
  clearBtn: { flex: 1, paddingVertical: 14, borderRadius: 10, borderWidth: 1, borderColor: '#DDD', alignItems: 'center' },
  clearText: { fontSize: 15, fontWeight: '600', color: '#666' },
  applyBtn: { flex: 1, paddingVertical: 14, borderRadius: 10, backgroundColor: '#E0E0E0', alignItems: 'center' },
  applyText: { fontSize: 15, fontWeight: '700', color: '#333' },
});

export default FilterModal;
