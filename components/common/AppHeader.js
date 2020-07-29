import React, { Component } from 'react'
import Link from 'next/link'
import { Layout, Menu } from 'antd'

import AppContext from './AppContext'

const { Header } = Layout

export class AppHeader extends Component {
  static contextType = AppContext

  renderMenu = () => {
    const { customer } = this.context
    if (!customer) {
      return (
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Menu.Item>
        </Menu>
      )
    }
    const { firstname, lastname } = customer
    return (
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1">
          <Link href="/profile">
            <a>
              Hello, {firstname} {lastname}!
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link href="/logout">
            <a>Logout</a>
          </Link>
        </Menu.Item>
      </Menu>
    )
  }

  render() {
    return (
      <Header className="header">
        <Link href="/">
          <a className="logo">
            <img src="/images/logo-white.png" />
          </a>
        </Link>
        {this.renderMenu()}
      </Header>
    )
  }
}

export default AppHeader
