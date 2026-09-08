import { requireRole } from '@/lib/core/session'

const AdminDashboardlayoutPage = async ({ children }) => {

    await requireRole('admin')
    return children
}

export default AdminDashboardlayoutPage