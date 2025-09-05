const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const {
  initializeCollections,
  collections,
} = require("./database/mongoCollections");
const {
  createMongoDocument,
  updateMongoDocument,
} = require("./database/middlewares/mongo");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database and start server
const startServer = async () => {
  try {
    await initializeCollections();
    console.log("Server Ready");

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();

// Simple request logging - only method and route
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes

// Create a new tier list
app.post("/api/tierlists", async (req, res) => {
  try {
    const tierListData = {
      name: req.body.name || "My Tier List",
      toBeWatched: [],
      watched: [],
      tierList: {
        S: [],
        A: [],
        B: [],
        C: [],
        D: [],
        F: [],
      },
    };

    const result = await createMongoDocument(
      collections.termsCollection,
      tierListData,
      true // returnDocument = true
    );

    res.json(result);
  } catch (error) {
    console.error("Error creating tier list:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get a tier list by ID
app.get("/api/tierlists/:id", async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");
    const tierList = await collections.termsCollection.findOne({
      _id: ObjectId.createFromHexString(req.params.id),
    });

    if (!tierList) {
      return res.status(404).json({ error: "Tier list not found" });
    }

    res.json(tierList);
  } catch (error) {
    console.error("Error fetching tier list:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update a tier list
app.put("/api/tierlists/:id", async (req, res) => {
  try {
    let updateData = {
      $set: req.body,
    };

    // delete the _id from the update data
    delete updateData.$set._id;

    const result = await updateMongoDocument(
      collections.termsCollection,
      req.params.id,
      updateData,
      true // returnUpdatedDocument = true
    );

    if (!result) {
      return res.status(404).json({ error: "Tier list not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error updating tier list:", error);
    res.status(500).json({ error: error.message });
  }
});

// Search movies via OMDB API
app.post("/api/movies/search", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${
        process.env.OMDB_API_KEY
      }&s=${encodeURIComponent(query)}&type=movie`
    );

    if (response.data.Response === "False") {
      return res.json({ movies: [] });
    }

    const movies = response.data.Search.map((movie) => ({
      imdbId: movie.imdbID,
      title: movie.Title,
      posterUrl: movie.Poster !== "N/A" ? movie.Poster : "",
      year: movie.Year,
    }));

    res.json({ movies });
  } catch (error) {
    console.error("OMDB API error:", error);
    res.status(500).json({ error: "Failed to search movies" });
  }
});

// Add movie to tier list's toBeWatched array
app.post("/api/tierlists/:id/movies", async (req, res) => {
  try {
    const { movie } = req.body;

    if (!movie || !movie.imdbId || !movie.title) {
      return res.status(400).json({ error: "Movie data is required" });
    }

    const updateData = {
      $push: {
        toBeWatched: movie,
      },
    };

    const result = await updateMongoDocument(
      collections.termsCollection,
      req.params.id,
      updateData,
      true // returnUpdatedDocument = true
    );

    if (!result) {
      return res.status(404).json({ error: "Tier list not found" });
    }

    res.json(result);
  } catch (error) {
    console.error("Error adding movie to tier list:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get movie details by IMDB ID
app.get("/api/movies/:imdbId", async (req, res) => {
  try {
    const apiKey = process.env.OMDB_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "OMDB API key not configured" });
    }

    const response = await axios.get(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${req.params.imdbId}`
    );

    if (response.data.Response === "False") {
      return res.status(404).json({ error: "Movie not found" });
    }

    const movie = {
      imdbId: response.data.imdbID,
      title: response.data.Title,
      posterUrl: response.data.Poster !== "N/A" ? response.data.Poster : "",
      year: response.data.Year,
    };

    res.json(movie);
  } catch (error) {
    console.error("OMDB API error:", error);
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});
