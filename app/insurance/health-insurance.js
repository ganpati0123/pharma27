import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useInsuranceStore, INSURANCE_PLANS, HOSPITALS, EXPERTS, INSURANCE_FAQS, REVIEWS, WELLNESS_PROGRAMS } from '../components/insurance/store';
import SectionHeader from '../components/insurance/shared/SectionHeader';
import AnimatedCard from '../components/insurance/shared/AnimatedCard';
import { SkeletonSection, SkeletonGrid, SkeletonPlanCard } from '../components/insurance/shared/SkeletonLoader';
import FadeInSection from '../components/insurance/shared/FadeInSection';
import useTheme from '../components/insurance/shared/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============== STAR RATING ==============
const StarRating = ({ rating, size = 14, color = '#FFB800' }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Ionicons key={i} name={i <= rating ? 'star' : i - 0.5 <= rating ? 'star-half' : 'star-outline'} size={size} color={color} />
    ))}
  </View>
);

// ============== PROGRESS BAR ==============
const ProgressBar = ({ progress, color = '#FF6B35', height = 6 }) => {
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

// ============== FAQ ITEM ==============
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
          <Ionicons name="chevron-down" size={18} color="#666" />
        </Animated.View>
      </View>
      <Animated.View style={{ maxHeight: maxH, overflow: 'hidden' }}>
        <Text style={faqStyles.answer}>{item.answer}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};
