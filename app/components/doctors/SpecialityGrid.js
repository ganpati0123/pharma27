import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DoctorsTheme } from './DoctorsTheme';

const SpecialityItem = memo(({ item, size, onPress }) => {
  const itemSize = size === 'large' ? 72 : 56;
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => onPress && onPress(item)}
      accessibilityRole="button"
      accessibilityLabel={`Select ${item.name.replace('\n', ' ')} speciality`}
    >
      <View style={[styles.iconContainer, { width: itemSize, height: itemSize, backgroundColor: item.color || DoctorsTheme.colors.cardBg }]}>
        <Text style={[styles.icon, { fontSize: size === 'large' ? 28 : 24 }]}>{item.icon}</Text>
      </View>
      <Text style={styles.label} numberOfLines={2}>{item.name}</Text>
    </TouchableOpacity>
  );
});

SpecialityItem.displayName = 'SpecialityItem';

const SpecialityGrid = memo(({ data, columns = 4, title, showViewAll, size = 'normal', onViewAll, onItemPress }) => {
  const rows = [];
  for (let i = 0; i < data.length; i += columns) {
    rows.push(data.slice(i, i + columns));
  }

  return (
    <View style={styles.container}>
      {title && (
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          {showViewAll && (
            <TouchableOpacity onPress={onViewAll} accessibilityRole="button" accessibilityLabel="View all specialities">
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((item) => (
            <SpecialityItem key={item.id} item={item} size={size} onPress={onItemPress} />
          ))}
          {row.length < columns && Array.from({ length: columns - row.length }).map((_, i) => (
            <View key={`empty-${i}`} style={styles.item} />
          ))}
        </View>
      ))}
    </View>
  );
});

SpecialityGrid.displayName = 'SpecialityGrid';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: DoctorsTheme.spacing.lg,
    paddingVertical: DoctorsTheme.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: DoctorsTheme.spacing.md,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: DoctorsTheme.colors.textPrimary,
    flex: 1,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
    color: DoctorsTheme.colors.teal,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: DoctorsTheme.spacing.lg,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    maxWidth: '25%',
  },
  iconContainer: {
    borderRadius: DoctorsTheme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  icon: {
    fontSize: 24,
  },
  label: {
    fontSize: 11,
    color: DoctorsTheme.colors.textPrimary,
    textAlign: 'center',
    lineHeight: 14,
  },
});

export default SpecialityGrid;
