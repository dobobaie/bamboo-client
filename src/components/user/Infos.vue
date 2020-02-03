<template>
  <v-content class="userInfos">
    <v-card outlined>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text v-if="loaded">
        <v-alert text prominent type="error" v-if="error">{{ $_(error) }}</v-alert>
        <v-alert text prominent type="success" v-if="success">{{ $_(success) }}</v-alert>
        <FieldText :model="first_name" label="First Name" />
        <FieldText :model="last_name" label="Last Name" />
      </v-card-text>
      <v-card-text v-if="!loaded"><Loading /></v-card-text>
      <v-card-actions v-if="loaded">
        <v-btn color="light-green" dark @click="() => update()">Update</v-btn>
        <v-btn v-if="$sAuth.isAdmin()" color="red" dark @click="() => remove()">Remove</v-btn>
      </v-card-actions>
    </v-card>
  </v-content>
</template>

<script>
  import FieldText from "@/handlers/field/Text";
  import Loading from "@/handlers/utils/Loading";
  
  export default {
    name: 'UserInfos',
    components: {
      FieldText,
      Loading
    },
    props: {
      events: Object,
      infos: Object,
      params: Object,
    },
    data: () => ({
      loaded: false,
      error: null,
      success: null,
      title: '',
      user_id: '',
      first_name: { value: '' },
      last_name: { value: '' },
    }),
    created() {
      this.title = this.$_('MY_ACCOUNT');
    },
    methods: {
      async update() {
        const { error } = await this.$sModal.loading(
          this.$sModels.user.update({
            first_name: this.first_name.value,
            last_name: this.last_name.value,
          }, this.user_id)
        );
        this.error = error && error.code;
      },
      async remove() {
        const { error } = await this.$sModal.loading(
          this.$sModels.user.remove(this.user_id)
        );
        this.error = error && error.code;
        if (!this.error && this.events) {
          this.events._closeModal();
        }
      },
      refreshValues(values) {
        this.loaded = true;
        this.user_id = values && values.id;
        this.first_name.value = values && values.first_name;
        this.last_name.value = values && values.last_name;
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
  /deep/ div.v-card__title, /deep/ div.v-data-footer {
    background-color: #ee8d8d !important;
    color: #FFF;
  }
  /deep/ div.v-alert {
    margin-top: 25px;
  }
</style>