const faqStyles = StyleSheet.create({
  item: { backgroundColor: '#fff', marginHorizontal: 16, marginBottom: 6, borderRadius: 10, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  question: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', flex: 1, marginRight: 8 },
  answer: { fontSize: 12, color: '#666', lineHeight: 18, marginTop: 8 },
});

export default function HealthInsurancePage() {
  const store = useInsuranceStore();
  const router = useRouter();
  const { isDarkMode, colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPlanTab, setSelectedPlanTab] = useState('popular');
  const [selectedCoPay, setSelectedCoPay] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setIsLoading(true);
    setTimeout(() => {
      setRefreshing(false);
      setIsLoading(false);
    }, 1500);
  }, []);

  // ============== SECTION 1: PREMIUM HEADER ==============
  const renderHeader = () => (
    <LinearGradient colors={['#FF6B35', '#FF5722', '#E64A19']} style={s.headerGradient}>
      <SafeAreaView edges={['top']}>
        <View style={s.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={s.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Health Insurance</Text>
          <TouchableOpacity style={s.backBtn}>
            <Ionicons name="share-social" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={s.headerBody}>
          <View style={s.headerShield}>
            <Ionicons name="shield-checkmark" size={44} color="#fff" />
          </View>
          <Text style={s.headerTagline}>Complete Health Protection</Text>
          <Text style={s.headerDesc}>Comprehensive coverage for you and your family</Text>
          <View style={s.headerScoreRow}>
            <View style={s.healthScore}>
              <Text style={s.healthScoreValue}>{store.user.healthScore}</Text>
              <Text style={s.healthScoreLabel}>Health Score</Text>
            </View>
            <View style={s.healthScoreDivider} />
            <View style={s.healthScore}>
              <Text style={s.healthScoreValue}>6</Text>
              <Text style={s.healthScoreLabel}>Plans Available</Text>
            </View>
            <View style={s.healthScoreDivider} />
            <View style={s.healthScore}>
              <Text style={s.healthScoreValue}>1000+</Text>
              <Text style={s.healthScoreLabel}>Hospitals</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // ============== SECTION 2: PLANS COMPARISON ==============
  const renderPlansComparison = () => (
    <View style={s.plansSection}>
      <SectionHeader title="Compare Plans" subtitle="Find the best plan for you" icon="git-compare" iconColor="#FF6B35" />
      <View style={s.plansTabs}>
        {['popular', 'value', 'premium'].map(tab => (
          <TouchableOpacity key={tab} style={[s.planTab, selectedPlanTab === tab && s.planTabActive]} onPress={() => setSelectedPlanTab(tab)}>
            <Text style={[s.planTabText, selectedPlanTab === tab && s.planTabTextActive]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.plansScroll} pagingEnabled decelerationRate="fast" snapToInterval={SCREEN_WIDTH - 48}>
        {INSURANCE_PLANS.slice(0, 3).map((plan, i) => (
          <AnimatedCard key={plan.id} style={s.planCompareCard} delay={i * 100}>
            {plan.badge && (
              <View style={[s.planBadge, { backgroundColor: plan.badgeColor }]}>
                <Text style={s.planBadgeText}>{plan.badge}</Text>
              </View>
            )}
            <Text style={s.planCompName}>{plan.name}</Text>
            <Text style={s.planCompInsurer}>{plan.insurer}</Text>
            <View style={s.planCompStats}>
              <View style={s.planCompStat}>
                <Text style={s.planCompStatValue}>Rs {(plan.coverage / 100000).toFixed(0)}L</Text>
                <Text style={s.planCompStatLabel}>Coverage</Text>
              </View>
              <View style={s.planCompStat}>
                <Text style={s.planCompStatValue}>Rs {plan.premium.toLocaleString('en-IN')}</Text>
                <Text style={s.planCompStatLabel}>Premium/yr</Text>
              </View>
            </View>
            <View style={s.planCompFeatures}>
              {plan.features.slice(0, 4).map((f, j) => (
                <View key={j} style={s.planCompFeature}>
                  <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />
                  <Text style={s.planCompFeatureText}>{f}</Text>
                </View>
              ))}
            </View>
            <View style={s.planCompFooter}>
              <View style={s.planCompRating}>
                <StarRating rating={plan.rating} size={12} />
                <Text style={s.planCompRatingText}>{plan.rating}</Text>
              </View>
              <TouchableOpacity style={s.planCompBtn}>
                <Text style={s.planCompBtnText}>Select Plan</Text>
              </TouchableOpacity>
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 3: COVERAGE DETAILS ==============
  const renderCoverageDetails = () => (
    <View style={s.coverageSection}>
      <SectionHeader title="Coverage Details" subtitle="What's included" icon="umbrella" iconColor="#3498DB" />
      <View style={s.coverageCard}>
        {[
          { title: 'Hospitalization', desc: 'In-patient treatment expenses', amount: 'Up to Sum Insured', icon: 'bed', color: '#FF6B35' },
          { title: 'Pre-hospitalization', desc: '30-60 days before admission', amount: 'Included', icon: 'calendar', color: '#3498DB' },
          { title: 'Post-hospitalization', desc: '60-180 days after discharge', amount: 'Included', icon: 'time', color: '#4CAF50' },
          { title: 'Day Care Procedures', desc: '580+ procedures covered', amount: 'Full Cover', icon: 'medkit', color: '#9B59B6' },
          { title: 'Ambulance Charges', desc: 'Emergency transportation', amount: 'Up to Rs 5,000', icon: 'car', color: '#E74C3C' },
          { title: 'Organ Donor', desc: 'Donor expenses covered', amount: 'Included', icon: 'heart', color: '#FF6B35' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.coverageRow} delay={i * 50}>
            <View style={[s.coverageIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <View style={s.coverageInfo}>
              <Text style={s.coverageTitle}>{item.title}</Text>
              <Text style={s.coverageDesc}>{item.desc}</Text>
            </View>
            <Text style={s.coverageAmount}>{item.amount}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 4: HOSPITAL NETWORK ==============
  const renderHospitalNetwork = () => (
    <View style={s.hospitalSection}>
      <SectionHeader title="Hospital Network" subtitle="1000+ cashless hospitals" icon="business" iconColor="#4CAF50" actionText="View All" onAction={() => {}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hospitalScroll}>
        {HOSPITALS.map((hospital, i) => (
          <AnimatedCard key={hospital.id} style={s.hospitalCard} delay={i * 80}>
            <View style={s.hospitalHeader}>
              <View style={[s.hospitalIcon, hospital.premium && { backgroundColor: '#FFF8E1' }]}>
                <Ionicons name="business" size={20} color={hospital.premium ? '#FFB800' : '#4CAF50'} />
              </View>
              {hospital.premium && (
                <View style={s.premiumBadge}>
                  <Ionicons name="star" size={10} color="#FFB800" />
                  <Text style={s.premiumBadgeText}>Premium</Text>
                </View>
              )}
            </View>
            <Text style={s.hospitalName}>{hospital.name}</Text>
            <Text style={s.hospitalCity}>{hospital.city} • {hospital.distance}</Text>
            <View style={s.hospitalRating}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={s.hospitalRatingText}>{hospital.rating}</Text>
              <Text style={s.hospitalBeds}>{hospital.beds} beds</Text>
            </View>
            <View style={s.hospitalSpecialties}>
              {hospital.specialties.slice(0, 2).map((spec, j) => (
                <View key={j} style={s.specialtyChip}>
                  <Text style={s.specialtyText}>{spec}</Text>
                </View>
              ))}
            </View>
            {hospital.cashless && (
              <View style={s.cashlessBadge}>
                <Ionicons name="checkmark-circle" size={12} color="#4CAF50" />
                <Text style={s.cashlessText}>Cashless Available</Text>
              </View>
            )}
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 5: PRE-EXISTING CONDITIONS ==============
  const renderPreExisting = () => (
    <View style={s.preExistingSection}>
      <SectionHeader title="Pre-Existing Conditions" subtitle="Waiting period details" icon="medical" iconColor="#E74C3C" />
      <View style={s.preExistingCard}>
        {[
          { condition: 'Diabetes', waitingPeriod: '2-4 years', coverage: 'Full after waiting', icon: 'pulse', color: '#E74C3C' },
          { condition: 'Hypertension', waitingPeriod: '2-4 years', coverage: 'Full after waiting', icon: 'heart', color: '#FF6B35' },
          { condition: 'Thyroid Disorders', waitingPeriod: '2-3 years', coverage: 'Full after waiting', icon: 'medical', color: '#9B59B6' },
          { condition: 'Asthma', waitingPeriod: '2-4 years', coverage: 'Full after waiting', icon: 'cloud', color: '#3498DB' },
          { condition: 'Kidney Stones', waitingPeriod: '1-2 years', coverage: 'Full after waiting', icon: 'water', color: '#4CAF50' },
        ].map((item, i) => (
          <View key={i} style={[s.preExistingRow, i < 4 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={[s.preExistingIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={18} color={item.color} />
            </View>
            <View style={s.preExistingInfo}>
              <Text style={s.preExistingName}>{item.condition}</Text>
              <Text style={s.preExistingWait}>Waiting: {item.waitingPeriod}</Text>
            </View>
            <Text style={s.preExistingCoverage}>{item.coverage}</Text>
          </View>
        ))}
        <View style={s.preExistingNote}>
          <Ionicons name="information-circle" size={16} color="#FF6B35" />
          <Text style={s.preExistingNoteText}>Some plans offer reduced waiting periods for an additional premium</Text>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 6: MATERNITY COVERAGE ==============
  const renderMaternity = () => (
    <View style={s.maternitySection}>
      <SectionHeader title="Maternity Coverage" subtitle="Pregnancy & newborn care" icon="woman" iconColor="#9B59B6" />
      <View style={s.maternityCard}>
        <View style={s.maternityHeader}>
          <Ionicons name="heart" size={28} color="#9B59B6" />
          <Text style={s.maternityTitle}>Complete Maternity Benefits</Text>
        </View>
        <View style={s.maternityTimeline}>
          {[
            { phase: 'Pre-Natal', desc: 'Doctor consultations & tests', duration: '9 months', icon: 'calendar' },
            { phase: 'Delivery', desc: 'Normal & C-Section covered', duration: 'D-Day', icon: 'medkit' },
            { phase: 'Post-Natal', desc: 'Mother & baby care', duration: '90 days', icon: 'heart' },
            { phase: 'Newborn', desc: 'Baby cover from day 1', duration: '90 days', icon: 'happy' },
          ].map((item, i) => (
            <View key={i} style={s.maternityStep}>
              <View style={s.maternityStepDot}>
                <Ionicons name={item.icon} size={14} color="#9B59B6" />
              </View>
              {i < 3 && <View style={s.maternityStepLine} />}
              <View style={s.maternityStepContent}>
                <Text style={s.maternityStepPhase}>{item.phase}</Text>
                <Text style={s.maternityStepDesc}>{item.desc}</Text>
                <Text style={s.maternityStepDuration}>{item.duration}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={s.maternityCosts}>
          <Text style={s.maternityCostsTitle}>Estimated Coverage</Text>
          <View style={s.maternityCostRow}>
            <Text style={s.maternityCostLabel}>Normal Delivery</Text>
            <Text style={s.maternityCostValue}>Up to Rs 50,000</Text>
          </View>
          <View style={s.maternityCostRow}>
            <Text style={s.maternityCostLabel}>C-Section</Text>
            <Text style={s.maternityCostValue}>Up to Rs 75,000</Text>
          </View>
          <View style={s.maternityCostRow}>
            <Text style={s.maternityCostLabel}>Newborn Care</Text>
            <Text style={s.maternityCostValue}>Up to Rs 50,000</Text>
          </View>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 7: ROOM RENT LIMITS ==============
  const renderRoomRent = () => (
    <View style={s.roomSection}>
      <SectionHeader title="Room Rent Limits" subtitle="Choose your room type" icon="bed" iconColor="#FF6B35" />
      <View style={s.roomCard}>
        {[
          { type: 'General Ward', rent: 'Rs 2,000/day', ico: 'people', desc: 'Shared room with basic amenities', color: '#4CAF50' },
          { type: 'Twin Sharing', rent: 'Rs 4,000/day', ico: 'person', desc: 'Semi-private with 2 beds', color: '#3498DB' },
          { type: 'Single Room', rent: 'Rs 8,000/day', ico: 'home', desc: 'Private room with full amenities', color: '#FF6B35' },
          { type: 'ICU', rent: 'No limit', ico: 'pulse', desc: 'Intensive care unit coverage', color: '#E74C3C' },
        ].map((room, i) => (
          <AnimatedCard key={i} style={s.roomRow} delay={i * 60}>
            <View style={[s.roomIcon, { backgroundColor: room.color + '15' }]}>
              <Ionicons name={room.ico} size={20} color={room.color} />
            </View>
            <View style={s.roomInfo}>
              <Text style={s.roomType}>{room.type}</Text>
              <Text style={s.roomDesc}>{room.desc}</Text>
            </View>
            <Text style={[s.roomRent, { color: room.color }]}>{room.rent}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 8: DAY CARE PROCEDURES ==============
  const renderDayCare = () => (
    <View style={s.dayCareSection}>
      <SectionHeader title="Day Care Procedures" subtitle="580+ procedures covered" icon="medical" iconColor="#4CAF50" />
      <View style={s.dayCareCard}>
        <View style={s.dayCareGrid}>
          {[
            { name: 'Cataract Surgery', icon: 'eye', covered: true },
            { name: 'Dialysis', icon: 'water', covered: true },
            { name: 'Chemotherapy', icon: 'flask', covered: true },
            { name: 'Dental Surgery', icon: 'happy', covered: true },
            { name: 'Tonsillectomy', icon: 'medkit', covered: true },
            { name: 'Lithotripsy', icon: 'pulse', covered: true },
            { name: 'Angioplasty', icon: 'heart', covered: true },
            { name: 'Arthroscopy', icon: 'body', covered: true },
          ].map((proc, i) => (
            <View key={i} style={s.dayCareItem}>
              <Ionicons name={proc.icon} size={16} color="#4CAF50" />
              <Text style={s.dayCareName}>{proc.name}</Text>
              <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />
            </View>
          ))}
        </View>
        <TouchableOpacity style={s.dayCareMore}>
          <Text style={s.dayCareMoreText}>View all 580+ procedures</Text>
          <Ionicons name="arrow-forward" size={14} color="#4CAF50" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 9: CO-PAYMENT SECTION ==============
  const renderCoPayment = () => (
    <View style={s.coPaySection}>
      <SectionHeader title="Co-Payment Options" subtitle="Choose your co-pay percentage" icon="pie-chart" iconColor="#3498DB" />
      <View style={s.coPayCard}>
        <View style={s.coPayOptions}>
          {[0, 10, 20].map(pct => (
            <TouchableOpacity key={pct} style={[s.coPayOption, selectedCoPay === pct && s.coPayOptionActive]} onPress={() => setSelectedCoPay(pct)}>
              <Text style={[s.coPayOptionText, selectedCoPay === pct && s.coPayOptionTextActive]}>{pct}%</Text>
              <Text style={[s.coPayOptionLabel, selectedCoPay === pct && { color: '#fff' }]}>Co-pay</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.coPayImpact}>
          <Text style={s.coPayImpactTitle}>Premium Impact</Text>
          <View style={s.coPayImpactRow}>
            <Text style={s.coPayImpactLabel}>Base Premium</Text>
            <Text style={s.coPayImpactValue}>Rs 14,757/yr</Text>
          </View>
          <View style={s.coPayImpactRow}>
            <Text style={s.coPayImpactLabel}>With {selectedCoPay}% co-pay</Text>
            <Text style={[s.coPayImpactValue, { color: '#2ECC71' }]}>Rs {Math.round(14757 * (1 - selectedCoPay * 0.008)).toLocaleString('en-IN')}/yr</Text>
          </View>
          <View style={s.coPayImpactRow}>
            <Text style={s.coPayImpactLabel}>You save</Text>
            <Text style={[s.coPayImpactValue, { color: '#FF6B35', fontWeight: '800' }]}>Rs {Math.round(14757 * selectedCoPay * 0.008).toLocaleString('en-IN')}/yr</Text>
          </View>
        </View>
        <View style={s.coPayNote}>
          <Ionicons name="information-circle" size={14} color="#3498DB" />
          <Text style={s.coPayNoteText}>With co-payment, you pay {selectedCoPay}% of every claim amount</Text>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 10: NO CLAIM BONUS ==============
  const renderNCB = () => (
    <View style={s.ncbSection}>
      <SectionHeader title="No Claim Bonus" subtitle="Rewards for staying healthy" icon="gift" iconColor="#FFB800" />
      <View style={s.ncbCard}>
        <View style={s.ncbLadder}>
          {[
            { year: 'Year 1', bonus: '10%', total: '110%', active: true },
            { year: 'Year 2', bonus: '20%', total: '130%', active: true },
            { year: 'Year 3', bonus: '30%', total: '160%', active: false },
            { year: 'Year 4', bonus: '40%', total: '200%', active: false },
            { year: 'Year 5', bonus: '50%', total: '250%', active: false },
          ].map((item, i) => (
            <View key={i} style={s.ncbStep}>
              <View style={[s.ncbStepDot, item.active && s.ncbStepDotActive]}>
                {item.active ? <Ionicons name="checkmark" size={12} color="#fff" /> : <Text style={s.ncbStepNum}>{i + 1}</Text>}
              </View>
              <View style={s.ncbStepContent}>
                <Text style={[s.ncbStepYear, item.active && { color: '#FF6B35' }]}>{item.year}</Text>
                <Text style={s.ncbStepBonus}>+{item.bonus} bonus</Text>
              </View>
              <Text style={[s.ncbStepTotal, item.active && { color: '#FF6B35', fontWeight: '800' }]}>{item.total}</Text>
            </View>
          ))}
        </View>
        <View style={s.ncbTransfer}>
          <Ionicons name="swap-horizontal" size={16} color="#3498DB" />
          <Text style={s.ncbTransferText}>NCB is transferable when you port your policy</Text>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 11: RESTORATION BENEFIT ==============
  const renderRestoration = () => (
    <View style={s.restorationSection}>
      <SectionHeader title="Restoration Benefit" subtitle="Sum insured gets restored" icon="refresh" iconColor="#2ECC71" />
      <View style={s.restorationCard}>
        <View style={s.restorationVisual}>
          <View style={s.restorationBar}>
            <View style={[s.restorationFill, { width: '100%', backgroundColor: '#2ECC71' }]} />
          </View>
          <Text style={s.restorationLabel}>Full Sum Insured: Rs 10L</Text>
          <Ionicons name="arrow-down" size={20} color="#E74C3C" style={{ marginVertical: 4 }} />
          <View style={s.restorationBar}>
            <View style={[s.restorationFill, { width: '30%', backgroundColor: '#E74C3C' }]} />
          </View>
          <Text style={s.restorationLabel}>After Claim: Rs 3L remaining</Text>
          <Ionicons name="arrow-down" size={20} color="#2ECC71" style={{ marginVertical: 4 }} />
          <View style={s.restorationBar}>
            <View style={[s.restorationFill, { width: '100%', backgroundColor: '#2ECC71' }]} />
          </View>
          <Text style={[s.restorationLabel, { color: '#2ECC71', fontWeight: '700' }]}>Restored: Rs 10L available again!</Text>
        </View>
        <Text style={s.restorationNote}>Restoration benefit restores your sum insured for subsequent claims in the same policy year</Text>
      </View>
    </View>
  );

  // ============== SECTION 12: AMBULANCE COVERAGE ==============
  const renderAmbulance = () => (
    <View style={s.ambulanceSection}>
      <SectionHeader title="Ambulance Coverage" subtitle="Emergency transportation" icon="car" iconColor="#E74C3C" />
      <View style={s.ambulanceCard}>
        <View style={s.ambulanceEmergency}>
          <View style={s.ambulanceIcon}>
            <Ionicons name="call" size={28} color="#E74C3C" />
          </View>
          <Text style={s.ambulanceTitle}>Emergency Ambulance</Text>
          <Text style={s.ambulanceDesc}>24/7 emergency ambulance service</Text>
          <TouchableOpacity style={s.ambulanceBtn}>
            <Ionicons name="call" size={16} color="#fff" />
            <Text style={s.ambulanceBtnText}>Call Emergency</Text>
          </TouchableOpacity>
        </View>
        <View style={s.ambulanceDetails}>
          {[
            { label: 'Coverage Amount', value: 'Up to Rs 5,000' },
            { label: 'Network Ambulances', value: '500+ nationwide' },
            { label: 'Response Time', value: '15-30 minutes' },
            { label: 'Air Ambulance', value: 'Rs 2.5L (select plans)' },
          ].map((item, i) => (
            <View key={i} style={s.ambulanceDetailRow}>
              <Text style={s.ambulanceDetailLabel}>{item.label}</Text>
              <Text style={s.ambulanceDetailValue}>{item.value}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 13: HEALTH CHECK-UPS ==============
  const renderHealthCheckups = () => (
    <View style={s.checkupSection}>
      <SectionHeader title="Health Check-Ups" subtitle="Annual preventive care" icon="fitness" iconColor="#FF6B35" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.checkupScroll}>
        {[
          { name: 'Basic Health\nPackage', tests: 30, value: 'Rs 1,500', icon: 'pulse', color: '#4CAF50' },
          { name: 'Comprehensive\nPackage', tests: 65, value: 'Rs 3,000', icon: 'fitness', color: '#FF6B35' },
          { name: 'Executive\nPackage', tests: 90, value: 'Rs 5,000', icon: 'diamond', color: '#9B59B6' },
          { name: 'Senior Citizen\nPackage', tests: 75, value: 'Rs 4,000', icon: 'accessibility', color: '#3498DB' },
        ].map((pkg, i) => (
          <AnimatedCard key={i} style={s.checkupCard} delay={i * 80}>
            <View style={[s.checkupIcon, { backgroundColor: pkg.color + '15' }]}>
              <Ionicons name={pkg.icon} size={24} color={pkg.color} />
            </View>
            <Text style={s.checkupName}>{pkg.name}</Text>
            <Text style={s.checkupTests}>{pkg.tests} tests included</Text>
            <Text style={[s.checkupValue, { color: pkg.color }]}>Worth {pkg.value}</Text>
            <TouchableOpacity style={[s.checkupBtn, { borderColor: pkg.color }]}>
              <Text style={[s.checkupBtnText, { color: pkg.color }]}>Book Now</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 14: TELEMEDICINE ==============
  const renderTelemedicine = () => (
    <View style={s.teleSection}>
      <SectionHeader title="Telemedicine" subtitle="Consult doctors online" icon="videocam" iconColor="#3498DB" />
      <View style={s.teleCard}>
        <View style={s.teleBanner}>
          <Ionicons name="videocam" size={32} color="#3498DB" />
          <Text style={s.teleBannerTitle}>Free Teleconsultation</Text>
          <Text style={s.teleBannerDesc}>Unlimited video consultations with 5000+ doctors</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.teleScroll}>
          {EXPERTS.map((doc, i) => (
            <View key={doc.id} style={s.teleDocCard}>
              <View style={s.teleDocAvatar}>
                <Ionicons name="person" size={22} color="#3498DB" />
              </View>
              <Text style={s.teleDocName} numberOfLines={1}>{doc.name}</Text>
              <Text style={s.teleDocSpec}>{doc.specialty}</Text>
              <View style={s.teleDocStatus}>
                <View style={[s.teleDocDot, { backgroundColor: doc.available ? '#2ECC71' : '#E0E0E0' }]} />
                <Text style={s.teleDocStatusText}>{doc.available ? 'Available' : 'Busy'}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );

  // ============== SECTION 15: WELLNESS PROGRAMS ==============
  const renderWellness = () => (
    <View style={s.wellnessSection}>
      <SectionHeader title="Wellness Programs" subtitle="Stay healthy, earn rewards" icon="leaf" iconColor="#4CAF50" />
      <View style={s.wellnessGrid}>
        {WELLNESS_PROGRAMS.map((program, i) => (
          <AnimatedCard key={program.id} style={s.wellnessCard} delay={i * 80}>
            <View style={s.wellnessIcon}>
              <Ionicons name={program.icon} size={24} color="#4CAF50" />
            </View>
            <Text style={s.wellnessName}>{program.name}</Text>
            {program.target && <Text style={s.wellnessTarget}>{program.target}</Text>}
            {program.reward && <Text style={s.wellnessReward}>{program.reward}</Text>}
            {program.progress !== undefined && (
              <View style={{ marginTop: 6 }}>
                <ProgressBar progress={program.progress} color="#4CAF50" />
                <Text style={s.wellnessProgress}>{program.progress}%</Text>
              </View>
            )}
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 16: DISEASE MANAGEMENT ==============
  const renderDiseaseManagement = () => (
    <View style={s.diseaseSection}>
      <SectionHeader title="Disease Management" subtitle="Condition-specific programs" icon="pulse" iconColor="#E74C3C" />
      {[
        { name: 'Diabetes Care', desc: 'Comprehensive diabetes management', progress: 65, icon: 'pulse', color: '#E74C3C' },
        { name: 'Heart Health', desc: 'Cardiac wellness program', progress: 40, icon: 'heart', color: '#FF6B35' },
        { name: 'Cancer Care', desc: 'Early detection & treatment support', progress: 25, icon: 'ribbon', color: '#9B59B6' },
      ].map((disease, i) => (
        <AnimatedCard key={i} style={s.diseaseCard} delay={i * 80}>
          <View style={s.diseaseHeader}>
            <View style={[s.diseaseIcon, { backgroundColor: disease.color + '15' }]}>
              <Ionicons name={disease.icon} size={20} color={disease.color} />
            </View>
            <View style={s.diseaseInfo}>
              <Text style={s.diseaseName}>{disease.name}</Text>
              <Text style={s.diseaseDesc}>{disease.desc}</Text>
            </View>
          </View>
          <View style={{ marginTop: 8 }}>
            <ProgressBar progress={disease.progress} color={disease.color} />
            <Text style={s.diseaseProgress}>{disease.progress}% care plan complete</Text>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 17: CLAIMS HISTORY ==============
  const renderClaimsHistory = () => (
    <View style={s.claimsSection}>
      <SectionHeader title="Claims History" subtitle="Track your claims" icon="document-text" iconColor="#FF6B35" />
      <View style={s.claimsCard}>
        <View style={s.claimsStats}>
          <View style={s.claimsStat}>
            <Text style={[s.claimsStatValue, { color: '#2ECC71' }]}>92%</Text>
            <Text style={s.claimsStatLabel}>Approval Rate</Text>
          </View>
          <View style={s.claimsStatDivider} />
          <View style={s.claimsStat}>
            <Text style={[s.claimsStatValue, { color: '#3498DB' }]}>4.2 hrs</Text>
            <Text style={s.claimsStatLabel}>Avg. Response</Text>
          </View>
          <View style={s.claimsStatDivider} />
          <View style={s.claimsStat}>
            <Text style={[s.claimsStatValue, { color: '#FF6B35' }]}>15 days</Text>
            <Text style={s.claimsStatLabel}>Settlement</Text>
          </View>
        </View>
        <TouchableOpacity style={s.claimsBtn}>
          <Ionicons name="add-circle" size={16} color="#FF6B35" />
          <Text style={s.claimsBtnText}>File New Claim</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 18: PREMIUM CALCULATOR ==============
  const renderCalculator = () => (
    <View style={s.calcSection}>
      <SectionHeader title="Premium Calculator" subtitle="Get instant estimate" icon="calculator" iconColor="#9B59B6" />
      <View style={s.calcCard}>
        <View style={s.calcRow}>
          <Text style={s.calcLabel}>Your Age</Text>
          <View style={s.calcSliderRow}>
            <TouchableOpacity style={s.calcSliderBtn} onPress={() => store.setCalculatorAge(Math.max(18, store.calculatorAge - 1))}>
              <Ionicons name="remove" size={16} color="#FF6B35" />
            </TouchableOpacity>
            <Text style={s.calcSliderValue}>{store.calculatorAge} years</Text>
            <TouchableOpacity style={s.calcSliderBtn} onPress={() => store.setCalculatorAge(Math.min(65, store.calculatorAge + 1))}>
              <Ionicons name="add" size={16} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={s.calcRow}>
          <Text style={s.calcLabel}>Coverage Amount</Text>
          <View style={s.calcCoverOptions}>
            {['5L', '10L', '15L', '25L', '50L'].map(amt => (
              <TouchableOpacity key={amt} style={[s.calcCoverBtn, store.calculatorCoverage === parseInt(amt) * 100000 && s.calcCoverBtnActive]} onPress={() => store.setCalculatorCoverage(parseInt(amt) * 100000)}>
                <Text style={[s.calcCoverText, store.calculatorCoverage === parseInt(amt) * 100000 && s.calcCoverTextActive]}>Rs {amt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={s.calcResult}>
          <Text style={s.calcResultLabel}>Estimated Premium</Text>
          <Text style={s.calcResultValue}>Rs {store.getEstimatedPremium().toLocaleString('en-IN')}/yr</Text>
          <Text style={s.calcResultSub}>Rs {Math.round(store.getEstimatedPremium() / 12).toLocaleString('en-IN')}/month</Text>
        </View>
        <TouchableOpacity style={s.calcBtn}>
          <Text style={s.calcBtnText}>Get Detailed Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 19: TAX BENEFITS ==============
  const renderTaxBenefits = () => (
    <View style={s.taxSection}>
      <SectionHeader title="Tax Benefits" subtitle="Section 80D savings" icon="cash" iconColor="#2ECC71" />
      <View style={s.taxCard}>
        <View style={s.taxHeader}>
          <Ionicons name="receipt" size={28} color="#2ECC71" />
          <Text style={s.taxTitle}>Save Tax Under Section 80D</Text>
        </View>
        <View style={s.taxGrid}>
          {[
            { category: 'Self & Family', limit: 'Rs 25,000', age: 'Below 60', icon: 'people' },
            { category: 'Parents', limit: 'Rs 25,000', age: 'Below 60', icon: 'heart' },
            { category: 'Senior Parents', limit: 'Rs 50,000', age: 'Above 60', icon: 'accessibility' },
            { category: 'Total Max', limit: 'Rs 1,00,000', age: 'If all senior', icon: 'cash' },
          ].map((item, i) => (
            <View key={i} style={s.taxRow}>
              <Ionicons name={item.icon} size={16} color="#2ECC71" />
              <View style={s.taxInfo}>
                <Text style={s.taxCategory}>{item.category}</Text>
                <Text style={s.taxAge}>{item.age}</Text>
              </View>
              <Text style={s.taxLimit}>{item.limit}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 20: RENEWAL REMINDERS ==============
  const renderRenewalReminders = () => (
    <View style={s.renewSection}>
      <SectionHeader title="Renewal Reminders" subtitle="Never miss a renewal" icon="alarm" iconColor="#F39C12" />
      <View style={s.renewCard}>
        <View style={s.renewCountdown}>
          <View style={s.renewCountItem}>
            <Text style={s.renewCountValue}>45</Text>
            <Text style={s.renewCountLabel}>Days</Text>
          </View>
          <View style={s.renewCountItem}>
            <Text style={s.renewCountValue}>12</Text>
            <Text style={s.renewCountLabel}>Hours</Text>
          </View>
          <View style={s.renewCountItem}>
            <Text style={s.renewCountValue}>30</Text>
            <Text style={s.renewCountLabel}>Mins</Text>
          </View>
        </View>
        <Text style={s.renewDesc}>Until your policy renewal date</Text>
        <TouchableOpacity style={s.renewBtn}>
          <Text style={s.renewBtnText}>Set Reminder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 21: ADD-ONS ==============
  const renderAddOns = () => (
    <View style={s.addOnSection}>
      <SectionHeader title="Add-Ons" subtitle="Enhance your coverage" icon="add-circle" iconColor="#9B59B6" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.addOnScroll}>
        {[
          { name: 'Critical Illness', premium: '+Rs 2,500/yr', popular: true, icon: 'pulse', color: '#E74C3C' },
          { name: 'Personal Accident', premium: '+Rs 1,200/yr', popular: true, icon: 'bandage', color: '#FF6B35' },
          { name: 'Hospital Cash', premium: '+Rs 800/yr', popular: false, icon: 'cash', color: '#4CAF50' },
          { name: 'OPD Cover', premium: '+Rs 3,000/yr', popular: false, icon: 'medkit', color: '#3498DB' },
          { name: 'Dental & Vision', premium: '+Rs 1,500/yr', popular: false, icon: 'eye', color: '#9B59B6' },
        ].map((addon, i) => (
          <AnimatedCard key={i} style={s.addOnCard} delay={i * 60}>
            {addon.popular && <View style={s.addOnPopular}><Text style={s.addOnPopularText}>Popular</Text></View>}
            <View style={[s.addOnIcon, { backgroundColor: addon.color + '15' }]}>
              <Ionicons name={addon.icon} size={22} color={addon.color} />
            </View>
            <Text style={s.addOnName}>{addon.name}</Text>
            <Text style={s.addOnPremium}>{addon.premium}</Text>
            <TouchableOpacity style={s.addOnBtn}>
              <Ionicons name="add" size={14} color="#FF6B35" />
              <Text style={s.addOnBtnText}>Add</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 22: REVIEWS ==============
  const renderReviews = () => (
    <View style={s.reviewSection}>
      <SectionHeader title="Customer Reviews" subtitle="What people say" icon="chatbubbles" iconColor="#FFB800" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.reviewScroll}>
        {REVIEWS.map((review, i) => (
          <AnimatedCard key={review.id} style={s.reviewCard} delay={i * 80}>
            <View style={s.reviewHeader}>
              <StarRating rating={review.rating} size={12} />
              <Text style={s.reviewDate}>{review.date}</Text>
            </View>
            <Text style={s.reviewPlan}>{review.plan}</Text>
            <Text style={s.reviewComment} numberOfLines={3}>{review.comment}</Text>
            <View style={s.reviewFooter}>
              <View style={s.reviewUser}>
                <View style={s.reviewAvatar}><Text style={s.reviewAvatarText}>{review.user[0]}</Text></View>
                <Text style={s.reviewUserName}>{review.user}</Text>
                {review.verified && <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />}
              </View>
              <View style={s.reviewHelpful}>
                <Ionicons name="thumbs-up-outline" size={12} color="#999" />
                <Text style={s.reviewHelpfulText}>{review.helpful}</Text>
              </View>
            </View>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 23: SUPPORT ==============
  const renderSupport = () => (
    <View style={s.supportSection}>
      <SectionHeader title="24/7 Support" subtitle="We're here to help" icon="headset" iconColor="#3498DB" />
      <View style={s.supportCard}>
        <View style={s.supportGrid}>
          {[
            { title: 'Live Chat', desc: 'Instant support', icon: 'chatbubble-ellipses', color: '#2ECC71' },
            { title: 'Call Back', desc: 'Schedule a call', icon: 'call', color: '#3498DB' },
            { title: 'Email', desc: 'Write to us', icon: 'mail', color: '#FF6B35' },
            { title: 'WhatsApp', desc: 'Quick queries', icon: 'logo-whatsapp', color: '#25D366' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={s.supportItem}>
              <View style={[s.supportItemIcon, { backgroundColor: item.color + '15' }]}>
                <Ionicons name={item.icon} size={22} color={item.color} />
              </View>
              <Text style={s.supportItemTitle}>{item.title}</Text>
              <Text style={s.supportItemDesc}>{item.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 24: FAQ ==============
  const renderFAQ = () => (
    <View style={s.faqSection}>
      <SectionHeader title="Frequently Asked Questions" subtitle="Quick answers" icon="help-circle" iconColor="#FF6B35" />
      {INSURANCE_FAQS.slice(0, 5).map(faq => (
        <FAQItem key={faq.id} item={faq} />
      ))}
    </View>
  );

  // ============== SECTION 25: DISCLAIMERS ==============
  const renderDisclaimers = () => (
    <View style={s.disclaimerSection}>
      <LinearGradient colors={['#FF6B35', '#E64A19']} style={s.disclaimerGradient}>
        <Ionicons name="shield-checkmark" size={32} color="#fff" />
        <Text style={s.disclaimerTitle}>Secure & Trusted</Text>
        <Text style={s.disclaimerDesc}>IRDAI Licensed | ISO 27001 Certified | 256-bit Encryption</Text>
        <View style={s.disclaimerLinks}>
          {['Terms of Use', 'Privacy Policy', 'Disclaimer'].map((link, i) => (
            <TouchableOpacity key={i} style={s.disclaimerLink}>
              <Text style={s.disclaimerLinkText}>{link}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>
    </View>
  );

  // ============== SKELETON ==============
  if (isLoading) {
    return (
      <View style={[s.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#FF6B35'} />
        <View style={{ backgroundColor: isDarkMode ? colors.surface : '#FF6B35', height: 240 }} />
        <View style={{ padding: 16 }}>
          <SkeletonSection />
          <SkeletonPlanCard />
          <SkeletonGrid />
          <SkeletonSection />
        </View>
      </View>
    );
  }

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#FF6B35'} />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B35" colors={['#FF6B35']} />}
      >
        {renderHeader()}
        <FadeInSection delay={100}>{renderPlansComparison()}</FadeInSection>
        <FadeInSection delay={150}>{renderCoverageDetails()}</FadeInSection>
        <FadeInSection delay={200}>{renderHospitalNetwork()}</FadeInSection>
        <FadeInSection delay={250}>{renderPreExisting()}</FadeInSection>
        <FadeInSection delay={300}>{renderMaternity()}</FadeInSection>
        <FadeInSection delay={350}>{renderRoomRent()}</FadeInSection>
        <FadeInSection delay={400}>{renderDayCare()}</FadeInSection>
        <FadeInSection delay={450}>{renderCoPayment()}</FadeInSection>
        <FadeInSection delay={500}>{renderNCB()}</FadeInSection>
        <FadeInSection delay={550}>{renderRestoration()}</FadeInSection>
        <FadeInSection delay={600}>{renderAmbulance()}</FadeInSection>
        <FadeInSection delay={650}>{renderHealthCheckups()}</FadeInSection>
        <FadeInSection delay={700}>{renderTelemedicine()}</FadeInSection>
        <FadeInSection delay={750}>{renderWellness()}</FadeInSection>
        <FadeInSection delay={800}>{renderDiseaseManagement()}</FadeInSection>
        <FadeInSection delay={850}>{renderClaimsHistory()}</FadeInSection>
        <FadeInSection delay={900}>{renderCalculator()}</FadeInSection>
        <FadeInSection delay={950}>{renderTaxBenefits()}</FadeInSection>
        <FadeInSection delay={1000}>{renderRenewalReminders()}</FadeInSection>
        <FadeInSection delay={1050}>{renderAddOns()}</FadeInSection>
        <FadeInSection delay={1100}>{renderReviews()}</FadeInSection>
        <FadeInSection delay={1150}>{renderSupport()}</FadeInSection>
        <FadeInSection delay={1200}>{renderFAQ()}</FadeInSection>
        {renderDisclaimers()}
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
  headerShield: { width: 72, height: 72, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTagline: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 12 },
  headerDesc: { color: '#FFCCBC', fontSize: 13, marginTop: 4 },
  headerScoreRow: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, marginTop: 16, marginHorizontal: 16, padding: 14 },
  healthScore: { flex: 1, alignItems: 'center' },
  healthScoreValue: { color: '#fff', fontSize: 20, fontWeight: '800' },
  healthScoreLabel: { color: '#FFCCBC', fontSize: 10, marginTop: 2 },
  healthScoreDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },

  // Plans Comparison
  plansSection: { paddingVertical: 8 },
  plansTabs: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 12, gap: 8 },
  planTab: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: '#F0F0F0', alignItems: 'center' },
  planTabActive: { backgroundColor: '#FF6B35' },
  planTabText: { fontSize: 13, fontWeight: '600', color: '#666' },
  planTabTextActive: { color: '#fff' },
  plansScroll: { paddingHorizontal: 16 },
  planCompareCard: { width: SCREEN_WIDTH - 48, backgroundColor: '#fff', borderRadius: 16, padding: 16, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  planBadge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 8, alignSelf: 'flex-start', marginBottom: 8 },
  planBadgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  planCompName: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  planCompInsurer: { fontSize: 12, color: '#666', marginTop: 2 },
  planCompStats: { flexDirection: 'row', marginTop: 12, gap: 16 },
  planCompStat: {},
  planCompStatValue: { fontSize: 16, fontWeight: '800', color: '#FF6B35' },
  planCompStatLabel: { fontSize: 10, color: '#999' },
  planCompFeatures: { marginTop: 12, gap: 6 },
  planCompFeature: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  planCompFeatureText: { fontSize: 12, color: '#444' },
  planCompFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 14, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  planCompRating: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  planCompRatingText: { fontSize: 13, fontWeight: '700', color: '#FFB800' },
  planCompBtn: { backgroundColor: '#FF6B35', paddingHorizontal: 20, paddingVertical: 8, borderRadius: 8 },
  planCompBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Coverage Details
  coverageSection: { paddingVertical: 8 },
  coverageCard: { marginHorizontal: 16 },
  coverageRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  coverageIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  coverageInfo: { flex: 1, marginLeft: 10 },
  coverageTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  coverageDesc: { fontSize: 11, color: '#666', marginTop: 1 },
  coverageAmount: { fontSize: 12, fontWeight: '600', color: '#FF6B35' },

  // Hospital Network
  hospitalSection: { paddingVertical: 8 },
  hospitalScroll: { paddingHorizontal: 16 },
  hospitalCard: { width: 200, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  hospitalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  hospitalIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center' },
  premiumBadge: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#FFF8E1', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  premiumBadgeText: { fontSize: 9, fontWeight: '700', color: '#FFB800' },
  hospitalName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  hospitalCity: { fontSize: 11, color: '#666', marginTop: 2 },
  hospitalRating: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  hospitalRatingText: { fontSize: 12, fontWeight: '700', color: '#1A1A2E' },
  hospitalBeds: { fontSize: 10, color: '#999', marginLeft: 4 },
  hospitalSpecialties: { flexDirection: 'row', gap: 4, marginTop: 8 },
  specialtyChip: { backgroundColor: '#F0F0F0', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  specialtyText: { fontSize: 9, color: '#666' },
  cashlessBadge: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 6 },
  cashlessText: { fontSize: 10, color: '#4CAF50', fontWeight: '500' },

  // Pre-Existing
  preExistingSection: { paddingVertical: 8 },
  preExistingCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  preExistingRow: { flexDirection: 'row', alignItems: 'center', padding: 12 },
  preExistingIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  preExistingInfo: { flex: 1, marginLeft: 10 },
  preExistingName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  preExistingWait: { fontSize: 11, color: '#666', marginTop: 1 },
  preExistingCoverage: { fontSize: 11, color: '#4CAF50', fontWeight: '500' },
  preExistingNote: { flexDirection: 'row', alignItems: 'center', gap: 6, padding: 12, backgroundColor: '#FFF3E0' },
  preExistingNoteText: { flex: 1, fontSize: 11, color: '#FF6B35' },

  // Maternity
  maternitySection: { paddingVertical: 8 },
  maternityCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  maternityHeader: { alignItems: 'center', marginBottom: 16 },
  maternityTitle: { fontSize: 16, fontWeight: '700', color: '#9B59B6', marginTop: 6 },
  maternityTimeline: { marginBottom: 16 },
  maternityStep: { flexDirection: 'row', alignItems: 'flex-start' },
  maternityStepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F3E5F5', justifyContent: 'center', alignItems: 'center' },
  maternityStepLine: { position: 'absolute', left: 13, top: 28, width: 2, height: 28, backgroundColor: '#E1BEE7' },
  maternityStepContent: { flex: 1, marginLeft: 10, marginBottom: 12 },
  maternityStepPhase: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  maternityStepDesc: { fontSize: 11, color: '#666', marginTop: 1 },
  maternityStepDuration: { fontSize: 10, color: '#9B59B6', marginTop: 2 },
  maternityCosts: { borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 12 },
  maternityCostsTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  maternityCostRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  maternityCostLabel: { fontSize: 13, color: '#666' },
  maternityCostValue: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },

  // Room Rent
  roomSection: { paddingVertical: 8 },
  roomCard: { marginHorizontal: 16 },
  roomRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  roomIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  roomInfo: { flex: 1, marginLeft: 10 },
  roomType: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  roomDesc: { fontSize: 11, color: '#666', marginTop: 1 },
  roomRent: { fontSize: 13, fontWeight: '700' },

  // Day Care
  dayCareSection: { paddingVertical: 8 },
  dayCareCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  dayCareGrid: {},
  dayCareItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  dayCareName: { flex: 1, fontSize: 13, color: '#1A1A2E' },
  dayCareMore: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingTop: 12, marginTop: 4 },
  dayCareMoreText: { fontSize: 13, fontWeight: '600', color: '#4CAF50' },

  // Co-Payment
  coPaySection: { paddingVertical: 8 },
  coPayCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  coPayOptions: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  coPayOption: { flex: 1, paddingVertical: 12, borderRadius: 12, backgroundColor: '#F5F5F5', alignItems: 'center' },
  coPayOptionActive: { backgroundColor: '#FF6B35' },
  coPayOptionText: { fontSize: 20, fontWeight: '800', color: '#1A1A2E' },
  coPayOptionTextActive: { color: '#fff' },
  coPayOptionLabel: { fontSize: 10, color: '#666', marginTop: 2 },
  coPayImpact: { gap: 6 },
  coPayImpactTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  coPayImpactRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 4 },
  coPayImpactLabel: { fontSize: 13, color: '#666' },
  coPayImpactValue: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  coPayNote: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  coPayNoteText: { flex: 1, fontSize: 11, color: '#3498DB' },

  // NCB
  ncbSection: { paddingVertical: 8 },
  ncbCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  ncbLadder: {},
  ncbStep: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  ncbStepDot: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#F0F0F0', justifyContent: 'center', alignItems: 'center' },
  ncbStepDotActive: { backgroundColor: '#FF6B35' },
  ncbStepNum: { fontSize: 11, fontWeight: '600', color: '#999' },
  ncbStepContent: { flex: 1, marginLeft: 10 },
  ncbStepYear: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  ncbStepBonus: { fontSize: 11, color: '#666' },
  ncbStepTotal: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  ncbTransfer: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  ncbTransferText: { flex: 1, fontSize: 12, color: '#3498DB' },

  // Restoration
  restorationSection: { paddingVertical: 8 },
  restorationCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  restorationVisual: { alignItems: 'center' },
  restorationBar: { width: '100%', height: 12, borderRadius: 6, backgroundColor: '#F0F0F0', overflow: 'hidden' },
  restorationFill: { height: '100%', borderRadius: 6 },
  restorationLabel: { fontSize: 12, color: '#666', marginTop: 4, marginBottom: 4 },
  restorationNote: { fontSize: 12, color: '#444', lineHeight: 18, marginTop: 12, textAlign: 'center' },

  // Ambulance
  ambulanceSection: { paddingVertical: 8 },
  ambulanceCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  ambulanceEmergency: { alignItems: 'center', padding: 20, backgroundColor: '#FFEBEE' },
  ambulanceIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  ambulanceTitle: { fontSize: 16, fontWeight: '700', color: '#E74C3C' },
  ambulanceDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  ambulanceBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#E74C3C', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, marginTop: 12 },
  ambulanceBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },
  ambulanceDetails: { padding: 16 },
  ambulanceDetailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  ambulanceDetailLabel: { fontSize: 13, color: '#666' },
  ambulanceDetailValue: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },

  // Health Checkups
  checkupSection: { paddingVertical: 8 },
  checkupScroll: { paddingHorizontal: 16 },
  checkupCard: { width: 160, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  checkupIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  checkupName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  checkupTests: { fontSize: 11, color: '#666', marginTop: 2 },
  checkupValue: { fontSize: 13, fontWeight: '700', marginTop: 4 },
  checkupBtn: { marginTop: 8, paddingHorizontal: 16, paddingVertical: 6, borderRadius: 6, borderWidth: 1.5 },
  checkupBtnText: { fontSize: 11, fontWeight: '700' },

  // Telemedicine
  teleSection: { paddingVertical: 8 },
  teleCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  teleBanner: { alignItems: 'center', padding: 20, backgroundColor: '#EBF5FB' },
  teleBannerTitle: { fontSize: 16, fontWeight: '700', color: '#3498DB', marginTop: 6 },
  teleBannerDesc: { fontSize: 12, color: '#666', marginTop: 2, textAlign: 'center' },
  teleScroll: { padding: 12 },
  teleDocCard: { width: 110, alignItems: 'center', marginRight: 12 },
  teleDocAvatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  teleDocName: { fontSize: 11, fontWeight: '600', color: '#1A1A2E', textAlign: 'center', marginTop: 4 },
  teleDocSpec: { fontSize: 9, color: '#666', textAlign: 'center' },
  teleDocStatus: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  teleDocDot: { width: 6, height: 6, borderRadius: 3 },
  teleDocStatusText: { fontSize: 9, color: '#666' },

  // Wellness
  wellnessSection: { paddingVertical: 8 },
  wellnessGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  wellnessCard: { width: (SCREEN_WIDTH - 32) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  wellnessIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  wellnessName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  wellnessTarget: { fontSize: 11, color: '#666', marginTop: 2 },
  wellnessReward: { fontSize: 11, color: '#4CAF50', fontWeight: '600', marginTop: 2 },
  wellnessProgress: { fontSize: 10, color: '#4CAF50', marginTop: 2 },

  // Disease Management
  diseaseSection: { paddingVertical: 8 },
  diseaseCard: { marginHorizontal: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  diseaseHeader: { flexDirection: 'row', alignItems: 'center' },
  diseaseIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  diseaseInfo: { flex: 1, marginLeft: 10 },
  diseaseName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  diseaseDesc: { fontSize: 11, color: '#666', marginTop: 1 },
  diseaseProgress: { fontSize: 10, color: '#666', marginTop: 3 },

  // Claims History
  claimsSection: { paddingVertical: 8 },
  claimsCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  claimsStats: { flexDirection: 'row', marginBottom: 16 },
  claimsStat: { flex: 1, alignItems: 'center' },
  claimsStatValue: { fontSize: 20, fontWeight: '800' },
  claimsStatLabel: { fontSize: 10, color: '#999', marginTop: 2 },
  claimsStatDivider: { width: 1, backgroundColor: '#F0F0F0' },
  claimsBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#FF6B35' },
  claimsBtnText: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },

  // Calculator
  calcSection: { paddingVertical: 8 },
  calcCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  calcRow: { marginBottom: 16 },
  calcLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  calcSliderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 16 },
  calcSliderBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  calcSliderValue: { fontSize: 20, fontWeight: '800', color: '#FF6B35', minWidth: 80, textAlign: 'center' },
  calcCoverOptions: { flexDirection: 'row', gap: 6 },
  calcCoverBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#F5F5F5', alignItems: 'center' },
  calcCoverBtnActive: { backgroundColor: '#FF6B35' },
  calcCoverText: { fontSize: 12, fontWeight: '600', color: '#666' },
  calcCoverTextActive: { color: '#fff' },
  calcResult: { alignItems: 'center', padding: 16, backgroundColor: '#FFF3E0', borderRadius: 12, marginBottom: 12 },
  calcResultLabel: { fontSize: 12, color: '#666' },
  calcResultValue: { fontSize: 28, fontWeight: '800', color: '#FF6B35', marginTop: 2 },
  calcResultSub: { fontSize: 12, color: '#999', marginTop: 2 },
  calcBtn: { backgroundColor: '#FF6B35', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  calcBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Tax Benefits
  taxSection: { paddingVertical: 8 },
  taxCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  taxHeader: { alignItems: 'center', marginBottom: 16 },
  taxTitle: { fontSize: 16, fontWeight: '700', color: '#2ECC71', marginTop: 6 },
  taxGrid: { gap: 4 },
  taxRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  taxInfo: { flex: 1 },
  taxCategory: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  taxAge: { fontSize: 10, color: '#999' },
  taxLimit: { fontSize: 14, fontWeight: '700', color: '#2ECC71' },

  // Renewal
  renewSection: { paddingVertical: 8 },
  renewCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  renewCountdown: { flexDirection: 'row', gap: 16, marginBottom: 12 },
  renewCountItem: { alignItems: 'center' },
  renewCountValue: { fontSize: 28, fontWeight: '800', color: '#F39C12' },
  renewCountLabel: { fontSize: 10, color: '#999' },
  renewDesc: { fontSize: 12, color: '#666', marginBottom: 12 },
  renewBtn: { backgroundColor: '#F39C12', paddingHorizontal: 24, paddingVertical: 10, borderRadius: 10 },
  renewBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Add-Ons
  addOnSection: { paddingVertical: 8 },
  addOnScroll: { paddingHorizontal: 16 },
  addOnCard: { width: 150, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  addOnPopular: { backgroundColor: '#FF6B35', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 6 },
  addOnPopularText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  addOnIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  addOnName: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  addOnPremium: { fontSize: 11, color: '#FF6B35', fontWeight: '600', marginTop: 4 },
  addOnBtn: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 8, paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6, borderWidth: 1.5, borderColor: '#FF6B35' },
  addOnBtnText: { fontSize: 11, fontWeight: '700', color: '#FF6B35' },

  // Reviews
  reviewSection: { paddingVertical: 8 },
  reviewScroll: { paddingHorizontal: 16 },
  reviewCard: { width: 240, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  reviewDate: { fontSize: 10, color: '#999' },
  reviewPlan: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },
  reviewComment: { fontSize: 12, color: '#444', lineHeight: 17, marginTop: 4 },
  reviewFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  reviewUser: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  reviewAvatar: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  reviewAvatarText: { color: '#fff', fontSize: 9, fontWeight: '700' },
  reviewUserName: { fontSize: 11, fontWeight: '600', color: '#1A1A2E' },
  reviewHelpful: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  reviewHelpfulText: { fontSize: 10, color: '#999' },

  // Support
  supportSection: { paddingVertical: 8 },
  supportCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  supportGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  supportItem: { width: (SCREEN_WIDTH - 64 - 12) / 2, alignItems: 'center', padding: 12 },
  supportItemIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  supportItemTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  supportItemDesc: { fontSize: 10, color: '#666', marginTop: 2 },

  // FAQ
  faqSection: { paddingVertical: 8 },

  // Disclaimers
  disclaimerSection: { marginTop: 8 },
  disclaimerGradient: { padding: 24, alignItems: 'center' },
  disclaimerTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 8 },
  disclaimerDesc: { color: '#FFCCBC', fontSize: 12, marginTop: 4, textAlign: 'center' },
  disclaimerLinks: { flexDirection: 'row', gap: 16, marginTop: 16 },
  disclaimerLink: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' },
  disclaimerLinkText: { color: '#fff', fontSize: 11, fontWeight: '500' },
});
