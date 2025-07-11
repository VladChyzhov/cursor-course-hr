'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyType, setNewKeyType] = useState('dev');
  const [newKeyLimitEnabled, setNewKeyLimitEnabled] = useState(false);
  const [newKeyLimit, setNewKeyLimit] = useState('');
  const [editKeyName, setEditKeyName] = useState('');
  const [showKeyId, setShowKeyId] = useState(null);

  // Загрузка ключей из Supabase
  const fetchKeys = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('api_keys').select('*').order('id', { ascending: true });
    if (!error) setApiKeys(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchKeys();
  }, []);

  // Добавить ключ
  const handleCreateKey = async (e) => {
    e && e.preventDefault();
    if (!newKeyName.trim()) return;
    
    const newKey = {
      name: newKeyName,
      type: newKeyType,
      usage: 0,
      key: `hr-${(new Date()).getTime()}-${Math.random().toString(36).slice(2, 18)}`,
      status: 'active',
      usage_limit: newKeyLimitEnabled && newKeyLimit ? Number(newKeyLimit) : null,
    };
    
    const { error } = await supabase.from('api_keys').insert([newKey]);
    if (!error) {
      setShowCreateModal(false);
      setNewKeyName('');
      setNewKeyType('dev');
      setNewKeyLimitEnabled(false); 
      setNewKeyLimit('');
      fetchKeys();
      return { success: true, message: 'API key created successfully' };
    }
    return { success: false, message: 'Failed to create API key' };
  };

  // Удалить ключ
  const handleDeleteKey = async () => {
    if (!showDeleteModal) return;
    
    const { error } = await supabase.from('api_keys').delete().eq('id', showDeleteModal.id);
    if (!error) {
      setShowDeleteModal(null);
      fetchKeys();
      return { success: true, message: 'API key deleted successfully' };
    }
    return { success: false, message: 'Failed to delete API key' };
  };

  // Открыть модалку редактирования
  const openEditModal = (key) => {
    setShowEditModal(key);
    setEditKeyName(key.name);
  };

  // Сохранить редактирование
  const handleEditKey = async () => {
    if (!showEditModal) return;
    
    const { error } = await supabase.from('api_keys').update({ name: editKeyName }).eq('id', showEditModal.id);
    if (!error) {
      setShowEditModal(null);
      setEditKeyName('');
      fetchKeys();
      return { success: true, message: 'API key updated successfully' };
    }
    return { success: false, message: 'Failed to update API key' };
  };

  // Показать/скрыть ключ
  const toggleShowKey = (id) => {
    setShowKeyId(showKeyId === id ? null : id);
  };

  // Переключить статус ключа
  const toggleStatus = async (key) => {
    const newStatus = key.status === 'active' ? 'inactive' : 'active';
    const { error } = await supabase.from('api_keys').update({ status: newStatus }).eq('id', key.id);
    if (!error) {
      fetchKeys();
      return { 
        success: true, 
        message: `API key ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully` 
      };
    }
    return { success: false, message: 'Failed to update key status' };
  };

  // Надёжное копирование в буфер обмена с fallback
  const copyToClipboard = async (key) => {
    let copied = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(key);
        copied = true;
      } else {
        // fallback для старых браузеров
        const textarea = document.createElement('textarea');
        textarea.value = key;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
          copied = document.execCommand('copy');
        } catch (err) {
          copied = false;
        }
        document.body.removeChild(textarea);
      }
    } catch (err) {
      copied = false;
    }
    
    if (copied) {
      return { success: true, message: 'Copied to clipboard' };
    }
    return { success: false, message: 'Failed to copy to clipboard' };
  };

  return {
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
    fetchKeys,
    handleCreateKey,
    handleDeleteKey,
    openEditModal,
    handleEditKey,
    toggleShowKey,
    toggleStatus,
    copyToClipboard,
  };
} 