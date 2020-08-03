<template>
  <input
    :value="num"
    type="number"
    min="0"
    max="255"
    step="1"
    autocomplete="off"
    v-bind="$attrs"
    @input="handleChange"
  >
</template>

<script>
export default {

  props: {
    value: [String, Number],
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    useInt: Boolean
  },

  data () {
    return {
      num: 0
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.num = (this.useInt ? parseInt(val, 10) : Number(val)) || 0
      }
    }
  },

  methods: {
    handleChange (e) {
      var val = e.target.value
      val = (this.useInt ? parseInt(val, 10) : Number(val)) || 0
      if (val < this.min) {
        val = this.min
      }
      if (val > this.max) {
        val = this.max
      }
      this.$nextTick(() => {
        this.num = val
      })
      this.$emit('input', val)
      this.$emit('change', val)
    }
  }

}
</script>
