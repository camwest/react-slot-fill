# 1.0.0.alpha.11

* update to support React 15.5.x and TypeScript 2.3.x

# 1.0.0.alpha.10

* lock down mitt version due to breaking change

# 1.0.0.alpha.9

* add Provider#getFillsByName and Provider#getChildrenByName (#13)

# 1.0.0.alpha.8

* Bad build

# 1.0.0.alpha.7

* Fix bug where Slot couldn't render null

# 1.0.0.alpha.6

* [Converted to TypeScript](https://github.com/camwest/react-slot-fill/pull/10)
* React 15.x is now supported and extra div elements will be inserted where needed

# 1.0.0.alpha.5

* [Move mutt to dependencies](https://github.com/camwest/react-slot-fill/commit/b628e8f4cf1ba83c78fb037ce147867f06bb2296)
* [remove react-dom peerDependency. react-slot-fill should work with react-native now](https://github.com/camwest/react-slot-fill/commit/47a0a9569e90443d6addd03bb21adc6988a1a90e)

# 1.0.0.alpha.4

* [Replace DOM usage with mitt pub-sub](https://github.com/camwest/react-slot-fill/commit/7c4bac3d4cab2969c01362febb5deb87a6b78cc3)

## Contributors

* @Craga89

# 1.0.0.alpha.3

oops! no changes

# 1.0.0.alpha.2

* [Add react@next and react-dom@next dependencies instead of hard-coding Fiber](https://github.com/camwest/react-slot-fill/commit/c3179db4b5abe2ab59298707c6c8e76e0dc605ae)
* [Add Provider component which avoids using global state](https://github.com/camwest/react-slot-fill/commit/b5166d365e809cf68c6cf261f5b5c80040a43528)
* [Change highlight to JSX on README](https://github.com/camwest/react-slot-fill/commit/9e06bc64b96b6465894a855d423752cac79ae283)

## Contributors:

* @rogeliog
* @camwest
* @davesnx

# 1.0.0.alpha.1

Initial Release. Note this requires react-fiber to function correctly since Slot
returns an array of elements which is only supported there.
