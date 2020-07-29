import { GraphQLClient } from 'graphql-request'

const API_URL = 'https://dev-helloshop.vinobe.com/graphql'
// const API_URL = 'https://demo-mgtce-235.vinobe.com/graphql'
// const API_URL = 'https://dev-magento.member.shop/graphql'

export const request = async (query, variables, token) => {
  let headers = {}
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  const graphQLClient = new GraphQLClient(API_URL, {
    headers,
  })
  return await graphQLClient.request(query, variables)
}

export const createCustomer = async (params) => {
  const QUERY = `
    mutation(
      $firstname: String!,
      $lastname: String!,
      $email: String!,
      $password: String!
    ) {
      createCustomer(
        input: {
          firstname: $firstname
          lastname: $lastname
          email: $email
          password: $password
        }
      ) {
        customer {
          firstname
          lastname
          email
          is_subscribed
        }
      }
    }
  `
  return (await request(QUERY, params)).createCustomer.customer
}

export const revokeCustomerToken = async (token) => {
  const QUERY = `
    mutation {
      revokeCustomerToken {
        result
      }
    }
  `

  return (await request(QUERY, {}, token)).result
}

export const generateCustomerToken = async (params) => {
  const QUERY = `
    mutation(
      $email: String!,
      $password: String!
    ) {
      generateCustomerToken(
        email: $email
        password: $password
      ) {
        token
      }
    }
  `

  return (await request(QUERY, params)).generateCustomerToken.token
}

export const getCustomer = async (token) => {
  const QUERY = `
    {
      customer {
        firstname
        lastname
        suffix
        email
        addresses {
          firstname
          lastname
          street
          city
          region {
            region_code
            region
          }
          postcode
          country_code
          telephone
        }
      }
    }
  `

  return (await request(QUERY, {}, token)).customer
}

export const getCategoryList = async () => {
  const QUERY = `
    {
      categoryList {
        id
        level
        name
        path
        url_path
        url_key
        children {
          id
          level
          name
          path
          url_path
          url_key
        }
      }
    }
  `
  return (await request(QUERY)).categoryList
}

export const getCategory = async (params) => {
  const QUERY = `
    query (
      $categoryId: String!,
      $currentPage: Int,
      $pageSize: Int
    ) {
      categoryList(filters: {ids: {eq: $categoryId}}) {
        id
        level
        name
        description
        path
        url_path
        url_key
        products(pageSize: $pageSize, currentPage: $currentPage) {
          page_info {
            current_page
            page_size
            total_pages
          }
          total_count
          items {
            id
            name
            meta_description
            price_range {
              maximum_price {
                final_price {
                  value
                  currency
                }
              }
              minimum_price {
                final_price {
                  value
                  currency
                }
              }
            }
            thumbnail {
              label
              url
            }
          }
        }
      }
    }
  `
  return (await request(QUERY, params)).categoryList[0]
}
