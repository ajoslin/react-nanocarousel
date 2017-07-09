'use strict'

var Touchwipe = require('vanilla-touchwipe')
var extend = require('xtend')
var styles = require('./styles')

module.exports = function NanocarouselFactory (h, Component) {
  function Nanocarousel (props) {
    var self = this
    Component.call(this, props)
    this.state = {
      currentIndex: 0,
      // We have to ensure the length of the images in the carousel are greater than 3.
      // If we receive <=3 images, double the array into 4 or more images. This makes
      // next/prev animations work flawlessly.
      images: []
    }

    this.handleRef = function handleRef (node) {
      if (!node || self.touchwipe) return
      self.touchwipe = Touchwipe(node, {
        wipeLeft: self.changeIndex.bind(self, 1),
        wipeRight: self.changeIndex.bind(self, -1)
      })
    }
  }

  Nanocarousel.prototype = Object.create(Component.prototype)

  Nanocarousel.prototype.setIndex = function setIndex (index) {
    var self = this
    this.setState(
      function () {
        return {currentIndex: index}
      },
      function stateChangeDone () {
        // Return the index based upon the indices passed in, minus the duplication.
        self.props.onChange && self.props.onChange(
          self.state.images.indexOf(self.state.images[index])
        )
      }
    )
  }

  Nanocarousel.prototype.componentWillReceiveProps = function componentWillReceiveProps (props) {
    if (props.images === this.props.images) return
    this.onUpdate(props)
  }

  Nanocarousel.prototype.componentWillMount = function componentWillMount () {
    this.onUpdate(this.props)
  }

  Nanocarousel.prototype.componentWillUnmount = function componentWillMount () {
    if (!this.touchwipe) return
    this.touchwipe.unbind()
    this.touchwipe = null
  }

  Nanocarousel.prototype.onUpdate = function onUpdate (props) {
    var images = props.images || []
    if (images.length === 2 || images.length === 3) {
      images = images.concat(images)
    }
    this.setState({
      images: images
    })
  }

  Nanocarousel.prototype.changeIndex = function changeIndex (delta) {
    var nextIndex = this.state.currentIndex + delta
    this.setIndex(
      nextIndex < 0 ? this.state.images.length - 1
        : nextIndex === this.state.images.length ? 0
        : nextIndex
    )
  }

  Nanocarousel.prototype.render = function render () {
    var images = this.state.images
    var currentIndex = this.state.currentIndex

    var imageContainerProps = this.props.imageContainerProps || {}
    var imageProps = this.props.imageProps || {}
    var rest = extend(this.props, {imageContainerProps: undefined, imageProps: undefined})

    return h('div', extend(rest, {
      ref: this.handleRef,
      style: extend(styles.container, imageContainerProps.style)
    }), [
      images.map(renderImage)
    ])

    function renderImage (src, index) {
      var isActive = currentIndex === index
      var isPrevious = images.length > 1 && (
        index === currentIndex - 1 ||
          (index === images.length - 1 && currentIndex === 0)
      )
      var isNext = images.length > 1 && (
        index === currentIndex + 1 ||
          (index === 0 && currentIndex === images.length - 1)
      )
      var isAnimated = isPrevious || isNext || isActive

      return h('div', extend(imageContainerProps, {
        style: extend(
          styles.imageContainer,
          isAnimated ? styles.containerAnimated : {},
          isActive ? styles.containerActive
            : isPrevious ? styles.containerPrevious
            : isNext ? styles.containerNext
            : {},
          rest.style
        )
      }), h('img', extend(imageProps, {
        style: extend(styles.image, imageProps.style),
        src: src
      })))
    }
  }

  return Nanocarousel
}
