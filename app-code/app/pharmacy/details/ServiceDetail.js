/**
 * APOLLO 24|7 - PHARMACY SERVICES DETAIL PAGE
 * Ultra Premium Service Detail with Super PRO MAX UI
 */
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withDelay, interpolate, Extrapolation, FadeIn, FadeInDown, FadeInUp, SlideInRight, ZoomIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#0F847E', primaryDark: '#0A6B66', primaryLight: '#E8F5F4',
  accent: '#FF6B35', accentLight: '#FFF3ED', gold: '#D4A843', goldLight: '#FFF8E7',
  white: '#FFFFFF', background: '#F5F7FA', backgroundSoft: '#FAFBFC',
  textPrimary: '#1A1D29', textSecondary: '#4A5568', textTertiary: '#8892A5',
  border: '#E8ECF1', borderLight: '#F0F3F7',
  success: '#22C55E', successLight: '#ECFDF5', warning: '#F59E0B', warningLight: '#FFFBEB',
  error: '#EF4444', errorLight: '#FEF2F2',
  purple: '#8B5CF6', purpleLight: '#F3EEFF', blue: '#3B82F6', blueLight: '#EFF6FF',
  teal: '#14B8A6', tealLight: '#F0DFDA', orange: '#F97316', orangeLight: '#FFF7ED',
  pink: '#EC4899', pinkLight: '#FDF2F8',
};
const SPACING = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 };
const RADIUS = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, full: 999 };

// Service data for different pharmacy services
const SERVICES_DATA = {
  'order-medicine': {
    id: 'order-medicine',
    name: 'Order Medicine',
    icon: 'cart',
    description: 'Order prescription and OTC medicines with ease. Get genuine medicines delivered to your doorstep.',
    color: '#E8F5E9',
    bgColor: '#2E7D32',
    features: [' Genuine Medicines', ' Fast Delivery', ' Easy Reorder', ' 24/7 Support'],
    howItWorks: [
      { title: 'Search or Upload', desc: 'Search medicines or upload prescription' },
      { title: 'Add to Cart', desc: 'Add medicines to your cart' },
      { title: 'Delivery', desc: 'Get medicines delivered at your doorstep' },
    ],
    benefits: [' Up to 25% OFF', ' Free delivery above ₹499', ' Cash on delivery available' ],
    faqs: [
      { q: 'How do I order medicines?', a: 'Search for medicines or upload your prescription. Add to cart and checkout.' },
      { q: 'Do I need prescription for all medicines?', a: 'Prescription required for scheduled medicines only.' },
    ],
  },
  'upload-prescription': {
    id: 'upload-prescription',
    name: 'Upload Prescription',
    icon: 'camera',
    description: 'Upload your prescription and get medicines delivered. Our pharmacists will verify and process your order.',
    color: '#E3F2FD',
    bgColor: '#1565C0',
    features: [' Quick Processing', ' Free Delivery', ' Pharmacist Verification', ' Easy Upload'],
    howItWorks: [
      { title: 'Upload RX', desc: 'Take photo or upload prescription' },
      { title: 'Verification', desc: 'Our pharmacists verify the prescription' },
      { title: 'Delivery', desc: 'Get medicines delivered at your doorstep' },
    ],
    benefits: [' Free delivery on prescription orders', ' Expert pharmacist consultation', ' 100% confidential' ],
    faqs: [
      { q: 'What types of prescriptions accepted?', a: 'We accept all valid prescriptions from registered medical practitioners.' },
      { q: 'How long does verification take?', a: 'Usually within 2-4 hours during business hours.' },
    ],
  },
  'medicine-reminders': {
    id: 'medicine-reminders',
    name: 'Medicine Reminders',
    icon: 'alarm',
    description: 'Never miss a dose with smart medicine reminders. Get notified on time, every time.',
    color: '#FFF3E0',
    bgColor: '#EF6C00',
    features: [' Smart Notifications', ' Customizable Schedule', ' Refill Alerts', ' Family Reminders'],
    howItWorks: [
      { title: 'Add Medicines', desc: 'Add your medicines and schedule' },
      { title: 'Set Reminders', desc: 'Configure reminder times' },
      { title: 'Get Notified', desc: 'Receive timely notifications' },
    ],
    benefits: [' Never miss a dose', ' Track adherence', ' Refill reminders' ],
    faqs: [
      { q: 'Is this service free?', a: 'Yes, medicine reminders are completely free.' },
      { q: 'Can I set reminders for family?', a: 'Yes, you can set reminders for your family members.' },
    ],
  },
  'health-records': {
    id: 'health-records',
    name: 'Health Records',
    icon: 'document-text',
    description: 'Store and manage all your health records digitally. Access them anytime, anywhere.',
    color: '#F3E5F5',
    bgColor: '#7B1FA2',
    features: [' Digital Storage', ' Easy Access', ' Share Records', ' Doctor Consultations'],
    howItWorks: [
      { title: 'Upload Records', desc: 'Upload prescriptions and reports' },
      { title: 'Organize', desc: 'Organize by date and category' },
      { title: 'Access', desc: 'Access anytime from any device' },
    ],
    benefits: [' 100GB Free Storage', ' Easy sharing with doctors', ' Secure & Private' ],
    faqs: [
      { q: 'How much storage do I get?', a: 'You get 100GB free storage for all your health records.' },
      { q: 'Are my records secure?', a: 'Yes, all records are encrypted and stored securely.' },
    ],
  },
};

