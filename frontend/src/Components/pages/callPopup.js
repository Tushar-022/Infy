
// import React, { useState, useEffect, useRef } from "react";
// import {
//   Phone,
//   User,
//   Bot,
//   Play,
//   StopCircle,
//   RotateCw,
//   Send,
//   Volume2,
// } from "lucide-react";
// import axios from "axios";
// import AWS from "aws-sdk";
// import { toast } from "react-toastify";
// import queryAudio from "../../utils/audios/query.mp3";
// import welcomeAudio from "../../utils/audios/welcome_theme.mp3";
// import errorAudio from "../../utils/audios/error.mp3";

// import { useNavigate } from "react-router-dom";
// import {
//   addDoc,
//   arrayUnion,
//   collection,
//   doc,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../../utils/firebase";
// import {ThreeDots} from "react-loader-spinner";

// AWS.config.update({
//   region: "us-east-1",
//   credentials: new AWS.Credentials(
//     process.env.REACT_APP_ACCESS_KEY,
//     process.env.REACT_APP_SECRET_ACCESS_KEY
//   ),
// });

// const createSession = async (category) => {
//   const userUID = localStorage.getItem("uid");
//   if (!userUID) {
//     console.error("User UID not found in localStorage");
//     return;
//   }

//   try {
//     const sessionsCollectionRef = collection(db, "sessions");
//     const newSession = {
//       questions: [],
//       answers: [],
//       embeddings: [],
//       categories: category,
//     };
//     const sessionDocRef = await addDoc(sessionsCollectionRef, newSession);

//     const userRef = doc(db, "Users", userUID);
//     await updateDoc(userRef, {
//       session: arrayUnion(sessionDocRef),
//     });

//     const sessionId = sessionDocRef.id;
//     console.log("New session ID:", sessionId);
//     return sessionId;
//   } catch (error) {
//     console.error("Error creating new session:", error);
//     throw error; // Rethrow the error for handling in the component
//   }
// };

// function CallPopup({ onClose, mediaRecorder, category }) {
//   const navigate = useNavigate();
//   const [isRecording, setIsRecording] = useState(false);
//   const [isBotSpeaking, setIsBotSpeaking] = useState(false);
//   const [sessionId, setSessionId] = useState(null);
//   const [botAudio, setBotAudio] = useState(null); // State to keep track of the bot audio element
//   // const [mediaBlobUrl, setMediaBlobUrl] = useState(null); // State to hold the media blob URL
//   const { startRecording, stopRecording, mediaBlobUrl } = mediaRecorder;
//   const [isLoading, setIsLoading] = useState(false); // Loading state

//   const volumeAudioRef = useRef(null);
//   const popupAudioRef = useRef(null);
//   const errorAudioRef = useRef(null);

//   useEffect(() => {
//     const fetchSessionId = async () => {
//       try {
//         const id = await createSession(category);
//         setSessionId(id);

//         console.log('hello')
//         if (popupAudioRef.current) {
//           popupAudioRef.current.play();
//           setIsBotSpeaking(true);
//           popupAudioRef.current.onended = () => setIsBotSpeaking(false);
//         }
//       } catch (error) {
//         console.error("Error creating session:", error);
//         // Handle error if needed
//       }
//     };

//     fetchSessionId(); // Call fetchSessionId only once on component mount
//   }, [category]); 
//   const handleStart = async () => {
//     startRecording();
//     setIsRecording(true);
//     console.log("Recording started");
//     toast.info("Recording started");
//   };

//   const handleStop = async () => {
//     console.log(mediaBlobUrl);
//     stopRecording();
//     setIsRecording(false);
//     stopBotSpeaking(); // Stop bot speaking when stop is clicked
//     console.log("Recording stopped");

//     if (botAudio) {
//       botAudio.pause(); // Pause the bot's response audio
//       botAudio.currentTime = 0; // Reset the bot's response audio
//       setBotAudio(null); // Clear the bot audio reference
//     }
//   };

//   const discardRecording = () => {
//     stopRecording();
//     toast.info("Recording discarded");
//     console.log("Recording discarded");
//   };

//   const sendAudio = async () => {
//     if (!mediaBlobUrl) {
//       console.error("No audio data to send");
//       toast.error("No audio data to send");
//       return;
//     }

//     try {
//       toast.info("Processing...");
//       setIsLoading(true);
//       console.log("Preparing to send audio file from:", mediaBlobUrl);

