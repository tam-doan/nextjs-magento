import React, { Component } from 'react'
import numeral from 'numeral'
import Link from 'next/link'
import { Card } from 'antd'

const { Meta } = Card

export default class ProductListItem extends Component {
  formatPrice = (price) => {
    return `${numeral(price.value).format('0,0')}${price.currency}`
  }

  renderPrice = (price_range) => {
    let { maximum_price, minimum_price } = price_range
    maximum_price = maximum_price.final_price
    minimum_price = minimum_price.final_price
    if (
      maximum_price.value === minimum_price.value &&
      maximum_price.currency === minimum_price.currency
    ) {
      return this.formatPrice(minimum_price)
    }
    return `${this.formatPrice(minimum_price)} -
      ${this.formatPrice(maximum_price)}`
  }

  render() {
    const { id, thumbnail, name, price_range } = this.props.product
    return (
      <Link href={`/products/${id}`}>
        <a>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <div className="frame-1x1">
                <img alt={thumbnail.label} src={thumbnail.url} />
              </div>
            }
          >
            <Meta title={name} description={this.renderPrice(price_range)} />
          </Card>
        </a>
      </Link>
    )
  }
}
