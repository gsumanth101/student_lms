import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

function CourseDetails() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState('');

  // Fetch course details on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/course-details');
        if (response.data) {
          setCourse(response.data.course);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow flex items-center justify-center">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-4xl mx-auto">
            {/* Course Details Card */}
            <div className="flex items-center justify-center">
              <div className="col-span-12 xl:col-span-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full h-96 overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Course Details</h2>
                {course ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
                    <p className="mb-4">{course.description}</p>
                    {course.topics.map((topic, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="text-md font-semibold mb-2">{topic.title}</h4>
                        <p className="mb-2">{topic.content}</p>
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                          <iframe
                            src={`https://www.youtube.com/embed/${topic.youtubeId}`}
                            title={topic.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          ></iframe>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Loading course details...</p>
                )}
                {/* Message */}
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CourseDetails;