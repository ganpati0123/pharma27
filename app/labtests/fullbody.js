import React, { useState, useCallback, memo, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const C = {
  primaryOrange: '#E05A2B',
  primaryTeal: '#006060',
  tealAccent: '#006B6B',
  textPrimary: '#1A1A1A',
  textSecondary: '#666666',
  bgWhite: '#FFFFFF',
  bgPeach: '#FCE5D7',
  bgLavender: '#F0E8FF',
  border: '#E0E0E0',
  borderLight: '#E8E8E8',
  badgeGold: '#F4C430',
};

// ─── HEADER ───
const FullBodyHeader = memo(() => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.headerBackBtn} accessibilityLabel="Go back">
      <Ionicons name="arrow-back" size={24} color={C.textPrimary} />
    </TouchableOpacity>
    <View style={{ flex: 1 }} />
    <TouchableOpacity style={styles.headerIconBtn} accessibilityLabel="Search">
      <Ionicons name="search" size={22} color={C.textPrimary} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.headerIconBtn} accessibilityLabel="Cart">
      <Ionicons name="cart-outline" size={22} color={C.textPrimary} />
    </TouchableOpacity>
  </View>
));

// ─── SECTION 1: HERO BANNER ───
const HeroBanner = memo(() => (
  <View style={styles.heroBanner}>
    <View style={styles.heroBadge}>
      <Text style={styles.heroBadgeText}>ULTIMATE HEALTH CHALLENGE</Text>
    </View>
    <Text style={styles.heroTitle}>100% Money Back{'\n'}on Full Body Check</Text>
    <Text style={styles.heroSubtitle}>If Your Report is 100% Normal</Text>
    <View style={styles.heroPill}>
      <Text style={styles.heroPillText}>1 Lakh+ Tests Booked | Same-day Lab Reports</Text>
    </View>
  </View>
));

// ─── SECTION 2: AGE-GENDER CIRCLES ───
const ageGenderProfiles = [
  { label: 'Man\n(18-45 Yrs)', icon: 'man', color: '#4A90D9' },
  { label: 'Women\n(18-45 Yrs)', icon: 'woman', color: '#E8A0BF' },
  { label: 'Sr. Men\n(>45 Yrs)', icon: 'man', color: '#7B8D9E' },
  { label: 'Sr. Women\n(>45 Yrs)', icon: 'woman', color: '#C9A0DC' },
];

