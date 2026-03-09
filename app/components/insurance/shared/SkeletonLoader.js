import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SkeletonPulse = ({ width, height, borderRadius = 8, style }) => {
  const pulseAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 0.3, duration: 800, useNativeDriver: true }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: '#E1E9EE',
          opacity: pulseAnim,
        },
        style,
      ]}
    />
  );
};

export const SkeletonCard = () => (
  <View style={skStyles.card}>
    <SkeletonPulse width={60} height={60} borderRadius={12} />
    <View style={skStyles.cardContent}>
      <SkeletonPulse width={180} height={16} />
      <SkeletonPulse width={120} height={12} style={{ marginTop: 8 }} />
      <SkeletonPulse width={200} height={12} style={{ marginTop: 8 }} />
    </View>
  </View>
);

export const SkeletonPlanCard = () => (
  <View style={skStyles.planCard}>
    <View style={skStyles.planHeader}>
      <SkeletonPulse width={40} height={40} borderRadius={20} />
      <View style={{ marginLeft: 12, flex: 1 }}>
        <SkeletonPulse width={160} height={16} />
        <SkeletonPulse width={100} height={12} style={{ marginTop: 6 }} />
      </View>
      <SkeletonPulse width={80} height={24} borderRadius={12} />
    </View>
    <View style={skStyles.planFeatures}>
      {[1, 2, 3].map(i => (
        <SkeletonPulse key={i} width={SCREEN_WIDTH - 80} height={12} style={{ marginTop: 8 }} />
      ))}
    </View>
    <View style={skStyles.planFooter}>
      <SkeletonPulse width={100} height={14} />
      <SkeletonPulse width={120} height={14} />
    </View>
    <SkeletonPulse width={SCREEN_WIDTH - 64} height={44} borderRadius={8} style={{ marginTop: 12 }} />
  </View>
);

export const SkeletonSection = () => (
  <View style={skStyles.section}>
    <SkeletonPulse width={200} height={20} style={{ marginBottom: 16 }} />
    <View style={skStyles.sectionRow}>
      {[1, 2, 3].map(i => (
        <SkeletonPulse key={i} width={(SCREEN_WIDTH - 56) / 3} height={100} borderRadius={12} />
      ))}
    </View>
  </View>
);

export const SkeletonHeader = () => (
  <View style={skStyles.header}>
    <SkeletonPulse width={SCREEN_WIDTH} height={200} borderRadius={0} />
    <View style={skStyles.headerContent}>
      <SkeletonPulse width={200} height={24} />
      <SkeletonPulse width={150} height={16} style={{ marginTop: 8 }} />
    </View>
  </View>
);

export const SkeletonList = ({ count = 5 }) => (
  <View>
    {Array.from({ length: count }).map((_, i) => (
      <View key={i} style={skStyles.listItem}>
        <SkeletonPulse width={48} height={48} borderRadius={24} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <SkeletonPulse width={180} height={14} />
          <SkeletonPulse width={120} height={12} style={{ marginTop: 6 }} />
        </View>
        <SkeletonPulse width={60} height={28} borderRadius={14} />
      </View>
    ))}
  </View>
);

export const SkeletonGrid = ({ columns = 3, rows = 2 }) => (
  <View>
    {Array.from({ length: rows }).map((_, row) => (
      <View key={row} style={skStyles.gridRow}>
        {Array.from({ length: columns }).map((_, col) => (
          <SkeletonPulse
            key={col}
            width={(SCREEN_WIDTH - 32 - (columns - 1) * 12) / columns}
            height={90}
            borderRadius={12}
          />
        ))}
      </View>
    ))}
  </View>
);

export default SkeletonPulse;

const skStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
  },
  cardContent: {
    marginLeft: 12,
    flex: 1,
  },
  planCard: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planFeatures: {
    marginTop: 12,
  },
  planFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  section: {
    padding: 16,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: 16,
  },
  headerContent: {
    padding: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
});
