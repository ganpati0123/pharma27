import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, TextInput, FlatList, Image, StatusBar, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useInsuranceStore, INSURANCE_CATEGORIES, SPECIAL_OFFERS, EXPERTS, INSURANCE_FAQS, REVIEWS, WELLNESS_PROGRAMS, INSURANCE_PLANS, THEME } from '../components/insurance/store';
import SectionHeader from '../components/insurance/shared/SectionHeader';
import AnimatedCard from '../components/insurance/shared/AnimatedCard';
import { SkeletonPlanCard, SkeletonSection, SkeletonGrid } from '../components/insurance/shared/SkeletonLoader';
import FadeInSection from '../components/insurance/shared/FadeInSection';
import useTheme from '../components/insurance/shared/useTheme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============== ANIMATED COUNTER ==============
const AnimatedCounter = ({ value, prefix = '', suffix = '', style }) => {
  const animValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animValue, { toValue: 1, duration: 1500, useNativeDriver: false }).start();
  }, [value]);
  const displayVal = animValue.interpolate({ inputRange: [0, 1], outputRange: [0, value] });
  return (
    <Animated.Text style={style}>
      {prefix}{displayVal.__getValue ? value.toLocaleString('en-IN') : value}{suffix}
    </Animated.Text>
  );
};

// ============== COUNTDOWN TIMER ==============
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0 });
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(targetDate) - new Date();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        });
      }
    }, 60000);
    // Initial calc
    const diff = new Date(targetDate) - new Date();
    if (diff > 0) {
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }
    return () => clearInterval(timer);
  }, [targetDate]);
  return (
    <View style={cdStyles.container}>
      <View style={cdStyles.block}><Text style={cdStyles.num}>{timeLeft.days}</Text><Text style={cdStyles.label}>Days</Text></View>
      <Text style={cdStyles.sep}>:</Text>
      <View style={cdStyles.block}><Text style={cdStyles.num}>{timeLeft.hours}</Text><Text style={cdStyles.label}>Hrs</Text></View>
      <Text style={cdStyles.sep}>:</Text>
      <View style={cdStyles.block}><Text style={cdStyles.num}>{timeLeft.mins}</Text><Text style={cdStyles.label}>Min</Text></View>
    </View>
  );
};

const cdStyles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center' },
  block: { alignItems: 'center', backgroundColor: '#1A1A2E', borderRadius: 6, paddingHorizontal: 8, paddingVertical: 4, minWidth: 36 },
  num: { color: '#fff', fontSize: 14, fontWeight: '700' },
  label: { color: '#ccc', fontSize: 8, marginTop: 1 },
  sep: { color: '#999', fontSize: 16, fontWeight: '700', marginHorizontal: 4 },
});

// ============== STAR RATING ==============
const StarRating = ({ rating, size = 14, color = '#FFB800' }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Ionicons key={i} name={i <= rating ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-outline'} size={size} color={color} />
    ))}
  </View>
);

// ============== PROGRESS BAR ==============
const ProgressBar = ({ progress, color = '#FF6B35', height = 6, style }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(widthAnim, { toValue: progress, duration: 1000, useNativeDriver: false }).start();
  }, [progress]);
  return (
    <View style={[{ height, backgroundColor: '#F0F0F0', borderRadius: height / 2, overflow: 'hidden' }, style]}>
      <Animated.View style={{ height: '100%', backgroundColor: color, borderRadius: height / 2, width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }} />
    </View>
  );
};

