// src/components/Dashboard2.jsx
import React, { useState, useEffect } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";
import axios from "axios";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/authSlice";
import { LogOut } from "lucide-react";

// Sample scholarships data with added location, cgpaRequirement, and scholarshipCategory
const sampleScholarships = [
  {
    id: 1,
    title: "Academic Excellence Scholarship",
    amount: "₹50,000",
    deadline: "2025-07-15",
    location: "Delhi",
    cgpaRequirement: 8.0,
    scholarshipCategory: "General",
    description:
      "Awarded to engineering students with CGPA ≥ 8.0 from Delhi. Covers tuition fees for one year.",
    badge: "Popular",
  },
];

// Hard‐coded lists for filters
const allLocations = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const allCourses = [
  { label: "All Courses", value: "" },
  { label: "Undergraduate (UG)", value: "ug" },
  { label: "Postgraduate (PG)", value: "pg" },
  { label: "Integrated PG", value: "integrated pg" },
  { label: "PhD / Doctoral", value: "phd" },
  { label: "Diploma", value: "diploma" },
  { label: "Higher Secondary", value: "higher secondary" },
  { label: "School Students", value: "school" },
  { label: "Professional Courses", value: "professional" },
  { label: "Engineering", value: "engineering" },
  { label: "Master’s Applicants", value: "masters" },
  { label: "M.D. Degree Applicants", value: "m.d." },
  { label: "Graduate Students", value: "graduate" },
  { label: "M.Tech./M.Sc./M.S. Degree Holders", value: "mtech msc ms" }
];



export default function Dashboard2() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [filterCgpa, setFilterCgpa] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const [filterCourse, setfilterCourse] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [loadingScholarships, setLoadingScholarships] = useState(true);

  // Rehydrate Redux and load profile from backend on mount or reload
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // 1) Dispatch Firebase user into Redux
        dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            name: user.displayName,
          })
        );
        
        // 2) Fetch profile details from backend
        try {
          const uid = auth.currentUser?.uid;
          const { data } = await axios.get(
            `http://localhost:5000/api/users/${uid}`
          );
          // Expect backend returns { name, email, cgpa, location, memberSince, avatar }
          console.log(data);
          setfilterCourse(data.course);
          setFilterLocation(data.location)
          setProfile(data);
        } catch (err) {
          console.error("Error fetching profile:", err);
          // Fallback to minimal profile if backend fails
          setProfile({
            name: user.displayName || "No Name",
            email: user.email,
            gpa: 0,
            location: "",
            memberSince: "",
            avatar: null,
          });
        }
      } else {
        // If no Firebase user, redirect to landing/login
        navigate("/");
      }
      
      setLoadingProfile(false);
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
  const fetchScholarships = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/scholarships");
      setScholarships(data);
    } catch (err) {
      console.error("Error fetching scholarships:", err);
      setScholarships([]); // fallback
    }
    setLoadingScholarships(false);
  };

  fetchScholarships();
}, []);

  // Filter scholarships based on user inputs
  // const filteredScholarships = sampleScholarships.filter((sch) => {
  //   const meetsCgpa =
  //     filterCgpa === "" ? true : parseFloat(filterCgpa) >= sch.cgpaRequirement;
  //   const meetsLocation =
  //     filterLocation === "" ? true : sch.location === filterLocation;
  //   const meetsCategory =
  //     filterCourse === "" ? true : sch.scholarshipCategory === filterCourse;
  //   return meetsCgpa && meetsLocation && meetsCategory;
  // });

  // const filteredScholarships=scholarships;

  const filteredScholarships = scholarships.filter((sch) => {
  const meetsCgpa =
    filterCgpa === "" ? true : parseFloat(filterCgpa) >= sch.cgpaRequirement;

  const locationLower = filterLocation.toLowerCase();

  const meetsLocation =
    filterLocation === ""
      ? true
      : (sch.location && sch.location.toLowerCase() === locationLower) ||
        (sch.title && sch.title.toLowerCase().includes(locationLower));

  const meetsCategory =
    filterCourse === "" ? true : sch.scholarshipCategory === filterCourse;

    const courseLower = filterCourse.toLowerCase();
  const eligibilityText = sch.eligibility?.toLowerCase() || "";

  const courseKeywords = {
    ug: ["ug", "undergraduate", "integrated pg"],
    pg: ["pg", "postgraduate", "integrated pg"],
    "integrated pg": ["integrated pg"],
    phd: ["phd", "doctoral"],
    diploma: ["diploma"],
    "higher secondary": ["higher secondary", "12th", "senior secondary"],
    school: ["school"],
    professional: ["professional"],
  };

  console.log(filterCourse)
  const meetsCourse =
    filterCourse === "" ||
    eligibilityText.includes(courseLower) ||
    (courseKeywords[filterCourse] || []).some((keyword) =>
      eligibilityText.includes(keyword)
    );
    if(meetsCourse)
    console.log(eligibilityText)

  return meetsCgpa && meetsLocation && meetsCourse;
});

  const getDaysLeft = (deadline) => {
  if (!deadline) return Infinity;
  // if (deadline.toLowerCase().includes("last day")) return 1;
  const lower = deadline.toLowerCase();
   if (lower.includes("last day")) return 1;
  if (lower.match(/^1\s+day/i)) return 1;
  const match = deadline.match(/(\d+)\s+days/i);
  return match ? parseInt(match[1]) : Infinity;
};

  const sortedScholarships = [...filteredScholarships].sort((a, b) => {
  const daysA = getDaysLeft(a.deadline);
  const daysB = getDaysLeft(b.deadline);
  if (daysA <= 5 && daysB > 5) return -1;
  if (daysA > 5 && daysB <= 5) return 1;
  return 0;
  });

  const [currentPage, setCurrentPage] = useState(1);
  const scholarshipsPerPage = 20;

  const totalPages = Math.ceil(sortedScholarships.length / scholarshipsPerPage);

  // Slice the array for current page
  const currentScholarships = sortedScholarships.slice(
    (currentPage - 1) * scholarshipsPerPage,
    currentPage * scholarshipsPerPage
  );





  // Sign-out handler
  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  if (loadingProfile) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
              Scholar Track
            </h1>
            <p className="mt-1 text-gray-600">
              Welcome back, {profile.name.split(" ")[0]}! 👋
            </p>
          </div>
          <button
  onClick={handleSignOut}
  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow transition-all duration-200"
