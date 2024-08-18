import { Link } from "react-router-dom";
import './Admin.css'
const AdminSidebar = () => {
  return (

    <div className="admin-sidebar">
      <div className="admin-sidebar-title">
        <i class="bi bi-badge-tm-fill"></i>
        Dashboard
      </div>
      <div className="admin-sidebar-links">
        <Link to='/admin-dashboard/users-table' className="admin-sidebar-link">
          <i class="bi bi-person-fill"></i>
          Users
        </Link>
        <Link to='/admin-dashboard/posts-table' className="admin-sidebar-link">
          <i class="bi bi-file-post"></i>
          Posts
        </Link>
        <Link to='/admin-dashboard/categories-table' className="admin-sidebar-link">
          <i class="bi bi-tag-fill"></i>
          Categories
        </Link>
        <Link to='/admin-dashboard/comments-table' className="admin-sidebar-link">
          <i class="bi bi-chat-left-text-fill"></i>
          Comments
        </Link>
      </div>
    </div>
  );
}

export default AdminSidebar;