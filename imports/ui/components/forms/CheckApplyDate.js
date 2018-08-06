import React from 'react'
import { Redirect } from 'react-router-dom'
import {
  withStyles,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core'
import { moment } from 'meteor/momentjs:moment'
//import { styles } from '../../../style/checkApplyDate'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: 200,
  },
})

class CheckApplyDate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tarikhKursus: moment().format("YYYY-MM-DD"),
      status: '',
      open: false,
      trigger: false,
    }

    this.baseState = this.state
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  handleSeterusnya = () => {
    let tarikhKursus = moment(this.state.tarikhKursus)
    
    if (tarikhKursus.isBefore(moment().add(30, 'days'))) {
      this.setState({ status: 'lewat' })
      this.setState({ open: true })
    } else {
      this.setState({ status: 'awal' }, () => {
        this.props.handlerCheckApplyDate(this.state.tarikhKursus, this.state.status)
        this.setState(this.baseState)
      })
    }
  }

  handleTeruskan = () => {
    this.props.handlerCheckApplyDate(this.state.tarikhKursus, this.state.status)
    this.setState({ open: false })
    this.setState(this.baseState)

  }

  handleClose = () => {
    this.setState({ open: false })
    this.setState(this.baseState)
  }

  handleBatal = () => {
    this.setState({ trigger: true })
  }

  render() {
    const { classes } = this.props

    if(!!this.state.trigger){
      return <Redirect to={"/main"} />
    }

    return (
      <div className={classes.container}>
        <Typography variant="title" gutterBottom>
          Semak tarikh kursus.
        </Typography>
        <form onSubmit={this.handleSubmit} className={classes.container}>
          <div className={classes.container}>
            <TextField
              id="tarikhKursus"
              label="Tarikh Kursus"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={this.state.tarikhKursus}
              onChange={this.handleChange('tarikhKursus')}
            />
          </div>
          <div className={classes.container}>
            <Button
              onClick={this.handleSeterusnya}
              variant="contained"
              className={classes.button}
            >
              Seterusnya
            </Button>
          </div>
          <div className={classes.container}>
            <Button
              onClick={this.handleBatal}
              variant="contained"
              className={classes.button}
            >
              Batal
            </Button>
          </div>
        </form>
        <Typography className={classes.container}>
          *Peringatan:<br />
          1. Permohonan mestilah dibuat 30 hari sebelum tarikh kursus/program.<br />
          2. Kegagalan mematuhi syarat ini boleh menyebabkan permohonan anda gagal.<br />
          3. Permohonan yang lewat akan ditanda "LEWAT".<br />
        </Typography>
        <div className={classes.container}>
          <Typography>
            status:<br />
            {this.state.status}
          </Typography>
        </div>
        <div>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Teruskan Permohonan?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Permohonan ada lewat. Permohonan sepatutnya dihantar 30 hari sebelum kursus/program.<br/>
                Sekiranya anda meneruskan permohonan, permohonan akan dilabel LEWAT.<br/>
            </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleTeruskan} color="primary">
                Teruskan Permohonan
              </Button>
              <Button onClick={this.handleBatal} color="primary" autoFocus>
                Batal Permohonan
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(CheckApplyDate)