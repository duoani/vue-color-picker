<template>
  <div class="cpicker__slider cpicker__alpha-slider">
    <div
      ref="bar"
      class="slider-bar"
      :style="{
        background
      }"
      @click="handleClick"
    />
    <div
      ref="trigger"
      class="slider-tri"
      :style="{
        left: triggerLeft + 'px'
      }"
    >
      <div class="slider-tri__dot" />
    </div>
  </div>
</template>

<script>
import draggable from '../draggable'

export default {

  props: {
    color: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      triggerLeft: 0,
      background: ''
    }
  },

  watch: {
    'color._alpha'() {
      this.update()
    },

    'color.value'() {
      this.update()
    }
  },

  mounted () {
    const { bar, trigger } = this.$refs

    const dragConfig = {
      drag: (event) => {
        this.handleDrag(event)
      },
      end: (event) => {
        this.handleDrag(event)
      }
    }

    draggable(bar, dragConfig)
    draggable(trigger, dragConfig)
    this.update()
  },

  methods: {
    handleClick(event) {
      const trigger = this.$refs.trigger
      const target = event.target

      if (target !== trigger) {
        this.handleDrag(event)
      }
    },
    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect()
      let left = event.clientX - rect.left
      left = Math.max(0, Math.min(left, rect.width))
      this.color.set('alpha', Math.round(left / rect.width * 100))
    },
    getTriggerLeft() {
      const el = this.$el
      const alpha = this.color._alpha

      if (!el) return 0
      return Math.round(alpha * el.offsetWidth / 100)
    },
    getBackground() {
      if (this.color && this.color.value) {
        const { r, g, b } = this.color.toRGB()
        return `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, 1) 100%)`
      }
      return null
    },
    update () {
      this.triggerLeft = this.getTriggerLeft()
      this.background = this.getBackground()
    }
  }
}
</script>
