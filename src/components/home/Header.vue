<template>
  <v-content class="homeHeader">
    <header>
      <div class="preview">
        <div class="shadow"></div>
        <img :src="headerImg" alt="">
      </div>
      <v-card color="transparent" flat>
        <div class="justify-center">
          <h1>{{ $_('HOME_H1_TITLE') }}</h1>
        </div>
        <div class="justify-center">
          <h3>{{ $_('HOME_H3_TITLE') }}</h3>
        </div>
        <div class="justify-center">
          <v-btn tile dark @click="register()">{{ $_('HOME_BTN_SUBSCRIBE') }}</v-btn>
        </div>
      </v-card>
    </header>
  </v-content>
</template>

<script>
  import headerImg from '@/assets/header.jpg';
  
  import AccountRegister from '@/components/account/Register';

  export default {
    name: 'HomeHeader',
    data: () => ({
      headerImg
    }),
    methods: {
      register() {
        this.$sModal.open(AccountRegister);
      },
    },
  };
</script>

<style scoped>
  header {
    margin-top: -70px;
    position: relative;
    overflow: hidden;
    padding-bottom: 225px;
  }
  header > div.preview {
    position: absolute;
    width: 100%;
  }
  header > div.preview div.shadow {
    position: absolute;
    background: rgba(0, 0, 0, 0.01);
    width: 100%;
    height: 100%;
  }
  header > div.preview img {
    filter: blur(2px);
    width: 100%;
    height: auto;
  }
  /deep/ header > div.v-card {
    text-align: center;
    color: #e36262 !important;
    text-shadow: 1px 0 1px #FFF;
    background: rgba(255, 255, 255, 0.67) !important;
    padding: 20px;
    width: max-content;
    margin: 240px auto 0 auto;
  }
  /deep/ header > div.v-card h3 {
    max-width: 350px;
    margin: 0 auto;
  }
  /deep/ header > div.v-card button {
    margin-top: 20px;
    background-color: #e36262 !important;
    padding: 25px 35px;
  }

  @media (max-width: 800px) {
    /deep/ header > div.v-card {
      margin-top: 120px;
    }
  }

  @media (max-width: 600px) {
    /deep/ header > div.v-card h1 {
      font-size: 1rem;
    }
    /deep/ header > div.v-card h3 {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 500px) {
    /deep/ header > div.v-card {
      margin-top: 80px;
    }
  }
</style>
