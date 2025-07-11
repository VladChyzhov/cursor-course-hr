'use client';

import Link from 'next/link';
import { useState } from 'react';

const navItems = [
  { label: 'Overview', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3zm3 3v12h12V6H6z" /></svg>
  ), href: '/dashboards' },
  { label: 'API Playground', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
  ), href: '/playground' },
  { label: 'Use Cases', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-6a2 2 0 012-2h2a2 2 0 012 2v6m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" /></svg>
  ), href: '#' },
  { label: 'Billing', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
  ), href: '#' },
  { label: 'Settings', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 0V4m0 16v-4m8-4h-4m-8 0H4" /></svg>
  ), href: '#' },
  { label: 'Documentation', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8h-4a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>
  ), href: '#', external: true },
  { label: 'Tavily MCP', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" /></svg>
  ), href: '#', external: true },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 bg-white border-r border-gray-100 shadow-lg flex flex-col transition-all duration-200
        ${collapsed ? 'w-16' : 'w-64'}
      `}
    >
      {/* Logo + Collapse Button */}
      <div className="flex items-center gap-2 px-4 py-6 relative">
        <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-400 to-blue-400 flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M6 12l6-6 6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
        <span className={`ml-2 text-2xl font-bold text-gray-800 transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>HRagent</span>
        <button
          onClick={() => setCollapsed(v => !v)}
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow hover:bg-indigo-50 transition"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          ) : (
            <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          )}
        </button>
      </div>
      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1 mt-2">
        {navItems.map((item, idx) => (
          <Link
            key={item.label}
            href={item.href}
            target={item.external ? '_blank' : undefined}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 font-medium group/sidebar-item ${collapsed ? 'justify-center' : ''}`}
          >
            {item.icon}
            <span className={`transition-all duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>{item.label}</span>
            {item.external && !collapsed && (
              <svg className="w-4 h-4 ml-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 13v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 3h6v6" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 3l-9 9" /></svg>
            )}
          </Link>
        ))}
      </nav>
      {/* Profile */}
      <div className="mt-auto px-4 py-4 flex items-center gap-3 border-t border-gray-100">
        <span className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-lg font-bold text-indigo-700">B</span>
        <span className={`transition-all duration-200 text-gray-700 font-semibold ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}>Personal</span>
      </div>
    </aside>
  );
} 