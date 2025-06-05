import { useEffect, useState } from 'react';
import axios from 'axios';
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const uid = auth.currentUser?.uid;
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://scholarshipfinder-jyel.onrender.com/api/users/${uid}`).then(res => {
      setFormData(res.data);
    });
  }, [uid]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const handleSubmit = () => {
    console.log(uid)
    axios.put(`https://scholarshipfinder-jyel.onrender.com/api/users/${uid}`, formData);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
        <div className="flex justify-end mb-4">
            <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow"
            >
            Logout
            </button>
      </div>
      <input
        className="input"
        value={formData.course || ''}
        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
        placeholder="Course"
      />
      <input
        className="input"
        value={formData.gpa || ''}
        onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
        placeholder="GPA"
      />
      {/* Add more fields similarly */}
      <button onClick={handleSubmit} className="btn">Update</button>
    </div>
  );
};
export default Dashboard;
