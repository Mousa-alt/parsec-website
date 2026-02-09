import { Industry } from '../store/playground-store';

export interface QuizQuestion {
  id: string;
  question: string;
  questionAr: string;
  options: {
    label: string;
    labelAr: string;
    value: string;
    score: number;
  }[];
  multiSelect?: boolean;
}

export interface IndustryQuestions {
  industry: Industry;
  label: string;
  labelAr: string;
  icon: string;
  color: string;
  questions: QuizQuestion[];
}

// Common questions asked to all industries
export const commonQuestions: QuizQuestion[] = [
  {
    id: 'team-size',
    question: 'How many people are on your team?',
    questionAr: 'كم عدد أعضاء فريقك؟',
    options: [
      { label: '1-5 people', labelAr: '1-5 أشخاص', value: '1-5', score: 5 },
      { label: '6-20 people', labelAr: '6-20 شخص', value: '6-20', score: 10 },
      { label: '21-50 people', labelAr: '21-50 شخص', value: '21-50', score: 15 },
      { label: '50+ people', labelAr: 'أكثر من 50', value: '50+', score: 20 },
    ],
  },
  {
    id: 'manual-hours',
    question: 'How many hours per week does your team spend on repetitive tasks?',
    questionAr: 'كم ساعة أسبوعياً يقضيها فريقك في المهام المتكررة؟',
    options: [
      { label: 'Less than 5 hours', labelAr: 'أقل من 5 ساعات', value: '<5', score: 5 },
      { label: '5-15 hours', labelAr: '5-15 ساعة', value: '5-15', score: 10 },
      { label: '15-30 hours', labelAr: '15-30 ساعة', value: '15-30', score: 15 },
      { label: '30+ hours', labelAr: 'أكثر من 30 ساعة', value: '30+', score: 20 },
    ],
  },
  {
    id: 'channels',
    question: 'Which communication channels do you use with customers?',
    questionAr: 'ما قنوات التواصل التي تستخدمها مع العملاء؟',
    multiSelect: true,
    options: [
      { label: 'WhatsApp', labelAr: 'واتساب', value: 'whatsapp', score: 5 },
      { label: 'Phone Calls', labelAr: 'مكالمات هاتفية', value: 'phone', score: 5 },
      { label: 'Email', labelAr: 'بريد إلكتروني', value: 'email', score: 3 },
      { label: 'Social Media', labelAr: 'وسائل التواصل', value: 'social', score: 4 },
    ],
  },
];

