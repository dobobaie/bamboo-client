// Import models
import AccountModel from './Account';
import UserModel from './User';
import UsersModel from './Users';
import ProductModel from './Product';
import ContractModel from './Contract';

export default {
  install(Vue) {
    Vue.prototype.$sModels = {};
    Vue.prototype.$sModels.account = new AccountModel(Vue.prototype);
    Vue.prototype.$sModels.user = new UserModel(Vue.prototype);
    Vue.prototype.$sModels.users = new UsersModel(Vue.prototype);
    Vue.prototype.$sModels.product = new ProductModel(Vue.prototype);
    Vue.prototype.$sModels.contract = new ContractModel(Vue.prototype);
  }
};
