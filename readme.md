# react-nanocarousel [![Build Status](https://travis-ci.org/ajoslin/react-nanocarousel.svg?branch=master)](https://travis-ci.org/ajoslin/react-nanocarousel)

> A swipeable carousel in as few bytes as possible, React or Preact first-class citizen. Server side renderable. 1.6kb including styles.


## Install

```
$ npm install --save react-nanocarousel
```


## Usage

All styling is done via inline styles.

To override default styles, pass style objects or classNames to the props, `imageContainerProps`, or `imageProps`.

To override the inline styles with classes, be sure to use `!important`.

Preact users, use `react-nanocarousel/preact`.

```jsx
var Nanocarousel = require('react-nanocarousel')

function render () {
  return <Nanocarousel images={['a.jpg', 'b.jpg']}
                       onChange={(index) => {}}
                       className='container'
                       imageContainerProps={ {style: {backgroundColor: 'red'}} }
                       imageProps={ {className: 'an-image'} } />
}
```

## License

MIT © [Andrew Joslin](http://ajoslin.com)
