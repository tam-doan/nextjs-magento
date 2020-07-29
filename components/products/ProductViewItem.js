import numeral from 'numeral'
import _ from 'lodash'
import Link from 'next/link'
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Tag,
  Tooltip,
  Tabs,
  Alert,
  List,
  Card,
  Skeleton,
  Select,
  Carousel
} from 'antd'
import InputProductQty from '../Input/InputProductQty'

const { Meta } = Card

export default ({ product }) => {
  console.log(product)
  const formatPrice = (price) => {
    return `${numeral(price.value).format('0,0')}${price.currency}`
  }

  const renderPrice = () => {
    const { price_range } = product
    let { maximum_price, minimum_price } = price_range
    maximum_price = maximum_price.final_price;
    minimum_price = minimum_price.final_price;
    if (maximum_price.value === minimum_price.value && maximum_price.currency === minimum_price.currency) {
      return formatPrice(minimum_price)
    }
    return `${formatPrice(minimum_price)} - ${formatPrice(maximum_price)}`
  }

  return (
    <Row>
      <Col span={24} className="product-main">
        <Row>
          <Col span={12} className="product-media">
            <div><img alt={product.image.label} src={product.image.url} style={{ width: '100%' }} /></div>
          </Col>

          <Col span={12} className="product-info">
            <div className="product-name">
              {product.name}
            </div>
            <div className="product-sku">
              {product.sku}
            </div>
            <div className="product-stock-status">
              {product.stock_status}
            </div>
            <div className="product-stock-status">
              {renderPrice()}
            </div>
            <div>
              <Form>
                <Row gutter={1}>
                  <Col span={12}>
                    <Form.Item
                    name='qty'
                    >
                      <InputProductQty
                      onChange='false'
                      mainClass="product-input-number"
                      />
                    </Form.Item>
                  </Col>
                  <Col md={{ span: 18 }} xs={{ span: 12 }}>
                    <Form.Item>
                      <Button
                        htmlType='submit'
                        loading=''
                        type='primary'
                        className="add-to-card"
                        disabled={product.stock_status !== 'IN_STOCK'}
                      >
                        {'Add To Card'}
                      </Button>
                    </Form.Item>

                  </Col>
                </Row>
              </Form>
            </div>
            <div dangerouslySetInnerHTML={{__html: product.description.html}} />
          </Col>
        </Row>
      </Col>
      <Col span={24} className="product-bottom">

      </Col>
    </Row>
  )
}