<template>
  <v-content class="productTable">
    <v-card>
      <v-card-title>
        {{ title }}
        <v-spacer></v-spacer>
        <v-text-field
          v-if="search"
          v-model="localSearch"
          append-icon="mdi-search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-btn color="light-green" dark class="mt-2 ml-2" @click="() => createProduct()">{{ $_('CREATE_PRODUCT') }}</v-btn>
      </v-card-title>
      <v-card-text v-if="!items"><Loading /></v-card-text>
      <v-data-table
        v-if="items"
        :headers="headers"
        :items="items"
        :search="localSearch"
      >
        <template v-slot:item.action="{ item }">
          <v-icon class="action" @click="updateProduct(item.id)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-content>
</template>

<script>
  import Loading from "@/handlers/utils/Loading";
  import ProductUpsert from "@/components/product/Upsert";
  
  export default {
    name: 'ProductTable',
    components: {
      Loading
    },
    props: {
      items: Array,
      search: Function,
      refresh: Function,
    },
    data: () => ({
      title: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Estimated price (€)', value: 'estimated_price' },
        { text: 'Action', value: 'action' },
      ],
      localSearch: null,
    }),
    created() {
      this.title = this.$_('MY_PRODUCTS');
    },
    methods: {
      createProduct() {
        const modal = this.$sModal.open(ProductUpsert, { mode: 'create' });
        modal.setParams({});
        modal.on('close', () => this.refresh());
      },
      async updateProduct(product_id) {
        const modal = this.$sModal.open(ProductUpsert, { mode: 'update' });
        const { product } = await this.$sModels.product.retrieveProductById(product_id);
        modal.setParams(product);
        modal.on('close', () => this.refresh());
      }
    },  
    watch: {
      localSearch() {
        this.search(this.localSearch);
      }
    }
  };
</script>

<style scoped>
  /deep/ div.v-card__title, /deep/ div.v-data-footer {
    background-color: #ee8d8d !important;
    color: #FFF;
  }
</style>
