// models/Scholarship.js
import mongoose from 'mongoose';

const scholarshipSchema = new mongoose.Schema({
  title: String,
  link: String,
  deadline: String,
  award: String,  
  eligibility: String,
  official_website: String,
});

const Scholarship = mongoose.model('Scholarship', scholarshipSchema);

export default Scholarship;
