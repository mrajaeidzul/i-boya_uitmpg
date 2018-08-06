import React from 'react'
import { Typography } from '@material-ui/core'
import ModalImage from 'react-modal-image'

import Layout from '../../Layouts/Layout'

import cartaAlirBig from '../../../images/carta-alir.png'
import cartaAlirSmall from '../../../images/carta-alir2.png'

export default class Main extends React.Component {
  render() {
    return (
      <Layout>
        <Typography variant="title" gutterBottom>
          Selamat Datang
        </Typography>
        <ModalImage
          small={cartaAlirSmall}
          large={cartaAlirBig}
          alt="Carta Alir Permohonan"
        />
      </Layout>
    )
  }
}