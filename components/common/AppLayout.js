import React, { Component } from 'react'
import { Layout } from 'antd'

const { Content } = Layout

import AppHeader from './AppHeader'
import AppSider from './AppSider'

export default class AppLayout extends Component {
  render() {
    const { children } = this.props
    return (
      <Layout>
        <AppHeader />
        <Layout>
          <AppSider />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}
