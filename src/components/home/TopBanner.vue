<template>
  <v-content class="topBanner">
    <nav v-bind:class="{ fixed }">
      <v-toolbar class="banner" v-bind:class="{ transparent }" flat>
        <v-toolbar-title>
          <a href="/" @click="$sRouter.navigate($event)">
            <img :src="logo" class="logo-name">
          </a>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
          <v-btn text class="underline" @click="register()">Register</v-btn>
          <v-btn text class="underline" @click="login()">Log in</v-btn>
        </v-toolbar-items>
        <template v-if="!$vuetify.breakpoint.smAndUp">
          <v-btn icon @click="menuDrawer()">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
      </v-toolbar>
    </nav>
  </v-content>
</template>

<script>
  import logoName from '@/assets/logo.png';

  import AccountLogin from '@/components/account/Login';
  import AccountRegister from '@/components/account/Register';

  export default {
    name: 'TopBanner',
    props: {
      fixed: Boolean,
      transparent: Boolean,
      menuDrawer: Function
    },
    data: () => ({
      logo: logoName,
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

<style scoped>
  /deep/ nav > header.banner {
    border-bottom: 1px solid rgb(235, 235, 235);
  }
  /deep/ nav.fixed {
    height: 70px;
  }
  /deep/ nav.fixed > header.banner {
    z-index: 2;
    position: fixed;
    top: 0;
    width: 100%;
    width: -moz-available;
    width: -webkit-strech;
    width: strech;
    border-bottom: 1px solid rgb(235, 235, 235);
  }
  header.banner.transparent {
    border-bottom: none;
  }
  header.banner div.v-toolbar__title {
    cursor: pointer;
  }
  header.banner button {
    text-transform: none;
    color: #767676 !important;
    font-size: 1em;
    font-weight: bold;
  }
  header.banner.transparent, header.banner.transparent button {
    color: #FFF;
  }
  header.banner button.underline:hover {
    border-bottom: 2px solid rgba(0, 0, 0, 0.54);
  }
  header.banner.transparent button.underline:hover {
    border-bottom: 2px solid #767676;;
  }

  div.v-toolbar__title {
    overflow: initial;
  }
  div.v-toolbar__title img.logo-name {
    height: 50px;
    width: auto;
  }
</style>
