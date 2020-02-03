export default class Contract {
  constructor(Vue) {
    this.Vue = Vue;
  }

  retrieveAll() {
    return this.Vue.$sRequest
      .get(`${process.env.VUE_APP_BAMBOO_URL_API}/contracts/list`);
  }

  retrieveContractById(contract_id) {
    return this.Vue.$sRequest
      .get(`${process.env.VUE_APP_BAMBOO_URL_API}/contracts/${contract_id}`);
  }

  create(data) {
    return this.Vue.$sRequest
      .post(`${process.env.VUE_APP_BAMBOO_URL_API}/contracts/create`, data);
  }

  update(contract_id, data) {
    return this.Vue.$sRequest
      .put(`${process.env.VUE_APP_BAMBOO_URL_API}/contracts/${contract_id}`, data);
  }

  remove(contract_id) {
    return this.Vue.$sRequest
      .delete(`${process.env.VUE_APP_BAMBOO_URL_API}/contracts/${contract_id}`);
  }
}
