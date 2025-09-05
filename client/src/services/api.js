import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tier List API calls
export const tierListAPI = {
  // Create a new tier list
  create: async (name) => {
    const response = await api.post("/tierlists", { name });
    return response.data;
  },

  // Get a tier list by ID
  get: async (id) => {
    const response = await api.get(`/tierlists/${id}`);
    return response.data;
  },

  // Update a tier list
  update: async (id, data) => {
    const response = await api.put(`/tierlists/${id}`, data);
    return response.data;
  },
};

// Movie API calls
export const movieAPI = {
  // Search movies
  search: async (query) => {
    const response = await api.post("/movies/search", { query });
    return response.data;
  },

  // Get movie details by IMDB ID
  getDetails: async (imdbId) => {
    const response = await api.get(`/movies/${imdbId}`);
    return response.data;
  },

  // Add movie to tier list's toBeWatched array
  addToTierList: async (tierListId, movie) => {
    const response = await api.post(`/tierlists/${tierListId}/movies`, {
      movie,
    });
    return response.data;
  },
};

export default api;
