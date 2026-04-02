
____

VELLUM – Cinematic Movie Workspace 🍿

VELLUM is a high-end React-based movie discovery and management app. It offers a Netflix-style experience with real-time editing, local persistence, and cinematic visual design.

 ____

🚀 Key Features

1. Dynamic Search & Trending
	•	Live API Integration: Fetches real-time movie data from the OMDb API￼.
	•	Initial Discovery: Automatically loads “Dune” on startup so the UI is never empty.
	•	Instant Search: Search for any movie title with immediate results.

2. Advanced Movie Management (CRUD)
	•	Custom Watchlist: Add your own movies manually.
	•	Persistent Storage: Watchlist saved in Local Storage across sessions.
	•	Inline Editing: Edit movie details directly in the popup.
	•	Optimized UX: Press Enter to save edits, Escape to cancel, autoFocus for smooth interaction.

3. Premium Cinematic UI/UX
	•	High-Resolution Assets: Low-quality thumbnails replaced with HD posters.
	•	Cinematic Layout: Hero section with dark overlay and Amber Glow separators.
	•	Modern Footer: Minimalist footer with logo, links, and contact email.

4. Technical Architecture
	•	Reusable Components: MovieList, MoviePopup, Favorites, AddMovie, Footer.
	•	Conditional Rendering: Watchlist appears only when movies are added.
	•	Custom Hooks: useWindowWidth for responsive layouts.

 ____

🛠️ Deployment & Hosting
	•	Vercel Optimized: SPA routing handled via vercel.json to prevent 404s on page refresh.

 ____

💻 Tech Stack
	•	Frontend: React.js
	•	Styling: CSS3 (Custom Cinematic Theme)
	•	API: OMDb (Open Movie Database)
	•	Deployment: Vercel

 ____

📖 Run Locally
	1.	Clone the repository: https://github.com/Dinelegacy/Vellum.git

 ____

    2. npm install

 ____

    3. npm start

 ____

    4. Open http://localhost:3000￼ in your browser