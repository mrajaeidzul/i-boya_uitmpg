import React from 'react'
import { Typography, Divider } from '@material-ui/core'

import Layout from '../../Layouts/Layout'
import DataProfil from '../../components/ProfileData'

export default class Profile extends React.Component {
  render() {
    return (
      <Layout>
        <Typography variant="title" gutterBottom>
          Profil
        </Typography>
        <Typography gutterBottom>
          {'Maklumat peribadi staf UiTM Pasir Gudang. Sila kemas kini sekiranya terdapat kesilapan.'}
        </Typography>
        <Divider />
        <DataProfil />
        <Divider />
      </Layout>
    )
  }
}