<template>
  <div id="app">
    <vue-color-picker
      v-model="value"
      show-alpha
      @close="handleClose"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '#ff00ff'
    }
  },
  methods: {
    handleClose () {
      console.log('picker colse')
    }
  }
};
</script>

<style>
  html,
  body {
    margin: 0;
    height: 100%;
    font-family: -apple-system, sans-serif;
  }

  #app {
    height: 100%;
  }
</style>
