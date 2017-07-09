'use strict'

var Touchwipe = require('vanilla-touchwipe')
var omit = require('blacklist')
var extend = require('xtend')
var cx = require('classnames')

module.exports = function CustomCarouselComponent (h, Component) {
  function Nanocarousel (props) {
    var self = this

    Component.call(this, props)
    this.state = {
      currentIndex: 0,
      // We have to ensure the length of the images in the carousel are greater than 3.
      // If we receive <=3 images, double the array into 4 or more images. This makes next/prev
      // animations work flawlessly.
      images: []
    }

    this.handleRef = function handleRef (node) {
      if (!node || self.touchwipe) return
      self.touchwipe = Touchwipe(node, {
        wipeLeft: this.changeIndex(1),
        wipeRight: this.changeIndex(-1)
      })
    }

    this.handleDotClick = function handleDotClick (event) {
      const index = Number(event.target.getAttribute('data-slide-index'))
      if (!isNaN(index)) {
        this.setState({index: index})
      }
    }
  }

  Nanocarousel.prototype = Object.create(Component.prototype)

  Nanocarousel.prototype.componentDidUpdate = function componentDidUpdate () {
    this.onUpdate()
  }

  Nanocarousel.prototype.componentDidMount = function componentDidMount () {
    this.onUpdate()
  }

  Nanocarousel.prototype.componentWillUnmount = function componentWillMount () {
    if (!this.touchwipe) return
    this.touchwipe.unbind()
    this.touchwipe = null
  }

  Nanocarousel.prototype.onUpdate = function onUpdate () {
    var images = this.props.images || []
    if (images.length === 2 || images.length === 3) {
      images = images.concat(images)
    }
    this.setState({
      images: images
    })
  }

  Nanocarousel.prototype.changeIndex = function changeIndex (delta) {
    var nextIndex = this.state.currentIndex + delta
    this.setState({
      currentIndex: nextIndex < 0 ? this.state.images.length - 1
        : nextIndex === this.state.images.length ? 0
        : nextIndex
    })
  }

  Nanocarousel.prototype.render = function render () {
    var images = this.state.images
    var currentIndex = this.state.currentIndex

    if (!images.length) return null

    var imageContainerProps = this.props.imageContainerProps || {}
    var imageContainerClassName = omit(imageContainerProps, 'className')

    var imageProps = this.props.imageProps || {}
    var imageClassName = omit(imageProps, 'className')

    var className = omit(this.props, 'className')
    var rest = omit(this.props, 'imageContainerProps', 'imageProps')

    return h('div', extend(rest, {
      ref: this.handleRef,
      className: cx('nanocarousel-container', className)
    }), [
      images.map(renderImage)
    ])

    function renderImage (src, index) {
      var isPrevious = images.length > 1 && (
        index === currentIndex - 1 ||
          (index === images.length - 1 && currentIndex === 0)
      )
      var isNext = images.length > 1 && (
        index === currentIndex + 1 ||
          (index === 0 && currentIndex === images.length - 1)
      )
      return h('div', extend(imageContainerProps, {
        className: cx('nanocarousel-image-container', imageContainerClassName, {
          'nanocarousel-active': currentIndex === index,
          'nanocarousel-previous': isPrevious,
          'nanocarousel-next': isNext
        })
      }), h('img', extend(imageProps, {
        className: cx('nanocarousel-image', imageClassName),
        src: src
      })))
    }
  }
}
