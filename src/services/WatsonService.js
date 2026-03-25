/**
 * Service to handle IBM Watson Discovery interaction.
 * Currently uses mock data for initial UI development.
 */

// Mock data to simulate Watson Discovery results
const MOCK_RESULTS = [
  {
    id: '1',
    title: 'Q1 Financial Performance Report',
    excerpt: 'Detailed analysis of the revenue growth and market penetration during the first quarter of the fiscal year 2024. Highlights include a 15% increase in net profit...',
    relevance: 0.98,
    metadata: {
      source: 'Internal Records',
      date: '2024-03-15',
    }
  },
  {
    id: '2',
    title: 'Market Trends Analysis: AI in Enterprise',
    excerpt: 'The adoption of artificial intelligence within enterprise software has seen a significant surge. Large language models (LLMs) are now a core component of digital transformation...',
    relevance: 0.85,
    metadata: {
      source: 'External Intelligence',
      date: '2024-02-28',
    }
  },
  {
    id: '3',
    title: 'User Onboarding Flow Strategy',
    excerpt: 'Optimizing the first-time user experience is critical for retention. This document outlines the proposed three-step onboarding process with interactive guidance...',
    relevance: 0.72,
    metadata: {
      source: 'Product Design',
      date: '2024-01-10',
    }
  },
  {
    id: '4',
    title: 'Infrastructure Modernization Roadmap',
    excerpt: 'Moving from legacy monolith systems to distributed microservices. This roadmap details the migration phases and resource allocation for the upcoming six months...',
    relevance: 0.65,
    metadata: {
      source: 'DevOps',
      date: '2024-03-01',
    }
  }
];

class WatsonService {
  /**
   * Performs a search against the backend system.
   * @param {string} query The search string
   * @returns {Promise<Array>} List of documented results
   */
  async search(query) {
    console.log(`[WatsonService] Searching for: ${query}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (!query) return [];
    
    // Filter mock data based on query (case-insensitive)
    const filtered = MOCK_RESULTS.filter(res => 
      res.title.toLowerCase().includes(query.toLowerCase()) ||
      res.excerpt.toLowerCase().includes(query.toLowerCase())
    );
    
    return filtered;
  }
}

export default new WatsonService();
