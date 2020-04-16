import * as productsActions from '../actions/products';

export function products(state = [], action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return [
        ...action.products,
      ];
    case productsActions.DELETE_PRODUCT:
      return state.filter(product  => product.id !== action.id);

    case productsActions.CREATE_PRODUCT:
      return state.concat([action.productData]);

    case productsActions.UPDATE_PRODUCT:
      return state.map(product => product.id === action.productData.id ? {...action.productData } : product)
    default:
      return state;
  }
}

export function getProductsById(state) {
  return state.products.reduce((acc, product) => {
    return {
      ...acc,
      [product.id]: product
    }
  }, {})
}

