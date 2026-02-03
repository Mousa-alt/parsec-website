
export interface Product {
  id: string;
  title: string;
  description: string;
  tags: string[];
  size: 'large' | 'small';
  image: string;
}

export interface Metric {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface CaseStudy {
  client: string;
  industry: string;
  result: string;
  outcome: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}
