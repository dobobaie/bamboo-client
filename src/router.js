import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import Dashboard from '@/views/Dashboard.vue';
import MyContracts from '@/views/MyContracts.vue';
import MyProducts from '@/views/MyProducts.vue';
import MyAccount from '@/views/MyAccount.vue';
import Users from '@/views/Users.vue';
import NotFound from '@/views/NotFound.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'HOME',
      path: '/',
      component: Home,
      beforeEnter(to, from, next) {
        next(
          router.app.$sAuth.isConnected()
            ? '/dashboard'
            : undefined
        );
      }
    },
    {
      name: 'DASHBOARD',
      path: '/dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        next(
          !router.app.$sAuth.isConnected()
            ? '/'
            : undefined
        );
      }
    },
    {
      name: 'MY_CONTRACTS',
      path: '/my-contracts',
      component: MyContracts,
      beforeEnter(to, from, next) {
        next(
          !router.app.$sAuth.isConnected()
            ? '/'
            : undefined
        );
      }
    },
    {
      name: 'MY_PRODUCTS',
      path: '/my-products',
      component: MyProducts,
      beforeEnter(to, from, next) {
        next(
          !router.app.$sAuth.isConnected()
            ? '/'
            : undefined
        );
      }
    },
    {
      name: 'MY_ACCOUNT',
      path: '/my-account',
      component: MyAccount,
      beforeEnter(to, from, next) {
        next(
          !router.app.$sAuth.isConnected()
            ? '/'
            : undefined
        );
      }
    },
    {
      name: 'USERS',
      path: '/users',
      component: Users,
      beforeEnter(to, from, next) {
        next(
          !router.app.$sAuth.isConnected() && !router.app.$sAuth.isAdmin()
            ? '/'
            : undefined
        );
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ]
});

export default router;
