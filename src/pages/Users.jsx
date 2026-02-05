import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authServices.js';

const Users = () => {
    const queryClient = useQueryClient();

    const { data: usersData, isLoading, isError } = useQuery({
        queryKey: ['users'],
        queryFn: authService.getAllUsers,
    });

    const updateRoleMutation = useMutation({
        mutationFn: ({ userId, role }) => authService.updateUserRole(userId, role),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    const handleRoleChange = (userId, newRole) => {
        if (window.confirm(`Are you sure you want to change this user's role to ${newRole}?`)) {
            updateRoleMutation.mutate({ userId, role: newRole });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="alert alert-error">
                <span>Error loading users. Please try again.</span>
            </div>
        );
    }

    const startIdx = 0; // Pagination can be added later

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">User Management</h1>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData?.users?.map((user, index) => (
                                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <th>{startIdx + index + 1}</th>
                                    <td>
                                        <div className="font-semibold text-slate-900 dark:text-white">{user.name}</div>
                                    </td>
                                    <td className="text-slate-600 dark:text-slate-400">{user.email}</td>
                                    <td>
                                        <span className={`badge ${user.role === 'admin' ? 'badge-primary' : 'badge-ghost'} font-medium`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td>
                                        {user.role === 'admin' ? (
                                            <button
                                                className="btn btn-xs btn-outline btn-warning"
                                                onClick={() => handleRoleChange(user._id, 'user')}
                                                disabled={updateRoleMutation.isPending}
                                            >
                                                Revoke Admin
                                            </button>
                                        ) : (
                                            <button
                                                className="btn btn-xs btn-outline btn-primary"
                                                onClick={() => handleRoleChange(user._id, 'admin')}
                                                disabled={updateRoleMutation.isPending}
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;