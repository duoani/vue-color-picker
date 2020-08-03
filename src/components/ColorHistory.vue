<template>
  <div class="cpicker__history">
    <div class="cpicker-title">
      最近
    </div>
    <div class="history-list color-block-list">
      <div
        v-for="(c, index) in colors"
        :key="index"
        class="color-block"
        @click="handleClick(c)"
      >
        <div
          :style="{
            'backgroundColor': c
          }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: {
    color: {
      type: Object,
      required: true
    },
    colors: {
      type: Array,
      required: true
    }
  },

  methods: {
    handleClick (color) {
      this.color.fromString(color, true)
    }
  }

}
</script>
