<template>
  <v-content class="contractTable">
    <v-alert text prominent type="error" v-if="error">{{ $_(error) }}</v-alert>
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
        <v-btn color="light-green" dark class="mt-2 ml-2" @click="() => createContract()">{{ $_('CREATE_CONTRACT') }}</v-btn>
      </v-card-title>
      <v-card-text v-if="!items"><Loading /></v-card-text>
      <v-data-table
        v-if="items"
        :headers="headers"
        :items="items"
        :search="localSearch"
      >
        <template v-slot:item.action="{ item }">
          <v-icon class="action" @click="updateContract(item.id)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-content>
</template>

<script>
  import Loading from "@/handlers/utils/Loading";
  import ContractUpsert from "@/components/contract/Upsert";
  
  export default {
    name: 'ContractTable',
    components: {
      Loading
    },
    props: {
      items: Array,
      search: Function,
      refresh: Function,
    },
    data: () => ({
      error: null,
      title: '',
      headers: [
        {
          text: 'Name',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Price (€)', value: 'price' },
        { text: 'Action', value: 'action' },
      ],
      localSearch: null,
    }),
    created() {
      this.title = this.$_('MY_CONTRACTS');
    },
    methods: {
      async createContract() {
        const modal = this.$sModal.open(ContractUpsert, { mode: 'create' });
        const { list } = await this.$sModels.product.retrieveAll();
        this.error = !list && 'NO_PRODUCTS_FOUND';
        if (!list) {
          modal.close();
          return ;
        }
        modal.setParams({ list });
        modal.on('close', () => this.refresh());
      },
      async updateContract(contract_id) {
        const modal = this.$sModal.open(ContractUpsert, { mode: 'update' });
        const { list } = await this.$sModels.product.retrieveAll();
        this.error = !list && 'NO_PRODUCTS_FOUND';
        if (!list) {
          modal.close();
          return ;
        }
        const { contract } = await this.$sModels.contract.retrieveContractById(contract_id);
        modal.setParams({ list, contract });
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
