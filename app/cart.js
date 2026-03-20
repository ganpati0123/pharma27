/**
 * ============================================================================
 * PREMIUM CART SCREEN
 * ============================================================================
 * 
 * A premium ecommerce cart experience inspired by Amazon, Flipkart, Zepto.
 * Features: cart items with quantity selectors, delivery info, price breakdown,
 * checkout button with ripple, and empty cart state.
 * 
 * ============================================================================
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  Easing,
  FadeInDown,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============================================================================
// DESIGN TOKENS
// ============================================================================
const COLORS = {
  primary: '#00A651',
  primaryLight: '#00C853',
  primaryFaded: 'rgba(0, 166, 81, 0.08)',
  primarySubtle: 'rgba(0, 166, 81, 0.15)',
  gold: '#FFD700',
  goldFaded: 'rgba(255, 215, 0, 0.12)',
  orange: '#FF6B35',
  orangeFaded: 'rgba(255, 107, 53, 0.10)',
  bg: '#F5F6FA',
  card: '#FFFFFF',
  text: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  border: '#EBEBF5',
  divider: '#F0F0F8',
  shadow: 'rgba(100, 80, 160, 0.08)',
  error: '#FF4444',
  success: '#00A651',
  white: '#FFFFFF',
};

// ============================================================================
// SAMPLE CART DATA
// ============================================================================
const INITIAL_CART_ITEMS = [
  {
    id: 1,
    name: "Dolo 650 Tablet 15's",
    dosage: '650mg Paracetamol',
    price: 42,
    oldPrice: 52.5,
    discount: 20,
    delivery: 'Tomorrow, 10:30 AM',
    image: 'medical',
    qty: 2,
  },
  {
    id: 2,
    name: "Augmentin 625 Duo Tablet 10's",
    dosage: '625mg Amoxicillin + Clavulanate',
    price: 228,
    oldPrice: 285,
    discount: 20,
    delivery: 'Tomorrow, 10:30 AM',
    image: 'medkit',
    qty: 1,
  },
  {
    id: 3,
    name: "Cetrizine 10mg Tablet 10's",
    dosage: '10mg Cetirizine Hydrochloride',
    price: 18,
    oldPrice: 22.5,
    discount: 20,
    delivery: 'Today, 9:30 PM',
    image: 'fitness',
    qty: 1,
  },
];

// ============================================================================
// ANIMATED CART ITEM CARD
// ============================================================================
const CartItemCard = React.memo(({ item, index, onIncrement, onDecrement, onRemove }) => {
  const cardScale = useSharedValue(1);
  const removeOpacity = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    cardScale.value = withSpring(0.98, { damping: 15, stiffness: 200 });
  }, []);

  const handlePressOut = useCallback(() => {
    cardScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  }, []);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const totalPrice = (item.price * item.qty).toFixed(0);
  const totalOldPrice = (item.oldPrice * item.qty).toFixed(0);
  const savings = (totalOldPrice - totalPrice).toFixed(0);

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100).duration(400).springify()}
      style={[styles.cartItemCard, cardAnimStyle]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.cartItemInner}
      >
        {/* Discount Badge */}
        <View style={styles.discountBadge}>
          <Text style={styles.discountBadgeText}>{item.discount}% OFF</Text>
        </View>

        {/* Remove Button */}
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="close-circle" size={22} color={COLORS.textMuted} />
        </TouchableOpacity>

        <View style={styles.cartItemRow}>
          {/* Medicine Image */}
          <View style={styles.cartItemImageContainer}>
            <LinearGradient
              colors={['#F0F8FF', '#E8F5E9']}
              style={styles.cartItemImage}
            >
              <Ionicons name={item.image} size={32} color={COLORS.primary} />
            </LinearGradient>
          </View>

          {/* Medicine Details */}
          <View style={styles.cartItemDetails}>
            <Text style={styles.cartItemName} numberOfLines={2}>{item.name}</Text>
            <Text style={styles.cartItemDosage}>{item.dosage}</Text>

            {/* Delivery Estimate */}
            <View style={styles.deliveryRow}>
              <Ionicons name="time-outline" size={12} color={COLORS.primary} />
              <Text style={styles.deliveryText}>{item.delivery}</Text>
            </View>

            {/* Price Row */}
            <View style={styles.priceRow}>
              <Text style={styles.itemPrice}>&#8377;{totalPrice}</Text>
              <Text style={styles.itemOldPrice}>&#8377;{totalOldPrice}</Text>
              <Text style={styles.itemSavings}>Save &#8377;{savings}</Text>
            </View>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={styles.qtyRow}>
          <Text style={styles.qtyLabel}>Qty:</Text>
          <View style={styles.qtySelector}>
            <TouchableOpacity
              style={[styles.qtyButton, item.qty <= 1 && styles.qtyButtonDisabled]}
              onPress={() => onDecrement(item.id)}
              activeOpacity={0.7}
              disabled={item.qty <= 1}
            >
              <Ionicons name="remove" size={16} color={item.qty <= 1 ? COLORS.textMuted : COLORS.primary} />
            </TouchableOpacity>
            <View style={styles.qtyValueContainer}>
              <Text style={styles.qtyValue}>{item.qty}</Text>
            </View>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => onIncrement(item.id)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
});

