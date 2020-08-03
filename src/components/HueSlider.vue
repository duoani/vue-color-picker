<template>
  <div class="cpicker__slider cpicker__hue-slider">
    <div
      ref="bar"
      class="slider-bar"
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
      triggerLeft: 0
    }
  },

  computed: {
    hueValue() {
      const hue = this.color.get('hue')
      return hue
    }
  },

  watch: {
    hueValue() {
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
      const hue = Math.round(left / rect.width * 360)
      this.color.set('hue', hue)
    },
    getTriggerLeft() {
      const el = this.$el
      const hue = this.color.get('hue')

      if (!el) return 0
      return Math.round(hue * el.offsetWidth / 360)
    },
    update () {
      this.triggerLeft = this.getTriggerLeft()
    }
  }
}
</script>
