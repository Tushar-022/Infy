import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import usa from '../../utils/images/usa.png';
import uk from '../../utils/images/uk.png';
import india from '../../utils/images/india.png';
import australia from '../../utils/images/australia.png';
import canada from '../../utils/images/canada.png';
import img9 from '../../utils/images/9.png';
import img10 from '../../utils/images/10.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'tailwindcss/tailwind.css';
import { db } from '../../utils/firebase';
import { collection, getDocs } from 'firebase/firestore';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

function AdminFeedbackPage() {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const feedbackCollection = collection(db, 'Feedback');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = feedbackSnapshot.docs.map(doc => doc.data());
      setFeedbackData(feedbackList);
    };

    fetchData();
  }, []);

  const serviceRatings = feedbackData.map(data => data.serviceRating);
  const issueResolutions = feedbackData.map(data => data.issueResolution);
  const serviceRatingCounts = [0, 0, 0, 0, 0];
  serviceRatings.forEach(rating => {
    if (rating >= 1 && rating <= 5) {
      serviceRatingCounts[rating - 1]++;
    }
  });

  const issueResolutionCounts = {
    '5 - Awesome': 0,
    '4 - Good': 0,
    '3 - Average': 0,
    '2 - Poor': 0,
    '1 - Terrible': 0,
  };
  issueResolutions.forEach(resolution => {
    if (issueResolutionCounts[resolution] !== undefined) {
      issueResolutionCounts[resolution]++;
    }
  });

  const recommendationCounts = new Array(8).fill(0);
  feedbackData.forEach(data => {
    const rec = data.recommendation;
    if (rec >= 0 && rec < 8) {
      recommendationCounts[rec]++;
    }
  });

  const customerDistribution = {
    'USA': 150,
    'India': 300,
    'Australia': 50,
    'UK': 70,
    'Canada': 100,
  };

  const getOpacity = (country) => {
    const density = customerDistribution[country] || 0;
    return Math.min(Math.max(density / 300, 0.3), 1); // Adjust opacity range based on density
  };

  const barData = {
    labels: ['Awesome', 'Good', 'Average', 'Bad', 'Terrible'],
    datasets: [
      {
        label: 'Service Ratings',
        data: serviceRatingCounts,
        backgroundColor: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'],
      },
    ],
  };

  const pieData = {
    labels: ['Awesome', 'Good', 'Average', 'Poor', 'Terrible'],
    datasets: [
      {
        data: Object.values(issueResolutionCounts),
        backgroundColor: ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'],
      },
    ],
  };

  const lineData = {
    labels: [...Array(8).keys()],
    datasets: [
      {
        label: 'Recommendations',
        data: recommendationCounts,
        fill: false,
        backgroundColor: '#36A2EB',
        borderColor: '#36A2EB',
      },
    ],
  };

  const getIcon = (img, opacity) => {
    return new L.Icon({
      iconUrl: img,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40],
      className: `opacity-${Math.round(opacity * 10)}`, // Round to 0-10 for simplicity in CSS
    });
  };

  const getMarkers = () => {
    return [
      { lat: 20.5937, lng: 78.9629, loc: 'India', img: india, opacity: getOpacity('India'), key: 1 },
      { lat: 37.0902, lng: -95.7129, loc: 'USA', img: usa, opacity: getOpacity('USA'), key: 2 },
      { lat: -25.2744, lng: 133.7751, loc: 'Australia', img: australia, opacity: getOpacity('Australia'), key: 3 },
      { lat: 55.3781, lng: -3.4360, loc: 'UK', img: uk, opacity: getOpacity('UK'), key: 4 },
      { lat: 56.1304, lng: -106.3468, loc: 'Canada', img: canada, opacity: getOpacity('Canada'), key: 5 },
    ];
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-white p-4 md:p-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Feedback Dashboard</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 relative">
        <img src={img9} alt="Character 9" className="absolute top-0 right-0 h-40 w-40 m-4" />
          <h2 className="text-2xl font-bold mb-4">Service Ratings</h2>
          <div className="h-64">
            <Bar data={barData} options={{ maintainAspectRatio: false }} />
          </div>
          
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 relative">
          <h2 className="text-2xl font-bold mb-4">Issue Resolutions</h2>
          <div className="h-64">
            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
          </div>
          <img src={img10} alt="Character 10" className="absolute mb-4 bottom-0 right-0 h-50 w-20 object-contain" style={{ backgroundColor: 'transparent' }} />

        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <div className="h-64">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      <div className="w-full max-w-6xl bg-gray-100 p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 mb-8">
        <h2 className="text-2xl font-bold mb-4">Feedback Locations</h2>
        <MapContainer center={[20, 0]} zoom={2} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {getMarkers().map(marker => (
            <Marker key={marker.key} position={[marker.lat, marker.lng]} icon={getIcon(marker.img, marker.opacity)}>
              <Popup>{marker.loc}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default AdminFeedbackPage;
