<template>
  <div class="cpicker__predefine cpicker__palette">
    <ul class="color-block-list">
      <li
        v-for="c in pageColors"
        :key="c"
        class="color-block"
      >
        <div
          :style="{ backgroundColor: c }"
          @click="handleClick(c)"
        />
      </li>
    </ul>
    <div
      v-if="pages > 1"
      class="cpicker__footer"
    >
      <span
        class="cpicker-btn"
        :class="{
          'cpicker-btn--disabled': prevDisabled
        }"
        @click="prev"
      >
        &lt;
      </span>
      <span
        class="cpicker-btn"
        :class="{
          'cpicker-btn--disabled': nextDisabled
        }"
        @click="next"
      >

        &gt;
      </span>
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
    colors: Array
  },

  data () {
    return {
      pageIndex: 0, // 页码
      pageSize: 60 // 每页显示数
    }
  },

  computed: {
    pages () {
      return Math.ceil(this.colors.length / this.pageSize)
    },
    pageColors () {
      const startIndex = this.pageIndex * this.pageSize
      return this.colors.slice(startIndex, startIndex + this.pageSize)
    },
    prevDisabled () {
      return this.pageIndex === 0 || this.pages <= 1
    },
    nextDisabled () {
      return this.pageIndex === this.pages - 1 || this.pages <= 1
    }
  },

  methods: {
    handleClick (color) {
      if (color === 'transparent') {
        this.color.fromString('rgb(0,0,0,0)', true)
      } else {
        this.color.fromString(color, true)
      }
    },
    prev () {
      if (this.prevDisabled) {
        return
      }
      this.pageIndex = (this.pageIndex - 1) % this.pages
    },
    next () {
      if (this.nextDisabled) {
        return
      }
      this.pageIndex = (this.pageIndex + 1) % this.pages
    }
  }

}
</script>
