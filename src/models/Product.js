export default class Product {
  constructor(Vue) {
    this.Vue = Vue;
  }

  retrieveAll() {
    return this.Vue.$sRequest
      .get(`${process.env.VUE_APP_BAMBOO_URL_API}/products/list`);
  }

  retrieveProductById(product_id) {
    return this.Vue.$sRequest
      .get(`${process.env.VUE_APP_BAMBOO_URL_API}/products/${product_id}`);
  }

  create(data) {
    return this.Vue.$sRequest
      .post(`${process.env.VUE_APP_BAMBOO_URL_API}/products/create`, data);
  }

  update(product_id, data) {
    return this.Vue.$sRequest
      .put(`${process.env.VUE_APP_BAMBOO_URL_API}/products/${product_id}`, data);
  }

  remove(product_id) {
    return this.Vue.$sRequest
      .delete(`${process.env.VUE_APP_BAMBOO_URL_API}/products/${product_id}`);
  }
}
