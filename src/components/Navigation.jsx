import React from 'react';
import { LayoutDashboard, Search, FileText, Settings, LogOut, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Navigation = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'search', label: 'Search Engine', icon: <Search size={20} /> },
    { id: 'documents', label: 'My Documents', icon: <FileText size={20} /> },
  ];

  return (
    <nav className="sidebar">
      <div style={{ marginBottom: '48px', paddingLeft: '20px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
          <span className="text-gradient">Doc</span>Matrix
        </h2>
      </div>

      <div style={{ flex: 1 }}>
        {navItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '24px' }}>
        <div className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div className="nav-item" style={{ color: '#ef4444' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
