'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { getAuditLogs } from '@/lib/audit';
import { useEffect, useState } from 'react';

interface AuditLog {
  id: string;
  user_email: string;
  action: string;
  entity_type: string;
  entity_name: string;
  created_at: string;
  old_data?: any;
  new_data?: any;
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadLogs();
  }, [filter]);

  async function loadLogs() {
    setLoading(true);
    const data = await getAuditLogs({
      action: filter === 'all' ? undefined : filter,
      limit: 100
    });
    setLogs(data as AuditLog[]);
    setLoading(false);
  }

  function getActionBadge(action: string) {
    const styles: any = {
      created: 'bg-green-100 text-green-800',
      updated: 'bg-blue-100 text-blue-800',
      deleted: 'bg-red-100 text-red-800',
      published: 'bg-purple-100 text-purple-800',
      unpublished: 'bg-yellow-100 text-yellow-800',
    };
    return styles[action] || 'bg-gray-100 text-gray-800';
  }

  function getActionIcon(action: string) {
    const icons: any = {
      created: '➕',
      updated: '✏️',
      deleted: '🗑️',
      published: '✅',
      unpublished: '⏸️',
    };
    return icons[action] || '📝';
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('is-IS');
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl">Loading audit logs...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📋 Audit Log</h1>
          <p className="text-gray-600">Track all changes made in the CMS</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('created')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'created'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Created
            </button>
            <button
              onClick={() => setFilter('updated')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'updated'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Updated
            </button>
            <button
              onClick={() => setFilter('deleted')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'deleted'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Deleted
            </button>
            <button
              onClick={() => setFilter('published')}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === 'published'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Published
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getActionBadge(
                        log.action
                      )}`}
                    >
                      {getActionIcon(log.action)} {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{log.entity_name}</div>
                    <div className="text-xs text-gray-500">{log.entity_type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{log.user_email || 'System'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(log.created_at)}
                  </td>
                  <td className="px-6 py-4">
                    {log.old_data && (
                      <details className="text-xs">
                        <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                          View changes
                        </summary>
                        <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200 max-w-md">
                          {log.old_data && (
                            <div className="mb-2">
                              <strong>Before:</strong>
                              <pre className="text-xs overflow-x-auto">
                                {JSON.stringify(log.old_data, null, 2)}
                              </pre>
                            </div>
                          )}
                          {log.new_data && (
                            <div>
                              <strong>After:</strong>
                              <pre className="text-xs overflow-x-auto">
                                {JSON.stringify(log.new_data, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      </details>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {logs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No audit logs found</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
