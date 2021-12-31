<template>
<!--  <div id="nav">-->
<!--    <router-link to="/">Home</router-link> |-->
<!--    <router-link to="/about">About</router-link>-->
<!--  </div>-->
<!--  <router-view/>-->
  <div id="app" :style="styleHeight">
    <el-container :style="styleHeight">
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside>
          <Aside />
        </el-aside>
        <el-main>
            <Index msg="Welcome to Your Vue.js App"/>
        </el-main>
      </el-container>
      <el-footer>
        <p>footer</p>
      </el-footer>
    </el-container>
  </div>
<!--  <Index msg="Welcome to Your Vue.js App"/>-->
</template>
<script>
  import Index from './components/index/Index.vue'
  import Aside from './components/leeks/Aside.vue'
  import Header from './components/leeks/Header.vue'

  export default {
    name: 'App',
    data() {
      return {
        styleHeader: {
          height: "auto"
        },
        styleHeight: {
          height: "100%"
        },
        styleWidth: {
          width: "auto"
        },
        collapse: false
      };
    },
    components: {
      Index,
      Aside,
      Header
    }
  }

</script>
<style lang="scss">
  body{
    margin:0;
    padding:0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .el-aside {
    height:100vh;
  }
  /*#app {*/
  /*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
  /*  -webkit-font-smoothing: antialiased;*/
  /*  -moz-osx-font-smoothing: grayscale;*/
  /*  text-align: center;*/
  /*  color: #2c3e50;*/
  /*}*/

/*#nav {*/
/*  padding: 30px;*/

/*  a {*/
/*    font-weight: bold;*/
/*    color: #2c3e50;*/

/*    &.router-link-exact-active {*/
/*      color: #42b983;*/
/*    }*/
/*  }*/
/*}*/
</style>


