import { productApi } from '../gateways/ProductApi';
import { last } from 'lodash'
import moment from 'moment'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'

const requestProductsAction = () => ({
  type: REQUEST_PRODUCTS,
});

const receiveProductsAction = (json) => ({
  type: RECEIVE_PRODUCTS,
  products: json.map(product => product),
});

const deleteProductAction = (id) => ({
  type: DELETE_PRODUCT,
  id
});

const createProductAction = (productData) => ({
  type: CREATE_PRODUCT,
  productData
});

const updateProductAction = (productData) => ({
  type: UPDATE_PRODUCT,
  productData
});

export const fetchProducts = () => (dispatch, getState) => {
  dispatch(requestProductsAction());
  const stateProducts = getState().products // @todo need to discuss that moment
  const json = stateProducts.length > 0 ? stateProducts : productApi.getProducts();
  dispatch(receiveProductsAction(json));
};

export const deleteProduct = (id) => (dispatch) => {
  dispatch(deleteProductAction(id));
};

export const createProduct = (productData) => (dispatch, getState) => {
  const stateProducts = getState().products // @todo need to discuss that moment
  // imagine, that we have sorted array always
  const newProductDataId = last(stateProducts).id
  const newProductData = {
    id: newProductDataId,
    ...productData,
    createdAt: moment().toString()
  }
  dispatch(createProductAction(newProductData));
};

export const updateProduct = (productData) => dispatch => {
  dispatch(updateProductAction(productData));
};
