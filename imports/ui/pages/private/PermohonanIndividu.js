import React from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Layout from '../../Layouts/Layout'
import CheckApplyDate from '../../components/forms/CheckApplyDate'
import FormIndividual from '../../components/forms/FormIndividual'


export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tarikhKursus: '',
      tarikhMohon: '',
      statusHantar: '', //Awal atau Lewat
      hide: false,
    }
  }

  checkApplyDate = (tarikhKursus, status) => {
    this.setState({
      tarikhKursus: tarikhKursus,
      statusHantar: status, //Awal atau Lewat
      hide: true,
    })
  }

  renderForm = () => {
    if(!!this.state.hide) {
      return (
        <FormIndividual 
          TarikhKursus={this.state.tarikhKursus} 
          StatusHantar={this.state.statusHantar}
        />
      )
    }
  }

  render() {
    const styleHide = this.state.hide ? {display: 'none'} : {}
    return (
      <Layout>
        <div style={styleHide}>
          <CheckApplyDate handlerCheckApplyDate = {this.checkApplyDate}/>
        </div>
        {this.renderForm()}
        {console.log(moment(this.state.tarikhKursus))}
        {console.log(this.state.statusHantar)}
      </Layout>
    )
  }
}