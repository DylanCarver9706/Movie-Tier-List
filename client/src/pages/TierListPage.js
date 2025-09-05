import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Snackbar, Alert, Button, Box } from "@mui/material";
import { tierListAPI } from "../services/api";
import TierSection from "../components/TierSection";
import MovieSearch from "../components/MovieSearch";

const TierListPage = ({ tierList, setTierList }) => {
  const { id } = useParams();
  const [searchOpen, setSearchOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [mobileView, setMobileView] = useState("tierList"); // "tierList", "watched", "toBeWatched"
  const [targetTier, setTargetTier] = useState("toBeWatched"); // Track which tier to add movies to

  const tierConfig = {
    S: { name: "S Tier", color: "#ff807d" },
    A: { name: "A Tier", color: "#febe80" },
    B: { name: "B Tier", color: "#fdfe7e" },
    C: { name: "C Tier", color: "#7eff7e" },
    D: { name: "D Tier", color: "#7fbcfd" },
    F: { name: "F Tier", color: "#f17ef6" },
  };

  const updateTierList = async (updatedData) => {
    try {
      const updated = await tierListAPI.update(id, updatedData);
      setTierList(updated);
    } catch (error) {
      console.error("Error updating tier list:", error);
      setSnackbar({
        open: true,
        message: "Failed to update tier list",
        severity: "error",
      });
    }
  };

  const handleAddMovie = async (movie) => {
    try {
      // Create updated tier list with movie added to the target tier
      let newTierList = { ...tierList };

      if (targetTier === "toBeWatched") {
        newTierList.toBeWatched = [...newTierList.toBeWatched, movie];
      } else if (targetTier === "watched") {
        newTierList.watched = [...newTierList.watched, movie];
      } else {
        // For tier letters (S, A, B, C, D, F)
        newTierList.tierList[targetTier] = [
          ...newTierList.tierList[targetTier],
          movie,
        ];
      }

      // Update state and database
      setTierList(newTierList);
      await updateTierList(newTierList);

      setSnackbar({
        open: true,
        message: `Movie added to ${
          targetTier === "toBeWatched"
            ? "To Be Watched"
            : targetTier === "watched"
            ? "Watched"
            : targetTier + " Tier"
        }`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error adding movie:", error);
      setSnackbar({
        open: true,
        message: "Failed to add movie",
        severity: "error",
      });
    }
  };

  const handleMoveToTier = async (movie, targetTier) => {
    try {
      // Find which container the movie is currently in
      let sourceContainer = null;
      if (tierList.toBeWatched.some((item) => item.imdbId === movie.imdbId)) {
        sourceContainer = "toBeWatched";
      } else if (
        tierList.watched.some((item) => item.imdbId === movie.imdbId)
      ) {
        sourceContainer = "watched";
      } else {
        for (const tier of Object.keys(tierList.tierList)) {
          if (
            tierList.tierList[tier].some((item) => item.imdbId === movie.imdbId)
          ) {
            sourceContainer = tier;
            break;
          }
        }
      }

      // Don't move if already in the target tier
      if (sourceContainer === targetTier) {
        return;
      }

      // Create updated tier list
      let newTierList = { ...tierList };

      // Remove from source container
      if (sourceContainer === "toBeWatched") {
        newTierList.toBeWatched = newTierList.toBeWatched.filter(
          (item) => item.imdbId !== movie.imdbId
        );
      } else if (sourceContainer === "watched") {
        newTierList.watched = newTierList.watched.filter(
          (item) => item.imdbId !== movie.imdbId
        );
      } else if (sourceContainer) {
        newTierList.tierList[sourceContainer] = newTierList.tierList[
          sourceContainer
        ].filter((item) => item.imdbId !== movie.imdbId);
      }

      // Add to target container
      if (targetTier === "toBeWatched") {
        newTierList.toBeWatched = [...newTierList.toBeWatched, movie];
      } else if (targetTier === "watched") {
        newTierList.watched = [...newTierList.watched, movie];
      } else {
        newTierList.tierList[targetTier] = [
          ...newTierList.tierList[targetTier],
          movie,
        ];
      }

      // Update state and database
      setTierList(newTierList);
      await updateTierList(newTierList);

      setSnackbar({
        open: true,
        message: `Movie moved to ${
          targetTier === "toBeWatched"
            ? "To Be Watched"
            : targetTier === "watched"
            ? "Watched"
            : targetTier + " Tier"
        }`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error moving movie:", error);
      setSnackbar({
        open: true,
        message: "Failed to move movie",
        severity: "error",
      });
    }
  };

  const handleAddButtonClick = (tier) => {
    setTargetTier(tier);
    setSearchOpen(true);
  };

  const handleDeleteMovie = async (movie) => {
    try {
      // Find which container the movie is currently in
      let sourceContainer = null;
      if (tierList.toBeWatched.some((item) => item.imdbId === movie.imdbId)) {
        sourceContainer = "toBeWatched";
      } else if (
        tierList.watched.some((item) => item.imdbId === movie.imdbId)
      ) {
        sourceContainer = "watched";
      } else {
        for (const tier of Object.keys(tierList.tierList)) {
          if (
            tierList.tierList[tier].some((item) => item.imdbId === movie.imdbId)
          ) {
            sourceContainer = tier;
            break;
          }
        }
      }

      if (!sourceContainer) {
        console.error("Movie not found in any container");
        return;
      }

      // Create updated tier list
      let newTierList = { ...tierList };

      // Remove from source container
      if (sourceContainer === "toBeWatched") {
        newTierList.toBeWatched = newTierList.toBeWatched.filter(
          (item) => item.imdbId !== movie.imdbId
        );
      } else if (sourceContainer === "watched") {
        newTierList.watched = newTierList.watched.filter(
          (item) => item.imdbId !== movie.imdbId
        );
      } else {
        newTierList.tierList[sourceContainer] = newTierList.tierList[
          sourceContainer
        ].filter((item) => item.imdbId !== movie.imdbId);
      }

      // Update state and database
      setTierList(newTierList);
      await updateTierList(newTierList);

      setSnackbar({
        open: true,
        message: `"${movie.title}" has been deleted`,
        severity: "success",
      });
    } catch (error) {
      console.error("Error deleting movie:", error);
      setSnackbar({
        open: true,
        message: "Failed to delete movie",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (!tierList) {
    return (
      <div
        maxWidth="lg"
        className="min-h-screen flex items-center justify-center"
      >
        <Typography color="error">Tier list not found</Typography>
      </div>
    );
  }

  return (
    <>
      <div
        className="w-full px-4 py-8"
        style={{ backgroundColor: "#111827", minHeight: "100vh" }}
      >
        {/* Mobile Navigation - Only visible on mobile */}
        <div className="md:hidden mb-6">
          <Box className="flex gap-2 justify-center">
            <Button
              variant={mobileView === "tierList" ? "contained" : "outlined"}
              onClick={() => setMobileView("tierList")}
              className="text-xs"
              sx={{
                color: mobileView === "tierList" ? "white" : "#9ca3af",
                borderColor: "#6b7280",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor:
                    mobileView === "tierList"
                      ? "#374151"
                      : "rgba(107, 114, 128, 0.1)",
                },
              }}
            >
              Tier List
            </Button>
            <Button
              variant={mobileView === "toBeWatched" ? "contained" : "outlined"}
              onClick={() => setMobileView("toBeWatched")}
              className="text-xs"
              sx={{
                color: mobileView === "toBeWatched" ? "white" : "#9ca3af",
                borderColor: "#6b7280",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor:
                    mobileView === "toBeWatched"
                      ? "#374151"
                      : "rgba(107, 114, 128, 0.1)",
                },
              }}
            >
              To Be Watched
            </Button>
            <Button
              variant={mobileView === "watched" ? "contained" : "outlined"}
              onClick={() => setMobileView("watched")}
              className="text-xs"
              sx={{
                color: mobileView === "watched" ? "white" : "#9ca3af",
                borderColor: "#6b7280",
                "&:hover": {
                  borderColor: "#9ca3af",
                  backgroundColor:
                    mobileView === "watched"
                      ? "#374151"
                      : "rgba(107, 114, 128, 0.1)",
                },
              }}
            >
              Watched
            </Button>
          </Box>
        </div>

        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:flex gap-6 h-full">
          {/* Left Side - S-F Tier Lists */}
          <div className="flex-1 space-y-4">
            {Object.entries(tierConfig).map(([tier, config]) => (
              <TierSection
                key={tier}
                tier={tier}
                movies={tierList.tierList[tier]}
                tierName={config.name}
                tierColor={config.color}
                onMoveToTier={handleMoveToTier}
                onDeleteMovie={handleDeleteMovie}
              />
            ))}
          </div>

          {/* Right Side - Watchlist Column */}
          <div className="w-80 space-y-4">
            {/* To Be Watched Section */}
            <TierSection
              tier="toBeWatched"
              movies={tierList.toBeWatched}
              tierName="To Be Watched"
              tierColor="lightgrey"
              onMoveToTier={handleMoveToTier}
              onDeleteMovie={handleDeleteMovie}
              showAddButton={true}
              onAddClick={() => handleAddButtonClick("toBeWatched")}
            />

            {/* Watched Section */}
            <TierSection
              tier="watched"
              movies={tierList.watched}
              tierName="Watched"
              tierColor="#10b981"
              onMoveToTier={handleMoveToTier}
              onDeleteMovie={handleDeleteMovie}
              showAddButton={true}
              onAddClick={() => handleAddButtonClick("watched")}
            />
          </div>
        </div>

        {/* Mobile Layout - Only visible on mobile */}
        <div className="md:hidden space-y-4">
          {mobileView === "tierList" && (
            <div className="space-y-4">
              {Object.entries(tierConfig).map(([tier, config]) => (
                <TierSection
                  key={tier}
                  tier={tier}
                  movies={tierList.tierList[tier]}
                  tierName={config.name}
                  tierColor={config.color}
                  onMoveToTier={handleMoveToTier}
                  onDeleteMovie={handleDeleteMovie}
                />
              ))}
            </div>
          )}

          {mobileView === "toBeWatched" && (
            <TierSection
              tier="toBeWatched"
              movies={tierList.toBeWatched}
              tierName="To Be Watched"
              tierColor="lightgrey"
              onMoveToTier={handleMoveToTier}
              onDeleteMovie={handleDeleteMovie}
              showAddButton={true}
              onAddClick={() => handleAddButtonClick("toBeWatched")}
            />
          )}

          {mobileView === "watched" && (
            <TierSection
              tier="watched"
              movies={tierList.watched}
              tierName="Watched"
              tierColor="#10b981"
              onMoveToTier={handleMoveToTier}
              onDeleteMovie={handleDeleteMovie}
              showAddButton={true}
              onAddClick={() => handleAddButtonClick("watched")}
            />
          )}
        </div>
      </div>

      <MovieSearch
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddMovie={handleAddMovie}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TierListPage;
