/**
 * ============================================================================
 * PREMIUM ACCOUNT SCREEN
 * ============================================================================
 * 
 * A premium Account/Profile page with user info header, account options list,
 * order history, and profile settings. Professional design matching top-tier
 * healthcare/ecommerce apps.
 * 
 * ============================================================================
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  withSequence,
  FadeInDown,
  FadeIn,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const C = {
  primary: '#00A651',
  primaryLight: '#00C853',
  primaryFaded: 'rgba(0, 166, 81, 0.08)',
  primarySubtle: 'rgba(0, 166, 81, 0.15)',
  gold: '#FFD700',
  goldFaded: 'rgba(255, 215, 0, 0.12)',
  goldSubtle: 'rgba(255, 215, 0, 0.25)',
  orange: '#FF6B35',
  orangeFaded: 'rgba(255, 107, 53, 0.10)',
  blue: '#0088FF',
  blueFaded: 'rgba(0, 136, 255, 0.08)',
  red: '#FF4444',
  redFaded: 'rgba(255, 68, 68, 0.08)',
  purple: '#7B2CBF',
  purpleFaded: 'rgba(123, 44, 191, 0.08)',
  bg: '#F5F6FA',
  card: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  border: '#EBEBF5',
  divider: '#F0F0F8',
  shadow: 'rgba(100, 80, 160, 0.08)',
  white: '#FFFFFF',
};

// ============================================================================
// ACCOUNT MENU ITEMS
// ============================================================================
const ACCOUNT_OPTIONS = [
  { id: 'orders', title: 'My Orders', icon: 'receipt-outline', color: C.primary, bgColor: C.primaryFaded },
  { id: 'prescriptions', title: 'My Prescriptions', icon: 'document-text-outline', color: C.blue, bgColor: C.blueFaded },
  { id: 'health_records', title: 'Health Records', icon: 'folder-open-outline', color: C.orange, bgColor: C.orangeFaded },
  { id: 'appointments', title: 'Appointments', icon: 'calendar-outline', color: C.purple, bgColor: C.purpleFaded },
  { id: 'subscriptions', title: 'Subscriptions', icon: 'refresh-circle-outline', color: C.primary, bgColor: C.primaryFaded },
  { id: 'insurance', title: 'Insurance', icon: 'shield-checkmark-outline', color: C.blue, bgColor: C.blueFaded },
  { id: 'addresses', title: 'Saved Addresses', icon: 'location-outline', color: C.orange, bgColor: C.orangeFaded },
  { id: 'payments', title: 'Payment Methods', icon: 'card-outline', color: C.purple, bgColor: C.purpleFaded },
  { id: 'notifications', title: 'Notifications', icon: 'notifications-outline', color: C.primary, bgColor: C.primaryFaded },
  { id: 'help', title: 'Help & Support', icon: 'help-circle-outline', color: C.blue, bgColor: C.blueFaded },
];

// ============================================================================
// SAMPLE ORDER DATA
// ============================================================================
const SAMPLE_ORDERS = [
  {
    id: 'ORD-2024-78291',
    date: '28 Feb 2026',
    status: 'Delivered',
    statusColor: C.primary,
    medicines: ["Dolo 650 Tablet 15's", "Augmentin 625 Duo"],
    total: 312,
  },
  {
    id: 'ORD-2024-77843',
    date: '15 Feb 2026',
    status: 'Delivered',
    statusColor: C.primary,
    medicines: ["Cetrizine 10mg Tablet", "Paracetamol 500mg"],
    total: 45,
  },
  {
    id: 'ORD-2024-76520',
    date: '02 Feb 2026',
    status: 'Cancelled',
    statusColor: C.red,
    medicines: ["Metformin 500mg Tablet 20's"],
    total: 42,
  },
];

// ============================================================================
// PROFILE HEADER
// ============================================================================
const ProfileHeader = React.memo(({ onEditPress }) => {
  const avatarScale = useSharedValue(0.8);
  const avatarOpacity = useSharedValue(0);

  useEffect(() => {
    avatarOpacity.value = withTiming(1, { duration: 500 });
    avatarScale.value = withSpring(1, { damping: 12, stiffness: 150 });
  }, []);

  const avatarStyle = useAnimatedStyle(() => ({
    opacity: avatarOpacity.value,
    transform: [{ scale: avatarScale.value }],
  }));

  return (
    <View style={styles.profileHeader}>
      <LinearGradient
        colors={[C.primary, C.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.profileHeaderGradient}
      >
        {/* Decorative circles */}
        <View style={styles.profileDecorCircle1} />
        <View style={styles.profileDecorCircle2} />

        <Animated.View style={[styles.avatarContainer, avatarStyle]}>
          <View style={styles.avatarOuter}>
            <LinearGradient
              colors={[C.gold, '#FFE44D']}
              style={styles.avatarGradient}
            >
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={36} color={C.primary} />
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        <View style={styles.profileInfoContainer}>
          <Text style={styles.profileName}>Guest User</Text>
          <Text style={styles.profilePhone}>+91 98765 43210</Text>
          <Text style={styles.profileEmail}>guest@apollo247.com</Text>
        </View>

        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={onEditPress}
          activeOpacity={0.8}
        >
          <Ionicons name="create-outline" size={14} color={C.primary} />
          <Text style={styles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
});

