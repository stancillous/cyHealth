<template>

  <!-- <HomePageComp/> -->

  <router-view></router-view>
</template>

<script>
// import HomePageComp from './components/HomePage.vue'
  export default{
          data(){
            return{
                selectedCountry:'afghanistan',
              }
          },

          provide:{
            API_KEY:'51f4c83034mshb76b94cb1a5ccdfp10d9e3jsn296bc6fe16c0'
          },

    components:{
      // HomePageComp
    }
  }
</script>

<style lang="scss">


</style>
