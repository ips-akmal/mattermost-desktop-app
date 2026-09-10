import { Box, TextField, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <Box sx={{minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
        <Box sx={{width: 400, display: "flex", flexDirection: "column", gap: 2}}>
            <Typography variant="h4">Register</Typography>
            <TextField label="Username" variant="outlined" fullWidth />
            <TextField label="Password" variant="outlined" type="password" fullWidth />
            <Button variant="contained" color="primary" fullWidth>Register</Button>
            <Button component={Link} to="/login" variant="outlined" color="secondary" fullWidth>Back to Login</Button>
        </Box>
    </Box>
  );
};

export default Register;