// ============================================================================
// DELIVERY INFO CARD
// ============================================================================
const DeliveryInfoCard = React.memo(() => (
  <Animated.View
    entering={FadeInDown.delay(350).duration(400).springify()}
    style={styles.deliveryInfoCard}
  >
    <View style={styles.deliveryInfoHeader}>
      <View style={styles.deliveryIconContainer}>
        <Ionicons name="bicycle" size={20} color={COLORS.primary} />
      </View>
      <View style={styles.deliveryInfoText}>
        <Text style={styles.deliveryInfoTitle}>Express Delivery</Text>
        <Text style={styles.deliveryInfoSubtitle}>Delivery by Apollo Pharmacy Partner</Text>
      </View>
    </View>
    <View style={styles.deliveryAddressRow}>
      <Ionicons name="location-sharp" size={14} color={COLORS.orange} />
      <Text style={styles.deliveryAddressText} numberOfLines={1}>
        Home - 123, Green Valley, Sector 14, Delhi 110001
      </Text>
      <TouchableOpacity activeOpacity={0.7}>
        <Text style={styles.changeAddressText}>Change</Text>
      </TouchableOpacity>
    </View>
  </Animated.View>
));

// ============================================================================
// PRICE BREAKDOWN CARD
// ============================================================================
const PriceBreakdownCard = React.memo(({ subtotal, discount, deliveryFee, total }) => (
  <Animated.View
    entering={FadeInDown.delay(450).duration(400).springify()}
    style={styles.priceCard}
  >
    <Text style={styles.priceCardTitle}>Price Details</Text>
    <View style={styles.priceDivider} />

    <View style={styles.priceLineRow}>
      <Text style={styles.priceLineLabel}>Subtotal (MRP)</Text>
      <Text style={styles.priceLineValue}>&#8377;{subtotal.toFixed(0)}</Text>
    </View>

    <View style={styles.priceLineRow}>
      <Text style={[styles.priceLineLabel, { color: COLORS.primary }]}>Discount</Text>
      <Text style={[styles.priceLineValue, { color: COLORS.primary }]}>-&#8377;{discount.toFixed(0)}</Text>
    </View>

    <View style={styles.priceLineRow}>
      <Text style={styles.priceLineLabel}>Delivery Fee</Text>
      {deliveryFee === 0 ? (
        <View style={styles.freeDeliveryBadge}>
          <Text style={styles.freeDeliveryText}>FREE</Text>
        </View>
      ) : (
        <Text style={styles.priceLineValue}>&#8377;{deliveryFee.toFixed(0)}</Text>
      )}
    </View>

    <View style={styles.priceTotalDivider} />

    <View style={styles.priceLineRow}>
      <Text style={styles.priceTotalLabel}>Total Amount</Text>
      <Text style={styles.priceTotalValue}>&#8377;{total.toFixed(0)}</Text>
    </View>

    <View style={styles.savingsBanner}>
      <Ionicons name="pricetag" size={14} color={COLORS.primary} />
      <Text style={styles.savingsBannerText}>
        You are saving &#8377;{discount.toFixed(0)} on this order!
      </Text>
    </View>
  </Animated.View>
));

