import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { movieAPI } from "../services/api";
import MovieCard from "./MovieCard";

const MovieSearch = ({ onAddMovie, open, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    setSearchResults([]);
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError("");
    setHasSearched(true);
    try {
      const response = await movieAPI.search(searchQuery.trim());
      setSearchResults(response.movies || []);
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to search movies. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = (movie) => {
    onAddMovie(movie);
    setSearchQuery("");
    setSearchResults([]);
    onClose();
    setHasSearched(false);
  };

  const handleClose = () => {
    setSearchQuery("");
    setSearchResults([]);
    setError("");
    setHasSearched(false);
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: "#1f2937",
          color: "white",
        },
      }}
    >
      <DialogTitle sx={{ color: "white" }}>Search Movies</DialogTitle>
      <DialogContent sx={{ paddingTop: 4 }}>
        <Box className="mb-4" sx={{ marginTop: 2 }}>
          <TextField
            fullWidth
            label="Search for movies"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter movie title..."
            sx={{
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "#6b7280",
                },
                "&:hover fieldset": {
                  borderColor: "#9ca3af",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#3b82f6",
                },
              },
              "& .MuiInputLabel-root": {
                color: "#9ca3af",
                "&.Mui-focused": {
                  color: "#3b82f6",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <Button
                  onClick={handleSearch}
                  disabled={!searchQuery.trim() || loading}
                  sx={{
                    color: "white",
                    backgroundColor: "#374151",
                    "&:hover": {
                      backgroundColor: "#4b5563",
                    },
                    "&:disabled": {
                      backgroundColor: "#374151",
                      color: "#6b7280",
                    },
                  }}
                >
                  Search
                </Button>
              ),
            }}
          />
        </Box>

        {error && (
          <Typography color="error" className="mb-4" sx={{ color: "#ef4444" }}>
            {error}
          </Typography>
        )}

        {searchResults.length > 0 ? (
          <Box>
            <Typography variant="h6" className="mb-3" sx={{ color: "white" }}>
              Search Results
            </Typography>
            <Box className="flex flex-wrap gap-4">
              {searchResults.map((movie) => (
                <MovieCard
                  key={movie.imdbId}
                  movie={movie}
                  showMenu={false}
                  showTitle={true}
                  onClick={() => handleAddMovie(movie)}
                />
              ))}
            </Box>
          </Box>
        ) : loading && (
          <div className="flex items-center justify-center">
            <CircularProgress />
          </div>
        )}

        {searchResults.length === 0 && hasSearched && !loading && !error && (
          <Typography className="text-center py-8" sx={{ color: "#9ca3af" }}>
            No movies found. Try a different search term.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          sx={{
            color: "white",
            backgroundColor: "#374151",
            "&:hover": {
              backgroundColor: "#4b5563",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MovieSearch;
