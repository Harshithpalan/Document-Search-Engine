import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  FileText, 
  TrendingUp, 
  Clock, 
  Shield, 
  Zap, 
  BarChart3,
  Layers
} from 'lucide-react';
import DocumentService from '../services/DocumentService';

const Dashboard = ({ onSearchClick }) => {
  const [stats, setStats] = useState(DocumentService.getStats());
  const [recentDocs, setRecentDocs] = useState(DocumentService.getRecent());

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="animate-fade-in">
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>
          Welcome back, <span className="text-gradient">Analyst</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Here's what happened with your documents today.</p>
      </header>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="bento-grid"
      >
        {/* Featured Card */}
        <motion.div variants={item} className="bento-item featured-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div className="card-title">
              <Zap size={24} className="text-gradient" />
              <span>Smart Search</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '1.1rem', maxWidth: '400px' }}>
            Quickly find information across your entire document base with our neural search engine.
          </p>
          <button 
            className="btn-primary" 
            onClick={onSearchClick}
            style={{ padding: '16px 32px', fontSize: '1rem' }}
          >
            Open Discovery Engine
          </button>
        </motion.div>

        {/* Total Documents Stats */}
        <motion.div variants={item} className="bento-item stat-card">
          <div className="card-title">
            <FileText size={20} color="#6366f1" />
            <span>Documents</span>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800 }}>{stats.total}</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>+12% from last month</p>
        </motion.div>

        {/* Categories Stats */}
        <motion.div variants={item} className="bento-item stat-card">
          <div className="card-title">
            <Layers size={20} color="#a855f7" />
            <span>Categories</span>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: 800 }}>{stats.categories}</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Organized by AI</p>
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={item} className="bento-item recent-card">
          <div className="card-title">
            <Clock size={20} color="#6366f1" />
            <span>Recent Activity</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentDocs.map(doc => (
              <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)' }}>
                <div style={{ padding: '8px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px' }}>
                  <FileText size={16} color="#6366f1" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{doc.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Viewed 2h ago by you</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Storage Stats */}
        <motion.div variants={item} className="bento-item stat-card">
          <div className="card-title">
            <Shield size={20} color="#a855f7" />
            <span>Security</span>
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#10b981' }}>All Protocols Active</div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '8px' }}>Last scan: 5m ago</p>
        </motion.div>

        {/* Analytics Card */}
        <motion.div variants={item} className="bento-item stat-card">
          <div className="card-title">
            <BarChart3 size={20} color="#6366f1" />
            <span>Efficiency</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800 }}>94</div>
            <div style={{ marginBottom: '10px', fontWeight: 600, color: '#6366f1' }}>%</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
