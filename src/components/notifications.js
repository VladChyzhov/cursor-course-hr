'use client';

import { useState } from 'react';

export const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // добавляем тип

  const showToastMessage = (message, type = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(false);
    const newKey = Date.now();
    setToastKey(newKey);
    setTimeout(() => setShowToast(true), 10);
    setTimeout(() => {
      setShowToast(false);
    }, 2010);
  };

  return { showToast, toastKey, toastMessage, toastType, showToastMessage };
};

export const Toast = ({ showToast, toastKey, toastMessage, toastType = 'success' }) => {
  if (!showToast) return null;

  const color = toastType === 'error' ? 'red' : 'green';
  const border = toastType === 'error' ? 'border-red-200' : 'border-green-200';
  const text = toastType === 'error' ? 'text-red-700' : 'text-green-700';
  const icon = toastType === 'error'
    ? (
      <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
    : (
      <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );

  return (
    <div key={toastKey} className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
      <div className={`flex items-center gap-3 bg-white border ${border} shadow-xl px-6 py-4 rounded-2xl font-semibold ${text} text-base animate-fadeIn min-w-[220px] pointer-events-auto`}>
        {icon}
        {toastMessage}
      </div>
    </div>
  );
}; 