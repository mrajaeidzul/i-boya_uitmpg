import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  TextField,
  Button,
  withStyles,
  Paper,
  Grid,
  Typography,
  Snackbar,
  CircularProgress,
} from '@material-ui/core'
import { compose } from 'recompose'
import { withTracker } from 'meteor/react-meteor-data'

import { styles } from '../../style/login'

const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    size={20}
  />
))

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      open: false,
      vertical: 'top',
      horizontal: 'center',
      error: '',
    }

    this.baseState = this.state
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }
  handleClose = () => {
    this.setState({ open: false })
    this.setState(this.baseState)

  }

  handleReset = () => {
    this.setState(this.baseState)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState({ completed: true })

    let username = this.state.username.trim()
    let password = this.state.password.trim()

    Meteor.loginWithPassword({ username }, password, (error) => {
      console.log('Login callback', error)
      if (error) {
        this.setState({ open: true })
        this.setState({ error: error.reason })
      }
    })
  }

  render() {
    const { classes } = this.props
    //const { from } = this.props.location.state || { from: { pathname: "/main" } };
    const { triggerRedirect, open, error, vertical, horizontal, completed } = this.state

    if (this.props.loggedIn) {
      return <Redirect to={"/main"} />
    }

    return (
      <div>
        <Grid container className={classes.root}>
          <Grid item xs={12}>
            <Grid
              container
              spacing={8}
              alignItems='center'
              justify='center'
            >
              <Paper className={classes.paper}>
                <Typography variant="display1" gutterBottom className={classes.text}>
                  Sistem Pengurusan Latihan
                </Typography>
                <Typography variant="display1" gutterBottom className={classes.text}>
                  UiTM Caw. Johor Kampus Pasir Gudang
                </Typography>
                <form onSubmit={this.handleSubmit}>
                  <div className={classes.div}>
                    <TextField
                      required
                      id="username"
                      label="Login ID"
                      className={classes.textField}
                      value={this.state.username}
                      onChange={this.handleChange('username')}
                      margin="normal"
                    />
                    <TextField
                      required
                      id="password"
                      label="Kata Laluan"
                      type="password"
                      className={classes.textField}
                      value={this.state.password}
                      onChange={this.handleChange('password')}
                      margin="normal"
                    />
                  </div>
                  <div className={classes.div}>
                    <Button
                      type="submit"
                      variant="contained"
                      className={classes.button}
                    >
                      Login
                      <span className={classes.progress}>{completed && (
                        <SpinnerAdornment />
                      )}</span>
                  </Button>
                  <Button
                      onClick={this.handleReset}
                      variant="contained"
                      className={classes.button}
                    >
                      Reset
                  </Button>
                  </div>
                </form>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  onClose={this.handleClose}
                  ContentProps={{
                    'aria-describedby': 'message-id',
                  }}
                  message={<span id="message-id">{error}</span>}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default compose (
  withTracker(() => {
    if(!!Meteor.user()) {
      loggedIn = true
    } else {
      loggedIn = false
    }
    return {
      loggedIn
    }
  }),
  withStyles(styles)
)(Login)