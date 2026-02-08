
import React from 'react';
import { Product, Metric, CaseStudy, Testimonial, ServiceCategory } from './types';

// ============================================
// BRANDING - Edit your company info here
// ============================================
export const BRANDING = {
  name: "ParSec",
  tagline: "We Build, You Grow",
  subtitle: "Enterprise-grade AI solutions—without the enterprise timeline or price tag.",
  version: "v2.5.0",
  author: "Omar Mosallam",
  locations: "Egypt, Saudi Arabia & UAE",
  lastEdited: "Just now",
};

// ============================================
// WHATSAPP - Contact configuration
// ============================================
export const WHATSAPP = {
  number: "201288181123",
  defaultMessage: "Hi, I'm interested in learning more about ParSec's solutions.",
  portfolioUrl: "https://omarmosallam.parsec.solutions",
};

// ============================================
// SERVICES - Organized by outcome/problem solved
// ============================================
export const SERVICES: ServiceCategory[] = [
  {
    id: 'automate',
    title: 'AI That Works',
    tagline: 'Your 24/7 digital workforce',
    description: 'AI agents that handle calls, hire talent, post content, and process payments — while you focus on what matters.',
    color: '#2D4769',
    items: [
      { name: 'Voice Agents', desc: '24/7 call handling & booking', icon: 'phone' },
      { name: 'Personal AI Assistants', desc: 'Email, calendar & task management', icon: 'user' },
      { name: 'Hiring Agents', desc: 'Screening & candidate outreach', icon: 'users' },
      { name: 'Social Media Agents', desc: 'Content scheduling & publishing', icon: 'share' },
      { name: 'Customer Support Bots', desc: 'WhatsApp & Telegram automation', icon: 'message-circle' },
      { name: 'Payment Processing', desc: 'Invoice validation & approvals', icon: 'credit-card' },
      { name: 'Data Entry Automation', desc: 'Document parsing & organization', icon: 'file-text' },
      { name: 'Workflow Automation', desc: 'N8N, Zapier & custom pipelines', icon: 'zap' },
    ]
  },
  {
    id: 'brand',
    title: 'Brands That Pop',
    tagline: 'Stand out. Get noticed.',
    description: 'Websites, logos, and media that make your competition nervous.',
    color: '#8B5CF6',
    items: [
      { name: 'Website Creation', desc: 'Modern, responsive, fast sites', icon: 'globe' },
      { name: 'Branding Kits', desc: 'Logo, colors, typography', icon: 'palette' },
      { name: 'Media Production', desc: 'Photo/video content creation', icon: 'camera' },
      { name: 'Pitch Decks', desc: 'Investor-ready presentations', icon: 'presentation' },
      { name: 'Social Media Content', desc: 'Graphics, reels & stories', icon: 'image' },
      { name: 'Copywriting', desc: 'Website copy & marketing text', icon: 'pen-tool' },
    ]
  },
  {
    id: 'grow',
    title: 'Growth That Lasts',
    tagline: 'Scale smart. Win big.',
    description: 'Strategy, custom AI, and tools that turn startups into market leaders.',
    color: '#10B981',
    items: [
      { name: 'Startup Boost', desc: 'Financial + marketing plans', icon: 'rocket' },
      { name: 'Business Consulting', desc: 'Strategy & operations advisory', icon: 'briefcase' },
      { name: 'Market Research', desc: 'Competitor & audience analysis', icon: 'search' },
      { name: 'Custom AI Solutions', desc: 'Bespoke automation', icon: 'cpu' },
      { name: 'SaaS Development', desc: 'Full-stack product builds', icon: 'layers' },
      { name: 'Contractor Command Center', desc: 'Full SaaS for construction', icon: 'building' },
    ]
  }
];

// ============================================
// TYPEWRITER - Words that rotate in hero
// ============================================
export const TYPEWRITER_WORDS = [
  "Your Brand",
  "Your Systems",
  "Your Growth",
  "Your Future",
  "Everything"
];

// ============================================
// FOOTER NAVIGATION - Easy to edit links
// ============================================
export const FOOTER_NAV = [
  { title: 'Nodes', links: ['Command', 'Library', 'Console'] },
  { title: 'Registry', links: ['Architecture', 'Validations', 'Init'] },
  { title: 'Security', links: ['Compliance', 'Legal', 'Safety'] },
];

// ============================================
// SIGMA HQ SCREENSHOTS - Add/remove as needed
// ============================================
export const SIGMA_SCREENSHOTS = [
  { src: '/screenshots/screenshot-3-dashboard.png', label: 'Dashboard' },
  { src: '/screenshots/search-feature.png', label: 'Smart Search' },
  { src: '/screenshots/quick-links-invoices-popup.png', label: 'Quick Actions' },
];

