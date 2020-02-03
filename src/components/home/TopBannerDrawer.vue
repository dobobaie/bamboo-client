<template>
  <v-content class="topBannerDrawer" v-if="drawer">
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-title>
              <a href="/">
                <img :src="logo" class="logo-name">
              </a>
            </v-list-item-title>
          </v-list-item>
          <v-list-item @click="register()">
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item>
          <v-list-item @click="login()">
            <v-list-item-title>Log in</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-content>
</template>

<script>
  import logoName from '@/assets/logo.png';

  import AccountLogin from '@/components/account/Login';
  import AccountRegister from '@/components/account/Register';

  export default {
    name: 'TopBannerDrawer',
    props: {
      drawer: Boolean
    },
    data: () => ({
      logo: logoName
    }),
    methods: {
      register() {
        this.$sModal.open(AccountRegister);
      },
      login() {
        const modal = this.$sModal.open(AccountLogin, {
          events: {
            loggedin: () => {
              modal.close();
              this.$router.push('/dashboard');
            }
          }
        });
      }
    },
  };
</script>

<style scoped></style>