// Industry-specific questions
export const industryQuestions: IndustryQuestions[] = [
  {
    industry: 'real-estate',
    label: 'Real Estate',
    labelAr: 'العقارات',
    icon: 'building-2',
    color: '#2D4769',
    questions: [
      {
        id: 're-inquiries',
        question: 'How do you handle property inquiries after hours?',
        questionAr: 'كيف تتعامل مع استفسارات العقارات خارج أوقات العمل؟',
        options: [
          { label: 'We miss them until next day', labelAr: 'نفقدها حتى اليوم التالي', value: 'miss', score: 20 },
          { label: 'Basic auto-reply', labelAr: 'رد تلقائي بسيط', value: 'auto-reply', score: 10 },
          { label: 'Someone is always available', labelAr: 'شخص متاح دائماً', value: 'always-on', score: 5 },
        ],
      },
      {
        id: 're-response-time',
        question: 'What is your average response time to new leads?',
        questionAr: 'ما متوسط وقت الرد على العملاء المحتملين الجدد؟',
        options: [
          { label: 'Within minutes', labelAr: 'خلال دقائق', value: 'minutes', score: 5 },
          { label: '1-2 hours', labelAr: '1-2 ساعة', value: '1-2h', score: 10 },
          { label: 'Same day', labelAr: 'نفس اليوم', value: 'same-day', score: 15 },
          { label: 'Next day or later', labelAr: 'اليوم التالي أو بعده', value: 'next-day', score: 20 },
        ],
      },
      {
        id: 're-lead-tracking',
        question: 'How do you track and follow up with leads?',
        questionAr: 'كيف تتابع العملاء المحتملين؟',
        options: [
          { label: 'CRM system', labelAr: 'نظام CRM', value: 'crm', score: 5 },
          { label: 'Spreadsheets', labelAr: 'جداول بيانات', value: 'spreadsheet', score: 15 },
          { label: 'Notes and memory', labelAr: 'ملاحظات وذاكرة', value: 'manual', score: 20 },
        ],
      },
      {
        id: 're-viewings',
        question: 'How many property viewings do you schedule per week?',
        questionAr: 'كم عدد المعاينات العقارية أسبوعياً؟',
        options: [
          { label: 'Less than 10', labelAr: 'أقل من 10', value: '<10', score: 5 },
          { label: '10-30', labelAr: '10-30', value: '10-30', score: 10 },
          { label: '30-50', labelAr: '30-50', value: '30-50', score: 15 },
          { label: '50+', labelAr: 'أكثر من 50', value: '50+', score: 20 },
        ],
      },
    ],
  },
  {
    industry: 'healthcare',
    label: 'Healthcare',
    labelAr: 'الرعاية الصحية',
    icon: 'stethoscope',
    color: '#10B981',
    questions: [
      {
        id: 'hc-booking',
        question: 'How do patients currently book appointments?',
        questionAr: 'كيف يحجز المرضى المواعيد حالياً؟',
        options: [
          { label: 'Phone calls only', labelAr: 'مكالمات هاتفية فقط', value: 'phone', score: 20 },
          { label: 'WhatsApp messages', labelAr: 'رسائل واتساب', value: 'whatsapp', score: 15 },
          { label: 'Online booking system', labelAr: 'نظام حجز إلكتروني', value: 'online', score: 5 },
          { label: 'Walk-ins mostly', labelAr: 'زيارات مباشرة غالباً', value: 'walkin', score: 10 },
        ],
      },
      {
        id: 'hc-noshow',
        question: 'What is your no-show rate for appointments?',
        questionAr: 'ما نسبة عدم الحضور للمواعيد؟',
        options: [
          { label: 'Less than 5%', labelAr: 'أقل من 5%', value: '<5', score: 5 },
          { label: '5-15%', labelAr: '5-15%', value: '5-15', score: 10 },
          { label: '15-25%', labelAr: '15-25%', value: '15-25', score: 15 },
          { label: 'More than 25%', labelAr: 'أكثر من 25%', value: '>25', score: 20 },
        ],
      },
      {
        id: 'hc-calls',
        question: 'What percentage of calls go unanswered during busy hours?',
        questionAr: 'ما نسبة المكالمات التي لا يُرد عليها خلال أوقات الذروة؟',
        options: [
          { label: 'Almost none', labelAr: 'تقريباً لا شيء', value: 'none', score: 5 },
          { label: '10-20%', labelAr: '10-20%', value: '10-20', score: 10 },
          { label: '20-40%', labelAr: '20-40%', value: '20-40', score: 15 },
          { label: 'More than 40%', labelAr: 'أكثر من 40%', value: '>40', score: 20 },
        ],
      },
      {
        id: 'hc-reminders',
        question: 'How do you send appointment reminders?',
        questionAr: 'كيف ترسل تذكيرات المواعيد؟',
        options: [
          { label: 'Automated system', labelAr: 'نظام آلي', value: 'automated', score: 5 },
          { label: 'Manual calls/messages', labelAr: 'مكالمات/رسائل يدوية', value: 'manual', score: 20 },
          { label: 'We don\'t send reminders', labelAr: 'لا نرسل تذكيرات', value: 'none', score: 15 },
        ],
      },
    ],
  },
  {
    industry: 'construction',
    label: 'Construction',
    labelAr: 'المقاولات والبناء',
    icon: 'hard-hat',
    color: '#F59E0B',
    questions: [
      {
        id: 'cn-progress',
        question: 'How do you track daily progress reports from sites?',
        questionAr: 'كيف تتابع تقارير التقدم اليومية من المواقع؟',
        options: [
          { label: 'Digital system with photos', labelAr: 'نظام رقمي مع صور', value: 'digital', score: 5 },
          { label: 'WhatsApp groups', labelAr: 'مجموعات واتساب', value: 'whatsapp', score: 10 },
          { label: 'Phone calls', labelAr: 'مكالمات هاتفية', value: 'calls', score: 15 },
          { label: 'Paper reports', labelAr: 'تقارير ورقية', value: 'paper', score: 20 },
        ],
      },
      {
        id: 'cn-invoices',
        question: 'How are invoices validated against project budgets?',
        questionAr: 'كيف يتم التحقق من الفواتير مقابل ميزانيات المشاريع؟',
        options: [
          { label: 'Automated matching', labelAr: 'مطابقة آلية', value: 'automated', score: 5 },
          { label: 'Manual review', labelAr: 'مراجعة يدوية', value: 'manual', score: 20 },
          { label: 'Spot checks only', labelAr: 'فحوصات عشوائية فقط', value: 'spot', score: 15 },
        ],
      },
      {
        id: 'cn-subcontractor',
        question: 'How do you manage subcontractor payments?',
        questionAr: 'كيف تدير مدفوعات المقاولين الفرعيين؟',
        options: [
          { label: 'Integrated payment system', labelAr: 'نظام دفع متكامل', value: 'integrated', score: 5 },
          { label: 'Spreadsheet tracking', labelAr: 'تتبع بجداول البيانات', value: 'spreadsheet', score: 15 },
          { label: 'Manual process', labelAr: 'عملية يدوية', value: 'manual', score: 20 },
        ],
      },
      {
        id: 'cn-bidding',
        question: 'How long does it take to prepare a project bid?',
        questionAr: 'كم يستغرق إعداد عرض سعر لمشروع؟',
        options: [
          { label: 'Less than a day', labelAr: 'أقل من يوم', value: '<1d', score: 5 },
          { label: '1-3 days', labelAr: '1-3 أيام', value: '1-3d', score: 10 },
          { label: '3-7 days', labelAr: '3-7 أيام', value: '3-7d', score: 15 },
          { label: 'More than a week', labelAr: 'أكثر من أسبوع', value: '>1w', score: 20 },
        ],
      },
    ],
  },
  {
    industry: 'ecommerce',
    label: 'E-commerce',
    labelAr: 'التجارة الإلكترونية',
    icon: 'shopping-cart',
    color: '#8B5CF6',
    questions: [
      {
        id: 'ec-abandoned',
        question: 'What happens when a customer abandons their cart?',
        questionAr: 'ماذا يحدث عندما يتخلى عميل عن سلة التسوق؟',
        options: [
          { label: 'Automated recovery sequence', labelAr: 'تسلسل استرداد آلي', value: 'automated', score: 5 },
          { label: 'Single reminder email', labelAr: 'بريد تذكيري واحد', value: 'single', score: 10 },
          { label: 'Nothing', labelAr: 'لا شيء', value: 'nothing', score: 20 },
        ],
      },
      {
        id: 'ec-order-updates',
        question: 'How do customers track their orders?',
        questionAr: 'كيف يتتبع العملاء طلباتهم؟',
        options: [
          { label: 'Real-time WhatsApp updates', labelAr: 'تحديثات واتساب فورية', value: 'whatsapp', score: 5 },
          { label: 'Email notifications', labelAr: 'إشعارات بريدية', value: 'email', score: 10 },
          { label: 'They have to call us', labelAr: 'يجب أن يتصلوا بنا', value: 'call', score: 20 },
        ],
      },
      {
        id: 'ec-reviews',
        question: 'How do you collect customer reviews?',
        questionAr: 'كيف تجمع تقييمات العملاء؟',
        options: [
          { label: 'Automated post-delivery request', labelAr: 'طلب آلي بعد التسليم', value: 'automated', score: 5 },
          { label: 'Manual outreach', labelAr: 'تواصل يدوي', value: 'manual', score: 15 },
          { label: 'We don\'t actively collect', labelAr: 'لا نجمعها بشكل نشط', value: 'none', score: 20 },
        ],
      },
      {
        id: 'ec-support',
        question: 'How do customers reach support?',
        questionAr: 'كيف يصل العملاء للدعم؟',
        options: [
          { label: 'Live chat + WhatsApp', labelAr: 'دردشة مباشرة + واتساب', value: 'multichannel', score: 5 },
          { label: 'WhatsApp only', labelAr: 'واتساب فقط', value: 'whatsapp', score: 10 },
          { label: 'Email only', labelAr: 'بريد إلكتروني فقط', value: 'email', score: 15 },
          { label: 'No dedicated support', labelAr: 'لا يوجد دعم مخصص', value: 'none', score: 20 },
        ],
      },
    ],
  },
  {
    industry: 'other',
    label: 'Other Industry',
    labelAr: 'صناعة أخرى',
    icon: 'briefcase',
    color: '#6B7280',
    questions: [
      {
        id: 'ot-biggest-bottleneck',
        question: 'What is your biggest operational bottleneck?',
        questionAr: 'ما أكبر عقبة تشغيلية لديك؟',
        options: [
          { label: 'Customer communication', labelAr: 'التواصل مع العملاء', value: 'communication', score: 15 },
          { label: 'Data entry and paperwork', labelAr: 'إدخال البيانات والأعمال الورقية', value: 'data-entry', score: 20 },
          { label: 'Scheduling and booking', labelAr: 'الجدولة والحجز', value: 'scheduling', score: 15 },
          { label: 'Payment processing', labelAr: 'معالجة المدفوعات', value: 'payments', score: 15 },
        ],
      },
      {
        id: 'ot-automation-tried',
        question: 'Have you tried automation before?',
        questionAr: 'هل جربت الأتمتة من قبل؟',
        options: [
          { label: 'Yes, successfully', labelAr: 'نعم، بنجاح', value: 'yes-success', score: 5 },
          { label: 'Yes, but it failed', labelAr: 'نعم، لكنها فشلت', value: 'yes-failed', score: 15 },
          { label: 'No, never tried', labelAr: 'لا، لم أجرب', value: 'never', score: 10 },
        ],
      },
      {
        id: 'ot-budget',
        question: 'What is your monthly budget for business tools?',
        questionAr: 'ما ميزانيتك الشهرية لأدوات العمل؟',
        options: [
          { label: 'Less than $100', labelAr: 'أقل من $100', value: '<100', score: 5 },
          { label: '$100-500', labelAr: '$100-500', value: '100-500', score: 10 },
          { label: '$500-2000', labelAr: '$500-2000', value: '500-2000', score: 15 },
          { label: 'More than $2000', labelAr: 'أكثر من $2000', value: '>2000', score: 20 },
        ],
      },
    ],
  },
];

