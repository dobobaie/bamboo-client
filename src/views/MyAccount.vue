<template>
  <v-content class="my-account">
    <div class="d-flex">
      <v-flex class="flex-grow-0 flex-shrink-0">
        <DashboardBannerDrawer></DashboardBannerDrawer>
      </v-flex>
      <v-flex class="flex-grow-1 flex-shrink-1 dashboard-background">
        <DashboardTopBanner></DashboardTopBanner>
        <UserInfos :infos="infos"></UserInfos>
      </v-flex>
    </div>
  </v-content>
</template>

<script>
  import DashboardBannerDrawer from '@/components/dashboard/BannerDrawer';
  import DashboardTopBanner from '@/components/dashboard/TopBanner';
  import UserInfos from '@/components/user/Infos';

  export default {
    name: 'MyAccount',
    components: {
      DashboardBannerDrawer,
      DashboardTopBanner,
      UserInfos
    },
    data: () => ({
      infos: null
    }),
    async created() {
      const { user } = await this.$sModels.user.retrieveInfos();
      this.infos = user;
    }
  };
</script>

<style scoped>
  div.dashboard-background {
    background: url('https://images.pexels.com/photos/1546901/pexels-photo-1546901.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
  }
  div.dashboard-background h3 {
    color: #FFF;
  }
  /deep/ main.dashboardTopBanner {
    background-color: #FFF;
  }
  div.d-flex, /deep/ main.dashboardBannerDrawer, /deep/ main.userInfos {
    height: 100%;
  }
  /deep/ main.userInfos {
    margin: 30px;
    max-width: 400px;
  }
</style>
