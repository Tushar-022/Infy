import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import About from "../faq/About/about";
import "tailwindcss/tailwind.css";
import headerImage from "../../utils/images/doctar_image2.png";
import awsImage from "../../utils/images/blood report.jpeg";
import purchaseImage from "../../utils/images/home remedies.jpeg";
import generalQueriesImage from "../../utils/images/3.png";
import Footer from "../footer";
import Navbar from "../../Components/navbar/index";
import "./main.css";
import axios from 'axios';

function MainPage() {
  const [categorySelected, setCategorySelected] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // For navigation

  const categories = [
    { image: generalQueriesImage, label: "General Inquiries" },
    { image: awsImage, label: "Get Your Blood Report Evaluated" },
    { image: purchaseImage, label: "Get Your Problem Scanned" },
  ];

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      // Post the file to the server
      // const response = await axios.post("/api/analyze-report", formData);
      // const data = response.data; // Get the result from the response

      const data={};
  
      // Navigate to the results page with the result data
      navigate("/results", { state: { result: data } });
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    }
  };
  
  function Category({ image, label, onClick, index }) {
    return (
      <div className="text-center category-card" onClick={onClick}>
        <div
          className={`p-6 bg-white rounded shadow-md overflow-hidden relative transform transition-transform duration-300 ease-in-out hover:scale-105 hover:rotate-x-10 hover:rotate-y-6 ${
            index === categorySelected
              ? "border-2 border-green-500 font-bold text-gray-700 shadow-lg bg-green-300 scale-105"
              : ""
          }`}
        >
          <img
            src={image}
            alt={label}
            className="h-24 w-24 sm:h-32 sm:w-32 md:h-[150px] md:w-[150px] mx-auto mb-4"
          />
          <div className="mt-2 text-xl">{label}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 max-w-12xl mx-auto">
      <Navbar />
      <div className="relative md:h-80 sm:h-55 bg-blue-600 text-white flex items-center justify-between overflow-visible mt-12 mx-4 sm:mx-10 md:mx-12 lg:mx-14 rounded-3xl">
        <div className="px-4 sm:px-10 md:px-14 lg:px-20 p-4">
          <h1 className="text-xs sm:text-base md:text-xl lg:text-4xl font-bold">
            HOW CAN SEHATMITRA
          </h1>
          <h1 className="text-xs sm:text-base md:text-xl lg:text-4xl font-bold">
            HELP YOU TODAY?
          </h1>
        </div>
        <div className="absolute top-1/2 right-4 sm:right-10 md:right-12 lg:right-16 transform -translate-y-1/2 flex items-center justify-center">
          <img
            src={headerImage}
            alt="Header"
            className="h-[10rem] sm:h-[12rem] md:h-[14rem] lg:h-[22rem] w-auto object-cover transform transition duration-500 ease-in-out"
          />
        </div>
      </div>
      <div className="flex justify-center mt-10 px-4">
        <div className="flex flex-col p-0 m-0">
          <div className="text-center text-4xl py-8 font-bold text-gray-800">
            Select your category
          </div>
          <div className="grid py-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Category
                key={index}
                image={category.image}
                label={category.label}
                onClick={() => {
                  setCategorySelected(index);
                 
                  if (index === 0) {
                    window.open("http://localhost:8501", "_blank"); 
                  }
                  else if (index === 1) {
                    document.getElementById("fileInput").click();
                  }
                }}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
      <input
        id="fileInput"
        type="file"
        accept=".pdf"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {categorySelected === 1 && selectedFile && (
        <div className="text-center mt-4">
          <button
            onClick={handleUpload}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg"
          >
            Upload and Analyze
          </button>
        </div>
      )}
      <div className="px-4">
        <About />
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
