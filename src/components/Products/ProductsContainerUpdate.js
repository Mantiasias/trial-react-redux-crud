import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Header from '../Header/Header'
import { fetchCategories } from '../../actions/categories'
import { fetchProducts, updateProduct } from '../../actions/products'
import { getCategoriesById } from '../../reducers/categories'
import { getProductsById } from '../../reducers/products'
import ProductForm from './ProductForm'

class ProductsContainerUpdate extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }

  updateProduct = productData => {
    const { dispatch, history } = this.props
    dispatch(updateProduct(productData))
    history.push('/')
  }

  /*
    - Name is required, length not greater than 200
    - Rating is required, integer, not greater than 10
    - A product should have from 1 to 5 categories
    - If a product has an expiration date it should expire not less than 30 days since now
    - If a product rating is greater than 8 it should automatically become “featured” product
   */

  render() {
    const { productData, categoriesById } = this.props
    return (
      <Fragment>
        <Header name={`Update Product with id= ${productData.id}`} />
        <ProductForm categoriesById={categoriesById} productData={productData} formCallback={this.updateProduct}
                     mode="update" />
      </Fragment>
    )
  }
}

ProductsContainerUpdate.propTypes = {
  productData: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  categoriesById: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
  const categoriesById = getCategoriesById(state)
  const productsById = getProductsById(state)

  const product = productsById[ownProps.match.params.id]
  const categories = product.categories && product.categories.map(id => categoriesById[id]) || []

  return {
    productData: {
      ...productsById[ownProps.match.params.id],
      categories
    },
    categoriesById
  }
}

export default connect(mapStateToProps)(ProductsContainerUpdate)
