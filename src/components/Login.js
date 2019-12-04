// url: https://source.unsplash.com/random/?naturedogs,puppy
// backgroundImage: 'url(./img/Hundeurlaub-was-braucht-man.jpg)'
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignIn(props) {
  const classes = useStyles();
  const [input, setInput] = useState({})
  const history = useHistory()

  //I get all data from input 
  const handleChange = e => {
    setInput({
      ...input, // keep value of old fields that we already typed in
      [e.target.name]: e.target.value   // change value of the current typing field
    })
  }

  //fetch API backend and send data to database
  const signin = async(e) => {
    e.preventDefault()
    const resp = await fetch(process.env.REACT_APP_BURL + "/signin", {
      method: 'POST',
      headers: {
        "Content-type": 'application/json'
      },
      body: JSON.stringify(input) //Body contains user information (email/password)
    });
    if (resp.ok) { //if we got response
      const data = await resp.json() //get json data from response
      if (data.success) {
        // if it's logged in
        props.setUser(data.user)
        localStorage.setItem('token', data.token)
        history.push('/')
      }
      else {
        alert(data.message)
      }
    }
   
  }
 

return (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
        </Typography>
      <form className={classes.form} noValidate onChange={e => handleChange(e)} onSubmit={e => signin(e)}>
        <TextField
          variant="outlined"
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
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
          </Button>

        <Grid container justify="space-between">
          <Grid item>
            <a href="https://127.0.0.1:5000/login/facebook" variant="body2">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}

              >
                <i class="fab fa-facebook-square"></i> &nbsp; Facebook
            </Button>
            </a>
          </Grid>
          <Grid item >
            <Link href="#" variant="body2">
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                <i class="fab fa-google"></i> &nbsp; Google
            </Button>
            </Link>
          </Grid>

        </Grid>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>

        </Grid>

      </form>
    </div>
    <Box mt={8}>
      <Copyright />
    </Box>
  </Container>

);
}