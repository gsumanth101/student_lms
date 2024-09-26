import React from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Authpage';
import Adduniversity from './pages/Adduniversity';
import Manageuniversity from './pages/ManageUniversity';
import Addcourse from './pages/Addcourse';
import Managecourses from './pages/Managecourses';
import BulkUpload from './pages/Managestudents';
import Createuser from './pages/Createuser';
import Createspoc from './pages/Createspoc';
import Managespoc from './pages/Managespoc';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const location = useLocation();

  React.useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/add_university" element={<ProtectedRoute element={Adduniversity} />} />
        <Route path="/manage_university" element={<ProtectedRoute element={Manageuniversity} />} />
        <Route path="/add_course" element={<ProtectedRoute element={Addcourse} />} />
        <Route path="/manage_course" element={<ProtectedRoute element={Managecourses} />} />
        <Route path="/manage_students" element={<ProtectedRoute element={BulkUpload} />} />
        <Route path="/create_user" element={<ProtectedRoute element={Createuser} />} />
        <Route path="/create_spoc" element={<ProtectedRoute element={Createspoc} />} />
        <Route path="/manage_spoc" element={<ProtectedRoute element={Managespoc} />} />
      </Routes>
    </>
  );
}

export default App;
