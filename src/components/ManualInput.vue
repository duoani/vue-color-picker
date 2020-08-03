<template>
  <div class="cpicker__manual">
    <div class="cpicker-title">
      {{ modeName }}
    </div>
    <template v-if="isRGB">
      <div class="cpicker-input">
        <number-input
          v-model="rgb.r"
          :min="0"
          :max="255"
          autocomplete="off"
          @change="handleConfirm"
        />
      </div>
      <div class="cpicker-input">
        <number-input
          v-model="rgb.g"
          :min="0"
          :max="255"
          autocomplete="off"
          @change="handleConfirm"
        />
      </div>
      <div class="cpicker-input">
        <number-input
          v-model="rgb.b"
          :min="0"
          :max="255"
          autocomplete="off"
          @change="handleConfirm"
        />
      </div>
      <div
        v-if="showAlpha"
        class="cpicker-input"
      >
        <number-input
          v-model="alpha"
          :min="0"
          :max="1"
          autocomplete="off"
          @change="handleConfirm"
        />
      </div>
    </template>
    <template v-else>
      <div class="cpicker-input">
        <input
          v-model="hex"
          type="text"
          @keyup.enter="handleConfirm"
          @blur="handleConfirm"
        >
      </div>
    </template>
    <div
      class="cpicker-mode"
      @click="handleToggleMode"
    >
      <svg
        viewBox="0 0 24 24"
        style="width: 24px; height: 24px; border: none;"
      >
        <path
          fill="#333"
          d="M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
        />
        <path
          fill="#333"
          d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15Z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
import NumberInput from './NumberInput'

const COLOR_MODE = {
  RGB: 1,
  HEX: 2
}

export default {

  components: {
    NumberInput
  },

  props: {
    color: {
      type: Object,
      required: true
    },
    showAlpha: Boolean
  },

  data () {
    return {
      mode: COLOR_MODE.HEX,
      rgb: {
        r: 0,
        g: 0,
        b: 0
      },
      alpha: 1,
      hex: ''
    }
  },

  computed: {
    modeName () {
      if (this.mode === COLOR_MODE.RGB) {
        return this.showAlpha ? 'RGBa' : 'RGB'
      }
      return 'HEX'
    },
    isRGB () {
      return this.mode === COLOR_MODE.RGB
    }
  },

  watch: {
    color: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val) {
          return
        }
        this.sync()
      }
    }
  },

  methods: {
    handleToggleMode () {
      this.mode = this.mode === COLOR_MODE.RGB ? COLOR_MODE.HEX : COLOR_MODE.RGB
      this.sync()
    },
    sync () {
      if (this.isRGB) {
        this.rgb = this.color.toRGB()
        let alpha = this.color.get('alpha')
        if (alpha === 0) {
          alpha = 0
        } else if (alpha === 100) {
          alpha = 1
        } else {
          alpha = (alpha / 100).toFixed(2)
        }
        this.alpha = alpha
      } else {
        this.hex = this.color.toHEX()
      }
    },
    handleConfirm () {
      let val
      if (this.mode === COLOR_MODE.RGB) {
        const { r, g, b } = this.rgb
        val = this.showAlpha ? `rgba(${r},${g},${b},${this.alpha})` : `rgb(${r},${g},${b})`
      } else {
        val = this.hex
      }
      this.color.fromString(val, true)
    }
  }
}
</script>
