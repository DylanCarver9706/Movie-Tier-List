import React from "react";
import { Paper, Typography, Box } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import MovieCard from "./MovieCard";

const TierSection = ({
  tier,
  movies,
  tierName,
  tierColor,
  onMoveToTier,
  onDeleteMovie,
  showAddButton,
  onAddClick,
}) => {
  // Determine if this is a watchlist section (To Be Watched or Watched)
  const isWatchlistSection = tier === "toBeWatched" || tier === "watched";
  return (
    <Paper
      elevation={2}
      className="mb-4 min-h-32 border-l-4 transition-colors duration-200"
      style={{
        borderLeftColor: tierColor,
        backgroundColor: "#1f2937", // Dark gray background
        color: "white",
      }}
    >
      <Box className="p-4">
        <Typography
          variant="h6"
          className="font-bold mb-3"
          style={{ color: tierColor }}
        >
          {tierName}
        </Typography>

        <div
          className={`min-h-24 gap-2 p-2 rounded ${
            isWatchlistSection ? "grid grid-cols-2" : "flex flex-wrap"
          }`}
        >
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbId}
              movie={movie}
              onMoveToTier={onMoveToTier}
              onDelete={onDeleteMovie}
            />
          ))}
          {showAddButton && (
            <div
              className="flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg hover:border-gray-400 transition-colors cursor-pointer"
              style={{
                width: "120px",
                height: "200px",
                backgroundColor: "#374151", // Dark gray background
                color: "white",
                marginTop: "10px",
                marginLeft: "8px",
              }}
              onClick={onAddClick}
            >
              <AddIcon fontSize="large" className="text-gray-300" />
            </div>
          )}
        </div>
      </Box>
    </Paper>
  );
};

export default TierSection;
