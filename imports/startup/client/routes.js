import React from 'react'
import {
  BrowserRouter as
  Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { withTracker } from 'meteor/react-meteor-data'

import PrivateRoute from '../../api/users/PrivateRoute'

import Login from '../../ui/pages/Login'
import NoMatch from '../../ui/pages/NoMatch'
import Main from '../../ui/pages/private/Main'
import Profile from '../../ui/pages/private/Profile'
import PermohonanIndividu from '../../ui/pages/private/PermohonanIndividu'
import PermohonanKumpulan from '../../ui/pages/private/PermohonanKumpulan'
import StatusPermohonan from '../../ui/pages/private/StatusPermohonan'
import Maklumat from '../../ui/pages/private/Maklumat'
import SejarahLatihan from '../../ui/pages/private/SejarahLatihan'
import KetuaBahagianFakulti from '../../ui/pages/private/KetuaBahagianFakulti'
import JawatankuasaPPSM from '../../ui/pages/private/JawatankuasaPPSM'
import Urusetia from '../../ui/pages/private/Urusetia'

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute path="/main" component={Main} user={this.props.loggedIn} />
          <PrivateRoute path="/profile" component={Profile} user={this.props.loggedIn} />
          <PrivateRoute path="/permohonan-individu" component={PermohonanIndividu} 
            user={this.props.loggedIn} />
          <PrivateRoute path="/permohonan-kumpulan" component={PermohonanKumpulan} 
            user={this.props.loggedIn} />
          <PrivateRoute path="/status-permohonan" component={StatusPermohonan} 
            user={this.props.loggedIn} /> 
          <PrivateRoute path="/maklumat-kursus-dipohon" component={Maklumat} 
            user={this.props.loggedIn} /> 
          <PrivateRoute path="/sejarah-latihan" component={SejarahLatihan} 
            user={this.props.loggedIn} />
          <PrivateRoute path="/ketua-bahagian-fakulti" component={KetuaBahagianFakulti} 
            user={this.props.loggedIn} />
          <PrivateRoute path="/jawatankuasa-ppsm" component={JawatankuasaPPSM} 
            user={this.props.loggedIn} />
          <PrivateRoute path="/urusetia" component={Urusetia} user={this.props.loggedIn} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    )
  }
}

export default withTracker(() => {
  if(!!Meteor.user()) {
    loggedIn = true
  } else {
    loggedIn = false
  }
  return {
    loggedIn
  }
})(Routes)
