import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './Components/pages/SignIn';
import SignUp from './Components/pages/SignUp';
import Welcome from './Components/pages/Welcome';
import MainPage from './Components/pages/CallerPage';
import FeedbackPage from './Components/pages/feedbackPage';
import PrivateRoute from './PrivateRoute';
import NotFound from './Components/pages/NotFound'; 
import Contact from './Components/pages/Contact';
import About from './Components/pages/About';
import PrivacyPolicy from './Components/pages/PrivacyPolicy';
import AdminFeedbackPage from './Components/admin';
import ChatbotPage from './Components/pages/Chatbot';
import ResultsPage from './Components/pages/ResultsPage';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AuthPage />} />
    <Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
    <Route path="/feedback" element={<PrivateRoute><FeedbackPage /></PrivateRoute>} />
    <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
    <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
    <Route path="/privacy" element={<PrivateRoute><PrivacyPolicy /></PrivateRoute>} />
    <Route path="/admin" element={<AdminFeedbackPage />} />
    <Route path="/chatbot" element={<ChatbotPage />} />
    <Route path="/results" element={<ResultsPage />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 bg-darkgreen flex flex-col justify-center items-center text-white">
          <Welcome />
        </div>
        <div className="p-8 flex flex-col justify-center shadow-lg rounded-lg bg-white">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h2>
          {isSignUp ? <SignUp toggleForm={toggleForm} /> : <SignIn toggleForm={toggleForm} />}
          <div className="text-center mt-4">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button onClick={toggleForm} className="text-black-500">
                  Login Here
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button onClick={toggleForm} className="text-black-700">
                  Sign Up Here
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppRoutes;
