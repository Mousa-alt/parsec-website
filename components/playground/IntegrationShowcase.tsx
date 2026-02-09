import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Mail,
  Users,
  Target,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Phone,
  Send,
  Hash,
  GitBranch,
  Table,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { usePlaygroundStore } from '../../store/playground-store';
import { integrations } from '../../lib/playground-data';

const iconMap: Record<string, React.ReactNode> = {
  'message-circle': <MessageCircle className="w-5 h-5" />,
  mail: <Mail className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  target: <Target className="w-5 h-5" />,
  'shopping-bag': <ShoppingBag className="w-5 h-5" />,
  'shopping-cart': <ShoppingCart className="w-5 h-5" />,
  'credit-card': <CreditCard className="w-5 h-5" />,
  phone: <Phone className="w-5 h-5" />,
  send: <Send className="w-5 h-5" />,
  hash: <Hash className="w-5 h-5" />,
  'git-branch': <GitBranch className="w-5 h-5" />,
  table: <Table className="w-5 h-5" />,
};

const integrationDetails: Record<string, { description: string; descriptionAr: string; useCases: string[]; useCasesAr: string[] }> = {
  'WhatsApp Business': {
    description: 'Send automated messages, handle customer support, and qualify leads 24/7.',
    descriptionAr: 'إرسال رسائل تلقائية، التعامل مع دعم العملاء، وتأهيل العملاء المحتملين على مدار الساعة.',
    useCases: ['Lead qualification', 'Order updates', 'Appointment reminders'],
    useCasesAr: ['تأهيل العملاء', 'تحديثات الطلبات', 'تذكيرات المواعيد'],
  },
  'Google Workspace': {
    description: 'Sync calendars, send emails, and manage documents automatically.',
    descriptionAr: 'مزامنة التقويمات، إرسال رسائل البريد الإلكتروني، وإدارة المستندات تلقائياً.',
    useCases: ['Calendar booking', 'Email automation', 'Document processing'],
    useCasesAr: ['حجز التقويم', 'أتمتة البريد الإلكتروني', 'معالجة المستندات'],
  },
  'Zoho CRM': {
    description: 'Automatically create leads, update deals, and sync customer data.',
    descriptionAr: 'إنشاء العملاء المحتملين تلقائياً، تحديث الصفقات، ومزامنة بيانات العملاء.',
    useCases: ['Lead creation', 'Deal tracking', 'Contact sync'],
    useCasesAr: ['إنشاء العملاء المحتملين', 'تتبع الصفقات', 'مزامنة جهات الاتصال'],
  },
  HubSpot: {
    description: 'Enrich contacts, trigger workflows, and track customer journeys.',
    descriptionAr: 'إثراء جهات الاتصال، تشغيل سير العمل، وتتبع رحلات العملاء.',
    useCases: ['Contact enrichment', 'Workflow triggers', 'Journey tracking'],
    useCasesAr: ['إثراء جهات الاتصال', 'مشغلات سير العمل', 'تتبع الرحلات'],
  },
  Shopify: {
    description: 'Sync orders, update inventory, and automate fulfillment notifications.',
    descriptionAr: 'مزامنة الطلبات، تحديث المخزون، وأتمتة إشعارات التنفيذ.',
    useCases: ['Order sync', 'Inventory updates', 'Shipping notifications'],
    useCasesAr: ['مزامنة الطلبات', 'تحديثات المخزون', 'إشعارات الشحن'],
  },
  WooCommerce: {
    description: 'Handle orders, manage products, and trigger post-purchase flows.',
    descriptionAr: 'التعامل مع الطلبات، إدارة المنتجات، وتشغيل تدفقات ما بعد الشراء.',
    useCases: ['Order management', 'Product sync', 'Post-purchase automation'],
    useCasesAr: ['إدارة الطلبات', 'مزامنة المنتجات', 'أتمتة ما بعد الشراء'],
  },
  Stripe: {
    description: 'Process payments, handle subscriptions, and send payment confirmations.',
    descriptionAr: 'معالجة المدفوعات، التعامل مع الاشتراكات، وإرسال تأكيدات الدفع.',
    useCases: ['Payment processing', 'Subscription management', 'Invoice automation'],
    useCasesAr: ['معالجة المدفوعات', 'إدارة الاشتراكات', 'أتمتة الفواتير'],
  },
  Twilio: {
    description: 'Make outbound calls, send SMS, and handle voice interactions.',
    descriptionAr: 'إجراء مكالمات صادرة، إرسال رسائل SMS، والتعامل مع التفاعلات الصوتية.',
    useCases: ['Voice calls', 'SMS notifications', 'Call transcription'],
    useCasesAr: ['المكالمات الصوتية', 'إشعارات SMS', 'نسخ المكالمات'],
  },
  Telegram: {
    description: 'Build bots, send notifications, and manage group interactions.',
    descriptionAr: 'بناء روبوتات، إرسال إشعارات، وإدارة تفاعلات المجموعات.',
    useCases: ['Bot creation', 'Group management', 'Alert notifications'],
    useCasesAr: ['إنشاء الروبوتات', 'إدارة المجموعات', 'إشعارات التنبيه'],
  },
  Slack: {
    description: 'Send alerts, manage channels, and integrate team workflows.',
    descriptionAr: 'إرسال التنبيهات، إدارة القنوات، ودمج سير عمل الفريق.',
    useCases: ['Team alerts', 'Channel automation', 'Workflow integration'],
    useCasesAr: ['تنبيهات الفريق', 'أتمتة القنوات', 'تكامل سير العمل'],
  },
  n8n: {
    description: 'The workflow automation backbone connecting all your tools.',
    descriptionAr: 'العمود الفقري لأتمتة سير العمل الذي يربط جميع أدواتك.',
    useCases: ['Multi-step workflows', 'Data transformation', 'API orchestration'],
    useCasesAr: ['سير عمل متعدد الخطوات', 'تحويل البيانات', 'تنسيق API'],
  },
  Airtable: {
    description: 'Store structured data, trigger automations, and build custom views.',
    descriptionAr: 'تخزين البيانات المهيكلة، تشغيل الأتمتة، وبناء عروض مخصصة.',
    useCases: ['Data storage', 'Trigger automations', 'Custom dashboards'],
    useCasesAr: ['تخزين البيانات', 'تشغيل الأتمتة', 'لوحات معلومات مخصصة'],
  },
};

