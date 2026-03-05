import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Animated,
  Image,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = 160;
const MEDICINE_CARD_WIDTH = 100;
const MEDICINE_CARD_HEIGHT = 140;

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const bankScrollX = useRef(new Animated.Value(0)).current;
  const posterScrollX = useRef(new Animated.Value(0)).current;
  const bannerScrollX = useRef(new Animated.Value(0)).current;
  const medicineScrollX = useRef(new Animated.Value(0)).current;

  const categories = [
    'All', 'Skin', 'Summer', 'Women', 'Health Check', 'Men', 'Insurance',
    'Weight Loss', 'Nutrition', 'Instant Dr', 'Sexual Health'
  ];

  const services = [
    { id: 1, title: 'Apollo Pharmacy', icon: 'medkit', offer: 'Up to 25% OFF', color: '#00A651' },
    { id: 2, title: 'Lab Tests At Home', icon: 'flask', offer: 'Starting ₹299', color: '#FF6B35' },
    { id: 3, title: 'Doctor Consultation', icon: 'person', offer: 'From ₹199', color: '#FFD700' },
    { id: 4, title: 'Apollo Insurance', icon: 'shield', offer: 'Save up to 40%', color: '#00A651' },
  ];

  const medicines = [
    { id: 1, name: 'Walaphage 850 Tablet 15\'s', price: 3.6, oldPrice: 4.0, discount: 10, delivery: '11:30 PM' },
    { id: 2, name: 'Dolo 650 Tablet 15\'s', price: 2.8, oldPrice: 3.5, discount: 20, delivery: '10:30 PM' },
    { id: 3, name: 'Augmentin 625 Duo Tablet 10\'s', price: 15.2, oldPrice: 18.9, discount: 19, delivery: '12:00 AM' },
    { id: 4, name: 'Cetrizine 10mg Tablet 10\'s', price: 1.2, oldPrice: 1.5, discount: 20, delivery: '9:30 PM' },
    { id: 5, name: 'Paracetamol 500mg Tablet 10\'s', price: 0.8, oldPrice: 1.0, discount: 20, delivery: '8:30 PM' },
  ];

  const banks = [
    { id: 1, name: 'SBI', color: '#0047A3' },
    { id: 2, name: 'HDFC', color: '#0052A4' },
    { id: 3, name: 'ICICI', color: '#F47920' },
    { id: 4, name: 'Axis', color: '#7B2CBF' },
    { id: 5, name: 'Kotak', color: '#E31837' },
    { id: 6, name: 'Yes Bank', color: '#005EB8' },
    { id: 7, name: 'PNB', color: '#0066B2' },
    { id: 8, name: 'BOB', color: '#ED1C24' },
    { id: 9, name: 'Union Bank', color: '#FF6B35' },
    { id: 10, name: 'Canara', color: '#0066B2' },
    { id: 11, name: 'IndusInd', color: '#EC1C24' },
    { id: 12, name: 'IDBI', color: '#0047A3' },
  ];

  const posters = [
    { id: 1, title: 'Oral Cancer', description: 'Early detection saves lives. Learn about symptoms and prevention methods.' },
    { id: 2, title: 'Heart Health', description: 'Understanding cardiovascular risks and maintaining a healthy heart.' },
    { id: 3, title: 'Diabetes Care', description: 'Comprehensive guide to managing diabetes and living a healthy life.' },
    { id: 4, title: 'Mental Wellness', description: 'Prioritizing mental health in today\'s fast-paced world.' },
    { id: 5, title: 'Bone Health', description: 'Preventing osteoporosis and maintaining strong bones throughout life.' },
    { id: 6, title: 'Eye Care', description: 'Protecting your vision and preventing common eye disorders.' },
    { id: 7, title: 'Skin Health', description: 'Essential tips for maintaining healthy and glowing skin.' },
    { id: 8, title: 'Immunity Boost', description: 'Natural ways to strengthen your immune system year-round.' },
    { id: 9, title: 'Sleep Disorders', description: 'Understanding sleep patterns and improving sleep quality.' },
    { id: 10, title: 'Nutrition Basics', description: 'Building a balanced diet for optimal health and wellness.' },
    { id: 11, title: 'Exercise Benefits', description: 'How regular physical activity transforms your overall health.' },
    { id: 12, title: 'Stress Management', description: 'Effective techniques to manage daily stress and anxiety.' },
    { id: 13, title: 'Women\'s Health', description: 'Comprehensive care for women at every life stage.' },
    { id: 14, title: 'Senior Care', description: 'Specialized healthcare solutions for elderly wellness.' },
  ];

  const banners = [
    { id: 1, title: 'Family Insurance Offer', subtitle: 'Get 20% OFF on family health insurance plans' },
    { id: 2, title: 'ICICI PF NPS Plan', subtitle: 'Unlock upto 18% discounts under ICICI PF NPS SWASTHYA EQUITY Plus Plan' },
    { id: 3, title: 'Summer Health Camp', subtitle: 'Special health checkup packages at discounted rates' },
  ];

  useEffect(() => {
    const bankInterval = setInterval(() => {
      Animated.timing(bankScrollX, {
        toValue: bankScrollX._value + 1,
        duration: 50,
        useNativeDriver: true,
      }).start();
    }, 50);

    return () => clearInterval(bankInterval);
  }, []);

  const addToCart = useCallback(() => {
    setCartCount(prev => prev + 1);
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Text style={styles.greeting}>Namaste Guest</Text>
        <View style={styles.locationRow}>
          <Text style={styles.location}>Delhi 110001</Text>
          <Ionicons name="chevron-down" size={16} color="#666" />
        </View>
      </View>
      <View style={styles.headerRight}>
        <View style={styles.walletBadge}>
          <Text style={styles.walletText}>HC</Text>
          <Text style={styles.walletAmount}>₹50</Text>
        </View>
        <View style={styles.profileAvatar}>
          <Ionicons name="person" size={24} color="#FFD700" />
        </View>
      </View>
    </View>
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#999" />
        <Text style={styles.searchPlaceholder}>Search</Text>
        <View style={styles.aiAssistant}>
          <View style={styles.aiAvatar}>
            <Text style={styles.aiText}>AI</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.cartButton}>
        <Ionicons name="cart-outline" size={24} color="#00A651" />
        {cartCount > 0 && (
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  const renderCategories = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      contentContainerStyle={styles.categoriesContent}
    >
      {categories.map((category, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.categoryChip,
            selectedCategory === category && styles.categoryChipActive
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryText,
            selectedCategory === category && styles.categoryTextActive
          ]}>
            {category}
            {category === 'Summer' && (
              <Text style={styles.newBadge}> NEW</Text>
            )}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderHeroSection = () => (
    <View style={styles.heroSection}>
      <Text style={styles.heroTitle}>Your trusted home</Text>
      <Text style={styles.heroSubtitle}>for end-to-end healthcare</Text>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.poweredText}>POWERED BY 40+ YEARS OF LEGACY</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.logosRow}>
        {['Apollo Pharmacy', 'Apollo Diagnostics', 'Apollo 24/7', 'Apollo Hospitals', 'Apollo Insurance'].map((logo, index) => (
          <View key={index} style={styles.logoItem}>
            <Text style={styles.logoText}>{logo}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderServicesGrid = () => (
    <View style={styles.servicesGrid}>
      {services.map((service) => (
        <TouchableOpacity key={service.id} style={styles.serviceCard}>
          <View style={[styles.serviceIcon, { backgroundColor: service.color }]}>
            <Ionicons name={service.icon} size={32} color="#fff" />
          </View>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceOffer}>{service.offer}</Text>
          <Ionicons name="chevron-forward" size={16} color="#00A651" style={styles.serviceArrow} />
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPrescriptionBar = () => (
    <View style={styles.prescriptionBar}>
      <Ionicons name="document-text" size={24} color="#00A651" />
      <Text style={styles.prescriptionText}>Place An Order With Prescription</Text>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderBuyAgain = () => (
    <View style={styles.buyAgainSection}>
      <View style={styles.buyAgainHeader}>
        <Text style={styles.buyAgainTitle}>Buy Again</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buyAgainTabs}>
        <TouchableOpacity style={styles.tabActive}>
          <Text style={styles.tabTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Medicines</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderMedicineCard = ({ item, index }) => (
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

  const renderBankOffers = () => (
    <View style={styles.bankOffersSection}>
      <Animated.FlatList
        data={[...banks, ...banks]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `bank-${index}`}
        renderItem={({ item }) => (
          <View style={[styles.bankCard, { backgroundColor: item.color }]}>
            <Text style={styles.bankOfferText}>Extra 10% OFF*</Text>
            <Text style={styles.bankDetailsText}>(Avail on Payment Page via {item.name} DC)</Text>
            <Text style={styles.bankTcText}>*T&C's</Text>
          </View>
        )}
        scrollEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: bankScrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );

  const renderCuratedOfferings = () => (
    <View style={styles.curatedSection}>
      <Text style={styles.curatedTitle}>Curated Offerings For You</Text>
      {[
        { title: 'Apollo SBI Card SELECT', icon: 'card' },
        { title: 'Join Circle Membership', icon: 'people' },
        { title: 'My Health Records & Insights', icon: 'folder' }
      ].map((item, index) => (
        <TouchableOpacity key={index} style={styles.curatedCard}>
          <View style={styles.curatedIcon}>
            <Ionicons name={item.icon} size={32} color="#00A651" />
          </View>
          <Text style={styles.curatedCardTitle}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderPromotionBanners = () => (
    <View style={styles.promotionSection}>
      <Animated.FlatList
        data={[...banners, ...banners]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `banner-${index}`}
        renderItem={({ item }) => (
          <View style={styles.promotionBanner}>
            <Text style={styles.promotionTitle}>{item.title}</Text>
            <Text style={styles.promotionSubtitle}>{item.subtitle}</Text>
            <Ionicons name="chevron-forward" size={20} color="#00A651" />
          </View>
        )}
        scrollEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: bannerScrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );

  const renderContentCards = () => (
    <View style={styles.contentCardsSection}>
      <View style={styles.contentCard}>
        <Text style={styles.contentCardTitle}>Apollo 24|7</Text>
        <Text style={styles.contentCardSubtitle}>Think About It</Text>
        <Text style={styles.contentCardDescription}>Health Explained by Experts</Text>
        <TouchableOpacity style={styles.contentCardButton}>
          <Text style={styles.contentCardButtonText}>Watch on JioHotstar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentCard}>
        <Text style={styles.contentCardTitle}>PRO Health</Text>
        <Text style={styles.contentCardDescription}>Apollo's Personalised Health Program</Text>
        <TouchableOpacity style={styles.contentCardButton}>
          <Text style={styles.contentCardButtonText}>Explore More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAskApolloPosters = () => (
    <View style={styles.askApolloSection}>
      <Text style={styles.askApolloTitle}>Ask Apollo</Text>
      <Animated.FlatList
        data={[...posters, ...posters]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => `poster-${index}`}
        renderItem={({ item }) => (
          <LinearGradient
            colors={['#FF6B35', '#FF4444']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.posterCard}
          >
            <View style={styles.posterContent}>
              <Text style={styles.posterTitle}>{item.title}</Text>
              <Text style={styles.posterDescription} numberOfLines={3}>{item.description}</Text>
              <TouchableOpacity style={styles.posterButton}>
                <Text style={styles.posterButtonText}>Find Answer</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.posterIllustration}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          </LinearGradient>
        )}
        scrollEnabled={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: posterScrollX } } }],
          { useNativeDriver: true }
        )}
      />
    </View>
  );

  const renderTrustBadges = () => (
    <View style={styles.trustBadgesSection}>
      {[
        { title: 'Safe Secure', icon: 'shield-checkmark' },
        { title: 'Fully Reliable', icon: 'checkmark-circle' },
        { title: 'Genuine Products', icon: 'medal' }
      ].map((badge, index) => (
        <View key={index} style={styles.trustBadge}>
          <View style={styles.trustBadgeIcon}>
            <Ionicons name={badge.icon} size={24} color="#FFD700" />
          </View>
          <Text style={styles.trustBadgeText}>{badge.title}</Text>
        </View>
      ))}
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.versionText}>PROD - v 9.0.3 (612)</Text>
      <Text style={styles.liveHealthyText}>Live Healthy</Text>
      <Text style={styles.craftedText}>Crafted with ❤️ in India</Text>
      <View style={styles.poweredBy}>
        <Text style={styles.poweredByText}>Powered by:</Text>
        <Text style={styles.poweredBrands}>Apollo Pharmacy • Apollo 24/7 • Apollo Hospitals</Text>
      </View>
    </View>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {renderHeader()}
          {renderSearchBar()}
          {renderCategories()}
          {renderHeroSection()}
          {renderServicesGrid()}
          {renderPrescriptionBar()}
          {renderBuyAgain()}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={medicines}
            renderItem={renderMedicineCard}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.medicinesList}
          />
          {renderBankOffers()}
          {renderCuratedOfferings()}
          {renderPromotionBanners()}
          {renderContentCards()}
          {renderAskApolloPosters()}
          {renderTrustBadges()}
          {renderFooter()}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerLeft: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletBadge: {
    alignItems: 'center',
    marginRight: 16,
  },
  walletText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#00A651',
  },
  walletAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    height: 60,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: '#999',
  },
  aiAssistant: {
    alignItems: 'center',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#00A651',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  categoryChipActive: {
    backgroundColor: '#FFD70020',
    borderBottomWidth: 2,
    borderBottomColor: '#FFD700',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#00A651',
    fontWeight: 'bold',
  },
  newBadge: {
    fontSize: 10,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  heroSection: {
    padding: 24,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 12,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  poweredText: {
    fontSize: 12,
    color: '#999',
    fontWeight: '500',
  },
  logosRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
    gap: 16,
  },
  logoItem: {
    paddingHorizontal: 8,
  },
  logoText: {
    fontSize: 12,
    color: '#00A651',
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    gap: 16,
  },
  serviceCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceOffer: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
    marginBottom: 8,
  },
  serviceArrow: {
    alignSelf: 'flex-end',
  },
  prescriptionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12,
  },
  prescriptionText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  orderButton: {
    backgroundColor: '#00A651',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  orderButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  buyAgainSection: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  buyAgainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buyAgainTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#00A651',
    fontWeight: '600',
  },
  buyAgainTabs: {
    flexDirection: 'row',
    gap: 16,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#00A651',
    paddingBottom: 8,
  },
  tab: {
    paddingBottom: 8,
  },
  tabTextActive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#00A651',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
  },
  medicinesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  medicineCard: {
    width: MEDICINE_CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
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
    width: 60,
    height: 60,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginVertical: 8,
    alignSelf: 'center',
  },
  medicineName: {
    fontSize: 10,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  medicinePrice: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  medicineOldPrice: {
    fontSize: 8,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  medicineDiscount: {
    fontSize: 8,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  medicineDelivery: {
    fontSize: 8,
    color: '#666',
    marginTop: 4,
  },
  bankOffersSection: {
    marginTop: 24,
  },
  bankCard: {
    width: width - 40,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    marginRight: 16,
  },
  bankOfferText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  bankDetailsText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 4,
  },
  bankTcText: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.7,
  },
  curatedSection: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  curatedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  curatedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 16,
  },
  curatedIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  curatedCardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  promotionSection: {
    marginTop: 24,
  },
  promotionBanner: {
    width: width - 40,
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  promotionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  contentCardsSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginTop: 24,
    gap: 16,
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contentCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00A651',
    marginBottom: 4,
  },
  contentCardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  contentCardDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  contentCardButton: {
    backgroundColor: '#00A651',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  contentCardButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  askApolloSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  askApolloTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  posterCard: {
    width: width - 40,
    marginRight: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  posterContent: {
    flex: 1,
  },
  posterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  posterDescription: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12,
  },
  posterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  posterButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  posterIllustration: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trustBadgesSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  trustBadge: {
    alignItems: 'center',
  },
  trustBadgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    marginBottom: 8,
  },
  trustBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  versionText: {
    fontSize: 10,
    color: '#999',
    marginBottom: 8,
  },
  liveHealthyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00A651',
    marginBottom: 8,
  },
  craftedText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  poweredBy: {
    alignItems: 'center',
  },
  poweredByText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  poweredBrands: {
    fontSize: 10,
    color: '#999',
  },
});
