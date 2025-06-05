import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegLightbulb, FaClipboardCheck } from "react-icons/fa";

import NavBar from "./Navbar";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const quotes = [
  "“Education is the passport to the future, for tomorrow belongs to those who prepare for it today.” – Malcolm X",
  "“The beautiful thing about learning is that no one can take it away from you.” – B.B. King",
  "“A scholarship is a ticket to a world of opportunity and possibility.”",
  "“Believe you can and you’re halfway there.” – Theodore Roosevelt",
  "“The best way to predict your future is to create it.” – Abraham Lincoln",
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(123);
      if (user) {
        console.log(431);
        // Set user in Redux store
        console.log(user);
        console.log(user.email);
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );

        // Post user data to backend (login or registration)
        try {
          await axios.post("http://localhost:5000/api/users/login", {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          });
        } catch (error) {
          console.error("Backend login error:", error);
        }
        console.log(123);
        navigate("/dashboard2");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 opacity-90"></div>

        {/* Decorative circles */}
        <div className="absolute top-32 left-10 w-32 h-32 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white opacity-5 rounded-full animate-ping"></div>

        {/* Content */}
        <div className="relative z-10 px-4 pt-20 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
            Scholar Track
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
            Empowering your journey to scholarships, one step at a time.
          </p>

          {/* Rotating quote */}
          <div className="mt-8 max-w-3xl mx-auto px-6 py-4 bg-white/20 backdrop-blur-sm rounded-xl">
            <p className="text-lg md:text-xl text-white italic leading-snug">
              {quotes[currentQuoteIndex]}
            </p>
          </div>

          {/* Sign-in Button */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleSignIn}
              className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold shadow-md transition"
            >
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Wave SVG at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-[80px] md:h-[120px] text-gray-50"
            preserveAspectRatio="none"
          >
            <path
              d="M0,32L48,58.7C96,85,192,139,288,149.3C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,186.7C1248,181,1344,139,1392,117.3L1440,96V120H1392C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120H0Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 text-center">
            Why Choose Scholar Track?
          </h2>
          <p className="mt-4 text-gray-600 text-center max-w-2xl mx-auto">
            Streamline your scholarship search, stay organized, and never miss a
            deadline.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-indigo-100 rounded-full">
                <FaSearch className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Find Scholarships
              </h3>
              <p className="mt-2 text-gray-600">
                Quickly discover all available scholarships tailored to your
                profile.
              </p>
            </div>

            {/* Add other features here if needed */}
            {/* Feature 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                <FaRegLightbulb className="text-green-600 text-2xl" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Personalized Suggestions
              </h3>
              <p className="mt-2 text-gray-600">
                Get AI-powered scholarship matches based on your academic goals
                and background.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-yellow-100 rounded-full">
                <FaClipboardCheck className="text-yellow-600 text-2xl" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                Track Applications
              </h3>
              <p className="mt-2 text-gray-600">
                Stay organized and monitor your scholarship application status
                in one place.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
