import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SectionHeader = ({ title, subtitle, actionText, onAction, icon, iconColor = '#FF6B35', style }) => (
  <View style={[styles.container, style]}>
    <View style={styles.left}>
      {icon && (
        <View style={[styles.iconContainer, { backgroundColor: iconColor + '15' }]}>
          <Ionicons name={icon} size={20} color={iconColor} />
        </View>
      )}
      <View style={icon ? styles.textWithIcon : undefined}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
    {actionText && onAction && (
      <TouchableOpacity onPress={onAction} style={styles.actionBtn} activeOpacity={0.7}>
        <Text style={styles.actionText}>{actionText}</Text>
        <Ionicons name="chevron-forward" size={14} color="#FF6B35" />
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  textWithIcon: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A2E',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FF6B35',
    marginRight: 2,
  },
});

export default SectionHeader;
