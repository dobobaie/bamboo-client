<template>
  <v-content class="my-products">
    <div class="d-flex">
      <v-flex class="flex-grow-0 flex-shrink-0">
        <DashboardBannerDrawer></DashboardBannerDrawer>
      </v-flex>
      <v-flex class="flex-grow-1 flex-shrink-1">
        <DashboardTopBanner></DashboardTopBanner>
        <ProductTable :items="items" :search="search" :refresh="() => refresh()"></ProductTable>
      </v-flex>
    </div>
  </v-content>
</template>

<script>
  import DashboardBannerDrawer from '@/components/dashboard/BannerDrawer';
  import DashboardTopBanner from '@/components/dashboard/TopBanner';
  import ProductTable from '@/components/product/Table';
  
  export default {
    name: 'MyProducts',
    components: {
      DashboardBannerDrawer,
      DashboardTopBanner,
      ProductTable
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
        const { list } = await this.$sModels.product.retrieveAll();
        this.items = list;
      }
    }
  };
</script>

<style scoped>
  div.d-flex, /deep/ main.dashboardBannerDrawer, /deep/ main.dashboardTopBanner, /deep/ main.productTable {
    height: 100%;
  }
  /deep/ main.productTable {
    margin: 30px;
  }
</style>