const ServiceHeader = ({ service, onBack }) => {
  return (
    <LinearGradient colors={[service?.bgColor || COLORS.primary, service?.bgColor ? service?.bgColor + 'CC' : COLORS.primaryDark]} style={styles.headerGrad}>
      <View style={styles.headerTop}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerTitleArea}>
          <Text style={styles.headerServiceName}>{service?.name || 'Service'}</Text>
        </View>
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="help-circle-outline" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.heroSection}>
        <View style={[styles.heroIconWrap, { backgroundColor: service?.color || COLORS.white }]}>
          <Ionicons name={service?.icon || 'medical'} size={48} color={service?.bgColor || COLORS.primary} />
        </View>
        <Text style={styles.heroDescription}>{service?.description}</Text>
      </View>
    </LinearGradient>
  );
};

const FeaturesSection = ({ service }) => {
  return (
    <View style={styles.featuresSection}>
      <Text style={styles.sectionTitle}>Key Features</Text>
      
      <View style={styles.featuresGrid}>
        {service?.features?.map((feature, idx) => (
          <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)} style={styles.featureCard}>
            <View style={[styles.featureIconWrap, { backgroundColor: service?.color || COLORS.primaryLight }]}>
              <Ionicons name="checkmark-circle" size={24} color={service?.bgColor || COLORS.primary} />
            </View>
            <Text style={styles.featureText}>{feature}</Text>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const HowItWorksSection = ({ service }) => {
  return (
    <View style={styles.howItWorksSection}>
      <Text style={styles.sectionTitle}>How It Works</Text>
      
      <View style={styles.stepsContainer}>
        {service?.howItWorks?.map((step, idx) => (
          <Animated.View key={idx} entering={FadeInLeft.delay(idx * 150)}>
            <View style={styles.stepItem}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{idx + 1}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const BenefitsSection = ({ service }) => {
  return (
    <View style={styles.benefitsSection}>
      <Text style={styles.sectionTitle}>Benefits</Text>
      
      <View style={styles.benefitsList}>
        {service?.benefits?.map((benefit, idx) => (
          <Animated.View key={idx} entering={FadeInUp.delay(idx * 100)}>
            <View style={styles.benefitItem}>
              <Ionicons name="pricetag" size={18} color={COLORS.success} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const CTASection = ({ service }) => {
  return (
    <View style={styles.ctaSection}>
      <LinearGradient colors={[service?.bgColor || COLORS.primary, service?.bgColor ? service?.bgColor + 'CC' : COLORS.primaryDark]} style={styles.ctaGradient}>
        <View style={styles.ctaContent}>
          <Text style={styles.ctaTitle}>Ready to get started?</Text>
          <Text style={styles.ctaSubtitle}>Start using this service now</Text>
          
          <TouchableOpacity style={styles.ctaButton}>
            <Text style={styles.ctaButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color={service?.bgColor || COLORS.primary} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const FAQsSection = ({ service }) => {
  const [expanded, setExpanded] = useState({});

  const toggleFaq = (idx) => {
    setExpanded(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <View style={styles.faqSection}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      
      {service?.faqs?.map((faq, idx) => (
        <Animated.View key={idx} entering={FadeInDown.delay(idx * 100)}>
          <TouchableOpacity 
            style={styles.faqCard}
            onPress={() => toggleFaq(idx)}
          >
            <View style={styles.faqHeader}>
              <Ionicons name="help-circle-outline" size={20} color={service?.bgColor || COLORS.primary} />
              <Text style={styles.faqQuestion}>{faq.q}</Text>
            </View>
            
            {expanded[idx] && (
              <Animated.View entering={FadeInDown.duration(200)}>
                <Text style={styles.faqAnswer}>{faq.a}</Text>
              </Animated.View>
            )}
            
            <Ionicons 
              name={expanded[idx] ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color={COLORS.textTertiary} 
              style={styles.faqArrow}
            />
          </TouchableOpacity>
        </Animated.View>
      ))}
    </View>
  );
};

// MAIN COMPONENT
export default function ServiceDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [service, setService] = useState(null);
  
  useEffect(() => {
    if (id && SERVICES_DATA[id]) {
      setService(SERVICES_DATA[id]);
    } else if (id) {
      // Default service for unknown IDs
      setService({
        id: id,
        name: id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        icon: 'medical',
        description: 'Premium pharmacy service from Apollo 24|7',
        color: '#E8F5E9',
        bgColor: '#2E7D32',
        features: ['Fast Delivery', 'Genuine Products', '24/7 Support', 'Easy Returns'],
        howItWorks: [
          { title: 'Browse', desc: 'Browse our wide range of products' },
          { title: 'Order', desc: 'Add to cart and place order' },
          { title: 'Delivery', desc: 'Get delivery at your doorstep' },
        ],
        benefits: ['Up to 25% OFF', 'Free delivery above ₹499', 'Cash on delivery'],
        faqs: [
          { q: 'How do I use this service?', a: 'Simply browse and order your required products.' },
        ],
      });
    }
  }, [id]);

  if (!service) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={service?.bgColor} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ServiceHeader service={service} onBack={() => router.back()} />
        
        <View style={styles.contentSection}>
          <FeaturesSection service={service} />
          <HowItWorksSection service={service} />
          <BenefitsSection service={service} />
          <CTASection service={service} />
          <FAQsSection service={service} />
        </View>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  headerGrad: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 50,
    paddingBottom: SPACING.xxxl,
    paddingHorizontal: SPACING.lg,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  backBtn: {
    padding: SPACING.sm,
    marginRight: SPACING.md,
  },
  headerTitleArea: {
    flex: 1,
  },
  headerServiceName: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.white,
  },
  searchBtn: {
    padding: SPACING.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: RADIUS.full,
  },
  heroSection: {
    alignItems: 'center',
  },
  heroIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  heroDescription: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 22,
  },
  contentSection: {
    marginTop: -SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  // Features
  featuresSection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textPrimary,
    marginBottom: SPACING.md,
  },
  featuresGrid: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.md,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  featureIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    flex: 1,
  },
  // How It Works
  howItWorksSection: {
    marginBottom: SPACING.xl,
  },
  stepsContainer: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginBottom: 2,
  },
  stepDesc: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  // Benefits
  benefitsSection: {
    marginBottom: SPACING.xl,
  },
  benefitsList: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6 },
      android: { elevation: 2 },
    }),
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  benefitText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginLeft: SPACING.sm,
  },
  // CTA
  ctaSection: {
    marginBottom: SPACING.xl,
  },
  ctaGradient: {
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12 },
      android: { elevation: 6 },
    }),
  },
  ctaContent: {
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.white,
    marginBottom: SPACING.xs,
  },
  ctaSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: SPACING.lg,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
  },
  ctaButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginRight: SPACING.sm,
  },
  // FAQs
  faqSection: {
    marginBottom: SPACING.xl,
  },
  faqCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    position: 'relative',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  faqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textPrimary,
    marginLeft: SPACING.sm,
  },
  faqArrow: {
    position: 'absolute',
    right: SPACING.md,
    top: SPACING.md,
  },
  faqAnswer: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    lineHeight: 18,
  },
  bottomSpacer: {
    height: SPACING.xxxl,
  },
});
