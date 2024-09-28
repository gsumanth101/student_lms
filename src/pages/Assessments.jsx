import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Confetti from 'react-confetti';

function Assessments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
    const url = `${baseUrl}/assessments/student`;
    console.log('Fetching assessments from:', url);
    try {
      const response = await axios.get(url, {
        headers: {
          'Accept': 'application/json'
        }
      });
      console.log('API Response:', response.data);
      if (Array.isArray(response.data)) {
        setAssessments(response.data);
      } else {
        console.error('API did not return an array:', response.data);
        setAssessments([]);
      }
    } catch (error) {
      console.error('Error fetching assessments:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setAssessments([]);
    }
  };

  const handleAssessmentSelect = async (assessment) => {
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      const response = await axios.get(`${baseUrl}/assessments/${assessment._id}`);
      setSelectedAssessment(response.data);
      setUserAnswers({});
    } catch (error) {
      console.error('Error fetching assessment details:', error);
      alert('Failed to load assessment details. Please try again.');
    }
  };

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const baseUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';
      console.log('Submitting assessment to:', `${baseUrl}/assessments/submit`);
      console.log('Submission data:', {
        assessmentId: selectedAssessment._id,
        studentId: '123', // Replace with actual student ID
        answers: userAnswers
      });
      
      const response = await axios.post(`${baseUrl}/assessments/submit`, {
        assessmentId: selectedAssessment._id,
        studentId: '123', // Replace with actual student ID
        answers: userAnswers
      });
      
      console.log('Submission response:', response.data);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 10000); // Hide confetti after 5 seconds
      setSelectedAssessment(null);
      alert(`Assessment submitted successfully. Your score: ${response.data.score}`);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      alert('Failed to submit assessment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {showConfetti && <Confetti />}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-4 sm:p-6 lg:p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Assessments</h1>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Available Assessments</h2>
              {Array.isArray(assessments) && assessments.length > 0 ? (
                <div className="space-y-4">
                  {assessments.map((assessment) => (
                    <div 
                      key={assessment._id} 
                      className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 cursor-pointer transition duration-300 ease-in-out"
                      onClick={() => handleAssessmentSelect(assessment)}
                    >
                      <h3 className="font-medium text-lg text-blue-600">{assessment.title}</h3>
                      <p className="text-sm text-gray-600 mt-2">
                        Deadline: {new Date(assessment.deadline).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No assessments available.</p>
              )}
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {selectedAssessment ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4 text-gray-700">{selectedAssessment.title}</h2>
                  {selectedAssessment.questions && selectedAssessment.questions.map((question, index) => (
                    <div key={question._id} className="mb-6 pb-4 border-b border-gray-200 last:border-b-0">
                      <p className="font-medium text-lg text-gray-800 mb-3">{index + 1}. {question.questionText}</p>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
                            <input
                              type="radio"
                              name={`question_${question._id}`}
                              value={option}
                              onChange={() => handleAnswerChange(question._id, option)}
                              checked={userAnswers[question._id] === option}
                              className="form-radio text-blue-600"
                            />
                            <span className="text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                  </button>
                </>
              ) : (
                <p className="text-gray-600 text-center">Select an assessment to start</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Assessments;