<template>
  <v-content class="productUpsert">
    <v-card outlined>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text v-if="loaded">
        <v-alert text prominent type="error" v-if="error">{{ $_(error) }}</v-alert>
        <v-alert text prominent type="success" v-if="success">{{ $_(success) }}</v-alert>
        <FieldText :model="name" label="Name of the product (ex: My iphone S6)" />
        <FieldText :model="estimated_price" label="Estimated price (ex: 650 €)" type="number"/>
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
  import FieldText from "@/handlers/field/Text";
  import Loading from "@/handlers/utils/Loading";
  
  export default {
    name: 'ProductUpsert',
    components: {
      FieldText,
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
      product_id: '',
      name: { value: '' },
      estimated_price: { value: '' },
    }),
    created() {
      if (this.mode && this.mode === 'create') {
        this.title = this.$_('CREATE_PRODUCT');
        this.localMode = this.mode;
      } else {
        this.title = this.$_('EDIT_PRODUCT');
        this.localMode = 'update';
      }
      if (this.params) {
        this.refreshValues(this.params);
      }
    },
    methods: {
      async create() {
        const { error } = await this.$sModal.loading(
          this.$sModels.product.create({
            name: this.name.value,
            estimated_price: this.estimated_price.value,
          })
        );
        this.error = error && error.code;
        if (!this.error && this.events) {
          this.events._closeModal();
        }
      },
      async update() {
        const { error } = await this.$sModal.loading(
          this.$sModels.product.update(this.product_id, {
            name: this.name.value,
            estimated_price: this.estimated_price.value,
          })
        );
        this.error = error && error.code;
      },
      async remove() {
        const { error } = await this.$sModal.loading(
          this.$sModels.product.remove(this.product_id)
        );
        this.error = error && error.code;
        if (!this.error && this.events) {
          this.events._closeModal();
        }
      },
      refreshValues(values) {
        this.loaded = true;
        this.product_id = values && values.id;
        this.name.value = values && values.name;
        this.estimated_price.value = values && values.estimated_price;
      },
      updateParams(values) {
        this.refreshValues(values);
      }
    },
    watch: {
      infos() {
        this.refreshValues(this.infos);
      },
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
