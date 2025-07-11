'use client';

export default function CreateKeyModal({ 
  isOpen, 
  onClose, 
  onSubmit, 
  newKeyName, 
  setNewKeyName,
  newKeyType,
  setNewKeyType,
  newKeyLimitEnabled,
  setNewKeyLimitEnabled,
  newKeyLimit,
  setNewKeyLimit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fadeIn">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">Create a new API key</h2>
        <p className="text-gray-500 text-sm mb-6 text-center">Enter a name and limit for the new API key.</p>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Name</label>
          <input
            type="text"
            placeholder="Key Name"
            value={newKeyName}
            onChange={e => setNewKeyName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 text-base"
            autoFocus
          />
          <div className="text-xs text-gray-400 mt-1">A unique name to identify this key</div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Key Type</label>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2">
            <label className={`flex-1 min-w-[140px] flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${newKeyType==='dev' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
              <input
                type="radio"
                name="keyType"
                value="dev"
                checked={newKeyType==='dev'}
                onChange={() => setNewKeyType('dev')}
                className="accent-indigo-500"
              />
              <span className="font-medium text-gray-800">Development</span>
            </label>
            <label className={`flex-1 min-w-[140px] flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition ${newKeyType==='prod' ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}>
              <input
                type="radio"
                name="keyType"
                value="prod"
                checked={newKeyType==='prod'}
                onChange={() => setNewKeyType('prod')}
                className="accent-indigo-500"
              />
              <span className="font-medium text-gray-800">Production</span>
            </label>
          </div>
          <div className="text-xs text-gray-400 mt-2">
            {newKeyType === 'dev'
              ? 'Rate limited to 100 requests/minute'
              : 'Rate limited to 1,000 requests/minute'}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer">
            <input
              type="checkbox"
              checked={newKeyLimitEnabled}
              onChange={e => setNewKeyLimitEnabled(e.target.checked)}
              className="accent-indigo-500"
            />
            Limit monthly usage
          </label>
          <input
            type="number"
            min="1"
            placeholder="1000"
            value={newKeyLimit}
            onChange={e => setNewKeyLimit(e.target.value)}
            disabled={!newKeyLimitEnabled}
            className={`mt-2 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-900 text-base ${newKeyLimitEnabled ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 text-gray-400'}`}
          />
          <div className="text-xs text-gray-400 mt-1">* If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.</div>
        </div>
        
        <div className="flex justify-end gap-2 mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold transition">Cancel</button>
          <button type="submit" disabled={!newKeyName.trim()} className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold shadow transition disabled:opacity-50">Create</button>
        </div>
      </form>
    </div>
  );
} 