// ============================================================================
// ACCOUNT OPTION ROW
// ============================================================================
const AccountOptionRow = React.memo(({ option, index, onPress }) => {
  const rowScale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    rowScale.value = withSpring(0.98, { damping: 15, stiffness: 200 });
  }, []);

  const handlePressOut = useCallback(() => {
    rowScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, []);

  const rowAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rowScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(100 + index * 50).duration(350).springify()}
      style={rowAnimStyle}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => onPress(option.id)}
        style={styles.optionRow}
      >
        <View style={[styles.optionIconContainer, { backgroundColor: option.bgColor }]}>
          <Ionicons name={option.icon} size={20} color={option.color} />
        </View>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Ionicons name="chevron-forward" size={18} color={C.textMuted} />
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ORDER CARD
// ============================================================================
const OrderCard = React.memo(({ order, index }) => {
  const cardScale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.98, { damping: 15, stiffness: 200 });
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, []);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(400).springify()}
      style={cardAnimStyle}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.orderCard}
      >
        <View style={styles.orderCardHeader}>
          <View>
            <Text style={styles.orderId}>{order.id}</Text>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
          <View style={[styles.orderStatusBadge, { backgroundColor: order.statusColor + '15' }]}>
            <View style={[styles.orderStatusDot, { backgroundColor: order.statusColor }]} />
            <Text style={[styles.orderStatusText, { color: order.statusColor }]}>{order.status}</Text>
          </View>
        </View>

        <View style={styles.orderDivider} />

        <View style={styles.orderMedicineList}>
          {order.medicines.map((med, i) => (
            <View key={i} style={styles.orderMedicineRow}>
              <Ionicons name="medical" size={12} color={C.textTertiary} />
              <Text style={styles.orderMedicineName} numberOfLines={1}>{med}</Text>
            </View>
          ))}
        </View>

        <View style={styles.orderCardFooter}>
          <Text style={styles.orderTotal}>&#8377;{order.total}</Text>
          <TouchableOpacity style={styles.reorderButton} activeOpacity={0.8}>
            <Ionicons name="refresh" size={14} color={C.primary} />
            <Text style={styles.reorderText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// ORDERS SECTION
// ============================================================================
const OrdersSection = React.memo(({ orders, visible }) => {
  if (!visible) return null;

  return (
    <View style={styles.ordersSection}>
      <Text style={styles.ordersSectionTitle}>Order History</Text>
      {orders.map((order, index) => (
        <OrderCard key={order.id} order={order} index={index} />
      ))}
    </View>
  );
});

// ============================================================================
// PROFILE SETTINGS SECTION
// ============================================================================
const ProfileSettingsSection = React.memo(({ visible }) => {
  const [name, setName] = useState('Guest User');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('guest@apollo247.com');
  const [address, setAddress] = useState('123, Green Valley, Sector 14, Delhi 110001');

  if (!visible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(400)}
      style={styles.settingsSection}
    >
      <Text style={styles.settingsSectionTitle}>Profile Settings</Text>

      <View style={styles.settingsCard}>
        <View style={styles.settingsField}>
          <Text style={styles.settingsLabel}>Full Name</Text>
          <TextInput
            style={styles.settingsInput}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
            placeholderTextColor={C.textMuted}
          />
        </View>

        <View style={styles.settingsFieldDivider} />

        <View style={styles.settingsField}>
          <Text style={styles.settingsLabel}>Phone Number</Text>
          <TextInput
            style={styles.settingsInput}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter phone number"
            placeholderTextColor={C.textMuted}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.settingsFieldDivider} />

        <View style={styles.settingsField}>
          <Text style={styles.settingsLabel}>Email Address</Text>
          <TextInput
            style={styles.settingsInput}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email address"
            placeholderTextColor={C.textMuted}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.settingsFieldDivider} />

        <View style={styles.settingsField}>
          <Text style={styles.settingsLabel}>Address</Text>
          <TextInput
            style={[styles.settingsInput, styles.settingsInputMultiline]}
            value={address}
            onChangeText={setAddress}
            placeholder="Enter your address"
            placeholderTextColor={C.textMuted}
            multiline
            numberOfLines={2}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} activeOpacity={0.8}>
        <LinearGradient
          colors={[C.primary, C.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.saveButtonGradient}
        >
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// LOGOUT BUTTON
// ============================================================================
const LogoutButton = React.memo(() => {
  const buttonScale = useSharedValue(1);

  const handlePressIn = useCallback(() => {
    buttonScale.value = withSpring(0.97, { damping: 15, stiffness: 200 });
  }, []);

  const handlePressOut = useCallback(() => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, []);

  const buttonAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(700).duration(350).springify()}
      style={buttonAnimStyle}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.logoutButton}
      >
        <View style={styles.logoutIconContainer}>
          <Ionicons name="log-out-outline" size={20} color={C.red} />
        </View>
        <Text style={styles.logoutText}>Logout</Text>
        <Ionicons name="chevron-forward" size={18} color={C.textMuted} />
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// MAIN ACCOUNT SCREEN
// ============================================================================
export default function AccountScreen() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('menu'); // 'menu', 'orders', 'settings'

  const handleOptionPress = useCallback((optionId) => {
    if (optionId === 'orders') {
      setActiveSection('orders');
    } else {
      // Other options - could navigate to sub-screens
    }
  }, []);

  const handleEditPress = useCallback(() => {
    setActiveSection('settings');
  }, []);

  const handleBack = useCallback(() => {
    if (activeSection !== 'menu') {
      setActiveSection('menu');
    } else {
      router.back();
    }
  }, [activeSection, router]);

  const headerTitle = useMemo(() => {
    switch (activeSection) {
      case 'orders': return 'My Orders';
      case 'settings': return 'Profile Settings';
      default: return 'My Account';
    }
  }, [activeSection]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={C.card} translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={C.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerTitle}</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header - always show on main menu */}
        {activeSection === 'menu' && (
          <ProfileHeader onEditPress={handleEditPress} />
        )}

        {/* Account Options */}
        {activeSection === 'menu' && (
          <View style={styles.optionsContainer}>
            <Text style={styles.optionsSectionTitle}>Account Settings</Text>
            {ACCOUNT_OPTIONS.map((option, index) => (
              <AccountOptionRow
                key={option.id}
                option={option}
                index={index}
                onPress={handleOptionPress}
              />
            ))}

            {/* Logout */}
            <LogoutButton />
          </View>
        )}

        {/* Orders Section */}
        <OrdersSection orders={SAMPLE_ORDERS} visible={activeSection === 'orders'} />

        {/* Profile Settings Section */}
        <ProfileSettingsSection visible={activeSection === 'settings'} />

        {/* Bottom spacer */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // Header
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: C.card,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 3,
  },
  headerBackButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.bg,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    textAlign: 'center',
    letterSpacing: -0.3,
  },
  headerSpacer: {
    width: 36,
  },

  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Profile Header
  profileHeader: {
    margin: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 16,
    elevation: 5,
  },
  profileHeaderGradient: {
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  profileDecorCircle1: {
    position: 'absolute',
    top: -30,
    right: -30,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  profileDecorCircle2: {
    position: 'absolute',
    bottom: -20,
    left: -20,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    overflow: 'hidden',
    shadowColor: C.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  avatarGradient: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: C.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfoContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '800',
    color: C.white,
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.85)',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 12,
    fontWeight: '400',
    color: 'rgba(255,255,255,0.7)',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.primary,
  },

  // Options
  optionsContainer: {
    paddingHorizontal: 16,
  },
  optionsSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: C.text,
    marginBottom: 12,
    marginTop: 4,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 8,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: C.border,
    gap: 14,
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: C.text,
  },

  // Logout
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: C.card,
    borderRadius: 14,
    padding: 14,
    marginTop: 8,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#FFE0E0',
    gap: 14,
  },
  logoutIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: C.redFaded,
  },
  logoutText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: C.red,
  },

  // Orders Section
  ordersSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  ordersSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 16,
  },
  orderCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: C.border,
  },
  orderCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  orderId: {
    fontSize: 13,
    fontWeight: '700',
    color: C.text,
  },
  orderDate: {
    fontSize: 11,
    fontWeight: '400',
    color: C.textTertiary,
    marginTop: 2,
  },
  orderStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 5,
  },
  orderStatusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  orderStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  orderDivider: {
    height: 1,
    backgroundColor: C.divider,
    marginVertical: 12,
  },
  orderMedicineList: {
    gap: 6,
    marginBottom: 12,
  },
  orderMedicineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderMedicineName: {
    fontSize: 12,
    fontWeight: '500',
    color: C.textSecondary,
    flex: 1,
  },
  orderCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: C.divider,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '800',
    color: C.text,
  },
  reorderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: C.primaryFaded,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: C.primarySubtle,
  },
  reorderText: {
    fontSize: 12,
    fontWeight: '700',
    color: C.primary,
  },

  // Settings Section
  settingsSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  settingsSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: C.text,
    marginBottom: 16,
  },
  settingsCard: {
    backgroundColor: C.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: C.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: C.border,
  },
  settingsField: {
    paddingVertical: 4,
  },
  settingsLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: C.textTertiary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingsInput: {
    fontSize: 15,
    fontWeight: '500',
    color: C.text,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: C.bg,
    borderWidth: 1,
    borderColor: C.border,
  },
  settingsInputMultiline: {
    minHeight: 60,
    textAlignVertical: 'top',
  },
  settingsFieldDivider: {
    height: 1,
    backgroundColor: C.divider,
    marginVertical: 10,
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 14,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: 14,
    alignItems: 'center',
    borderRadius: 14,
  },
  saveButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: C.white,
    letterSpacing: 0.3,
  },
});
