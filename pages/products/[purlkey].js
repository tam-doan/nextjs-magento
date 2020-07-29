import { PageHeader, Row, Col } from 'antd'
import { List, Card } from 'antd'
import { getProduct } from '../../lib/api'
import ProductViewItem from '../../components/products/ProductViewItem'

const Product = ({ product }) => {
  return (
    <>
      <PageHeader
        title={product.name}
      />
      <ProductViewItem product={product} />
    </>
  )
}

export async function getServerSideProps({ params, query }) {
  const product = await getProduct({
    url_key: params.purlkey
  })

  return {
    props: {
      product
    }
  }
}


export default Product