// ============================================================================
// CHECKOUT BUTTON
// ============================================================================
const CheckoutButton = React.memo(({ total, itemCount }) => {
  const buttonScale = useSharedValue(1);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);

  const handlePressIn = useCallback(() => {
    buttonScale.value = withSpring(0.97, { damping: 15, stiffness: 250 });
    rippleScale.value = withTiming(0, { duration: 0 });
    rippleOpacity.value = withTiming(0.25, { duration: 0 });
  }, []);

  const handlePressOut = useCallback(() => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 200 });
    rippleScale.value = withTiming(2, { duration: 400 });
    rippleOpacity.value = withTiming(0, { duration: 400 });
  }, []);

  const buttonAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const rippleStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    borderRadius: 16,
    backgroundColor: COLORS.gold,
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));

  return (
    <View style={styles.checkoutContainer}>
      <View style={styles.checkoutInfo}>
        <Text style={styles.checkoutTotalLabel}>{itemCount} item{itemCount !== 1 ? 's' : ''}</Text>
        <Text style={styles.checkoutTotalValue}>&#8377;{total.toFixed(0)}</Text>
      </View>
      <Animated.View style={[styles.checkoutButtonOuter, buttonAnimStyle]}>
        <TouchableOpacity
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.checkoutButton}
        >
          <Animated.View style={rippleStyle} />
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            <Ionicons name="arrow-forward" size={18} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
});

// ============================================================================
// EMPTY CART STATE
// ============================================================================
const EmptyCartState = React.memo(({ onBrowse }) => {
  const illustrationScale = useSharedValue(0.8);
  const illustrationOpacity = useSharedValue(0);

  useEffect(() => {
    illustrationOpacity.value = withTiming(1, { duration: 500 });
    illustrationScale.value = withSpring(1, { damping: 12, stiffness: 150 });
  }, []);

  const illustrationStyle = useAnimatedStyle(() => ({
    opacity: illustrationOpacity.value,
    transform: [{ scale: illustrationScale.value }],
  }));

  return (
    <View style={styles.emptyCartContainer}>
      <Animated.View style={[styles.emptyCartIllustration, illustrationStyle]}>
        <LinearGradient
          colors={['#F0F8FF', '#E8F5E9']}
          style={styles.emptyCartCircle}
        >
          <Ionicons name="cart-outline" size={64} color={COLORS.textMuted} />
        </LinearGradient>
      </Animated.View>
      <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
      <Text style={styles.emptyCartSubtitle}>Add medicines to your cart and they will appear here</Text>
      <TouchableOpacity
        style={styles.browseMedicinesButton}
        onPress={onBrowse}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.browseMedicinesGradient}
        >
          <Text style={styles.browseMedicinesText}>Browse Medicines</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
});

