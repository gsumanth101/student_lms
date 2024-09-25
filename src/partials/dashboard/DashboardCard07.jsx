import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardCard07() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/admin/courses');
        if (response.data && Array.isArray(response.data.courses)) {
          setCourses(response.data.courses);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="col-span-full xl:col-span-10 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">Courses</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-left">Course Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Description</div>
                </th>
                {/* <th className="p-2">
                  <div className="font-semibold text-left">Universities</div>
                </th> */}
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {courses.map((course) => (
                <tr key={course._id}>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">{course.name}</div>
                  </td>
                  <td className="p-2">
                    <div className="text-gray-800 dark:text-gray-100">{course.description}</div>
                  </td>
                  {/* <td className="p-2">
                    {course.universities.length > 0 ? (
                      <ul>
                        {course.universities.map((university) => (
                          <li key={university._id}>
                            {university.long_name} ({university.short_name}) - {university.location}, {university.country}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-800 dark:text-gray-100">No universities</div>
                    )}
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;