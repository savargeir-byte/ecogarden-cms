import AdminLayout from '@/components/admin/AdminLayout';
import CreateUserForm from '@/components/admin/CreateUserForm';
import UserTable from '@/components/admin/UserTable';

export default function UsersPage() {
  return (
    <AdminLayout>
      <div className="p-6 max-w-5xl">
        <h1 className="text-2xl font-bold mb-6">Users</h1>

        <CreateUserForm />

        <div className="mt-10">
          <UserTable />
        </div>
      </div>
    </AdminLayout>
  );
}
