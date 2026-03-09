import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DoctorsTheme } from './DoctorsTheme';

const StickyHeader = memo(({ backgroundColor = DoctorsTheme.colors.headerLavender }) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.topRow}>
        <View style={styles.locationContainer}>
          <Text style={styles.findText}>Find Doctors near</Text>
          <TouchableOpacity
            style={styles.locationButton}
            accessibilityRole="button"
            accessibilityLabel="Change location"
          >
            <Text style={styles.locationText}>Delhi 110001</Text>
            <Ionicons name="chevron-down" size={14} color={DoctorsTheme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconButton} accessibilityRole="button" accessibilityLabel="Notifications">
            <Ionicons name="notifications-outline" size={22} color={DoctorsTheme.colors.textPrimary} />
            <View style={styles.notifBadge}>
              <Text style={styles.notifBadgeText}>14</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.hcButton} accessibilityRole="button" accessibilityLabel="Health coins">
            <Text style={styles.hcText}>₹50</Text>
            <Text style={styles.hcLabel}>HC</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarButton} accessibilityRole="button" accessibilityLabel="Profile">
            <Ionicons name="person-circle-outline" size={30} color={DoctorsTheme.colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

StickyHeader.displayName = 'StickyHeader';

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingHorizontal: DoctorsTheme.spacing.lg,
    paddingBottom: DoctorsTheme.spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flex: 1,
  },
  findText: {
    fontSize: 12,
    color: DoctorsTheme.colors.textSecondary,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationText: {
    fontSize: 15,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    marginRight: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    position: 'relative',
    padding: 4,
  },
  notifBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: DoctorsTheme.colors.redBadge,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  notifBadgeText: {
    color: DoctorsTheme.colors.white,
    fontSize: 9,
    fontWeight: '700',
  },
  hcButton: {
    backgroundColor: DoctorsTheme.colors.black,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 2,
  },
  hcText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '700',
  },
  hcLabel: {
    color: DoctorsTheme.colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  avatarButton: {
    padding: 2,
  },
});

export default StickyHeader;