// Recommendations based on score ranges
export interface Recommendation {
  scoreRange: [number, number];
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  suggestedAgent: string;
  suggestedAgentAr: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export const recommendations: Recommendation[] = [
  {
    scoreRange: [0, 30],
    title: 'You\'re Already Optimized!',
    titleAr: 'أنت محسّن بالفعل!',
    description: 'Your operations are already quite efficient. Consider advanced AI solutions to take your business to the next level.',
    descriptionAr: 'عملياتك فعّالة بالفعل. فكر في حلول الذكاء الاصطناعي المتقدمة للارتقاء بعملك.',
    suggestedAgent: 'Custom AI Integration',
    suggestedAgentAr: 'تكامل ذكاء اصطناعي مخصص',
    priority: 'low',
  },
  {
    scoreRange: [31, 60],
    title: 'Room for Improvement',
    titleAr: 'مجال للتحسين',
    description: 'You have moderate automation potential. Targeted solutions could save you 10-20 hours per week.',
    descriptionAr: 'لديك إمكانات أتمتة معتدلة. الحلول المستهدفة يمكن أن توفر لك 10-20 ساعة أسبوعياً.',
    suggestedAgent: 'WhatsApp Automation',
    suggestedAgentAr: 'أتمتة واتساب',
    priority: 'medium',
  },
  {
    scoreRange: [61, 85],
    title: 'High Automation Potential',
    titleAr: 'إمكانات أتمتة عالية',
    description: 'Your business could significantly benefit from AI agents. You could save 20-40 hours per week.',
    descriptionAr: 'يمكن لعملك الاستفادة بشكل كبير من وكلاء الذكاء الاصطناعي. يمكنك توفير 20-40 ساعة أسبوعياً.',
    suggestedAgent: 'Full AI Suite',
    suggestedAgentAr: 'حزمة الذكاء الاصطناعي الكاملة',
    priority: 'high',
  },
  {
    scoreRange: [86, 100],
    title: 'Critical: Automate Now!',
    titleAr: 'حرج: تحتاج للأتمتة الآن!',
    description: 'Your operations have significant inefficiencies. AI automation could transform your business and save 40+ hours per week.',
    descriptionAr: 'عملياتك بها أوجه قصور كبيرة. أتمتة الذكاء الاصطناعي يمكن أن تحول عملك وتوفر أكثر من 40 ساعة أسبوعياً.',
    suggestedAgent: 'Complete Digital Transformation',
    suggestedAgentAr: 'تحول رقمي كامل',
    priority: 'critical',
  },
];

// Trust signals for the ticker
export const trustSignals = [
  { en: 'Real Estate Agency in Dubai just automated 500 leads', ar: 'وكالة عقارية في دبي أتمتت 500 عميل محتمل' },
  { en: 'Healthcare Clinic in Riyadh saved 40 hours this week', ar: 'عيادة في الرياض وفرت 40 ساعة هذا الأسبوع' },
  { en: 'E-commerce Store in Cairo processed 1,200 orders', ar: 'متجر إلكتروني في القاهرة عالج 1,200 طلب' },
  { en: 'Construction Company in Jeddah validated 200 invoices', ar: 'شركة مقاولات في جدة تحققت من 200 فاتورة' },
  { en: 'Dental Clinic in Abu Dhabi booked 15 appointments overnight', ar: 'عيادة أسنان في أبوظبي حجزت 15 موعد ليلاً' },
  { en: 'Property Developer in Alexandria qualified 80 leads', ar: 'مطور عقاري في الإسكندرية أهّل 80 عميل محتمل' },
];

// Integration showcase data
export const integrations = [
  { name: 'WhatsApp Business', icon: 'message-circle', category: 'Communication', color: '#25D366' },
  { name: 'Google Workspace', icon: 'mail', category: 'Productivity', color: '#4285F4' },
  { name: 'Zoho CRM', icon: 'users', category: 'CRM', color: '#DC2626' },
  { name: 'HubSpot', icon: 'target', category: 'CRM', color: '#FF7A59' },
  { name: 'Shopify', icon: 'shopping-bag', category: 'E-commerce', color: '#96BF48' },
  { name: 'WooCommerce', icon: 'shopping-cart', category: 'E-commerce', color: '#96588A' },
  { name: 'Stripe', icon: 'credit-card', category: 'Payments', color: '#635BFF' },
  { name: 'Twilio', icon: 'phone', category: 'Communication', color: '#F22F46' },
  { name: 'Telegram', icon: 'send', category: 'Communication', color: '#0088CC' },
  { name: 'Slack', icon: 'hash', category: 'Productivity', color: '#4A154B' },
  { name: 'n8n', icon: 'git-branch', category: 'Automation', color: '#EA4B71' },
  { name: 'Airtable', icon: 'table', category: 'Database', color: '#18BFFF' },
];

// Workflow templates
export interface WorkflowTemplate {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  industry: Industry | 'all';
  category: 'lead-gen' | 'support' | 'operations' | 'marketing';
  nodes: number;
  downloads: number;
  rating: number;
}

export const workflowTemplates: WorkflowTemplate[] = [
  {
    id: 'whatsapp-lead-qualifier',
    name: 'WhatsApp Lead Qualifier',
    nameAr: 'تأهيل العملاء عبر واتساب',
    description: 'Auto-respond to inquiries, qualify leads, and schedule appointments via WhatsApp.',
    descriptionAr: 'الرد التلقائي على الاستفسارات، تأهيل العملاء، وجدولة المواعيد عبر واتساب.',
    industry: 'real-estate',
    category: 'lead-gen',
    nodes: 12,
    downloads: 1240,
    rating: 4.8,
  },
  {
    id: 'appointment-booking',
    name: 'Appointment Booking Bot',
    nameAr: 'روبوت حجز المواعيد',
    description: 'WhatsApp-based booking with Google Calendar integration and reminders.',
    descriptionAr: 'حجز عبر واتساب مع تكامل تقويم Google والتذكيرات.',
    industry: 'healthcare',
    category: 'operations',
    nodes: 15,
    downloads: 890,
    rating: 4.9,
  },
  {
    id: 'order-status-notifier',
    name: 'Order Status Notifier',
    nameAr: 'إشعارات حالة الطلب',
    description: 'Automatic WhatsApp updates for order confirmation, shipping, and delivery.',
    descriptionAr: 'تحديثات واتساب تلقائية لتأكيد الطلب والشحن والتسليم.',
    industry: 'ecommerce',
    category: 'support',
    nodes: 8,
    downloads: 2100,
    rating: 4.7,
  },
  {
    id: 'invoice-validator',
    name: 'Invoice Validator',
    nameAr: 'مدقق الفواتير',
    description: 'Cross-reference invoices against project budgets automatically.',
    descriptionAr: 'مقارنة الفواتير بميزانيات المشاريع تلقائياً.',
    industry: 'construction',
    category: 'operations',
    nodes: 18,
    downloads: 560,
    rating: 4.6,
  },
  {
    id: 'abandoned-cart-recovery',
    name: 'Abandoned Cart Recovery',
    nameAr: 'استرداد سلات التسوق المهجورة',
    description: 'Multi-channel recovery sequences for cart abandonment.',
    descriptionAr: 'تسلسلات استرداد متعددة القنوات لسلات التسوق المهجورة.',
    industry: 'ecommerce',
    category: 'marketing',
    nodes: 10,
    downloads: 1850,
    rating: 4.8,
  },
  {
    id: 'daily-progress-report',
    name: 'Daily Progress Report',
    nameAr: 'تقرير التقدم اليومي',
    description: 'Telegram bot for field workers to submit photos and GPS updates.',
    descriptionAr: 'روبوت تيليجرام لإرسال الصور وتحديثات GPS من العمال.',
    industry: 'construction',
    category: 'operations',
    nodes: 14,
    downloads: 420,
    rating: 4.5,
  },
];

// Get recommendation based on score
export const getRecommendation = (score: number): Recommendation => {
  return recommendations.find(
    (rec) => score >= rec.scoreRange[0] && score <= rec.scoreRange[1]
  ) || recommendations[0];
};

// Get questions for specific industry
export const getIndustryQuestions = (industry: Industry): QuizQuestion[] => {
  const industryData = industryQuestions.find((iq) => iq.industry === industry);
  return industryData ? [...commonQuestions, ...industryData.questions] : commonQuestions;
};

// Calculate max possible score for an industry
export const getMaxScore = (industry: Industry): number => {
  const questions = getIndustryQuestions(industry);
  return questions.reduce((max, q) => {
    const maxOption = Math.max(...q.options.map((o) => o.score));
    return max + maxOption;
  }, 0);
};
