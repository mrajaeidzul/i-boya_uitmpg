import React from 'react'
import { Meteor } from 'meteor/meteor'
import {
  Typography,
  TextField,
  Divider,
  Button,
  MenuItem,
  withStyles,
  Dialog,
  DialogContent,
  DialogContentText,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'
import { Roles } from 'meteor/alanning:roles'

import ProfileData from '../ProfileData'
import {
  senaraiPenginapan,
  senaraiPerjalanan,
  senaraiPembiaya,
} from './ItemLists'
import { styles } from '../../../style/formIndividual'

const linkBatal = props => <Link to="/main" {...props} />

class FormIndividual extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ild: 'tidak',
      jenisPermohonan: 'biasa',
      namaKursus: '',
      tempatKursus: '',
      penganjur: '',
      tarikhKursus: this.props.TarikhKursus,
      noTelPenganjur: '',
      kompetensi: 'umum',
      yuranPendaftaran: '',
      elaunMakanHarian: '',
      penginapan: 'hotel',
      perjalanan: 'kenderaanUitm',
      pembiaya: '',
      nilaiPembiayaan: '',
      butiranPembiayaan: '',
      kaitanKursusBidang: '',
      openDialog: false,
      closeDialog: false,
      showUploadIld: false,
      showUploadArahan: false,
      showUploadStafAkademik: false,
    }

    this.baseState = this.state
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleChangeIld = name => event => {
    this.setState({
      [name]: event.target.value,
    }, function(){
      if(this.state.ild === 'ya') {
        this.setState({ showUploadIld: true })
      } else {
        this.setState({ showUploadIld: false })
      }
    })
  }

  handleChangePermohonan = name => event => {
    this.setState({
      [name]: event.target.value,
    }, function(){
      if(this.state.jenisPermohonan === 'arahan') {
        this.setState({ showUploadArahan: true })
      } else {
        this.setState({ showUploadArahan: false })
      }
    })
  }

  handleChangeUppercase = name => event => {
    this.setState({
      [name]: event.target.value.toUpperCase(),
    })
  }

  handleClose = () => {
    this.setState({ openDialog: false })
    this.setState({ closeDialog: true })
  }

  handleReset = () => {
    event.preventDefault()
    this.setState(this.baseState)
  }

  handleSubmit = (event) => {
    event.preventDefault()

    let userId = Meteor.userId()
    let statusHantar = this.props.StatusHantar.trim()
    let ild = this.state.ild.trim()
    let jenisPermohonan = this.state.jenisPermohonan.trim()
    let kompetensi = this.state.kompetensi.trim()
    let namaKursus = this.state.namaKursus.trim()
    let tempatKursus = this.state.tempatKursus.trim()
    let penganjur = this.state.penganjur.trim()
    let tarikhKursus = this.props.TarikhKursus.trim()
    let noTelPenganjur = this.state.noTelPenganjur.trim()
    let yuranPendaftaran = this.state.yuranPendaftaran.trim()
    let elaunMakanHarian = this.state.elaunMakanHarian.trim()
    let penginapan = this.state.penginapan.trim()
    let perjalanan = this.state.perjalanan.trim()
    let pembiaya = this.state.pembiaya.trim()
    let nilaiPembiayaan = this.state.nilaiPembiayaan.trim()
    let butiranPembiayaan = this.state.butiranPembiayaan.trim()
    let kaitanKursusBidang = this.state.kaitanKursusBidang.trim()

    const data = [
      {
        userId: userId,
        kategoriPermohonan: 'individu',
        statusHantar: statusHantar,
        ild: ild,
        jenisPermohonan: jenisPermohonan,
        kompetensi: kompetensi,
        kursus: {
          namaKursus: namaKursus,
          tempatKursus: tempatKursus,
          penganjur: penganjur,
          tarikhKursus: tarikhKursus,
          noTelPenganjur: noTelPenganjur,
        },
        perbelanjaan: {
          yuranPendaftaran: yuranPendaftaran,
          elaunMakanHarian: elaunMakanHarian,
          penginapan: penginapan,
          perjalanan: perjalanan,
        },
        pembiayaan: {
          pembiaya: pembiaya,
          nilaiPembiayaan: nilaiPembiayaan,
          butiranPembiayaan: butiranPembiayaan,
        },
        kaitanKursusBidang: kaitanKursusBidang,
        kursusLepas: {
          url: '',
          filename: '',
        },
        dokumenSokongan: {
          permohonanIld: {
            url: '',
            filename: '',
          },
          kertasKerja: {
            url: '',
            filename: '',
          },
          suratJemputan: {
            url: '',
            filename: '',
          },
          votGeran: {
            url: '',
            filename: '',
          },
          borangTangguhGantiKuliah: {
            url: '',
            filename: '',
          },
        },
        tarikhPermohonan: new Date(),
        statusPerakuan: false,
        statusUrusetia: false,
        statusKelulusan: false,
        statusLaporan: false,
      }
    ]

    console.log(data)

    Meteor.call('DataFormIndividual.insert', data, () => {
      this.setState({ openDialog: true })
      console.log(this.state.openDialog)
    })
  }

  render() {
    const { classes } = this.props

    const styleShowUploadIld = this.state.showUploadIld ? {display:'block'} : {display:'none'}
    const styleShowUploadArahan = this.state.showUploadArahan ? {display:'block'} : {display:'none'}
    const styleShowUploadAkademik = Roles.userIsInRole(Meteor.userId(), 'pengguna-biasa', 'akademik') ? {display:'block'} : {display:'none'}


    if (!!this.state.openDialog) {
      return (
        <Dialog
          open={this.state.openDialog}
          onClose={this.handleClose}
        >
          <DialogContent>
            <DialogContentText>
              Borang berjaya dihantar!
          </DialogContentText>
          </DialogContent>
        </Dialog>
      )
    }

    if (!!this.state.closeDialog) {
      return <Redirect to={'/status-permohonan'} />
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Typography variant="headline" className={classes.typography} gutterBottom>
            BORANG PERMOHONAN MENGIKUTI KURSUS & LATIHAN (INDIVIDU)
            </Typography>
          <Typography variant="subheading" className={classes.typography} gutterBottom>
            Anda dikehendaki mengisi maklumat dengan jelas.
            </Typography>
          <Divider className={classes.divider} />
          <div className={classes.row}>
            <div className={classes.column}>
              <Typography variant="title" className={classes.typography} gutterBottom>
                BUTIR-BUTIR PERIBADI
              </Typography>
              <ProfileData />
            </div>
            <div className={classes.column}>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Anjuran ILD</FormLabel>
                <RadioGroup
                  aria-label="ild"
                  name="ild"
                  className={classes.group}
                  value={this.state.ild}
                  onChange={this.handleChangeIld('ild')}
                >
                  <FormControlLabel
                    value="ya"
                    control={<Radio color="primary" />}
                    label="Ya"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="tidak"
                    control={<Radio color="primary" />}
                    label="Tidak"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Permohonan</FormLabel>
                <RadioGroup
                  aria-label="jenisPermohonan"
                  name="jenisPermohonan"
                  className={classes.group}
                  value={this.state.jenisPermohonan}
                  onChange={this.handleChangePermohonan('jenisPermohonan')}
                >
                  <FormControlLabel
                    value="arahan"
                    control={<Radio color="primary" />}
                    label="Arahan"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="biasa"
                    control={<Radio color="primary" />}
                    label="Biasa"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Kompetensi</FormLabel>
                <RadioGroup
                  aria-label="kompetensi"
                  name="kompetensi"
                  className={classes.group}
                  value={this.state.kompetensi}
                  onChange={this.handleChange('kompetensi')}
                >
                  <FormControlLabel
                    value="umum"
                    control={<Radio color="primary" />}
                    label="Umum"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="khusus"
                    control={<Radio color="primary" />}
                    label="Khusus"
                    labelPlacement="start"
                  />
                  <FormControlLabel
                    value="ict"
                    control={<Radio color="primary" />}
                    label="ICT"
                    labelPlacement="start"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <Divider className={classes.divider} />
          <div>
            <Typography variant="title" className={classes.typography} gutterBottom>
              A. KURSUS DIPOHON
            </Typography>
            <div>
              <TextField
                id="namaKursus"
                label="Nama Kursus"
                margin="normal"
                multiline
                rowsMax="3"
                required
                className={classes.textField1}
                value={this.state.namaKursus}
                onChange={this.handleChangeUppercase('namaKursus')}
              />
              <TextField
                id="tempatKursus"
                label="Tempat Kursus"
                margin="normal"
                required
                className={classes.textField1}
                value={this.state.tempatKursus}
                onChange={this.handleChangeUppercase('tempatKursus')}
              />
              <TextField
                id="penganjur"
                label="Penganjur"
                margin="normal"
                required
                className={classes.textField1}
                value={this.state.penganjur}
                onChange={this.handleChangeUppercase('penganjur')}
              />
            </div>
            <div>
              <TextField
                id="tarikhKursus"
                label="Tarikh Kursus"
                margin="normal"
                className={classes.textField2}
                value={this.state.tarikhKursus}
              />
              <TextField
                id="noTelPenganjur"
                label="No. Telefon Penganjur"
                margin="normal"
                required
                className={classes.textField2}
                value={this.state.noTelPenganjur}
                onChange={this.handleChange('noTelPenganjur')}
              />
            </div>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="title" className={classes.typography} gutterBottom>
            B. PERBELANJAAN YANG DIPOHON UNTUK DIBIAYAI
          </Typography>
          <TextField
            id="yuranPendaftaran"
            label="Yuran Pendaftaran"
            margin="normal"
            placeholder="RM"
            helperText="Contoh: 100.10"
            required
            className={classes.textField2}
            type="number"
            inputProps={{step: 0.01}}
            value={this.state.yuranPendaftaran}
            onChange={this.handleChange('yuranPendaftaran')}
          />
          <TextField
            id="elaunMakanHarian"
            label="Elaun Makan/Harian"
            margin="normal"
            placeholder="RM"
            helperText="Contoh: 60.00"
            required
            className={classes.textField2}
            type="number"
            inputProps={{step: 0.01}}
            value={this.state.elaunMakanHarian}
            onChange={this.handleChange('elaunMakanHarian')}
          />
          <TextField
            id="pilihPenginapan"
            select
            label="Penginapan:"
            value={this.state.penginapan}
            onChange={this.handleChange('penginapan')}
            helperText="Pilih penginapan bagi kursus/seminar."
            margin="normal"
            required
            className={classes.textField2}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            {senaraiPenginapan.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="pilihPerjalanan"
            select
            label="Perjalanan:"
            value={this.state.perjalanan}
            onChange={this.handleChange('perjalanan')}
            helperText="Pilih perjalanan bagi kursus/seminar."
            margin="normal"
            required
            className={classes.textField2}
            SelectProps={{
              MenuProps: {
                className: classes.menu,
              },
            }}
          >
            {senaraiPerjalanan.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Divider className={classes.divider} />
          <div>
            <Typography variant="title" className={classes.typography} gutterBottom>
              C. MAKLUMAT PEMBIAYAAN
          </Typography>
            <div>
              <TextField
                id="pembiaya"
                select
                label="Pembiaya:"
                value={this.state.pembiaya}
                onChange={this.handleChange('pembiaya')}
                helperText="Pilih pembiaya bagi kursus/seminar."
                margin="normal"
                required
                className={classes.textField2}
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
              >
                {senaraiPembiaya.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="nilaiPembiayaan"
                label="Nilai Pembiayaan"
                margin="normal"
                placeholder="RM"
                helperText="Contoh: 600.00"
                required
                className={classes.textField2}
                type="number"
                inputProps={{ step: 0.01 }}
                value={this.state.nilaiPembiayaan}
                onChange={this.handleChange('nilaiPembiayaan')}
              />
            </div>
            <div>
              <TextField
                id="butiranPembiayaan"
                label="Nyatakan Butir-Butir Pembiayaan"
                margin="normal"
                multiline
                rowsMax="5"
                required
                className={classes.textField1}
                value={this.state.butiranPembiayaan}
                onChange={this.handleChangeUppercase('butiranPembiayaan')}
              />
            </div>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="title" className={classes.typography} gutterBottom>
            D. KAITAN KURSUS/SEMINAR DENGAN BIDANG TUGAS MASA KINI
          </Typography>
          <TextField
            id="kaitanKursusBidang"
            label="Nyatakan Kaitan Kursus/Seminar Dengan Bidang Tugas Masa Kini"
            margin="normal"
            multiline
            rowsMax="5"
            required
            className={classes.textField1}
            value={this.state.kaitanKursusBidang}
            onChange={this.handleChangeUppercase('kaitanKursusBidang')}
          />
          <Divider className={classes.divider} />
          <div>
            <Typography variant="title" className={classes.typography} gutterBottom>
              E. KURSUS/SEMINAR YANG TELAH DIHADIRI PADA TAHUN LEPAS DAN TAHUN INI
            </Typography>
            <Typography className={classes.typography}>
              Sila muat naik fail berformatkan *pdf sahaja.
            </Typography>
            <div>
              <Typography variant="subheading" className={classes.typography}>
                Sila ambil dari Sistem e-Latihan.
            </Typography>
              <input
                accept="pdf/*"
                className={classes.input}
                id="sejarahLatihan"
                multiple
                type="file"
              />
              <label htmlFor="sejarahLatihan">
                <Button variant="outlined" component="span" className={classes.button}>
                  Muat Naik
                </Button>
              </label>
            </div>
          </div>
          <Divider className={classes.divider} />
          <div>
            <Typography variant="title" className={classes.typography} gutterBottom>
              F. MUAT NAIK DOKUMEN SOKONGAN
            </Typography>
            <Typography className={classes.typography}>
              Hanya fail format *pdf sahaja dibenarkan.
            </Typography>
            <div className={classes.row}>
              <div className={classes.column}>
                <div style={styleShowUploadIld}>
                  <Typography variant="subheading" className={classes.typography}>
                    Permohonan e-Latihan ILD:
                  </Typography>
                  <input
                    accept="pdf/*"
                    className={classes.input}
                    id="salinanPermohonanILD"
                    multiple
                    type="file"
                  />
                  <label htmlFor="salinanPermohonanILD">
                    <Button variant="outlined" component="span" className={classes.button}>
                      Muat Naik
                    </Button>
                  </label>
                </div>
                <div>
                  <Typography variant="subheading" className={classes.typography}>
                    Kertas Kerja:
                  </Typography>
                  <input
                    accept="pdf/*"
                    className={classes.input}
                    id="kertasKerja"
                    multiple
                    type="file"
                  />
                  <label htmlFor="kertasKerja">
                    <Button variant="outlined" component="span" className={classes.button}>
                      Muat Naik
                    </Button>
                  </label>
                </div>
                <div>
                  <Typography variant="subheading" className={classes.typography}>
                    Surat Jemputan:
                  </Typography>
                  <input
                    accept="pdf/*"
                    className={classes.input}
                    id="suratJemputan"
                    multiple
                    type="file"
                  />
                  <label htmlFor="suratJemputan">
                    <Button variant="outlined" component="span" className={classes.button}>
                      Muat Naik
                    </Button>
                  </label>
                </div>
                <div>
                  <Typography variant="subheading" className={classes.typography}>
                    Brosur:
                  </Typography>
                  <input
                    accept="pdf/*"
                    className={classes.input}
                    id="brosur"
                    multiple
                    type="file"
                  />
                  <label htmlFor="brosur">
                    <Button variant="outlined" component="span" className={classes.button}>
                      Muat Naik
                    </Button>
                  </label>
                </div>
              </div>
              <div className={classes.column}>
                <div style={styleShowUploadArahan}>
                  <Typography variant="subheading" className={classes.typography}>
                    Surat Kelulusan:
                  </Typography>
                  <input
                    accept="pdf/*"
                    className={classes.input}
                    id="suratKelulusan"
                    multiple
                    type="file"
                  />
                  <label htmlFor="suratKelulusan">
                    <Button variant="outlined" component="span" className={classes.button}>
                      Muat Naik
                    </Button>
                  </label>
                </div>
                <div style={styleShowUploadArahan}>
                  <Typography variant="subheading" className={classes.typography}>
                    Vot Geran (jika berkaitan):
                  </Typography>
                  <input
                    accept="pdf/*"
                    className={classes.input}
                    id="votGeran"
                    multiple
                    type="file"
                  />
                  <label htmlFor="votGeran">
                    <Button variant="outlined" component="span" className={classes.button}>
                      Muat Naik
                    </Button>
                  </label>
                </div>
                <div style={styleShowUploadAkademik}>
                  <Typography variant="subheading" className={classes.typography}>
                    BorangTangguhGantiKuliah:
                  </Typography>
                  <input
                    accept="pdf/*"
                    className={classes.input}
                    id="borangTangguhGantiKuliah"
                    multiple
                    type="file"
                  />
                  <label htmlFor="borangTangguhGantiKuliah">
                    <Button variant="outlined" component="span" className={classes.button}>
                      Muat Naik
                    </Button>
                  </label>
                </div>
              </div>
            </div> 
          </div>
          <Divider className={classes.divider} />
          <Button
            type="submit"
            variant="contained"
            className={classes.button}
          >
            Hantar Permohonan
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={this.handleReset}
            className={classes.button}
          >
            Padam
          </Button>
          <Button
            type="button"
            variant="contained"
            component={linkBatal}
            className={classes.button}
          >
            Batal
          </Button>
        </form>
      </div>
    )
  }
}

export default withStyles(styles)(FormIndividual)