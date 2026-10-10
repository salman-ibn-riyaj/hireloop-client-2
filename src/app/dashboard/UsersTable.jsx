'use client';

import React from 'react';
import { Table } from '@heroui/react';

export default function UsersTable({ users }) {
    return (
        <div className="w-full overflow-hidden rounded-xl border border-default-200 bg-content1 shadow-md">
            <Table aria-label="Admin Users Management Table">
                <Table.ScrollContainer>
                    <Table.Content>
                        <Table.Header>
                            {/* Added isRowHeader prop to satisfy HeroUI requirement */}
                            <Table.Column isRowHeader={true}>User Name</Table.Column>
                            <Table.Column>Email Address</Table.Column>
                            <Table.Column>Role</Table.Column>
                            <Table.Column>Join Date</Table.Column>
                            <Table.Column>Status</Table.Column>
                            <Table.Column className="text-right">Actions</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {users.length > 0 ? (
                                users.map((user, index) => {
                                    const isActive = user.status !== 'Suspended';
                                    return (
                                        <Table.Row key={user._id || index}>
                                            <Table.Cell>
                                                <div className="flex items-center gap-3">
                                                    {user.image ? (
                                                        <img
                                                            src={user.image}
                                                            alt={user.name}
                                                            className="h-9 w-9 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-default-200 text-xs font-semibold text-default-700">
                                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                        </div>
                                                    )}
                                                    <span className="font-medium text-foreground">
                                                        {user.name || 'Unnamed User'}
                                                    </span>
                                                </div>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className="text-default-500">{user.email}</span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-default-200 bg-default-100 px-3 py-1 text-xs font-medium text-default-700">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-default-500" />
                                                    {user.role || 'Seeker'}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span className="text-default-500">
                                                    {user.createdAt
                                                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                                              month: 'short',
                                                              day: '2-digit',
                                                              year: 'numeric',
                                                          })
                                                        : 'N/A'}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                        isActive
                                                            ? 'bg-success/10 text-success'
                                                            : 'bg-danger/10 text-danger'
                                                    }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${
                                                            isActive ? 'bg-success' : 'bg-danger'
                                                        }`}
                                                    />
                                                    {isActive ? 'Active' : 'Suspended'}
                                                </span>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <div className="flex items-center justify-end gap-3 text-xs font-medium">
                                                    <button className="text-default-600 hover:text-foreground">
                                                        {user.role === 'Recruiter' ? 'Make Seeker' : 'Make Recruiter'}
                                                    </button>
                                                    <button className={isActive ? 'text-danger hover:underline' : 'text-success hover:underline'}>
                                                        {isActive ? 'Suspend' : 'Activate'}
                                                    </button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })
                            ) : (
                                <Table.Row>
                                    <Table.Cell className="text-center py-6 text-default-400" colSpan={6}>
                                        No users found.
                                    </Table.Cell>
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
                <Table.Footer>
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 text-xs text-default-500 border-t border-default-200">
                        <span>Showing 1 to {users.length} users</span>
                        <div className="flex items-center gap-1">
                            <button className="px-2.5 py-1 rounded border border-default-200">&lt;</button>
                            <button className="px-2.5 py-1 rounded bg-foreground text-background font-medium">1</button>
                            <button className="px-2.5 py-1 rounded border border-default-200">&gt;</button>
                        </div>
                    </div>
                </Table.Footer>
            </Table>
        </div>
    );
}