import { Meteor } from 'meteor/meteor'
import React from 'react'
import ReactDOM from 'react-dom'

import Routes from './routes'

Meteor.startup(() => {
    ReactDOM.render(<Routes />, document.getElementById('render-target'))
})
