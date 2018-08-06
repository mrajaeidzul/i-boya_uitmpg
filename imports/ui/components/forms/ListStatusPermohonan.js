import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import {
  Typography,
  TableRow,
  TableCell,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton
} from '@material-ui/core'
import {
  Delete,
  Update
} from '@material-ui/icons/';
import { moment } from 'meteor/momentjs:moment'

import Layout from '../../Layouts/Layout'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  upperCase: {
    textTransform: 'uppercase',
  },
});

class ListStatusPermohonan extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tarikhPermohonan: moment(this.props.list.tarikhPermohonan).format('DD-MM-YYYY'),
      open: false,
      scroll: 'body'
    }
  }

  handleOnClick = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  renderStatus(){
    let status = ''
    if(!!this.props.list.statusLaporan){
      status = <Typography>Lengkap/Tidak Lengkap</Typography>
    } else if (!!this.props.list.statusKelulusan){
      status = <Typography>Lulus/TidakLulus</Typography>
    } else if (!!this.props.list.statusUrusetia){
      status = <Typography>Mesyuarat JPPSM/Edaran</Typography>
    } else if (!!this.props.list.statusPerakuan){
      status = <Typography>Disokong/Tidak Disokong</Typography>
    } else {
      status = <Typography>Belum Diproses</Typography>
    }
    return status
  }

  render() {
    const { classes } = this.props;

    if(!!this.state.open) {
      return (
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Maklumat Kursus Dipohon</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Status Penghantaran: {this.props.list.statusHantar}<br/>
              Kursus ILD: {this.props.list.ild}<br/>
              Permohonan: {this.props.list.jenisPermohonan}<br/>
              Kompetensi: {this.props.list.kompetensi}<br/>
              <br />
              Nama Kursus: {this.props.list.kursus.namaKursus}<br/>
              Tarikh Kursus: {this.props.list.kursus.tarikhKursus}<br/>
              Tempat Kursus: {this.props.list.kursus.tempatKursus}<br/>
              Penganjur: {this.props.list.kursus.penganjur}<br/>
              No.Tel Penganjur: {this.props.list.kursus.noTelPenganjur}<br/>
              <br/>
              Yuran Pendaftaran: {this.props.list.perbelanjaan.yuranPendaftaran}<br/>
              Elaun Makan/Harian: {this.props.list.perbelanjaan.elaunMakanHarian}<br/>
              Penginapan: {this.props.list.perbelanjaan.penginapan}<br/>
              Perjalanan: {this.props.list.perbelanjaan.perjalanan}<br/>
              <br />
              Pembiaya: {this.props.list.pembiayaan.pembiaya}<br/>
              Nilai Pembiayaan: {this.props.list.pembiayaan.nilaiPembiayaan}<br/>
              Butiran Pembiayaan: {this.props.list.pembiayaan.butiranPembiayaan}<br/>
              <br/>
              Kaitan Kursus Dengan Bidang Tugas:<br/>
              {this.props.list.kaitanKursusBidang}
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <TableRow>
        <TableCell component="th" scope="row" className={classes.upperCase}>
          {this.props.list.kategoriPermohonan}
        </TableCell>
        <TableCell>  
            <a href="#" onClick={this.handleOnClick}>{this.props.list.kursus.namaKursus}</a>
        </TableCell>
        <TableCell>
          {this.state.tarikhPermohonan}
        </TableCell>
        <TableCell>
          {this.renderStatus()}
        </TableCell>
        <TableCell>
          <IconButton className={classes.button} aria-label="Update">
            <Update />
          </IconButton>
          <IconButton className={classes.button} aria-label="Delete">
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

export default withStyles(styles)(ListStatusPermohonan)