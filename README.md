Scholar Track

A web application that helps students discover, filter, and save scholarships tailored to their academic profiles. Deployed at: https://scholarshipfinder-1.onrender.com/

🔍 Features

Search & Filter: Browse scholarships by category, location, deadline, CGPA requirement, and more.

Scholarship Details: View comprehensive information including title, amount, deadline, eligibility, and description.

User Authentication: Sign up / log in with Firebase Authentication (email/password or Google Sign‑In).

Favorites: Save scholarships you’re interested in and view them later.

Responsive Design: Fully responsive UI built with React and Tailwind CSS for seamless mobile and desktop experiences.

Automated Scraper: Cron-driven script scrapes partner sites for new listings and updates the database.

🛠 Tech Stack

Frontend: React, React Router, Tailwind CSS

Backend / Database: Firebase Firestore (or Supabase / PostgreSQL) + Firebase Cloud Functions or Node.js/Express API

Authentication: Firebase Auth

Hosting: Render (Web service + Cron job)

Scraping: Puppeteer or Selenium + cron job

🚀 Getting Started

Prerequisites

Node.js (v14 or above)

npm or yarn

Firebase account and project

Installation

Clone the repo

git clone https://github.com/YOUR_USERNAME/scholarship-finder.git
cd scholarship-finder

Install dependencies

npm install
# or
yarn install

Configure environment variables
Create a file named .env.local in the project root and add your Firebase config:

REACT_APP_FIREBASE_API_KEY=<your-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-app-id>

Run locally

npm start
# or
yarn start

Visit http://localhost:3000 in your browser.

📦 Deployment

This app is deployed on Render. To deploy your own instance:

Push your code to GitHub.

On Render dashboard, create a new Web Service:

Build Command: npm install && npm run build

Start Command: npm run serve (or npm start)

Environment: Add the same .env variables under Environment > Environment Variables.

(Optional) Create a Cron Job on Render to run your scraper script periodically.

🤝 Contributing

Fork this repository.

Create a new branch:

git checkout -b feature/YourFeatureName

Commit your changes:

git commit -m "Add some amazing feature"

Push to your branch:

git push origin feature/YourFeatureName

Open a Pull Request against main.

Please ensure your code follows existing style conventions and includes necessary tests.

⚖ License

Distributed under the MIT License. See the LICENSE file for details.

🙏 Acknowledgements

Firebase

React

Tailwind CSS

Render

Inspired by real-world scholarship platforms and community feedback

🚀 Team Members

Akshat Gupta - https://github.com/axhatggg

Tripti Jangde - https://github.com/Tripti1311

Aaditya Balraj - https://github.com/aadityabalraj7