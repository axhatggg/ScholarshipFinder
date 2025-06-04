import { useEffect, useState } from "react";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth, provider } from "../firebase/firebase.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Set user in Redux
        dispatch(setUser({
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        }));

        // Post to backend if new user
        await axios.post("http://localhost:5000/api/users/login", {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
        });

        navigate("/dashboard");
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
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
    <div className="h-screen w-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl text-center space-y-6">
        <h1 className="text-5xl font-bold leading-tight">
          Welcome to ScholarTrack
        </h1>
        <p className="text-lg text-white/80">
          Track your academic progress, manage your personal data securely, and access personalized dashboards — all in one place.
        </p>
        <button
          onClick={handleSignIn}
          className="bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-full font-semibold shadow-md transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
