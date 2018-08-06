import React from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  withStyles,
  Divider
} from '@material-ui/core'
import {
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  }
})

const linkLamanUtama = props => <Link to="/main" {...props} />
const linkProfil = props => <Link to="/profile" {...props} />
const linkPermohonanIndividu = props => <Link to="/permohonan-individu" {...props} />
const linkPermohonanKumpulan = props => <Link to="/permohonan-kumpulan" {...props} />
const linkStatusPermohonan = props => <Link to="/status-permohonan" {...props} />
const linkSejarahLatihan = props => <Link to="/sejarah-latihan" {...props} />

class MenuPenggunaBiasa extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }))
  }
  
  render() { 
    const { classes } = this.props
    
    return (
      <div>
        <ListItem button component={linkLamanUtama}>
          <ListItemText primary="Laman Utama" />
        </ListItem>
        <ListItem button component={linkProfil}>
          <ListItemText primary="Profil" />
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemText primary="Permohonan" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button className={classes.nested} component={linkPermohonanIndividu}>
              <ListItemText primary="Individu" />
            </ListItem>
            <ListItem button className={classes.nested} component={linkPermohonanKumpulan}>
              <ListItemText primary="Kumpulan" />
            </ListItem>
            <ListItem button className={classes.nested} component={linkStatusPermohonan}>
              <ListItemText primary="Status Permohonan" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem button component={linkSejarahLatihan}>
          <ListItemText primary="Sejarah Latihan" />
        </ListItem>
      </div>
    )
  }
}

export default withStyles(styles)(MenuPenggunaBiasa)