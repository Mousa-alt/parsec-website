
export interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  size: 'large' | 'small';
  image: string;
}

export interface ServiceItem {
  name: string;
  desc: string;
  icon: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  description: string;
  items: ServiceItem[];
  color: string;
}

export interface Metric {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudyNarrative {
  nightmare: {
    title: string;
    story: string;
    painMetric: string;
  };
  magicMoment: {
    title: string;
    story: string;
    agentUsed: string;
  };
  newReality: {
    title: string;
    story: string;
    resultMetrics: string[];
  };
}

export interface CaseStudy {
  client: string;
  industry: string;
  result: string;
  outcome: string;
  narrative?: CaseStudyNarrative;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
