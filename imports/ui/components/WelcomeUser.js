import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import {
  Typography,
  withStyles,
} from '@material-ui/core'
import { compose } from 'recompose'

import { styles } from '../../style/welcome'

class WelcomeUser extends React.Component {
  renderNama() {
    return this.props.nama.map(option => (
      option.profile.nama
    ))
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Typography variant="body1" className={classes.typography} gutterBottom>
          Selamat Datang <span>{this.renderNama()}</span>
        </Typography>
      </div>
    )
  }
}

export default compose(
  withTracker(() => {
    Meteor.subscribe('userData')
    return {
      nama: Meteor.users.find().fetch()
    }
  }),
  withStyles(styles),
)(WelcomeUser)