// ============================================
// PRODUCTS - Your product offerings
// ============================================
export const PRODUCTS: Product[] = [
  {
    id: 'sigma-hq',
    title: 'Contractor Command Center',
    description: 'The ultimate AI operating system for high-end fit-out contractors. Automate bids, manage teams, and track margins in real-time.',
    tags: ['SaaS', 'Construction', 'AI-Powered'],
    size: 'large',
    image: '/screenshots/screenshot-3-dashboard.png'
  },
  {
    id: 'voice-agents',
    title: 'Voice Agents',
    description: 'Next-gen conversational AI for medical practitioners. Handle 100% of calls with zero wait time.',
    tags: ['Voice AI', 'Healthcare'],
    size: 'small',
    image: '/screenshots/voice-agent-dashboard.png'
  },
  {
    id: 'ai-assistants',
    title: 'Workflow Automation',
    description: 'N8N workflows, Telegram & WhatsApp bots, RAG-powered smart search for enterprise automation.',
    tags: ['N8N', 'Chatbots', 'RAG'],
    size: 'small',
    image: '/screenshots/workflow-automation.png'
  }
];

export const METRICS: Metric[] = [
  { label: 'Core Tasks', value: '50', suffix: 'k+' },
  { label: 'Uptime Integrity', value: '100', suffix: '%' },
  { label: 'Client Retention', value: '99', suffix: '%' },
  { label: 'Efficiency Jump', value: '64', suffix: '%' }
];

// ============================================
// MENA-SPECIFIC TRUST SIGNALS
// ============================================
export const MENA_SIGNALS = {
  arabicSupport: {
    title: "Native Arabic Support",
    desc: "Egyptian, Gulf, and Levantine dialects",
    icon: "languages"
  },
  whatsappFirst: {
    title: "WhatsApp-First Workflows",
    desc: "Where MENA business happens",
    icon: "message-circle"
  },
  dataResidency: {
    title: "Local Data Residency",
    desc: "Your data stays in the region",
    icon: "shield"
  },
  vision2030: {
    title: "Vision 2030 Aligned",
    desc: "Supporting digital transformation",
    icon: "target"
  }
};

// ============================================
// CASE STUDIES - Narrative Arc Format
// ============================================
export const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'Sigma Contractors',
    industry: 'Commercial Fit-out',
    result: 'Reduced bidding overhead by 80%',
    outcome: 'Implemented Contractor Dashboard to stabilize a E£1000M annual pipeline.',
    narrative: {
      nightmare: {
        title: "Drowning in Manual Data",
        story: "Our ops manager was spending 40+ hours a week manually validating invoices and tracking project costs. Errors were costing us thousands and delays were eating into margins.",
        painMetric: "40+ hours/week on spreadsheets"
      },
      magicMoment: {
        title: "The Day Everything Changed",
        story: "The day we turned on the Payment Processor agent, it validated 200 invoices in 3 minutes. We couldn't believe it.",
        agentUsed: "Payment Processor Agent"
      },
      newReality: {
        title: "Now We Focus on Growth",
        story: "Our ops team now spends their time on strategic planning, not paperwork. We've scaled to handle 3x the project volume without adding headcount.",
        resultMetrics: ["90% time saved", "Zero overpayments", "E£1B pipeline"]
      }
    }
  },
  {
    client: 'Prime Dental',
    industry: 'Healthcare',
    result: '24/7 Call Resolution',
    outcome: 'Eliminated front-desk bottlenecks with autonomous voice agents.',
    narrative: {
      nightmare: {
        title: "Missed Calls, Lost Patients",
        story: "Our front desk was overwhelmed. During peak hours, 40% of calls went unanswered. Every missed call was a potential patient walking to a competitor.",
        painMetric: "40% calls going unanswered"
      },
      magicMoment: {
        title: "The First 24/7 Night",
        story: "The first night our Voice Agent went live, it booked 12 appointments while the clinic was closed. We woke up to a full schedule.",
        agentUsed: "Voice Agent"
      },
      newReality: {
        title: "Never Miss a Patient Again",
        story: "Now every call is answered instantly, in Arabic or English. Our receptionist focuses on in-clinic patient experience while the AI handles the phones.",
        resultMetrics: ["100% call coverage", "12+ after-hours bookings/week", "Zero hold time"]
      }
    }
  },
  {
    client: 'Al-Faisal Real Estate',
    industry: 'Real Estate',
    result: '3x Lead Conversion',
    outcome: 'WhatsApp automation turned inquiries into viewings automatically.',
    narrative: {
      nightmare: {
        title: "Leads Slipping Through the Cracks",
        story: "We were getting 100+ WhatsApp inquiries daily. By the time agents responded, most leads had gone cold or called a competitor.",
        painMetric: "2-hour average response time"
      },
      magicMoment: {
        title: "Instant Response, Instant Results",
        story: "Within a week of deploying the WhatsApp agent, our response time dropped to under 30 seconds. Leads were being qualified and scheduled for viewings automatically.",
        agentUsed: "WhatsApp Sales Agent"
      },
      newReality: {
        title: "Automated Lead Machine",
        story: "Our agents now walk into pre-qualified viewings with all the client info ready. Conversion tripled because we're talking to the right people at the right time.",
        resultMetrics: ["30-second response time", "3x conversion rate", "500+ viewings/month"]
      }
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "ParSec has redefined our operational baseline. It's the silent partner every founder dreams of.",
    author: "James Sterling",
    role: "MD",
    company: "Apex Developments"
  }
];
