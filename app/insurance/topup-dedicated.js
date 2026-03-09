import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useInsuranceStore, TOPUP_PLANS, HOSPITALS, EXPERTS, INSURANCE_FAQS, REVIEWS } from '../components/insurance/store';
import SectionHeader from '../components/insurance/shared/SectionHeader';
import AnimatedCard from '../components/insurance/shared/AnimatedCard';
import { SkeletonSection, SkeletonGrid, SkeletonPlanCard } from '../components/insurance/shared/SkeletonLoader';
import FadeInSection from '../components/insurance/shared/FadeInSection';
import useTheme from '../components/insurance/shared/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StarRating = ({ rating, size = 14, color = '#FFB800' }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Ionicons key={i} name={i <= rating ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-outline'} size={size} color={color} />
    ))}
  </View>
);

const ProgressBar = ({ progress, color = '#4CAF50', height = 6 }) => {
  const widthAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(widthAnim, { toValue: progress, duration: 1000, useNativeDriver: false }).start();
  }, [progress]);
  return (
    <View style={{ height, backgroundColor: '#F0F0F0', borderRadius: height / 2, overflow: 'hidden' }}>
      <Animated.View style={{ height: '100%', backgroundColor: color, borderRadius: height / 2, width: widthAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) }} />
    </View>
  );
};

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
    <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={faqS.item}>
      <View style={faqS.header}>
        <Text style={faqS.question}>{item.question}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}><Ionicons name="chevron-down" size={18} color="#666" /></Animated.View>
      </View>
      <Animated.View style={{ maxHeight: maxH, overflow: 'hidden' }}>
        <Text style={faqS.answer}>{item.answer}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
const faqS = StyleSheet.create({
  item: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 6, borderRadius: 10, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  question: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', flex: 1, marginRight: 8 },
  answer: { fontSize: 12, color: '#666', lineHeight: 18, marginTop: 8 },
});

