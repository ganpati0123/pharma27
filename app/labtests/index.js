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
