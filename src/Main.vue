<template>
  <div
    class="cpicker"
    @click="open"
  >
    <div
      class="cpicker__color"
      :style="{
        backgroundColor: displayColor
      }"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import PickerDropdown from './components/PickerDropdown'
import Color from './Color'
import ColorHistory from './ColorHistory'

const HISTORY_STACK_LENGTH = 16
const history = new ColorHistory(HISTORY_STACK_LENGTH)

export default {

  components: {
    // PickerDropdown
  },

  props: {
    value: String,
    showAlpha: Boolean,
    colorFormat: String,
    disabled: Boolean,
    appendToBody: Boolean,
    // 预定义的颜色列表
    predefine: {
      type: Array,
      default: () => []
    }
  },

  data () {
    const color = new Color({
      enableAlpha: this.showAlpha,
      format: this.colorFormat,
      onChange: () => {
        this.handleChange()
      }
    })

    return {
      color,
      history,
      colorMutated: false,
      showPicker: false
    }
  },

  computed: {
    displayColor () {
      if (!this.value) {
        return 'transparent'
      }
      const { r, g, b } = this.color.toRGB()
      return this.showAlpha
        ? `rgba(${r}, ${g}, ${b}, ${this.color.get('alpha') / 100})`
        : `rgb(${r}, ${g}, ${b})`
    }
  },

  watch: {
    value: {
      immediate: true,
      handler (val) {
        if (val && val !== this.color.value) {
          this.color.fromString(val)
        }
      }
    }
  },

  methods: {
    open () {
      if (this.disabled || this.showPicker) {
        return
      }
      this.$emit('before-open')
      const me = this
      this.showPicker = !this.showPicker
      const { color, showAlpha, predefine, history, $el } = this
      const rect = $el.getBoundingClientRect()
      var dropdown
      var vm
      var el
      const VuePickerDropdown = Vue.extend({
        render (h) {
          const props = {
            color: color,
            showAlpha: showAlpha,
            history: history.stack,
            predefine,
            top: rect.top + rect.height,
            left: rect.left
          }
          return h(PickerDropdown, {
            props,
            on: {
              close: () => {
                me.close()
                if (el) {
                  el.parentNode.removeChild(el)
                  dropdown.$destroy()
                  vm = null
                  el = null
                }
              }
            }
          })
        }
      })
      dropdown = new VuePickerDropdown()
      vm = dropdown.$mount()
      el = vm.$el
      if (this.appendToBody) {
        document.body.appendChild(el)
      } else {
        this.$el.parentNode.appendChild(el)
      }
    },
    close () {
      this.showPicker = false
      if (this.colorMutated) {
        this.history.push(this.color.value)
      }
      this.$emit('close', this.colorMutated)
    },
    handleChange () {
      const value = this.color.value
      this.colorMutated = true
      this.$emit('input', value)
      this.$emit('change', value)
    },
    resetColor () {
      this.$nextTick(_ => {
        if (this.value) {
          this.color.fromString(this.value)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "./scss/color-picker.scss"
</style>
