import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInsuranceStore, TOPUP_PLANS, HOSPITALS, INSURANCE_FAQS, REVIEWS, EXPERTS } from '../components/insurance/store';
import SectionHeader from '../components/insurance/shared/SectionHeader';
import AnimatedCard from '../components/insurance/shared/AnimatedCard';
import PlanCard from '../components/insurance/shared/PlanCard';
import { SkeletonPlanCard, SkeletonSection } from '../components/insurance/shared/SkeletonLoader';
import FadeInSection from '../components/insurance/shared/FadeInSection';
import useTheme from '../components/insurance/shared/useTheme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ============== PROGRESS CIRCLE ==============
const ProgressCircle = ({ percentage, size = 80, strokeWidth = 8, color = '#FF6B35' }) => {
  const animVal = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animVal, { toValue: percentage, duration: 1200, useNativeDriver: false }).start();
  }, [percentage]);
  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: '#F0F0F0', position: 'absolute' }} />
      <View style={{ width: size, height: size, borderRadius: size / 2, borderWidth: strokeWidth, borderColor: color, borderTopColor: 'transparent', borderRightColor: 'transparent', position: 'absolute', transform: [{ rotate: `${(percentage / 100) * 360}deg` }] }} />
      <Text style={{ fontSize: size * 0.22, fontWeight: '800', color }}>{percentage}%</Text>
    </View>
  );
};

// ============== STAR RATING ==============
const StarRating = ({ rating, size = 14, color = '#FFB800' }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Ionicons key={i} name={i <= rating ? 'star' : 'star-outline'} size={size} color={color} />
    ))}
  </View>
);

