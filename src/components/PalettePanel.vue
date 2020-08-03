<template>
  <div class="cpicker__palette">
    <ul class="color-block-list">
      <li
        v-for="c in PALETTE_COLORS"
        :key="c"
        class="color-block"
        :title="c === 'transparent' ? '清除' : ''"
        :class="{
          'palette-color--clear': c === 'transparent'
        }"
      >
        <div
          :style="{ backgroundColor: c }"
          @click="handleClick(c)"
        />
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
const PALETTE_COLORS = [
  '#d81b43', '#e91e4e', '#ec4064', '#f0627d', '#f48fa0', 'transparent',
  '#8e24aa', '#9c27b0', '#ab47bc', '#ba68c8', '#ce93d8', '#fff',
  '#512da8', '#5e35b1', '#673ab7', '#7e57c2', '#9575cd', '#D1D1D1',
  '#303f9f', '#3949ab', '#5c6bc0', '#7986cb', '#9fa8da', '#b5b6b6',
  '#1e88e5', '#2196f3', '#42a5f5', '#64b5f6', '#90caf9', '#898989',
  '#00897b', '#009688', '#26a69a', '#80cbc4', '#b2dfdb', '#5a5a5a',
  '#43a047', '#4caf50', '#81c784', '#a5d6a7', '#c8e6c9', '#373737',
  '#fbc02d', '#fdd835', '#ffeb3b', '#fff176', '#fff59d', '#232323',
  '#f57c00', '#fb8c00', '#ffa726', '#ffb74d', '#ffcc80', '#161616',
  '#e64a19', '#f4511e', '#ff5722', '#ff8a65', '#ffab91', '#000000'
]
// const PALETTE_COLORS = [
//   '#d81b43', '#8e24aa', '#512da8', '#303f9f', '#1e88e5', '#00897b', '#43a047', '#fbc02d', '#f57c00', '#e64a19',
//   '#e91e4e', '#9c27b0', '#5e35b1', '#3949ab', '#2196f3', '#009688', '#4caf50', '#fdd835', '#fb8c00', '#f4511e',
//   '#ec4064', '#ab47bc', '#673ab7', '#5c6bc0', '#42a5f5', '#26a69a', '#81c784', '#ffeb3b', '#ffa726', '#ff5722',
//   '#f0627d', '#ba68c8', '#7e57c2', '#7986cb', '#64b5f6', '#80cbc4', '#a5d6a7', '#fff176', '#ffb74d', '#ff8a65',
//   '#f48fa0', '#ce93d8', '#9575cd', '#9fa8da', '#90caf9', '#b2dfdb', '#c8e6c9', '#fff59d', '#ffcc80', '#ffab91',
//   '#ffffff', '#fff', '#b5b6b6', '#898989', '#5a5a5a', '#373737', '#232323', '#161616', '#000000', '#000'
// ]

export default {

  props: {
    color: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      PALETTE_COLORS
    }
  },

  methods: {
    handleClick (color) {
      if (color === 'transparent') {
        this.color.fromString('rgb(0,0,0,0)', true)
      } else {
        this.color.fromString(color, true)
      }
    }
  }

}
</script>
