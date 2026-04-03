## VELLUM – Movie App 🍿

VELLUM is a React-based movie application that uses an external API (OMDb) to fetch movie data. It provides a simple and clean interface to search for movies, manage a personal watchlist, and interact with movie data in real time.

____

## Key Features

1. Movie Search  
- Search for movies using the OMDb API to retrieve real-time data  
- Display a default set of movies when the app loads to avoid an empty UI  
- Show results instantly based on user input for a smoother experience  

2. Watchlist (Favorites)  
- Add movies from search results or create custom entries  
- Prevent duplicate entries to keep the list clean  
- Save data in localStorage so the watchlist persists after refresh  

3. Movie Management  
- View movie details in a popup for better focus on selected content  
- Update movie titles directly to allow quick edits  
- Delete movies from the watchlist to keep it organized  

4. UI  
- Responsive layout to support different screen sizes  
- Hero section to give structure and a clear entry point to the app  
- Movie cards to display content in a consistent and reusable way  
- Simple design to keep the focus on functionality  

____

## Tech Stack  

- React (useState, useEffect)  
   I used it to manage application state and handle side effects like API calls  

- OMDb API (external API)  
   I used it to fetch movie data instead of building a custom backend  

- CSS  
   I used it for styling and layout  

- Local Storage  
   I used it to persist the watchlist across browser sessions  

____

## Run Locally  

1. Clone the repository:  
https://github.com/Dinelegacy/Vellum.git  

2. Navigate into the project folder:  
cd Vellum/my-app  

3. Install dependencies:  
npm install  

4. Start the application:  
npm start  

5. Open in browser:  
http://localhost:3000  

____

## Notes  

- This project uses the OMDb API, so an internet connection is required  
- No API setup is needed to run the project  
- Some movies may not have poster images available  
- Custom movies use a fallback image when no poster is available  

____

## Challenges  

One challenge I faced was handling movies that don’t have poster images from the API.  
To avoid broken UI, I added a fallback image so the app still displays correctly.

Another challenge was managing different data types when adding movies (API results vs custom entries).  
I handled this by normalizing the data before storing it in the watchlist to keep everything consistent.

____

## Summary  

This project demonstrates building a React application that integrates with an external API, manages user data, and maintains state across sessions using localStorage. I focused on keeping the structure clean, components reusable, and the user experience simple.