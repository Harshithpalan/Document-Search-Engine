import React, { useState, useEffect } from 'react';
import { Search, Loader2, FileText, ExternalLink, Filter, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DocumentService from '../services/DocumentService';

const SearchInterface = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        const data = await DocumentService.search(query);
        setResults(data);
        setLoading(false);
        setHasSearched(true);
      } else {
        setResults([]);
        setHasSearched(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
            Discovery <span className="text-gradient">Engine</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Search across your entire knowledge base.</p>
        </div>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={20} />
          New Document
        </button>
      </div>

      <div className="search-input-wrapper" style={{ marginBottom: '48px' }}>
        <input
          type="text"
          className="search-input"
          placeholder="Search documents, reports, insights..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="search-icon-overlay">
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <Search size={24} />
          )}
        </div>
      </div>

      <div className="results-grid">
        <AnimatePresence mode='popLayout'>
          {results.map((doc, index) => (
            <motion.div
              key={doc.id}
              layout
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="doc-card"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '18px' }}>
                  <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '10px', borderRadius: '12px' }}>
                    <FileText color="#6366f1" size={24} />
                  </div>
                  <h3 className="doc-title" style={{ fontSize: '1.3rem', marginBottom: 0 }}>{doc.title}</h3>
                </div>
                <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '6px 14px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-primary)', border: '1px solid rgba(255,255,255,0.05)' }}>
                   {doc.category}
                </div>
              </div>
              
              <p className="doc-excerpt" style={{ fontSize: '0.95rem', opacity: 0.8 }}>{doc.excerpt}</p>
              
              <div className="doc-meta" style={{ marginTop: '24px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                   By {doc.author}
                </span>
                <span>•</span>
                <span>{doc.date}</span>
                <span>•</span>
                <span>{doc.readTime} read</span>
                <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', opacity: 0.7 }}>
                  Open <ExternalLink size={14} />
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {hasSearched && !loading && results.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-state"
          >
            <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>No matches for "{query}"</p>
            <p style={{ opacity: 0.5 }}>Try adjusting your search terms or filters.</p>
          </motion.div>
        )}

        {!hasSearched && !loading && (
          <div className="empty-state" style={{ opacity: 0.4 }}>
            <Search size={48} style={{ marginBottom: '16px' }} />
            <p>Search results will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInterface;
