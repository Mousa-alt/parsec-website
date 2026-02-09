import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, Check, CheckCheck, ArrowRight, RotateCcw } from 'lucide-react';
import { usePlaygroundStore } from '../../store/playground-store';
import { WHATSAPP } from '../../constants';

interface Message {
  id: string;
  text: string;
  textAr: string;
  sender: 'user' | 'bot';
  time: string;
  status: 'sent' | 'delivered' | 'read';
}

interface ConversationFlow {
  id: string;
  messages: Message[];
  userOptions?: { text: string; textAr: string; nextId: string }[];
}

// Demo conversation flows
const conversationFlows: Record<string, ConversationFlow> = {
  start: {
    id: 'start',
    messages: [
      {
        id: 'm1',
        text: 'Hello! 👋 Welcome to ParSec. I\'m your automation assistant. How can I help you today?',
        textAr: 'مرحباً! 👋 أهلاً بك في ParSec. أنا مساعدك للأتمتة. كيف يمكنني مساعدتك اليوم؟',
        sender: 'bot',
        time: '10:30 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'I want to automate my business', textAr: 'أريد أتمتة عملي', nextId: 'automate' },
      { text: 'Tell me about your services', textAr: 'أخبرني عن خدماتكم', nextId: 'services' },
      { text: 'I need a quote', textAr: 'أحتاج عرض سعر', nextId: 'quote' },
    ],
  },
  automate: {
    id: 'automate',
    messages: [
      {
        id: 'm2',
        text: 'Great choice! 🚀 We specialize in automating repetitive tasks like customer support, lead qualification, and document processing.',
        textAr: 'اختيار رائع! 🚀 نحن متخصصون في أتمتة المهام المتكررة مثل دعم العملاء وتأهيل العملاء المحتملين ومعالجة المستندات.',
        sender: 'bot',
        time: '10:31 AM',
        status: 'read',
      },
      {
        id: 'm3',
        text: 'What industry are you in? This helps us recommend the best solution.',
        textAr: 'ما هي صناعتك؟ هذا يساعدنا على التوصية بأفضل حل.',
        sender: 'bot',
        time: '10:31 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'Real Estate', textAr: 'العقارات', nextId: 'real-estate' },
      { text: 'Healthcare', textAr: 'الرعاية الصحية', nextId: 'healthcare' },
      { text: 'E-commerce', textAr: 'التجارة الإلكترونية', nextId: 'ecommerce' },
    ],
  },
  services: {
    id: 'services',
    messages: [
      {
        id: 'm4',
        text: 'We offer three main service categories:',
        textAr: 'نقدم ثلاث فئات خدمات رئيسية:',
        sender: 'bot',
        time: '10:31 AM',
        status: 'read',
      },
      {
        id: 'm5',
        text: '1️⃣ *AI Agents* - Voice bots, WhatsApp automation, customer support\n\n2️⃣ *Branding* - Websites, logos, content creation\n\n3️⃣ *Growth* - Strategy, custom AI solutions, SaaS development',
        textAr: '1️⃣ *وكلاء الذكاء الاصطناعي* - روبوتات صوتية، أتمتة واتساب، دعم العملاء\n\n2️⃣ *العلامة التجارية* - مواقع ويب، شعارات، إنشاء محتوى\n\n3️⃣ *النمو* - استراتيجية، حلول ذكاء اصطناعي مخصصة، تطوير SaaS',
        sender: 'bot',
        time: '10:31 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'Tell me more about AI Agents', textAr: 'أخبرني المزيد عن وكلاء الذكاء الاصطناعي', nextId: 'agents' },
      { text: 'I need a quote', textAr: 'أحتاج عرض سعر', nextId: 'quote' },
    ],
  },
  quote: {
    id: 'quote',
    messages: [
      {
        id: 'm6',
        text: 'Perfect! 📋 To prepare a custom quote, I\'ll need a few details.',
        textAr: 'ممتاز! 📋 لإعداد عرض سعر مخصص، سأحتاج بعض التفاصيل.',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
      {
        id: 'm7',
        text: 'A human consultant will reach out within 24 hours with a detailed proposal. Would you like to continue on WhatsApp?',
        textAr: 'سيتواصل معك مستشار بشري خلال 24 ساعة مع اقتراح مفصل. هل تريد المتابعة على واتساب؟',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'Yes, continue on WhatsApp', textAr: 'نعم، تابع على واتساب', nextId: 'whatsapp' },
      { text: 'Start over', textAr: 'ابدأ من جديد', nextId: 'start' },
    ],
  },
  'real-estate': {
    id: 'real-estate',
    messages: [
      {
        id: 'm8',
        text: 'Perfect for Real Estate! 🏢 Our most popular solutions for real estate agents:',
        textAr: 'مثالي للعقارات! 🏢 أكثر حلولنا شعبية لوكلاء العقارات:',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
      {
        id: 'm9',
        text: '✅ WhatsApp Lead Qualifier - Respond to inquiries 24/7\n✅ Viewing Scheduler - Auto-book property viewings\n✅ Follow-up Bot - Never lose a lead again',
        textAr: '✅ تأهيل العملاء عبر واتساب - الرد على الاستفسارات 24/7\n✅ جدولة المعاينات - حجز معاينات العقارات تلقائياً\n✅ روبوت المتابعة - لا تفقد عميلاً أبداً',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'Get a quote', textAr: 'احصل على عرض سعر', nextId: 'quote' },
      { text: 'Talk to a human', textAr: 'تحدث مع شخص', nextId: 'whatsapp' },
    ],
  },
  healthcare: {
    id: 'healthcare',
    messages: [
      {
        id: 'm10',
        text: 'Healthcare is one of our specialties! 🏥 Popular solutions:',
        textAr: 'الرعاية الصحية من تخصصاتنا! 🏥 الحلول الشائعة:',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
      {
        id: 'm11',
        text: '✅ Voice Agent - Handle 100% of calls, zero wait time\n✅ Appointment Booking - Patients book via WhatsApp\n✅ Reminder System - Reduce no-shows by 60%',
        textAr: '✅ وكيل صوتي - التعامل مع 100% من المكالمات، وقت انتظار صفر\n✅ حجز المواعيد - يحجز المرضى عبر واتساب\n✅ نظام التذكير - تقليل عدم الحضور بنسبة 60%',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'Get a quote', textAr: 'احصل على عرض سعر', nextId: 'quote' },
      { text: 'Talk to a human', textAr: 'تحدث مع شخص', nextId: 'whatsapp' },
    ],
  },
  ecommerce: {
    id: 'ecommerce',
    messages: [
      {
        id: 'm12',
        text: 'E-commerce automation is powerful! 🛒 Top solutions:',
        textAr: 'أتمتة التجارة الإلكترونية قوية! 🛒 أفضل الحلول:',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
      {
        id: 'm13',
        text: '✅ Order Status Bot - WhatsApp updates for every order\n✅ Abandoned Cart Recovery - Win back lost sales\n✅ Customer Support - 24/7 instant responses',
        textAr: '✅ روبوت حالة الطلب - تحديثات واتساب لكل طلب\n✅ استرداد سلات التسوق المهجورة - استعادة المبيعات المفقودة\n✅ دعم العملاء - ردود فورية 24/7',
        sender: 'bot',
        time: '10:32 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'Get a quote', textAr: 'احصل على عرض سعر', nextId: 'quote' },
      { text: 'Talk to a human', textAr: 'تحدث مع شخص', nextId: 'whatsapp' },
    ],
  },
  agents: {
    id: 'agents',
    messages: [
      {
        id: 'm14',
        text: 'Our AI Agents can handle:',
        textAr: 'يمكن لوكلاء الذكاء الاصطناعي لدينا التعامل مع:',
        sender: 'bot',
        time: '10:33 AM',
        status: 'read',
      },
      {
        id: 'm15',
        text: '📞 Voice Calls - Natural conversations in Arabic & English\n💬 WhatsApp - Instant 24/7 support\n📧 Email - Smart filtering and responses\n📄 Documents - Data extraction and processing',
        textAr: '📞 المكالمات الصوتية - محادثات طبيعية بالعربية والإنجليزية\n💬 واتساب - دعم فوري 24/7\n📧 البريد الإلكتروني - تصفية وردود ذكية\n📄 المستندات - استخراج البيانات ومعالجتها',
        sender: 'bot',
        time: '10:33 AM',
        status: 'read',
      },
    ],
    userOptions: [
      { text: 'I need a quote', textAr: 'أحتاج عرض سعر', nextId: 'quote' },
      { text: 'Start over', textAr: 'ابدأ من جديد', nextId: 'start' },
    ],
  },
  whatsapp: {
    id: 'whatsapp',
    messages: [
      {
        id: 'm16',
        text: 'Click the button below to continue our conversation on WhatsApp! 📱',
        textAr: 'انقر على الزر أدناه لمتابعة محادثتنا على واتساب! 📱',
        sender: 'bot',
        time: '10:33 AM',
        status: 'read',
      },
    ],
  },
};

export const WhatsAppWidget: React.FC = () => {
  const { language } = usePlaygroundStore();
  const [currentFlow, setCurrentFlow] = useState<ConversationFlow>(conversationFlows.start);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isArabic = language === 'ar';

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, isTyping]);

  // Display messages with typing effect
  useEffect(() => {
    setDisplayedMessages([]);
    let index = 0;

    const showNextMessage = () => {
      if (index < currentFlow.messages.length) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setDisplayedMessages((prev) => [...prev, currentFlow.messages[index]]);
          index++;
          if (index < currentFlow.messages.length) {
            setTimeout(showNextMessage, 500);
          }
        }, 1000);
      }
    };

    showNextMessage();
  }, [currentFlow]);

  const handleOptionClick = (nextId: string) => {
    if (nextId === 'whatsapp') {
      const msg = encodeURIComponent(
        isArabic
          ? 'مرحباً! أريد معرفة المزيد عن خدمات ParSec.'
          : 'Hi! I want to learn more about ParSec services.'
      );
      window.open(`https://wa.me/${WHATSAPP.number}?text=${msg}`, '_blank');
      return;
    }

    const nextFlow = conversationFlows[nextId];
    if (nextFlow) {
      setCurrentFlow(nextFlow);
    }
  };

  const resetConversation = () => {
    setCurrentFlow(conversationFlows.start);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-[#E1E6EB] overflow-hidden">
      {/* WhatsApp Header */}
      <div className="bg-[#075E54] p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm">ParSec Assistant</div>
            <div className="text-[#8CBFB9] text-[10px]">
              {isTyping
                ? isArabic
                  ? 'يكتب...'
                  : 'typing...'
                : isArabic
                ? 'متصل'
                : 'online'}
            </div>
          </div>
        </div>
        <button
          onClick={resetConversation}
          className="p-2 hover:bg-white/10 rounded-full transition-all"
        >
          <RotateCcw className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Chat Area */}
      <div
        className="h-[280px] overflow-y-auto p-4 space-y-3"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E7EBE4' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: '#ECE5DD',
        }}
      >
        <AnimatePresence>
          {displayedMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 shadow-sm ${
                  message.sender === 'user'
                    ? 'bg-[#DCF8C6] rounded-br-none'
                    : 'bg-white rounded-bl-none'
                }`}
              >
                <p
                  className="text-sm text-[#111B21] whitespace-pre-line"
                  dir={isArabic ? 'rtl' : 'ltr'}
                >
                  {isArabic ? message.textAr : message.text}
                </p>
                <div className="flex items-center justify-end gap-1 mt-1">
                  <span className="text-[10px] text-[#8696A0]">{message.time}</span>
                  {message.sender === 'user' && (
                    message.status === 'read' ? (
                      <CheckCheck className="w-3 h-3 text-[#53BDEB]" />
                    ) : (
                      <Check className="w-3 h-3 text-[#8696A0]" />
                    )
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white rounded-lg rounded-bl-none p-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-[#8696A0] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Options / Input Area */}
      <div className="p-3 bg-[#F0F2F5] border-t border-[#E1E6EB]">
        {currentFlow.userOptions ? (
          <div className="flex flex-wrap gap-2">
            {currentFlow.userOptions.map((option) => (
              <motion.button
                key={option.nextId}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionClick(option.nextId)}
                className="px-3 py-2 bg-white border border-[#25D366] text-[#25D366] rounded-full text-xs font-medium hover:bg-[#25D366] hover:text-white transition-all"
              >
                {isArabic ? option.textAr : option.text}
              </motion.button>
            ))}
          </div>
        ) : (
          <button
            onClick={() => handleOptionClick('whatsapp')}
            className="w-full px-4 py-3 bg-[#25D366] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#20BD5A] transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            {isArabic ? 'متابعة على واتساب' : 'Continue on WhatsApp'}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
