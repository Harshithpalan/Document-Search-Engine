import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Filter, Search, MoreVertical, Download, Trash2 } from 'lucide-react';
import DocumentService from '../services/DocumentService';

const DocumentList = () => {
  const [docs, setDocs] = useState(DocumentService.getAll());
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', ...new Set(docs.map(d => d.category))];
  
  const filteredDocs = filter === 'All' 
    ? docs 
    : docs.filter(d => d.category === filter);

  return (
    <div className="animate-fade-in">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
            My <span className="text-gradient">Documents</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>Manage and browse your complete knowledge library.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`nav-item ${filter === cat ? 'active' : ''}`}
              style={{ padding: '8px 16px', fontSize: '0.85rem', marginBottom: 0 }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <AnimatePresence mode='popLayout'>
          {filteredDocs.map((doc, idx) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05 }}
              className="doc-card"
              style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px' }}
            >
              <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '12px', borderRadius: '14px' }}>
                <FileText color="#6366f1" size={24} />
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>{doc.title}</h3>
                  <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '100px', opacity: 0.6 }}>{doc.category}</span>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '600px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {doc.excerpt}
                </p>
              </div>

              <div style={{ textAlign: 'right', minWidth: '120px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{doc.date}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{doc.author}</div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="nav-item" style={{ padding: '10px', marginBottom: 0 }}>
                  <Download size={18} />
                </div>
                <div className="nav-item" style={{ padding: '10px', marginBottom: 0 }}>
                  <MoreVertical size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DocumentList;
