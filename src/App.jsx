// import { Button, Typography, Box } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme  } from "@mui/material";
import Login from './pages/login'
import Register from './pages/Register'
import Home from './pages/Home'
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* Open login automatically at "/" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;