>
  <LogOut className="w-4 h-4" />
  Sign Out
</button>
        </div>
      </div>

      {/* PROFILE + FILTERS */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PROFILE CARD */}
          <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="relative inline-block">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                )}
                <button
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md ring-1 ring-gray-200 hover:bg-gray-100 transition"
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Edit Profile"
                >
                  <FaEdit className="text-gray-600" />
                </button>
              </div>

              <div className="mt-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {profile.name}
                </h2>
              </div>

              <div className="mt-2 text-gray-600 space-y-1 text-sm">
                <p>
                  <span className="font-medium">CGPA:</span> {profile.gpa}
                </p>
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {profile.location}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-gray-500 text-sm">{profile.email}</p>
              </div>

              <p className="mt-6 text-gray-700 text-sm font-semibold">
                Course: <span className="font-normal">{profile.course}</span>
              </p>
            </div>
          </div>

          {/* FILTERS CARD */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl ring-1 ring-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Filter Scholarships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* CGPA Input
              <div>
                <label
                  htmlFor="filterCgpa"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Min CGPA
                </label>
                <input
                  id="filterCgpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="10"
                  value={filterCgpa}
                  onChange={(e) => setFilterCgpa(e.target.value)}
                  placeholder="e.g., 7.5"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                />
              </div> */}

              {/* Location Select */}
              <div>
                <label
                  htmlFor="filterLocation"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Location
                </label>
                <select
                  id="filterLocation"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="">All Cities</option>
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Select */}
              <div>
                <label
                  htmlFor="filterCourse"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Course
                </label>
                <select
                  id="filterCourse"
                  value={filterCourse}
                  onChange={(e) => setfilterCourse(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                >
                  <option value="">All Courses</option>
                  {allCourses.map((course) => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SCHOLARSHIPS */}
      <div className="container mx-auto px-4 pb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Available Scholarships
        </h2>
        {sortedScholarships.length === 0 ? (
          <p className="text-center text-gray-500">
            No scholarships match your filters. Try choosing all cities for more national scholarships
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedScholarships.map((sch) => {
              const isUrgent = getDaysLeft(sch.deadline) <= 5;
              return (
                <>
              <div
                key={sch.id}
                className={`relative rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ${
                  isUrgent ? "bg-yellow-100 border-l-8 border-yellow-500" : "bg-white"
                }`}
              >
                {sch.badge && (
                  <span className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    {sch.badge}
                  </span>
                )}
                <div className={`p-4 ${isUrgent ? "bg-yellow-400" : "bg-gradient-to-r from-indigo-500 to-indigo-400"}`}>
                  <h3 className="text-lg font-extrabold text-white">
                    {sch.title}
                  </h3>
                </div>
                <div className="p-5 space-y-3 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Amount:</span> {sch.award}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Deadline:</span>{" "}
                    {sch.deadline}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span>{" "}
                    {sch.location}
                  </p>
                  {/* <p className="text-gray-700">
                    <span className="font-medium">Min CGPA:</span>{" "}
                    {sch.cgpaRequirement.toFixed(1)}
                  </p> */}
                  <p className="text-gray-700">
                    <span className="font-medium">Eligibility:</span>{" "}
                    {sch.eligibility}
                  </p>
                  <p className="text-gray-600">{sch.description}</p>
                  <button
                    onClick={() => window.open(sch.official_website)}
                    className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md shadow-md hover:bg-indigo-700 transition"
                  >
                    Apply Now
                  </button>
                </div>
                

              </div>
              </>
            )})}
          </div>
        )}
      </div>

      {/* EDIT PROFILE MODAL */}
      {isModalOpen && (
        <EditProfileModal
          initialData={profile}
          onClose={() => setIsModalOpen(false)}
          onSave={(updatedData) => {
            setProfile(updatedData);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

/**
 * EditProfileModal
 *
 * Props:
 *  - initialData: { name, email, cgpa, location, memberSince, avatar }
 *  - onClose: () => void
 *  - onSave: (updatedProfileObject) => void
 */
function EditProfileModal({ initialData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: initialData.name,
    email: initialData.email,
    cgpa: initialData.gpa,
    location: initialData.location,
    course: initialData.course,
    avatar: initialData.avatar || null,
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold text-pink-500 mb-6">Edit Profile</h2>

        <div className="space-y-4">
          {/* Avatar Preview & Upload */}
          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              {formData.avatar ? (
                <img
                  src={formData.avatar}
                  alt="Avatar Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xl">
                  ?
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="text-sm text-gray-600"
              />
            </div>
          </div> */}

          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* CGPA */}
          <div>
            <label
              htmlFor="cgpa"
              className="block text-gray-700 font-medium mb-1"
            >
              CGPA
            </label>
            <input
              id="cgpa"
              type="number"
              step="0.1"
              min="0"
              max="10"
              value={formData.gpa}
              onChange={(e) =>
                setFormData({ ...formData, gpa: parseFloat(e.target.value) })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Location */}
          <div>
            <label
              htmlFor="location"
              className="block text-gray-700 font-medium mb-1"
            >
              Location
            </label>
            <select
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"

            >
              <option value="">Select Location</option>
              {allLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>))}
            </select>
          </div>

          {/* Member Since (read-only) */}
          <div>
            <label
              htmlFor="course"
              className="block text-gray-700 font-medium mb-1"
            >
              Course
            </label>
            <select
              id="course"
              value={formData.course}
              onChange={(e) =>
                setFormData({ ...formData, course: e.target.value })
              }
              className="w-full border border-gray-200 bg-gray-100 rounded-lg px-4 py-2 text-gray-500"
            >
              <option value="">Select Course</option>
              {allCourses.map((course) => (
                <option key={course.value} value={course.value}>
                  {course.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              const updatedData = { ...initialData, ...formData };

              try {
                // Send updated data to backend
                const response = await axios.put(
                  `http://localhost:5000/api/users/${auth.currentUser?.uid}`, 
                  updatedData
                );

                console.log("Update successful:", response.data);
                onSave(updatedData); // Call the parent save handler (optional)
                onClose(); // Close the modal
              } catch (error) {
                console.error("Error saving user data:", error);
                alert("Failed to save changes.");
              }
            }}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-pink-400 text-white font-medium hover:from-pink-600 hover:to-pink-500 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
