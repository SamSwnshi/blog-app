MERN Blog Posting Web App
This is a full-stack blog posting web application built using the MERN stack (MongoDB, Express, React, Node.js).
Features

Public blog feed filtered by user's geo-location
Private blog editor/creator interface
User authentication
Block-based rich text editor
Checkout process for publishing blogs

Prerequisites

Node.js (v14 or later)
MongoDB
npm or yarn

Installation

Clone the repository:
Copygit clone https://github.com/yourusername/mern-blog-app.git
cd mern-blog-app

Install dependencies for both frontend and backend:
Copycd client && npm install
cd ../server && npm install

Create a .env file in the server directory and add your MongoDB connection string:
CopyMONGODB_URI=your_mongodb_connection_string

Start the development server:
Copycd client && npm start
cd ../server && npm run dev


Deployment
This app is configured for deployment on Vercel. Follow these steps:

Push your code to a GitHub repository.
Log in to your Vercel account and create a new project.
Connect your GitHub repository to the Vercel project.
Configure your environment variables in the Vercel dashboard.
Deploy the project.

Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
