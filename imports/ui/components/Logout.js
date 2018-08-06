import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Redirect } from 'react-router-dom'
import { compose } from 'recompose'
import { Button, withStyles } from '@material-ui/core'
import { withTracker } from 'meteor/react-meteor-data'

import { styles } from '../../style/logout'

class Logout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      triggerRedirect: false
    }

    this.baseState = this.state
  }

  handleClick = () => {
    event.preventDefault()
    Meteor.logout()
  }

  render() {
    const { classes } = this.props
    const { triggerRedirect } = this.state

    if(!this.props.loggedIn) {
      return <Redirect to={"/"} />
    }

    return (
      <div>
        <Button
          variant="contained"
          size="small"
          className={classes.button}
          onClick={this.handleClick}
        >
          Keluar
        </Button>
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
)(Logout)