import {Routes,Route} from 'react-router-dom'
import About from './pages/About';
import Register from './pages/auth/Register';
import Contact from './pages/Contact';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import Policy from './pages/Policy';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/PrivateRoute';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminRoute from './components/routes/AdminRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Products';
function App() {
  return (
    <>
    <Routes>
      <Route path='/' element = {<HomePage/>} />
      <Route path = '/dashboard' element = {<PrivateRoute/>}>
    <Route path='user' element = {<Dashboard/>} />
    <Route path='user/orders' element = {<Orders/>} />
    <Route path='user/profile' element = {<Profile/>} />
      </Route>
      <Route path = '/dashboard' element = {<AdminRoute/>}>
      <Route path='admin' element = {<AdminDashboard/>} />
      <Route path='admin/create-category' element = {<CreateCategory/>} />
      <Route path='admin/create-product' element = {<CreateProduct/>} />
      <Route path='admin/products' element = {<Products/>} />
      <Route path='admin/users' element = {<Users/>} />
      </Route>
      <Route path='/register' element = {<Register/>} />
      <Route path='/forgot-password' element = {<ForgotPassword/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/about' element = {<About/>} />
      <Route path='/contact' element = {<Contact/>} />
      <Route path='/policy' element = {<Policy/>} />
      <Route path='*' element = {<PageNotFound/>} />
    </Routes>
    </>
  );
}

export default App;
