<template>
  <v-content class="dashboardBannerDrawer">
    <v-navigation-drawer permanent>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://cdn.onlinewebfonts.com/svg/img_184513.png">
          </v-list-item-avatar>

          <v-list-item-content v-if="$vuetify.breakpoint.smAndUp">
            <v-list-item-title class="name-user">{{ $sAuth.retrieveName() }}</v-list-item-title>
            <!-- <v-list-item-subtitle>Logged In</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list v-bind:class="{ mobile: !$vuetify.breakpoint.smAndUp }">
        <v-list-item link v-on:click="$router.push('/dashboard')">
          <v-list-item-icon>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-if="$vuetify.breakpoint.smAndUp">
            <v-list-item-title>{{ $_('DASHBOARD') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link v-on:click="$router.push('/my-contracts')">
          <v-list-item-icon>
            <v-icon>mdi-file-document-box-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-if="$vuetify.breakpoint.smAndUp">
            <v-list-item-title>{{ $_('MY_CONTRACTS') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link v-on:click="$router.push('/my-products')">
          <v-list-item-icon>
            <v-icon>mdi-monitor-cellphone</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-if="$vuetify.breakpoint.smAndUp">
            <v-list-item-title>{{ $_('MY_PRODUCTS') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item link v-if="$sAuth.isAdmin()" v-on:click="$router.push('/users')">
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-if="$vuetify.breakpoint.smAndUp">
            <v-list-item-title>{{ $_('USERS') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-on:click="$router.push('/my-account')">
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>

          <v-list-item-content v-if="$vuetify.breakpoint.smAndUp">
            <v-list-item-title>{{ $_('MY_ACCOUNT') }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn class="logout-btn" block @click="() => logout()">
            <v-icon>mdi-logout</v-icon> <span v-if="$vuetify.breakpoint.smAndUp">{{ $_('LOGOUT') }}</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-content>
</template>

<script>
  export default {
    name: 'DashboardBannerDrawer',
    methods: {
      async logout() {
        await this.$sModels.account.logout();
        this.$router.push('/');
      }
    }
  };
</script>

<style scoped>
  /deep/ aside.v-navigation-drawer {
    width: max-content !important;
  }
  /deep/ div.name-user::first-letter {
    text-transform: uppercase;
  }
  /deep/ div.v-list-item__title, /deep/ div.v-list-item__icon i.v-icon {
    color: #e36262 !important;
  }
  /deep/ div.name-user {
    color: #000 !important;
  }
  /deep/ button.logout-btn {
    background-color: #e36262 !important;
    color: #FFF;
  }
  /deep/ div.mobile div.v-list-item__icon {
    margin-right: auto;
    margin-left: auto;
  }
</style>
