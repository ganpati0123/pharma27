/**
 * ============================================================================
 * INSTANT DR SCREEN - MEDICAL BLUE EDITION THEME
 * ============================================================================
 */

export const DR_COLORS = {
  // Primary Medical Blue
  medicalBlue: '#0088FF',
  medicalBlueLight: '#33A0FF',
  medicalBlueDark: '#0066CC',
  medicalBlueFaded: 'rgba(0, 136, 255, 0.08)',
  medicalBlueSubtle: 'rgba(0, 136, 255, 0.15)',
  medicalBlueGlow: 'rgba(0, 136, 255, 0.25)',

  // Emergency Red
  emergencyRed: '#FF4444',
  emergencyRedFaded: 'rgba(255, 68, 68, 0.10)',

  // Health Green
  healthGreen: '#00A651',
  healthGreenFaded: 'rgba(0, 166, 81, 0.10)',

  // Specialist Purple
  specialistPurple: '#7B2CBF',
  specialistPurpleFaded: 'rgba(123, 44, 191, 0.10)',

  // Warm Orange
  warmOrange: '#FF6B35',
  warmOrangeFaded: 'rgba(255, 107, 53, 0.10)',

  // Teal
  teal: '#009688',
  tealFaded: 'rgba(0, 150, 136, 0.10)',

  // Gradients
  gradientMedicalBlue: ['#0088FF', '#33A0FF'],
  gradientEmergency: ['#FF4444', '#FF6B6B'],
  gradientHealth: ['#00A651', '#00C853'],
  gradientPurple: ['#7B2CBF', '#9B59B6'],
  gradientTeal: ['#009688', '#26A69A'],
  gradientSunset: ['#FF6B35', '#FFB800'],
};

