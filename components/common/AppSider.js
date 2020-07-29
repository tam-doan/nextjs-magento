import React, { Component } from 'react'
import Link from 'next/link'
import { Layout, Menu } from 'antd'

import AppContext from './AppContext'

const { SubMenu } = Menu
const { Sider } = Layout

export default class AppSider extends Component {
  static contextType = AppContext

  render() {
    const { categoryList } = this.context
    return (
      <Sider width={200} className="site-layout-background">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          {categoryList.map((category) => {
            let { name, id, children } = category
            return (
              <SubMenu key={id} title={name}>
                {children.map((childCategory) => {
                  let { name, id } = childCategory
                  return (
                    <Menu.Item key={id}>
                      <Link href={`/categories/${id}`}>
                        <a>{name}</a>
                      </Link>
                    </Menu.Item>
                  )
                })}
              </SubMenu>
            )
          })}
        </Menu>
      </Sider>
    )
  }
}