// ============== FAQ ACCORDION ==============
const FAQItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const toggle = () => {
    setExpanded(!expanded);
    Animated.parallel([
      Animated.spring(heightAnim, { toValue: expanded ? 0 : 1, tension: 50, friction: 10, useNativeDriver: false }),
      Animated.timing(rotateAnim, { toValue: expanded ? 0 : 1, duration: 200, useNativeDriver: true }),
    ]).start();
  };

  const rotate = rotateAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const maxH = heightAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 150] });

  return (
    <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={faqStyles.item}>
      <View style={faqStyles.header}>
        <Text style={faqStyles.question}>{item.question}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={20} color="#666" />
        </Animated.View>
      </View>
      <Animated.View style={{ maxHeight: maxH, overflow: 'hidden' }}>
        <Text style={faqStyles.answer}>{item.answer}</Text>
        <View style={faqStyles.helpfulRow}>
          <TouchableOpacity style={faqStyles.helpBtn}>
            <Ionicons name="thumbs-up-outline" size={14} color="#2ECC71" />
            <Text style={faqStyles.helpText}>Helpful ({item.helpful})</Text>
          </TouchableOpacity>
          <TouchableOpacity style={faqStyles.helpBtn}>
            <Ionicons name="thumbs-down-outline" size={14} color="#E74C3C" />
            <Text style={faqStyles.helpText}>Not helpful ({item.unhelpful})</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const faqStyles = StyleSheet.create({
  item: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 8, borderRadius: 12, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  question: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', flex: 1, marginRight: 8 },
  answer: { fontSize: 13, color: '#666', lineHeight: 20, marginTop: 10 },
  helpfulRow: { flexDirection: 'row', marginTop: 12, gap: 16 },
  helpBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  helpText: { fontSize: 12, color: '#666' },
});

// ============== MAIN INSURANCE SCREEN ==============
export default function InsuranceIndex() {
  const router = useRouter();
  const store = useInsuranceStore();
  const { isDarkMode, colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(headerAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1500);
  }, []);

  const headerOpacity = scrollY.interpolate({ inputRange: [0, 150], outputRange: [1, 0.8], extrapolate: 'clamp' });
  const headerScale = scrollY.interpolate({ inputRange: [-100, 0], outputRange: [1.2, 1], extrapolate: 'clamp' });

  // ============== RENDER HEADER SECTION ==============
  const renderHeader = () => (
    <Animated.View style={{ opacity: headerOpacity, transform: [{ scale: headerScale }] }}>
      <LinearGradient colors={['#FF6B35', '#FF5722', '#E64A19']} style={styles.headerGradient}>
        <SafeAreaView edges={['top']}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={14} color="#FFE0B2" />
                <Text style={styles.locationText}>Showing Premium For</Text>
              </View>
              <TouchableOpacity style={styles.cityRow}>
                <Text style={styles.cityText}>{store.user.city} 110001</Text>
                <Ionicons name="chevron-down" size={14} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="notifications-outline" size={22} color="#fff" />
                {store.unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{store.unreadCount}</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerIconBtn}>
                <Ionicons name="cart-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Health Insurance & Top-Up Buttons */}
          <View style={styles.mainButtons}>
            <TouchableOpacity style={styles.mainBtn} activeOpacity={0.85} onPress={() => router.push('/insurance/health-insurance')}>
              <LinearGradient colors={isDarkMode ? [colors.surface, colors.surfaceVariant] : ['#FFFFFF', '#FFF8F0']} style={styles.mainBtnGradient}>
                <View style={styles.mainBtnIcon}>
                  <Ionicons name="heart" size={24} color={colors.primary} />
                </View>
                <Text style={[styles.mainBtnTitle, { color: colors.text }]}>Health{'\n'}Insurance</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainBtn} activeOpacity={0.85} onPress={() => router.push('/insurance/topup-dedicated')}>
              <LinearGradient colors={isDarkMode ? [colors.surface, colors.surfaceVariant] : ['#FFFFFF', '#F0FFF4']} style={styles.mainBtnGradient}>
                <View style={[styles.mainBtnIcon, { backgroundColor: isDarkMode ? '#1B3D20' : '#E8F5E9' }]}>
                  <Ionicons name="trending-up" size={24} color={colors.secondary} />
                </View>
                <Text style={[styles.mainBtnTitle, { color: colors.text }]}>Super{'\n'}Top-Up</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Health Insurance Banner */}
          <View style={styles.banner}>
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>Health Insurance</Text>
              <Text style={styles.bannerSubtitle}>with</Text>
              <View style={styles.bannerHighlight}>
                <Text style={styles.bannerBold}>Zero GST</Text>
                <Text style={styles.bannerBold}>Full Cover</Text>
              </View>
              <Text style={styles.bannerSmall}>With added Apollo benefits</Text>
            </View>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>18%</Text>
              <Text style={styles.bannerBadgeLabel}>New</Text>
            </View>
          </View>

          {/* Trusted Partners */}
          <View style={styles.partnersRow}>
            <Text style={styles.partnersLabel}>Our Trusted Partners</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.partnersList}>
              {['Niva Bupa', 'Care', 'Star', 'ICICI', 'Manipal'].map((p, i) => (
                <View key={i} style={styles.partnerChip}>
                  <Ionicons name="shield-checkmark" size={16} color="#FF6B35" />
                  <Text style={styles.partnerText}>{p}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );

  // ============== RENDER PLAN FINDER ==============
  const renderPlanFinder = () => (
    <View style={styles.planFinder}>
      <View style={styles.planFinderCard}>
        <Text style={styles.planFinderTitle}>Find plans starting from <Text style={styles.planFinderPrice}>Rs 20/day*</Text></Text>

        {/* Gender Selection */}
        <Text style={styles.fieldLabel}>Select your gender</Text>
        <View style={styles.genderRow}>
          {['Male', 'Female'].map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.genderBtn, store.selectedGender === g && styles.genderBtnActive]}
              onPress={() => store.setSelectedGender(g)}
            >
              <Text style={[styles.genderText, store.selectedGender === g && styles.genderTextActive]}>{g}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Members Selection */}
        <View style={styles.membersHeader}>
          <Text style={styles.fieldLabel}>Select members</Text>
          <TouchableOpacity><Text style={styles.moreMembers}>+ More members</Text></TouchableOpacity>
        </View>
        <View style={styles.membersGrid}>
          {[
            { name: 'Self', age: `${store.selfAge} Years`, icon: 'person' },
            { name: 'Wife', icon: 'woman' },
            { name: 'Mother', icon: 'woman' },
            { name: 'Father', icon: 'man' },
          ].map(member => (
            <TouchableOpacity
              key={member.name}
              style={[styles.memberChip, store.selectedMembers.includes(member.name) && styles.memberChipActive]}
              onPress={() => store.toggleMember(member.name)}
            >
              <View style={styles.memberCheckbox}>
                {store.selectedMembers.includes(member.name) && (
                  <Ionicons name="checkmark-circle" size={18} color="#FF6B35" />
                )}
                {!store.selectedMembers.includes(member.name) && (
                  <Ionicons name="ellipse-outline" size={18} color="#CCC" />
                )}
              </View>
              <Ionicons name={member.icon} size={20} color={store.selectedMembers.includes(member.name) ? '#FF6B35' : '#999'} />
              <Text style={[styles.memberName, store.selectedMembers.includes(member.name) && styles.memberNameActive]}>{member.name}</Text>
              {member.age && <Text style={styles.memberAge}>{member.age}</Text>}
            </TouchableOpacity>
          ))}
        </View>

        {/* Children */}
        <View style={styles.childrenRow}>
          <Text style={styles.fieldLabel}>Select children (max 4)</Text>
          <TouchableOpacity><Text style={styles.moreMembers}>+ Son</Text></TouchableOpacity>
        </View>

        {/* View Plans Button */}
        <TouchableOpacity style={styles.viewPlansBtn} activeOpacity={0.85}>
          <LinearGradient colors={['#FF6B35', '#FF8F00']} style={styles.viewPlansGradient}>
            <Text style={styles.viewPlansText}>View Plans</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={styles.disclaimer}>By clicking on 'View Plans', you agree to our <Text style={styles.link}>Privacy Policy</Text>, <Text style={styles.link}>Terms of Use</Text> & <Text style={styles.link}>Disclaimer</Text></Text>
      </View>
    </View>
  );

  // ============== RENDER TOP-UP CTA ==============
  const renderTopUpCTA = () => (
    <View style={styles.topupSection}>
      <Text style={styles.topupTitle}>Upgrade Your Cover to 1 Cr @ Rs 1 per day</Text>
      <TouchableOpacity>
        <Text style={styles.topupLink}>Get Top Up Health Insurance</Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.topupCards}>
        {[
          { name: 'Niva Super\nTop Up', color: '#4CAF50', icon: 'shield-checkmark' },
          { name: 'Care Super\nTop Up', color: '#FF6B35', icon: 'heart' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={[styles.topupCard, { borderColor: item.color }]} activeOpacity={0.8}>
            <View style={[styles.topupCardIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <Text style={styles.topupCardName}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  // ============== RENDER WHY BUY FROM US ==============
  const renderWhyBuyFromUs = () => (
    <View style={styles.whyBuySection}>
      <View style={styles.dividerLine} />
      <Text style={styles.whyBuyTitle}>WHY BUY FROM US</Text>
      <View style={styles.dividerLine} />
      <View style={styles.whyBuyGrid}>
        {[
          { icon: 'people', title: 'Guided\nBy Expert', color: '#FF6B35' },
          { icon: 'trophy', title: 'Top Indian\nInsurers', color: '#2ECC71' },
          { icon: 'star', title: 'Healthcare\nExcellence', color: '#3498DB' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={styles.whyBuyCard} delay={i * 100}>
            <View style={[styles.whyBuyIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <Text style={styles.whyBuyCardTitle}>{item.title}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== RENDER COVERAGE SECTION ==============
  const renderCoverage = () => (
    <View style={styles.coverageSection}>
      <View style={styles.dividerLine} />
      <Text style={styles.coverageSectionTitle}>ALWAYS ENOUGH</Text>
      <View style={styles.dividerLine} />
      <Text style={styles.coverageTitle}>Wide range of plans which covers</Text>
      <View style={styles.coverageGrid}>
        {[
          { title: 'Freeze premium\ntill first claim', icon: 'snow', color: '#3498DB' },
          { title: 'Hypertension &\ndiabetes from Day 1', icon: 'pulse', color: '#E74C3C' },
          { title: 'Maternity &\nBenefits', icon: 'woman', color: '#9B59B6' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={styles.coverageCard} delay={i * 150}>
            <View style={[styles.coverageIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={styles.coverageCardTitle}>{item.title}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== RENDER ECOSYSTEM ==============
  const renderEcosystem = () => (
    <View style={styles.ecosystemSection}>
      <View style={styles.dividerLine} />
      <Text style={styles.ecosystemTitle}>ACCESS APOLLO'S ECOSYSTEM</Text>
      <View style={styles.dividerLine} />
      <View style={styles.ecosystemGrid}>
        {[
          { count: '71+', label: 'Apollo\nHospitals', icon: 'business' },
          { count: '6000+', label: 'Pharmacies\nPan India', icon: 'medical' },
          { count: '7500+', label: 'Healthcare\nProviders', icon: 'people' },
          { count: '1 Lakh+', label: 'Diagnostic\nCentres', icon: 'flask' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={styles.ecosystemCard} delay={i * 100}>
            <View style={styles.ecosystemIconBg}>
              <Ionicons name={item.icon} size={20} color="#FF6B35" />
            </View>
            <Text style={styles.ecosystemCount}>{item.count}</Text>
            <Text style={styles.ecosystemLabel}>{item.label}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== RENDER NETWORK HOSPITALS ==============
  const renderNetworkHospitals = () => (
    <View style={styles.hospitalSection}>
      <Text style={styles.hospitalTitle}>
        <Text style={styles.hospitalTitleOrange}>10,000+{'\n'}Network Hospitals{'\n'}</Text>
        <Text style={styles.hospitalSubtitle}>in India</Text>
      </Text>
      <Text style={styles.hospitalDesc}>Check partner hospital{'\n'}near you</Text>
      <TouchableOpacity style={styles.knowMoreBtn}>
        <Text style={styles.knowMoreText}>Know More</Text>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hospitalScroll}>
        {[1, 2, 3, 4].map(i => (
          <View key={i} style={styles.hospitalCard}>
            <View style={styles.hospitalCardIcon}>
              <Ionicons name="business" size={24} color="#FF6B35" />
            </View>
            <View style={styles.hospitalCardBadge}>
              <Ionicons name="add-circle" size={20} color="#FF6B35" />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  // ============== RENDER TIPS SECTION ==============
  const renderTips = () => (
    <View style={styles.tipsSection}>
      <Text style={styles.tipsTitle}>Tips for buying health insurance</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tipsScroll}>
        {[
          { title: 'Your easy\nHealth\nInsurance\nChecklist', icon: 'checkbox', color: '#FF6B35' },
          { title: 'Common\nHealth\nInsurance\nMyths', icon: 'help-buoy', color: '#E74C3C' },
          { title: 'Corporate\nIndividual\nInsurance\nGuide', icon: 'business', color: '#3498DB' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={styles.tipCard} delay={i * 100}>
            <Text style={styles.tipCardTitle}>{item.title}</Text>
            <View style={[styles.tipCardIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== RENDER ADVISOR SECTION ==============
  const renderAdvisor = () => (
    <View style={styles.advisorSection}>
      <LinearGradient colors={['#FFF3E0', '#FFFFFF']} style={styles.advisorCard}>
        <View style={styles.advisorContent}>
          <Text style={styles.advisorTitle}>Unsure about what{'\n'}plan to buy?</Text>
          <Text style={styles.advisorSubtitle}>Our Insurance{'\n'}advisor is just a click{'\n'}away</Text>
          <TouchableOpacity style={styles.callbackBtn}>
            <Ionicons name="call" size={16} color="#FF6B35" />
            <Text style={styles.callbackText}>Request a call back</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.advisorImagePlaceholder}>
          <Ionicons name="person" size={60} color="#FF6B35" />
        </View>
      </LinearGradient>
    </View>
  );

  // ============== RENDER CATEGORIES GRID ==============
  const renderCategories = () => (
    <View style={styles.categoriesSection}>
      <SectionHeader title="Insurance Categories" subtitle="Choose your protection" icon="grid" iconColor="#FF6B35" />
      <View style={styles.categoriesGrid}>
        {INSURANCE_CATEGORIES.map((cat, i) => (
          <AnimatedCard key={cat.id} style={styles.categoryCard} delay={i * 50}>
            <LinearGradient colors={cat.gradient} style={styles.categoryGradient}>
              <Ionicons name={cat.icon} size={24} color="#fff" />
            </LinearGradient>
            <Text style={styles.categoryName}>{cat.name}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== RENDER SPECIAL OFFERS ==============
  const renderSpecialOffers = () => (
    <View style={styles.offersSection}>
      <SectionHeader title="Special Offers" subtitle="Limited time deals" icon="gift" iconColor="#E74C3C" actionText="View All" onAction={() => {}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.offersScroll}>
        {SPECIAL_OFFERS.map((offer, i) => (
          <AnimatedCard key={offer.id} style={[styles.offerCard, { borderLeftColor: offer.color }]} delay={i * 100}>
            <View style={styles.offerHeader}>
              <View style={[styles.offerBadge, { backgroundColor: offer.color }]}>
                <Text style={styles.offerDiscount}>{offer.discount} OFF</Text>
              </View>
              <CountdownTimer targetDate={offer.validTill} />
            </View>
            <Text style={styles.offerTitle}>{offer.title}</Text>
            <Text style={styles.offerDesc}>{offer.description}</Text>
            <View style={styles.offerCodeRow}>
              <View style={styles.offerCode}>
                <Text style={styles.offerCodeText}>{offer.code}</Text>
              </View>
              <TouchableOpacity style={[styles.offerApplyBtn, { backgroundColor: offer.color }]}>
                <Text style={styles.offerApplyText}>Apply</Text>
              </TouchableOpacity>
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== RENDER PREMIUM CALCULATOR ==============
  const renderCalculator = () => (
    <View style={styles.calcSection}>
      <SectionHeader title="Premium Calculator" subtitle="Estimate your premium" icon="calculator" iconColor="#3498DB" />
      <View style={styles.calcCard}>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Age</Text>
          <View style={styles.calcSliderRow}>
            <TouchableOpacity style={styles.calcAdjBtn} onPress={() => store.setCalculatorAge(Math.max(18, store.calculatorAge - 1))}>
              <Ionicons name="remove" size={16} color="#FF6B35" />
            </TouchableOpacity>
            <View style={styles.calcValueBg}>
              <Text style={styles.calcValue}>{store.calculatorAge} years</Text>
            </View>
            <TouchableOpacity style={styles.calcAdjBtn} onPress={() => store.setCalculatorAge(Math.min(65, store.calculatorAge + 1))}>
              <Ionicons name="add" size={16} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Coverage</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[500000, 1000000, 2500000, 5000000, 10000000].map(amt => (
              <TouchableOpacity
                key={amt}
                style={[styles.calcChip, store.calculatorCoverage === amt && styles.calcChipActive]}
                onPress={() => store.setCalculatorCoverage(amt)}
              >
                <Text style={[styles.calcChipText, store.calculatorCoverage === amt && styles.calcChipTextActive]}>
                  {amt >= 10000000 ? '1 Cr' : amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}K`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.calcRow}>
          <Text style={styles.calcLabel}>Members</Text>
          <View style={styles.calcSliderRow}>
            <TouchableOpacity style={styles.calcAdjBtn} onPress={() => store.setCalculatorMembers(Math.max(1, store.calculatorMembers - 1))}>
              <Ionicons name="remove" size={16} color="#FF6B35" />
            </TouchableOpacity>
            <View style={styles.calcValueBg}>
              <Text style={styles.calcValue}>{store.calculatorMembers}</Text>
            </View>
            <TouchableOpacity style={styles.calcAdjBtn} onPress={() => store.setCalculatorMembers(Math.min(6, store.calculatorMembers + 1))}>
              <Ionicons name="add" size={16} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.calcResult}>
          <Text style={styles.calcResultLabel}>Estimated Premium</Text>
          <Text style={styles.calcResultValue}>Rs {store.getEstimatedPremium().toLocaleString('en-IN')}/year</Text>
        </View>
        <TouchableOpacity style={styles.calcViewBtn}>
          <LinearGradient colors={['#FF6B35', '#FF8F00']} style={styles.calcViewGradient}>
            <Text style={styles.calcViewText}>View Matching Plans</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== RENDER EXPERT ADVICE ==============
  const renderExperts = () => (
    <View style={styles.expertSection}>
      <SectionHeader title="Expert Advice" subtitle="Get personalized guidance" icon="school" iconColor="#9B59B6" actionText="See All" onAction={() => {}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expertScroll}>
        {EXPERTS.map((expert, i) => (
          <AnimatedCard key={expert.id} style={styles.expertCard} delay={i * 100}>
            <View style={styles.expertAvatar}>
              <Ionicons name="person" size={32} color="#FF6B35" />
              {expert.available && <View style={styles.expertOnline} />}
            </View>
            <Text style={styles.expertName}>{expert.name}</Text>
            <Text style={styles.expertSpecialty}>{expert.specialty}</Text>
            <View style={styles.expertRating}>
              <StarRating rating={Math.floor(expert.rating)} size={12} />
              <Text style={styles.expertRatingText}>{expert.rating}</Text>
            </View>
            <Text style={styles.expertReviews}>{expert.reviews} reviews</Text>
            <TouchableOpacity style={styles.expertBtn}>
              <Ionicons name="videocam" size={14} color="#fff" />
              <Text style={styles.expertBtnText}>Consult</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== RENDER COMMUNITY REVIEWS ==============
  const renderReviews = () => (
    <View style={styles.reviewsSection}>
      <SectionHeader title="Community Reviews" subtitle="What our customers say" icon="chatbubbles" iconColor="#2ECC71" />
      {REVIEWS.slice(0, 3).map((review, i) => (
        <AnimatedCard key={review.id} style={styles.reviewCard} delay={i * 100}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewAvatar}>
              <Text style={styles.reviewAvatarText}>{review.user[0]}</Text>
            </View>
            <View style={styles.reviewInfo}>
              <View style={styles.reviewNameRow}>
                <Text style={styles.reviewUser}>{review.user}</Text>
                {review.verified && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
              </View>
              <StarRating rating={review.rating} size={12} />
            </View>
            <Text style={styles.reviewDate}>{review.date}</Text>
          </View>
          <Text style={styles.reviewPlan}>{review.plan}</Text>
          <Text style={styles.reviewComment}>{review.comment}</Text>
          <View style={styles.reviewActions}>
            <TouchableOpacity style={styles.reviewHelpful}>
              <Ionicons name="thumbs-up-outline" size={14} color="#666" />
              <Text style={styles.reviewHelpfulText}>Helpful ({review.helpful})</Text>
            </TouchableOpacity>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== RENDER RECENT ACTIVITIES ==============
  const renderRecentActivities = () => (
    <View style={styles.activitiesSection}>
      <SectionHeader title="Recent Activities" subtitle="Your insurance journey" icon="time" iconColor="#F39C12" />
      {[
        { icon: 'document-text', title: 'Policy POL001 renewed', time: '2 days ago', color: '#2ECC71', status: 'Completed' },
        { icon: 'card', title: 'Premium payment of Rs 14,757', time: '1 week ago', color: '#3498DB', status: 'Paid' },
        { icon: 'medkit', title: 'Claim CLM002 submitted', time: '2 weeks ago', color: '#FF6B35', status: 'Processing' },
        { icon: 'search', title: 'Compared 3 health plans', time: '3 weeks ago', color: '#9B59B6', status: 'Viewed' },
      ].map((activity, i) => (
        <AnimatedCard key={i} style={styles.activityCard} delay={i * 100}>
          <View style={styles.activityTimeline}>
            <View style={[styles.activityDot, { backgroundColor: activity.color }]} />
            {i < 3 && <View style={styles.activityLine} />}
          </View>
          <View style={[styles.activityIcon, { backgroundColor: activity.color + '15' }]}>
            <Ionicons name={activity.icon} size={20} color={activity.color} />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{activity.title}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
          <View style={[styles.activityStatus, { backgroundColor: activity.color + '15' }]}>
            <Text style={[styles.activityStatusText, { color: activity.color }]}>{activity.status}</Text>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== RENDER FAQ SECTION ==============
  const renderFAQ = () => (
    <View style={styles.faqSection}>
      <SectionHeader title="Frequently Asked Questions" subtitle="Find answers quickly" icon="help-buoy" iconColor="#E74C3C" />
      {INSURANCE_FAQS.slice(0, 5).map(faq => (
        <FAQItem key={faq.id} item={faq} />
      ))}
      <TouchableOpacity style={styles.viewAllFaq}>
        <Text style={styles.viewAllFaqText}>View All FAQs</Text>
        <Ionicons name="arrow-forward" size={16} color="#FF6B35" />
      </TouchableOpacity>
    </View>
  );

  // ============== RENDER TERMS ==============
  const renderTerms = () => (
    <View style={styles.termsSection}>
      <TouchableOpacity style={styles.termsHeader}>
        <Text style={styles.termsTitle}>Terms and Conditions</Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>
    </View>
  );

  // ============== RENDER FOOTER ==============
  const renderFooter = () => (
    <View style={styles.footer}>
      <LinearGradient colors={['#FF6B35', '#E64A19']} style={styles.footerGradient}>
        <Text style={styles.footerTitle}>Always Enough</Text>
        <Text style={styles.footerSubtitle}>Powered by</Text>
        <View style={styles.footerLogos}>
          <View style={styles.footerLogo}>
            <Ionicons name="medical" size={24} color="#fff" />
            <Text style={styles.footerLogoText}>Apollo</Text>
          </View>
          <View style={styles.footerLogo}>
            <Ionicons name="shield-checkmark" size={24} color="#fff" />
            <Text style={styles.footerLogoText}>Care</Text>
          </View>
        </View>
        <View style={styles.footerBadge}>
          <Text style={styles.footerBadgeNum}>18%</Text>
          <Text style={styles.footerBadgeText}>GST</Text>
        </View>
      </LinearGradient>
    </View>
  );

  // ============== RENDER QUICK CLAIM ==============
  const renderQuickClaim = () => (
    <View style={styles.quickClaimSection}>
      <SectionHeader title="Quick Claim" subtitle="File & track claims" icon="flash" iconColor="#FF6B35" />
      <View style={styles.quickClaimCard}>
        <View style={styles.quickClaimHeader}>
          <View style={styles.quickClaimIcon}>
            <Ionicons name="document-text" size={24} color="#FF6B35" />
          </View>
          <View style={styles.quickClaimInfo}>
            <Text style={styles.quickClaimTitle}>Recent Claims</Text>
            <Text style={styles.quickClaimCount}>{store.claims.length} claims this year</Text>
          </View>
        </View>
        {store.claims.map((claim, i) => (
          <View key={claim.id} style={styles.claimRow}>
            <View style={styles.claimTimeline}>
              <View style={[styles.claimDot, { backgroundColor: claim.status === 'approved' ? '#2ECC71' : '#FF6B35' }]} />
              {i < store.claims.length - 1 && <View style={styles.claimLine} />}
            </View>
            <View style={styles.claimContent}>
              <Text style={styles.claimId}>{claim.id}</Text>
              <Text style={styles.claimHospital}>{claim.hospital}</Text>
              <Text style={styles.claimAmount}>Rs {claim.amount.toLocaleString('en-IN')}</Text>
            </View>
            <View style={[styles.claimStatusBadge, { backgroundColor: claim.status === 'approved' ? '#E8F5E9' : '#FFF3E0' }]}>
              <Text style={[styles.claimStatusText, { color: claim.status === 'approved' ? '#2ECC71' : '#FF6B35' }]}>
                {claim.status === 'approved' ? 'Approved' : 'Processing'}
              </Text>
            </View>
          </View>
        ))}
        <TouchableOpacity style={styles.fileClaimBtn}>
          <Ionicons name="add-circle" size={18} color="#FF6B35" />
          <Text style={styles.fileClaimText}>File New Claim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== RENDER WELLNESS ==============
  const renderWellness = () => (
    <View style={styles.wellnessSection}>
      <SectionHeader title="Wellness Programs" subtitle="Stay healthy, save more" icon="fitness" iconColor="#2ECC71" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.wellnessScroll}>
        {WELLNESS_PROGRAMS.map((prog, i) => (
          <AnimatedCard key={prog.id} style={styles.wellnessCard} delay={i * 100}>
            <View style={styles.wellnessIconBg}>
              <Ionicons name={prog.icon} size={24} color="#2ECC71" />
            </View>
            <Text style={styles.wellnessName}>{prog.name}</Text>
            {prog.target && <Text style={styles.wellnessTarget}>{prog.target}</Text>}
            {prog.discount && <Text style={styles.wellnessTarget}>{prog.discount}</Text>}
            {prog.value && <Text style={styles.wellnessTarget}>{prog.value}</Text>}
            {prog.progress !== undefined && (
              <View style={styles.wellnessProgress}>
                <ProgressBar progress={prog.progress} color="#2ECC71" />
                <Text style={styles.wellnessProgressText}>{prog.progress}%</Text>
              </View>
            )}
            <Text style={styles.wellnessReward}>{prog.reward || (prog.active ? 'Active' : 'Enroll Now')}</Text>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SKELETON LOADING ==============
  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#FF6B35'} />
        <View style={{ backgroundColor: isDarkMode ? colors.surface : '#FF6B35', height: 200 }} />
        <View style={{ padding: 16 }}>
          <SkeletonSection />
          <SkeletonGrid />
          <SkeletonPlanCard />
          <SkeletonPlanCard />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#FF6B35'} />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B35" colors={['#FF6B35']} />}
      >
        {renderHeader()}
        <FadeInSection delay={100}>{renderPlanFinder()}</FadeInSection>
        <FadeInSection delay={200}>{renderTopUpCTA()}</FadeInSection>
        <FadeInSection delay={250}>{renderWhyBuyFromUs()}</FadeInSection>
        <FadeInSection delay={300}>{renderCoverage()}</FadeInSection>
        <FadeInSection delay={350}>{renderEcosystem()}</FadeInSection>
        <FadeInSection delay={400}>{renderNetworkHospitals()}</FadeInSection>
        <FadeInSection delay={450}>{renderTips()}</FadeInSection>
        <FadeInSection delay={500}>{renderAdvisor()}</FadeInSection>
        <FadeInSection delay={550}>{renderCategories()}</FadeInSection>
        <FadeInSection delay={600}>{renderSpecialOffers()}</FadeInSection>
        <FadeInSection delay={650}>{renderCalculator()}</FadeInSection>
        <FadeInSection delay={700}>{renderQuickClaim()}</FadeInSection>
        <FadeInSection delay={750}>{renderExperts()}</FadeInSection>
        <FadeInSection delay={800}>{renderWellness()}</FadeInSection>
        <FadeInSection delay={850}>{renderReviews()}</FadeInSection>
        <FadeInSection delay={900}>{renderRecentActivities()}</FadeInSection>
        <FadeInSection delay={950}>{renderFAQ()}</FadeInSection>
        <FadeInSection delay={1000}>{renderTerms()}</FadeInSection>
        {renderFooter()}
        <View style={{ height: 20 }} />
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header
  headerGradient: { paddingBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 },
  headerLeft: {},
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { color: '#FFE0B2', fontSize: 11 },
  cityRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 },
  cityText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  headerRight: { flexDirection: 'row', gap: 8 },
  headerIconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  badge: { position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: 9, backgroundColor: '#E74C3C', justifyContent: 'center', alignItems: 'center' },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },

  // Main Buttons
  mainButtons: { flexDirection: 'row', paddingHorizontal: 16, gap: 12, marginTop: 16 },
  mainBtn: { flex: 1, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 6 },
  mainBtnGradient: { padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12 },
  mainBtnIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  mainBtnTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', lineHeight: 18 },

  // Banner
  banner: { marginHorizontal: 16, marginTop: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  bannerContent: {},
  bannerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  bannerSubtitle: { fontSize: 12, color: '#666', marginTop: 2 },
  bannerHighlight: { marginTop: 4 },
  bannerBold: { fontSize: 22, fontWeight: '800', color: '#FF6B35' },
  bannerSmall: { fontSize: 11, color: '#999', marginTop: 4 },
  bannerBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  bannerBadgeText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  bannerBadgeLabel: { color: '#FFE0B2', fontSize: 10 },

  // Partners
  partnersRow: { paddingHorizontal: 16, marginTop: 12 },
  partnersLabel: { color: '#FFE0B2', fontSize: 11, marginBottom: 8 },
  partnersList: {},
  partnerChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, marginRight: 8, gap: 4 },
  partnerText: { color: '#fff', fontSize: 12, fontWeight: '500' },

  // Plan Finder
  planFinder: { padding: 16 },
  planFinderCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  planFinderTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', textAlign: 'center', marginBottom: 20 },
  planFinderPrice: { color: '#FF6B35' },
  fieldLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 8, marginTop: 16 },
  genderRow: { flexDirection: 'row', gap: 12 },
  genderBtn: { flex: 1, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#E0E0E0', alignItems: 'center' },
  genderBtnActive: { borderColor: '#FF6B35', backgroundColor: '#FFF3E0' },
  genderText: { fontSize: 14, fontWeight: '600', color: '#666' },
  genderTextActive: { color: '#FF6B35' },
  membersHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  moreMembers: { color: '#FF6B35', fontSize: 13, fontWeight: '600' },
  membersGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  memberChip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, borderColor: '#E0E0E0', gap: 6 },
  memberChipActive: { borderColor: '#FF6B35', backgroundColor: '#FFF3E0' },
  memberCheckbox: {},
  memberName: { fontSize: 13, fontWeight: '600', color: '#666' },
  memberNameActive: { color: '#FF6B35' },
  memberAge: { fontSize: 11, color: '#999' },
  childrenRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 },
  viewPlansBtn: { marginTop: 20, borderRadius: 12, overflow: 'hidden' },
  viewPlansGradient: { paddingVertical: 14, alignItems: 'center' },
  viewPlansText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  disclaimer: { fontSize: 10, color: '#999', textAlign: 'center', marginTop: 10, lineHeight: 16 },
  link: { color: '#3498DB' },

  // Top-Up CTA
  topupSection: { padding: 16, alignItems: 'center' },
  topupTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  topupLink: { color: '#FF6B35', fontSize: 14, fontWeight: '600', marginTop: 4, marginBottom: 12 },
  topupCards: {},
  topupCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginRight: 12, borderWidth: 1.5, gap: 10, minWidth: 160 },
  topupCardIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  topupCardName: { fontSize: 12, fontWeight: '600', color: '#1A1A2E', flex: 1 },

  // Why Buy
  whyBuySection: { padding: 16, alignItems: 'center' },
  whyBuyTitle: { fontSize: 12, fontWeight: '700', color: '#999', letterSpacing: 2, marginVertical: 8 },
  dividerLine: { width: 60, height: 1, backgroundColor: '#E0E0E0' },
  whyBuyGrid: { flexDirection: 'row', gap: 12, marginTop: 16, width: '100%' },
  whyBuyCard: { flex: 1, backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  whyBuyIcon: { width: 56, height: 56, borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  whyBuyCardTitle: { fontSize: 12, fontWeight: '600', color: '#1A1A2E', textAlign: 'center', lineHeight: 16 },

  // Coverage
  coverageSection: { padding: 16, alignItems: 'center' },
  coverageSectionTitle: { fontSize: 12, fontWeight: '700', color: '#999', letterSpacing: 2, marginVertical: 8 },
  coverageTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginTop: 8, marginBottom: 16 },
  coverageGrid: { flexDirection: 'row', gap: 10, width: '100%' },
  coverageCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  coverageIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  coverageCardTitle: { fontSize: 11, fontWeight: '600', color: '#1A1A2E', textAlign: 'center', lineHeight: 15 },

  // Ecosystem
  ecosystemSection: { padding: 16, alignItems: 'center' },
  ecosystemTitle: { fontSize: 12, fontWeight: '700', color: '#999', letterSpacing: 2, marginVertical: 8 },
  ecosystemGrid: { flexDirection: 'row', gap: 8, marginTop: 16, width: '100%' },
  ecosystemCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  ecosystemIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  ecosystemCount: { fontSize: 16, fontWeight: '800', color: '#FF6B35' },
  ecosystemLabel: { fontSize: 10, color: '#666', textAlign: 'center', lineHeight: 14, marginTop: 2 },

  // Hospital
  hospitalSection: { paddingHorizontal: 16, paddingVertical: 20 },
  hospitalTitle: { marginBottom: 4 },
  hospitalTitleOrange: { fontSize: 22, fontWeight: '800', color: '#FF6B35', lineHeight: 28 },
  hospitalSubtitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  hospitalDesc: { fontSize: 14, color: '#666', marginTop: 4, lineHeight: 20 },
  knowMoreBtn: { marginTop: 12, backgroundColor: '#fff', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#E0E0E0' },
  knowMoreText: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  hospitalScroll: { marginTop: 16 },
  hospitalCard: { width: 100, height: 100, backgroundColor: '#FFF3E0', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  hospitalCardIcon: {},
  hospitalCardBadge: { position: 'absolute', top: 8, right: 8 },

  // Tips
  tipsSection: { padding: 16 },
  tipsTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  tipsScroll: {},
  tipCard: { width: 150, backgroundColor: '#fff', borderRadius: 14, padding: 16, marginRight: 12, minHeight: 160, justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  tipCardTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', lineHeight: 18 },
  tipCardIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', alignSelf: 'flex-end', marginTop: 12 },

  // Advisor
  advisorSection: { padding: 16 },
  advisorCard: { borderRadius: 16, padding: 20, flexDirection: 'row', overflow: 'hidden' },
  advisorContent: { flex: 1 },
  advisorTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', lineHeight: 24 },
  advisorSubtitle: { fontSize: 13, color: '#666', marginTop: 8, lineHeight: 18 },
  callbackBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16, backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#FF6B35' },
  callbackText: { fontSize: 13, fontWeight: '600', color: '#FF6B35' },
  advisorImagePlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#FFE0B2', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },

  // Categories
  categoriesSection: { paddingVertical: 8 },
  categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  categoryCard: { width: (SCREEN_WIDTH - 24 - 40) / 4, alignItems: 'center', padding: 8, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  categoryGradient: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  categoryName: { fontSize: 10, fontWeight: '600', color: '#1A1A2E', textAlign: 'center', marginTop: 6 },

  // Special Offers
  offersSection: { paddingVertical: 8 },
  offersScroll: { paddingHorizontal: 16 },
  offerCard: { width: 280, backgroundColor: '#fff', borderRadius: 14, padding: 16, marginRight: 12, borderLeftWidth: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  offerHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  offerBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  offerDiscount: { color: '#fff', fontSize: 12, fontWeight: '700' },
  offerTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  offerDesc: { fontSize: 12, color: '#666', marginBottom: 12 },
  offerCodeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  offerCode: { flex: 1, backgroundColor: '#F5F5F5', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderStyle: 'dashed', borderColor: '#DDD' },
  offerCodeText: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', letterSpacing: 1 },
  offerApplyBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  offerApplyText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Calculator
  calcSection: { paddingVertical: 8 },
  calcCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  calcRow: { marginBottom: 16 },
  calcLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  calcSliderRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  calcAdjBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  calcValueBg: { flex: 1, backgroundColor: '#F5F5F5', paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  calcValue: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  calcChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F5F5F5', marginRight: 8, borderWidth: 1.5, borderColor: '#E0E0E0' },
  calcChipActive: { backgroundColor: '#FFF3E0', borderColor: '#FF6B35' },
  calcChipText: { fontSize: 13, fontWeight: '600', color: '#666' },
  calcChipTextActive: { color: '#FF6B35' },
  calcResult: { backgroundColor: '#F8F9FA', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  calcResultLabel: { fontSize: 12, color: '#666' },
  calcResultValue: { fontSize: 24, fontWeight: '800', color: '#FF6B35', marginTop: 4 },
  calcViewBtn: { marginTop: 12, borderRadius: 10, overflow: 'hidden' },
  calcViewGradient: { paddingVertical: 12, alignItems: 'center' },
  calcViewText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Quick Claim
  quickClaimSection: { paddingVertical: 8 },
  quickClaimCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  quickClaimHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16, gap: 12 },
  quickClaimIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  quickClaimInfo: {},
  quickClaimTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  quickClaimCount: { fontSize: 12, color: '#666', marginTop: 2 },
  claimRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  claimTimeline: { width: 24, alignItems: 'center' },
  claimDot: { width: 10, height: 10, borderRadius: 5 },
  claimLine: { width: 2, height: 30, backgroundColor: '#E0E0E0', marginTop: 2 },
  claimContent: { flex: 1, marginLeft: 12 },
  claimId: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  claimHospital: { fontSize: 12, color: '#666', marginTop: 2 },
  claimAmount: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginTop: 2 },
  claimStatusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  claimStatusText: { fontSize: 11, fontWeight: '600' },
  fileClaimBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  fileClaimText: { fontSize: 14, fontWeight: '600', color: '#FF6B35' },

  // Experts
  expertSection: { paddingVertical: 8 },
  expertScroll: { paddingHorizontal: 16 },
  expertCard: { width: 160, backgroundColor: '#fff', borderRadius: 16, padding: 16, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  expertAvatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  expertOnline: { position: 'absolute', bottom: 2, right: 2, width: 14, height: 14, borderRadius: 7, backgroundColor: '#2ECC71', borderWidth: 2, borderColor: '#fff' },
  expertName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  expertSpecialty: { fontSize: 11, color: '#666', textAlign: 'center', marginTop: 2 },
  expertRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  expertRatingText: { fontSize: 12, fontWeight: '600', color: '#FFB800' },
  expertReviews: { fontSize: 10, color: '#999', marginTop: 2 },
  expertBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#FF6B35', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 8, marginTop: 10 },
  expertBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },

  // Wellness
  wellnessSection: { paddingVertical: 8 },
  wellnessScroll: { paddingHorizontal: 16 },
  wellnessCard: { width: 170, backgroundColor: '#fff', borderRadius: 16, padding: 16, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  wellnessIconBg: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  wellnessName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  wellnessTarget: { fontSize: 12, color: '#666', marginTop: 4 },
  wellnessProgress: { marginTop: 8 },
  wellnessProgressText: { fontSize: 11, color: '#2ECC71', fontWeight: '600', marginTop: 4 },
  wellnessReward: { fontSize: 12, color: '#FF6B35', fontWeight: '600', marginTop: 8 },

  // Reviews
  reviewsSection: { paddingVertical: 8 },
  reviewCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  reviewAvatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  reviewInfo: { flex: 1, marginLeft: 10 },
  reviewNameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  reviewUser: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  verifiedText: { fontSize: 11, color: '#2ECC71', fontWeight: '500' },
  reviewDate: { fontSize: 11, color: '#999' },
  reviewPlan: { fontSize: 12, color: '#FF6B35', fontWeight: '500', marginBottom: 4 },
  reviewComment: { fontSize: 13, color: '#444', lineHeight: 19 },
  reviewActions: { flexDirection: 'row', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  reviewHelpful: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewHelpfulText: { fontSize: 12, color: '#666' },

  // Activities
  activitiesSection: { paddingVertical: 8 },
  activityCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 4, paddingVertical: 8 },
  activityTimeline: { width: 24, alignItems: 'center' },
  activityDot: { width: 10, height: 10, borderRadius: 5 },
  activityLine: { width: 2, flex: 1, backgroundColor: '#E0E0E0', marginTop: 2 },
  activityIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginLeft: 8 },
  activityContent: { flex: 1, marginLeft: 10 },
  activityTitle: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  activityTime: { fontSize: 11, color: '#999', marginTop: 2 },
  activityStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  activityStatusText: { fontSize: 11, fontWeight: '600' },

  // FAQ
  faqSection: { paddingVertical: 8 },
  viewAllFaq: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 8, marginBottom: 8 },
  viewAllFaqText: { fontSize: 14, fontWeight: '600', color: '#FF6B35' },

  // Terms
  termsSection: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', marginTop: 8 },
  termsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16 },
  termsTitle: { fontSize: 16, fontWeight: '600', color: '#1A1A2E' },

  // Footer
  footer: { marginTop: 16 },
  footerGradient: { padding: 24, alignItems: 'center' },
  footerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  footerSubtitle: { fontSize: 12, color: '#FFE0B2', marginTop: 8 },
  footerLogos: { flexDirection: 'row', gap: 20, marginTop: 12 },
  footerLogo: { alignItems: 'center' },
  footerLogoText: { color: '#fff', fontSize: 11, fontWeight: '600', marginTop: 4 },
  footerBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: '#fff', width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  footerBadgeNum: { fontSize: 14, fontWeight: '800', color: '#FF6B35' },
  footerBadgeText: { fontSize: 8, color: '#FF6B35' },
});
