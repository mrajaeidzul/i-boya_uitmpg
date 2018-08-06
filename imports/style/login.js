export const styles = theme => ({
  root: {
    flexGrow: 1,
    flexWrap: 'wrap',
    marginTop: 50,
    marginBotton: 50
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  text: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    textAlign: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: 200,
  },
  div: {
    textAlign: 'center'
  },
  progress: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})