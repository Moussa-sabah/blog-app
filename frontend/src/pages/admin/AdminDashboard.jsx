import './Admin.css'
import AdminSidebar from './AdminSidebar'
import AdminMain from './AdminMain'
const AdminDashboard = () => {
  return (
    <section className='admin-dashboard'>
      <AdminSidebar />
      <AdminMain />
    </section>
  );
}

export default AdminDashboard;