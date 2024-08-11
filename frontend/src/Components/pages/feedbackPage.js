import React, { useState, useEffect } from 'react';
import { FaPlane, FaSmile, FaRegSmile, FaMeh, FaFrown, FaRegFrown } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';
import { db } from '../../utils/firebase';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


function FeedbackPage() {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(0);
  const [serviceRating, setServiceRating] = useState(0); 
  const [issueResolution, setIssueResolution] = useState('5 - Awesome');
  const [additionalComments, setAdditionalComments] = useState('');
  const [location, setLocation] = useState('');

  const handleServiceRating = (rating) => {
    setServiceRating(rating);
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      const uid = localStorage.getItem('uid');
      if (uid) {
        const userRef = doc(db, 'Users', uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setLocation(userData.country);
        }
      }
    };

    fetchUserLocation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const timestamp = new Date();

      await addDoc(collection(db, 'Feedback'), {
        serviceRating,
        recommendation,
        issueResolution,
        comments: additionalComments,
        location,
        timestamp,
      });

      toast.success('Feedback submitted successfully!');
      navigate('/main');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white m-4 md:m-10">
      <div className="max-w-4xl w-full bg-gray-100 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left side message */}
        <div className="md:w-2/5 p-8 flex flex-col justify-center items-center bg-gray-300 relative">
          <FaPlane className="absolute bottom-4 right-4 h-16 w-16 transform rotate-45 text-blue-500" />
          <h1 className="text-3xl md:text-4xl font-bold mb-4 font-lobster text-center">Your feedback</h1>
          <h2 className="text-lg md:text-xl font-semibold font-merriweather text-center">is really valuable for us</h2>
          <p className="mt-4 text-gray-700 text-center">
            Your input is important, and it helps us get better at what we do.
          </p>
        </div>

        {/* Right side form */}
        <div className="md:w-3/5 p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Feedback Form</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="serviceRating">
                Service Rating:
              </label>
              <div className="flex justify-around">
                <FaSmile
                  className={`h-8 w-8 cursor-pointer ${serviceRating === 1 ? 'text-green-500' : 'text-gray-400'}`}
                  title="Awesome"
                  onClick={() => handleServiceRating(1)}
                />
                <FaRegSmile
                  className={`h-8 w-8 cursor-pointer ${serviceRating === 2 ? 'text-green-300' : 'text-gray-400'}`}
                  title="Good"
                  onClick={() => handleServiceRating(2)}
                />
                <FaMeh
                  className={`h-8 w-8 cursor-pointer ${serviceRating === 3 ? 'text-yellow-500' : 'text-gray-400'}`}
                  title="Average"
                  onClick={() => handleServiceRating(3)}
                />
                <FaRegFrown
                  className={`h-8 w-8 cursor-pointer ${serviceRating === 4 ? 'text-orange-500' : 'text-gray-400'}`}
                  title="Bad"
                  onClick={() => handleServiceRating(4)}
                />
                <FaFrown
                  className={`h-8 w-8 cursor-pointer ${serviceRating === 5 ? 'text-red-500' : 'text-gray-400'}`}
                  title="Terrible"
                  onClick={() => handleServiceRating(5)}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="issueResolution">
                Issue Resolution:
              </label>
              <select
                id="issueResolution"
                name="issueResolution"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={issueResolution}
                onChange={(e) => setIssueResolution(e.target.value)}
              >
                <option>5 - Awesome</option>
                <option>4 - Good</option>
                <option>3 - Average</option>
                <option>2 - Poor</option>
                <option>1 - Terrible</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="recommendation">
                How likely are you to recommend our service to a friend?
              </label>
              <div className="flex flex-wrap justify-center mb-4">
                {[...Array(8).keys()].map((num) => (
                  <div
                    key={num}
                    className={`flex items-center justify-center w-10 h-10 rounded-full cursor-pointer mx-1 my-1 ${num === recommendation ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setRecommendation(num)}
                  >
                    {num}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="additionalComments">
                Your Feedback is important:
              </label>
              <textarea
                id="additionalComments"
                name="additionalComments"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
              ></textarea>
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default FeedbackPage;
