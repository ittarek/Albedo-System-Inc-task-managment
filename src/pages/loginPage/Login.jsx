import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  googleLogin,
  signIn,
  toggleLoading,
} from "../../redux/fetures/task/userSlice";
import Swal from "sweetalert2";
import { GoogleAuthProvider } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector(state => state.userSlice);
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    dispatch(
      signIn({
        email: data.get("email"),
        password: data.get("password"),
      })
    );

    navigate(from, { replace: true });
  };

  // login with google
  const handleGoogleLogin = () => {
    dispatch(googleLogin());

    navigate(from, { replace: true });


  
      
   
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />

        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
           
            <Grid item>
              Don,t have an account?{" "}
              <Link to="/signup" variant="body2">
                {" "}
               <span className="underline text-yellow-600"> Sign Up</span>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>{" "}
      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, fontSize:24 }}
        
        onClick={handleGoogleLogin}
      >
        G
      </Button>
    </Container>
  );
};

export default Login;
