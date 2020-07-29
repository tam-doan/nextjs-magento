import React, { Component } from 'react'
import Router from 'next/router'

import AppContext from '../components/common/AppContext'
import Cookies from '../lib/cookies'
import { revokeCustomerToken } from '../lib/api'

export default class Logout extends Component {
  static contextType = AppContext

  static async getInitialProps(ctx) {
    console.log('logout')
    let cookies = new Cookies(ctx)
    const token = cookies.get('token')

    try {
      await revokeCustomerToken(token)
    } catch (e) {
      //
    }
    cookies.remove('token')
    return {}
  }

  componentDidMount() {
    this.context.updateCustomer(null)
    Router.push('/')
  }

  render() {
    return <div>You're logging out</div>
  }
}
