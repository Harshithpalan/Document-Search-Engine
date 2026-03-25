/**
 * Core Service for Document Management
 * Populated with specific user-provided content.
 */

const INITIAL_DOCUMENTS = [
  // Business Insights
  {
    id: 'biz-1',
    title: 'Quarterly Revenue Trends in 2025',
    excerpt: 'Analysis of the fiscal trajectory for the upcoming year. Growth is driven primarily by new subscription models and expansion into emerging tech markets...',
    category: 'Business Insights',
    relevance: 0.99,
    date: '2025-03-15',
    author: 'Chief Financial Officer',
    readTime: '12 min'
  },
  {
    id: 'biz-2',
    title: 'Customer Feedback on Product X',
    excerpt: 'Aggregated sentiment analysis from the Q1 user surveys. Product X shows a 4.5/5 rating in usability but requires improvement in mobile synchronization...',
    category: 'Business Insights',
    relevance: 0.95,
    date: '2025-02-10',
    author: 'Product Experience Team',
    readTime: '8 min'
  },

  // Technical Reports
  {
    id: 'tech-1',
    title: 'AI Model Performance Comparison',
    excerpt: 'Benchmark results for the latest LLM iterations. Comparison between latency, accuracy, and token efficiency for transformer-based architectures...',
    category: 'Technical Reports',
    relevance: 0.98,
    date: '2025-01-20',
    author: 'AI Research Lab',
    readTime: '20 min'
  },
  {
    id: 'tech-2',
    title: 'System Architecture Diagrams for Project Y',
    excerpt: 'Full architectural layout for Project Y infrastructure. Includes load balancing strategies, database sharding, and edge computing nodes...',
    category: 'Technical Reports',
    relevance: 0.92,
    date: '2024-12-05',
    author: 'Infrastructure Engineering',
    readTime: '15 min'
  },

  // Research Documents
  {
    id: 'res-1',
    title: 'Climate Change Impact on Coastal Cities',
    excerpt: 'Comprehensive study on rising sea levels and urban planning adaptions. Case studies from Venice, Jakarta, and Miami reveal critical infrastructure risks...',
    category: 'Research Documents',
    relevance: 0.85,
    date: '2024-11-15',
    author: 'Global Environmental Institute',
    readTime: '45 min'
  },
  {
    id: 'res-2',
    title: 'Latest Findings in Machine Learning Interpretability',
    excerpt: 'New methodologies for decoding neural network decision paths. Focus on feature visualization and gradient-based attribution methods...',
    category: 'Research Documents',
    relevance: 0.90,
    date: '2025-03-01',
    author: 'Data Science Division',
    readTime: '18 min'
  },

  // Compliance & Audit (General Queries)
  {
    id: 'gen-1',
    title: 'Summaries of All Compliance Reports',
    excerpt: 'Consolidated overview of regulatory filings for 2024. All departments show 100% compliance with ISO 27001 and GDPR standards...',
    category: 'Compliance',
    relevance: 0.88,
    date: '2024-12-30',
    author: 'Legal & Risk Dept',
    readTime: '25 min'
  },
  {
    id: 'gen-2',
    title: 'Key Risks Identified in Audits',
    excerpt: 'Critical findings from the internal audit series. Identifying potential bottlenecks in supply chain logistics and cloud redundancy protocols...',
    category: 'Audit',
    relevance: 0.94,
    date: '2025-01-15',
    author: 'Internal Audit Bureau',
    readTime: '14 min'
  }
];

class DocumentService {
  constructor() {
    this.documents = [...INITIAL_DOCUMENTS];
  }

  getStats() {
    return {
      total: this.documents.length,
      categories: [...new Set(this.documents.map(d => d.category))].length,
      recent: 4,
      storageUsed: '2.4 GB'
    };
  }

  async search(query) {
    await new Promise(r => setTimeout(r, 600));
    if (!query) return [];
    
    // Clean up query (handle quoted phrases if present)
    const q = query.toLowerCase().replace(/["“”]/g, '').trim();
    
    return this.documents.filter(d => 
      d.title.toLowerCase().includes(q) || 
      d.excerpt.toLowerCase().includes(q) || 
      d.category.toLowerCase().includes(q)
    );
  }

  getAll() {
    return this.documents;
  }

  getRecent() {
    return this.documents.slice(0, 4);
  }
}

export default new DocumentService();
