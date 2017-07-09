module.exports = {
  container: {
    overflow: 'hidden',
    position: 'relative'
  },

  image: {
    margin: '0 auto',
    maxWidth: '100%',
    maxHeight: '100%'
  },

  imageContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'none',
    textAlign: 'center'
  },

  containerAnimated: {
    display: 'block',
    WebkitTransition: 'transform .3s ease-out',
    transition: 'transform .3s ease-out'
  },

  containerActive: {
    WebkitTransform: 'translate3d(0,0,0)',
    transform: 'translate3d(0,0,0)',
    zIndex: 1
  },

  containerPrevious: {
    WebkitTransform: 'translate3d(-100%,0,0)',
    transform: 'translate3d(-100%,0,0)'
  },

  containerNext: {
    WebkitTransform: 'translate3d(100%,0,0)',
    transform: 'translate3d(100%,0,0)'
  }
}
