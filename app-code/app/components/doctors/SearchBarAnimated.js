import React, { memo, useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DoctorsTheme } from './DoctorsTheme';

const PLACEHOLDERS = [
  'Search Symptoms',
  'Search Specialities',
  'Search Doctors',
  'Search Conditions',
];

const SearchBarAnimated = memo(({ placeholder, borderColor = DoctorsTheme.colors.teal, style }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(1))[0];

  const animatePlaceholder = useCallback(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  useEffect(() => {
    if (placeholder) return;
    const interval = setInterval(() => {
      animatePlaceholder();
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [placeholder, animatePlaceholder]);

  const displayPlaceholder = placeholder || PLACEHOLDERS[currentIndex];

  return (
    <View style={[styles.container, { borderColor }, style]}>
      <Ionicons name="search-outline" size={22} color={DoctorsTheme.colors.lightGray} style={styles.searchIcon} />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholderTextColor={DoctorsTheme.colors.lightGray}
          accessibilityLabel="Search"
          accessibilityRole="search"
        />
        <Animated.View style={[styles.placeholderContainer, { opacity: fadeAnim }]} pointerEvents="none">
          <Text style={styles.placeholderText}>{displayPlaceholder}</Text>
        </Animated.View>
      </View>
    </View>
  );
});

SearchBarAnimated.displayName = 'SearchBarAnimated';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: DoctorsTheme.colors.white,
    borderRadius: DoctorsTheme.borderRadius.lg,
    borderWidth: 1.5,
    marginHorizontal: DoctorsTheme.spacing.lg,
    marginVertical: DoctorsTheme.spacing.sm,
    paddingHorizontal: DoctorsTheme.spacing.md,
    height: 48,
  },
  searchIcon: {
    marginRight: DoctorsTheme.spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: DoctorsTheme.colors.textPrimary,
    padding: 0,
  },
  placeholderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 15,
    color: DoctorsTheme.colors.lightGray,
  },
});

export default SearchBarAnimated;
