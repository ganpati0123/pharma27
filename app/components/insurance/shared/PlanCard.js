import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const PlanCard = ({ plan, onPress, onCompare, onCustomize, index = 0, isTopUp = false }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [expanded, setExpanded] = useState(false);
  const expandAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, { toValue: 0.98, tension: 100, friction: 10, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, { toValue: 1, tension: 100, friction: 10, useNativeDriver: true }).start();
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
    Animated.spring(expandAnim, {
      toValue: expanded ? 0 : 1,
      tension: 50,
      friction: 8,
      useNativeDriver: false,
    }).start();
  };

  const formatAmount = (amount) => {
    if (amount >= 10000000) return `${(amount / 10000000).toFixed(0)} Cr`;
    if (amount >= 100000) return `${(amount / 100000).toFixed(0)} Lakh`;
    return `${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {/* Badge */}
        {plan.badge && (
          <View style={[styles.badge, { backgroundColor: plan.badgeColor || '#FF6B35' }]}>
            <Text style={styles.badgeText}>{plan.badge}</Text>
          </View>
        )}

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.insurerIcon}>
            <Ionicons name="shield-checkmark" size={24} color="#FF6B35" />
          </View>
          <View style={styles.headerText}>
            <Text style={styles.planName} numberOfLines={1}>{plan.name}</Text>
            <Text style={styles.insurerName}>{plan.insurer}</Text>
          </View>
          <TouchableOpacity style={styles.compareBtn} onPress={onCompare}>
            <Ionicons name="git-compare-outline" size={18} color="#666" />
          </TouchableOpacity>
        </View>

        {/* Hospital Count */}
        <View style={styles.hospitalRow}>
          <Ionicons name="business" size={14} color="#2ECC71" />
          <Text style={styles.hospitalText}>
            {plan.cashlessHospitals || 880} cashless hospitals in your city
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.features}>
          {(plan.features || []).slice(0, expanded ? undefined : 3).map((feature, i) => (
            <View key={i} style={styles.featureRow}>
              <Ionicons name="checkmark-circle" size={16} color="#2ECC71" />
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
          {!expanded && plan.features && plan.features.length > 3 && (
            <TouchableOpacity onPress={toggleExpand} style={styles.moreBtn}>
              <Text style={styles.moreText}>+{plan.features.length - 3} more benefits</Text>
              <Ionicons name="chevron-down" size={14} color="#FF6B35" />
            </TouchableOpacity>
          )}
        </View>

        {/* Coverage & Premium */}
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.priceLabel}>Coverage</Text>
            <Text style={styles.priceValue}>
              <Ionicons name="shield" size={14} color="#3498DB" /> {formatAmount(plan.coverage)}
            </Text>
          </View>
          {isTopUp && plan.deductible && (
            <View>
              <Text style={styles.priceLabel}>Deductible</Text>
              <Text style={styles.priceValue}>{formatAmount(plan.deductible)}</Text>
            </View>
          )}
          <View style={styles.premiumSection}>
            <Text style={styles.priceLabel}>Premium</Text>
            <Text style={styles.premiumValue}>
              <Text style={styles.rupee}>Rs </Text>{plan.premium?.toLocaleString('en-IN')}
              <Text style={styles.frequency}>/month</Text>
            </Text>
          </View>
        </View>

        {/* CTA Button */}
        <TouchableOpacity style={styles.ctaButton} onPress={onCustomize} activeOpacity={0.8}>
          <LinearGradient
            colors={['#FF6B35', '#FF8F00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaGradient}
          >
            <Text style={styles.ctaText}>Proceed to Customize</Text>
            <Ionicons name="arrow-forward" size={16} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        {/* Add-ons */}
        {plan.addOns && plan.addOns.length > 0 && (
          <View style={styles.addOnsRow}>
            <Text style={styles.addOnsLabel}>Enhance your coverage with Add ons</Text>
            <View style={styles.addOnChips}>
              {plan.addOns.map((addon, i) => (
                <View key={i} style={styles.addOnChip}>
                  <Text style={styles.addOnText}>{addon}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    zIndex: 1,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  insurerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF3E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  planName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  insurerName: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  compareBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hospitalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FFF4',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  hospitalText: {
    fontSize: 12,
    color: '#2D3748',
    marginLeft: 6,
    flex: 1,
  },
  viewAll: {
    fontSize: 12,
    color: '#3498DB',
    fontWeight: '600',
  },
  features: {
    marginBottom: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#444',
    marginLeft: 8,
    flex: 1,
  },
  moreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  moreText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
    marginRight: 4,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 2,
  },
  priceValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  premiumSection: {
    alignItems: 'flex-end',
  },
  premiumValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  rupee: {
    fontSize: 14,
  },
  frequency: {
    fontSize: 11,
    fontWeight: '400',
    color: '#999',
  },
  ctaButton: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  ctaText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 8,
  },
  addOnsRow: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  addOnsLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  addOnChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  addOnChip: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  addOnText: {
    fontSize: 11,
    color: '#FF6B35',
    fontWeight: '500',
  },
});

export default PlanCard;
