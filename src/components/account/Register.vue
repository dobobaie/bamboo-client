<template>
  <v-content class="account-register">
    <v-card>
      <v-card-text>
        <ServicesModalClose :click="() => events._closeModal()" />
        <v-alert text prominent type="error" v-if="error">{{ $_(error) }}</v-alert>
        <v-alert text prominent type="success" v-if="success">{{ $_(success) }}</v-alert>
        <v-form ref="form" v-if="!success">
          <FieldText :model="first_name" label="First Name" />
          <FieldText :model="last_name" label="Last Name" />
          <FieldText :model="email" label="Email" type="email" />
          <FieldText :model="password" label="Password" type="password" />
          <FieldText :model="phone_number" label="Phone Number (ex: +33 6 20 35 45 87)" />
          <div class="submit">
            <v-btn tile dark @click="() => validate()">Register</v-btn>
          </div>
        </v-form>
      </v-card-text>
      <v-card-text>
        Already an account ? Then let <a @click="login()">Log in</a> to continue.
      </v-card-text>
    </v-card>
  </v-content>
</template>

<script>
  import AccountLogin from '@/components/account/Login';
  import ServicesModalClose from '@/components/services/modal/Close';
  import FieldText from "@/handlers/field/Text";
  
  export default {
    name: 'AccountRegister',
    components: {
      ServicesModalClose,
      FieldText
    },
    props: {
      events: Object
    },
    data: () => ({
      first_name: { value: '' },
      last_name: { value: '' },
      email: { value: '' },
      password: { value: '' },
      phone_number: { value: '' },
      error: null,
      success: null
    }),
    methods: {
      login() {
        this.events._switchTo(AccountLogin);
      },
      async validate() {
        const { error } = await this.$sModal.loading(
          this.$sModels.account.register({
            first_name: this.first_name.value,
            last_name: this.last_name.value,
            email: this.email.value,
            password: this.password.value,
            phone_number: this.phone_number.value,
          })
        );
        this.error = error && error.code;
        this.success = !this.error && 'SUCCESSFULL_REGISTERED';
      }
    }
  };
</script>

<style scoped>
  /deep/ div.v-card {
    max-width: 400px;
    width: 100%;
  }
  /deep/ div.v-card div.submit button {
    margin-top: 20px;
    background-color: #e36262 !important;
    padding: 25px 35px;
  }
</style>
