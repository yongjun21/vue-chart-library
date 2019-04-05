import '../../polyfills/SVGElement.prototype.classList'
import TweenLite from 'gsap/TweenLite'
import {_ANIMATION_, currentAnimations} from '../shared'

export default {
  bind (el, binding) {
    el.classList.add('vg-animated')
    const vars = Object.assign({}, binding.value)
    delete vars.duration
    delete vars.order
    const target = {}
    el[_ANIMATION_] = target
    Object.keys(vars).forEach(prop => {
      addProperty(target, vars, prop)
      el.setAttribute(prop, target[prop])
    })
  },
  update (el, binding) {
    const name = binding.arg || 'default'
    const vars = Object.assign({}, binding.value)
    let duration = vars.duration || 0.0166667
    const order = vars.order || 0
    delete vars.duration
    delete vars.order
    const target = el[_ANIMATION_]
    if (typeof duration === 'function') duration = duration(vars, target)
    Object.keys(vars).forEach(prop => {
      if (typeof vars[prop] === 'function' || !(prop in target)) {
        addProperty(target, vars, prop)
        el.setAttribute(prop, target[prop])
      }
    })

    const animating = []
    Object.keys(vars).forEach(prop => {
      if (typeof vars[prop] === 'function') {
        animating.push(prop)
        delete vars[prop]
      } else if (vars[prop] !== target[prop]) {
        animating.push(prop)
      } else {
        delete vars[prop]
      }
    })

    if (Object.keys(vars).length === 0) return

    Object.assign(vars, {
      onStart: () => el.classList.add('vg-animating'),
      onComplete: () => el.classList.remove('vg-animating'),
      onUpdate: () => {
        animating.forEach(prop => {
          el.setAttribute(prop, target[prop])
        })
      }
    })
    const tween = TweenLite.to(target, duration, vars)
    if (name in currentAnimations) currentAnimations[name].push([order, tween])
  }
}

function addProperty (target, vars, prop) {
  if (typeof vars[prop] === 'function') {
    Object.defineProperty(target, prop, {
      configurable: true,
      enumerable: true,
      get: vars[prop]
    })
  } else {
    target[prop] = vars[prop]
  }
}
