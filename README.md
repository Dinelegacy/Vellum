# VELLUM – Movie Watchlist App 🍿

VELLUM is a React project I built to help users find movies and manage a personal watchlist. It connects to the OMDb API to get real-time movie data and uses local storage so your list doesn't disappear when you refresh the page.
____

## What it does

- **Search for Movies:** You can look up any title using the search bar. I set it to show some "Batman" movies by default so the home screen isn't empty when you first open it.  
- **Personal Watchlist:** You can add movies from the search results to your favorites. It checks for duplicates so you don't add the same movie twice.  
- **Custom Entries:** I added a feature where you can manually type in a movie name to add it, even if it's not in the API.  
- **Edit & Delete:** If you change your mind, you can update the title of a movie in your list or remove it entirely.  
- **Persistent Data:** Everything is saved to localStorage, so your watchlist stays there even if you close the browser.  
____

## Tech I used

- **React:** Used `useState` for the movie data and `useEffect` to handle the API calls. I also used `useRef` to handle the smooth scrolling buttons in the hero section.  
- **OMDb API:** This is where all the movie data (titles, posters, IDs) comes from.  
- **CSS:** All the styling is custom to give it a "cinematic" feel with the dark theme.  
____

## How to run it

1. Clone the repo: `git clone https://github.com`  
2. Go into the folder: `cd Vellum/my-app`  
3. Install everything: `npm install`  
4. Run it: `npm start`  
5. Check it out at [http://localhost:3000](http://localhost:3000)  
____

## Challenges I faced

- The biggest issue I had was with the movie posters. Some movies in the OMDb database don't have images (they return "N/A"), which broke my layout. I had to write a utility function to check for this and swap in a placeholder image so the cards didn't look empty.  
- Another tricky part was normalizing the data. Because I'm allowing both API results and "custom" manual entries, the data objects looked different. I had to make sure they both used the same property names (like `title` and `poster`) before saving them to the favorites state so the app wouldn't crash when trying to read them.