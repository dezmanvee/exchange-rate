import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useRegisterMutation from "../httpRequests/auth/useRegisterMutation";
import { toast } from "react-toastify";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const { registerMutation, error, isLoading } = useRegisterMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      await registerMutation(name, email, password);

      if (error) {
        toast.error(error.error);
      }
    }
  };

  return (
    <Box
      padding="2rem"
      bgcolor="#fff"
      borderRadius="4px"
      boxShadow="1px 1px 4px rgba(0,0,0,0.4)"
      maxWidth="450px"
      margin="5rem auto"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="1rem"
        flexWrap='wrap'
        gap='0.5rem'
      >
        <Typography variant="h6" color="primary">
          SIGN UP
        </Typography>
        <Typography variant="p" sx={{ fontSize: "12px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#1976D2", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Typography>
      </Box>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        width="100%"
        display="flex"
        alignSelf="start"
        flexDirection="column"
        gap="1rem"
        onSubmit={submitHandler}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          size="small"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          size="small"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          size="small"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {isLoading && (
          <Box sx={{ margin: "auto" }}>
            <CircularProgress />
          </Box>
        )}
        <Button type="submit" variant="contained" sx={{ mb: "1rem" }}>
          SIGN UP
        </Button>

        <div className="underline-container">
          <div className="underline-left" />
          <div className="underline">or login with</div>
          <div className="underline-right" />
        </div>

        <Typography sx={{ fontSize: "13px", color: "gray" }}>
          Should you choose not to share your personal information for testing
          purposes, feel free to explore the demo account available on the{" "}
          <span
            style={{ color: "#1976D2", cursor: "pointer", fontWeight: "700" }}
            onClick={() => navigate("/login")}
          >
            login
          </span>{" "}
          page.
        </Typography>
      </Box>
    </Box>
  );
};
export default SignUp;
