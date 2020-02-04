<template>
  <v-content class="my-contracts">
    <div class="d-flex">
      <v-flex class="flex-grow-0 flex-shrink-0">
        <DashboardBannerDrawer></DashboardBannerDrawer>
      </v-flex>
      <v-flex class="flex-grow-1 flex-shrink-1 dashboard-background">
        <DashboardTopBanner></DashboardTopBanner>
        <ContractTable :items="items" :search="search" :refresh="() => refresh()"></ContractTable>
      </v-flex>
    </div>
  </v-content>
</template>

<script>
  import DashboardBannerDrawer from '@/components/dashboard/BannerDrawer';
  import DashboardTopBanner from '@/components/dashboard/TopBanner';
  import ContractTable from '@/components/contract/Table';
  
  export default {
    name: 'MyContracts',
    components: {
      DashboardBannerDrawer,
      DashboardTopBanner,
      ContractTable
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
        const { list } = await this.$sModels.contract.retrieveAll();
        this.items = list;
      }
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
  div.d-flex, /deep/ main.dashboardBannerDrawer, /deep/ main.contractTable {
    height: 100%;
  }
  /deep/ main.contractTable {
    margin: 30px;
  }
</style>