export default function TopUpDedicatedPage() {
  const store = useInsuranceStore();
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDeductible, setSelectedDeductible] = useState(300000);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => { setTimeout(() => setIsLoading(false), 1000); }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1500);
  }, []);

  // ============== SECTION 1: HEADER ==============
  const renderHeader = () => (
    <LinearGradient colors={['#4CAF50', '#388E3C', '#2E7D32']} style={s.headerGradient}>
      <SafeAreaView edges={['top']}>
        <View style={s.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Super Top-Up</Text>
          <TouchableOpacity style={s.backBtn}>
            <Ionicons name="share-social" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={s.headerBody}>
          <View style={s.headerShieldStack}>
            <View style={s.shieldBase}><Ionicons name="shield" size={32} color="rgba(255,255,255,0.3)" /></View>
            <View style={s.shieldTop}><Ionicons name="shield-checkmark" size={44} color="#fff" /></View>
          </View>
          <Text style={s.headerTagline}>Enhanced Coverage</Text>
          <Text style={s.headerDesc}>Top-up your existing health insurance coverage</Text>
          <View style={s.headerGapViz}>
            <View style={s.gapBarContainer}>
              <View style={[s.gapBar, { width: '40%', backgroundColor: '#FFB300' }]} />
              <View style={[s.gapBar, { width: '60%', backgroundColor: '#fff' }]} />
            </View>
            <View style={s.gapLabels}>
              <Text style={s.gapLabel}>Base Policy: Rs 5L</Text>
              <Text style={[s.gapLabel, { fontWeight: '800' }]}>Top-Up: Rs 50L+</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // ============== SECTION 2: BASE POLICY INFO ==============
  const renderBasePolicy = () => (
    <View style={s.basePolicySection}>
      <SectionHeader title="Your Base Policy" subtitle="Current coverage status" icon="shield" iconColor="#4CAF50" />
      <View style={s.basePolicyCard}>
        <View style={s.basePolicyHeader}>
          <View style={s.basePolicyIcon}><Ionicons name="shield-checkmark" size={24} color="#FF6B35" /></View>
          <View style={s.basePolicyInfo}>
            <Text style={s.basePolicyName}>Reassure 3.0 Platinum</Text>
            <Text style={s.basePolicyInsurer}>Niva Bupa • Active</Text>
          </View>
          <View style={s.basePolicyStatusDot} />
        </View>
        <View style={s.basePolicyStats}>
          <View style={s.basePolicyStat}>
            <Text style={s.basePolicyStatValue}>Rs 10L</Text>
            <Text style={s.basePolicyStatLabel}>Sum Insured</Text>
          </View>
          <View style={s.basePolicyStatDivider} />
          <View style={s.basePolicyStat}>
            <Text style={[s.basePolicyStatValue, { color: '#E74C3C' }]}>Rs 2.5L</Text>
            <Text style={s.basePolicyStatLabel}>Used Amount</Text>
          </View>
          <View style={s.basePolicyStatDivider} />
          <View style={s.basePolicyStat}>
            <Text style={[s.basePolicyStatValue, { color: '#4CAF50' }]}>Rs 7.5L</Text>
            <Text style={s.basePolicyStatLabel}>Remaining</Text>
          </View>
        </View>
        <ProgressBar progress={75} color="#4CAF50" height={8} />
        <Text style={s.basePolicyRemaining}>75% coverage remaining</Text>
      </View>
    </View>
  );

  // ============== SECTION 3: TOP-UP CALCULATOR ==============
  const renderCalculator = () => (
    <View style={s.calcSection}>
      <SectionHeader title="Top-Up Calculator" subtitle="Calculate your premium" icon="calculator" iconColor="#4CAF50" />
      <View style={s.calcCard}>
        <Text style={s.calcLabel}>Select Deductible</Text>
        <View style={s.calcDeductibles}>
          {[200000, 300000, 500000, 700000, 1000000].map(d => (
            <TouchableOpacity key={d} style={[s.calcDeductibleChip, selectedDeductible === d && s.calcDeductibleActive]} onPress={() => setSelectedDeductible(d)}>
              <Text style={[s.calcDeductibleText, selectedDeductible === d && { color: '#fff' }]}>Rs {(d / 100000).toFixed(0)}L</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={[s.calcLabel, { marginTop: 16 }]}>Select Top-Up Amount</Text>
        <View style={s.calcAmounts}>
          {[1000000, 2500000, 5000000, 10000000].map(a => (
            <TouchableOpacity key={a} style={[s.calcAmountChip, store.topupAmount === a && s.calcAmountActive]} onPress={() => store.setTopupAmount(a)}>
              <Text style={[s.calcAmountText, store.topupAmount === a && { color: '#fff' }]}>Rs {(a / 100000).toFixed(0)}L</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.calcResult}>
          <Text style={s.calcResultLabel}>Estimated Annual Premium</Text>
          <Text style={s.calcResultValue}>Rs {store.getTopupPremium().toLocaleString('en-IN')}/yr</Text>
          <Text style={s.calcResultSub}>Rs {Math.round(store.getTopupPremium() / 12).toLocaleString('en-IN')}/month</Text>
        </View>
        <TouchableOpacity style={s.calcBtn}>
          <Text style={s.calcBtnText}>Get Detailed Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 4: COVERAGE INCREASE ==============
  const renderCoverageIncrease = () => (
    <View style={s.coverageSection}>
      <SectionHeader title="Coverage Increase" subtitle="Tiered top-up options" icon="trending-up" iconColor="#FF6B35" />
      <View style={s.coverageTiers}>
        {[
          { tier: 'Basic', coverage: '10L', premium: '2,100', savings: '65%', color: '#4CAF50', recommended: false },
          { tier: 'Standard', coverage: '25L', premium: '3,500', savings: '72%', color: '#FF6B35', recommended: true },
          { tier: 'Premium', coverage: '50L', premium: '5,200', savings: '78%', color: '#9B59B6', recommended: false },
          { tier: 'Ultimate', coverage: '1Cr', premium: '8,500', savings: '85%', color: '#3498DB', recommended: false },
        ].map((item, i) => (
          <AnimatedCard key={i} style={[s.coverageTierCard, item.recommended && { borderColor: '#FF6B35', borderWidth: 2 }]} delay={i * 80}>
            {item.recommended && <View style={s.coverageRecommended}><Text style={s.coverageRecommendedText}>Recommended</Text></View>}
            <Text style={[s.coverageTierName, { color: item.color }]}>{item.tier}</Text>
            <Text style={s.coverageTierCoverage}>Rs {item.coverage}</Text>
            <Text style={s.coverageTierPremium}>Rs {item.premium}/yr</Text>
            <Text style={s.coverageTierSavings}>Save {item.savings} vs new policy</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 5: NETWORK HOSPITALS ==============
  const renderNetworkHospitals = () => (
    <View style={s.hospitalSection}>
      <SectionHeader title="Network Hospitals" subtitle="Expanded cashless network" icon="business" iconColor="#4CAF50" actionText="View All" onAction={() => {}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hospitalScroll}>
        {HOSPITALS.map((h, i) => (
          <AnimatedCard key={h.id} style={s.hospitalCard} delay={i * 60}>
            <View style={s.hospitalTop}>
              <Ionicons name="business" size={20} color={h.premium ? '#FFB800' : '#4CAF50'} />
              {h.premium && <View style={s.hospitalPremiumBadge}><Ionicons name="star" size={8} color="#FFB800" /><Text style={s.hospitalPremiumText}>Premium</Text></View>}
            </View>
            <Text style={s.hospitalName}>{h.name}</Text>
            <Text style={s.hospitalCity}>{h.city} • {h.distance}</Text>
            <View style={s.hospitalSpecialties}>
              {h.specialties.slice(0, 2).map((sp, j) => <View key={j} style={s.specialtyChip}><Text style={s.specialtyText}>{sp}</Text></View>)}
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 6: DISEASE-WISE COVERAGE ==============
  const renderDiseaseCoverage = () => (
    <View style={s.diseaseSection}>
      <SectionHeader title="Disease-Wise Coverage" subtitle="Critical illness protection" icon="medkit" iconColor="#E74C3C" />
      <View style={s.diseaseCard}>
        {[
          { name: 'Cancer', coverage: 'Full SI', waiting: '90 days', icon: 'ribbon', color: '#E91E63' },
          { name: 'Heart Disease', coverage: 'Full SI', waiting: '30 days', icon: 'heart', color: '#E74C3C' },
          { name: 'Kidney Failure', coverage: 'Full SI', waiting: '90 days', icon: 'water', color: '#3498DB' },
          { name: 'Stroke', coverage: 'Full SI', waiting: '30 days', icon: 'pulse', color: '#FF6B35' },
          { name: 'Organ Transplant', coverage: 'Full SI', waiting: '90 days', icon: 'body', color: '#9B59B6' },
          { name: 'Major Burns', coverage: 'Full SI', waiting: '30 days', icon: 'flame', color: '#FF9800' },
        ].map((item, i) => (
          <View key={i} style={[s.diseaseRow, i < 5 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={[s.diseaseIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={16} color={item.color} />
            </View>
            <View style={s.diseaseInfo}>
              <Text style={s.diseaseName}>{item.name}</Text>
              <Text style={s.diseaseWait}>Waiting: {item.waiting}</Text>
            </View>
            <Text style={s.diseaseCov}>{item.coverage}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 7: ROOM RENT UPGRADE ==============
  const renderRoomRent = () => (
    <View style={s.roomSection}>
      <SectionHeader title="Room Rent Upgrade" subtitle="Enhanced room benefits" icon="bed" iconColor="#FF6B35" />
      <View style={s.roomCard}>
        {[
          { type: 'Single AC Room', limit: 'No Limit', premium: '+Rs 500/yr', icon: 'home', color: '#4CAF50' },
          { type: 'Deluxe Room', limit: 'No Limit', premium: '+Rs 800/yr', icon: 'diamond', color: '#FF6B35' },
          { type: 'Suite Room', limit: 'Rs 10,000/day', premium: '+Rs 1,200/yr', icon: 'star', color: '#9B59B6' },
        ].map((room, i) => (
          <AnimatedCard key={i} style={s.roomRow} delay={i * 60}>
            <View style={[s.roomIcon, { backgroundColor: room.color + '15' }]}>
              <Ionicons name={room.icon} size={20} color={room.color} />
            </View>
            <View style={s.roomInfo}>
              <Text style={s.roomType}>{room.type}</Text>
              <Text style={s.roomLimit}>Limit: {room.limit}</Text>
            </View>
            <Text style={[s.roomPremium, { color: room.color }]}>{room.premium}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 8: ICU COVERAGE ==============
  const renderICU = () => (
    <View style={s.icuSection}>
      <SectionHeader title="ICU Coverage" subtitle="Intensive care benefits" icon="pulse" iconColor="#E74C3C" />
      <View style={s.icuCard}>
        <View style={s.icuHeader}>
          <View style={s.icuIconLarge}><Ionicons name="pulse" size={32} color="#E74C3C" /></View>
          <Text style={s.icuTitle}>No ICU Limit</Text>
          <Text style={s.icuDesc}>Full coverage for ICU and critical care</Text>
        </View>
        <View style={s.icuGrid}>
          {[
            { label: 'ICU Charges', value: 'No Limit' },
            { label: 'Daily Cash', value: 'Rs 3,000/day' },
            { label: 'Night Allowance', value: 'Rs 1,500/night' },
            { label: 'Ventilator', value: 'Fully Covered' },
          ].map((item, i) => (
            <View key={i} style={s.icuGridItem}>
              <Text style={s.icuGridLabel}>{item.label}</Text>
              <Text style={s.icuGridValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 9: DAY CARE EXPANSION ==============
  const renderDayCare = () => (
    <View style={s.dayCareSection}>
      <SectionHeader title="Day Care Expansion" subtitle="Additional procedures" icon="medical" iconColor="#4CAF50" />
      <View style={s.dayCareCard}>
        <Text style={s.dayCareCount}>150+ additional day care procedures covered</Text>
        <View style={s.dayCareList}>
          {['Chemotherapy', 'Radiotherapy', 'Dialysis', 'Lithotripsy', 'Eye surgery', 'Dental surgery', 'ENT procedures', 'Endoscopy'].map((proc, i) => (
            <View key={i} style={s.dayCareItem}>
              <Ionicons name="checkmark-circle" size={14} color="#4CAF50" />
              <Text style={s.dayCareText}>{proc}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 10: CO-PAYMENT REDUCTION ==============
  const renderCoPay = () => (
    <View style={s.coPaySection}>
      <SectionHeader title="Co-Payment Reduction" subtitle="Lower your out-of-pocket" icon="pie-chart" iconColor="#3498DB" />
      <View style={s.coPayCard}>
        <View style={s.coPayComparison}>
          <View style={s.coPayOption}>
            <Text style={s.coPayOptionTitle}>Base Policy</Text>
            <Text style={[s.coPayOptionValue, { color: '#E74C3C' }]}>20% Co-pay</Text>
            <Text style={s.coPayOptionDesc}>You pay Rs 20,000 on Rs 1L claim</Text>
          </View>
          <View style={s.coPayVs}><Text style={s.coPayVsText}>VS</Text></View>
          <View style={s.coPayOption}>
            <Text style={s.coPayOptionTitle}>With Top-Up</Text>
            <Text style={[s.coPayOptionValue, { color: '#4CAF50' }]}>0% Co-pay</Text>
            <Text style={s.coPayOptionDesc}>Zero co-payment on top-up claims</Text>
          </View>
        </View>
        <View style={s.coPaySaving}>
          <Ionicons name="trending-down" size={16} color="#4CAF50" />
          <Text style={s.coPaySavingText}>Save up to Rs 2,00,000 on large claims</Text>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 11: NCB PROTECTION ==============
  const renderNCB = () => (
    <View style={s.ncbSection}>
      <SectionHeader title="NCB Protection" subtitle="Protect your no claim bonus" icon="shield-checkmark" iconColor="#FFB800" />
      <View style={s.ncbCard}>
        <View style={s.ncbVisual}>
          {[50, 40, 30, 20, 10].map((bonus, i) => (
            <View key={i} style={s.ncbBar}>
              <View style={[s.ncbBarFill, { height: `${bonus * 1.6}%`, backgroundColor: i === 0 ? '#4CAF50' : '#E0E0E0' }]} />
              <Text style={s.ncbBarLabel}>{bonus}%</Text>
            </View>
          ))}
        </View>
        <Text style={s.ncbText}>Your top-up protects your base policy NCB even after a claim</Text>
        <TouchableOpacity style={s.ncbToggle}>
          <Text style={s.ncbToggleText}>Enable NCB Protection</Text>
          <View style={s.ncbToggleDot} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 12: RESTORATION ENHANCEMENT ==============
  const renderRestoration = () => (
    <View style={s.restoreSection}>
      <SectionHeader title="Restoration Enhancement" subtitle="Multiple restoration options" icon="refresh" iconColor="#2ECC71" />
      <View style={s.restoreCard}>
        {[
          { type: 'Basic Restoration', desc: '100% SI restored once', premium: 'Included', icon: 'refresh-circle', color: '#4CAF50' },
          { type: 'Unlimited Restoration', desc: 'SI restored unlimited times', premium: '+Rs 1,500/yr', icon: 'infinite', color: '#3498DB' },
          { type: 'Super Restoration', desc: '200% SI restoration', premium: '+Rs 2,500/yr', icon: 'rocket', color: '#9B59B6' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.restoreRow} delay={i * 80}>
            <View style={[s.restoreIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <View style={s.restoreInfo}>
              <Text style={s.restoreType}>{item.type}</Text>
              <Text style={s.restoreDesc}>{item.desc}</Text>
            </View>
            <Text style={[s.restorePremium, { color: item.color }]}>{item.premium}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 13: MATERNITY TOP-UP ==============
  const renderMaternity = () => (
    <View style={s.maternitySection}>
      <SectionHeader title="Maternity Top-Up" subtitle="Newborn & delivery cover" icon="woman" iconColor="#9B59B6" />
      <View style={s.maternityCard}>
        {[
          { label: 'Normal Delivery', cover: 'Rs 50,000', icon: 'heart', color: '#4CAF50' },
          { label: 'C-Section', cover: 'Rs 75,000', icon: 'medkit', color: '#FF6B35' },
          { label: 'Newborn Cover', cover: 'Rs 50,000 (90 days)', icon: 'happy', color: '#3498DB' },
          { label: 'Vaccination', cover: 'Up to Rs 10,000', icon: 'medical', color: '#9B59B6' },
          { label: 'Pre-natal Care', cover: 'Included', icon: 'calendar', color: '#E74C3C' },
        ].map((item, i) => (
          <View key={i} style={[s.maternityRow, i < 4 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={[s.maternityIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={16} color={item.color} />
            </View>
            <Text style={s.maternityLabel}>{item.label}</Text>
            <Text style={[s.maternityCover, { color: item.color }]}>{item.cover}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 14: PREVENTIVE CARE ==============
  const renderPreventive = () => (
    <View style={s.preventiveSection}>
      <SectionHeader title="Preventive Care" subtitle="Stay healthy benefits" icon="fitness" iconColor="#4CAF50" />
      <View style={s.preventiveGrid}>
        {[
          { name: 'Annual Health\nCheck-Up', value: 'Worth Rs 5,000', icon: 'medkit', color: '#4CAF50' },
          { name: 'Gym\nMembership', value: '50% discount', icon: 'fitness', color: '#FF6B35' },
          { name: 'Wellness\nProgram', value: 'Free access', icon: 'leaf', color: '#2ECC71' },
          { name: 'Diet\nConsultation', value: '4 sessions/yr', icon: 'nutrition', color: '#9B59B6' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.preventiveCard} delay={i * 60}>
            <View style={[s.preventiveIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={s.preventiveName}>{item.name}</Text>
            <Text style={[s.preventiveValue, { color: item.color }]}>{item.value}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 15: ALTERNATIVE TREATMENTS ==============
  const renderAlternative = () => (
    <View style={s.altSection}>
      <SectionHeader title="Alternative Treatments" subtitle="AYUSH & more" icon="leaf" iconColor="#795548" />
      <View style={s.altCard}>
        {[
          { name: 'Ayurveda', coverage: 'Up to Rs 25,000', icon: 'leaf', color: '#4CAF50' },
          { name: 'Homeopathy', coverage: 'Up to Rs 20,000', icon: 'water', color: '#3498DB' },
          { name: 'Unani', coverage: 'Up to Rs 20,000', icon: 'flask', color: '#9B59B6' },
          { name: 'Siddha', coverage: 'Up to Rs 15,000', icon: 'flower', color: '#FF6B35' },
          { name: 'Yoga & Naturopathy', coverage: 'Up to Rs 10,000', icon: 'body', color: '#E91E63' },
        ].map((item, i) => (
          <View key={i} style={[s.altRow, i < 4 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={[s.altIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={16} color={item.color} />
            </View>
            <Text style={s.altName}>{item.name}</Text>
            <Text style={[s.altCoverage, { color: item.color }]}>{item.coverage}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 16: EMERGENCY SERVICES ==============
  const renderEmergency = () => (
    <View style={s.emergencySection}>
      <SectionHeader title="Emergency Services" subtitle="24/7 emergency support" icon="warning" iconColor="#E74C3C" />
      <View style={s.emergencyCard}>
        <View style={s.emergencyBanner}>
          <Ionicons name="call" size={32} color="#E74C3C" />
          <Text style={s.emergencyNumber}>1800-XXX-XXXX</Text>
          <Text style={s.emergencyLabel}>24/7 Emergency Helpline</Text>
        </View>
        <View style={s.emergencyGrid}>
          {[
            { label: 'Ambulance', value: 'Rs 5,000', icon: 'car' },
            { label: 'Air Ambulance', value: 'Rs 2.5L', icon: 'airplane' },
            { label: 'Global Emergency', value: 'Covered', icon: 'globe' },
            { label: 'ER Coverage', value: 'No Limit', icon: 'medkit' },
          ].map((item, i) => (
            <View key={i} style={s.emergencyGridItem}>
              <Ionicons name={item.icon} size={18} color="#E74C3C" />
              <Text style={s.emergencyGridLabel}>{item.label}</Text>
              <Text style={s.emergencyGridValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 17: CLAIMS RATIO ==============
  const renderClaimsRatio = () => (
    <View style={s.claimsSection}>
      <SectionHeader title="Claims Ratio" subtitle="Settlement performance" icon="analytics" iconColor="#3498DB" />
      <View style={s.claimsCard}>
        {[
          { insurer: 'Care Health', ratio: 74, time: '8 days', satisfaction: 4.5, color: '#4CAF50' },
          { insurer: 'Niva Bupa', ratio: 67, time: '12 days', satisfaction: 4.3, color: '#FF6B35' },
          { insurer: 'Star Health', ratio: 71, time: '10 days', satisfaction: 4.4, color: '#3498DB' },
        ].map((item, i) => (
          <View key={i} style={[s.claimsRow, i < 2 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={s.claimsInsurer}>
              <Text style={s.claimsInsurerName}>{item.insurer}</Text>
              <StarRating rating={item.satisfaction} size={10} />
            </View>
            <View style={s.claimsMetrics}>
              <View style={s.claimsMetric}>
                <Text style={[s.claimsMetricValue, { color: item.color }]}>{item.ratio}%</Text>
                <Text style={s.claimsMetricLabel}>Claim Ratio</Text>
              </View>
              <View style={s.claimsMetric}>
                <Text style={s.claimsMetricValue}>{item.time}</Text>
                <Text style={s.claimsMetricLabel}>Avg. Time</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 18: PREMIUM FINANCING ==============
  const renderEMI = () => (
    <View style={s.emiSection}>
      <SectionHeader title="Premium Financing" subtitle="Easy EMI options" icon="card" iconColor="#FF6B35" />
      <View style={s.emiCard}>
        <View style={s.emiOptions}>
          {[
            { months: 3, rate: '0%', emi: '1,400', color: '#4CAF50' },
            { months: 6, rate: '0%', emi: '700', color: '#FF6B35' },
            { months: 12, rate: '5%', emi: '380', color: '#3498DB' },
          ].map((opt, i) => (
            <View key={i} style={[s.emiOption, { borderColor: opt.color }]}>
              <Text style={[s.emiMonths, { color: opt.color }]}>{opt.months} Months</Text>
              <Text style={s.emiRate}>{opt.rate} interest</Text>
              <Text style={s.emiAmount}>Rs {opt.emi}/mo</Text>
            </View>
          ))}
        </View>
        <View style={s.emiBanks}>
          <Text style={s.emiBanksTitle}>Partner Banks</Text>
          <View style={s.emiBankRow}>
            {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak'].map((bank, i) => (
              <View key={i} style={s.emiBankChip}><Text style={s.emiBankText}>{bank}</Text></View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 19: TAX SAVINGS ==============
  const renderTax = () => (
    <View style={s.taxSection}>
      <SectionHeader title="Tax Savings" subtitle="Section 80D benefits" icon="cash" iconColor="#2ECC71" />
      <View style={s.taxCard}>
        <View style={s.taxBanner}>
          <Ionicons name="receipt" size={28} color="#2ECC71" />
          <Text style={s.taxBannerTitle}>Additional Tax Benefit</Text>
          <Text style={s.taxBannerDesc}>Top-up premium qualifies for Section 80D deduction</Text>
        </View>
        <View style={s.taxExample}>
          <Text style={s.taxExampleTitle}>Example Savings</Text>
          <View style={s.taxExampleRow}>
            <Text style={s.taxExampleLabel}>Top-Up Premium</Text>
            <Text style={s.taxExampleValue}>Rs 4,200/yr</Text>
          </View>
          <View style={s.taxExampleRow}>
            <Text style={s.taxExampleLabel}>Tax Bracket (30%)</Text>
            <Text style={s.taxExampleValue}>Rs 1,260 saved</Text>
          </View>
          <View style={[s.taxExampleRow, { borderTopWidth: 1, borderTopColor: '#E8F5E9', paddingTop: 8 }]}>
            <Text style={[s.taxExampleLabel, { fontWeight: '700' }]}>Effective Premium</Text>
            <Text style={[s.taxExampleValue, { color: '#2ECC71', fontWeight: '800' }]}>Rs 2,940/yr</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 20: REVIEWS ==============
  const renderReviews = () => (
    <View style={s.reviewSection}>
      <SectionHeader title="Customer Reviews" subtitle="Top-up specific feedback" icon="chatbubbles" iconColor="#FFB800" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.reviewScroll}>
        {REVIEWS.map((review, i) => (
          <AnimatedCard key={review.id} style={s.reviewCard} delay={i * 80}>
            <StarRating rating={review.rating} size={12} />
            <Text style={s.reviewComment} numberOfLines={3}>{review.comment}</Text>
            <View style={s.reviewFooter}>
              <View style={s.reviewUser}>
                <View style={s.reviewAvatar}><Text style={s.reviewAvatarText}>{review.user[0]}</Text></View>
                <Text style={s.reviewUserName}>{review.user}</Text>
                {review.verified && <Ionicons name="checkmark-circle" size={12} color="#2ECC71" />}
              </View>
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 21: COMPARE ==============
  const renderCompare = () => (
    <View style={s.compareSection}>
      <SectionHeader title="Compare With Others" subtitle="Side-by-side comparison" icon="git-compare" iconColor="#FF6B35" />
      <View style={s.compareCard}>
        <View style={s.compareHeader}>
          <View style={s.compareCol}><Text style={s.compareColTitle}>Feature</Text></View>
          <View style={s.compareCol}><Text style={[s.compareColTitle, { color: '#4CAF50' }]}>Top-Up</Text></View>
          <View style={s.compareCol}><Text style={[s.compareColTitle, { color: '#3498DB' }]}>New Policy</Text></View>
        </View>
        {[
          { feature: 'Premium', topup: 'Rs 4,200', newPolicy: 'Rs 15,000' },
          { feature: 'Coverage', topup: 'Rs 50L', newPolicy: 'Rs 50L' },
          { feature: 'Deductible', topup: 'Rs 3L', newPolicy: 'None' },
          { feature: 'Waiting Period', topup: 'None', newPolicy: '2-4 years' },
          { feature: 'Cost Savings', topup: '72%', newPolicy: 'Baseline' },
        ].map((row, i) => (
          <View key={i} style={s.compareRow}>
            <View style={s.compareCol}><Text style={s.compareFeature}>{row.feature}</Text></View>
            <View style={s.compareCol}><Text style={[s.compareValue, { color: '#4CAF50' }]}>{row.topup}</Text></View>
            <View style={s.compareCol}><Text style={s.compareValue}>{row.newPolicy}</Text></View>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 22: EXPERT RECOMMENDATIONS ==============
  const renderExperts = () => (
    <View style={s.expertSection}>
      <SectionHeader title="Expert Recommendations" subtitle="Personalized picks" icon="people" iconColor="#9B59B6" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.expertScroll}>
        {EXPERTS.map((expert, i) => (
          <AnimatedCard key={expert.id} style={s.expertCard} delay={i * 60}>
            <View style={s.expertAvatar}><Ionicons name="person" size={22} color="#9B59B6" /></View>
            <Text style={s.expertName}>{expert.name}</Text>
            <Text style={s.expertSpec}>{expert.specialty}</Text>
            <View style={s.expertRating}>
              <Ionicons name="star" size={10} color="#FFB800" />
              <Text style={s.expertRatingText}>{expert.rating} ({expert.reviews})</Text>
            </View>
            <TouchableOpacity style={s.expertBtn}>
              <Text style={s.expertBtnText}>Consult</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 23: FAQ ==============
  const renderFAQ = () => (
    <View style={s.faqSection}>
      <SectionHeader title="FAQs" subtitle="Top-up specific questions" icon="help-circle" iconColor="#4CAF50" />
      {INSURANCE_FAQS.filter(f => f.category === 'topup' || f.category === 'basics').slice(0, 5).map(faq => (
        <FAQItem key={faq.id} item={faq} />
      ))}
    </View>
  );

  // ============== SECTION 24: SUPPORT OPTIONS ==============
  const renderSupport = () => (
    <View style={s.supportSection}>
      <SectionHeader title="Support Options" subtitle="Dedicated top-up helpline" icon="headset" iconColor="#3498DB" />
      <View style={s.supportGrid}>
        {[
          { title: 'Call Us', desc: '1800-XXX-XXXX', icon: 'call', color: '#4CAF50' },
          { title: 'WhatsApp', desc: 'Instant replies', icon: 'logo-whatsapp', color: '#25D366' },
          { title: 'Email', desc: 'topup@insure.com', icon: 'mail', color: '#3498DB' },
          { title: 'Schedule', desc: 'Book a callback', icon: 'calendar', color: '#FF6B35' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={s.supportItem}>
            <View style={[s.supportIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={s.supportTitle}>{item.title}</Text>
            <Text style={s.supportDesc}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 25: FOOTER ==============
  const renderFooter = () => (
    <LinearGradient colors={['#4CAF50', '#2E7D32']} style={s.footerGradient}>
      <Ionicons name="shield-checkmark" size={32} color="#fff" />
      <Text style={s.footerTitle}>Secure Your Future</Text>
      <Text style={s.footerDesc}>IRDAI Licensed | 256-bit Encryption</Text>
      <TouchableOpacity style={s.footerBtn}>
        <Text style={s.footerBtnText}>Get Top-Up Now</Text>
      </TouchableOpacity>
    </LinearGradient>
  );

  if (isLoading) {
    return (
      <View style={[s.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#4CAF50'} />
        <View style={{ backgroundColor: isDarkMode ? colors.surface : '#4CAF50', height: 260 }} />
        <View style={{ padding: 16 }}><SkeletonSection /><SkeletonPlanCard /><SkeletonGrid /><SkeletonSection /></View>
      </View>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#4CAF50'} />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#4CAF50" colors={['#4CAF50']} />}
      >
        {renderHeader()}
        <FadeInSection delay={100}>{renderBasePolicy()}</FadeInSection>
        <FadeInSection delay={150}>{renderCalculator()}</FadeInSection>
        <FadeInSection delay={200}>{renderCoverageIncrease()}</FadeInSection>
        <FadeInSection delay={250}>{renderNetworkHospitals()}</FadeInSection>
        <FadeInSection delay={300}>{renderDiseaseCoverage()}</FadeInSection>
        <FadeInSection delay={350}>{renderRoomRent()}</FadeInSection>
        <FadeInSection delay={400}>{renderICU()}</FadeInSection>
        <FadeInSection delay={450}>{renderDayCare()}</FadeInSection>
        <FadeInSection delay={500}>{renderCoPay()}</FadeInSection>
        <FadeInSection delay={550}>{renderNCB()}</FadeInSection>
        <FadeInSection delay={600}>{renderRestoration()}</FadeInSection>
        <FadeInSection delay={650}>{renderMaternity()}</FadeInSection>
        <FadeInSection delay={700}>{renderPreventive()}</FadeInSection>
        <FadeInSection delay={750}>{renderAlternative()}</FadeInSection>
        <FadeInSection delay={800}>{renderEmergency()}</FadeInSection>
        <FadeInSection delay={850}>{renderClaimsRatio()}</FadeInSection>
        <FadeInSection delay={900}>{renderEMI()}</FadeInSection>
        <FadeInSection delay={950}>{renderTax()}</FadeInSection>
        <FadeInSection delay={1000}>{renderReviews()}</FadeInSection>
        <FadeInSection delay={1050}>{renderCompare()}</FadeInSection>
        <FadeInSection delay={1100}>{renderExperts()}</FadeInSection>
        <FadeInSection delay={1150}>{renderFAQ()}</FadeInSection>
        <FadeInSection delay={1200}>{renderSupport()}</FadeInSection>
        {renderFooter()}
        <View style={{ height: 20 }} />
      </Animated.ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },

  // Header
  headerGradient: { paddingBottom: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8 },
  backBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '700' },
  headerBody: { alignItems: 'center', marginTop: 12 },
  headerShieldStack: { width: 72, height: 72, justifyContent: 'center', alignItems: 'center' },
  shieldBase: { position: 'absolute' },
  shieldTop: {},
  headerTagline: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 8 },
  headerDesc: { color: '#C8E6C9', fontSize: 13, marginTop: 4 },
  headerGapViz: { marginTop: 16, marginHorizontal: 24, width: SCREEN_WIDTH - 48 },
  gapBarContainer: { flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden' },
  gapBar: { height: '100%' },
  gapLabels: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  gapLabel: { color: '#C8E6C9', fontSize: 11 },

  // Base Policy
  basePolicySection: { paddingVertical: 8 },
  basePolicyCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  basePolicyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  basePolicyIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  basePolicyInfo: { flex: 1, marginLeft: 10 },
  basePolicyName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E' },
  basePolicyInsurer: { fontSize: 12, color: '#666' },
  basePolicyStatusDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#4CAF50' },
  basePolicyStats: { flexDirection: 'row', marginBottom: 12 },
  basePolicyStat: { flex: 1, alignItems: 'center' },
  basePolicyStatValue: { fontSize: 16, fontWeight: '800', color: '#1A1A2E' },
  basePolicyStatLabel: { fontSize: 10, color: '#999', marginTop: 1 },
  basePolicyStatDivider: { width: 1, backgroundColor: '#F0F0F0' },
  basePolicyRemaining: { fontSize: 11, color: '#4CAF50', fontWeight: '500', marginTop: 6, textAlign: 'center' },

  // Calculator
  calcSection: { paddingVertical: 8 },
  calcCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  calcLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  calcDeductibles: { flexDirection: 'row', gap: 6 },
  calcDeductibleChip: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#F0F0F0', alignItems: 'center' },
  calcDeductibleActive: { backgroundColor: '#4CAF50' },
  calcDeductibleText: { fontSize: 11, fontWeight: '600', color: '#666' },
  calcAmounts: { flexDirection: 'row', gap: 6 },
  calcAmountChip: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#F0F0F0', alignItems: 'center' },
  calcAmountActive: { backgroundColor: '#4CAF50' },
  calcAmountText: { fontSize: 11, fontWeight: '600', color: '#666' },
  calcResult: { alignItems: 'center', padding: 16, backgroundColor: '#E8F5E9', borderRadius: 12, marginTop: 16, marginBottom: 12 },
  calcResultLabel: { fontSize: 12, color: '#666' },
  calcResultValue: { fontSize: 28, fontWeight: '800', color: '#4CAF50', marginTop: 2 },
  calcResultSub: { fontSize: 12, color: '#999', marginTop: 2 },
  calcBtn: { backgroundColor: '#4CAF50', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  calcBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Coverage Increase
  coverageSection: { paddingVertical: 8 },
  coverageTiers: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  coverageTierCard: { width: (SCREEN_WIDTH - 32) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  coverageRecommended: { backgroundColor: '#FF6B35', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 4 },
  coverageRecommendedText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  coverageTierName: { fontSize: 14, fontWeight: '800' },
  coverageTierCoverage: { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginTop: 4 },
  coverageTierPremium: { fontSize: 12, color: '#666', marginTop: 2 },
  coverageTierSavings: { fontSize: 10, color: '#4CAF50', marginTop: 4 },

  // Hospital Network
  hospitalSection: { paddingVertical: 8 },
  hospitalScroll: { paddingHorizontal: 16 },
  hospitalCard: { width: 180, backgroundColor: '#fff', borderRadius: 14, padding: 12, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  hospitalTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  hospitalPremiumBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#FFF8E1', paddingHorizontal: 4, paddingVertical: 1, borderRadius: 4 },
  hospitalPremiumText: { fontSize: 8, fontWeight: '700', color: '#FFB800' },
  hospitalName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  hospitalCity: { fontSize: 10, color: '#666', marginTop: 2 },
  hospitalSpecialties: { flexDirection: 'row', gap: 4, marginTop: 6 },
  specialtyChip: { backgroundColor: '#F0F0F0', paddingHorizontal: 5, paddingVertical: 2, borderRadius: 4 },
  specialtyText: { fontSize: 9, color: '#666' },

  // Disease Coverage
  diseaseSection: { paddingVertical: 8 },
  diseaseCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  diseaseRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  diseaseIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  diseaseInfo: { flex: 1, marginLeft: 10 },
  diseaseName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  diseaseWait: { fontSize: 10, color: '#999' },
  diseaseCov: { fontSize: 12, fontWeight: '600', color: '#4CAF50' },

  // Room Rent
  roomSection: { paddingVertical: 8 },
  roomCard: { marginHorizontal: 16 },
  roomRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  roomIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  roomInfo: { flex: 1, marginLeft: 10 },
  roomType: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  roomLimit: { fontSize: 11, color: '#666', marginTop: 1 },
  roomPremium: { fontSize: 12, fontWeight: '600' },

  // ICU
  icuSection: { paddingVertical: 8 },
  icuCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  icuHeader: { alignItems: 'center', padding: 20, backgroundColor: '#FFEBEE' },
  icuIconLarge: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  icuTitle: { fontSize: 18, fontWeight: '800', color: '#E74C3C', marginTop: 8 },
  icuDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  icuGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12 },
  icuGridItem: { width: '50%', padding: 8, alignItems: 'center' },
  icuGridLabel: { fontSize: 11, color: '#666', marginTop: 4 },
  icuGridValue: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },

  // Day Care
  dayCareSection: { paddingVertical: 8 },
  dayCareCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  dayCareCount: { fontSize: 14, fontWeight: '700', color: '#4CAF50', textAlign: 'center', marginBottom: 12 },
  dayCareList: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCareItem: { width: '50%', flexDirection: 'row', alignItems: 'center', gap: 4, paddingVertical: 4 },
  dayCareText: { fontSize: 12, color: '#444' },

  // Co-Payment
  coPaySection: { paddingVertical: 8 },
  coPayCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  coPayComparison: { flexDirection: 'row', alignItems: 'center' },
  coPayOption: { flex: 1, alignItems: 'center', padding: 10 },
  coPayOptionTitle: { fontSize: 12, fontWeight: '600', color: '#1A1A2E' },
  coPayOptionValue: { fontSize: 18, fontWeight: '800', marginTop: 4 },
  coPayOptionDesc: { fontSize: 10, color: '#666', marginTop: 2, textAlign: 'center' },
  coPayVs: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  coPayVsText: { fontSize: 10, fontWeight: '700', color: '#999' },
  coPaySaving: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0', justifyContent: 'center' },
  coPaySavingText: { fontSize: 12, color: '#4CAF50', fontWeight: '600' },

  // NCB
  ncbSection: { paddingVertical: 8 },
  ncbCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  ncbVisual: { flexDirection: 'row', justifyContent: 'space-around', height: 100, alignItems: 'flex-end', marginBottom: 12 },
  ncbBar: { alignItems: 'center', width: 32 },
  ncbBarFill: { width: 24, borderRadius: 4 },
  ncbBarLabel: { fontSize: 10, color: '#666', marginTop: 4 },
  ncbText: { fontSize: 12, color: '#444', textAlign: 'center', lineHeight: 18, marginBottom: 12 },
  ncbToggle: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 12, borderRadius: 10, backgroundColor: '#E8F5E9' },
  ncbToggleText: { fontSize: 13, fontWeight: '600', color: '#4CAF50' },
  ncbToggleDot: { width: 40, height: 22, borderRadius: 11, backgroundColor: '#4CAF50' },

  // Restoration
  restoreSection: { paddingVertical: 8 },
  restoreCard: { marginHorizontal: 16 },
  restoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  restoreIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  restoreInfo: { flex: 1, marginLeft: 10 },
  restoreType: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  restoreDesc: { fontSize: 11, color: '#666', marginTop: 1 },
  restorePremium: { fontSize: 12, fontWeight: '600' },

  // Maternity
  maternitySection: { paddingVertical: 8 },
  maternityCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  maternityRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  maternityIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  maternityLabel: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginLeft: 10 },
  maternityCover: { fontSize: 12, fontWeight: '600' },

  // Preventive
  preventiveSection: { paddingVertical: 8 },
  preventiveGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  preventiveCard: { width: (SCREEN_WIDTH - 32) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  preventiveIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  preventiveName: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  preventiveValue: { fontSize: 11, fontWeight: '600', marginTop: 4 },

  // Alternative
  altSection: { paddingVertical: 8 },
  altCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  altRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  altIcon: { width: 32, height: 32, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  altName: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginLeft: 10 },
  altCoverage: { fontSize: 12, fontWeight: '600' },

  // Emergency
  emergencySection: { paddingVertical: 8 },
  emergencyCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  emergencyBanner: { alignItems: 'center', padding: 20, backgroundColor: '#FFEBEE' },
  emergencyNumber: { fontSize: 22, fontWeight: '800', color: '#E74C3C', marginTop: 6 },
  emergencyLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  emergencyGrid: { flexDirection: 'row', flexWrap: 'wrap', padding: 12 },
  emergencyGridItem: { width: '50%', padding: 8, alignItems: 'center' },
  emergencyGridLabel: { fontSize: 11, color: '#666', marginTop: 4 },
  emergencyGridValue: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },

  // Claims
  claimsSection: { paddingVertical: 8 },
  claimsCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  claimsRow: { padding: 14 },
  claimsInsurer: { marginBottom: 6 },
  claimsInsurerName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 2 },
  claimsMetrics: { flexDirection: 'row', gap: 20 },
  claimsMetric: {},
  claimsMetricValue: { fontSize: 16, fontWeight: '800', color: '#1A1A2E' },
  claimsMetricLabel: { fontSize: 10, color: '#999' },

  // EMI
  emiSection: { paddingVertical: 8 },
  emiCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  emiOptions: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  emiOption: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1.5 },
  emiMonths: { fontSize: 14, fontWeight: '800' },
  emiRate: { fontSize: 10, color: '#666', marginTop: 2 },
  emiAmount: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', marginTop: 4 },
  emiBanks: { paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  emiBanksTitle: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  emiBankRow: { flexDirection: 'row', gap: 6 },
  emiBankChip: { backgroundColor: '#F5F5F5', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6 },
  emiBankText: { fontSize: 11, fontWeight: '600', color: '#666' },

  // Tax
  taxSection: { paddingVertical: 8 },
  taxCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  taxBanner: { alignItems: 'center', padding: 16, backgroundColor: '#E8F5E9' },
  taxBannerTitle: { fontSize: 16, fontWeight: '700', color: '#2ECC71', marginTop: 6 },
  taxBannerDesc: { fontSize: 12, color: '#666', marginTop: 2, textAlign: 'center' },
  taxExample: { padding: 16 },
  taxExampleTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  taxExampleRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  taxExampleLabel: { fontSize: 13, color: '#666' },
  taxExampleValue: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },

  // Reviews
  reviewSection: { paddingVertical: 8 },
  reviewScroll: { paddingHorizontal: 16 },
  reviewCard: { width: 220, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  reviewComment: { fontSize: 12, color: '#444', lineHeight: 17, marginTop: 6 },
  reviewFooter: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  reviewUser: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewAvatar: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
  reviewAvatarText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  reviewUserName: { fontSize: 11, fontWeight: '600', color: '#1A1A2E' },

  // Compare
  compareSection: { paddingVertical: 8 },
  compareCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  compareHeader: { flexDirection: 'row', backgroundColor: '#F5F5F5', paddingVertical: 10 },
  compareCol: { flex: 1, alignItems: 'center' },
  compareColTitle: { fontSize: 12, fontWeight: '700', color: '#1A1A2E' },
  compareRow: { flexDirection: 'row', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  compareFeature: { fontSize: 12, fontWeight: '600', color: '#1A1A2E' },
  compareValue: { fontSize: 12, color: '#666' },

  // Experts
  expertSection: { paddingVertical: 8 },
  expertScroll: { paddingHorizontal: 16 },
  expertCard: { width: 140, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  expertAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3E5F5', justifyContent: 'center', alignItems: 'center' },
  expertName: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center', marginTop: 6 },
  expertSpec: { fontSize: 9, color: '#666', textAlign: 'center', marginTop: 2 },
  expertRating: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 4 },
  expertRatingText: { fontSize: 10, color: '#666' },
  expertBtn: { marginTop: 8, backgroundColor: '#4CAF50', paddingHorizontal: 16, paddingVertical: 5, borderRadius: 6 },
  expertBtnText: { color: '#fff', fontSize: 11, fontWeight: '700' },

  // FAQ
  faqSection: { paddingVertical: 8 },

  // Support
  supportSection: { paddingVertical: 8 },
  supportGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  supportItem: { width: (SCREEN_WIDTH - 32) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  supportIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  supportTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  supportDesc: { fontSize: 10, color: '#666', marginTop: 2 },

  // Footer
  footerGradient: { padding: 24, alignItems: 'center', marginTop: 8 },
  footerTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 8 },
  footerDesc: { color: '#C8E6C9', fontSize: 12, marginTop: 4 },
  footerBtn: { backgroundColor: '#fff', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10, marginTop: 12 },
  footerBtnText: { color: '#4CAF50', fontSize: 14, fontWeight: '700' },
});
