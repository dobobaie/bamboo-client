<template>
  <v-content class="dashboard">
    <div class="d-flex">
      <v-flex class="flex-grow-0 flex-shrink-0">
        <DashboardBannerDrawer></DashboardBannerDrawer>
      </v-flex>
      <v-flex class="flex-grow-1 flex-shrink-1">
        <DashboardTopBanner></DashboardTopBanner>
        <h3 class="dashboard-title">{{ $_("DASHBOARD_WELCOME") }}</h3>
        <v-row>
          <v-col>
            <ContractTable :items="itemsContracts" :refresh="() => refreshContracts()"></ContractTable>
          </v-col>
          <v-col>
            <ProductTable :items="itemsProducts" :refresh="() => refreshProducts()"></ProductTable>
          </v-col>
        </v-row>
      </v-flex>
    </div>
  </v-content>
</template>

<script>
  import DashboardBannerDrawer from '@/components/dashboard/BannerDrawer';
  import DashboardTopBanner from '@/components/dashboard/TopBanner';
  import ContractTable from '@/components/contract/Table';
  import ProductTable from '@/components/product/Table';
  
  export default {
    name: 'Dashboard',
    components: {
      DashboardBannerDrawer,
      DashboardTopBanner,
      ContractTable,
      ProductTable
    },
    data: () => ({
      itemsContracts: null,
      itemsProducts: null,
    }),
    created() {
      this.refreshProducts();
      this.refreshContracts();
    },
    methods: {
      async refreshProducts() {
        const { list } = await this.$sModels.product.retrieveAll();
        this.itemsProducts = list;
      },
      async refreshContracts() {
        const { list } = await this.$sModels.contract.retrieveAll();
        this.itemsContracts = list;
      },
    }
  };
</script>

<style scoped>
  div.d-flex, /deep/ main.dashboardBannerDrawer, /deep/ main.dashboardTopBanner, /deep/ main.contractTable, /deep/ main.productTable {
    height: 100%;
  }
  h3.dashboard-title, /deep/ main.contractTable, /deep/ main.productTable {
    margin: 30px 30px 0 30px;
  }
</style>
