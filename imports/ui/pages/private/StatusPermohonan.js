import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withTracker } from 'meteor/react-meteor-data'
import { compose } from 'recompose'
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  withStyles,
} from '@material-ui/core'

import Layout from '../../Layouts/Layout'
import { DataFormIndividual } from '../../../api/forms/collections'
import ListStatusPermohonan from '../../components/forms/ListStatusPermohonan'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

class StatusPermohonan extends React.Component {

  renderListStatusPermohonan() {
    return this.props.formIndividual.map(option => (
      <ListStatusPermohonan key={option._id} list={option} />
    ))
  }

  render() {
    const { classes } = this.props;

    return (
      <Layout>
        <Typography variant="title" gutterBottom>
          Status Permohonan Latihan Atas Talian
        </Typography>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Kategori Permohonan</TableCell>
                <TableCell>Nama Kursus</TableCell>
                <TableCell>Tarikh Permohonan</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.renderListStatusPermohonan()}
            </TableBody>
          </Table>
        </Paper>
      </Layout>
    )
  }
}

export default compose(
  withTracker(() => {
    Meteor.subscribe('formIndividualData')
    return {
      formIndividual: DataFormIndividual.find().fetch()
    }
  }),
  withStyles(styles),
)(StatusPermohonan)