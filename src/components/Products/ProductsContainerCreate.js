import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import { fetchCategories } from '../../actions/categories';
import { createProduct } from '../../actions/products'
import { getCategoriesById } from '../../reducers/categories';
import ProductForm from './ProductForm'
import Row from 'reactstrap/lib/Row'
import { Link } from 'react-router-dom'
import { Col, Container } from 'reactstrap'

const ProductsContainerCreate = ({
  history,
  categoriesById,
  handleCreateProduct,
  fetchCategories
}) => {
  const fetchCategoriesCallback = useCallback(fetchCategories, [])
  useEffect(() => {
    fetchCategoriesCallback()
  }, [fetchCategoriesCallback])

  const createProduct = (productData) => {
    handleCreateProduct(productData);
    history.push('/')
  }

  return (
    <Container>
      <Row>
        <Link to='/'>Home</Link>
      </Row>
      <Row>
        <Header name="Create Product" />
      </Row>
      <Row>
        <Col md={8}>
          <ProductForm categoriesById={categoriesById} formCallback={createProduct} mode="create" />
        </Col>
      </Row>
    </Container>
  );
}

ProductsContainerCreate.propTypes = {
  history: PropTypes.object.isRequired,
  categoriesById: PropTypes.array.isRequired,
  handleCreateProduct: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  return {
    categoriesById: Object.entries(categoriesById)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    },
    handleCreateProduct: (productData) => {
      dispatch(createProduct(productData))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainerCreate);
