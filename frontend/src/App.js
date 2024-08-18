import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home'
import PostsPage from './pages/postsPage/PostsPage'
import CreatePost from './pages/createPost/CreatePost'
import PostDetails from './pages/postDetails/PostDetails'
import Category from './pages/category/Category'
import AdminDashboard from './pages/admin/AdminDashboard'
import UsersTable from './pages/admin/UsersTable'
import PostsTable from './pages/admin/PostsTable'
import CategoriesTable from './pages/admin/CategoriesTable'
import CommentsTable from './pages/admin/CommentsTable'
import Login from './pages/forms/Login'
import Register from './pages/forms/Register'
import Footer from "./components/footer/Footer";
import { ToastContainer } from 'react-toastify'
import Profile from "./pages/profile/Profile";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from './pages/forms/ResetPassword'
import NotFound from "./pages/notFound/NotFound";
import { useSelector } from 'react-redux'
import VerifyEmail from "./pages/verifyEmail/VerifyEmail";


function App() {

  const { user } = useSelector(state => state.auth)

  return (
    <BrowserRouter >
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/createPost" element={user ? <CreatePost /> : <Navigate to='/' />} />
        <Route path="/post/details/:id" element={<PostDetails />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/posts/category/:category" element={<Category />} />
        <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to='/' />} />
        <Route path="admin-dashboard">
          <Route index element={user?.isAdmin ? <AdminDashboard /> : <Navigate to='/' />} />
          <Route path="users-table" element={user?.isAdmin ? <UsersTable /> : <Navigate to='/' />} />
          <Route path="posts-table" element={user?.isAdmin ? <PostsTable /> : <Navigate to='/' />} />
          <Route path="categories-table" element={user?.isAdmin ? <CategoriesTable /> : <Navigate to='/' />} />
          <Route path="comments-table" element={user?.isAdmin ? <CommentsTable /> : <Navigate to='/' />} />
        </Route>

        <Route path="/login" element={!user ? <Login /> : <Navigate to='/' />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to='/' />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId/:token" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
