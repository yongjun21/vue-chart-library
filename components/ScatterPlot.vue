<template>
  <g class="vg-plot vg-scatter-plot" v-on="wrappedListeners">
    <animated-group
      :watching="dataView"
      :enter="enterGeom"
      :exit="exitGeom"
      :appear="enterGeom">
      <circle v-for="(d, i) in dataView" :key="d.key || i" v-if="hasGeom(d)"
        class="vg-dot"
        :class="d.class"
        v-associate="d"
        v-animated="getGeom(d, i)">
      </circle>
    </animated-group>
    <slot v-bind="{getGeom, hasGeom}"></slot>
  </g>
</template>

<script>
import {animationMixin, associateDataMixin} from '../mixins'

export default {
  name: 'ScatterPlot',
  mixins: [animationMixin, associateDataMixin],
  props: {
    dataView: {
      type: Array,
      required: true
    },
    xScale: {
      type: Function,
      default: v => v
    },
    yScale: {
      type: Function,
      default: v => v
    },
    dotSize: {
      type: Number,
      default: 8
    }
  },
  computed: {
    enterGeom () {
      return {
        r: 0,
        animation: this.getAnimation(Infinity)
      }
    },
    exitGeom () {
      return {
        r: 0,
        animation: this.getAnimation(-Infinity)
      }
    }
  },
  methods: {
    getGeom (d, i) {
      const {xScale, yScale, dotSize} = this
      return {
        cx: xScale(d.x),
        cy: yScale(d.y),
        r: d.s || dotSize,
        animation: this.getAnimation(i)
      }
    },
    hasGeom (d) {
      return this.xScale(d.x) != null && this.yScale(d.x) != null
    }
  }
}
</script>
