'use client';

export default function DeleteKeyModal({ 
  isOpen, 
  keyToDelete, 
  onClose, 
  onConfirm 
}) {
  if (!isOpen || !keyToDelete) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fadeIn">
        <div className="flex items-center mb-6">
          <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          <div>
            <h3 className="text-xl font-bold text-red-600">Delete API key</h3>
            <p className="text-gray-500 mt-1">Are you sure you want to delete the key <span className="font-semibold text-red-700">"{keyToDelete.name}"</span>? This action cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold shadow">Delete</button>
        </div>
      </div>
    </div>
  );
} 