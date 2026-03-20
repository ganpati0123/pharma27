/**
 * ============================================================================
 * RECORDS TAB - PREMIUM HEALTH DOCUMENTS MANAGER
 * ============================================================================
 * All Health Documents page with search, filters, sort, categories, upload,
 * document list, recent uploads, storage info, smart folders, OCR scan,
 * document sharing, cloud backup, timeline view, and help section.
 * ============================================================================
 */

import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  StatusBar,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const COLORS = {
  primary: '#00838F',
  primaryLight: '#4FB3BF',
  primaryDark: '#005662',
  accent: '#FF6B35',
  green: '#2E7D32',
  red: '#C62828',
  blue: '#1565C0',
  purple: '#6A1B9A',
  orange: '#EF6C00',
  teal: '#00838F',
  white: '#FFFFFF',
  background: '#F5F6FA',
  textPrimary: '#1A1A2E',
  textSecondary: '#4A4A6A',
  textTertiary: '#8888A8',
  textMuted: '#AAAACC',
  border: '#E0E0E8',
  divider: '#EBEBF5',
  shadow: 'rgba(0, 131, 143, 0.12)',
  darkBg: '#2C2C3A',
};

/* ==================== HEADER ==================== */
const RecordsHeader = React.memo(() => {
  return (
    <View style={styles.header}>
      <SafeAreaView>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.headerBackButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>All Health Documents</Text>
          </View>
          <TouchableOpacity style={styles.headerHelpButton}>
            <Ionicons name="help-circle-outline" size={26} color={COLORS.textPrimary} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
});

/* ==================== SEARCH & FILTER BAR ==================== */
const SearchFilterBar = React.memo(() => {
  const [searchText, setSearchText] = useState('');
  return (
    <View style={styles.searchFilterContainer}>
      <View style={styles.searchBarRow}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={COLORS.textTertiary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search records"
            placeholderTextColor={COLORS.textTertiary}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sortButton}>
          <Ionicons name="swap-vertical" size={22} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

/* ==================== DOCUMENT CATEGORIES ==================== */
const DocumentCategories = React.memo(() => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = useMemo(() => [
    { id: 'all', label: 'All', icon: 'grid', count: 24 },
    { id: 'prescriptions', label: 'Prescriptions', icon: 'document-text', count: 8 },
    { id: 'reports', label: 'Lab Reports', icon: 'flask', count: 6 },
    { id: 'bills', label: 'Bills', icon: 'receipt', count: 4 },
    { id: 'xrays', label: 'X-Rays', icon: 'scan', count: 3 },
    { id: 'insurance', label: 'Insurance', icon: 'shield-checkmark', count: 2 },
    { id: 'vaccination', label: 'Vaccination', icon: 'medkit', count: 1 },
  ], []);

  return (
    <View style={styles.categoriesContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesScroll}>
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryChip, activeCategory === cat.id && styles.categoryChipActive]}
            onPress={() => setActiveCategory(cat.id)}
            activeOpacity={0.7}
          >
            <Ionicons name={cat.icon} size={16} color={activeCategory === cat.id ? COLORS.white : COLORS.textSecondary} />
            <Text style={[styles.categoryChipText, activeCategory === cat.id && styles.categoryChipTextActive]}>{cat.label}</Text>
            <View style={[styles.categoryBadge, activeCategory === cat.id && styles.categoryBadgeActive]}>
              <Text style={[styles.categoryBadgeText, activeCategory === cat.id && styles.categoryBadgeTextActive]}>{cat.count}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
});

/* ==================== UPLOAD BANNER ==================== */
const UploadBanner = React.memo(() => {
  return (
    <View style={styles.uploadBannerContainer}>
      <View style={styles.uploadBanner}>
        <View style={styles.uploadBannerIllustration}>
          <View style={styles.folderIcon}>
            <Ionicons name="folder-open" size={48} color="#FFB74D" />
          </View>
          <View style={styles.searchMagnifier}>
            <Ionicons name="search" size={28} color={COLORS.primary} />
          </View>
        </View>
        <Text style={styles.uploadBannerText}>No Records To Show</Text>
        <Text style={styles.uploadBannerSubtext}>Upload your health documents to keep them organized and accessible anytime, anywhere.</Text>
        <TouchableOpacity style={styles.uploadButton}>
          <LinearGradient colors={['#00838F', '#4FB3BF']} style={styles.uploadButtonGradient}>
            <Ionicons name="cloud-upload" size={20} color={COLORS.white} />
            <Text style={styles.uploadButtonText}>Upload Document</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
});

/* ==================== SMART FOLDERS ==================== */
const SmartFolders = React.memo(() => {
  const folders = useMemo(() => [
    { id: '1', name: 'Recent Uploads', icon: 'time', color: '#1565C0', bgColor: '#E3F2FD', count: 5, size: '12.4 MB' },
    { id: '2', name: 'Prescriptions', icon: 'document-text', color: '#2E7D32', bgColor: '#E8F5E9', count: 8, size: '5.2 MB' },
    { id: '3', name: 'Lab Reports', icon: 'flask', color: '#6A1B9A', bgColor: '#F3E5F5', count: 6, size: '18.7 MB' },
    { id: '4', name: 'Medical Bills', icon: 'receipt', color: '#EF6C00', bgColor: '#FFF3E0', count: 4, size: '3.1 MB' },
    { id: '5', name: 'X-Ray & Scans', icon: 'scan', color: '#C62828', bgColor: '#FFEBEE', count: 3, size: '45.2 MB' },
    { id: '6', name: 'Insurance Claims', icon: 'shield-checkmark', color: '#00838F', bgColor: '#E0F7FA', count: 2, size: '8.3 MB' },
    { id: '7', name: 'Vaccination Records', icon: 'medkit', color: '#4CAF50', bgColor: '#E8F5E9', count: 1, size: '1.2 MB' },
    { id: '8', name: 'Dental Records', icon: 'happy', color: '#FF5722', bgColor: '#FBE9E7', count: 0, size: '0 MB' },
  ], []);

  return (
    <View style={styles.smartFoldersSection}>
      <View style={styles.smartFoldersSectionHeader}>
        <Text style={styles.sectionTitle}>Smart Folders</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>Manage</Text></TouchableOpacity>
      </View>
      <View style={styles.foldersGrid}>
        {folders.map((folder) => (
          <TouchableOpacity key={folder.id} style={styles.folderCard} activeOpacity={0.7}>
            <View style={[styles.folderIconBg, { backgroundColor: folder.bgColor }]}>
              <Ionicons name={folder.icon} size={24} color={folder.color} />
            </View>
            <Text style={styles.folderName}>{folder.name}</Text>
            <Text style={styles.folderMeta}>{folder.count} files - {folder.size}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

/* ==================== RECENT DOCUMENTS ==================== */
const RecentDocuments = React.memo(() => {
  const documents = useMemo(() => [
    { id: '1', name: 'Blood Test Report', type: 'Lab Report', date: 'Mar 5, 2026', size: '2.4 MB', icon: 'flask', color: '#6A1B9A', format: 'PDF', doctor: 'Dr. Priya Sharma' },
    { id: '2', name: 'Prescription - Cardiologist', type: 'Prescription', date: 'Mar 2, 2026', size: '1.1 MB', icon: 'document-text', color: '#2E7D32', format: 'PDF', doctor: 'Dr. Rahul Verma' },
    { id: '3', name: 'Chest X-Ray', type: 'X-Ray', date: 'Feb 28, 2026', size: '8.7 MB', icon: 'scan', color: '#C62828', format: 'DICOM', doctor: 'Dr. Anita Singh' },
    { id: '4', name: 'Hospital Bill - Apollo', type: 'Bill', date: 'Feb 25, 2026', size: '0.8 MB', icon: 'receipt', color: '#EF6C00', format: 'PDF', doctor: 'Apollo Hospital' },
    { id: '5', name: 'ECG Report', type: 'Lab Report', date: 'Feb 20, 2026', size: '3.2 MB', icon: 'pulse', color: '#E91E63', format: 'PDF', doctor: 'Dr. Rahul Verma' },
    { id: '6', name: 'Thyroid Panel Results', type: 'Lab Report', date: 'Feb 15, 2026', size: '1.5 MB', icon: 'flask', color: '#1565C0', format: 'PDF', doctor: 'PathLab Diagnostics' },
  ], []);

  return (
    <View style={styles.recentDocsSection}>
      <View style={styles.recentDocsSectionHeader}>
        <Text style={styles.sectionTitle}>Recent Documents</Text>
        <TouchableOpacity><Text style={styles.sectionViewAll}>See All</Text></TouchableOpacity>
      </View>
      {documents.map((doc) => (
        <TouchableOpacity key={doc.id} style={styles.docCard} activeOpacity={0.7}>
          <View style={[styles.docIconBg, { backgroundColor: doc.color + '15' }]}>
            <Ionicons name={doc.icon} size={22} color={doc.color} />
          </View>
          <View style={styles.docInfo}>
            <Text style={styles.docName}>{doc.name}</Text>
            <Text style={styles.docMeta}>{doc.type} - {doc.doctor}</Text>
            <View style={styles.docBottomRow}>
              <Text style={styles.docDate}>{doc.date}</Text>
              <View style={styles.docFormatBadge}>
                <Text style={styles.docFormatText}>{doc.format}</Text>
              </View>
              <Text style={styles.docSize}>{doc.size}</Text>
            </View>
          </View>
          <View style={styles.docActions}>
            <TouchableOpacity style={styles.docActionButton}>
              <Ionicons name="share-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.docActionButton}>
              <Ionicons name="download-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
});

/* ==================== STORAGE INFO ==================== */
const StorageInfo = React.memo(() => {
  const usedStorage = 94.1;
  const totalStorage = 500;
  const percentage = (usedStorage / totalStorage) * 100;

  return (
    <View style={styles.storageSection}>
      <Text style={styles.sectionTitle}>Storage Overview</Text>
      <View style={styles.storageCard}>
        <LinearGradient colors={['#E3F2FD', '#BBDEFB']} style={styles.storageGradient}>
          <View style={styles.storageTop}>
            <View style={styles.storageCircle}>
              <Ionicons name="cloud" size={32} color={COLORS.blue} />
              <Text style={styles.storageUsed}>{usedStorage} MB</Text>
            </View>
            <View style={styles.storageDetails}>
              <Text style={styles.storageTitle}>Cloud Storage</Text>
              <Text style={styles.storageSubtitle}>{usedStorage} MB of {totalStorage} MB used</Text>
              <View style={styles.storageBar}>
                <View style={[styles.storageBarFill, { width: `${percentage}%` }]} />
              </View>
              <Text style={styles.storageRemaining}>{(totalStorage - usedStorage).toFixed(1)} MB remaining</Text>
            </View>
          </View>
          <View style={styles.storageBreakdown}>
            {[
              { label: 'Lab Reports', size: '42.3 MB', color: '#6A1B9A', percentage: 45 },
              { label: 'X-Rays', size: '28.5 MB', color: '#C62828', percentage: 30 },
              { label: 'Prescriptions', size: '12.8 MB', color: '#2E7D32', percentage: 14 },
              { label: 'Others', size: '10.5 MB', color: '#EF6C00', percentage: 11 },
            ].map((item) => (
              <View key={item.label} style={styles.storageBreakdownItem}>
                <View style={[styles.storageDot, { backgroundColor: item.color }]} />
                <Text style={styles.storageBreakdownLabel}>{item.label}</Text>
                <Text style={styles.storageBreakdownSize}>{item.size}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.upgradeStorageButton}>
            <Ionicons name="rocket" size={16} color={COLORS.white} />
            <Text style={styles.upgradeStorageText}>Upgrade to Premium Storage</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== OCR SCAN FEATURE ==================== */
const OCRScanFeature = React.memo(() => {
  return (
    <View style={styles.ocrSection}>
      <View style={styles.ocrCard}>
        <LinearGradient colors={['#4A148C', '#7B1FA2']} style={styles.ocrGradient}>
          <View style={styles.ocrContent}>
            <View style={styles.ocrIconContainer}>
              <Ionicons name="camera" size={36} color={COLORS.white} />
            </View>
            <Text style={styles.ocrTitle}>Smart Document Scanner</Text>
            <Text style={styles.ocrDesc}>Use AI-powered OCR to scan physical documents, prescriptions, and reports. Our technology extracts text and auto-categorizes your documents.</Text>
            <View style={styles.ocrFeatures}>
              {['Auto-detect document type', 'Extract text from images', 'Smart categorization', 'Multi-page scanning'].map((feature) => (
                <View key={feature} style={styles.ocrFeatureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#69F0AE" />
                  <Text style={styles.ocrFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.ocrButton}>
              <Ionicons name="scan" size={20} color="#4A148C" />
              <Text style={styles.ocrButtonText}>Scan Document</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== DOCUMENT TIMELINE ==================== */
const DocumentTimeline = React.memo(() => {
  const timelineItems = useMemo(() => [
    { id: '1', month: 'March 2026', items: [
      { name: 'Blood Test Report', date: 'Mar 5', type: 'Lab Report', icon: 'flask', color: '#6A1B9A' },
      { name: 'Prescription', date: 'Mar 2', type: 'Prescription', icon: 'document-text', color: '#2E7D32' },
    ]},
    { id: '2', month: 'February 2026', items: [
      { name: 'Chest X-Ray', date: 'Feb 28', type: 'X-Ray', icon: 'scan', color: '#C62828' },
      { name: 'Hospital Bill', date: 'Feb 25', type: 'Bill', icon: 'receipt', color: '#EF6C00' },
      { name: 'ECG Report', date: 'Feb 20', type: 'Lab Report', icon: 'pulse', color: '#E91E63' },
      { name: 'Thyroid Panel', date: 'Feb 15', type: 'Lab Report', icon: 'flask', color: '#1565C0' },
    ]},
    { id: '3', month: 'January 2026', items: [
      { name: 'Annual Health Checkup', date: 'Jan 28', type: 'Lab Report', icon: 'flask', color: '#6A1B9A' },
      { name: 'Dental X-Ray', date: 'Jan 15', type: 'X-Ray', icon: 'scan', color: '#FF5722' },
      { name: 'Eye Test Report', date: 'Jan 10', type: 'Lab Report', icon: 'eye', color: '#00BCD4' },
    ]},
  ], []);

  return (
    <View style={styles.timelineSection}>
      <Text style={styles.sectionTitle}>Document Timeline</Text>
      {timelineItems.map((group) => (
        <View key={group.id} style={styles.timelineGroup}>
          <Text style={styles.timelineMonth}>{group.month}</Text>
          {group.items.map((item, idx) => (
            <View key={idx} style={styles.timelineItem}>
              <View style={styles.timelineLine}>
                <View style={[styles.timelineDot, { backgroundColor: item.color }]} />
                {idx < group.items.length - 1 && <View style={styles.timelineConnector} />}
              </View>
              <TouchableOpacity style={styles.timelineCard} activeOpacity={0.7}>
                <View style={[styles.timelineCardIcon, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon} size={18} color={item.color} />
                </View>
                <View style={styles.timelineCardInfo}>
                  <Text style={styles.timelineCardName}>{item.name}</Text>
                  <Text style={styles.timelineCardMeta}>{item.type} - {item.date}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={COLORS.textTertiary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
});

/* ==================== SHARING & BACKUP ==================== */
const SharingBackup = React.memo(() => {
  return (
    <View style={styles.sharingSection}>
      <Text style={styles.sectionTitle}>Share & Backup</Text>
      <View style={styles.sharingGrid}>
        <TouchableOpacity style={styles.sharingCard}>
          <LinearGradient colors={['#E8F5E9', '#C8E6C9']} style={styles.sharingCardGradient}>
            <Ionicons name="share-social" size={32} color="#2E7D32" />
            <Text style={styles.sharingCardTitle}>Share with Doctor</Text>
            <Text style={styles.sharingCardDesc}>Securely share selected records with your healthcare provider via encrypted link.</Text>
            <TouchableOpacity style={[styles.sharingActionBtn, { backgroundColor: '#2E7D32' }]}>
              <Text style={styles.sharingActionText}>Share Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sharingCard}>
          <LinearGradient colors={['#E3F2FD', '#BBDEFB']} style={styles.sharingCardGradient}>
            <Ionicons name="cloud-done" size={32} color="#1565C0" />
            <Text style={styles.sharingCardTitle}>Cloud Backup</Text>
            <Text style={styles.sharingCardDesc}>Auto-backup all your documents to secure cloud storage with end-to-end encryption.</Text>
            <TouchableOpacity style={[styles.sharingActionBtn, { backgroundColor: '#1565C0' }]}>
              <Text style={styles.sharingActionText}>Enable Backup</Text>
            </TouchableOpacity>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.exportAllButton}>
        <Ionicons name="download" size={20} color={COLORS.primary} />
        <Text style={styles.exportAllText}>Export All Records as ZIP</Text>
      </TouchableOpacity>
    </View>
  );
});

/* ==================== QUICK UPLOAD OPTIONS ==================== */
const QuickUploadOptions = React.memo(() => {
  const uploadOptions = useMemo(() => [
    { id: '1', title: 'Camera Scan', description: 'Take a photo of your document', icon: 'camera', color: '#E91E63', bgColor: '#FCE4EC' },
    { id: '2', title: 'Gallery Upload', description: 'Choose from photo gallery', icon: 'images', color: '#4CAF50', bgColor: '#E8F5E9' },
    { id: '3', title: 'File Upload', description: 'Upload PDF, DOCX, or images', icon: 'document-attach', color: '#1565C0', bgColor: '#E3F2FD' },
    { id: '4', title: 'WhatsApp Import', description: 'Import from WhatsApp chats', icon: 'logo-whatsapp', color: '#25D366', bgColor: '#E8F5E9' },
    { id: '5', title: 'Email Import', description: 'Fetch from Gmail or Outlook', icon: 'mail', color: '#F44336', bgColor: '#FFEBEE' },
    { id: '6', title: 'Lab Partner Sync', description: 'Auto-sync from partner labs', icon: 'sync', color: '#FF9800', bgColor: '#FFF3E0' },
  ], []);

  return (
    <View style={styles.quickUploadSection}>
      <Text style={styles.sectionTitle}>Quick Upload Options</Text>
      <View style={styles.quickUploadGrid}>
        {uploadOptions.map((option) => (
          <TouchableOpacity key={option.id} style={styles.quickUploadCard} activeOpacity={0.7}>
            <View style={[styles.quickUploadIconBg, { backgroundColor: option.bgColor }]}>
              <Ionicons name={option.icon} size={24} color={option.color} />
            </View>
            <Text style={styles.quickUploadTitle}>{option.title}</Text>
            <Text style={styles.quickUploadDesc}>{option.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
});

/* ==================== HELP BAR ==================== */
const HelpBar = React.memo(() => {
  return (
    <View style={styles.helpBarContainer}>
      <View style={styles.helpBar}>
        <LinearGradient colors={['#37474F', '#263238']} style={styles.helpBarGradient}>
          <View style={styles.helpBarContent}>
            <Text style={styles.helpBarText}>Could not find a record, or{'\n'}facing an issue?</Text>
            <TouchableOpacity style={styles.helpBarButton}>
              <Ionicons name="help-circle" size={18} color={COLORS.white} />
              <Text style={styles.helpBarButtonText}>Let us know</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

/* ==================== FOOTER ==================== */
const RecordsFooter = React.memo(() => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerDivider} />
      <Text style={styles.footerBrand}>Apollo 24|7 Records</Text>
      <Text style={styles.footerDesc}>Your health documents, always secure & accessible</Text>
      <View style={styles.footerBadges}>
        <View style={styles.footerBadge}><Ionicons name="shield-checkmark" size={14} color={COLORS.green} /><Text style={styles.footerBadgeText}>End-to-End Encrypted</Text></View>
        <View style={styles.footerBadge}><Ionicons name="lock-closed" size={14} color={COLORS.blue} /><Text style={styles.footerBadgeText}>HIPAA Compliant</Text></View>
      </View>
    </View>
  );
});

/* ==================== MAIN COMPONENT ==================== */
export default function Records() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <RecordsHeader />
      <SearchFilterBar />
      <DocumentCategories />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} bounces={true} contentContainerStyle={styles.scrollContent}>
        <UploadBanner />
        <SmartFolders />
        <RecentDocuments />
        <StorageInfo />
        <OCRScanFeature />
        <QuickUploadOptions />
        <DocumentTimeline />
        <SharingBackup />
        <HelpBar />
        <RecordsFooter />
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  header: { backgroundColor: COLORS.white, paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  headerContent: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  headerBackButton: { padding: 4, marginRight: 12 },
  headerTitleContainer: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  headerHelpButton: { padding: 4 },
  searchFilterContainer: { backgroundColor: COLORS.white, paddingHorizontal: 16, paddingBottom: 12 },
  searchBarRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F2F8', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: COLORS.border },
  searchInput: { flex: 1, fontSize: 15, color: COLORS.textPrimary, marginLeft: 8, paddingVertical: 0 },
  filterButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0F2F8', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  sortButton: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F0F2F8', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border },
  categoriesContainer: { backgroundColor: COLORS.white, paddingVertical: 12 },
  categoriesScroll: { paddingHorizontal: 16, gap: 8 },
  categoryChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F2F8', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, gap: 6 },
  categoryChipActive: { backgroundColor: COLORS.primary },
  categoryChipText: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  categoryChipTextActive: { color: COLORS.white },
  categoryBadge: { backgroundColor: '#E0E0E8', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2 },
  categoryBadgeActive: { backgroundColor: 'rgba(255,255,255,0.25)' },
  categoryBadgeText: { fontSize: 10, fontWeight: '700', color: COLORS.textTertiary },
  categoryBadgeTextActive: { color: COLORS.white },
  uploadBannerContainer: { paddingHorizontal: 20, marginTop: 24 },
  uploadBanner: { backgroundColor: COLORS.white, borderRadius: 20, padding: 32, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 16, elevation: 5 },
  uploadBannerIllustration: { marginBottom: 20, position: 'relative', width: 100, height: 80, justifyContent: 'center', alignItems: 'center' },
  folderIcon: { position: 'absolute' },
  searchMagnifier: { position: 'absolute', right: -10, bottom: -5, backgroundColor: '#E0F7FA', borderRadius: 20, padding: 6 },
  uploadBannerText: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 8 },
  uploadBannerSubtext: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 20, marginBottom: 20, paddingHorizontal: 10 },
  uploadButton: { borderRadius: 14, overflow: 'hidden' },
  uploadButtonGradient: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 28, paddingVertical: 14, gap: 8 },
  uploadButtonText: { fontSize: 15, fontWeight: '700', color: COLORS.white },
  smartFoldersSection: { marginTop: 28 },
  smartFoldersSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textPrimary, paddingHorizontal: 20 },
  sectionViewAll: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  foldersGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 },
  folderCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  folderIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  folderName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary, marginBottom: 4 },
  folderMeta: { fontSize: 11, color: COLORS.textTertiary },
  recentDocsSection: { marginTop: 28 },
  recentDocsSectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginBottom: 16 },
  docCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, marginHorizontal: 20, marginBottom: 12, borderRadius: 14, padding: 14, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  docIconBg: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  docInfo: { flex: 1 },
  docName: { fontSize: 14, fontWeight: '600', color: COLORS.textPrimary },
  docMeta: { fontSize: 11, color: COLORS.textTertiary, marginTop: 3 },
  docBottomRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 },
  docDate: { fontSize: 10, color: COLORS.textMuted },
  docFormatBadge: { backgroundColor: '#E0F7FA', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  docFormatText: { fontSize: 9, fontWeight: '700', color: COLORS.primary },
  docSize: { fontSize: 10, color: COLORS.textMuted },
  docActions: { flexDirection: 'row', gap: 8 },
  docActionButton: { width: 32, height: 32, borderRadius: 8, backgroundColor: COLORS.primary + '10', justifyContent: 'center', alignItems: 'center' },
  storageSection: { marginTop: 28 },
  storageCard: { marginHorizontal: 20, marginTop: 16, borderRadius: 20, overflow: 'hidden' },
  storageGradient: { padding: 24 },
  storageTop: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  storageCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.7)', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  storageUsed: { fontSize: 11, fontWeight: '700', color: COLORS.blue, marginTop: 2 },
  storageDetails: { flex: 1 },
  storageTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  storageSubtitle: { fontSize: 12, color: COLORS.textSecondary, marginTop: 2 },
  storageBar: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.5)', marginTop: 8, overflow: 'hidden' },
  storageBarFill: { height: '100%', borderRadius: 4, backgroundColor: COLORS.blue },
  storageRemaining: { fontSize: 11, color: COLORS.textTertiary, marginTop: 4 },
  storageBreakdown: { marginBottom: 16 },
  storageBreakdownItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 },
  storageDot: { width: 10, height: 10, borderRadius: 5 },
  storageBreakdownLabel: { flex: 1, fontSize: 12, color: COLORS.textSecondary },
  storageBreakdownSize: { fontSize: 12, fontWeight: '600', color: COLORS.textPrimary },
  upgradeStorageButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: COLORS.blue, borderRadius: 12, paddingVertical: 12, gap: 8 },
  upgradeStorageText: { fontSize: 14, fontWeight: '700', color: COLORS.white },
  ocrSection: { marginTop: 28, paddingHorizontal: 20 },
  ocrCard: { borderRadius: 20, overflow: 'hidden' },
  ocrGradient: { padding: 24 },
  ocrContent: { alignItems: 'center' },
  ocrIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  ocrTitle: { fontSize: 20, fontWeight: '700', color: COLORS.white, marginBottom: 8 },
  ocrDesc: { fontSize: 13, color: 'rgba(255,255,255,0.8)', textAlign: 'center', lineHeight: 20, marginBottom: 16 },
  ocrFeatures: { width: '100%', marginBottom: 20 },
  ocrFeatureItem: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  ocrFeatureText: { fontSize: 13, color: 'rgba(255,255,255,0.9)' },
  ocrButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 14, gap: 8 },
  ocrButtonText: { fontSize: 15, fontWeight: '700', color: '#4A148C' },
  quickUploadSection: { marginTop: 28 },
  quickUploadGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12, marginTop: 16 },
  quickUploadCard: { width: (SCREEN_WIDTH - 52) / 2, backgroundColor: COLORS.white, borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 8, elevation: 3 },
  quickUploadIconBg: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  quickUploadTitle: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary, textAlign: 'center', marginBottom: 4 },
  quickUploadDesc: { fontSize: 10, color: COLORS.textTertiary, textAlign: 'center', lineHeight: 14 },
  timelineSection: { marginTop: 28 },
  timelineGroup: { marginTop: 16 },
  timelineMonth: { fontSize: 14, fontWeight: '700', color: COLORS.primary, paddingHorizontal: 20, marginBottom: 12 },
  timelineItem: { flexDirection: 'row', paddingLeft: 20, marginBottom: 0 },
  timelineLine: { width: 30, alignItems: 'center' },
  timelineDot: { width: 12, height: 12, borderRadius: 6, marginTop: 16 },
  timelineConnector: { width: 2, flex: 1, backgroundColor: COLORS.border, marginTop: 4 },
  timelineCard: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: 12, padding: 12, marginRight: 20, marginBottom: 8, shadowColor: COLORS.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 1, shadowRadius: 4, elevation: 2 },
  timelineCardIcon: { width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  timelineCardInfo: { flex: 1 },
  timelineCardName: { fontSize: 13, fontWeight: '600', color: COLORS.textPrimary },
  timelineCardMeta: { fontSize: 11, color: COLORS.textTertiary, marginTop: 2 },
  sharingSection: { marginTop: 28 },
  sharingGrid: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginTop: 16 },
  sharingCard: { flex: 1, borderRadius: 16, overflow: 'hidden' },
  sharingCardGradient: { padding: 16, alignItems: 'center' },
  sharingCardTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary, marginTop: 10, textAlign: 'center' },
  sharingCardDesc: { fontSize: 11, color: COLORS.textSecondary, textAlign: 'center', lineHeight: 16, marginTop: 6, marginBottom: 12 },
  sharingActionBtn: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  sharingActionText: { fontSize: 12, fontWeight: '700', color: COLORS.white },
  exportAllButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16, gap: 8 },
  exportAllText: { fontSize: 14, fontWeight: '600', color: COLORS.primary },
  helpBarContainer: { marginTop: 28, paddingHorizontal: 20 },
  helpBar: { borderRadius: 16, overflow: 'hidden' },
  helpBarGradient: { padding: 20 },
  helpBarContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  helpBarText: { fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 20, flex: 1 },
  helpBarButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, gap: 6 },
  helpBarButtonText: { fontSize: 13, fontWeight: '600', color: COLORS.white },
  footer: { alignItems: 'center', paddingVertical: 32, marginTop: 20 },
  footerDivider: { width: 60, height: 3, backgroundColor: COLORS.primary, borderRadius: 2, marginBottom: 16 },
  footerBrand: { fontSize: 16, fontWeight: '700', color: COLORS.primary },
  footerDesc: { fontSize: 12, color: COLORS.textTertiary, marginTop: 4 },
  footerBadges: { flexDirection: 'row', gap: 16, marginTop: 12 },
  footerBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  footerBadgeText: { fontSize: 10, color: COLORS.textTertiary, fontWeight: '500' },
});
