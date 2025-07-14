'use client';

import Link from 'next/link';
import { useApiKeys } from '../../hooks/useApiKeys';
import { useToast, Toast } from '../../components/notifications';
import UsageCard from '../../components/UsageCard';
import ApiKeyTable from '../../components/ApiKeyTable';
import CreateKeyModal from '../../components/CreateKeyModal';
import EditKeyModal from '../../components/EditKeyModal';
import DeleteKeyModal from '../../components/DeleteKeyModal';
import { supabase } from '../../lib/supabaseClient';
import AuthGuard from '../../components/AuthGuard';

export default function DashboardsPage() {
  const {
    // State
    apiKeys,
    loading,
    showCreateModal,
    showEditModal,
    showDeleteModal,
    newKeyName,
    newKeyType,
    newKeyLimitEnabled,
    newKeyLimit,
    editKeyName,
    showKeyId,
    
    // Setters
    setShowCreateModal,
    setShowEditModal,
    setShowDeleteModal,
    setNewKeyName,
    setNewKeyType,
    setNewKeyLimitEnabled,
    setNewKeyLimit,
    setEditKeyName,
    setShowKeyId,
    
    // Actions
    handleCreateKey,
    handleDeleteKey,
    openEditModal,
    handleEditKey,
    toggleShowKey,
    toggleStatus,
    copyToClipboard,
  } = useApiKeys();

  const { showToast, toastKey, toastMessage, showToastMessage } = useToast();

  // Обработчики с уведомлениями
  const handleCreateKeyWithToast = async (e) => {
    const result = await handleCreateKey(e);
    if (result.success) {
      showToastMessage(result.message);
    }
  };

  const handleDeleteKeyWithToast = async () => {
    const result = await handleDeleteKey();
    if (result.success) {
      showToastMessage(result.message);
    }
  };

  const handleEditKeyWithToast = async () => {
    const result = await handleEditKey();
    if (result.success) {
      showToastMessage(result.message);
    }
  };

  const handleToggleStatusWithToast = async (key) => {
    const result = await toggleStatus(key);
    if (result.success) {
      showToastMessage(result.message);
    }
  };

  const handleCopyKeyWithToast = async (key) => {
    const result = await copyToClipboard(key);
    if (result.success) {
      showToastMessage(result.message);
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">
        {/* Usage Card */}
        <UsageCard />

        {/* API Keys Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8 mt-10">
          <div className="flex items-center justify-between mb-4">
            <div className="font-bold text-xl text-indigo-700">API Keys</div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-lg text-base font-semibold shadow-lg transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Add
            </button>
          </div>
          <div className="text-xs text-gray-500 mb-4">
            The key is used to authenticate your requests.
          </div>
          
          <ApiKeyTable
            apiKeys={apiKeys}
            loading={loading}
            onEdit={openEditModal}
            onDelete={(key) => setShowDeleteModal(key)}
            onToggleStatus={handleToggleStatusWithToast}
            onCopyKey={handleCopyKeyWithToast}
            showKeyId={showKeyId}
            onToggleShowKey={toggleShowKey}
          />
        </div>

        {/* Toast */}
        {showToast && (
          <Toast showToast={showToast} toastKey={toastKey} toastMessage={toastMessage} />
        )}

        {/* Create Modal */}
        <CreateKeyModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateKeyWithToast}
          newKeyName={newKeyName}
          setNewKeyName={setNewKeyName}
          newKeyType={newKeyType}
          setNewKeyType={setNewKeyType}
          newKeyLimitEnabled={newKeyLimitEnabled}
          setNewKeyLimitEnabled={setNewKeyLimitEnabled}
          newKeyLimit={newKeyLimit}
          setNewKeyLimit={setNewKeyLimit}
        />

        {/* Edit Modal */}
        <EditKeyModal
          isOpen={!!showEditModal}
          keyToEdit={showEditModal}
          onClose={() => setShowEditModal(null)}
          onSubmit={handleEditKeyWithToast}
          editKeyName={editKeyName}
          setEditKeyName={setEditKeyName}
        />

        {/* Delete Modal */}
        <DeleteKeyModal
          isOpen={!!showDeleteModal}
          keyToDelete={showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
          onConfirm={handleDeleteKeyWithToast}
        />

        {/* Footer */}
        <div className="max-w-4xl mx-auto pb-10 flex justify-end">
          <Link href="/" className="px-6 py-2 bg-white border border-indigo-200 rounded-xl shadow text-indigo-500 hover:text-indigo-700 hover:border-indigo-400 transition font-semibold">Back to Home</Link>
        </div>
      </div>
    </AuthGuard>
  );
} 