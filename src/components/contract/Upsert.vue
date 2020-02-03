<template>
  <v-content class="contractUpsert">
    <v-card outlined>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text v-if="loaded">
        <v-alert text prominent type="error" v-if="error">{{ $_(error) }}</v-alert>
        <v-alert text prominent type="success" v-if="success">{{ $_(success) }}</v-alert>
        <FieldSelect :items="items" :model="model" label="Name of the product (ex: My iphone S6)" />
      </v-card-text>
      <v-card-text v-if="!loaded"><Loading /></v-card-text>
      <v-card-actions v-if="loaded">
        <v-btn v-if="localMode && localMode === 'create'" color="light-green" dark @click="() => create()">Create</v-btn>
        <v-btn v-if="localMode && localMode !== 'create'" color="light-green" dark @click="() => update()">Update</v-btn>
        <v-btn v-if="localMode && localMode !== 'create'"  color="red" dark @click="() => remove()">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
  import FieldSelect from "@/handlers/field/Select";
  import Loading from "@/handlers/utils/Loading";
  
  export default {
    name: 'ContractUpsert',
    components: {
      FieldSelect,
      Loading
    },
    props: {
      events: Object,
      mode: String,
      infos: Object,
      params: Object,
    },
    data: () => ({
      localMode: null,
      loaded: false,
      error: null,
      success: null,
      title: '',
      contract_id: '',
      items: [],
      model: { value: 0 }
    }),
    created() {
      if (this.mode && this.mode === 'create') {
        this.title = this.$_('CREATE_CONTRACT');
        this.localMode = this.mode;
      } else {
        this.title = this.$_('EDIT_CONTRACT');
        this.localMode = 'update';
      }
      if (this.params) {
        this.refreshValues(this.params);
      }
    },
    methods: {
      async create() {
        const { error } = await this.$sModal.loading(
          this.$sModels.contract.create({
            product_id: this.model.value
          })
        );
        this.error = error && error.code;
        if (!this.error && this.events) {
          this.events._closeModal();
        }
      },
      async update() {
        const { error } = await this.$sModal.loading(
          this.$sModels.contract.update(this.contract_id, {
            product_id: this.model.value
          })
        );
        this.error = error && error.code;
      },
      async remove() {
        const { error } = await this.$sModal.loading(
          this.$sModels.contract.remove(this.contract_id)
        );
        this.error = error && error.code;
        if (!this.error && this.events) {
          this.events._closeModal();
        }
      },
      refreshValues(values) {
        this.loaded = true;
        this.contract_id = values && values.contract && values.contract.id;
        this.items = values && values.list;
        this.model.value = values && values.contract && values.contract.product_id;
      },
      updateParams(values) {
        this.refreshValues(values);
      }
    },
    watch: {
      infos() {
        this.refreshValues(this.infos);
      }
    }
  };
</script>

<style scoped>
  /deep/ div.v-card {
    width: 375px;
  }
  /deep/ div.v-card__title, /deep/ div.v-data-footer {
    background-color: #ee8d8d !important;
    color: #FFF;
  }
  /deep/ div.v-alert {
    margin-top: 25px;
  }
</style>
