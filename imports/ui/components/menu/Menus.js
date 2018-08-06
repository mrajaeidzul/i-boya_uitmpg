import { Meteor } from 'meteor/meteor'
import React from 'react'
import { Roles } from 'meteor/alanning:roles'

import MenuPenggunaBiasa from './MenuPenggunaBiasa'
import MenuKetuaBahagianFakulti from './MenuKetuaBahagianFakulti'
import MenuJawatankuasaPPSM from './MenuJawatankuasaPPSM'
import MenuPengurusan from './MenuPengurusan'
import MenuUrusetia from './MenuUrusetia'
import MenuAdmin from './MenuAdmin'

export default class Menus extends React.Component {
  
  renderKategoriPengguna() {
    let menu = ''
    if (Roles.userIsInRole(Meteor.userId(), ['ketua-pengurusan-kampus', 'ketua-pengurusan-cawangan'], 'staf')) {
      menu = <MenuPengurusan />
    } else if (Roles.userIsInRole(Meteor.userId(), ['urusetia'], 'staf')) {
      menu = <MenuUrusetia />
    } else if (Roles.userIsInRole(Meteor.userId(), ['ahli-jppsm'], 'staf')) {
      menu = <MenuJawatankuasaPPSM />
    } else if (Roles.userIsInRole(Meteor.userId(), ['ketua-bahagian-fakulti'], 'staf')) {
      menu = <MenuKetuaBahagianFakulti />
    } else {
      menu = <MenuPenggunaBiasa />
    }
    return menu
  }

  render() {
    return (
      <div>
        {this.renderKategoriPengguna()}
      </div>
    )
  }
}