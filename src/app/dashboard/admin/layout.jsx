import { requireRole } from '@/lib/core/session'
import React from 'react'

const AdminDashboardlayoutPage = async ({ children }) => {

    await requireRole('admin')
    return children
}

export default AdminDashboardlayoutPage