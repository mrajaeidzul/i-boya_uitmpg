import { Meteor } from 'meteor/meteor'
import { Roles } from 'meteor/alanning:roles'
import { Accounts } from 'meteor/accounts-base'

import { users } from './users'

if (Meteor.isServer) {
  users.forEach(({ 
    username, 
    email, 
    password, 
    profile, 
    roles, 
    group, 
  }) => {
    const userExists = Meteor.users.findOne({ 'username': username })

    if (!userExists) {
      const userId = Accounts.createUser({ username, email, password, profile })
      Roles.addUsersToRoles(userId, roles, group)
    }
  })
}