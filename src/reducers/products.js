import * as productsActions from '../actions/products';

export function products(state = [], action) {
  switch (action.type) {
    case productsActions.RECEIVE_PRODUCTS:
      return [
        ...action.products,
      ];
    default:
      return state;
  }
}
