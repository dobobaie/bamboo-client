<template>
  <v-content class="dashboard">
    <div class="d-flex">
      <v-flex class="flex-grow-0 flex-shrink-0">
        <DashboardBannerDrawer></DashboardBannerDrawer>
      </v-flex>
      <v-flex class="flex-grow-1 flex-shrink-1">
        <DashboardTopBanner></DashboardTopBanner>
        <UserTable :refresh="() => refresh()" :items="items" :search="search"></UserTable>
      </v-flex>
    </div>
  </v-content>
</template>

<script>
  import DashboardBannerDrawer from '@/components/dashboard/BannerDrawer';
  import DashboardTopBanner from '@/components/dashboard/TopBanner';
  import UserTable from '@/components/user/Table';
  
  export default {
    name: 'Users',
    components: {
      DashboardBannerDrawer,
      DashboardTopBanner,
      UserTable
    },
    data: () => ({
      items: null,
    }),
    created() {
      this.refresh();
    },
    methods: {
      search(e) {
        // eslint-disable-next-line
        console.log(e);
      },
      async refresh() {
        const { list } = await this.$sModels.users.retrieveAll();
        this.items = list;
      }
    }
  };
</script>

<style scoped>
  div.d-flex, /deep/ main.dashboardBannerDrawer, /deep/ main.dashboardTopBanner, /deep/ main.userTable {
    height: 100%;
  }
  /deep/ main.userTable {
    margin: 30px;
  }
</style>
