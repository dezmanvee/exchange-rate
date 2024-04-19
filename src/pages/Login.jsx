import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import CopyToClipboardButton from "../components/CopyToClipboardButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLoginMutation from "../httpRequests/auth/useLoginMutation";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loginMutation, error, isLoading } = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    //Http Request
    await loginMutation(email, password);

    //display error to user
    if (error) {
      toast.error(error.error);
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
          LOG IN
        </Typography>
        <Typography variant="p" sx={{ fontSize: "12px" }}>
          or{" "}
          <span style={{ color: "#1976D2", cursor: "pointer" }}  onClick={() => navigate('/register')}>
            Create an account
          </span>
        </Typography>
      </Box>
      <Box
        onSubmit={submitHandler}
        component="form"
        noValidate
        autoComplete="off"
        width="100%"
        display="flex"
        alignSelf="start"
        flexDirection="column"
        gap="1rem"
      >
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          size="small"
          type="email"
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

        {isLoading && (
          <Box sx={{ margin: 'auto' }}>
            <CircularProgress />
          </Box>
        )}
        <Button type="submit" variant="contained" sx={{mb: '1rem'}}>
          LOG IN
        </Button>

        <div className="underline-container">
          <div className="underline-left" />
          <div className="underline">or use demo account</div>
          <div className="underline-right" />
        </div>

        <Typography
            sx={{
              fontSize: "13px",
              fontWeight: "700",
              mt: '1rem',
              mb: '0.5rem',
              color: '#1976D2',
            }}
          >
            Demo Account:
          </Typography>
        <Box
          display='flex'
          justifyContent='start'
          alignItems='start'
          flexDirection='column'
          >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            gap="1rem"
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700", color: "gray" }}
            >
              Email:{" "}
              <span style={{ color: "gray", fontWeight: "500" }}>
                test@example.com
              </span>
            </Typography>
            <CopyToClipboardButton text="test@example.com" />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="start"
            gap="1rem"
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700", color: "gray" }}
            >
              Password:{" "}
              <span style={{ color: "gray", fontWeight: "500" }}>Test234#</span>
            </Typography>
            <CopyToClipboardButton text="Test234#" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Login;
