import { Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import useUpdateMutation from "../httpRequests/auth/useUpdateMutation";
import { useSelector } from "react-redux"
import { toast } from "react-toastify";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  const { updateMutation, isLoading, error } = useUpdateMutation();

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)

  }, [user.setName, user.setEmail])
  

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return
    }

    if (error) { 
      toast.error(error?.error)
      return
      
    }else {

      await updateMutation(user._id, name, email, password)
      toast.success('Account profile successfully updated.')
    }
 
  };

  return (
    <Box
      padding="2rem"
      bgcolor="#fff"
      borderRadius="4px"
      boxShadow="1px 1 px 4px rgba(0,0,0,0.4)"
      maxWidth="450px"
      margin="5rem auto"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb="1rem"
      >
        <Typography variant="h6" color="primary">
          UPDATE PROFILE
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
          label="Change password"
          variant="outlined"
          fullWidth
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <TextField
          label="Confirm password"
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
        <Button type="submit" variant="contained">
          UPDATE
        </Button>

      </Box>
    </Box>
  );
};
export default Update;
