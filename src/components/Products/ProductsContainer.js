import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { Button, Container } from 'reactstrap'
import Header from '../Header/Header'
import ProductsList from './ProductsList'
import { fetchCategories } from '../../actions/categories'
import { fetchProducts, deleteProduct } from '../../actions/products'
import { getCategoriesById } from '../../reducers/categories'

class ProductsContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props

    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }

  handleDelete = (id) => {
    const { dispatch } = this.props
    dispatch(deleteProduct(id))
  }

  handleUpdate = (id) => {
    this.props.history.push(`/products/update/${id}`)
  }

  handleCreate = () => {
    this.props.history.push(`/products/create`)
  }

  render() {
    const { products } = this.props

    return (
      <Container>
        <Header name="Products" />
        <Button color="primary" onClick={this.handleCreate}>Create Product</Button>
        <hr />
        <ProductsList
          products={products}
          onDelete={this.handleDelete}
          onUpdate={this.handleUpdate}
        />
      </Container>
    )
  }
}

ProductsContainer.propTypes = {
  products: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
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

export default connect(mapStateToProps)(ProductsContainer)
