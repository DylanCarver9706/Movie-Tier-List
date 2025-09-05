# Movie Tier List App

A full-stack web application for creating and sharing movie tier lists. Built with React, Express.js, MongoDB, and Material-UI.

## Features

- 🎬 Create personalized movie tier lists
- 🔍 Search movies using the OMDB API
- 🎯 Drag & drop movies between tiers (S, A, B, C, D, F)
- 📝 Organize movies into "To Be Watched" and "Watched" sections
- 🔗 Share tier lists with shareable links
- 📱 Responsive design with Material-UI and TailwindCSS

## Tech Stack

### Frontend

- **React.js** - UI framework
- **Material-UI (MUI)** - Component library
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Beautiful DnD** - Drag and drop functionality

### Backend

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **Axios** - HTTP client for API calls

### External APIs

- **OMDB API** - Movie search and metadata

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- OMDB API key (free at [omdbapi.com](http://www.omdbapi.com/))

## Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Movie-Tier-List
   ```

2. **Install dependencies**

   ```bash
   npm run install-all
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server` directory:

   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/movie-tier-list
   OMDB_API_KEY=your_omdb_api_key_here
   ```

4. **Get an OMDB API key**
   - Visit [omdbapi.com](http://www.omdbapi.com/)
   - Sign up for a free account
   - Copy your API key to the `.env` file

## Running the Application

### Development Mode

```bash
npm run dev
```

This will start both the backend server (port 5000) and frontend development server (port 3000) concurrently.

### Individual Services

**Backend only:**

```bash
npm run server
```

**Frontend only:**

```bash
npm run client
```

## Usage

1. **Create a Tier List**

   - Visit the home page
   - Click "Create a Tier List"
   - Enter a name for your tier list

2. **Add Movies**

   - Click "Add Movie" button
   - Search for movies using the search bar
   - Click the "+" button on movies you want to add

3. **Organize Movies**

   - Drag movies between different sections:
     - **To Be Watched** - Movies you plan to watch
     - **Watched** - Movies you've already seen
     - **S, A, B, C, D, F Tiers** - Rank movies from best to worst

4. **Share Your List**
   - Click the "Share" button in the top navigation
   - The link will be copied to your clipboard
   - Share the link with others to view your tier list

## API Endpoints

### Tier Lists

- `POST /api/tierlists` - Create a new tier list
- `GET /api/tierlists/:id` - Get a tier list by ID
- `PUT /api/tierlists/:id` - Update a tier list

### Movies

- `POST /api/movies/search` - Search movies
- `GET /api/movies/:imdbId` - Get movie details by IMDB ID

## Database Schema

### TierList Collection

```javascript
{
  "_id": "ObjectId",
  "name": "My Tier List",
  "toBeWatched": [
    {
      "imdbId": "tt1234567",
      "title": "Movie Title",
      "posterUrl": "https://...",
      "year": "2023"
    }
  ],
  "watched": [
    {
      "imdbId": "tt2345678",
      "title": "Another Movie",
      "posterUrl": "https://...",
      "year": "2022"
    }
  ],
  "tierList": {
    "S": [],
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "F": []
  }
}
```

## Project Structure

```
Movie-Tier-List/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.js
│   └── package.json
├── server/                # Express backend
│   ├── index.js          # Server entry point
│   ├── package.json
│   └── env.example       # Environment variables template
├── package.json          # Root package.json
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [OMDB API](http://www.omdbapi.com/) for movie data
- [Material-UI](https://mui.com/) for beautiful components
- [React Beautiful DnD](https://github.com/atlassian/react-beautiful-dnd) for drag and drop functionality