export default function Topup() {
  const store = useInsuranceStore();
  const { isDarkMode, colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
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

  // ============== SECTION 1: HEADER ==============
  const renderHeader = () => (
    <LinearGradient colors={['#4CAF50', '#2E7D32', '#1B5E20']} style={s.headerGradient}>
      <SafeAreaView edges={['top']}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.headerLabel}>INTRODUCING</Text>
            <Text style={s.headerTitle}>Care Health Super Top-Up</Text>
            <Text style={s.headerSubtitle}>Exclusive Group Health Plan{'\n'}for Apollo Users</Text>
          </View>
          <View style={s.headerBadge}>
            <Ionicons name="shield-checkmark" size={32} color="#fff" />
          </View>
        </View>
        <View style={s.coverageBanner}>
          <Text style={s.coverageBannerText}>Get Rs 1 Crore Coverage at Rs 1/Day*</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // ============== SECTION 2: CHECK PREMIUM ==============
  const renderCheckPremium = () => (
    <View style={s.premiumSection}>
      <View style={s.premiumCard}>
        <View style={s.premiumRow}>
          <View style={s.premiumField}>
            <Text style={s.premiumFieldLabel}>Adult (max 2)</Text>
            <View style={s.premiumFieldValue}>
              <TouchableOpacity style={s.adjBtn}><Ionicons name="remove" size={16} color="#666" /></TouchableOpacity>
              <Text style={s.adjValue}>1</Text>
              <TouchableOpacity style={s.adjBtn}><Ionicons name="add" size={16} color="#666" /></TouchableOpacity>
            </View>
          </View>
          <View style={s.premiumField}>
            <Text style={s.premiumFieldLabel}>Child (max 2)</Text>
            <View style={s.premiumFieldValue}>
              <TouchableOpacity style={s.adjBtn}><Ionicons name="remove" size={16} color="#666" /></TouchableOpacity>
              <Text style={s.adjValue}>1</Text>
              <TouchableOpacity style={s.adjBtn}><Ionicons name="add" size={16} color="#666" /></TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={s.premiumAgeRow}>
          <Text style={s.premiumFieldLabel}>Oldest Member Age</Text>
          <View style={s.ageInput}>
            <Text style={s.ageText}>29 Years</Text>
          </View>
        </View>
        <View style={s.premiumRow}>
          <View style={s.premiumField}>
            <Text style={s.premiumFieldLabel}>Coverage</Text>
            <TouchableOpacity style={s.selectBtn}>
              <Text style={s.selectBtnText}>1 Crore</Text>
              <Ionicons name="chevron-down" size={14} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={s.premiumField}>
            <Text style={s.premiumFieldLabel}>Deductible</Text>
            <TouchableOpacity style={s.selectBtn}>
              <Text style={s.selectBtnText}>15 Lakh</Text>
              <Ionicons name="chevron-down" size={14} color="#666" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={s.checkPremiumBtn}>
          <LinearGradient colors={['#4CAF50', '#2E7D32']} style={s.checkPremiumGradient}>
            <Text style={s.checkPremiumText}>Check Premium</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Text style={s.termsText}>Terms of Use & Disclaimer</Text>
      </View>
    </View>
  );

  // ============== SECTION 3: PLAN INCLUDED ==============
  const renderPlanIncluded = () => (
    <View style={s.includedSection}>
      <View style={s.includedCard}>
        <LinearGradient colors={['#E8F5E9', '#FFFFFF']} style={s.includedGradient}>
          <Text style={s.includedTitle}>Care Super Top-Up</Text>
          <Text style={s.includedLabel}>PLAN INCLUDED:</Text>
          {[
            'Flatter plan with F10-15L coverage',
            'Maternity cover + waiting period benefits',
            'Daycare procedures',
            'Premium add-ons and add-ons',
          ].map((item, i) => (
            <View key={i} style={s.includedRow}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={s.includedText}>{item}</Text>
            </View>
          ))}
        </LinearGradient>
      </View>
    </View>
  );

  // ============== SECTION 4: KEY BENEFITS ==============
  const renderKeyBenefits = () => (
    <View style={s.benefitsSection}>
      <SectionHeader title="KEY BENEFITS" icon="star" iconColor="#4CAF50" />
      {[
        { title: 'Wide Sum Insured Choices', desc: 'Options from F5 lakh to F1 Crore. Select cover based on your needs.', icon: 'shield-checkmark', color: '#4CAF50' },
        { title: 'In-Patient Care', desc: 'Hospitalization costs covered up to the sum insured. No cap on ICU costs, doctor fee, etc.', icon: 'bed', color: '#3498DB' },
        { title: 'Coverage Recharge', desc: 'Automatic recharge of 100% of SI (except for the base amount).', icon: 'refresh', color: '#FF6B35' },
        { title: 'No Limit for ICU', desc: 'No limit on ICU costs, doctor fee, etc.', icon: 'pulse', color: '#E74C3C' },
        { title: 'PED Waiting Period', desc: 'Covered after 12 months (age 19-55) or 24 months (age 51-70).', icon: 'time', color: '#9B59B6' },
      ].map((benefit, i) => (
        <AnimatedCard key={i} style={s.benefitCard} delay={i * 80}>
          <View style={[s.benefitIcon, { backgroundColor: benefit.color + '15' }]}>
            <Ionicons name={benefit.icon} size={24} color={benefit.color} />
          </View>
          <View style={s.benefitContent}>
            <Text style={s.benefitTitle}>{benefit.title}</Text>
            <Text style={s.benefitDesc}>{benefit.desc}</Text>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 5: WHY BUY ==============
  const renderWhyBuy = () => (
    <View style={s.whyBuySection}>
      <Text style={s.whyBuyLabel}>WHY BUY CARE TOP UP</Text>
      <View style={s.whyBuyGrid}>
        {[
          { title: 'Affordable\nHigh\nCoverage', icon: 'wallet', color: '#4CAF50' },
          { title: 'Ideal for\nHigher Age\nIndividuals', icon: 'people', color: '#FF6B35' },
          { title: 'Flexible\nEasy to\nCustomize', icon: 'settings', color: '#3498DB' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.whyBuyCard} delay={i * 100}>
            <View style={[s.whyBuyIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={s.whyBuyCardTitle}>{item.title}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 6: HOW TO BUY ==============
  const renderHowToBuy = () => (
    <View style={s.howToBuySection}>
      <Text style={s.howToBuyTitle}>How to Buy Top Up Health Insurance</Text>
      <Text style={s.howToBuySubtitle}>Buying the right health insurance plan is easy.{'\n'}Just follow these tips:</Text>
      {[
        { step: '01', title: 'Select member details', desc: 'Select the members you wish to include in your top up cover.' },
        { step: '02', title: 'Select the current existing cover', desc: 'Choose the threshold (e.g., F1L, PSU) that matches your existing base policy or deductible.' },
        { step: '03', title: 'Select Top-up coverage amount', desc: 'Pick the amount of additional protection you want (e.g F5L, F50L).' },
        { step: '04', title: 'Select policy address & nominee details', desc: 'Fill in the details.' },
        { step: '05', title: 'Review premium and proceed to payment', desc: 'Policy document will be issued instantly to your email.' },
      ].map((item, i) => (
        <AnimatedCard key={i} style={s.stepCard} delay={i * 80}>
          <View style={s.stepNumber}>
            <Text style={s.stepNumberText}>{item.step}</Text>
          </View>
          <View style={s.stepContent}>
            <Text style={s.stepTitle}>{item.title}</Text>
            <Text style={s.stepDesc}>{item.desc}</Text>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 7: WHO SHOULD BUY ==============
  const renderWhoShouldBuy = () => (
    <View style={s.whoSection}>
      <Text style={s.whoTitle}>Who Should Buy Care Super{'\n'}Top-Up Health Insurance?</Text>
      <View style={s.whoGrid}>
        {[
          { title: 'Families in Metros', desc: 'High hospital costs, protect savings', icon: 'home', color: '#FF6B35' },
          { title: 'Professionals', desc: 'Ages 30-50 / Employer cover often insufficient', icon: 'briefcase', color: '#3498DB' },
          { title: 'Seniors Citizens', desc: 'Cost effective way to enhance coverage', icon: 'accessibility', color: '#4CAF50' },
          { title: 'Lifestyle Risks', desc: 'Energy extra safety net and comprehensive protection', icon: 'fitness', color: '#9B59B6' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.whoCard} delay={i * 100}>
            <View style={[s.whoIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={s.whoCardTitle}>{item.title}</Text>
            <Text style={s.whoCardDesc}>{item.desc}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 8: COMPARISON TABLE ==============
  const renderComparison = () => (
    <View style={s.compSection}>
      <Text style={s.compTitle}>Top-Up vs Base{'\n'}Health Insurance Plans</Text>
      <View style={s.compTable}>
        <View style={s.compHeaderRow}>
          <View style={s.compCell}><Text style={s.compHeaderText}> </Text></View>
          <View style={[s.compCell, s.compHighlight]}><Text style={s.compHeaderText}>Top Up Health{'\n'}Insurance</Text></View>
          <View style={s.compCell}><Text style={s.compHeaderText}>Base Health{'\n'}Insurance</Text></View>
        </View>
        {[
          { label: 'Purpose', topup: 'Extends coverage with fixed deductible', base: 'Provides coverage for hospitalization & medical expenses' },
          { label: 'Premium', topup: 'Lower\ne.g., F1,000-\nF2,200/year for\nF10 lakh cover', base: 'Higher\ne.g., F10,000-\nF51 lakh cover' },
          { label: 'Coverage\nLink', topup: 'Activates after\ndeductible is met;\naccessible to anyone', base: 'Pays up to the sum\ninsured directly' },
          { label: 'Best For', topup: 'People wanting\nextra coverage at\naffordable cost', base: 'Essential protection\nfor everyone' },
        ].map((row, i) => (
          <View key={i} style={s.compRow}>
            <View style={s.compCell}><Text style={s.compLabel}>{row.label}</Text></View>
            <View style={[s.compCell, s.compHighlight]}><Text style={s.compValue}>{row.topup}</Text></View>
            <View style={s.compCell}><Text style={s.compValue}>{row.base}</Text></View>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 9: ECOSYSTEM ==============
  const renderEcosystem = () => (
    <View style={s.ecosystemSection}>
      <Text style={s.ecosystemLabel}>ACCESS APOLLO'S ECOSYSTEM</Text>
      <View style={s.ecosystemGrid}>
        {[
          { count: '71+', label: 'Apollo\nHospitals' },
          { count: '6000+', label: 'Pharmacies\nPan India' },
          { count: '7500+', label: 'Healthcare\nProviders' },
          { count: '1 Lakh+', label: 'Diagnostic\nCentres' },
        ].map((item, i) => (
          <View key={i} style={s.ecosystemCard}>
            <Text style={s.ecosystemCount}>{item.count}</Text>
            <Text style={s.ecosystemCardLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 10: TOP-UP PLANS LIST ==============
  const renderTopupPlans = () => (
    <View style={s.plansSection}>
      <SectionHeader title="Top-Up Plans" subtitle="Enhance your coverage" icon="trending-up" iconColor="#4CAF50" />
      {TOPUP_PLANS.map((plan, i) => (
        <PlanCard key={plan.id} plan={plan} index={i} isTopUp onPress={() => {}} onCompare={() => {}} onCustomize={() => {}} />
      ))}
    </View>
  );

  // ============== SECTION 11: NETWORK HOSPITALS ==============
  const renderHospitals = () => (
    <View style={s.hospitalsSection}>
      <SectionHeader title="Network Hospitals" subtitle="10,000+ hospitals" icon="business" iconColor="#FF6B35" actionText="View Map" onAction={() => {}} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.hospitalsScroll}>
        {HOSPITALS.map((hospital, i) => (
          <AnimatedCard key={hospital.id} style={s.hospitalCard} delay={i * 80}>
            <View style={s.hospitalIconBg}>
              <Ionicons name="business" size={24} color="#FF6B35" />
              {hospital.premium && (
                <View style={s.hospitalPremiumBadge}>
                  <Ionicons name="star" size={10} color="#FFB800" />
                </View>
              )}
            </View>
            <Text style={s.hospitalName} numberOfLines={1}>{hospital.name}</Text>
            <Text style={s.hospitalCity}>{hospital.city} - {hospital.distance}</Text>
            <View style={s.hospitalRating}>
              <Ionicons name="star" size={12} color="#FFB800" />
              <Text style={s.hospitalRatingText}>{hospital.rating}</Text>
            </View>
            {hospital.cashless && (
              <View style={s.cashlessBadge}>
                <Text style={s.cashlessText}>Cashless</Text>
              </View>
            )}
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 12: DEDUCTIBLE CALCULATOR ==============
  const renderDeductibleCalc = () => (
    <View style={s.deductCalcSection}>
      <SectionHeader title="Top-Up Calculator" subtitle="Find your ideal deductible" icon="calculator" iconColor="#3498DB" />
      <View style={s.deductCalcCard}>
        <View style={s.deductRow}>
          <Text style={s.deductLabel}>Deductible Amount</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[200000, 300000, 500000, 700000, 1000000].map(amt => (
              <TouchableOpacity
                key={amt}
                style={[s.deductChip, store.topupDeductible === amt && s.deductChipActive]}
                onPress={() => store.setTopupDeductible(amt)}
              >
                <Text style={[s.deductChipText, store.topupDeductible === amt && s.deductChipTextActive]}>
                  {amt >= 100000 ? `${amt / 100000}L` : `${amt / 1000}K`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={s.deductRow}>
          <Text style={s.deductLabel}>Top-Up Coverage</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[5000000, 10000000, 15000000, 20000000, 50000000].map(amt => (
              <TouchableOpacity
                key={amt}
                style={[s.deductChip, store.topupAmount === amt && s.deductChipActive]}
                onPress={() => store.setTopupAmount(amt)}
              >
                <Text style={[s.deductChipText, store.topupAmount === amt && s.deductChipTextActive]}>
                  {amt >= 10000000 ? `${amt / 10000000} Cr` : `${amt / 100000}L`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={s.deductResult}>
          <Text style={s.deductResultLabel}>Estimated Premium</Text>
          <Text style={s.deductResultValue}>Rs {store.getTopupPremium().toLocaleString('en-IN')}/year</Text>
        </View>
        <TouchableOpacity style={s.deductBtn}>
          <LinearGradient colors={['#4CAF50', '#2E7D32']} style={s.deductBtnGradient}>
            <Text style={s.deductBtnText}>Get Detailed Quote</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 13: DISEASE WISE COVERAGE ==============
  const renderDiseaseCoverage = () => (
    <View style={s.diseaseSection}>
      <SectionHeader title="Disease-Wise Coverage" subtitle="Critical illness coverage" icon="medkit" iconColor="#E74C3C" />
      <View style={s.diseaseGrid}>
        {[
          { name: 'Heart Disease', coverage: '100%', waiting: '2 years', icon: 'heart' },
          { name: 'Cancer', coverage: '100%', waiting: '2 years', icon: 'ribbon' },
          { name: 'Kidney Failure', coverage: '100%', waiting: '2 years', icon: 'water' },
          { name: 'Liver Disease', coverage: '80%', waiting: '3 years', icon: 'fitness' },
          { name: 'Diabetes', coverage: '80%', waiting: '2 years', icon: 'pulse' },
          { name: 'Stroke', coverage: '100%', waiting: '2 years', icon: 'flash' },
        ].map((disease, i) => (
          <AnimatedCard key={i} style={s.diseaseCard} delay={i * 60}>
            <View style={s.diseaseIcon}>
              <Ionicons name={disease.icon} size={20} color="#E74C3C" />
            </View>
            <Text style={s.diseaseName}>{disease.name}</Text>
            <Text style={s.diseaseCoverage}>{disease.coverage}</Text>
            <Text style={s.diseaseWaiting}>Wait: {disease.waiting}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 14: CO-PAYMENT ==============
  const renderCopayment = () => (
    <View style={s.copaySection}>
      <SectionHeader title="Co-Payment Reduction" subtitle="Lower your out-of-pocket costs" icon="cash" iconColor="#4CAF50" />
      <View style={s.copayCard}>
        {[
          { percentage: '0%', premium: '+Rs 800/yr', desc: 'No co-payment - insurer pays 100%', recommended: true },
          { percentage: '10%', premium: 'Base', desc: 'You pay 10% of claim amount' },
          { percentage: '20%', premium: '-Rs 400/yr', desc: 'You pay 20% of claim amount' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={[s.copayRow, item.recommended && s.copayRowActive]}>
            <View style={s.copayLeft}>
              <Text style={[s.copayPercentage, item.recommended && s.copayPercentageActive]}>{item.percentage}</Text>
              <View>
                <Text style={s.copayDesc}>{item.desc}</Text>
                <Text style={s.copayPremium}>{item.premium}</Text>
              </View>
            </View>
            {item.recommended && (
              <View style={s.copayBadge}>
                <Text style={s.copayBadgeText}>Recommended</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 15: NCB PROTECTION ==============
  const renderNCB = () => (
    <View style={s.ncbSection}>
      <SectionHeader title="No Claim Bonus Protection" subtitle="Keep your bonus safe" icon="shield-checkmark" iconColor="#FFB800" />
      <View style={s.ncbCard}>
        <View style={s.ncbHeader}>
          <ProgressCircle percentage={50} size={70} color="#FFB800" />
          <View style={s.ncbInfo}>
            <Text style={s.ncbTitle}>Current NCB: 50%</Text>
            <Text style={s.ncbDesc}>Your sum insured increases by 50% without extra premium</Text>
          </View>
        </View>
        <View style={s.ncbLadder}>
          {[
            { year: 'Year 1', bonus: '10%' },
            { year: 'Year 2', bonus: '20%' },
            { year: 'Year 3', bonus: '30%' },
            { year: 'Year 4', bonus: '40%' },
            { year: 'Year 5+', bonus: '50%' },
          ].map((item, i) => (
            <View key={i} style={s.ncbStep}>
              <View style={[s.ncbDot, i <= 4 && { backgroundColor: '#FFB800' }]} />
              <Text style={s.ncbYear}>{item.year}</Text>
              <Text style={s.ncbBonus}>{item.bonus}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={s.ncbToggle}>
          <Text style={s.ncbToggleText}>Enable NCB Protection</Text>
          <View style={s.ncbSwitch}><View style={s.ncbSwitchDot} /></View>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 16: RESTORATION ==============
  const renderRestoration = () => (
    <View style={s.restorationSection}>
      <SectionHeader title="Restoration Enhancement" subtitle="Multiple restoration options" icon="refresh" iconColor="#9B59B6" />
      <View style={s.restorationCard}>
        {[
          { title: 'Basic Restoration', desc: '100% SI restored once per year', premium: 'Included', active: true },
          { title: 'Unlimited Restoration', desc: 'Unlimited SI restoration', premium: '+Rs 1,200/yr', active: false },
          { title: 'Super Restoration', desc: '200% SI restoration with family float', premium: '+Rs 2,000/yr', active: false },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={[s.restorationRow, item.active && s.restorationRowActive]}>
            <View style={s.restorationLeft}>
              <Ionicons name={item.active ? 'radio-button-on' : 'radio-button-off'} size={20} color={item.active ? '#9B59B6' : '#CCC'} />
              <View style={s.restorationInfo}>
                <Text style={s.restorationTitle}>{item.title}</Text>
                <Text style={s.restorationDesc}>{item.desc}</Text>
              </View>
            </View>
            <Text style={s.restorationPremium}>{item.premium}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 17: EMI OPTIONS ==============
  const renderEMI = () => (
    <View style={s.emiSection}>
      <SectionHeader title="Premium Financing" subtitle="Easy EMI options" icon="card" iconColor="#3498DB" />
      <View style={s.emiCard}>
        <View style={s.emiHeader}>
          <Text style={s.emiTitle}>Pay in Easy Installments</Text>
          <Text style={s.emiSubtitle}>0% interest EMI available</Text>
        </View>
        <View style={s.emiOptions}>
          {[
            { months: 3, emi: 'Rs 1,400', total: 'Rs 4,200' },
            { months: 6, emi: 'Rs 717', total: 'Rs 4,300' },
            { months: 12, emi: 'Rs 367', total: 'Rs 4,400' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={[s.emiOption, i === 0 && s.emiOptionActive]}>
              <Text style={[s.emiMonths, i === 0 && s.emiMonthsActive]}>{item.months} months</Text>
              <Text style={[s.emiAmount, i === 0 && s.emiAmountActive]}>{item.emi}/mo</Text>
              <Text style={s.emiTotal}>Total: {item.total}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.emiBanks}>
          <Text style={s.emiBanksLabel}>Partner Banks:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {['HDFC', 'ICICI', 'SBI', 'Axis', 'Kotak'].map((bank, i) => (
              <View key={i} style={s.emiBankChip}>
                <Text style={s.emiBankText}>{bank}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 18: TAX SAVINGS ==============
  const renderTaxSavings = () => (
    <View style={s.taxSection}>
      <SectionHeader title="Tax Savings" subtitle="Section 80D benefits" icon="receipt" iconColor="#2ECC71" />
      <View style={s.taxCard}>
        <View style={s.taxRow}>
          <View style={s.taxItem}>
            <Text style={s.taxLabel}>Self & Family</Text>
            <Text style={s.taxValue}>Rs 25,000</Text>
            <Text style={s.taxDesc}>Under Section 80D</Text>
          </View>
          <View style={s.taxDivider} />
          <View style={s.taxItem}>
            <Text style={s.taxLabel}>Parents</Text>
            <Text style={s.taxValue}>Rs 50,000</Text>
            <Text style={s.taxDesc}>Senior citizens benefit</Text>
          </View>
        </View>
        <View style={s.taxTotal}>
          <Text style={s.taxTotalLabel}>Total Tax Saving</Text>
          <Text style={s.taxTotalValue}>Up to Rs 75,000/year</Text>
        </View>
        <View style={s.taxInfo}>
          <Ionicons name="information-circle" size={16} color="#3498DB" />
          <Text style={s.taxInfoText}>Additional Rs 5,000 for preventive health check-up within these limits</Text>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 19: CLAIM RATIO ==============
  const renderClaimRatio = () => (
    <View style={s.claimSection}>
      <SectionHeader title="Claims Ratio" subtitle="Insurer performance" icon="stats-chart" iconColor="#FF6B35" />
      <View style={s.claimCard}>
        {[
          { insurer: 'Care Health', ratio: 74, time: '15 days', satisfaction: 4.5 },
          { insurer: 'Niva Bupa', ratio: 67, time: '12 days', satisfaction: 4.3 },
          { insurer: 'Star Health', ratio: 71, time: '18 days', satisfaction: 4.2 },
        ].map((item, i) => (
          <View key={i} style={s.claimRow}>
            <View style={s.claimInsurer}>
              <Ionicons name="shield-checkmark" size={20} color="#FF6B35" />
              <Text style={s.claimInsurerName}>{item.insurer}</Text>
            </View>
            <View style={s.claimStats}>
              <View style={s.claimStat}>
                <Text style={s.claimStatValue}>{item.ratio}%</Text>
                <Text style={s.claimStatLabel}>Claim Ratio</Text>
              </View>
              <View style={s.claimStat}>
                <Text style={s.claimStatValue}>{item.time}</Text>
                <Text style={s.claimStatLabel}>Avg. Time</Text>
              </View>
              <View style={s.claimStat}>
                <StarRating rating={Math.floor(item.satisfaction)} size={10} />
                <Text style={s.claimStatLabel}>{item.satisfaction}/5</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 20: REVIEWS ==============
  const renderReviews = () => (
    <View style={s.reviewsSection}>
      <SectionHeader title="Customer Reviews" subtitle="Top-up specific feedback" icon="chatbubbles" iconColor="#2ECC71" />
      {REVIEWS.slice(0, 3).map((review, i) => (
        <AnimatedCard key={review.id} style={s.reviewCard} delay={i * 100}>
          <View style={s.reviewHeader}>
            <View style={s.reviewAvatar}>
              <Text style={s.reviewAvatarText}>{review.user[0]}</Text>
            </View>
            <View style={s.reviewInfo}>
              <Text style={s.reviewUser}>{review.user}</Text>
              <StarRating rating={review.rating} size={12} />
            </View>
            {review.verified && (
              <View style={s.verifiedBadge}>
                <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />
                <Text style={s.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          <Text style={s.reviewComment}>{review.comment}</Text>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 21: EXPERT RECOMMENDATIONS ==============
  const renderExpertPicks = () => (
    <View style={s.expertSection}>
      <SectionHeader title="Expert Recommendations" subtitle="Personalized picks" icon="school" iconColor="#9B59B6" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.expertScroll}>
        {EXPERTS.slice(0, 3).map((expert, i) => (
          <AnimatedCard key={expert.id} style={s.expertCard} delay={i * 100}>
            <View style={s.expertAvatar}>
              <Ionicons name="person" size={28} color="#9B59B6" />
            </View>
            <Text style={s.expertName}>{expert.name}</Text>
            <Text style={s.expertSpecialty}>{expert.specialty}</Text>
            <TouchableOpacity style={s.expertBtn}>
              <Ionicons name="videocam" size={14} color="#fff" />
              <Text style={s.expertBtnText}>Watch</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 22: FAQ ==============
  const renderFAQ = () => (
    <View style={s.faqSection}>
      <SectionHeader title="Frequently Asked Questions" subtitle="Top-up specific" icon="help-buoy" iconColor="#E74C3C" />
      {INSURANCE_FAQS.filter(f => f.category === 'topup' || f.category === 'basics').slice(0, 4).map((faq, i) => (
        <TouchableOpacity key={faq.id} style={s.faqItem}>
          <Text style={s.faqQuestion}>{faq.question}</Text>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </TouchableOpacity>
      ))}
    </View>
  );

  // ============== SECTION 23: BROCHURE DOWNLOAD ==============
  const renderBrochure = () => (
    <View style={s.brochureSection}>
      <LinearGradient colors={['#E8F5E9', '#C8E6C9']} style={s.brochureCard}>
        <View style={s.brochureContent}>
          <View style={s.brochureIcon}>
            <Ionicons name="document-text" size={32} color="#4CAF50" />
          </View>
          <View>
            <Text style={s.brochureTitle}>Care Group Health Super{'\n'}Top Up Brochure</Text>
            <Text style={s.brochureSubtitle}>Everything You Need{'\n'}to Know</Text>
          </View>
        </View>
        <TouchableOpacity style={s.downloadBtn}>
          <Ionicons name="download" size={16} color="#fff" />
          <Text style={s.downloadText}>Download</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );

  // ============== SECTION 24: SUPPORT ==============
  const renderSupport = () => (
    <View style={s.supportSection}>
      <SectionHeader title="Support Options" subtitle="We're here to help" icon="headset" iconColor="#3498DB" />
      <View style={s.supportGrid}>
        {[
          { title: 'Dedicated Helpline', desc: '1800-XXX-XXXX', icon: 'call', color: '#4CAF50' },
          { title: 'Chat with Expert', desc: 'Available 24/7', icon: 'chatbubble', color: '#3498DB' },
          { title: 'Schedule Callback', desc: 'We call you back', icon: 'timer', color: '#FF6B35' },
          { title: 'Email Support', desc: 'Response in 4 hrs', icon: 'mail', color: '#9B59B6' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.supportCard} delay={i * 80}>
            <View style={[s.supportIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={s.supportCardTitle}>{item.title}</Text>
            <Text style={s.supportCardDesc}>{item.desc}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 25: FOOTER ==============
  const renderFooter = () => (
    <View style={s.footerSection}>
      <LinearGradient colors={['#4CAF50', '#1B5E20']} style={s.footerGradient}>
        <Text style={s.footerTitle}>Always Enough</Text>
        <Text style={s.footerSubtitle}>Powered by Apollo & Care Health</Text>
        <View style={s.footerLogos}>
          {['Apollo', 'Care', 'Niva', 'Star'].map((name, i) => (
            <View key={i} style={s.footerLogo}>
              <Ionicons name="shield-checkmark" size={20} color="#fff" />
              <Text style={s.footerLogoText}>{name}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </View>
  );

  // ============== SKELETON ==============
  if (isLoading) {
    return (
      <View style={[s.container, { backgroundColor: colors.background }]}>
        <StatusBar barStyle="light-content" backgroundColor={isDarkMode ? colors.background : '#4CAF50'} />
        <View style={{ backgroundColor: isDarkMode ? colors.surface : '#4CAF50', height: 200 }} />
        <View style={{ padding: 16 }}>
          <SkeletonSection />
          <SkeletonPlanCard />
          <SkeletonPlanCard />
        </View>
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
        <FadeInSection delay={100}>{renderCheckPremium()}</FadeInSection>
        <FadeInSection delay={150}>{renderPlanIncluded()}</FadeInSection>
        <FadeInSection delay={200}>{renderKeyBenefits()}</FadeInSection>
        <FadeInSection delay={250}>{renderWhyBuy()}</FadeInSection>
        <FadeInSection delay={300}>{renderHowToBuy()}</FadeInSection>
        <FadeInSection delay={350}>{renderWhoShouldBuy()}</FadeInSection>
        <FadeInSection delay={400}>{renderComparison()}</FadeInSection>
        <FadeInSection delay={450}>{renderEcosystem()}</FadeInSection>
        <FadeInSection delay={500}>{renderTopupPlans()}</FadeInSection>
        <FadeInSection delay={550}>{renderHospitals()}</FadeInSection>
        <FadeInSection delay={600}>{renderDeductibleCalc()}</FadeInSection>
        <FadeInSection delay={650}>{renderDiseaseCoverage()}</FadeInSection>
        <FadeInSection delay={700}>{renderCopayment()}</FadeInSection>
        <FadeInSection delay={750}>{renderNCB()}</FadeInSection>
        <FadeInSection delay={800}>{renderRestoration()}</FadeInSection>
        <FadeInSection delay={850}>{renderEMI()}</FadeInSection>
        <FadeInSection delay={900}>{renderTaxSavings()}</FadeInSection>
        <FadeInSection delay={950}>{renderClaimRatio()}</FadeInSection>
        <FadeInSection delay={1000}>{renderReviews()}</FadeInSection>
        <FadeInSection delay={1050}>{renderExpertPicks()}</FadeInSection>
        <FadeInSection delay={1100}>{renderFAQ()}</FadeInSection>
        <FadeInSection delay={1150}>{renderBrochure()}</FadeInSection>
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
  headerGradient: { paddingBottom: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 16, paddingTop: 12 },
  headerLabel: { color: '#A5D6A7', fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginTop: 4 },
  headerSubtitle: { color: '#C8E6C9', fontSize: 13, marginTop: 4, lineHeight: 18 },
  headerBadge: { width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  coverageBanner: { marginHorizontal: 16, marginTop: 12, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  coverageBannerText: { color: '#fff', fontSize: 15, fontWeight: '700' },

  // Check Premium
  premiumSection: { padding: 16 },
  premiumCard: { backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  premiumRow: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  premiumField: { flex: 1 },
  premiumFieldLabel: { fontSize: 12, color: '#666', marginBottom: 6 },
  premiumFieldValue: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 8 },
  adjBtn: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
  adjValue: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  premiumAgeRow: { marginBottom: 12 },
  ageInput: { backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  ageText: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  selectBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F5F5F5', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 },
  selectBtnText: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  checkPremiumBtn: { marginTop: 16, borderRadius: 10, overflow: 'hidden' },
  checkPremiumGradient: { paddingVertical: 14, alignItems: 'center' },
  checkPremiumText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  termsText: { fontSize: 11, color: '#999', textAlign: 'center', marginTop: 8 },

  // Plan Included
  includedSection: { paddingHorizontal: 16 },
  includedCard: { borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  includedGradient: { padding: 20 },
  includedTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E', marginBottom: 12 },
  includedLabel: { fontSize: 12, fontWeight: '700', color: '#4CAF50', letterSpacing: 1, marginBottom: 8 },
  includedRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  includedText: { fontSize: 13, color: '#444', flex: 1 },

  // Benefits
  benefitsSection: { paddingVertical: 8 },
  benefitCard: { flexDirection: 'row', marginHorizontal: 16, marginBottom: 10, backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  benefitIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  benefitContent: { flex: 1, marginLeft: 12 },
  benefitTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  benefitDesc: { fontSize: 12, color: '#666', marginTop: 3, lineHeight: 17 },

  // Why Buy
  whyBuySection: { padding: 16, alignItems: 'center' },
  whyBuyLabel: { fontSize: 12, fontWeight: '700', color: '#999', letterSpacing: 2, marginBottom: 16 },
  whyBuyGrid: { flexDirection: 'row', gap: 10, width: '100%' },
  whyBuyCard: { flex: 1, backgroundColor: '#fff', borderRadius: 14, padding: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  whyBuyIcon: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  whyBuyCardTitle: { fontSize: 11, fontWeight: '600', color: '#1A1A2E', textAlign: 'center', lineHeight: 15 },

  // How to Buy
  howToBuySection: { padding: 16 },
  howToBuyTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  howToBuySubtitle: { fontSize: 13, color: '#666', marginTop: 4, marginBottom: 16, lineHeight: 18 },
  stepCard: { flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' },
  stepNumber: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  stepNumberText: { color: '#fff', fontSize: 14, fontWeight: '800' },
  stepContent: { flex: 1, marginLeft: 12 },
  stepTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  stepDesc: { fontSize: 12, color: '#666', marginTop: 3, lineHeight: 17 },

  // Who Should Buy
  whoSection: { padding: 16 },
  whoTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },
  whoGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  whoCard: { width: (SCREEN_WIDTH - 42) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  whoIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  whoCardTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  whoCardDesc: { fontSize: 11, color: '#666', marginTop: 3, lineHeight: 15 },

  // Comparison
  compSection: { padding: 16 },
  compTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 16, textAlign: 'center' },
  compTable: { backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  compHeaderRow: { flexDirection: 'row', backgroundColor: '#F5F5F5' },
  compRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  compCell: { flex: 1, padding: 10 },
  compHighlight: { backgroundColor: '#E8F5E9' },
  compHeaderText: { fontSize: 11, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  compLabel: { fontSize: 11, fontWeight: '600', color: '#666' },
  compValue: { fontSize: 11, color: '#444', lineHeight: 15 },

  // Ecosystem
  ecosystemSection: { padding: 16, alignItems: 'center' },
  ecosystemLabel: { fontSize: 12, fontWeight: '700', color: '#999', letterSpacing: 2, marginBottom: 16 },
  ecosystemGrid: { flexDirection: 'row', gap: 8, width: '100%' },
  ecosystemCard: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 10, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  ecosystemCount: { fontSize: 14, fontWeight: '800', color: '#FF6B35' },
  ecosystemCardLabel: { fontSize: 9, color: '#666', textAlign: 'center', lineHeight: 13, marginTop: 2 },

  // Plans
  plansSection: { paddingVertical: 8 },

  // Hospitals
  hospitalsSection: { paddingVertical: 8 },
  hospitalsScroll: { paddingHorizontal: 16 },
  hospitalCard: { width: 160, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  hospitalIconBg: { width: 52, height: 52, borderRadius: 16, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  hospitalPremiumBadge: { position: 'absolute', top: -2, right: -2, width: 18, height: 18, borderRadius: 9, backgroundColor: '#FFF8E1', justifyContent: 'center', alignItems: 'center' },
  hospitalName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  hospitalCity: { fontSize: 11, color: '#666', marginTop: 2 },
  hospitalRating: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  hospitalRatingText: { fontSize: 12, fontWeight: '600', color: '#1A1A2E' },
  cashlessBadge: { backgroundColor: '#E8F5E9', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 6 },
  cashlessText: { fontSize: 10, color: '#4CAF50', fontWeight: '600' },

  // Deductible Calculator
  deductCalcSection: { paddingVertical: 8 },
  deductCalcCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  deductRow: { marginBottom: 16 },
  deductLabel: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  deductChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F5F5F5', marginRight: 8, borderWidth: 1.5, borderColor: '#E0E0E0' },
  deductChipActive: { backgroundColor: '#E8F5E9', borderColor: '#4CAF50' },
  deductChipText: { fontSize: 13, fontWeight: '600', color: '#666' },
  deductChipTextActive: { color: '#4CAF50' },
  deductResult: { backgroundColor: '#F8F9FA', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  deductResultLabel: { fontSize: 12, color: '#666' },
  deductResultValue: { fontSize: 24, fontWeight: '800', color: '#4CAF50', marginTop: 4 },
  deductBtn: { marginTop: 12, borderRadius: 10, overflow: 'hidden' },
  deductBtnGradient: { paddingVertical: 12, alignItems: 'center' },
  deductBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },

  // Disease Coverage
  diseaseSection: { paddingVertical: 8 },
  diseaseGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  diseaseCard: { width: (SCREEN_WIDTH - 40) / 3, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  diseaseIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFEBEE', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  diseaseName: { fontSize: 11, fontWeight: '600', color: '#1A1A2E', textAlign: 'center' },
  diseaseCoverage: { fontSize: 14, fontWeight: '800', color: '#E74C3C', marginTop: 2 },
  diseaseWaiting: { fontSize: 9, color: '#999', marginTop: 2 },

  // Co-payment
  copaySection: { paddingVertical: 8 },
  copayCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  copayRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  copayRowActive: { backgroundColor: '#E8F5E9' },
  copayLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  copayPercentage: { fontSize: 18, fontWeight: '800', color: '#666', width: 40 },
  copayPercentageActive: { color: '#4CAF50' },
  copayDesc: { fontSize: 12, color: '#444' },
  copayPremium: { fontSize: 11, color: '#999', marginTop: 2 },
  copayBadge: { backgroundColor: '#4CAF50', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  copayBadgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },

  // NCB
  ncbSection: { paddingVertical: 8 },
  ncbCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  ncbHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 16 },
  ncbInfo: { flex: 1 },
  ncbTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  ncbDesc: { fontSize: 12, color: '#666', marginTop: 4, lineHeight: 17 },
  ncbLadder: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, paddingHorizontal: 8 },
  ncbStep: { alignItems: 'center' },
  ncbDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#E0E0E0', marginBottom: 4 },
  ncbYear: { fontSize: 10, color: '#666' },
  ncbBonus: { fontSize: 12, fontWeight: '700', color: '#FFB800', marginTop: 2 },
  ncbToggle: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  ncbToggleText: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  ncbSwitch: { width: 44, height: 24, borderRadius: 12, backgroundColor: '#E0E0E0', justifyContent: 'center', paddingHorizontal: 2 },
  ncbSwitchDot: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#fff' },

  // Restoration
  restorationSection: { paddingVertical: 8 },
  restorationCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  restorationRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  restorationRowActive: { backgroundColor: '#F3E5F5' },
  restorationLeft: { flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 },
  restorationInfo: { flex: 1 },
  restorationTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  restorationDesc: { fontSize: 11, color: '#666', marginTop: 2 },
  restorationPremium: { fontSize: 12, fontWeight: '600', color: '#9B59B6' },

  // EMI
  emiSection: { paddingVertical: 8 },
  emiCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  emiHeader: { marginBottom: 16 },
  emiTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E' },
  emiSubtitle: { fontSize: 12, color: '#4CAF50', fontWeight: '600', marginTop: 2 },
  emiOptions: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  emiOption: { flex: 1, padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#E0E0E0', alignItems: 'center' },
  emiOptionActive: { borderColor: '#3498DB', backgroundColor: '#EBF5FB' },
  emiMonths: { fontSize: 12, fontWeight: '600', color: '#666' },
  emiMonthsActive: { color: '#3498DB' },
  emiAmount: { fontSize: 14, fontWeight: '800', color: '#1A1A2E', marginTop: 4 },
  emiAmountActive: { color: '#3498DB' },
  emiTotal: { fontSize: 10, color: '#999', marginTop: 2 },
  emiBanks: { borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 12 },
  emiBanksLabel: { fontSize: 12, fontWeight: '600', color: '#666', marginBottom: 8 },
  emiBankChip: { backgroundColor: '#F5F5F5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginRight: 8 },
  emiBankText: { fontSize: 12, fontWeight: '600', color: '#1A1A2E' },

  // Tax
  taxSection: { paddingVertical: 8 },
  taxCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  taxRow: { flexDirection: 'row', marginBottom: 16 },
  taxItem: { flex: 1, alignItems: 'center' },
  taxLabel: { fontSize: 12, color: '#666' },
  taxValue: { fontSize: 20, fontWeight: '800', color: '#2ECC71', marginTop: 4 },
  taxDesc: { fontSize: 10, color: '#999', marginTop: 2 },
  taxDivider: { width: 1, backgroundColor: '#F0F0F0' },
  taxTotal: { backgroundColor: '#E8F5E9', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 12 },
  taxTotalLabel: { fontSize: 12, color: '#666' },
  taxTotalValue: { fontSize: 18, fontWeight: '800', color: '#2ECC71', marginTop: 2 },
  taxInfo: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  taxInfoText: { fontSize: 11, color: '#3498DB', flex: 1, lineHeight: 16 },

  // Claim Ratio
  claimSection: { paddingVertical: 8 },
  claimCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  claimRow: { padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  claimInsurer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  claimInsurerName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  claimStats: { flexDirection: 'row', gap: 16 },
  claimStat: { alignItems: 'center' },
  claimStatValue: { fontSize: 14, fontWeight: '700', color: '#FF6B35' },
  claimStatLabel: { fontSize: 10, color: '#999', marginTop: 2 },

  // Reviews
  reviewsSection: { paddingVertical: 8 },
  reviewCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  reviewHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  reviewAvatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
  reviewAvatarText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  reviewInfo: { flex: 1, marginLeft: 10 },
  reviewUser: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 2 },
  verifiedText: { fontSize: 10, color: '#2ECC71', fontWeight: '500' },
  reviewComment: { fontSize: 12, color: '#444', lineHeight: 18 },

  // Expert
  expertSection: { paddingVertical: 8 },
  expertScroll: { paddingHorizontal: 16 },
  expertCard: { width: 150, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  expertAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#F3E5F5', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  expertName: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  expertSpecialty: { fontSize: 10, color: '#666', textAlign: 'center', marginTop: 2 },
  expertBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#9B59B6', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
  expertBtnText: { color: '#fff', fontSize: 11, fontWeight: '600' },

  // FAQ
  faqSection: { paddingVertical: 8 },
  faqItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 10, padding: 14, marginBottom: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  faqQuestion: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', flex: 1, marginRight: 8 },

  // Brochure
  brochureSection: { padding: 16 },
  brochureCard: { borderRadius: 16, padding: 20 },
  brochureContent: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  brochureIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  brochureTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A2E', lineHeight: 20 },
  brochureSubtitle: { fontSize: 12, color: '#666', lineHeight: 16, marginTop: 2 },
  downloadBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#4CAF50', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, alignSelf: 'flex-start' },
  downloadText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Support
  supportSection: { paddingVertical: 8 },
  supportGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  supportCard: { width: (SCREEN_WIDTH - 32) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  supportIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  supportCardTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  supportCardDesc: { fontSize: 11, color: '#666', marginTop: 2 },

  // Footer
  footerSection: { marginTop: 8 },
  footerGradient: { padding: 24, alignItems: 'center' },
  footerTitle: { fontSize: 24, fontWeight: '800', color: '#fff' },
  footerSubtitle: { fontSize: 12, color: '#C8E6C9', marginTop: 4 },
  footerLogos: { flexDirection: 'row', gap: 16, marginTop: 12 },
  footerLogo: { alignItems: 'center' },
  footerLogoText: { color: '#fff', fontSize: 10, fontWeight: '600', marginTop: 4 },
});
