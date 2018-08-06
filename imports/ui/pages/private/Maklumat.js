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

class Maklumat extends React.Component {

  renderListStatusPermohonan() {
    return this.props.formIndividual.map(option => (
      <ListStatusPermohonan key={option._id} list={option} />
    ))
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.IdKursus)

    return (
      <Layout>
        Maklumat!!!
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
)(Maklumat)