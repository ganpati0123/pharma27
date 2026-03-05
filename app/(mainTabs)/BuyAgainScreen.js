import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const MEDICINE_CARD_WIDTH = (width - 40) / 2 - 8;

export default function BuyAgainScreen() {
  const [cartCount, setCartCount] = useState(0);
  const router = useRouter();

  const medicines = [
    { id: 1, name: 'Walaphage 850 Tablet 15\'s', price: 3.6, oldPrice: 4.0, discount: 10, delivery: '11:30 PM' },
    { id: 2, name: 'Dolo 650 Tablet 15\'s', price: 2.8, oldPrice: 3.5, discount: 20, delivery: '10:30 PM' },
    { id: 3, name: 'Augmentin 625 Duo Tablet 10\'s', price: 15.2, oldPrice: 18.9, discount: 19, delivery: '12:00 AM' },
    { id: 4, name: 'Cetrizine 10mg Tablet 10\'s', price: 1.2, oldPrice: 1.5, discount: 20, delivery: '9:30 PM' },
    { id: 5, name: 'Paracetamol 500mg Tablet 10\'s', price: 0.8, oldPrice: 1.0, discount: 20, delivery: '8:30 PM' },
    { id: 6, name: 'Aspirin 75mg Tablet 14\'s', price: 1.5, oldPrice: 2.0, discount: 25, delivery: '9:00 PM' },
    { id: 7, name: 'Omeprazole 20mg Capsule 15\'s', price: 3.2, oldPrice: 4.5, discount: 29, delivery: '10:00 PM' },
    { id: 8, name: 'Azithromycin 500mg Tablet 3\'s', price: 8.5, oldPrice: 12.0, discount: 29, delivery: '11:00 PM' },
  ];

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const renderMedicineCard = ({ item }) => (
    <TouchableOpacity style={styles.medicineCard} onPress={addToCart}>
      <View style={styles.medicineAddButton}>
        <Text style={styles.medicineAddText}>+</Text>
      </View>
      <View style={styles.medicineImage} />
      <Text style={styles.medicineName} numberOfLines={2}>{item.name}</Text>
      <Text style={styles.medicinePrice}>₹{item.price}/unit</Text>
      <Text style={styles.medicineOldPrice}>₹{item.oldPrice}</Text>
      <Text style={styles.medicineDiscount}>{item.discount}% OFF</Text>
      <Text style={styles.medicineDelivery}>By {item.delivery}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Buy Again</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="search" size={20} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="cart-outline" size={20} color="#00A651" />
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>Reorder from your past orders {'>'}</Text>
      </View>

      <FlatList
        data={medicines}
        renderItem={renderMedicineCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.medicinesGrid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitleContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  medicinesGrid: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  medicineCard: {
    width: MEDICINE_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicineAddButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#00A651',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  medicineAddText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  medicineImage: {
    width: 80,
    height: 80,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginVertical: 12,
    alignSelf: 'center',
  },
  medicineName: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
    marginBottom: 6,
    minHeight: 32,
  },
  medicinePrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  medicineOldPrice: {
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  medicineDiscount: {
    fontSize: 10,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  medicineDelivery: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
});
