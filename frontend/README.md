Scrollify is a full-featured music player web application built using the MERN stack, allowing users to search, listen, like, and organize music into custom playlists. Songs are fetched from the JioSaavn API and streamed directly in the browser.

🚀 Features
🔍 Search songs using JioSaavn API

🎧 Stream playable audio in-app

❤️ Like/Unlike songs (requires login)

➕ Add songs to custom playlists

🔐 JWT Authentication (Sign up / Login)

🌙 Dark mode support

🧾 Profile screen with playlist and liked songs

📜 Backend proxy for secure audio streaming

📦 MongoDB for persistent user data

🛠️ Tech Stack
Frontend: React + Vite + Tailwind CSS

State Management: React Context API / Redux

Backend: Node.js + Express.js

Database: MongoDB with Mongoose

Authentication: JWT (JSON Web Token)

External API: JioSaavn Unofficial API via Proxy

Audio: HTML5 <audio> API

📁 Project Structure
bash
Copy
Edit
📦 scrollify/
├── client/ # React frontend (Vite)
│ ├── pages/ # Pages like Home, Profile
│ ├── components/ # MusicCard, Header, Player
│ └── api/ # Axios-based API utils
├── backend/ # Node.js + Express server
│ ├── routes/ # Routes for auth, search, stream
│ └── models/ # Mongoose models
├── .env # Mongo URI, JWT_SECRET
├── README.md # You're here!
🔧 Environment Variables
Create a .env file in the backend/ directory:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_uri
JWT_SECRET=your_secret_key
🧪 Run Locally

1. Clone this repository
   bash
   Copy
   Edit
   git clone https://github.com/yourusername/scrollify.git
   cd scrollify
2. Install dependencies
   bash
   Copy
   Edit
   cd backend
   npm install

cd ../client
npm install 3. Start the project
bash
Copy
Edit

# Start backend

cd backend
nodemon index.js

# Start frontend

cd ../client
npm run dev
🔐 User Features
Feature Requires Login Description
Search Songs ❌ Browse songs using search
Play Song ❌ In-app streaming
Like a Song ✅ Save to "Liked Songs"
Create Playlist ✅ Create and manage playlists
Add to Playlist ✅ Add any song to your playlist

🛡 Disclaimer
This app uses an unofficial JioSaavn API via public reverse proxy (for learning purposes only). It is not intended for production or commercial use.

📸 Screenshots
✅ Home page with scrollable songs

✅ In-app player with controls and timer

✅ Playlist dropdown

✅ Liked songs saving with MongoDB

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first.

📃 License
This project is open-source and free to use under the MIT License.
