import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Grid,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Share as ShareIcon,
  Movie as MovieIcon,
  Star as StarIcon,
  List as ListIcon,
  Search as SearchIcon,
  CheckCircle as CheckIcon,
  Computer as DesktopIcon,
  AttachMoney as DollarSignIcon,
} from "@mui/icons-material";
import { tierListAPI } from "../services/api";

const HomePage = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [tierListName, setTierListName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateTierList = async () => {
    if (!tierListName.trim()) return;

    setLoading(true);
    try {
      const newTierList = await tierListAPI.create(tierListName.trim());
      navigate(`/tierlist/${newTierList._id}`);
    } catch (error) {
      console.error("Error creating tier list:", error);
      alert("Failed to create tier list. Please try again.");
    } finally {
      setLoading(false);
      setOpen(false);
      setTierListName("");
    }
  };

  // Show loading spinner centered on the page
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <CircularProgress />
    </div>;
  }

  const handleCloseDialog = () => {
    setOpen(false);
    setTierListName("");
  };

  const handleCreateTierListFromInfo = () => {
    setOpen(true);
  };

  const features = [
    {
      icon: <MovieIcon sx={{ fontSize: 40, color: "#3b82f6" }} />,
      title: "Movie Search & Discovery",
      description:
        "Search through thousands of movies using our powerful search engine. Find your favorite films instantly and add them to your tier list.",
      cta: "Start Searching",
    },
    {
      icon: <StarIcon sx={{ fontSize: 40, color: "#f59e0b" }} />,
      title: "Custom Tier Rankings",
      description:
        "Create personalized tier lists from S-Tier to F-Tier. Organize your movies exactly how you want with drag-and-drop functionality.",
      cta: "Create Your Tiers",
    },
    {
      icon: <ListIcon sx={{ fontSize: 40, color: "#10b981" }} />,
      title: "Watchlist Management",
      description:
        "Keep track of movies you want to watch and movies you've already seen. Never lose track of your movie journey again.",
      cta: "Manage Watchlist",
    },
    {
      icon: <ShareIcon sx={{ fontSize: 40, color: "#8b5cf6" }} />,
      title: "Share & Collaborate",
      description:
        "Share your tier lists with friends and family. Get their opinions and discover new movies through their recommendations.",
      cta: "Share Your List",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Create Your Tier List",
      description:
        "Give your tier list a name and start organizing your movie preferences.",
      icon: <AddIcon sx={{ fontSize: 30, color: "#3b82f6" }} />,
    },
    {
      step: "2",
      title: "Search & Add Movies",
      description:
        "Use our search feature to find movies and add them to your watchlist or specific tiers.",
      icon: <SearchIcon sx={{ fontSize: 30, color: "#10b981" }} />,
    },
    {
      step: "3",
      title: "Organize & Rank",
      description:
        "Rank movies into tiers to decide where they stand in your movie universe.",
      icon: <StarIcon sx={{ fontSize: 30, color: "#f59e0b" }} />,
    },
    {
      step: "4",
      title: "Share Your List",
      description:
        "Share your tier list with others and discover what they think about your rankings.",
      icon: <ShareIcon sx={{ fontSize: 30, color: "#8b5cf6" }} />,
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#111827" }}>
      <div>
        {/* Hero Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            padding: { xs: 4, md: 8 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "white",
              fontWeight: "bold",
              marginBottom: 2,
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Organize Your Movie Universe
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: 4,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            Create, rank, and share your movie preferences with beautiful tier
            lists
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleCreateTierListFromInfo}
            sx={{
              backgroundColor: "rgb(255, 255, 255)",
              "&:hover": { backgroundColor: "#2563eb" },
              px: 4,
              py: 2,
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            Start Creating Now
          </Button>
        </Box>

        {/* Features Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              color: "white",
              textAlign: "center",
              marginBottom: 6,
              fontWeight: "bold",
            }}
          >
            Powerful Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card
                  sx={{
                    backgroundColor: "#1f2937",
                    color: "white",
                    height: "100%",
                    border: "1px solid #374151",
                    "&:hover": {
                      borderColor: "#3b82f6",
                      transform: "translateY(-4px)",
                      transition: "all 0.3s ease",
                    },
                  }}
                >
                  <CardContent
                    sx={{
                      padding: 4,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box className="flex items-center mb-4">
                      {feature.icon}
                      <Typography
                        variant="h5"
                        component="h3"
                        sx={{
                          color: "white",
                          marginLeft: 2,
                          fontWeight: "bold",
                        }}
                      >
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#9ca3af",
                        marginBottom: 3,
                        flexGrow: 1,
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={handleCreateTierListFromInfo}
                      sx={{
                        borderColor: "#3b82f6",
                        color: "#3b82f6",
                        "&:hover": {
                          borderColor: "#2563eb",
                          backgroundColor: "rgba(59, 130, 246, 0.1)",
                        },
                        alignSelf: "flex-start",
                      }}
                    >
                      {feature.cta}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* How It Works Section */}
        <Box sx={{ backgroundColor: "#1f2937", py: 8 }}>
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: "white",
                textAlign: "center",
                marginBottom: 6,
                fontWeight: "bold",
              }}
            >
              How It Works
            </Typography>
            <Grid container spacing={4}>
              {steps.map((step, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box sx={{ textAlign: "center" }}>
                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        backgroundColor: "#374151",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 2rem",
                        border: "3px solid #3b82f6",
                      }}
                    >
                      {step.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      component="h3"
                      sx={{
                        color: "white",
                        marginBottom: 2,
                        fontWeight: "bold",
                      }}
                    >
                      {step.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#9ca3af",
                        lineHeight: 1.6,
                      }}
                    >
                      {step.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Benefits Section */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              color: "white",
              textAlign: "center",
              marginBottom: 6,
              fontWeight: "bold",
            }}
          >
            Why Choose Movie Tier List?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <DollarSignIcon
                  sx={{ fontSize: 60, color: "#3b82f6", marginBottom: 2 }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: 2, fontWeight: "bold" }}
                >
                  Free!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#9ca3af", lineHeight: 1.6 }}
                >
                  Enjoy everything we have to offer with no hidden fees or
                  subscription required.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <CheckIcon
                  sx={{ fontSize: 60, color: "#10b981", marginBottom: 2 }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: 2, fontWeight: "bold" }}
                >
                  Easy to Use
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#9ca3af", lineHeight: 1.6 }}
                >
                  Intuitive interface that makes organizing your movies simple
                  and enjoyable. No learning curve required.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: "center" }}>
                <DesktopIcon
                  sx={{ fontSize: 60, color: "#8b5cf6", marginBottom: 2 }}
                />
                <Typography
                  variant="h5"
                  sx={{ color: "white", marginBottom: 2, fontWeight: "bold" }}
                >
                  Cross-Platform
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#9ca3af", lineHeight: 1.6 }}
                >
                  Works seamlessly across desktop, tablet, and mobile devices.
                  Your lists sync everywhere.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* CTA Section */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
            padding: { xs: 4, md: 8 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            component="h2"
            sx={{
              color: "white",
              marginBottom: 2,
              fontWeight: "bold",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Ready to Start?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              marginBottom: 4,
              fontSize: { xs: "1.1rem", md: "1.5rem" },
            }}
          >
            Create your first tier list and discover your movie preferences
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={handleCreateTierListFromInfo}
              sx={{
                backgroundColor: "white",
                color: "#1f2937",
                "&:hover": { backgroundColor: "#f3f4f6" },
                px: 4,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: "bold",
              }}
            >
              Create Your Tier List
            </Button>
          </Box>
        </Box>
      </div>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "#1f2937",
            color: "white",
          },
        }}
      >
        <DialogTitle sx={{ color: "white" }}>Create New Tier List</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tier List Name"
            fullWidth
            variant="outlined"
            value={tierListName}
            onChange={(e) => setTierListName(e.target.value)}
            placeholder="Enter a name for your tier list"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateTierList();
              }
            }}
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
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
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
            onClick={handleCreateTierList}
            variant="contained"
            disabled={!tierListName.trim() || loading}
            sx={{
              backgroundColor: "#3b82f6",
              "&:hover": {
                backgroundColor: "#2563eb",
              },
              "&:disabled": {
                backgroundColor: "#374151",
                color: "#6b7280",
              },
            }}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HomePage;
