'use client';
import { createUser } from '@/lib/users';
import { useState } from 'react';

export default function CreateUserForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'editor'>('editor');

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="font-semibold mb-2">Create user</h2>

      <input
        className="border p-2 mr-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <select
        className="border p-2 mr-2"
        value={role}
        onChange={(e) => setRole(e.target.value as any)}
      >
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>

      <button
        className="bg-black text-white px-4 py-2"
        onClick={() => createUser(email, role)}
      >
        Create
      </button>
    </div>
  );
}
