import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles/";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { authMiddleWare } from "../utils/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10,
  },
  progess: {
    position: "absolute",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    errors: [],
    loading: false,
  });

  const handleChange = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLogin({ loading: true });
    authMiddleWare(history);
    const userData = {
      email: login.email,
      password: login.password,
    };
    axios
      .post("/login", userData)
      .then((response) => {
        localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
        setLogin({
          loading: false,
        });
        history.push("/profile");
        window.location.reload();
      })
      .catch((error) => {
        setLogin({
          errors: error.response.data,
          loading: false,
        });
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">Login</Typography>
          <form className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              //id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              //id="password"
              //autoComplete="current-password"
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
              disabled={login.loading || !login.email || !login.password}
            >
              {login.loading && (
                <CircularProgress size={30} className={classes.progess} />
              )}
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            {login.errors && (
              <Typography variant="body2" className={classes.customError}>
                {login.errors}
              </Typography>
            )}
          </form>
        </div>
      </Container>
    </>
  );
};

export default Login;
