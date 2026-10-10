import { getUsersLists } from '@/lib/api/users';
import React from 'react';
import DashboardAnimations from '../../DashboardAnimations';
import UsersTable from '../../UsersTable';


const AdminUsersPage = async () => {
    const data = await getUsersLists();
    const users = data.users || [];

    return (
        <DashboardAnimations>
            <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 bg-background text-foreground">
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">User Management</h1>
                        <p className="text-sm text-default-500 mt-1">
                            Manage system users, roles, and account permissions.
                        </p>
                    </div>
                    <span className="text-sm font-medium px-3 py-1.5 rounded-lg bg-default-100 border border-default-200 w-fit">
                        Total Users: <strong className="text-foreground">{users.length}</strong>
                    </span>
                </div>

                <UsersTable users={users} />
            </div>
        </DashboardAnimations>
    );
};

export default AdminUsersPage;