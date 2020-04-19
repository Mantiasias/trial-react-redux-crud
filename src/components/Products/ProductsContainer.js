import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { Button, Container } from 'reactstrap'
import Header from '../Header/Header'
import ProductsList from './ProductsList'
import { fetchProducts, deleteProduct } from '../../actions/products'
import { getCategoriesById } from '../../reducers/categories'
import { fetchCategories } from '../../actions/categories'

const ProductsContainer = ({
  history,
  products,
  fetchCategories,
  fetchProducts,
  handleDeleteProduct
}) => {
  const fetchCategoriesCallback = useCallback(fetchCategories, [])
  const fetchProductsCallback = useCallback(fetchProducts, [])
  useEffect(() => {
    fetchProductsCallback()
    fetchCategoriesCallback()
  }, [fetchCategoriesCallback, fetchProductsCallback])

  const handleCreateProduct = () => history.push(`/products/create`);
  const handleUpdateProduct = (id) => history.push(`/products/update/${id}`);

  return (
    <Container>
      <Header name="Products" />
      <Button color="primary" onClick={handleCreateProduct}>Create Product</Button>
      <hr />
      <ProductsList
        products={products}
        onDelete={handleDeleteProduct}
        onUpdate={handleUpdateProduct}
      />
    </Container>
  )
}

ProductsContainer.propTypes = {
  products: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  handleDeleteProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state)

  const products = state.products.map(product => {
    const productCategories = get(product, 'categories', [])
    const categories = productCategories.map(id => categoriesById[id])

    return {
      ...product,
      categories
    }
  })

  return {
    products,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    fetchProducts: () => {
      dispatch(fetchProducts())
    },
    handleDeleteProduct: (id) => {
      dispatch(deleteProduct(id))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer)
