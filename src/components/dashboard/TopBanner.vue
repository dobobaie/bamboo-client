<template>
  <v-content class="dashboardTopBanner">
    <nav>
      <v-toolbar class="banner transparent" flat>
        <v-toolbar-title>
          <a href="/dashboard" @click="$sRouter.navigate($event)">
            <img :src="logo" class="logo-name">
          </a>
        </v-toolbar-title>
        <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp" class="title-navigation">{{ page_name }}</v-toolbar-title>
      </v-toolbar>
    </nav>
  </v-content>
</template>

<script>
  import logoName from '@/assets/logo.png';

  export default {
    name: 'DashboardTopBanner',
    data: () => ({
      logo: logoName,
      page_name: null,
    }),
    created() {
      this.refreshPageName();
    },
    methods: {
      refreshPageName() {
        this.page_name = this.$_(this.$router.currentRoute.name);
      }
    },
    watch:{
      $route() {
        this.refreshPageName();
      }
    }
  };
</script>

<style scoped>
  /deep/ nav {
    padding: 4px 0;
  }
  /deep/ nav, /deep/ nav > header.banner {
    border-bottom: 1px solid rgb(235, 235, 235);
  }
  /deep/ nav > header.banner, /deep/ nav > header.banner div.v-toolbar__content {
    height: 64px !important;
  }
  header.banner div.v-toolbar__title {
    cursor: pointer;
  }
  header.banner.transparent {
    color: #FFF;
  }

  div.v-toolbar__title {
    overflow: initial;
  }
  div.v-toolbar__title img.logo-name {
    height: 50px;
    width: auto;
  }
  div.title-navigation {
    margin-left: 45px;
    color: #000;
  }
</style>