//       const response = await fetch(mediaBlobUrl);
//       const blob = await response.blob();
//       const audioBlob = new Blob([blob], { type: "audio/mpeg" });

//       const formData = new FormData();
//       formData.append("file", audioBlob, "recording.mp3");

//       const uid = localStorage.getItem("uid");
//       const language = localStorage.getItem('language');
//       formData.append("language", language);
//       formData.append("category", category);
//       formData.append("uid", uid);
//       formData.append("sessionId", sessionId);

//       const backendUrl = "https://hackon-slva.onrender.com/get_response";
//       const audioResponse = await axios.post(backendUrl, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         responseType: "arraybuffer",

//         timeout: 30000
//       });
//       setIsLoading(false);
//       // Convert response data to string to check for errors
//       const responseText = new TextDecoder("utf-8").decode(audioResponse.data);

//       // Try to parse the response text as JSON
//       let responseData;
//       try {
//         responseData = JSON.parse(responseText);
//       } catch (error) {
//         responseData = null;
//       }      
//       toast.success("Audio sent successfully!");
//       // Check if the response is an error message
//       if (responseData && responseData.Error) {
//         console.error("Error fetching the result:", responseData.Error);
//         toast.error("Error fetching the result");
//         if (errorAudioRef.current) {
//           errorAudioRef.current.play();
//           setIsBotSpeaking(true);
//           errorAudioRef.current.onended = () => setIsBotSpeaking(false);
//         }
//         return;
//       }
//       console.log(audioResponse);
//       const audioArrayBuffer = audioResponse.data;
//       const audioBlobResponse = new Blob([audioArrayBuffer], {
//         type: "audio/mpeg",
//       });
//       const audioUrlObject = URL.createObjectURL(audioBlobResponse);

//       setIsBotSpeaking(true);

//       const audio = new Audio(audioUrlObject);
//       setBotAudio(audio); // Set the bot audio reference
//       audio.play();

//       audio.onended = () => {
//         setIsBotSpeaking(false);
//         URL.revokeObjectURL(audioUrlObject);
//       };

//     } catch (error) {
//       console.error("Error uploading or sending audio:", error);
//       toast.error("Failed to send audio");
//       setIsLoading(false);
//       if (errorAudioRef.current) {
//         errorAudioRef.current.play();
//         setIsBotSpeaking(true);
//         errorAudioRef.current.onended = () => setIsBotSpeaking(false);
//       }
//     }
//   };

//   const handleClose = () => {
//     stopRecording();
//     stopBotSpeaking();
//     if (botAudio) {
//       botAudio.pause(); // Pause the bot's response audio
//       botAudio.currentTime = 0; // Reset the bot's response audio
//       setBotAudio(null); // Clear the bot audio reference
//     }

//     // Reset the bot speaking state
//     setIsBotSpeaking(false);

//     // setMediaBlobUrl(null); // Clear the media blob URL
//     onClose();
//     navigate("/feedback");
//   };

//   const handleVolumeButtonClick = () => {
//     // Stop any currently playing audio
//     if (popupAudioRef.current && !popupAudioRef.current.paused) {
//       popupAudioRef.current.pause();
//       popupAudioRef.current.currentTime = 0;
//     }

//     if (volumeAudioRef.current && !volumeAudioRef.current.paused) {
//       volumeAudioRef.current.pause();
//       volumeAudioRef.current.currentTime = 0;
//     }

//     // Check if there is a bot response audio playing
//     if (botAudio && !botAudio.paused) {
//       botAudio.pause();
//       botAudio.currentTime = 0;
//     }

//     // Play the volume audio
//     if (volumeAudioRef.current) {
//       volumeAudioRef.current.play();
//       setIsBotSpeaking(true);
//       volumeAudioRef.current.onended = () => setIsBotSpeaking(false);
//     }
//   };

