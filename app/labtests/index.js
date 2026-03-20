import React, { useState, useEffect, useCallback, memo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
  Animated,
  TextInput,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ─── COLORS ───
const C = {
  primaryOrange: '#E05A2B',
  primaryTeal: '#006060',
  tealAccent: '#006B6B',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  bgWhite: '#FFFFFF',
  bgBeige: '#F5EDE0',
  bgPeach: '#FCE5D7',
  bgLavender: '#F0E8FF',
  border: '#E0E0E0',
  borderLight: '#E8E8E8',
  successGreen: '#4CAF50',
  badgeGold: '#F4C430',
  darkTeal: '#003B5C',
  darkNavy: '#0A1A2A',
};

// ─── SECTION 1: HEADER ───
const Header = memo(() => (
  <View style={styles.header}>
    <View style={styles.headerLeft}>
      <Text style={styles.headerSubtext}>Collect Samples from</Text>
      <TouchableOpacity style={styles.locationRow} accessibilityLabel="Change location">
        <Text style={styles.headerLocation}>Delhi 110001</Text>
        <Ionicons name="chevron-down" size={16} color={C.textPrimary} />
      </TouchableOpacity>
    </View>
    <View style={styles.headerRight}>
      <TouchableOpacity style={styles.headerIcon} accessibilityLabel="Notifications">
        <Ionicons name="notifications-outline" size={22} color={C.textPrimary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.hcBadge} accessibilityLabel="HC credits">
        <Text style={styles.hcBadgeText}>HC</Text>
        <Text style={styles.hcAmount}>₹50</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileAvatar} accessibilityLabel="Profile">
        <Ionicons name="person-circle" size={30} color={C.primaryTeal} />
      </TouchableOpacity>
    </View>
  </View>
));

// ─── SECTION 2: SEARCH BAR ───
const SearchBar = memo(() => {
  const [placeholder, setPlaceholder] = useState('Search Tests & Packages');
  const placeholders = ['Search Tests & Packages', 'Search for CBC Test', 'Search Health Packages'];
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % placeholders.length;
      setPlaceholder(placeholders[indexRef.current]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={C.textSecondary} />
        <Text style={styles.searchPlaceholder}>{placeholder}</Text>
        <View style={styles.searchRight}>
          <TouchableOpacity style={styles.rxButton} accessibilityLabel="Upload prescription">
            <MaterialCommunityIcons name="prescription" size={20} color={C.primaryTeal} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cartButton} accessibilityLabel="Cart">
            <Ionicons name="cart-outline" size={22} color={C.primaryTeal} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
});

// ─── SECTION 3: PROMO BANNER ───
const PromoBanner = memo(() => (
  <View style={styles.sectionPadding}>
    <TouchableOpacity style={styles.promoBanner} accessibilityLabel="Women's health promo">
      <View style={styles.promoLeft}>
        <Text style={styles.promoTitle}>Her Health Matters,{'\n'}Today & Everyday</Text>
        <View style={styles.promoOfferRow}>
          <Text style={styles.promoOffer}>FLAT 15% OFF</Text>
        </View>
        <View style={styles.promoCodePill}>
          <Text style={styles.promoCode}>CODE: WOMENCARE15</Text>
        </View>
      </View>
      <View style={styles.promoRight}>
        <View style={styles.promoIllustration}>
          <Ionicons name="woman" size={50} color="#E8A0BF" />
        </View>
        <Ionicons name="chevron-forward" size={20} color={C.textSecondary} />
      </View>
    </TouchableOpacity>
  </View>
));

// ─── SECTION 4: QUICK ACTIONS ───
const QuickActions = memo(() => (
  <View style={styles.quickActions}>
    <TouchableOpacity style={styles.quickActionBtn} accessibilityLabel="Book a test via call">
      <View style={[styles.quickActionIcon, { backgroundColor: '#FFF3E0' }]}>
        <Ionicons name="call" size={20} color={C.primaryOrange} />
      </View>
      <Text style={styles.quickActionText}>Book a Test{'\n'}via Call</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.quickActionBtn} accessibilityLabel="Upload prescription">
      <View style={[styles.quickActionIcon, { backgroundColor: '#E8F5E9' }]}>
        <Ionicons name="document-text" size={20} color={C.primaryTeal} />
      </View>
      <Text style={styles.quickActionText}>Upload{'\n'}Prescription</Text>
    </TouchableOpacity>
  </View>
));

// ─── SECTION 5: DOCTOR-CURATED HEALTH CHECK ───
const healthCheckProfiles = [
  { label: 'Men\n(18-45 Yrs)', icon: 'man', color: '#4A90D9' },
  { label: 'Women\n(18-45 Yrs)', icon: 'woman', color: '#E8A0BF' },
  { label: 'Sr. Men\n(>45 Yrs)', icon: 'man', color: '#7B8D9E' },
  { label: 'Sr. Women\n(>45 Yrs)', icon: 'woman', color: '#C9A0DC' },
];

