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

import MenuPenggunaBiasa from './MenuPenggunaBiasa'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 6,
  }
})

const linkUrusetia = props => <Link to="/urusetia" {...props} />

class MenuUrusetia extends React.Component {
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
        <MenuPenggunaBiasa />
        <ListItem button component={linkUrusetia}>
          <ListItemText primary="Urusetia" />
        </ListItem>
      </div>
    )
  }
}

export default withStyles(styles)(MenuUrusetia)