import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useParams,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  TextField,
  Box,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Home as HomeIcon,
  Share as ShareIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import "./App.css";
import HomePage from "./pages/HomePage";
import TierListPage from "./pages/TierListPage";
import { tierListAPI } from "./services/api";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3b82f6",
    },
    secondary: {
      main: "#ef4444",
    },
    background: {
      default: "#111827",
      paper: "#1f2937",
    },
  },
});

function GlobalAppBar({ tierList, onTierListUpdate }) {
  const location = useLocation();
  const isTierListPage = location.pathname.startsWith("/tierlist/");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setSnackbar({
          open: true,
          message: "Link copied to clipboard!",
          severity: "success",
        });
      })
      .catch(() => {
        setSnackbar({
          open: true,
          message: "Failed to copy link",
          severity: "error",
        });
      });
  };

  const handleTitleChange = (event) => {
    const newName = event.target.value;
    if (onTierListUpdate) {
      onTierListUpdate({ name: newName });
    }
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSubmit = () => {
    setIsEditingTitle(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1f2937" }}>
      <Toolbar className="justify-between">
        <IconButton
          edge="start"
          color="inherit"
          onClick={() => (window.location.href = "/")}
        >
          <HomeIcon />
        </IconButton>

        <div className="flex-1 flex justify-center">
          {isTierListPage && tierList ? (
            <Box className="flex items-center gap-2">
              {isEditingTitle ? (
                <Box className="flex items-center gap-2">
                  <TextField
                    variant="standard"
                    value={tierList.name}
                    onChange={handleTitleChange}
                    autoFocus
                    sx={{ width: "25%" }}
                    InputProps={{
                      style: {
                        color: "white",
                        fontSize: "1.25rem",
                        fontWeight: "bold",
                      },
                      disableUnderline: true,
                    }}
                  />
                  <IconButton size="small" onClick={handleTitleSubmit}>
                    <SaveIcon
                      fontSize="small"
                      className="text-white hover:text-gray-400"
                    />
                  </IconButton>
                </Box>
              ) : (
                <>
                  <Typography
                    variant="h6"
                    component="div"
                    className="font-bold"
                  >
                    {tierList.name}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleEditTitle}
                    className="text-white hover:text-gray-200"
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </>
              )}
            </Box>
          ) : (
            <Typography variant="h6" component="div">
              Movie Tier List
            </Typography>
          )}
        </div>

        <div className="flex items-center">
          {isTierListPage && (
            <Button
              color="inherit"
              startIcon={<ShareIcon />}
              onClick={handleShare}
            >
              Share
            </Button>
          )}
        </div>
      </Toolbar>
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
    </AppBar>
  );
}

function TierListWrapper() {
  const { id } = useParams();
  const [tierList, setTierList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTierList();
    // eslint-disable-next-line
  }, [id]);

  const loadTierList = async () => {
    try {
      const data = await tierListAPI.get(id);
      setTierList(data);
    } catch (error) {
      console.error("Error loading tier list:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTierListUpdate = async (updateData) => {
    try {
      const updatedTierList = await tierListAPI.update(id, updateData);
      setTierList(updatedTierList);
    } catch (error) {
      console.error("Failed to update tier list:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <GlobalAppBar
        tierList={tierList}
        onTierListUpdate={handleTierListUpdate}
      />
      <TierListPage tierList={tierList} setTierList={setTierList} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="min-h-screen" style={{ backgroundColor: "#111827" }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <GlobalAppBar />
                  <HomePage />
                </>
              }
            />
            <Route path="/tierlist/:id" element={<TierListWrapper />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
