import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../Header/Header';
import { fetchCategories } from '../../actions/categories';
import { createProduct } from '../../actions/products'
import { getCategoriesById } from '../../reducers/categories';
import ProductForm from './ProductForm'
import Row from 'reactstrap/lib/Row'
import { Link } from 'react-router-dom'
import { Container } from 'reactstrap'

class ProductsContainerCreate extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCategories());
  }

  createProduct = (productData) => {
    const { dispatch, history } = this.props;
    dispatch(createProduct(productData));
    history.push('/')
  }

  render() {
    const { categoriesById } = this.props
    return (
      <Container>
        <Row>
          <Link to='/'>Home</Link>
        </Row>
        <Header name="Create Product" />
        <Row>
          <ProductForm categoriesById={categoriesById} formCallback={this.createProduct} mode="create" />
        </Row>
      </Container>
    );
  }
}

ProductsContainerCreate.propTypes = {
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  categoriesById: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  const categoriesById = getCategoriesById(state);

  return { categoriesById }
};

export default connect(mapStateToProps)(ProductsContainerCreate);
