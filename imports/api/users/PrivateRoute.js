import React from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'

const PrivateRoute = ({ component: Component, user: UserLogged, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      UserLogged ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default PrivateRoute