export const IntegrationShowcase: React.FC = () => {
  const { language } = usePlaygroundStore();
  const [expandedIntegration, setExpandedIntegration] = useState<string | null>(null);

  const isArabic = language === 'ar';

  const toggleIntegration = (name: string) => {
    setExpandedIntegration(expandedIntegration === name ? null : name);
  };

  // Group integrations by category
  const categories = ['Communication', 'CRM', 'E-commerce', 'Payments', 'Productivity', 'Automation', 'Database'];
  const groupedIntegrations = categories.map((category) => ({
    category,
    items: integrations.filter((i) => i.category === category),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E1E6EB] p-5 md:p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-[#2D4769] flex items-center justify-center">
          <GitBranch className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-sm md:text-base font-black text-[#2D4769]">
            {isArabic ? 'التكاملات المدعومة' : 'Supported Integrations'}
          </h3>
          <p className="text-[10px] text-[#8EA3B5]">
            {isArabic ? 'اربط أدواتك المفضلة' : 'Connect your favorite tools'}
          </p>
        </div>
      </div>

      {/* Integration Grid */}
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
        {groupedIntegrations.map(({ category, items }) => (
          <div key={category}>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#8EA3B5] mb-2">
              {category}
            </div>
            <div className="space-y-2">
              {items.map((integration) => {
                const details = integrationDetails[integration.name];
                const isExpanded = expandedIntegration === integration.name;

                return (
                  <motion.div
                    key={integration.name}
                    layout
                    className="border border-[#E1E6EB] rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleIntegration(integration.name)}
                      className="w-full p-3 flex items-center justify-between hover:bg-[#F8F9FA] transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${integration.color}15`, color: integration.color }}
                        >
                          {iconMap[integration.icon]}
                        </div>
                        <span className="font-bold text-sm text-[#2D4769]">{integration.name}</span>
                      </div>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4 text-[#8EA3B5]" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && details && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 pt-0 border-t border-[#E1E6EB] bg-[#F8F9FA]">
                            <p className="text-xs text-[#557089] mb-2" dir={isArabic ? 'rtl' : 'ltr'}>
                              {isArabic ? details.descriptionAr : details.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {(isArabic ? details.useCasesAr : details.useCases).map((useCase, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-white border border-[#E1E6EB] rounded-full text-[9px] text-[#557089]"
                                >
                                  {useCase}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 pt-4 border-t border-[#E1E6EB] flex items-center justify-between">
        <span className="text-xs text-[#8EA3B5]">
          {isArabic ? 'لم تجد ما تبحث عنه؟' : 'Need a custom integration?'}
        </span>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="flex items-center gap-1 text-xs font-bold text-[#8B5CF6] hover:underline"
        >
          {isArabic ? 'تحدث معنا' : 'Talk to us'}
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
