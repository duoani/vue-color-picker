<template>
  <div class="cpicker__dropdown">
    <div
      class="cpicker__mask"
      @click="handleClose"
    />
    <div
      ref="box"
      class="cpicker__box"
      :style="{
        top: dropdownTop + 'px',
        left: dropdownLeft + 'px',
        visibility: visible ? 'visible' : 'hidden'
      }"
    >
      <palette-panel :color="color">
        <div class="cpicker__footer">
          <span
            class="cpicker-btn cpicker-btn-close"
            @click="handleClose"
          >
            关闭
          </span>
        </div>
      </palette-panel>
      <predefine-panel
        v-if="predefine.length"
        :color="color"
        :colors="predefine"
      />
      <div class="cpicker__custom">
        <saturation-panel :color="color" />
        <div class="cpicker__ho">
          <div class="cpicker__preview">
            <div
              :style="{
                backgroundColor: color.value
              }"
            />
          </div>
          <div class="cpicker__sliders">
            <hue-slider :color="color" />
            <alpha-slider
              v-if="showAlpha"
              :color="color"
            />
          </div>
        </div>
        <manual-input
          :color="color"
          :show-alpha="showAlpha"
        />
        <color-history
          v-if="history.length"
          :color="color"
          :colors="history"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SaturationPanel from './SaturationPanel'
import PredefinePanel from './PredefinePanel'
import PalettePanel from './PalettePanel'
import AlphaSlider from './AlphaSlider'
import HueSlider from './HueSlider'
import ManualInput from './ManualInput'
import ColorHistory from './ColorHistory'

export default {

  components: {
    PredefinePanel,
    PalettePanel,
    SaturationPanel,
    AlphaSlider,
    HueSlider,
    ManualInput,
    ColorHistory
  },

  props: {
    color: {
      type: Object,
      required: true
    },
    showAlpha: Boolean,
    history: Array,
    predefine: Array,
    top: Number,
    left: Number
  },

  data () {
    return {
      visible: false,
      inputVal: '',
      dropdownTop: 0,
      dropdownLeft: 0
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.updatePosition()
      // 避免Dropdown的位置抖动
      this.visible = true
    })
  },

  methods: {
    updatePosition () {
      let { left, top } = this
      const { clientHeight, clientWidth } = document.body
      const rect = this.$refs.box.getBoundingClientRect()
      if (left + rect.width > clientWidth) {
        left = clientWidth - rect.width
      }
      if (top + rect.height > clientHeight) {
        top = clientHeight - rect.height
      }
      this.dropdownTop = top
      this.dropdownLeft = left
    },
    handleClose () {
      this.$emit('close')
    }
  }
}
</script>
