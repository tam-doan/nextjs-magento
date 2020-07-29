import React, { Component } from 'react'
import { PageHeader, Row, Col } from 'antd'
import { getCategory } from '../../lib/api'
import ProductListItem from '../../components/products/ProductListItem'

export default class Category extends Component {
  // https://nextjs.org/docs/api-reference/data-fetching/getInitialProps
  static async getInitialProps({ query }) {
    const { cid, page } = query
    const category = await getCategory({
      categoryId: cid,
      currentPage: page,
    })

    return {
      category,
    }
  }

  render() {
    const { category } = this.props
    const { products } = category
    return (
      <>
        <PageHeader title={category.name} sub-title={category.description} />
        <Row gutter={[16, 16]}>
          {products.items.map((product) => {
            return (
              <Col key={product.id} className="gutter-row" span={6}>
                <ProductListItem product={product} />
              </Col>
            )
          })}
        </Row>
      </>
    )
  }
}
