'use client';

export default function EditKeyModal({ 
  isOpen, 
  keyToEdit, 
  onClose, 
  onSubmit, 
  editKeyName, 
  setEditKeyName 
}) {
  if (!isOpen || !keyToEdit) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fadeIn">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-yellow-600">Edit API key</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-yellow-500">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <input
          type="text"
          placeholder="Key Name"
          value={editKeyName}
          onChange={e => setEditKeyName(e.target.value)}
          className="w-full px-4 py-2 border border-yellow-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-6 text-yellow-900 text-base"
          autoFocus
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold">Cancel</button>
          <button onClick={onSubmit} disabled={!editKeyName.trim()} className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-semibold shadow disabled:opacity-50">Save</button>
        </div>
      </div>
    </div>
  );
} 