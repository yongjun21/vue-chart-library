<template>
  <g class="vg-plot vg-bar-plot" v-on="wrappedListeners">
    <animated-group
      :watching="dataView"
      :enter="enterGeom"
      :exit="exitGeom"
      :appear="enterGeom">
      <rect v-for="(d, i) in dataView.filter(hasGeom)" :key="d.key || i"
        class="vg-bar"
        :class="d.class"
        v-associate="d"
        v-animated="getGeom(d, i)">
      </rect>
    </animated-group>
    <slot v-bind="{getGeom, hasGeom}"></slot>
  </g>
</template>

<script>
import {animationMixin, associateDataMixin} from '../mixins'

export default {
  name: 'BarPlot',
  mixins: [animationMixin, associateDataMixin],
  props: {
    dataView: {
      type: Array,
      required: true
    },
    xScale: {
      type: Function,
      required: true
    },
    yScale: {
      type: Function,
      default: v => v
    }
  },
  computed: {
    enterGeom () {
      return {
        y: this.yScale(0),
        height: 0,
        animation: this.getAnimation(Infinity)
      }
    },
    exitGeom () {
      return {
        y: this.yScale(0),
        height: 0,
        animation: this.getAnimation(-Infinity)
      }
    }
  },
  methods: {
    getGeom (d, i) {
      const {xScale, yScale} = this
      const y0 = yScale(0)
      const y1 = yScale(d.y)
      return {
        x: xScale(d.x),
        y: Math.min(y0, y1),
        width: xScale.bandwidth(),
        height: Math.abs(y1 - y0),
        animation: this.getAnimation(i)
      }
    },
    hasGeom (d) {
      return this.xScale(d.x) != null && this.yScale(d.y) != null
    }
  }
}
</script>