const AgeGenderCircles = memo(() => (
  <View style={styles.sectionPadding}>
    <View style={styles.profileCirclesRow}>
      {ageGenderProfiles.map((p, i) => (
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

// ─── SECTION 3: QUICK ACTIONS ───
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
      <Text style={styles.quickActionText}>Order via{'\n'}Prescription</Text>
    </TouchableOpacity>
  </View>
));

// ─── SECTION 4: BEST-VALUE GRID ───
const bestValuePackages = [
  { badge: 'INCLUDES VIT B12', name: 'Full Body Health\nCheckup Gold', tests: '75 Tests', oldPrice: '₹3,200', newPrice: '₹2,080' },
  { badge: 'INCLUDES VIT D, B12', name: 'Full Body Checkup\nPlatinum', tests: '102 Tests', oldPrice: '₹5,998', newPrice: '₹3,894' },
];

const BestValueGrid = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Best-Value{'\n'}Full Body Checkups</Text>
    <View style={styles.packageRow}>
      {bestValuePackages.map((pkg, i) => (
        <TouchableOpacity key={i} style={styles.packageCard} accessibilityLabel={pkg.name}>
          <View style={styles.packageBadge}>
            <Text style={styles.packageBadgeText}>{pkg.badge}</Text>
          </View>
          <Text style={styles.packageName}>{pkg.name}</Text>
          <Text style={styles.packageTests}>{pkg.tests}</Text>
          <Text style={styles.packageOldPrice}>{pkg.oldPrice}</Text>
          <View style={styles.packagePriceRow}>
            <Text style={styles.packageNewPrice}>Now at {pkg.newPrice}</Text>
            <Ionicons name="chevron-forward" size={16} color={C.textSecondary} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

// ─── SECTION 5: TESTIMONIAL ───
const testimonials = [
  { text: 'Thank you for the seamless checkup experience. The process was well organized, and the staff was very supportive. I\'m fully satisfied with Apollo 24|7 Diagnostics', name: 'Bishal A' },
  { text: 'Great experience with Apollo. Reports were delivered on time and the collection process was smooth.', name: 'Rahul M' },
  { text: 'Very professional service. The home sample collection was convenient and reports came quickly.', name: 'Priya S' },
];

const TestimonialCard = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View style={styles.sectionPadding}>
      <Text style={styles.sectionTitle}>Hear From Users Who Got 100% Refund</Text>
      <View style={styles.testimonialCard}>
        <Text style={styles.testimonialText}>{testimonials[activeIndex].text}</Text>
        <View style={styles.testimonialDivider} />
        <View style={styles.testimonialAuthor}>
          <View style={styles.testimonialAvatar}>
            <Ionicons name="person-circle" size={36} color={C.primaryTeal} />
          </View>
          <Text style={styles.testimonialName}>{testimonials[activeIndex].name}</Text>
        </View>
      </View>
      <View style={styles.paginationDots}>
        {testimonials.map((_, i) => (
          <TouchableOpacity key={i} onPress={() => setActiveIndex(i)}>
            <View style={[styles.dot, activeIndex === i && styles.dotActive]} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

// ─── SECTION 6: BUY 1 GET 1 FREE GRID ───
const b1g1Packages = [
  { name: 'Apollo Ultimate\nWellness Checkup', tests: '98 Tests', oldPrice: '₹12,000', newPrice: '₹7,790' },
  { name: 'Apollo Exclusive\nHealth Checkup', tests: '71 Tests', oldPrice: '₹7,000', newPrice: '₹4,015' },
  { name: 'Apollo Total\nWellness Checkup', tests: '58 Tests', oldPrice: '₹4,500', newPrice: '₹2,159' },
  { name: 'Apollo India\nFull Health Screen', tests: '54 Tests', oldPrice: '₹3,500', newPrice: '₹2,089' },
];

const Buy1Get1Grid = memo(() => (
  <View style={styles.sectionPadding}>
    <Text style={styles.sectionTitle}>Buy 1 Get 1 Free on Full Body Packages</Text>
    <View style={styles.b1g1Grid}>
      {b1g1Packages.map((pkg, i) => (
        <TouchableOpacity key={i} style={styles.b1g1Card} accessibilityLabel={pkg.name}>
          <View style={styles.b1g1Badge}>
            <Text style={styles.b1g1BadgeText}>FOR 2 PATIENTS</Text>
          </View>
          <Text style={styles.b1g1Name}>{pkg.name}</Text>
          <Text style={styles.b1g1Tests}>Includes {pkg.tests}</Text>
          <Text style={styles.b1g1OldPrice}>{pkg.oldPrice}</Text>
          <View style={styles.b1g1PriceRow}>
            <Text style={styles.b1g1NewPrice}>Now at {pkg.newPrice}</Text>
            <Ionicons name="chevron-forward" size={16} color={C.textSecondary} />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  </View>
));

// ─── SECTION 7: COUPON STRIP ───
const coupons = [
  { code: 'DIS20', text: 'FLAT 10% OFF on order above Rs. 2000' },
  { code: 'SAVE30', text: 'FLAT 15% OFF on order above Rs. 3000' },
  { code: 'MEGA50', text: 'FLAT 20% OFF on order above Rs. 5000' },
];

const CouponStrip = memo(() => (
  <View style={styles.sectionPadding}>
    <FlatList
      horizontal
      data={coupons}
      renderItem={({ item }) => (
        <View style={styles.couponCard}>
          <Text style={styles.couponCode}>{item.code}</Text>
          <View style={styles.couponDivider} />
          <Text style={styles.couponText}>{item.text}</Text>
        </View>
      )}
      keyExtractor={(_, i) => `coupon-${i}`}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 16 }}
    />
  </View>
));

// ─── SECTION 8: FAMILY SAVINGS BANNER ───
const FamilySavingsBanner = memo(() => (
  <View style={styles.sectionPadding}>
    <View style={styles.familyBanner}>
      <View style={styles.familyBannerLeft}>
        <Text style={styles.familyBannerTitle}>Bigger Savings on{'\n'}Full Body Checks!</Text>
        <Text style={styles.familyBannerSub}>Book for 2+ Members{'\n'}and Save More</Text>
        <View style={styles.familyCodeRow}>
          <Text style={styles.familyCode}>Code: FAMILY</Text>
        </View>
        <TouchableOpacity style={styles.familyBookBtn}>
          <Text style={styles.familyBookText}>Book Now</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.familyBannerRight}>
        <Ionicons name="people" size={50} color={C.primaryTeal} />
        <View style={styles.familyCallout}>
          <Text style={styles.familyCalloutText}>Smart Report</Text>
        </View>
        <View style={styles.familyCallout}>
          <Text style={styles.familyCalloutText}>100% Refund</Text>
        </View>
      </View>
    </View>
  </View>
));

// ─── SECTION 9: BUY 1 GET 1 STRIP BANNER ───
const Buy1Get1StripBanner = memo(() => (
  <View style={styles.sectionPadding}>
    <TouchableOpacity style={styles.b1g1StripBanner}>
      <View style={styles.b1g1StripBadge}>
        <Text style={styles.b1g1StripBadgeText}>BUY 1 GET 1{'\n'}FREE</Text>
      </View>
      <View style={styles.b1g1StripContent}>
        <Text style={styles.b1g1StripTitle}>Add 2 Apollo Full Body Checkup &</Text>
        <Text style={styles.b1g1StripSub}>Pay Only for 1 <Text style={{ fontWeight: '700' }}>Code: BUY1GET1</Text></Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={C.textPrimary} />
    </TouchableOpacity>
  </View>
));

// ─── SECTION 10: VIDEO THUMBNAILS ───
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

// ─── SECTION 11: OFFER TERMS ACCORDION ───
const offerTerms = [
  { title: 'Offer Eligibility', content: '' },
  { title: 'Refund Criteria', content: '' },
  { title: 'Refund Process', content: '1. If your full body checkup report comes back 100% normal, you are eligible for a complete refund.\n\n2. The refund will be processed within 7-10 business days after verification.\n\n3. You need to submit your refund request through the Apollo 24|7 app within 30 days of receiving your report.\n\n4. The refund will be credited to your original payment method.' },
  { title: 'Offer Limitations', content: '' },
  { title: 'Dispute Resolution', content: '' },
];

const OfferTermsAccordion = memo(() => {
  const [expandedIndex, setExpandedIndex] = useState(2);

  return (
    <View style={styles.sectionPadding}>
      <Text style={styles.sectionTitle}>Offer Terms & Conditions</Text>
      {offerTerms.map((term, i) => (
        <TouchableOpacity
          key={i}
          style={styles.accordionItem}
          onPress={() => setExpandedIndex(expandedIndex === i ? -1 : i)}
          accessibilityLabel={term.title}
        >
          <View style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>{term.title}</Text>
            <Ionicons
              name={expandedIndex === i ? 'chevron-up' : 'chevron-down'}
              size={20}
              color={C.textSecondary}
            />
          </View>
          {expandedIndex === i && term.content ? (
            <Text style={styles.accordionContent}>{term.content}</Text>
          ) : null}
        </TouchableOpacity>
      ))}
    </View>
  );
});

// ─── SECTION 12: WHY BOOK WITH US ───
const WhyBookWithUs = memo(() => (
  <View style={styles.whyBookSection}>
    <Text style={styles.whyBookTitle}>Why book with us</Text>
    <View style={styles.whyBookGrid}>
      <View style={styles.whyBookItem}>
        <Ionicons name="flask" size={24} color={C.primaryTeal} />
        <Text style={styles.whyBookNumber}>5 Million</Text>
        <Text style={styles.whyBookLabel}>High quality annual{'\n'}diagnostics tests</Text>
      </View>
      <View style={styles.whyBookItem}>
        <Ionicons name="business" size={24} color={C.primaryTeal} />
        <Text style={styles.whyBookNumber}>120+</Text>
        <Text style={styles.whyBookLabel}>Laboratories{'\n'}across the country</Text>
      </View>
      <View style={styles.whyBookItem}>
        <View style={styles.legacyBadge}>
          <Text style={styles.legacyBadgeText}>38{'\n'}Yrs</Text>
        </View>
        <Text style={styles.whyBookNumber}>38 Years</Text>
        <Text style={styles.whyBookLabel}>of Apollo's{'\n'}healthcare legacy</Text>
      </View>
      <View style={styles.whyBookItem}>
        <Ionicons name="location" size={24} color={C.primaryTeal} />
        <Text style={styles.whyBookNumber}>1200+</Text>
        <Text style={styles.whyBookLabel}>Collection centres{'\n'}across 40+ cities</Text>
      </View>
    </View>
  </View>
));

// ─── SECTION 13: CERTIFICATION STRIP ───
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
export default function FullBody() {
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
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <ScrollView
        ref={scrollRef}
        style={styles.container}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <FullBodyHeader />
        <HeroBanner />
        <AgeGenderCircles />
        <QuickActions />
        <BestValueGrid />
        <TestimonialCard />
        <Buy1Get1Grid />
        <CouponStrip />
        <FamilySavingsBanner />
        <Buy1Get1StripBanner />
        <VideoThumbnails />
        <OfferTermsAccordion />
        <WhyBookWithUs />
        <CertificationStrip />
        <View style={{ height: 80 }} />
      </ScrollView>
      <FloatingElements showGoTop={showGoTop} onGoTop={scrollToTop} />
    </SafeAreaView>
  );
}

// ─── STYLES ───
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFF' },
  container: { flex: 1, backgroundColor: '#FFF' },
  sectionPadding: { paddingHorizontal: 16, marginTop: 20 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFF', borderBottomWidth: 1, borderBottomColor: '#E8E8E8' },
  headerBackBtn: { padding: 4 },
  headerIconBtn: { padding: 8 },

  // Hero Banner
  heroBanner: { backgroundColor: C.bgPeach, paddingHorizontal: 16, paddingVertical: 24, alignItems: 'flex-start' },
  heroBadge: { backgroundColor: '#7B2FF7', borderRadius: 4, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 12 },
  heroBadgeText: { fontSize: 10, fontWeight: '700', color: '#FFF', letterSpacing: 0.5 },
  heroTitle: { fontSize: 22, fontWeight: '700', color: C.textPrimary, lineHeight: 28 },
  heroSubtitle: { fontSize: 14, color: C.textSecondary, marginTop: 4 },
  heroPill: { marginTop: 12, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 6 },
  heroPillText: { fontSize: 11, color: C.textSecondary },

  // Profile Circles
  profileCirclesRow: { flexDirection: 'row', justifyContent: 'space-around' },
  profileCircleItem: { alignItems: 'center', width: 72 },
  profileCircle: { width: 64, height: 64, borderRadius: 32, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  profileLabel: { fontSize: 11, color: C.textSecondary, textAlign: 'center', lineHeight: 14 },

  // Quick Actions
  quickActions: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 16, gap: 12 },
  quickActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderRadius: 12, padding: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.08, shadowRadius: 4, borderWidth: 1, borderColor: '#E8E8E8' },
  quickActionIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  quickActionText: { fontSize: 12, fontWeight: '600', color: C.textPrimary, lineHeight: 16 },

  // Section Title
  sectionTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, marginBottom: 12 },

  // Package Cards
  packageRow: { flexDirection: 'row', gap: 10 },
  packageCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E8E8E8', elevation: 1 },
  packageBadge: { backgroundColor: '#E8F5E9', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 6 },
  packageBadgeText: { fontSize: 9, fontWeight: '700', color: '#2E7D32', letterSpacing: 0.3 },
  packageName: { fontSize: 13, fontWeight: '600', color: C.textPrimary, lineHeight: 18, marginBottom: 4 },
  packageTests: { fontSize: 11, color: C.textSecondary, marginBottom: 6 },
  packageOldPrice: { fontSize: 11, color: C.textSecondary, textDecorationLine: 'line-through' },
  packagePriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  packageNewPrice: { fontSize: 14, fontWeight: '700', color: C.primaryTeal },

  // Testimonial
  testimonialCard: { backgroundColor: '#FFF', borderRadius: 12, padding: 16, borderWidth: 1, borderColor: '#E8E8E8', elevation: 1 },
  testimonialText: { fontSize: 14, color: C.textPrimary, lineHeight: 20, fontStyle: 'italic' },
  testimonialDivider: { height: 1, backgroundColor: '#E8E8E8', marginVertical: 12 },
  testimonialAuthor: { flexDirection: 'row', alignItems: 'center' },
  testimonialAvatar: { marginRight: 8 },
  testimonialName: { fontSize: 14, fontWeight: '600', color: C.textPrimary },
  paginationDots: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#E0E0E0' },
  dotActive: { backgroundColor: C.primaryTeal, width: 20 },

  // B1G1 Grid
  b1g1Grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  b1g1Card: { width: (SCREEN_WIDTH - 42) / 2, backgroundColor: '#FFF', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E8E8E8', elevation: 1 },
  b1g1Badge: { backgroundColor: '#FCE5D7', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, alignSelf: 'flex-start', marginBottom: 6 },
  b1g1BadgeText: { fontSize: 9, fontWeight: '700', color: C.primaryOrange, letterSpacing: 0.3 },
  b1g1Name: { fontSize: 13, fontWeight: '600', color: C.textPrimary, lineHeight: 18, marginBottom: 4 },
  b1g1Tests: { fontSize: 11, color: C.textSecondary, marginBottom: 6 },
  b1g1OldPrice: { fontSize: 11, color: C.textSecondary, textDecorationLine: 'line-through' },
  b1g1PriceRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 },
  b1g1NewPrice: { fontSize: 14, fontWeight: '700', color: C.primaryTeal },

  // Coupon
  couponCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FCE4EC', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, marginRight: 12, minWidth: 260 },
  couponCode: { fontSize: 14, fontWeight: '700', color: '#C2185B' },
  couponDivider: { width: 1, height: 30, backgroundColor: '#E0B0BF', marginHorizontal: 12 },
  couponText: { fontSize: 12, color: C.textPrimary, flex: 1 },

  // Family Banner
  familyBanner: { flexDirection: 'row', backgroundColor: C.bgPeach, borderRadius: 16, padding: 16, overflow: 'hidden' },
  familyBannerLeft: { flex: 1 },
  familyBannerTitle: { fontSize: 18, fontWeight: '700', color: C.textPrimary, lineHeight: 24 },
  familyBannerSub: { fontSize: 13, color: C.textSecondary, marginTop: 4, lineHeight: 18 },
  familyCodeRow: { marginTop: 8 },
  familyCode: { fontSize: 12, fontWeight: '700', color: C.primaryOrange },
  familyBookBtn: { marginTop: 10, backgroundColor: C.primaryTeal, borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8, alignSelf: 'flex-start' },
  familyBookText: { fontSize: 14, fontWeight: '700', color: '#FFF' },
  familyBannerRight: { alignItems: 'center', justifyContent: 'center', marginLeft: 10 },
  familyCallout: { backgroundColor: '#FFF', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginTop: 6 },
  familyCalloutText: { fontSize: 10, fontWeight: '600', color: C.primaryTeal },

  // B1G1 Strip Banner
  b1g1StripBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.bgLavender, borderRadius: 12, padding: 14 },
  b1g1StripBadge: { backgroundColor: '#7B2FF7', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6, marginRight: 12 },
  b1g1StripBadgeText: { fontSize: 11, fontWeight: '700', color: '#FFF', textAlign: 'center', lineHeight: 16 },
  b1g1StripContent: { flex: 1 },
  b1g1StripTitle: { fontSize: 13, color: C.textPrimary },
  b1g1StripSub: { fontSize: 12, color: C.textSecondary, marginTop: 2 },

  // Video
  videoCard: { width: 140, marginRight: 12 },
  videoThumb: { width: 140, height: 100, borderRadius: 10, backgroundColor: '#E0F2F1', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  playIcon: { position: 'absolute', bottom: 4, right: 4 },
  videoTitle: { fontSize: 12, color: C.textPrimary, lineHeight: 16 },

  // Accordion
  accordionItem: { borderBottomWidth: 1, borderBottomColor: '#E8E8E8', paddingVertical: 14 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  accordionTitle: { fontSize: 14, fontWeight: '600', color: C.textPrimary },
  accordionContent: { fontSize: 13, color: C.textSecondary, marginTop: 10, lineHeight: 20 },

  // Why Book
  whyBookSection: { backgroundColor: C.bgLavender, paddingHorizontal: 16, paddingVertical: 24, marginTop: 20, alignItems: 'center' },
  whyBookTitle: { fontSize: 20, fontWeight: '700', color: C.textPrimary, marginBottom: 20 },
  whyBookGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, justifyContent: 'center' },
  whyBookItem: { width: (SCREEN_WIDTH - 64) / 2, alignItems: 'center', marginBottom: 8 },
  whyBookNumber: { fontSize: 16, fontWeight: '700', color: C.textPrimary, marginTop: 6 },
  whyBookLabel: { fontSize: 12, color: C.textSecondary, textAlign: 'center', lineHeight: 16, marginTop: 2 },
  legacyBadge: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F4C430', justifyContent: 'center', alignItems: 'center' },
  legacyBadgeText: { fontSize: 6, fontWeight: '700', color: '#FFF', textAlign: 'center' },

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
