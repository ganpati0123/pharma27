import React, { memo } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DoctorsTheme } from './DoctorsTheme';

const GoToTopButton = memo(({ visible, onPress }) => {
  if (!visible) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel="Go to top"
    >
      <Ionicons name="arrow-up" size={16} color={DoctorsTheme.colors.white} />
      <Text style={styles.label}>Go To Top</Text>
    </TouchableOpacity>
  );
});

GoToTopButton.displayName = 'GoToTopButton';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: DoctorsTheme.colors.textPrimary,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 4,
    zIndex: 99,
    ...DoctorsTheme.shadow.level2,
  },
  label: {
    color: DoctorsTheme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});

export default GoToTopButton;
