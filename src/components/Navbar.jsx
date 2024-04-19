import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import useLogoutMutation from "../httpRequests/auth/useLogoutMutation";

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false)
  
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const { logoutMutation } = useLogoutMutation()


  //logout handler
  const logoutHandler = async () => {
    setOpenMenu(false) // close menu
    await logoutMutation() //http request to logout user
  }
  

  //update profile handler
  const profileUpdateHandler = () => {
    setOpenMenu(false) //close menu
    navigate('/profile')
  }

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", top: 0, left: 0, zIndex: 1 }}>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textTransform: "uppercase", cursor: "default" }}
            onClick={() => navigate('/')}
          >
            Currency Scale
          </Typography>
          {user && (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Typography sx={{mr: '2px', textTransform: 'capitalize'}}>{user.name}</Typography>
              <Tooltip title="View profile">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-haspopup="true"
                  onClick={() => setOpenMenu(true)}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
              <Menu
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMenu}
                onClose={() => setOpenMenu(false)}
              >
                <MenuItem onClick={ profileUpdateHandler }>Profile</MenuItem>
                <MenuItem onClick={logoutHandler}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {!user && (
            <Box display="flex" flexWrap="nowrap" gap="1rem">
              <Typography
                onClick={() => navigate("/login")}
                sx={{ textTransform: "uppercase", cursor: "pointer" }}
              >
                log in
              </Typography>
              <Typography
                onClick={() => navigate("/register")}
                sx={{ textTransform: "uppercase", cursor: "pointer" }}
              >
                sign up
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Navbar;
