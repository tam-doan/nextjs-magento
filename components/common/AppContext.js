import React, { createContext, Component } from 'react'

const AppContext = createContext()

export class AppContextProvider extends Component {
  constructor(props) {
    super(props)

    const { categoryList, customer } = props.values
    this.state = {
      categoryList,
      customer,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { customer } = nextProps.values
    if (this.props.customer !== customer) {
      this.updateCustomer(customer)
    }
  }

  updateCustomer = (customer) => {
    this.setState({
      customer,
    })
  }

  render() {
    const { children } = this.props
    const { categoryList, customer } = this.state
    const { updateCustomer } = this
    return (
      <AppContext.Provider value={{ categoryList, customer, updateCustomer }}>
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext
