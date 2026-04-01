# Vellum 🍿

A clean, **Netflix-inspired movie discovery app**. Search for titles, manage a personal watchlist, and explore high-resolution movie details. Built with **React** and the **OMDB API**.  

---

## Core Features

- **Search & Discover:** Instantly find movies and series via the OMDB database.  
- **Persistent Watchlist:** Save your favorites in "My Watchlist" with data persisted in LocalStorage.  
- **Smart Posters:** Low-res API thumbnails are automatically replaced with high-definition posters.  
- **Edit & Manage:** Update movie titles or remove them directly through the detail popup.  
- **Responsive UI:** Fully adaptive design for desktop, tablet, and mobile.  

---

## Tech Stack

- **Frontend:** React (Functional Components & Hooks)  
- **Styling:** Pure CSS (custom layouts, no external frameworks)  
- **API:** OMDB API  
- **Storage:** Browser LocalStorage  

---

## Getting Started

1. **Clone the repo**

```bash
git clone https://github.com/your-username/vellum.git

---

npm install

---

npm start

---

Project Structure
	•	src/App.js – Main logic hub for search and global state management.
	•	src/components/ – Modular components for Movie List, Watchlist, and Detail Popup.
	•	src/App.css – Cinematic styling, layout, and animations.
	•	src/hooks/ – Custom hooks (e.g., useWindowWidth) for responsive behavior.

    ---

    