<template>
    <div id="app">
        <div class="my"></div>
        <img src="./assets/images/logo.png">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;

        .my{
            width: 500px;
            height: 500px;
            background: url("./assets/images/bg.jpg");
        }
    }

</style>