export const DR_DATA = {
  specialties: [
    { id: 1, title: 'General\nPhysician', icon: 'person', color: '#0088FF', bgColor: 'rgba(0,136,255,0.10)', patients: '2.5L+', rating: 4.8 },
    { id: 2, title: 'Obstetrics\n& Gynaecolo...', icon: 'woman', color: '#E91E63', bgColor: 'rgba(233,30,99,0.10)', patients: '1.8L+', rating: 4.9 },
    { id: 3, title: 'Paediatrics', icon: 'happy', color: '#FF6B35', bgColor: 'rgba(255,107,53,0.10)', patients: '1.2L+', rating: 4.7 },
    { id: 4, title: 'Dermatology', icon: 'flower', color: '#9B59B6', bgColor: 'rgba(155,89,182,0.10)', patients: '980K+', rating: 4.8 },
    { id: 5, title: 'Cardiology', icon: 'heart', color: '#FF4444', bgColor: 'rgba(255,68,68,0.10)', patients: '750K+', rating: 4.9 },
    { id: 6, title: 'Orthopaedics', icon: 'body', color: '#009688', bgColor: 'rgba(0,150,136,0.10)', patients: '620K+', rating: 4.7 },
    { id: 7, title: 'ENT\nSpecialist', icon: 'ear', color: '#FFB800', bgColor: 'rgba(255,184,0,0.10)', patients: '540K+', rating: 4.6 },
    { id: 8, title: 'Psychiatry', icon: 'brain', color: '#7B2CBF', bgColor: 'rgba(123,44,191,0.10)', patients: '420K+', rating: 4.8 },
    { id: 9, title: 'Ophthalmology', icon: 'eye', color: '#00A651', bgColor: 'rgba(0,166,81,0.10)', patients: '380K+', rating: 4.7 },
    { id: 10, title: 'Neurology', icon: 'pulse', color: '#0066CC', bgColor: 'rgba(0,102,204,0.10)', patients: '310K+', rating: 4.9 },
    { id: 11, title: 'Urology', icon: 'medical', color: '#FF6B35', bgColor: 'rgba(255,107,53,0.10)', patients: '280K+', rating: 4.6 },
    { id: 12, title: 'Gastroentero\nlogy', icon: 'nutrition', color: '#4CAF50', bgColor: 'rgba(76,175,80,0.10)', patients: '260K+', rating: 4.7 },
  ],

  gpSymptoms: [
    { id: 1, title: 'Fever', icon: 'thermometer', color: '#FF4444' },
    { id: 2, title: 'Cough', icon: 'medkit', color: '#FF6B35' },
    { id: 3, title: 'Cold', icon: 'snow', color: '#0088FF' },
    { id: 4, title: 'Headache', icon: 'alert-circle', color: '#9B59B6' },
    { id: 5, title: 'Body Pain', icon: 'body', color: '#009688' },
    { id: 6, title: 'Fatigue', icon: 'battery-dead', color: '#FFB800' },
    { id: 7, title: 'Diarrhea', icon: 'water', color: '#4CAF50' },
    { id: 8, title: 'Vomiting', icon: 'alert', color: '#FF4444' },
  ],

  gynaeSymptoms: [
    { id: 1, title: 'Irregular\nPeriods', icon: 'calendar', color: '#E91E63' },
    { id: 2, title: 'PCOS', icon: 'medical', color: '#9B59B6' },
    { id: 3, title: 'Painful\nPeriods', icon: 'alert-circle', color: '#FF4444' },
    { id: 4, title: 'Weight\nGain', icon: 'trending-up', color: '#FF6B35' },
    { id: 5, title: 'Pregnancy\nCare', icon: 'heart', color: '#E91E63' },
    { id: 6, title: 'Fertility\nIssues', icon: 'flower', color: '#00A651' },
  ],

  paediaSymptoms: [
    { id: 1, title: 'Fever', icon: 'thermometer', color: '#FF4444' },
    { id: 2, title: 'Cold', icon: 'snow', color: '#0088FF' },
    { id: 3, title: 'Cough', icon: 'medkit', color: '#FF6B35' },
    { id: 4, title: 'Rash', icon: 'flower', color: '#E91E63' },
  ],

  dermaSymptoms: [
    { id: 1, title: 'Acne', icon: 'ellipse', color: '#FF6B35' },
    { id: 2, title: 'Hair Loss', icon: 'cut', color: '#9B59B6' },
    { id: 3, title: 'Eczema', icon: 'hand-left', color: '#FF4444' },
    { id: 4, title: 'Psoriasis', icon: 'layers', color: '#0088FF' },
    { id: 5, title: 'Fungal\nInfection', icon: 'bug', color: '#4CAF50' },
    { id: 6, title: 'Pigmentation', icon: 'contrast', color: '#FFB800' },
  ],

  cardioSymptoms: [
    { id: 1, title: 'Chest Pain', icon: 'heart-dislike', color: '#FF4444' },
    { id: 2, title: 'Breathless\nness', icon: 'cloud', color: '#0088FF' },
    { id: 3, title: 'Palpitations', icon: 'pulse', color: '#E91E63' },
    { id: 4, title: 'High BP', icon: 'trending-up', color: '#FF6B35' },
  ],

  orthoSymptoms: [
    { id: 1, title: 'Back Pain', icon: 'body', color: '#009688' },
    { id: 2, title: 'Knee Pain', icon: 'walk', color: '#FF6B35' },
    { id: 3, title: 'Joint Pain', icon: 'fitness', color: '#0088FF' },
    { id: 4, title: 'Neck Pain', icon: 'person', color: '#9B59B6' },
    { id: 5, title: 'Shoulder\nPain', icon: 'hand-right', color: '#FF4444' },
    { id: 6, title: 'Sports\nInjury', icon: 'football', color: '#00A651' },
  ],

  entSymptoms: [
    { id: 1, title: 'Ear Pain', icon: 'ear', color: '#FFB800' },
    { id: 2, title: 'Sore Throat', icon: 'alert-circle', color: '#FF4444' },
    { id: 3, title: 'Sinusitis', icon: 'cloud', color: '#0088FF' },
    { id: 4, title: 'Tonsils', icon: 'ellipse', color: '#E91E63' },
    { id: 5, title: 'Hearing\nLoss', icon: 'volume-mute', color: '#9B59B6' },
    { id: 6, title: 'Snoring', icon: 'moon', color: '#009688' },
  ],

  neuroSymptoms: [
    { id: 1, title: 'Migraine', icon: 'flash', color: '#FF4444' },
    { id: 2, title: 'Vertigo', icon: 'sync', color: '#0088FF' },
    { id: 3, title: 'Numbness', icon: 'hand-left', color: '#9B59B6' },
    { id: 4, title: 'Seizures', icon: 'pulse', color: '#FF6B35' },
  ],

  topDoctors: [
    { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'General Physician', experience: '18 yrs', rating: 4.9, consultations: '12K+', fee: 499, available: true, languages: ['English', 'Hindi'] },
    { id: 2, name: 'Dr. Priya Sharma', specialty: 'Gynaecologist', experience: '15 yrs', rating: 4.8, consultations: '9K+', fee: 699, available: true, languages: ['English', 'Hindi', 'Tamil'] },
    { id: 3, name: 'Dr. Amit Patel', specialty: 'Cardiologist', experience: '22 yrs', rating: 4.9, consultations: '15K+', fee: 899, available: false, languages: ['English', 'Hindi', 'Gujarati'] },
    { id: 4, name: 'Dr. Sunita Reddy', specialty: 'Dermatologist', experience: '12 yrs', rating: 4.7, consultations: '8K+', fee: 599, available: true, languages: ['English', 'Hindi', 'Telugu'] },
    { id: 5, name: 'Dr. Vikram Singh', specialty: 'Orthopaedic', experience: '20 yrs', rating: 4.8, consultations: '11K+', fee: 799, available: true, languages: ['English', 'Hindi', 'Punjabi'] },
    { id: 6, name: 'Dr. Ananya Das', specialty: 'Paediatrician', experience: '14 yrs', rating: 4.9, consultations: '10K+', fee: 549, available: true, languages: ['English', 'Hindi', 'Bengali'] },
    { id: 7, name: 'Dr. Mohammed Ali', specialty: 'ENT Specialist', experience: '16 yrs', rating: 4.7, consultations: '7K+', fee: 649, available: false, languages: ['English', 'Hindi', 'Urdu'] },
    { id: 8, name: 'Dr. Kavitha Nair', specialty: 'Neurologist', experience: '19 yrs', rating: 4.9, consultations: '6K+', fee: 999, available: true, languages: ['English', 'Hindi', 'Malayalam'] },
  ],

  healthArticles: [
    { id: 1, title: 'Understanding Seasonal Flu', desc: 'Learn about common flu symptoms and when to see a doctor', category: 'General Health', readTime: '5 min', icon: 'document-text', color: '#0088FF' },
    { id: 2, title: 'Managing Diabetes Effectively', desc: 'Tips and lifestyle changes for better blood sugar control', category: 'Chronic Care', readTime: '8 min', icon: 'heart', color: '#FF4444' },
    { id: 3, title: 'Child Vaccination Schedule', desc: 'Complete guide to recommended vaccinations for children', category: 'Paediatrics', readTime: '6 min', icon: 'shield-checkmark', color: '#00A651' },
    { id: 4, title: 'Mental Health Awareness', desc: 'Breaking the stigma around mental health and seeking help', category: 'Mental Wellness', readTime: '7 min', icon: 'brain', color: '#7B2CBF' },
    { id: 5, title: 'Heart Health Tips', desc: 'Simple lifestyle modifications to keep your heart healthy', category: 'Cardiology', readTime: '5 min', icon: 'heart', color: '#E91E63' },
    { id: 6, title: 'Skin Care Routine', desc: 'Dermatologist-recommended daily skincare regimen', category: 'Dermatology', readTime: '4 min', icon: 'flower', color: '#9B59B6' },
    { id: 7, title: 'Bone & Joint Health', desc: 'Exercises and nutrition for stronger bones and joints', category: 'Orthopaedics', readTime: '6 min', icon: 'fitness', color: '#009688' },
    { id: 8, title: 'Healthy Eating Guide', desc: 'Balanced nutrition tips for a healthier lifestyle', category: 'Nutrition', readTime: '5 min', icon: 'nutrition', color: '#4CAF50' },
  ],

  consultFeatures: [
    { id: 1, title: 'Video Consult', desc: 'Face-to-face with doctors', icon: 'videocam', color: '#0088FF' },
    { id: 2, title: 'Audio Call', desc: 'Quick phone consultation', icon: 'call', color: '#00A651' },
    { id: 3, title: 'Chat', desc: 'Text-based consultation', icon: 'chatbubbles', color: '#7B2CBF' },
    { id: 4, title: 'In-Clinic', desc: 'Visit doctor in person', icon: 'business', color: '#FF6B35' },
  ],

  emergencyServices: [
    { id: 1, title: 'Ambulance', desc: 'Emergency ambulance service', icon: 'car', color: '#FF4444', phone: '108' },
    { id: 2, title: 'Emergency Room', desc: 'Nearest Apollo ER', icon: 'medical', color: '#FF6B35', phone: '1066' },
    { id: 3, title: 'Poison Control', desc: '24/7 poison helpline', icon: 'warning', color: '#9B59B6', phone: '1800-116-117' },
  ],

  labTests: [
    { id: 1, title: 'Complete Blood Count', price: 299, discount: 20, icon: 'water', color: '#FF4444' },
    { id: 2, title: 'Thyroid Profile', price: 499, discount: 25, icon: 'analytics', color: '#0088FF' },
    { id: 3, title: 'Diabetes Screening', price: 399, discount: 15, icon: 'fitness', color: '#00A651' },
    { id: 4, title: 'Lipid Profile', price: 349, discount: 20, icon: 'heart', color: '#E91E63' },
    { id: 5, title: 'Liver Function Test', price: 549, discount: 18, icon: 'medical', color: '#FF6B35' },
    { id: 6, title: 'Kidney Function Test', price: 449, discount: 22, icon: 'water', color: '#009688' },
  ],

  testimonials: [
    { id: 1, name: 'Aarav Mehta', comment: 'Got connected to a doctor within 2 minutes. Amazing experience!', rating: 5, specialty: 'General Physician' },
    { id: 2, name: 'Deepa Krishnan', comment: 'The video consultation was so convenient. Doctor was very thorough.', rating: 5, specialty: 'Gynaecologist' },
    { id: 3, name: 'Rohit Agarwal', comment: 'My child\'s fever was treated perfectly via online consultation.', rating: 4, specialty: 'Paediatrician' },
    { id: 4, name: 'Sneha Joshi', comment: 'Dr. Patel helped me manage my skin condition effectively remotely.', rating: 5, specialty: 'Dermatologist' },
    { id: 5, name: 'Karan Malhotra', comment: 'Quick diagnosis and prescription. Saved me a hospital visit.', rating: 5, specialty: 'General Physician' },
    { id: 6, name: 'Lakshmi Iyer', comment: 'The follow-up system is excellent. Doctor remembered my case.', rating: 4, specialty: 'Cardiologist' },
  ],

  faqData: [
    { id: 1, question: 'How does online consultation work?', answer: 'You can consult with a doctor via video call, audio call, or chat. Simply choose your specialty, select a doctor, and start your consultation within minutes.' },
    { id: 2, question: 'Are prescriptions valid from online consultations?', answer: 'Yes, prescriptions from our registered doctors are legally valid. You can use them to order medicines from Apollo Pharmacy.' },
    { id: 3, question: 'What if I need emergency care?', answer: 'For emergencies, please call 108 for ambulance services or visit the nearest Apollo Emergency Room. Our app can help you locate the nearest facility.' },
    { id: 4, question: 'Can I get a refund for my consultation?', answer: 'Yes, if the doctor is unable to attend your consultation or if you cancel before the scheduled time, a full refund will be processed within 5-7 business days.' },
    { id: 5, question: 'How do I share my reports with the doctor?', answer: 'During the consultation, you can upload lab reports, images, and other medical documents directly through the chat interface.' },
    { id: 6, question: 'Is my medical data secure?', answer: 'Absolutely. All your medical data is encrypted and stored securely following HIPAA-compliant protocols. Only you and your treating doctor have access.' },
  ],

  medicinReminders: [
    { id: 1, medicine: 'Paracetamol 500mg', time: '8:00 AM', frequency: 'Daily', icon: 'alarm', color: '#0088FF' },
    { id: 2, medicine: 'Vitamin D3 60K', time: '10:00 AM', frequency: 'Weekly', icon: 'sunny', color: '#FFB800' },
    { id: 3, medicine: 'Metformin 500mg', time: '9:00 PM', frequency: 'Daily', icon: 'moon', color: '#7B2CBF' },
  ],

  healthPackages: [
    { id: 1, title: 'Apollo Basic Health Check', tests: 45, price: 999, oldPrice: 2499, discount: 60, icon: 'shield-checkmark', color: '#0088FF' },
    { id: 2, title: 'Apollo Comprehensive', tests: 82, price: 1999, oldPrice: 4999, discount: 60, icon: 'star', color: '#FFB800' },
    { id: 3, title: 'Apollo Executive', tests: 110, price: 3999, oldPrice: 7999, discount: 50, icon: 'diamond', color: '#7B2CBF' },
    { id: 4, title: 'Apollo Senior Citizen', tests: 95, price: 2499, oldPrice: 5999, discount: 58, icon: 'heart', color: '#E91E63' },
  ],
};
