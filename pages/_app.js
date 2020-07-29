import React from 'react'
import App from 'next/app'

import { AppContextProvider } from '../components/common/AppContext'
import AppLayout from '../components/common/AppLayout'

import Cookies from '../lib/cookies'
import { getCategoryList, getCustomer } from '../lib/api'
import redirectTo from '../lib/redirect-to'

import '../assets/styles/main.less'

const AUTH_PATHS = ['/logout', '/profile']
const NOT_AUTH_PATHS = ['/login', '/register']
const LOGIN_PATH = '/login'
const HOME_PATH = '/'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}

    const cookies = new Cookies(ctx)
    const token = cookies.get('token')

    let customer = null
    try {
      customer = await getCustomer(token)
    } catch (e) {
      cookies.remove('token')
    }

    const { pathname, res } = ctx
    if (!customer && AUTH_PATHS.includes(pathname)) {
      redirectTo(LOGIN_PATH, { res, status: 301 })
      return {}
    } else if (customer && NOT_AUTH_PATHS.includes(pathname)) {
      redirectTo(HOME_PATH, { res, status: 301 })
      return {}
    }

    const categoryList = await getCategoryList()

    return {
      pageProps,
      categoryList,
      customer,
    }
  }

  render() {
    const { Component, pageProps, categoryList, customer } = this.props

    return (
      <AppContextProvider values={{ categoryList, customer }}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AppContextProvider>
    )
  }
}

export default MyApp
