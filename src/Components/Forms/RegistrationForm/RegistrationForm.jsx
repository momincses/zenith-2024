import React, { useState } from "react";
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
} from "@mui/material";
import { db } from "../../../firebase"; // Import Firebase configuration
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

          {/* <TextField fullWidth margin="normal" label="Registration Date" name="date" type="date" value={formData.date} disabled /> */}

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
    </Container>
  );
};

export default RegistrationForm;
