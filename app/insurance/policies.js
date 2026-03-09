import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions,
  RefreshControl, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useInsuranceStore } from '../components/insurance/store';
import SectionHeader from '../components/insurance/shared/SectionHeader';
import AnimatedCard from '../components/insurance/shared/AnimatedCard';
import { SkeletonSection, SkeletonPlanCard } from '../components/insurance/shared/SkeletonLoader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

export default function Policies() {
  const store = useInsuranceStore();
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('active');
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 900);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // ============== SECTION 1: HEADER ==============
  const renderHeader = () => (
    <LinearGradient colors={['#FF6B35', '#FF5722', '#E64A19']} style={s.headerGradient}>
      <SafeAreaView edges={['top']}>
        <View style={s.headerContent}>
          <Text style={s.headerTitle}>My Policies</Text>
          <Text style={s.headerSubtitle}>Manage all your insurance policies</Text>
        </View>
        <View style={s.headerStats}>
          <View style={s.headerStat}>
            <Text style={s.headerStatValue}>{store.policies.length}</Text>
            <Text style={s.headerStatLabel}>Total Policies</Text>
          </View>
          <View style={s.headerStatDivider} />
          <View style={s.headerStat}>
            <Text style={s.headerStatValue}>Rs 25L</Text>
            <Text style={s.headerStatLabel}>Total Coverage</Text>
          </View>
          <View style={s.headerStatDivider} />
          <View style={s.headerStat}>
            <Text style={s.headerStatValue}>{store.policies.filter(p => p.status === 'active').length}</Text>
            <Text style={s.headerStatLabel}>Active</Text>
          </View>
        </View>
        <View style={s.tabsRow}>
          {['active', 'expired', 'all'].map(tab => (
            <TouchableOpacity key={tab} style={[s.tabBtn, activeTab === tab && s.tabBtnActive]} onPress={() => setActiveTab(tab)}>
              <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>{tab.charAt(0).toUpperCase() + tab.slice(1)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );

  // ============== SECTION 2: ACTIVE POLICIES ==============
  const renderActivePolicies = () => (
    <View style={s.activePolicies}>
      <SectionHeader title="Active Policies" subtitle="Currently covered" icon="shield-checkmark" iconColor="#2ECC71" />
      {store.policies.filter(p => p.status === 'active').map((policy, i) => (
        <AnimatedCard key={policy.id} style={s.policyCard} delay={i * 100}>
          <View style={s.policyHeader}>
            <View style={s.policyIconBg}>
              <Ionicons name="shield-checkmark" size={22} color="#FF6B35" />
            </View>
            <View style={s.policyInfo}>
              <Text style={s.policyName}>{policy.name}</Text>
              <Text style={s.policyInsurer}>{policy.insurer}</Text>
            </View>
            <View style={[s.statusBadge, { backgroundColor: '#E8F5E9' }]}>
              <View style={[s.statusDot, { backgroundColor: '#2ECC71' }]} />
              <Text style={[s.statusText, { color: '#2ECC71' }]}>Active</Text>
            </View>
          </View>
          <View style={s.policyDetails}>
            <View style={s.policyDetail}>
              <Text style={s.policyDetailLabel}>Policy No.</Text>
              <Text style={s.policyDetailValue}>{policy.id}</Text>
            </View>
            <View style={s.policyDetail}>
              <Text style={s.policyDetailLabel}>Coverage</Text>
              <Text style={s.policyDetailValue}>{policy.coverage}</Text>
            </View>
            <View style={s.policyDetail}>
              <Text style={s.policyDetailLabel}>Premium</Text>
              <Text style={s.policyDetailValue}>{policy.premium}</Text>
            </View>
          </View>
          <View style={s.policyRenewal}>
            <Ionicons name="calendar" size={14} color="#FF6B35" />
            <Text style={s.renewalText}>Renewal: {policy.renewalDate}</Text>
          </View>
          <View style={s.policyActions}>
            <TouchableOpacity style={s.policyActionBtn}>
              <Ionicons name="document-text" size={14} color="#3498DB" />
              <Text style={[s.policyActionText, { color: '#3498DB' }]}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={s.policyActionBtn}>
              <Ionicons name="download" size={14} color="#9B59B6" />
              <Text style={[s.policyActionText, { color: '#9B59B6' }]}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.policyActionBtn, s.renewBtn]}>
              <Ionicons name="refresh" size={14} color="#fff" />
              <Text style={[s.policyActionText, { color: '#fff' }]}>Renew</Text>
            </TouchableOpacity>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 3: EXPIRED POLICIES ==============
  const renderExpiredPolicies = () => (
    <View style={s.expiredSection}>
      <SectionHeader title="Expired Policies" subtitle="Lapsed & expired" icon="time" iconColor="#E74C3C" />
      {store.policies.filter(p => p.status === 'expired').length === 0 ? (
        <View style={s.emptyCard}>
          <Ionicons name="checkmark-circle" size={40} color="#2ECC71" />
          <Text style={s.emptyTitle}>No Expired Policies</Text>
          <Text style={s.emptySubtitle}>All your policies are up to date</Text>
        </View>
      ) : (
        store.policies.filter(p => p.status === 'expired').map((policy, i) => (
          <AnimatedCard key={policy.id} style={[s.policyCard, { opacity: 0.7 }]} delay={i * 100}>
            <View style={s.policyHeader}>
              <View style={[s.policyIconBg, { backgroundColor: '#FFEBEE' }]}>
                <Ionicons name="shield" size={22} color="#E74C3C" />
              </View>
              <View style={s.policyInfo}>
                <Text style={s.policyName}>{policy.name}</Text>
                <Text style={s.policyInsurer}>{policy.insurer}</Text>
              </View>
              <View style={[s.statusBadge, { backgroundColor: '#FFEBEE' }]}>
                <Text style={[s.statusText, { color: '#E74C3C' }]}>Expired</Text>
              </View>
            </View>
            <TouchableOpacity style={s.reactivateBtn}>
              <Text style={s.reactivateText}>Reactivate Policy</Text>
            </TouchableOpacity>
          </AnimatedCard>
        ))
      )}
    </View>
  );

  // ============== SECTION 4: CLAIMS HISTORY ==============
  const renderClaimsHistory = () => (
    <View style={s.claimsSection}>
      <SectionHeader title="Claims History" subtitle="All your claims" icon="document-text" iconColor="#FF6B35" actionText="File Claim" onAction={() => {}} />
      {store.claims.map((claim, i) => (
        <AnimatedCard key={claim.id} style={s.claimCard} delay={i * 80}>
          <View style={s.claimHeader}>
            <View style={s.claimTimeline}>
              <View style={[s.claimDot, { backgroundColor: claim.status === 'approved' ? '#2ECC71' : claim.status === 'rejected' ? '#E74C3C' : '#FF6B35' }]} />
              {i < store.claims.length - 1 && <View style={s.claimLine} />}
            </View>
            <View style={s.claimContent}>
              <Text style={s.claimId}>{claim.id}</Text>
              <Text style={s.claimHospital}>{claim.hospital}</Text>
              <Text style={s.claimDate}>{claim.date}</Text>
            </View>
            <View style={s.claimRight}>
              <Text style={s.claimAmount}>Rs {claim.amount.toLocaleString('en-IN')}</Text>
              <View style={[s.claimStatusBadge, { backgroundColor: claim.status === 'approved' ? '#E8F5E9' : claim.status === 'rejected' ? '#FFEBEE' : '#FFF3E0' }]}>
                <Text style={[s.claimStatusText, { color: claim.status === 'approved' ? '#2ECC71' : claim.status === 'rejected' ? '#E74C3C' : '#FF6B35' }]}>
                  {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                </Text>
              </View>
            </View>
          </View>
        </AnimatedCard>
      ))}
    </View>
  );

  // ============== SECTION 5: PREMIUM PAYMENTS ==============
  const renderPremiumPayments = () => (
    <View style={s.paymentsSection}>
      <SectionHeader title="Premium Payments" subtitle="Payment history & upcoming" icon="card" iconColor="#3498DB" />
      <View style={s.paymentCard}>
        <View style={s.paymentUpcoming}>
          <View style={s.paymentUpcomingIcon}>
            <Ionicons name="alarm" size={22} color="#FF6B35" />
          </View>
          <View style={s.paymentUpcomingInfo}>
            <Text style={s.paymentUpcomingTitle}>Upcoming Payment</Text>
            <Text style={s.paymentUpcomingAmount}>Rs 14,757</Text>
            <Text style={s.paymentUpcomingDate}>Due: 15 Apr 2026</Text>
          </View>
          <TouchableOpacity style={s.payNowBtn}>
            <Text style={s.payNowText}>Pay Now</Text>
          </TouchableOpacity>
        </View>
        <View style={s.paymentHistory}>
          <Text style={s.paymentHistoryTitle}>Recent Payments</Text>
          {[
            { date: '15 Jan 2026', amount: 'Rs 14,757', status: 'Paid', method: 'UPI' },
            { date: '15 Oct 2025', amount: 'Rs 14,757', status: 'Paid', method: 'Card' },
            { date: '15 Jul 2025', amount: 'Rs 13,500', status: 'Paid', method: 'NetBanking' },
          ].map((payment, i) => (
            <View key={i} style={s.paymentRow}>
              <View style={s.paymentRowLeft}>
                <Ionicons name="checkmark-circle" size={16} color="#2ECC71" />
                <View>
                  <Text style={s.paymentRowDate}>{payment.date}</Text>
                  <Text style={s.paymentRowMethod}>{payment.method}</Text>
                </View>
              </View>
              <Text style={s.paymentRowAmount}>{payment.amount}</Text>
            </View>
          ))}
        </View>
        <View style={s.autoPayRow}>
          <Ionicons name="repeat" size={16} color="#3498DB" />
          <Text style={s.autoPayText}>Auto-pay enabled</Text>
          <TouchableOpacity style={s.autoPayToggle}>
            <View style={[s.toggleTrack, { backgroundColor: '#3498DB' }]}>
              <View style={[s.toggleDot, { alignSelf: 'flex-end' }]} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // ============== SECTION 6: POLICY DOCUMENTS ==============
  const renderDocuments = () => (
    <View style={s.docsSection}>
      <SectionHeader title="Policy Documents" subtitle="Access your documents" icon="folder" iconColor="#9B59B6" />
      <View style={s.docsGrid}>
        {[
          { title: 'Policy Certificate', icon: 'document-text', type: 'PDF', size: '1.2 MB', color: '#E74C3C' },
          { title: 'Health Card', icon: 'card', type: 'PDF', size: '0.8 MB', color: '#3498DB' },
          { title: 'Claim Forms', icon: 'documents', type: 'ZIP', size: '2.1 MB', color: '#4CAF50' },
          { title: 'Policy Wording', icon: 'book', type: 'PDF', size: '3.5 MB', color: '#FF6B35' },
        ].map((doc, i) => (
          <AnimatedCard key={i} style={s.docCard} delay={i * 80}>
            <View style={[s.docIcon, { backgroundColor: doc.color + '15' }]}>
              <Ionicons name={doc.icon} size={22} color={doc.color} />
            </View>
            <Text style={s.docTitle}>{doc.title}</Text>
            <Text style={s.docMeta}>{doc.type} • {doc.size}</Text>
            <View style={s.docActions}>
              <TouchableOpacity style={s.docActionBtn}>
                <Ionicons name="eye" size={14} color="#3498DB" />
              </TouchableOpacity>
              <TouchableOpacity style={s.docActionBtn}>
                <Ionicons name="download" size={14} color="#FF6B35" />
              </TouchableOpacity>
              <TouchableOpacity style={s.docActionBtn}>
                <Ionicons name="share-social" size={14} color="#9B59B6" />
              </TouchableOpacity>
            </View>
          </AnimatedCard>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 7: NOMINEE DETAILS ==============
  const renderNominee = () => (
    <View style={s.nomineeSection}>
      <SectionHeader title="Nominee Details" subtitle="Beneficiary information" icon="people" iconColor="#4CAF50" actionText="Update" onAction={() => {}} />
      <View style={s.nomineeCard}>
        {[
          { name: 'Priya Sharma', relation: 'Spouse', allocation: '60%', verified: true },
          { name: 'Rahul Sharma', relation: 'Son', allocation: '40%', verified: true },
        ].map((nominee, i) => (
          <View key={i} style={[s.nomineeRow, i < 1 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={s.nomineeAvatar}>
              <Text style={s.nomineeAvatarText}>{nominee.name[0]}</Text>
            </View>
            <View style={s.nomineeInfo}>
              <View style={s.nomineeNameRow}>
                <Text style={s.nomineeName}>{nominee.name}</Text>
                {nominee.verified && <Ionicons name="checkmark-circle" size={14} color="#2ECC71" />}
              </View>
              <Text style={s.nomineeRelation}>{nominee.relation}</Text>
            </View>
            <View style={s.nomineeAllocation}>
              <Text style={s.nomineeAllocationText}>{nominee.allocation}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 8: COVERAGE SUMMARY ==============
  const renderCoverageSummary = () => (
    <View style={s.coverageSection}>
      <SectionHeader title="Coverage Summary" subtitle="Your protection overview" icon="analytics" iconColor="#FF6B35" />
      <View style={s.coverageCard}>
        <View style={s.coverageHeader}>
          <Text style={s.coverageTotal}>Rs 25,00,000</Text>
          <Text style={s.coverageLabel}>Total Sum Insured</Text>
        </View>
        <View style={s.coverageBreakdown}>
          {[
            { label: 'Base Cover', amount: 'Rs 15L', used: 'Rs 2.5L', progress: 17, color: '#FF6B35' },
            { label: 'Top-Up', amount: 'Rs 10L', used: 'Rs 0', progress: 0, color: '#4CAF50' },
          ].map((item, i) => (
            <View key={i} style={s.coverageItem}>
              <View style={s.coverageItemHeader}>
                <Text style={s.coverageItemLabel}>{item.label}</Text>
                <Text style={s.coverageItemAmount}>{item.amount}</Text>
              </View>
              <ProgressBar progress={item.progress} color={item.color} />
              <Text style={s.coverageItemUsed}>Used: {item.used}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={s.enhanceBtn}>
          <Ionicons name="arrow-up-circle" size={16} color="#FF6B35" />
          <Text style={s.enhanceBtnText}>Enhance Coverage</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 9: RENEWAL REMINDERS ==============
  const renderRenewals = () => (
    <View style={s.renewalSection}>
      <SectionHeader title="Renewal Reminders" subtitle="Stay covered always" icon="notifications" iconColor="#F39C12" />
      <View style={s.renewalCard}>
        {store.policies.filter(p => p.status === 'active').map((policy, i) => (
          <View key={policy.id} style={s.renewalRow}>
            <View style={s.renewalIconBg}>
              <Ionicons name="calendar" size={18} color="#F39C12" />
            </View>
            <View style={s.renewalInfo}>
              <Text style={s.renewalPolicyName}>{policy.name}</Text>
              <Text style={s.renewalDate}>Renewal: {policy.renewalDate}</Text>
            </View>
            <View style={s.renewalCountdown}>
              <Text style={s.renewalDays}>45</Text>
              <Text style={s.renewalDaysLabel}>days left</Text>
            </View>
          </View>
        ))}
        <View style={s.renewalSettings}>
          <Text style={s.renewalSettingsTitle}>Reminder Settings</Text>
          {['30 days before', '15 days before', '7 days before', '1 day before'].map((item, i) => (
            <View key={i} style={s.reminderRow}>
              <Text style={s.reminderText}>{item}</Text>
              <View style={[s.toggleTrack, { backgroundColor: i < 2 ? '#FF6B35' : '#E0E0E0' }]}>
                <View style={[s.toggleDot, i < 2 && { alignSelf: 'flex-end' }]} />
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SECTION 10: POLICY COMPARISON ==============
  const renderComparison = () => (
    <View style={s.compSection}>
      <SectionHeader title="Policy Comparison" subtitle="Compare your active plans" icon="git-compare" iconColor="#3498DB" />
      <View style={s.compCard}>
        <Text style={s.compHint}>Select policies to compare side by side</Text>
        <View style={s.compGrid}>
          {store.policies.filter(p => p.status === 'active').map((policy, i) => (
            <TouchableOpacity key={policy.id} style={s.compPolicyCard}>
              <Ionicons name="shield-checkmark" size={20} color="#FF6B35" />
              <Text style={s.compPolicyName} numberOfLines={1}>{policy.name}</Text>
              <Text style={s.compPolicyCoverage}>{policy.coverage}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={s.compBtn}>
          <Text style={s.compBtnText}>Compare Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // ============== SECTION 11: FAMILY COVERAGE ==============
  const renderFamilyCoverage = () => (
    <View style={s.familySection}>
      <SectionHeader title="Family Coverage" subtitle="Member-wise protection" icon="people" iconColor="#9B59B6" actionText="Add Member" onAction={() => {}} />
      <View style={s.familyCard}>
        {[
          { name: 'You (Self)', age: '29 years', coverage: 'Rs 15L', icon: 'person', color: '#FF6B35' },
          { name: 'Priya (Wife)', age: '27 years', coverage: 'Rs 15L', icon: 'woman', color: '#9B59B6' },
          { name: 'Rahul (Son)', age: '3 years', coverage: 'Rs 15L', icon: 'happy', color: '#3498DB' },
        ].map((member, i) => (
          <View key={i} style={[s.familyMember, i < 2 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={[s.familyMemberIcon, { backgroundColor: member.color + '15' }]}>
              <Ionicons name={member.icon} size={20} color={member.color} />
            </View>
            <View style={s.familyMemberInfo}>
              <Text style={s.familyMemberName}>{member.name}</Text>
              <Text style={s.familyMemberAge}>{member.age}</Text>
            </View>
            <Text style={s.familyMemberCoverage}>{member.coverage}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 12: BENEFICIARY DETAILS ==============
  const renderBeneficiary = () => (
    <View style={s.beneficiarySection}>
      <SectionHeader title="Beneficiary Details" subtitle="Allocation percentage" icon="pie-chart" iconColor="#2ECC71" />
      <View style={s.beneficiaryCard}>
        {[
          { name: 'Priya Sharma', percentage: 60, color: '#FF6B35' },
          { name: 'Rahul Sharma', percentage: 40, color: '#3498DB' },
        ].map((ben, i) => (
          <View key={i} style={s.beneficiaryRow}>
            <View style={s.beneficiaryInfo}>
              <View style={[s.beneficiaryDot, { backgroundColor: ben.color }]} />
              <Text style={s.beneficiaryName}>{ben.name}</Text>
            </View>
            <Text style={[s.beneficiaryPercent, { color: ben.color }]}>{ben.percentage}%</Text>
          </View>
        ))}
        <View style={s.beneficiaryBar}>
          <View style={[s.beneficiarySegment, { flex: 60, backgroundColor: '#FF6B35' }]} />
          <View style={[s.beneficiarySegment, { flex: 40, backgroundColor: '#3498DB' }]} />
        </View>
      </View>
    </View>
  );

  // ============== SECTION 13: POLICY STATUS ==============
  const renderPolicyStatus = () => (
    <View style={s.statusSection}>
      <SectionHeader title="Policy Status" subtitle="Underwriting & pending actions" icon="clipboard" iconColor="#F39C12" />
      <View style={s.statusCard}>
        {[
          { title: 'Medical Tests', desc: 'No pending medical tests', icon: 'medkit', status: 'Complete', color: '#2ECC71' },
          { title: 'Document Verification', desc: 'All documents verified', icon: 'document-text', status: 'Complete', color: '#2ECC71' },
          { title: 'Underwriting', desc: 'Policy underwriting complete', icon: 'checkmark-done', status: 'Complete', color: '#2ECC71' },
          { title: 'KYC Status', desc: 'KYC verification done', icon: 'person', status: 'Verified', color: '#3498DB' },
        ].map((item, i) => (
          <View key={i} style={[s.statusRow, i < 3 && { borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }]}>
            <View style={[s.statusRowIcon, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon} size={18} color={item.color} />
            </View>
            <View style={s.statusRowContent}>
              <Text style={s.statusRowTitle}>{item.title}</Text>
              <Text style={s.statusRowDesc}>{item.desc}</Text>
            </View>
            <View style={[s.statusRowBadge, { backgroundColor: item.color + '15' }]}>
              <Text style={[s.statusRowBadgeText, { color: item.color }]}>{item.status}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  // ============== SECTION 14: CUSTOMER SUPPORT ==============
  const renderSupport = () => (
    <View style={s.supportSection}>
      <SectionHeader title="Customer Support" subtitle="Dedicated assistance" icon="headset" iconColor="#3498DB" />
      <View style={s.supportCard}>
        <View style={s.supportManager}>
          <View style={s.supportManagerAvatar}>
            <Ionicons name="person" size={28} color="#3498DB" />
          </View>
          <View style={s.supportManagerInfo}>
            <Text style={s.supportManagerTitle}>Your Relationship Manager</Text>
            <Text style={s.supportManagerName}>Amit Kumar</Text>
            <Text style={s.supportManagerId}>RM-2589</Text>
          </View>
        </View>
        <View style={s.supportActions}>
          {[
            { title: 'Call', icon: 'call', color: '#4CAF50' },
            { title: 'Chat', icon: 'chatbubble', color: '#3498DB' },
            { title: 'Email', icon: 'mail', color: '#FF6B35' },
            { title: 'Schedule', icon: 'calendar', color: '#9B59B6' },
          ].map((action, i) => (
            <TouchableOpacity key={i} style={s.supportActionBtn}>
              <View style={[s.supportActionIcon, { backgroundColor: action.color + '15' }]}>
                <Ionicons name={action.icon} size={18} color={action.color} />
              </View>
              <Text style={s.supportActionText}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={s.supportHistory}>
          <Text style={s.supportHistoryTitle}>Recent Interactions</Text>
          {[
            { type: 'Chat', date: '2 days ago', topic: 'Claim status inquiry' },
            { type: 'Call', date: '1 week ago', topic: 'Policy renewal discussion' },
          ].map((interaction, i) => (
            <View key={i} style={s.supportHistoryRow}>
              <Ionicons name={interaction.type === 'Chat' ? 'chatbubble' : 'call'} size={14} color="#999" />
              <Text style={s.supportHistoryText}>{interaction.topic}</Text>
              <Text style={s.supportHistoryDate}>{interaction.date}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  // ============== SKELETON ==============
  if (isLoading) {
    return (
      <View style={s.container}>
        <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
        <View style={{ backgroundColor: '#FF6B35', height: 200 }} />
        <View style={{ padding: 16 }}>
          <SkeletonSection />
          <SkeletonPlanCard />
          <SkeletonPlanCard />
        </View>
      </View>
    );
  }

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
      <Animated.ScrollView
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FF6B35" colors={['#FF6B35']} />}
      >
        {renderHeader()}
        {renderActivePolicies()}
        {renderExpiredPolicies()}
        {renderClaimsHistory()}
        {renderPremiumPayments()}
        {renderDocuments()}
        {renderNominee()}
        {renderCoverageSummary()}
        {renderRenewals()}
        {renderComparison()}
        {renderFamilyCoverage()}
        {renderBeneficiary()}
        {renderPolicyStatus()}
        {renderSupport()}
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
  headerSubtitle: { color: '#FFCCBC', fontSize: 13, marginTop: 4 },
  headerStats: { flexDirection: 'row', marginHorizontal: 16, marginTop: 16, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 14 },
  headerStat: { flex: 1, alignItems: 'center' },
  headerStatValue: { color: '#fff', fontSize: 20, fontWeight: '800' },
  headerStatLabel: { color: '#FFCCBC', fontSize: 10, marginTop: 2 },
  headerStatDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  tabsRow: { flexDirection: 'row', marginHorizontal: 16, marginTop: 12, gap: 8 },
  tabBtn: { flex: 1, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center' },
  tabBtnActive: { backgroundColor: '#fff' },
  tabText: { fontSize: 13, fontWeight: '600', color: 'rgba(255,255,255,0.7)' },
  tabTextActive: { color: '#FF6B35' },

  // Active Policies
  activePolicies: { paddingVertical: 8 },
  policyCard: { marginHorizontal: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4 },
  policyHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  policyIconBg: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF3E0', justifyContent: 'center', alignItems: 'center' },
  policyInfo: { flex: 1, marginLeft: 10 },
  policyName: { fontSize: 15, fontWeight: '700', color: '#1A1A2E' },
  policyInsurer: { fontSize: 12, color: '#666', marginTop: 2 },
  statusBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, gap: 4 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusText: { fontSize: 11, fontWeight: '600' },
  policyDetails: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#F0F0F0' },
  policyDetail: { flex: 1 },
  policyDetailLabel: { fontSize: 10, color: '#999' },
  policyDetailValue: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginTop: 2 },
  policyRenewal: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 10 },
  renewalText: { fontSize: 12, color: '#FF6B35', fontWeight: '500' },
  policyActions: { flexDirection: 'row', gap: 8, marginTop: 12 },
  policyActionBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, paddingVertical: 8, borderRadius: 8, backgroundColor: '#F5F5F5' },
  policyActionText: { fontSize: 12, fontWeight: '600' },
  renewBtn: { backgroundColor: '#FF6B35' },

  // Expired
  expiredSection: { paddingVertical: 8 },
  emptyCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginTop: 10 },
  emptySubtitle: { fontSize: 12, color: '#666', marginTop: 4 },
  reactivateBtn: { marginTop: 12, paddingVertical: 8, borderRadius: 8, backgroundColor: '#FFF3E0', alignItems: 'center' },
  reactivateText: { fontSize: 13, fontWeight: '600', color: '#FF6B35' },

  // Claims
  claimsSection: { paddingVertical: 8 },
  claimCard: { marginHorizontal: 16, marginBottom: 4 },
  claimHeader: { flexDirection: 'row', alignItems: 'center' },
  claimTimeline: { width: 24, alignItems: 'center' },
  claimDot: { width: 10, height: 10, borderRadius: 5 },
  claimLine: { width: 2, height: 30, backgroundColor: '#E0E0E0', marginTop: 2 },
  claimContent: { flex: 1, marginLeft: 10 },
  claimId: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  claimHospital: { fontSize: 11, color: '#666', marginTop: 1 },
  claimDate: { fontSize: 10, color: '#999', marginTop: 1 },
  claimRight: { alignItems: 'flex-end' },
  claimAmount: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  claimStatusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, marginTop: 4 },
  claimStatusText: { fontSize: 10, fontWeight: '600' },

  // Payments
  paymentsSection: { paddingVertical: 8 },
  paymentCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  paymentUpcoming: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFF8E1' },
  paymentUpcomingIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  paymentUpcomingInfo: { flex: 1, marginLeft: 10 },
  paymentUpcomingTitle: { fontSize: 11, color: '#999' },
  paymentUpcomingAmount: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  paymentUpcomingDate: { fontSize: 11, color: '#FF6B35', marginTop: 2 },
  payNowBtn: { backgroundColor: '#FF6B35', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8 },
  payNowText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  paymentHistory: { padding: 16 },
  paymentHistoryTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 10 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  paymentRowLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  paymentRowDate: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  paymentRowMethod: { fontSize: 10, color: '#999' },
  paymentRowAmount: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  autoPayRow: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  autoPayText: { flex: 1, fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  autoPayToggle: {},
  toggleTrack: { width: 40, height: 22, borderRadius: 11, padding: 2 },
  toggleDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: '#fff' },

  // Documents
  docsSection: { paddingVertical: 8 },
  docsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 8 },
  docCard: { width: (SCREEN_WIDTH - 32) / 2, backgroundColor: '#fff', borderRadius: 14, padding: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  docIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  docTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  docMeta: { fontSize: 10, color: '#999', marginTop: 4 },
  docActions: { flexDirection: 'row', gap: 8, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  docActionBtn: { width: 30, height: 30, borderRadius: 8, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' },

  // Nominee
  nomineeSection: { paddingVertical: 8 },
  nomineeCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  nomineeRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  nomineeAvatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FF6B35', justifyContent: 'center', alignItems: 'center' },
  nomineeAvatarText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  nomineeInfo: { flex: 1, marginLeft: 10 },
  nomineeNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  nomineeName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  nomineeRelation: { fontSize: 11, color: '#666', marginTop: 2 },
  nomineeAllocation: { backgroundColor: '#FFF3E0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  nomineeAllocationText: { fontSize: 14, fontWeight: '800', color: '#FF6B35' },

  // Coverage Summary
  coverageSection: { paddingVertical: 8 },
  coverageCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  coverageHeader: { alignItems: 'center', marginBottom: 16 },
  coverageTotal: { fontSize: 28, fontWeight: '800', color: '#FF6B35' },
  coverageLabel: { fontSize: 12, color: '#666', marginTop: 2 },
  coverageBreakdown: { gap: 12 },
  coverageItem: { gap: 4 },
  coverageItemHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  coverageItemLabel: { fontSize: 13, fontWeight: '600', color: '#1A1A2E' },
  coverageItemAmount: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },
  coverageItemUsed: { fontSize: 10, color: '#999' },
  enhanceBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16, paddingVertical: 10, borderRadius: 10, borderWidth: 1.5, borderColor: '#FF6B35' },
  enhanceBtnText: { fontSize: 13, fontWeight: '700', color: '#FF6B35' },

  // Renewals
  renewalSection: { paddingVertical: 8 },
  renewalCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  renewalRow: { flexDirection: 'row', alignItems: 'center', padding: 14, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  renewalIconBg: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF8E1', justifyContent: 'center', alignItems: 'center' },
  renewalInfo: { flex: 1, marginLeft: 10 },
  renewalPolicyName: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  renewalDate: { fontSize: 11, color: '#666', marginTop: 2 },
  renewalCountdown: { alignItems: 'center' },
  renewalDays: { fontSize: 18, fontWeight: '800', color: '#F39C12' },
  renewalDaysLabel: { fontSize: 10, color: '#999' },
  renewalSettings: { padding: 14 },
  renewalSettingsTitle: { fontSize: 14, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  reminderRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6 },
  reminderText: { fontSize: 13, color: '#444' },

  // Comparison
  compSection: { paddingVertical: 8 },
  compCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  compHint: { fontSize: 12, color: '#666', textAlign: 'center', marginBottom: 12 },
  compGrid: { flexDirection: 'row', gap: 8 },
  compPolicyCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#E0E0E0' },
  compPolicyName: { fontSize: 11, fontWeight: '600', color: '#1A1A2E', textAlign: 'center', marginTop: 4 },
  compPolicyCoverage: { fontSize: 12, fontWeight: '700', color: '#FF6B35', marginTop: 2 },
  compBtn: { marginTop: 12, paddingVertical: 10, borderRadius: 8, backgroundColor: '#3498DB', alignItems: 'center' },
  compBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Family
  familySection: { paddingVertical: 8 },
  familyCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  familyMember: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  familyMemberIcon: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  familyMemberInfo: { flex: 1, marginLeft: 10 },
  familyMemberName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  familyMemberAge: { fontSize: 11, color: '#666', marginTop: 2 },
  familyMemberCoverage: { fontSize: 14, fontWeight: '700', color: '#FF6B35' },

  // Beneficiary
  beneficiarySection: { paddingVertical: 8 },
  beneficiaryCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, padding: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  beneficiaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  beneficiaryInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  beneficiaryDot: { width: 10, height: 10, borderRadius: 5 },
  beneficiaryName: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  beneficiaryPercent: { fontSize: 16, fontWeight: '800' },
  beneficiaryBar: { flexDirection: 'row', height: 8, borderRadius: 4, overflow: 'hidden', marginTop: 8 },
  beneficiarySegment: { height: '100%' },

  // Policy Status
  statusSection: { paddingVertical: 8 },
  statusCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 14, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statusRow: { flexDirection: 'row', alignItems: 'center', padding: 14 },
  statusRowIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  statusRowContent: { flex: 1, marginLeft: 10 },
  statusRowTitle: { fontSize: 13, fontWeight: '700', color: '#1A1A2E' },
  statusRowDesc: { fontSize: 11, color: '#666', marginTop: 2 },
  statusRowBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusRowBadgeText: { fontSize: 10, fontWeight: '600' },

  // Support
  supportSection: { paddingVertical: 8 },
  supportCard: { marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3 },
  supportManager: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#F5F5F5' },
  supportManagerAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#EBF5FB', justifyContent: 'center', alignItems: 'center' },
  supportManagerInfo: { marginLeft: 12 },
  supportManagerTitle: { fontSize: 11, color: '#999' },
  supportManagerName: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginTop: 2 },
  supportManagerId: { fontSize: 11, color: '#666', marginTop: 1 },
  supportActions: { flexDirection: 'row', padding: 14, gap: 8 },
  supportActionBtn: { flex: 1, alignItems: 'center' },
  supportActionIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  supportActionText: { fontSize: 11, fontWeight: '600', color: '#1A1A2E' },
  supportHistory: { padding: 14, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
  supportHistoryTitle: { fontSize: 13, fontWeight: '600', color: '#1A1A2E', marginBottom: 8 },
  supportHistoryRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6 },
  supportHistoryText: { flex: 1, fontSize: 12, color: '#444' },
  supportHistoryDate: { fontSize: 10, color: '#999' },
});
