'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';

interface Announcement {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  active: boolean;
  start_date?: string;
  end_date?: string;
  created_at?: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    message: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'error',
    active: true,
    start_date: '',
    end_date: '',
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    setLoading(true);
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setAnnouncements(data);
    setLoading(false);
  }

  async function handleSave() {
    if (!formData.message) {
      alert('Vinsamlegast sláðu inn skilaboð');
      return;
    }

    try {
      if (editing && editing !== 'new') {
        // Update
        const { error } = await supabase
          .from('announcements')
          .update(formData)
          .eq('id', editing);
        
        if (error) {
          console.error('Update error:', error);
          alert('Villa við að uppfæra: ' + error.message);
          return;
        }
      } else {
        // Create
        const { error } = await supabase
          .from('announcements')
          .insert([formData]);
        
        if (error) {
          console.error('Insert error:', error);
          alert('Villa við að búa til: ' + error.message);
          return;
        }
      }

      setEditing(null);
      setFormData({
        message: '',
        type: 'info',
        active: true,
        start_date: '',
        end_date: '',
      });
      await loadAnnouncements();
      alert('Árangur! Tilkynningin var vistuð.');
    } catch (err) {
      console.error('Save error:', err);
      alert('Villa: ' + err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Ertu viss um að þú viljir eyða þessari tilkynningu?')) return;
    
    try {
      const { error } = await supabase.from('announcements').delete().eq('id', id);
      
      if (error) {
        console.error('Delete error:', error);
        alert('Villa við að eyða: ' + error.message);
        return;
      }
      
      await loadAnnouncements();
      alert('Tilkynningunni var eytt!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Villa: ' + err);
    }
  }

  async function toggleActive(id: string, active: boolean) {
    try {
      const { error } = await supabase
        .from('announcements')
        .update({ active: !active })
        .eq('id', id);
      
      if (error) {
        console.error('Toggle error:', error);
        alert('Villa við að breyta stöðu: ' + error.message);
        return;
      }
      
      await loadAnnouncements();
    } catch (err) {
      console.error('Toggle error:', err);
      alert('Villa: ' + err);
    }
  }

  function startEdit(announcement: Announcement) {
    setEditing(announcement.id);
    setFormData({
      message: announcement.message,
      type: announcement.type,
      active: announcement.active,
      start_date: announcement.start_date ? formatDateTimeLocal(announcement.start_date) : '',
      end_date: announcement.end_date ? formatDateTimeLocal(announcement.end_date) : '',
    });
  }

  // Convert ISO timestamp to datetime-local format
  function formatDateTimeLocal(isoString: string): string {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">🔔 Announcements</h1>
          <button
            onClick={() => {
              setEditing('new');
              setFormData({
                message: '',
                type: 'info',
                active: true,
                start_date: '',
                end_date: '',
              });
            }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            ➕ New Announcement
          </button>
        </div>

        {/* Edit Form */}
        {editing && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-2 border-green-500">
            <h2 className="text-xl font-bold mb-4">
              {editing === 'new' ? 'Create Announcement' : 'Edit Announcement'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <input
                  type="text"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full border rounded-lg p-3"
                  placeholder="Sérstök tilboð í janúar! 20% afsláttur af öllum vörum"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full border rounded-lg p-3"
                >
                  <option value="info">Info (Blue)</option>
                  <option value="success">Success (Green)</option>
                  <option value="warning">Warning (Yellow)</option>
                  <option value="error">Error (Red)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Date (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">End Date (Optional)</label>
                  <input
                    type="datetime-local"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium">Active (Show on website)</label>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  💾 Save
                </button>
                <button
                  onClick={() => setEditing(null)}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No announcements yet. Create your first one!</p>
            </div>
          ) : (
            announcements.map((announcement) => (
              <div
                key={announcement.id}
                className={`bg-white rounded-lg shadow p-6 border-l-4 ${
                  announcement.type === 'info' ? 'border-blue-500' :
                  announcement.type === 'success' ? 'border-green-500' :
                  announcement.type === 'warning' ? 'border-yellow-500' :
                  'border-red-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        announcement.type === 'info' ? 'bg-blue-100 text-blue-800' :
                        announcement.type === 'success' ? 'bg-green-100 text-green-800' :
                        announcement.type === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {announcement.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        announcement.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {announcement.active ? '✓ Active' : '✗ Inactive'}
                      </span>
                    </div>
                    <p className="text-lg font-medium mb-2">{announcement.message}</p>
                    <div className="text-sm text-gray-600">
                      {announcement.start_date && (
                        <span className="mr-4">Start: {new Date(announcement.start_date).toLocaleString('is-IS')}</span>
                      )}
                      {announcement.end_date && (
                        <span>End: {new Date(announcement.end_date).toLocaleString('is-IS')}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => toggleActive(announcement.id, announcement.active)}
                      className={`px-3 py-1 rounded text-sm font-medium ${
                        announcement.active 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {announcement.active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => startEdit(announcement)}
                      className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(announcement.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm font-medium hover:bg-red-700"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
