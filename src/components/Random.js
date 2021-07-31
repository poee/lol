import React from 'react'
import { knuthShuffle as shuffle } from 'knuth-shuffle'

export default function Random ({ children, type = 'ul' }) {
	const shuffledChildren = shuffle(React.Children.toArray(children))
	return React.createElement(type, null, ...shuffledChildren)
}
