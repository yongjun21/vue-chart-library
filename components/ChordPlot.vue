<template>
  <animated-group class="vg-plot vg-chord-plot"
    :watching="dataView"
    :appear="getAnimation()"
    v-on="wrappedListeners">
    <path v-for="(d, i) in dataView" :key="d.key || i" v-if="hasGeom(d)"
      class="vg-chord"
      :class="d.class"
      v-bind="getGeom(d)"
      v-associate="d"
      v-draw="getAnimation(i)">
    </path>
  </animated-group>
</template>

<script>
import {animationMixin, associateDataMixin} from '../mixins'
import {path} from 'd3-path'
import {polar2xy} from '../util'

export default {
  name: 'ChordPlot',
  mixins: [animationMixin, associateDataMixin],
  props: {
    dataView: {
      type: Array,
      required: true
    },
    aScale: {
      type: Function,
      default: v => v
    },
    rScale: {
      type: Function,
      default: v => v
    }
  },
  computed: {
    appear () {
      return this.getAnimation()
    }
  },
  methods: {
    getGeom (d) {
      const {aScale, rScale} = this
      const oXY = polar2xy([aScale(d.a1), rScale(d.r)])
      const dXY = polar2xy([aScale(d.a2), rScale(d.r)])
      const p = path()
      p.moveTo(...oXY)
      p.quadraticCurveTo(0, 0, ...dXY)
      return {d: p.toString()}
    },
    hasGeom (d) {
      return this.aScale(d.a1) != null && this.aScale(d.a2) != null
    }
  }
}
</script>
