import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import VuePlugin from 'rollup-plugin-vue'

const config = {
  external: [
    'vue',
    'd3-scale',
    'd3-shape',
    'd3-path',
    'd3-interpolate-path',
    'gsap/TweenLite',
    'gsap/TimelineLite',
    'gsap/AttrPlugin'
  ],
  output: {
    format: 'cjs',
    sourcemap: true
  },
  plugins: [
    resolve(),
    commonjs(),
    VuePlugin()
  ]
}

export default args => {
  const filename = args.input.match(/\/?(\w+)\.\w+$/)[1]
  config.output.file = `dist/${filename}.js`
  return config
}
