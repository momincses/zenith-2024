import React, { useState } from "react";
import { TextField, Button, CircularProgress, Snackbar } from "@mui/material";
import { auth } from "../../../firebase"; // Import auth from firebase.js
import styles from "./LoginSignupForm.module.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { db } from "../../../firebase"; // Import Firestore
import { doc, setDoc } from "firebase/firestore"; // Firestore methods


const LoginSignupForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [nameError, setNameError] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openAccountExistsSnackbar, setOpenAccountExistsSnackbar] =
    useState(false);
  const [openLoginSnackbar, setOpenLoginSnackbar] = useState(false);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    clearErrors();
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setNameError("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;
    if (!email) {
      setEmailError("Please enter your email.");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter your password.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      hasError = true;
    }

    if (hasError) return;

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged in:", userCredential.user);
        setLoading(false);
        setOpenLoginSnackbar(true); // Show login success Snackbar
      })
      .catch((error) => {
        console.error("Error signing in:", error.message);
        setLoading(false);
        setPasswordError("Invalid email or password.");
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    clearErrors();
  
    let hasError = false;
    if (!name) {
      setNameError("Please enter your name.");
      hasError = true;
    }
  
    if (!email) {
      setEmailError("Please enter your email.");
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid email format.");
      hasError = true;
    }
  
    if (!password) {
      setPasswordError("Please enter your password.");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      hasError = true;
    }
  
    if (!confirmPassword) {
      setConfirmPasswordError("Please confirm your password.");
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      hasError = true;
    }
  
    if (hasError) return;
  
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date().toISOString(),
      });
  
      console.log("Signed up and user data saved:", user);
      setLoading(false);
      setOpenSnackbar(true);
      setIsLogin(true);
    } catch (error) {
      console.error("Error signing up:", error.message);
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setOpenAccountExistsSnackbar(true);
      } else {
        setEmailError("Error during signup. Please try again.");
      }
    }
  };
  

  return (
    <>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div
            className={`${styles.slider} ${
              isLogin ? styles.showLogin : styles.showSignup
            }`}
          >
            <div className={styles.formContent}>
              <h1>Login to Your Zenith Account</h1>
              <form className={styles.form} onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <Button
                  variant="contained"
                  fullWidth
                  className={styles.submitButton}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </div>

            <div className={styles.formContent}>
              <h1>Sign Up to Join Zenith</h1>
              <form className={styles.form} onSubmit={handleSignup}>
                <TextField
                  label="Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className={styles.input}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={!!nameError}
                  helperText={nameError}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={!!emailError}
                  helperText={emailError}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  className={styles.input}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                />
                <TextField
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  className={styles.input}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!confirmPasswordError}
                  helperText={confirmPasswordError}
                />
                <Button
                  variant="contained"
                  fullWidth
                  className={styles.submitButton}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </div>
          </div>
          <p className={styles.toggleText}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <span className={styles.toggleButton} onClick={handleToggle}>
              {isLogin ? " Sign Up" : " Login"}
            </span>
          </p>
        </div>
      </div>
      {/* Snackbar for Signup Success */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message="Signup successful! Now you can log in."
      />
      {/* Snackbar for Account Already Exists */}
      <Snackbar
        open={openAccountExistsSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenAccountExistsSnackbar(false)}
        message="Account already exists. Please log in instead."
        action={
          <Button
            color="inherit"
            size="small"
            onClick={() => {
              setIsLogin(true);
              setOpenAccountExistsSnackbar(false);
            }}
          >
            Login
          </Button>
        }
      />
      {/* Snackbar for Login Success */}
      <Snackbar
        open={openLoginSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenLoginSnackbar(false)}
        message="Logged in successfully!"
        sx={{
          '& .MuiSnackbarContent-root': {
            minHeight: '100px',
            alignItems: 'flex-start',

          },
        }}
        />
    </>
  );
};

export default LoginSignupForm;