const DoctorCuratedSection = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Doctor-Curated Health Check for You</Text>
    <View style={styles.profileCirclesRow}>
      {healthCheckProfiles.map((p, i) => (
        <TouchableOpacity key={i} style={styles.profileCircleItem} accessibilityLabel={p.label}>
          <View style={[styles.profileCircle, { backgroundColor: '#F5F0EB' }]}>
            <Ionicons name={p.icon} size={32} color={p.color} />
          </View>
          <Text style={styles.profileLabel}>{p.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

// ─── SECTION 6: OFFERS FOR YOU ───
const offers = [
  { text: 'Get Flat 25% Off + FREE Frame Collection\non orders above ₹1000', code: 'WELCOME25' },
  { text: 'Flat 20% OFF on all Health Packages\nfor new users', code: 'NEWUSER20' },
  { text: 'Get FREE Home Sample Collection\non orders above ₹500', code: 'FREECOLLECT' },
];

const OfferCard = memo(({ item }) => (
  <View style={styles.offerCard}>
    <View style={styles.offerIconWrap}>
      <Ionicons name="flask" size={24} color={C.primaryTeal} />
    </View>
    <Text style={styles.offerText}>{item.text}</Text>
    <View style={styles.offerCodeBadge}>
      <Text style={styles.offerCodeText}>Code: {item.code}</Text>
    </View>
  </View>
));

const OffersSection = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Offers for You</Text>
    <FlatList
      horizontal
      data={offers}
      renderItem={({ item }) => <OfferCard item={item} />}
      keyExtractor={(_, i) => `offer-${i}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 16 }}
    />
  </View>
));

// ─── SECTION 7: MOST BOOKED BANNER ───
const MostBookedBanner = memo(() => (
  <View style={styles.sectionPadding}>
    <TouchableOpacity style={styles.mostBookedBanner}>
      <View style={styles.mostBookedLeft}>
        <View style={styles.mostBookedPill}>
          <Text style={styles.mostBookedPillText}>MOST BOOKED LAB TESTS</Text>
        </View>
        <Text style={styles.mostBookedTitle}>Flat 15% OFF{'\n'}on all Lab Tests</Text>
        <View style={styles.mostBookedCodeRow}>
          <Text style={styles.mostBookedCode}>Code: WELCOME15</Text>
        </View>
        <TouchableOpacity style={styles.bookNowBtn}>
          <Text style={styles.bookNowText}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mostBookedRight}>
        <Ionicons name="medkit" size={60} color="#FFF" />
      </View>
    </TouchableOpacity>
  </View>
));

// ─── SECTION 8: TAX SAVER GRID ───
const taxSaverItems = [
  { name: 'Tax Saver Platinum', tests: '99 Tests', icon: 'shield-checkmark' },
  { name: 'Tax Saver Advance (M)', tests: '85 Tests', icon: 'trending-up' },
  { name: 'Tax Saver Advance (F)', tests: '87 Tests', icon: 'trending-up' },
  { name: 'Tax Saver Essential', tests: '72 Tests', icon: 'checkmark-circle' },
  { name: 'Tax Saver Premium M', tests: '91 Tests', icon: 'star' },
  { name: 'Tax Saver Premium F', tests: '93 Tests', icon: 'star' },
];

const TaxSaverGrid = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Invest in Health, Cut Down Taxes!</Text>
    <Text style={styles.sectionSubtitle}>Claim Tax Benefits Up to ₹5,000</Text>
    <View style={styles.gridContainer}>
      {taxSaverItems.map((item, i) => (
        <TouchableOpacity key={i} style={styles.taxSaverCard} accessibilityLabel={item.name}>
          <View style={styles.taxSaverIconWrap}>
            <Ionicons name={item.icon} size={20} color={C.primaryTeal} />
          </View>
          <Text style={styles.taxSaverName}>{item.name}</Text>
          <Text style={styles.taxSaverTests}>{item.tests}</Text>
          <Ionicons name="chevron-forward" size={16} color={C.textSecondary} style={{ alignSelf: 'flex-end' }} />
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

// ─── SECTION 9: OFFER FILTER TILES ───
const offerTiles = [
  { label: 'Flat 60%\nOff', bg: '#F0E8FF', color: '#7B2FF7' },
  { label: 'FREE\nFull Body', bg: '#E8F5E9', color: '#2E7D32' },
  { label: 'Buy 1\nGet 1', bg: '#FFF3E0', color: '#E65100' },
  { label: 'Family\nOffer', bg: '#FCE5D7', color: '#BF360C' },
];

const OfferFilterTiles = memo(() => (
  <View style={styles.sectionPadding}>
    <View style={styles.offerTilesRow}>
      {offerTiles.map((tile, i) => (
        <TouchableOpacity key={i} style={[styles.offerTile, { backgroundColor: tile.bg }]} accessibilityLabel={tile.label}>
          <Text style={[styles.offerTileText, { color: tile.color }]}>{tile.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

// ─── SECTION 10: APOLLO LEGACY STRIP ───
const ApolloLegacyStrip = memo(() => (
  <View style={styles.legacyStrip}>
    <View style={styles.legacyBadge}>
      <Text style={styles.legacyBadgeText}>40{'\n'}Years</Text>
    </View>
    <Text style={styles.legacyText}>
      Apollo's Healthcare Legacy with{' '}
      <Text style={{ fontWeight: '700' }}>10 Mn+</Text> Diagnostic Tests
    </Text>
  </View>
));

// ─── SECTION 11: VIDEO THUMBNAILS ───
const videos = [
  { title: 'How to book\nwith us', icon: 'videocam' },
  { title: 'About Sample\nCollection\nProcess', icon: 'flask' },
  { title: 'State of the Art\nCentres', icon: 'business' },
];

const VideoThumbnails = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Lab Tests with Apollo247</Text>
    <FlatList
      horizontal
      data={videos}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.videoCard} accessibilityLabel={item.title}>
          <View style={styles.videoThumb}>
            <Ionicons name={item.icon} size={30} color={C.primaryTeal} />
            <View style={styles.playIcon}>
              <Ionicons name="play-circle" size={32} color={C.primaryOrange} />
            </View>
          </View>
          <Text style={styles.videoTitle}>{item.title}</Text>
        </TouchableOpacity>
      )}
      keyExtractor={(_, i) => `video-${i}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 16 }}
    />
  </View>
));

// ─── SECTION 12: PROHEALTH DARK BANNER ───
const ProHealthBanner = memo(() => (
  <View style={styles.sectionPadding}>
    <TouchableOpacity style={styles.proHealthBanner} accessibilityLabel="Apollo ProHealth">
      <View style={styles.proHealthLeft}>
        <Text style={styles.proHealthTitle}>Apollo ProHealth</Text>
        <Text style={styles.proHealthSub}>Your Health Check{'\n'}Reimagined</Text>
        <TouchableOpacity style={styles.proHealthBookBtn}>
          <Text style={styles.proHealthBookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.proHealthRight}>
        <Ionicons name="body" size={70} color="#FF6B35" />
      </View>
    </TouchableOpacity>
  </View>
));

// ─── SECTION 13: FULL BODY PACKAGE GRID ───
const packages = [
  { badge: 'INCLUDES VIT B12', name: 'Apollo Prime Full Body\nCheckup', tests: '89 Tests', oldPrice: '₹2,798', newPrice: '₹1,799' },
  { badge: 'INCLUDES VIT D, B12', name: 'Full Body Checkup\nPlatinum', tests: '102 Tests', oldPrice: '₹5,998', newPrice: '₹3,894' },
  { badge: 'INCLUDES VIT B12', name: 'Full Body Health\nCheckup Gold', tests: '75 Tests', oldPrice: '₹3,200', newPrice: '₹2,080' },
  { badge: 'SMART REPORT', name: 'Apollo Vitamin Check -\nBasic', tests: '45 Tests', oldPrice: '₹1,998', newPrice: '₹1,299' },
];

const PackageGrid = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Tests for you and your family</Text>
    <View style={styles.packageGridContainer}>
      {packages.map((pkg, i) => (
        <TouchableOpacity key={i} style={styles.packageCard} accessibilityLabel={pkg.name}>
          <View style={styles.packageBadge}>
            <Text style={styles.packageBadgeText}>{pkg.badge}</Text>
          </View>
          <Text style={styles.packageName}>{pkg.name}</Text>
          <Text style={styles.packageTests}>Includes {pkg.tests}</Text>
          <View style={styles.packagePriceRow}>
            <Text style={styles.packageOldPrice}>{pkg.oldPrice}</Text>
            <Text style={styles.packageNewPrice}>Now at {pkg.newPrice}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color={C.textSecondary} style={{ alignSelf: 'flex-end', marginTop: 4 }} />
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

// ─── SECTION 14: AI ASK APOLLO CARD ───
const AskApolloCard = memo(() => (
  <View style={styles.sectionPadding}>
    <View style={styles.askApolloCard}>
      <View style={styles.askApolloHeader}>
        <View style={styles.aiBadge}>
          <Text style={styles.aiBadgeText}>AI</Text>
        </View>
        <View style={styles.askApolloSquare}>
          <Text style={styles.askApolloSquareText}>Ask{'\n'}Apollo</Text>
        </View>
      </View>
      <Text style={styles.askApolloTitle}>Need expert guidance on{'\n'}lab tests and reports?</Text>
      <Text style={styles.askApolloSubLabel}>ASK APOLLO ABOUT...</Text>
      <TouchableOpacity style={styles.askApolloChip}>
        <Text style={styles.askApolloChipText}>Lab tests required for Urinary Tract Infection</Text>
        <Ionicons name="chevron-forward" size={16} color={C.primaryOrange} />
      </TouchableOpacity>
      <View style={styles.askApolloInput}>
        <Text style={styles.askApolloInputText}>Or Just Ask Apollo...</Text>
        <Ionicons name="send" size={20} color={C.primaryOrange} />
      </View>
    </View>
  </View>
));

// ─── SECTION 15: TRUST STATS ───
const TrustStats = memo(() => (
  <View style={styles.trustSection}>
    <Text style={styles.trustApollo}>Apollo</Text>
    <Text style={styles.trustSubtitle}>Your Trusted Lab-Test Partner</Text>
    <View style={styles.trustGrid}>
      <View style={styles.trustItem}>
        <Ionicons name="flask" size={24} color={C.primaryTeal} />
        <Text style={styles.trustNumber}>10 Million</Text>
        <Text style={styles.trustLabel}>High quality annual{'\n'}diagnostics tests</Text>
      </View>
      <View style={styles.trustItem}>
        <Ionicons name="business" size={24} color={C.primaryTeal} />
        <Text style={styles.trustNumber}>140+</Text>
        <Text style={styles.trustLabel}>Laboratories{'\n'}across the country</Text>
      </View>
      <View style={styles.trustItem}>
        <View style={[styles.legacyBadge, { width: 28, height: 28 }]}>
          <Text style={[styles.legacyBadgeText, { fontSize: 6 }]}>40{'\n'}Yrs</Text>
        </View>
        <Text style={styles.trustNumber}>40 Years</Text>
        <Text style={styles.trustLabel}>of Apollo's{'\n'}healthcare legacy</Text>
      </View>
      <View style={styles.trustItem}>
        <Ionicons name="location" size={24} color={C.primaryTeal} />
        <Text style={styles.trustNumber}>2000+</Text>
        <Text style={styles.trustLabel}>Collection centres{'\n'}across 40+ cities</Text>
      </View>
    </View>
  </View>
));

// ─── SECTION 16: CERTIFICATION STRIP ───
const CertificationStrip = memo(() => (
  <View style={styles.certStrip}>
    <View style={styles.certRow}>
      <Ionicons name="shield-checkmark" size={20} color={C.primaryTeal} />
      <Text style={styles.certText}>Certified safety and quality fulfilled by{'\n'}Apollo Diagnostics.</Text>
    </View>
    <View style={styles.certLogos}>
      <View style={styles.certLogo}><Text style={styles.certLogoText}>NABL</Text></View>
      <View style={styles.certLogo}><Text style={styles.certLogoText}>CAP</Text></View>
      <View style={styles.certLogo}><Text style={styles.certLogoText}>UKAS</Text></View>
    </View>
  </View>
));

// ─── FLOATING ELEMENTS ───
const FloatingElements = memo(({ showGoTop, onGoTop }) => (
  <>
    {showGoTop && (
      <TouchableOpacity style={styles.goTopButton} onPress={onGoTop} accessibilityLabel="Go to top">
        <Ionicons name="arrow-up" size={14} color="#FFF" />
        <Text style={styles.goTopText}>Go To Top</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity style={styles.fab} accessibilityLabel="Call to book">
      <Ionicons name="call" size={24} color="#FFF" />
    </TouchableOpacity>
  </>
));

// ============================================================================
// PAGE 2: LAB TESTS BY CATEGORY - Comprehensive Test Categories
// ============================================================================

const TEST_CATEGORIES = [
  { id: '1', name: 'Blood Tests', icon: '🩸', tests: 50, desc: 'CBC, LFT, KFT, Lipid Profile' },
  { id: '2', name: 'Diabetes', icon: '💉', tests: 15, desc: 'Fasting Sugar, HbA1c, Glucose' },
  { id: '3', name: 'Thyroid', icon: '🦋', tests: 12, desc: 'T3, T4, TSH' },
  { id: '4', name: 'Heart', icon: '❤️', tests: 20, desc: 'ECG, Echo, TMT, Lipid' },
  { id: '5', name: 'Liver', icon: '🫁', tests: 18, desc: 'LFT, Bilirubin, Hepatitis' },
  { id: '6', name: 'Kidney', icon: '🫘', tests: 15, desc: 'KFT, Creatinine, BUN' },
  { id: '7', name: 'Vitamin', icon: '💊', tests: 25, desc: 'Vit D, B12, Iron Profile' },
  { id: '8', name: 'Fertility', icon: '🌸', tests: 30, desc: 'Hormone tests, AMH, FSH' },
  { id: '9', name: 'Cancer', icon: '🎗️', tests: 20, desc: 'Tumor markers, screening' },
  { id: '10', name: 'Infection', icon: '🦠', tests: 25, desc: 'PCR, Serology, HIV' },
  { id: '11', name: 'Allergy', icon: '🤧', tests: 15, desc: 'Food, environmental allergens' },
  { id: '12', name: 'Arthritis', icon: '🤲', tests: 10, desc: 'RA factor, Anti-CCP' },
];

const TestCategoriesSection = memo(() => (
  <View style={testCatStyles.container}>
    <View style={testCatStyles.headerRow}>
      <Text style={testCatStyles.sectionTitle}>Lab Tests by Category</Text>
      <TouchableOpacity>
        <Text style={testCatStyles.viewAll}>View All →</Text>
      </TouchableOpacity>
    </View>
    <View style={testCatStyles.grid}>
      {TEST_CATEGORIES.map((item) => (
        <TouchableOpacity key={item.id} style={testCatStyles.card} accessibilityRole="button">
          <View style={testCatStyles.iconWrap}>
            <Text style={testCatStyles.icon}>{item.icon}</Text>
          </View>
          <Text style={testCatStyles.name}>{item.name}</Text>
          <Text style={testCatStyles.tests}>{item.tests} Tests</Text>
          <Text style={testCatStyles.desc}>{item.desc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
TestCategoriesSection.displayName = 'TestCategoriesSection';

const testCatStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: C.bgWhite },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary },
  viewAll: { fontSize: 13, color: C.primaryTeal, fontWeight: '600' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '31%', backgroundColor: C.bgWhite, borderRadius: 12, padding: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: C.border },
  iconWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#E0F7FA', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  icon: { fontSize: 24 },
  name: { fontSize: 12, fontWeight: '700', color: C.textPrimary, textAlign: 'center' },
  tests: { fontSize: 10, color: C.primaryTeal, marginTop: 4 },
  desc: { fontSize: 8, color: C.textSecondary, textAlign: 'center', marginTop: 2 },
});

// Popular Tests
const POPULAR_TESTS = [
  { id: '1', name: 'Complete Blood Count', subtitle: '24 Parameters', price: 399, mrp: 800, discount: '50% OFF', icon: 'water', tests: 24 },
  { id: '2', name: 'Thyroid Profile', subtitle: 'T3, T4, TSH', price: 599, mrp: 1200, discount: '50% OFF', icon: 'fitness', tests: 3 },
  { id: '3', name: 'Liver Function Test', subtitle: '12 Parameters', price: 799, mrp: 1600, discount: '50% OFF', icon: 'flask', tests: 12 },
  { id: '4', name: 'Kidney Function Test', subtitle: '10 Parameters', price: 699, mrp: 1400, discount: '50% OFF', icon: 'body', tests: 10 },
  { id: '5', name: 'Lipid Profile', subtitle: '9 Parameters', price: 499, mrp: 1000, discount: '50% OFF', icon: 'heart', tests: 9 },
  { id: '6', name: 'Diabetes Screening', subtitle: 'Fasting & PP', price: 299, mrp: 600, discount: '50% OFF', icon: 'water', tests: 2 },
];

const PopularTestsSection = memo(() => (
  <View style={popTestStyles.container}>
    <Text style={popTestStyles.sectionTitle}>Popular Lab Tests</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {POPULAR_TESTS.map((item) => (
        <TouchableOpacity key={item.id} style={popTestStyles.card} accessibilityRole="button">
          <View style={popTestStyles.discountBadge}>
            <Text style={popTestStyles.discountText}>{item.discount}</Text>
          </View>
          <View style={popTestStyles.iconWrap}>
            <Ionicons name={item.icon} size={32} color={C.primaryTeal} />
          </View>
          <Text style={popTestStyles.name} numberOfLines={2}>{item.name}</Text>
          <Text style={popTestStyles.subtitle}>{item.subtitle}</Text>
          <View style={popTestStyles.testsRow}>
            <Text style={popTestStyles.tests}>{item.tests} Tests</Text>
          </View>
          <View style={popTestStyles.priceRow}>
            <Text style={popTestStyles.price}>₹{item.price}</Text>
            <Text style={popTestStyles.mrp}>₹{item.mrp}</Text>
          </View>
          <TouchableOpacity style={popTestStyles.bookBtn}>
            <Text style={popTestStyles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
PopularTestsSection.displayName = 'PopularTestsSection';

const popTestStyles = StyleSheet.create({
  container: { paddingVertical: 16, backgroundColor: '#F5F5F5' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, paddingHorizontal: 16, marginBottom: 16 },
  card: { width: 180, backgroundColor: C.bgWhite, borderRadius: 14, padding: 14, marginLeft: 16, borderWidth: 1, borderColor: C.border },
  discountBadge: { position: 'absolute', top: 8, right: 8, backgroundColor: C.primaryOrange, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  discountText: { color: C.bgWhite, fontSize: 9, fontWeight: '700' },
  iconWrap: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#E0F7FA', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  name: { fontSize: 14, fontWeight: '700', color: C.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: 11, color: C.textSecondary, marginBottom: 6 },
  testsRow: { flexDirection: 'row', marginBottom: 8 },
  tests: { fontSize: 11, color: C.primaryTeal, fontWeight: '600' },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  price: { fontSize: 18, fontWeight: '700', color: C.textPrimary },
  mrp: { fontSize: 12, color: C.textSecondary, textDecorationLine: 'line-through', marginLeft: 8 },
  bookBtn: { backgroundColor: C.primaryTeal, borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  bookText: { color: C.bgWhite, fontSize: 13, fontWeight: '700' },
});

// Health Packages
const HEALTH_PACKAGES_LAB = [
  { id: '1', name: 'Basic Health Checkup', price: 999, mrp: 2499, tests: 30, discount: '60% OFF', icon: '🩺' },
  { id: '2', name: 'Advanced Full Body', price: 3499, mrp: 8999, tests: 80, discount: '61% OFF', icon: '🏥' },
  { id: '3', name: 'Executive Health Pack', price: 5999, mrp: 15000, tests: 100, discount: '60% OFF', icon: '💼' },
  { id: '4', name: 'Senior Citizen Pack', price: 2999, mrp: 7500, tests: 60, discount: '60% OFF', icon: '👴' },
  { id: '5', name: 'Women\'s Wellness', price: 1999, mrp: 5000, tests: 40, discount: '60% OFF', icon: '🌸' },
  { id: '6', name: 'Diabetes Care Pack', price: 799, mrp: 2000, tests: 25, discount: '60% OFF', icon: '💉' },
];

const HealthPackagesLabSection = memo(() => (
  <View style={pkgStyles.container}>
    <View style={pkgStyles.headerRow}>
      <Text style={pkgStyles.sectionTitle}>Comprehensive Health Packages</Text>
      <TouchableOpacity>
        <Text style={pkgStyles.viewAll}>View All →</Text>
      </TouchableOpacity>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 16 }}>
      {HEALTH_PACKAGES_LAB.map((item) => (
        <TouchableOpacity key={item.id} style={pkgStyles.card} accessibilityRole="button">
          <View style={pkgStyles.cardHeader}>
            <Text style={pkgStyles.icon}>{item.icon}</Text>
            <View style={pkgStyles.discountBadge}>
              <Text style={pkgStyles.discountText}>{item.discount}</Text>
            </View>
          </View>
          <Text style={pkgStyles.name}>{item.name}</Text>
          <Text style={pkgStyles.tests}>{item.tests} Tests Included</Text>
          <View style={pkgStyles.priceRow}>
            <Text style={pkgStyles.price}>₹{item.price}</Text>
            <Text style={pkgStyles.mrp}>₹{item.mrp}</Text>
          </View>
          <TouchableOpacity style={pkgStyles.bookBtn}>
            <Text style={pkgStyles.bookText}>Book Package</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
));
HealthPackagesLabSection.displayName = 'HealthPackagesLabSection';

const pkgStyles = StyleSheet.create({
  container: { paddingVertical: 16, backgroundColor: C.bgWhite },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary },
  viewAll: { fontSize: 13, color: C.primaryTeal, fontWeight: '600' },
  card: { width: 200, backgroundColor: '#F8F9FA', borderRadius: 14, padding: 14, marginLeft: 16, borderWidth: 1, borderColor: C.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  icon: { fontSize: 32 },
  discountBadge: { backgroundColor: C.primaryOrange, borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  discountText: { color: C.bgWhite, fontSize: 10, fontWeight: '700' },
  name: { fontSize: 14, fontWeight: '700', color: C.textPrimary, marginBottom: 4 },
  tests: { fontSize: 11, color: C.textSecondary, marginBottom: 10 },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  price: { fontSize: 18, fontWeight: '700', color: C.textPrimary },
  mrp: { fontSize: 12, color: C.textSecondary, textDecorationLine: 'line-through', marginLeft: 8 },
  bookBtn: { backgroundColor: C.primaryTeal, borderRadius: 8, paddingVertical: 8, alignItems: 'center' },
  bookText: { color: C.bgWhite, fontSize: 12, fontWeight: '700' },
});

// Lab Test by Condition
const CONDITION_TESTS = [
  { id: '1', condition: 'Fever', icon: '🌡️', tests: ['CBC', 'Malaria Dengue', 'Typhoid'], color: '#FFEBEE' },
  { id: '2', condition: 'Diabetes', icon: '💉', tests: ['Fasting Sugar', 'HbA1c', 'Insulin'], color: '#E3F2FD' },
  { id: '3', condition: 'Thyroid', icon: '🦋', tests: ['T3', 'T4', 'TSH'], color: '#FFF3E0' },
  { id: '4', condition: 'Heart Health', icon: '❤️', tests: ['ECG', 'Lipid Profile', 'Echo'], color: '#FFCDD2' },
  { id: '5', condition: 'Liver', icon: '🫁', tests: ['LFT', 'Hepatitis B', 'Hepatitis C'], color: '#E8F5E9' },
  { id: '6', condition: 'Kidney', icon: '🫘', tests: ['KFT', 'Uric Acid', 'Microalbumin'], color: '#F3E5F5' },
];

const ConditionTestsSection = memo(() => (
  <View style={condTestStyles.container}>
    <Text style={condTestStyles.sectionTitle}>Tests by Health Condition</Text>
    {CONDITION_TESTS.map((item) => (
      <TouchableOpacity key={item.id} style={condTestStyles.card} accessibilityRole="button">
        <View style={[condTestStyles.iconWrap, { backgroundColor: item.color }]}>
          <Text style={condTestStyles.icon}>{item.icon}</Text>
        </View>
        <View style={condTestStyles.content}>
          <Text style={condTestStyles.condition}>{item.condition}</Text>
          <Text style={condTestStyles.tests}>{item.tests.join(' • ')}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={C.textSecondary} />
      </TouchableOpacity>
    ))}
  </View>
));
ConditionTestsSection.displayName = 'ConditionTestsSection';

const condTestStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#FAFAFA' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.bgWhite, borderRadius: 12, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: C.border },
  iconWrap: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  icon: { fontSize: 24 },
  content: { flex: 1 },
  condition: { fontSize: 14, fontWeight: '700', color: C.textPrimary, marginBottom: 2 },
  tests: { fontSize: 11, color: C.textSecondary },
});

// Sample Collection
const SAMPLE_TYPES = [
  { id: '1', type: 'Home Collection', icon: '🏠', description: 'Free sample pickup from your home', available: '24/7' },
  { id: '2', type: 'Lab Visit', icon: '🏥', description: 'Visit nearest collection center', available: '6AM - 10PM' },
  { id: '3', type: 'Corporate Camps', icon: '🏢', description: 'On-site health checkups for employees', available: 'On Request' },
];

const SampleCollectionSection = memo(() => (
  <View style={sampleStyles.container}>
    <Text style={sampleStyles.sectionTitle}>Sample Collection Options</Text>
    <View style={sampleStyles.grid}>
      {SAMPLE_TYPES.map((item) => (
        <TouchableOpacity key={item.id} style={sampleStyles.card} accessibilityRole="button">
          <Text style={sampleStyles.icon}>{item.icon}</Text>
          <Text style={sampleStyles.type}>{item.type}</Text>
          <Text style={sampleStyles.description}>{item.description}</Text>
          <View style={sampleStyles.availableBadge}>
            <Text style={sampleStyles.availableText}>{item.available}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));
SampleCollectionSection.displayName = 'SampleCollectionSection';

const sampleStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: C.bgWhite },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '31%', backgroundColor: '#F8F9FA', borderRadius: 12, padding: 14, marginBottom: 12, alignItems: 'center' },
  icon: { fontSize: 32, marginBottom: 8 },
  type: { fontSize: 12, fontWeight: '700', color: C.textPrimary, textAlign: 'center', marginBottom: 4 },
  description: { fontSize: 9, color: C.textSecondary, textAlign: 'center', marginBottom: 8 },
  availableBadge: { backgroundColor: '#E0F2F1', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2 },
  availableText: { fontSize: 9, color: C.primaryTeal, fontWeight: '600' },
});

// Reports Section
const REPORTS_INFO = [
  { id: '1', title: 'Digital Reports', desc: 'Access reports online anytime', icon: '📱' },
  { id: '2', title: 'Free SMS Updates', desc: 'Get updates on your phone', icon: '💬' },
  { id: '3', title: 'Doctor Consultation', desc: 'Free consult with test results', icon: '🩺' },
  { id: '4', title: 'Record Storage', desc: 'Lifetime storage of records', icon: '☁️' },
];

const ReportsInfoSection = memo(() => (
  <View style={repStyles.container}>
    <Text style={repStyles.sectionTitle}>Report Features</Text>
    <View style={repStyles.grid}>
      {REPORTS_INFO.map((item) => (
        <View key={item.id} style={repStyles.card}>
          <Text style={repStyles.icon}>{item.icon}</Text>
          <Text style={repStyles.title}>{item.title}</Text>
          <Text style={repStyles.desc}>{item.desc}</Text>
        </View>
      ))}
    </View>
  </View>
));
ReportsInfoSection.displayName = 'ReportsInfoSection';

const repStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#F5F5F5' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 16 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: C.bgWhite, borderRadius: 12, padding: 14, marginBottom: 12, alignItems: 'center' },
  icon: { fontSize: 28, marginBottom: 8 },
  title: { fontSize: 13, fontWeight: '700', color: C.textPrimary, textAlign: 'center', marginBottom: 4 },
  desc: { fontSize: 11, color: C.textSecondary, textAlign: 'center' },
});

// Lab Test FAQ
const LABTEST_FAQS = [
  { id: '1', q: 'Are lab tests at home safe?', a: 'Yes, our trained phlebotomists follow strict safety protocols and use sterile equipment for sample collection.' },
  { id: '2', q: 'How long do results take?', a: 'Most test results are available within 24-48 hours. Some specialized tests may take 5-7 days.' },
  { id: '3', q: 'Do I need to fast before tests?', a: 'Some tests like fasting blood sugar require 8-12 hours of fasting. Check individual test instructions.' },
  { id: '4', q: 'Can I cancel or reschedule?', a: 'Yes, you can cancel or reschedule your appointment up to 2 hours before the scheduled time.' },
];

const LabTestFAQsSection = memo(() => {
  const [expanded, setExpanded] = useState({});
  return (
    <View style={labFaqStyles.container}>
      <Text style={labFaqStyles.sectionTitle}>Frequently Asked Questions</Text>
      {LABTEST_FAQS.map((item) => (
        <View key={item.id} style={labFaqStyles.item}>
          <TouchableOpacity style={labFaqStyles.questionRow} onPress={() => setExpanded(prev => ({ ...prev, [item.id]: !prev[item.id] }))}>
            <Text style={labFaqStyles.question}>{item.q}</Text>
            <Ionicons name={expanded[item.id] ? 'remove' : 'add'} size={20} color={C.primaryTeal} />
          </TouchableOpacity>
          {expanded[item.id] && <Text style={labFaqStyles.answer}>{item.a}</Text>}
        </View>
      ))}
    </View>
  );
});
LabTestFAQsSection.displayName = 'LabTestFAQsSection';

const labFaqStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: C.bgWhite },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 16 },
  item: { backgroundColor: '#F8F9FA', borderRadius: 10, marginBottom: 10, overflow: 'hidden' },
  questionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 14 },
  question: { flex: 1, fontSize: 13, fontWeight: '600', color: C.textPrimary, marginRight: 10 },
  answer: { fontSize: 12, color: C.textSecondary, lineHeight: 18, paddingHorizontal: 14, paddingBottom: 14 },
});

// Trust Badges Lab
const TrustBadgesLab = memo(() => (
  <View style={trustLabStyles.container}>
    <View style={trustLabStyles.badge}><Text style={trustLabStyles.icon}>🛡️</Text><Text style={trustLabStyles.title}>NABL Accredited</Text><Text style={trustLabStyles.desc}>Labs</Text></View>
    <View style={trustLabStyles.badge}><Text style={trustLabStyles.icon}>👨‍🔬</Text><Text style={trustLabStyles.title}>1000+</Text><Text style={trustLabStyles.desc}>Phlebotomists</Text></View>
    <View style={trustLabStyles.badge}><Text style={trustLabStyles.icon}>🏠</Text><Text style={trustLabStyles.title}>Free Home</Text><Text style={trustLabStyles.desc}>Collection</Text></View>
    <View style={trustLabStyles.badge}><Text style={trustLabStyles.icon}>⏱️</Text><Text style={trustLabStyles.title}>24-48 Hours</Text><Text style={trustLabStyles.desc}>Results</Text></View>
  </View>
));
TrustBadgesLab.displayName = 'TrustBadgesLab';

const trustLabStyles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20, paddingHorizontal: 16, backgroundColor: '#E0F7FA' },
  badge: { alignItems: 'center' },
  icon: { fontSize: 28, marginBottom: 6 },
  title: { fontSize: 12, fontWeight: '700', color: C.textPrimary },
  desc: { fontSize: 9, color: C.textSecondary, marginTop: 2 },
});

// ─── MAIN SCREEN ───
export default function LabTestsIndex() {
  const scrollRef = useRef(null);
  const [showGoTop, setShowGoTop] = useState(false);

  const handleScroll = useCallback((event) => {
    const y = event.nativeEvent.contentOffset.y;
    setShowGoTop(y > 600);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={C.bgPeach} />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerBg}>
          <Header />
          <SearchBar />
        </View>
        <PromoBanner />
        <QuickActions />
        <DoctorCuratedSection />
        <OffersSection />
        <MostBookedBanner />
        <TaxSaverGrid />
        <OfferFilterTiles />
        <ApolloLegacyStrip />
        <VideoThumbnails />
        <ProHealthBanner />
        <PackageGrid />
        <AskApolloCard />
        <TrustStats />
        <CertificationStrip />
        <TestCategoriesSection />
        <PopularTestsSection />
        <HealthPackagesLabSection />
        <ConditionTestsSection />
        <SampleCollectionSection />
        <ReportsInfoSection />
        <LabTestFAQsSection />
        <TrustBadgesLab />
        <View style={{ height: 80 }} />
      </ScrollView>
      <FloatingElements showGoTop={showGoTop} onGoTop={scrollToTop} />
    </SafeAreaView>
  );
}

// ─── STYLES ───
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: C.bgPeach },
  container: { flex: 1, backgroundColor: C.bgWhite },
  sectionPadding: { paddingHorizontal: 16, marginTop: 20 },
  headerBg: { backgroundColor: C.bgPeach, paddingBottom: 16 },

  // Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 4 },
  headerLeft: {},
  headerSubtext: { fontSize: 12, color: C.textSecondary },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  headerLocation: { fontSize: 14, fontWeight: '700', color: C.textPrimary, marginRight: 4 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  headerIcon: { padding: 4 },
  hcBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF3E0', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4 },
  hcBadgeText: { fontSize: 10, fontWeight: '700', color: C.primaryOrange, marginRight: 4 },
  hcAmount: { fontSize: 12, fontWeight: '700', color: C.primaryOrange },
  profileAvatar: {},

  // Search
  searchContainer: { paddingHorizontal: 16, marginTop: 8 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 8, height: 44, paddingHorizontal: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  searchPlaceholder: { flex: 1, marginLeft: 8, fontSize: 14, color: C.textSecondary },
  searchRight: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rxButton: { padding: 4 },
  cartButton: { padding: 4 },

  // Promo Banner
  promoBanner: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4 },
  promoLeft: { flex: 1 },
  promoTitle: { fontSize: 16, fontWeight: '700', color: C.textPrimary, lineHeight: 22 },
  promoOfferRow: { marginTop: 8 },
  promoOffer: { fontSize: 14, fontWeight: '700', color: C.primaryOrange },
  promoCodePill: { marginTop: 8, backgroundColor: '#FCE4EC', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start' },
  promoCode: { fontSize: 11, fontWeight: '700', color: '#C2185B' },
  promoRight: { flexDirection: 'row', alignItems: 'center' },
  promoIllustration: { marginRight: 8 },

  // Quick Actions
  quickActions: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, gap: 12 },
  quickActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, borderWidth: 1, borderColor: C.borderLight },
  quickActionIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  quickActionText: { fontSize: 12, fontWeight: '600', color: C.textPrimary, lineHeight: 16 },

  // Doctor Curated
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 12 },
  sectionSubtitle: { fontSize: 14, color: C.textSecondary, marginBottom: 12, marginTop: -8 },
  profileCirclesRow: { flexDirection: 'row', justifyContent: 'space-around' },
  profileCircleItem: { alignItems: 'center', width: 72 },
  profileCircle: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  profileLabel: { fontSize: 11, color: C.textSecondary, textAlign: 'center', lineHeight: 14 },

  // Offers
  offerCard: { width: 240, backgroundColor: '#FFF', borderRadius: 12, padding: 14, marginRight: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, borderWidth: 1, borderColor: C.borderLight },
  offerIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  offerText: { fontSize: 13, color: C.textPrimary, lineHeight: 18, marginBottom: 8 },
  offerCodeBadge: { backgroundColor: '#FFF3E0', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  offerCodeText: { fontSize: 11, fontWeight: '700', color: C.primaryOrange },

  // Most Booked
  mostBookedBanner: { flexDirection: 'row', backgroundColor: C.primaryOrange, borderRadius: 16, padding: 20, overflow: 'hidden' },
  mostBookedLeft: { flex: 1 },
  mostBookedPill: { backgroundColor: 'rgba(255,255,255,0.25)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 4, alignSelf: 'flex-start', marginBottom: 8 },
  mostBookedPillText: { fontSize: 10, fontWeight: '700', color: '#FFF', letterSpacing: 0.5 },
  mostBookedTitle: { fontSize: 20, fontWeight: '700', color: '#FFF', lineHeight: 26 },
  mostBookedCodeRow: { marginTop: 8 },
  mostBookedCode: { fontSize: 13, color: '#FFF', fontWeight: '600' },
  bookNowBtn: { marginTop: 12, backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8, alignSelf: 'flex-start' },
  bookNowText: { fontSize: 14, fontWeight: '700', color: C.primaryOrange },
  mostBookedRight: { justifyContent: 'center', alignItems: 'center', marginLeft: 10 },

  // Tax Saver Grid
  gridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  taxSaverCard: { width: (SCREEN_WIDTH - 42) / 3, backgroundColor: '#FFF', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: C.borderLight, elevation: 1 },
  taxSaverIconWrap: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  taxSaverName: { fontSize: 11, fontWeight: '600', color: C.textPrimary, lineHeight: 15, marginBottom: 2 },
  taxSaverTests: { fontSize: 10, color: C.textSecondary },

  // Offer Tiles
  offerTilesRow: { flexDirection: 'row', gap: 8 },
  offerTile: { flex: 1, borderRadius: 12, padding: 14, aspectRatio: 1, justifyContent: 'center', alignItems: 'center' },
  offerTileText: { fontSize: 14, fontWeight: '700', textAlign: 'center', lineHeight: 20 },

  // Legacy Strip
  legacyStrip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16, marginTop: 20, backgroundColor: '#FFFDE7' },
  legacyBadge: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.badgeGold, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  legacyBadgeText: { fontSize: 8, fontWeight: '700', color: '#FFF', textAlign: 'center' },
  legacyText: { fontSize: 14, color: C.textPrimary, flex: 1, lineHeight: 20 },

  // Video Thumbnails
  videoCard: { width: 140, marginRight: 12 },
  videoThumb: { width: 140, height: 100, borderRadius: 10, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  playIcon: { position: 'absolute', bottom: 4, right: 4 },
  videoTitle: { fontSize: 12, color: C.textPrimary, lineHeight: 16 },

  // ProHealth Banner
  proHealthBanner: { flexDirection: 'row', backgroundColor: C.darkNavy, borderRadius: 16, padding: 20, overflow: 'hidden' },
  proHealthLeft: { flex: 1 },
  proHealthTitle: { fontSize: 18, fontWeight: '700', color: '#FFF' },
  proHealthSub: { fontSize: 14, color: '#CCC', marginTop: 4, lineHeight: 20 },
  proHealthBookBtn: { marginTop: 12, backgroundColor: C.primaryOrange, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8, alignSelf: 'flex-start' },
  proHealthBookText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  proHealthRight: { justifyContent: 'center', alignItems: 'center', marginLeft: 10 },

  // Package Grid
  packageGridContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  packageCard: { width: (SCREEN_WIDTH - 42) / 2, backgroundColor: '#FFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: C.borderLight, elevation: 1 },
  packageBadge: { backgroundColor: '#E8F5E9', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 6 },
  packageBadgeText: { fontSize: 9, fontWeight: '700', color: '#2E7D32', letterSpacing: 0.3 },
  packageName: { fontSize: 13, fontWeight: '600', color: C.textPrimary, lineHeight: 18, marginBottom: 4 },
  packageTests: { fontSize: 11, color: C.textSecondary, marginBottom: 6 },
  packagePriceRow: { flexDirection: 'column' },
  packageOldPrice: { fontSize: 11, color: C.textSecondary, textDecorationLine: 'line-through' },
  packageNewPrice: { fontSize: 14, fontWeight: '700', color: C.primaryTeal },

  // Ask Apollo
  askApolloCard: { backgroundColor: C.bgBeige, borderRadius: 16, padding: 16 },
  askApolloHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  aiBadge: { backgroundColor: '#E0E0E0', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  aiBadgeText: { fontSize: 11, fontWeight: '700', color: C.textPrimary },
  askApolloSquare: { backgroundColor: C.primaryOrange, borderRadius: 8, padding: 8, width: 48, height: 48, justifyContent: 'center', alignItems: 'center' },
  askApolloSquareText: { fontSize: 11, fontWeight: '700', color: '#FFF', textAlign: 'center', lineHeight: 14 },
  askApolloTitle: { fontSize: 16, fontWeight: '700', color: C.textPrimary, lineHeight: 22, marginBottom: 8 },
  askApolloSubLabel: { fontSize: 10, fontWeight: '600', color: C.textSecondary, marginBottom: 8, letterSpacing: 0.5 },
  askApolloChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 12 },
  askApolloChipText: { flex: 1, fontSize: 13, color: C.primaryOrange },
  askApolloInput: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 24, paddingHorizontal: 14, paddingVertical: 10 },
  askApolloInputText: { flex: 1, fontSize: 14, color: C.textSecondary },

  // Trust Stats
  trustSection: { backgroundColor: '#E6F3FF', paddingHorizontal: 16, paddingVertical: 24, marginTop: 20, alignItems: 'center' },
  trustApollo: { fontSize: 24, fontWeight: '700', color: C.primaryTeal },
  trustSubtitle: { fontSize: 14, color: C.textSecondary, marginTop: 4, marginBottom: 20 },
  trustGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  trustItem: { width: (SCREEN_WIDTH - 64) / 2, alignItems: 'center', marginBottom: 8 },
  trustNumber: { fontSize: 16, fontWeight: '700', color: C.textPrimary, marginTop: 6 },
  trustLabel: { fontSize: 12, color: C.textSecondary, textAlign: 'center', lineHeight: 16, marginTop: 2 },

  // Certification
  certStrip: { paddingHorizontal: 16, paddingVertical: 20, alignItems: 'center' },
  certRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  certText: { fontSize: 13, color: C.textPrimary, marginLeft: 8, textAlign: 'center', lineHeight: 18 },
  certLogos: { flexDirection: 'row', gap: 16 },
  certLogo: { backgroundColor: '#F5F5F5', borderRadius: 6, paddingHorizontal: 12, paddingVertical: 6 },
  certLogoText: { fontSize: 11, fontWeight: '700', color: C.textSecondary },

  // Floating
  fab: { position: 'absolute', bottom: 80, right: 16, width: 56, height: 56, borderRadius: 28, backgroundColor: C.primaryOrange, justifyContent: 'center', alignItems: 'center', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.25, shadowRadius: 4 },
  goTopButton: { position: 'absolute', bottom: 80, alignSelf: 'center', left: SCREEN_WIDTH / 2 - 50, flexDirection: 'row', alignItems: 'center', backgroundColor: C.primaryTeal, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, elevation: 6, gap: 4 },
  goTopText: { fontSize: 12, fontWeight: '600', color: '#FFF' },
});
