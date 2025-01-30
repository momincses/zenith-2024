import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Container,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { db } from "../../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const sportsList = [
  "Football",
  "Basketball",
  "Cricket",
  "Volleyball",
  "Badminton",
];

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    teamName: "",
    teamMembers: "",
    sport: "",
    agreeTerms: false,
    date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setOpenDialog(true);
      return;
    }
    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        timestamp: serverTimestamp(), // Firebase timestamp
      });
      alert("Registration Successful!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        college: "",
        teamName: "",
        teamMembers: "",
        sport: "",
        agreeTerms: false,
        date: new Date().toISOString().split("T")[0], // Reset date field
      });
    } catch (error) {
      console.error("Error saving registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: "20px 10px" }}>
        <Typography variant="h5" gutterBottom align="center">
          Zenith Sports Event Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth margin="normal" label="Full Name" name="name" value={formData.name} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="College Name" name="college" value={formData.college} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Team Name" name="teamName" value={formData.teamName} onChange={handleChange} required />
          <TextField fullWidth margin="normal" label="Number of Team Members" name="teamMembers" type="number" value={formData.teamMembers} onChange={handleChange} required />

          <FormControl fullWidth margin="normal">
            <InputLabel>Select Sport</InputLabel>
            <Select name="sport" value={formData.sport} onChange={handleChange} required>
              {sportsList.map((sport) => (
                <MenuItem key={sport} value={sport}>
                  {sport}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControlLabel
            control={<Checkbox name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required />}
            label="I agree to the terms and conditions"
          />

          <Box mt={2} textAlign="center">
            <Button type="submit" variant="contained" color="primary">
              Register
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Dialog for Not Logged In */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{"You are not logged in!"}</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Please log in to register for the event.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default RegistrationForm;
