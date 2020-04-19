import products from '../mocks/products';

class ProductApi {
  getProducts = (stateProducts) => {
    return stateProducts.length > 0 ? stateProducts : products;
  }
}

export const productApi = new ProductApi();