//   const stopBotSpeaking = () => {
//     if (popupAudioRef.current) {
//       popupAudioRef.current.pause();
//       popupAudioRef.current.currentTime = 0;
//     }
//     if (volumeAudioRef.current) {
//       volumeAudioRef.current.pause();
//       volumeAudioRef.current.currentTime = 0;
//     }
//     if(errorAudioRef.current)
//     {
//       errorAudioRef.current.pause();
//       errorAudioRef.current.currentTime = 0;
//     }
//     setIsBotSpeaking(false);
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
//       {isLoading && (
//         <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75 z-50">
//           <ThreeDots color="#FFFFFF" height={80} width={80} />
//         </div>
//       )}
//       <div className="relative bg-white w-[800px] rounded-lg shadow-lg p-8">
//         <audio ref={popupAudioRef} src={welcomeAudio} />
//         <audio ref={volumeAudioRef} src={queryAudio} />
//         <audio ref={errorAudioRef} src={errorAudio} /> 
//          <button
//           title="Instructions..."
//           onClick={handleVolumeButtonClick}
//           className="absolute top-4 left-4 w-12 h-12 bg-black text-white flex items-center justify-center rounded-full"
//         >
//           <Volume2 className="w-6 h-6" />
//         </button>
//         <button
//           title="End Session"
//           onClick={handleClose}
//           className="absolute top-4 right-4 w-12 h-12 bg-red-500 text-white flex items-center justify-center rounded-full"
//         >
//           <Phone style={{ transform: "rotate(135deg)" }} className="w-6 h-6" />
//         </button>
//         <div className="flex flex-col">
//           <div className="flex justify-center">
//             <h1 className="text-4xl font-bold">Ask Your Queries</h1>
//           </div>
//           <div className="flex justify-center gap-1 mt-8">
//             <div className="flex items-center justify-center w-[49%] h-60 bg-black rounded-3xl border-4 border-[#00BCD4]">
//               <div className="wave-container">
//                 {isRecording && <div className="wave"></div>}
//                 <div className="flex items-center justify-center w-28 h-28 bg-[#00BCD4] rounded-full">
//                   <User className="w-16 h-16 text-black" />
//                 </div>
//               </div>
//             </div>
//             <div className="flex items-center justify-center w-[49%] h-60 bg-black rounded-3xl border-4 border-[#00BCD4]">
//               <div className="wave-container">
//                 {isBotSpeaking && <div className="wave"></div>}
//                 <div className="flex items-center justify-center w-28 h-28 bg-[#00BCD4] rounded-full">
//                   <Bot className="w-16 h-16 text-black" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between bg-[#00BCD4] p-3 mt-4 rounded-lg border border-black">
//             <div className="flex flex-col items-center">
//               <div
//                 className={`flex items-center justify-center w-10 h-10 bg-black rounded-full ${
//                   isRecording || isBotSpeaking
//                     ? "opacity-50 cursor-not-allowed"
//                     : "opacity-100 cursor-pointer hover:border-2 hover:border-green-300"
//                 }`}
//                 title={
//                   isRecording || isBotSpeaking
//                     ? "Recording in progress or Bot is speaking"
//                     : "Start recording"
//                 }
//               >
//                 <button
//                   onClick={handleStart}
//                   disabled={isRecording || isBotSpeaking}
//                   className="text-white"
//                 >
//                   <Play className="w-5 h-5" />
//                 </button>
//               </div>
//               <span className="text-sm font-medium mt-1">
//                 {isRecording ? "Speaking..." : "Start"}
//               </span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className={`flex items-center justify-center w-10 h-10 bg-black rounded-full ${
//                   !isRecording && !isBotSpeaking
//                     ? "opacity-50 cursor-not-allowed"
//                     : "opacity-100 cursor-pointer hover:border-2 hover:border-red-300"
//                 }`}
//                 title={
//                   !isRecording && !isBotSpeaking
//                     ? "No recording or bot speaking in progress"
//                     : "Stop recording or bot speaking"
//                 }
//               >
//                 <button
//                   onClick={handleStop}
//                   disabled={!isRecording && !isBotSpeaking}
//                   className="text-white"
//                 >
//                   <StopCircle className="w-5 h-5" />
//                 </button>
//               </div>
//               <span className="text-sm font-medium mt-1">Stop</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="flex items-center justify-center w-10 h-10 bg-black rounded-full hover:border-2 hover:border-blue-300 cursor-pointer"
//                 title="Discard current recording"
//               >
//                 <button onClick={discardRecording} className="text-white">
//                   <RotateCw className="w-5 h-5" />
//                 </button>
//               </div>
//               <span className="text-sm font-medium mt-1">Restart</span>
//             </div>
//             <div className="flex flex-col items-center">
//               <div
//                 className="flex items-center justify-center w-10 h-10 bg-black rounded-full hover:border-2 hover:border-blue-300 cursor-pointer"
//                 title="Send the recorded audio"
//               >
//                 <button onClick={sendAudio} className="text-white">
//                   <Send className="w-5 h-5" />
//                 </button>
//               </div>
//               <span className="text-sm font-medium mt-1">Send</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CallPopup;
