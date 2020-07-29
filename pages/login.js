import React, { Component } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import Cookies from 'universal-cookie'
import Router from 'next/router'

import { generateCustomerToken, getCustomer } from '../lib/api'

import AppContext from '../components/common/AppContext'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

export default class Login extends Component {
  static contextType = AppContext

  constructor(props) {
    super(props)

    this.state = {
      errors: [],
    }
  }

  onFinish = async (values) => {
    this.setState({
      errors: [],
    })
    try {
      let token = await generateCustomerToken(values)
      let cookies = new Cookies()
      cookies.set('token', token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      }) // expires after 1 day

      let customer = await getCustomer(token)
      this.context.updateCustomer(customer)

      Router.push('/')
    } catch (e) {
      this.setState({
        errors: e.response.errors,
      })
    }
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  render() {
    return (
      <>
        {this.state.errors &&
          this.state.errors.length > 0 &&
          this.state.errors.map((error, index) => {
            return (
              <Alert
                message={error.message}
                type="error"
                style={{ marginBottom: 16 }}
                key={index}
              />
            )
          })}
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email address',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}
