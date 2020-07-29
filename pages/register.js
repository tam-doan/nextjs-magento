import React, { Component } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import Router from 'next/router'

import { createCustomer } from '../lib/api'

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

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: [],
    }
  }

  onFinish = async (values) => {
    console.log('Success:', values)
    this.setState({
      errors: [],
    })
    try {
      await createCustomer(values)
      Router.push('/login')
    } catch (e) {
      console.log(e.response)
      this.setState({
        errors: e.response.errors.map((error) => error.message),
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
                message={error}
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
            label="Firstname"
            name="firstname"
            rules={[
              {
                required: true,
                message: 'Please input your first name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Lastname"
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Please input your lastname name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

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
              Register
            </Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}
