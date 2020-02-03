export default class Users {
  constructor(Vue) {
    this.Vue = Vue;
  }

  retrieveAll() {
    return this.Vue.$sRequest
      .get(`${process.env.VUE_APP_BAMBOO_URL_API}/users/list`);
  }

  retrieveUserById(user_id) {
    return this.Vue.$sRequest
      .get(`${process.env.VUE_APP_BAMBOO_URL_API}/users/${user_id}`);
  }
}
