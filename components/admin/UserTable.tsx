'use client';
import { deleteUser, listUsers, updateUserRole } from '@/lib/users';
import { useEffect, useState } from 'react';

export default function UserTable() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    listUsers().then(setUsers);
  }, []);

  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Email</th>
          <th className="p-2">Role</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u.id} className="border-t">
            <td className="p-2">{u.email}</td>

            <td className="p-2">
              <select
                value={u.user_metadata?.role || 'editor'}
                onChange={(e) =>
                  updateUserRole(u.id, e.target.value)
                }
              >
                <option value="editor">Editor</option>
                <option value="admin">Admin</option>
              </select>
            </td>

            <td className="p-2">
              <button
                className="text-red-600"
                onClick={() => deleteUser(u.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
