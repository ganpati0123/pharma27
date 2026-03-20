import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, StatusBar, TextInput, Linking, Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// ============== UNIQUE HERO SECTION ==============
const HeroSection = ({ data, type, gradient }) => {
  const router = useRouter();
  
  return (
    <LinearGradient colors={gradient || ['#FF6B35', '#FF5722']} style={heroStyles.container}>
      <SafeAreaView edges={['top']}>
        <View style={heroStyles.header}>
          <TouchableOpacity onPress={() => router.back()} style={heroStyles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={heroStyles.headerTitle}>{data.name}</Text>
          <TouchableOpacity style={heroStyles.shareBtn}>
            <Ionicons name="share-social" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={heroStyles.heroContent}>
          <View style={heroStyles.iconContainer}>
            <Ionicons name={data.icon || 'shield-checkmark'} size={48} color="#fff" />
          </View>
          <Text style={heroStyles.title}>{data.name}</Text>
          <Text style={heroStyles.description}>{data.description}</Text>
          
          {data.rating && (
            <View style={heroStyles.ratingRow}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={heroStyles.rating}>{data.rating}</Text>
              <Text style={heroStyles.reviews}>({data.reviews?.toLocaleString()} reviews)</Text>
            </View>
          )}
          
          {data.discount && (
            <View style={heroStyles.discountBadge}>
              <Text style={heroStyles.discountText}>{data.discount} OFF</Text>
            </View>
          )}
        </View>
        
        <View style={heroStyles.statsRow}>
          {data.coverage && (
            <View style={heroStyles.statItem}>
              <Text style={heroStyles.statValue}>{Array.isArray(data.coverage) ? data.coverage[0] : data.coverage}</Text>
              <Text style={heroStyles.statLabel}>Coverage</Text>
            </View>
          )}
          {data.premium && (
            <View style={heroStyles.statItem}>
              <Text style={heroStyles.statValue}>{data.premium}</Text>
              <Text style={heroStyles.statLabel}>Premium</Text>
            </View>
          )}
          {data.claimRatio && (
            <View style={heroStyles.statItem}>
              <Text style={heroStyles.statValue}>{data.claimRatio}</Text>
              <Text style={heroStyles.statLabel}>Claim Ratio</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const heroStyles = StyleSheet.create({
  container: { paddingBottom: 20 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#fff', flex: 1, textAlign: 'center' },
  shareBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  heroContent: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 20 },
  iconContainer: { width: 90, height: 90, borderRadius: 45, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 26, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 8 },
  description: { fontSize: 14, color: 'rgba(255,255,255,0.9)', textAlign: 'center', lineHeight: 20, marginBottom: 12 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rating: { fontSize: 16, fontWeight: '700', color: '#fff' },
  reviews: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  discountBadge: { backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginTop: 12 },
  discountText: { fontSize: 14, fontWeight: '800', color: '#FF6B35' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginTop: 20 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: '#fff' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.8)', marginTop: 2 },
});

// ============== COVERAGE SECTION ==============
const CoverageSection = ({ coverages, title = 'Choose Coverage' }) => {
  const [selected, setSelected] = useState(coverages[0]);
  
  return (
    <View style={coverageStyles.container}>
      <Text style={coverageStyles.title}>{title}</Text>
      <Text style={coverageStyles.subtitle}>Select the sum insured that best fits your needs</Text>
      <View style={coverageStyles.chips}>
        {coverages.map((cov, index) => (
          <TouchableOpacity 
            key={index} 
            style={[coverageStyles.chip, selected === cov && coverageStyles.chipActive]}
            onPress={() => setSelected(cov)}
          >
            <Text style={[coverageStyles.chipText, selected === cov && coverageStyles.chipTextActive]}>{cov}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const coverageStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 12 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, backgroundColor: '#F5F5F5', borderWidth: 1.5, borderColor: '#E0E0E0' },
  chipActive: { backgroundColor: '#FF6B35', borderColor: '#FF6B35' },
  chipText: { fontSize: 14, fontWeight: '600', color: '#666' },
  chipTextActive: { color: '#fff' },
});

// ============== FEATURES SECTION ==============
const FeaturesSection = ({ features, title = 'Key Features' }) => {
  return (
    <View style={featuresStyles.container}>
      <Text style={featuresStyles.title}>{title}</Text>
      <View style={featuresStyles.list}>
        {features.map((feature, index) => (
          <View key={index} style={featuresStyles.item}>
            <View style={featuresStyles.checkCircle}>
              <Ionicons name="checkmark" size={14} color="#fff" />
            </View>
            <Text style={featuresStyles.text}>{feature}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const featuresStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  list: { gap: 10 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  checkCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#2ECC71', justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 14, color: '#444', flex: 1 },
});

// ============== PREMIUM CALCULATOR SECTION ==============
const PremiumCalculatorSection = ({ data }) => {
  const [age, setAge] = useState(30);
  const [members, setMembers] = useState(1);
  const [coverage, setCoverage] = useState('10L');
  
  const calculatePremium = () => {
    const baseRate = 5000;
    const ageFactor = age > 45 ? 2.5 : age > 35 ? 1.8 : 1;
    const memberFactor = members;
    const coverageFactor = parseInt(coverage) / 10;
    return Math.round(baseRate * ageFactor * memberFactor * coverageFactor);
  };
  
  return (
    <View style={calcStyles.container}>
      <Text style={calcStyles.title}>Premium Calculator</Text>
      <Text style={calcStyles.subtitle}>Calculate your estimated premium</Text>
      
      <View style={calcStyles.field}>
        <Text style={calcStyles.label}>Your Age</Text>
        <View style={calcStyles.counter}>
          <TouchableOpacity style={calcStyles.counterBtn} onPress={() => setAge(Math.max(18, age - 1))}>
            <Ionicons name="remove" size={20} color="#FF6B35" />
          </TouchableOpacity>
          <Text style={calcStyles.counterValue}>{age} Years</Text>
          <TouchableOpacity style={calcStyles.counterBtn} onPress={() => setAge(Math.min(75, age + 1))}>
            <Ionicons name="add" size={20} color="#FF6B35" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={calcStyles.field}>
        <Text style={calcStyles.label}>Family Members</Text>
        <View style={calcStyles.counter}>
          <TouchableOpacity style={calcStyles.counterBtn} onPress={() => setMembers(Math.max(1, members - 1))}>
            <Ionicons name="remove" size={20} color="#FF6B35" />
          </TouchableOpacity>
          <Text style={calcStyles.counterValue}>{members}</Text>
          <TouchableOpacity style={calcStyles.counterBtn} onPress={() => setMembers(Math.min(6, members + 1))}>
            <Ionicons name="add" size={20} color="#FF6B35" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={calcStyles.result}>
        <Text style={calcStyles.resultLabel}>Estimated Premium</Text>
        <Text style={calcStyles.resultValue}>₹{calculatePremium().toLocaleString()}/year</Text>
      </View>
    </View>
  );
};

const calcStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 16 },
  field: { marginBottom: 16 },
  label: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  counter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F5F5F5', borderRadius: 12, padding: 12 },
  counterBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  counterValue: { fontSize: 18, fontWeight: '700', color: '#1A1A2E' },
  result: { backgroundColor: '#FFF3E0', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  resultLabel: { fontSize: 13, color: '#666' },
  resultValue: { fontSize: 28, fontWeight: '800', color: '#FF6B35', marginTop: 4 },
});

// ============== INSURERS SECTION ==============
const InsurersSection = ({ insurers }) => {
  return (
    <View style={insurerStyles.container}>
      <Text style={insurerStyles.title}>Top Insurers</Text>
      <Text style={insurerStyles.subtitle}>Compare quotes from leading insurers</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {insurers.map((insurer, index) => (
          <View key={index} style={insurerStyles.card}>
            <View style={insurerStyles.logo}>
              <Ionicons name="shield-checkmark" size={24} color="#FF6B35" />
            </View>
            <Text style={insurerStyles.name}>{insurer}</Text>
            <View style={insurerStyles.rating}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={insurerStyles.ratingText}>4.5+</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const insurerStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 12 },
  card: { width: 120, backgroundColor: '#F8F9FA', borderRadius: 12, padding: 12, marginRight: 10, alignItems: 'center' },
  logo: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  name: { fontSize: 12, fontWeight: '600', color: '#1A1A2E', textAlign: 'center' },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 4 },
  ratingText: { fontSize: 11, fontWeight: '600', color: '#666' },
});

// ============== BENEFITS BREAKDOWN SECTION ==============
const BenefitsBreakdownSection = ({ data }) => {
  const benefits = [
    { icon: 'card', title: 'Tax Benefit', value: data.taxBenefit || 'Up to Rs 1.5L u/s 80D', color: '#3498DB' },
    { icon: 'medkit', title: 'Claim Ratio', value: data.claimRatio || '85%+ Settlement', color: '#2ECC71' },
    { icon: 'business', title: 'Network', value: data.networkHospitals || '10000+', color: '#9B59B6' },
  ];
  
  return (
    <View style={benefitStyles.container}>
      <Text style={benefitStyles.title}>Benefits Breakdown</Text>
      <View style={benefitStyles.grid}>
        {benefits.map((item, index) => (
          <View key={index} style={benefitStyles.card}>
            <View style={[benefitStyles.iconBg, { backgroundColor: item.color + '20' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={benefitStyles.cardTitle}>{item.title}</Text>
            <Text style={benefitStyles.cardValue}>{item.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const benefitStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  grid: { flexDirection: 'row', gap: 10 },
  card: { flex: 1, backgroundColor: '#F8F9FA', borderRadius: 12, padding: 12, alignItems: 'center' },
  iconBg: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 11, color: '#666', marginBottom: 2 },
  cardValue: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
});

// ============== CLAIM PROCESS SECTION ==============
const ClaimProcessSection = ({ steps }) => {
  return (
    <View style={claimStyles.container}>
      <Text style={claimStyles.title}>Claim Process</Text>
      <Text style={claimStyles.subtitle}>Simple 4-step claim process</Text>
      {steps.map((step, index) => (
        <View key={index} style={claimStyles.step}>
          <View style={claimStyles.stepNumber}>
            <Text style={claimStyles.stepNum}>{step.step}</Text>
          </View>
          <View style={claimStyles.stepContent}>
            <Text style={claimStyles.stepTitle}>{step.title}</Text>
            <Text style={claimStyles.stepDesc}>{step.desc}</Text>
          </View>
          <Ionicons name={step.icon} size={20} color="#FF6B35" />
        </View>
      ))}
    </View>
  );
};

const claimStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 16 },
  step: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  stepNumber: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  stepNum: { color: '#fff', fontSize: 14, fontWeight: '700' },
  stepContent: { flex: 1, marginLeft: 12 },
  stepTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  stepDesc: { fontSize: 12, color: '#666', marginTop: 2 },
});

// ============== FAQs SECTION ==============
const FAQSection = ({ faqs }) => {
  const [expanded, setExpanded] = useState(null);
  
  return (
    <View style={faqStyles.container}>
      <Text style={faqStyles.title}>Frequently Asked Questions</Text>
      {faqs.map((faq, index) => (
        <TouchableOpacity 
          key={index} 
          style={faqStyles.item}
          onPress={() => setExpanded(expanded === index ? null : index)}
        >
          <View style={faqStyles.questionRow}>
            <Text style={faqStyles.question}>{faq.question}</Text>
            <Ionicons name={expanded === index ? 'chevron-up' : 'chevron-down'} size={20} color="#666" />
          </View>
          {expanded === index && (
            <Text style={faqStyles.answer}>{faq.answer}</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const faqStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  item: { backgroundColor: '#F8F9FA', borderRadius: 10, padding: 14, marginBottom: 8 },
  questionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  question: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', flex: 1, marginRight: 8 },
  answer: { fontSize: 13, color: '#666', marginTop: 8, lineHeight: 18 },
});

// ============== CTA SECTION ==============
const CTASection = ({ data, type }) => {
  return (
    <View style={ctaStyles.container}>
      <LinearGradient colors={['#FF6B35', '#FF5722']} style={ctaStyles.gradient}>
        <Text style={ctaStyles.title}>
          {type === 'offer' ? 'Claim Your Offer Now!' : 'Get Started Today'}
        </Text>
        <Text style={ctaStyles.subtitle}>
          {type === 'offer' 
            ? `Use code ${data.code} to get ${data.discount} off`
            : 'Compare quotes and buy in minutes'}
        </Text>
        <View style={ctaStyles.buttons}>
          <TouchableOpacity style={ctaStyles.primaryBtn}>
            <Text style={ctaStyles.primaryBtnText}>Buy Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ctaStyles.secondaryBtn}>
            <Text style={ctaStyles.secondaryBtnText}>Talk to Expert</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const ctaStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, marginBottom: 100 },
  gradient: { borderRadius: 16, padding: 20, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: '800', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 4, marginBottom: 16 },
  buttons: { flexDirection: 'row', gap: 12, width: '100%' },
  primaryBtn: { flex: 1, backgroundColor: '#fff', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  primaryBtnText: { color: '#FF6B35', fontSize: 16, fontWeight: '700' },
  secondaryBtn: { flex: 1, backgroundColor: 'transparent', paddingVertical: 14, borderRadius: 12, alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  secondaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});

// ============== EXPERT CONSULTATION SECTION ==============
const ExpertSection = ({ experts }) => {
  return (
    <View style={expertStyles.container}>
      <Text style={expertStyles.title}>Talk to Our Experts</Text>
      <Text style={expertStyles.subtitle}>Get personalized advice from our insurance experts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {experts.map((expert, index) => (
          <View key={index} style={expertStyles.card}>
            <View style={expertStyles.avatar}>
              <Ionicons name="person" size={28} color="#FF6B35" />
              {expert.available && <View style={expertStyles.onlineDot} />}
            </View>
            <Text style={expertStyles.name}>{expert.name}</Text>
            <Text style={expertStyles.specialty}>{expert.specialty}</Text>
            <View style={expertStyles.rating}>
              <Ionicons name="star" size={12} color="#FFD700" />
              <Text style={expertStyles.ratingText}>{expert.rating}</Text>
            </View>
            <TouchableOpacity style={expertStyles.btn}>
              <Text style={expertStyles.btnText}>Consult</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const expertStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 12 },
  card: { width: 150, backgroundColor: '#F8F9FA', borderRadius: 14, padding: 14, marginRight: 12, alignItems: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  onlineDot: { position: 'absolute', bottom: 0, right: 0, width: 14, height: 14, borderRadius: 7, backgroundColor: '#2ECC71', borderWidth: 2, borderColor: '#fff' },
  name: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  specialty: { fontSize: 11, color: '#666', textAlign: 'center', marginTop: 2 },
  rating: { flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 4 },
  ratingText: { fontSize: 12, fontWeight: '600', color: '#666' },
  btn: { backgroundColor: '#FF6B35', paddingHorizontal: 20, paddingVertical: 6, borderRadius: 8, marginTop: 8 },
  btnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

// ============== REVIEWS SECTION ==============
const ReviewsSection = ({ reviews }) => {
  return (
    <View style={reviewStyles.container}>
      <Text style={reviewStyles.title}>Customer Reviews</Text>
      <Text style={reviewStyles.subtitle}>See what our customers say</Text>
      {reviews.slice(0, 3).map((review, index) => (
        <View key={index} style={reviewStyles.card}>
          <View style={reviewStyles.header}>
            <View style={reviewStyles.avatar}>
              <Text style={reviewStyles.avatarText}>{review.user[0]}</Text>
            </View>
            <View style={reviewStyles.info}>
              <Text style={reviewStyles.user}>{review.user}</Text>
              <View style={reviewStyles.rating}>
                {[...Array(5)].map((_, i) => (
                  <Ionicons key={i} name={i < review.rating ? 'star' : 'star-outline'} size={12} color="#FFD700" />
                ))}
              </View>
            </View>
          </View>
          <Text style={reviewStyles.comment}>{review.comment}</Text>
        </View>
      ))}
    </View>
  );
};

const reviewStyles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 16, backgroundColor: '#fff', marginTop: 8 },
  title: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 4 },
  subtitle: { fontSize: 13, color: '#666', marginBottom: 12 },
  card: { backgroundColor: '#F8F9FA', borderRadius: 12, padding: 12, marginBottom: 10 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  info: { marginLeft: 10 },
  user: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  rating: { flexDirection: 'row', gap: 2, marginTop: 2 },
  comment: { fontSize: 13, color: '#444', lineHeight: 18 },
});

// ============== MAIN DYNAMIC SCREEN ==============
export default function DetailScreen({ route }) {
  const { type, data, gradient, title } = route.params || {};
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Sample data based on type
  const sampleFAQs = [
    { question: 'What is covered under this plan?', answer: 'This plan covers hospitalization expenses, pre and post hospitalisation, day care procedures, and more.' },
    { question: 'Is there a waiting period?', answer: 'Yes, there is a 30-day initial waiting period and 2-4 years for pre-existing diseases.' },
    { question: 'How to file a claim?', answer: 'You can file a claim through our app or by contacting our 24/7 support team.' },
  ];
  
  const sampleExperts = [
    { name: 'Dr. Priya Sharma', specialty: 'Health Insurance Advisor', rating: 4.9, available: true },
    { name: 'Rajesh Kumar', specialty: 'Claims Expert', rating: 4.8, available: true },
    { name: 'Anita Desai', specialty: 'Policy Expert', rating: 4.7, available: false },
  ];
  
  const sampleReviews = [
    { user: 'Amit K.', rating: 5, comment: 'Excellent coverage and seamless claim process. Highly recommended!' },
    { user: 'Sneha R.', rating: 4, comment: 'Good value for money. The customer service is very helpful.' },
    { user: 'Rahul M.', rating: 5, comment: 'Best health insurance I have ever bought. Very satisfied.' },
  ];
  
  const renderContent = () => {
    switch(type) {
      case 'category':
        return (
          <>
            <CoverageSection coverages={data.coverage || ['5L', '10L', '25L', '50L']} />
            <FeaturesSection features={data.features || ['Comprehensive coverage', 'Cashless hospitalization', 'Tax benefits']} />
            <BenefitsBreakdownSection data={data} />
            <InsurersSection insurers={data.insurers || ['Niva Bupa', 'Care Health', 'Star Health']} />
            <PremiumCalculatorSection data={data} />
            <ClaimProcessSection steps={[
              { step: 1, title: 'Intimate Claim', desc: 'Contact within 48 hours', icon: 'call' },
              { step: 2, title: 'Submit Documents', desc: 'Upload required papers', icon: 'document-attach' },
              { step: 3, title: 'Assessment', desc: 'Review by team', icon: 'search' },
              { step: 4, title: 'Settlement', desc: 'Payment on approval', icon: 'checkmark-done' },
            ]} />
            <FAQSection faqs={sampleFAQs} />
            <ExpertSection experts={sampleExperts} />
            <ReviewsSection reviews={sampleReviews} />
            <CTASection data={data} type="category" />
          </>
        );
        
      case 'offer':
        return (
          <>
            <View style={offerStyles.detailCard}>
              <Text style={offerStyles.detailTitle}>Offer Details</Text>
              <Text style={offerStyles.detailDesc}>{data.description}</Text>
              <View style={offerStyles.codeRow}>
                <Text style={offerStyles.codeLabel}>Use Code:</Text>
                <View style={offerStyles.codeBox}>
                  <Text style={offerStyles.codeText}>{data.code}</Text>
                </View>
              </View>
              <Text style={offerStyles.validity}>Valid until: {data.validTill}</Text>
            </View>
            <FeaturesSection title="Benefits" features={data.benefits || ['Instant policy', 'Digital card', '24/7 support']} />
            <CoverageSection title="Minimum Premium" coverages={[data.minPremium ? `₹${data.minPremium}` : '₹5,000']} />
            <FAQSection faqs={sampleFAQs} />
            <CTASection data={data} type="offer" />
          </>
        );
        
      case 'expert':
        return (
          <>
            <View style={expertDetailStyles.profile}>
              <View style={expertDetailStyles.avatarLarge}>
                <Ionicons name="person" size={48} color="#FF6B35" />
              </View>
              <Text style={expertDetailStyles.name}>{data.name}</Text>
              <Text style={expertDetailStyles.specialty}>{data.specialty}</Text>
              <View style={expertDetailStyles.stats}>
                <View style={expertDetailStyles.stat}>
                  <Ionicons name="star" size={18} color="#FFD700" />
                  <Text style={expertDetailStyles.statValue}>{data.rating}</Text>
                  <Text style={expertDetailStyles.statLabel}>Rating</Text>
                </View>
                <View style={expertDetailStyles.stat}>
                  <Ionicons name="people" size={18} color="#3498DB" />
                  <Text style={expertDetailStyles.statValue}>{data.reviews}</Text>
                  <Text style={expertDetailStyles.statLabel}>Reviews</Text>
                </View>
                <View style={expertDetailStyles.stat}>
                  <Ionicons name="time" size={18} color="#9B59B6" />
                  <Text style={expertDetailStyles.statValue}>{data.experience}</Text>
                  <Text style={expertDetailStyles.statLabel}>Experience</Text>
                </View>
              </View>
            </View>
            <FeaturesSection title="Expertise" features={data.expertise || ['Health Insurance', 'Claims', 'Tax Benefits']} />
            <View style={expertDetailStyles.consultCard}>
              <Text style={expertDetailStyles.consultTitle}>Consultation Fee</Text>
              <Text style={expertDetailStyles.consultFee}>{data.consultFee || 'Free'}</Text>
              <TouchableOpacity style={expertDetailStyles.bookBtn}>
                <Text style={expertDetailStyles.bookBtnText}>Book Consultation</Text>
              </TouchableOpacity>
            </View>
            <FAQSection faqs={[{ question: 'How does consultation work?', answer: 'Book a slot and our expert will call you within 30 minutes.' }]} />
            <CTASection data={data} type="category" />
          </>
        );
        
      default:
        return (
          <>
            <CoverageSection coverages={['5L', '10L', '25L', '50L', '1Cr']} />
            <FeaturesSection features={['Comprehensive coverage', 'Cashless hospitalization', 'Tax benefits', '24/7 Support']} />
            <PremiumCalculatorSection data={data} />
            <BenefitsBreakdownSection data={data} />
            <FAQSection faqs={sampleFAQs} />
            <CTASection data={data} type="category" />
          </>
        );
    }
  };
  
  return (
    <Animated.ScrollView 
      style={mainStyles.container}
      showsVerticalScrollIndicator={false}
    >
      <HeroSection data={data} type={type} gradient={gradient} />
      {renderContent()}
    </Animated.ScrollView>
  );
}

const mainStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
});

// Offer specific styles
const offerStyles = StyleSheet.create({
  detailCard: { backgroundColor: '#fff', marginTop: 8, padding: 16 },
  detailTitle: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  detailDesc: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 16 },
  codeRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  codeLabel: { fontSize: 14, fontWeight: '600', color: '#666' },
  codeBox: { backgroundColor: '#FFF3E0', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, marginLeft: 8, borderWidth: 1, borderStyle: 'dashed', borderColor: '#FF6B35' },
  codeText: { fontSize: 16, fontWeight: '700', color: '#FF6B35', letterSpacing: 1 },
  validity: { fontSize: 12, color: '#999' },
});

// Expert detail styles
const expertDetailStyles = StyleSheet.create({
  profile: { backgroundColor: '#fff', padding: 20, alignItems: 'center', marginTop: 8 },
  avatarLarge: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  name: { fontSize: 24, fontWeight: '800', color: '#1A1A2E' },
  specialty: { fontSize: 14, color: '#666', marginTop: 4, marginBottom: 16 },
  stats: { flexDirection: 'row', gap: 24 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#1A1A2E', marginTop: 4 },
  statLabel: { fontSize: 11, color: '#666' },
  consultCard: { backgroundColor: '#fff', marginTop: 8, padding: 20, alignItems: 'center' },
  consultTitle: { fontSize: 14, color: '#666' },
  consultFee: { fontSize: 32, fontWeight: '800', color: '#FF6B35', marginVertical: 8 },
  bookBtn: { backgroundColor: '#FF6B35', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  bookBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
