export default class User {
  constructor(Vue) {
    this.Vue = Vue;
  }

  retrieveInfos() {
    const user_id = this.Vue.$sAuth.retrieveUserId();
    return this.Vue.$sRequest
      .get(`${process.env.VUE_APP_BAMBOO_URL_API}/users/${user_id}`);
  }

  update(data, _user_id) {
    const user_id = _user_id || this.Vue.$sAuth.retrieveUserId();
    return this.Vue.$sRequest
      .put(`${process.env.VUE_APP_BAMBOO_URL_API}/users/${user_id}`, data);
  }

  remove(_user_id) {
    const user_id = _user_id || this.Vue.$sAuth.retrieveUserId();
    return this.Vue.$sRequest
      .delete(`${process.env.VUE_APP_BAMBOO_URL_API}/users/${user_id}`);
  }
}
