import { Meteor } from 'meteor/meteor'

import { DataFormIndividual } from './collections'

Meteor.methods({
  'DataFormIndividual.insert'(data) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized')
    }

    data.forEach(({
      userId,
      kategoriPermohonan,
      statusHantar,
      ild,
      jenisPermohonan,
      kompetensi,
      kursus,
      perbelanjaan,
      pembiayaan,
      kaitanKursusBidang,
      kursusLepas,
      dokumenSokongan,
      tarikhPermohonan,
      statusPerakuan,
      statusUrusetia,
      statusKelulusan,
      statusLaporan,
    }) => {
      DataFormIndividual.insert({
        userId,
        kategoriPermohonan,
        statusHantar,
        ild,
        jenisPermohonan,
        kompetensi,
        kursus,
        perbelanjaan,
        pembiayaan,
        kaitanKursusBidang,
        kursusLepas,
        dokumenSokongan,
        tarikhPermohonan,
        statusPerakuan,
        statusUrusetia,
        statusKelulusan,
        statusLaporan,
      })
    })
  }
})