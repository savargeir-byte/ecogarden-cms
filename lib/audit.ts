import { supabase } from './supabase';

interface AuditLogEntry {
  action: 'created' | 'updated' | 'deleted' | 'published' | 'unpublished';
  entityType: 'page' | 'section' | 'product' | 'user';
  entityId?: string;
  entityName?: string;
  oldData?: any;
  newData?: any;
}

export async function logAudit(entry: AuditLogEntry) {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    const logData = {
      user_id: user?.id || null,
      user_email: user?.email || 'system',
      action: entry.action,
      entity_type: entry.entityType,
      entity_id: entry.entityId || null,
      entity_name: entry.entityName || null,
      old_data: entry.oldData || null,
      new_data: entry.newData || null,
      ip_address: null, // Can be added from request headers
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
    };

    const { error } = await supabase
      .from('audit_logs')
      .insert(logData);

    if (error) {
      console.error('Failed to log audit:', error);
    }
  } catch (err) {
    console.error('Audit logging error:', err);
  }
}

export async function getAuditLogs(filters?: {
  entityType?: string;
  entityId?: string;
  userId?: string;
  action?: string;
  limit?: number;
}) {
  let query = supabase
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters?.entityType) {
    query = query.eq('entity_type', filters.entityType);
  }

  if (filters?.entityId) {
    query = query.eq('entity_id', filters.entityId);
  }

  if (filters?.userId) {
    query = query.eq('user_id', filters.userId);
  }

  if (filters?.action) {
    query = query.eq('action', filters.action);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching audit logs:', error);
    return [];
  }

  return data || [];
}

export async function getEntityHistory(entityType: string, entityId: string) {
  return getAuditLogs({ entityType, entityId });
}

export async function getUserActivity(userId: string, limit = 50) {
  return getAuditLogs({ userId, limit });
}
