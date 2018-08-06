import { Meteor } from 'meteor/meteor'
import React from 'react'
import { withTracker } from 'meteor/react-meteor-data'
import { Typography, withStyles } from '@material-ui/core'
import { compose } from 'recompose'

const styles = theme => ({
  uppercase: {
    textTransform: 'uppercase',
  },
});

class ProfileData extends React.Component {
  render() {
    const { classes } = this.props

    return this.props.profil.map((option) => (
      <div key={option._id}>
        <Typography variant="subheading" gutterBottom>
          No. Pekerja : {option.profile.noPekerja}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Emel : {option.emails[0].address}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Nama : {option.profile.nama}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Jawatan : {option.profile.jawatan}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Gred : {option.profile.gred}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Bahagian / Fakulti : {option.profile.bahagianFakulti}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          No. Telefon (Pejabat) : {option.profile.noTelPejabat}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          No. Telefon (Bimbit) : {option.profile.noTelBimbit}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Taraf Jawatan :
                    <span className={classes.uppercase}>
            {option.profile.tarafJawatan}
          </span>
        </Typography>
      </div>
    ))
  }
}

export default compose(
  withTracker(() => {
    Meteor.subscribe('userData')
    return {
      profil: Meteor.users.find().fetch()
    }
  }),
  withStyles(styles),
)(ProfileData)