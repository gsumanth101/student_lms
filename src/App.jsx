import React, { useState, useEffect } from 'react';
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

// Import Chatbot component
import Chatbot from './pages/Chatbot';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  // Add state for Chatbot
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add_university" element={<Adduniversity />} />
        <Route path="/manage_university" element={<Manageuniversity />} />
        <Route path="/add_course" element={<Addcourse />} />
        <Route path="/manage_course" element={<Managecourses />} />
        <Route path="/manage_students" element={<BulkUpload />} />
        <Route path="/create_user" element={<Createuser />} />
        <Route path="/create_spoc" element={<Createspoc />} />
        <Route path="/manage_spoc" element={<Managespoc />} />
      </Routes>

      {/* Add Chatbot component */}
      {chatbotOpen && <Chatbot onClose={() => setChatbotOpen(false)} />}

      {/* Add a button to open Chatbot (you can place this wherever you want) */}
      <button
        onClick={() => setChatbotOpen(true)}
        className="fixed bottom-4 right-4 bg-violet-500 text-white px-6 py-3 rounded-full hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <span className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          Ask Guru
        </span>
      </button>
    </>
  );
}

export default App;
