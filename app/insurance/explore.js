import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, TextInput, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInsuranceStore, INSURANCE_PLANS, INSURANCE_CATEGORIES, SPECIAL_OFFERS, EXPERTS, REVIEWS } from '../components/insurance/store';
import SectionHeader from '../components/insurance/shared/SectionHeader';
import AnimatedCard from '../components/insurance/shared/AnimatedCard';
import { SkeletonSection, SkeletonGrid } from '../components/insurance/shared/SkeletonLoader';
import FadeInSection from '../components/insurance/shared/FadeInSection';
import useTheme from '../components/insurance/shared/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============== STAR RATING ==============
const StarRating = ({ rating, size = 14, color = '#FFB800' }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Ionicons key={i} name={i <= rating ? 'star' : 'star-outline'} size={size} color={color} />
    ))}
  </View>
);

export default function Explore() {
  const store = useInsuranceStore();
  const { isDarkMode, colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 900);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1500);
  }, []);

  // ============== SECTION 1: DISCOVER HEADER ==============
  const renderHeader = () => (
    <LinearGradient colors={['#3498DB', '#2980B9', '#1A5276']} style={s.headerGradient}>
      <SafeAreaView edges={['top']}>
        <View style={s.headerContent}>
          <Text style={s.headerTitle}>Explore</Text>
          <Text style={s.headerSubtitle}>Discover the perfect insurance plan for you</Text>
        </View>
        <View style={s.searchContainer}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            style={s.searchInput}
            placeholder="Search plans, insurers, benefits..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={s.voiceBtn}>
            <Ionicons name="mic" size={18} color="#3498DB" />
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.recentSearches}>
          {['Health Plans', 'Family Cover', 'Critical Illness', 'Senior Plans'].map((term, i) => (
            <TouchableOpacity key={i} style={s.recentChip}>
              <Ionicons name="time-outline" size={12} color="#fff" />
              <Text style={s.recentChipText}>{term}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );

  // ============== SECTION 2: TRENDING POLICIES ==============
  const renderTrending = () => (
    <View style={s.trendingSection}>
      <SectionHeader title="Trending Policies" subtitle="Most popular right now" icon="trending-up" iconColor="#E74C3C" actionText="View All" onAction={() => {}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.trendingScroll}>
        {INSURANCE_PLANS.slice(0, 4).map((plan, i) => (
          <AnimatedCard key={plan.id} style={s.trendingCard} delay={i * 80}>
            <View style={s.trendingBadge}>
              <Ionicons name="flame" size={12} color="#E74C3C" />
              <Text style={s.trendingBadgeText}>#{i + 1} Trending</Text>
            </View>
            <Text style={s.trendingName} numberOfLines={1}>{plan.name}</Text>
            <Text style={s.trendingInsurer}>{plan.insurer}</Text>
            <View style={s.trendingStats}>
              <View style={s.trendingStat}>
                <Text style={s.trendingStatValue}>{plan.coverage}</Text>
                <Text style={s.trendingStatLabel}>Cover</Text>
              </View>
              <View style={s.trendingDivider} />
              <View style={s.trendingStat}>
                <Text style={s.trendingStatValue}>{plan.premium}</Text>
                <Text style={s.trendingStatLabel}>Premium</Text>
              </View>
            </View>
            <View style={s.trendingPopularity}>
              <Ionicons name="people" size={12} color="#FF6B35" />
              <Text style={s.trendingPopText}>{Math.floor(Math.random() * 5000) + 1000} users this month</Text>
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 3: NEW LAUNCHES ==============
  const renderNewLaunches = () => (
    <View style={s.newSection}>
      <SectionHeader title="New Launches" subtitle="Recently launched plans" icon="sparkles" iconColor="#9B59B6" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.newScroll}>
        {[
          { name: 'Apollo ProHealth Plus', insurer: 'Apollo Munich', cover: '25L', premium: 'Rs 899/mo', tag: 'Just Launched', color: '#9B59B6' },
          { name: 'Care Advantage 2026', insurer: 'Care Health', cover: '50L', premium: 'Rs 1,199/mo', tag: 'New', color: '#FF6B35' },
          { name: 'Star Young India', insurer: 'Star Health', cover: '10L', premium: 'Rs 499/mo', tag: 'Introductory', color: '#2ECC71' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.newCard} delay={i * 100}>
            <View style={[s.newTag, { backgroundColor: item.color }]}>
              <Text style={s.newTagText}>{item.tag}</Text>
            </View>
            <View style={s.newIconBg}>
              <Ionicons name="shield-checkmark" size={28} color={item.color} />
            </View>
            <Text style={s.newName}>{item.name}</Text>
            <Text style={s.newInsurer}>{item.insurer}</Text>
            <View style={s.newPricing}>
              <Text style={s.newCover}>{item.cover} Cover</Text>
              <Text style={s.newPremium}>{item.premium}</Text>
            </View>
            <TouchableOpacity style={[s.newBtn, { backgroundColor: item.color }]}>
              <Text style={s.newBtnText}>Explore</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 4: CATEGORY EXPLORER ==============
  const renderCategoryExplorer = () => (
    <View style={s.categorySection}>
      <SectionHeader title="Browse by Category" subtitle="Find what suits you" icon="grid" iconColor="#FF6B35" />
      <View style={s.categoryGrid}>
        {INSURANCE_CATEGORIES.map((cat, i) => (
          <AnimatedCard key={cat.id} style={s.categoryCard} delay={i * 40}>
            <LinearGradient colors={cat.gradient} style={s.categoryGradient}>
              <Ionicons name={cat.icon} size={22} color="#fff" />
            </LinearGradient>
            <Text style={s.categoryName}>{cat.name}</Text>
            <Text style={s.categoryCount}>{cat.count} plans</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 5: PRICE DROP ALERTS ==============
  const renderPriceDrops = () => (
    <View style={s.priceDropSection}>
      <SectionHeader title="Price Drop Alerts" subtitle="Save more on premiums" icon="pricetag" iconColor="#2ECC71" actionText="Set Alert" onAction={() => {}} />
      {[
        { name: 'Care Advantage', oldPrice: 'Rs 15,000/yr', newPrice: 'Rs 12,750/yr', drop: '15%', insurer: 'Care Health' },
        { name: 'Star Comprehensive', oldPrice: 'Rs 18,000/yr', newPrice: 'Rs 16,200/yr', drop: '10%', insurer: 'Star Health' },
        { name: 'Niva Platinum', oldPrice: 'Rs 22,000/yr', newPrice: 'Rs 18,700/yr', drop: '15%', insurer: 'Niva Bupa' },
      ].map((item, i) => (
        <AnimatedCard key={i} style={s.priceDropCard} delay={i * 80}>
          <View style={s.priceDropLeft}>
            <View style={s.priceDropIcon}>
              <Ionicons name="shield-checkmark" size={20} color="#FF6B35" />
            </View>
            <View style={s.priceDropInfo}>
              <Text style={s.priceDropName}>{item.name}</Text>
              <Text style={s.priceDropInsurer}>{item.insurer}</Text>
              <View style={s.priceDropPrices}>
                <Text style={s.priceDropOld}>{item.oldPrice}</Text>
                <Text style={s.priceDropNew}>{item.newPrice}</Text>
              </View>
            </View>
          </View>
          <View style={s.priceDropBadge}>
            <Ionicons name="arrow-down" size={12} color="#2ECC71" />
            <Text style={s.priceDropPercent}>{item.drop}</Text>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 6: MOST CLAIMED ==============
  const renderMostClaimed = () => (
    <View style={s.claimedSection}>
      <SectionHeader title="Most Claimed Policies" subtitle="High claim success rate" icon="checkmark-done" iconColor="#4CAF50" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.claimedScroll}>
        {[
          { name: 'Star Comprehensive', ratio: '96%', claims: '2.5L+', icon: 'star', color: '#FFB800' },
          { name: 'Care Health Active', ratio: '94%', claims: '1.8L+', icon: 'heart', color: '#E74C3C' },
          { name: 'Niva Bupa Health', ratio: '92%', claims: '1.2L+', icon: 'shield', color: '#3498DB' },
          { name: 'ICICI Lombard', ratio: '91%', claims: '2.1L+', icon: 'business', color: '#9B59B6' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.claimedCard} delay={i * 80}>
            <View style={[s.claimedIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={s.claimedName}>{item.name}</Text>
            <View style={s.claimedStats}>
              <Text style={s.claimedRatio}>{item.ratio}</Text>
              <Text style={s.claimedLabel}>Claim Ratio</Text>
            </View>
            <Text style={s.claimedCount}>{item.claims} claims settled</Text>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 7: BEST SELLERS ==============
  const renderBestSellers = () => (
    <View style={s.bestSection}>
      <SectionHeader title="Best Sellers" subtitle="Top 10 policies this month" icon="trophy" iconColor="#FFB800" />
      {INSURANCE_PLANS.slice(0, 5).map((plan, i) => (
        <AnimatedCard key={plan.id} style={s.bestCard} delay={i * 60}>
          <View style={s.bestRank}>
            <Text style={s.bestRankText}>#{i + 1}</Text>
          </View>
          <View style={s.bestInfo}>
            <Text style={s.bestName} numberOfLines={1}>{plan.name}</Text>
            <Text style={s.bestInsurer}>{plan.insurer}</Text>
          </View>
          <View style={s.bestRight}>
            <Text style={s.bestPremium}>{plan.premium}</Text>
            <Text style={s.bestCover}>{plan.coverage}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 8: EXPERT PICKS ==============
  const renderExpertPicks = () => (
    <View style={s.expertSection}>
      <SectionHeader title="Expert Picks" subtitle="Curated by insurance experts" icon="school" iconColor="#9B59B6" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.expertScroll}>
        {EXPERTS.map((expert, i) => (
          <AnimatedCard key={expert.id} style={s.expertCard} delay={i * 100}>
            <View style={s.expertAvatar}>
              <Ionicons name="person" size={24} color="#9B59B6" />
            </View>
            <Text style={s.expertName}>{expert.name}</Text>
            <Text style={s.expertSpecialty}>{expert.specialty}</Text>
            <View style={s.expertPick}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={s.expertPickText}>Top Pick: {INSURANCE_PLANS[i % INSURANCE_PLANS.length]?.name?.split(' ')[0] || 'Care'} Plan</Text>
            </View>
            <TouchableOpacity style={s.expertBtn}>
              <Text style={s.expertBtnText}>View Picks</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 9: SEASONAL OFFERS ==============
  const renderSeasonalOffers = () => (
    <View style={s.seasonalSection}>
      <SectionHeader title="Seasonal Offers" subtitle="Limited time deals" icon="gift" iconColor="#E74C3C" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.seasonalScroll}>
        {SPECIAL_OFFERS.map((offer, i) => (
          <AnimatedCard key={offer.id} style={[s.seasonalCard, { borderLeftColor: offer.color }]} delay={i * 80}>
            <View style={[s.seasonalBadge, { backgroundColor: offer.color }]}>
              <Text style={s.seasonalBadgeText}>{offer.discount} OFF</Text>
            </View>
            <Text style={s.seasonalTitle}>{offer.title}</Text>
            <Text style={s.seasonalDesc}>{offer.description}</Text>
            <View style={s.seasonalCodeRow}>
              <View style={s.seasonalCode}>
                <Text style={s.seasonalCodeText}>{offer.code}</Text>
              </View>
              <TouchableOpacity style={[s.seasonalApply, { backgroundColor: offer.color }]}>
                <Text style={s.seasonalApplyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 10: COMBOS & BUNDLES ==============
  const renderCombos = () => (
    <View style={s.combosSection}>
      <SectionHeader title="Combos & Bundles" subtitle="Save with multi-policy discounts" icon="layers" iconColor="#FF6B35" />
      {[
        { name: 'Family Shield Bundle', plans: 'Health + Life + Accident', savings: 'Save Rs 4,500', discount: '20%', color: '#FF6B35' },
        { name: 'Complete Protection', plans: 'Health + Critical Illness + Top-Up', savings: 'Save Rs 3,200', discount: '15%', color: '#3498DB' },
        { name: 'Senior Care Package', plans: 'Health + Super Top-Up + Wellness', savings: 'Save Rs 5,800', discount: '25%', color: '#4CAF50' },
      ].map((combo, i) => (
        <AnimatedCard key={i} style={s.comboCard} delay={i * 80}>
          <View style={s.comboHeader}>
            <View style={[s.comboIcon, { backgroundColor: combo.color + '15' }]}>
              <Ionicons name="layers" size={22} color={combo.color} />
            </View>
            <View style={s.comboInfo}>
              <Text style={s.comboName}>{combo.name}</Text>
              <Text style={s.comboPlans}>{combo.plans}</Text>
            </View>
            <View style={[s.comboBadge, { backgroundColor: combo.color }]}>
              <Text style={s.comboBadgeText}>{combo.discount}</Text>
            </View>
          </View>
          <View style={s.comboFooter}>
            <Text style={s.comboSavings}>{combo.savings}</Text>
            <TouchableOpacity style={[s.comboBtn, { borderColor: combo.color }]}>
              <Text style={[s.comboBtnText, { color: combo.color }]}>View Bundle</Text>
            </TouchableOpacity>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 11: CUSTOMER FAVORITES ==============
  const renderFavorites = () => (
    <View style={s.favSection}>
      <SectionHeader title="Customer Favorites" subtitle="Highest rated policies" icon="heart" iconColor="#E74C3C" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.favScroll}>
        {REVIEWS.slice(0, 4).map((review, i) => (
          <AnimatedCard key={review.id} style={s.favCard} delay={i * 80}>
            <View style={s.favRatingRow}>
              <StarRating rating={review.rating} size={12} />
              <Text style={s.favRatingText}>{review.rating}/5</Text>
            </View>
            <Text style={s.favPlan}>{review.plan}</Text>
            <Text style={s.favComment} numberOfLines={3}>{review.comment}</Text>
            <View style={s.favUser}>
              <View style={s.favAvatar}>
                <Text style={s.favAvatarText}>{review.user[0]}</Text>
              </View>
              <Text style={s.favUserName}>{review.user}</Text>
              {review.verified && <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />}
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 12: RECENTLY VIEWED ==============
  const renderRecentlyViewed = () => (
    <View style={s.recentSection}>
      <SectionHeader title="Recently Viewed" subtitle="Continue where you left off" icon="time" iconColor="#F39C12" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.recentViewedScroll}>
        {INSURANCE_PLANS.slice(0, 3).map((plan, i) => (
          <AnimatedCard key={plan.id} style={s.recentViewedCard} delay={i * 80}>
            <View style={s.recentViewedIcon}>
              <Ionicons name="shield-checkmark" size={20} color="#FF6B35" />
            </View>
            <Text style={s.recentViewedName} numberOfLines={1}>{plan.name}</Text>
            <Text style={s.recentViewedInsurer}>{plan.insurer}</Text>
            <Text style={s.recentViewedPremium}>{plan.premium}</Text>
            <TouchableOpacity style={s.recentViewedBtn}>
              <Text style={s.recentViewedBtnText}>Continue</Text>
              <Ionicons name="arrow-forward" size={12} color="#FF6B35" />
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 13: TRENDING SEARCHES ==============
  const renderTrendingSearches = () => (
    <View style={s.trendSearchSection}>
      <SectionHeader title="Trending Searches" subtitle="Popular keywords" icon="search" iconColor="#3498DB" />
      <View style={s.trendSearchGrid}>
        {[
          { term: 'Family floater', count: '12K+ searches', hot: true },
          { term: 'Maternity cover', count: '8K+ searches', hot: true },
          { term: 'Senior citizen', count: '6K+ searches', hot: false },
          { term: 'Critical illness', count: '5K+ searches', hot: false },
          { term: 'Cashless hospitals', count: '4K+ searches', hot: false },
          { term: 'No waiting period', count: '3K+ searches', hot: false },
          { term: 'Pre-existing cover', count: '2K+ searches', hot: false },
          { term: 'Day care procedures', count: '1.5K+ searches', hot: false },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={s.trendSearchChip}>
            {item.hot && <Ionicons name="flame" size={12} color="#E74C3C" />}
            <Text style={s.trendSearchText}>{item.term}</Text>
            <Text style={s.trendSearchCount}>{item.count}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 14: DISCOVER MORE ==============
  const renderDiscoverMore = () => (
    <View style={s.discoverSection}>
      <SectionHeader title="Discover More" subtitle="AI-powered recommendations" icon="bulb" iconColor="#FF6B35" />
      <View style={s.discoverGrid}>
        {[
          { title: 'Plans for Young\nProfessionals', desc: 'Age 25-35', icon: 'briefcase', color: '#3498DB' },
          { title: 'Family\nProtection', desc: 'All members covered', icon: 'people', color: '#4CAF50' },
          { title: 'Retirement\nPlanning', desc: 'Post-retirement cover', icon: 'umbrella', color: '#FF6B35' },
          { title: 'Women\'s\nHealth', desc: 'Maternity & more', icon: 'woman', color: '#9B59B6' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.discoverCard} delay={i * 80}>
            <LinearGradient colors={[item.color + '20', item.color + '05']} style={s.discoverGradient}>
              <View style={[s.discoverIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon} size={24} color={item.color} />
              </View>
              <Text style={s.discoverTitle}>{item.title}</Text>
              <Text style={s.discoverDesc}>{item.desc}</Text>
            </LinearGradient>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 15: FOOTER ==============
  const renderFooter = () => (
    <View style={s.footerSection}>
      <LinearGradient colors={['#3498DB', '#1A5276']} style={s.footerGradient}>
        <Text style={s.footerTitle}>Can't decide?</Text>
        <Text style={s.footerSubtitle}>Talk to our insurance expert for free</Text>
        <TouchableOpacity style={s.footerBtn}>
          <Ionicons name="call" size={16} color="#3498DB" />
          <Text style={s.footerBtnText}>Get Expert Advice</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  // ============== SKELETON ==============
  if (isLoading) {
    return (
      <View style={[s.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#3498DB'} />
        <View style={{ backgroundColor: isDarkMode ? colors.surface : '#3498DB', height: 180 }} />
        <View style={{ padding: 16 }}>
          <SkeletonSection />
          <SkeletonGrid />
          <SkeletonSection />
        </View>
      </View>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#3498DB'} />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3498DB" colors={['#3498DB']} />}
      >
        {renderHeader()}
        <FadeInSection delay={100}>{renderTrending()}</FadeInSection>
        <FadeInSection delay={150}>{renderNewLaunches()}</FadeInSection>
        <FadeInSection delay={200}>{renderCategoryExplorer()}</FadeInSection>
        <FadeInSection delay={250}>{renderPriceDrops()}</FadeInSection>
        <FadeInSection delay={300}>{renderMostClaimed()}</FadeInSection>
        <FadeInSection delay={350}>{renderBestSellers()}</FadeInSection>
        <FadeInSection delay={400}>{renderExpertPicks()}</FadeInSection>
        <FadeInSection delay={450}>{renderSeasonalOffers()}</FadeInSection>
        <FadeInSection delay={500}>{renderCombos()}</FadeInSection>
        <FadeInSection delay={550}>{renderFavorites()}</FadeInSection>
        <FadeInSection delay={600}>{renderRecentlyViewed()}</FadeInSection>
        <FadeInSection delay={650}>{renderTrendingSearches()}</FadeInSection>
        <FadeInSection delay={700}>{renderDiscoverMore()}</FadeInSection>
        {renderFooter()}
        <View style={{ height: 20 }} />
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header
  headerGradient: { paddingBottom: 16 },
  headerContent: { paddingHorizontal: 16, paddingTop: 12 },
  headerTitle: { color: '#fff', fontSize: 28, fontWeight: '800' },
  headerSubtitle: { color: '#D6EAF8', fontSize: 13, marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, borderRadius: 12, paddingHorizontal: 14, height: 44, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A2E' },
  voiceBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  recentSearches: { marginTop: 12, paddingHorizontal: 16 },
  recentChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginRight: 8 },
  recentChipText: { color: '#fff', fontSize: 12, fontWeight: '500' },

  // Trending
  trendingSection: { paddingVertical: 8 },
  trendingScroll: { paddingHorizontal: 16 },
  trendingCard: { width: 200, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  trendingBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  trendingBadgeText: { fontSize: 11, fontWeight: '700', color: '#E74C3C' },
  trendingName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  trendingInsurer: { fontSize: 11, color: '#666', marginTop: 2 },
  trendingStats: { flexDirection: 'row', marginTop: 10, gap: 12 },
  trendingStat: { flex: 1 },
  trendingStatValue: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },
  trendingStatLabel: { fontSize: 10, color: '#999' },
  trendingDivider: { width: 1, backgroundColor: '#F0F0F0' },
  trendingPopularity: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  trendingPopText: { fontSize: 10, color: '#666' },

  // New Launches
  newSection: { paddingVertical: 8 },
  newScroll: { paddingHorizontal: 16 },
  newCard: { width: 180, backgroundColor: '#fff', borderRadius: 16, padding: 16, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  newTag: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, marginBottom: 10, alignSelf: 'flex-start' },
  newTagText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  newIconBg: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  newName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  newInsurer: { fontSize: 11, color: '#666', marginTop: 2 },
  newPricing: { alignItems: 'center', marginTop: 8 },
  newCover: { fontSize: 12, fontWeight: '600', color: '#FF6B35' },
  newPremium: { fontSize: 11, color: '#666', marginTop: 2 },
  newBtn: { paddingHorizontal: 20, paddingVertical: 6, borderRadius: 8, marginTop: 10 },
  newBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  // Category Explorer
  categorySection: { paddingVertical: 8 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  categoryCard: { width: (SCREEN_WIDTH - 24 - 24) / 3, alignItems: 'center', padding: 12, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  categoryGradient: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  categoryName: { fontSize: 11, fontWeight: '600', color: '#1A1A2E', textAlign: 'center', marginTop: 6 },
  categoryCount: { fontSize: 9, color: '#999', marginTop: 2 },

  // Price Drops
  priceDropSection: { paddingVertical: 8 },
  priceDropCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  priceDropLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, gap: 10 },
  priceDropIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  priceDropInfo: { flex: 1 },
  priceDropName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  priceDropInsurer: { fontSize: 11, color: '#666', marginTop: 1 },
  priceDropPrices: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  priceDropOld: { fontSize: 11, color: '#999', textDecorationLine: 'line-through' },
  priceDropNew: { fontSize: 13, fontWeight: '700', color: '#2ECC71' },
  priceDropBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  priceDropPercent: { fontSize: 12, fontWeight: '700', color: '#2ECC71' },

  // Most Claimed
  claimedSection: { paddingVertical: 8 },
  claimedScroll: { paddingHorizontal: 16 },
  claimedCard: { width: 160, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  claimedIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  claimedName: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  claimedStats: { alignItems: 'center', marginTop: 8 },
  claimedRatio: { fontSize: 20, fontWeight: '800', color: '#4CAF50' },
  claimedLabel: { fontSize: 10, color: '#666' },
  claimedCount: { fontSize: 10, color: '#999', marginTop: 4 },

  // Best Sellers
  bestSection: { paddingVertical: 8 },
  bestCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  bestRank: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#FFF8E1', justifyContent: 'center', alignItems: 'center' },
  bestRankText: { fontSize: 14, fontWeight: '800', color: '#FFB800' },
  bestInfo: { flex: 1, marginLeft: 10 },
  bestName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  bestInsurer: { fontSize: 11, color: '#666', marginTop: 1 },
  bestRight: { alignItems: 'flex-end', marginRight: 8 },
  bestPremium: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },
  bestCover: { fontSize: 11, color: '#666', marginTop: 1 },

  // Expert Picks
  expertSection: { paddingVertical: 8 },
  expertScroll: { paddingHorizontal: 16 },
  expertCard: { width: 160, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  expertAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#F3E5F5', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  expertName: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  expertSpecialty: { fontSize: 10, color: '#666', textAlign: 'center', marginTop: 2 },
  expertPick: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 6 },
  expertPickText: { fontSize: 10, color: '#1A1A2E', fontWeight: '500' },
  expertBtn: { backgroundColor: '#9B59B6', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
  expertBtnText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  // Seasonal Offers
  seasonalSection: { paddingVertical: 8 },
  seasonalScroll: { paddingHorizontal: 16 },
  seasonalCard: { width: 260, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  seasonalBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  seasonalBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  seasonalTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  seasonalDesc: { fontSize: 11, color: '#666', marginTop: 4, lineHeight: 16 },
  seasonalCodeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
  seasonalCode: { flex: 1, backgroundColor: '#F5F5F5', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, borderWidth: 1, borderStyle: 'dashed', borderColor: '#DDD' },
  seasonalCodeText: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', letterSpacing: 1 },
  seasonalApply: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 6 },
  seasonalApplyText: { color: '#fff', fontSize: 12, fontWeight: '700' },

  // Combos
  combosSection: { paddingVertical: 8 },
  comboCard: { marginHorizontal: 16, marginBottom: 10, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  comboHeader: { flexDirection: 'row', alignItems: 'center' },
  comboIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  comboInfo: { flex: 1, marginLeft: 10 },
  comboName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  comboPlans: { fontSize: 11, color: '#666', marginTop: 2 },
  comboBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  comboBadgeText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  comboFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  comboSavings: { fontSize: 13, fontWeight: '700', color: '#2ECC71' },
  comboBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, borderWidth: 1.5 },
  comboBtnText: { fontSize: 12, fontWeight: '700' },

  // Favorites
  favSection: { paddingVertical: 8 },
  favScroll: { paddingHorizontal: 16 },
  favCard: { width: 220, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  favRatingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  favRatingText: { fontSize: 12, fontWeight: '700', color: '#FFB800' },
  favPlan: { fontSize: 13, fontWeight: '700', color: '#FF6B35', marginBottom: 4 },
  favComment: { fontSize: 12, color: '#444', lineHeight: 17 },
  favUser: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  favAvatar: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  favAvatarText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  favUserName: { fontSize: 11, fontWeight: '600', color: '#1A1A2E' },

  // Recently Viewed
  recentSection: { paddingVertical: 8 },
  recentViewedScroll: { paddingHorizontal: 16 },
  recentViewedCard: { width: 170, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  recentViewedIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  recentViewedName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  recentViewedInsurer: { fontSize: 11, color: '#666', marginTop: 2 },
  recentViewedPremium: { fontSize: 13, fontWeight: '700', color: '#FF6B35', marginTop: 6 },
  recentViewedBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  recentViewedBtnText: { fontSize: 12, fontWeight: '600', color: '#FF6B35' },

  // Trending Searches
  trendSearchSection: { paddingVertical: 8 },
  trendSearchGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8 },
  trendSearchChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  trendSearchText: { fontSize: 12, fontWeight: '600', color: '#1A1A2E' },
  trendSearchCount: { fontSize: 10, color: '#999' },

  // Discover More
  discoverSection: { paddingVertical: 8 },
  discoverGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  discoverCard: { width: (SCREEN_WIDTH - 32) / 2, borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  discoverGradient: { padding: 16, minHeight: 130, justifyContent: 'center' },
  discoverIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  discoverTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', lineHeight: 19 },
  discoverDesc: { fontSize: 11, color: '#666', marginTop: 4 },

  // Footer
  footerSection: { marginTop: 8 },
  footerGradient: { padding: 24, alignItems: 'center' },
  footerTitle: { fontSize: 22, fontWeight: '800', color: '#fff' },
  footerSubtitle: { fontSize: 13, color: '#D6EAF8', marginTop: 4 },
  footerBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 16 },
  footerBtnText: { fontSize: 14, fontWeight: '700', color: '#3498DB' },
});
