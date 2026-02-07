
import React from 'react';
import { Product, Metric, CaseStudy, Testimonial, ServiceCategory } from './types';

// ============================================
// BRANDING - Edit your company info here
// ============================================
export const BRANDING = {
  name: "ParSec",
  tagline: "We Build, You Grow",
  subtitle: "AI-powered solutions for operations, branding, and growth — so you can focus on what matters.",
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
    title: 'Automate Operations',
    tagline: 'AI employees that never sleep',
    description: 'Autonomous AI agents handling calls, hiring, content, payments, and workflows 24/7.',
    color: '#2D4769',
    items: [
      { name: 'Voice Agents', desc: '24/7 call handling & booking', icon: 'phone' },
      { name: 'Hiring Agents', desc: 'Screening & candidate outreach', icon: 'users' },
      { name: 'Social Media Agents', desc: 'Content scheduling & publishing', icon: 'share' },
      { name: 'Payment Processing', desc: 'Invoice validation & approvals', icon: 'credit-card' },
      { name: 'Workflow Automation', desc: 'N8N, bots, integrations', icon: 'zap' },
    ]
  },
  {
    id: 'brand',
    title: 'Build Your Brand',
    tagline: 'From concept to launch',
    description: 'Websites, branding kits, and media production that make you stand out.',
    color: '#557089',
    items: [
      { name: 'Website Creation', desc: 'Modern, responsive, fast sites', icon: 'globe' },
      { name: 'Branding Kits', desc: 'Logo, colors, typography', icon: 'palette' },
      { name: 'Media Production', desc: 'Photo/video content creation', icon: 'camera' },
    ]
  },
  {
    id: 'grow',
    title: 'Grow Your Business',
    tagline: 'Strategy that scales',
    description: 'Strategic planning and custom solutions to accelerate your growth.',
    color: '#8EA3B5',
    items: [
      { name: 'Startup Boost', desc: 'Financial + marketing plans', icon: 'rocket' },
      { name: 'Custom AI Solutions', desc: 'Bespoke automation', icon: 'cpu' },
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

export const CASE_STUDIES: CaseStudy[] = [
  {
    client: 'Sigma Contractors',
    industry: 'Commercial Fit-out',
    result: 'Reduced bidding overhead by 80%',
    outcome: 'Implemented Contractor Dashboard to stabilize a E£1000M annual pipeline.'
  },
  {
    client: 'Prime Dental',
    industry: 'Healthcare',
    result: '24/7 Call Resolution',
    outcome: 'Eliminated front-desk bottlenecks with autonomous voice agents.'
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
