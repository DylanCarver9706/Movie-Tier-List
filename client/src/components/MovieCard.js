import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import {
  SwapHoriz as MoveIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const MovieCard = ({
  movie,
  onMoveToTier,
  onDelete,
  showMenu = true,
  onClick,
  showTitle = true,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMoveToTier = (tier) => {
    onMoveToTier(movie, tier);
    handleClose();
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete) {
      onDelete(movie);
    }
    setDeleteDialogOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const tierOptions = [
    { id: "S", label: "S Tier", color: "#ff807d" },
    { id: "A", label: "A Tier", color: "#febe80" },
    { id: "B", label: "B Tier", color: "#fdfe7e" },
    { id: "C", label: "C Tier", color: "#7eff7e" },
    { id: "D", label: "D Tier", color: "#7fbcfd" },
    { id: "F", label: "F Tier", color: "#f17ef6" },
    { id: "toBeWatched", label: "To Be Watched", color: "lightgrey" },
    { id: "watched", label: "Watched", color: "#10b981" },
  ];

  return (
    <>
      <Card
        className="transition-all duration-200 hover:shadow-md cursor-pointer"
        onClick={onClick}
        sx={{
          width: 120,
          height: 205,
          margin: 1,
          backgroundColor: "white",
          position: "relative",
        }}
      >
        <CardMedia
          component="img"
          image={movie.posterUrl || "/api/placeholder/120/140"}
          alt={movie.title}
          sx={{
            objectFit: "cover",
            objectPosition: "top",
            width: "100%",
            height: "140px",
            minHeight: "140px",
            maxHeight: "140px",
          }}
          onError={(e) => {
            e.target.src =
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDEyMCAxNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTQwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA1MEg4MFY5MEg0MFY1MFoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2Zz4K";
          }}
        />
        {showTitle && (
          <CardContent
            sx={{
              padding: 1,
              height: 60,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <Typography
              variant="caption"
              component="div"
              className="text-xs font-medium text-gray-800"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                lineHeight: 1.2,
                marginBottom: 0,
                flex: 1,
                minHeight: 0,
                maxHeight: "2.4em", // 2 lines * 1.2 line-height
                wordBreak: "break-word",
                hyphens: "auto",
              }}
            >
              {movie.title}
            </Typography>
          </CardContent>
        )}

        {/* Year positioned absolutely at bottom of entire card */}
        {showTitle && (
          <Typography
            variant="caption"
            className="text-xs text-gray-500"
            sx={{
              position: "absolute",
              bottom: 4,
              left: 4,
              margin: 0,
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "1px 4px",
              borderRadius: "2px",
            }}
          >
            {movie.year}
          </Typography>
        )}

        {/* Action Icons - Only show if showMenu is true */}
        {showMenu && (
          <div
            style={{
              position: "absolute",
              bottom: 4,
              right: 4,
              display: "flex",
              gap: "2px",
            }}
          >
            <IconButton
              size="small"
              onClick={handleClick}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                width: "20px",
                height: "20px",
                minWidth: "20px",
                padding: 0,
              }}
            >
              <MoveIcon fontSize="small" sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={handleDeleteClick}
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
                width: "20px",
                height: "20px",
                minWidth: "20px",
                padding: 0,
              }}
            >
              <DeleteIcon fontSize="small" sx={{ color: "black" }} />
            </IconButton>
          </div>
        )}
      </Card>

      {/* Move Menu - Only show if showMenu is true */}
      {showMenu && (
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 300,
              width: 200,
            },
          }}
        >
          <MenuItem disabled></MenuItem>
          {tierOptions.map((tier) => (
            <MenuItem
              key={tier.id}
              onClick={() => handleMoveToTier(tier.id)}
              sx={{
                "&:hover": {
                  backgroundColor: `${tier.color}20`,
                },
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: tier.color,
                  borderRadius: "50%",
                  marginRight: 8,
                }}
              />
              {tier.label}
            </MenuItem>
          ))}
        </Menu>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        PaperProps={{
          sx: {
            backgroundColor: "#1f2937",
            color: "white",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Delete Movie</DialogTitle>
        <DialogContent>
          <Typography sx={{ color: "white" }}>
            Are you sure you want to delete "{movie.title}"? This action cannot
            be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDeleteCancel}
            sx={{
              color: "#9ca3af",
              "&:hover": {
                backgroundColor: "rgba(107, 114, 128, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            sx={{
              backgroundColor: "#ef4444",
              color: "white",
              "&:hover": {
                backgroundColor: "#dc2626",
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieCard;
