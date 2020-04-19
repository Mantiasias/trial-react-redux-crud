import React, { Fragment, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import { fetchCategories } from '../../actions/categories'
import { fetchProducts, updateProduct } from '../../actions/products'
import { getCategoriesById } from '../../reducers/categories'
import { getProductsById } from '../../reducers/products'
import ProductForm from './ProductForm'
import Row from 'reactstrap/lib/Row'
import { Link } from 'react-router-dom'
import { Col } from 'reactstrap'
import { get } from 'lodash'

const ProductsContainerUpdate = ({
  history,
  fetchCategories,
  fetchProducts,
  productData,
  categoriesById,
  handleUpdateProduct
}) => {
  const fetchCategoriesCallback = useCallback(fetchCategories, [])
  const fetchProductsCallback = useCallback(fetchProducts, [])
  useEffect(() => {
    fetchProductsCallback()
    fetchCategoriesCallback()
  }, [fetchCategoriesCallback, fetchProductsCallback])

  const updateProduct = productData => {
    handleUpdateProduct(productData)
    history.push('/')
  }

  if (!productData.id) {
    history.push('/notFound')
  }

  return (
    <Fragment>
      <Row>
        <Link to='/'>Home</Link>
      </Row>
      <Row>
        <Header name={`Update Product with id=${productData.id}`} />
      </Row>
      <Row>
        <Col md={8}>
          <ProductForm
            categoriesById={categoriesById}
            productData={productData}
            formCallback={updateProduct}
            mode="update"
          />
        </Col>
      </Row>
    </Fragment>
  )
}

ProductsContainerUpdate.propTypes = {
  productData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  categoriesById: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  handleUpdateProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const categoriesById = getCategoriesById(state)
  const productsById = getProductsById(state)

  const product = productsById[ownProps.match.params.id]
  const productCategories = get(product, 'categories', [])
  const categories = productCategories.map(id => categoriesById[id].id) || []

  return {
    productData: {
      ...product,
      categories
    },
    categoriesById: Object.entries(categoriesById)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    handleUpdateProduct: (productData) => {
      dispatch(updateProduct(productData))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainerUpdate)
