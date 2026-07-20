# Movie App

A responsive movie discovery application built with React and Vite using data from The Movie Database (TMDb).

Users can browse movies by category, view individual movie details, and save favourite movies in the browser’s local storage.

## Project Overview

This project was created for **Web Scripting 3**.

The application includes the following pages:

* Home
* About
* Individual Movie Details
* My Favourites

The application follows a mobile-first approach and supports screen sizes between approximately 320px and 1980px.

## Features

### Movie Categories

Users can browse movies from the following TMDb categories:

* Popular
* Top Rated
* Now Playing
* Upcoming

The selected category is stored in the URL query string.

Examples:

```text
/?category=popular
/?category=top_rated
/?category=now_playing
/?category=upcoming
```

On the initial load, the Home page displays popular movies.

### Movie Details

Each movie has an individual details page that displays:

* Movie poster
* Movie title
* Release date
* Rating
* Plot summary
* Favourite or unfavourite button

A generic placeholder is displayed when a movie poster is unavailable.

### Favourites

Users can add and remove favourite movies.

Favourite movie data is stored using the browser’s `localStorage` API and is displayed on the My Favourites page.

If no favourite movies are stored, the application displays a message directing the user back to the Home page.

### Responsive Navigation

Navigation is available on every page and supports both mobile and desktop layouts.

## Technologies

* React
* Vite
* React Router
* Tailwind CSS
* JavaScript
* TMDb API
* Vercel Functions
* Browser Local Storage
* Git and GitHub

## TMDb API

This application uses the TMDb API to retrieve movie information.

The TMDb API access token is not included in the client-side React application. Instead, the frontend sends requests to server-side Vercel Functions.

```text
React application
      ↓
Vercel Function
      ↓
TMDb API
```

The Vercel Functions read the access token from a private server-side environment variable.

This prevents the token from being included in the client-side JavaScript bundle or exposed in the browser’s Network panel.

## Vercel API Endpoints

The application uses separate Vercel Functions for movie lists and individual movie details.

```text
api/
└── movies/
    ├── index.js
    └── [movieId].js
```

### Category Movies

```text
GET /api/movies?category=popular
```

Supported category values:

```text
popular
top_rated
now_playing
upcoming
```

## Local Development

Install the project dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The application will normally run at:

```text
http://localhost:5173
```

The frontend requests movie data using relative API paths:

```js
fetch("/api/movies?category=popular");
fetch("/api/movies/550");
```

## Team Members

* Sandy Lo
* Erimo Taniguchi
* Kaori Era

## Figma Design

https://www.figma.com/design/DaRovEylQ27MruGGTDAK0T/Erimo-Kaori-Sandy-prototype?node-id=135-4&t=c7oWgYrVQDfRo9lq-1

## Live Site (Staging)

https://bcit-movie-db-git-staging-kes-projects-3f83c4b4.vercel.app/

## GitHub Repository

https://github.com/k-e-r/bcit-movie-db
