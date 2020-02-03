<template>
  <v-content class="home">
    <HomeTopBanner :transparent="true" :menuDrawer="() => openMenuDrawer()"></HomeTopBanner>
    <HomeTopBannerDrawer :drawer="drawer"></HomeTopBannerDrawer>
    <HomeHeader></HomeHeader>
    <p>Others marketing stuff here...</p>
  </v-content>
</template>

<script>
  import HomeTopBanner from '@/components/home/TopBanner';
  import HomeTopBannerDrawer from '@/components/home/TopBannerDrawer';
  import HomeHeader from '@/components/home/Header';

  export default {
    name: 'Home',
    components: {
      HomeTopBanner,
      HomeTopBannerDrawer,
      HomeHeader
    },
    data: () => ({
      drawer: false
    }),
    methods: {
      openMenuDrawer() {
        this.drawer = !this.drawer;
      }
    }
  };
</script>

<style scoped>
  /deep/ main.topBanner {
    position: relative;
    z-index: 2;
  }
  /deep/ main.topBannerDrawer {
    height: 100%;
  }
</style>
