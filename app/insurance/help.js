import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, TextInput, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInsuranceStore, INSURANCE_FAQS } from '../components/insurance/store';
import SectionHeader from '../components/insurance/shared/SectionHeader';
import AnimatedCard from '../components/insurance/shared/AnimatedCard';
import { SkeletonSection } from '../components/insurance/shared/SkeletonLoader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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
    <TouchableOpacity onPress={toggle} activeOpacity={0.8} style={faqS.item}>
      <View style={faqS.header}>
        <Text style={faqS.question}>{item.question}</Text>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons name="chevron-down" size={18} color="#666" />
        </Animated.View>
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

export default function Help() {
  const store = useInsuranceStore();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 800);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // ============== SECTION 1: HEADER ==============
  const renderHeader = () => (
    <LinearGradient colors={['#9B59B6', '#8E44AD', '#6C3483']} style={s.headerGradient}>
      <SafeAreaView edges={['top']}>
        <View style={s.headerContent}>
          <Text style={s.headerTitle}>Help & Support</Text>
          <Text style={s.headerSubtitle}>How can we help you today?</Text>
        </View>
        <View style={s.searchContainer}>
          <Ionicons name="search" size={18} color="#999" />
          <TextInput
            style={s.searchInput}
            placeholder="Search help articles, FAQs..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <View style={s.quickActions}>
          {[
            { title: 'Emergency', icon: 'alert-circle', color: '#E74C3C' },
            { title: 'Live Chat', icon: 'chatbubble-ellipses', color: '#2ECC71' },
            { title: 'Call Us', icon: 'call', color: '#3498DB' },
          ].map((action, i) => (
            <TouchableOpacity key={i} style={s.quickActionBtn}>
              <View style={[s.quickActionIcon, { backgroundColor: action.color }]}>
                <Ionicons name={action.icon} size={18} color="#fff" />
              </View>
              <Text style={s.quickActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // ============== SECTION 2: FAQ CATEGORIES ==============
  const renderFAQCategories = () => (
    <View style={s.faqCatSection}>
      <SectionHeader title="FAQ Categories" subtitle="Browse by topic" icon="folder" iconColor="#9B59B6" />
      <View style={s.faqCatGrid}>
        {[
          { title: 'Policy Basics', icon: 'shield-checkmark', count: 12, color: '#FF6B35' },
          { title: 'Claims', icon: 'document-text', count: 18, color: '#E74C3C' },
          { title: 'Payments', icon: 'card', count: 9, color: '#3498DB' },
          { title: 'Coverage', icon: 'umbrella', count: 15, color: '#4CAF50' },
          { title: 'Renewal', icon: 'refresh', count: 7, color: '#F39C12' },
          { title: 'Top-Up', icon: 'trending-up', count: 8, color: '#9B59B6' },
        ].map((cat, i) => (
          <AnimatedCard key={i} style={s.faqCatCard} delay={i * 60}>
            <View style={[s.faqCatIcon, { backgroundColor: cat.color + '15' }]}>
              <Ionicons name={cat.icon} size={22} color={cat.color} />
            </View>
            <Text style={s.faqCatTitle}>{cat.title}</Text>
            <Text style={s.faqCatCount}>{cat.count} articles</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 3: CLAIM PROCESS ==============
  const renderClaimProcess = () => (
    <View style={s.claimSection}>
      <SectionHeader title="Claim Process" subtitle="Step-by-step guide" icon="list" iconColor="#FF6B35" />
      <View style={s.claimCard}>
        {[
          { step: 1, title: 'Intimate the Claim', desc: 'Contact insurer within 24-48 hours of hospitalization', icon: 'call' },
          { step: 2, title: 'Submit Documents', desc: 'Upload required medical documents and bills', icon: 'document-attach' },
          { step: 3, title: 'Claim Assessment', desc: 'Insurer reviews your claim and documents', icon: 'search' },
          { step: 4, title: 'Claim Settlement', desc: 'Receive payment upon approval', icon: 'checkmark-done' },
        ].map((item, i) => (
          <View key={i} style={s.claimStep}>
            <View style={s.claimStepTimeline}>
              <View style={s.claimStepNumber}>
                <Text style={s.claimStepNumberText}>{item.step}</Text>
              </View>
              {i < 3 && <View style={s.claimStepLine} />}
            </View>
            <View style={s.claimStepContent}>
              <Text style={s.claimStepTitle}>{item.title}</Text>
              <Text style={s.claimStepDesc}>{item.desc}</Text>
            </View>
            <Ionicons name={item.icon} size={20} color="#FF6B35" />
          </View>
        ))}
        <View style={s.claimDocs}>
          <Text style={s.claimDocsTitle}>Required Documents</Text>
          {['Policy copy', 'Hospital discharge summary', 'Medical bills & receipts', 'Doctor\'s prescription', 'Investigation reports', 'ID proof'].map((doc, i) => (
            <View key={i} style={s.claimDocRow}>
              <Ionicons name="checkmark-circle-outline" size={16} color="#4CAF50" />
              <Text style={s.claimDocText}>{doc}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 4: POLICY UNDERSTANDING ==============
  const renderPolicyUnderstanding = () => (
    <View style={s.glossarySection}>
      <SectionHeader title="Policy Understanding" subtitle="Insurance glossary" icon="book" iconColor="#3498DB" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.glossaryScroll}>
        {[
          { term: 'Sum Insured', desc: 'Maximum amount payable by the insurer', icon: 'cash' },
          { term: 'Deductible', desc: 'Amount you pay before insurance kicks in', icon: 'remove-circle' },
          { term: 'Co-payment', desc: 'Percentage of claim you bear', icon: 'pie-chart' },
          { term: 'Waiting Period', desc: 'Time before certain covers become active', icon: 'time' },
          { term: 'NCB', desc: 'No Claim Bonus - reward for no claims', icon: 'gift' },
          { term: 'Pre-existing', desc: 'Conditions existing before policy purchase', icon: 'medical' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.glossaryCard} delay={i * 60}>
            <View style={s.glossaryIcon}>
              <Ionicons name={item.icon} size={22} color="#3498DB" />
            </View>
            <Text style={s.glossaryTerm}>{item.term}</Text>
            <Text style={s.glossaryDesc}>{item.desc}</Text>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 5: CONTACT US ==============
  const renderContactUs = () => (
    <View style={s.contactSection}>
      <SectionHeader title="Contact Us" subtitle="Reach out anytime" icon="mail" iconColor="#2ECC71" />
      <View style={s.contactGrid}>
        {[
          { title: 'Phone Support', desc: '1800-XXX-XXXX\nMon-Sat, 9AM-9PM', icon: 'call', color: '#4CAF50' },
          { title: 'Email Support', desc: 'support@insurance.com\nResponse in 4 hours', icon: 'mail', color: '#3498DB' },
          { title: 'WhatsApp', desc: '+91 98XXXXXXXX\nInstant replies', icon: 'logo-whatsapp', color: '#25D366' },
          { title: 'Visit Office', desc: 'Find nearest branch\n50+ locations', icon: 'location', color: '#FF6B35' },
        ].map((item, i) => (
          <AnimatedCard key={i} style={s.contactCard} delay={i * 80}>
            <View style={[s.contactIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={22} color={item.color} />
            </View>
            <Text style={s.contactTitle}>{item.title}</Text>
            <Text style={s.contactDesc}>{item.desc}</Text>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 6: TROUBLESHOOTING ==============
  const renderTroubleshooting = () => (
    <View style={s.troubleSection}>
      <SectionHeader title="Troubleshooting" subtitle="Common issues & fixes" icon="construct" iconColor="#F39C12" />
      {[
        { title: 'Unable to submit claim', desc: 'Ensure all documents are uploaded and policy is active', icon: 'alert-circle', color: '#E74C3C' },
        { title: 'Payment failed', desc: 'Try a different payment method or contact your bank', icon: 'card', color: '#FF6B35' },
        { title: 'App not loading', desc: 'Clear cache, update app, or check internet connection', icon: 'refresh', color: '#3498DB' },
        { title: 'OTP not received', desc: 'Wait 30 seconds, check spam folder, or try resending', icon: 'key', color: '#9B59B6' },
      ].map((item, i) => (
        <AnimatedCard key={i} style={s.troubleCard} delay={i * 80}>
          <View style={[s.troubleIcon, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <View style={s.troubleContent}>
            <Text style={s.troubleTitle}>{item.title}</Text>
            <Text style={s.troubleDesc}>{item.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 7: FEEDBACK ==============
  const renderFeedback = () => (
    <View style={s.feedbackSection}>
      <SectionHeader title="Feedback & Suggestions" subtitle="Help us improve" icon="chatbubble-ellipses" iconColor="#FF6B35" />
      <View style={s.feedbackCard}>
        <Text style={s.feedbackTitle}>How was your experience?</Text>
        <View style={s.feedbackEmojis}>
          {[
            { emoji: 'sad-outline', label: 'Poor', color: '#E74C3C' },
            { emoji: 'happy-outline', label: 'Good', color: '#F39C12' },
            { emoji: 'heart', label: 'Love it!', color: '#2ECC71' },
          ].map((item, i) => (
            <TouchableOpacity key={i} style={s.feedbackEmoji}>
              <Ionicons name={item.emoji} size={32} color={item.color} />
              <Text style={[s.feedbackEmojiText, { color: item.color }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.feedbackButtons}>
          <TouchableOpacity style={s.feedbackBtn}>
            <Ionicons name="bulb" size={16} color="#FF6B35" />
            <Text style={s.feedbackBtnText}>Feature Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.feedbackBtn}>
            <Ionicons name="bug" size={16} color="#E74C3C" />
            <Text style={s.feedbackBtnText}>Report Bug</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 8: COMMUNITY FORUM ==============
  const renderCommunity = () => (
    <View style={s.communitySection}>
      <SectionHeader title="Community Forum" subtitle="Ask & learn from others" icon="people" iconColor="#3498DB" />
      {[
        { title: 'Best health insurance for family of 4?', author: 'Rahul M.', replies: 23, time: '2h ago', hot: true },
        { title: 'How to choose between Star and Care?', author: 'Priya S.', replies: 15, time: '5h ago', hot: false },
        { title: 'Super Top-Up vs Base plan increase', author: 'Amit K.', replies: 31, time: '1d ago', hot: true },
        { title: 'Claim rejected - what can I do?', author: 'Neha R.', replies: 42, time: '2d ago', hot: true },
      ].map((thread, i) => (
        <AnimatedCard key={i} style={s.threadCard} delay={i * 60}>
          <View style={s.threadHeader}>
            {thread.hot && <Ionicons name="flame" size={14} color="#E74C3C" />}
            <Text style={s.threadTitle} numberOfLines={1}>{thread.title}</Text>
          </View>
          <View style={s.threadMeta}>
            <Text style={s.threadAuthor}>{thread.author}</Text>
            <Text style={s.threadDot}>•</Text>
            <Ionicons name="chatbubble-outline" size={12} color="#999" />
            <Text style={s.threadReplies}>{thread.replies}</Text>
            <Text style={s.threadDot}>•</Text>
            <Text style={s.threadTime}>{thread.time}</Text>
          </View>
        </AnimatedCard>
      ))}
      <TouchableOpacity style={s.viewAllBtn}>
        <Text style={s.viewAllText}>View All Discussions</Text>
        <Ionicons name="arrow-forward" size={14} color="#3498DB" />
      </TouchableOpacity>
    </View>
  );

  // ============== SECTION 9: VIDEO GUIDES ==============
  const renderVideoGuides = () => (
    <View style={s.videoSection}>
      <SectionHeader title="Video Guides" subtitle="Learn visually" icon="videocam" iconColor="#E74C3C" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={s.videoScroll}>
        {[
          { title: 'How to File a Claim', duration: '5:30', views: '12K', color: '#FF6B35' },
          { title: 'Understanding Deductibles', duration: '3:45', views: '8K', color: '#3498DB' },
          { title: 'Choosing the Right Plan', duration: '7:12', views: '15K', color: '#4CAF50' },
          { title: 'Top-Up vs Base Policy', duration: '4:20', views: '10K', color: '#9B59B6' },
        ].map((video, i) => (
          <AnimatedCard key={i} style={s.videoCard} delay={i * 80}>
            <View style={[s.videoThumbnail, { backgroundColor: video.color + '15' }]}>
              <View style={s.playButton}>
                <Ionicons name="play" size={20} color="#fff" />
              </View>
              <Text style={s.videoDuration}>{video.duration}</Text>
            </View>
            <Text style={s.videoTitle}>{video.title}</Text>
            <Text style={s.videoViews}>{video.views} views</Text>
          </AnimatedCard>
        ))}
      </ScrollView>
    </View>
  );

  // ============== SECTION 10: DOCUMENT UPLOAD HELP ==============
  const renderDocUpload = () => (
    <View style={s.docUploadSection}>
      <SectionHeader title="Document Upload Help" subtitle="Format & requirements" icon="cloud-upload" iconColor="#4CAF50" />
      <View style={s.docUploadCard}>
        <Text style={s.docUploadTitle}>Supported Formats</Text>
        <View style={s.docFormats}>
          {[
            { ext: 'PDF', color: '#E74C3C' },
            { ext: 'JPG', color: '#FF6B35' },
            { ext: 'PNG', color: '#3498DB' },
            { ext: 'HEIC', color: '#9B59B6' },
          ].map((fmt, i) => (
            <View key={i} style={[s.docFormat, { borderColor: fmt.color }]}>
              <Text style={[s.docFormatText, { color: fmt.color }]}>{fmt.ext}</Text>
            </View>
          ))}
        </View>
        <View style={s.docUploadRules}>
          {[
            'Maximum file size: 5 MB',
            'Minimum resolution: 300 DPI',
            'Clear and readable documents',
            'Complete document (all pages)',
            'No watermarks or edits',
          ].map((rule, i) => (
            <View key={i} style={s.docUploadRule}>
              <Ionicons name="information-circle" size={14} color="#4CAF50" />
              <Text style={s.docUploadRuleText}>{rule}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 11: ACCOUNT MANAGEMENT ==============
  const renderAccountMgmt = () => (
    <View style={s.accountSection}>
      <SectionHeader title="Account Management" subtitle="Profile & security" icon="settings" iconColor="#FF6B35" />
      {[
        { title: 'Update Profile', desc: 'Change name, email, phone', icon: 'person', color: '#FF6B35' },
        { title: 'Change Password', desc: 'Update your login credentials', icon: 'lock-closed', color: '#E74C3C' },
        { title: 'Two-Factor Auth', desc: 'Enable additional security', icon: 'shield-checkmark', color: '#4CAF50' },
        { title: 'Login Sessions', desc: 'View active login sessions', icon: 'phone-portrait', color: '#3498DB' },
        { title: 'Data Privacy', desc: 'Manage your data preferences', icon: 'eye-off', color: '#9B59B6' },
      ].map((item, i) => (
        <AnimatedCard key={i} style={s.accountCard} delay={i * 60}>
          <View style={[s.accountIcon, { backgroundColor: item.color + '15' }]}>
            <Ionicons name={item.icon} size={20} color={item.color} />
          </View>
          <View style={s.accountContent}>
            <Text style={s.accountTitle}>{item.title}</Text>
            <Text style={s.accountDesc}>{item.desc}</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#999" />
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 12: LEGAL & COMPLIANCE ==============
  const renderLegal = () => (
    <View style={s.legalSection}>
      <SectionHeader title="Legal & Compliance" subtitle="Regulatory information" icon="briefcase" iconColor="#1A1A2E" />
      <View style={s.legalCard}>
        {[
          { title: 'Policy Wordings', icon: 'document-text' },
          { title: 'IRDAI Guidelines', icon: 'shield' },
          { title: 'Grievance Redressal', icon: 'flag' },
          { title: 'Ombudsman Details', icon: 'people' },
          { title: 'Privacy Policy', icon: 'lock-closed' },
          { title: 'Terms of Service', icon: 'document' },
        ].map((item, i) => (
          <TouchableOpacity key={i} style={[s.legalRow, i < 5 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <Ionicons name={item.icon} size={18} color="#666" />
            <Text style={s.legalTitle}>{item.title}</Text>
            <Ionicons name="chevron-forward" size={16} color="#999" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 13: SYSTEM REQUIREMENTS ==============
  const renderSystemReq = () => (
    <View style={s.sysReqSection}>
      <SectionHeader title="System Requirements" subtitle="App compatibility" icon="hardware-chip" iconColor="#3498DB" />
      <View style={s.sysReqCard}>
        <View style={s.sysReqRow}>
          <View style={s.sysReqItem}>
            <Ionicons name="logo-apple" size={28} color="#1A1A2E" />
            <Text style={s.sysReqPlatform}>iOS</Text>
            <Text style={s.sysReqVersion}>iOS 14.0+</Text>
          </View>
          <View style={s.sysReqDivider} />
          <View style={s.sysReqItem}>
            <Ionicons name="logo-android" size={28} color="#4CAF50" />
            <Text style={s.sysReqPlatform}>Android</Text>
            <Text style={s.sysReqVersion}>Android 8.0+</Text>
          </View>
        </View>
        <View style={s.sysReqInfo}>
          <Text style={s.sysReqInfoTitle}>Current Version</Text>
          <Text style={s.sysReqInfoValue}>v2.5.1 (Build 128)</Text>
        </View>
        <TouchableOpacity style={s.updateBtn}>
          <Ionicons name="download" size={16} color="#3498DB" />
          <Text style={s.updateBtnText}>Check for Updates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 14: ABOUT US ==============
  const renderAboutUs = () => (
    <View style={s.aboutSection}>
      <SectionHeader title="About Us" subtitle="Our story & achievements" icon="information-circle" iconColor="#9B59B6" />
      <View style={s.aboutCard}>
        <View style={s.aboutHeader}>
          <View style={s.aboutLogo}>
            <Ionicons name="shield-checkmark" size={36} color="#FF6B35" />
          </View>
          <Text style={s.aboutName}>InsureApp</Text>
          <Text style={s.aboutTagline}>Your Trusted Insurance Partner</Text>
        </View>
        <View style={s.aboutStats}>
          {[
            { value: '10M+', label: 'Users' },
            { value: '50+', label: 'Insurers' },
            { value: '99.9%', label: 'Uptime' },
            { value: '4.8', label: 'Rating' },
          ].map((stat, i) => (
            <View key={i} style={s.aboutStat}>
              <Text style={s.aboutStatValue}>{stat.value}</Text>
              <Text style={s.aboutStatLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
        <View style={s.aboutAwards}>
          <Text style={s.aboutAwardsTitle}>Awards & Recognition</Text>
          {[
            'Best InsurTech App 2025 - Economic Times',
            'Digital Innovation Award - IRDAI',
            'Customer Excellence Award - FICCI',
          ].map((award, i) => (
            <View key={i} style={s.aboutAwardRow}>
              <Ionicons name="trophy" size={14} color="#FFB800" />
              <Text style={s.aboutAwardText}>{award}</Text>
            </View>
          ))}
        </View>
        <View style={s.aboutSocial}>
          {['logo-twitter', 'logo-facebook', 'logo-instagram', 'logo-linkedin', 'logo-youtube'].map((icon, i) => (
            <TouchableOpacity key={i} style={s.socialBtn}>
              <Ionicons name={icon} size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 15: MOST VIEWED FAQ ==============
  const renderMostViewedFAQ = () => (
    <View style={s.mostViewedSection}>
      <SectionHeader title="Most Viewed FAQs" subtitle="Popular questions" icon="help-buoy" iconColor="#E74C3C" />
      {INSURANCE_FAQS.slice(0, 5).map(faq => (
        <FAQItem key={faq.id} item={faq} />
      ))}
    </View>
  );

  // ============== SKELETON ==============
  if (isLoading) {
    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" backgroundColor="#9B59B6" />
        <View style={{ backgroundColor: '#9B59B6', height: 200 }} />
        <View style={{ padding: 16 }}>
          <SkeletonSection />
          <SkeletonSection />
          <SkeletonSection />
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9B59B6" />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#9B59B6" colors={['#9B59B6']} />}
      >
        {renderHeader()}
        {renderFAQCategories()}
        {renderClaimProcess()}
        {renderPolicyUnderstanding()}
        {renderContactUs()}
        {renderTroubleshooting()}
        {renderFeedback()}
        {renderCommunity()}
        {renderVideoGuides()}
        {renderDocUpload()}
        {renderAccountMgmt()}
        {renderLegal()}
        {renderSystemReq()}
        {renderAboutUs()}
        {renderMostViewedFAQ()}
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
  headerSubtitle: { color: '#D7BDE2', fontSize: 13, marginTop: 4 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, borderRadius: 12, paddingHorizontal: 14, height: 44, gap: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#1A1A2E' },
  quickActions: { flexDirection: 'row', justifyContent: 'center', gap: 24, marginTop: 16 },
  quickActionBtn: { alignItems: 'center' },
  quickActionIcon: { width: 44, height: 44, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  quickActionText: { color: '#fff', fontSize: 11, fontWeight: '600' },

  // FAQ Categories
  faqCatSection: { paddingVertical: 8 },
  faqCatGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  faqCatCard: { width: (SCREEN_WIDTH - 24 - 16) / 3, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  faqCatIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  faqCatTitle: { fontSize: 12, fontWeight: '700', color: '#1A1A2E', textAlign: 'center' },
  faqCatCount: { fontSize: 10, color: '#999', marginTop: 2 },

  // Claim Process
  claimSection: { paddingVertical: 8 },
  claimCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  claimStep: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 4 },
  claimStepTimeline: { width: 32, alignItems: 'center' },
  claimStepNumber: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  claimStepNumberText: { color: '#fff', fontSize: 12, fontWeight: '800' },
  claimStepLine: { width: 2, height: 24, backgroundColor: '#FFE0B2' },
  claimStepContent: { flex: 1, marginLeft: 10, marginBottom: 8 },
  claimStepTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  claimStepDesc: { fontSize: 11, color: '#666', marginTop: 2, lineHeight: 16 },
  claimDocs: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  claimDocsTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  claimDocRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  claimDocText: { fontSize: 12, color: '#444' },

  // Glossary
  glossarySection: { paddingVertical: 8 },
  glossaryScroll: { paddingHorizontal: 16 },
  glossaryCard: { width: 160, backgroundColor: '#fff', borderRadius: 14, padding: 14, marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  glossaryIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  glossaryTerm: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  glossaryDesc: { fontSize: 11, color: '#666', marginTop: 4, lineHeight: 16 },

  // Contact
  contactSection: { paddingVertical: 8 },
  contactGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  contactCard: { width: (SCREEN_WIDTH - 32) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  contactIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  contactTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  contactDesc: { fontSize: 11, color: '#666', marginTop: 4, lineHeight: 16 },

  // Troubleshooting
  troubleSection: { paddingVertical: 8 },
  troubleCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 8, backgroundColor: '#fff', borderRadius: 12, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 1 },
  troubleIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  troubleContent: { flex: 1, marginLeft: 10 },
  troubleTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  troubleDesc: { fontSize: 11, color: '#666', marginTop: 2, lineHeight: 15 },

  // Feedback
  feedbackSection: { paddingVertical: 8 },
  feedbackCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  feedbackTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 16 },
  feedbackEmojis: { flexDirection: 'row', gap: 32, marginBottom: 16 },
  feedbackEmoji: { alignItems: 'center' },
  feedbackEmojiText: { fontSize: 11, fontWeight: '600', marginTop: 4 },
  feedbackButtons: { flexDirection: 'row', gap: 12, width: '100%' },
  feedbackBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#E0E0E0' },
  feedbackBtnText: { fontSize: 12, fontWeight: '600', color: '#1A1A2E' },

  // Community
  communitySection: { paddingVertical: 8 },
  threadCard: { marginHorizontal: 16, marginBottom: 6, backgroundColor: '#fff', borderRadius: 10, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  threadHeader: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  threadTitle: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', flex: 1 },
  threadMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  threadAuthor: { fontSize: 11, color: '#666', fontWeight: '500' },
  threadDot: { color: '#999', fontSize: 8 },
  threadReplies: { fontSize: 11, color: '#666' },
  threadTime: { fontSize: 11, color: '#999' },
  viewAllBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 4, marginBottom: 4 },
  viewAllText: { fontSize: 13, fontWeight: '600', color: '#3498DB' },

  // Video Guides
  videoSection: { paddingVertical: 8 },
  videoScroll: { paddingHorizontal: 16 },
  videoCard: { width: 200, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', marginRight: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
  videoThumbnail: { height: 110, justifyContent: 'center', alignItems: 'center' },
  playButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  videoDuration: { position: 'absolute', bottom: 6, right: 8, backgroundColor: 'rgba(0,0,0,0.7)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, color: '#fff', fontSize: 10, fontWeight: '600', overflow: 'hidden' },
  videoTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E', padding: 10, paddingBottom: 2 },
  videoViews: { fontSize: 11, color: '#999', paddingHorizontal: 10, paddingBottom: 10 },

  // Document Upload
  docUploadSection: { paddingVertical: 8 },
  docUploadCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  docUploadTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 10 },
  docFormats: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  docFormat: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, borderWidth: 1.5 },
  docFormatText: { fontSize: 12, fontWeight: '700' },
  docUploadRules: { gap: 6 },
  docUploadRule: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  docUploadRuleText: { fontSize: 12, color: '#444' },

  // Account Management
  accountSection: { paddingVertical: 8 },
  accountCard: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 6, backgroundColor: '#fff', borderRadius: 10, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 3, elevation: 1 },
  accountIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  accountContent: { flex: 1, marginLeft: 10 },
  accountTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  accountDesc: { fontSize: 11, color: '#666', marginTop: 2 },

  // Legal
  legalSection: { paddingVertical: 8 },
  legalCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  legalRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14 },
  legalTitle: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1A1A2E' },

  // System Requirements
  sysReqSection: { paddingVertical: 8 },
  sysReqCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  sysReqRow: { flexDirection: 'row', marginBottom: 16 },
  sysReqItem: { flex: 1, alignItems: 'center', padding: 10 },
  sysReqPlatform: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginTop: 6 },
  sysReqVersion: { fontSize: 12, color: '#666', marginTop: 2 },
  sysReqDivider: { width: 1, backgroundColor: '#F0F0F0' },
  sysReqInfo: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  sysReqInfoTitle: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  sysReqInfoValue: { fontSize: 13, color: '#666' },
  updateBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#3498DB' },
  updateBtnText: { fontSize: 13, fontWeight: '700', color: '#3498DB' },

  // About Us
  aboutSection: { paddingVertical: 8 },
  aboutCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  aboutHeader: { alignItems: 'center', padding: 20, backgroundColor: '#FFF3E0' },
  aboutLogo: { width: 64, height: 64, borderRadius: 18, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  aboutName: { fontSize: 20, fontWeight: '800', color: '#1A1A2E' },
  aboutTagline: { fontSize: 12, color: '#666', marginTop: 2 },
  aboutStats: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  aboutStat: { flex: 1, alignItems: 'center' },
  aboutStatValue: { fontSize: 18, fontWeight: '800', color: '#FF6B35' },
  aboutStatLabel: { fontSize: 10, color: '#999', marginTop: 2 },
  aboutAwards: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  aboutAwardsTitle: { fontSize: 14, fontWeight: '700', color: '#1A1A2E', marginBottom: 8 },
  aboutAwardRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  aboutAwardText: { fontSize: 12, color: '#444' },
  aboutSocial: { flexDirection: 'row', justifyContent: 'center', gap: 12, padding: 16 },
  socialBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },

  // Most viewed FAQ
  mostViewedSection: { paddingVertical: 8 },
});
