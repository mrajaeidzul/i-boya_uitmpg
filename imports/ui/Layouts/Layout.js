import React from 'react'
import {
  Grid,
  withStyles,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Divider,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'

import Logout from '../components/Logout'
import WelcomeUser from '../components/WelcomeUser'
import Menus from '../components/menu/Menus'
import TitleAppBar from '../components/TitleAppBar'


import { styles } from '../../style/layout'

class Layout extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, theme, children } = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar}>
        <WelcomeUser />
        <Logout />
        </div>
        <Divider />
        <Menus />
      </div>
    )

    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <div className={classes.root}>
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
                <TitleAppBar />
              </Toolbar>
            </AppBar>
            <Hidden lgUp>
              <Drawer
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden mdDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Grid item xs={12}>
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Hidden smUp>
                  <div className={classes.toolbar} />
                </Hidden>
                {children}
              </main>
            </Grid>
          </div>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Layout)