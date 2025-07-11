'use client';

import { useState } from 'react';

export default function ApiKeyTable({ 
  apiKeys, 
  loading, 
  onEdit, 
  onDelete, 
  onToggleStatus, 
  onCopyKey,
  showKeyId,
  onToggleShowKey 
}) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="min-w-full bg-white text-base">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 uppercase text-xs">
            <th className="px-4 py-3 font-semibold text-left">Name</th>
            <th className="px-4 py-3 font-semibold text-left">Type</th>
            <th className="px-4 py-3 font-semibold text-left">Usage</th>
            <th className="px-4 py-3 font-semibold text-left">Key</th>
            <th className="px-4 py-3 font-semibold text-left">Options</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} className="text-center py-8 text-gray-400">Loading...</td></tr>
          ) : apiKeys.length === 0 ? (
            <tr><td colSpan={5} className="text-center py-8 text-gray-400">No API keys found</td></tr>
          ) : apiKeys.map((key) => (
            <tr key={key.id} className="border-t border-gray-100 hover:bg-indigo-50 transition">
              <td className="px-4 py-3 font-medium text-indigo-900">{key.name}</td>
              <td className="px-4 py-3 text-indigo-700">{key.type === 'dev' ? 'Development' : 'Production'}</td>
              <td className="px-4 py-3 text-indigo-700">{key.usage}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  {showKeyId === key.id ? (
                    <input
                      className="bg-indigo-100 rounded px-2 py-1 w-full font-mono text-indigo-800 text-xs outline-none border border-indigo-200"
                      type="text"
                      value={key.key}
                      readOnly
                      style={{maxWidth: 180}}
                    />
                  ) : (
                    <span
                      className="bg-indigo-100 rounded px-2 py-1 w-full font-mono text-indigo-800 text-xs outline-none border border-indigo-200"
                      style={{maxWidth: 180, display: 'inline-block'}}
                    >
                      {key.key.slice(0, 3)}#
                      {'-'.repeat(Math.max(8, key.key.length - 4)).slice(0, 8)}
                    </span>
                  )}
                  <button onClick={() => onToggleShowKey(key.id)} title={showKeyId === key.id ? 'Hide' : 'Show'} className="hover:bg-indigo-100 p-1 rounded transition">
                    {showKeyId === key.id ? (
                      <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7s4-7 9-7c1.657 0 3.21.41 4.525 1.125M19.07 4.93l-14.14 14.14" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5-4.03 9-9 9s-9-4-9-9 4.03-9 9-9 9 4 9 9z" /></svg>
                    )}
                  </button>
                  <button onClick={() => onCopyKey(key.key)} title="Copy" className="hover:bg-green-100 p-1 rounded transition">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </button>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-2 items-center">
                  <button onClick={() => onEdit(key)} title="Edit" className="hover:bg-yellow-100 p-1 rounded transition">
                    <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </button>
                  <button onClick={() => onToggleStatus(key)} title={key.status === 'active' ? 'Deactivate' : 'Activate'} className="p-1 rounded transition hover:bg-green-50">
                    {key.status === 'active' ? (
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12a6 6 0 1112 0 6 6 0 01-12 0zm6-6v6l4 2" /></svg>
                    ) : (
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12a6 6 0 1112 0 6 6 0 01-12 0zm6-6v6l4 2" /></svg>
                    )}
                  </button>
                  <button onClick={() => onDelete(key)} title="Delete" className="hover:bg-red-100 p-1 rounded transition">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 