// ============================================================================
// MAIN CART SCREEN
// ============================================================================
export default function CartScreen() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);

  const handleIncrement = useCallback((id) => {
    setCartItems(prev => prev.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  }, []);

  const handleDecrement = useCallback((id) => {
    setCartItems(prev => prev.map(item =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    ));
  }, []);

  const handleRemove = useCallback((id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleBrowse = useCallback(() => {
    router.back();
  }, [router]);

  const { subtotal, discount, deliveryFee, total, itemCount } = useMemo(() => {
    const sub = cartItems.reduce((acc, item) => acc + item.oldPrice * item.qty, 0);
    const disc = cartItems.reduce((acc, item) => acc + (item.oldPrice - item.price) * item.qty, 0);
    const fee = sub > 500 ? 0 : 49;
    const count = cartItems.reduce((acc, item) => acc + item.qty, 0);
    return {
      subtotal: sub,
      discount: disc,
      deliveryFee: fee,
      total: sub - disc + fee,
      itemCount: count,
    };
  }, [cartItems]);

  const renderCartItem = useCallback(({ item, index }) => (
    <CartItemCard
      item={item}
      index={index}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onRemove={handleRemove}
    />
  ), [handleIncrement, handleDecrement, handleRemove]);

  const keyExtractor = useCallback((item) => `cart-${item.id}`, []);

  const ListFooterComponent = useMemo(() => {
    if (cartItems.length === 0) return null;
    return (
      <View>
        <DeliveryInfoCard />
        <PriceBreakdownCard
          subtotal={subtotal}
          discount={discount}
          deliveryFee={deliveryFee}
          total={total}
        />
        <View style={{ height: 100 }} />
      </View>
    );
  }, [cartItems.length, subtotal, discount, deliveryFee, total]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.card} translucent={false} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>My Cart</Text>
          {cartItems.length > 0 && (
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>{itemCount}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity style={styles.headerSearchButton} activeOpacity={0.7}>
          <Ionicons name="search" size={20} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      {/* Address Bar */}
      {cartItems.length > 0 && (
        <View style={styles.addressBar}>
          <Ionicons name="location-sharp" size={14} color={COLORS.orange} />
          <Text style={styles.addressText} numberOfLines={1}>Deliver to: Delhi 110001</Text>
          <Ionicons name="chevron-down" size={14} color={COLORS.textTertiary} />
        </View>
      )}

      {/* Cart Content */}
      {cartItems.length === 0 ? (
        <EmptyCartState onBrowse={handleBrowse} />
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.cartListContent}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={ListFooterComponent}
          />
          <CheckoutButton total={total} itemCount={itemCount} />
        </>
      )}
    </SafeAreaView>
  );
}

// ============================================================================
// STYLES
// ============================================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  // Header
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    shadowColor: COLORS.shadow,
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
    backgroundColor: COLORS.bg,
  },
  headerTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  headerBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.white,
  },
  headerSearchButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
  },

  // Address Bar
  addressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
    gap: 6,
  },
  addressText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },

  // Cart List
  cartListContent: {
    padding: 16,
  },

  // Cart Item Card
  cartItemCard: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  cartItemInner: {
    padding: 16,
  },
  discountBadge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: COLORS.orangeFaded,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 15,
  },
  discountBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.orange,
    letterSpacing: 0.3,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 10,
    padding: 4,
  },
  cartItemRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  cartItemImageContainer: {
    marginRight: 14,
  },
  cartItemImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
    lineHeight: 20,
    marginBottom: 2,
  },
  cartItemDosage: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.textTertiary,
    marginBottom: 6,
  },
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  deliveryText: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.primary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  itemOldPrice: {
    fontSize: 12,
    fontWeight: '400',
    color: COLORS.textMuted,
    textDecorationLine: 'line-through',
  },
  itemSavings: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Quantity Selector
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
    gap: 10,
  },
  qtyLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textTertiary,
  },
  qtySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  qtyButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonDisabled: {
    opacity: 0.4,
  },
  qtyValueContainer: {
    width: 32,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: COLORS.border,
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.text,
  },

  // Delivery Info Card
  deliveryInfoCard: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  deliveryInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  deliveryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryFaded,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryInfoText: {
    flex: 1,
  },
  deliveryInfoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.text,
  },
  deliveryInfoSubtitle: {
    fontSize: 11,
    fontWeight: '400',
    color: COLORS.textTertiary,
    marginTop: 1,
  },
  deliveryAddressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.divider,
  },
  deliveryAddressText: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  changeAddressText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },

  // Price Card
  priceCard: {
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: COLORS.card,
    padding: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  priceCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 12,
  },
  priceDivider: {
    height: 1,
    backgroundColor: COLORS.divider,
    marginBottom: 12,
  },
  priceLineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  priceLineLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: COLORS.textSecondary,
  },
  priceLineValue: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.text,
  },
  freeDeliveryBadge: {
    backgroundColor: COLORS.primaryFaded,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 6,
  },
  freeDeliveryText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.primary,
  },
  priceTotalDivider: {
    height: 1,
    backgroundColor: COLORS.text,
    opacity: 0.1,
    marginVertical: 10,
  },
  priceTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.text,
  },
  priceTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  savingsBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: COLORS.primaryFaded,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  savingsBannerText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Checkout
  checkoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
  },
  checkoutInfo: {
    marginRight: 16,
  },
  checkoutTotalLabel: {
    fontSize: 11,
    fontWeight: '500',
    color: COLORS.textTertiary,
  },
  checkoutTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.3,
  },
  checkoutButtonOuter: {
    flex: 1,
  },
  checkoutButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  checkoutGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 16,
    gap: 8,
  },
  checkoutButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 0.3,
  },

  // Empty Cart
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartIllustration: {
    marginBottom: 24,
  },
  emptyCartCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptyCartSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: COLORS.textTertiary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  browseMedicinesButton: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  browseMedicinesGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 14,
    gap: 8,
  },
  browseMedicinesText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
});
